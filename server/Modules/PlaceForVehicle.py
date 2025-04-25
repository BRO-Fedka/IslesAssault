from server.Modules.InteractiveModule import InteractiveModule
from server.Vehicle.Vehicle import Vehicle
from server.Vehicle.Tank import Tank
from server.Vehicle.ConstructionVehicle import ConstructionVehicle
from typing import Sequence, Type
import math
import datetime


class PlaceForVehicle(InteractiveModule):
    def __init__(self, x, y, body, white_list: Sequence[Type] = (Tank, ConstructionVehicle), land_point=(0.2, 0)):
        super().__init__()
        self.x = x
        self.y = y
        self.white_list = white_list
        self.body = body
        self.carried_vehicle: Vehicle = None
        self.land_point = land_point
        self.timer = datetime.datetime.now()

    def update_module(self, vehicle: Vehicle):
        if not self.carried_vehicle.is_active:
            self.carried_vehicle = None
        if self.carried_vehicle:
            cos, sin = math.cos(self.body.angle), math.sin(self.body.angle)
            nx = -self.y * sin + self.x * cos + self.body.position.x
            ny = self.y * cos + self.x * sin + self.body.position.y
            self.carried_vehicle.body.position = nx, ny
            self.carried_vehicle.body.angle = self.body.angle
            if vehicle.get_z() == 0:
                self.carried_vehicle.level_controller.z = 1
                self.carried_vehicle.level_controller.update_block_flag = True

    def get_interaction_info(self, vehicle: Vehicle) -> str:
        # print('!')
        for v in self.white_list:
            if isinstance(vehicle,v):
                break
        else:
            return None
        if self.carried_vehicle == vehicle:
            return 'Get off board'
        if self.carried_vehicle is None:
            return 'Get on board'

        return None

    def interact(self, vehicle: Vehicle):
        if (datetime.datetime.now() - self.timer).seconds < 1:
            return
        self.timer = datetime.datetime.now()
        if self.carried_vehicle == vehicle:
            cos, sin = math.cos(self.body.angle), math.sin(self.body.angle)
            nx = -self.land_point[1] * sin + self.land_point[0] * cos + self.body.position.x
            ny = self.land_point[1] * cos + self.land_point[0] * sin + self.body.position.y
            self.carried_vehicle.body.position = nx, ny
            self.carried_vehicle = None

        elif self.carried_vehicle is None:
            self.carried_vehicle = vehicle
