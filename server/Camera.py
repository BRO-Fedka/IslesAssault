from server.Types import coords
from server.Interfaces.I_ProcessedByCamera import I_ProcessedByCamera
from typing import Set
from server.World import World


class Camera:
    observable: I_ProcessedByCamera = None

    def __init__(self, observable: I_ProcessedByCamera, world:World):
        self.observable:I_ProcessedByCamera = observable
        self.visible_objects: Set[I_ProcessedByCamera] = set()
        self.world = world

        self.z = 0

    def get_picture(self) -> str:
        string = f'{self.z},'+self.observable.get_private_info_string()
        coord = self.observable.get_coords()
        new_visible_objects = set()
        for x in range(-2,3):
            for y in range(-2,3):
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
