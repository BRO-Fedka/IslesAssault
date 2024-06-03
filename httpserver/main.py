from flask import Flask,request,redirect,session,render_template,make_response
from flask_sqlalchemy import SQLAlchemy
# from validate_email import validate_email
# import smtplib
from email.mime.text import MIMEText
from email.header    import Header
import hashlib
import os
import sqlite3
import time
import math
import sys
sys.path.append("../")
from Config import *
from werkzeug.security import generate_password_hash, check_password_hash
# from FDataBase import FDataBase
# MAIL = smtplib.SMTP('smtp.mail.ru', 587)
# MAIL.starttls()
# MAIL.login('islesassault@mail.ru', 'UZJGwPevEAhe7h0geg9c')
import datetime
app = Flask(__name__)
# SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.abspath(os.path.dirname(__file__))
# print(SQLALCHEMY_DATABASE_URI)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////root/IslesAssault/data.db'
app.config['SQLACHEMY_TRACK_MODIFICATIONS'] = False



app.config['SECRET_KEY'] = 'cf185c1afcd895af8f44dd24e5c727736196cd10'
db = SQLAlchemy(app)
# print(os.path.curdir)
class Account(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    nickname = db.Column(db.String(32),nullable=False)
    email = db.Column(db.String(64), nullable=False)
    password = db.Column(db.String(16), nullable=False)
    money  = db.Column(db.Integer, nullable=False)
    invent = db.Column(db.String(512), nullable=False)
    date = db.Column(db.DateTime,default = datetime.datetime.utcnow)
    kills = db.Column(db.Integer,nullable = False , default = 0)
    deaths = db.Column(db.Integer, nullable=False, default=0)
    playtime = db.Column(db.Integer, nullable = False,default =0)
    xp = db.Column(db.Integer, nullable=False, default =0)
    lvl = db.Column(db.Integer, nullable=False, default=0)
    img = db.Column(db.Integer, nullable=False, default=0)
    awards = db.Column(db.String(16),nullable=False)

    def __repr__(self):
        return '<Account %r>' % self.id

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

    if not id in PREM_ITEM.keys():
        return redirect('/shop')
    if request.method == 'GET':
        if (not 'logged' in session or session['logged'] == False):
            return render_template('shopveh.html', money=0, id=id, purch=False,
                                   vehicle=PREM_ITEM[id], desc=Description[id], logged=False)
        else:
            acc = Account.query.filter_by(nickname=session['name']).first()
            return render_template('shopveh.html', money = str(acc.money),id = id,purch = bool(int(acc.invent[id])), vehicle = PREM_ITEM[id], desc =Description[id], logged = True)
    elif request.method == 'POST':
        if (not 'logged' in session or session['logged'] == False):
            return redirect('/')
        acc = Account.query.filter_by(nickname=session['name']).first()
        if not acc.money < PREM_ITEM[id][0] and acc.invent[id] == '0':
            acc.money -= PREM_ITEM[id][0]
            acc.invent = acc.invent[:id] + '1'+acc.invent[id+1:]
            db.session.commit()
            return redirect('/shop')
        else:
            return render_template('shopveh.html', money = str(acc.money),id = id,purch = bool(int(acc.invent[id])), vehicle = PREM_ITEM[id],desc =Description[id])
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
    arr = []
    for _ in range(0, len(acc.invent)):
        if _ in PREM_ITEM.keys() and PREM_ITEM[_][hiderplace[PREM_ITEM[_][2]]]:
            if (PREM_ITEM[_][0] ==1 and not bool(int(acc.invent[_]))) : continue

            arr.append([_,int(bool(int(acc.invent[_])) or PREM_ITEM[_][0]==0) ]+list(PREM_ITEM[_]))

    print(arr)
    return render_template('shop.html', money = str(acc.money),vehicles = arr,lenvehicles = len(arr))
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
        acc = Account.query.filter_by(nickname=session['name']).first()
        avas = []
        for _ in range(0, len(acc.invent)):
            if _ in PREM_ITEM.keys() and bool(int(acc.invent[_])) and PREM_ITEM[_][2] == 'image':
                avas.append([PREM_ITEM[_][3],PREM_ITEM[_][1]])

        print(avas)
        return render_template('avimgs.html', avas = avas)
    else:
        acc = Account.query.filter_by(nickname=session['name']).first()
        if acc is None:
            session['logged'] = False
            return redirect('/login')
        acc.img = request.form['test']
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
    lvls = []
    for j in range(0,20):
        for i in PREM_ITEM.keys():
          #  print(j,PREM_ITEM[i][0],PREM_ITEM[lvlplace[PREM_ITEM[i][2]]])
            if PREM_ITEM[i][0] == 1 and PREM_ITEM[i][lvlplace[PREM_ITEM[i][2]]] == j+1:
                lvls.append([PREM_ITEM[i]])
                break
        if len(lvls) == j:
            lvls.append([])
    print(lvls)
    return render_template('account.html', lvlitems = lvls, ava = acc.img,maxlvl = 20,xppx = int(acc.xp/(acc.lvl**2+50*acc.lvl+100)*150), lvl = acc.lvl,xp = str(acc.xp)+'/'+str(acc.lvl**2+50*acc.lvl+100),money = str(acc.money), nickname = acc.nickname, kills=str(acc.kills), deaths = str(acc.deaths), time = (str(acc.playtime//3600)+'h')*int(acc.playtime//3600 !=0)+ str(acc.playtime%3600//60)+'m', KD=str(int(acc.kills/(acc.deaths+int(acc.deaths==0))*100)/100)*int(acc.deaths!=0)+'INVINCIBLE'*int(acc.deaths==0 and acc.kills>0)+'SIMPLETON'*int(acc.deaths==0 and acc.kills==0))
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
        arr = []
        colors = ''
        for _ in range(0,len(acc.invent)):

            if _ in PREM_ITEM.keys() and (bool(int(acc.invent[_])) or PREM_ITEM[_][0] == 0):
                if PREM_ITEM[_][2] == 'vehicle':
                    arr.append([_] + list(PREM_ITEM[_]))
                elif PREM_ITEM[_][2] == 'skin':
                    if colors =='':colors += str(PREM_ITEM[_][4])
                    else:
                        colors += ','+str(PREM_ITEM[_][4])
        m = acc.money
        servers = []
        for i in Servers.keys():
            servers.append([i, Servers[i]])
        # print(arr)
        return render_template('index.html',servers = servers, money = str(m),logged = logged, name = session['name'], passw = session['pswh'], colors = colors,vehicles = arr, lenvehicles = len(arr)) #,logged = logged, name = session['name']
    arr = []
    servers = []
    for i in Servers.keys():
        servers.append([i, Servers[i]])
    for _ in PREM_ITEM.keys():
        if PREM_ITEM[_][0] == 0 and PREM_ITEM[_][2] == 'vehicle': arr.append([_]+list(PREM_ITEM[_]))
    return render_template('index.html',servers = servers,logged = False, name = '', colors = '1,2,3,4',vehicles = arr,lenvehicles=len(arr),money = '',passw='')
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
        invent = ''
        for i in range(0,64):
            if i in PREM_ITEM.keys() and PREM_ITEM[i][0] ==0: invent += '1'
            else: invent+='0'
        account = Account(nickname = name, email = email, password = hashp, money = 10,invent = invent,awards = 32*'0')
        # veh = Vehicles(nickname = name,zepelin = True,carrier = True,rat=True,t28=True)
        try:
            db.session.add(account)
            # db.session.add(veh)
            db.session.commit()
            return redirect('/login')
        except:
            return 'НА СЕРВЕРЕ ПИЗДЕЦ'
    else:
        return render_template('register.html')
@app.errorhandler(404)
def err404(e):
    return render_template('error.html',reason = "Sorry", code = '404'), 404
@app.errorhandler(500)
def err500(e):
    return render_template('error.html',reason = "Sorry", code = '500'), 500
if __name__ == "__main__":
    app.run(host='80.68.156.140',port = 80) #26.223.93.1
