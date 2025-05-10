class InputKey:
    def __init__(self, id: int, name: str, def_char: int):
        self.id = id
        self.name = name
        self.def_char = def_char
        self.is_pressed = False

    def __str__(self):
        return f'[{self.id},{self.name},{self.def_char},{self.is_pressed}]'

    def __repr__(self):
        return f'[{self.id},{self.name},{self.def_char},{self.is_pressed}]'

    def __eq__(self, other):
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)
