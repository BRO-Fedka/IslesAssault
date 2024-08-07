from server.World import World
from server.Interfaces.I_ProcessedByCamera import I_ProcessedByCamera
from server.Types import coords


class Vehicle(I_ProcessedByCamera):
    x: float = None
    y: float = None

    def __init__(self, world: World, color_id: int = 0, tracer_id: int = 1):
        pass

    def get_coords(self) -> coords:
        return coords(self.x, self.y)
