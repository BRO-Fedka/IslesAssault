from server.Modules.CircularModule import CircularModule
import datetime


class Cannon(CircularModule):
    r = 0.02

    def __init__(self, x: float, y: float):
        super().__init__(x, y, self.r)
        self.status = 0
        self.cursor_x = 0
        self.cursor_y = 0
        self.reload_start = datetime.datetime.now()

    def fire(self):
        self.status = (self.status + 1) % 2
