from flask import Flask,request,redirect,session,render_template,make_response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
import markdown
import json
import requests
import re
import dotenv
dotenv.load_dotenv()
# Simple conversion in memory
md_text = '# Hello\n\n**Text**'
html = markdown.markdown(md_text)
print(html)
# from validate_email import validate_email
# import smtplib
# from email.mime.text import MIMEText
# from email.header    import Header
import hashlib
import os
# import sqlite3
import time
import math
import sys
sys.path.append("../")
from Config import *
from werkzeug.security import generate_password_hash, check_password_hash
# from FDataBase import FDataBase
# MAIL = smtplib.SMTP('smtp.mail.ru', 587)
# MAIL.starttls()
import datetime
app = Flask(__name__)
app.app_context()
# SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.abspath(os.path.dirname(__file__))
# print(SQLALCHEMY_DATABASE_URI)
print(os.environ['DB_PATH'])
app.config['SQLALCHEMY_DATABASE_URI'] =os.environ['DB_PATH'] # 'sqlite:///../data.db' # sqlite:////root/IslesAssault/data.db
app.config['SQLACHEMY_TRACK_MODIFICATIONS'] = False
VERSION = os.environ['VERSION']
UPDATE_NAME = os.environ['UPDATE_NAME']
isDEV = os.environ['DEV']
print()
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
db = SQLAlchemy(app)
# print(os.path.curdir)
class Account(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    nickname = db.Column(db.String(16),nullable=False)
    email = db.Column(db.String(64), nullable=False)
    password = db.Column(db.String(16), nullable=False)
    money  = db.Column(db.Integer, nullable=False, default = 0)
    dateCreated = db.Column(db.DateTime,default = datetime.datetime.utcnow)
    kills = db.Column(db.Integer,nullable = False , default = 0)
    deaths = db.Column(db.Integer, nullable=False, default=0)
    playtime = db.Column(db.Integer, nullable = False,default =0)
    xp = db.Column(db.Integer, nullable=False, default =0)
    lvl = db.Column(db.Integer, nullable=False, default=0)
    img = db.Column(db.Integer, nullable=False, default=0)
    clanID = db.Column(db.Integer, nullable=False, default=0)


    def __repr__(self):
        return '<Account %r>' % self.nickname
class Item(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(32),nullable=False)
    cost = db.Column(db.Integer,nullable=False)
    lvl = db.Column(db.Integer, nullable=False, default=0)
    type = db.Column(db.String(1), nullable=False, default= 'V') #V - vehicle, S - skin, I - image
    imgLink = db.Column(db.String(256),nullable=False)
    info = db.Column(db.Integer,nullable=False)
    def data_as_tuple(self):
        return  (self.id,self.name,self.cost,self.lvl,self.type, self.imgLink,self.info)
    def __repr__(self):
        return '<Item %r>' % self.name


class Account_Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    accID = db.Column(db.Integer, nullable=False)
    itemID = db.Column(db.Integer, nullable=False)
    dateCreated = db.Column(db.DateTime,default = datetime.datetime.utcnow)
    def __repr__(self):
        return '<Account_Item %r>' % self.id
class Server(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    name = db.Column(db.String(32),nullable = False)
    imgLink = db.Column(db.String(256),nullable = False)
    desc = db.Column(db.String(1024),nullable = False)
    address = db.Column(db.String(128), nullable=False)
    ghLink = db.Column(db.String(128), nullable=False)
    key = db.Column(db.String(16), nullable=False)
    status = db.Column(db.String(16), nullable=False, default = "offline")
    version = db.Column(db.String(16), nullable=False, default = "???")
    def __repr__(self):
        return str(self.id)+'-Server: ' +self.name+"|"+self.key

# try:
# a = Account.query.filter_by(nickname="CHECK").first()
# except: db.create_all()
# with app.app_context():
# db.create_all()
# #cl1{
# 	background-color: #442d15;
# }
# #cl2{
# 	background-color: #294215;
# }
# #cl3{
# 	background-color: #153b44;
# }
# #cl4{
# 	background-color: #323232;
# }
# @app.route('/fp/<int:id>',methods=['POST','GET'])
# def fpid(id):
#     # print(id)
#     if request.method == 'GET':
#         if len(Account.query.filter_by(date=id).all()) > 0:
#             return render_template('fpid.html',urrl="fp/"+str(id))
#         else:
#             return redirect('/')
#     elif request.method == 'POST':
#         if len(Account.query.filter_by(date=id).all()) > 0:
#             hashp = hashlib.sha224(request.form['psw'].encode('utf-8')).hexdigest()
#             Account.query.filter_by(date=id).first().password = hashp
#             Account.query.filter_by(date=id).first().date = int(str(time.time()).replace('.',''))
#             db.session.commit()
#             return redirect('/login')
#         else:
#             return redirect('/')
@app.route('/shop/<int:id>',methods=['POST','GET'])
def shopveh(id):
    curItem = Item.query.filter_by(id=id).first_or_404()

    # print(curItem)
    # print(dir(curItem))

    if request.method == 'GET':
        curItem = (curItem.id, curItem.name, curItem.cost, curItem.lvl, curItem.type, curItem.imgLink, curItem.info)
        if (not 'logged' in session or session['logged'] == False):
            return render_template('shopveh.html', money=0, id=id, purch=False,
                                   vehicle=curItem, desc=Description[id], logged=False, lvl = 0)
        else:
            acc = Account.query.filter_by(nickname=session['name']).first()

            return render_template('shopveh.html', money = acc.money,id = id,purch = Account_Item.query.filter_by(accID=acc.id,itemID=curItem[0]).first() != None, vehicle = curItem, desc =Description[id], logged = True,lvl = acc.lvl)
    elif request.method == 'POST':
        if (not 'logged' in session or session['logged'] == False):
            return redirect('/')
        acc = Account.query.filter_by(nickname=session['name']).first()
        if (not acc.money < curItem.cost) and Account_Item.query.filter_by(accID=acc.id,itemID=curItem.id).first() is None:
            acc.money -= curItem.cost
            acc_item = Account_Item(accID = acc.id, itemID = curItem.id)
            db.session.add(acc_item)
            db.session.commit()
        return redirect('/shop')
            # return render_template('shopveh.html', money = str(acc.money),id = id,purch = Account_Item.query.filter_by(accID=acc.id,itemID=curItem[0]).first() != None, vehicle = curItem,desc =Description[id],lvl = acc.lvl)
# @app.route('/fp',methods=['POST','GET'])
# def fp():
#     if 'logged' in session and session['logged'] ==True:
#         return redirect('/')
#     if request.method == 'POST':
#         email =request.form['email'].replace(' ','')
#         msg = MIMEText('localhost:8001/fp/'+str(Account.query.filter_by(email=email).first().date), 'plain', 'utf-8')
#         msg['Subject'] = Header('Account recover', 'utf-8')
#         msg['From'] = 'islesassault@mail.ru'
#         msg['To'] = ", ".join([email])
#
#         if len(Account.query.filter_by(email=email).all()) > 0:
#             # print('localhost:8001/fp/'+str(Account.query.filter_by(email=email).first().date))
#             MAIL.sendmail(msg['From'], [email], msg.as_string())
#             return "Check your email !"
#         return render_template('fp.html',errs=True,errt = "No account with such email :(")
#     return render_template('fp.html')
@app.route('/shop',methods=['GET'])
def shop():
    if not 'logged' in session or session['logged'] ==False:
        return redirect('/')
    acc = Account.query.filter_by(nickname=session['name']).first()
    itemsArr = []
    allItems = Item.query.all()
    print(allItems)

    for item in allItems:
        if acc.lvl >= item.lvl:
            # print(Account_Item.query.filter_by(accID=acc.id,itemID=item.id).first())
            itemsArr.append((item.data_as_tuple(),Account_Item.query.filter_by(accID=acc.id,itemID=item.id).first() != None))


    # for _ in range(0, len(acc.invent)):
    #     if _ in PREM_ITEM.keys() and PREM_ITEM[_][hiderplace[PREM_ITEM[_][2]]]:
    #         if (PREM_ITEM[_][0] ==1 and not bool(int(acc.invent[_]))) : continue
    #
    #         arr.append([_,int(bool(int(acc.invent[_])) or PREM_ITEM[_][0]==0) ]+list(PREM_ITEM[_]))

    print(itemsArr)

    return render_template('shop.html', money = str(acc.money),vehicles = itemsArr,lenvehicles = len(itemsArr))
@app.route('/logout')
def logout():
    session['logged'] = False
    return redirect('/')
@app.route('/image',methods=['POST','GET'])
def image():
    if not 'logged' in session or session['logged'] ==False:
        return redirect('/login')
    if request.method == 'GET':
        acc = Account.query.filter_by(nickname=session['name']).first()
        if acc is None:
            session['logged'] = False
            return redirect('/login')
        # acc = Account.query.filter_by(nickname=session['name']).first()
        avas = []
        purchItems = Account_Item.query.filter_by(accID = acc.id).all()
        for pitem in purchItems:
            item = Item.query.filter_by(id = pitem.itemID).first()
            if item.type == "I":
                avas.append((item.id,item.name,item.imgLink))

        # for _ in range(0, len(acc.invent)):
        #     if _ in PREM_ITEM.keys() and bool(int(acc.invent[_])) and PREM_ITEM[_][2] == 'image':
        #         avas.append([PREM_ITEM[_][3],PREM_ITEM[_][1]])

        print(avas)
        return render_template('avimgs.html', avas = avas, curimg = acc.img)
    else:
        acc = Account.query.filter_by(nickname=session['name']).first()
        if acc is None:
            session['logged'] = False
            return redirect('/login')
        if Account_Item.query.filter_by(accID = acc.id, itemID = request.form['img']) != None:
            acc.img = request.form['img']
            db.session.commit()
        return redirect('/account')

@app.route('/account')
def account():
    if not 'logged' in session or session['logged'] ==False:
        return redirect('/login')
    acc = Account.query.filter_by(nickname=session['name']).first()
    if acc is None:
        session['logged'] = False
        return redirect('/login')
    img = Item.query.filter_by(id = acc.img, type = "I").first()
    if img is None:
        acc.img = 12
        img = 12
        db.session.commit()
    else:
        img = img.imgLink
    if acc is None:
        session['logged'] = False
        return redirect('/login')
    lvls = []
    maxLevel = db.session.query(func.max(Item.lvl)).scalar()
    print(maxLevel)
    for level in range(1,maxLevel+1):
        items = Item.query.filter_by(lvl=level).all()
        print(items)
        if not items is None :
            itemslst = []
            for item in items:
                itemslst.append((item.id,item.name,item.type,item.imgLink))
            lvls.append(itemslst)
        else:
            lvls.append([])
    # for j in range(0,20):
    #     for i in PREM_ITEM.keys():
    #       #  print(j,PREM_ITEM[i][0],PREM_ITEM[lvlplace[PREM_ITEM[i][2]]])
    #         if PREM_ITEM[i][0] == 1 and PREM_ITEM[i][lvlplace[PREM_ITEM[i][2]]] == j+1:
    #             lvls.append([PREM_ITEM[i]])
    #             break
    #     if len(lvls) == j:
    #         lvls.append([])
    print(lvls)
    return render_template('account.html', lvlitems = lvls, ava = img,maxlvl = maxLevel+1,xppx = int(acc.xp/(acc.lvl**2+50*acc.lvl+100)*150), lvl = acc.lvl,xp = str(acc.xp)+'/'+str(acc.lvl**2+50*acc.lvl+100),money = str(acc.money), nickname = acc.nickname, kills=str(acc.kills), deaths = str(acc.deaths), time = (str(acc.playtime//3600)+'h')*int(acc.playtime//3600 !=0)+ str(acc.playtime%3600//60)+'m', KD=str(int(acc.kills/(acc.deaths+int(acc.deaths==0))*100)/100)*int(acc.deaths!=0)+'INVINCIBLE'*int(acc.deaths==0 and acc.kills>0)+'SIMPLETON'*int(acc.deaths==0 and acc.kills==0))
@app.route('/')
def index():
    agent = request.headers.get('User-Agent')
    if ('iphone' or 'android' or 'blackberry') in agent.lower():
        return render_template("noMobileSupportYet.html")
    logged = False
    if 'logged' in session:
        logged = session['logged']
    if logged and Account.query.filter_by(nickname=session['name']).first():
        acc = Account.query.filter_by(nickname=session['name']).first()
        # arr = []
        colors = []
        allColors = Item.query.filter_by(type = "S" ).all()
        for color in allColors:
            if not Account_Item.query.filter_by(accID = acc.id, itemID = color.id).first() is None:
                colors.append([color.info,color.imgLink])
        # for _ in range(0,len(acc.invent)):
        #
        #     if _ in PREM_ITEM.keys() and (bool(int(acc.invent[_])) or PREM_ITEM[_][0] == 0):
        #         if PREM_ITEM[_][2] == 'vehicle':
        #             arr.append([_] + list(PREM_ITEM[_]))
        #         elif PREM_ITEM[_][2] == 'skin':
        #             if colors =='':colors += str(PREM_ITEM[_][4])
        #             else:
        #                 colors += ','+str(PREM_ITEM[_][4])
        m = acc.money
        servers =[]
        if isDEV: servers = [['local 8001','ws://localhost:8001'],['local 8002','ws://localhost:8002'],['local 8003','ws://localhost:8003']]
        else:
            onlineServers = Server.query.filter_by().all()
            for server in onlineServers:
                servers.append([server.name,server.address])

        # servers = []
        # for i in Servers.keys():
        #     servers.append([i, Servers[i]])
        # print(arr)
        return render_template('index.html',servers = servers, money = str(m),logged = logged, name = session['name'], passw = session['pswh'], colors = colors, colorslen = len(colors),vehicles = [], lenvehicles = 0 , version = VERSION,updateName = UPDATE_NAME) #,logged = logged, name = session['name']

    servers = []
    if isDEV:
        servers = [['local 8001', 'ws://localhost:8001'], ['local 8002', 'ws://localhost:8002'],
                   ['local 8003', 'ws://localhost:8003']]
    else:
        onlineServers = Server.query.filter_by(status = "online").all()
        for server in onlineServers:
            servers.append([server.name, server.address])
    # for _ in PREM_ITEM.keys():
    #     if PREM_ITEM[_][0] == 0 and PREM_ITEM[_][2] == 'vehicle': arr.append([_]+list(PREM_ITEM[_]))
    colors = []
    allColors = Item.query.filter_by(type="S",lvl = 0,cost=0).all()
    for color in allColors:
        colors.append([color.info, color.imgLink])

    return render_template('index.html',servers = servers,logged = False, name = '', colors = colors,colorslen = len(colors),vehicles = [],lenvehicles=0,money = '',passw='', version = VERSION,updateName = UPDATE_NAME)
@app.route('/login',methods=['POST','GET'])
def login():
    if 'logged' in session and session['logged'] ==True:
        return redirect('/')
    if request.method == 'POST':
        email =request.form['email'].replace(' ','')
        hashp = hashlib.sha224(request.form['psw'].encode('utf-8')).hexdigest()
        print(email,hashp)
        print(Account.query.filter_by(email='LOL'))
        print('0!')
        if len(Account.query.filter_by(email=email).all()) > 0:
            print('1!')
            if Account.query.filter_by(email=email).first().password == hashp:
                print('2!')
                session.permanent = True
                session['logged']=True
                session['name'] = Account.query.filter_by(email=email).first().nickname
                session['pswh'] = hashp

                return redirect('/')
            return render_template('login.html',errs=True,errt = "Wrong password or email :(")
        return render_template('login.html',errs=True,errt = "Wrong password or email :(")
    return render_template('login.html')

@app.route('/register',methods=['POST','GET'])
def register():
    if 'logged' in session and session['logged'] ==True:
        return redirect('/')
    if request.method == 'POST':
        name = request.form['nick'].replace(' ','')
        email =request.form['email'].replace(' ','')
        # is_valid = validate_email(email, verify=True)
        hashp = hashlib.sha224(request.form['psw'].encode('utf-8')).hexdigest()
        if len(Account.query.filter_by(nickname=name).all()) > 0:
            return render_template('login.html',errs=True,errt = "This name is occupied :(")
        if len(Account.query.filter_by(email=email).all() ) > 0:
            return render_template('login.html',errs=True,errt = "This email is occupied :(")
        # invent = ''
        # for i in range(0,64):
        #     if i in PREM_ITEM.keys() and PREM_ITEM[i][0] ==0: invent += '1'
        #     else: invent+='0'
        account = Account(nickname = name, email = email, password = hashp, money = 10,img = 12)
        acc = Account.query.filter_by(nickname=session['name']).first()
        freeItems = Item.query.filter_by(cost = 0, lvl=0).all()
        # print(allItems)

        for item in freeItems:
            acc_item = None
            try: acc_item = Account_Item(accID = acc.id+1, itemID = item.id)
            except:acc_item = Account_Item(accID = 1, itemID = item.id)
            db.session.add(acc_item)
                # itemsArr.append(
                #     (item.data_as_tuple(), Account_Item.query.filter_by(accID=acc.id, itemID=item.id).first() != None))

        # veh = Vehicles(nickname = name,zepelin = True,carrier = True,rat=True,t28=True)
        # try:
        db.session.add(account)
            # db.session.add(veh)
        db.session.commit()
        return redirect('/login')
        # except:
        #     return 'НА СЕРВЕРЕ ПИЗДЕЦ'
    else:
        return render_template('register.html')
@app.route('/about',methods=['GET'])
def about():
      return render_template('about.html', content = re.sub(':(\\S*):|\\[!(\\S*)\\]',' ',markdown.markdown(requests.get('https://raw.githubusercontent.com/BRO-Fedka/IslesAssault/master/README.md').text)))

@app.route('/server/connect',methods=['POST'])
def server_connect():
    try:
        if isDEV: return 'OK'
        print(request.form['key'])
        hashkey = hashlib.sha224(request.form['key'].encode('utf-8')).hexdigest()
        print(Server.query.all())
        serv = Server.query.filter_by(key = hashkey).first()
        print(serv)
        serv.status = "online"
        db.session.commit()
        return "OK"
    except:
        return "ERROR"
@app.route('/server/disconnect',methods=['POST'])
def server_disconnect():
    try:
        if isDEV:return 'OK'
        hashkey = hashlib.sha224(request.form['key'].encode('utf-8')).hexdigest()
        serv = Server.query.filter_by(key = hashkey).first()
        serv.status = "offline"
        db.session.commit()
        return 'OK'
    except:
        return "ERROR"
@app.route('/server/item_check_for_acc',methods=['POST'])
def server_item_check_for_acc():
    try:

        nickname = request.form['nickname']
        phash = request.form['password']
        color = int(request.form['color'])
        vehicle = int(request.form['vehicle'])
        acc = Account.query.filter_by(nickname = nickname,  password = phash).first()
        if acc is None:
            return "ERROR"
        skinItem = Item.query.filter_by(info = color,type = "S").first()
        vehicleItem = Item.query.filter_by(info = vehicle,type = "V").first()
        color = -2
        vehicle = -2
        if not skinItem is None:
            purchItem = Account_Item.query.filter_by(accID = acc.id, itemID = skinItem.id)
            if not purchItem is None: color = skinItem.info
            else: color = -1
        if not vehicleItem is None:
            purchItem = Account_Item.query.filter_by(accID = acc.id, itemID = vehicleItem.id)
            if not purchItem is None: vehicle = vehicleItem.info
            else:vehicle = -1
        resp = {
            "color":color,
            'vehicle':vehicle,
            "money":acc.money
        }
        return json.dumps(resp)

    except:

        return "ERROR"

@app.route('/server/item_check',methods=['POST'])
def server_item_check():
    try:
        color = int(request.form['color'])
        vehicle = int(request.form['vehicle'])
        print(color,vehicle)
        skinItem = Item.query.filter_by(info = color,type = "S").first()
        vehicleItem = Item.query.filter_by(info = vehicle,type = "V").first()
        print(skinItem,vehicleItem)
        color = -2
        vehicle = -2
        if not skinItem is None:
            if skinItem.lvl == 0: color = skinItem.info
            else: color = -1
        if not vehicleItem is None:
            if vehicleItem.lvl == 0: vehicle = vehicleItem.info
            else: vehicle = -1
        resp = {
            "color":color,
            'vehicle':vehicle
        }
        return json.dumps(resp)

    except:
        return "ERROR"
@app.route('/server/change_player_data',methods=['POST'])
def server_change_player_data():
    # try:
        print("@$%SF")
        key = request.form['key']

        hashkey = hashlib.sha224(request.form['key'].encode('utf-8')).hexdigest()
        serv = Server.query.filter_by(key = hashkey)
        if serv is None:
            return "ERROR"

        nickname = request.form['nickname']
        phash = request.form['password']
        xp = request.form['xp']
        kills = request.form['kills']
        delta = request.form['delta']
        money = request.form['money']


        print(request.form)
        if xp.count('.')>0 or xp.count('-') >0:
            return "ERROR"
        if kills.count('.')>0 or kills.count('-') >0:
            return "ERROR"
        if delta.count('.')>0 or delta.count('-') >0:
            return "ERROR"
        if money.count('.')>0 or money.count('-') >0:
            return "ERROR"
        xp = int(xp)
        kills = int(kills)
        delta = int(delta)
        money = int(money)
        acc = Account.query.filter_by(nickname = nickname,  password = phash).first()
        if money < acc.money:
            return "ERROR"
        if acc is None:
            return "ERROR"
        vlvl = acc.lvl
        xp = xp + acc.xp
        while xp > vlvl**2+50*vlvl+100:
            xp -=vlvl**2+50*vlvl+100
            vlvl +=1
            curLvlItems = Item.query.filter_by(lvl=vlvl).all()
            for item in curLvlItems:
                ai = Account_Item(accID = acc.id,itemID = item.id)
                db.session.add(ai)

        acc.lvl = vlvl
        acc.xp = xp
        # print(acc.playtime)
        acc.playtime +=delta
        acc.kills += kills
        acc.money = money
        acc.deaths += 1
        db.session.commit()

        return "OK"

    # except:
    #     return "ERROR"
@app.errorhandler(404)
def err404(e):
    return render_template('error.html',reason = "Sorry", code = '404'), 404
@app.errorhandler(500)
def err500(e):
    return render_template('error.html',reason = "Sorry", code = '500'), 500
if __name__ == "__main__":
    app.run(host=os.environ['HOST'],port = int(os.environ['PORT'])) #26.223.93.1
