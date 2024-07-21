from loguru import logger
import random
import asynchronous_requests as req_async
import json
import os
from typing import Dict, Any, List


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


MAPJSON = os.environ['JSON_MAP']
API_SERV_ADDRESS = os.environ['API_ADDRESS']
API_KEY = os.environ['API_KEY']


class AccountNotFoundException(Exception):
    pass


class ConnectionToAPIException(Exception):
    pass


class BadCosmeticsException(Exception):
    pass


class Player:

    _instances: List = []

    @classmethod
    def get_amount(cls) -> int:
        return len(cls._instances)

    def disconnect(self):
        self.websocket.close()

    def valid_guest_player(self, data: Dict[str, Any]):
        try:
            resp = (await req_async.post(API_SERV_ADDRESS + "item_check", data)).text
            respJSON = json.loads(resp)
            if respJSON['color'] < 0:
                raise BadCosmeticsException
            if respJSON['vehicle'] < 0:
                raise BadCosmeticsException
        except:
            raise ConnectionToAPIException

    def valid_logged_player(self, data: Dict[str, Any]):
        try:
            resp = (await req_async.post(API_SERV_ADDRESS + "item_check_for_acc", data)).text
            if resp == "ERROR":
                raise AccountNotFoundException
            respJSON = json.loads(resp)
            self.money = respJSON['money']
            self.logged = True
            if respJSON['color'] < 0:
                raise BadCosmeticsException
            if respJSON['vehicle'] < 0:
                raise BadCosmeticsException
        except:
            raise ConnectionToAPIException

    def __init__(self, websocket, message: str):
        self.money = 0
        self.logged = False
        self.websocket = websocket
        name = validate_name(message[1:].split('\n')[0], message[1:].split('\n')[3])
        color_id = int(message[1:].split('\n')[1])
        vehicle_id = int(message[1:].split('\n')[2])
        tracer_id = 1
        acc_name = message[1:].split('\n')[3]
        acc_password = message[1:].split('\n')[4]
        try:
            if acc_name == "":
                self.valid_guest_player({"color": color_id, "vehicle": vehicle_id})
            else:
                try:
                    self.valid_logged_player(
                        {'nickname': acc_name, "password": acc_password, "color": color_id, "vehicle": vehicle_id})
                except AccountNotFoundException:
                    self.valid_guest_player({"color": color_id, "vehicle": vehicle_id})
        except:
            self.disconnect()
            return
        await websocket.send('M' + MAPJSON)

