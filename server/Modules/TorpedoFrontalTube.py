from pymunk import Body
from server.Types import PlayerInputData
from server.Modules.Module import Module


class TorpedoFrontalTube(Module):
    def __init__(self, amount=0):
        super().__init__()
        self.max_amount = amount
        self.amount = amount

    def update_module_return_hp(self,body: Body,input: PlayerInputData) -> int:
        return 0

    def get_public_info_string(self) -> str:
        return ''

    def get_private_info_string(self) -> str:
        return f',{self.amount}'
