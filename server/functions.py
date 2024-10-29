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


def sign(n):
    if n < 0:
        return -1
    else:
        return 1


def lookat_rad_raw(x, y):
    if not x == 0 and abs(y / x) <= 1:
        return math.atan((y / x)) + math.pi * int(x < 0)
    elif not y == 0:
        return (math.pi / 2 - math.atan((x / y))) * sign(y) + math.pi * int(x < 0)
    else:
        return 0
