from server.Static.Buildings.Building import Building
from server.constants import COL_B, COL_S, COL_C, DESTRUCTIBLE
from shapely.geometry import Polygon, Point
import pymunk
import math
from typing import Dict, List
from server.Static.Buildings.BuildingHealthController import BuildingHealthController, BUILT, CRUMBLED, EXPLODED, \
    UNDER_CONSTRUCTION
from server.World import World
from server.Role import Role
from server.Types import coords
from server.Object import Object


class CircularBuilding(Building):
    def __init__(self, world: World, data: list, sp_bilding_links: Dict[int, List[object]]):
        if len(data) > 4:
            data = [data[0], data[1], data[2], data[3], data[3], 0, data[4]]
        else:
            data = [data[0], data[1], data[2], data[3], data[3], 0]
        super().__init__(world, data, sp_bilding_links)
        self.shape = Point(self.x,self.y).buffer(self.w/2)

    def create_collision(self):
        self.body = pymunk.Body(body_type=pymunk.Body.STATIC, mass=1)
        self.pol = pymunk.Circle(self.body, self.w / 2, (0, 0))
        self.pol.type = DESTRUCTIBLE
        self.pol.mass = 1
        self.body.position = self.x, self.y
        self.body.angle = self.d / 180 * math.pi
        self.pol.filter = COL_S
        self.pol.master = self
        self.world.space.add(self.body, self.pol)
