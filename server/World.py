import pymunk
from typing import List, Set, Dict, Sequence, Tuple
import asyncio
import os
import dotenv

from server.Types import coords
from server.Object import Object
import math
import datetime
import logging


dotenv.load_dotenv()
WORLD_TPS = int(os.environ['TPS'])
Chunks = Dict[Sequence[int], Set[Object]]


class World:
    collision_layers: List[pymunk.Space]

    def __init__(self, wh=32):
        self.space = pymunk.space.Space()
        self.space.gravity = 0, 0
        self.wh = wh
        self.mpolygon_accessable_ground = []
        self.mpolygon_inaccessable_ground = []
        self.mpolygon_bridge_ground = []
        self._objects: Set[Object] = set()
        self.chunks_with_objects: Chunks = {}
        self.chunks_with_static_objects: Chunks = {}
        for x in range(0, self.wh):
            for y in range(0, self.wh):
                self.chunks_with_objects[(x, y)] = set()
                self.chunks_with_static_objects[(x, y)] = set()

    def update(self):
        for x in range(0, self.wh):
            for y in range(0, self.wh):
                self.chunks_with_objects[(x, y)].clear()
        delarr = []
        for obj in self._objects:
            obj.update()
            # print('!')
            # coord: coords = obj.get_coords()
            bounds: Tuple[coords, coords] = obj.get_bounds()
            bounds: Tuple[int, int, int, int] = (
                math.floor(bounds[0].x), math.floor(bounds[0].y), math.floor(bounds[1].x), math.floor(bounds[1].y))
            try:
                if obj.is_active:
                    if not obj.is_static:
                        for x in range(bounds[0], bounds[2] + 1):
                            for y in range(bounds[1], bounds[3] + 1):
                                self.chunks_with_objects[x, y].add(obj)
                else:
                    obj.remove_from_space()
                    delarr.append(obj)
            except:
                logging.exception('')
        for obj in delarr:
            self._objects.remove(obj)
            # print(self._objects)
            # print(self.space.bodies)
            # for _ in self.space.shapes:
            #     print(_.body)
            # print(self.space.shapes)

    async def init(self):
        while True:
            start = datetime.datetime.now()
            # print('@')
            self.space.step(1 / WORLD_TPS)
            self.update()

            await asyncio.sleep(1 / WORLD_TPS - (datetime.datetime.now() - start).total_seconds())

    def get_objects_in_chunk(self, coord: coords):
        # print(math.floor(coord.x),math.floor(coord.y))
        try:
            return self.chunks_with_objects[(math.floor(coord.x), math.floor(coord.y))].union(
                self.chunks_with_static_objects[(math.floor(coord.x), math.floor(coord.y))])
        except KeyError:
            return set()

    def add_object(self, obj: Object):
        self._objects.add(obj)
        print('6')
        if obj.is_static:
            print('7')

            bounds: Tuple[coords, coords] = obj.get_bounds()
            print(bounds)
            bounds: Tuple[int, int, int, int] = (
                math.floor(bounds[0].x), math.floor(bounds[0].y), math.floor(bounds[1].x), math.floor(bounds[1].y))

            # try:
            for x in range(bounds[0], bounds[2] + 1):
                for y in range(bounds[1], bounds[3] + 1):
                    try:
                        self.chunks_with_static_objects[x, y].add(obj)
                    except KeyError:
                        pass
                    # print('g')
            # except:
            #     print('ERR')
            #     logging.exception('')


