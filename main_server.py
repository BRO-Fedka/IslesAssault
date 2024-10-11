import asyncio
import websockets
import pickle
import logging
import math
import json
import atexit
import ssl
import os
import datetime
import random
from shapely.geometry import Polygon, LineString, Point, LinearRing

from loguru import logger
import asynchronous_requests as requests
import requests as req_sync
import time
import dotenv
from server.World import World
import pymunk

dotenv.load_dotenv()
logger.add(f"./logs/logs_{time.strftime('%d_%b_%Y_%H_%M_%S', time.gmtime())}.log".lower(), enqueue=True,
           retention="1 week")
logger.info("Server started !")
WH = 16
# SQL = sqlite3.connect(os.environ['DB_PATH'])
API_SERV_ADDRESS = os.environ['API_ADDRESS']
API_KEY = os.environ['API_KEY']
isDEV = os.environ['DEV']
PLAYERS_LIMIT = int(os.environ['PLAYERS_LIMIT'])
if not isDEV:
    SSL_KEY = os.environ['SSL_KEY']
    SSL_CERT = os.environ['SSL_CERT']
    ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    ssl_context.load_cert_chain(SSL_CERT, keyfile=SSL_KEY)
# SQLctx = SQL.cursor()
# print(SQLctx.execute(f"SELECT * FROM Account WHERE nickname = 'LOL'").fetchone())
TPS = 15
VIEW_X = 6
VIEW_Y = 3
availablecls = [1, 2, 3, 4, 5]
logger.info(req_sync.post(API_SERV_ADDRESS + "connect", {'key': API_KEY}).text)


def exit_handler():
    logger.info("Bye, bye !")
    req_sync.post(API_SERV_ADDRESS + "disconnect", {'key': API_KEY})


atexit.register(exit_handler)
# http://localhost:90/server/connect
TEAM_HELP = '''/team create [team name] /team join [team name] /team kick [player name] /team leave /team list /team chat [message]'''
import sys

sys.path.append("../")
from Config import *

vehicleinfo = {
    0: {'DEFCOL': Polygon([[0.15, 0], [0, 0.06], [-0.15, 0.045], [-0.15, -0.045], [0, -0.06]]),
        'COLB': True,
        'COLS': True,
        'Z': 0,
        "DEGDMGCOF": 1,
        'BOMBS': 0,
        'COLP': True,
        'TAKEN': False,
        'CARRIER': False,
        'SPAWN': 0,
        'SPWEP': 0,
        'MOVETYPE': 0,
        'TORPEDOS': 12,
        'AAROCKETS': 0,
        'GASTYPE': 0,
        'SMOKES': 8,
        'HP': 1000,
        'BOOST': 0.02,
        'HPMAX': 1000,
        'GROUNDSPEED': 0.125,
        'MAXSPEED': 0.125,
        "PENDMGDST": 0.06,
        'TURN': 20,
        'AMMO': {'m': 200, 'p': 0, 't': 0, 'h': 0, 'f': 0},
        'CAN': [['m', 0, 0, 50, datetime.datetime.now(), None, True, 0, 0, 0],
                ['m', 0 - 0.1, 0, 50, datetime.datetime.now(), None, True, 0, 0, 0]],
        },
    1: {'DEFCOL': Polygon([[0.06, 0.04], [-0.06, 0.04], [-0.06, -0.04], [0.06, -0.04]]),
        'COLB': False,
        'COLS': True,
        "DEGDMGCOF": 0.5,
        "PENDMGDST": 0.05,
        'SPAWN': 1,
        'GASTYPE': 0,
        'Z': 0,
        'GROUNDBOOST': 0.15,
        'COLP': True,
        'BOMBS': 0,
        'TAKEN': False,
        'TORPEDOS': 0,
        'AAROCKETS': 0,
        'SMOKES': 0,
        'GROUNDSPEED': 0.25,
        'CARRIER': False,
        'SPWEP': None,
        'HP': 90,
        'HPMAX': 90,
        'BOOST': 0.05,
        'MOVETYPE': 1,
        'MAXSPEED': 0.05,
        'TURN': 60,
        'AMMO': {'m': 0, 'p': 0, 't': 100, 'h': 0, 'f': 0},
        'CAN': [['t', 0 + 0.01, 0, 100, datetime.datetime.now(), None, True, 0, 0, 0]],
        },
    2: {'DEFCOL': Polygon([[0.075, 0], [0, 0.03], [-0.065, 0.02], [-0.065, -0.02], [0, -0.03]]),
        'COLB': True,
        'COLP': True,
        "DEGDMGCOF": 0.25,
        'Z': 0,
        'GASTYPE': 0,
        "PENDMGDST": 0.04,
        'TAKEN': False,
        'CARRIER': False,
        'SPAWN': 0,
        'GROUNDSPEED': 0.2,
        'BOOST': 0.02,
        'BOMBS': 0,
        'SMOKES': 4,
        'TORPEDOS': 4,
        'AAROCKETS': 0,
        'HP': 50,
        'HPMAX': 50,
        'COLS': True,
        'SPWEP': 0,
        'MOVETYPE': 0,
        'MAXSPEED': 0.2,
        'TURN': 45,
        'AMMO': {'m': 0, 'p': 0, 't': 0, 'h': 300, 'f': 0},
        'CAN': [['h', 0, 0, 250, datetime.datetime.now(), None, True, 0, 0, 0]],
        },
    3: {'DEFCOL': Polygon(
        [[-0.3, 0], [-0.325, 0.055], [-0.2, 0.04], [0, 0.06], [0.225, 0.06], [0.275, 0.04], [0.3, 0], [0.275, -0.04],
         [0.225, -0.06], [0, -0.06], [-0.2, -0.04], [-0.325, -0.055]]),
        'COLB': False,
        'SMOKES': 0,
        "PENDMGDST": 0.05,
        "DEGDMGCOF": 0.1,
        'TORPEDOS': 0,
        'AAROCKETS': 0,
        'GROUNDSPEED': 0.15,
        'HP': 1000,
        'GASTYPE': 0,
        'BOMBS': 0,
        'CARRIER': True,
        'TAKEN': False,
        'CARVEH': [8],
        'CARRY': 4,
        'SPAWN': 2,
        'COLP': False,
        'Z': 1,
        'HPMAX': 1000,
        'COLS': False,
        'SPWEP': None,
        'MOVETYPE': 0,
        'BOOST': 0.0025,
        'MAXSPEED': 0.15,
        'TURN': 7,
        'AMMO': {'m': 0, 'p': 5000, 't': 0, 'h': 0, 'f': 0},
        'CAN': [['p', -0.2, 0, 2500, datetime.datetime.now(), None, True, 0, 0, 0],
                ['p', 0.265, 0, 2500, datetime.datetime.now(), None, True, 0, 0, 0]],
    },
    4: {'DEFCOL': Polygon(
        [[0.3, -0.03], [0.3, 0.03], [0.275, 0.03], [0.25, 0.055], [0.06, 0.055], [0.045, 0.08], [-0.045, 0.08],
         [-0.06, 0.055], [-0.25, 0.055], [-0.275, 0.03], [-0.3, 0.03], [-0.3, -0.03], [-0.275, -0.03], [-0.25, -0.055],
         [0.25, -0.055], [0.275, -0.03]]),
        'COLB': True,
        'SMOKES': 0,
        "PENDMGDST": 0.05,
        "DEGDMGCOF": 0.75,
        'TORPEDOS': 0,
        'AAROCKETS': 0,
        'CARRIER': True,
        'GASTYPE': 0,
        'TAKEN': False,
        'CARVEH': [8, 5],
        'CARRY': 10,
        'SPAWN': 0,
        'BOMBS': 0,
        'GROUNDSPEED': 0.1,
        'HP': 2500,
        'COLP': True,
        'HPMAX': 2500,
        'COLS': True,
        'Z': 0,
        'SPWEP': None,
        'MOVETYPE': 0,
        'BOOST': 0.0125,  ################## TIMED 0.0025
        'MAXSPEED': 0.1,
        'TURN': 10,  # 5
        'AMMO': {'m': 0, 'p': 7500, 't': 0, 'h': 750, 'f': 0},
        'CAN': [['h', 0.025, 0.055, 250, datetime.datetime.now(), None, True, 0, 0, 0],
                ['h', -0.025, 0.055, 250, datetime.datetime.now(), None, True, 0, 0, 0]],
    },

    8: {'DEFCOL': Polygon(
        [[0.02, 0.01], [0.02, -0.01], [0.01, -0.01], [0.01, -0.04], [-0.01, -0.04], [-0.01, -0.0075], [-0.03, -0.005],
         [-0.03, -0.02], [-0.04, -0.02], [-0.04, 0.02], [-0.03, 0.02], [-0.03, 0.005], [-0.01, 0.0075], [-0.01, 0.04],
         [0.01, 0.04], [0.01, 0.01]]),
        'COLB': False,
        'SMOKES': 0,
        "PENDMGDST": 0.02,
        'TORPEDOS': 0,
        'GROUNDSPEED': 0.4,
        "DEGDMGCOF": 0.1,
        'HP': 30,
        'GASTYPE': 1,
        'SPAWN': 2,
        'COLP': False,
        'CARRIER': False,
        'TAKEN': True,
        'Z': 1,
        'HPMAX': 30,
        'COLS': False,
        'AAROCKETS': 4,
        'SPWEP': 1,
        'MOVETYPE': 2,
        'BOMBS': 0,
        'BOOST': 0.01,
        'MAXSPEED': 0.4,
        'TURN': 240,
        'AMMO': {'m': 0, 'p': 0, 't': 0, 'h': 0, 'f': 250},
        'CAN': [['f', 0, 0, 250, datetime.datetime.now(), None, True, 0, 0, 0]],
    },
    5: {'DEFCOL': Polygon(
        [[0.02, 0.011], [0.02, -0.011], [0.01, -0.011], [0.01, -0.05], [-0.015, -0.05], [-0.015, -0.011],
         [-0.025, -0.011], [-0.05, -0.007], [-0.05, -0.02], [-0.065, -0.02], [-0.065, 0.02], [-0.05, 0.02],
         [-0.05, 0.006], [-0.025, 0.011], [-0.015, 0.011], [-0.015, 0.05], [0.01, 0.05], [0.01, 0.011]]),
        'COLB': False,
        'SMOKES': 0,
        "PENDMGDST": 0.02,
        'TORPEDOS': 0,
        'GROUNDSPEED': 0.35,
        "DEGDMGCOF": 0.1,
        'HP': 30,
        'GASTYPE': 1,
        'SPAWN': 2,
        'COLP': False,
        'CARRIER': False,
        'TAKEN': True,
        'Z': 1,
        'HPMAX': 30,
        'COLS': False,
        'AAROCKETS': 0,
        'BOMBS': 5,
        'SPWEP': 2,
        'MOVETYPE': 2,
        'BOOST': 0.0075,
        'MAXSPEED': 0.35,
        'TURN': 80,
        'AMMO': {'m': 0, 'p': 100, 't': 0, 'h': 0, 'f': 0},
        'CAN': [['p', 0 - 0.025, 0, 100, datetime.datetime.now(), None, True, 0, 0, 1]],
    },
}

