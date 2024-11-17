from server.Types import coords
from shapely.geometry import Point, LineString
from server.Modules.RealModule import RealModule


class LineModule(RealModule):
    def __init__(self, coord0: coords, coord1: coords, width: float):
        line = LineString([(coord0.x, coord0.y), (coord1.x, coord1.y)]).buffer(width / 2)
        super().__init__(self.cof_hp_per_area * line.area)
        self.shape: LineString = line
        self.coord1 = coord1
        self.coord0 = coord0
