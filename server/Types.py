from typing import NamedTuple
import dataclasses
import datetime

class coords(NamedTuple):
    x: float
    y: float

@dataclasses.dataclass
class PlayerInputData:
    mouse_0: bool = False
    up: bool = False
    down: bool = False
    right: bool = False
    left: bool = False
    first_weapon: bool = False
    second_weapon: bool = False
    tab: bool = False
    z_aiming_mode: int = 0
    shooting_mode: bool = False
    view: int = 0
    cursor_x: float = 0
    cursor_y: float = 0
    date: datetime.datetime = datetime.datetime.now()
