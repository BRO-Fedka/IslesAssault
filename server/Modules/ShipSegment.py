from server.Modules.PolygonModule import PolygonModule
from typing import Sequence
from server.Modules.Module import BOTTOM
from shapely.geometry import Polygon


class ShipSegment(PolygonModule):
    level = BOTTOM

    def __init__(self, poly: Sequence[Sequence[float]], capacity_per_area: float = 50):
        self.cof_mass_per_area /= 2
        super().__init__(poly)
        self.capacity_per_area = capacity_per_area
        self.capacity = capacity_per_area * self.shape.area
        self.water_fullness_cof = 0

    def update_module(self):
        self.water_fullness_cof += (1 - (self.hp / self.max_hp) ** 0.005)
        if self.water_fullness_cof > 1:
            self.water_fullness_cof = 1

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

    def get_mass(self) -> float:
        return super().get_mass() + self.capacity*self.water_fullness_cof
