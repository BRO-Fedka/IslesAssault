from pymunk import Body
from server.Types import PlayerInputData
from server.Modules.Module import Module
from server.World import World


class SmokeGenerator(Module):
    def __init__(self, world:World, amount=0):
        super().__init__()
        self.max_amount = amount
        self.amount = amount
        self.world = world

    def update_module_input(self,input: PlayerInputData):
        if input.second_weapon:
            print('SMOKE')

    def get_public_info_string(self) -> str:
        return ''

    def get_private_info_string(self) -> str:
        return f',{self.amount}'
