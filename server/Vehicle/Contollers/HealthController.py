from typing import List, Sequence, Union
from server.Modules.Module import Module, BOTTOM, DEFAULT
from pymunk import Body
from server.Types import coords
from shapely.geometry import Polygon, LineString, Point
from server.Modules.Armor.ArmorPlate import ArmorPlate
import math
import asyncio


class HealthController:
    def __init__(self, body: Body):
        self.body = body
        self.max_hp: int = None
        self.modules: List[Module] = None
        self.vehicle_shape: Polygon = None
        self.max_modules_hp = 0
        self.armor_modules: List[Module] = []
        self.is_repairing = False
        self.module_under_repairing = None
        self.modules_for_repairing: List[List[Module,Union[str,int]]] = []

    def on_damage(self):
        pass

    def filter_modules_for_repairing(self):
        modules = []
        i = -1
        for module in self.modules + self.armor_modules:
            i += 1
            if module.is_repairable:
                if (module.get_hp() == 0 and self.body.velocity.length > 0.05) or module.get_rel_hp() == 1:
                    continue
                if i >= len(self.modules):
                    modules.append([module,'-'])
                else:
                    modules.append([module,i])

        modules.sort(key=lambda e: 100000 * (e[0].get_rel_hp() + 0.001) if e[0].repair_priority is None else (
                                                                                                               e[0].get_rel_hp() + 0.001) * e[0].repair_priority)

        self.modules_for_repairing = modules
        # print(self.modules_for_repairing)

    def get_module_id(self):
        return self.module_under_repairing

    def repair(self):
        self.filter_modules_for_repairing()
        if not self.is_repairing:
            asyncio.create_task(self.repair_async())
            # print('^')

        # ioloop.close()

    async def repair_async(self):
        self.is_repairing = True
        # print('?')
        while len(self.modules_for_repairing) > 0:
            self.module_under_repairing = self.modules_for_repairing[0][1]
            print(self.modules_for_repairing[0][1])
            await self.modules_for_repairing[0][0].repair()
            # self.modules_for_repairing.pop(0)
            self.filter_modules_for_repairing()
        self.module_under_repairing = None
        # print(self.modules_for_repairing)
        # for module in self.modules_for_repairing:
        #     print(self.modules_for_repairing)

        self.is_repairing = False
        # print('!')

    def fill_armor_modules(self):
        crds = self.vehicle_shape.exterior.coords[:]
        for _ in range(1, len(crds)):
            ln = Point(crds[_ - 1]).distance(Point(crds[_]))
            cnt = round(ln // 0.01)
            print(ln, cnt)
            for i in range(0, cnt):
                module = ArmorPlate(coords(crds[_ - 1][0] + (crds[_][0] - crds[_ - 1][0]) * i / cnt,
                                           crds[_ - 1][1] + (crds[_][1] - crds[_ - 1][1]) * i / cnt),
                                    coords(crds[_ - 1][0] + (crds[_][0] - crds[_ - 1][0]) * (i + 1) / cnt,
                                           crds[_ - 1][1] + (crds[_][1] - crds[_ - 1][1]) * (i + 1) / cnt), 0.01)
                self.armor_modules.append(module)
        # print(crds)

    def update_params(self, max_hp: int, modules: List[Module], poly: Sequence[Sequence[float]]):
        self.max_hp = max_hp
        self.modules = modules
        self.vehicle_shape = Polygon(poly)
        print(self.vehicle_shape.length)
        for module in self.modules:
            self.max_modules_hp += module.get_hp()
        print(self.max_modules_hp)
        self.fill_armor_modules()

    def get_local_coords_of_penetration(self, projectile: Body) -> coords:
        pen_angle = self.body.angle - projectile.velocity.angle
        px, py = projectile.position
        vpx = px - self.body.position.x
        vpy = py - self.body.position.y
        sin = math.sin(-self.body.angle)
        cos = math.cos(-self.body.angle)
        lpx = vpx * cos - vpy * sin
        lpy = -(vpx * sin + vpy * cos)
        sin = math.sin(pen_angle)
        cos = math.cos(pen_angle)
        tracer_line = LineString([(lpx - cos * 10, lpy - sin * 10), (lpx + cos * 10, lpy + sin * 10)])
        intersections = self.vehicle_shape.intersection(tracer_line)
        mn = 10
        pen_coord = (0, 0)
        for coord in intersections.coords:
            dst = math.sqrt((lpx - coord[0]) ** 2 + (lpy - coord[1]) ** 2)
            if dst < mn:
                mn = dst
                pen_coord = coord

        return coords(pen_coord[0], -pen_coord[1])

    def piercing_damage_from_body(self, projectile: Body, size: float = 0.01):
        # self.max_hp -= 100
        self.piercing_damage_from_local_coords(self.get_local_coords_of_penetration(projectile),
                                               self.body.angle - projectile.velocity.angle,
                                               size=size, speed=projectile.velocity.length, mass=projectile.mass)

    def piercing_damage_from_local_coords(self, coord: coords, angle: float, size: float, speed: float, mass: float):
        self.on_damage()
        cos = math.cos(angle)
        sin = math.sin(angle)
        print(angle)
        penetration_line = LineString(
            [(coord[0] - cos * 10, coord[1] + sin * 10), (coord[0] + cos * 10, coord[1] - sin * 10)])
        penetration_point = Point(coord)
        modules = []
        for module in self.modules:
            if module.level == DEFAULT and module.check_intersection(penetration_line):
                intersrction = module.get_intersection(penetration_line)
                modules.append([penetration_point.distance(intersrction), module, intersrction])
        for module in self.armor_modules:
            if module.check_intersection(penetration_line):
                intersrction = module.get_intersection(penetration_line)
                modules.append([penetration_point.distance(intersrction), module, intersrction])
        modules.sort(key=lambda x: x[0])
        # print('========PIERCING============')
        for module in modules:
            size, speed, mass = module[1].piercing_damage(module[2], coord, size, speed, mass)

    def bottom_explosion_damage_from_body(self, projectile: Body, radius: float = 0.05):
        # self.max_hp -= 100
        self.bottom_explosion_damage_from_local_coords(self.get_local_coords_of_penetration(projectile), radius=radius)

    def bottom_explosion_damage_from_local_coords(self, coord: coords, radius: float):
        self.on_damage()
        bottom_modules = []
        for module in self.modules:
            if module.level == BOTTOM:
                bottom_modules.append(module)
        if len(bottom_modules) == 0:
            return self.explosion_damage_from_local_coords(coord, radius=radius)
        print('========BOTTOM===========')
        for module in bottom_modules:
            module.explosion_damage(coord, radius=radius)

    def explosion_damage_from_local_coords(self, coord: coords, radius: float):
        self.on_damage()
        modules = []
        for module in self.modules:
            if module.level == DEFAULT:
                modules.append(module)
        for module in self.armor_modules:
            # if module.level == DEFAULT:
            modules.append(module)
        print('========DEFAULT============')
        for module in modules:
            module.explosion_damage(coord, radius=radius)

    def explosion_damage_from_body(self, projectile: Body, radius: float = 0.05):
        self.explosion_damage_from_local_coords(self.get_local_coords_of_penetration(projectile), radius=radius)

    def get_total_hp(self):
        cur_hp = 0
        for module in self.modules:
            cur_hp += module.get_hp()
        return cur_hp / self.max_modules_hp * self.max_hp
