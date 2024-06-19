import asyncio
import websockets
import pickle
import logging
import math
import json
import atexit
# import ssl
import os
import datetime
import random
from shapely.geometry import Polygon,LineString, Point,LinearRing

from loguru import logger
import asynchronous_requests as requests
import requests as req_sync
import time
import dotenv
dotenv.load_dotenv()
logger.add(f"./logs/logs_{time.strftime('%d_%b_%Y_%H_%M_%S', time.gmtime())}.log".lower(),enqueue=True, retention= "1 week")
logger.info("Server started !")
WH = 16
# SQL = sqlite3.connect(os.environ['DB_PATH'])
API_SERV_ADDRESS = os.environ['API_ADDRESS']
API_KEY = os.environ['API_KEY']
isDEV = os.environ['DEV']
# SQLctx = SQL.cursor()
# print(SQLctx.execute(f"SELECT * FROM Account WHERE nickname = 'LOL'").fetchone())
TPS = 15
VIEW_X = 6
VIEW_Y = 3
availablecls = [1,2,3,4,5]
logger.info(req_sync.post(API_SERV_ADDRESS+"connect",{'key':API_KEY}).text)

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
    0: {'DEFCOL':Polygon([[0.15, 0], [0, 0.06], [-0.15, 0.045], [-0.15, -0.045], [0, -0.06]]),
        'COLB':True,
        'COLS':True,
        'Z':0,
"DEGDMGCOF":1,
'BOMBS':0,
'COLP': True,
        'TAKEN':False,
        'CARRIER':False,
        'SPAWN':0,
        'SPWEP':0,
        'MOVETYPE':0,
        'TORPEDOS':12,
        'AAROCKETS':0,
        'GASTYPE': 0,
        'SMOKES':8,
        'HP':1000,
'BOOST':0.02,
        'HPMAX':1000,
        'GROUNDSPEED':0.125,
        'MAXSPEED':0.125,
        "PENDMGDST":0.06,
        'TURN':20,
'AMMO': {'m':150,'p':0,'t':0,'h':0,'f':0},
        'CAN':[['m',0,0,50,datetime.datetime.now(),None,True,0,0,0],['m',0-0.1,0,50,datetime.datetime.now(),None,True,0,0,0]],
        },
    1: {'DEFCOL':Polygon([[0.06, 0.04], [-0.06, 0.04], [-0.06, -0.04], [0.06, -0.04]]),
        'COLB': False,
        'COLS': True,
"DEGDMGCOF":0.5,
"PENDMGDST":0.05,
'SPAWN':1,
'GASTYPE': 0,
'Z':0,
'GROUNDBOOST':0.15,
'COLP': True,
'BOMBS':0,
'TAKEN':False,
'TORPEDOS':0,
'AAROCKETS':0,
'SMOKES':0,
'GROUNDSPEED':0.25,
'CARRIER':False,
'SPWEP':None,
        'HP': 90,
        'HPMAX': 90,
'BOOST':0.05,
        'MOVETYPE':1,
        'MAXSPEED': 0.05,
        'TURN': 60,
'AMMO': {'m':0,'p':0,'t':100,'h':0,'f':0},
'CAN':[['t',0+0.01,0,100,datetime.datetime.now(),None,True,0,0,0]],
        },
    2: {'DEFCOL':Polygon([[0.075, 0], [0, 0.03], [-0.065, 0.02], [-0.065, -0.02], [0, -0.03]]),
        'COLB': True,
'COLP': True,
"DEGDMGCOF":0.25,
'Z':0,
'GASTYPE': 0,
"PENDMGDST":0.04,
'TAKEN':False,
'CARRIER':False,
'SPAWN':0,
'GROUNDSPEED':0.2,
'BOOST':0.02,
'BOMBS':0,
'SMOKES':4,
'TORPEDOS':4,
'AAROCKETS':0,
        'HP': 50,
        'HPMAX': 50,
        'COLS': True,
'SPWEP':0,
'MOVETYPE':0,
        'MAXSPEED': 0.2,
        'TURN': 45,
'AMMO': {'m':0,'p':0,'t':0,'h':300,'f':0},
'CAN':[['h',0,0,250,datetime.datetime.now(),None,True,0,0,0]],
        },
    3: {'DEFCOL':Polygon([[-0.3, 0],[-0.325, 0.055],[-0.2, 0.04],[0, 0.06],[0.225, 0.06],[0.275, 0.04],[0.3, 0],[0.275, -0.04],[0.225, -0.06],[0, -0.06],[-0.2, -0.04],[-0.325, -0.055]]),
        'COLB': False,
'SMOKES':0,
"PENDMGDST":0.05,
"DEGDMGCOF":0.1,
'TORPEDOS':0,
'AAROCKETS':0,
'GROUNDSPEED':0.15,
        'HP': 1000,
'GASTYPE': 0,
'BOMBS':0,
'CARRIER':True,
'TAKEN':False,
'CARVEH':[8],
'CARRY':4,
'SPAWN':2,
'COLP': False,
'Z':1,
        'HPMAX': 1000,
        'COLS': False,
'SPWEP':None,
'MOVETYPE':0,
        'BOOST':0.0025,
        'MAXSPEED': 0.15,
        'TURN': 7,
'AMMO': {'m':0,'p':5000,'t':0,'h':0,'f':0},
'CAN':[['p',-0.2, 0,2500,datetime.datetime.now(),None,True,0,0,0],['p',0.265, 0,2500,datetime.datetime.now(),None,True,0,0,0]],
        },
    4: {'DEFCOL':Polygon([[0.3, -0.03],[0.3, 0.03],[0.275, 0.03],[0.25, 0.055],[0.06, 0.055],[0.045, 0.08],[-0.045, 0.08],[-0.06, 0.055],[-0.25, 0.055],[-0.275, 0.03],[-0.3, 0.03],[-0.3, -0.03],[-0.275, -0.03],[-0.25, -0.055],[0.25, -0.055],[0.275, -0.03]]),
        'COLB': True,
'SMOKES':0,
"PENDMGDST":0.05,
"DEGDMGCOF":0.75,
'TORPEDOS':0,
'AAROCKETS':0,
'CARRIER':True,
'GASTYPE': 0,
'TAKEN':False,
'CARVEH':[8,5],
'CARRY':10,
'SPAWN':0,
'BOMBS':0,
'GROUNDSPEED':0.1,
        'HP': 2500,
'COLP': True,
        'HPMAX': 2500,
        'COLS': True,
'Z':0,
'SPWEP':None,
'MOVETYPE':0,
        'BOOST':0.0125,          ################## TIMED 0.0025
        'MAXSPEED': 0.1,
        'TURN': 10, #5
'AMMO': {'m':0,'p':7500,'t':0,'h':750,'f':0},
'CAN':[['h',0.025, 0.055,250,datetime.datetime.now(),None,True,0,0],['h',-0.025, 0.055,250,datetime.datetime.now(),None,True,0,0]],
        },


    8: {'DEFCOL':Polygon([[0.02, 0.01],[0.02, -0.01],[0.01, -0.01],[0.01, -0.04],[-0.01, -0.04],[-0.01, -0.0075],[-0.03, -0.005],[-0.03, -0.02],[-0.04, -0.02],[-0.04, 0.02],[-0.03, 0.02],[-0.03, 0.005],[-0.01, 0.0075],[-0.01, 0.04],[0.01, 0.04],[0.01, 0.01]]),
        'COLB': False,
'SMOKES':0,
"PENDMGDST":0.02,
'TORPEDOS':0,
'GROUNDSPEED':0.4,
"DEGDMGCOF":0.1,
        'HP': 30,
'GASTYPE': 1,
'SPAWN':2,
'COLP': False,
'CARRIER':False,
'TAKEN':True,
'Z':1,
        'HPMAX': 30,
        'COLS': False,
'AAROCKETS':4,
'SPWEP':1,
'MOVETYPE':2,
'BOMBS':0,
        'BOOST':0.01,
        'MAXSPEED': 0.4,
        'TURN': 80,
'AMMO': {'m':0,'p':0,'t':0,'h':0,'f':250},
'CAN':[['f',0, 0,250,datetime.datetime.now(),None,True,0,0,0]],
        },
    5: {'DEFCOL':Polygon([[0.02, 0.011],[0.02, -0.011],[0.01, -0.011],[0.01, -0.05],[-0.015, -0.05],[-0.015, -0.011],[-0.025, -0.011],[-0.05, -0.007],[-0.05, -0.02],[-0.065, -0.02],[-0.065, 0.02],[-0.05, 0.02],[-0.05, 0.006],[-0.025, 0.011],[-0.015, 0.011],[-0.015, 0.05],[0.01, 0.05],[0.01, 0.011]]),
        'COLB': False,
'SMOKES':0,
"PENDMGDST":0.02,
'TORPEDOS':0,
'GROUNDSPEED':0.35,
"DEGDMGCOF":0.1,
        'HP': 30,
'GASTYPE': 1,
'SPAWN':2,
'COLP': False,
'CARRIER':False,
'TAKEN':True,
'Z':1,
        'HPMAX': 30,
        'COLS': False,
'AAROCKETS':0,
'BOMBS':5,
'SPWEP':2,
'MOVETYPE':2,
        'BOOST':0.0075,
        'MAXSPEED': 0.35,
        'TURN': 80,
'AMMO': {'m':0,'p':100,'t':0,'h':0,'f':0},
'CAN':[['p',0-0.025, 0,100,datetime.datetime.now(),None,True,0,0,1]],
        },
}

caninfo = {
    'm':[12/320,18/320,6/320,50,1000000*3   ,0.75,6,2,4,3,0.1],#last - DEGDMGCOF
    'p':[5/320 ,12/320,2/320,1 ,1000000*0.09,1   ,2,3,1,0,4],
    't':[9/320 ,20/320,4/320,25,1000000*2   ,1.25,4,1,3,2,0.5],
    'h':[7/320 ,14/320,2/320,5 ,1000000*0.5 ,1   ,3,1,2,1,2],
    'f':[0/320 ,0/320 ,0/320,1 ,1000000*0.09,1   ,2,3,1,0,4],

}
SpeedCOLlosingCOF = 0.975
DEBUGVAL0 = 0
DEFSQSIZE = 320
JSVEHs = os.environ['JS_VEH']
# MAPJSON = open('../httpserver/static/MAP.json', 'r').read()
MAPJSON = os.environ['JSON_MAP']
# print(MAPJSON)
MAP = pickle.load(open('MAP', 'rb'))
MAPobjSIDEdir = {'S':{},'B':{}}
# print(MAP['B'])
i = 0
while i in range(0,len(MAP['B'])):
    # print(i)
    if MAP['B'][i] == []:
        MAP['B'].pop(i)
        i-=1
    i+=1
i = 0
while i in range(0,len(MAP['S'])):
    # print(i)
    if MAP['S'][i] == []:
        MAP['S'].pop(i)
        i-=1
    i+=1
if True:
    for i in range(0,len(MAP['S'])):
        # print(MAP['S'][i])

        srtg = (Polygon(LinearRing(MAP['S'][i].exterior.coords).parallel_offset(0.01, 'right', join_style=1,resolution=1).coords))
        MAPobjSIDEdir['S'][i] = True
        if srtg.area < MAP['S'][i].area:

            MAPobjSIDEdir['S'][i] = False
if len(MAP['Z']) ==0:
    for i in range(0,len(MAP['B'])):
        # print(list(MAP['B'][i].exterior.coords))

        MAP['Z'].append(Polygon(LinearRing(MAP['B'][i].exterior.coords).parallel_offset(0.25, 'right', join_style=1,resolution=1).coords))
        MAPobjSIDEdir['B'][i] = True
        if MAP['Z'][i].area < MAP['B'][i].area:
            MAP['Z'][i] = Polygon(LinearRing(MAP['B'][i].exterior.coords).parallel_offset(0.25, 'left', join_style=1,resolution=1).coords)
            MAPobjSIDEdir['B'][i] = False
if len(MAP['G']) ==0:
    for i in range(0,len(MAP['B'])):
        # print(list(MAP['B'][i].exterior.coords))

        MAP['G'].append(Polygon(LinearRing(MAP['B'][i].exterior.coords).parallel_offset(0.1, 'left', join_style=1,resolution=1).coords))
        if MAP['G'][i].area > MAP['B'][i].area:
            MAP['G'][i] = Polygon(LinearRing(MAP['B'][i].exterior.coords).parallel_offset(0.1, 'right', join_style=1,resolution=1).coords)

# print(len(MAP['Z']),len(MAP['B']))
Bridges = {0:[7.31,4.63,8.51,4.63],1:[5.24,5.43,5.78,4.77],2:[8.83,4.88,9.21,5.53],3:[12.55,6.22,12.58,7.07]}
for _ in Bridges.keys():
    line = LineString([(Bridges[_][0], Bridges[_][1]), (Bridges[_][2], Bridges[_][3])])
    left_hand_side = line.buffer(0.1875/2, single_sided=True)
    right_hand_side = line.buffer(-0.1875/2, single_sided=True)
    Bridges[_].append(left_hand_side.union(right_hand_side))
MAP['Q'] = {}
for x in range(0, WH):
    for y in range(0, WH):
        MAP['Q'][(x, y)] = {'p': Polygon([[x, y], [x + 1, y], [x + 1, y + 1], [x, y + 1]]), 'B': [],
                            'Z': [], 'G': [], 'S': [],'BRIDGES':[]}
        for _0 in range(0, len(MAP['B'])):
            if type(MAP['B'][_0]) != type([]) and MAP['Q'][(x, y)]['p'].intersects(MAP['B'][_0]):
                MAP['Q'][(x, y)]['B'].append(_0)
                # print(_0)
        for _0 in range(0, len(MAP['Z'])):
            if type(MAP['Z'][_0]) != type([]) and MAP['Q'][(x, y)]['p'].intersects(MAP['Z'][_0]):
                MAP['Q'][(x, y)]['Z'].append(_0)
        for _0 in range(0, len(MAP['G'])):
            if type(MAP['G'][_0]) != type([]) and MAP['Q'][(x, y)]['p'].intersects(MAP['G'][_0]):
                MAP['Q'][(x, y)]['G'].append(_0)
        for _0 in range(0, len(MAP['S'])):
            if type(MAP['S'][_0]) != type([]) and MAP['Q'][(x, y)]['p'].intersects(MAP['S'][_0]):
                MAP['Q'][(x, y)]['S'].append(_0)
        for _0 in range(0, len(Bridges)):
            if MAP['Q'][(x, y)]['p'].intersects(Bridges[_0][4]):
                MAP['Q'][(x, y)]['BRIDGES'].append(_0)

for x in range(0,WH):
    for y in range(0, WH):
        MAP['Q'][(x,y)]['PLAYERS'] = set()
        MAP['Q'][(x, y)]['BULLETS'] = set()
        MAP['Q'][(x, y)]['TORPEDOS'] = set()
        MAP['Q'][(x, y)]['SMOKES'] = set()
        MAP['Q'][(x,y)]['AAROCKETS'] = set()
        MAP['Q'][(x, y)]['BOMBS'] = set()
Zones = {'A':[8,8,'','',0,1],
'B':[4.35,7.5,'','',0,1],
         } ### X,Y,p/t,name,perc
PlayersSockets = {}
PlayersInputs = {}
PlayersData = {}
PlayersCosmetics = {}
PlayersAccs = {}
Teams = {None:[]}
TeamRec={} #Player=>team
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
#Bodies = {}
LastBulletI = 0
LastTorpedoI = 0
LastSmokeI = 0
LastAARocketI = 0
LastBombI = 0
LastMSGI = 0
ServInfoJSON = open('SERVINFO.json', 'r').read()
def lookat(x,y):
    if x == 0:
        x = 0.001
    angle = math.atan((y / x)) / ( math.pi / 180)
    if y != abs(y):
        angle =  angle+360
    if x != abs(x):
       angle =  angle+180
    return angle%360
def posScr(poly,x,y,t,w=1920,h=1080):
    a = list(poly.exterior.coords)
    for _ in range(0,len(a)):
        a[_]=[a[_][0]*t-x*t+int(w/2),a[_][1]*t-y*t+int(h/2)]
    return Polygon(a)
def rotateandpos(poly,deg,x,y,t):
    deg = deg/180*math.pi
    a = list(poly.exterior.coords)
    for _ in range(0,len(a)):
        a[_]=[x+a[_][0]*math.cos(deg)*t,y+a[_][1]*math.sin(deg)*t]
    return Polygon(a)
def barrier(val,min = 0, max = None,minrep = None,maxrep = None):
    if minrep is None:minrep = min
    if maxrep is None: maxrep = max
    if not min is None and val < min:return minrep
    elif not max is None and val > max: return maxrep
    else:return val
