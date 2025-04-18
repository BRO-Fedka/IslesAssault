from server.constants import COL_B, COL_S, COL_C
from shapely.geometry import Polygon
import pymunk
import math
from typing import Dict, List
from server.Static.Buildings.BuildingHealthController import BuildingHealthController, BUILT, CRUMBLED, EXPLODED, UNDER_CONSTRUCTION
from server.World import World
from server.Role import Role


class Building:
    is_destructible = False
    is_flammable = False
    durability = 1
    neutral = True

    def __init__(self, world: World, data: list, sp_bilding_links: Dict[int, List[object]]):
        self.world = world
        self.state = BUILT
        self.role: Role = None
        self.x = data[1]
        self.y = data[2]
        self.w = data[3]
        self.h = data[4]
        self.d = round(data[5])
        shape = [(-self.w / 2, -self.h / 2), (self.w / 2, -self.h / 2), (self.w / 2, self.h / 2),
                 (-self.w / 2, self.h / 2)]
        sin = math.sin(self.d / 180 * math.pi)
        cos = math.cos(self.d / 180 * math.pi)
        shape = list(map(lambda c: [self.x - c[1] * sin + c[0] * cos, self.y + c[1] * cos + c[0] * sin], shape))
        # self.health_controller = StaticMockHealthController()
        self.shape = Polygon(shape)
        self.related_buildings_hcs: List[BuildingHealthController] = []
        self.health_controller = BuildingHealthController(self.shape, self.w * self.h * 200 * self.durability)
        self.sp_id = -1
        try:
            self.sp_id = data[6]
            if self.sp_id not in sp_bilding_links.keys():
                sp_bilding_links[self.sp_id] = []
            sp_bilding_links[self.sp_id].append(self)
        except:
            pass
        # print(5)
        self.body = pymunk.Body(body_type=pymunk.Body.STATIC, mass=1)
        self.pol = pymunk.Poly(self.body,
                               [(-self.w / 2, -self.h / 2), (self.w / 2, -self.h / 2), (self.w / 2, self.h / 2),
                                (-self.w / 2, self.h / 2)])

        self.pol.type = 4
        self.pol.mass = 1
        # print(2)
        self.body.position = self.x, self.y
        self.body.angle = self.d / 180 * math.pi
        self.pol.filter = COL_S
        self.pol.master = self
        self.is_changed = True
        # print(self.x,self.y,self.w,self.h,self.d,self.sp_id)
        world.space.add(self.body, self.pol)
        # print('%')

    def get_string(self):
        return str(self.health_controller.get_state_id())

    def update_return_is_changed(self) -> bool:
        self.health_controller.update()
        if self.health_controller.get_total_hp() == 0:
            self.role = None
        else:
            if not self.health_controller.role is None and self.role is None:
                for hc in self.related_buildings_hcs:
                    if hc.role is not None and hc.role != self.health_controller.role:
                        self.health_controller.role = None
                        self.health_controller.state = UNDER_CONSTRUCTION
                        print('LOLOLOL')
                        break
            else:
                self.role = self.health_controller.role
        if self.health_controller.get_state_id() != self.state:
            prev_state = self.state
            self.state = self.health_controller.get_state_id()
            if self.is_destructible:
                if self.state in [CRUMBLED, EXPLODED]:
                    self.world.space.remove(self.body, self.pol)
                elif prev_state in [CRUMBLED, EXPLODED]:
                    self.world.space.add(self.body, self.pol)
            return True
        if self.is_changed:
            self.is_changed = False
            return True
        return False