BuildingHPcof = {
    0: 100,
    1: 50,
    2: 100,
    3: 250

}

caninfo = {
    'm': [12 / 320, 18 / 320, 6 / 320, 50, 1000000 * 3, 0.75, 6, 2, 4, 3, 0.1],  # last - DEGDMGCOF
    'p': [5 / 320, 12 / 320, 2 / 320, 1, 1000000 * 0.09, 1, 2, 3, 1, 0, 4],
    't': [9 / 320, 20 / 320, 4 / 320, 25, 1000000 * 2, 1.25, 4, 1, 3, 2, 0.5],
    'h': [7 / 320, 14 / 320, 2 / 320, 5, 1000000 * 0.5, 1, 3, 1, 2, 1, 2],
    'f': [0 / 320, 0 / 320, 0 / 320, 1, 1000000 * 0.09, 1, 2, 3, 1, 0, 4],

}
DEBUGVAL0 = 0
DEFSQSIZE = 320
JSVEHs = os.environ['JS_VEH']
# MAPJSON = open('../httpserver/static/MAP.json', 'r').read()
MAPJSON = os.environ['JSON_MAP']
# print(MAPJSON)
MAP = None
with open('server/MAP.json', 'r') as file:
    MAP = json.load(file)
    print(MAP)
MAPobjSIDEdir = {'S': {}, 'B': {}, 'C': {}, "#": {}}
# print(MAP['B'])
i = 0
WH = MAP['WH']
BuildingsHP = {}
BuildingsSTS = {}
BuildingsRecover = {}
BuildingsTypes = {}
for i in range(0, len(MAP['#'])):
    MAPobjSIDEdir['#'][i] = {}
    BuildingsHP[i] = {}
    BuildingsSTS[i] = {}
    BuildingsRecover[i] = {}
    BuildingsTypes[i] = {}
    for _ in range(0, len(MAP['#'][i])):
        cos = math.cos(MAP['#'][i][_][5] / 180 * math.pi)
        sin = math.sin(MAP['#'][i][_][5] / 180 * math.pi)
        poly = [[-MAP['#'][i][_][4] / 2, -MAP['#'][i][_][3] / 2], [-MAP['#'][i][_][4] / 2, MAP['#'][i][_][3] / 2],
                [MAP['#'][i][_][4] / 2, MAP['#'][i][_][3] / 2], [MAP['#'][i][_][4] / 2, -MAP['#'][i][_][3] / 2]]
        npoly = []
        idf = MAP['#'][i][_][0]
        for j in range(0, 4):
            npoly.append((MAP['#'][i][_][1] + poly[j][1] * cos + poly[j][0] * sin,
                          MAP['#'][i][_][2] + poly[j][1] * sin + poly[j][0] * -cos))
        MAP['#'][i][_] = npoly
        srtg = (Polygon(LinearRing(MAP['#'][i][_]).parallel_offset(0.01, 'right', join_style=1, resolution=1).coords))
        MAPobjSIDEdir['#'][i][_] = True
        if srtg.area < Polygon(MAP['#'][i][_]).area:
            MAPobjSIDEdir['#'][i][_] = False

        MAP['#'][i][_] = Polygon(MAP['#'][i][_])
        BuildingsHP[i][_] = BuildingHPcof[idf] * MAP['#'][i][_].area * 100
        BuildingsSTS[i][_] = 0
        BuildingsRecover[i][_] = 0
        BuildingsTypes[i][_] = idf
for i in range(0, len(MAP['S'])):
    srtg = (Polygon(
        LinearRing(MAP['S'][i]).parallel_offset(0.01, 'right', join_style=1, resolution=1).coords))
    MAPobjSIDEdir['S'][i] = True
    if srtg.area < Polygon(MAP['S'][i]).area:
        MAPobjSIDEdir['S'][i] = False
    MAP['S'][i] = Polygon(MAP['S'][i])

for i in range(0, len(MAP['B'])):
    srtg = (Polygon(
        LinearRing(MAP['B'][i]).parallel_offset(0.01, 'right', join_style=1, resolution=1).coords))
    MAPobjSIDEdir['B'][i] = True
    if srtg.area < Polygon(MAP['B'][i]).area:
        MAPobjSIDEdir['B'][i] = False
    MAP['B'][i] = Polygon(MAP['B'][i])

for i in range(0, len(MAP['C'])):
    srtg = (Polygon(
        LinearRing(MAP['C'][i]).parallel_offset(0.01, 'right', join_style=1, resolution=1).coords))
    MAPobjSIDEdir['C'][i] = True
    if srtg.area < Polygon(MAP['C'][i]).area:
        MAPobjSIDEdir['C'][i] = False
    MAP['C'][i] = Polygon(MAP['C'][i])

Q = MAP['Q']
MAP["Q"] = {}
for x in range(0, WH):
    for y in range(0, WH):
        MAP["Q"][(x, y)] = Q[x][y]

# print(len(MAP['Z']),len(MAP['B']))
Bridges = MAP['_']
for _ in range(0, len(Bridges)):
    line = LineString([(Bridges[_][0], Bridges[_][1]), (Bridges[_][2], Bridges[_][3])])
    left_hand_side = line.buffer(0.1875 / 2, single_sided=True)
    right_hand_side = line.buffer(-0.1875 / 2, single_sided=True)
    Bridges[_].append(left_hand_side.union(right_hand_side))

for x in range(0, WH):
    for y in range(0, WH):
        MAP['Q'][(x, y)]['PLAYERS'] = set()
        MAP['Q'][(x, y)]['BULLETS'] = set()
        MAP['Q'][(x, y)]['TORPEDOS'] = set()
        MAP['Q'][(x, y)]['SMOKES'] = set()
        MAP['Q'][(x, y)]['AAROCKETS'] = set()
        MAP['Q'][(x, y)]['BOMBS'] = set()
print(MAP['*'])
Zones = {}  ### X,Y,p/t,name,perc
for _ in MAP["*"]:
    Zones[_[0]] = [_[1], _[2], '', '', 0, _[3]]
print(Zones)
PlayersSockets = {}
PlayersInputs = {}
PlayersData = {}
PlayersCosmetics = {}
PlayersAccs = {}
Teams = {None: []}
TeamRec = {}  # Player=>team
TeamsOwners = {}
Bullets = {}
Torpedos = {}
AARockets = {}
Bombs = {}
TorpedosHandler = {}
BulletsHandler = {}
AARocketsHandler = {}
BombsHandler = {}
Smokes = {}
# Bodies = {}
LastBulletI = 0
LastTorpedoI = 0
LastSmokeI = 0
LastAARocketI = 0
LastBombI = 0
LastMSGI = 0
ServInfoJSON = open('server/SERVINFO.json', 'r').read()


