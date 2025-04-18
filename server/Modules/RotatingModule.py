from server.Modules.CircularModule import CircularModule, ModuleIsBroken, ModuleIsRepairing
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


class RotatingModule(CircularModule):
    r = 0.02
    rotation_speed = math.pi

    def __init__(self, x: float, y: float, body: Body):
        super().__init__(x, y, self.r)
        self.cursor_x = 0
        self.cursor_y = 0
        self.vehicle_direction = 0
        self.relative_direction = 0
        self.body = body

    def update_module_input(self, input: PlayerInputData):
        if self.is_repairing:
            raise ModuleIsRepairing
        dir_vec = self.body.rotation_vector.normalized()
        absx = -(self.y * dir_vec.y) + self.x * dir_vec.x
        absy = dir_vec.x * self.y + self.x * dir_vec.y
        self.cursor_x = input.cursor_x - absx
        self.cursor_y = input.cursor_y - absy

    def update_module(self, vehicle):
        super().update_module(vehicle)
        if self.is_repairing:
            raise ModuleIsRepairing
        rotation_speed = self.rotation_speed * self.hp / self.max_hp
        self.vehicle_direction = self.body.angle
        cos = math.cos((self.relative_direction + self.vehicle_direction))
        sin = math.sin((self.relative_direction + self.vehicle_direction))
        xy_dst = math.sqrt(self.cursor_x ** 2 + self.cursor_y ** 2)
        vec = pymunk.Vec2d(self.cursor_x, self.cursor_y)
        if xy_dst != 0:
            cos1 = (cos * self.cursor_x + sin * self.cursor_y) / xy_dst
            sin, cos = -cos, sin
            sin1 = (cos * self.cursor_x + sin * self.cursor_y) / xy_dst
            if sin1 < 0:
                self.relative_direction += rotation_speed
            else:
                self.relative_direction -= rotation_speed
            if math.asin(abs(sin1)) < rotation_speed and cos1 > 0:
                self.relative_direction = vec.angle - self.vehicle_direction

    def get_public_info_string(self) -> str:
        return super().get_public_info_string() + f'{(((self.relative_direction + self.vehicle_direction) / math.pi * 180) + 720) % 360:.0f},'

    def get_private_info_string(self) -> str:
        return super().get_private_info_string() + f'{(((self.relative_direction + self.vehicle_direction) / math.pi * 180) + 720) % 360:.0f},'

    def get_abs_direction(self) -> float:
        return self.body.angle + self.relative_direction
