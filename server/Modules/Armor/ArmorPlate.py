from server.Types import coords
from shapely.geometry import Point, LineString
from shapely.geometry.base import BaseGeometry
from server.constants import COF_EX_DMG_PER_AREA, COF_HP_PER_AREA, COF_MASS_PER_AREA, COF_PR_DMG_PER_AREA, \
    COF_PIERCING_DURABILITY
from server.Modules.LineModule import LineModule
import math
import random
from typing import Sequence
import random


class ArmorPlate(LineModule):
    cof_ex_dmg_per_area: float = COF_EX_DMG_PER_AREA
    cof_hp_per_area: float = COF_HP_PER_AREA * 4
    cof_mass_per_area: float = 0
    cof_pr_dmg_per_area: float = COF_PR_DMG_PER_AREA
    cof_piercing_durability: float = COF_PIERCING_DURABILITY * 3

    def __init__(self, coord0: coords, coord1: coords, width: float):
        super().__init__(coord0, coord1, width)

    def on_destroy(self):
        print('PENETRATED')

    def piercing_damage(self, intersection, coord: coords, size: float, speed: float, mass: float) -> Sequence[float]:
        # print(self.__class__.__name__)
        # print(speed*mass/size/self.cof_piercing_durability)

        if self.hp == 0:
            return size, speed, mass
        if speed == 0 or mass == 0 or size == 0:
            return 0, 0, 0
        ln = ((self.coord1[0] - self.coord0[0]) ** 2 + (self.coord1[1] - self.coord0[1]) ** 2) ** 0.5
        cos = ((self.coord1[0] - self.coord0[0]) * (intersection.coords[1][0] - intersection.coords[0][0]) + (
                    self.coord1[1] - self.coord0[1]) * (intersection.coords[1][1] - intersection.coords[0][1])) / (
                          intersection.length * ln)
        print('cos', cos)
        max_piercing_depth = speed * mass / size / (self.cof_piercing_durability * (self.get_rel_hp() ** 0.2)) * (
                    1 - abs(cos))
        if max_piercing_depth == 0:
            return 0, 0, 0
        piercing_depth = max_piercing_depth
        if piercing_depth > intersection.length:
            piercing_depth = intersection.length
        print('pen', piercing_depth, max_piercing_depth)
        self.hp -= piercing_depth * self.cof_pr_dmg_per_area * size
        if self.hp <= 0:
            self.hp += piercing_depth * self.cof_pr_dmg_per_area * size
            self.on_destroy()
            self.is_destroyed = True
            self.hp = 0
        print('hp', self.hp, self.max_hp)
        print('spd', speed * (1 - piercing_depth / max_piercing_depth))
        return size, speed * (1 - piercing_depth / max_piercing_depth), mass

    def explosion_damage(self, coord: coords, radius: float):
        if random.random() > 0.5:
            super().explosion_damage(coord, radius)

    def get_indication_char_private(self) -> str:
        hp = self.get_rel_hp()
        if hp > 0:
            return '0'
        else:
            return '1'

    def get_indication_char_public(self) -> str:
        hp = self.get_rel_hp()
        if hp > 0:
            return '0'
        else:
            return '1'
