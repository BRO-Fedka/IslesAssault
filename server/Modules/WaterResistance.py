from pymunk import Body, Shape
from server.Types import PlayerInputData
from server.Modules.Module import Module
import math
from server.constants import COF_WATER_RESISTANCE, COF_WATER_RESISTANCE_MOMENT, COF_WATER_SURFACE_FRICTION, TPS
from server.functions import sign
from server.Vehicle.Contollers.LevelController import LevelController


class WaterResistance(Module):
    def __init__(self, poly_shape, poly_shape_n, body: Body, resistance_cof=1, max_speed=0.1,
                 level_controller: LevelController = None):
        super().__init__()
        self.level_controller = level_controller
        self.poly = poly_shape
        self.poly_n = poly_shape_n
        self.resistance_cof = resistance_cof
        self.max_speed = max_speed
        self.body = body

    def update_module(self):
        if not (self.level_controller is None or self.level_controller.get_z() == 0):
            return
        # print(self.body.velocity.length, self.body.velocity.angle)
        if self.body.velocity.length > self.max_speed:
            print(self.body.velocity.length, self.max_speed)
            self.body.velocity = (0, 0)

            return

        deg = self.body.velocity.angle + math.pi - self.body.angle
        r_vec = (math.cos(deg) * COF_WATER_RESISTANCE * self.body.velocity.length ** 2,
                 math.sin(deg) * COF_WATER_RESISTANCE * self.body.velocity.length ** 2)
        l_r_vec = COF_WATER_RESISTANCE * self.body.velocity.length ** 2
        area = list(self.body.shapes)[0].area
        surface_friction = COF_WATER_SURFACE_FRICTION * self.body.velocity.length ** 2 * area

        leave = False
        if surface_friction > self.body.velocity.length * self.body.mass * TPS:
            surface_friction = self.body.velocity.length * self.body.mass * TPS * 0.9
            leave = True
            print(surface_friction)
        self.body.apply_force_at_local_point((math.cos(deg) * surface_friction, math.sin(deg) * surface_friction),
                                             self.body.center_of_gravity)
        if leave:
            return
        if self.body.velocity.length == 0:
            return
        for coord in range(0, len(self.poly)):
            l = math.sqrt(
                (self.poly[coord][0] - self.poly[(coord + 1) % len(self.poly)][0]) ** 2 + (
                        self.poly[coord][1] - self.poly[(coord + 1) % len(self.poly)][1]) ** 2)
            point = ((self.poly[coord][0] + self.poly[(coord + 1) % len(self.poly)][0]) / 2,
                     (self.poly[coord][1] + self.poly[(coord + 1) % len(self.poly)][1]) / 2)
            cos = r_vec[0] * self.poly_n[coord][0] + r_vec[1] * self.poly_n[coord][1] / math.sqrt(
                r_vec[0] ** 2 + r_vec[1] ** 2) / math.sqrt(
                self.poly_n[coord][0] ** 2 + self.poly_n[coord][1] ** 2)
            n_len = math.sqrt(self.poly_n[coord][0] ** 2 + self.poly_n[coord][1] ** 2)
            if cos < 0:
                # print(self.poly_n[coord][0] / n_len * l_r_vec * l * self.resistance_cof)
                self.body.apply_force_at_local_point((self.poly_n[coord][
                                                          0] / n_len * cos * l_r_vec * l * self.resistance_cof,
                                                      self.poly_n[coord][
                                                          1] / n_len * cos * l_r_vec * l * self.resistance_cof), point)
            vec_from_cntr_grav = (point[0] - self.body.center_of_gravity.x, point[1] - self.body.center_of_gravity.y)
            vec_from_cntr_grav_l = math.sqrt(vec_from_cntr_grav[0] ** 2 + vec_from_cntr_grav[1] ** 2)
            rotated_vec_from_cntr_grav = (vec_from_cntr_grav[1], -vec_from_cntr_grav[0])
            cos = rotated_vec_from_cntr_grav[0] * self.poly_n[coord][0] + rotated_vec_from_cntr_grav[1] * \
                  self.poly_n[coord][1] / math.sqrt(
                rotated_vec_from_cntr_grav[0] ** 2 + rotated_vec_from_cntr_grav[1] ** 2) / math.sqrt(
                self.poly_n[coord][0] ** 2 + self.poly_n[coord][1] ** 2)
            m = COF_WATER_RESISTANCE * vec_from_cntr_grav_l ** 2 * self.body.angular_velocity * abs(
                self.body.angular_velocity)
            # if abs(m) > 1:
            #     self.body.angular_velocity = 0
            #     m = 0
            # print(m)
            if cos < 0:
                # print(self.poly_n[coord][0] / n_len * m * l * self.resistance_cof)
                self.body.apply_force_at_local_point((
                    self.poly_n[coord][0] / n_len * m * cos * l * self.resistance_cof,
                    self.poly_n[coord][
                        1] / n_len * m * cos * l * self.resistance_cof), point)
        if self.body.velocity.length > self.max_speed:
            self.body.velocity = (self.body.velocity.x / self.body.velocity.length * self.max_speed,
                                  self.body.velocity.y / self.body.velocity.length * self.max_speed)
        if self.body.velocity.length == 0 or abs(self.body.angular_velocity) < 0.05 * (
                self.body.velocity.length * 1 / self.max_speed) ** 5:
            self.body.angular_velocity = 0
