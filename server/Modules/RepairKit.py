from server.Modules.Module import Module
from server.Vehicle.Contollers.HealthController import HealthController
from server.Types import PlayerInputData


class RepairKit(Module):
    def __init__(self, health_controller: HealthController):
        super().__init__()
        self.health_controller = health_controller

    def update_module(self):
        pass

    def update_module_input(self, input: PlayerInputData):
        if input.repair:
            self.health_controller.repair()

    def get_private_info_string(self) -> str:
        module_id = self.health_controller.get_module_id()
        if module_id is None:
            module_id = ''
        return f"{module_id},"
