from typing import List, Sequence, Union
from server.Modules.Module import Module, BOTTOM, DEFAULT
from pymunk import Body, Shape, Poly
from server.Types import coords
from shapely.geometry import Polygon, LineString, Point
from server.Modules.Armor.ArmorPlate import ArmorPlate
from server.Vehicle.Contollers.MassController import MassController
import math
import pymunk
from server.constants import COL_ON_GROUND, COL_ON_WATER, COL_IN_AIR, COLTYPE_VEHICLE
from server.World import World, ACCESSABLE_GROUND


class LevelController:
    is_handled: bool = False
    handler_vehicles: pymunk.collision_handler.CollisionHandler = None

    def __init__(self, vehicle, shape: Poly, world: World, mass_controller: MassController, z=0, w=True,
                 g=False, a=False,
                 u=False):
        self.water = w
        self.ground = g
        self.air = a
        self.underwater = u
        self.vehicle = vehicle
        self.mass_controller = mass_controller
        self.z = z
        self.ignore = [w, g, a].count(True) == 1
        if self.ignore:
            self.z = [w, g, a].index(True)
        self.shape = shape
        self.world = world
        self.intersects_accessible = False
        self.intersects_inaccessible = False
        self.intersects_bridges = False
        if not self.__class__.is_handled:
            self.__class__.handler_vehicles = self.world.space.add_collision_handler(COLTYPE_VEHICLE, 0)
            self.__class__.handler_vehicles.begin = self.on_static_hit
            self.__class__.is_handled = True
        # self.shape.body.angle = 1
        # print((self.shape.get_vertices()))

    @staticmethod
    def on_static_hit(arbiter, space, data):
        s1, s2 = arbiter.shapes
        if s1.master.level_controller.ground and (not s1.master.level_controller.intersects_inaccessible) and (
                not s1.master.level_controller.intersects_bridges):
            if s2.type == ACCESSABLE_GROUND:
                return False
        return True

    def get_z(self) -> int:
        return self.z

    def update(self):
        if self.mass_controller.get_overload() >= 2 and self.shape.filter == COL_ON_WATER:
            self.z = -1
            # if not self.underwater:
            #     self.shape.body.velocity = (0,0)
            #     self.shape.body.angular_velocity = 0

        if self.ignore:
            return
        x = self.shape.body.position.x
        y = self.shape.body.position.y
        angle = self.shape.body.angle
        vertices = self.shape.get_vertices()
        rotated_vertices = map(lambda e: e.rotated(angle), vertices)
        points = list(map(lambda e: (e.x + x, e.y + y), rotated_vertices))
        # print(points)
        # vehicle_poly = Polygon([])
        vehicle_poly = Polygon(points)
        # print('!')
        self.intersects_accessible = False
        self.intersects_inaccessible = False
        self.intersects_bridges = False
        for poly in self.world.mpolygon_bridge_ground:
            if self.shape.filter == COL_ON_GROUND:
                if Point(x, y).intersects(poly):
                    self.intersects_bridges = True
                    break
            else:
                if vehicle_poly.intersects(poly):
                    self.intersects_bridges = True
                    break

        for poly in self.world.mpolygon_accessable_ground:
            if vehicle_poly.intersects(poly):
                self.intersects_accessible = True
                break
        for poly in self.world.mpolygon_inaccessable_ground:
            if vehicle_poly.intersects(poly):
                self.intersects_inaccessible = True
                break
        if self.shape.filter == COL_ON_GROUND and (not self.intersects_accessible) and (
                not self.intersects_inaccessible) and (not self.intersects_bridges):
            self.shape.filter = COL_ON_WATER
            self.z = 0
            # print('WATER')
        if self.shape.filter == COL_ON_WATER and self.intersects_accessible and (not self.intersects_inaccessible) and (
                not self.intersects_bridges):
            self.shape.filter = COL_ON_GROUND
            self.z = 1
            # print('GROUND')
