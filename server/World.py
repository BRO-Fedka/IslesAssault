import pymunk
from typing import List, Set, Dict, Sequence
import asyncio
import os
import dotenv
import json
from server.constants import COL_B, COL_S, COL_C
from server.Types import coords
from server.Object import Object
from shapely.geometry import MultiPolygon, Polygon, LineString
import math
import datetime
import logging

dotenv.load_dotenv()
WORLD_TPS = int(os.environ['TPS'])
Chunks = Dict[Sequence[int], Set[Object]]

ACCESSABLE_GROUND = 0
INACCESSABLE_GROUND = 1
# BRIDGE_GROUND = 2
INDESTRUCTIBLE = 3
DESTRUCTIBLE = 4


class World:
    collision_layers: List[pymunk.Space]

    def __init__(self):
        self.space = pymunk.space.Space()
        self.space.gravity = 0, 0
        self.data = json.load(open("MAP.json"))
        self.wh = self.data['WH']
        self.Bs = []
        self.Ss = []
        self.Cs = []
        self.mpolygon_accessable_ground = []
        self.mpolygon_inaccessable_ground = []
        self.mpolygon_bridge_ground = []
        self.BuildingsBodies = []
        self._objects: Set[Object] = set()
        self.chunks_with_objects: Chunks = {}
        for x in range(0, self.wh):
            for y in range(0, self.wh):
                self.chunks_with_objects[(x, y)] = set()
        # line = LineString([(Bridges[_][0], Bridges[_][1]), (Bridges[_][2], Bridges[_][3])])
        # left_hand_side = line.buffer(0.1875 / 2, single_sided=True)
        # right_hand_side = line.buffer(-0.1875 / 2, single_sided=True)
        # Bridges[_].append(left_hand_side.union(right_hand_side))
        for line in self.data['_']:
            line = LineString([(line[0], line[1]), (line[2], line[3])])
            left_hand_side = line.buffer(0.1875 / 2, single_sided=True)
            right_hand_side = line.buffer(-0.1875 / 2, single_sided=True)
            self.mpolygon_bridge_ground.append(left_hand_side.union(right_hand_side))
        for poly in self.data['B']:
            pol = pymunk.Poly(self.space.static_body, poly)
            pol.mass = 0.1
            pol.type = ACCESSABLE_GROUND
            self.Bs.append(pol)
            pol.filter = COL_B
            self.space.add(pol)
            self.mpolygon_accessable_ground.append(Polygon(list(map(lambda e: (e[0], e[1]), poly))))
        # self.mpolygon_accessable_ground: MultiPolygon = MultiPolygon(self.mpolygon_accessable_ground)
        for poly in self.data['S']:
            pol = pymunk.Poly(self.space.static_body, poly)
            pol.mass = 0.1
            pol.type = INDESTRUCTIBLE
            self.Ss.append(pol)
            pol.filter = COL_S
            self.space.add(pol)
        for poly in self.data['C']:
            pol = pymunk.Poly(self.space.static_body, poly)
            pol.mass = 0.1
            pol.type = INACCESSABLE_GROUND
            self.Cs.append(pol)
            pol.filter = COL_C
            self.space.add(pol)
            self.mpolygon_inaccessable_ground.append(Polygon(list(map(lambda e: (e[0], e[1]), poly))))
        # self.mpolygon_inaccessable_ground: MultiPolygon = MultiPolygon(self.mpolygon_accessable_ground)
        for group in self.data['#']:
            # [0, 4.21, 9.99, 0.2, 0.2, 161]
            for house in group:
                x = house[1]
                y = house[2]
                w = house[3]
                h = house[4]
                d = house[5]
                body = pymunk.Body(body_type=pymunk.Body.STATIC, mass=1)
                pol = pymunk.Poly(body, [(-w / 2, -h / 2), (w / 2, -h / 2), (w / 2, h / 2), (-w / 2, h / 2)])
                pol.type = DESTRUCTIBLE
                pol.mass = 0.1
                # pol.m
                # body.position.
                body.position = x, y
                # body.update_position(body,0.01)
                # print(x,y,body.center_of_gravity)
                # pol.update()
                body.angle = d / 180 * math.pi
                pol.filter = COL_S
                self.BuildingsBodies.append(body)
                self.space.add(body, pol)

    async def init(self):
        while True:
            start = datetime.datetime.now()
            self.space.step(1 / WORLD_TPS)
            for x in range(0, self.wh):
                for y in range(0, self.wh):
                    self.chunks_with_objects[(x, y)].clear()
            delarr = []
            for obj in self._objects:
                obj.update()
                # print('!')
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
                print(self._objects)
                print(self.space.bodies)
                for _ in self.space.shapes:
                    print(_.body)
                # print(self.space.shapes)

            await asyncio.sleep(1 / WORLD_TPS - (datetime.datetime.now() - start).total_seconds())

    def get_objects_in_chunk(self, coord: coords):
        # print(math.floor(coord.x),math.floor(coord.y))
        try:
            return self.chunks_with_objects[(math.floor(coord.x), math.floor(coord.y))]
        except KeyError:
            return set()

    def add_object(self, obj: Object):
        self._objects.add(obj)
