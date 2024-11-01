from pymunk import Body
from server.Types import PlayerInputData, coords
from server.Modules.Module import Module
from server.Entities.Projectiles.Torpedo import Torpedo
from server.World import World
import datetime
import math


class TorpedoFrontalTube(Module):
    def __init__(self, world:World, body:Body, amount=0):
        super().__init__()
        self.max_amount = amount
        self.amount = amount
        self.world = world
        self.reload_timer = datetime.datetime.now()
        self.body = body

    def update_module_input(self, input: PlayerInputData):
        if input.first_weapon and (datetime.datetime.now() - self.reload_timer).total_seconds() > 5 and self.amount > 0:
            Torpedo(self.world, self.body.master, coords(self.body.position.x, self.body.position.y), self.body.angle)
            self.reload_timer = datetime.datetime.now()
            self.amount -= 1

    def get_public_info_string(self) -> str:
        return ''

    def get_private_info_string(self) -> str:
        return f',{self.amount}'
