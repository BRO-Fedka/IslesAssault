from pymunk import Body
from server.Types import PlayerInputData
from server.Modules.Module import Module
import math
from typing import List, Sequence
from server.Modules.Module import BOTTOM
from server.Modules.ShipSegment import ShipSegment
from shapely.geometry import Polygon

FORWARD = 1
STOP = 0
BACK = 2


class WaterPump(Module):
    level: int = BOTTOM

    def __init__(self, poly: Sequence[Sequence[float]], segments: List[ShipSegment] = None,
                 water_per_tick: float = 0.1):
        super().__init__()
        self.water_per_tick = water_per_tick
        self.poly_shape = Polygon(poly)
        self.segments = segments

    def update_module(self):
        if not self.segments is None:
            amount = self.water_per_tick
            for segment in self.segments:
                amount -= segment.get_water(amount)
