from typing import List, Sequence
from server.Modules.Module import Module, BOTTOM, DEFAULT
from pymunk import Shape
from server.Types import coords
from shapely.geometry import Polygon, LineString
import math


class MassController:
    def __init__(self, shape: Shape):
        self.shape = shape
        self.modules: List[Module] = None

    def update_params(self,modules: List[Module]):
        self.modules = modules
        self.mass = 0
        for module in self.modules:
            self.mass += module.get_mass()
        self.shape.mass = self.mass
        self.default_mass = self.mass
        print(self.default_mass, 'def_mass')

    def update(self):
        cur_mass = self.shape.mass
        self.mass = 0
        for module in self.modules:
            self.mass += module.get_mass()
        if abs(cur_mass - self.mass) / self.mass > 0.01:
            print(self.mass)
            self.shape.mass = self.mass

    def get_overload(self) -> float:
        return self.mass/self.default_mass
