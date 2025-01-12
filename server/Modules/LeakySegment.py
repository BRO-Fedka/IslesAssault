from server.Modules.ShipSegment import ShipSegment


class LeakySegment(ShipSegment):

    def update_module(self):
        if self.level_controller.get_z() != 0:
            self.water_fullness_cof -= 0.025
            if self.water_fullness_cof < 0:
                self.water_fullness_cof = 0
        else:
            self.water_fullness_cof += 0.025
            super().update_module()
