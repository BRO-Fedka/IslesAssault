from typing import List
from server.Modules.Module import Module


class ArmorIndication(Module):
    def __init__(self, armor_modules: List[Module]):
        super().__init__()
        self.armor_modules = armor_modules

    def get_string(self):
        bs = ''
        for module in self.armor_modules:
            bs += module.get_private_info_string()
        num = str(int(bs,2))
        # print(num)
        return num+','

    def get_private_info_string(self) -> str:
        return self.get_string()

    def get_public_info_string(self) -> str:
        return self.get_string()

