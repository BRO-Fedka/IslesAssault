from typing import List, Sequence
from server.Modules.Module import Module, BOTTOM, DEFAULT
from pymunk import Body
from server.Types import coords
from shapely.geometry import Polygon, LineString
import math


class HealthController:
    def __init__(self, body: Body):
        self.body = body
        self.max_hp: int = None
        self.modules: List[Module] = None
        self.vehicle_shape: Polygon = None
        self.max_modules_hp = 0

    def update_params(self, max_hp: int, modules: List[Module], poly: Sequence[Sequence[float]]):
        self.max_hp = max_hp
        self.modules = modules
        self.vehicle_shape = Polygon(poly)
        for module in self.modules:
            self.max_modules_hp += module.get_hp()
        print(self.max_modules_hp)

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

    def bottom_explosion_damage_from_body(self, projectile: Body, radius: float = 0.05):
        # self.max_hp -= 100
        self.bottom_explosion_damage_from_local_coords(self.get_local_coords_of_penetration(projectile), radius=radius)

    def bottom_explosion_damage_from_local_coords(self, coord: coords, radius: float):
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
        modules = []
        for module in self.modules:
            if module.level == DEFAULT:
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
        return cur_hp/self.max_modules_hp*self.max_hp
