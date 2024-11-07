from server.Types import PlayerInputData
from server.Modules.PolygonModule import PolygonModule
from server.World import World
from typing import Sequence
from shapely .geometry import Polygon


class SmokeGenerator(PolygonModule):
    def __init__(self, world: World, poly: Sequence[Sequence[float]], amount=0):
        super().__init__(poly)
        self.max_amount = amount
        self.amount = amount
        self.world = world

    def update_module_input(self, input: PlayerInputData):
        if input.second_weapon:
            print('SMOKE')


    def get_private_info_string(self) -> str:
        return super().get_private_info_string()+f'{self.amount},'

    def on_destroy(self):
        self.amount = 0
        #TODO SMOKE EXPLOSION