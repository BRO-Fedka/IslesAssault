from server.Modules.Track import Track, STOP
from server.Types import PlayerInputData


class RightTrack(Track):
    def update_module_input(self, input: PlayerInputData):
        if input.left:
            self.moving = STOP
            return
        super().update_module_input(input)
