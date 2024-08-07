import json
import os
import pymunk
from typing import Dict, Callable, List


def load_poly(space: pymunk.Space, polygons: List[List]):
    for poly in polygons:
        shape = pymunk.Poly(space.static_body, poly)
        shape.elasticity = 0.4
        shape.friction = 1.0
        space.add(shape)


MAP = os.environ["MAP"]
LOAD_METHODS: Dict[int, Dict[str, Callable]] = {
    0: {
        "B": load_poly,
        "S": load_poly
    },
    1: {
        "S": load_poly
    }
}


class Map:
    map: dict = {}

    def __init__(self, path: str = MAP):
        with open(path, 'r') as file:
            self.map = json.load(file)

    def load_layer(self, space: pymunk.Space, z: int = 0):
        for char in LOAD_METHODS[z].keys():
            LOAD_METHODS[z][char](space, self.map[char])
