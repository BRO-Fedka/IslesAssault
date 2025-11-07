from server.Modules.Module import Module
from server.Types import PlayerInputData
from server.Vehicle.Vehicle import Vehicle
from server.constants import MARK_ID_POINT, MARK_ID_ARROW
from server.Types import MessageParsingException
import datetime
import server.Modules.Input.InputKeys as IK
from server.Role import Role
from server.World import World
from server.Chat import Chat
from typing import List, Dict


class ChatModule(Module):
    input_keys = [IK.MAP,IK.TAB]
    def __init__(self,world:World,role:Role,name:str):
        super().__init__()
        self.chats:List[Chat] = [*world.chats,*role.chats]
        self.transmit_chats = False
        self.vehicle_name = name
        self.last_sent_message_id_per_chat: Dict[Chat,int] = {}
        for chat in self.chats:
            self.last_sent_message_id_per_chat[chat] = chat.last_msg_id

    def update_module(self, vehicle):
        pass
        # if self.own_mark:
        #     self.vehicle.role.intelligence_enemy_map_marks.append(self.own_mark)

    def update_module_input(self, input: PlayerInputData):
        pass
        # self.transmitting = IK.MAP in input.active_keys
        # self.prev_m2 = input.mouse_2

    def get_private_info_string(self) -> str:
        msgs_for_sending = []
        for chat in self.chats:
            if chat.last_msg_id > self.last_sent_message_id_per_chat[chat]:
                for msg in chat.messages[self.last_sent_message_id_per_chat[chat] - chat.last_msg_id:]:
                    msgs_for_sending.append((self.chats.index(chat),msg.sender_vn,msg.text))
                self.last_sent_message_id_per_chat[chat] = chat.last_msg_id
        if len(msgs_for_sending) > 0:
            s = f'M{len(msgs_for_sending)},'
            for tmpl in msgs_for_sending:
                s += ",".join(map(str,tmpl))+','
            return s

        if self.transmit_chats:
            # print('C'+';'.join(self.chats)+',' )
            self.transmit_chats = False
            return 'C'+';'.join(map(lambda e: e.name+e.color,self.chats))+','
        return ''
        # if self.transmitting:
        #     return self.vehicle.role.map_module_string
        # else:
        #     return '0'

    # possible_mark_roles = ['R', 'B', 'Y']
    # possible_point_mark_types = [MARK_ID_POINT]
    # possible_arrow_mark_types = [MARK_ID_ARROW]

    def parse_callback(self, string) -> str:
        m = string.split(',')
        if m and m[0]:
            if m[0] == 'C':
                self.transmit_chats = True
                print(string)
                print(string[2:])
                return string[2:]
            elif m[0][0] == 'M':
                cn = m[0][1:]
                msg = m[1]
                try:
                    self.chats[int(cn)].send(self.vehicle_name ,msg)
                except:
                    pass
                return string[(1+len(cn)+1+len(msg)+1):]

                # m[0][1:]
        #     if m[0].isdigit() and int(m[0]) in self.possible_point_mark_types:
        #         mark_id = int(m[0])
        #         r, x, y = string.split(',')[1:4]
        #         if r in self.possible_mark_roles:
        #             try:
        #                 string = string[(4 + len(str(mark_id) + x + y + r)):]
        #                 x, y = float(x), float(y)
        #                 self.own_mark = (r, mark_id, round(x, 2), round(y, 2), datetime.datetime.now())
        #
        #                 return string
        #             except:
        #                 raise MessageParsingException
        #         else:
        #             raise MessageParsingException
        #
        #     elif m[0].isdigit() and int(m[0]) in self.possible_arrow_mark_types:
        #         mark_id = int(m[0])
        #         r, x, y, x0, y0 = string.split(',')[1:6]
        #         if r in self.possible_mark_roles:
        #             try:
        #                 string = string[(6 + len(str(mark_id) + x + y + x0 + y0 + r)):]
        #                 x, y = float(x), float(y)
        #                 x0, y0 = float(x0), float(y0)
        #                 self.own_mark = (r, mark_id, round(x, 2), round(y, 2), round(x0, 2), round(y0, 2), datetime.datetime.now())
        #                 return string
        #             except:
        #                 raise MessageParsingException
        #         else:
        #             raise MessageParsingException
        #     else:
        #         raise MessageParsingException
        #
        # else:
        #     return string[1:]
        return string
