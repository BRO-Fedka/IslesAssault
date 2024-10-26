import pymunk
from typing import List
import asyncio
import os
import dotenv
import json
from server.constants import COL_B, COL_S, COL_C

dotenv.load_dotenv()
WORLD_TPS = int(os.environ['TPS'])


class World:
    collision_layers: List[pymunk.Space]

    def __init__(self):
        self.space = pymunk.space.Space()
        self.space.gravity = 0, 0
        self.data = json.load(open("MAP.json"))
        self.wh = self.data['WH']
        self.Bs = []
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
