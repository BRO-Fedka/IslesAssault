from pymunk import Body
from server.Types import PlayerInputData
from server.Modules.Module import Module
from server.constants import COF_WATER_RESISTANCE
import server.Modules.InputKeys.InputKeys as IK
import math

RIGHT = 2
LEFT = 1
STRAIGHT = 0


class ShipSteering(Module):
    input_keys = [IK.LEFT, IK.RIGHT]

    def __init__(self,body:Body, x, y, l=0.1, deg=5, passive_friction_cof=0.001):
        super().__init__()
        self.x = x
        self.y = y
        self.l = l
        self.body = body
        self.deg = deg / 180 * math.pi
        self.passive_friction_cof = passive_friction_cof
        self.direction = STRAIGHT

    def update_module(self,vehicle):
        super().update_module(vehicle)
        # print('4')
        deg = self.body.velocity.angle + math.pi - self.body.angle
        r_vec = (math.cos(deg) * COF_WATER_RESISTANCE * self.body.velocity.length ** 2,
                 math.sin(deg) * COF_WATER_RESISTANCE * self.body.velocity.length ** 2)
        friction = self.body.velocity.length ** 2 * COF_WATER_RESISTANCE * self.passive_friction_cof
        self.body.apply_force_at_local_point(
            (math.cos(deg) * friction, math.sin(deg) * friction),
            self.body.center_of_gravity)
        l_r_vec = COF_WATER_RESISTANCE * self.body.velocity.length ** 2
        n1 = (0, 1)
        n2 = (0, -1)
        if self.direction == RIGHT:
            n1 = (math.sin(self.deg), math.cos(self.deg))
            n2 = (-math.sin(self.deg), -math.cos(self.deg))

        elif self.direction == LEFT:
            n1 = (math.sin(self.deg), -math.cos(self.deg))
            n2 = (-math.sin(self.deg), math.cos(self.deg))
        if self.body.velocity.length == 0:
            return 0
        cos1 = r_vec[0] * n1[0] + r_vec[1] * n1[1] / math.sqrt(
            r_vec[0] ** 2 + r_vec[1] ** 2) / math.sqrt(n1[0] ** 2 + n1[1] ** 2)
        if cos1 < 0:
            self.body.apply_force_at_local_point((n1[0] * cos1 * self.l*l_r_vec, n1[1] * cos1 * self.l*l_r_vec), (self.x, self.y))
        cos2 = r_vec[0] * n2[0] + r_vec[1] * n2[1] / math.sqrt(
            r_vec[0] ** 2 + r_vec[1] ** 2) / math.sqrt(n2[0] ** 2 + n2[1] ** 2)
        if cos2 < 0:
            self.body.apply_force_at_local_point((n2[0] * cos2 * self.l*l_r_vec, n2[1] * cos2 * self.l*l_r_vec), (self.x, self.y))
        # print('!')

    def update_module_input(self, input: PlayerInputData):

        if IK.RIGHT in input.active_keys:
            self.direction = RIGHT

        elif IK.LEFT in input.active_keys:
            self.direction = LEFT
        else:
            self.direction = STRAIGHT
