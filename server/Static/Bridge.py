from server.Object import Object
from shapely.geometry import LineString
from server.Types import coords


class Bridge(Object):
    is_static = True
    def __init__(self, world, line):
        self.world = world
        self.line = LineString([(line[0], line[1]), (line[2], line[3])])
        self.shape = self.line.buffer(0.1875 / 2)
        self.world.mpolygon_bridge_ground.append(self.shape)

    def get_coords(self) -> coords:
        return coords(0,0)