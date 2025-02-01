from server.Modules.ShipSegment import ShipSegment


class LeakySegment(ShipSegment):

    def update_module(self,vehicle):
        if not self.level_controller.get_z() in [-1,0]:
            self.water_fullness_cof -= 0.025
            if self.water_fullness_cof < 0:
                self.water_fullness_cof = 0
        else:
            self.water_fullness_cof += 0.025
            super().update_module(vehicle)
