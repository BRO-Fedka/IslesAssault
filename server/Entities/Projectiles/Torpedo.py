from server.World import World
from server.Types import coords
import pymunk
import math
from server.constants import COL_ON_WATER, COLTYPE_PROJECTILE
from server.Entities.Projectiles.Projectile import Projectile
from server.Vehicle.Vehicle import Vehicle
import datetime


class Torpedo(Projectile):

    def hit_vehicle(self, target: Vehicle):
        self.status = 1
        self.is_active = False
        target.health_controller.bottom_explosion_damage_from_body(self.body, radius=0.02)

    def hit_static(self):
        self.status = 1
        self.is_active = False

    def __init__(self, world: World, sender: Vehicle, start_pos: coords, angle: float, speed=0.225):
        super().__init__(world, sender, start_pos, angle)
        self.speed = speed
        self.shape = pymunk.Circle(self.body, 0.005)
        self.shape.filter = COL_ON_WATER
        self.world.space.add(self.body, self.shape)
        self.body.velocity = (math.cos(angle) * speed, math.sin(angle) * speed)
        self.body.mass = 0.01
        self.shape.mass = 0.01
        self.shape.collision_type = COLTYPE_PROJECTILE
        self.shape.master = self
        self.status = 2
        self.start_dt = datetime.datetime.now()

    def update(self):
        super().update()
        if self.status == 2 and (datetime.datetime.now() - self.start_dt).total_seconds() > 0.5:
            self.status = 0

    def get_world(self) -> World:
        return self.world

    def get_coords(self) -> coords:
        return coords(self.body.position.x, self.body.position.y)

    def get_public_info_string_on_appearance(self) -> str:
        return f'\n#,c,1,{self.id},{self.start_pos.x},{self.start_pos.y},{self.body.angle / math.pi * 180},{self.status},{self.speed},{8}'

    def get_public_info_string_on_disappearance(self) -> str:
        return f'\n#,d,1,{self.id},{self.status}'

    def get_public_info_string(self) -> str:
        return ''

    def get_private_info_string(self) -> str:
        return ''
