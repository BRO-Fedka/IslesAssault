from Types import coords
from server.Interfaces.I_ProcessedByCamera import I_ProcessedByCamera


class Camera:
    observable: I_ProcessedByCamera = None

    def __init__(self, observable: I_ProcessedByCamera):
        self.observable = observable
        self.z = 0

    def get_picture(self) -> str:
        string = f'{self.z},'+self.observable.get_private_info_string()
        self.observable.get_world()
        return string
