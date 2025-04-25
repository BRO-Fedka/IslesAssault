from pymunk import Body
from server.Types import PlayerInputData, coords
from server.Modules.Module import Module
from server.constants import COF_WATER_RESISTANCE
import server.Modules.InputKeys.InputKeys as IK
import math
from server.World import World
from server.InteractiveObject import InteractiveObject
from shapely.geometry import Point
from typing import List
from server.Vehicle.Vehicle import Vehicle
import logging


class InteractionModule(Module):
    input_keys = [IK.INTERACT1, IK.INTERACT2]

    def __init__(self, world: World, vehicle: Vehicle):
        super().__init__()
        self.body = vehicle.body
        self.vehicle = vehicle
        self.world = world
        self.obj1: InteractiveObject = None
        self.obj2: InteractiveObject = None

    def update_module(self, vehicle):
        super().update_module(vehicle)
        cx, cy = self.body.position
        # print(self.body.position)
        # print(cx, cy)
        cx, cy = math.floor(cx), math.floor(cy)
        objects = set()
        for x in range(cx - 1, cx + 2):
            for y in range(cy - 1, cy + 2):
                # print(x,y)
                try:
                    for _ in self.world.get_objects_in_chunk(coords(x, y), True):
                        # if isinstance(_,Vehicle):
                        #     print('LOLOL')
                        if isinstance(_, InteractiveObject):
                            # print(type(_))
                            objects.add(_)
                except:
                    logging.exception('')
        intersected: List[InteractiveObject] = []
        objects = list(objects)
        for obj in objects:
            if obj.interaction_access_shape.intersects(Point(self.body.position.x,self.body.position.y)):
                # print(type(obj))
                intersected.append(obj)
        intersected.sort(key=lambda o: o.interaction_access_shape.centroid.distance(Point(self.body.position)))
        self.obj1 = None
        self.obj2 = None
        # TODO iterate and check
        if len(intersected) > 0:
            # print(intersected)
            self.obj1 = intersected[0]
            if len(intersected) > 1:
                self.obj2 = intersected[1]

    def get_private_info_string(self) -> str:
        str1 = ''
        str2 = ''
        if not self.obj1 is None:
            s = self.obj1.get_interaction_info(self.vehicle)
            if s:
                str1 = s
        if not self.obj2 is None:
            s = self.obj2.get_interaction_info(self.vehicle)
            if s:
                str2 = s

        return f'{str1},{str2},'

    def update_module_input(self, input: PlayerInputData):
        if IK.INTERACT1 in input.active_keys:
            if not self.obj1 is None and self.obj1.get_interaction_info(self.vehicle):
                self.obj1.interact(self.vehicle)
        elif IK.INTERACT2 in input.active_keys:
            if not self.obj2 is None and self.obj2.get_interaction_info(self.vehicle):
                self.obj2.interact(self.vehicle)
