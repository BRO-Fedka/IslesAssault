from server.Vehicle.Vehicle import Vehicle, World
import pymunk
import math
from server.constants import COLTYPE_VEHICLE, COL_ON_GROUND
from server.Modules.TankCannon import TankCannon
from server.Modules.TankEngine import TankEngine
from server.Modules.LeftTrack import LeftTrack
from server.Modules.RightTrack import RightTrack
from server.Modules.LeakySegment import LeakySegment
from server.Types import PlayerInputData
from server.Modules.GroundResistance import GroundResistance
from server.Modules.WaterResistance import WaterResistance
from server.Modules.Armor.ArmorIndication import ArmorIndication
from server.Vehicle.Contollers.MassController import MassController
from server.Modules.OverloadIndication import OverloadIndication
from server.Modules.RepairKit import RepairKit
from server.Vehicle.Contollers.LevelController import LevelController

POLY_SHAPE = [(0.03, 0.02), (0.03, -0.02), (-0.03, -0.02), (-0.03, 0.02)]
POLY_SHAPE_N = [(1, 0), (0, -1), (-1, 0), (0, 1)]
RES_POLY_SHAPE = [(0.03, 0.02),(0.03, 0), (0.03, -0.02), (0, -0.02), (-0.03, -0.02), (-0.03, 0), (-0.03, 0.02), (0, 0.02)]
RES_POLY_SHAPE_N = [(1, 0), (1, 0), (0, -1), (0, -1), (-1, 0), (-1, 0), (0, 1), (0, 1)]
TRACK_L = [(-0.03,0.015),(-0.03,0.0225),(0.03,0.0225),(0.03,0.015)]
TRACK_R = [(-0.03,-0.015),(-0.03,-0.0225),(0.03,-0.0225),(0.03,-0.015)]
ENG = [(-0.03,0.01),(-0.015,0.01),(-0.015,-0.01),(-0.03,-0.01)]
VEHICLE_ID: int = 1


# TODO [SERVER] Tank

class Tank(Vehicle):
    def __init__(self, world: World, color_id: int = 0, tracer_id: int = 1):
        super().__init__(world, color_id, tracer_id)
        self.shape = pymunk.Poly(self.body, POLY_SHAPE)
        # print(self.shape.area)
        self.shape.filter = COL_ON_GROUND
        world.space.add(self.body, self.shape)
        self.vehicle_type_id = VEHICLE_ID
        self.shape.master = self
        self.shape.collision_type = COLTYPE_VEHICLE
        # fueltank1 = ShipFuelTank(FUEL1)
        # fueltank2 = ShipFuelTank(FUEL2)
        # fueltank3 = ShipFuelTank(FUEL3)
        # shellstorage = ShipShellStorage(AMM, self.health_controller)
        # segment1 = ShipSegment(SEG1)
        # segment2 = ShipSegment(SEG2)
        # segment3 = ShipSegment(SEG3)
        engine = TankEngine(ENG)
        self.mass_controller = MassController(self.shape)
        self.level_controller = LevelController(self,self.shape,self.world,self.mass_controller,z=1, w=True, g=True)
        self.modules = [

            TankCannon(0.005, 0, self.world, self.body),
            engine,
            LeftTrack(self.body,TRACK_L,engine, self.level_controller),
            RightTrack(self.body, TRACK_R, engine, self.level_controller),
            GroundResistance(RES_POLY_SHAPE, RES_POLY_SHAPE_N, self.body, max_speed=0.1, level_controller=self.level_controller),
            WaterResistance(RES_POLY_SHAPE, RES_POLY_SHAPE_N, self.body, max_speed=0.1, level_controller=self.level_controller),
            LeakySegment(POLY_SHAPE,self.level_controller,capacity_per_area=30),
            ArmorIndication(self.health_controller.armor_modules),
            OverloadIndication(self.mass_controller),
            RepairKit(self.health_controller)

        ]
        self.health_controller.update_params(1000, self.modules, POLY_SHAPE,self.level_controller)
        self.mass_controller.update_params(self.modules)
        self.body.position = 5, 6

    def get_public_info_string(self) -> str:
        return super().get_public_info_string()

    # def get_public_info_string_on_appearance(self) -> str:
    #     return ''
    #
    # def get_public_info_string_on_disappearance(self) -> str:
    #     return ''

    def get_private_info_string(self) -> str:
        return super().get_private_info_string()

    def update_input(self, input: PlayerInputData):
        super().update_input(input)
