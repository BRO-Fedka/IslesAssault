from server.World import World
from server.Entities.Entity import Entity
from server.Types import coords
import datetime
from server.Vehicle.Vehicle import Vehicle


class Smoke(Entity):
    def __init__(self, world: World, sender:Vehicle, start_pos: coords):
        super().__init__()
        self.world = world
        self.sender = sender
        self.coords = start_pos
        self.is_active = True
        self.world.add_object(self)
        self.start_time = datetime.datetime.now()

    def remove_from_space(self):
        pass

    def update(self):
        if (datetime.datetime.now()-self.start_time).seconds > 30:

            self.is_active = False

    def get_world(self) -> World:
        return self.world

    def get_coords(self) -> coords:
        return self.coords

    def get_public_info_string_on_appearance(self) -> str:
        return f'\n#,c,2,{self.id},{self.coords.x},{self.coords.y}'

    def get_public_info_string_on_disappearance(self) -> str:
        print('del')
        return f'\n#,d,2,{self.id}'

    def get_public_info_string(self) -> str:
        return ''
