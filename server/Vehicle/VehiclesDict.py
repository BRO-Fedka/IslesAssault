from server.Vehicle import Vehicle
from server.Vehicle.Heavy import Heavy
from typing import Dict, Type

VehiclesDict: Dict[int, Type] = {
    0: Heavy
}
