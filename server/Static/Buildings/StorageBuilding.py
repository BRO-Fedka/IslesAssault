from server.Static.Buildings.Building import Building
from typing import Dict, List
from server.World import World
from server.InteractiveObject import InteractiveObject
from server.Vehicle import Vehicle


class StorageBuilding(Building, InteractiveObject):
    neutral = False

    def __init__(self, world: World, data: list, sp_bilding_links: Dict[int, List[object]]):
        super().__init__(world, data, sp_bilding_links)
        self.storage = []
        world.add_object(self)
        self.interaction_access_shape = self.shape.buffer(0.1)

    def get_interaction_info(self,vehicle:Vehicle) -> str:
        return 'LOL'

    def interact(self, vehicle: Vehicle):
        print('INTER SP')