def lookat(x, y):
    if x == 0:
        x = 0.001
    angle = math.atan((y / x)) / (math.pi / 180)
    if y != abs(y):
        angle = angle + 360
    if x != abs(x):
        angle = angle + 180
    return angle % 360


def posScr(poly, x, y, t, w=1920, h=1080):
    a = list(poly.exterior.coords)
    for _ in range(0, len(a)):
        a[_] = [a[_][0] * t - x * t + int(w / 2), a[_][1] * t - y * t + int(h / 2)]
    return Polygon(a)


def rotateandpos(poly, deg, x, y, t):
    deg = deg / 180 * math.pi
    a = list(poly.exterior.coords)
    for _ in range(0, len(a)):
        a[_] = [x + a[_][0] * math.cos(deg) * t, y + a[_][1] * math.sin(deg) * t]
    return Polygon(a)


def barrier(val, min=0, max=None, minrep=None, maxrep=None):
    if minrep is None: minrep = min
    if maxrep is None: maxrep = max
    if not min is None and val < min:
        return minrep
    elif not max is None and val > max:
        return maxrep
    else:
        return val


WORLD = World('server/MAP.json')


@logger.catch()
async def game():
    global LastBulletI
    global LastTorpedoI
    global LastSmokeI
    global LastAARocketI
    global LastBombI
    global LastMSGI
    delay = time.time()
    WORLD.space0.step(1 / TPS)
    while True:
        await asyncio.sleep(1 / TPS - (time.time() - delay))
        delay = time.time()

        KickList = []
        for player in PlayersSockets.keys():
            try:
                if (datetime.datetime.now() - PlayersAccs[player][
                    'contime']).seconds > 2 and not player in PlayersInputs:
                    KickList.append(player)
            except Exception:
                pass

                for _ in PlayersData[player]['CAN']:

                    # print(PlayersInputs[player]['view'])
                    # print(PlayersInputs[player]['view'] == 1 and PlayersCosmetics[player]['VEHICLE'] == 0)

                    if _[9] != PlayersInputs[player]['view'] or (
                            PlayersInputs[player]['view'] == 1 and PlayersCosmetics[player]['VEHICLE'] == 0):
                        _[7] = PlayersData[player]['DIR']
                    if _[9] != (PlayersInputs[player]['view'] or PlayersData[player]['TAKEN']) and not (
                            PlayersInputs[player]['view'] == 1 and PlayersCosmetics[player]['VEHICLE'] == 0): continue
                    d = math.sqrt(_[1] ** 2 + _[2] ** 2)
                    deg = lookat(_[1], _[2])
                    a = (math.cos((deg + PlayersData[player]['DIR']) / 180 * math.pi) * d,
                         math.sin((deg + PlayersData[player]['DIR']) / 180 * math.pi) * d)
                    if _[0] == 'f':
                        b = PlayersData[player]['DIR']
                    else:
                        if PlayersInputs[player]['Cmod']:
                            b = lookat(PlayersInputs[player]['x'], PlayersInputs[player]['y'])
                        else:
                            b = lookat(PlayersInputs[player]['x'] - a[0], PlayersInputs[player]['y'] - a[1])
                    if PlayersData[player]['STATUS'] == "ALIVE": _[7] = b
                # print(PlayersData[player]['ZOOM'],PlayersInputs[player]['z'])
                # print(PlayersAccs)
                if PlayersCosmetics[player]['VEHICLE'] == 0:
                    PlayersData[player][
                        'STR'] = f'{PlayersCosmetics[player]["VEHICLE"]},{("[" + str(PlayersData[player]["TEAM"]) + "]") * int(not PlayersData[player]["TEAM"] is None) + player},{PlayersAccs[player]["money"]},{PlayersData[player]["TORPEDOS"]},{PlayersData[player]["SMOKES"]},' + str(
                        PlayersData[player][
                            'GAS'] / 25) + f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"] * 1000) / 1000},{int(PlayersData[player]["Y"] * 1000) / 1000},{PlayersData[player]["Z"] * 2 + int(PlayersData[player]["ONGROUND"])},' + str(
                        int(PlayersData[player]['SPEED'] / vehicleinfo[PlayersCosmetics[player]['VEHICLE']][
                            'GROUNDSPEED'] * 100)) + f',{int(PlayersData[player]["CAN"][0][8])}{int(PlayersData[player]["CAN"][0][7])},{int(PlayersData[player]["CAN"][1][8])}{int(PlayersData[player]["CAN"][1][7])},' + str(
                        int(not (PlayersData[player]['STATUS'] == 'BURNING' or PlayersData[player][
                            'STATUS'] == 'DEAD')) * PlayersCosmetics[player][
                            'COLOR']) + f",{int((datetime.datetime.now() - PlayersData[player]['LASTTORPEDO']).seconds < 5 + 1 / TPS)},{int((datetime.datetime.now() - PlayersData[player]['LASTSMOKE']).seconds < 5 + 1 / TPS)}"
                elif PlayersCosmetics[player]['VEHICLE'] == 1:
                    PlayersData[player][
                        'STR'] = f'{PlayersCosmetics[player]["VEHICLE"]},{("[" + str(PlayersData[player]["TEAM"]) + "]") * int(not PlayersData[player]["TEAM"] is None) + player},{PlayersAccs[player]["money"]},' + str(
                        PlayersData[player][
                            'GAS'] / 25) + f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"] * 1000) / 1000},{int(PlayersData[player]["Y"] * 1000) / 1000},{PlayersData[player]["Z"] * 2 + int(PlayersData[player]["ONGROUND"])},' + str(
                        int(PlayersData[player]['SPEED'] / vehicleinfo[PlayersCosmetics[player]['VEHICLE']][
                            'GROUNDSPEED'] * 100)) + f',{int(PlayersData[player]["CAN"][0][8])}{int(PlayersData[player]["CAN"][0][7])},' + str(
                        int(not (PlayersData[player]['STATUS'] == 'BURNING' or PlayersData[player][
                            'STATUS'] == 'DEAD')) * PlayersCosmetics[player]['COLOR'])
                elif PlayersCosmetics[player]['VEHICLE'] == 2:
                    PlayersData[player][
                        'STR'] = f'{PlayersCosmetics[player]["VEHICLE"]},{("[" + str(PlayersData[player]["TEAM"]) + "]") * int(not PlayersData[player]["TEAM"] is None) + player},{PlayersAccs[player]["money"]},{PlayersData[player]["TORPEDOS"]},{PlayersData[player]["SMOKES"]},' + str(
                        PlayersData[player][
                            'GAS'] / 25) + f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"] * 1000) / 1000},{int(PlayersData[player]["Y"] * 1000) / 1000},{PlayersData[player]["Z"] * 2 + int(PlayersData[player]["ONGROUND"])},' + str(
                        int(PlayersData[player]['SPEED'] / vehicleinfo[PlayersCosmetics[player]['VEHICLE']][
                            'GROUNDSPEED'] * 100)) + f',{int(PlayersData[player]["CAN"][0][8])}{int(PlayersData[player]["CAN"][0][7])},' + str(
                        int(not (PlayersData[player]['STATUS'] == 'BURNING' or PlayersData[player][
                            'STATUS'] == 'DEAD')) * PlayersCosmetics[player][
                            'COLOR']) + f",{int((datetime.datetime.now() - PlayersData[player]['LASTTORPEDO']).seconds < 5 + 1 / TPS)},{int((datetime.datetime.now() - PlayersData[player]['LASTSMOKE']).seconds < 5 + 1 / TPS)}"
                    # print(PlayersData[player]['STR'] )
                elif PlayersCosmetics[player]['VEHICLE'] == 3:
                    PlayersData[player][
                        'STR'] = f'{PlayersCosmetics[player]["VEHICLE"]},{("[" + str(PlayersData[player]["TEAM"]) + "]") * int(not PlayersData[player]["TEAM"] is None) + player},{PlayersAccs[player]["money"]},' + str(
                        PlayersData[player][
                            'GAS'] / 25) + f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"] * 1000) / 1000},{int(PlayersData[player]["Y"] * 1000) / 1000},{PlayersData[player]["Z"] * 2 + int(PlayersData[player]["ONGROUND"])},' + str(
                        int(PlayersData[player]['SPEED'] / vehicleinfo[PlayersCosmetics[player]['VEHICLE']][
                            'GROUNDSPEED'] * 100)) + f',{int(PlayersData[player]["CAN"][0][8])}{int(PlayersData[player]["CAN"][0][7])},{int(PlayersData[player]["CAN"][1][8])}{int(PlayersData[player]["CAN"][1][7])},' + str(
                        int(not (PlayersData[player]['STATUS'] == 'BURNING' or PlayersData[player][
                            'STATUS'] == 'DEAD')) * PlayersCosmetics[player]['COLOR']) + "," + str(
                        len(PlayersData[player]['CARRY']))
                elif PlayersCosmetics[player]['VEHICLE'] == 4:
                    PlayersData[player][
                        'STR'] = f'{PlayersCosmetics[player]["VEHICLE"]},{("[" + str(PlayersData[player]["TEAM"]) + "]") * int(not PlayersData[player]["TEAM"] is None) + player},{PlayersAccs[player]["money"]},' + str(
                        PlayersData[player][
                            'GAS'] / 25) + f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"] * 1000) / 1000},{int(PlayersData[player]["Y"] * 1000) / 1000},{PlayersData[player]["Z"] * 2 + int(PlayersData[player]["ONGROUND"])},' + str(
                        int(PlayersData[player]['SPEED'] / vehicleinfo[PlayersCosmetics[player]['VEHICLE']][
                            'GROUNDSPEED'] * 100)) + f',{int(PlayersData[player]["CAN"][0][8])}{int(PlayersData[player]["CAN"][0][7])},{int(PlayersData[player]["CAN"][1][8])}{int(PlayersData[player]["CAN"][1][7])},' + str(
                        int(not (PlayersData[player]['STATUS'] == 'BURNING' or PlayersData[player][
                            'STATUS'] == 'DEAD')) * PlayersCosmetics[player]['COLOR']) + "," + str(
                        len(PlayersData[player]['CARRY']))
                # elif PlayersCosmetics[player]['VEHICLE'] == 5:
                #     if vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['MOVETYPE'] == 2:
                #         PlayersData[player]['STR'] = f'{PlayersData[player]["TORPEDOS"]},{PlayersData[player]["SMOKES"]},1,'+str(PlayersData[player]['GAS'])+f',{str(int(PlayersData[player]["DIR"]))},{("["+str(PlayersData[player]["TEAM"])+"]")*int(not PlayersData[player]["TEAM"] is None)+player},{str(int(PlayersData[player]["HP"]))},{str(int(PlayersData[player]["HPMAX"]))},{str(PlayersData[player]["X"])},{str(PlayersData[player]["Y"])},{PlayersAccs[player]["money"]},{WH},'+str(int(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*100))
                #     else:
                #         PlayersData[player]['STR'] = f'{PlayersData[player]["TORPEDOS"]},{PlayersData[player]["SMOKES"]},1,' + '+' * int(PlayersData[player]['GAS'] >= 0) + str(PlayersData[player]['GAS']) + f',{str(int(PlayersData[player]["DIR"]))},{("["+str(PlayersData[player]["TEAM"])+"]")*int(not PlayersData[player]["TEAM"] is None)+player},{str(int(PlayersData[player]["HP"]))},{str(int(PlayersData[player]["HPMAX"]))},{str(PlayersData[player]["X"])},{str(PlayersData[player]["Y"])},{PlayersAccs[player]["money"]},{WH},'+str(int(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*100))
                # elif PlayersCosmetics[player]['VEHICLE'] == 6:
                #     if vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['MOVETYPE'] == 2:
                #         PlayersData[player]['STR'] = f'{PlayersData[player]["TORPEDOS"]},{PlayersData[player]["SMOKES"]},1,'+str(PlayersData[player]['GAS'])+f',{str(int(PlayersData[player]["DIR"]))},{("["+str(PlayersData[player]["TEAM"])+"]")*int(not PlayersData[player]["TEAM"] is None)+player},{str(int(PlayersData[player]["HP"]))},{str(int(PlayersData[player]["HPMAX"]))},{str(PlayersData[player]["X"])},{str(PlayersData[player]["Y"])},{PlayersAccs[player]["money"]},{WH},'+str(int(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*100))
                #     else:
                #         PlayersData[player]['STR'] = f'{PlayersData[player]["TORPEDOS"]},{PlayersData[player]["SMOKES"]},1,' + '+' * int(PlayersData[player]['GAS'] >= 0) + str(PlayersData[player]['GAS']) + f',{str(int(PlayersData[player]["DIR"]))},{("["+str(PlayersData[player]["TEAM"])+"]")*int(not PlayersData[player]["TEAM"] is None)+player},{str(int(PlayersData[player]["HP"]))},{str(int(PlayersData[player]["HPMAX"]))},{str(PlayersData[player]["X"])},{str(PlayersData[player]["Y"])},{PlayersAccs[player]["money"]},{WH},'+str(int(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*100))
                elif PlayersCosmetics[player]['VEHICLE'] == 5:
                    PlayersData[player][
                        'STR'] = f'{PlayersCosmetics[player]["VEHICLE"]},{("[" + str(PlayersData[player]["TEAM"]) + "]") * int(not PlayersData[player]["TEAM"] is None) + player},{PlayersAccs[player]["money"]},' + str(
                        PlayersData[player][
                            'GAS']) + f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"] * 1000) / 1000},{int(PlayersData[player]["Y"] * 1000) / 1000},{PlayersData[player]["Z"] * 2 + int(PlayersData[player]["ONGROUND"])},' + str(
                        int(PlayersData[player]['SPEED'] / vehicleinfo[PlayersCosmetics[player]['VEHICLE']][
                            'GROUNDSPEED'] * 1000) / 10) + f',{int(PlayersData[player]["CAN"][0][8])},' + str(int(not (
                            PlayersData[player]['STATUS'] == 'BURNING' or PlayersData[player][
                        'STATUS'] == 'DEAD')) * PlayersCosmetics[player]['COLOR']) + ',' + str(
                        PlayersCosmetics[player]['TRACER']) + ',' + str(PlayersData[player][
                                                                            'BOMBS']) + f',{PlayersData[player]["CAN"][0][8]}{PlayersData[player]["CAN"][0][7]}'
                elif PlayersCosmetics[player]['VEHICLE'] == 8:
                    PlayersData[player][
                        'STR'] = f'{PlayersCosmetics[player]["VEHICLE"]},{("[" + str(PlayersData[player]["TEAM"]) + "]") * int(not PlayersData[player]["TEAM"] is None) + player},{PlayersAccs[player]["money"]},' + str(
                        PlayersData[player][
                            'GAS']) + f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"] * 1000) / 1000},{int(PlayersData[player]["Y"] * 1000) / 1000},{PlayersData[player]["Z"] * 2 + int(PlayersData[player]["ONGROUND"])},' + str(
                        int(PlayersData[player]['SPEED'] / vehicleinfo[PlayersCosmetics[player]['VEHICLE']][
                            'GROUNDSPEED'] * 100)) + f',{int(PlayersData[player]["CAN"][0][8])},' + str(int(not (
                            PlayersData[player]['STATUS'] == 'BURNING' or PlayersData[player][
                        'STATUS'] == 'DEAD')) * PlayersCosmetics[player]['COLOR']) + ',' + str(
                        PlayersCosmetics[player]['TRACER']) + ',' + str(PlayersData[player]['AAROCKETS'])
                PlayersData[player]['STR'] += ','
                for _ in Zones:
                    PlayersData[player]['STR'] += str(int((Zones[_][2] == 'player' and Zones[_][3] == player) or (
                            Zones[_][2] == 'team' and Zones[_][3] == PlayersData[player]['TEAM'])))
                PlayersData[player]['VISB'] = set()
                PlayersData[player]['VISC'] = set()
                OldVisTor = PlayersData[player]['VISTOR'].copy()
                OldVisBul = PlayersData[player]['VISBUL'].copy()
                OldVisSmk = PlayersData[player]['VISSMK'].copy()
                OldVisAar = PlayersData[player]['VISAAR'].copy()
                OldVisBmb = PlayersData[player]['VISBMB'].copy()
                OldVisBuildings = PlayersData[player]['VIS#'].copy()
                PlayersData[player]['VISS'] = set()
                PlayersData[player]['VIS#'] = set()
                PlayersData[player]['VISBUL'] = set()
                PlayersData[player]['VISTOR'] = set()
                PlayersData[player]['VISSMK'] = set()
                PlayersData[player]['VISAAR'] = set()
                PlayersData[player]['VISBMB'] = set()

                PlayersData[player]['VISBRIDGES'] = set()
                part = ''
                for x in range(int(PlayersData[player]['X'] // 1) - VIEW_X - 1,
                               int(PlayersData[player]['X'] // 1) + VIEW_X + 2):
                    for y in range(int(PlayersData[player]['Y'] // 1) - VIEW_Y - 1,
                                   int(PlayersData[player]['Y'] // 1) + VIEW_Y + 2):
                        try:
                            MAP['Q'][(x, y)]['PLAYERS'].discard(player)
                        except:
                            pass
                if PlayersInputs[player]['tbk']:
                    PlayersData[player]['STR'] += f'\nt'
                    for _ in PlayersData.keys():
                        PlayersData[player][
                            'STR'] += f',{("[" + str(PlayersData[_]["TEAM"]) + "]") * int(not PlayersData[_]["TEAM"] is None) + _},{PlayersData[_]["SCORES"]}'
                        # if not PlayersData[_]["TEAM"] is None: PlayersData[player]['STR']+= ','+PlayersData[_]["TEAM"]
                # if PlayersInputs[player]['clk']:
                #     if PlayersData[player]['TEAM'] is None:
                #         PlayersData[player]['STR'] += f'\nq'
                #         for _ in Teams.keys():
                #             if not _ is None: PlayersData[player]['STR'] += f',{_}'
                #     elif TeamsOwners[PlayersData[player]['TEAM']] == player:
                #         PlayersData[player]['STR'] += f'\nw'
                #         for _ in Teams[PlayersData[player]['TEAM']]:
                #             PlayersData[player]['STR'] += f',{_}'
                #     else:
                #         PlayersData[player]['STR'] += f'\ne'
                #         for _ in Teams[PlayersData[player]['TEAM']]:
                #             PlayersData[player]['STR'] += f',{_}'
                # print(PlayersData[player]['VISTOR'])
                for x in range(int(PlayersData[player]['X'] // 1) - VIEW_X,
                               int(PlayersData[player]['X'] // 1) + VIEW_X + 1):
                    for y in range(int(PlayersData[player]['Y'] // 1) - VIEW_Y,
                                   int(PlayersData[player]['Y'] // 1) + VIEW_Y + 1):
                        try:
                            for _ in MAP['Q'][(x, y)]['B']:
                                PlayersData[player]['VISB'].add(_)
                            for _ in MAP['Q'][(x, y)]['C']:
                                PlayersData[player]['VISC'].add(_)
                            for _ in MAP['Q'][(x, y)]['#']:
                                PlayersData[player]['VIS#'].add(_)
                            # for _ in OFICIAL-MAP0['Q'][(x, y)]['G']:
                            #     PlayersData[player]['VISG'].add(_)
                            # for _ in OFICIAL-MAP0['Q'][(x, y)]['Z']:
                            #     PlayersData[player]['VISZ'].add(_)
                            for _ in MAP['Q'][(x, y)]['S']:
                                PlayersData[player]['VISS'].add(_)
                            for _ in MAP['Q'][(x, y)]['BULLETS']:
                                PlayersData[player]['VISBUL'].add(_)
                            for _ in MAP['Q'][(x, y)]['TORPEDOS']:
                                PlayersData[player]['VISTOR'].add(_)
                            for _ in MAP['Q'][(x, y)]['AAROCKETS']:
                                PlayersData[player]['VISAAR'].add(_)
                            for _ in MAP['Q'][(x, y)]['BOMBS']:
                                PlayersData[player]['VISBMB'].add(_)
                            for _ in MAP['Q'][(x, y)]['SMOKES']:
                                PlayersData[player]['VISSMK'].add(_)
                            for _ in MAP['Q'][(x, y)]['_']:
                                PlayersData[player]['VISBRIDGES'].add(_)
                            MAP['Q'][(x, y)]['PLAYERS'].add(player)
                        except:
                            pass
                #                    part=''
                SmokesAppeared = PlayersData[player]['VISSMK'] - OldVisSmk
                TorpedosAppeared = PlayersData[player]['VISTOR'] - OldVisTor
                BulletsAppeared = PlayersData[player]['VISBUL'] - OldVisBul
                AARocketsAppeared = PlayersData[player]['VISAAR'] - OldVisAar
                BombsAppeared = PlayersData[player]['VISBMB'] - OldVisBmb
                BuildingsAppeared = PlayersData[player]['VIS#'] - OldVisBuildings
                # print(PlayersData[player]['VISTOR'])
                while len(PlayersData[player]['MSGTURN']) > 0:
                    PlayersData[player]['STR'] += PlayersData[player]['MSGTURN'][0]
                    PlayersData[player]['MSGTURN'].pop(0)
                    # print(PlayersData[player]['STR'])
                # for _ in list(PlayersData[player]['VISZ']):
                #     _0 = posScr(OFICIAL-MAP0['Z'][_],PlayersData[player]['X'],PlayersData[player]['Y'],320,PlayersInputs[player]["w"],PlayersInputs[player]["h"]).exterior.coords
                #     PlayersData[player]['STR'] += f'\nz,{_}'
                #     for c in _0:
                #         PlayersData[player]['STR'] += f',{int(c[0])},{int(c[1])}'
                # for _ in list(PlayersData[player]['VISG']):
                #     _0 = posScr(OFICIAL-MAP0['G'][_],PlayersData[player]['X'],PlayersData[player]['Y'],320,PlayersInputs[player]["w"],PlayersInputs[player]["h"]).exterior.coords
                #     PlayersData[player]['STR'] += f'\ng,{_}'
                #     for c in _0:
                #         PlayersData[player]['STR'] += f',{int(c[0])},{int(c[1])}'
                # PlayersData[player]['STR'] += part
                PlayersData[player]['INSMK'] = False

                delarr = []

                for _ in list(PlayersData[player]['VISSMK']):
                    try:
                        #     print(PlayersData[player]['COL'].intersection(Point(Smokes[_][0], Smokes[_][1]).buffer(Smokes[_][2])).area,PlayersData[player]['COL'].area)
                        if int(PlayersData[player]['COL'].intersection(
                                Point(Smokes[_][0], Smokes[_][1]).buffer(Smokes[_][2])).area * 1000) / 1000 == int(
                            PlayersData[player]['COL'].area * 1000) / 1000 and PlayersData[player][
                            'INSMK'] == False and PlayersData[player]['Z'] == 0:
                            PlayersData[player]['INSMK'] = True

                    except KeyError:
                        delarr.append(_)
                    # except Exception:
                    #     logging.exception("message")
                    # print(OldVisSmk,PlayersData[player]['VISSMK'])
                SmokesDisappeared = OldVisSmk - PlayersData[player]['VISSMK']
                for _ in delarr:
                    PlayersData[player]['VISSMK'].remove(_)
                for _ in list(SmokesAppeared):
                    PlayersData[player]['STR'] += f'\np,{_},' + str(Smokes[_][0]) + ',' + str(Smokes[_][1])
                for _ in list(SmokesDisappeared):
                    PlayersData[player]['STR'] += f'\np,{_}'
                # for _ in Zones.keys():
                #     if abs(PlayersData[player]['X']-Zones[_][0]) < 5 and abs(PlayersData[player]['Y']-Zones[_][1]) < 4:
                #         q = 0
                #         if (Zones[_][2] == 'player' and Zones[_][3]==player)or(Zones[_][2] == 'team' and Zones[_][3]==PlayersData[player]['TEAM']): q =1
                #         PlayersData[player]['STR'] += f'\n*,{_},'+str(int((Zones[_][0]-PlayersData[player]['X'])*320+PlayersInputs[player]['w']/2))+','+str(int((Zones[_][1]-PlayersData[player]['Y'])*320+PlayersInputs[player]['h']/2))+','+str(q)
                if PlayersData[player]["STATUS"] == 'ALIVE' and vehicleinfo[PlayersCosmetics[player]['VEHICLE']][
                    'SPWEP'] == 2 and PlayersInputs[player]['spk'] and PlayersData[player]["BOMBS"] > 0 and (
                        datetime.datetime.now() - PlayersData[player]["LASTBOMB"]).total_seconds() > 0.5:
                    PlayersData[player]["BOMBS"] -= 1
                    randDir = random.random() * 2 * math.pi
                    randDst = random.random() * 0.1 * PlayersData[player]["SPEED"] / \
                              vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['MAXSPEED']
                    x = PlayersData[player]["X"] + 2 * PlayersData[player]["SPEED"] * math.cos(
                        PlayersData[player]["DIR"] / 180 * math.pi) + math.cos(randDir) * randDst
                    y = PlayersData[player]["Y"] + 2 * PlayersData[player]["SPEED"] * math.sin(
                        PlayersData[player]["DIR"] / 180 * math.pi) + math.sin(randDir) * randDst
                    # print("!!!")
                    Bombs[LastBombI] = [PlayersData[player]["X"], PlayersData[player]["Y"], x, y, time.time(), player,
                                        PlayersData[player]["DIR"], 750, 3, 0.25, 3]
                    LastBombI += 1
                    PlayersData[player]["LASTBOMB"] = datetime.datetime.now()
                if PlayersData[player]["STATUS"] == 'ALIVE' and vehicleinfo[PlayersCosmetics[player]['VEHICLE']][
                    'SPWEP'] == 1 and PlayersInputs[player]['spk'] and PlayersData[player]["AAROCKETS"] > 0 and (
                        datetime.datetime.now() - PlayersData[player]["LASTAAROCKET"]).total_seconds() > 0.3:
                    PlayersData[player]["AAROCKETS"] -= 1
                    AARockets[LastAARocketI] = [PlayersData[player]["X"], PlayersData[player]["Y"], 0, 0, time.time(),
                                                PlayersData[player]["DIR"] + round(random.random() * 20 - 10),
                                                PlayersData[player]['SPEED'], player, None, 40, 3, 0.5, 1.25]
                    LastAARocketI += 1
                    PlayersData[player]["LASTAAROCKET"] = datetime.datetime.now()
                if PlayersData[player]["STATUS"] == 'ALIVE' and vehicleinfo[PlayersCosmetics[player]['VEHICLE']][
                    'SPWEP'] == 0 and PlayersInputs[player]['spk'] and PlayersData[player]["TORPEDOS"] > 0 and (
                        datetime.datetime.now() - PlayersData[player]["LASTTORPEDO"]).seconds > 5:
                    PlayersData[player]["TORPEDOS"] -= 1
                    Torpedos[LastTorpedoI] = [PlayersData[player]["X"], PlayersData[player]["Y"], 0, 0, 0,
                                              PlayersData[player]["DIR"], 0.225, player, None, 500, 3]
                    LastTorpedoI += 1
                    PlayersData[player]["LASTTORPEDO"] = datetime.datetime.now()
                if PlayersData[player]["STATUS"] == 'ALIVE' and PlayersInputs[player]['gk'] and PlayersData[player][
                    "SMOKES"] > 0 and (datetime.datetime.now() - PlayersData[player]["LASTSMOKE"]).seconds > 2:
                    PlayersData[player]["SMOKES"] -= 1
                    Smokes[LastSmokeI] = [PlayersData[player]["X"], PlayersData[player]["Y"], 0.2,
                                          datetime.datetime.now(), 's']
                    LastSmokeI += 1
                    PlayersData[player]["LASTSMOKE"] = datetime.datetime.now()

                # print('ooo')
                wasShot = False
                for _ in PlayersData[player]['CAN']:
                    if PlayersData[player]['TAKEN'] or (_[9] != PlayersInputs[player]['view'] and not (
                            PlayersInputs[player]['view'] == 1 and PlayersCosmetics[player]['VEHICLE'] == 0)): continue
                    # _[5] = False
                    d = math.sqrt(_[1] ** 2 + _[2] ** 2)
                    deg = lookat(_[1], _[2])
                    a = (math.cos((deg + PlayersData[player]['DIR']) / 180 * math.pi) * d,
                         math.sin((deg + PlayersData[player]['DIR']) / 180 * math.pi) * d)
                    # if _[0] == 'f':
                    #     b = PlayersData[player]['DIR']
                    # else:
                    #     if PlayersInputs[player]['Cmod']:
                    #         b = lookat(PlayersInputs[player]['x'],PlayersInputs[player]['y'])
                    #     else:
                    #         b = lookat(PlayersInputs[player]['x'] - math.ceil(a[0] ),PlayersInputs[player]['y'] +  math.ceil(a[1] ))
                    c = (math.cos((_[7]) / 180 * math.pi) * caninfo[_[0]][1] * 320,
                         math.sin((_[7]) / 180 * math.pi) * caninfo[_[0]][1] * 320)
                    _[5] = Point(a[0], a[1]).buffer(caninfo[_[0]][0])
                    j = LineString([[a[0], a[1]], [a[0] + math.cos((_[7]) / 180 * math.pi) * 0.2,
                                                   a[1] + math.sin((_[7]) / 180 * math.pi) * 0.2]])
                    g = True
                    for i in PlayersData[player]['CAN']:
                        if not PlayersData[player]['CAN'].index(i) == PlayersData[player]['CAN'].index(_) and not i[
                                                                                                                      5] is None:
                            if j.intersects(i[5]):
                                if caninfo[i[0]][9] >= caninfo[_[0]][9]: g = False
                    h = False
                    if g and PlayersData[player]["STATUS"] == 'ALIVE' and PlayersInputs[player]['m0'] and \
                            PlayersData[player]['AMMO'][_[0]] > 0 and (datetime.datetime.now() - _[4]).microseconds + (
                            datetime.datetime.now() - _[4]).seconds * 1000000 >= caninfo[_[0]][4]:
                        # print(vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['CAN'])
                        # if (PlayersInputs[player]['Xmod']==1 and (_[0] == 'p' or _[0] == 'h'or _[0] == 'f')) or PlayersInputs[player]['Xmod']==0:    ############### BETA
                        PlayersData[player]['AMMO'][_[0]] -= 1
                        h = True
                        _[8] = 1
                        _[4] = datetime.datetime.now()
                        wasShot = True

                        if PlayersInputs[player]['view'] == 1 and PlayersCosmetics[player]['VEHICLE'] == 0:
                            dst = math.sqrt((PlayersInputs[player]['x']) ** 2 + (PlayersInputs[player]['y']) ** 2)
                            if dst > 3: dst = 3
                            dst = dst + 0.05 * dst - random.random() * dst * 0.1
                            shtdir = _[7] - caninfo[_[0]][7] + random.random() * caninfo[_[0]][7] * 2
                            Bombs[LastBombI] = [PlayersData[player]["X"] + a[0], PlayersData[player]["Y"] + a[1],
                                                PlayersData[player]["X"] + a[0] + math.cos(
                                                    shtdir / 180 * math.pi) * dst,
                                                PlayersData[player]["Y"] + a[1] + math.sin(
                                                    shtdir / 180 * math.pi) * dst, time.time(),
                                                player,
                                                _[7], 40, 7,
                                                0.125, 4]
                            LastBombI += 1
                        else:
                            Bullets[LastBulletI] = [PlayersData[player]["X"] + a[0], PlayersData[player]["Y"] + a[1], 0,
                                                    0,
                                                    0, 0, 0,
                                                    _[7] - caninfo[_[0]][7] + random.random() * caninfo[_[0]][7] * 2,
                                                    caninfo[_[0]][5], caninfo[_[0]][6], 0.3, player, None,
                                                    caninfo[_[0]][3],
                                                    0, caninfo[_[0]][8] * (-1 + int(_[6]) * 2), '',
                                                    PlayersInputs[player]['Xmod'], _[0],
                                                    int(PlayersData[player]["ONGROUND"])]
                            LastBulletI += 1
                    if not wasShot and PlayersData[player]["STATUS"] == "ALIVE":
                        _[8] = 0
                    if (PlayersData[player]["STATUS"] == "BURNING" or PlayersData[player][
                        "STATUS"] == "DEAD") and 5 * TPS != PlayersData[player]["BURNTIMER"]:
                        _[8] = 2
                    # if _[6]:
                    #     PlayersData[player]['STR'] += f'\no,{player+"0"*int(len(str(PlayersData[player]["CAN"].index(_)))==1)+str(PlayersData[player]["CAN"].index(_))},{int(PlayersInputs[player]["w"] / 2+math.ceil(a[0]*320))},{int(PlayersInputs[player]["h"] / 2+math.ceil(a[1]*320))},{caninfo[_[0]][0]*320}'+','+str(int(PlayersData[player]['STATUS']=='BURNING' or PlayersData[player]['STATUS']=='DEAD'  ))+','+str(int(PlayersData[player]['STATUS']=='BURNING' or PlayersData[player]['STATUS']=='DEAD'  ))  +','+str(int(PlayersData[player]['BURNTIMER']==1 or PlayersData[player]['BURNTIMER']==5*TPS  ))
                    #     PlayersData[player]['STR'] += f'\n|,{player+"0"*int(len(str(PlayersData[player]["CAN"].index(_)))==1)+str(PlayersData[player]["CAN"].index(_))},{int(PlayersInputs[player]["w"] / 2 + math.ceil(a[0] * 320))},{int(PlayersInputs[player]["h"] / 2 + math.ceil(a[1] * 320))},{int(PlayersInputs[player]["w"] / 2 + math.ceil(a[0] * 320)+int(c[0]))},{int(PlayersInputs[player]["h"] / 2 + math.ceil(a[1] * 320)+int(c[1]))},{caninfo[_[0]][2]*320}'+','+str(int(PlayersData[player]['STATUS']=='BURNING' or PlayersData[player]['STATUS']=='DEAD'  ))+','+str(_[0]*int(h)+'0'*int(not h))
                if wasShot or not PlayersData[player]['AMMOUPDATE']:
                    PlayersData[player]['AMMOUPDATE'] = True
                    PlayersData[player][
                        'STR'] += f'\na,{PlayersData[player]["AMMO"]["m"]},{PlayersData[player]["AMMO"]["t"]},{PlayersData[player]["AMMO"]["h"]},{PlayersData[player]["AMMO"]["p"] + PlayersData[player]["AMMO"]["f"]}'
                try:
                    for z in range(0, 2):
                        for enemy in list(
                                MAP['Q'][(int(PlayersData[player]['X'] // 1), int(PlayersData[player]['Y'] // 1))][
                                    'PLAYERS']):
                            if not enemy in PlayersData: continue
                            if PlayersData[enemy]['INSMK']: continue
                            if player == enemy or PlayersData[enemy]['TAKEN'] or PlayersData[enemy]['Z'] != z: continue
                            # _0 = posScr(PlayersData[enemy]['COL'],PlayersData[player]['X'],PlayersData[player]['Y'],320,PlayersInputs[player]["w"],PlayersInputs[player]["h"]).exterior.coords
                            # PlayersData[player]['STR'] += f'\nf,{enemy}'
                            # for c in _0:
                            #     PlayersData[player]['STR'] += f',{int(c[0])},{int(c[1])}'
                            # PlayersData[player]['STR'] += ','+str(int(not(PlayersData[enemy]['STATUS']=='BURNING' or PlayersData[enemy]['STATUS']=='DEAD'  ) and PlayersInputs[player]['Xmod']==PlayersData[enemy]['Z'])*PlayersCosmetics[enemy]['COLOR']+int(PlayersInputs[player]['Xmod']!=PlayersData[enemy]['Z'])*229)+',' +str((PlayersData[enemy]['Z'])*2+int(PlayersData[enemy]['ONGROUND'] and PlayersData[enemy]['Z']==0))
                            #
                            if PlayersCosmetics[enemy]['VEHICLE'] == 0:
                                PlayersData[player][
                                    'STR'] += f'\n+,{("[" + str(PlayersData[enemy]["TEAM"]) + "]") * int(not PlayersData[enemy]["TEAM"] is None) + enemy},{PlayersCosmetics[enemy]["VEHICLE"]},{str(int(PlayersData[enemy]["DIR"]))},{PlayersData[enemy]["HP"]},{int(PlayersData[enemy]["X"] * 1000) / 1000},{int(PlayersData[enemy]["Y"] * 1000) / 1000},{PlayersData[enemy]["Z"] * 2 + int(PlayersData[enemy]["ONGROUND"])},' + f'{int(PlayersData[enemy]["CAN"][0][8])}{int(PlayersData[enemy]["CAN"][0][7])},{int(PlayersData[enemy]["CAN"][1][8])}{int(PlayersData[enemy]["CAN"][1][7])},' + str(
                                    int(not (PlayersData[enemy]['STATUS'] == 'BURNING' or PlayersData[enemy][
                                        'STATUS'] == 'DEAD')) * PlayersCosmetics[enemy]['COLOR'])
                            elif PlayersCosmetics[enemy]['VEHICLE'] == 1:
                                PlayersData[player][
                                    'STR'] += f'\n+,{("[" + str(PlayersData[enemy]["TEAM"]) + "]") * int(not PlayersData[enemy]["TEAM"] is None) + enemy},{PlayersCosmetics[enemy]["VEHICLE"]},{str(int(PlayersData[enemy]["DIR"]))},{PlayersData[enemy]["HP"]},{int(PlayersData[enemy]["X"] * 1000) / 1000},{int(PlayersData[enemy]["Y"] * 1000) / 1000},{PlayersData[enemy]["Z"] * 2 + int(PlayersData[enemy]["ONGROUND"])},{int(PlayersData[enemy]["CAN"][0][8])}{int(PlayersData[enemy]["CAN"][0][7])},' + str(
                                    int(not (PlayersData[enemy]['STATUS'] == 'BURNING' or PlayersData[enemy][
                                        'STATUS'] == 'DEAD')) * PlayersCosmetics[enemy]['COLOR'])
                            elif PlayersCosmetics[enemy]['VEHICLE'] == 2:
                                PlayersData[player][
                                    'STR'] += f'\n+,{("[" + str(PlayersData[enemy]["TEAM"]) + "]") * int(not PlayersData[enemy]["TEAM"] is None) + enemy},{PlayersCosmetics[enemy]["VEHICLE"]},{str(int(PlayersData[enemy]["DIR"]))},{PlayersData[enemy]["HP"]},{int(PlayersData[enemy]["X"] * 1000) / 1000},{int(PlayersData[enemy]["Y"] * 1000) / 1000},{PlayersData[enemy]["Z"] * 2 + int(PlayersData[enemy]["ONGROUND"])},{int(PlayersData[enemy]["CAN"][0][8])}{int(PlayersData[enemy]["CAN"][0][7])},' + str(
                                    int(not (PlayersData[enemy]['STATUS'] == 'BURNING' or PlayersData[enemy][
                                        'STATUS'] == 'DEAD')) * PlayersCosmetics[enemy]['COLOR'])
                            elif PlayersCosmetics[enemy]['VEHICLE'] == 4:
                                PlayersData[player][
                                    'STR'] += f'\n+,{("[" + str(PlayersData[enemy]["TEAM"]) + "]") * int(not PlayersData[enemy]["TEAM"] is None) + enemy},{PlayersCosmetics[enemy]["VEHICLE"]},{str(int(PlayersData[enemy]["DIR"]))},{PlayersData[enemy]["HP"]},{int(PlayersData[enemy]["X"] * 1000) / 1000},{int(PlayersData[enemy]["Y"] * 1000) / 1000},{PlayersData[enemy]["Z"] * 2 + int(PlayersData[enemy]["ONGROUND"])},' + f'{int(PlayersData[enemy]["CAN"][0][8])}{int(PlayersData[enemy]["CAN"][0][7])},{int(PlayersData[enemy]["CAN"][1][8])}{int(PlayersData[enemy]["CAN"][1][7])},' + str(
                                    int(not (PlayersData[enemy]['STATUS'] == 'BURNING' or PlayersData[enemy][
                                        'STATUS'] == 'DEAD')) * PlayersCosmetics[enemy]['COLOR']) + "," + str(
                                    len(PlayersData[enemy]['CARRY']))
                            elif PlayersCosmetics[enemy]["VEHICLE"] == 8:
                                PlayersData[player][
                                    'STR'] += f'\n+,{("[" + str(PlayersData[enemy]["TEAM"]) + "]") * int(not PlayersData[enemy]["TEAM"] is None) + enemy},{PlayersCosmetics[enemy]["VEHICLE"]},{str(int(PlayersData[enemy]["DIR"]))},{PlayersData[enemy]["HP"]},{int(PlayersData[enemy]["X"] * 1000) / 1000},{int(PlayersData[enemy]["Y"] * 1000) / 1000},{PlayersData[enemy]["Z"] * 2 + int(PlayersData[enemy]["ONGROUND"])}' + f',{int(PlayersData[enemy]["CAN"][0][8])},' + str(
                                    int(not (PlayersData[enemy]['STATUS'] == 'BURNING' or PlayersData[enemy][
                                        'STATUS'] == 'DEAD')) * PlayersCosmetics[enemy]['COLOR']) + ',' + str(
                                    int(PlayersInputs[enemy]['Cmod']) * PlayersCosmetics[enemy]['TRACER'])
                            elif PlayersCosmetics[enemy]["VEHICLE"] == 5:
                                PlayersData[player][
                                    'STR'] += f'\n+,{("[" + str(PlayersData[enemy]["TEAM"]) + "]") * int(not PlayersData[enemy]["TEAM"] is None) + enemy},{PlayersCosmetics[enemy]["VEHICLE"]},{str(int(PlayersData[enemy]["DIR"]))},{PlayersData[enemy]["HP"]},{int(PlayersData[enemy]["X"] * 1000) / 1000},{int(PlayersData[enemy]["Y"] * 1000) / 1000},{PlayersData[enemy]["Z"] * 2 + int(PlayersData[enemy]["ONGROUND"])}' + f',{int(PlayersData[enemy]["CAN"][0][8])},' + str(
                                    int(not (PlayersData[enemy]['STATUS'] == 'BURNING' or PlayersData[enemy][
                                        'STATUS'] == 'DEAD')) * PlayersCosmetics[enemy]['COLOR']) + ',' + str(
                                    int(PlayersInputs[enemy]['Cmod']) * PlayersCosmetics[enemy][
                                        'TRACER']) + f',{PlayersData[enemy]["CAN"][0][8]}{PlayersData[enemy]["CAN"][0][7]}'
                            elif PlayersCosmetics[enemy]['VEHICLE'] == 3:
                                PlayersData[player][
                                    'STR'] += f'\n+,{("[" + str(PlayersData[enemy]["TEAM"]) + "]") * int(not PlayersData[enemy]["TEAM"] is None) + enemy},{PlayersCosmetics[enemy]["VEHICLE"]},{str(int(PlayersData[enemy]["DIR"]))},{PlayersData[enemy]["HP"]},{int(PlayersData[enemy]["X"] * 1000) / 1000},{int(PlayersData[enemy]["Y"] * 1000) / 1000},{PlayersData[enemy]["Z"] * 2 + int(PlayersData[enemy]["ONGROUND"])},' + f'{int(PlayersData[enemy]["CAN"][0][8])}{int(PlayersData[enemy]["CAN"][0][7])},{int(PlayersData[enemy]["CAN"][1][8])}{int(PlayersData[enemy]["CAN"][1][7])},' + str(
                                    int(not (PlayersData[enemy]['STATUS'] == 'BURNING' or PlayersData[enemy][
                                        'STATUS'] == 'DEAD')) * PlayersCosmetics[enemy]['COLOR']) + "," + str(
                                    len(PlayersData[enemy]['CARRY']))
                except Exception:
                    pass


@logger.catch()
async def handler(websocket):
    logger.info("Connection")
    global LastMSGI, PlayersData
    Exit = False
    # print('enter')
    # print('!')
    while not Exit:
        msg = ""
        msgid = 0
        message = ""
        recieved_msg = set()
        try:
            msg = await websocket.recv()
            try:
                msgid = msg.split(',')[0]
                message = msg[len(msgid) + 1:]
                msgid = int(msgid)
            except:
                message = msg
                msgid = 0
        except:
            for player in PlayersSockets.keys():
                if PlayersSockets[player] == websocket:
                    PlayersData[player]['STATUS'] = 'AFK'
            logger.info("Set AFK status")
            Exit = True
            continue

        if msg == os.environ['KILL_CODE']: exit()
        if message == '':
            # TODO can be leak :/
            logger.info("Empty message from client")
            Exit = True
        elif message[0] == '0' or message[0] == '1':
            for player in PlayersSockets.keys():
                if PlayersSockets[player] == websocket:
                    try:
                        if player in PlayersData:
                            PlayersInputs[player] = {
                                'm0': bool(int(message[0])),
                                'wk': bool(int(message[1])),
                                'ak': bool(int(message[2])),
                                'sk': bool(int(message[3])),
                                'dk': bool(int(message[4])),
                                'spk': bool(int(message[5])),
                                'gk': bool(int(message[6])),
                                'tbk': bool(int(message[7])),
                                'Cmod': bool(int(message[8])),
                                'Xmod': int(message[9]),
                                'view': int(message[10]),
                                'x': float(message[11:].split(',')[0]),
                                'y': float(message[11:].split(',')[1]),
                                'last': datetime.datetime.now()

                            }

                        if not player in PlayersData:
                            logger.info("Player init")
                            PlayersData[player] = {

                                'ENTITY':0,
                                'SCORES': 0,
                                'KILLS': 0,

                                'STATUS': 'ALIVE',
                                'TEAM': None,
                                'TEAMREQ': [],


                                'STR': '',
                                'STRID': 0,
                                'STRARR': [],


                                'STARTTIME': datetime.datetime.now(),
                                'EQZNUPDTTIMER': datetime.datetime.now(),
                                'LASTDMG': datetime.datetime.now()
                                # 'INFOG':False
                            }

                    except Exception:

                        logger.info("Incorrect message from client")
                        # logging.exception("message")
                        Exit = True
                        pass
                    try:
                        recieved_msg.add(msgid)
                        additionalstr = ""
                        if PlayersData[player]['STATUS'] == 'DEAD':
                            PlayersData[player]['STR'] = 'D'
                            PlayersData[player]['STATUS'] = 'AFK'
                            logger.info(f"Player {player} informed about death")
                        missed = set(range(min(recieved_msg), max(recieved_msg))) - recieved_msg
                        if 0 < len(missed):
                            logger.info(f"Player {player} missed msg")
                            # for _ in range(0, len(PlayersData[player]['STRARR'])):
                            #     if PlayersData[player]['STRARR'][len(PlayersData[player]['STRARR']) - 1 - _][0] == msgid:
                            #         msgid = len(PlayersData[player]['STRARR']) - _ - 1
                            #         break
                            # for _ in range(msgid, len(PlayersData[player]['STRARR'])):
                            #     lns = PlayersData[player]['STRARR'][_][1].split('\n')
                            #     for i in range(1, len(lns)):
                            #         try:
                            #             additionalstr += '\n' + lns[i]
                            #         except:
                            #             pass
                        PlayersData[player]['STRARR'].append((PlayersData[player]['STRID'], PlayersData[player]['STR']))
                        await websocket.send(
                            str(PlayersData[player]['STRID']) + ',' + PlayersData[player]['STR'] + additionalstr)
                        PlayersData[player]['STRID'] += 1
                        if PlayersData[player]['STRID'] > 10000:
                            PlayersData[player]['STRID'] = 1
                            recieved_msg = set()
                        if len(PlayersData[player]['STRARR']) > TPS * 3:
                            PlayersData[player]['STRARR'].pop(0)
                    except Exception:
                        for player in PlayersSockets.keys():
                            if PlayersSockets[player] == websocket:
                                PlayersData[player]['STATUS'] = 'AFK'
                                logger.info(f"Player {player} is AFK")
                        Exit = True
                        continue
        elif message != 'info' and PLAYERS_LIMIT <= len(PlayersSockets):
            Exit = True
            await websocket.send('0,E,Server is full')
        elif message[0] == 'n' and len(message) > 1:

            name = message[1:].split('\n')[0]
            while name.find('  ') != -1:
                name = name.replace('  ', ' ')
            logger.info(f"Name '{name}' wanted")
            # print(name)

            if name == '' or name == ' ' or name.count(',') > 0 or name.count(']') > 0 or name.count('[') or name.count(
                    ' ') > 0:
                logger.info(f"Bad name")
                if message[1:].split('\n')[3] == '':
                    name = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[random.randint(0, 25)] + '-' + str(random.randint(0, 99))
                    while name in PlayersSockets.keys():
                        name = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[random.randint(0, 25)] + '-' + str(random.randint(0, 99))
                    logger.info(f"'{name}' is better")
                else:
                    name = message[1:].split('\n')[3]
                    print(message[1:])
                    l = 1
                    while name in PlayersSockets.keys():
                        name = message[1:].split('\n')[3] + '-' + str(l)
                        l += 1
                    logger.info(f"'{name}' is better")
            if name in PlayersSockets.keys():
                logger.info(f"Name '{name}' captured")
                await websocket.send('0,E,Somebody already have this name !')
                continue
            else:
                PlayersSockets[name] = websocket
                # print(message,"1")

                PlayersCosmetics[name] = {'COLOR': int(message[1:].split('\n')[1]),
                                          'VEHICLE': int(message[1:].split('\n')[2]), "TRACER": 1}
                PlayersAccs[name] = {'NICK': '', 'PSW': '', 'money': 0}
                resp = ""
                try:
                    print(API_SERV_ADDRESS + "item_check_for_acc")
                    resp = (await requests.post(API_SERV_ADDRESS + "item_check_for_acc",
                                                {'nickname': message[1:].split('\n')[3],
                                                 "password": message[1:].split('\n')[4],
                                                 "color": PlayersCosmetics[name]["COLOR"],
                                                 "vehicle": PlayersCosmetics[name]["VEHICLE"]})).text

                except:
                    print('!')
                    resp = "ERROR"
                try:
                    print(resp)
                    respJSON = json.loads(resp)
                    for _ in PlayersAccs.keys():
                        if message[1:].split('\n')[3] == PlayersAccs[name]['NICK'] and _ != name and isDEV == False:
                            PlayersSockets.pop(name)
                            PlayersAccs.pop(name)
                            PlayersCosmetics.pop(name)

                            await websocket.send('0,E,Twin - ban')
                            logger.info(f"Twin '{name}'")
                            break
                    else:
                        if respJSON['color'] < 0:
                            PlayersCosmetics[name]["COLOR"] = 1
                        if respJSON['vehicle'] < 0:
                            PlayersCosmetics[name]["VEHICLE"] = 0
                        PlayersAccs[name]['money'] = respJSON['money']
                        logger.info(f"Map to '{name}' sent")
                        PlayersAccs[name]['NICK'] = message[1:].split('\n')[3]
                        PlayersAccs[name]['PSW'] = message[1:].split('\n')[4]
                        await websocket.send('0,M' + MAPJSON)
                except:
                    print(API_SERV_ADDRESS + "item_check")
                    resp = (await requests.post(API_SERV_ADDRESS + "item_check",
                                                {"color": PlayersCosmetics[name]["COLOR"],
                                                 "vehicle": PlayersCosmetics[name]["VEHICLE"]})).text
                    print(resp)
                    respJSON = json.loads(resp)
                    if respJSON['color'] < 0:
                        PlayersCosmetics[name]["COLOR"] = 1
                    if respJSON['vehicle'] < 0:
                        PlayersCosmetics[name]["VEHICLE"] = 0
                    logger.info(f"Map to '{name}' sent")
                    await websocket.send('0,M' + MAPJSON)
                if PlayersCosmetics[name]['VEHICLE'] == 3: PlayersCosmetics[name]['COLOR'] = 228
                PlayersAccs[name]['contime'] = datetime.datetime.now()
        elif message == 'info':
            await websocket.send(
                ServInfoJSON.replace('%js%', JSVEHs).replace('%text%', '1# Oficial FFA/PVP').replace('%online%', str(
                    len(PlayersSockets)) + '/' + str(PLAYERS_LIMIT)))
            Exit = True
        await asyncio.sleep(1 / TPS)
    websocket.close()
    logger.info("Exited")


@logger.catch()
async def main():
    if isDEV:
        async with websockets.serve(handler, os.environ["HOST"], os.environ["PORT"]):  # 80.68.156.140
            await asyncio.Future()
    else:
        async with websockets.serve(handler, os.environ["HOST"], os.environ["PORT"], ssl=ssl_context):  # 80.68.156.140
            await asyncio.Future()


if __name__ == '__main__':

    # ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    # localhost_pem = pathlib.Path(__file__).with_name("localhost.pem")
    # ssl_context.load_cert_chain(localhost_pem)
    try:

        ioloop = asyncio.new_event_loop()
        asyncio.set_event_loop(ioloop)
        tasks = [
            ioloop.create_task(main()),
            ioloop.create_task(game())
        ]
        ioloop.run_until_complete(asyncio.wait(tasks))
        ioloop.close()
    except:
        pass
