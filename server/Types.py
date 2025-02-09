from typing import NamedTuple
import dataclasses
import datetime
from server.Modules.InputKeys.InputKey import InputKey
from typing import List


class coords(NamedTuple):
    x: float
    y: float


@dataclasses.dataclass
class PlayerInputData:
    mouse_0: bool = False
    mouse_1: bool = False
    mouse_2: bool = False
    mouse_3: bool = False
    mouse_4: bool = False
    active_keys: List[InputKey] = None
    cursor_x: float = 0
    cursor_y: float = 0
    date: datetime.datetime = datetime.datetime.now()
