from typing import Protocol
from pymunk import Body
from server.Types import coords


class HealthController(Protocol):

    def on_damage(self):
        pass

    def update(self):
        pass

    def repair(self):
        pass

    def get_local_coords_of_penetration(self, projectile: Body) -> coords:
        pass

    def piercing_damage_from_body(self, projectile: Body, size: float = 0.01):
        pass

    def piercing_damage_from_local_coords(self, coord: coords, angle: float, size: float, speed: float, mass: float):
        pass

    def bottom_explosion_damage_from_body(self, projectile: Body, radius: float = 0.05):
        pass

    def bottom_explosion_damage_from_local_coords(self, coord: coords, radius: float):
        pass

    def explosion_damage_from_local_coords(self, coord: coords, radius: float):
        pass

    def explosion_damage_from_body(self, projectile: Body, radius: float = 0.05):
        pass

    def get_total_hp(self):
        pass
