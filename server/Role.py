from server.constants import MARK_ID_POINT
import datetime


class Role:
    def __init__(self, symbol, name, color):
        self.symbol = symbol
        self.name = name
        self.color = color
        self.intelligence_ally_map_marks = []
        self.intelligence_enemy_map_marks = []
        self.observed_points = []
        self.map_module_string = ''
        # self.marks

    def update(self):
        self.map_module_string = f'{len(self.intelligence_ally_map_marks ) +len(self.intelligence_enemy_map_marks)}'
        for mm in self.intelligence_ally_map_marks:
            self.map_module_string += f',{self.symbol},{",".join(map(str ,mm[:-1]))}'
        self.observed_points = []
        for mm in self.intelligence_enemy_map_marks:
            if mm[1] == MARK_ID_POINT:
                self.observed_points.append(mm)
            if mm[0] is None:
                self.map_module_string += f',N,{",".join(map(str, mm[1:-1]))}'
            else:
                self.map_module_string += f',{",".join(map(str ,mm[:-1]))}'
        self.observed_points.sort(key=lambda e: (datetime.datetime.now()-e[-1]).total_seconds())
        self.intelligence_ally_map_marks = []
        self.intelligence_enemy_map_marks = []
