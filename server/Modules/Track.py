from pymunk import Body
from server.Types import PlayerInputData
from server.Modules.PolygonModule import PolygonModule, ModuleIsRepairing
from typing import List, Sequence
from server.Modules.Module import DEFAULT
from server.Modules.ShipFuelTank import ShipFuelTank, NoFuel
from server.Modules.ShipSegment import ShipSegment
from server.Modules.TankEngine import TankEngine, EngineDoesNotWork
from shapely.geometry import Polygon
from server.Vehicle.Contollers.LevelController import LevelController
import server.Modules.InputKeys.InputKeys as IK

FORWARD = 1
STOP = 0
BACK = 2


class Track(PolygonModule):
    level: int = DEFAULT
    repair_priority = 3
    input_keys = [IK.FORWARD, IK.BACKWARD, IK.LEFT, IK.RIGHT]

    def __init__(self, body: Body, poly: Sequence[Sequence[float]], engine: TankEngine,
                 level_controller: LevelController, force=0.05):
        super().__init__(poly)
        self.engine = engine
        self.shape = Polygon(poly)
        self.body = body
        self.moving = STOP
        self.force = force
        self.x = sum(map(lambda e: e[0], poly)) / len(poly)
        self.y = sum(map(lambda e: e[1], poly)) / len(poly)
        self.level_controller = level_controller

    def update_module(self, vehicle):
        super().update_module(vehicle)
        if self.is_repairing:
            raise ModuleIsRepairing
        force = self.force * (((self.hp / self.max_hp) ** 0.25) * 0.8 + 0.2)
        if self.level_controller.get_z() == 0:
            force = force / 10
        if not self.engine is None:
            if self.engine.is_working():
                pass
            else:
                raise EngineDoesNotWork
        if self.moving == FORWARD:
            self.body.apply_force_at_local_point((force, 0), (self.x, self.y))
        elif self.moving == BACK:
            self.body.apply_force_at_local_point((-force, 0), (self.x, self.y))

    def update_module_input(self, input: PlayerInputData):
        if input.up:
            self.moving = FORWARD
        elif input.down:
            self.moving = BACK
        else:
            self.moving = STOP
