from pymunk import Body
from server.Types import PlayerInputData
from server.Modules.Module import Module
from server.constants import COF_WATER_RESISTANCE
import math


class ShipSteering(Module):
    physical = False

    def __init__(self, x, y, l=0.1, deg=5, passive_friction_cof=0.001):
        self.x = x
        self.y = y
        self.l = l
        self.deg = deg / 180 * math.pi
        self.passive_friction_cof = passive_friction_cof
        super().__init__()

    def update_module_return_hp(self, body: Body, input: PlayerInputData) -> int:
        deg = body.velocity.angle + math.pi - body.angle
        r_vec = (math.cos(deg) * COF_WATER_RESISTANCE * body.velocity.length ** 2,
                 math.sin(deg) * COF_WATER_RESISTANCE * body.velocity.length ** 2)
        friction = body.velocity.length ** 2 * COF_WATER_RESISTANCE * self.passive_friction_cof
        body.apply_force_at_local_point(
            (math.cos(deg) * friction, math.sin(deg) * friction),
            body.center_of_gravity)
        l_r_vec = COF_WATER_RESISTANCE * body.velocity.length ** 2
        n1 = (0, 1)
        n2 = (0, -1)
        if input.right:
            n1 = (math.sin(self.deg), math.cos(self.deg))
            n2 = (-math.sin(self.deg), -math.cos(self.deg))

        elif input.left:
            n1 = (math.sin(self.deg), -math.cos(self.deg))
            n2 = (-math.sin(self.deg), math.cos(self.deg))
        if body.velocity.length == 0:
            return 0
        cos1 = r_vec[0] * n1[0] + r_vec[1] * n1[1] / math.sqrt(
            r_vec[0] ** 2 + r_vec[1] ** 2) / math.sqrt(n1[0] ** 2 + n1[1] ** 2)
        if cos1 < 0:
            body.apply_force_at_local_point((n1[0] * cos1 * self.l*l_r_vec, n1[1] * cos1 * self.l*l_r_vec), (self.x, self.y))
        cos2 = r_vec[0] * n2[0] + r_vec[1] * n2[1] / math.sqrt(
            r_vec[0] ** 2 + r_vec[1] ** 2) / math.sqrt(n2[0] ** 2 + n2[1] ** 2)
        if cos2 < 0:
            body.apply_force_at_local_point((n2[0] * cos2 * self.l*l_r_vec, n2[1] * cos2 * self.l*l_r_vec), (self.x, self.y))

        return 0

    def get_public_info_string(self) -> str:
        return ''

    def get_private_info_string(self) -> str:
        return ''
