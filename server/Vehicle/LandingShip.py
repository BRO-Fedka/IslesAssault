from server.Vehicle.Vehicle import Vehicle, World, NoPlaceForSpawn
import pymunk
import math
from shapely.geometry import Point, LineString
from server.constants import COL_ON_WATER, COLTYPE_VEHICLE
from server.Modules.ShipSteering import ShipSteering
from server.Modules.WaterResistance import WaterResistance
from server.Modules.ShipEngine import ShipEngine
from server.Modules.ShipFuelTank import ShipFuelTank
from server.Modules.ShipSegment import ShipSegment
from server.Types import PlayerInputData
from server.Modules.WaterPump import WaterPump
from server.Modules.Armor.ArmorIndication import ArmorIndication
from server.Vehicle.Controllers.MassController import MassController
from server.Modules.OverloadIndication import OverloadIndication
from server.Modules.RepairKit import RepairKit
from server.Vehicle.Controllers.LevelController import LevelController
from server.functions import count_normals
from server.Vehicle.InteractiveVehicle import InteractiveVehicle
from server.Modules.PlaceForVehicle import PlaceForVehicle
from server.Modules.InteractionModule import InteractionModule
from server.Modules.MapModule import MapModule

POLY_SHAPE = [[-0.17, 0.045], [-0.12, 0.055], [0, 0.055], [0.105, 0.055], [0.155, 0.035], [0.17, 0], [0.155, -0.035],
              [0.105, -0.055], [0, -0.055], [-0.12, -0.055], [-0.17, -0.045]]
POLY_SHAPE_N = [(-0.01, 0.05), (-0.0, 0.12), (-0.0, 0.105), (0.02, 0.05), (0.035, 0.015), (0.035, -0.015),
                (0.02, -0.05), (-0.0, -0.105), (-0.0, -0.12), (-0.01, -0.05), (-0.09, 0.0)]
# POLY_SHAPE_N = count_normals(POLY_SHAPE)
# print(POLY_SHAPE_N)
SEG1 = [(-0.12, 0.055), (-0.07, 0.055), (-0.07, -0.055), (-0.12, -0.055), (-0.17, -0.045), (-0.17, 0.045),
        (-0.12, 0.055)]
SEG2 = [(0.0, 0.055), (0.055, 0.055), (0.055, -0.055), (0.0, -0.055), (-0.07, -0.055), (-0.07, 0.055), (0.0, 0.055)]
SEG3 = [(0.105, 0.055), (0.155, 0.035), (0.17, 0.0), (0.155, -0.035), (0.105, -0.055), (0.055, -0.055), (0.055, 0.055),
        (0.105, 0.055)]
ENG = [(-0.17, -0.025), (-0.17, 0.025), (-0.07, 0.025), (-0.07, -0.025)]
# FUEL1 = [(0.025,0.03),(0.025,0.07),(0.125,0.07),(0.125,0.03)]
# FUEL2 = [(-0.025,0.03),(-0.025,0.07),(-0.125,0.07),(-0.125,0.03)]
# FUEL3 = [(0.025,-0.03),(0.025,-0.07),(0.125,-0.07),(0.125,-0.03)]
# FUEL4 = [(-0.025,-0.03),(-0.025,-0.07),(-0.125,-0.07),(-0.125,-0.03)]
# PMP = [(0.16,0.03),(0.2,0.03),(0.2,-0.03),(0.16,-0.03)]
VEHICLE_ID: int = 3


class LandingShip(InteractiveVehicle):
    def __init__(self, world: World, color_id: int = 0, tracer_id: int = 1, role=None):
        super().__init__(world, color_id, tracer_id, role)
        self.shape = pymunk.Poly(self.body, POLY_SHAPE)
        # print(self.shape.area)
        self.shape.filter = COL_ON_WATER

        world.space.add(self.body, self.shape)
        self.vehicle_type_id = VEHICLE_ID
        self.shape.master = self
        self.shape.collision_type = COLTYPE_VEHICLE
        # fueltank1 = ShipFuelTank(FUEL1)
        # fueltank2 = ShipFuelTank(FUEL2)
        # fueltank3 = ShipFuelTank(FUEL3)
        # fueltank4 = ShipFuelTank(FUEL4)

        self.mass_controller = MassController(self.shape)
        self.level_controller = LevelController(self, self.shape, self.world, self.mass_controller, w=True)
        segment1 = ShipSegment(SEG1, self.level_controller)
        segment2 = ShipSegment(SEG2, self.level_controller)
        segment3 = ShipSegment(SEG3, self.level_controller)
        self.modules = [
            MapModule(self),
            InteractionModule(self.world, self),
            PlaceForVehicle(-0.075, 0.025, self.body),
            PlaceForVehicle(-0.075, -0.025, self.body),
            PlaceForVehicle(-0.005, 0.025, self.body),
            PlaceForVehicle(-0.005, -0.025, self.body),
            PlaceForVehicle(0.065, 0.025, self.body),
            PlaceForVehicle(0.065, -0.025, self.body),
            ShipSteering(self.body, -0.25, 0, 0.075),
            WaterResistance(POLY_SHAPE, POLY_SHAPE_N, self.body, max_speed=0.2),
            # fueltank1,fueltank2,fueltank3,fueltank4
            ShipEngine(self.body, -0.25, 0, ENG, force=0.015, fueltanks=None, segment=segment3, fueluse=0.0000003),
            # WaterPump(PMP,segments=[segment1,segment2,segment3]),
            # fueltank1,
            # fueltank2,
            # fueltank3,
            # fueltank4,
            segment1,
            segment2,
            segment3,
            ArmorIndication(self.health_controller.armor_modules),
            OverloadIndication(self.mass_controller),
            RepairKit(self.health_controller)

        ]
        self.health_controller.update_params(1000, self.modules, POLY_SHAPE, self.level_controller, on_kill=self.kill)
        self.mass_controller.update_params(self.modules)
        self.init_inputs()

    def set_spawn_pos(self, x, y, dir):
        super().set_spawn_pos(x, y, dir)
        self.body.angle += math.pi
        p = Point(x, y)
        for poly in self.world.mpolygon_accessable_ground + self.world.mpolygon_inaccessable_ground:
            if poly.intersects(p):
                raise NoPlaceForSpawn

    def update(self):
        super().update()
        # print(Point(self.body.position.x,self.body.position.y))
        self.interaction_access_shape = Point(self.body.position.x + math.cos(self.body.angle) * 0.17,
                                              self.body.position.y + math.sin(self.body.angle) * 0.17).buffer(
            0.055)  # +math.sin(self.body.angle)*0.17
        line = LineString([[self.body.position.x + math.cos(self.body.angle) * 0.15,
                            self.body.position.y + math.sin(self.body.angle) * 0.12],
                           [self.body.position.x - math.cos(self.body.angle) * 0.12,
                            self.body.position.y - math.sin(self.body.angle) * 0.15]]).buffer(0.04)
        self.interaction_access_shape = self.interaction_access_shape.union(line)
        # print(self.interaction_access_shape)

    # def get_interaction_info(self,vehicle:Vehicle) -> str:
    #     return 'LOL'

    # def interact(self, vehicle: Vehicle):
    #     print('INTER LS')

    def get_public_info_string(self) -> str:
        return super().get_public_info_string()

    def get_public_info_string_on_appearance(self) -> str:
        return super().get_public_info_string_on_appearance()

    def get_public_info_string_on_disappearance(self) -> str:
        return super().get_public_info_string_on_disappearance()

    def get_private_info_string(self) -> str:
        return super().get_private_info_string()

    def update_input(self, input: PlayerInputData):
        super().update_input(input)
