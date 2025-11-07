from loguru import logger
import random
import asynchronous_requests as req_async
import json
import os
import asyncio
from typing import Dict, Any, List
import dataclasses
import datetime
from server.Vehicle import Vehicle
from server.Vehicle.VehiclesDict import *
from server.Map import Map
from server.Camera import Camera
from server.Types import PlayerInputData
from server.Role import Role
from server.Modules.Input.ComboBox import ComboBox
import logging

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
        print('Player.disconnect')

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
        self.inputs: PlayerInputData = PlayerInputData(active_keys=[])
        self.name: str = None
        self.vehicle: Vehicle = None
        self.camera: Camera = None
        self.world: Map = None
        self.role: Role = None

    @staticmethod
    async def init(websocket, message: str, world: Map):
        self = Player()
        self.world = world
        self.websocket = websocket
        self.name = self.validate_name(message[1:].split('\n')[0], message[1:].split('\n')[3])
        self.role = self.world.roles[str(message[1:].split('\n')[1])]
        color_id = int(message[1:].split('\n')[2])
        spawnpoint_id = int(message[1:].split('\n')[3])
        vehicle_id = int(message[1:].split('\n')[4])
        tracer_id = 1
        acc_name = message[1:].split('\n')[5]
        acc_password = message[1:].split('\n')[6]
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
            self.disconnect(124)
            return
        await websocket.send('0,M' + MAPJSON)
        self.vehicle = VehiclesDict[vehicle_id](world, color_id, tracer_id, role=self.role, name=self.name)
        try:
            self.world.spawnpoints[spawnpoint_id].spawn(self.vehicle, id=vehicle_id)
            self.camera = Camera(self.vehicle, world)
            # self.vehicle.name = self.name
            # world.space.step(0.1)
            await self.loop()
        except Exception as e:
            logging.exception('')
            try:
                print(136)
                self.disconnect()
            except:
                pass
            self.vehicle.is_active = False

    def parse_message(self, message: str):
        try:
            message_id = message.split(',')[0]
            message = message[len(message_id) + 1:]
            message_id = int(message_id)
        except:
            message_id = 0
            return
        # print(message)
        cursor_x = float(message.split(',')[0])
        cursor_y = float(message.split(',')[1])
        callback = ','.join(message.split(',')[3:])
        message = message.split(',')[2]
        mouse_input = []
        for _ in range(0, 5):
            mouse_input.append(bool(int(message[_])))
        message = message[5:]
        keys = []
        for _ in range(0, len(self.vehicle.input_keys)):
            self.vehicle.input_keys[_].is_pressed = bool(int(message[_]))
            if bool(int(message[_])):
                keys.append(self.vehicle.input_keys[_])
        # print(self.vehicle.comboboxes)
        ncomboboxes: Dict[int,ComboBox] = {}
        for _ in range(0, len(self.vehicle.comboboxes)):
            ncomboboxes[self.vehicle.comboboxes[_].id] = self.vehicle.comboboxes[_].copy()
            ncomboboxes[self.vehicle.comboboxes[_].id].cur_val = message[len(self.vehicle.input_keys)+_]
        # print('LOL')
        self.inputs = PlayerInputData(
            mouse_0=mouse_input[0],
            mouse_1=mouse_input[1],
            mouse_2=mouse_input[2],
            mouse_3=mouse_input[3],
            mouse_4=mouse_input[4],
            active_keys=keys,
            comboboxes=ncomboboxes,
            cursor_x=cursor_x,
            cursor_y=cursor_y,
            date=datetime.datetime.now(),
            message=callback

        )
        # try:
        #     m_index = message.index('m')
        #     message_text = message[m_index + 1:]
        #     if message_text.replace(' ', '') == '':
        #         return
        #     # TODO Commands handlers
        # except:
        #     pass

    async def loop(self):
        while True:
            try:
                message = await self.websocket.recv()
                if self.vehicle.is_active:
                    self.parse_message(message)
                    self.vehicle.update_input(self.inputs)
                    # ID, money
                    await self.websocket.send("0,0," + self.camera.get_picture())
                else:
                    await self.websocket.send("0,D")
            except MessageParsingException:
                self.disconnect()
                logger.info("MessageParsingException")
                return
            await asyncio.sleep(1 / TPS)
