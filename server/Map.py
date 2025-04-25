from server.World import World
import json
from server.Spawnpoint import Spawnpoint
from server.Static.BuildingsGroup import BuildingsGroup
from server.Static.Beach import Beach
from server.Static.Stone import Stone
from server.Static.Concrete import Concrete
from server.Static.Bridge import Bridge
from server.Role import Role
import logging


class Map(World):
    def __init__(self, map_path):
        self.spawnpoints = []
        self.roles = {
            'R': Role('R', 'USSR','#f00'),
            'B': Role('B', 'USA','#00f')
        }
        self.data = json.load(open(map_path))
        super().__init__(self.data['WH'])
        for line in self.data['_']:
            self.add_object(Bridge(self, line))
        for poly in self.data['B']:
            self.add_object(Beach(self, poly))
        for poly in self.data['S']:
            self.add_object(Stone(self, poly))
        for poly in self.data['C']:
            self.add_object(Concrete(self, poly))

        sp_bilding_links = {}

        i = 0
        for group in self.data['#']:
            b = BuildingsGroup(self, i, group, sp_bilding_links)
            self.add_object(b)
            i += 1
        proto_sp = {}
        print(sp_bilding_links)
        for sp in self.data['$']:
            # [0, 6.0, 5.87, "#0000ff", "Blue seaport", "B", 45]
            if not sp[4] in proto_sp.keys():
                proto_sp[sp[4]] = {"ids": [], 'poses': [], 'cl': sp[3], 'role': sp[5]}
            proto_sp[sp[4]]['ids'].append(sp[0])
            proto_sp[sp[4]]['poses'].append([sp[1], sp[2], sp[6]])

        for _ in range(0, len(proto_sp.keys())):
            sp_name = list(proto_sp.keys())[_]
            try:
                if 'Blue' in sp_name:
                    proto_sp[sp_name]['role'] = 'B'
                if 'Red' in sp_name:
                    proto_sp[sp_name]['role'] = 'R'
                if 'seaport' in sp_name:
                    proto_sp[sp_name]['role'] = 'R'
                if proto_sp[sp_name]['role'] == 'N':
                    role = None
                else:
                    role = self.roles[proto_sp[sp_name]['role']]
                self.spawnpoints.append(
                    Spawnpoint(proto_sp[sp_name]['ids'], proto_sp[sp_name]['poses'], proto_sp[sp_name]['cl'], sp_name,
                               role, sp_bilding_links))
            except:
                logging.exception('')

    def get_resps_for_role_as_json(self, role: str):
        print('send resps for', role)
        json_str = '{'
        for _ in range(0, len(self.spawnpoints)):
            if self.spawnpoints[_].role is None:
                json_str += '"' + str(_) + '":' + self.spawnpoints[_].get_as_json(active=False) + ','
            else:
                json_str += '"' + str(_) + '":' + self.spawnpoints[_].get_as_json(active=self.spawnpoints[_].role.symbol == role) + ','
        json_str = json_str[:-1] + '}'
        if len(json_str) == 1:
            json_str = '{}'
        return json_str

    def update(self):
        super().update()
        for sp in self.spawnpoints:
            sp.update()
            for r in self.roles.items():
                r[1].intelligence_enemy_map_marks.append(sp.get_map_mark())

        for r in self.roles.items():
            r[1].update()
