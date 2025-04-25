from server.Modules.Module import Module
from server.Vehicle.Controllers.VehicleHealthController import VehicleHealthController
from server.Types import PlayerInputData
import server.Modules.InputKeys.InputKeys as IK


class RepairKit(Module):
    input_keys = [IK.REPAIR]

    def __init__(self, health_controller: VehicleHealthController):
        super().__init__()
        self.health_controller = health_controller

    def update_module(self, vehicle):
        super().update_module(vehicle)

    def update_module_input(self, input: PlayerInputData):
        # print(IK.REPAIR,input)
        # print(input.active_keys)
        if IK.REPAIR in input.active_keys:
            self.health_controller.repair()

    def get_private_info_string(self) -> str:
        module_id = self.health_controller.get_module_being_repaired_id()
        if module_id is None:
            module_id = ''
        return f"{module_id},"
