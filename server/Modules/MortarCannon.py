from pymunk import Body
from server.Types import PlayerInputData
from server.Modules.Cannon import Cannon
import math
import pymunk
from server.Modules.ShipShellStorage import ShipShellStorage
from typing import List
import datetime


class MortarCannon(Cannon):
    r = 0.0375

    def __init__(self, x: float, y: float, body: Body, shellstorages: List[ShipShellStorage] = None,
                 rotation_speed=2 / 180 * math.pi):
        super().__init__(x, y)
        self.shellstorages = shellstorages
        self.ship_direction = 0
        self.rotation_speed = rotation_speed
        self.relative_direction = 0
        self.body = body

    def fire(self):
        if self.hp == 0:
            return
        super().fire()
        if not self.shellstorages is None:
            for shellstorage in self.shellstorages:
                if shellstorage.get_shell() > 0:
                    break
            else:
                return
        # TODO create Projectile
        # (fire)

    def update_module(self):
        # print('1')
        rotation_speed = self.rotation_speed * self.hp / self.max_hp
        self.ship_direction = self.body.angle
        cos = math.cos((self.relative_direction + self.ship_direction))
        sin = math.sin((self.relative_direction + self.ship_direction))
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
                self.relative_direction = vec.angle - self.ship_direction

    def update_module_input(self, input: PlayerInputData):
        self.cursor_x = input.cursor_x
        self.cursor_y = input.cursor_y
        if input.mouse_0 and (datetime.datetime.now() - self.reload_start).total_seconds() > 8 - 4 * (
                self.hp / self.max_hp):
            self.reload_start = datetime.datetime.now()
            self.fire()

    def get_public_info_string(self) -> str:
        return super().get_public_info_string() + f'{self.status}{(((self.relative_direction + self.ship_direction) / math.pi * 180) + 720) % 360:.0f},'

    def get_private_info_string(self) -> str:
        shells = 0
        if not self.shellstorages is None:
            for shellstorage in self.shellstorages:
                shells += shellstorage.get_shells_amount()
        else:
            shells = -1
        return super().get_private_info_string() + f'{self.status}{(((self.relative_direction + self.ship_direction) / math.pi * 180) + 720) % 360:.0f},{shells},'
