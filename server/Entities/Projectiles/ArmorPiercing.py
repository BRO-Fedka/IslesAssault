from server.Entities.Projectiles.Shell import Shell
from server.Vehicle.Vehicle import Vehicle


class ArmorPiercing(Shell):
    def hit_vehicle(self, target: Vehicle):
        super().hit_vehicle(target)
        target.health_controller.piercing_damage_from_body(self.body, size=0.01)
    # last_torpedo_id: int = 0
    #
    # def hit_vehicle(self, target: Vehicle):
    #     self.status = 1
    #     self.is_active = False
    #     target.health_controller.bottom_explosion_damage_from_body(self.body, radius=0.02)
    #
    # def hit_static(self):
    #     self.status = 1
    #     self.is_active = False
    #
    # def __init__(self, world: World, sender: Vehicle, start_pos: coords, angle: float, speed=0.225):
    #     super().__init__(world, sender, start_pos, angle)
    #     self.speed = speed
    #     self.shape = pymunk.Circle(self.body, 0.005)
    #     self.shape.filter = COL_ON_WATER
    #     self.world.space.add(self.body, self.shape)
    #     self.__class__.last_torpedo_id += 1
    #     self.id = self.__class__.last_torpedo_id
    #     self.body.velocity = (math.cos(angle) * speed, math.sin(angle) * speed)
    #     self.body.mass = 0.01
    #     self.shape.mass = 0.01
    #     self.shape.collision_type = COLTYPE_PROJECTILE
    #     self.shape.master = self
    #     self.status = 2
    #     self.start_dt = datetime.datetime.now()
    #
    # def update(self):
    #     if self.status == 2 and (datetime.datetime.now() - self.start_dt).total_seconds() > 0.5:
    #         self.status = 0
    #
    # def get_world(self) -> World:
    #     return self.world
    #
    # def get_coords(self) -> coords:
    #     return coords(self.body.position.x, self.body.position.y)
    #
    # def get_public_info_string_on_appearance(self) -> str:
    #     return f'\n<,{self.id},{self.start_pos.x},{self.start_pos.y},{self.body.angle / math.pi * 180},{self.status},{self.speed}'
    #
    # def get_public_info_string_on_disappearance(self) -> str:
    #     return f'\n<,{self.id},{self.status}'
    #
    # def get_public_info_string(self) -> str:
    #     return ''
    #
    # def get_private_info_string(self) -> str:
    #     return ''
