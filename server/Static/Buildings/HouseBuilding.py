from server.Static.Buildings.Building import Building


class HouseBuilding(Building):
    is_destructible = True
    is_flammable = True
    durability = 1
