from pymunk import Body
from server.Types import PlayerInputData, coords
from server.Modules.PolygonModule import PolygonModule
from server.Entities.Projectiles.Torpedo import Torpedo
from server.World import World
import datetime
from server.Modules.Module import BOTTOM
from typing import Sequence
from server.Vehicle.Contollers.HealthController import HealthController
from server.functions import prevent_recursion


class TorpedoFrontalTube(PolygonModule):
    level: int = BOTTOM

    def __init__(self, hc: HealthController, world: World, body: Body, poly: Sequence[Sequence[float]], amount=10):
        self.cof_hp_per_area *= 2
        super().__init__(poly)
        self.max_amount = amount
        self.amount = amount
        self.world = world
        self.reload_timer = datetime.datetime.now()
        self.body = body
        self.health_controller = hc

    def update_module_input(self, input: PlayerInputData):
        if input.first_weapon and (datetime.datetime.now() - self.reload_timer).total_seconds() > 5 and self.amount > 0:
            Torpedo(self.world, self.body.master, coords(self.body.position.x, self.body.position.y), self.body.angle)
            self.reload_timer = datetime.datetime.now()
            self.amount -= 1

    def get_public_info_string(self) -> str:
        return ''

    def get_private_info_string(self) -> str:
        return f',{self.amount}'

    @prevent_recursion
    def on_destroy(self):
        self.amount = 0
        self.explode_bottom_randomly(self.health_controller, minrad=0.04, maxrad=0.04, max_bangs=3)

    def get_mass(self) -> float:
        if self.is_destroyed: return 0
        return super().get_mass()*((self.amount/self.max_amount)*0.5+0.5)