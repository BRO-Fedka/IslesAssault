from server.Static.Buildings.Building import Building


class ContainerBuilding(Building):
    is_destructible = True
    is_flammable = False
    durability = 3
