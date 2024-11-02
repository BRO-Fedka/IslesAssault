from server.Modules.Module import Module
from server.Modules.Module import BOTTOM
from typing import Sequence
from shapely.geometry import Polygon


class ShipShellStorage(Module):
    level: int = BOTTOM

    def __init__(self, poly: Sequence[Sequence[float]], shells: int = 200):
        super().__init__()
        self.cof_ex_dmg_per_area *= 50
        self.poly_shape = Polygon(poly)
        self.shells = shells

    def get_shell(self):
        if self.shells > 0:
            self.shells -= 1
            return 1
        else:
            return 0

    def get_shells_amount(self) -> int:
        return self.shells
