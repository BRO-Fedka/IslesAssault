from pymunk import Body
from server.Types import PlayerInputData
from server.Modules.Module import Module
from server.constants import COF_WATER_RESISTANCE
import server.Modules.Input.InputKeys as IK
from server.Modules.Input.ComboBoxes import SHIP_CONTROL_TYPE
import math
import pymunk
from server.functions import lookat_deg
import datetime

RIGHT = 2
LEFT = 1
STRAIGHT = 0


class ShipSteering(Module):
    input_keys = [IK.LEFT, IK.RIGHT]
    comboboxes = [SHIP_CONTROL_TYPE]

    def __init__(self, body: Body, x, y, l=0.1, deg=5, passive_friction_cof=0.001):
        super().__init__()
        self.x = x
        self.y = y
        self.l = l
        self.body = body
        self.deg = deg / 180 * math.pi
        self.passive_friction_cof = passive_friction_cof
        self.direction = STRAIGHT
        self.req_dir = 0
        self.steering_shift_angle = 0
        self.movement_to_direction = False
        self.prev_ang = None
        self.last_dt = datetime.datetime.now()

    def update_module(self, vehicle):
        super().update_module(vehicle)
        # print('4')

        if self.movement_to_direction:
            dt = (datetime.datetime.now() - self.last_dt).microseconds / 1000000
            # print(dt)
            ang = self.body.angle
            Kp = 0.02
            Kd = 0.1
            if ang < self.req_dir:
                # TODO

                self.steering_shift_angle = min(self.deg,
                                                abs(self.req_dir - ang) * Kp + (self.prev_ang - ang) / dt * Kd)
            else:
                self.steering_shift_angle = -min(self.deg,
                                                 abs(self.req_dir - ang) * Kp + (self.prev_ang - ang) / dt * Kd)

            # print(ang)
            # print(self.req_dir)
        else:
            if self.direction == RIGHT:
                self.steering_shift_angle = self.deg
            elif self.direction == LEFT:
                self.steering_shift_angle = -self.deg
            else:
                self.steering_shift_angle = 0
        self.prev_ang = self.body.angle
        self.last_dt = datetime.datetime.now()
        deg = self.body.velocity.angle + math.pi - self.body.angle
        r_vec = (math.cos(deg) * COF_WATER_RESISTANCE * self.body.velocity.length ** 2,
                 math.sin(deg) * COF_WATER_RESISTANCE * self.body.velocity.length ** 2)
        friction = self.body.velocity.length ** 2 * COF_WATER_RESISTANCE * self.passive_friction_cof
        self.body.apply_force_at_local_point(
            (math.cos(deg) * friction, math.sin(deg) * friction),
            self.body.center_of_gravity)
        l_r_vec = COF_WATER_RESISTANCE * self.body.velocity.length ** 2

        n1 = (math.sin(self.steering_shift_angle), math.cos(self.steering_shift_angle))

        n2 = (-n1[0], -n1[1])
        cos1 = r_vec[0] * n1[0] + r_vec[1] * n1[1] / math.sqrt(
            r_vec[0] ** 2 + r_vec[1] ** 2) / math.sqrt(n1[0] ** 2 + n1[1] ** 2)
        if cos1 < 0:
            self.body.apply_force_at_local_point((n1[0] * cos1 * self.l * l_r_vec, n1[1] * cos1 * self.l * l_r_vec),
                                                 (self.x, self.y))
        cos2 = r_vec[0] * n2[0] + r_vec[1] * n2[1] / math.sqrt(
            r_vec[0] ** 2 + r_vec[1] ** 2) / math.sqrt(n2[0] ** 2 + n2[1] ** 2)
        if cos2 < 0:
            self.body.apply_force_at_local_point((n2[0] * cos2 * self.l * l_r_vec, n2[1] * cos2 * self.l * l_r_vec),
                                                 (self.x, self.y))
        # print('!')

    def update_module_input(self, input: PlayerInputData):
        try:
            # print(input.comboboxes)
            if input.comboboxes[SHIP_CONTROL_TYPE.id].cur_val == '1':

                if input.mouse_2:
                    self.req_dir = pymunk.Vec2d(input.cursor_x,
                                                input.cursor_y).angle  # lookat_deg(input.cursor_x, input.cursor_y)
                    # print(self.req_dir)
                    self.movement_to_direction = True

                return

            else:
                self.movement_to_direction = False

        except:
            pass
        self.req_dir = self.body.angle
        if IK.RIGHT in input.active_keys:
            self.direction = RIGHT

        elif IK.LEFT in input.active_keys:
            self.direction = LEFT
        else:
            self.direction = STRAIGHT
