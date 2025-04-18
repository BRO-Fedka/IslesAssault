from server.Static.Buildings.StorageBuilding import StorageBuilding


class CraneBuilding(StorageBuilding):
    is_destructible = False
    is_flammable = False
    durability = 0.5 #20
