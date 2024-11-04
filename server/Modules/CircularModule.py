from shapely.geometry import Point
from server.Modules.RealModule import RealModule

DEFAULT = 0
BOTTOM = -1


class CircularModule(RealModule):

    def __init__(self, x:float,y:float,radius:float):
        circ = Point((x,y)).buffer(radius)
        super().__init__(self.cof_hp_per_area*circ.area)
        self.shape = circ
