from server.Static.Buildings.StorageBuilding import StorageBuilding
from shapely.geometry import LineString
import math


class CraneBuilding(StorageBuilding):
    is_destructible = False
    is_flammable = False
    durability = 0.5  # 20

    def __init__(self, world, data, sp_bilding_links):
        super().__init__(world, data, sp_bilding_links)
        arm = LineString([[self.x, self.y], [self.x + math.cos(self.d / 180 * math.pi) * 0.35,
                                             self.y + math.sin(self.d / 180 * math.pi) * 0.35]]).buffer(0.01)
        self.interaction_access_shape = self.interaction_access_shape.union(arm)
