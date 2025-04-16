import dotenv
import asyncio
from loguru import logger
from server.Connection import Connection
from server.Map import Map
import time
import os

logger.add(f"./logs/logs_{time.strftime('%d_%b_%Y_%H_%M_%S', time.gmtime())}.log".lower(), enqueue=True,
           retention="1 week")
logger.info("Server started !")
dotenv.load_dotenv()

if __name__ == "__main__":
    try:
        world = Map(os.environ["MAP"])
        connection = Connection(world)

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

# pydeps --max-bacon 10 --config pydeps.pydeps main.py --only server --cluster --max-cluster-size=1000
