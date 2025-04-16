from server.Modules.Track import Track, STOP, BACK
from server.Modules.Track import FORWARD as forward
from server.Types import PlayerInputData
from server.Modules.InputKeys.InputKeys import LEFT,RIGHT,BACKWARD,FORWARD


class RightTrack(Track):
    def update_module_input(self, input: PlayerInputData):
        super().update_module_input(input)
        # if RIGHT in input.active_keys and FORWARD not in input.active_keys and BACKWARD not in input.active_keys:
        #     self.moving = forward
        # if LEFT in input.active_keys and FORWARD not in input.active_keys and BACKWARD not in input.active_keys:
        #     self.moving = BACK
        # if RIGHT in input.active_keys:
        #
        if LEFT in input.active_keys:
            if FORWARD not in input.active_keys and BACKWARD not in input.active_keys:
                self.moving = BACK
            else:
                self.moving = STOP
            return
        if  RIGHT in input.active_keys and FORWARD not in input.active_keys and BACKWARD not in input.active_keys:
            self.moving = forward
