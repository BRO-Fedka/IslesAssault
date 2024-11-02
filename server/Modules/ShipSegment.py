from server.Modules.Module import Module
from server.Modules.Module import BOTTOM
from typing import Sequence
from shapely.geometry import Polygon


class ShipSegment(Module):
    level: int = BOTTOM

    def __init__(self, poly: Sequence[Sequence[float]], capacity_per_area: float = 10000):
        super().__init__()

        self.poly_shape = Polygon(poly)
        self.capacity_per_area = capacity_per_area
        self.capacity = capacity_per_area * self.poly_shape.area
        self.water_fullness_cof = 0

    def get_water_fullness_cof(self):
        return self.water_fullness_cof

    def get_water(self, amount: float):
        amount = amount / self.capacity
        if self.water_fullness_cof > amount:
            self.water_fullness_cof -= amount
            return amount * self.capacity
        elif self.water_fullness_cof == 0:
            return 0
        else:
            w = self.water_fullness_cof
            self.water_fullness_cof = 0
            return w * self.capacity