@logger.catch()
async def game():
    global LastBulletI
    global LastTorpedoI
    global LastSmokeI
    global LastAARocketI
    global LastBombI
    global LastMSGI
    while True:
        try:
            await asyncio.sleep(1/TPS)
            if LastBulletI >1000: LastBulletI = 0
            if LastTorpedoI >1000: LastTorpedoI = 0
            if LastAARocketI > 1000: LastAARocketI = 0
            if LastSmokeI > 1000: LastSmokeI = 0
            if LastBombI > 1000: LastBombI = 0
            if LastMSGI > 1000: LastMSGI = 0
            delarr = []
            for smoke in Smokes.keys():
                try:
                    for x in range(int((Smokes[smoke][0] ) // 1) - 1,
                                   int((Smokes[smoke][0] ) // 1) + 1):
                        for y in range(int((Smokes[smoke][1]) // 1) - 1,
                                       int((Smokes[smoke][1] ) // 1) + 1):
                            try:
                                MAP['Q'][(x, y)]['SMOKES'].add(smoke)
                            except:
                                pass
                    # Smokes[smoke][3]+=1
                    x = (datetime.datetime.now() - Smokes[smoke][3]).total_seconds()*10
                    Smokes[smoke][2] = (math.sqrt(x)-(math.sqrt(x)-17.3)*math.sqrt(x)*0.3)*0.02
                    # print(Smokes[smoke][2])
                    # print((datetime.datetime.now()-Smokes[smoke][3]).total_seconds())
                    if (datetime.datetime.now()-Smokes[smoke][3]).total_seconds() > 30:
                        delarr.append(smoke)
                except:
                    delarr.append(smoke)
            for smoke in delarr:
                try:
                    for x in range(int((Smokes[smoke][0] ) // 1) - 1,
                                   int((Smokes[smoke][0] ) // 1) + 1):
                        for y in range(int((Smokes[smoke][1]) // 1) - 1,
                                       int((Smokes[smoke][1] ) // 1) + 1):
                            try:
                                MAP['Q'][(x, y)]['SMOKES'].discard(smoke)
                            except:
                                pass
                    Smokes.pop(smoke)
                    # print("deleted")

                except:pass
            delarr = []
            # print(TeamRec)
            for player in TeamRec.keys():
                if player in PlayersSockets.keys():
                    TeamRec[player][1] = datetime.datetime.now()
                    continue
                if (datetime.datetime.now() - TeamRec[player][1]).minutes > 10:
                    # print(datetime.datetime.now() - TeamRec[player][1],2432)
                    delarr.append(player)
            for _ in delarr:
                TeamRec.pop(_)
            delarr = []
            for bullet in Bullets.keys():
                try:
                    if math.sqrt(Bullets[bullet][2]**2+Bullets[bullet][3]**2) > Bullets[bullet][9]:
                            # for x in range(int((Bullets[bullet][2] + Bullets[bullet][0]) // 1) - 1,int((Bullets[bullet][2] + Bullets[bullet][0]) // 1) + 1):
                            #     for y in range(int((Bullets[bullet][3] + Bullets[bullet][1]) // 1) - 1,int((Bullets[bullet][3] + Bullets[bullet][1]) // 1) + 1):
                            #         try:
                            #             del MAP['Q'][(x, y)]['BULLETS'][bullet]
                            #         except:pass
                            BulletsHandler[bullet] = Bullets[bullet].copy()
                            delarr.append(bullet)
                            continue

                    Bullets[bullet][6]+= Bullets[bullet][8]/TPS
                    Bullets[bullet][2] = math.cos(Bullets[bullet][7]/180*math.pi)*Bullets[bullet][6]
                    Bullets[bullet][3] = math.sin(Bullets[bullet][7]/180*math.pi)*(Bullets[bullet][6])
                    Bullets[bullet][4] = math.cos(Bullets[bullet][7]/180*math.pi)*(Bullets[bullet][6]-Bullets[bullet][10])*int(Bullets[bullet][6]-Bullets[bullet][10]>0)
                    Bullets[bullet][5] = math.sin(Bullets[bullet][7]/180*math.pi)*(Bullets[bullet][6]-Bullets[bullet][10])*int(Bullets[bullet][6]-Bullets[bullet][10]>0)

                    Bullets[bullet][12] = LineString([[Bullets[bullet][0]+Bullets[bullet][2],Bullets[bullet][1]+Bullets[bullet][3]],[Bullets[bullet][0]+Bullets[bullet][4],Bullets[bullet][1]+Bullets[bullet][5]]])
                    try:
                        for _ in MAP['Q'][(int((Bullets[bullet][2]+Bullets[bullet][0])//1), int((Bullets[bullet][3]+Bullets[bullet][1])//1))]['PLAYERS']:
                            if _ in PlayersData.keys() and _ !=Bullets[bullet][11] and PlayersData[_]['Z'] == Bullets[bullet][17] and not PlayersData[_]['TAKEN']:
                                # print(_)
                                if PlayersData[_]['COL'].intersects(Bullets[bullet][12]):
                                    Bullets[bullet][2]= PlayersData[_]['COL'].intersection(Bullets[bullet][12]).coords[1][0]-Bullets[bullet][0]
                                    Bullets[bullet][3]= PlayersData[_]['COL'].intersection(Bullets[bullet][12]).coords[1][1]-Bullets[bullet][1]
                                    if PlayersData[_]['STATUS'] == 'ALIVE' and not Bullets[bullet][11] in Teams[PlayersData[_]['TEAM']]:
                                        ilist = []
                                        for l in range(0,len(PlayersData[_]['COL'].exterior.coords)):
                                            tl = LineString([PlayersData[_]['COL'].exterior.coords[l],PlayersData[_]['COL'].exterior.coords[(l+1)%len(PlayersData[_]['COL'].exterior.coords)]])

                                            if tl.intersects(Bullets[bullet][12]):
                                                p = tl.intersection(Bullets[bullet][12])
                                                a, a_ = tl.coords[:], tl.length
                                                b, b_ = Bullets[bullet][12].coords[:], Bullets[bullet][12].length
                                                c = ((a[1][0] - a[0][0]) * (b[1][0] - b[0][0]) + (a[1][1] - a[0][1]) * (b[1][1] - b[0][1]))/a_/b_
                                                ilist.append((p.distance(Point(Bullets[bullet][12].coords[:][0])),c))
                                        def getFirst(val): return  val[0]
                                        ilist.sort(key=getFirst)
                                        sin = math.sqrt(1-ilist[0][1]**2)


                                        ln = LineString([(Bullets[bullet][12].coords[:][0][0]-(Bullets[bullet][12].coords[:][1][0]-Bullets[bullet][12].coords[:][0][0])*20,Bullets[bullet][12].coords[:][0][1]-(Bullets[bullet][12].coords[:][1][1]-Bullets[bullet][12].coords[:][0][1])*20),(Bullets[bullet][12].coords[:][0][0]+(Bullets[bullet][12].coords[:][1][0]-Bullets[bullet][12].coords[:][0][0])*20,Bullets[bullet][12].coords[:][0][1]+(Bullets[bullet][12].coords[:][1][1]-Bullets[bullet][12].coords[:][0][1])*20)])
                                        cof = PlayersData[_]['COL'].intersection(ln).length/vehicleinfo[PlayersCosmetics[_]['VEHICLE']]['PENDMGDST']
                                        if cof > 1: cof = 1
                                        # print(f"sin: {sin} cof:{cof} degcof:{vehicleinfo[PlayersCosmetics[_]['VEHICLE']]['DEGDMGCOF']} {caninfo[Bullets[bullet][18]][10]}")
                                        # print(Bullets[bullet][13]*cof*sin**(vehicleinfo[PlayersCosmetics[_]['VEHICLE']]['DEGDMGCOF']*caninfo[Bullets[bullet][18]][10]))
                                        # print(round(Bullets[bullet][13]*cof*sin**(vehicleinfo[PlayersCosmetics[_]['VEHICLE']]['DEGDMGCOF']*caninfo[Bullets[bullet][18]][10])))
                                        PlayersData[_]['HP'] -= round(Bullets[bullet][13]*cof*sin**(vehicleinfo[PlayersCosmetics[_]['VEHICLE']]['DEGDMGCOF']*caninfo[Bullets[bullet][18]][10]))
                                        PlayersData[_]['LASTDMG'] = datetime.datetime.now()
                                        PlayersData[_]['KILLER'] = Bullets[bullet][11]
                                        PlayersData[Bullets[bullet][11]]['SCORES'] += Bullets[bullet][13]
                                        if PlayersData[_]['HP'] <= 0:
                                            PlayersData[Bullets[bullet][11]]['SCORES'] += (PlayersData[_]['HP'])
                                            PlayersData[_]['STATUS'] = 'BURNING'
                                            for i in PlayersData[_]['CAN']:
                                                i[8] = 3
                                            PlayersData[_]['BURNTIMER'] = 5*TPS
                                            PlayersData[_]['KILLER'] = Bullets[bullet][11]

                                                # logging.exception("message")
                                            PlayersData[_]['HP'] = 0
                                    Bullets[bullet][16] = _
                                    Bullets[bullet][14]=1
                    except KeyError :
                        pass
                        # print(dir(e))

                    try:
                        for _ in MAP['Q'][(int((Bullets[bullet][2]+Bullets[bullet][0])//1), int((Bullets[bullet][3]+Bullets[bullet][1])//1))]['S']:
                            if Bullets[bullet][17]==0:
                                if MAP['S'][_].intersects(Bullets[bullet][12]):
                                    Bullets[bullet][14] = 1
                                    Bullets[bullet][2] = MAP['S'][_].intersection(Bullets[bullet][12]).coords[1][
                                                             0] - Bullets[bullet][0]
                                    Bullets[bullet][3] = MAP['S'][_].intersection(Bullets[bullet][12]).coords[1][
                                                             1] - Bullets[bullet][1]
                                    Bullets[bullet][14]=2
                    except Exception:
                        BulletsHandler[bullet] = Bullets[bullet].copy()
                        delarr.append(bullet)
                    if Bullets[bullet][14]>0:
                        BulletsHandler[bullet] = Bullets[bullet].copy()
                        # print(BulletsHandler)
                        delarr.append(bullet)
                        continue
                    for x in range(int((Bullets[bullet][2]+Bullets[bullet][0])//1)-1,int((Bullets[bullet][2]+Bullets[bullet][0])//1)+2):
                        for y in range(int((Bullets[bullet][3]+Bullets[bullet][1])//1)-1,int((Bullets[bullet][3]+Bullets[bullet][1])//1)+2):
                            try:
                                # del MAP['Q'][(x, y)]['BULLETS'][bullet]
                                MAP['Q'][(x, y)]['BULLETS'].discard(bullet)
                            except:
                                pass

                    try:
                        MAP['Q'][(int((Bullets[bullet][2]+Bullets[bullet][0])//1), int((Bullets[bullet][3]+Bullets[bullet][1])//1))]['BULLETS'].add(bullet)
                    except:pass
                except Exception:
                    pass
                    # logging.exception("message")
            for bullet in delarr:
                try:
                    del Bullets[bullet]
                except:pass
                ################################################
            delarr=[]
            for bomb in Bombs.keys():

                    # [PlayersData[player]["X"], PlayersData[player]["Y"], x, y, time.time(), player, None, 40, 3, 0.5, 3]
                    # AARockets[aarocket][4]+= AARockets[aarocket][6]/TPS
                    relt = (time.time()-Bombs[bomb][4])/Bombs[bomb][10]
                    if relt > 1:
                        # print("!!!!!!")

                        point = Point((Bombs[bomb][2],Bombs[bomb][3]))
                        col = Point((Bombs[bomb][2],Bombs[bomb][3])).buffer(0.05)
                        print(Bombs[bomb][2],Bombs[bomb][3])
                        status = 4
                        try:
                            for _ in MAP['Q'][(int(Bombs[bomb][2]), int(Bombs[bomb][3]))]['B']:
                                if MAP['B'][_].intersects(point):
                                    status = 1
                            for _ in MAP['Q'][(int(Bombs[bomb][2]), int(Bombs[bomb][3]))]['S']:
                                if MAP['S'][_].intersects(point):
                                    status = 1
                            for _ in MAP['Q'][(int(Bombs[bomb][2]), int(Bombs[bomb][3]))]['PLAYERS']:
                                if _ in PlayersData.keys() and _ !=Bombs[bomb][5] and PlayersData[_]['Z'] ==0:
                                    if PlayersData[_]['COL'].intersects(point):
                                        status = 1
                                    if PlayersData[_]['COL'].intersects(col):

                                        if PlayersData[_]['STATUS'] == 'ALIVE' and not _ in Teams[PlayersData[_]['TEAM']]:


                                            # Point(2, 1).buffer(1.5)
                                            dmg = int(Bombs[bomb][7]*PlayersData[_]['COL'].intersection(col).area*100)
                                            PlayersData[_]['HP'] -= dmg

                                            PlayersData[_]['LASTDMG'] = datetime.datetime.now()

                                            PlayersData[Bombs[bomb][5]]['SCORES'] += dmg
                                            PlayersData[_]['KILLER'] = Bombs[bomb][5]
                                            if PlayersData[_]['HP'] <= 0:
                                                PlayersData[_]['STATUS'] = 'BURNING'
                                                for i in PlayersData[_]['CAN']:
                                                    i[8] = 3
                                                PlayersData[_]['BURNTIMER'] = 5*TPS
                                                # try:
                                                #     # PlayersData[Torpedos[torpedo][7]]['SCORES'] += 1+PlayersData[Torpedos[torpedo][7]]['KSR']
                                                #     if not PlayersAccs[Torpedos[torpedo][7]]['NICK']=='':
                                                #         PlayersAccs[Torpedos[torpedo][7]]['money'] += PlayersData[Torpedos[torpedo][7]]['KSR']*10
                                                #         SQLctx.execute(
                                                #             f"""UPDATE Account set money = money+{PlayersData[Torpedos[torpedo][7]]['KSR']*10} WHERE nickname = '{PlayersAccs[Torpedos[torpedo][7]]['NICK']}' AND password = '{PlayersAccs[Torpedos[torpedo][7]]['PSW']}'""")
                                                #         SQL.commit()
                                                #         PlayersData[Torpedos[torpedo][7]]['MSGTURN'].append(f'\nl,You received {PlayersData[Torpedos[torpedo][7]]["KSR"]*10} goldshell{"s"*int(PlayersData[Torpedos[torpedo][7]]["KSR"]>0)} !,{LastMSGI}')
                                                #         LastMSGI+=1
                                                #     PlayersData[Torpedos[torpedo][7]]['KSR'] +=1
                                                # except:pass
                                                PlayersData[_]['HP'] = 0

                        except KeyError:
                            # pass
                            delarr.append(bomb)
                        Bombs[bomb][8] = status
                            # logging.exception("message")
                    if Bombs[bomb][8]==2:
                        Bombs[bomb][8] = 0
                    elif Bombs[bomb][8]==3:
                        Bombs[bomb][8] = 2

                    if Bombs[bomb][8]==1 or Bombs[bomb][8]==4:
                        BombsHandler[bomb] = Bombs[bomb].copy()
                        delarr.append(bomb)
                        continue
                    for x in range(int(Bombs[bomb][2])-1,int(Bombs[bomb][3])+2):
                        for y in range(int(Bombs[bomb][2])-1,int(Bombs[bomb][3])+2):
                            try:

                                # del MAP['Q'][aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa(x, y)]['TORPEDOS'][torpedo]
                                MAP['Q'][(x, y)]['BOMBS'].discard(bomb)
                            except:
                                pass
                    try:
                        MAP['Q'][(int(Bombs[bomb][2]), int(Bombs[bomb][3]))]['BOMBS'].add(bomb)
                    except:pass

                    # logging.exception("message")
            for bomb in delarr:
                try:
                    del Bombs[bomb]
                except:pass
                ################################################
            delarr=[]
            for aarocket in AARockets.keys():
                try:
                    # AARockets[aarocket][4]+= AARockets[aarocket][6]/TPS
                    t = time.time()-AARockets[aarocket][4]
                    dist = t*AARockets[aarocket][6] + t*t*AARockets[aarocket][11]/2
                    if dist > AARockets[aarocket][12]:
                        AARockets[aarocket][10] = 4
                        # AARocketsHandler[aarocket] = AARockets[aarocket].copy()
                        # delarr.append(aarocket)
                    AARockets[aarocket][2] = math.cos(AARockets[aarocket][5]/180*math.pi)*dist
                    AARockets[aarocket][3] = math.sin(AARockets[aarocket][5]/180*math.pi)*dist

                    if AARockets[aarocket][10]==2:
                        AARockets[aarocket][10] = 0
                    elif AARockets[aarocket][10]==3:
                        AARockets[aarocket][10] = 2
                    prevT = time.time()-AARockets[aarocket][4] - 1/TPS
                    prevDist = prevT * AARockets[aarocket][6] + prevT * prevT * AARockets[aarocket][11] / 2
                    deltaS = dist - prevDist
                    AARockets[aarocket][8] = LineString([[AARockets[aarocket][0]+AARockets[aarocket][2],AARockets[aarocket][1]+AARockets[aarocket][3]],[AARockets[aarocket][0]+AARockets[aarocket][2]-math.cos(AARockets[aarocket][5]/180*math.pi)*deltaS,AARockets[aarocket][1]+AARockets[aarocket][3]-math.sin(AARockets[aarocket][5]/180*math.pi)*deltaS]])
                    if AARockets[aarocket][10] != 3 and AARockets[aarocket][10] != 2:
                        try:
                            for _ in MAP['Q'][(int((AARockets[aarocket][2]+AARockets[aarocket][0])//1), int((AARockets[aarocket][3]+AARockets[aarocket][1])//1))]['PLAYERS']:

                                if _ in PlayersData.keys() and _ !=AARockets[aarocket][7] and PlayersData[_]['Z'] ==1:

                                    if PlayersData[_]['COL'].intersects(AARockets[aarocket][8]):

                                        if PlayersData[_]['STATUS'] == 'ALIVE' and not _ in Teams[PlayersData[_]['TEAM']]:


                                            # Point(2, 1).buffer(1.5)
                                            PlayersData[_]['HP'] -= AARockets[aarocket][9]

                                            PlayersData[_]['LASTDMG'] = datetime.datetime.now()

                                            PlayersData[AARockets[aarocket][7]]['SCORES'] += AARockets[aarocket][9]+PlayersData[_]['HP']
                                            PlayersData[_]['KILLER'] = AARockets[aarocket][7]
                                            if PlayersData[_]['HP'] <= 0:
                                                PlayersData[_]['STATUS'] = 'BURNING'
                                                for i in PlayersData[_]['CAN']:
                                                    i[8] = 3
                                                PlayersData[_]['BURNTIMER'] = 5*TPS
                                                PlayersData[_]['KILLER'] = AARockets[aarocket][7]
                                                # try:
                                                #     # PlayersData[Torpedos[torpedo][7]]['SCORES'] += 1+PlayersData[Torpedos[torpedo][7]]['KSR']
                                                #     if not PlayersAccs[Torpedos[torpedo][7]]['NICK']=='':
                                                #         PlayersAccs[Torpedos[torpedo][7]]['money'] += PlayersData[Torpedos[torpedo][7]]['KSR']*10
                                                #         SQLctx.execute(
                                                #             f"""UPDATE Account set money = money+{PlayersData[Torpedos[torpedo][7]]['KSR']*10} WHERE nickname = '{PlayersAccs[Torpedos[torpedo][7]]['NICK']}' AND password = '{PlayersAccs[Torpedos[torpedo][7]]['PSW']}'""")
                                                #         SQL.commit()
                                                #         PlayersData[Torpedos[torpedo][7]]['MSGTURN'].append(f'\nl,You received {PlayersData[Torpedos[torpedo][7]]["KSR"]*10} goldshell{"s"*int(PlayersData[Torpedos[torpedo][7]]["KSR"]>0)} !,{LastMSGI}')
                                                #         LastMSGI+=1
                                                #     PlayersData[Torpedos[torpedo][7]]['KSR'] +=1
                                                # except:pass
                                                PlayersData[_]['HP'] = 0
                                        AARockets[aarocket][10]=1
                        except KeyError:
                            # pass
                            delarr.append(aarocket)
                            # logging.exception("message")
                    if AARockets[aarocket][10]==1 or  AARockets[aarocket][10]==4:
                        AARocketsHandler[aarocket] = AARockets[aarocket].copy()
                        delarr.append(aarocket)
                        continue
                    for x in range(int((AARockets[aarocket][2]+AARockets[aarocket][0])//1)-1,int((AARockets[aarocket][2]+AARockets[aarocket][0])//1)+2):
                        for y in range(int((AARockets[aarocket][3]+AARockets[aarocket][1])//1)-1,int((AARockets[aarocket][3]+AARockets[aarocket][1])//1)+2):
                            try:

                                # del MAP['Q'][aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa(x, y)]['TORPEDOS'][torpedo]
                                MAP['Q'][(x, y)]['AAROCKETS'].discard(aarocket)
                            except:
                                pass
                    try:
                        MAP['Q'][(int((AARockets[aarocket][2]+AARockets[aarocket][0])//1), int((AARockets[aarocket][3]+AARockets[aarocket][1])//1))]['AAROCKETS'].add(aarocket)
                    except:pass
                except Exception:
                    pass
                    # logging.exception("message")
            for aarocket in delarr:
                try:
                    del AARockets[aarocket]
                except:pass


            ################################################
            delarr=[]
            for torpedo in Torpedos.keys():
                try:
                    Torpedos[torpedo][4]+= Torpedos[torpedo][6]/TPS
                    Torpedos[torpedo][2] = math.cos(Torpedos[torpedo][5]/180*math.pi)*Torpedos[torpedo][4]
                    Torpedos[torpedo][3] = math.sin(Torpedos[torpedo][5]/180*math.pi)*(Torpedos[torpedo][4])

                    if Torpedos[torpedo][10]==2:
                        Torpedos[torpedo][10] = 0
                    elif Torpedos[torpedo][10]==3:
                        Torpedos[torpedo][10] = 2

                    Torpedos[torpedo][8] = LineString([[Torpedos[torpedo][0]+Torpedos[torpedo][2],Torpedos[torpedo][1]+Torpedos[torpedo][3]],[Torpedos[torpedo][0]+Torpedos[torpedo][2]-math.cos(Torpedos[torpedo][5]/180*math.pi)*Torpedos[torpedo][6]/TPS,Torpedos[torpedo][1]+Torpedos[torpedo][3]-math.sin(Torpedos[torpedo][5]/180*math.pi)*Torpedos[torpedo][6]/TPS]])
                    try:
                        for _ in MAP['Q'][(int((Torpedos[torpedo][2]+Torpedos[torpedo][0])//1), int((Torpedos[torpedo][3]+Torpedos[torpedo][1])//1))]['PLAYERS']:

                            if _ in PlayersData.keys() and _ !=Torpedos[torpedo][7] and PlayersData[_]['Z'] ==0:

                                if PlayersData[_]['COL'].intersects(Torpedos[torpedo][8]):

                                    if PlayersData[_]['STATUS'] == 'ALIVE' and not _ in Teams[PlayersData[_]['TEAM']]:


                                        # Point(2, 1).buffer(1.5)
                                        pcrds = Torpedos[torpedo][8].intersection(PlayersData[_]['COL']).coords[:][0]
                                        p = Point(pcrds).buffer(0.05)
                                        PlayersData[_]['HP'] -= int(Torpedos[torpedo][9] * p.intersection(PlayersData[_]['COL']).area / p.area)

                                        PlayersData[_]['LASTDMG'] = datetime.datetime.now()

                                        PlayersData[Torpedos[torpedo][7]]['SCORES'] += Torpedos[torpedo][9]+PlayersData[_]['HP']
                                        PlayersData[_]['KILLER'] = Torpedos[torpedo][7]
                                        if PlayersData[_]['HP'] <= 0:
                                            PlayersData[_]['STATUS'] = 'BURNING'
                                            for i in PlayersData[_]['CAN']:
                                                i[8] = 3
                                            PlayersData[_]['BURNTIMER'] = 5*TPS
                                            PlayersData[_]['KILLER'] = Torpedos[torpedo][7]
                                            # try:
                                            #     # PlayersData[Torpedos[torpedo][7]]['SCORES'] += 1+PlayersData[Torpedos[torpedo][7]]['KSR']
                                            #     if not PlayersAccs[Torpedos[torpedo][7]]['NICK']=='':
                                            #         PlayersAccs[Torpedos[torpedo][7]]['money'] += PlayersData[Torpedos[torpedo][7]]['KSR']*10
                                            #         SQLctx.execute(
                                            #             f"""UPDATE Account set money = money+{PlayersData[Torpedos[torpedo][7]]['KSR']*10} WHERE nickname = '{PlayersAccs[Torpedos[torpedo][7]]['NICK']}' AND password = '{PlayersAccs[Torpedos[torpedo][7]]['PSW']}'""")
                                            #         SQL.commit()
                                            #         PlayersData[Torpedos[torpedo][7]]['MSGTURN'].append(f'\nl,You received {PlayersData[Torpedos[torpedo][7]]["KSR"]*10} goldshell{"s"*int(PlayersData[Torpedos[torpedo][7]]["KSR"]>0)} !,{LastMSGI}')
                                            #         LastMSGI+=1
                                            #     PlayersData[Torpedos[torpedo][7]]['KSR'] +=1
                                            # except:pass
                                            PlayersData[_]['HP'] = 0
                                    Torpedos[torpedo][10]=1
                    except KeyError:
                        pass
                        # delarr.append(torpedo)
                        # logging.exception("message")
                    try:
                        for _ in MAP['Q'][(int((Torpedos[torpedo][2]+Torpedos[torpedo][0])//1), int((Torpedos[torpedo][3]+Torpedos[torpedo][1])//1))]['B']:
                                if MAP['B'][_].intersects(Torpedos[torpedo][8]):
                                    Torpedos[torpedo][10] = 1
                    except Exception:
                        delarr.append(torpedo)
                    try:
                        for _ in MAP['Q'][(int((Torpedos[torpedo][2]+Torpedos[torpedo][0])//1), int((Torpedos[torpedo][3]+Torpedos[torpedo][1])//1))]['S']:
                                if MAP['S'][_].intersects(Torpedos[torpedo][8]):
                                    Torpedos[torpedo][10] = 1
                    except Exception:
                        delarr.append(torpedo)
                    if Torpedos[torpedo][10]==1:
                        TorpedosHandler[torpedo] = Torpedos[torpedo].copy()
                        delarr.append(torpedo)
                        continue
                    for x in range(int((Torpedos[torpedo][2]+Torpedos[torpedo][0])//1)-1,int((Torpedos[torpedo][2]+Torpedos[torpedo][0])//1)+2):
                        for y in range(int((Torpedos[torpedo][3]+Torpedos[torpedo][1])//1)-1,int((Torpedos[torpedo][3]+Torpedos[torpedo][1])//1)+2):
                            try:

                                # del MAP['Q'][aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa(x, y)]['TORPEDOS'][torpedo]
                                MAP['Q'][(x, y)]['TORPEDOS'].discard(torpedo)
                            except:
                                pass
                    try:
                        MAP['Q'][(int((Torpedos[torpedo][2]+Torpedos[torpedo][0])//1), int((Torpedos[torpedo][3]+Torpedos[torpedo][1])//1))]['TORPEDOS'].add(torpedo)
                    except:pass
                except Exception:
                    pass
                    # logging.exception("message")
            for torpedo in delarr:
                try:
                    del Torpedos[torpedo]
                except:pass

                ################################################
            for zone in Zones.keys():
                try:
                    Zones[zone][4] +=1
                    if Zones[zone][4] >9:
                        try:
                            if Zones[zone][2] == 'player':
                                PlayersData[Zones[zone][3]]['SCORES'] +=1
                                PlayersData[Zones[zone][3]]['KSR'] = 1


                            elif Zones[zone][2] == 'team':
                                for pl in Teams[Zones[zone][3]]:
                                    PlayersData[pl]['SCORES'] += 1
                                    PlayersData[pl]['KSR'] = 1


                        except:
                            Zones[zone][2] = ''
                            Zones[zone][3] = ''
                        Zones[zone][4] = 0
                    players = set()

                    for phf in MAP['Q'][(int(Zones[zone][0] // 1), int(Zones[zone][1] // 1))]['PLAYERS'] :
                        if (PlayersData[phf]['X']-Zones[zone][0])**2+(PlayersData[phf]['Y']-Zones[zone][1])**2 <( Zones[zone][5]/2)**2  and vehicleinfo[PlayersCosmetics[phf]['VEHICLE']]['MAXSPEED']*0.3 > PlayersData[phf]['SPEED'] and vehicleinfo[PlayersCosmetics[phf]['VEHICLE']]['MAXSPEED']*-0.3 < PlayersData[phf]['SPEED']:
                            players.add(phf)

                    players = list(players)
                    if len(players) > 1:
                        gvgt = True
                        for player in range(1,len(players)):
                            if PlayersData[players[player]]['TEAM'] != PlayersData[players[player-1]]['TEAM'] and not PlayersData[players[player]]['TEAM'] is None:
                                gvgt = False
                                break
                        if gvgt:
                            Zones[zone][2] = 'team'
                            Zones[zone][3] = PlayersData[players[0]]['TEAM']
                            for pl in players:
                                if (datetime.datetime.now() - PlayersData[pl]['EQZNUPDTTIMER']).seconds > 30:
                                    if PlayersData[pl]['SMOKES'] < vehicleinfo[PlayersCosmetics[pl]['VEHICLE']]['SMOKES']:
                                        PlayersData[pl]['SMOKES'] += 1
                                    if PlayersData[pl]['TORPEDOS'] < vehicleinfo[PlayersCosmetics[pl]['VEHICLE']]['TORPEDOS']:
                                        PlayersData[pl]['TORPEDOS'] += 1
                                    if PlayersData[pl]['AAROCKETS'] < vehicleinfo[PlayersCosmetics[pl]['VEHICLE']]['AAROCKETS']:
                                        PlayersData[pl]['AAROCKETS'] += 1
                                    if PlayersData[pl]['BOMBS'] < vehicleinfo[PlayersCosmetics[pl]['VEHICLE']]['BOMBS']:
                                        PlayersData[pl]['BOMBS'] += 1
                                    PlayersData[pl]['EQZNUPDTTIMER'] = datetime.datetime.now()
                                PlayersData[pl]['AMMO'] = vehicleinfo[PlayersCosmetics[pl]['VEHICLE']]['AMMO'].copy()

                                PlayersData[pl]['AMMOUPDATE'] = False

                        else:
                            Zones[zone][2] = ''
                            Zones[zone][3] = ''

                    elif len(players) == 1:
                        for _ in range(0, len(vehicleinfo[PlayersCosmetics[players[0]]['VEHICLE']]['CAN'])):
                            if (datetime.datetime.now()-PlayersData[players[0]]['EQZNUPDTTIMER']).seconds >40 :
                                if PlayersData[players[0]]['SMOKES'] < vehicleinfo[PlayersCosmetics[players[0]]['VEHICLE']]['SMOKES']:
                                    PlayersData[players[0]]['SMOKES'] += 1
                                if PlayersData[players[0]]['TORPEDOS'] < vehicleinfo[PlayersCosmetics[players[0]]['VEHICLE']]['TORPEDOS']:
                                    PlayersData[players[0]]['TORPEDOS'] += 1
                                if PlayersData[players[0]]['AAROCKETS'] < vehicleinfo[PlayersCosmetics[players[0]]['VEHICLE']]['AAROCKETS']:
                                    PlayersData[players[0]]['AAROCKETS'] += 1
                                if PlayersData[players[0]]['BOMBS'] < vehicleinfo[PlayersCosmetics[players[0]]['VEHICLE']]['BOMBS']:
                                    PlayersData[players[0]]['BOMBS'] += 1
                                PlayersData[players[0]]['EQZNUPDTTIMER'] = datetime.datetime.now()
                            PlayersData[players[0]]['AMMO'] = vehicleinfo[PlayersCosmetics[players[0]]['VEHICLE']]['AMMO'].copy()
                            PlayersData[players[0]]['AMMOUPDATE'] = False
                        if PlayersData[players[0] ]['TEAM'] is None:
                            Zones[zone][2] = 'player'
                            Zones[zone][3] = players[0]
                        else:
                            Zones[zone][2] = 'team'
                            Zones[zone][3] = PlayersData[players[0] ]['TEAM']
                    else:
                        if Zones[zone][2] == 'player' and not PlayersData[Zones[zone][3] ]['TEAM'] is None:
                            Zones[zone][2] = 'team'
                            Zones[zone][3] = PlayersData[Zones[zone][3] ]['TEAM']
                except:
                    Zones[zone][2] = ''
                    Zones[zone][3] = ''
            KickList = []
            for player in PlayersSockets.keys():
                try:
                    # print(PlayersAccs)
                    if (datetime.datetime.now()-PlayersAccs[player]['contime']).seconds > 2 and not player in PlayersInputs:
                        KickList.append(player)

                        if not (PlayersAccs[player]['NICK'] == '' and PlayersAccs[player]['PSW'] == ''):
                            pass
                            # print('!!!')
                            # SQLctx.execute(
                            #     f"""UPDATE Account set money = money+1 WHERE nickname = '{PlayersAccs[player]['NICK']}' AND password = '{PlayersAccs[player]['PSW']}'""")
                            # SQLctx.execute(
                            #     f"""UPDATE Account set deaths = deaths-1 WHERE nickname = '{PlayersAccs[player]['NICK']}' AND password = '{PlayersAccs[player]['PSW']}'""")
                            # SQL.commit()
                except Exception:
                    pass
                    # logging.exception("message")
                if player in PlayersInputs and PlayersData[player]["STATUS"] != 'DEAD' and PlayersData[player]["STATUS"] != 'AFK':
                    if  PlayersData[player]['HP'] < vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['HPMAX'] and (datetime.datetime.now()-PlayersData[player]['LASTDMG']).seconds > 30:
                        PlayersData[player]['HP']+=1


                    # PlayersData[player]["X"] += math.cos(PlayersData[player]['DIR']/180*math.pi)*(vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['SPEED']*int(not PlayersData[player]['ONGROUND'])+vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*int( PlayersData[player]['ONGROUND']))/TPS*(PlayersData[player]['GAS']/100)
                    # PlayersData[player]["Y"] += math.sin(PlayersData[player]['DIR']/180*math.pi)*(vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['SPEED']*int(not PlayersData[player]['ONGROUND'])+vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*int( PlayersData[player]['ONGROUND']))/TPS*(PlayersData[player]['GAS']/100)
                    if  vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GASTYPE'] == 1:
                        if type(PlayersData[player]['GAS']) == type(0): PlayersData[player]['GAS'] = 'FLYING'
                        PlayersData[player]["SPEED"] += ((vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['MAXSPEED']* (0.25 + 0.75*int(PlayersData[player]['GAS']!='LANDING'))) - PlayersData[player]["SPEED"]) * vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['BOOST']
                    else:
                        if not PlayersData[player]['ONGROUND'] :
                            PlayersData[player]["SPEED"] += ((vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['MAXSPEED']*PlayersData[player]['GAS']/100)-PlayersData[player]["SPEED"])* vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['BOOST']
                        else:
                            PlayersData[player]["SPEED"] += ((vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*PlayersData[player]['GAS']/100)-PlayersData[player]["SPEED"])* vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDBOOST'] #vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*PlayersData[player]['GAS']/100
                    PlayersData[player]["X"] += math.cos(PlayersData[player]['DIR']/180*math.pi)*PlayersData[player]['SPEED']/TPS
                    PlayersData[player]["Y"] += math.sin(PlayersData[player]['DIR']/180*math.pi)*PlayersData[player]['SPEED']/TPS
                    if PlayersData[player]['X'] > WH or PlayersData[player]['X'] < 0 or PlayersData[player]['Y'] > WH or PlayersData[player]['Y'] < 0:
                        # PlayersData[player]['HP'] = PlayersData[player]['HPMAX']
                        # if vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['MOVETYPE'] < 2:PlayersData[player]['DIR'] = (PlayersData[player]['DIR']+180)%360
                        PlayersData[player]['TORPEDOS'] = vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['TORPEDOS']
                        PlayersData[player]['SMOKES'] = vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['SMOKES']
                        PlayersData[player]['AAROCKETS'] = vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['AAROCKETS']
                        PlayersData[player]['BOMBS'] = vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['BOMBS']

                        PlayersData[player]['KSR'] = 1
                        PlayersData[player]['AMMO'] = vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['AMMO'].copy()
                        PlayersData[player]['AMMOUPDATE'] = False


                        # if vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['MOVETYPE'] == 2 or True:
                        if PlayersData[player]['X'] > WH-0.001:
                            PlayersData[player]["X"] = WH-0.001
                        elif PlayersData[player]['X'] < 0.001:
                            PlayersData[player]["X"] =  0.001
                        if PlayersData[player]['Y'] > WH-0.001:
                            PlayersData[player]["Y"] = WH-0.001
                        elif PlayersData[player]['Y'] < 0.001:
                            PlayersData[player]["Y"] = 0.001
                    _0 = vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['DEFCOL'].exterior.coords
                    PlayersData[player]['COL']=[]
                    for c in _0 :
                        d = math.sqrt(c[0]**2+c[1]**2)
                        deg = lookat(c[0],c[1])
                        a = (math.cos((deg+PlayersData[player]['DIR'])/180*math.pi)*d,math.sin((deg+PlayersData[player]['DIR'])/180*math.pi)*d)
                        PlayersData[player]['COL'].append([PlayersData[player]['X']+a[0],PlayersData[player]['Y']+a[1]])
                    PlayersData[player]['COL']=Polygon(PlayersData[player]['COL'])
                    wasCol = False
                    ColT = ''
                    mx,my = 0,0
                    ms = 0
                    if (vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['COLB'] or not PlayersData[player]['ONGROUND']) and not PlayersData[player]['TAKEN'] and vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['Z'] == 0:
                        try:
                            for _ in list(PlayersData[player]['VISB']):
                                if PlayersData[player]['COL'].intersects(MAP['B'][_]):
                                    cords = MAP['B'][_].exterior.coords
                                    for l in range(0,len(cords)):
                                        ln = LineString([cords[l], cords[(l+1)%len(cords)]])
                                        if ln.intersects(PlayersData[player]['COL']):
                                            if MAPobjSIDEdir['B'][_] :
                                                if (cords[(l+1)%len(cords)][0] - cords[l][0])*(PlayersData[player]['SPEED']/abs(PlayersData[player]['SPEED']))*math.sin(PlayersData[player]['DIR'] / 180 * math.pi)  + (cords[l][1] - cords[(l+1)%len(cords)][1])*(PlayersData[player]['SPEED']/abs(PlayersData[player]['SPEED']))*math.cos(PlayersData[player]['DIR'] / 180 * math.pi) > 0 or True:
                                                    # print()
                                                    mx -= ((cords[l][1] - cords[(l+1)%len(cords)][1]) / math.sqrt((cords[(l+1)%len(cords)][0] - cords[l][0])**2+(cords[(l+1)%len(cords)][1] - cords[l][1])**2))*abs(PlayersData[player]['SPEED'])/TPS*math.sqrt(1-(abs((cords[(l+1)%len(cords)][1] - cords[l][1])*(PlayersData[player]['SPEED']/abs(PlayersData[player]['SPEED']))*math.sin(PlayersData[player]['DIR'] / 180 * math.pi)  + (cords[(l+1)%len(cords)][0]-cords[l][0])*(PlayersData[player]['SPEED']/abs(PlayersData[player]['SPEED']))*math.cos(PlayersData[player]['DIR'] / 180 * math.pi))/math.sqrt((cords[(l+1)%len(cords)][0] - cords[l][0])**2+(cords[(l+1)%len(cords)][1] - cords[l][1])**2))**2)
                                                    my -= ((cords[(l+1)%len(cords)][0] - cords[l][0]) / math.sqrt((cords[(l+1)%len(cords)][0] - cords[l][0])**2+(cords[(l+1)%len(cords)][1] - cords[l][1])**2))*abs(PlayersData[player]['SPEED'])/TPS*math.sqrt(1-(abs((cords[(l+1)%len(cords)][1] - cords[l][1])*(PlayersData[player]['SPEED']/abs(PlayersData[player]['SPEED']))*math.sin(PlayersData[player]['DIR'] / 180 * math.pi)  + (cords[(l+1)%len(cords)][0]-cords[l][0])*(PlayersData[player]['SPEED']/abs(PlayersData[player]['SPEED']))*math.cos(PlayersData[player]['DIR'] / 180 * math.pi))/math.sqrt((cords[(l+1)%len(cords)][0] - cords[l][0])**2+(cords[(l+1)%len(cords)][1] - cords[l][1])**2))**2)
                                                    ms += 1
                                            else:
                                                if (cords[(l+1)%len(cords)][0] - cords[l][0])*(PlayersData[player]['SPEED']/abs(PlayersData[player]['SPEED']))*math.sin(PlayersData[player]['DIR'] / 180 * math.pi)  + (cords[l][1] - cords[(l+1)%len(cords)][1])*(PlayersData[player]['SPEED']/abs(PlayersData[player]['SPEED']))*math.cos(PlayersData[player]['DIR'] / 180 * math.pi) < 0 or True:
                                                    mx += ((cords[l][1] -
                                                                                  cords[(l + 1) % len(cords)][
                                                                                      1]) / math.sqrt(
                                                        (cords[(l + 1) % len(cords)][0] - cords[l][0]) ** 2 + (
                                                                    cords[(l + 1) % len(cords)][1] - cords[l][
                                                                1]) ** 2)) * abs(
                                                        PlayersData[player]['SPEED']) / TPS * math.sqrt(1 - (abs(
                                                        (cords[(l + 1) % len(cords)][1] - cords[l][1]) * (
                                                                    PlayersData[player]['SPEED'] / abs(
                                                                PlayersData[player]['SPEED'])) * math.sin(
                                                            PlayersData[player]['DIR'] / 180 * math.pi) + (
                                                                    cords[(l + 1) % len(cords)][0] - cords[l][0]) * (
                                                                    PlayersData[player]['SPEED'] / abs(
                                                                PlayersData[player]['SPEED'])) * math.cos(
                                                            PlayersData[player]['DIR'] / 180 * math.pi)) / math.sqrt(
                                                        (cords[(l + 1) % len(cords)][0] - cords[l][0]) ** 2 + (
                                                                    cords[(l + 1) % len(cords)][1] - cords[l][
                                                                1]) ** 2)) ** 2)
                                                    my += ((cords[(l + 1) % len(cords)][0] -
                                                                                  cords[l][0]) / math.sqrt(
                                                        (cords[(l + 1) % len(cords)][0] - cords[l][0]) ** 2 + (
                                                                    cords[(l + 1) % len(cords)][1] - cords[l][
                                                                1]) ** 2)) * abs(
                                                        PlayersData[player]['SPEED']) / TPS * math.sqrt(1 - (abs(
                                                        (cords[(l + 1) % len(cords)][1] - cords[l][1]) * (
                                                                    PlayersData[player]['SPEED'] / abs(
                                                                PlayersData[player]['SPEED'])) * math.sin(
                                                            PlayersData[player]['DIR'] / 180 * math.pi) + (
                                                                    cords[(l + 1) % len(cords)][0] - cords[l][0]) * (
                                                                    PlayersData[player]['SPEED'] / abs(
                                                                PlayersData[player]['SPEED'])) * math.cos(
                                                            PlayersData[player]['DIR'] / 180 * math.pi)) / math.sqrt(
                                                        (cords[(l + 1) % len(cords)][0] - cords[l][0]) ** 2 + (
                                                                    cords[(l + 1) % len(cords)][1] - cords[l][
                                                                1]) ** 2)) ** 2)
                                                    ms += 1
                                    # PlayersData[player]["X"] -= math.cos(PlayersData[player]['DIR'] / 180 * math.pi) * (vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['SPEED']*int(not PlayersData[player]['ONGROUND'])+vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*int( PlayersData[player]['ONGROUND']))/TPS * (PlayersData[player]['GAS'] / 100)*1
                                    # PlayersData[player]["Y"] -= math.sin(PlayersData[player]['DIR'] / 180 * math.pi) * (vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['SPEED']*int(not PlayersData[player]['ONGROUND'])+vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*int( PlayersData[player]['ONGROUND']))/TPS * (PlayersData[player]['GAS'] / 100)*1
                                    # mx -= math.cos(PlayersData[player]['DIR'] / 180 * math.pi) * PlayersData[player]['SPEED'] / TPS /10
                                    # my -= math.sin(PlayersData[player]['DIR'] / 180 * math.pi) * PlayersData[player]['SPEED'] / TPS/10
                                    # PlayersData[player]['DIR'] = PlayersData[player]['PrevDIR']
                                    #PlayersData[player]['SPEED'] = 0
                                    wasCol = True
                                    ColT = 'B'

                                    break
                        except Exception:
                            pass
                                    # logging.exception("message")
                    if not vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['COLB']  and not PlayersData[player]['TAKEN'] and vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['Z'] ==0:
                        try:
                            brg_col = False
                            b_col = False
                            for _ in list(PlayersData[player]['VISB']):
                                # if PlayersData[player]['ONGROUND']:
                                #     if Point(PlayersData[player]['X'],PlayersData[player]['Y']).intersects(MAP['B'][_]):
                                #         b_col= True
                                #         break
                                # else:
                                    if PlayersData[player]['COL'].intersects(MAP['B'][_]):
                                        b_col= True
                                        break
                                    #Point(PlayersData[player]['X'],PlayersData[player]['Y'])
                            for _ in list(PlayersData[player]['VISBRIDGES']):
                                if PlayersData[player]['ONGROUND']:
                                    if Point(PlayersData[player]['X'],PlayersData[player]['Y']).intersects(Bridges[_][4]):
                                        brg_col= True
                                        break
                                else:
                                    if PlayersData[player]['COL'].intersects(Bridges[_][4]):
                                        brg_col= True
                                        break
                            if PlayersData[player]['ONGROUND']:
                                if not (brg_col or b_col):
                                    # print('False')
                                    PlayersData[player]['ONGROUND'] = False
                            else:
                                if b_col and not brg_col:
                                    # print('True')
                                    PlayersData[player]['ONGROUND'] = True
                        except:pass

                    if PlayersData[player]['TAKEN']:
                        if PlayersData[player]['TAKENON'] in PlayersData.keys():
                            PlayersData[PlayersData[player]['TAKENON']]['CARRY'].discard(player)

                    PlayersData[player]['TAKEN'] = False
                    if vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['TAKEN']:
                        try:
                            for _ in list(MAP['Q'][(int(PlayersData[player]['X']//1),int(PlayersData[player]['Y']//1))]['PLAYERS']):
                                # print(PlayersData[player]['GAS'] == 'LANDING',vehicleinfo[PlayersCosmetics[_]['VEHICLE']]['CARRIER'] and PlayersCosmetics[player]['VEHICLE'] in vehicleinfo[PlayersCosmetics[_]['VEHICLE']]['CARVEH']  , _!=player , PlayersData[player]['COL'].intersects(PlayersData[_]['COL'] ))
                                if PlayersData[player]['GAS'] == 'LANDING' and vehicleinfo[PlayersCosmetics[_]['VEHICLE']]['CARRIER'] and PlayersCosmetics[player]['VEHICLE'] in vehicleinfo[PlayersCosmetics[_]['VEHICLE']]['CARVEH']  and _!=player and PlayersData[player]['COL'].intersects(PlayersData[_]['COL'] ) and _ in Teams[PlayersData[player]['TEAM']] :
                                    # print('!!!!!!!!!!!!!!!!!!!!!!!')
                                    PlayersData[player]['TAKEN'] = True
                                    PlayersData[player]['TAKENON'] = _
                                    PlayersData[_]['CARRY'].add(player)
                                    # PlayersData[player]['HP'] = PlayersData[player]['HPMAX']
                                    PlayersData[player]['DIR'] = PlayersData[_]['DIR']
                                    PlayersData[player]['TORPEDOS'] = vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['TORPEDOS']
                                    PlayersData[player]['AAROCKETS'] = vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['AAROCKETS']
                                    PlayersData[player]['BOMBS'] = vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['BOMBS']
                                    # PlayersData[player]['CAN'] = []
                                    PlayersData[player]['KSR'] = 1
                                    PlayersData[player]['AMMO'] = vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['AMMO'].copy()
                                    # wasCol = True
                                    break
                        except Exception:
                            pass
                    if vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['COLP'] and not PlayersData[player]['TAKEN']:
                        try:
                            for _ in list(MAP['Q'][(int(PlayersData[player]['X']//1),int(PlayersData[player]['Y']//1))]['PLAYERS']):
                                if _!=player and PlayersData[player]['COL'].intersects(PlayersData[_]['COL'] ) and vehicleinfo[PlayersCosmetics[_]['VEHICLE']]['COLP']:
                                    # PlayersData[player]["X"] -= math.cos(PlayersData[player]['DIR'] / 180 * math.pi) * (vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['SPEED']*int(not PlayersData[player]['ONGROUND'])+vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*int( PlayersData[player]['ONGROUND']))/TPS * (PlayersData[player]['GAS'] / 100)*1
                                    # PlayersData[player]["Y"] -= math.sin(PlayersData[player]['DIR'] / 180 * math.pi) * (vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['SPEED']*int(not PlayersData[player]['ONGROUND'])+vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*int( PlayersData[player]['ONGROUND']))/TPS * (PlayersData[player]['GAS'] / 100)*1
                                    mx -= math.cos(PlayersData[player]['DIR'] / 180 * math.pi) * PlayersData[player]['SPEED'] / TPS
                                    my -= math.sin(PlayersData[player]['DIR'] / 180 * math.pi) * PlayersData[player]['SPEED'] / TPS
                                    PlayersData[player]['DIR'] = PlayersData[player]['PrevDIR']
                                    ms+=1
                                    wasCol = True
                                    ColT = 'P'
                                    break
                        except:pass
                    if vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['COLS'] and not PlayersData[player]['TAKEN']:
                        try:

                            for _ in list(PlayersData[player]['VISS']):
                                if PlayersData[player]['COL'].intersects(MAP['S'][_]):
                                    cords = MAP['S'][_].exterior.coords
                                    for l in range(0, len(cords)):
                                        ln = LineString([cords[l], cords[(l + 1) % len(cords)]])
                                        if ln.intersects(PlayersData[player]['COL']):
                                            if MAPobjSIDEdir['S'][_]:
                                                if (cords[(l + 1) % len(cords)][0] - cords[l][0]) * (
                                                        PlayersData[player]['SPEED'] / abs(
                                                        PlayersData[player]['SPEED'])) * math.sin(
                                                        PlayersData[player]['DIR'] / 180 * math.pi) + (
                                                        cords[l][1] - cords[(l + 1) % len(cords)][1]) * (
                                                        PlayersData[player]['SPEED'] / abs(
                                                        PlayersData[player]['SPEED'])) * math.cos(
                                                        PlayersData[player]['DIR'] / 180 * math.pi) > 0 or True:
                                                    # print()
                                                    mx -= ((cords[l][1] -
                                                                                  cords[(l + 1) % len(cords)][
                                                                                      1]) / math.sqrt(
                                                        (cords[(l + 1) % len(cords)][0] - cords[l][0]) ** 2 + (
                                                                    cords[(l + 1) % len(cords)][1] - cords[l][
                                                                1]) ** 2)) * abs(
                                                        PlayersData[player]['SPEED']) / TPS * math.sqrt(1 - (abs(
                                                        (cords[(l + 1) % len(cords)][1] - cords[l][1]) * (
                                                                    PlayersData[player]['SPEED'] / abs(
                                                                PlayersData[player]['SPEED'])) * math.sin(
                                                            PlayersData[player]['DIR'] / 180 * math.pi) + (
                                                                    cords[(l + 1) % len(cords)][0] - cords[l][0]) * (
                                                                    PlayersData[player]['SPEED'] / abs(
                                                                PlayersData[player]['SPEED'])) * math.cos(
                                                            PlayersData[player]['DIR'] / 180 * math.pi)) / math.sqrt(
                                                        (cords[(l + 1) % len(cords)][0] - cords[l][0]) ** 2 + (
                                                                    cords[(l + 1) % len(cords)][1] - cords[l][
                                                                1]) ** 2)) ** 2)
                                                    my -= ((cords[(l + 1) % len(cords)][0] -
                                                                                  cords[l][0]) / math.sqrt(
                                                        (cords[(l + 1) % len(cords)][0] - cords[l][0]) ** 2 + (
                                                                    cords[(l + 1) % len(cords)][1] - cords[l][
                                                                1]) ** 2)) * abs(
                                                        PlayersData[player]['SPEED']) / TPS * math.sqrt(1 - (abs(
                                                        (cords[(l + 1) % len(cords)][1] - cords[l][1]) * (
                                                                    PlayersData[player]['SPEED'] / abs(
                                                                PlayersData[player]['SPEED'])) * math.sin(
                                                            PlayersData[player]['DIR'] / 180 * math.pi) + (
                                                                    cords[(l + 1) % len(cords)][0] - cords[l][0]) * (
                                                                    PlayersData[player]['SPEED'] / abs(
                                                                PlayersData[player]['SPEED'])) * math.cos(
                                                            PlayersData[player]['DIR'] / 180 * math.pi)) / math.sqrt(
                                                        (cords[(l + 1) % len(cords)][0] - cords[l][0]) ** 2 + (
                                                                    cords[(l + 1) % len(cords)][1] - cords[l][
                                                                1]) ** 2)) ** 2)
                                                    ms += 1
                                            else:
                                                if (cords[(l + 1) % len(cords)][0] - cords[l][0]) * (
                                                        PlayersData[player]['SPEED'] / abs(
                                                        PlayersData[player]['SPEED'])) * math.sin(
                                                        PlayersData[player]['DIR'] / 180 * math.pi) + (
                                                        cords[l][1] - cords[(l + 1) % len(cords)][1]) * (
                                                        PlayersData[player]['SPEED'] / abs(
                                                        PlayersData[player]['SPEED'])) * math.cos(
                                                        PlayersData[player]['DIR'] / 180 * math.pi) < 0 or True:
                                                    mx += ((cords[l][1] -
                                                                                  cords[(l + 1) % len(cords)][
                                                                                      1]) / math.sqrt(
                                                        (cords[(l + 1) % len(cords)][0] - cords[l][0]) ** 2 + (
                                                                cords[(l + 1) % len(cords)][1] - cords[l][
                                                            1]) ** 2)) * abs(
                                                        PlayersData[player]['SPEED']) / TPS * math.sqrt(1 - (abs(
                                                        (cords[(l + 1) % len(cords)][1] - cords[l][1]) * (
                                                                PlayersData[player]['SPEED'] / abs(
                                                            PlayersData[player]['SPEED'])) * math.sin(
                                                            PlayersData[player]['DIR'] / 180 * math.pi) + (
                                                                cords[(l + 1) % len(cords)][0] - cords[l][0]) * (
                                                                PlayersData[player]['SPEED'] / abs(
                                                            PlayersData[player]['SPEED'])) * math.cos(
                                                            PlayersData[player]['DIR'] / 180 * math.pi)) / math.sqrt(
                                                        (cords[(l + 1) % len(cords)][0] - cords[l][0]) ** 2 + (
                                                                cords[(l + 1) % len(cords)][1] - cords[l][
                                                            1]) ** 2)) ** 2)
                                                    my += ((cords[(l + 1) % len(cords)][0] -
                                                                                  cords[l][0]) / math.sqrt(
                                                        (cords[(l + 1) % len(cords)][0] - cords[l][0]) ** 2 + (
                                                                cords[(l + 1) % len(cords)][1] - cords[l][
                                                            1]) ** 2)) * abs(
                                                        PlayersData[player]['SPEED']) / TPS * math.sqrt(1 - (abs(
                                                        (cords[(l + 1) % len(cords)][1] - cords[l][1]) * (
                                                                PlayersData[player]['SPEED'] / abs(
                                                            PlayersData[player]['SPEED'])) * math.sin(
                                                            PlayersData[player]['DIR'] / 180 * math.pi) + (
                                                                cords[(l + 1) % len(cords)][0] - cords[l][0]) * (
                                                                PlayersData[player]['SPEED'] / abs(
                                                            PlayersData[player]['SPEED'])) * math.cos(
                                                            PlayersData[player]['DIR'] / 180 * math.pi)) / math.sqrt(
                                                        (cords[(l + 1) % len(cords)][0] - cords[l][0]) ** 2 + (
                                                                cords[(l + 1) % len(cords)][1] - cords[l][
                                                            1]) ** 2)) ** 2)
                                                    ms += 1
                                    # PlayersData[player]["X"] -= math.cos(PlayersData[player]['DIR'] / 180 * math.pi) * (vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['SPEED']*int(not PlayersData[player]['ONGROUND'])+vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*int( PlayersData[player]['ONGROUND']))/TPS * (PlayersData[player]['GAS'] / 100)*1
                                    # PlayersData[player]["Y"] -= math.sin(PlayersData[player]['DIR'] / 180 * math.pi) * (vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['SPEED']*int(not PlayersData[player]['ONGROUND'])+vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*int( PlayersData[player]['ONGROUND']))/TPS * (PlayersData[player]['GAS'] / 100)*1
                                    # PlayersData[player]["X"] -= math.cos(PlayersData[player]['DIR'] / 180 * math.pi) * PlayersData[player]['SPEED'] / TPS
                                    # PlayersData[player]["Y"] -= math.sin(PlayersData[player]['DIR'] / 180 * math.pi) * PlayersData[player]['SPEED'] / TPS
                                    # PlayersData[player]['DIR'] = PlayersData[player]['PrevDIR']
                                    # PlayersData[player]['SPEED'] = 0
                                    wasCol = True
                                    ColT = 'S'
                                    break

                        except :pass

                    if wasCol:
                        # print(ms)
                        if ms >0:
                            PlayersData[player]["X"] += mx*math.sqrt(math.sqrt(ms))
                            PlayersData[player]["Y"] += my*math.sqrt(math.sqrt(ms))
                        elif not (ColT == 'B' and not vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['COLB']):

                            if PlayersData[player]['HP'] > 0 and PlayersData[player]['STATUS'] == 'ALIVE':
                                PlayersData[player]['HP'] = 0
                                PlayersData[player]['STATUS'] = 'BURNING'
                                for _ in PlayersData[player]['CAN']:
                                    _[8] = 3
                                PlayersData[player]['BURNTIMER'] = 5 * TPS
                        PlayersData[player]['SPEED']*=SpeedCOLlosingCOF
                        _0 = vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['DEFCOL'].exterior.coords
                        PlayersData[player]['COL'] = []
                        for c in _0:
                            d = math.sqrt(c[0] ** 2 + c[1] ** 2)
                            deg = lookat(c[0], c[1])
                            a = (math.cos((deg + PlayersData[player]['DIR']) / 180 * math.pi) * d,
                                 math.sin((deg + PlayersData[player]['DIR']) / 180 * math.pi) * d)
                            PlayersData[player]['COL'].append(
                                [PlayersData[player]['X'] + a[0], PlayersData[player]['Y'] + a[1]])
                        PlayersData[player]['COL'] = Polygon(PlayersData[player]['COL'])
                    PlayersData[player]['PrevDIR'] = PlayersData[player]['DIR']
                    if PlayersInputs[player]['wk'] and PlayersData[player]['STATUS'] != "BURNING":
                        # if vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['MOVETYPE']==0:
                        #     PlayersData[player]['GAS'] = barrier(PlayersData[player]['GAS']+25,-100,100)
                        if vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GASTYPE']==0:
                            PlayersData[player]['GAS'] = 100
                        elif vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GASTYPE']==1:
                            PlayersData[player]['GAS'] = 'FLYING'
                    elif PlayersInputs[player]['sk'] and PlayersData[player]['STATUS'] != "BURNING":
                        # if vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['MOVETYPE'] == 0:
                        #     PlayersData[player]['GAS'] = barrier(PlayersData[player]['GAS']-25,-100,100)
                        if vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GASTYPE'] == 0:
                            PlayersData[player]['GAS'] = -100
                        elif vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GASTYPE']==1:
                            PlayersData[player]['GAS'] = 'LANDING'
                    else:
                        if vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GASTYPE'] == 0:
                            PlayersData[player]['GAS'] =0
                    # if (PlayersCosmetics[player]['VEHICLE'] in [5] and PlayersInputs[player]['view'] > 0):
                    if PlayersInputs[player]['ak']  and PlayersData[player]['STATUS'] != "BURNING":
                        if vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['MOVETYPE'] <2  or (PlayersCosmetics[player]['VEHICLE'] in [5] and PlayersInputs[player]['view'] > 0):
                            if not PlayersData[player]['ONGROUND']:
                                if  PlayersData[player]['SPEED'] > vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['MAXSPEED']:
                                    PlayersData[player]['DIR'] = barrier(
                                        PlayersData[player]['DIR'] - vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['TURN'] / TPS * math.sin(2), min=0, minrep=359, max=359,maxrep=0)
                                else:
                                    PlayersData[player]['DIR'] = barrier(PlayersData[player]['DIR']-vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['TURN']/TPS*math.sin(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['MAXSPEED']*2),min=0,minrep = 359,max=359,maxrep=0)
                            else:PlayersData[player]['DIR'] = barrier(PlayersData[player]['DIR']-vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['TURN']/TPS*(math.sin(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*math.pi)*0.5+0.75),min=0,minrep = 359,max=359,maxrep=0)
                    elif PlayersInputs[player]['dk'] and PlayersData[player]['STATUS'] != "BURNING" :
                        if vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['MOVETYPE'] <2  or (PlayersCosmetics[player]['VEHICLE'] in [5] and PlayersInputs[player]['view'] > 0):
                            if not PlayersData[player]['ONGROUND']:
                                if PlayersData[player]['SPEED'] > vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['MAXSPEED']:
                                    PlayersData[player]['DIR'] = barrier(PlayersData[player]['DIR'] + vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['TURN'] / TPS * math.sin(2), min=0, minrep=359, max=359,maxrep=0)
                                else:
                                    PlayersData[player]['DIR'] = barrier(PlayersData[player]['DIR']+vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['TURN']/TPS*math.sin(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['MAXSPEED']*2),min=0,minrep = 359,max=359,maxrep=0)
                            else:PlayersData[player]['DIR'] = barrier(PlayersData[player]['DIR']+vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['TURN']/TPS*(math.sin(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*math.pi)*0.5+0.75),min=0,minrep = 359,max=359,maxrep=0)
                    if vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['MOVETYPE'] == 2 and(not(PlayersCosmetics[player]['VEHICLE'] in [5] and PlayersInputs[player]['view'] > 0)):
                        if  PlayersData[player]['STATUS'] != "BURNING" :
                            PlayersData[player]['DIR'] = lookat(PlayersInputs[player]['x'],PlayersInputs[player]['y'])
                        else:
                            PlayersData[player]['DIR'] += (random.random()*2-1)*15
                    if PlayersData[player]['TAKEN']:
                        PlayersData[player]['X'] = PlayersData[PlayersData[player]['TAKENON']]['X']
                        PlayersData[player]['Y'] = PlayersData[PlayersData[player]['TAKENON']]['Y']
                    PlayersData[player]['CAMCOL'] = Polygon([[PlayersData[player]['X']-5,PlayersData[player]['Y']-4],[PlayersData[player]['X']+5,PlayersData[player]['Y']-4],[PlayersData[player]['X']+5,PlayersData[player]['Y']+4],[PlayersData[player]['X']-5,PlayersData[player]['Y']+4]])
                    if PlayersCosmetics[player]['VEHICLE'] ==  8 : PlayersData[player]["TRACER"] = PlayersInputs[player]['Cmod']
                    for _ in PlayersData[player]['CAN']:
                        d = math.sqrt(_[1] ** 2 + _[2] ** 2)
                        deg = lookat(_[1], _[2])
                        a = (math.cos((deg + PlayersData[player]['DIR']) / 180 * math.pi) * d,
                             math.sin((deg + PlayersData[player]['DIR']) / 180 * math.pi) * d)
                        if _[0] == 'f':
                            b = PlayersData[player]['DIR']
                        else:
                            if PlayersInputs[player]['Cmod']:
                                b = lookat(PlayersInputs[player]['x'],PlayersInputs[player]['y'])
                            else:
                                b = lookat(PlayersInputs[player]['x'] - a[0],PlayersInputs[player]['y']-a[1]  )
                        _[7] = b
                    # print(PlayersData[player]['ZOOM'],PlayersInputs[player]['z'])
                    # print(PlayersAccs)
                    if PlayersCosmetics[player]['VEHICLE'] == 0:
                        PlayersData[player]['STR'] = f'{PlayersCosmetics[player]["VEHICLE"]},{("["+str(PlayersData[player]["TEAM"])+"]")*int(not PlayersData[player]["TEAM"] is None)+player},{PlayersAccs[player]["money"]},{PlayersData[player]["TORPEDOS"]},{PlayersData[player]["SMOKES"]},'+str(PlayersData[player]['GAS']/25)+f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"]*1000)/1000},{int(PlayersData[player]["Y"]*1000)/1000},{PlayersData[player]["Z"]*2+int(PlayersData[player]["ONGROUND"])},'+str(int(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*100))+f',{PlayersData[player]["CAN"][0][8]}{PlayersData[player]["CAN"][0][7]},{PlayersData[player]["CAN"][1][8]}{PlayersData[player]["CAN"][1][7]},'+ str(int(not (PlayersData[player]['STATUS'] == 'BURNING' or PlayersData[player]['STATUS'] == 'DEAD')) * PlayersCosmetics[player]['COLOR']) +f",{int((datetime.datetime.now() - PlayersData[player]['LASTTORPEDO']).seconds < 5+1/TPS)},{int((datetime.datetime.now() - PlayersData[player]['LASTSMOKE']).seconds < 5+1/TPS)}"
                    elif PlayersCosmetics[player]['VEHICLE'] == 1:
                        PlayersData[player]['STR'] = f'{PlayersCosmetics[player]["VEHICLE"]},{("["+str(PlayersData[player]["TEAM"])+"]")*int(not PlayersData[player]["TEAM"] is None)+player},{PlayersAccs[player]["money"]},'+str(PlayersData[player]['GAS']/25)+f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"]*1000)/1000},{int(PlayersData[player]["Y"]*1000)/1000},{PlayersData[player]["Z"]*2+int(PlayersData[player]["ONGROUND"])},'+str(int(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*100))+f',{PlayersData[player]["CAN"][0][8]}{PlayersData[player]["CAN"][0][7]},'+ str(int(not (PlayersData[player]['STATUS'] == 'BURNING' or PlayersData[player]['STATUS'] == 'DEAD')) * PlayersCosmetics[player]['COLOR'])
                    elif PlayersCosmetics[player]['VEHICLE'] == 2:
                        PlayersData[player]['STR'] = f'{PlayersCosmetics[player]["VEHICLE"]},{("["+str(PlayersData[player]["TEAM"])+"]")*int(not PlayersData[player]["TEAM"] is None)+player},{PlayersAccs[player]["money"]},{PlayersData[player]["TORPEDOS"]},{PlayersData[player]["SMOKES"]},'+str(PlayersData[player]['GAS']/25)+f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"]*1000)/1000},{int(PlayersData[player]["Y"]*1000)/1000},{PlayersData[player]["Z"]*2+int(PlayersData[player]["ONGROUND"])},'+str(int(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*100))+f',{PlayersData[player]["CAN"][0][8]}{PlayersData[player]["CAN"][0][7]},'+ str(int(not (PlayersData[player]['STATUS'] == 'BURNING' or PlayersData[player]['STATUS'] == 'DEAD')) * PlayersCosmetics[player]['COLOR'])+f",{int((datetime.datetime.now() - PlayersData[player]['LASTTORPEDO']).seconds < 5+1/TPS)},{int((datetime.datetime.now() - PlayersData[player]['LASTSMOKE']).seconds < 5+1/TPS)}"
                        #print(PlayersData[player]['STR'] )
                    elif PlayersCosmetics[player]['VEHICLE'] == 3:
                        PlayersData[player]['STR'] = f'{PlayersCosmetics[player]["VEHICLE"]},{("["+str(PlayersData[player]["TEAM"])+"]")*int(not PlayersData[player]["TEAM"] is None)+player},{PlayersAccs[player]["money"]},' + str(PlayersData[player]['GAS']/25) + f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"] * 1000) / 1000},{int(PlayersData[player]["Y"] * 1000) / 1000},{PlayersData[player]["Z"] * 2 + int(PlayersData[player]["ONGROUND"])},' + str(int(PlayersData[player]['SPEED'] / vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED'] * 100)) + f',{PlayersData[player]["CAN"][0][8]}{PlayersData[player]["CAN"][0][7]},{PlayersData[player]["CAN"][1][8]}{PlayersData[player]["CAN"][1][7]},' + str(int(not (PlayersData[player]['STATUS'] == 'BURNING' or PlayersData[player]['STATUS'] == 'DEAD')) * PlayersCosmetics[player]['COLOR'])+ "," +str(len( PlayersData[player]['CARRY']))
                    elif PlayersCosmetics[player]['VEHICLE'] == 4:
                        PlayersData[player]['STR'] = f'{PlayersCosmetics[player]["VEHICLE"]},{("["+str(PlayersData[player]["TEAM"])+"]")*int(not PlayersData[player]["TEAM"] is None)+player},{PlayersAccs[player]["money"]},' + str(PlayersData[player]['GAS']/25) + f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"] * 1000) / 1000},{int(PlayersData[player]["Y"] * 1000) / 1000},{PlayersData[player]["Z"] * 2 + int(PlayersData[player]["ONGROUND"])},' + str(int(PlayersData[player]['SPEED'] / vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED'] * 100)) + f',{PlayersData[player]["CAN"][0][8]}{PlayersData[player]["CAN"][0][7]},{PlayersData[player]["CAN"][1][8]}{PlayersData[player]["CAN"][1][7]},' + str(int(not (PlayersData[player]['STATUS'] == 'BURNING' or PlayersData[player]['STATUS'] == 'DEAD')) * PlayersCosmetics[player]['COLOR']) + "," +str(len( PlayersData[player]['CARRY']))
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
                        PlayersData[player]['STR'] = f'{PlayersCosmetics[player]["VEHICLE"]},{("["+str(PlayersData[player]["TEAM"])+"]")*int(not PlayersData[player]["TEAM"] is None)+player},{PlayersAccs[player]["money"]},'+str(PlayersData[player]['GAS'])+f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"]*1000)/1000},{int(PlayersData[player]["Y"]*1000)/1000},{PlayersData[player]["Z"]*2+int(PlayersData[player]["ONGROUND"])},'+str(int(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*1000)/10)+f',{PlayersData[player]["CAN"][0][8]},'+ str(int(not (PlayersData[player]['STATUS'] == 'BURNING' or PlayersData[player]['STATUS'] == 'DEAD')) * PlayersCosmetics[player]['COLOR'])+','+str(PlayersCosmetics[player]['TRACER'])+','+str(PlayersData[player]['BOMBS']) + f',{PlayersData[player]["CAN"][0][8]}{PlayersData[player]["CAN"][0][7]}'
                    elif PlayersCosmetics[player]['VEHICLE'] == 8:
                        PlayersData[player]['STR'] = f'{PlayersCosmetics[player]["VEHICLE"]},{("["+str(PlayersData[player]["TEAM"])+"]")*int(not PlayersData[player]["TEAM"] is None)+player},{PlayersAccs[player]["money"]},'+str(PlayersData[player]['GAS'])+f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"]*1000)/1000},{int(PlayersData[player]["Y"]*1000)/1000},{PlayersData[player]["Z"]*2+int(PlayersData[player]["ONGROUND"])},'+str(int(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*100))+f',{PlayersData[player]["CAN"][0][8]},'+ str(int(not (PlayersData[player]['STATUS'] == 'BURNING' or PlayersData[player]['STATUS'] == 'DEAD')) * PlayersCosmetics[player]['COLOR'])+','+str(PlayersCosmetics[player]['TRACER'])+','+str(PlayersData[player]['AAROCKETS'])
                    PlayersData[player]['STR'] += ','
                    for _ in Zones:
                        PlayersData[player]['STR'] += str(int((Zones[_][2] == 'player' and Zones[_][3]==player)or(Zones[_][2] == 'team' and Zones[_][3]==PlayersData[player]['TEAM'])))
                    PlayersData[player]['VISB'] = set()
                    OldVisTor = PlayersData[player]['VISTOR'].copy()
                    OldVisBul = PlayersData[player]['VISBUL'].copy()
                    OldVisSmk = PlayersData[player]['VISSMK'].copy()
                    OldVisAar = PlayersData[player]['VISAAR'].copy()
                    OldVisBmb = PlayersData[player]['VISBMB'].copy()
                    PlayersData[player]['VISS'] = set()
                    PlayersData[player]['VISBUL'] = set()
                    PlayersData[player]['VISTOR'] = set()
                    PlayersData[player]['VISSMK'] = set()
                    PlayersData[player]['VISAAR'] = set()
                    PlayersData[player]['VISBMB'] = set()

                    PlayersData[player]['VISBRIDGES'] = set()
                    part = ''
                    for x in range(int(PlayersData[player]['X'] // 1) - VIEW_X-1, int(PlayersData[player]['X'] // 1) + VIEW_X+2):
                        for y in range(int(PlayersData[player]['Y'] // 1) - VIEW_Y-1, int(PlayersData[player]['Y'] // 1) + VIEW_Y+2):
                            try:
                                MAP['Q'][(x, y)]['PLAYERS'].discard(player)
                            except:pass
                    if PlayersInputs[player]['tbk']:
                        PlayersData[player]['STR'] += f'\nt'
                        for _ in PlayersData.keys():
                            PlayersData[player]['STR']+= f',{("["+str(PlayersData[_]["TEAM"])+"]")*int(not PlayersData[_]["TEAM"] is None)+_},{PlayersData[_]["SCORES"]}'
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
                    for x in range(int(PlayersData[player]['X'] // 1) - VIEW_X, int(PlayersData[player]['X'] // 1) + VIEW_X+1):
                        for y in range(int(PlayersData[player]['Y'] // 1) - VIEW_Y, int(PlayersData[player]['Y'] // 1) + VIEW_Y+1):
                            try:
                                for _ in MAP['Q'][(x, y)]['B']:
                                    PlayersData[player]['VISB'].add(_)
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
                                for _ in MAP['Q'][(x, y)]['BRIDGES']:
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
                    # print(PlayersData[player]['VISTOR'])
                    while len(PlayersData[player]['MSGTURN']) >0:
                                                        PlayersData[player]['STR'] +=PlayersData[player]['MSGTURN'][0]
                                                        PlayersData[player]['MSGTURN'].pop(0)
                                                        #print(PlayersData[player]['STR'])
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
                            if int(PlayersData[player]['COL'].intersection(Point(Smokes[_][0], Smokes[_][1]).buffer(Smokes[_][2])).area*1000)/1000 == int(PlayersData[player]['COL'].area*1000)/1000 and PlayersData[player]['INSMK'] == False and PlayersData[player]['Z'] ==0:
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
                        PlayersData[player]['STR'] += f'\np,{_},'+str(Smokes[_][0])+','+str(Smokes[_][1])
                    for _ in list(SmokesDisappeared):
                        PlayersData[player]['STR'] += f'\np,{_}'
                    # for _ in Zones.keys():
                    #     if abs(PlayersData[player]['X']-Zones[_][0]) < 5 and abs(PlayersData[player]['Y']-Zones[_][1]) < 4:
                    #         q = 0
                    #         if (Zones[_][2] == 'player' and Zones[_][3]==player)or(Zones[_][2] == 'team' and Zones[_][3]==PlayersData[player]['TEAM']): q =1
                    #         PlayersData[player]['STR'] += f'\n*,{_},'+str(int((Zones[_][0]-PlayersData[player]['X'])*320+PlayersInputs[player]['w']/2))+','+str(int((Zones[_][1]-PlayersData[player]['Y'])*320+PlayersInputs[player]['h']/2))+','+str(q)
                    if PlayersData[player]["STATUS"] == 'ALIVE' and vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['SPWEP']==2 and PlayersInputs[player]['spk'] and PlayersData[player]["BOMBS"]>0 and (datetime.datetime.now() - PlayersData[player]["LASTBOMB"]).total_seconds() > 0.5:
                        PlayersData[player]["BOMBS"]-=1
                        randDir = random.random()*2*math.pi
                        randDst = random.random()*0.1*PlayersData[player]["SPEED"]/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['MAXSPEED']
                        x = PlayersData[player]["X"] + 2*PlayersData[player]["SPEED"] * math.cos(PlayersData[player]["DIR"]/180*math.pi) + math.cos(randDir) * randDst
                        y = PlayersData[player]["Y"] + 2*PlayersData[player]["SPEED"] * math.sin(PlayersData[player]["DIR"]/180*math.pi) + math.sin(randDir) * randDst
                        # print("!!!")
                        Bombs[LastBombI] = [PlayersData[player]["X"],PlayersData[player]["Y"],x,y,time.time(),player,PlayersData[player]["DIR"],750,3,0.5,4]
                        LastBombI +=1
                        PlayersData[player]["LASTBOMB"] = datetime.datetime.now()
                    if PlayersData[player]["STATUS"] == 'ALIVE' and vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['SPWEP']==1 and PlayersInputs[player]['spk'] and PlayersData[player]["AAROCKETS"]>0 and (datetime.datetime.now() - PlayersData[player]["LASTAAROCKET"]).total_seconds() > 0.3:
                        PlayersData[player]["AAROCKETS"]-=1
                        AARockets[LastAARocketI] = [PlayersData[player]["X"],PlayersData[player]["Y"],0,0,time.time(),PlayersData[player]["DIR"]+round(random.random()*20-10),PlayersData[player]['SPEED'],player,None,40,3,0.5,1.25]
                        LastAARocketI +=1
                        PlayersData[player]["LASTAAROCKET"] = datetime.datetime.now()
                    if PlayersData[player]["STATUS"] == 'ALIVE' and vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['SPWEP']==0 and PlayersInputs[player]['spk'] and PlayersData[player]["TORPEDOS"]>0 and (datetime.datetime.now() - PlayersData[player]["LASTTORPEDO"]).seconds > 5:
                        PlayersData[player]["TORPEDOS"]-=1
                        Torpedos[LastTorpedoI] = [PlayersData[player]["X"],PlayersData[player]["Y"],0,0,0,PlayersData[player]["DIR"],0.225,player,None,500,3]
                        LastTorpedoI +=1
                        PlayersData[player]["LASTTORPEDO"] = datetime.datetime.now()
                    if PlayersData[player]["STATUS"] == 'ALIVE' and  PlayersInputs[player]['gk'] and PlayersData[player]["SMOKES"] > 0 and ( datetime.datetime.now() - PlayersData[player]["LASTSMOKE"]).seconds > 2:
                            PlayersData[player]["SMOKES"] -= 1
                            Smokes[LastSmokeI] = [PlayersData[player]["X"], PlayersData[player]["Y"], 0.2, datetime.datetime.now(),'s']
                            LastSmokeI += 1
                            PlayersData[player]["LASTSMOKE"] = datetime.datetime.now()

                        #print('ooo')
                    wasShot = False
                    for _ in PlayersData[player]['CAN']:
                        if PlayersData[player]['TAKEN']  and _[9] == PlayersInputs[player]['view']:continue
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
                        c = (math.cos((_[7]) / 180 * math.pi) * caninfo[_[0]][1]*320,
                             math.sin((_[7]) / 180 * math.pi) * caninfo[_[0]][1]*320)
                        _[5] = Point(a[0], a[1]).buffer(caninfo[_[0]][0])
                        j = LineString([[a[0], a[1]],[a[0]+math.cos((_[7]) / 180 * math.pi)*0.2, a[1]+math.sin((_[7]) / 180 * math.pi)*0.2]])
                        g = True
                        for i in PlayersData[player]['CAN']:
                            if not PlayersData[player]['CAN'].index(i) == PlayersData[player]['CAN'].index(_) and not i[5] is None:
                                if j.intersects(i[5]):
                                    if caninfo[i[0]][9] >=caninfo[_[0]][9]: g = False
                        h = False
                        if g and PlayersData[player]["STATUS"] == 'ALIVE' and PlayersInputs[player]['m0'] and PlayersData[player]['AMMO'][_[0]]>0 and (datetime.datetime.now()-_[4]).microseconds+(datetime.datetime.now()-_[4]).seconds*1000000>=caninfo[_[0]][4] and _[9] == PlayersInputs[player]['view']:
                                # print(vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['CAN'])
                            #if (PlayersInputs[player]['Xmod']==1 and (_[0] == 'p' or _[0] == 'h'or _[0] == 'f')) or PlayersInputs[player]['Xmod']==0:    ############### BETA
                                PlayersData[player]['AMMO'][_[0]]-=1
                                h = True
                                _[8] = 1
                                _[4]=datetime.datetime.now()
                                wasShot=True
                                Bullets[LastBulletI] = [PlayersData[player]["X"] + a[0],PlayersData[player]["Y"] + a[1],0,0,0,0,0,_[7]-caninfo[_[0]][7]+random.random()*caninfo[_[0]][7]*2,caninfo[_[0]][5],caninfo[_[0]][6],0.3,player,None,caninfo[_[0]][3],0,caninfo[_[0]][8]*(-1 + int(_[6])*2),'',PlayersInputs[player]['Xmod'],_[0],int(PlayersData[player]["ONGROUND"])]
                                LastBulletI +=1
                        if not  wasShot and PlayersData[player]["STATUS"] =="ALIVE":
                            _[8] = 0
                        if (PlayersData[player]["STATUS"] == "BURNING" or PlayersData[player]["STATUS"] == "DEAD") and 5*TPS != PlayersData[player]["BURNTIMER"]:
                            _[8] = 2
                        # if _[6]:
                        #     PlayersData[player]['STR'] += f'\no,{player+"0"*int(len(str(PlayersData[player]["CAN"].index(_)))==1)+str(PlayersData[player]["CAN"].index(_))},{int(PlayersInputs[player]["w"] / 2+math.ceil(a[0]*320))},{int(PlayersInputs[player]["h"] / 2+math.ceil(a[1]*320))},{caninfo[_[0]][0]*320}'+','+str(int(PlayersData[player]['STATUS']=='BURNING' or PlayersData[player]['STATUS']=='DEAD'  ))+','+str(int(PlayersData[player]['STATUS']=='BURNING' or PlayersData[player]['STATUS']=='DEAD'  ))  +','+str(int(PlayersData[player]['BURNTIMER']==1 or PlayersData[player]['BURNTIMER']==5*TPS  ))
                        #     PlayersData[player]['STR'] += f'\n|,{player+"0"*int(len(str(PlayersData[player]["CAN"].index(_)))==1)+str(PlayersData[player]["CAN"].index(_))},{int(PlayersInputs[player]["w"] / 2 + math.ceil(a[0] * 320))},{int(PlayersInputs[player]["h"] / 2 + math.ceil(a[1] * 320))},{int(PlayersInputs[player]["w"] / 2 + math.ceil(a[0] * 320)+int(c[0]))},{int(PlayersInputs[player]["h"] / 2 + math.ceil(a[1] * 320)+int(c[1]))},{caninfo[_[0]][2]*320}'+','+str(int(PlayersData[player]['STATUS']=='BURNING' or PlayersData[player]['STATUS']=='DEAD'  ))+','+str(_[0]*int(h)+'0'*int(not h))
                    if wasShot or not PlayersData[player]['AMMOUPDATE'] :
                        PlayersData[player]['AMMOUPDATE'] = True
                        PlayersData[player]['STR'] += f'\na,{PlayersData[player]["AMMO"]["m"]},{PlayersData[player]["AMMO"]["t"]},{PlayersData[player]["AMMO"]["h"]},{PlayersData[player]["AMMO"]["p"]+PlayersData[player]["AMMO"]["f"]}'
                    try:
                        for z in range(0,2):
                            for enemy in list(MAP['Q'][(int(PlayersData[player]['X']//1),int(PlayersData[player]['Y']//1))]['PLAYERS']):
                                if not enemy in PlayersData: continue
                                if PlayersData[enemy]['INSMK']: continue
                                if  player == enemy   or PlayersData[enemy]['TAKEN'] or  PlayersData[enemy]['Z'] != z:continue
                                # _0 = posScr(PlayersData[enemy]['COL'],PlayersData[player]['X'],PlayersData[player]['Y'],320,PlayersInputs[player]["w"],PlayersInputs[player]["h"]).exterior.coords
                                # PlayersData[player]['STR'] += f'\nf,{enemy}'
                                # for c in _0:
                                #     PlayersData[player]['STR'] += f',{int(c[0])},{int(c[1])}'
                                # PlayersData[player]['STR'] += ','+str(int(not(PlayersData[enemy]['STATUS']=='BURNING' or PlayersData[enemy]['STATUS']=='DEAD'  ) and PlayersInputs[player]['Xmod']==PlayersData[enemy]['Z'])*PlayersCosmetics[enemy]['COLOR']+int(PlayersInputs[player]['Xmod']!=PlayersData[enemy]['Z'])*229)+',' +str((PlayersData[enemy]['Z'])*2+int(PlayersData[enemy]['ONGROUND'] and PlayersData[enemy]['Z']==0))
                                #
                                if PlayersCosmetics[enemy]['VEHICLE'] == 0:
                                    PlayersData[player]['STR'] += f'\n+,{("["+str(PlayersData[enemy]["TEAM"])+"]")*int(not PlayersData[enemy]["TEAM"] is None)+enemy},{PlayersCosmetics[enemy]["VEHICLE"]},{str(int(PlayersData[enemy]["DIR"]))},{PlayersData[enemy]["HP"]},{int(PlayersData[enemy]["X"] * 1000) / 1000},{int(PlayersData[enemy]["Y"] * 1000) / 1000},{PlayersData[enemy]["Z"] * 2 + int(PlayersData[enemy]["ONGROUND"])},' + f'{PlayersData[enemy]["CAN"][0][8]}{PlayersData[enemy]["CAN"][0][7]},{PlayersData[enemy]["CAN"][1][8]}{PlayersData[enemy]["CAN"][1][7]},' + str(int(not (PlayersData[enemy]['STATUS'] == 'BURNING' or PlayersData[enemy]['STATUS'] == 'DEAD')) * PlayersCosmetics[enemy]['COLOR'])
                                elif PlayersCosmetics[enemy]['VEHICLE'] == 1:
                                    PlayersData[player][
                                        'STR'] += f'\n+,{("["+str(PlayersData[enemy]["TEAM"])+"]")*int(not PlayersData[enemy]["TEAM"] is None)+enemy},{PlayersCosmetics[enemy]["VEHICLE"]},{str(int(PlayersData[enemy]["DIR"]))},{PlayersData[enemy]["HP"]},{int(PlayersData[enemy]["X"] * 1000) / 1000},{int(PlayersData[enemy]["Y"] * 1000) / 1000},{PlayersData[enemy]["Z"] * 2 + int(PlayersData[enemy]["ONGROUND"])},{PlayersData[enemy]["CAN"][0][8]}{PlayersData[enemy]["CAN"][0][7]},' + str(
                                        int(not (PlayersData[enemy]['STATUS'] == 'BURNING' or PlayersData[enemy][
                                            'STATUS'] == 'DEAD')) * PlayersCosmetics[enemy]['COLOR'])
                                elif PlayersCosmetics[enemy]['VEHICLE'] == 2:
                                    PlayersData[player][
                                        'STR'] += f'\n+,{("["+str(PlayersData[enemy]["TEAM"])+"]")*int(not PlayersData[enemy]["TEAM"] is None)+enemy},{PlayersCosmetics[enemy]["VEHICLE"]},{str(int(PlayersData[enemy]["DIR"]))},{PlayersData[enemy]["HP"]},{int(PlayersData[enemy]["X"] * 1000) / 1000},{int(PlayersData[enemy]["Y"] * 1000) / 1000},{PlayersData[enemy]["Z"] * 2 + int(PlayersData[enemy]["ONGROUND"])},{PlayersData[enemy]["CAN"][0][8]}{PlayersData[enemy]["CAN"][0][7]},' + str(
                                        int(not (PlayersData[enemy]['STATUS'] == 'BURNING' or PlayersData[enemy][
                                            'STATUS'] == 'DEAD')) * PlayersCosmetics[enemy]['COLOR'])
                                elif PlayersCosmetics[enemy]['VEHICLE'] == 4:
                                    PlayersData[player]['STR'] += f'\n+,{("["+str(PlayersData[enemy]["TEAM"])+"]")*int(not PlayersData[enemy]["TEAM"] is None)+enemy},{PlayersCosmetics[enemy]["VEHICLE"]},{str(int(PlayersData[enemy]["DIR"]))},{PlayersData[enemy]["HP"]},{int(PlayersData[enemy]["X"] * 1000) / 1000},{int(PlayersData[enemy]["Y"] * 1000) / 1000},{PlayersData[enemy]["Z"] * 2 + int(PlayersData[enemy]["ONGROUND"])},' + f'{PlayersData[enemy]["CAN"][0][8]}{PlayersData[enemy]["CAN"][0][7]},{PlayersData[enemy]["CAN"][1][8]}{PlayersData[enemy]["CAN"][1][7]},' + str(int(not (PlayersData[enemy]['STATUS'] == 'BURNING' or PlayersData[enemy]['STATUS'] == 'DEAD')) * PlayersCosmetics[enemy]['COLOR']) + "," +str(len( PlayersData[enemy]['CARRY']))
                                elif PlayersCosmetics[enemy]["VEHICLE"] == 8:
                                    PlayersData[player]['STR'] +=   f'\n+,{("["+str(PlayersData[enemy]["TEAM"])+"]")*int(not PlayersData[enemy]["TEAM"] is None)+enemy},{PlayersCosmetics[enemy]["VEHICLE"]},{str(int(PlayersData[enemy]["DIR"]))},{PlayersData[enemy]["HP"]},{int(PlayersData[enemy]["X"] * 1000) / 1000},{int(PlayersData[enemy]["Y"] * 1000) / 1000},{PlayersData[enemy]["Z"] * 2 + int(PlayersData[enemy]["ONGROUND"])}' +  f',{PlayersData[enemy]["CAN"][0][8]},' + str(int(not (PlayersData[enemy]['STATUS'] == 'BURNING' or PlayersData[enemy]['STATUS'] == 'DEAD')) * PlayersCosmetics[enemy]['COLOR']) + ','+str(int(PlayersInputs[enemy]['Cmod'])*PlayersCosmetics[enemy]['TRACER'])
                                elif PlayersCosmetics[enemy]["VEHICLE"] == 5:
                                    PlayersData[player]['STR'] +=   f'\n+,{("["+str(PlayersData[enemy]["TEAM"])+"]")*int(not PlayersData[enemy]["TEAM"] is None)+enemy},{PlayersCosmetics[enemy]["VEHICLE"]},{str(int(PlayersData[enemy]["DIR"]))},{PlayersData[enemy]["HP"]},{int(PlayersData[enemy]["X"] * 1000) / 1000},{int(PlayersData[enemy]["Y"] * 1000) / 1000},{PlayersData[enemy]["Z"] * 2 + int(PlayersData[enemy]["ONGROUND"])}' +  f',{PlayersData[enemy]["CAN"][0][8]},' + str(int(not (PlayersData[enemy]['STATUS'] == 'BURNING' or PlayersData[enemy]['STATUS'] == 'DEAD')) * PlayersCosmetics[enemy]['COLOR']) + ','+str(int(PlayersInputs[enemy]['Cmod'])*PlayersCosmetics[enemy]['TRACER'])+ f',{PlayersData[enemy]["CAN"][0][8]}{PlayersData[enemy]["CAN"][0][7]}'
                                elif PlayersCosmetics[enemy]['VEHICLE'] == 3:
                                    PlayersData[player]['STR'] += f'\n+,{("["+str(PlayersData[enemy]["TEAM"])+"]")*int(not PlayersData[enemy]["TEAM"] is None)+enemy},{PlayersCosmetics[enemy]["VEHICLE"]},{str(int(PlayersData[enemy]["DIR"]))},{PlayersData[enemy]["HP"]},{int(PlayersData[enemy]["X"] * 1000) / 1000},{int(PlayersData[enemy]["Y"] * 1000) / 1000},{PlayersData[enemy]["Z"] * 2 + int(PlayersData[enemy]["ONGROUND"])},' + f'{PlayersData[enemy]["CAN"][0][8]}{PlayersData[enemy]["CAN"][0][7]},{PlayersData[enemy]["CAN"][1][8]}{PlayersData[enemy]["CAN"][1][7]},' + str(int(not (PlayersData[enemy]['STATUS'] == 'BURNING' or PlayersData[enemy]['STATUS'] == 'DEAD')) * PlayersCosmetics[enemy]['COLOR']) + "," +str(len( PlayersData[enemy]['CARRY']))
                                # if PlayersInputs[player]['Xmod']==PlayersData[enemy]['Z']:
                                #     for _ in PlayersData[enemy]['CAN']:
                                #         h = False
                                #         if PlayersData[enemy]["STATUS"] == 'ALIVE' and PlayersInputs[enemy]['m0'] and _[
                                #             3] > 0 and (datetime.datetime.now() - _[4]).microseconds + (
                                #                 datetime.datetime.now() - _[4]).seconds * 1000000 >= caninfo[_[0]][4]:
                                #             h = True
                                #         d = math.sqrt(_[1] ** 2 + _[2] ** 2)
                                #         deg = lookat(_[1], _[2])
                                #         a = (math.cos((deg + PlayersData[enemy]['DIR']) / 180 * math.pi) * d,
                                #              math.sin((deg + PlayersData[enemy]['DIR']) / 180 * math.pi) * d)
                                #         if _[6]:
                                #             PlayersData[player]['STR'] += f'\no,{enemy+"0"*int(len(str(PlayersData[enemy]["CAN"].index(_)))==1)+str(PlayersData[enemy]["CAN"].index(_))},{int(PlayersInputs[player]["w"] / 2 + math.ceil(a[0] * 320))+int((PlayersData[enemy]["X"]-PlayersData[player]["X"])*320)},{int(PlayersInputs[player]["h"] / 2 + math.ceil(a[1] * 320))+int((PlayersData[enemy]["Y"]-PlayersData[player]["Y"])*320)},{caninfo[_[0]][0]*320}'','+str(int(PlayersData[enemy]['STATUS']=='BURNING' or PlayersData[enemy]['STATUS']=='DEAD'  ))+','+str(int(PlayersData[enemy]['STATUS']=='BURNING' or PlayersData[enemy]['STATUS']=='DEAD'  ))+','+str(int(PlayersData[enemy]['BURNTIMER']==1 or PlayersData[enemy]['BURNTIMER']==5*TPS  ))
                                #         if _[0] == 'f':
                                #                 b = PlayersData[enemy]['DIR']
                                #         else:
                                #             b = lookat(PlayersInputs[enemy]['x'] - int(PlayersInputs[player]['w'] / 2 + math.ceil(a[0] * 320)),
                                #                        PlayersInputs[enemy]['y'] - int(PlayersInputs[player]['h'] / 2 + math.ceil(a[1] * 320)))
                                #
                                #         c = (math.cos((b) / 180 * math.pi) * caninfo[_[0]][1]*320,
                                #              math.sin((b) / 180 * math.pi) * caninfo[_[0]][1]*320)
                                #         if _[6]:
                                #             PlayersData[player]['STR'] += f'\n|,{enemy+"0"*int(len(str(PlayersData[enemy]["CAN"].index(_)))==1)+str(PlayersData[enemy]["CAN"].index(_))},{int(PlayersInputs[player]["w"] / 2 + math.ceil(a[0] * 320 ))+int((PlayersData[enemy]["X"]-PlayersData[player]["X"])*320)},{int(PlayersInputs[player]["h"] / 2 + math.ceil(a[1] * 320 ))+int((PlayersData[enemy]["Y"]-PlayersData[player]["Y"])*320)},{int(PlayersInputs[player]["w"] / 2 + math.ceil(a[0] * 320 ) + int(c[0]))+int((PlayersData[enemy]["X"]-PlayersData[player]["X"])*320)},{int(PlayersInputs[player]["h"] / 2 + math.ceil(a[1] * 320 ) + int(c[1]))+int((PlayersData[enemy]["Y"]-PlayersData[player]["Y"])*320)},{caninfo[_[0]][2]*320}'+','+str(int(PlayersData[enemy]['STATUS']=='BURNING' or PlayersData[enemy]['STATUS']=='DEAD'  ))+','+str(_[0]*h)+'0'*int(not h)
                                # PlayersData[player]['STR'] += f'\nn,{enemy},{int(PlayersInputs[player]["w"] / 2)+int((PlayersData[enemy]["X"]-PlayersData[player]["X"])*320)},{int(PlayersInputs[player]["h"] / 2)+int((PlayersData[enemy]["Y"]-PlayersData[player]["Y"])*320)},{int(not PlayersData[player]["TEAM"] is None and enemy in Teams[PlayersData[player]["TEAM"]])+int(not PlayersData[player]["TEAM"] is None and enemy == TeamsOwners[PlayersData[player]["TEAM"]])},{int(PlayersData[enemy]["HP"]/PlayersData[enemy]["HPMAX"]*100)/100},{int(PlayersInputs[player]["Xmod"]==PlayersData[enemy]["Z"])}' + f',{PlayersData[enemy]["TEAM"]}' * int(not PlayersData[enemy]["TEAM"] is None)
                            # if not PlayersData[player]['TAKEN'] and z == PlayersData[player]['Z']:
                            #     _0 = posScr(PlayersData[player]['COL'], PlayersData[player]['X'],PlayersData[player]['Y'], 320,PlayersInputs[player]["w"], PlayersInputs[player]["h"]).exterior.coords
                            #     PlayersData[player]['STR'] += f'\nf,{player}'
                            #     for c in _0:
                            #         PlayersData[player]['STR'] += f',{int(c[0])},{int(c[1])}'
                            #     PlayersData[player]['STR'] += ',' + str(int(not (PlayersData[player]['STATUS'] == 'BURNING' or PlayersData[player]['STATUS'] == 'DEAD')) * PlayersCosmetics[player]['COLOR'])+',' +str(PlayersData[player]['Z']*2+int(PlayersData[enemy]['ONGROUND'] and PlayersData[enemy]['Z']==0))
                    except Exception:
                        pass
                        # logging.exception("message")
                    # delarr = []
                    # for _ in PlayersData[player]['VISBUL']:
                    #     try:
                    #         PlayersData[player]['STR'] += f'\n>,{_},{int(PlayersInputs[player]["w"] / 2 + (Bullets[_][0]-PlayersData[player]["X"]+Bullets[_][4])*320)},{int(PlayersInputs[player]["h"] / 2 + (Bullets[_][1]-PlayersData[player]["Y"]+Bullets[_][5])*320)},{int(PlayersInputs[player]["w"] / 2 + (Bullets[_][0]-PlayersData[player]["X"]+Bullets[_][2])*320)},{int(PlayersInputs[player]["h"] / 2 + (Bullets[_][1]-PlayersData[player]["Y"]+Bullets[_][3])*320)},{Bullets[_][15]},{Bullets[_][14]+int(Bullets[_][16]==player)*2}'
                    #     except KeyError:
                    #         delarr.append(_)
                    #
                    # for _ in delarr:
                    #     PlayersData[player]['VISBUL'].remove(_)
                    # delarr=[]
                    # 'm': [12 / 320, 18 / 320, 6 / 320, 50, 1000000 * 3, 0.75, 6, 2, 4, 3, 0.1],  # last - DEGDMGCOF
                    # Bullets[LastBulletI] = [PlayersData[player]["X"] + a[0], PlayersData[player]["Y"] + a[1], 0, 0, 0, 0, 0, b - caninfo[_[0]][7] + random.random() * caninfo[_[0]][7] * 2, caninfo[_[0]][5], caninfo[_[0]][6], 0.3, player, None, caninfo[_[0]][3], 0, caninfo[_[0]][8] * (-1 + int(_[6]) * 2), '', PlayersInputs[player]['Xmod'],_[0], int(PlayersData[player]["ONGROUND"])]
                    # Bullets[bullet][6]+= Bullets[bullet][8]/TPS
                    # Bullets[bullet][2] = math.cos(Bullets[bullet][7]/180*math.pi)*Bullets[bullet][6]
                    # Bullets[bullet][3] = math.sin(Bullets[bullet][7]/180*math.pi)*(Bullets[bullet][6])
                    # Bullets[bullet][4] = math.cos(Bullets[bullet][7]/180*math.pi)*(Bullets[bullet][6]-Bullets[bullet][10])*int(Bullets[bullet][6]-Bullets[bullet][10]>0)
                    # Bullets[bullet][5] = math.sin(Bullets[bullet][7]/180*math.pi)*(Bullets[bullet][6]-Bullets[bullet][10])*int(Bullets[bullet][6]-Bullets[bullet][10]>0)

                    #{Bullets[_][14]+int(Bullets[_][16]==player)*2}
                    for _ in BulletsAppeared:
                        # print('<')
                        try:
                            PlayersData[player]['STR'] += f'\n>,{_},{(Bullets[_][0])},{Bullets[_][1]},{Bullets[_][7]},{Bullets[_][14]+int(Bullets[_][16]==player)*2},{Bullets[_][17]},{Bullets[_][8]},{Bullets[_][15]}'
                        except KeyError:
                            pass
                    # print(PlayersData[player]['VISTOR'])
                    for _ in BulletsHandler:
                        if _ in PlayersData[player]['VISBUL']:
                            # print(BulletsHandler)

                            PlayersData[player]['STR'] += f'\n>,{_},{BulletsHandler[_][14]+int(BulletsHandler[_][16]==player)*2}'
                    # Torpedos[LastTorpedoI] = [PlayersData[player]["X"], PlayersData[player]["Y"], 0, 0, 0, PlayersData[player]["DIR"], 0.225, player, None, 500, 3]
                    for _ in TorpedosAppeared:
                        # print('<')
                        try:
                            PlayersData[player]['STR'] += f'\n<,{_},{(Torpedos[_][0])},{Torpedos[_][1]},{Torpedos[_][5]},{Torpedos[_][10]},{Torpedos[_][6]}'
                        except KeyError:
                            pass
                    # print(PlayersData[player]['VISTOR'])
                    for _ in TorpedosHandler:
                        if _ in PlayersData[player]['VISTOR']:
                            print('>')

                            PlayersData[player]['STR'] += f'\n<,{_},{TorpedosHandler[_][10]}'
                    for _ in AARocketsAppeared:
                        # print('<')
                        try:
                            PlayersData[player]['STR'] += f'\nr,{_},{(AARockets[_][0])},{AARockets[_][1]},{AARockets[_][5]},{AARockets[_][10]},{AARockets[_][6]},{AARockets[_][11]}'
                        except KeyError:
                            pass
                    # print(PlayersData[player]['VISTOR'])
                    for _ in AARocketsHandler:
                        if _ in PlayersData[player]['VISAAR']:
                            print('>')

                            PlayersData[player]['STR'] += f'\nr,{_},{AARocketsHandler[_][10]}'
                    for _ in BombsAppeared:
                        # print('<')
                        try:
                            PlayersData[player]['STR'] += f'\nb,{_},{(Bombs[_][0])},{Bombs[_][1]},{Bombs[_][2]},{Bombs[_][3]},{Bombs[_][8]},{Bombs[_][10]},{Bombs[_][6]}'
                        except KeyError:
                            pass
                    # print(PlayersData[player]['VISTOR'])
                    for _ in BombsHandler:
                        if _ in PlayersData[player]['VISBMB']:
                            print(f'\nb,{_},{BombsHandler[_][8]}')

                            PlayersData[player]['STR'] += f'\nb,{_},{BombsHandler[_][8]}'

            BombsHandlerKeys = list(BombsHandler.keys())
            for bomb in BombsHandlerKeys:

                for x in range(int(BombsHandler[bomb][2]) - 1,int(BombsHandler[bomb][2]) + 1):
                    for y in range(int(BombsHandler[bomb][3]) - 1,int(BombsHandler[bomb][3]) + 1):
                        try:
                            MAP['Q'][(x, y)]['BOMBS'].discard(bomb)
                        except:
                            pass
                BombsHandler.pop(bomb)
            AARocketsHandlerKeys = list(AARocketsHandler.keys())
            for aarocket in AARocketsHandlerKeys:

                for x in range(int((AARocketsHandler[aarocket][2] + AARocketsHandler[aarocket][0]) // 1) - 1,
                               int((AARocketsHandler[aarocket][2] + AARocketsHandler[aarocket][0]) // 1) + 1):
                    for y in range(int((AARocketsHandler[aarocket][3] + AARocketsHandler[aarocket][1]) // 1) - 1,
                                   int((AARocketsHandler[aarocket][3] + AARocketsHandler[aarocket][1]) // 1) + 1):
                        try:
                            MAP['Q'][(x, y)]['AAROCKETS'].discard(aarocket)
                        except:
                            pass
                AARocketsHandler.pop(aarocket)
            TorpedosHandlerKeys = list(TorpedosHandler.keys())
            for torpedo in TorpedosHandlerKeys:

                for x in range(int((TorpedosHandler[torpedo][2] + TorpedosHandler[torpedo][0]) // 1) - 1,
                               int((TorpedosHandler[torpedo][2] + TorpedosHandler[torpedo][0]) // 1) + 1):
                    for y in range(int((TorpedosHandler[torpedo][3] + TorpedosHandler[torpedo][1]) // 1) - 1,
                                   int((TorpedosHandler[torpedo][3] + TorpedosHandler[torpedo][1]) // 1) + 1):
                        try:
                            MAP['Q'][(x, y)]['TORPEDOS'].discard(torpedo)
                        except:
                            pass
                TorpedosHandler.pop(torpedo)
            BulletsHandlerKeys = list(BulletsHandler.keys())
            for bullet in BulletsHandlerKeys:

                for x in range(int((BulletsHandler[bullet][2] + BulletsHandler[bullet][0]) // 1) - 1,
                               int((BulletsHandler[bullet][2] + BulletsHandler[bullet][0]) // 1) + 1):
                    for y in range(int((BulletsHandler[bullet][3] + BulletsHandler[bullet][1]) // 1) - 1,
                                   int((BulletsHandler[bullet][3] + BulletsHandler[bullet][1]) // 1) + 1):
                        try:
                            MAP['Q'][(x, y)]['BULLETS'].discard(bullet)
                        except:
                            pass
                        # print("GOOD")
                BulletsHandler.pop(bullet)
            for player in PlayersData.keys():
                try:
                    if PlayersData[player]['STATUS'] == 'BURNING':

                        if PlayersData[player]['BURNTIMER']==5*TPS or PlayersData[player]['BURNTIMER']==5*TPS+1:
                                                    try:
                                                        PlayersData[PlayersData[player]["KILLER"]]['KILLS'] +=1
                                                        # PlayersData[Bullets[bullet][11]]['SCORES'] += 1 + PlayersData[Bullets[bullet][11]]['KSR']
                                                        if not PlayersAccs[PlayersData[player]["KILLER"]]['NICK'] == '':
                                                                PlayersAccs[PlayersData[player]["KILLER"]]['money'] += \
                                                                PlayersData[PlayersData[player]["KILLER"]]['KSR'] * 10
                                                                # SQLctx.execute(
                                                                #     f"""UPDATE Account set money = money+{PlayersData[PlayersData[player]["KILLER"]]['KSR'] * 10} WHERE nickname = '{PlayersAccs[PlayersData[player]["KILLER"]]['NICK']}' AND password = '{PlayersAccs[PlayersData[player]["KILLER"]]['PSW']}'""")
                                                                # SQL.commit()
                                                                PlayersData[PlayersData[player]["KILLER"]]['MSGTURN'].append(
                                                                    f'\nl,You received {PlayersData[PlayersData[player]["KILLER"]]["KSR"] * 10} goldshell{"s" * int(PlayersData[PlayersData[player]["KILLER"]]["KSR"] > 0)} !,{LastMSGI}')
                                                                LastMSGI += 1
                                                        PlayersData[PlayersData[player]["KILLER"]]['KSR'] += 1
                                                    except:pass
                                                    print(PlayersData[player]["KILLER"])
                                                    for _ in PlayersData.keys():
                                                        PlayersData[_]['STR'] += f'\nk,{PlayersData[player]["KILLER"]},{player},{LastMSGI}'
                                                    LastMSGI += 1
                        PlayersData[player]['BURNTIMER'] -=1
                        if PlayersData[player]['BURNTIMER'] <=0 or PlayersData[player]['BURNTIMER']==5*TPS:
                            PlayersData[player]['STATUS'] = 'DEAD'
#                            Bodies[player]={
#                            'X':PlayersData[player]['X'],
#                            'Y':PlayersData[player]['Y'],
#                            'COL':PlayersData[player]['COL'],
#                            'CAN':PlayersData[player]['CAN'],
#                            }
                    if PlayersData[player]['STATUS'] == 'AFK': KickList.append(player)
                except Exception:
                    pass
                    # logging.exception("message")

            for _ in KickList:
                try:
                    for x in range(int(PlayersData[_]['X'] // 1) - VIEW_X-1, int(PlayersData[_]['X'] // 1) + VIEW_X+2):
                        for y in range(int(PlayersData[_]['Y'] // 1) - VIEW_Y-1, int(PlayersData[_]['Y'] // 1) + VIEW_Y+2):
                            try:
                                MAP['Q'][(x, y)]['PLAYERS'].discard(_)
                            except:pass
                except:pass
                try:
                    if not PlayersData[_]['TEAM'] is None:
                        if TeamsOwners[PlayersData[_]['TEAM']] == _:
                            if len(Teams[PlayersData[_]['TEAM']]) == 1:
                                Teams.pop(PlayersData[_]['TEAM'])
                                TeamsOwners.pop(PlayersData[_]['TEAM'])
                                PlayersData[_]['TEAM'] = None
                                # TeamRec.pop(_)
                            else:
                                Teams[PlayersData[_]['TEAM']].pop(0)
                                TeamsOwners[PlayersData[_]['TEAM']] = Teams[PlayersData[_]['TEAM']][0]
                                PlayersData[_]['TEAM'] = None
                                # TeamRec.pop(_)
                        else:
                            Teams[PlayersData[_]['TEAM']].remove(_)
                            PlayersData[_]['TEAM'] = None
                            # TeamRec.pop(_)
                except:pass

                try:
                    PlayersInputs.pop(_)
                except:pass
                # print(PlayersData[_]['SCORES'])
                print(PlayersAccs[_]["NICK"])
                if PlayersAccs[_]["NICK"] != "":



                    print('????')
                    nickname = PlayersAccs[_]['NICK']
                    password = PlayersAccs[_]['PSW']
                    xp = PlayersData[_]['SCORES']
                    kills = PlayersData[_]['KILLS']
                    delta = round((datetime.datetime.now() - PlayersData[_]['STARTTIME']).total_seconds())
                    money = PlayersAccs[_]["money"]
                    logger.info("change_player_data: " + str({"key": API_KEY, 'nickname': nickname, 'password': password, 'xp': xp, 'kills': kills,
                                 'delta': delta, 'money': money}))
                    async def change_player_data():
                        await requests.post(API_SERV_ADDRESS + "change_player_data",{"key": API_KEY, 'nickname': nickname, 'password': password, 'xp': xp, 'kills': kills,'delta': delta, 'money': money})
                    asyncio.create_task(change_player_data())
                    #TODO !!!!
                try:

                    PlayersData.pop(_)
                except:
                    pass
                PlayersSockets.pop(_)
                PlayersCosmetics.pop(_)
                PlayersAccs.pop(_)

        except Exception:
            # pass
            logging.exception("message")

@logger.catch()
async def handler(websocket):
    logger.info("Connection")
    global LastMSGI,PlayersData
    Exit = False
    # print('!')
    while not Exit:
        try:
            message = await websocket.recv()
        except:
            for player in PlayersSockets.keys():
                    if PlayersSockets[player] == websocket:
                        PlayersData[player]['STATUS'] = 'AFK'
            logger.info("Set AFK status")
            Exit = True
            continue
        # print(message)
        if message == os.environ['KILL_CODE']: exit()
        if message == '':
            #TODO can be leak :/
            logger.info("Empty message from client")
            Exit = True
        elif message[0] == '0' or message[0] == '1':
            for player in PlayersSockets.keys():
                if PlayersSockets[player] == websocket:
                    try:
                        if player in PlayersData :
                            PlayersInputs[player] = {
                            'm0':bool(int(message[0])),
                                'wk':bool(int(message[1])),
                                'ak':bool(int(message[2])),
                                'sk':bool(int(message[3])),
                                'dk':bool(int(message[4])),
                                'spk': bool(int(message[5])),
                                'gk': bool(int(message[6])),
                                'tbk': bool(int(message[7])),
                                'Cmod': bool(int(message[8])),
                                'Xmod': int(message[9]),
                                'view': int(message[10]),
                                'x':float(message[11:].split(',')[0]),
                                'y':float(message[11:].split(',')[1]),
                                'last':datetime.datetime.now()

                            }
                            if player in PlayersData:
                                for _ in message[11:].split(',')[2:]:
                                    if len(_) < 2: continue
                                    elif _[0] == 'm':

                                        if _[1:].replace(' ', '') != '':
                                            while _.find('  ') != -1:
                                                _ = _.replace('  ', ' ')
                                            if _[1] == '/':
                                                if _[1:].lower().find('/team') == 0:
                                                    # print(_[1:].lower())
                                                    if len(_[1:].lower().split(' ')) > 1:
                                                        # print(_[1:].lower())
                                                        if _[1:].lower().split(' ')[1] == 'create' and len(_[1:].lower().split(' ')) >2 and not _[1:].lower().split(' ')[2].replace(' ','').replace(',','').replace(']','').replace('[','') =="" :

                                                                try:
                                                                    if not _[1:].split(' ')[2].replace(' ','').replace(',','').replace(']','').replace('[','') in Teams.keys():
                                                                        if PlayersData[player]['TEAM'] is None:
                                                                            Teams[_[1:].split(' ')[2].replace(' ','').replace(',','').replace(']','').replace('[','')] = [player]
                                                                            TeamsOwners[_[1:].split(' ')[2].replace(' ','').replace(',','').replace(']','').replace('[','')] = player
                                                                            PlayersData[player]['TEAM'] = _[1:].split(' ')[2].replace(' ','').replace(',','').replace(']','').replace('[','')
                                                                            PlayersData[player]['MSGTURN'].append(
                                                                                f"\nc,{LastMSGI},4," + _[1:].split(' ')[2].replace(' ','').replace(',','').replace(']','').replace('[',''))
                                                                            LastMSGI += 1
                                                                            TeamRec[player] = [
                                                                                _[1:].split(' ')[2].replace(' ','').replace(',','').replace(']','').replace('[',''),
                                                                                datetime.datetime.now()]
                                                                        else:
                                                                            PlayersData[player]['MSGTURN'].append(
                                                                                f"\nc,{LastMSGI},2")
                                                                            LastMSGI += 1
                                                                    else:
                                                                        PlayersData[player]['MSGTURN'].append(
                                                                            f"\nc,{LastMSGI},3," + _[1:].split(' ')[2].replace(' ','').replace(',','').replace(']','').replace('[',''))
                                                                        LastMSGI += 1
                                                                except:
                                                                    pass
                                                                    # logging.exception("message")

                                                            # print(Teams)
                                                            # print(TeamsOwners)
                                                        elif _[1:].lower().split(' ')[1] == 'leave':
                                                            if not PlayersData[player]['TEAM'] is None:
                                                                PlayersData[player]['MSGTURN'].append(f"\nc,{LastMSGI},b")
                                                                LastMSGI += 1
                                                                if TeamsOwners[PlayersData[player]['TEAM']] == player:
                                                                    if len(Teams[PlayersData[player]['TEAM']]) == 1:
                                                                        Teams.pop(PlayersData[player]['TEAM'])
                                                                        TeamsOwners.pop(PlayersData[player]['TEAM'])
                                                                        PlayersData[player]['TEAM'] = None
                                                                        TeamRec.pop(player)
                                                                    else:
                                                                        Teams[PlayersData[player]['TEAM']].pop(0)
                                                                        TeamsOwners[PlayersData[player]['TEAM']] = Teams[PlayersData[player]['TEAM']][0]
                                                                        PlayersData[player]['TEAM'] = None
                                                                        TeamRec.pop(player)
                                                                else:
                                                                    Teams[PlayersData[player]['TEAM']].remove(player)
                                                                    PlayersData[player]['TEAM'] = None
                                                                    TeamRec.pop(player)
                                                            else:
                                                                PlayersData[player]['MSGTURN'].append(
                                                                    f"\nc,{LastMSGI},5")
                                                                LastMSGI += 1
                                                        elif _[1:].lower().split(' ')[1] == 'join':
                                                            if PlayersData[player]['TEAM'] is None:
                                                                try:
                                                                    PlayersData[TeamsOwners[_[1:].split(' ')[2]]]['MSGTURN'].append(f'\nj,{player},{LastMSGI}')
                                                                    LastMSGI+=1
                                                                    PlayersData[player]['TEAMREQ'].append(_[1:].split(' ')[2])
                                                                    PlayersData[player]['MSGTURN'].append(
                                                                        f"\nc,{LastMSGI},0,"+_[1:].split(' ')[2])
                                                                    LastMSGI += 1
                                                                    # PlayersData[player]['TEAM'] = _[1:].split(' ')[2]
                                                                except:
                                                                    PlayersData[player]['MSGTURN'].append(
                                                                        f"\nc,{LastMSGI},1")
                                                                    LastMSGI += 1
                                                            else:
                                                                PlayersData[player]['MSGTURN'].append(f"\nc,{LastMSGI},2")
                                                                LastMSGI += 1
                                                            # print(Teams)
                                                            # print(TeamsOwners)
                                                        elif _[1:].lower().split(' ')[1] == 'accept':
                                                            if TeamsOwners[PlayersData[player]['TEAM']] == player:
                                                                try:
                                                                    if PlayersData[player]['TEAM'] in PlayersData[_[1:].split(' ')[2]]['TEAMREQ']:
                                                                        PlayersData[_[1:].split(' ')[2]]['TEAM'] = PlayersData[player]['TEAM']
                                                                        TeamRec[_[1:].split(' ')[2]] = [PlayersData[player]['TEAM'],datetime.datetime.now()]
                                                                        PlayersData[_[1:].split(' ')[2]]['TEAMREQ'] = []
                                                                        Teams[PlayersData[player]['TEAM']].append(_[1:].split(' ')[2])
                                                                        for p in Teams[PlayersData[player]['TEAM']]:
                                                                            PlayersData[p]['MSGTURN'].append(
                                                                                f"\nc,{LastMSGI},9,"+_[1:].split(' ')[2])
                                                                        LastMSGI += 1
                                                                except:pass
                                                        elif _[1:].lower().split(' ')[1] == 'kick':
                                                            if TeamsOwners[PlayersData[player]['TEAM']] == player:
                                                                try:
                                                                    if _[1:].split(' ')[2] != player:
                                                                        Teams[PlayersData[player]['TEAM']].remove(_[1:].split(' ')[2])
                                                                        PlayersData[_[1:].split(' ')[2]]['TEAM'] = None
                                                                        for p in Teams[PlayersData[player]['TEAM']]:
                                                                            PlayersData[p]['MSGTURN'].append(
                                                                                f"\nc,{LastMSGI},8,"+_[1:].split(' ')[2])
                                                                        LastMSGI += 1
                                                                    else:
                                                                        PlayersData[player]['MSGTURN'].append(
                                                                            f"\nc,{LastMSGI},7")
                                                                        LastMSGI += 1
                                                                except:pass
                                                            else:
                                                                PlayersData[player]['MSGTURN'].append(
                                                                    f"\nc,{LastMSGI},6")
                                                                LastMSGI += 1
                                                        elif _[1:].lower().split(' ')[1] == 'list':

                                                                # print('lol')

                                                                    if PlayersData[player]['TEAM'] is None:
                                                                        PlayersData[player]['MSGTURN'].append(
                                                                            f"\nc,{LastMSGI},a")
                                                                        LastMSGI += 1
                                                                    else:
                                                                        PlayersData[player]['MSGTURN'].append(f"\nm,[SERVER],{ PlayersData[player]['TEAM']+' : '+';'.join(Teams[PlayersData[player]['TEAM']])},{LastMSGI}")
                                                                        LastMSGI += 1
                                                        elif _[1:].lower().split(' ')[1] == 'chat':
                                                            if PlayersData[player]['TEAM'] is None:
                                                                PlayersData[player]['MSGTURN'].append(
                                                                    f"\nc,{LastMSGI},a")
                                                                LastMSGI += 1
                                                            else:
                                                                if len(_[1:].lower().split(' ')) > 2 and _[1:].lower().split(' ')[2].replace(' ','') != '' and _[1:].lower().split(' ')[2].count(',') == 0:
                                                                    for p in Teams[PlayersData[player]['TEAM']]:
                                                                        PlayersData[p]['MSGTURN'].append(f"\ng,{player},{_[1:].split(' ')[2]},{LastMSGI}")
                                                                        # print(p)
                                                                    LastMSGI += 1

                                                    else:
                                                        PlayersData[player]['MSGTURN'].append(f'\nm,[SERVER],{TEAM_HELP},{LastMSGI}')
                                                        LastMSGI += 1
                                                            # print(Teams)
                                                            # print(TeamsOwners)

                                                elif _[1:].lower().find('/kill') == 0:
                                                    if PlayersData[player]['STATUS'] == 'ALIVE':
                                                        PlayersData[player]['STATUS'] = 'BURNING'
                                                        for i in PlayersData[player]['CAN']:
                                                            i[8] = 3
                                                        PlayersData[player]['BURNTIMER'] = 5 * TPS
                                                elif _[1:].lower().find('/leave') == 0:
                                                        PlayersData[player]['STATUS'] = 'BURNING'
                                                        for i in PlayersData[player]['CAN']:
                                                            i[8] = 3
                                                        PlayersData[player]['BURNTIMER'] = 5 * TPS + 1
                                                elif _[1:].lower().find('/tp') == 0:
                                                    if len(_[1:].lower().split(' ')) > 2:
                                                        try:
                                                            x = int(_[1:].lower().split(' ')[1])
                                                            y = int(_[1:].lower().split(' ')[2])

                                                            PlayersData[player]['X'] = x
                                                            PlayersData[player]['Y'] = y
                                                        except:pass
                                                # elif _[1:].lower().find('/dev') == 0:
                                                #     if len(_[1:].lower().split(' ')) > 2:
                                                #         try:
                                                #             exec(_[1:].replace('/dev '),__globals=globals(),__locals=locals())
                                                #         except:pass

                                            else:
                                                for i in PlayersData.keys():
                                                    PlayersData[i]['MSGTURN'].append(f'\nm,{("["+str(PlayersData[player]["TEAM"])+"]")*int(PlayersData[player]["TEAM"] != None) + player},{_[1:]},{LastMSGI}')
                                                    print(PlayersData[i]['MSGTURN'])
                                                LastMSGI += 1
                        if not player in PlayersData:
                            logger.info("Player init")
                            PlayersData[player] = {
                                'GAS': 0,
                                'DIR': 0,
                                'TAKEN':False,
                                'TAKENON':None,
                                'CARRY':set(),
                                'KSR':1,
                                'HP':vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['HP'],
                                'SCORES':0,
                                'KILLS':0,
                                'SMOKES': vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['SMOKES'],
                                'TORPEDOS':vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['TORPEDOS'],
                                'AAROCKETS': vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['AAROCKETS'],
                                'BOMBS': vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['BOMBS'],
                                'LASTTORPEDO':datetime.datetime.now(),
                                'LASTAAROCKET': datetime.datetime.now(),
                                'LASTSMOKE':datetime.datetime.now(),
                                'LASTBOMB':datetime.datetime.now(),
                                'STATUS':'ALIVE',
                                'KILLER': None,
                                'TEAM':None,
                                'TEAMREQ':[],
                                'ONGROUND':False,
                                'SPEED':0.000000001,
                                'BURNTIMER':0,
                                'HPMAX':vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['HPMAX'],
                                'X':13,
                                'Y':14.5,
                                'Z': vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['Z'],
                                'STR':'',
                                'COL':None,
                                'PrevDIR':0,
                                'AMMOUPDATE':False,
                                # "ZOOM":320,
                                'VISB':set(),
                                'VISZ':set(),
                                'VISG':set(),
                                'VISS': set(),
                                'VISBUL':set(),
                                'VISBMB': set(),
                                'VISAAR': set(),
                                'VISTOR':set(),
                                'VISSMK': set(),
                                'VISBRIDGES':set(),
                                'CAMCOL':Polygon([[-5,-4],[5,-4],[5,4],[-5,4]]),
                                'MSGTURN':[],
                                'SENDB': set(),
                                'SENDS':set(),
                                'INSMK':False,
                                'TRACER': False,
                                'STARTTIME':datetime.datetime.now(),
                                'EQZNUPDTTIMER': datetime.datetime.now(),
                                'LASTDMG':datetime.datetime.now()
                                # 'INFOG':False
                            }
                            if PlayersCosmetics[player]['VEHICLE'] in [5,8]: PlayersData[player]['SPEED'] = 0.9 *vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['MAXSPEED']
                            if player in TeamRec.keys():
                                if TeamRec[player][0] in Teams.keys():
                                    PlayersData[player]['TEAM'] = TeamRec[player][0]
                                    TeamRec[player] = [TeamRec[player][0],datetime.datetime.now()]
                                    Teams[TeamRec[player][0]].append(player)
                                else:

                                        Teams[TeamRec[player][0]] = [player]
                                        TeamsOwners[TeamRec[player][0]] = player
                                        PlayersData[player]['TEAM'] = TeamRec[player][0]


                            PlayersData[player]['CAN']=[]
                            for _ in vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['CAN']:
                                PlayersData[player]['CAN'].append(_.copy())
                            PlayersData[player]['AMMO'] = vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['AMMO'].copy()
                            if vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['SPAWN'] == 0:
                                inter = True
                                inter0 = False
                                inter1 = False
                                x = 0
                                y = 0
                                while inter or inter0 or inter1:
                                    x = random.random() * (WH-1) + 0.5
                                    y = random.random() * (WH-1) + 0.5
                                    inter = False
                                    inter0 = False
                                    inter1 = False
                                    for i in range(-1, 2):
                                        for j in range(-1, 2):
                                            try:
                                                for _ in MAP['Q'][(int(x)+i, int(y)+j)]['S']:
                                                    if MAP['S'][_].intersects(Point(x,y).buffer(0.5)):
                                                        inter = True
                                                        break
                                            except:pass
                                    for i in range(-1, 2):
                                        for j in range(-1, 2):
                                            try:
                                                for _ in MAP['Q'][(int(x)+i, int(y)+j)]['B']:
                                                    if MAP['B'][_].intersects(Point(x,y).buffer(0.5)):
                                                        inter0 = True
                                                        break
                                            except:pass
                                    for i in range(-1, 2):
                                        for j in range(-1, 2):
                                            try:
                                                if len(MAP['Q'][(int(x)+i, int(y)+j)]['PLAYERS']) >0:
                                                    inter1 =True
                                                    break
                                            except:pass
                                PlayersData[player]['X'] = x
                                PlayersData[player]['Y'] = y
                            elif vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['SPAWN'] == 1:
                                inter = True
                                inter0 = False
                                inter1 = False
                                x = 0
                                y = 0
                                while inter  or inter1 or not inter0:
                                    x = random.random() * (WH-1) + 0.5
                                    y = random.random() * (WH-1) + 0.5
                                    inter = False
                                    inter0 = False
                                    inter1 = False
                                    for i in range(-1, 2):
                                        for j in range(-1, 2):
                                            try:
                                                for _ in MAP['Q'][(int(x)+i, int(y)+j)]['S']:
                                                    if MAP['S'][_].intersects(Point(x,y).buffer(0.15)):
                                                        inter = True
                                                        break
                                            except:pass
                                    for i in range(-1, 2):
                                        for j in range(-1, 2):
                                            try:
                                                for _ in MAP['Q'][(int(x)+i, int(y)+j)]['B']:
                                                    if MAP['B'][_].intersects(Point(x,y)):
                                                        inter0 = True
                                                        break
                                            except:pass
                                    for i in range(-1, 2):
                                        for j in range(-1, 2):
                                            try:
                                                if len(MAP['Q'][(int(x)+i, int(y)+j)]['PLAYERS']) >0:
                                                    inter1 =True
                                                    break
                                            except:pass
                                PlayersData[player]['X'] = x
                                PlayersData[player]['Y'] = y
                            elif vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['SPAWN'] == 2:
                                inter1 = True
                                x = 0
                                y = 0
                                while inter1:
                                    x = random.random() * (WH-1) + 0.5
                                    y = random.random() * (WH-1) + 0.5
                                    inter1 = False
                                    for i in range(-1, 2):
                                        for j in range(-1, 2):
                                            try:
                                                if len(MAP['Q'][(int(x)+i, int(y)+j)]['PLAYERS']) >0:
                                                    inter1 =True
                                                    break
                                            except:pass
                                PlayersData[player]['X'] = x
                                PlayersData[player]['Y'] = y
                        # try:
                        #
                        #
                        #
                        # except:pass
                    except Exception:

                        logger.info("Incorrect message from client")
                        # logging.exception("message")
                        Exit = True
                        pass
                    try:
                        if PlayersData[player]['STATUS'] == 'DEAD':
                            PlayersData[player]['STR'] = 'D'
                            PlayersData[player]['STATUS'] = 'AFK'
                            logger.info(f"Player {player} informed about death")
                        await websocket.send(PlayersData[player]['STR'])
                    except Exception:
                        pass
                        # logging.exception("message")
                        for player in PlayersSockets.keys():
                            if PlayersSockets[player] == websocket:
                                PlayersData[player]['STATUS'] = 'AFK'
                                logger.info(f"Player {player} is AFK")
                        Exit = True
                        continue

        elif message[0] =='n' and len(message)>1:

            name =message[1:].split('\n')[0]
            while name.find('  ')!=-1:
                name = name.replace('  ', ' ')
            logger.info(f"Name '{name}' wanted")
            # print(name)

            if name == '' or name == ' ' or name.count(',') > 0 or name.count(']') > 0 or name.count('[') or name.count(' ') > 0:
                logger.info(f"Bad name")
                if message[1:].split('\n')[3] == '':
                    name = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[random.randint(0,25)]+ '-'+str(random.randint(0,99))
                    while name in PlayersSockets.keys():
                        name = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[random.randint(0,25)]+ '-'+str(random.randint(0,99))
                    logger.info(f"'{name}' is better")
                else:
                    name =message[1:].split('\n')[3]
                    print(message[1:])
                    l = 1
                    while name in PlayersSockets.keys():
                        name = message[1:].split('\n')[3]+ '-'+str(l)
                        l+=1
                    logger.info(f"'{name}' is better")
            if name in PlayersSockets.keys():
                logger.info(f"Name '{name}' captured")
                await websocket.send('E,Somebody already have this name !')
                continue
            else:
                PlayersSockets[name] = websocket
                # print(message,"1")

                PlayersCosmetics[name] = {'COLOR':int(message[1:].split('\n')[1]),'VEHICLE':int(message[1:].split('\n')[2]), "TRACER":1}
                PlayersAccs[name] = {'NICK': '', 'PSW': '', 'money': 0}
                resp = ""
                try:
                    print(API_SERV_ADDRESS + "item_check_for_acc")
                    resp = (await requests.post(API_SERV_ADDRESS+"item_check_for_acc",{'nickname':message[1:].split('\n')[3],"password":message[1:].split('\n')[4],"color":PlayersCosmetics[name]["COLOR"],"vehicle":PlayersCosmetics[name]["VEHICLE"]})).text

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

                            await websocket.send('E,Twin - ban')
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
                        await websocket.send('M'+MAPJSON)
                except:
                    print(API_SERV_ADDRESS + "item_check")
                    resp = (await requests.post(API_SERV_ADDRESS + "item_check",{ "color": PlayersCosmetics[name]["COLOR"],"vehicle": PlayersCosmetics[name]["VEHICLE"]})).text
                    print(resp)
                    respJSON = json.loads(resp)
                    if respJSON['color'] < 0:
                        PlayersCosmetics[name]["COLOR"] = 1
                    if respJSON['vehicle'] < 0:
                        PlayersCosmetics[name]["VEHICLE"] = 0
                    logger.info(f"Map to '{name}' sent")
                    await websocket.send('M' + MAPJSON)
                # print(PlayersCosmetics[name])
                # try:
                #
                #       PlayersAccs[name] = {'NICK': message[1:].split('\n')[3], 'PSW': message[1:].split('\n')[4], 'money': 0}
                #     # print(PlayersAccs[name])
                #     a = SQLctx.execute(f"SELECT money FROM Account WHERE nickname = '{PlayersAccs[name]['NICK']}' AND password = '{PlayersAccs[name]['PSW']}'").fetchone()
                #     c = SQLctx.execute(
                #         f"SELECT invent FROM Account WHERE nickname = '{PlayersAccs[name]['NICK']}' AND password = '{PlayersAccs[name]['PSW']}'").fetchone()
                #     # SQL.commit()
                #     # print(PlayersAccs[name])
                #     # print(a)
                #     # print(f"SELECT money FROM Account WHERE nickname = '{PlayersAccs[name]['NICK']}' AND password = '{PlayersAccs[name]['PSW']}'")
                #
                #     if  a is None:
                #
                #         logger.info(f"'{name}' not logged")
                #         # print('a = None')
                #         PlayersAccs[name] = {'NICK': '','PSW': '','money':0}
                #         raise Exception
                #     else:
                #         logger.info(f"'{name}' has {a} GSh")
                #         PlayersAccs[name]['money'] = a[0]
                #         b = False
                #         for _ in PlayersAccs.keys():
                #             if PlayersAccs[_]['NICK'] == PlayersAccs[name]['NICK'] and _ != name:
                #                 b = True
                #                 break
                #         if b:
                #             PlayersSockets.pop(name)
                #             PlayersAccs.pop(name)
                #             PlayersCosmetics.pop(name)
                #
                #             await websocket.send('E,Twin - ban')
                #             logger.info(f"Twin '{name}'")
                #             continue
                #         else:
                #             # print(c[0])
                #             # print(PlayersCosmetics[name]['VEHICLE'])
                #             # print(c[PlayersCosmetics[name]['VEHICLE']])
                #             if PlayersCosmetics[name]['COLOR'] in availablecls and PlayersCosmetics[name]['VEHICLE'] in vehicleinfo.keys() and (c[0][PlayersCosmetics[name]['VEHICLE']] == '1' or PREM_ITEM[PlayersCosmetics[name]['VEHICLE']][0] ==0):
                #                 logger.info(f"Map to '{name}' sent")
                #                 await websocket.send('M'+MAPJSON)
                #             else:
                #
                #                 if PlayersCosmetics[name]['VEHICLE'] in vehicleinfo.keys() and not (c[0][PlayersCosmetics[name]['VEHICLE']] == '1' or PREM_ITEM[PlayersCosmetics[name]['VEHICLE']][0] ==0):
                #                     logger.info(f"'{name}' should buy the vehicle.")
                #                     await websocket.send('Rshop/'+str(PlayersCosmetics[name]['VEHICLE']))
                #
                #                 else:
                #                     logger.info(f"'{name}' cheats :(")
                #                     await websocket.send('E,NO CHEATS')
                #                 PlayersSockets.pop(name)
                #                 PlayersAccs.pop(name)
                #                 PlayersCosmetics.pop(name)
                #                 continue
                #
                # except Exception:
                #     logger.info(f"'{name}' not logged")
                #     # pass
                #     # logging.exception("message")
                #     PlayersAccs[name] = {'NICK': '', 'PSW': '','money':0}
                #     # print(PREM_ITEM[PlayersCosmetics[name]['VEHICLE']][0] )
                #     if PlayersCosmetics[name]['COLOR'] in availablecls and PlayersCosmetics[name]['VEHICLE'] in vehicleinfo.keys() and PREM_ITEM[PlayersCosmetics[name]['VEHICLE']][0] == 0:
                #         logger.info(f"Map to '{name}' sent")
                #         await websocket.send('M'+MAPJSON)
                #     else:
                #
                #         if PlayersCosmetics[name]['VEHICLE'] in vehicleinfo.keys() and not PREM_ITEM[PlayersCosmetics[name]['VEHICLE']][0] == 0:
                #             logger.info(f"'{name}' should log in")
                #             await websocket.send('Raccount')
                #         else:
                #             logger.info(f"'{name}' cheats :(")
                #             await websocket.send('E,NO CHEATS')
                #         PlayersSockets.pop(name)
                #         PlayersAccs.pop(name)
                #         PlayersCosmetics.pop(name)
                #         continue
                if PlayersCosmetics[name]['VEHICLE'] == 3: PlayersCosmetics[name]['COLOR'] = 228
                PlayersAccs[name]['contime'] = datetime.datetime.now()
        elif message == 'info':
            await websocket.send(ServInfoJSON.replace('%js%',JSVEHs).replace('%text%','1# Oficial FFA/PVP').replace('%online%',str(len(PlayersSockets))))
        await asyncio.sleep(1/TPS)
@logger.catch()
async def main():
    async with websockets.serve(handler, os.environ["HOST"], os.environ["PORT"]): #80.68.156.140
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
