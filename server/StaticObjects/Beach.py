from server.StaticObject import StaticObject
from typing import List, Tuple
from pymunk import Poly


class Beach(StaticObject):
    _instances = []

    def __init__(self, world, coords: List[Tuple[float, float]]):
        self._world = world
        self._instances.append(self)
        self._shape = Poly(world.space0.static_body, coords)
        world.space0.add(self._shape)

    @classmethod
    def init_all(cls, data, world):
        try:
            list_of_polys = data['B']
            for _ in list_of_polys:
                cls(world, list(map(tuple, _)))
        except KeyError:
            pass
