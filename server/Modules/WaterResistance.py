from pymunk import Body, Shape
from server.Types import PlayerInputData
from server.Modules.Module import Module
import math
from server.constants import COF_WATER_RESISTANCE, COF_WATER_RESISTANCE_MOMENT, COF_WATER_SURFACE_FRICTION
from server.functions import sign


class WaterResistance(Module):
    physical = False

    def __init__(self, poly_shape, poly_shape_n, body: Body, resistance_cof=1, max_speed=0.1):
        self.poly_shape = poly_shape
        self.poly_shape_n = poly_shape_n
        self.resistance_cof = resistance_cof
        self.max_speed = max_speed
        self.body = body
        super().__init__()

    def update_module(self):
        deg = self.body.velocity.angle + math.pi - self.body.angle
        r_vec = (math.cos(deg) * COF_WATER_RESISTANCE * self.body.velocity.length ** 2,
                 math.sin(deg) * COF_WATER_RESISTANCE * self.body.velocity.length ** 2)
        l_r_vec = COF_WATER_RESISTANCE * self.body.velocity.length ** 2
        area = list(self.body.shapes)[0].area
        surface_friction = COF_WATER_SURFACE_FRICTION * self.body.velocity.length ** 2 * area
        self.body.apply_force_at_local_point((math.cos(deg) * surface_friction, math.sin(deg) * surface_friction),
                                             self.body.center_of_gravity)
        if self.body.velocity.length == 0:
            return
        for coord in range(0, len(self.poly_shape)):
            l = math.sqrt(
                (self.poly_shape[coord][0] - self.poly_shape[(coord + 1) % len(self.poly_shape)][0]) ** 2 + (
                        self.poly_shape[coord][1] - self.poly_shape[(coord + 1) % len(self.poly_shape)][1]) ** 2)
            point = ((self.poly_shape[coord][0] + self.poly_shape[(coord + 1) % len(self.poly_shape)][0]) / 2,
                     (self.poly_shape[coord][1] + self.poly_shape[(coord + 1) % len(self.poly_shape)][1]) / 2)
            cos = r_vec[0] * self.poly_shape_n[coord][0] + r_vec[1] * self.poly_shape_n[coord][1] / math.sqrt(
                r_vec[0] ** 2 + r_vec[1] ** 2) / math.sqrt(
                self.poly_shape_n[coord][0] ** 2 + self.poly_shape_n[coord][1] ** 2)
            n_len = math.sqrt(self.poly_shape_n[coord][0] ** 2 + self.poly_shape_n[coord][1] ** 2)
            if cos < 0:
                self.body.apply_force_at_local_point((self.poly_shape_n[coord][
                                                          0] / n_len * cos * l_r_vec * l * self.resistance_cof,
                                                      self.poly_shape_n[coord][
                                                          1] / n_len * cos * l_r_vec * l * self.resistance_cof), point)
            vec_from_cntr_grav = (point[0] - self.body.center_of_gravity.x, point[1] - self.body.center_of_gravity.y)
            vec_from_cntr_grav_l = math.sqrt(vec_from_cntr_grav[0] ** 2 + vec_from_cntr_grav[1] ** 2)
            rotated_vec_from_cntr_grav = (vec_from_cntr_grav[1], -vec_from_cntr_grav[0])
            cos = rotated_vec_from_cntr_grav[0] * self.poly_shape_n[coord][0] + rotated_vec_from_cntr_grav[1] * \
                  self.poly_shape_n[coord][1] / math.sqrt(
                rotated_vec_from_cntr_grav[0] ** 2 + rotated_vec_from_cntr_grav[1] ** 2) / math.sqrt(
                self.poly_shape_n[coord][0] ** 2 + self.poly_shape_n[coord][1] ** 2)
            m = COF_WATER_RESISTANCE * vec_from_cntr_grav_l ** 2 * self.body.angular_velocity * abs(
                self.body.angular_velocity)
            if cos < 0:
                self.body.apply_force_at_local_point((
                    self.poly_shape_n[coord][0] / n_len * m * cos * l * self.resistance_cof,
                    self.poly_shape_n[coord][
                        1] / n_len * m * cos * l * self.resistance_cof), point)
        if self.body.velocity.length > self.max_speed:
            self.body.velocity = (self.body.velocity.x / self.body.velocity.length * self.max_speed,
                                  self.body.velocity.y / self.body.velocity.length * self.max_speed)
        if self.body.velocity.length == 0 or abs(self.body.angular_velocity) < 0.05 * (
                self.body.velocity.length * 1 / self.max_speed) ** 5:
            self.body.angular_velocity = 0
