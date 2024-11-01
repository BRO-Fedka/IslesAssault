import pymunk
from typing import List, Set, Dict, Sequence
import asyncio
import os
import dotenv
import json
from server.constants import COL_B, COL_S, COL_C
from server.Types import coords
from server.Interfaces.Object import Object
import math
import logging

dotenv.load_dotenv()
WORLD_TPS = int(os.environ['TPS'])
Chunks = Dict[Sequence[int], Set[Object]]


class World:
    collision_layers: List[pymunk.Space]

    def __init__(self):
        self.space = pymunk.space.Space()
        self.space.gravity = 0, 0
        self.data = json.load(open("MAP.json"))
        self.wh = self.data['WH']
        self.Bs = []
        self._objects: Set[Object] = set()
        self.chunks_with_objects: Chunks = {}
        for x in range(0, self.wh):
            for y in range(0, self.wh):
                self.chunks_with_objects[(x, y)] = set()
        for poly in self.data['B']:
            pol = pymunk.Poly(self.space.static_body, poly)
            self.Bs.append(pol)
            pol.filter = COL_B
            self.space.add(pol)
        for poly in self.data['S']:
            pol = pymunk.Poly(self.space.static_body, poly)
            self.Bs.append(pol)
            pol.filter = COL_S
            self.space.add(pol)
        for poly in self.data['C']:
            pol = pymunk.Poly(self.space.static_body, poly)
            self.Bs.append(pol)
            pol.filter = COL_C
            self.space.add(pol)

    async def init(self):
        while True:
            await asyncio.sleep(1 / WORLD_TPS)
            self.space.step(1 / WORLD_TPS)
            for x in range(0, self.wh):
                for y in range(0, self.wh):
                    self.chunks_with_objects[(x, y)].clear()
            delarr = []
            for obj in self._objects:
                obj.update()
                coord: coords = obj.get_coords()
                # print(self.chunks_with_objects)
                try:
                    if obj.is_active:
                        self.chunks_with_objects[(math.floor(coord.x), math.floor(coord.y))].add(obj)
                    else:
                        obj.remove_from_space()
                        delarr.append(obj)
                except:
                    logging.exception('')
            for obj in delarr:
                self._objects.remove(obj)

    def get_objects_in_chunk(self, coord: coords):
        # print(math.floor(coord.x),math.floor(coord.y))
        try:
            return self.chunks_with_objects[(math.floor(coord.x), math.floor(coord.y))]
        except KeyError:
            return set()

    def add_object(self, obj: Object):
        self._objects.add(obj)
