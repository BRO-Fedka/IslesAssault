from server.Static.Buildings.StorageBuilding import StorageBuilding


class HangarBuilding(StorageBuilding):
    is_destructible = False
    is_flammable = False
    durability = 0.05 #3
