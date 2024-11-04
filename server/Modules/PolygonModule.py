from shapely.geometry import Polygon
from server.Modules.RealModule import RealModule
from typing import Sequence

DEFAULT = 0
BOTTOM = -1


class PolygonModule(RealModule):

    def __init__(self, poly:Sequence[Sequence[float]]):
        poly = Polygon(poly)
        super().__init__(self.cof_hp_per_area*poly.area)
        self.shape: Polygon = Polygon(poly)

