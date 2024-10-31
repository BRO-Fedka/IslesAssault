from server.Vehicle.Vehicle import Vehicle, World
import pymunk
import math
from server.constants import COL_ON_WATER
from server.Modules.MortarCannon import MortarCannon
from server.Modules.TorpedoFrontalTube import TorpedoFrontalTube
from server.Modules.SmokeGenerator import SmokeGenerator
from server.Modules.ShipSteering import ShipSteering
from server.Modules.WaterResistance import WaterResistance
from server.Modules.ShipEngine import ShipEngine
from server.Types import PlayerInputData
POLY_SHAPE = [(0.15, 0), (0, 0.06), (-0.15, 0.045), (-0.15, -0.045), (0, -0.06)]
POLY_SHAPE_N = [(0.06, 0.15), (-0.015, 0.15), (-1, 0), (-0.015, -0.15), (0.06, -0.15)]
VEHICLE_ID: int = 0


class Heavy(Vehicle):
    def __init__(self, world: World, color_id: int = 0, tracer_id: int = 1):
        super().__init__(world, color_id, tracer_id)
        self.shape = pymunk.Poly(self.body, POLY_SHAPE)
        self.shape.filter = COL_ON_WATER
        world.space.add(self.body, self.shape)
        self.vehicle_type_id = VEHICLE_ID
        self.body.mass = 1
        self.shape.mass = 1
        self.modules = [
            MortarCannon(),
            MortarCannon(),
            TorpedoFrontalTube(12),
            SmokeGenerator(5),
            ShipSteering(-0.15,0),
            WaterResistance(POLY_SHAPE, POLY_SHAPE_N, max_speed=0.1),
            ShipEngine(force=0.05)


        ]
        self.body.angle = -math.pi/2

    def get_public_info_string(self) -> str:
        return super().get_public_info_string()

    def get_public_info_string_on_appearance(self) -> str:
        return ''

    def get_public_info_string_on_disappearance(self) -> str:
        return ''

    def get_private_info_string(self) -> str:
        return super().get_private_info_string()

    def update_input(self, input: PlayerInputData):
        super().update_input(input)


