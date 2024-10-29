from loguru import logger
import random
import asynchronous_requests as req_async
import json
import os
import asyncio
from typing import Dict, Any, List
import dataclasses
import datetime
from server.Vehicle.VehiclesDict import *
from World import World
from server.Camera import Camera
from server.Types import PlayerInputData

TPS = int(os.environ['TPS'])
MAPJSON = os.environ['JSON_MAP']
API_SERV_ADDRESS = os.environ['API_ADDRESS']
API_KEY = os.environ['API_KEY']


class AccountNotFoundException(Exception):
    pass


class ConnectionToAPIException(Exception):
    pass


class BadCosmeticsException(Exception):
    pass


class MessageParsingException(Exception):
    pass


class Player:
    _instances: List = []

    @classmethod
    def get_amount(cls) -> int:
        return len(cls._instances)

    def disconnect(self):
        self.websocket.close()

    @staticmethod
    def validate_name(name: str, account_name: str) -> str:
        while name.count('  ') > 0:
            name = name.replace('  ', ' ')
        logger.info(f"Name '{name}' wanted")

        if name == '' or name == ' ' or name.count(',') > 0 or name.count(']') > 0 or name.count('['):
            logger.info(f"Bad name : " + name)
            if name == '' or name == ' ':
                name = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[random.randint(0, 25)] + '-' + str(random.randint(0, 99))
                logger.info(f"'{name}' is better")
        return name

    async def valid_guest_player(self, data: Dict[str, Any]):
        try:
            resp = (await req_async.post(API_SERV_ADDRESS + "item_check", data)).text
            resp_json = json.loads(resp)
            if resp_json['color'] < 0:
                raise BadCosmeticsException
            if resp_json['vehicle'] < 0:
                raise BadCosmeticsException
        except:
            raise ConnectionToAPIException

    async def valid_logged_player(self, data: Dict[str, Any]):
        try:
            resp = (await req_async.post(API_SERV_ADDRESS + "item_check_for_acc", data)).text
            if resp == "ERROR":
                raise AccountNotFoundException
            resp_json = json.loads(resp)
            self.money = resp_json['money']
            self.logged = True
            if resp_json['color'] < 0:
                raise BadCosmeticsException
            if resp_json['vehicle'] < 0:
                raise BadCosmeticsException
        except:
            raise ConnectionToAPIException

    def __init__(self):
        self.money: int = 0
        self.logged: bool = False
        self.websocket = None
        self.inputs: PlayerInputData = PlayerInputData()
        self.name: str = None
        self.vehicle: Vehicle = None
        self.camera: Camera = None

    @staticmethod
    async def init(websocket, message: str, world: World):
        self = Player()
        self.websocket = websocket
        self.name = self.validate_name(message[1:].split('\n')[0], message[1:].split('\n')[3])
        color_id = int(message[1:].split('\n')[1])
        vehicle_id = int(message[1:].split('\n')[2])
        tracer_id = 1
        acc_name = message[1:].split('\n')[3]
        acc_password = message[1:].split('\n')[4]
        try:
            if acc_name == "":
                await self.valid_guest_player({"color": color_id, "vehicle": vehicle_id})
            else:
                try:
                    await self.valid_logged_player(
                        {'nickname': acc_name, "password": acc_password, "color": color_id, "vehicle": vehicle_id})
                except AccountNotFoundException:
                    await self.valid_guest_player({"color": color_id, "vehicle": vehicle_id})
        except:
            self.disconnect()
            return
        await websocket.send('0,M' + MAPJSON)
        self.vehicle = VehiclesDict[vehicle_id](world, color_id, tracer_id)
        self.camera = Camera(self.vehicle)
        self.vehicle.name = self.name
        world.space.step(0.1)
        await self.loop()

    def parse_message(self, message: str):
        try:
            message_id = message.split(',')[0]
            message = message[len(message_id) + 1:]
            message_id = int(message_id)
        except:
            message_id = 0
            return
        # print(message)
        self.inputs = PlayerInputData(
            mouse_0=bool(int(message[0])),
            up=bool(int(message[1])),
            left=bool(int(message[2])),
            down=bool(int(message[3])),
            right=bool(int(message[4])),
            first_weapon=bool(int(message[5])),
            second_weapon=bool(int(message[6])),
            tab=bool(int(message[7])),
            shooting_mode=bool(int(message[8])),
            z_aiming_mode=int(message[9]),
            view=int(message[10]),
            cursor_x=float(message[11:].split(',')[0]),
            cursor_y=float(message[11:].split(',')[1]),
            date=datetime.datetime.now()
        )
        try:
            m_index = message.index('m')
            message_text = message[m_index + 1:]
            if message_text.replace(' ', '') == '':
                return
            # TODO Commands handlers
        except:
            pass

    async def loop(self):
        while True:
            try:
                message = await self.websocket.recv()
                self.parse_message(message)
                self.vehicle.update(self.inputs)
                await self.websocket.send("0,0," + self.camera.get_picture())
            except MessageParsingException:
                self.disconnect()
                logger.info("MessageParsingException")
                return
            await asyncio.sleep(1 / TPS)
