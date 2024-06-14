import os
import dotenv
dotenv.load_dotenv()
import asyncio
import websockets

async def connect_to_server():
    async with websockets.connect("ws://"+os.environ['HOST']+':'+os.environ['PORT']) as websocket:
        await websocket.send(os.environ['KILL_CODE'])

asyncio.get_event_loop().run_until_complete(connect_to_server())