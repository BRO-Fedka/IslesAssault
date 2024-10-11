import pymunk
import json
from server.StaticObject import StaticObject
from server.StaticObjects.Beach import Beach
from server.functions import get_finite_inherits


class World:
    def __init__(self, map_path: str):
        with open(map_path) as file:
            data = json.load(file)
        self.__available_map_components = get_finite_inherits(StaticObject)
        self.__wh = data['WH']
        for mc in self.__available_map_components:
            mc.init_all(data, self)

        self.space0:pymunk.Space = pymunk.Space()
        self.space0.gravity = 0, 0
