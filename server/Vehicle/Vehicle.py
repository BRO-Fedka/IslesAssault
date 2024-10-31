from server.World import World
from server.Interfaces.I_ProcessedByCamera import I_ProcessedByCamera
from server.Types import coords, PlayerInputData
import pymunk
import math
from server.Modules.Module import Module
from typing import List


class Vehicle(I_ProcessedByCamera):
    last_vehicle_id: int = 0

    def __init__(self, world: World, color_id: int = 0, tracer_id: int = 1):
        self.world = world
        self.color_id = color_id
        self.tracer_id = tracer_id
        self.body = pymunk.Body()
        self.shape = None
        self.vehicle_type_id = '?'
        self.__class__.last_vehicle_id += 1
        self.id = self.__class__.last_vehicle_id
        self.body.position = 1,1
        self.hp = 1
        self.x = 0
        self.y = 0
        self.modules: List[Module] = []
        self.name = ""
        self.world.add_object(self)

    def update(self) -> coords:
        return coords(self.body.position.x,self.body.position.y)

    def update_input(self, input: PlayerInputData):
        self.update_modules(input)

    def update_modules(self, input: PlayerInputData):
        for module in self.modules:
            self.hp += module.update_module_return_hp(self.body, input)

    def get_world(self) -> World:
        return self.world

    def get_coords(self) -> coords:
        return coords(self.body.position.x, self.body.position.y)

    def get_public_info_string_on_appearance(self) -> str:
        return ''

    def get_public_info_string_on_disappearance(self) -> str:
        return ''

    def get_public_info_string(self) -> str:
        # If HP = -1, no health bar display

        # ID,veh_type_id,name,color,HP,dir,x,y

        string = f'\n+,{self.id},{self.vehicle_type_id},{self.name},{self.color_id},{self.hp},{self.body.angle / math.pi * 180},{int(self.body.position.x * 1000) / 1000},{int(self.body.position.y * 1000) / 1000}'
        for string_of_module in map(lambda e: e.get_public_info_string(), self.modules):
            string += string_of_module

        return string

    def get_private_info_string(self) -> str:
        # TODO {("[" + str(PlayersData[player]["TEAM"]) + "]") * int(not PlayersData[player]["TEAM"] is None) + player},{PlayersAccs[player]["money"]}
        # add to Player

        # If HP = -1, no health bar display

        # ID,veh_type_id,name,color,HP,dir,x,y

        string = f'{self.id},{self.vehicle_type_id},{self.name},{self.color_id},{self.hp},{self.body.angle / math.pi * 180},{int(self.body.position.x * 1000) / 1000},{int(self.body.position.y * 1000) / 1000}'
        for string_of_module in map(lambda e: e.get_private_info_string(), self.modules):
            string += string_of_module

        return string
