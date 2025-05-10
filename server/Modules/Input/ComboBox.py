from typing import List


class ComboBox:
    def __init__(self, id: int, name: str, def_val: int, vals: List[List]):
        self.id = id
        self.name = name
        self.def_val = def_val
        self.vals = vals
        self.cur_val = False

    def copy(self):
        return self.__class__(self.id, self.name, self.def_val, self.vals)

    def __str__(self):
        return f'[{self.id},{self.name},{self.def_val},{self.cur_val}]'

    def __repr__(self):
        return f'[{self.id},{self.name},{self.def_val},{self.cur_val}]'

    def __eq__(self, other):
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
