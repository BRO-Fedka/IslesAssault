from server.Types import PlayerInputData
from server.Modules.PolygonModule import PolygonModule
from server.World import World
from typing import Sequence
from server.Entities.Smoke import Smoke
import datetime
from server.Types import coords
from pymunk import Body


class SmokeGenerator(PolygonModule):
    def __init__(self, world: World, body: Body, poly: Sequence[Sequence[float]], amount=0):
        super().__init__(poly)
        self.max_amount = amount
        self.amount = amount
        self.world = world
        self.reload_timer = datetime.datetime.now()
        self.body = body

    def update_module_input(self, input: PlayerInputData):
        if self.is_repairing:
            return
        if input.second_weapon and (datetime.datetime.now() - self.reload_timer).total_seconds() > 5 and self.amount > 0:
            print('SMOKE')
            Smoke(self.world, self.body.master, coords(self.body.position.x, self.body.position.y))
            self.reload_timer = datetime.datetime.now()
            self.amount -= 1

    def get_private_info_string(self) -> str:
        return super().get_private_info_string() + f'{self.amount},'

    def on_destroy(self):
        self.amount = 0
        # TODO SMOKE EXPLOSION
