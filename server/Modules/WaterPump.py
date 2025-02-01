from pymunk import Body
from server.Types import PlayerInputData
from server.Modules.PolygonModule import PolygonModule
import math
from typing import List, Sequence
from server.Modules.Module import BOTTOM
from server.Modules.ShipSegment import ShipSegment
from shapely.geometry import Polygon

FORWARD = 1
STOP = 0
BACK = 2


class WaterPump(PolygonModule):
    repair_priority = 2

    def __init__(self, poly: Sequence[Sequence[float]], segments: List[ShipSegment] = None,
                 water_per_tick: float = 0.001):
        super().__init__(poly)
        self.water_per_tick = water_per_tick
        self.segments = segments

    def update_module(self,vehicle):
        super().update_module(vehicle)
        if self.is_repairing:
            return
        if not self.segments is None:
            amount = self.water_per_tick * ((self.hp / self.max_hp - 1) ** 13 + 1)
            for segment in self.segments:
                amount -= segment.get_water(amount)
