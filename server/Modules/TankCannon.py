from server.Modules.Cannon import Cannon
import math
from server.Types import coords
from server.Entities.Projectiles.ArmorPiercing import ArmorPiercing


class TankCannon(Cannon):
    r = 0.015
    rotation_speed = 4 / 180 * math.pi
    reload_time = 4

    def fire(self):
        super().fire()
        ArmorPiercing(self.world, self.body.master, coords(self.get_center_abs_x(),self.get_center_abs_y()),self.body.angle + self.relative_direction)



