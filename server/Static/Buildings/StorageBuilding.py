from server.Static.Buildings.Building import Building
from typing import Dict, List
from server.World import World


class StorageBuilding(Building):
    neutral = False

    def __init__(self, world: World, data: list, sp_bilding_links: Dict[int, List[object]]):
        super().__init__(world, data, sp_bilding_links)
        self.storage = []
