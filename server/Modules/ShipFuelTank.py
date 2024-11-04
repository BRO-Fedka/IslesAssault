from server.Modules.PolygonModule import PolygonModule
from server.Modules.Module import BOTTOM
from typing import Sequence
from shapely.geometry import Polygon


class ShipFuelTank(PolygonModule):
    level: int = BOTTOM

    def __init__(self, poly: Sequence[Sequence[float]], capacity_per_area: float = 4):
        super().__init__(poly)
        self.shape = Polygon(poly)
        self.capacity_per_area = capacity_per_area
        self.capacity = capacity_per_area * self.shape.area
        self.fuel_fullness_cof = 1
        print(self.capacity)

    def update_module(self):
        self.fuel_fullness_cof -= (1 - (self.hp / self.max_hp) ** 0.005)
        if self.fuel_fullness_cof < 0:
            self.fuel_fullness_cof = 0

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

    def get_mass(self) -> float:
        return super().get_mass() + self.capacity * self.fuel_fullness_cof
