from server.Static.PolyStaticObject import PolyStaticObject
from server.constants import COL_C, INACCESSABLE_GROUND
from server.World import World


class Concrete(PolyStaticObject):
    def __init__(self, world:World, poly):
        super().__init__(world, poly)
        self.shape.type = INACCESSABLE_GROUND
        self.shape.filter = COL_C
        self.world.mpolygon_inaccessable_ground.append(self.poly_shape)
