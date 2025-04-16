from server.Static.Buildings.Building import Building


class HangarBuilding(Building):
    is_destructible = False
    is_flammable = False
    durability = 0.05 #3
