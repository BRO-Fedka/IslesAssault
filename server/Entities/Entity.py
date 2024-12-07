from server.Object import Object
from server.Entities.EntityIdManager import EntityIdManager


class Entity(Object):
    id_manager: EntityIdManager = EntityIdManager()

    def __init__(self):
        self.id = self.id_manager.get_id()
