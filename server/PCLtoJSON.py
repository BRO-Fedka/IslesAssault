import json
import pickle
from shapely.geometry import Polygon, LineString, Point, LinearRing

FILEMAP = 'OFICIAL-MAP1'
MAP = pickle.load(open(FILEMAP, 'rb'))
MAPobjSIDEdir = {'S': {}, 'B': {}}
print(MAP['B'])
WH = 16
i = 0
while i in range(0, len(MAP['B'])):
    print(i)
    if MAP['B'][i] == []:
        MAP['B'].pop(i)
        i -= 1
    i += 1
i = 0
while i in range(0, len(MAP['S'])):
    print(i)
    if MAP['S'][i] == []:
        MAP['S'].pop(i)
        i -= 1
    i += 1
if True:
    for i in range(0, len(MAP['S'])):
        print(MAP['S'][i])

        srtg = (Polygon(
            LinearRing(MAP['S'][i].exterior.coords).parallel_offset(0.01, 'right', join_style=1, resolution=1).coords))
        MAPobjSIDEdir['S'][i] = True
        if srtg.area < MAP['S'][i].area:
            MAPobjSIDEdir['S'][i] = False
if len(MAP['Z']) == 0:
    for i in range(0, len(MAP['B'])):
        print(list(MAP['B'][i].exterior.coords))

        MAP['Z'].append(Polygon(
            LinearRing(MAP['B'][i].exterior.coords).parallel_offset(0.25, 'right', join_style=1, resolution=1).coords))
        MAPobjSIDEdir['B'][i] = True
        if MAP['Z'][i].area < MAP['B'][i].area:
            MAP['Z'][i] = Polygon(LinearRing(MAP['B'][i].exterior.coords).parallel_offset(0.25, 'left', join_style=1,
                                                                                          resolution=1).coords)
            MAPobjSIDEdir['B'][i] = False
if len(MAP['G']) == 0:
    for i in range(0, len(MAP['B'])):
        print(list(MAP['B'][i].exterior.coords))

        MAP['G'].append(Polygon(
            LinearRing(MAP['B'][i].exterior.coords).parallel_offset(0.1, 'left', join_style=1, resolution=1).coords))
        if MAP['G'][i].area > MAP['B'][i].area:
            MAP['G'][i] = Polygon(LinearRing(MAP['B'][i].exterior.coords).parallel_offset(0.1, 'right', join_style=1,
                                                                                          resolution=1).coords)

print(len(MAP['Z']), len(MAP['B']))
Bridges = {0: [7.31, 4.63, 8.51, 4.63], 1: [5.24, 5.43, 5.78, 4.77], 2: [8.83, 4.88, 9.21, 5.53],
           3: [12.55, 6.22, 12.58, 7.07]}
for _ in Bridges.keys():
    line = LineString([(Bridges[_][0], Bridges[_][1]), (Bridges[_][2], Bridges[_][3])])
    left_hand_side = line.buffer(0.1875 / 2, single_sided=True)
    right_hand_side = line.buffer(-0.1875 / 2, single_sided=True)
    Bridges[_].append(left_hand_side.union(right_hand_side))
MAP['Q'] = {}
for x in range(0, WH):
    for y in range(0, WH):
        MAP['Q'][(x, y)] = {'p': Polygon([[x, y], [x + 1, y], [x + 1, y + 1], [x, y + 1]]), 'B': [],
                            'Z': [], 'G': [], 'S': [], 'BRIDGES': []}
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
###############

data = {'B': [], 'G': [], 'Z': [], 'S': [], 'Q': {}, '_': []}
for _ in Bridges.keys():
    data['_'].append([Bridges[_][0], Bridges[_][1], Bridges[_][2], Bridges[_][3]])


def round(val):
    return [int(val[0] * 1000) / 1000, int(val[1] * 1000) / 1000]


for i in range(0, len(MAP['B'])):
    # print(list(map(round,list(MAP['B'][i].exterior.coords))))

    data['B'].append(list(map(round, list(MAP['B'][i].exterior.coords))))
for i in range(0, len(MAP['S'])):
    # print(list(map(round,list(MAP['S'][i].exterior.coords))))

    data['S'].append(list(map(round, list(MAP['S'][i].exterior.coords))))
for i in range(0, len(MAP['G'])):
    # print(list(map(round,list(MAP['G'][i].exterior.coords))))

    data['G'].append(list(map(round, list(MAP['G'][i].exterior.coords))))
for i in range(0, len(MAP['Z'])):
    # print(list(map(round,list(MAP['Z'][i].exterior.coords))))
    data['Z'].append(list(map(round, list(MAP['Z'][i].exterior.coords))))

for x in range(0, WH):
    data['Q'][x] = {}
    for y in range(0, WH):
        data['Q'][x][y] = {'B': MAP['Q'][(x, y)]['B'], 'Z': MAP['Q'][(x, y)]['Z'], 'G': MAP['Q'][(x, y)]['G'],
                           'S': MAP['Q'][(x, y)]['S'], '_': MAP['Q'][(x, y)]['BRIDGES']}
        if data['Q'][x][y]['B'] == []: data['Q'][x][y].pop('B')
        if data['Q'][x][y]['Z'] == []: data['Q'][x][y].pop('Z')
        if data['Q'][x][y]['G'] == []: data['Q'][x][y].pop('G')
        if data['Q'][x][y]['S'] == []: data['Q'][x][y].pop('S')
        if data['Q'][x][y]['_'] == []: data['Q'][x][y].pop('_')

data['WH'] = WH
data['*'] = [['A',8,8,1]]
data['CT'] = {
    'sf': '#454545',
    'ss': '#333333',
    'bg': '#2879AD',
    'zs': '#2a7eb5',
    'zf': '#3383b7',
    'bf': '#ffc45f',
    'bs': '#81bce3',
    'gf': '#569f4f',
    'gs': '#877241',
    'f0': '#131313',
    'f1': '#2a200c',
    'f2': '#122b0b',
    'f3': '#10222b',
    'f4': '#323232',
    'f5': '#713567',
    'f228': '#b0ac8b',
    'o0': '#6c6c6c',
    'o1': '#2b2b2b',
    'l0': '#787878',
    'l1': '#323232',
    'b0': '#805225',
    'b1': '#523316',
    'b2': 'rgba(0,0,0,0.25)'
}
print(data)
with open(f"{FILEMAP}.json", "w") as write_file:
    jsonstr = json.dumps(data).replace(' ', '')
    write_file.write(jsonstr)
    write_file.close()
