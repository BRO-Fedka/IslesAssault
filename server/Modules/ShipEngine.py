from pymunk import Body
from server.Types import PlayerInputData
from server.Modules.Module import Module
import math
from typing import List, Sequence
from server.Modules.Module import BOTTOM
from server.Modules.ShipFuelTank import ShipFuelTank
from shapely.geometry import Polygon

FORWARD = 1
STOP = 0
BACK = 2


class ShipEngine(Module):
    level: int = BOTTOM

    def __init__(self, body: Body, x_force:float, y_force:float, poly:Sequence[Sequence[float]], force:float=0.05, fueltanks: List[ShipFuelTank] = None, fueluse:float = 0):
        super().__init__()
        self.force = force
        self.poly_shape = Polygon(poly)
        self.body = body
        self.moving = STOP
        self.fueltanks = fueltanks
        self.fueluse = fueluse
        self.x = x_force
        self.y = y_force

    def update_module(self):

        if not self.fueltanks is None:
            for fueltank in self.fueltanks:
                if fueltank.get_fuel(self.fueluse) > 0:
                    break
            else:
                return 
        if self.moving == FORWARD:
            self.body.apply_force_at_local_point((self.force, 0), (self.x, self.y))
            # body.apply_force_at_local_point((self.force,0),(self.x,self.y))
        elif self.moving == BACK:
            self.body.apply_force_at_local_point((-self.force, 0), (self.x, self.y))

    def update_module_input(self, input: PlayerInputData):
        # if input.right:
        #     deg -= math.pi/6
        # body.apply_force_at_local_point((0, self.force), (self.x, self.y))
        # elif input.left:
        #     deg += math.pi/6
        # body.apply_force_at_local_point((0, -self.force), (self.x, self.y))
        if input.up:
            self.moving = FORWARD
            # body.apply_force_at_local_point((self.force,0),(self.x,self.y))
        elif input.down:
            self.moving = BACK
        else:
            self.moving = STOP
            # body.apply_force_at_local_point((-self.force,0),(self.x,self.y))
        # print(body.velocity.length)
