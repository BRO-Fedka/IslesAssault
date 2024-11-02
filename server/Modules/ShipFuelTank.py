from server.Modules.Module import Module
from server.Modules.Module import BOTTOM
from typing import Sequence
from shapely.geometry import Polygon


class ShipFuelTank(Module):
    level: int = BOTTOM

    def __init__(self, poly: Sequence[Sequence[float]], capacity_per_area: float = 10000):
        super().__init__()
        self.poly_shape = Polygon(poly)
        self.capacity_per_area = capacity_per_area
        self.capacity = capacity_per_area * self.poly_shape.area
        self.fuel_fullness_cof = 1

    def get_fuel(self, amount: float):
        amount = amount / self.capacity
        if self.fuel_fullness_cof > amount:
            self.fuel_fullness_cof -= amount
            return amount * self.capacity
        elif self.fuel_fullness_cof == 0:
            return 0
        else:
            f = self.fuel_fullness_cof
            self.fuel_fullness_cof = 0
            return f * self.capacity
