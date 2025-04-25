from server.Object import Object
from server.Vehicle.Vehicle import Vehicle


class InteractiveObject(Object):
    interaction_access_shape = None

    def interact(self, vehicle: Vehicle):
        pass

    def get_interaction_info(self,vehicle:Vehicle) -> str:
        pass
