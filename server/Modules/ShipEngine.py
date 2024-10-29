from pymunk import Body
from server.Types import PlayerInputData
from server.Modules.Module import Module
import math


class ShipEngine(Module):
    physical = False

    def __init__(self, x=-0.15, y=0, force=0.05):
        super().__init__()
        self.force = force
        self.x = x
        self.y = y
        # TODO Liks to fueltanks

    def update_module_return_hp(self, body: Body, input: PlayerInputData) -> int:
        deg = 0
        # if input.right:
        #     deg -= math.pi/6
        # body.apply_force_at_local_point((0, self.force), (self.x, self.y))
        # elif input.left:
        #     deg += math.pi/6
        # body.apply_force_at_local_point((0, -self.force), (self.x, self.y))
        if input.up:
            body.apply_force_at_local_point((self.force, 0), (self.x, self.y))
            # body.apply_force_at_local_point((self.force,0),(self.x,self.y))
        elif input.down:
            body.apply_force_at_local_point((-self.force, 0), (self.x, self.y))
            # body.apply_force_at_local_point((-self.force,0),(self.x,self.y))
        # print(body.velocity.length)
        return 0

    def get_public_info_string(self) -> str:
        return ''

    def get_private_info_string(self) -> str:
        return ''
