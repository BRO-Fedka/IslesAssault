from server.Types import coords
from shapely.geometry import Point
from shapely.geometry.base import BaseGeometry
from server.constants import COF_EX_DMG_PER_AREA, COF_HP_PER_AREA, COF_MASS_PER_AREA
from server.Modules.Module import Module
from server.Vehicle.Contollers import HealthController
import math
import random


class RealModule(Module):
    cof_ex_dmg_per_area: float = COF_EX_DMG_PER_AREA
    cof_hp_per_area: float = COF_HP_PER_AREA
    cof_mass_per_area: float = COF_MASS_PER_AREA

    def __init__(self, hp):
        super().__init__()
        print(hp, self.__class__.__name__)
        self.hp: float = hp
        self.max_hp: int = hp
        self.shape: BaseGeometry = None
        self.is_destroyed = False

    def on_destroy(self):
        pass

    def explosion_damage(self, coord: coords, radius: float):
        if self.is_destroyed:
            return
        dmgcircle = Point(coord).buffer(radius)
        intersection = self.shape.intersection(dmgcircle)
        if intersection.area > 0:
            self.hp -= intersection.area * self.cof_ex_dmg_per_area
            print(self.__class__.__name__)
            print(intersection.area * self.cof_ex_dmg_per_area)
            if self.hp <= 0:
                self.hp += intersection.area * self.cof_ex_dmg_per_area
                self.on_destroy()
                self.is_destroyed = True
                self.hp = 0
            print(self.hp, self.max_hp)

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

    def get_mass(self) -> float:
        return self.shape.area * self.cof_mass_per_area

    def get_indication_char(self) -> str:
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
        return self.get_indication_char()
