from server.Static.Buildings.Building import Building


class ChimneyBuilding(Building):
    is_destructible = False
    is_flammable = False
    durability = 1
