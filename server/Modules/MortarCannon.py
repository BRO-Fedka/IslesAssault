from pymunk import Body
from server.Types import PlayerInputData
from server.Modules.Cannon import Cannon


class MortarCannon(Cannon):
    def __init__(self, shells=100):
        super().__init__()
        self.direction = 0
        self.status = 0
        self.max_shells = shells
        self.shells = shells

    def update_module_return_hp(self,body: Body,input: PlayerInputData) -> int:
        return 0

    def get_public_info_string(self) -> str:
        return f',{self.status}{self.direction}'

    def get_private_info_string(self) -> str:
        return f',{self.status}{self.direction},{self.shells}'
