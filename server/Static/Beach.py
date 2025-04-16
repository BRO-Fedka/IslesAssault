from server.Static.PolyStaticObject import PolyStaticObject
from server.constants import COL_B, ACCESSABLE_GROUND
from server.World import World


class Beach(PolyStaticObject):
    def __init__(self, world:World, poly):
        super().__init__(world, poly)
        self.shape.type = ACCESSABLE_GROUND
        self.shape.filter = COL_B
        self.world.mpolygon_accessable_ground.append(self.poly_shape)
