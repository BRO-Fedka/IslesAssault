from server.World import World
from server.Object import Object
from server.Types import coords, PlayerInputData
import pymunk
import math
from server.Modules.Module import Module
from typing import List
from server.Vehicle.Contollers.HealthController import HealthController
from server.Vehicle.Contollers.MassController import MassController
from server.IdManager import IdManager
from server.Vehicle.Contollers.LevelController import LevelController


class Vehicle(Object):
    id_manager: IdManager = IdManager()

    def __init__(self, world: World, color_id: int = 0, tracer_id: int = 1):
        self.world = world
        self.color_id = color_id
        self.tracer_id = tracer_id
        self.body = pymunk.Body()
        self.body.master = self
        self.shape = None
        self.vehicle_type_id = '?'
        self.id = self.id_manager.get_id()
        self.body.position = 7, 7
        self.modules: List[Module] = []
        self.name = ""
        self.health_controller: HealthController = HealthController(self.body)
        self.mass_controller: MassController = None
        self.level_controller: LevelController = None
        self.world.add_object(self)

    def kill(self):
        self.is_active = False

    def get_z(self):
        return self.level_controller.get_z()

    def remove_from_space(self):
        self.world.space.remove(self.body)
        self.world.space.remove(self.shape)

    def update(self):
        self.level_controller.update()
        self.mass_controller.update()
        self.health_controller.update(self)
        self.update_modules()

    def update_input(self, input: PlayerInputData):
        self.update_modules_input(input)

    def update_modules(self):

        for module in self.modules:
            try:
                module.update_module(self)
            except:
                pass

    def update_modules_input(self, input: PlayerInputData):
        # print(input)
        for module in self.modules:
            try:
                module.update_module_input(input)
            except:
                pass

    def get_world(self) -> World:
        return self.world

    def get_coords(self) -> coords:
        return coords(self.body.position.x, self.body.position.y)

    def get_public_info_string_on_appearance(self) -> str:
        return self.get_public_info_string()

    def get_public_info_string_on_disappearance(self) -> str:
        string = f'\n+,{self.id},!,{self.vehicle_type_id},{self.name},{self.color_id},{self.health_controller.get_total_hp()},{self.body.angle / math.pi * 180},{int(self.body.position.x * 1000) / 1000},{int(self.body.position.y * 1000) / 1000},{self.level_controller.get_z()},'
        for string_of_module in map(lambda e: e.get_public_info_string(), self.modules):
            string += string_of_module

        return string

    def get_public_info_string(self) -> str:

        string = f'\n+,{self.id},{self.vehicle_type_id},{self.name},{self.color_id},{self.health_controller.get_total_hp()},{self.body.angle / math.pi * 180},{int(self.body.position.x * 1000) / 1000},{int(self.body.position.y * 1000) / 1000},{self.level_controller.get_z()},'
        for string_of_module in map(lambda e: e.get_public_info_string(), self.modules):
            string += string_of_module

        return string

    def get_private_info_string(self) -> str:
        # TODO {("[" + str(PlayersData[player]["TEAM"]) + "]") * int(not PlayersData[player]["TEAM"] is None) + player},{PlayersAccs[player]["money"]}
        # add to Player

        # If HP = -1, no health bar display

        # ID,veh_type_id,name,color,HP,dir,x,y

        string = f'{self.id},{self.vehicle_type_id},{self.name},{self.color_id},{self.health_controller.get_total_hp()},{(self.body.angle / math.pi * 180):.0f},{int(self.body.position.x * 1000) / 1000},{int(self.body.position.y * 1000) / 1000},{self.level_controller.get_z()},'
        for string_of_module in map(lambda e: e.get_private_info_string(), self.modules):
            string += string_of_module

        return string
