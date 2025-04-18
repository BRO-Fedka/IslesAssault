from server.Modules.RotatingModule import RotatingModule, ModuleIsBroken, ModuleIsRepairing
from server.Static.BuildingsGroup import BuildingsGroup
from server.Types import PlayerInputData, coords
import math
from server.World import World
from pymunk import Body
import datetime
from shapely.geometry import LineString, Point
import logging
from server.Role import Role


class ConstructionTool(RotatingModule):
    r = 0.01
    repair_priority = 4
    rotation_speed = math.pi
    reload_time = 1

    def __init__(self, x: float, y: float, world: World, body: Body, arm_l=0.025, role: Role = None):
        super().__init__(x, y, body)
        self.reload_start = datetime.datetime.now()
        self.world = world
        self.arm_l = arm_l
        self.role = role

    def build(self):
        if self.hp == 0:
            raise ModuleIsBroken
        # if no BMATS
        cx, cy = self.body.position
        cx, cy = math.floor(cx), math.floor(cy)
        objects = set()
        for x in range(cx - 1, cx + 2):
            for y in range(cy - 1, cy + 2):
                # print(x,y)
                try:
                    for _ in self.world.get_objects_in_chunk(coords(x, y)):
                        if isinstance(_, BuildingsGroup):
                            objects.add(_)
                except:
                    pass
        cos, sin = math.cos(self.body.angle), math.sin(self.body.angle)
        tx, ty = self.body.position.x - self.y * sin + self.x * cos, self.body.position.y + self.y * cos + self.x * sin
        cos, sin = math.cos(self.get_abs_direction()), math.sin(self.get_abs_direction())
        line = LineString([[tx, ty], [tx + self.arm_l * cos, ty + self.arm_l * sin]])
        inters = []
        for bg in list(objects):
            for b in bg.buildings:
                if b.shape.intersects(line):
                    inters.append(b)
        if len(inters) > 0:
            if len(inters) > 1:
                inters.sort(key=lambda b: b.intersection(line).distance(Point(tx, ty)))
            building = inters[0]
            # print(building)
            try:
                # print(type(building))
                building.health_controller.repair(self.role)
            except:
                logging.exception('')
        # print(objects)
        # print('!')
        self.reload_start = datetime.datetime.now()

    def update_module_input(self, input: PlayerInputData):
        super().update_module_input(input)
        if input.mouse_0 and (datetime.datetime.now() - self.reload_start).total_seconds() > (2 - 1 * (
                self.hp / self.max_hp)) * self.reload_time:
            self.build()
