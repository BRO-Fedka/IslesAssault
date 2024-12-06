from pymunk import Body
from server.Types import PlayerInputData
from server.Modules.Cannon import Cannon
import math
import pymunk
from server.Modules.ShipShellStorage import ShipShellStorage
from typing import List
import datetime
from server.World import World
from server.Types import coords
from server.Entities.Projectiles.ArmorPiercing import ArmorPiercing


class MortarCannon(Cannon):
    r = 0.0375
    repair_priority = 4

    def __init__(self, x: float, y: float,world:World, body: Body, shellstorages: List[ShipShellStorage] = None,
                 rotation_speed=2 / 180 * math.pi):
        super().__init__(x, y)

        self.shellstorages = shellstorages
        self.ship_direction = 0
        self.rotation_speed = rotation_speed
        self.relative_direction = 0
        self.body = body
        self.world = world

    def fire(self):
        if self.hp == 0:
            return
        if not self.shellstorages is None:
            for shellstorage in self.shellstorages:
                if shellstorage.get_shell() > 0:
                    break
            else:
                return

        super().fire()
        ArmorPiercing(self.world, self.body.master, coords(self.body.position.x+math.cos(self.body.angle)*self.x-math.sin(self.body.angle)*self.y, self.body.position.y+math.sin(self.body.angle)*self.x+math.cos(self.body.angle)*self.y), self.body.angle+self.relative_direction)
        self.reload_start = datetime.datetime.now()

    def update_module(self):
        if self.is_repairing:
            return
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
        if self.is_repairing:
            return
        dir_vec = self.body.rotation_vector.normalized()
        absx = -(self.y*dir_vec.y) + self.x*dir_vec.x
        absy = dir_vec.x*self.y + self.x*dir_vec.y
        self.cursor_x = input.cursor_x - absx
        self.cursor_y = input.cursor_y - absy
        if input.mouse_0 and (datetime.datetime.now() - self.reload_start).total_seconds() > (2 - 1 * (
                self.hp / self.max_hp))*4:
            self.reload_start = datetime.datetime.now()
            self.fire()

    def get_public_info_string(self) -> str:
        return super().get_public_info_string() + f'{self.status}{(((self.relative_direction + self.ship_direction) / math.pi * 180) + 720) % 360:.0f},'

    def get_private_info_string(self) -> str:
        # shells = 0
        # if not self.shellstorages is None:
        #     for shellstorage in self.shellstorages:
        #         shells += shellstorage.get_shells_amount()
        # else:
        #     shells = -1
        return super().get_private_info_string() + f'{self.status}{(((self.relative_direction + self.ship_direction) / math.pi * 180) + 720) % 360:.0f},'
