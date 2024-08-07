from server.Vehicle.Vehicle import Vehicle, World


class Heavy(Vehicle):
    def __init__(self, world: World, color_id: int = 0, tracer_id: int = 1):
        super().__init__(world, color_id, tracer_id)

