from server.Object import Object
from server.IdManager import IdManager


class Entity(Object):
    id_manager: IdManager = IdManager()

    def __init__(self):
        self.id = self.id_manager.get_id()
