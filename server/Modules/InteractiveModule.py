from server.Modules.Module import Module
from server.Vehicle.Vehicle import Vehicle

class InteractiveModule(Module):
    def interact(self,vehicle:Vehicle):
        pass

    def get_interaction_info(self,vehicle:Vehicle)->str:
        pass