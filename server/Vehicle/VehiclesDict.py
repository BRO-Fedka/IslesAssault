
from server.Vehicle.Heavy import Heavy
from server.Vehicle.Tank import Tank
from server.Vehicle.CargoShip import CargoShip
from server.Vehicle.LandingShip import LandingShip
from server.Vehicle.ConstructionVehicle import ConstructionVehicle
from typing import Dict, Type

VehiclesDict: Dict[int, Type] = {
    0: Heavy,
    1:Tank,
    2:CargoShip,
    3:LandingShip,
    4:ConstructionVehicle
}
