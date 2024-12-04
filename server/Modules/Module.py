from server.Types import PlayerInputData, coords
from typing import Sequence
import asyncio

DEFAULT = 0
BOTTOM = -1


class Module:
    level: int = DEFAULT
    repair_priority: int = None
    is_repairable: bool = False

    def __init__(self):
        pass

    def update_module(self):
        pass

    def update_module_input(self, input: PlayerInputData):
        pass

    def get_public_info_string(self) -> str:
        return ""

    def get_private_info_string(self) -> str:
        return ""

    def piercing_damage(self, intersection, coord: coords, size: float, speed: float, mass: float) -> Sequence[float]:
        return 0, 0, 0

    def explosion_damage(self, coord: coords, radius: float):
        pass

    def check_intersection(self, shape) -> bool:
        return False

    def get_intersection(self, shape):
        return None

    def get_hp(self) -> float:
        return 0

    def get_rel_hp(self) -> float:
        return 0

    async def repair(self):
        pass

    def get_mass(self) -> float:
        return 0
