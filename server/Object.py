from typing import Protocol
from server.Types import coords


class Object:
    is_active = True

    def remove_from_space(self):
        pass

    def update(self):
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

    def does_exists(self) -> bool:
        pass

    def get_z(self) -> int:
        return 0
