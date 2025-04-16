from server.Object import Object
from server.Types import coords
from typing import Tuple,Dict,List
# from server.Static.Buildings.Building import Building
from server.Static.Buildings.Building import Building
from server.Static.Buildings.HouseBuilding import HouseBuilding
from server.Static.Buildings.ContainerBuilding import ContainerBuilding
from server.Static.Buildings.ChimneyBuilding import ChimneyBuilding
from server.Static.Buildings.HangarBuilding import HangarBuilding
from server.Static.Buildings.CraneBuilding import CraneBuilding
from server.World import World


BuildingsTable = {
    0: HouseBuilding,
    1: ContainerBuilding,
    2: ChimneyBuilding,
    3: HangarBuilding,
    4: CraneBuilding
}


# TODO [SERVER] buildings class

class BuildingsGroup(Object):
    is_static = True

    def __init__(self, world:World, id: int, buildings: list, sp_bilding_links:Dict[int,List[Building]]):
        super().__init__()
        # print("!")
        self.id = id
        self.world = world
        self.raw_buildings = buildings
        self.buildings = []
        self.minbound = [1000, 1000]
        self.maxbound = [0, 0]
        self.buildings_string = ''
        for b in buildings:
            h = BuildingsTable[b[0]](world, b, sp_bilding_links)
            if h.x < self.minbound[0] and h.y < self.minbound[1]:
                self.minbound = [h.x, h.y]
            if h.x > self.maxbound[0] and h.y > self.maxbound[1]:
                self.maxbound = [h.x, h.y]
            self.buildings.append(h)
            # print('!')
        # print(buildings)
        self.minbound = coords(*self.minbound)
        self.maxbound = coords(*self.maxbound)
        # self.world.add_object(self)

    def remove_from_space(self):
        pass

    def update(self):
        f = False
        for b in self.buildings:
            f = f or b.update_return_is_changed()
        if f:
            self.buildings_string = ''
            for b in self.buildings:
                self.buildings_string += b.get_string()

    def get_bounds(self) -> Tuple[coords, coords]:
        return self.minbound, self.maxbound

    def get_public_info_string(self) -> str:
        return f'\n*,#,{self.id},{self.buildings_string}'
