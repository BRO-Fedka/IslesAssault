

class StaticObject:
    def __init__(self):
        pass

    @classmethod
    def init_all(cls, data, world):
        raise NotImplementedError
