from server.World import World
from server.Object import Object
from server.Types import coords, PlayerInputData
import pymunk
import math
from server.Modules.Module import Module
from typing import List
from server.Vehicle.Controllers.VehicleHealthController import VehicleHealthController
from server.Vehicle.Controllers.MassController import MassController
from server.IdManager import IdManager
from server.Vehicle.Controllers.LevelController import LevelController
from server.Role import Role
import logging
from server.Types import MessageParsingException
from server.constants import MARK_ID_VEHICLE
from shapely.geometry.base import BaseGeometry
from shapely.geometry import Polygon
import datetime


class NoPlaceForSpawn(Exception): pass


class Vehicle(Object):
    id_manager: IdManager = IdManager()
    vehicle_public_name: str = None
    def __init__(self, world: World, color_id: int = 0, tracer_id: int = 1, role=None, name=None):
        self.world = world
        self.color_id = color_id
        self.tracer_id = tracer_id
        self.body = pymunk.Body()
        self.body.master = self
        print(dir(self.body))
        self.shape = None
        self.shapely_shape: BaseGeometry = None
        self.role: Role = role
        self.vehicle_type_id = '?'
        self.id = self.id_manager.get_id()
        self.body.position = -10, -10
        self.modules: List[Module] = []
        self.name = name if (not name is None) else (role +' '+ self.vehicle_public_name) if (not self.vehicle_public_name is None) else role +' ' +self.__class__.__name__
        self.health_controller: VehicleHealthController = VehicleHealthController(self.body)
        self.mass_controller: MassController = None
        self.level_controller: LevelController = None
        self.world.add_object(self)
        self.input_keys = None
        self.comboboxes = None

    def set_spawn_pos(self, x, y, dir):
        print(x, y,dir)
        self.body.position = x, y
        self.body.angle = dir / 180 * math.pi
        # raise NoPlaceForSpawn

    def init_inputs(self):
        iks = set()
        for module in self.modules:
            if not module.input_keys:
                continue
            for input_key in module.input_keys:
                iks.add(input_key)
        self.input_keys = list(iks)
        self.input_keys.sort(key=lambda e: e.id)
        cbs = set()
        for module in self.modules:
            if not module.comboboxes:
                continue
            for cb in module.comboboxes:
                cbs.add(cb)
        lcbs = list(cbs)
        lcbs.sort(key=lambda e: e.id)
        self.comboboxes = []
        for _ in lcbs:
            self.comboboxes.append(_.copy())

    def kill(self):
        self.is_active = False

    def get_z(self):
        return self.level_controller.get_z()

    def remove_from_space(self):
        self.world.space.remove(self.body)
        self.world.space.remove(self.shape)

    def get_map_mark(self):
        return (MARK_ID_VEHICLE, round(self.body.position.x, 2), round(self.body.position.y, 2), datetime.datetime.now())

    def update(self):
        self.role.intelligence_ally_map_marks.append(self.get_map_mark())
        x = self.shape.body.position.x
        y = self.shape.body.position.y
        angle = self.shape.body.angle
        vertices = self.shape.get_vertices()
        rotated_vertices = map(lambda e: e.rotated(angle), vertices)
        points = list(map(lambda e: (e.x + x, e.y + y), rotated_vertices))
        self.shapely_shape = Polygon(points)
        self.level_controller.update()
        self.mass_controller.update()
        self.health_controller.update()
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
        # print(input.message)
        message = input.message
        for module in self.modules:
            try:
                module.update_module_input(input)
                message = module.parse_callback(message)
            except Exception as e:
                logging.exception('')
                if isinstance(e,MessageParsingException):
                    print('???')
                    self.kill()

    def get_world(self) -> World:
        return self.world

    def get_coords(self) -> coords:
        return coords(self.body.position.x, self.body.position.y)

    def get_public_info_string_on_appearance(self) -> str:
        return self.get_public_info_string()

    def get_public_info_string_on_disappearance(self) -> str:
        string = f'\n+,{self.id},!,{self.vehicle_type_id},{self.role.symbol},{self.name},{self.color_id},{self.health_controller.get_total_hp()},{self.body.angle / math.pi * 180},{int(self.body.position.x * 1000) / 1000},{int(self.body.position.y * 1000) / 1000},{self.level_controller.get_z()},'
        for string_of_module in map(lambda e: e.get_public_info_string(), self.modules):
            string += string_of_module

        return string

    def get_public_info_string(self) -> str:

        string = f'\n+,{self.id},{self.vehicle_type_id},{self.role.symbol},{self.name},{self.color_id},{self.health_controller.get_total_hp()},{self.body.angle / math.pi * 180},{int(self.body.position.x * 1000) / 1000},{int(self.body.position.y * 1000) / 1000},{self.level_controller.get_z()},'
        for string_of_module in map(lambda e: e.get_public_info_string(), self.modules):
            string += string_of_module

        return string

    def get_private_info_string(self) -> str:
        # TODO {("[" + str(PlayersData[player]["TEAM"]) + "]") * int(not PlayersData[player]["TEAM"] is None) + player},{PlayersAccs[player]["money"]}
        # add to Player

        # If HP = -1, no health bar display

        # ID,veh_type_id,name,color,HP,dir,x,y

        string = f'{self.id},{self.vehicle_type_id},{self.role.symbol},{self.name},{self.color_id},{self.health_controller.get_total_hp()},{(self.body.angle / math.pi * 180):.0f},{int(self.body.position.x * 1000) / 1000},{int(self.body.position.y * 1000) / 1000},{self.level_controller.get_z()},'
        for string_of_module in map(lambda e: e.get_private_info_string(), self.modules):
            string += string_of_module

        return string

    @classmethod
    def get_name(cls):
        return cls.__name__
