from typing import Protocol, Tuple
from server.Types import coords


class Object:
    is_active = True
    is_static = False

    def remove_from_space(self):
        pass

    def update(self):
        pass

    def get_coords(self) -> coords:
        pass

    def get_bounds(self) -> Tuple[coords, coords]:
        return self.get_coords(), self.get_coords()

    def get_public_info_string(self) -> str:
        return ''

    def get_public_info_string_on_appearance(self) -> str:
        return self.get_public_info_string()

    def get_public_info_string_on_disappearance(self) -> str:
        return self.get_public_info_string()

    def get_private_info_string(self) -> str:
        return ''

    def does_exists(self) -> bool:
        pass

    def get_z(self) -> int:
        return 0
