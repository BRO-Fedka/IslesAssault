from typing import NamedTuple, List

class Message(NamedTuple):
    id: int
    sender_vn: str
    text:str


class Chat:
    def __init__(self,name,cl):
        self.color = cl
        # print(name)
        self.name = name
        self.last_msg_id = 0
        self.messages: List[Message] = []
    def send(self,veh_name:str,msg:str):
        print(self.name,veh_name,msg)
        self.messages.append(Message(self.last_msg_id+1,veh_name,msg))
        self.last_msg_id += 1