from server.Modules.PolygonModule import PolygonModule
from server.Modules.Module import BOTTOM
from server.Vehicle.Contollers.HealthController import HealthController
from shapely.geometry import Point
from typing import Sequence
from server.functions import prevent_recursion


class ShipShellStorage(PolygonModule):
    level: int = BOTTOM

    def __init__(self, poly: Sequence[Sequence[float]],hc:HealthController, shells: int = 200):
        super().__init__(poly)
        self.health_controller = hc
        self.shells = shells
        self.max_shells = shells

    @prevent_recursion
    def on_destroy(self):
        self.shells = 0
        self.explode_bottom_randomly(self.health_controller)

    def get_shell(self):
        if self.shells > 0:
            self.shells -= 1
            return 1
        else:
            return 0

    def get_shells_amount(self) -> int:
        return self.shells

    def get_mass(self) -> float:
        if self.is_destroyed: return 0
        return super().get_mass()*((self.shells/self.max_shells)*0.9+0.1)