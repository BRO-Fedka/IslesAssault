from server.Types import PlayerInputData, coords

DEFAULT = 0
BOTTOM = -1


class Module:
    level: int = DEFAULT

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

    def explosion_damage(self, coord: coords, radius: float):
        pass

    def get_hp(self) -> float:
        return 0

    def get_mass(self) -> float:
        return 0
