from typing import NamedTuple
import dataclasses
import datetime
from server.Modules.Input.InputKey import InputKey
from server.Modules.Input.ComboBox import ComboBox
from typing import List, Dict


class coords(NamedTuple):
    x: float
    y: float


class MessageParsingException:
    pass


@dataclasses.dataclass
class PlayerInputData:
    mouse_0: bool = False
    mouse_1: bool = False
    mouse_2: bool = False
    mouse_3: bool = False
    mouse_4: bool = False
    active_keys: List[InputKey] = None
    comboboxes: Dict[int,ComboBox] = None
    cursor_x: float = 0
    cursor_y: float = 0
    date: datetime.datetime = datetime.datetime.now()
    message: str = ''
