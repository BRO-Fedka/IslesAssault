from server.Modules.Module import Module
from server.Vehicle.Contollers.MassController import MassController


class OverloadIndication(Module):
    def __init__(self, mass_controller: MassController):
        super().__init__()
        self.mass_controller = mass_controller

    def get_private_info_string(self) -> str:
        status = '0'
        overload = self.mass_controller.get_overload()
        if overload > 2:
            status = '3'
        elif overload > 1.6:
            status = '2'
        elif overload > 1.2:
            status = '1'
        return f'{status}{self.mass_controller.get_overload():.2f},'

    def get_public_info_string(self) -> str:
        return ''

