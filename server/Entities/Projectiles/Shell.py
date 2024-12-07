from server.World import World
from server.Types import coords
import pymunk
import math
from server.constants import COL_ON_GROUND, COLTYPE_PROJECTILE

from server.Entities.Projectiles.Projectile import Projectile
from server.Vehicle.Vehicle import Vehicle
import datetime


class Shell(Projectile):

    def hit_vehicle(self, target: Vehicle):
        self.status = 1
        self.is_active = False

    def hit_static(self):
        self.status = 2
        self.is_active = False

    def __init__(self, world: World, sender: Vehicle, start_pos: coords, angle: float, speed=1, width=4):
        super().__init__(world, sender, start_pos, angle)
        self.speed = speed
        self.shape = pymunk.Circle(self.body, 0.001)
        self.shape.filter = COL_ON_GROUND
        self.world.space.add(self.body, self.shape)
        self.body.velocity = (math.cos(angle) * speed, math.sin(angle) * speed)
        self.body.mass = 0.01
        self.shape.mass = 0.01
        self.shape.collision_type = COLTYPE_PROJECTILE
        self.shape.master = self
        self.status = 2
        self.start_dt = datetime.datetime.now()
        self.width = width

    def update(self):
        super().update()
        if self.status == 2 and (datetime.datetime.now() - self.start_dt).total_seconds() > 0.5:
            self.status = 0

    def get_public_info_string_on_appearance(self) -> str:
        # f'\n>,{_},{(start_x)},{start_y},{dir},{status},{Z},{ spd},{w}'
        return f'\n#,c,0,{self.id},{self.start_pos.x},{self.start_pos.y},{self.body.angle / math.pi * 180},{self.status},{self.speed},{self.width}'

    def get_public_info_string_on_disappearance(self) -> str:
        return f'\n#,d,0,{self.id},{self.status}'

    def get_public_info_string(self) -> str:
        return ''

    def get_private_info_string(self) -> str:
        return ''
