from pymunk import Body
from server.Types import PlayerInputData
from server.Modules.PolygonModule import PolygonModule
from typing import List, Sequence
from server.Modules.Module import BOTTOM
from server.Modules.ShipFuelTank import ShipFuelTank
from server.Modules.ShipSegment import ShipSegment
from shapely.geometry import Polygon
import server.Modules.InputKeys.InputKeys as IK
FORWARD = 1
STOP = 0
BACK = 2


class ShipEngine(PolygonModule):
    level: int = BOTTOM
    repair_priority = 3
    input_keys = [IK.FORWARD,IK.BACKWARD]

    def __init__(self, body: Body, x_force:float, y_force:float, poly:Sequence[Sequence[float]], force:float=0.05, fueltanks: List[ShipFuelTank] = None, segment:ShipSegment= None, fueluse:float = 0):
        super().__init__(poly)
        self.force = force
        self.shape = Polygon(poly)
        self.body = body
        self.moving = STOP
        self.fueltanks = fueltanks
        self.fueluse = fueluse
        self.segment = segment
        self.x = x_force
        self.y = y_force

    def update_module(self,vehicle):
        super().update_module(vehicle)
        if self.is_repairing:
            return
        force = self.force * (min(self.hp/self.max_hp,1-self.segment.get_water_fullness_cof()))**0.25
        if not self.fueltanks is None:
            for fueltank in self.fueltanks:
                if fueltank.get_fuel(self.fueluse) > 0:
                    break
            else:
                return 
        if self.moving == FORWARD:
            self.body.apply_force_at_local_point((force, 0), (self.x, self.y))
        elif self.moving == BACK:
            self.body.apply_force_at_local_point((-force, 0), (self.x, self.y))

    def update_module_input(self, input: PlayerInputData):
        #print(input.active_keys)
        if IK.FORWARD in input.active_keys:
            self.moving = FORWARD
        elif IK.BACKWARD in input.active_keys:
            self.moving = BACK
        else:
            self.moving = STOP
