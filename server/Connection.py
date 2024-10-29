import asyncio
import websockets
import ssl
import os
from loguru import logger
import requests as req_sync
from server.World import World
import sys
from server.Player import Player

isDEV = os.environ['DEV']

if not isDEV:
    SSL_KEY = os.environ['SSL_KEY']
    SSL_CERT = os.environ['SSL_CERT']
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    ssl_context.load_cert_chain(SSL_CERT, keyfile=SSL_KEY)

ServInfoJSON = open('SERVINFO.json', 'r').read()
JSVEHs = os.environ['JS_VEH']
API_SERV_ADDRESS = os.environ['API_ADDRESS']
API_KEY = os.environ['API_KEY']


class Connection:
    def __init__(self,world: World):
        self.world = world

    async def handler(self, websocket):
        logger.info("Connection")
        try:
            message = await websocket.recv()
            if message == os.environ['KILL_CODE']:
                sys.exit()

            elif message[0] == 'n' and len(message) > 1:
                await Player.init(websocket, message, self.world)

            elif message == 'info':
                await websocket.send(
                    ServInfoJSON.replace('%js%', JSVEHs).replace('%text%', '1# Oficial FFA/PVP').replace('%online%',str(Player.get_amount())))
                await websocket.close()
                return
        except:
            logger.exception("")
            await websocket.close()
            return

    async def init(self):
        logger.info(req_sync.post(API_SERV_ADDRESS + "connect", {'key': API_KEY}).text)
        if isDEV:
            async with websockets.serve(self.handler, os.environ["HOST"], os.environ["PORT"]):
                await asyncio.Future()
        else:
            async with websockets.serve(self.handler, os.environ["HOST"], os.environ["PORT"],
                                        ssl=ssl_context):
                await asyncio.Future()
