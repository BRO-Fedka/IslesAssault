from pymunk import Body
from server.Types import PlayerInputData


class Module:
    physical:bool = True

    def __init__(self):
        pass

    def update_module_return_hp(self,body: Body,input: PlayerInputData) -> int:
        pass

    def get_public_info_string(self) -> str:
        pass

    def get_private_info_string(self) -> str:
        pass
