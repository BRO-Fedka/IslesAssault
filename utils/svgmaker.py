import datetime
svg = '''<?xml version="1.0" encoding="utf-8"?>
<svg viewBox="-0.25 -0.25 0.5 0.5" xmlns="http://www.w3.org/2000/svg">
<polygon class="vehiclebody" points="{A}" fill="#442d15"/>
'''
CANg = '''
<circle cx="{A}" cy="{B}" r="{C}" fill="#6c6c6c" />
<line x1="{D}" y1="{E}" x2="{F}" y2="{G}" stroke="#9b9b93" stroke-width="{H}"/>
'''
caninfo = {
    'm':[12/320,18/320,6/320,50,1000000*3,0.75,6,2,4,3],
    'p':[3/320,6/320,2/320,1,1000000*0.09,1,2,7,1,0],
    't':[9/320,20/320,4/320,30,1000000*2,1.25,4,1,3,2],
    'h':[7/320,14/320,2/320,7,1000000*0.5,1,3,1,2,1],
    'f':[0/320,0/320,0/320,1,1000000*0.09,1,3,5,1,0],
}

s = ''
cans = [['m', 0, 0, 50, datetime.datetime.now(), None, True, 0, 0, 0],
                ['m', 0 - 0.095, 0, 50, datetime.datetime.now(), None, True, 0, 0, 0]]
arr = [(0.15, 0), (0, 0.06), (-0.15, 0.045), (-0.15, -0.045), (0, -0.06)]
for _ in arr:
    s += str(_[0]) + ' ' + str(_[1]) +','
print(s)
svg = svg.replace('{A}',s)
print(svg)
for _ in cans:
    s = CANg
    s = s.replace('{A}',str(_[1])).replace('{B}',str(_[2])).replace('{C}',str(caninfo[_[0]][0]))
    s = s.replace('{D}', str(_[1])).replace('{E}', str(_[2])).replace('{F}', str(_[1])).replace('{G}', str(_[2]-caninfo[_[0]][1])).replace('{H}', str(caninfo[_[0]][2]))
    svg+=s
a = open('./test.svg', 'w')
a.write(svg+'\n</svg>')