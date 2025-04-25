from server.InteractiveObject import InteractiveObject
from server.Vehicle.Vehicle import Vehicle
from server.Modules.InteractiveModule import InteractiveModule


class InteractiveVehicle(Vehicle,InteractiveObject):
    def interact(self, vehicle: Vehicle):
        for m in self.modules:
            if isinstance(m,InteractiveModule) and m.get_interaction_info(vehicle):
                m.interact(vehicle)
                break

    def get_interaction_info(self,vehicle:Vehicle) -> str:
        # print('!')
        for m in self.modules:
            if isinstance(m,InteractiveModule):
                s = m.get_interaction_info(vehicle)
                # print(m)
                if s:
                    return s
