from typing import List, Sequence, Union, Callable
from pymunk import Body
from server.Types import coords
from shapely.geometry import Polygon, LineString, Point
from shapely.geometry.base import BaseGeometry
import math
from server.constants import DO_FRIENDLY_BUILDINGS_DAMAGE
from server.HealthController import HealthController

BUILT = 0
BURNING = 1
CRUMBLED = 2
EXPLODED = 3
DECAYED = 4


class BuildingHealthController(HealthController):
    def __init__(self, shape: BaseGeometry, max_hp: float = None):
        self.shape = shape
        self.max_hp: float = max_hp
        self.hp: float = self.max_hp
        self.state = BUILT

    def on_damage(self):
        print('HIT')

    def update(self):
        pass

    def repair(self):
        pass

    def get_state_id(self):
        return self.state

    def get_local_coords_of_penetration(self, projectile: Body) -> coords:
        pen_angle = projectile.velocity.angle
        px, py = projectile.position
        sin = math.sin(pen_angle)
        cos = math.cos(pen_angle)
        tracer_line = LineString([(px - cos * 10, py - sin * 10), (px + cos * 10, py + sin * 10)])
        intersections = self.shape.intersection(tracer_line)
        mn = 10
        pen_coord = (0, 0)
        for coord in intersections.coords:
            dst = math.sqrt((px - coord[0]) ** 2 + (py - coord[1]) ** 2)
            if dst < mn:
                mn = dst
                pen_coord = coord

        return coords(pen_coord[0], -pen_coord[1])

    def piercing_damage_from_body(self, projectile: Body, size: float = 0.01):
        # print(dir(self.body))
        # print(dir(projectile))
        # if (not DO_FRIENDLY_FIRE) and projectile.master.sender.role == self.body.master.role: return
        self.piercing_damage_from_local_coords(self.get_local_coords_of_penetration(projectile),
                                               projectile.velocity.angle,
                                               size=size, speed=projectile.velocity.length, mass=projectile.mass * 10)

    def piercing_damage_from_local_coords(self, coord: coords, angle: float, size: float, speed: float, mass: float):
        self.on_damage()
        dmg = speed * mass * size * 10000
        self.hp -= dmg
        if round(self.hp,2) <= 0:
            self.state = CRUMBLED

    # def bottom_explosion_damage_from_body(self, projectile: Body, radius: float = 0.05):
    #     # print(dir(self.body))
    #     if (not DO_FRIENDLY_FIRE) and projectile.master.sender.role == self.body.master.role: return
    #     self.bottom_explosion_damage_from_local_coords(self.get_local_coords_of_penetration(projectile), radius=radius)
    #
    # def bottom_explosion_damage_from_local_coords(self, coord: coords, radius: float):
    #     self.on_damage()
    #     bottom_modules = []
    #     for module in self.modules:
    #         if module.level == BOTTOM:
    #             bottom_modules.append(module)
    #     if len(bottom_modules) == 0:
    #         return self.explosion_damage_from_local_coords(coord, radius=radius)
    #     print('========BOTTOM===========')
    #     for module in bottom_modules:
    #         module.explosion_damage(coord, radius=radius)
    #
    # def explosion_damage_from_local_coords(self, coord: coords, radius: float):
    #     self.on_damage()
    #     modules = []
    #     for module in self.modules:
    #         if module.level == DEFAULT:
    #             modules.append(module)
    #     for module in self.armor_modules:
    #         # if module.level == DEFAULT:
    #         modules.append(module)
    #     print('========DEFAULT============')
    #     for module in modules:
    #         module.explosion_damage(coord, radius=radius)
    #
    # def explosion_damage_from_body(self, projectile: Body, radius: float = 0.05):
    #     # print(dir(self.body))
    #     # if (not DO_FRIENDLY_FIRE) and projectile.master.sender.role == self.body.master.role: return
    #     self.explosion_damage_from_local_coords(self.get_local_coords_of_penetration(projectile), radius=radius)

    def get_total_hp(self):
        return self.hp
