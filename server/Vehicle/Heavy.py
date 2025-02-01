from server.Vehicle.Vehicle import Vehicle, World
import pymunk
import math
from server.constants import COL_ON_WATER, COLTYPE_VEHICLE
from server.Modules.MortarCannon import MortarCannon
from server.Modules.TorpedoFrontalTube import TorpedoFrontalTube
from server.Modules.SmokeGenerator import SmokeGenerator
from server.Modules.ShipSteering import ShipSteering
from server.Modules.WaterResistance import WaterResistance
from server.Modules.ShipEngine import ShipEngine
from server.Modules.ShipFuelTank import ShipFuelTank
from server.Modules.ShipShellStorage import ShipShellStorage
from server.Modules.ShipSegment import ShipSegment
from server.Types import PlayerInputData
from server.Modules.WaterPump import WaterPump
from server.Modules.Armor.ArmorIndication import ArmorIndication
from server.Vehicle.Contollers.MassController import MassController
from server.Modules.OverloadIndication import OverloadIndication
from server.Modules.RepairKit import RepairKit
from server.Vehicle.Contollers.LevelController import LevelController

POLY_SHAPE = [(0.15, 0), (0, 0.06), (-0.15, 0.045), (-0.15, -0.045), (0, -0.06)]
POLY_SHAPE_N = [(0.06, 0.15), (-0.015, 0.15), (-1, 0), (-0.015, -0.15), (0.06, -0.15)]
SEG1 = [(0.15,0),(0.05,-0.04),(0.05,0.04)]
SEG2 = [(0.05,-0.04),(0.05,0.04),(0, 0.06),(-0.05,0.055),(-0.05,-0.055),(0, -0.06)]
SEG3 = [(-0.05,-0.055),(-0.05,0.055),(-0.15,0.045),(-0.15,-0.045)]
ENG = [(-0.15,0.025),(-0.15,-0.025),(-0.05,-0.025),(-0.05,0.025)]
AMM = [(-0.05,0.05),(-0.02,0.05),(-0.02,-0.05),(-0.05,-0.05)]
TUBE = [(0.085,0.01),(0.085,-0.01),(0.135,-0.01),(0.135,0.01)]
FUEL1 = [(0.085,0.02),(0.085,-0.02),(0.06,-0.03),(0.06,0.03)]
FUEL2 = [(0,0.005),(0,0.055),(0.05,0.035),(0.05,0.005)]
FUEL3 = [(0,-0.005),(0,-0.055),(0.05,-0.035),(0.05,-0.005)]
PMP = [(0.075,0.015),(0.12,0.015),(0.12,-0.015),(0.075,-0.015)]
SMK = [(0.045,0.025),(0.075,0.025),(0.075,-0.025),(0.045,-0.025)]
VEHICLE_ID: int = 0


class Heavy(Vehicle):
    def __init__(self, world: World, color_id: int = 0, tracer_id: int = 1):
        super().__init__(world, color_id, tracer_id)
        self.shape = pymunk.Poly(self.body, POLY_SHAPE)
        # print(self.shape.area)
        self.shape.filter = COL_ON_WATER

        world.space.add(self.body, self.shape)
        self.vehicle_type_id = VEHICLE_ID
        self.shape.master = self
        self.shape.collision_type = COLTYPE_VEHICLE
        fueltank1 = ShipFuelTank(FUEL1)
        fueltank2 = ShipFuelTank(FUEL2)
        fueltank3 = ShipFuelTank(FUEL3)
        shellstorage = ShipShellStorage(AMM,self.health_controller)

        self.mass_controller = MassController(self.shape)
        self.level_controller = LevelController(self,self.shape, self.world, self.mass_controller, w=True)
        segment1 = ShipSegment(SEG1,self.level_controller)
        segment2 = ShipSegment(SEG2,self.level_controller)
        segment3 = ShipSegment(SEG3,self.level_controller)
        self.modules = [
            MortarCannon(0,0,self.world,self.body,shellstorages=[shellstorage]),
            MortarCannon(-0.1,0,self.world,self.body,shellstorages=[shellstorage]),
            TorpedoFrontalTube(self.health_controller,self.world, self.body,TUBE,12),
            SmokeGenerator(self.world,self.body,SMK,5),
            ShipSteering(self.body,-0.15,0),
            WaterResistance(POLY_SHAPE, POLY_SHAPE_N, self.body, max_speed=0.15),
            ShipEngine(self.body,-0.15,0,ENG,force=0.05,fueltanks=[fueltank1,fueltank2,fueltank3], segment=segment3,fueluse=0.0000003),

            WaterPump(PMP,segments=[segment1,segment2,segment3]),
            fueltank1,
            fueltank2,
            fueltank3,
            shellstorage,
            segment1,
            segment2,
            segment3,
            ArmorIndication(self.health_controller.armor_modules),
            OverloadIndication(self.mass_controller),
            RepairKit(self.health_controller)


        ]
        self.health_controller.update_params(1000,self.modules,POLY_SHAPE,self.level_controller)
        self.mass_controller.update_params(self.modules)

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


