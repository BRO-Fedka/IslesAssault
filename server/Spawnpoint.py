from server.Static.Buildings.Building import Building
from server.Static.Buildings.StorageBuilding import StorageBuilding
import random
from typing import Dict, List
from server.Role import Role
from server.constants import MARK_ID_BASE, MARK_ID_SP

Vehicles = {
    0: ['Battleship', "static/veh0.svg"],
    1: ['Tank', "static/veh1.svg"],
    2: ['Cargo ship', "static/veh2.svg"],
    3: ['Landing ship', "static/veh3.svg"],
    4: ['Construction vehicle', "static/veh4.svg"],

}


class NoVehiclesOfThisType(Exception):
    pass


class Spawnpoint:
    def __init__(self, ids: list, poses: list, color: str, name: str, role: Role,
                 sp_bilding_links: Dict[int, List[Building]]):
        # [0, 6.0, 5.87, "#0000ff", "Blue seaport", "B", 45]
        self.ids = ids
        self.poses = poses
        self.color = color
        self.name = name
        self.role = role
        if role is None:
            self.color = '#fff'
        else:
            self.color = self.role.color
        self.ico = ''
        self.content = {}
        self.vehicle_ids = {}
        for vid in Vehicles.keys():
            self.content[vid] = 0
        self.content[0] = 10
        self.content[1] = 10
        self.content[2] = 10
        self.content[3] = 10
        self.content[4] = 10
        self.cx = 0
        self.cy = 0
        for pos in self.poses:
            self.cx += pos[0]
            self.cy += pos[1]
        self.cx = self.cx / len(self.poses)
        self.cy = self.cy / len(self.poses)
        self.buildings = []
        self.storages = []
        for id in self.ids:
            if not id in sp_bilding_links.keys():
                continue
            for b in sp_bilding_links[id]:
                self.buildings.append(b)
                b.health_controller.role = role
                b.role = role
                if isinstance(b, StorageBuilding):
                    self.storages.append(b)
        for b in self.storages:
            for sb in self.storages:
                if b != sb:
                    b.related_buildings_hcs.append(sb.health_controller)
        # for b in self.storages:
        #     print(b.health_controller)
        if 'capital' in name.lower():
            # self.content[0] = 10
            self.ico = "static/mapmarks/flag.svg"
            self.map_mark_id = MARK_ID_BASE
        else:
            # self.content[1] = 3
            self.ico = "static/mapmarks/star.svg"
            self.map_mark_id = MARK_ID_SP

    def get_as_json(self, active=True):
        lst = '['
        for vid in self.content.keys():
            lst += f'["{Vehicles[vid][0]}",{vid},"{Vehicles[vid][1]}",{self.content[vid]}],'
        lst = lst[:-1] + ']'
        if self.role is None:
            self.color = '#fff'
        else:
            self.color = self.role.color

        return '{' + f'''"vehicles":{lst},
            "name":"{self.name}",
            "ico":"{self.ico}",
            "pos":[{self.cx},{self.cy}],
            "cl":"{self.color}",
            "active":{str(active).lower()}
        ''' + '}'

    def update(self):
        roles = set()
        for b in self.storages:
            roles.add(b.role)
        roles.discard(None)
        # print(roles)
        roles = list(roles)
        if len(roles) == 0:
            # if not self.role is None: print("LOL WTF")
            self.role = None
        else:
            # if self.role is None: print("SUCCES")
            self.role = roles[0]

    def get_map_mark(self):
        r = 'N'
        if self.role:
            r = self.role.symbol
        return (r,self.map_mark_id, round(self.cx, 1), round(self.cy, 1))

    def spawn(self, vehicle, id=-1):
        if self.content[id] == 0:
            raise NoVehiclesOfThisType
        poses = []
        for posid in range(0, len(self.poses)):
            try:
                pos = self.poses[posid]
                vehicle.set_spawn_pos(*pos)
                poses.append(pos)

            except:
                pass
        pos = poses[random.randint(0, len(poses) - 1)]
        vehicle.set_spawn_pos(*pos)
        self.content[id] -= 1
