from pymunk import Body
from server.Types import PlayerInputData


class Module:
    physical:bool = True

    def __init__(self):
        pass

    def update_module(self):
        pass

    def update_module_input(self, input: PlayerInputData) :
        pass

    def get_public_info_string(self) -> str:
        return ""

    def get_private_info_string(self) -> str:
        return ""
