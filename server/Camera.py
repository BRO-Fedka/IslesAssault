from Types import coords
from server.Interfaces.I_ProcessedByCamera import I_ProcessedByCamera


class Camera:
    observable: I_ProcessedByCamera = None

    def __init__(self, observable: I_ProcessedByCamera):
        self.observable = observable

    def get_picture(self) -> str:
        string = self.observable.get_private_info_string()
        #TODO [ I stopped here don't remember anything]
        return string
