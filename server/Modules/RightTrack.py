from server.Modules.Track import Track, STOP
from server.Types import PlayerInputData
from server.Modules.InputKeys.InputKeys import LEFT


class RightTrack(Track):
    def update_module_input(self, input: PlayerInputData):
        if LEFT in input.active_keys:
            self.moving = STOP
            return
        super().update_module_input(input)
