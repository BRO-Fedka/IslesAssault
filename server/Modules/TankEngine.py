from pymunk import Body
from server.Types import PlayerInputData
from server.Modules.PolygonModule import PolygonModule
from typing import List, Sequence
from server.Modules.Module import BOTTOM
from server.Modules.ShipFuelTank import ShipFuelTank
from server.Modules.ShipSegment import ShipSegment
from shapely.geometry import Polygon


# ShipSegment !!!
class EngineDoesNotWork(Exception):
    pass


class TankEngine(PolygonModule):

    def is_working(self) -> bool:
        return True
