
class Role:
    def __init__(self, symbol, name, color):
        self.symbol = symbol
        self.name = name
        self.color = color
        self.intelligence_ally_map_marks = []
        self.intelligence_enemy_map_marks = []
        self.map_module_string = ''
        # self.marks

    def update(self):
        self.map_module_string = f'{len(self.intelligence_ally_map_marks ) +len(self.intelligence_enemy_map_marks)}'
        for mm in self.intelligence_ally_map_marks:
            self.map_module_string += f',{self.symbol},{",".join(map(str ,mm))}'
        for mm in self.intelligence_enemy_map_marks:
            if mm[0] is None:
                self.map_module_string += f',N,{",".join(map(str, mm[1:]))}'
            else:
                self.map_module_string += f',{",".join(map(str ,mm))}'
        self.intelligence_ally_map_marks = []
        self.intelligence_enemy_map_marks = []
