from server.Types import coords
from shapely.geometry import Point
from shapely.geometry.base import BaseGeometry
from server.constants import COF_EX_DMG_PER_AREA, COF_HP_PER_AREA, COF_MASS_PER_AREA, COF_PR_DMG_PER_AREA, \
    COF_PIERCING_DURABILITY
from server.Modules.Module import Module
from server.Vehicle.Contollers import HealthController
import math
import random
from typing import Sequence


class RealModule(Module):
    cof_ex_dmg_per_area: float = COF_EX_DMG_PER_AREA
    cof_hp_per_area: float = COF_HP_PER_AREA
    cof_mass_per_area: float = COF_MASS_PER_AREA
    cof_pr_dmg_per_area: float = COF_PR_DMG_PER_AREA
    cof_piercing_durability: float = COF_PIERCING_DURABILITY

    def __init__(self, hp):
        super().__init__()
        print(hp, self.__class__.__name__)
        self.hp: float = hp
        self.max_hp: int = hp
        self.shape: BaseGeometry = None
        self.is_destroyed = False

    def on_destroy(self):
        pass

    def piercing_damage(self, intersection, coord: coords, size: float, speed: float, mass: float) -> Sequence[float]:
        # print(self.__class__.__name__)
        # print(speed*mass/size/self.cof_piercing_durability)
        if speed == 0 or mass == 0 or size == 0:
            return 0, 0, 0
        max_piercing_depth = speed * mass / size / self.cof_piercing_durability
        if max_piercing_depth == 0:
            return 0, 0, 0
        piercing_depth = max_piercing_depth
        if piercing_depth > intersection.length:
            piercing_depth = intersection.length
        # print(piercing_depth, max_piercing_depth)
        self.hp -= piercing_depth * self.cof_pr_dmg_per_area * size
        if self.hp <= 0:
            self.hp += piercing_depth * self.cof_pr_dmg_per_area * size
            self.on_destroy()
            self.is_destroyed = True
            self.hp = 0
        # print(self.hp, self.max_hp)
        # print(speed * piercing_depth / max_piercing_depth)
        return size, speed * (1-piercing_depth / max_piercing_depth), mass

    def explosion_damage(self, coord: coords, radius: float):
        if self.is_destroyed:
            return
        dmgcircle = Point(coord).buffer(radius)
        intersection = self.shape.intersection(dmgcircle)
        if intersection.area > 0:
            self.hp -= intersection.area * self.cof_ex_dmg_per_area
            # print(self.__class__.__name__)
            # print(intersection.area * self.cof_ex_dmg_per_area)
            if self.hp <= 0:
                self.hp += intersection.area * self.cof_ex_dmg_per_area
                self.on_destroy()
                self.is_destroyed = True
                self.hp = 0
            # print(self.hp, self.max_hp)

    def explode_bottom_randomly(self, hc: HealthController, minrad=0.02, maxrad=0.05, max_bangs=5):
        points = []
        bangs = math.ceil(self.hp / self.max_hp * max_bangs)
        minx, miny, maxx, maxy = self.shape.bounds
        while len(points) < bangs:
            pnt = Point(minx + (maxx - minx) * random.random(), miny + (maxy - miny) * random.random())
            if self.shape.contains(pnt):
                points.append(pnt)
        for pnt in points:
            r = minrad + (maxrad - minrad) * random.random()
            hc.bottom_explosion_damage_from_local_coords(coords(pnt.x, pnt.y), r)
            hc.explosion_damage_from_local_coords(coords(pnt.x, pnt.y), r / (1 + random.random()))

    def get_hp(self) -> float:
        return self.hp

    def get_rel_hp(self) -> float:
        return self.hp / self.max_hp

    def check_intersection(self, shape: BaseGeometry) -> bool:
        return shape.intersects(self.shape)

    def get_intersection(self, shape: BaseGeometry) -> BaseGeometry:
        return shape.intersection(self.shape)

    def get_mass(self) -> float:
        return self.shape.area * self.cof_mass_per_area

    def get_indication_char_private(self) -> str:
        hp = self.get_rel_hp()
        if hp > 0.9:
            return '0'
        elif hp > 0.5:
            return '1'
        elif hp > 0:
            return '2'
        else:
            return '3'

    def get_indication_char_public(self) -> str:
        hp = self.get_rel_hp()
        if hp > 0.9:
            return '0'
        elif hp > 0.5:
            return '1'
        elif hp > 0:
            return '2'
        else:
            return '3'

    def get_private_info_string(self) -> str:
        return self.get_indication_char_private()

    def get_public_info_string(self) -> str:
        return self.get_indication_char_public()
