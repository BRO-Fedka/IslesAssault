import dotenv
import asyncio
from loguru import logger
from server.Connection import Connection
from server.World import World
import time

logger.add(f"./logs/logs_{time.strftime('%d_%b_%Y_%H_%M_%S', time.gmtime())}.log".lower(),enqueue=True, retention= "1 week")
logger.info("Server started !")
dotenv.load_dotenv()

if __name__ == "__main__":
    try:
        connection = Connection()
        world = World()

        ioloop = asyncio.new_event_loop()
        asyncio.set_event_loop(ioloop)
        tasks = [
            ioloop.create_task(connection.init()),
            ioloop.create_task(world.init())
        ]
        ioloop.run_until_complete(asyncio.wait(tasks))
        ioloop.close()
    except:
        pass
