import pymunk
from typing import List
import asyncio
import os
import dotenv
dotenv.load_dotenv()
WORLD_TPS = int(os.environ['TPS'])


class World:
    collision_layers: List[pymunk.Space]

    def __init__(self):
        self.collision_layers = [
            pymunk.space.Space(),
            pymunk.space.Space(),
            pymunk.space.Space()
        ]
        for layer in self.collision_layers:
            layer.gravity = 0, 0

    async def init(self):
        await asyncio.sleep(1/WORLD_TPS)
        for layer in self.collision_layers:
            layer.step(1/WORLD_TPS)
