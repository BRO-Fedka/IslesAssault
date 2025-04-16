from server.Object import Object
import pymunk
from shapely.geometry import Polygon
from server.Types import coords
from server.Static.StaticMockHealthController import StaticMockHealthController
from server.World import World


class PolyStaticObject(Object):
    def __init__(self, world:World, poly):
        self.world = world
        self.poly = poly
        self.shape = pymunk.Poly(self.world.space.static_body, poly)
        self.shape.mass = 0.1
        self.shape.master = self
        self.health_controller = StaticMockHealthController()
        self.world.space.add(self.shape)
        self.poly_shape = Polygon(list(map(lambda e: (e[0], e[1]), poly)))

    def get_coords(self) -> coords:
        return coords(0, 0)
