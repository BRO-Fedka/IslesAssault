class EntityIdManager:
    def __init__(self):
        self.last_id = 0

    def get_id(self) -> int:
        self.last_id += 1
        if self.last_id > 10000:
            self.last_id = 1
        return self.last_id
