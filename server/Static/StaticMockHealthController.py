
from pymunk import Body
from server.Types import coords
from server.HealthController import HealthController


class StaticMockHealthController(HealthController):
    def __init__(self):
        pass

    def on_damage(self):
        print('HIT')

    def update(self):
        pass

    def repair(self):
        pass

    def get_local_coords_of_penetration(self, projectile: Body) -> coords:
        pass

    def piercing_damage_from_body(self, projectile: Body, size: float = 0.01):
        self.on_damage()

    def piercing_damage_from_local_coords(self, coord: coords, angle: float, size: float, speed: float, mass: float):
        pass

    def bottom_explosion_damage_from_body(self, projectile: Body, radius: float = 0.05):
        self.on_damage()

    def bottom_explosion_damage_from_local_coords(self, coord: coords, radius: float):
        pass

    def explosion_damage_from_local_coords(self, coord: coords, radius: float):
        pass

    def explosion_damage_from_body(self, projectile: Body, radius: float = 0.05):
        self.on_damage()
