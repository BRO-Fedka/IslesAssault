from server.Static.PolyStaticObject import PolyStaticObject
from server.constants import COL_S, INDESTRUCTIBLE
from server.World import World

class Stone(PolyStaticObject):
    def __init__(self, world:World, poly):
        super().__init__(world, poly)
        self.shape.type = INDESTRUCTIBLE
        self.shape.filter = COL_S
