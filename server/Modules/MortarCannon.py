from pymunk import Body
from server.Types import PlayerInputData
from server.Modules.Cannon import Cannon
import math
import pymunk


class MortarCannon(Cannon):
    def __init__(self,body:Body, shells=100, rotation_speed=2 / 180 * math.pi):
        super().__init__()
        self.ship_direction = 0
        self.status = 0
        self.max_shells = shells
        self.shells = shells
        self.rotation_speed = rotation_speed
        self.relative_direction = 0
        self.body = body
        self.cursor_x = 0
        self.cursor_y = 0

    def fire(self):
        if self.shells > 0:
            self.shells -= 1

    def update_module(self):
        # print('1')
        self.ship_direction = self.body.angle
        cos = math.cos((self.relative_direction + self.ship_direction))
        sin = math.sin((self.relative_direction + self.ship_direction))
        xy_dst = math.sqrt(self.cursor_x ** 2 + self.cursor_y ** 2)
        vec = pymunk.Vec2d(self.cursor_x, self.cursor_y)
        if xy_dst != 0:
            sin, cos = -cos, sin
            sin1 = (cos * self.cursor_x + sin * self.cursor_y) / xy_dst
            if sin1 < 0:
                self.relative_direction += self.rotation_speed
            else:
                self.relative_direction -= self.rotation_speed
            if math.asin(abs(sin1)) < self.rotation_speed:
                self.relative_direction = vec.angle - self.ship_direction

    def update_module_input(self, input: PlayerInputData):
        self.cursor_x = input.cursor_x
        self.cursor_y = input.cursor_y
        if input.mouse_0:
            self.fire()

    def get_public_info_string(self) -> str:
        return f',{self.status}{math.floor((self.relative_direction + self.ship_direction) / math.pi * 180)}'

    def get_private_info_string(self) -> str:
        return f',{self.status}{math.floor((self.relative_direction + self.ship_direction) / math.pi * 180)},{self.shells}'
