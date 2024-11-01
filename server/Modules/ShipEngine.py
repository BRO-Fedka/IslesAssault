from pymunk import Body
from server.Types import PlayerInputData
from server.Modules.Module import Module
import math

FORWARD = 1
STOP = 0
BACK = 2


class ShipEngine(Module):
    physical = False

    def __init__(self, body: Body, x, y, force=0.05):
        super().__init__()
        self.force = force
        self.x = x
        self.y = y
        self.body = body
        self.moving = STOP
        # TODO Liks to fueltanks

    def update_module(self):
        if self.moving == FORWARD:
            self.body.apply_force_at_local_point((self.force, 0), (self.x, self.y))
            # body.apply_force_at_local_point((self.force,0),(self.x,self.y))
        elif self.moving == BACK:
            self.body.apply_force_at_local_point((-self.force, 0), (self.x, self.y))

    def update_module_input(self, input: PlayerInputData):
        deg = 0
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
