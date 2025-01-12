from server.Types import coords
from server.Object import Object
from typing import Set
from server.World import World


class Camera:
    observable: Object = None

    def __init__(self, observable: Object, world:World):
        self.observable:Object = observable
        self.visible_objects: Set[Object] = set()
        self.world = world

        self.z = 0

    def get_picture(self) -> str:
        self.z = self.observable.get_z()
        string = f'{self.z},'+self.observable.get_private_info_string()
        coord = self.observable.get_coords()
        new_visible_objects = set()
        for x in range(-4,5):
            for y in range(-3,4):
                new_visible_objects = new_visible_objects.union(self.world.get_objects_in_chunk(coords(coord.x+x,coord.y+y)))
        new_visible_objects.discard(self.observable)
        appeared_objects = new_visible_objects - self.visible_objects
        disappeared_objects = self.visible_objects - new_visible_objects
        objects = new_visible_objects.intersection(self.visible_objects)
        self.visible_objects = new_visible_objects
        for obj in objects:
            string += obj.get_public_info_string()
        for obj in appeared_objects:
            string += obj.get_public_info_string_on_appearance()
        for obj in disappeared_objects:
            string += obj.get_public_info_string_on_disappearance()
        return string
