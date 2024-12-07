from server.World import World
from server.Entities.Entity import Entity
from server.Types import coords
import pymunk
from server.constants import COLTYPE_VEHICLE,COLTYPE_PROJECTILE
from server.Vehicle.Vehicle import Vehicle


class Projectile(Entity):
    is_handled: bool = False
    handler_vehicles: pymunk.collision_handler.CollisionHandler = None
    handler_static: pymunk.collision_handler.CollisionHandler = None

    @staticmethod
    def on_vehicle_hit_begin(arbiter, space, data):
        # print(space)
        # print(data)
        s1, s2 = arbiter.shapes
        if s1.master.sender != s2.master:
            s1.master.hit_vehicle(s2.master)
            return True
        else:
            return False

    @staticmethod
    def on_static_hit_begin(arbiter, space, data):
        s1, s2 = arbiter.shapes
        s1.master.hit_static()
        return True

    def hit_vehicle(self, target:Vehicle):
        pass

    def hit_static(self):
        pass

    def __init__(self, world: World, sender:Vehicle, start_pos: coords, angle: float):
        super().__init__()
        self.world = world
        if not self.__class__.is_handled:
            self.__class__.handler_vehicles = self.world.space.add_collision_handler(COLTYPE_PROJECTILE, COLTYPE_VEHICLE)
            self.__class__.handler_vehicles.begin = self.on_vehicle_hit_begin
            self.__class__.handler_static = self.world.space.add_collision_handler(COLTYPE_PROJECTILE, 0)
            self.__class__.handler_static.begin = self.on_static_hit_begin
            self.__class__.is_handled = True
        self.sender = sender
        self.body = pymunk.Body()
        self.start_pos = start_pos
        self.body.position = start_pos.x, start_pos.y
        self.body.angle = angle
        self.is_active = True
        self.status = 0
        self.world.add_object(self)
        self.shape = None

    def remove_from_space(self):
        # pass
        self.world.space.remove(self.body)
        self.world.space.remove(self.shape)

    def update(self):
        if self.body.position.x > self.world.wh + 3 or self.body.position.x < -3 or self.body.position.y > self.world.wh + 3 or self.body.position.y < -3:
            self.is_active = False

    def get_world(self) -> World:
        return self.world

    def get_coords(self) -> coords:
        return coords(self.body.position.x, self.body.position.y)

    def get_public_info_string_on_appearance(self) -> str:
        return ''

    def get_public_info_string_on_disappearance(self) -> str:
        return ''

    def get_public_info_string(self) -> str:
        return ''

    def get_private_info_string(self) -> str:
        return ''
