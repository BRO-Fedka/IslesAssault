import math


def lookat_deg(x, y):
    if x == 0:
        x = 0.00001
    angle = math.atan((y / x)) / (math.pi / 180)
    if y != abs(y):
        angle = angle + 360
    if x != abs(x):
        angle = angle + 180
    return angle % 360


# class PIDR:
#     def __init__(self, kp, ki, kd):
#         self.kp = kp
#         self.ki = ki
#         self.kd = kd
#         self.integral = 0
#         self.prevErr = None
#
#     def calc(self, input, target, dt):
#         err = target - input
#         self.integral = self.integral + err * dt
#         if not self.prevErr:
#             self.prevErr = err
#         D = (err - self.prevErr) / dt
#         self.prevErr = err
#         return err * self.kp + self.integral * self.ki + D * self.kd


# def PIDR(input, target, kp, ki, kd, dt):
#     err = target - input
#     integral = 0


def sign(n):
    if n < 0:
        return -1
    else:
        return 1


def count_normals(coords, reverse=False):
    normals = []
    for _ in range(0, len(coords)):
        dx = coords[(_ + 1) % len(coords)][0] - coords[_][0]
        dy = coords[(_ + 1) % len(coords)][1] - coords[_][1]
        if not reverse:
            vec = -dy, dx
        else:
            vec = dy, -dx
        normals.append(vec)
    return normals


def lookat_rad_raw(x, y):
    if not x == 0 and abs(y / x) <= 1:
        return math.atan((y / x)) + math.pi * int(x < 0)
    elif not y == 0:
        return (math.pi / 2 - math.atan((x / y))) * sign(y) + math.pi * int(x < 0)
    else:
        return 0


def prevent_recursion(func):
    def wrapper(*args, **kwargs):
        if getattr(func, '_is_running', False):
            return
        else:
            func._is_running = True
            result = func(*args, **kwargs)
            func._is_running = False
            return result

    return wrapper
