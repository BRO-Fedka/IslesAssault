from pymunk import Body
from server.Types import PlayerInputData, coords
from shapely.geometry import Point
from shapely.geometry.base import BaseGeometry
from server.constants import COF_EX_DMG_PER_AREA

DEFAULT = 0
BOTTOM = -1


class Module:
    physical: bool = True
    level: int = DEFAULT
    cof_ex_dmg_per_area: float = COF_EX_DMG_PER_AREA

    def __init__(self):
        self.hp:float = 1
        self.max_hp:int = 1
        self.poly_shape: BaseGeometry = None

    def update_module(self):
        pass

    def update_module_input(self, input: PlayerInputData):
        pass

    def get_public_info_string(self) -> str:
        return ""

    def get_private_info_string(self) -> str:
        return ""

    def explosion_damage(self, coord: coords, radius: float):
        dmgcircle = Point(coord).buffer(radius)
        intersection = self.poly_shape.intersection(dmgcircle)
        if intersection.area > 0:
            print(self.__class__.__name__)
            print(intersection.area * self.cof_ex_dmg_per_area)
