from server.Vehicle import Vehicle
from server.Vehicle.Heavy import Heavy
from server.Vehicle.Tank import Tank
from typing import Dict, Type, Any

VehiclesDict: Dict[int, Any] = {
    0: Heavy,
    1:Tank
}
