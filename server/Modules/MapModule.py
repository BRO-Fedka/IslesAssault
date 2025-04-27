from server.Modules.Module import Module
import server.Modules.InputKeys.InputKeys as IK
from server.Types import PlayerInputData
from server.Vehicle.Vehicle import Vehicle
from server.constants import MARK_ID_POINT, MARK_ID_ARROW
from server.Types import MessageParsingException
import datetime

# from server.Role import Role


class MapModule(Module):
    input_keys = [IK.MAP]

    def __init__(self, vehicle: Vehicle):
        super().__init__()
        self.transmitting = False
        self.vehicle = vehicle
        self.prev_m2 = False
        self.own_mark = None

    def update_module(self, vehicle):
        if self.own_mark:
            self.vehicle.role.intelligence_enemy_map_marks.append(self.own_mark)

    def update_module_input(self, input: PlayerInputData):
        self.transmitting = IK.MAP in input.active_keys
        # if input.mouse_2 and not self.prev_m2:
        #     self.vehicle.role.
        self.prev_m2 = input.mouse_2

    def get_private_info_string(self) -> str:
        if self.transmitting:
            role_to_cl = {
                'R': '0',
                'B': '1',
                None: '2',
            }
            # print(self.vehicle.role.map_module_string)
            # '3,R,#f00,B,#00f,N,#fff,' +
            return self.vehicle.role.map_module_string

        else:
            return '0'

    possible_mark_roles = ['R', 'B', 'Y']
    possible_point_mark_types = [MARK_ID_POINT]
    possible_arrow_mark_types = [MARK_ID_ARROW]

    def parse_callback(self, string) -> str:
        m = string.split(',')
        if m[0]:
            if m[0] == 'X':
                self.own_mark = None
                return string[2:]
            if m[0].isdigit() and int(m[0]) in self.possible_point_mark_types:
                mark_id = int(m[0])
                r, x, y = string.split(',')[1:4]
                if r in self.possible_mark_roles:
                    try:
                        string = string[(4 + len(str(mark_id) + x + y + r)):]
                        x, y = float(x), float(y)
                        self.own_mark = (r, mark_id, round(x, 2), round(y, 2), datetime.datetime.now())

                        return string
                    except:
                        raise MessageParsingException
                else:
                    raise MessageParsingException

            elif m[0].isdigit() and int(m[0]) in self.possible_arrow_mark_types:
                mark_id = int(m[0])
                r, x, y, x0, y0 = string.split(',')[1:6]
                if r in self.possible_mark_roles:
                    try:
                        string = string[(6 + len(str(mark_id) + x + y + x0 + y0 + r)):]
                        x, y = float(x), float(y)
                        x0, y0 = float(x0), float(y0)
                        self.own_mark = (r, mark_id, round(x, 2), round(y, 2), round(x0, 2), round(y0, 2), datetime.datetime.now())
                        return string
                    except:
                        raise MessageParsingException
                else:
                    raise MessageParsingException
            else:
                raise MessageParsingException

        else:
            return string[1:]
