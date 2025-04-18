from server.Modules.RotatingModule import RotatingModule, ModuleIsBroken, ModuleIsRepairing
import datetime
from server.World import World
from server.Types import coords
import math
from pymunk import Body
from server.Types import PlayerInputData
import math
from typing import List
import pymunk
from server.Modules.ShipShellStorage import ShipShellStorage, NoShellsLeft


class Cannon(RotatingModule):
    r = 0.02
    repair_priority = 4
    rotation_speed = math.pi
    reload_time = 0

    def __init__(self, x: float, y: float, world: World, body: Body, shellstorages: List[ShipShellStorage] = None):
        super().__init__(x, y, body)
        self.status = 0
        self.reload_start = datetime.datetime.now()
        self.shellstorages = shellstorages
        self.world = world

    def fire(self):
        if self.hp == 0:
            raise ModuleIsBroken
        if not self.shellstorages is None:
            for shellstorage in self.shellstorages:
                if shellstorage.get_shell() > 0:
                    break
            else:
                raise NoShellsLeft
        self.status = (self.status + 1) % 2
        self.reload_start = datetime.datetime.now()

    def update_module_input(self, input: PlayerInputData):
        super().update_module_input(input)
        if input.mouse_0 and (datetime.datetime.now() - self.reload_start).total_seconds() > (2 - 1 * (
                self.hp / self.max_hp)) * self.reload_time:
            self.fire()

    def get_public_info_string(self) -> str:
        return super().get_public_info_string() + f'{self.status}'

    def get_private_info_string(self) -> str:
        return super().get_private_info_string() + f'{self.status}'

    def get_center_abs_x(self) -> float:
        return self.body.position.x + math.cos(self.body.angle) * self.x - math.sin(self.body.angle) * self.y

    def get_center_abs_y(self) -> float:
        return self.body.position.y + math.sin(self.body.angle) * self.x + math.cos(self.body.angle) * self.y
