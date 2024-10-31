from typing import Protocol
from server.Types import coords


class I_ProcessedByCamera(Protocol):
    def update(self) -> coords:
        pass

    def get_coords(self) -> coords:
        pass

    def get_public_info_string(self) -> str:
        pass

    def get_public_info_string_on_appearance(self) -> str:
        pass

    def get_public_info_string_on_disappearance(self) -> str:
        pass

    def get_private_info_string(self) -> str:
        pass
