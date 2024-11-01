import pymunk

COL_ON_WATER = pymunk.ShapeFilter(categories=1, mask=59)
COL_ON_GROUND = pymunk.ShapeFilter(categories=2, mask=11)
COL_IN_AIR = pymunk.ShapeFilter(categories=3, mask=0)
COL_S = pymunk.ShapeFilter(categories=8)
COL_B = pymunk.ShapeFilter(categories=16)
COL_C = pymunk.ShapeFilter(categories=32)
COF_WATER_RESISTANCE = 250
COF_WATER_RESISTANCE_MOMENT = 2
COF_WATER_SURFACE_FRICTION = 20
COLTYPE_PROJECTILE = 2
COLTYPE_VEHICLE = 1