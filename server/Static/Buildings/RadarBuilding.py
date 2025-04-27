from server.Static.Buildings.CircularBuilding import CircularBuilding
from typing import Dict, List
from server.World import World
from server.constants import MARK_ID_RADAR, MARK_ID_OBSERVED_ZONE, MARK_ID_POINT
from server.Static.Buildings.BuildingHealthController import CRUMBLED
from shapely.geometry import Point, Polygon
import math
from server.Types import coords
from server.Vehicle.Vehicle import Vehicle
import logging
import datetime
from server.functions import lookat_deg


class RadarBuilding(CircularBuilding):
    is_destructible = False
    is_flammable = False
    durability = 0.1
    observe_radius: float = 6
    observe_extent: int = 30

    def __init__(self, world: World, data: list, sp_bilding_links: Dict[int, List[object]]):
        super().__init__(world, data, sp_bilding_links)
        self.observer_direction = 0
        self.health_controller.hp = 0
        self.health_controller.state = CRUMBLED
        self.observed_zone_shape = Polygon()
        world.add_object(self)

    def update_return_is_changed(self):
        f = True

        if self.role:
            try:
                marks = []
                for mark in self.role.observed_points:
                    # print(mark, math.sqrt((self.x - mark[2]) ** 2 + (self.y - mark[3]) ** 2))
                    if math.sqrt((self.x - mark[2]) ** 2 + (self.y - mark[3]) ** 2) < self.observe_radius:
                        deg = math.floor(lookat_deg(mark[2] - self.x, mark[3] - self.y))
                        if deg == self.observer_direction:
                            break
                        if abs(self.observer_direction - deg) <= 180:
                            if self.observer_direction > deg:
                                self.observer_direction = (self.observer_direction + 359.5) % 360
                            else:
                                self.observer_direction = (self.observer_direction + 0.5) % 360
                        else:
                            if self.observer_direction > deg:
                                self.observer_direction = (self.observer_direction + 0.5) % 360
                            else:
                                self.observer_direction = (self.observer_direction + 359.5) % 360
                        if abs(self.observer_direction-deg) < 0.5:
                            self.observer_direction = deg
                        break

                crds = [[self.x, self.y]]
                for deg in range(int(self.observer_direction - self.observe_extent / 2),
                                 int(self.observer_direction + self.observe_extent / 2) + 1):
                    crds.append([self.x + math.cos(deg / 180 * math.pi) * self.observe_radius,
                                 self.y + math.sin(deg / 180 * math.pi) * self.observe_radius])
                self.observed_zone_shape = Point(self.x, self.y).buffer(self.observe_radius).intersection(Polygon(crds))
                cx, cy = math.floor(self.x), math.floor(self.y)
                objects = set()
                for x in range(cx - math.ceil(self.observe_radius), cx + math.ceil(self.observe_radius) + 1):
                    for y in range(cy - math.ceil(self.observe_radius), cy + math.ceil(self.observe_radius) + 1):
                        # print(x,y)
                        try:
                            for _ in self.world.get_objects_in_chunk(coords(x, y)):
                                if isinstance(_, Vehicle):
                                    # print(type(_))
                                    objects.add(_)
                        except:
                            pass
                objects = list(objects)
                for obj in objects:
                    if self.role != obj.role and self.observed_zone_shape.intersects(obj.shapely_shape):
                        self.role.intelligence_enemy_map_marks.append((obj.role.symbol, *obj.get_map_mark()))
                self.role.intelligence_ally_map_marks.append(
                    (MARK_ID_RADAR, round(self.body.position.x, 2), round(self.body.position.y, 2),
                     datetime.datetime.now()))
                self.role.intelligence_ally_map_marks.append(
                    (MARK_ID_OBSERVED_ZONE, round(self.body.position.x, 2), round(self.body.position.y, 2),
                     self.observer_direction, self.observe_radius, self.observe_extent, datetime.datetime.now()))
            except:
                logging.exception('')
        return super().update_return_is_changed() or f

    def get_string(self):
        # print(super().get_string() + str(self.observer_direction).zfill(3))
        return super().get_string() + str(math.floor(self.observer_direction)).zfill(3)
