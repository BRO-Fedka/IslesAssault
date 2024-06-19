document.onkeydown=function(event) {
    if (event.keyCode == 9 || event.keyCode == 112 || event.keyCode == 114 ) {  //tab pressed
        event.preventDefault(); // stops its action
    }
}

document.getElementById("ServerAddress").value =document.getElementById("ServerSelect").value
function ZoomCorrection(){
    if (VIEW_X > 0 && VIEW_Y > 0){
    if (VIEW_X/VIEW_Y > GameW/GameH){
        if (Zoom < GameH/VIEW_Y/2){
            Zoom = GameH/VIEW_Y/2
//            console.log("XXXXX",GameW/VIEW_X/2)
        }
    }else{
        if (Zoom < GameW/VIEW_X/2){
//            console.log("YYYYY",GameH/VIEW_Y/2)
            Zoom = GameW/VIEW_X/2
        }
    }}
}
   //let svg = document.querySelector("svg");
let GameStatus = "MainMenu"
//let l0 = document.getElementById("SvgLayer0");
//let l1 = document.getElementById("SvgLayer1");
//let l2 = document.getElementById("SvgLayer2");
//let l3 = document.getElementById("SvgLayer3");
//let l4 = document.getElementById("SvgLayer4");
let BGLayers = [[0,"../static/BG1/BG.svg"],[0.0625,"../static/BG1/BG0.svg"],[ 0.03125,"../static/BG1/BG1.svg"],[0.015625,"../static/BG1/BG2.svg"],[ 0.0078125,"../static/BG1/BG3.svg"],[-0.00390625,"../static/BG1/BG4.svg"]]
function UpdateBG(e){
    MainScreen.innerHTML = ""
    for (let i = 0; i < BGLayers.length; i++) {
        MainScreen.innerHTML += '<div class="BGSVGLayer" id="SvgLayer'+i+'" style="background-image: url('+BGLayers[i][1]+');"></div>'
    }
}
UpdateBG()
document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);

function onMouseUpdate(e) {
  let x = e.pageX;
  for (let i = 0; i < BGLayers.length; i++) {
//        MainScreen.innerHTML += '<div class="BGSVGLayer" id="SvgLayer'+i+'" style="background-image: url('+UpdateBG[1]+');"></div>'
        document.getElementById("SvgLayer"+i).style.transform= 'translateX('+((x - window.innerWidth / 2) * BGLayers[i][0])*1920/window.innerWidth+'px)'
  }
//  let y = e.pageY;
//  l0.style.transform = 'translateX('+((x - window.innerWidth / 2) / 16)*1920/window.innerWidth+'px)';
//  l1.style.transform ='translateX('+((x - window.innerWidth / 2) / 32)*1920/window.innerWidth+'px)';
// l2.style.transform = 'translateX('+((x - window.innerWidth / 2) / 64)*1920/window.innerWidth+'px)';
//  l3.style.transform = 'translateX('+((x - window.innerWidth / 2) / 128)*1920/window.innerWidth+'px)';
// l4.style.transform = 'translateX('+((x - window.innerWidth / 2) / -256)*1920/window.innerWidth +'px)';
// console.log(window.innerWidth )
}
window.onresize = resize
function ExitGame(){
    Send = true
    messagebtn.innerText = "Global"
    messageinput.value = "/leave"
    setTimeout(function(){
        if (GameStatus == "InGame" ){

						GameStatus = "MainMenu"
						PlayersData = new Map()

                        let children = document.getElementById('Inventory').children;
                        for (let i = 0; i < children.length; i++) {
                          children[i].style.display = ""
                        }
                        document.getElementById('MainScreen').style.display = '';
                        document.getElementById('MainForm').style.display = '';
                        document.getElementById('AboutForm').style.display = '';
                        document.getElementById('UpdateName').style.display = '';
                        document.getElementById("chkInterfaceHide").checked = false
                        document.getElementById('SelectForm').style.display = '';
                        document.getElementById('NEbar').style.display = '';
                        chatview.innerHTML = ""
//                        PIXI.sound.play('MainMenuMusic');
                        StartMainMusicPlay = Date.now()
                        Players = []
                        socket.close();
        }
    },500)



}

let ParticlesProcessing = true
if (localStorage.getItem("SettingsParticlesChkVal") != '' && localStorage.getItem("SettingsParticlesChkVal") != null){
ParticlesProcessing = localStorage.getItem("SettingsParticlesChkVal")=='true'

}
document.getElementById('ParticlesChk').checked = ParticlesProcessing
document.getElementById("NameField").value = sessionStorage.getItem('NameFieldVal')
function ChSttSettings(){
    if (document.getElementById("SettingsForm").style.display == "none"){
        document.getElementById("SettingsForm").style.display = "block"
    }else{
        document.getElementById("SettingsForm").style.display = "none"
    }
}

function UpdtParticles(){

    ParticlesProcessing =  document.getElementById('ParticlesChk').checked
    localStorage.setItem("SettingsParticlesChkVal", document.getElementById('ParticlesChk').checked)

}
function UpdtVolumes(){

    let s =  document.getElementById('VolumeRange').value
    let m =  document.getElementById('MusicRange').value
    localStorage.setItem("SettingsVolumeRangeVal", s)
    localStorage.setItem("SettingsMusicRangeVal", m)
    PIXI.sound.volume('MainMenuMusic',m)
    PIXI.sound.volumeAll = s

    //MusicRange
}
var PlayerTags = new Map()
function NoTeamTag(name, updTags=true){
    if (name == undefined){
    return undefined
    }
    if (name.split("]").length > 1){
        if (updTags) PlayerTags.set(name.split("]")[1],name.split("]")[0].slice(1))
        return name.split("]")[1]

    }else{
        if (updTags) PlayerTags.set(name,null)
        return name
    }
}
let GameH = 0
let GameW = 0

PIXI.sound.add("bang","static\\bang.mp3")
PIXI.sound.add("wtrBang","static\\wtrBang.mp3")
PIXI.sound.add("lnchTrpd","static\\TorpedoLaunch.mp3")
PIXI.sound.add("lnchRckt","static\\RocketLaunch.mp3")
PIXI.sound.add("bombFall","static\\bombFall4s.mp3")

PIXI.sound.add("dmg0","static\\dmg\\0.mp3")
PIXI.sound.add("dmg1","static\\dmg\\1.mp3")
PIXI.sound.add("dmg2","static\\dmg\\2.mp3")
PIXI.sound.add("dmg3","static\\dmg\\3.mp3")

PIXI.sound.add("Sdmg0","static\\Sdmg\\0.mp3")
PIXI.sound.add("Sdmg1","static\\Sdmg\\1.mp3")
PIXI.sound.add("Sdmg2","static\\Sdmg\\2.mp3")

PIXI.sound.add("mcanon","static\\mcanon.mp3")
PIXI.sound.add("pcanon","static\\pcanon.mp3")
PIXI.sound.add("tcanon","static\\mcanon.mp3")
PIXI.sound.add("hcanon","static\\pcanon.mp3")
PIXI.sound.add("fcanon","static\\pcanon.mp3")
var cameraMode = false;
var Players=[];
var TorpedosData = new Map();
var AARocketsData = new Map();
var BombsData = new Map();
var BulletsData = new Map();
var SmokesData = new Map();
var ColorPack = 'Summer';
var Vehicles;
var PlayersData = new Map();
var VehList;
var VIEW_X = 0
var VIEW_Y = 0
var PlayerName;
var CurVehicle;
var Zones = '';
function BangPrt0(x, y,dir = Math.random()*2*Math.PI) {
	this.x=x;
	this.y=y;
	this.life=1;
	this.dir = Math.random()*2*Math.PI;
	this.xs = Math.cos(dir);
	this.ys = Math.sin(dir);
	this.rad = 1;
}

function CanPrt0(x, y,dir = Math.random()*2*Math.PI) {
	this.x=x;
	this.y=y;
	this.life=1;
	this.xs = Math.cos(dir);
	this.ys = Math.sin(dir);
	this.rad = 1;
}
function WtrPrt0(x, y) {
	this.x=x;
	this.y=y;
	this.life=1;
	this.rad = Math.random()+1;
}
function RcktTPrt0(x, y) {
	this.x=x;
	this.y=y;
	this.life=1;
	this.rad = Math.random()+0.25;
}
function Particle0(x, y, xs, ys,rad) {
	this.x=x;
	this.y=y;
	this.xs=xs;
	this.ys=ys;
	this.life=1.5;
	this.rad = rad
}
function TrcrPrt1(x, y,x1,y1,cl = 1) {
	this.x=x;
	this.y=y;
	this.life=1;
	this.cl = cl;
	this.x1=x1;
	this.y1=y1;

}
function onWheel(e){
    if (e.deltaY > 0){
        Zoom -= 10
    }else{
        Zoom += 10
    }
//    if (Zoom < 80){Zoom = 80}
    if (Zoom > 640){Zoom = 640}

    ZoomCorrection()
}
function ShowPrevVeh(){
    sessionStorage.setItem('VehicleSelectVal',document.getElementById('VehicleSelect').value)
    //console.log(document.getElementById('VehicleSelect').value)
//    document.getElementById('VehicleSelect').value
	for (let _ of VehList) {
        if(_[1]==document.getElementById('VehicleSelect').value){
            document.getElementById('vehprev').src = _[2];

            document.getElementById('ShopVehLink').href = location.href+"shop/"+_[3]


            break;
        }
	}
}
function FirePrt0(x, y, rad = 1) {
        this.x=x;
        this.y=y;
        this.deg= Math.random()*2*Math.PI;
        this.dir= Math.random()*2*Math.PI;
        this.life=60;
        this.dirspd = 0
        this.cof = 0.5 + Math.random()
        this.speed = 0.5/2+ 0.5/2*Math.random();
        this.rad = (5 + Math.random()*5)*rad
    }
function Particle1(x, y, deg,speed,rad) {
	this.x=x;
	this.y=y;
	this.deg=deg;
	this.life=1.5;
	this.speed = speed;
	this.rad = rad
}
function Particle2(W,H) {
	this.x= Math.random()*W;
	this.y= Math.random()*H;
	this.r= 8-Math.floor(Math.sqrt(Math.sqrt(Math.random()*256))*2);
	this.d= 1+Math.random()*0.25;
	this.ra = Math.random()*Math.PI*2;
	this.as = -0.1 + Math.random()*0.2;
}

function Particle3(id) {
    this.id =id;
    this.hp = 500+Math.random()*500
    this.cl = Math.random()*64+191;
	this.h= Math.random();
    this.dir = (Math.random()*2-1)*Math.PI;
    this.spd = Math.random()*2 -1;
}
function Particle4() {
	this.x= Math.random()*(GameW+500)-250;
	this.y= Math.random()*(GameH+500)-250;
	this.dir= Math.random()*360
	this.life = 0.01
}
function GetServerInfo(){
            try{
                let soc = new WebSocket(document.getElementById('ServerAddress').value);

                soc.addEventListener('open', function (event) {
                    console.log('!');
                    soc.send('info');
                });

                function taken(event) {
                    console.log(event.data)
                    var data = JSON.parse(event.data);
                    console.log(data)
                    document.getElementById('impprev').src = data.map;
                    document.getElementById('Map').src = data.map;
                    document.getElementById('online').innerHTML = "Players: "+data.online;
                    document.getElementById('text').innerHTML = data.text;
                    console.log(data.js)
                    console.log(document.getElementById('prevmpjs').src)
                    document.getElementById('prevmpjs').src = data.js;
                    BGLayers = data.bg;
                    UpdateBG()
                    VIEW_X = data.VIEW_X
                    VIEW_Y = data.VIEW_Y
                    VehList = data.vehicleAvailable;
                    document.getElementById('VehicleSelect').innerHTML = "";

                    let justbool = true
                    for (let _ of VehList) {
                        document.getElementById('VehicleSelect').innerHTML+='<option value = "'+_[1]+'">'+_[0]+'</option>'
                        if (Number(_[1]) == Number(sessionStorage.getItem('VehicleSelectVal')) ){
                        justbool = false
                        }
                    }

                    if (justbool || sessionStorage.getItem('VehicleSelectVal') =='' ||sessionStorage.getItem('VehicleSelectVal') ==null ){
                        console.log(data.vehicleAvailable[0][1])
                        document.getElementById('VehicleSelect').value = data.vehicleAvailable[0][1]

                    }else{
                        document.getElementById('VehicleSelect').value = sessionStorage.getItem('VehicleSelectVal')
                    }


                    ShowPrevVeh();
                }

                soc.addEventListener('message', taken);
			}catch{
                document.getElementById("online").innerHTML = "?/?"
                document.getElementById("text").innerHTML = "No information yet"
                document.getElementById("impprev").src = ""
			}
}
var MAPstatic = {
'*':[],
'B':[],
'Z':[],
'G':[],
'S':[],
'_':[],
'CT':{
        weather:"Clear",
		sf: '#000',
		ss: '#000',
		bg:'#000',
		zs:'#000',
		zf:'#000',
		bf:'#000',
		bs:'#000',
		gf:'#000',
		gs:'#000',
		o0:'#000',
		o1:'#000',
		l0:'#000',
		l1:'#000',
		b0:'#000',
		b1:'#000',
		b2:'#000',
		fs:"rgba(0,0,0,0)",
		os:"rgba(0,0,0,0)",

	}
};
var FColors = new Map()
function AddFColor(clval, cl){
FColors.set(Number(clval),cl)

}
let Zoom = 320
let currentZoom = 320
let socket = null

function startgame() {

    GameStatus = "InGame"
    PIXI.sound.stop('MainMenuMusic')
	if (true) {

		canvas.addEventListener("mousedown", mclick, false);
		document.addEventListener("mouseup", mrelease, false);
		document.addEventListener('mousemove', mousepos, false);
		document.addEventListener('fullscreenchange', fresize  );
		// map.addEventListener('wheel', mapsize);
		// map.addEventListener('mousemove', mapmove);
		// map.addEventListener('mouseout',mapout);
		document.addEventListener('keydown',keydown);
		document.addEventListener('keyup', keyup);
		messagefield.addEventListener("focusout",mifo)
		document.addEventListener("wheel", onWheel);

		try {
//console.log('1')
			socket = new WebSocket(document.getElementById('ServerSelect').value);
//			console.log('2')
			socket.addEventListener('open', function (event) {

				socket.send('n'+nicknameinput.value+'\n'+document.querySelector('input[name="color"]:checked').value+'\n'+document.getElementById('VehicleSelect').value+'\n'+document.getElementById('NICK').innerText+'\n'+document.getElementById('PASS').innerText);
				vehicle = Number(document.getElementById('VehicleSelect').value)

			});
			function taken(event) {
//			    console.log(event.data)
				if (event.data[0] == 'E'){
				    GameStatus= "Error"
//				    console.log('EEEEEEEEEEEEE')
					document.getElementById('TitleScreen').classList = ['titlescrh']
					document.getElementById('MainScreen').style.display = '';
					document.getElementById('MainForm').style.display = '';
					document.getElementById('UpdateName').style.display = '';
					document.getElementById('AboutForm').style.display = '';
					document.getElementById('SelectForm').style.display = '';
					document.getElementById("chkInterfaceHide").checked = false
					document.getElementById('NEbar').style.display = '';
//					document.getElementById('MoneyNum').style.display = 'flex';
					alert( event.data.split(',')[1])
				}else if(event.data[0] == 'M'){
//				console.log(event.data.substring(1))

                    document.getElementById('TitleScreen').classList = ['titlescrh']
                    var xmlHttp = new XMLHttpRequest();
                    xmlHttp.open( "GET", event.data.substring(1), false ); // false for synchronous request
                    xmlHttp.send( null );
//                    console.log("!!!!!!!!!gdasg")
                    MAPstatic = JSON.parse(xmlHttp.responseText);
                //				console.log(MAPstatic)
                    WH = MAPstatic['WH']
                //				console.log(MAPstatic)
                    ZonesNum.innerHTML = ''
                    for(let _ = 0; _ < MAPstatic['*'].length; _++){
                        ZonesNum.innerHTML += '<div class="Zone" style="background-color: red" id="zone'+_ +'"><b>'+MAPstatic['*'][_][0]+'</b></div>'
                    }
                    socket.send((input.get('m0') || dobleinput.get('m0')  ? 1 : 0).toString()+(input.get(87) || dobleinput.get(87) ? 1 : 0).toString()+(input.get(65) || dobleinput.get(65) ? 1 : 0).toString()+(input.get(83) || dobleinput.get(83) ? 1 : 0).toString()+(input.get(68) || dobleinput.get(68) ? 1 : 0).toString()+(input.get(32) || dobleinput.get(32) ? 1 : 0).toString()+(input.get(71) || dobleinput.get(71) ? 1 : 0).toString()+(input.get('Tab') ? 1 : 0).toString()+(Cmod ? 1 : 0).toString()+(Xmod ? 1 : 0).toString()+(curView).toString()+((mouseX-GameW/2)/Zoom).toString()+','+((mouseY-GameH/2)/Zoom).toString());
                //
//                    document.body.innerHTML += '<script type="text/javascript" id="MapJSON" src="'+event.data.substring(1)+'" onload = "onMapJSONLoad()"></script>'
//                    console.log(document.getElementById("MapJSON"))

//                    document.getElementById("MapJSON").src = event.data.substring(1)



//                    document.getElementById("MapJSON").onload = onMapJSONLoad
				}
				else if (event.data[0] == 'D'){

						GameStatus = "MainMenu"
						PlayersData = new Map()

                        let children = document.getElementById('Inventory').children;
                        for (let i = 0; i < children.length; i++) {
                          children[i].style.display = "none"
                        }
                        document.getElementById('MainScreen').style.display = '';
                        document.getElementById('MainForm').style.display = '';
                        document.getElementById("chkInterfaceHide").checked = false
                        document.getElementById('UpdateName').style.display = '';
                        document.getElementById('AboutForm').style.display = '';
                        document.getElementById('SelectForm').style.display = '';
                        document.getElementById('NEbar').style.display = '';
                        chatview.innerHTML = ""
//                        PIXI.sound.play('MainMenuMusic');
                        StartMainMusicPlay = Date.now()
                        Players = []
                        socket.close();
//						location.reload();

				}else if (event.data[0] == 'R'){
						socket.close();
						SaveMusicPos()
						location.replace(event.data.slice(1));


				}else {

 					MSGTKNDT = new Date();
					INFO = event.data;

					PING = Date.now() - LastPING;
					LastPING = Date.now();
//					console.log(PING)
//                    console.log(Date.now())
//                    console.log(INFO)
					let infarr = INFO.split('\n');
					let grad = null;

					Players = []
					splstr = infarr[0].split(',')
					PlayerTags = new Map()
					PlayerName = splstr[1]
					CurVehicle = splstr[0]
					Money = splstr[2]
					Zones = splstr[splstr.length -1].toString()
					for(let _ = 0; _ < Zones.length; _++){
                        let tmp = document.getElementById("zone"+_.toString());
                        if (Zones[_] == '1'){
                            tmp.style.background = '#44f'
                        }else{
                            tmp.style.background = '#f00'
                        }
					}
//					console.log("!!!")
//					console.log(Zones)

//                    if(Zoom == undefined){
//                        Zoom = 320
////                        console.log('!')
//                    }
					argarr = []
					for (let _ = 3; _ < splstr.length; _++){
                                argarr.push(splstr[_])
					}
                    if (!(PlayerName=="" || PlayerName == undefined)){
                    PlayerName = splstr[1].split(']')[splstr[1].split(']').Count - 1]
                        Players.push([PlayerName,CurVehicle]);
//                        console.log (CurVehicle)
//                        console.log (Vehicles)
                        Vehicles[CurVehicle].updatep(NoTeamTag(PlayerName),argarr)
                    }
					if(!(moneyb == null)) {
						moneyb.innerText = Money
						// console.log('!')
					}
					PlayerMark.style.left = (X/WH*100).toString()+'%'
					PlayerMark.style.top = (Y/WH*100).toString()+'%'
//					hp.innerHTML = infarr[0].split(',')[6]+'/'+infarr[0].split(',')[7]
					if (infarr[0].split(',')[6]==0 && false){

						BURNING = true
					}

					let ceilswas = false;
					OBJs.shift()
					OBJs.push(new Map([
						['b',new Map()],
						['z',new Map()],
						['g',new Map()],
						['f',new Map()],
						['e',new Map()],
						['o',new Map()],
						['|',new Map()],
						['k',new Map()],
						['m',new Map()],
						['n',new Map()],
						['>',new Map()],
						['s',new Map()],
						['<',new Map()],
						['*',new Map()],
						['p',new Map()],
						['_',new Map()]
					]));
					for (let h = 1; h < infarr.length; h++) {
						let larr =infarr[h].split(',');
						// console.log(larr[0])
						if (larr[0] == 'k'){
							if (MSGs.indexOf(Number(larr[3]))==-1){
								let div = document.createElement('div');
								div.className = "MSGk";
								div.innerHTML = "<b>"+larr[1]+"</b> destroyed <b>"+larr[2]+"</b>";
								chatview.append(div);
								MSGs.push(Number(larr[3]))
							}
						}else if (larr[0] == 'l'){
							if (MSGs.indexOf(Number(larr[2]))==-1){
								let div = document.createElement('div');
								div.className = "MSGl";
								div.innerHTML = larr[1]
								chatview.append(div);
								MSGs.push(Number(larr[2]))
							}
						}else 	if (larr[0] == '+' ){
                            PN = larr[1]
                            CV = larr[2]
//                            console.log(larr)
                            argarr = []
                            for (let _ = 3; _ < larr.length; _++){

                                        argarr.push(larr[_])
                            }
//                            console.log(argarr)
                            if (!(PN=="" || PN == undefined)){
                                Players.push([PN,CV]);
                                Vehicles[CV].update(NoTeamTag(PN),argarr)
                            }
						}else 	if (larr[0] == 'a' ){
							ammo.set('120mm',Number(larr[1]));
							ammo.set('45mm',Number(larr[2]));
							ammo.set('20mm',Number(larr[3]));
							ammo.set('8mm',Number(larr[4]));
							num120.innerHTML = '<span>120mm</span>' + larr[1];
							num45.innerHTML = '<span>45mm</span>' + larr[2];
							num20.innerHTML = '<span>20mm</span>' + larr[3];
							num8.innerHTML = '<span>8mm</span>' + larr[4];
							if(larr[1] =='0'){
							num120.className = 'unselectable ammonum NumAmmo0';
							}else{
							num120.className = 'unselectable ammonum NumAmmo';
							}
							if(larr[2] =='0'){
							num45.className = 'unselectable ammonum NumAmmo0';
							}else{
							num45.className = 'unselectable ammonum NumAmmo';
							}
							if(larr[3] =='0'){
							num20.className = 'unselectable ammonum NumAmmo0';
							}else{
							num20.className = 'unselectable ammonum NumAmmo';
							}
							if(larr[4] =='0'){
							num8.className = 'unselectable ammonum NumAmmo0';
							}else{
							num8.className = 'unselectable ammonum NumAmmo';
							}
						}else 	if (larr[0] == 'g' && larr.length > 3){
								if (MSGs.indexOf(Number(larr[3]))==-1){
								let div = document.createElement('div');

								div.className = "crewMSG";

								//+<a onclick="Send = true; messageinput.value = \''+ '/team join '+larr[_].split(']')[0].slice(1)+'\';">[' + larr[_].split(']')[0].slice(1)+ "]</a>"+larr[_].split(']')[1]

                                div.innerHTML = "<b>"+larr[1]+"</b> "+larr[2];


								chatview.append(div);
								div.scrollIntoView();
								MSGs.push(Number(larr[3]))
							}
						}else 	if (larr[0] == 'c'){
                            if (MSGs.indexOf(Number(larr[1]))==-1){
                                if (Number(larr[2]) == 0){
                                    let div = document.createElement('div');
                                    div.className = "TeamMSG";
                                    div.innerHTML = "Requested to join <b>"+larr[3]+"</b>";
                                    chatview.append(div);
                                    MSGs.push(Number(larr[1]))
                                }else if((larr[2]) == '1'){
                                    let div = document.createElement('div');
                                    div.className = "ErrMSG";
                                    div.innerHTML = "No such team !";
                                    chatview.append(div);
                                    MSGs.push(Number(larr[1]))
                                }else if((larr[2]) == '2'){
                                    let div = document.createElement('div');
                                    div.className = "ErrMSG";
                                    div.innerHTML = "You are already in team, if you want to leave type <b>/team leave</b> !";
                                    chatview.append(div);
                                    MSGs.push(Number(larr[1]))
                                }else if ((larr[2]) == '3'){
                                    let div = document.createElement('div');
                                    div.className = "ErrMSG";
                                    div.innerHTML = "Team <b>"+larr[3]+"</b> already exists !";
                                    chatview.append(div);
                                    MSGs.push(Number(larr[1]))
                                }else if ((larr[2]) == '4'){
                                    let div = document.createElement('div');
                                    div.className = "TeamMSG";
                                    div.innerHTML = "Team <b>"+larr[3]+"</b> was successfully created !";
                                    chatview.append(div);
                                    MSGs.push(Number(larr[1]))
                                }else if((larr[2]) == '5'){
                                    let div = document.createElement('div');
                                    div.className = "ErrMSG";
                                    div.innerHTML = "You are alone, you can't leave team !";
                                    chatview.append(div);
                                    MSGs.push(Number(larr[1]))
                                }else if((larr[2]) == '6'){
                                    let div = document.createElement('div');
                                    div.className = "ErrMSG";
                                    div.innerHTML = "No permission to use this command !";
                                    chatview.append(div);
                                    MSGs.push(Number(larr[1]))
                                }else if((larr[2]) == '7'){
                                    let div = document.createElement('div');
                                    div.className = "ErrMSG";
                                    div.innerHTML = "You can't kick yourself, use <b>/team leave</b> !";
                                    chatview.append(div);
                                    MSGs.push(Number(larr[1]))
                                }else if ((larr[2]) == '8'){
                                    let div = document.createElement('div');
                                    div.className = "KickMSG";
                                    div.innerHTML = "Player <b>"+larr[3]+"</b> was kicked from team";
                                    chatview.append(div);
                                    MSGs.push(Number(larr[1]))
                                }else if ((larr[2]) == '9'){
                                    let div = document.createElement('div');
                                    div.className = "KickMSG";
                                    div.innerHTML = "Welcome the new team member <b>"+larr[3]+"</b>";
                                    chatview.append(div);
                                    MSGs.push(Number(larr[1]))
                                }else if((larr[2]) == 'a'){
                                    let div = document.createElement('div');
                                    div.className = "ErrMSG";
                                    div.innerHTML = "You are alone, you have no teammates !";
                                    chatview.append(div);
                                    MSGs.push(Number(larr[1]))
                                }else if((larr[2]) == 'b'){
                                    let div = document.createElement('div');
                                    div.className = "TeamMSG";
                                    div.innerHTML = "You succesfully left team !";
                                    chatview.append(div);
                                    MSGs.push(Number(larr[1]))
                                }


                            }
                        }else 	if (larr[0] == 'm'){
							// console.log('!')

							if (MSGs.indexOf(Number(larr[3]))==-1){
								let div = document.createElement('div');
								if (larr[1] == "[SERVER]"){
								    div.className = "ServerMSG";
								}else{
								    div.className = "MSG";
								}
								//+<a onclick="Send = true; messageinput.value = \''+ '/team join '+larr[_].split(']')[0].slice(1)+'\';">[' + larr[_].split(']')[0].slice(1)+ "]</a>"+larr[_].split(']')[1]
                                if (larr[1].split(']').length >1 && larr[1] != "[SERVER]"){
//                                    console.warn("!!!!")
                                    div.innerHTML = '<b><a onclick="Send = true;messagebtn.innerText = "Global"; messageinput.value = \'/team join '+larr[1].split(']')[0].slice(1)+'\';">['+larr[1].split(']')[0].slice(1) +"]</a>" +larr[1].split(']')[1]+'</b> ' +larr[2];
                                }else{
                                    div.innerHTML = "<b>"+larr[1]+"</b> "+larr[2];
                                }

								chatview.append(div);
								div.scrollIntoView();
								MSGs.push(Number(larr[3]))
							}
							//<
						}else 	if (larr[0] == 'p'){

                            if (larr.length > 3){
//                            console.log('!')
                                if (!(SmokesData.has(larr[1]))){
//                                console.log(Number(larr[6])/3.75,Number(larr[6])*PING/1000*2)
                                SmokesData.set(larr[1],[Number(larr[2]),Number(larr[3]),Date.now(),false,[]])
                                }
                            }else{
//                            console.log('!dis')
                            try{
                                SmokesData.get(larr[1])[3] = true
                            }catch{}
                            }

						}else 	if (larr[0] == 'b'){

                            if (larr.length > 3){
//                            console.log('!')
                                if (!(BombsData.has(larr[1]))){
//                                console.log(Number(larr[6])/3.75,Number(larr[6])*PING/1000*2)
                                BombsData.set(larr[1],[Number(larr[2]),Number(larr[3]),Number(larr[4]),Number(larr[5]),Number(larr[6]),Number(larr[7]),Date.now(),false,Number(larr[8])])
                                }
                            }else{
//                            console.log('!dis')
                            try{
                                BombsData.get(larr[1])[4] = larr[2]
                                BombsData.get(larr[1])[7] = true
                            }catch{}
                            }
						}else 	if (larr[0] == 'r'){

                            if (larr.length > 3){
//                            console.log('!')
                                if (!(AARocketsData.has(larr[1]))){
//                                console.log(Number(larr[6])/3.75,Number(larr[6])*PING/1000*2)
                                AARocketsData.set(larr[1],[Number(larr[2]),Number(larr[3]),Number(larr[4]),Number(larr[5]),Number(larr[6]),false,Number(larr[2])-Math.cos(Number(larr[4])/180*Math.PI)*Number(larr[6])*PING/1000*3,Number(larr[3])-Math.sin(Number(larr[4])/180*Math.PI)*Number(larr[6])*PING/1000*3,Date.now()-1.5*PING,Number(larr[7])])
                                }
                            }else{
//                            console.log('!dis')
                            try{
                                AARocketsData.get(larr[1])[3] = larr[2]
                                AARocketsData.get(larr[1])[5] = true
                            }catch{}
                            }
						}else 	if (larr[0] == '<'){

                            if (larr.length > 3){
//                            console.log('!')
                                if (!(TorpedosData.has(larr[1]))){
//                                console.log(Number(larr[6])/3.75,Number(larr[6])*PING/1000*2)
                                TorpedosData.set(larr[1],[Number(larr[2]),Number(larr[3]),Number(larr[4]),Number(larr[5]),Number(larr[6]),false,Number(larr[2])-Math.cos(Number(larr[4])/180*Math.PI)*Number(larr[6])*PING/1000*3,Number(larr[3])-Math.sin(Number(larr[4])/180*Math.PI)*Number(larr[6])*PING/1000*3,Date.now()])
                                }
                            }else{
//                            console.log('!dis')
                            try{
                                TorpedosData.get(larr[1])[3] = larr[2]
                                TorpedosData.get(larr[1])[5] = true
                            }catch{}
                            }
						}else 	if (larr[0] == '>'){

                            if (larr.length > 3){
//                            console.log('!')
                                if (!(BulletsData.has(larr[1]))){
//                                console.log(larr[2],larr[3])
//                                 PlayersData[player]['STR'] += f'\n>,{_},{(Bullets[_][2])},{Bullets[_][3]},{Bullets[_][7]},{Bullets[_][14]+int(Bullets[_][16]==player)*2},{Bullets[_][17]},{Bullets[_][8]},{Bullets[_][9]}' spd -> w
                                BulletsData.set(larr[1],[Number(larr[2]),Number(larr[3]),Number(larr[4]),Number(larr[5]),Number(larr[6]),Number(larr[7]),Number(larr[8]),false,Number(larr[2]),Number(larr[3]),Date.now(),0])
                                }
                            }else{
//                            console.log('!dis')
                            try{
                                BulletsData.get(larr[1])[3] = larr[2]
                                BulletsData.get(larr[1])[7] = true
                            }catch{}
                            }
//							if (MSGs.indexOf(Number(larr[2]))==-1){
//								let div = document.createElement('div');
//								div.className = "MSGj";
//								div.innerHTML = '<img src="static/checkmark.svg" onclick="Send = true; messageinput.value = \''+ '/team accept '+larr[1]+'\'; this.parentNode.remove()">' + '   '+larr[1];
//								chatview.append(div);
//								div.scrollIntoView();
//								MSGs.push(Number(larr[2]))
//							}
						}else 	if (larr[0] == 'j'){
							// console.log('!')

							if (MSGs.indexOf(Number(larr[2]))==-1){
								let div = document.createElement('div');
								div.className = "MSGj";
								div.innerHTML = '<img src="static/checkmark.svg" onclick="Send = true; messageinput.value = \''+ '/team accept '+larr[1]+'\'; this.parentNode.remove()">' + '   '+larr[1];
								chatview.append(div);
								div.scrollIntoView();
								MSGs.push(Number(larr[2]))
							}
						}else 	if (larr[0] == 't') {
							tab.innerHTML = '';
							let tbl = document.createElement('table');

							for (let _ = 1; _ < larr.length; _ += 2) {
							//onclick="Send = true; messageinput.value = \''+ '/team accept '+larr[1]+'\'; this.parentNode.remove()"
							    if (larr[_].split(']').length > 1){
								tbl.innerHTML += '    <tr class=\"bg' + ((_ - 1) / 2 % 2) + '\">\n' +
									'        <td><b><a onclick="Send = true;messagebtn.innerText = "Global"; messageinput.value = \''+ '/team join '+larr[_].split(']')[0].slice(1)+'\';">[' + larr[_].split(']')[0].slice(1)+ "]</a>"+larr[_].split(']')[1] + '</b></td>\n' +
									'        <td class=\"td2\"><b>' + larr[_ + 1] + '</b></td>\n' +
									'    </tr>'

							    }else{
								tbl.innerHTML += '    <tr class=\"bg' + ((_ - 1) / 2 % 2) + '\">\n' +
									'        <td><b>' + larr[_] + '</b></td>\n' +
									'        <td class=\"td2\"><b>' + larr[_ + 1] + '</b></td>\n' +
									'    </tr>'

							    }

							}
							tab.appendChild(tbl);
							input.set('Tab', false);
							// console.log(tbl.innerHTML)
						}else{
						    try{
//                                console.log(larr)
                                OBJs[1].get(larr[0]).set(larr[1],[])
                                for (let i = 2; i < larr.length; i++) {
                                    if (isNaN(larr[i])){
                                        OBJs[1].get(larr[0]).get(larr[1]).push(larr[i]);
                                    }else{
                                        OBJs[1].get(larr[0]).get(larr[1]).push(Number(larr[i]));
                                    }
                                }
                                }catch{}
						}

					}
					dellarr = []
					for (var [key, value] of PlayersData) {
//					    console .log(key,value)
					    b = true
					    for (_ of Players){
//					        console .log(_, _[0] == key)
					        if (_[0] == key){
					        b = false
					        }
					    }
                       if (b){
//                            console.log('del',key)
                            dellarr.push(key)
                       }
                    }
                    while (dellarr.length > 0){
                        PlayersData.delete(dellarr[0])
                        dellarr.shift()
                    }


					// console.log(String(OBJs[0].get('b').size))
					// console.log(String(OBJs[1].get('b').size))

					if (Send == true){
					    if(messagebtn.innerText == "Team"){
					    socket.send((input.get('m0') || dobleinput.get('m0')  ? 1 : 0).toString()+(input.get(87) || dobleinput.get(87) ? 1 : 0).toString()+(input.get(65) || dobleinput.get(65) ? 1 : 0).toString()+(input.get(83) || dobleinput.get(83) ? 1 : 0).toString()+(input.get(68) || dobleinput.get(68) ? 1 : 0).toString()+(input.get(32) || dobleinput.get(32) ? 1 : 0).toString()+(input.get(71) || dobleinput.get(71) ? 1 : 0).toString()+(input.get('Tab') ? 1 : 0).toString()+(Cmod ? 1 : 0).toString()+(Xmod ? 1 : 0).toString()+(curView).toString()+((mouseX-GameW/2)/Zoom).toString()+','+((mouseY-GameH/2)/Zoom).toString()+',m/team chat '+messageinput.value);
					    }else{
					    socket.send((input.get('m0') || dobleinput.get('m0')  ? 1 : 0).toString()+(input.get(87) || dobleinput.get(87) ? 1 : 0).toString()+(input.get(65) || dobleinput.get(65) ? 1 : 0).toString()+(input.get(83) || dobleinput.get(83) ? 1 : 0).toString()+(input.get(68) || dobleinput.get(68) ? 1 : 0).toString()+(input.get(32) || dobleinput.get(32) ? 1 : 0).toString()+(input.get(71) || dobleinput.get(71) ? 1 : 0).toString()+(input.get('Tab') ? 1 : 0).toString()+(Cmod ? 1 : 0).toString()+(Xmod ? 1 : 0).toString()+(curView).toString()+((mouseX-GameW/2)/Zoom).toString()+','+((mouseY-GameH/2)/Zoom).toString()+',m'+messageinput.value);
					    }
						messageinput.value = ''
						Send=false
					}else{
						socket.send((input.get('m0') || dobleinput.get('m0')  ? 1 : 0).toString()+(input.get(87) || dobleinput.get(87) ? 1 : 0).toString()+(input.get(65) || dobleinput.get(65) ? 1 : 0).toString()+(input.get(83) || dobleinput.get(83) ? 1 : 0).toString()+(input.get(68) || dobleinput.get(68) ? 1 : 0).toString()+(input.get(32) || dobleinput.get(32) ? 1 : 0).toString()+(input.get(71) || dobleinput.get(71) ? 1 : 0).toString()+(input.get('Tab') ? 1 : 0).toString()+(Cmod ? 1 : 0).toString()+(Xmod ? 1 : 0).toString()+(curView).toString()+((mouseX-GameW/2)/Zoom).toString()+','+((mouseY-GameH/2)/Zoom).toString());
					}
					SENDB = ''
					SENDS = ''
					dobleinput.set(87,false);
					dobleinput.set(65,false);
					dobleinput.set(83,false);
					dobleinput.set(68,false);
					dobleinput.set(32,false);
					dobleinput.set(71,false);
					dobleinput.set('m0',false);
					input.set('Tab',false)
			}}
			socket.addEventListener('message', taken);
			socket.onerror =  function (e) {
				document.getElementById('TitleScreen').classList = ['titlescrh']
				document.getElementById('MainScreen').style.display = '';
				document.getElementById('MainForm').style.display = '';
				document.getElementById('UpdateName').style.display = '';
				document.getElementById('AboutForm').style.display = '';
				document.getElementById('SelectForm').style.display = '';
				document.getElementById('NEbar').style.display = '';
				document.getElementById("chkInterfaceHide").checked = false
				console.log('ERROR')
			}
			document.getElementById('MainScreen').style.display = 'none';
			document.getElementById('MainForm').style.display = 'none';
			document.getElementById('UpdateName').style.display = 'none';
			document.getElementById('AboutForm').style.display = 'none';
			document.getElementById('SelectForm').style.display = 'none';

			document.getElementById('NEbar').style.display = 'none';
		} catch (err){
//		    console.log()
		    console.log(err,err.stack)
			document.getElementById('MainForm').style.display = 'none';
			document.getElementById('UpdateName').style.display = 'none';
			// document.getElementById('ErrorForm').style.display = 'block';
		}
	}
}
let curView = 0
let Xmod = false
let Cmod = false
let LoadScrHidn = false
let ShakeXbnds = 0
let ShakeYbnds = 0
let SENDB = ''
let SENDS = ''
let X=16
let Y =16
let nX=16
let Z = 0
let speed = 0;
let nY =16
let Deg = 0
let newDeg = 0
let vehicle = 0
let WH =32

// let LastFPS = Date.now()
let OffsetX = 0
let OffsetY=0
//let isHPlowSND = false
//let WadImported = true
//let HPlowSND = null



document.getElementById('VolumeRange').value = localStorage.getItem('SettingsVolumeRangeVal')
document.getElementById('MusicRange').value = localStorage.getItem('SettingsMusicRangeVal')
UpdtVolumes()
let MSGTKNDT = new Date();
let FPS = 30;
let PING = 0;
let LastPING = Date.now();
let Send = false;
let hp = document.getElementById('HPNum');
//let hpbar = document.getElementById('HPBar')
let ZonesNum = document.getElementById('Zones');
let moneyb = document.getElementById('MoneyB');
let gasnum = document.getElementById('GasNum');
let spdnum = document.getElementById('SpdNum');
let dirnum = document.getElementById('DirNum');
let tornum = document.getElementById('TorNum');
let aarnum = document.getElementById('AARocketNum');
let bmbnum = document.getElementById('BombNum');
let carrynum = document.getElementById('CarryNum');
let smknum = document.getElementById('SmkNum');
let tracernum = document.getElementById('TracerNum');
let num120 = document.getElementById('Num120');
let num45 = document.getElementById('Num45');
let num20 = document.getElementById('Num20');
let num8 = document.getElementById('Num8');
let xmodnum = document.getElementById('XmodNum');
let cmodnum = document.getElementById('CmodNum');
let PlayerMark = document.getElementById('PlayerMark');
let xnum = document.getElementById('XNum');
let ynum = document.getElementById('YNum');
let canvas = document.getElementById('MainCanvas');
let chatview = document.getElementById('ChatView');
let map = document.getElementById('MapForm');
//let gmenu = document.getElementById('GameMenuForm');
let mapimg = document.getElementById('Map');
let tab = document.getElementById('TabForm');
let moneys = document.getElementById('MoneyB');
// let clans = document.getElementById('ClanForm');
// let clansi = document.getElementById('ClanInput');
let nicknameinput = document.getElementById('NameField');
let messageinput = document.getElementById('MessageFieldTxt');
messageinput.onkeydown = function (event){
    if (event.keyCode == 9 || event.keyCode == 17) {
        if (messagebtn.innerText == "Global"){
            messagebtn.innerText = "Team"
        }else{
            messagebtn.innerText = "Global"
        }
    }
}
let messagefield = document.getElementById('MessageField');
let messagebtn = document.getElementById('MessageFieldBtn');
let mapimgwh = 100
let mapimgrect =null

let ctx = canvas.getContext('2d');
ctx.globalCompositeOperation='xor';

resize();
let BURNING = false;
WtrParticles0 = [];
let RainParticles0 = [];
let RainParticles0max = 500;
let SnowParticles0 = [];
let SnowParticles0max = 100;
let FireParticles0 = [];
let FireParticles1 = [];
let FireParticles2 = [];
let RocketTraceParticles = [];
let CanBangParticles0 = [];
let CanBangParticles1 = [];
let FireParticles0max = 20;
let FireParticles0speed= 0.25;
let FireParticles0size = 3;
let WtrBangParticles0 = [];
let BangParticles0 = [];
let BangParticles1 = [];
let BangParticles2 = [];
let SmokeParticles0 = [];
let SmokeParticles0rate = 60;
let TracerParticles1 = [];
//let availablecolors = document.getElementById('ColorMenu').innerText.split(',')
//for (let _ = 0; _ < availablecolors.length; _ += 1) {
//availablecolors[_] = Number(availablecolors[_])
//}
//let activecl = availablecolors[0]
function changeColor(){
sessionStorage.setItem("SelectedCL",document.querySelector('input[name="color"]:checked').value)

}
try{
document.querySelector('input[name="color"][value="'+ sessionStorage.getItem("SelectedCL")+'"]').checked = true
}
catch{}
//if (availablecolors.indexOf(activecl) == -1){
//activecl = availablecolors[0]
//}
//
//}catch{
//activecl = availablecolors[0]
//}
//document.getElementById('ColorMenu').innerHTML = ''
//console.log(availablecolors)
//for (let _ of availablecolors){
//	let a = document.createElement('div')
//	a.classList.add('cl')
//	if(_ == activecl){
//		a.classList.add('activecl')
//	}
//	a.id = 'cl'+_
//	document.getElementById('ColorMenu').appendChild(a)
//	document.getElementById('cl'+_).onclick= function () {
//		for (let i of availablecolors){
//			document.getElementById('cl'+i).classList.remove('activecl');
//		}
//		document.getElementById('cl'+_).classList.add('activecl');
//		sessionStorage.setItem("SelectedCL",_)
//		activecl = Number(_);
//	}
//}
let MSGs = [];
let ammo = new Map();
ammo.set('120mm',0);
ammo.set('45mm',0);
ammo.set('20mm',0);
ammo.set('8mm',0);
let input = new Map();
input.set(87,false);
input.set(65,false);
input.set(83,false);
input.set(68,false);
input.set(32,false);
input.set(71,false);
input.set('Tab',false);
// input.set('Clans',false);
input.set('m0',false);
let dobleinput = new Map();
dobleinput.set(87,false);
dobleinput.set(65,false);
dobleinput.set(83,false);
dobleinput.set(68,false);
dobleinput.set(32,false);
dobleinput.set(71,false);
dobleinput.set('m0',false);
let mouseX = 0;
let mouseY = 0;
let INFO = '';
let OBJs = [new Map(),new Map()]
// OBJs[1] = new Map();
let MAP = new Map()

MAP.set('b',new Map())
MAP.set('s',new Map())
MAP.set('z',new Map())
MAP.set('g',new Map())
OBJs[1].set('b', new Map());
OBJs[1].set('z', new Map());
OBJs[1].set('g', new Map());
OBJs[1].set('f', new Map());
OBJs[1].set('e', new Map());
OBJs[1].set('o', new Map());
OBJs[1].set('|', new Map());
OBJs[1].set('k', new Map());
OBJs[1].set('m', new Map());
OBJs[1].set('n', new Map());
OBJs[1].set('>', new Map());
OBJs[1].set('<', new Map());
OBJs[1].set('s', new Map());
OBJs[1].set('*', new Map());
OBJs[1].set('p', new Map());
OBJs[1].set('_', new Map());
// OBJs[0] = new Map();
OBJs[0].set('b', new Map());
OBJs[0].set('z', new Map());
OBJs[0].set('g', new Map());
OBJs[0].set('f', new Map());
OBJs[0].set('e', new Map());
OBJs[0].set('o', new Map());
OBJs[0].set('|', new Map());
OBJs[0].set('k', new Map());
OBJs[0].set('m', new Map());
OBJs[0].set('n', new Map());
OBJs[0].set('>', new Map());
OBJs[0].set('<', new Map());
OBJs[0].set('s', new Map());
OBJs[0].set('*', new Map());
OBJs[0].set('p', new Map());
OBJs[0].set('_', new Map());
function lookat(x,y) {

    if (x == 0) {
        x = 0.001
    }
    let angle = Math.atan((y / x)) / (Math.PI / 180)
    if (y != Math.abs(y)) {
        angle = angle + 360
    }
    if (x != Math.abs(x)) {
        angle = angle + 180
    }
    angle = (angle - Math.floor(angle / 360) * 360)
    return angle
}
function resize(){
//console.log('RESIZE')
    GameW = window.innerWidth*window.devicePixelRatio;
    GameH = window.innerHeight*window.devicePixelRatio;
	canvas.width  = window.innerWidth*window.devicePixelRatio;
	canvas.height = window.innerHeight*window.devicePixelRatio;
	canvas.style.width = window.innerWidth + "px";
	canvas.style.height = window.innerHeight + "px";
    ZoomCorrection()

//	console.log(canvas.width,canvas.style.width)
}
function fresize(){
    GameW = window.innerWidth*window.devicePixelRatio;
    GameH = window.innerHeight*window.devicePixelRatio;
	canvas.width  = window.innerWidth*window.devicePixelRatio;
	canvas.height = window.innerHeight*window.devicePixelRatio;
	canvas.style.width = window.innerWidth + "px";
	canvas.style.height = window.innerHeight + "px";
	ZoomCorrection()
//	console.log(canvas.width,canvas.style.width)
}
function mclick() {
	input.set('m0',true)
	dobleinput.set('m0',true)
}
function mrelease(){
	input.set('m0',false)
}
function mifo() {
	messagefield.style.display = 'none'
}
function keydown(event) {
	// W A S D ' '
	// console.log(event.keyCode)
	if (messagefield.style.display == 'none' && (event.keyCode == 87 || event.keyCode == 65 || event.keyCode == 83 || event.keyCode == 68 || event.keyCode == 32|| event.keyCode == 71)){
		input.set(event.keyCode,true);
		dobleinput.set(event.keyCode,true)
	}
	 else if (event.key == 'Enter' && GameStatus == "InGame") {
	 	// if (clansi.style.display == 'none'){
		if (messagefield.style.display == 'none'){
			messagefield.style.display = 'block';
			messageinput.focus();
		}else {

			messagefield.style.display = 'none'
			Send = true;
		}


	}else if ( (event.keyCode == 113 )) {
        document.getElementById("chkInterfaceHide").checked = (!(document.getElementById("chkInterfaceHide").checked))
        cameraMode = document.getElementById("chkInterfaceHide").checked
	}else if ( (event.keyCode == 114 )) {
	    if(document.getElementById("MainCanvas").style.cursor == 'crosshair'){
	        document.getElementById("MainCanvas").style.cursor = 'none'
	    }else{
	        document.getElementById("MainCanvas").style.cursor = 'crosshair'
	    }

	}else if ( (event.keyCode == 86 )) {
		curView = (curView+1)%Vehicles[CurVehicle].views
//		console
		document.getElementById('ViewImg').src = Vehicles[CurVehicle].viewsIcons[curView]
	}else if (messagefield.style.display == 'none' && (event.keyCode == 77 )) {
		map.style.display = 'block';
	}else if (messagefield.style.display == 'none' && (event.keyCode == 78) ) {
		input.set('Tab',true);
		tab.style.display = 'block';
	}else if(messagefield.style.display == 'none' && (event.keyCode == 67)){
		Cmod = !Cmod
		cmodnum.src = './static/Cmodinv' +(Cmod  ? 1 : 0).toString()+ '.svg'
		tracernum.src = './static/Tracerinv' +(Cmod  ? 1 : 0).toString()+ '.svg'
	}else if(messagefield.style.display == 'none' && (event.keyCode == 88)){
		Xmod = !Xmod
		xmodnum.src = './static/Xmodinv' +(Xmod  ? 1 : 0).toString()+ '.svg'
	}
}
function keyup(event) {
	if (event.keyCode == 87 || event.keyCode == 65 || event.keyCode == 83 || event.keyCode == 68 || event.keyCode == 32 || event.keyCode == 71){
		input.set(event.keyCode,false);
	} else if (event.keyCode == 77 ) {
		map.style.display = 'none';

	}else if (event.keyCode == 78 ) {

		tab.style.display = 'none';
	}
}
let start = null;
let timenow = Date.now()

function DRAW(timestamp)  {

try{
    if (GameStatus == "InGame"){
    if(MAPstatic.CT.weather == 'Snow' ){
    if (SnowParticles0.length == 0){
        for(var i = 0; i < SnowParticles0max; i++)
        {
            SnowParticles0.push(new Particle2(canvas.width,canvas.height))
        }
    }
    }else{
        if (SnowParticles0.length > 0){
        SnowParticles0 = []
        }
    }
    if(MAPstatic.CT.weather == 'Rain' ){
        if (RainParticles0.length < RainParticles0max){
            for(var i = RainParticles0.length; i < RainParticles0max; i++)
            {
            if(Math.random() <0.05) {

            RainParticles0.push(new Particle4())
            }
            }
    }
    }else{
        if (RainParticles0.length > 0){
        RainParticles0 = []
        }
    }
    timenow = Date.now()
	if(BURNING){
		ShakeXbnds += 0.25
		ShakeYbnds += 0.25
	}
	ShakeXbnds = ShakeXbnds*0.9
	ShakeYbnds = ShakeYbnds*0.9

	OffsetX = Math.random()*ShakeXbnds-ShakeXbnds/2
	OffsetY = Math.random()*ShakeYbnds-ShakeYbnds/2

	 LastFPS = Date.now()
	 FPS = 1000/(Date.now()-LastAnime)
//	console.log('FPS: '+1000/(Date.now()-LastAnime))
	 LastAnime = Date.now()
    if (!start) start = timestamp;
    let progress = timestamp - start; //'#2879ADFF'
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = MAPstatic.CT.bg;
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.fill()
	for (let _ = 0; _ < Players.length; _++) {
        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(0,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(0,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(1,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(1,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(2,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(2,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(3,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(3,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(4,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(4,NoTeamTag(Players[_][0]));}
	}
	for (let _ of MAPstatic['B']){

		    ctx.strokeStyle = MAPstatic.CT.zs;

			ctx.lineJoin = 'bevel';
			ctx.beginPath();
            ctx.lineWidth = 160/320*Zoom;
			for (let l = 0; l < _.length; l += 1) {
					if (l == 0) {
						ctx.moveTo(GameW/2 + OffsetX - (X - _[0][0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[0][1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
					} else {
						ctx.lineTo(GameW/2 + OffsetX - (X - _[l][0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[l][1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom)
					}

			}
			ctx.closePath();
			ctx.stroke();

    }
   	for (let _ of MAPstatic['S']){

		    ctx.strokeStyle = MAPstatic.CT.zs;

			ctx.lineJoin = 'bevel';
			ctx.beginPath();
            ctx.lineWidth = 80/320*Zoom;
			for (let l = 0; l < _.length; l += 1) {
					if (l == 0) {
						ctx.moveTo(GameW/2 + OffsetX - (X - _[0][0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[0][1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
					} else {
						ctx.lineTo(GameW/2 + OffsetX - (X - _[l][0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[l][1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom)
					}

			}
			ctx.closePath();
			ctx.stroke();

    }
    for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(5,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(5,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(6,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(6,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(7,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(7,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(8,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(8,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(9,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(9,NoTeamTag(Players[_][0]));}
	}

	    for (let _ of MAPstatic['B']){

		    ctx.strokeStyle = MAPstatic.CT.zf;

			ctx.lineJoin = 'bevel';
			ctx.beginPath();
            ctx.lineWidth = 80/320*Zoom;
			for (let l = 0; l < _.length; l += 1) {
					if (l == 0) {
						ctx.moveTo(GameW/2 + OffsetX - (X - _[0][0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[0][1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
					} else {
						ctx.lineTo(GameW/2 + OffsetX - (X - _[l][0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[l][1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom)
					}

			}
			ctx.closePath();
			ctx.stroke();

    }
    for (let _ of MAPstatic['S']){

		    ctx.strokeStyle = MAPstatic.CT.zf;

			ctx.lineJoin = 'bevel';
			ctx.beginPath();
            ctx.lineWidth = 40/320*Zoom;
			for (let l = 0; l < _.length; l += 1) {
					if (l == 0) {
						ctx.moveTo(GameW/2 + OffsetX - (X - _[0][0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[0][1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
					} else {
						ctx.lineTo(GameW/2 + OffsetX - (X - _[l][0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[l][1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom)
					}

			}
			ctx.closePath();
			ctx.stroke();

    }
    for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(10,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(10,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(11,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(11,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(12,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(12,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(13,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(13,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(14,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(14,NoTeamTag(Players[_][0]));}
	}

if (ParticlesProcessing){
	for (i=0; i<WtrParticles0.length; i++) {
		ctx.fillStyle = "rgba(255,255,255,"+(WtrParticles0[i].life**1.5)*0.25+")";
		ctx.beginPath();
		ctx.arc(OffsetX+(WtrParticles0[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2,OffsetY+GameH/2+(WtrParticles0[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom,((WtrParticles0[i].rad-(WtrParticles0[i].life*WtrParticles0[i].rad))/320*Zoom*7.5+2.5)/320*Zoom,0,2*Math.PI);
		ctx.fill();
		WtrParticles0[i].life *= 0.99
		if (WtrParticles0[i].life < 0.15) {
			WtrParticles0.splice(i, 1);
			i--;
		}
	}
	}else{
	WtrParticles0 = []
	}
//	TorpedosData.set(larr[1],[Number(larr[2]),Number(larr[3]),Number(larr[4]),Number(larr[5]),Number(larr[6]),false])
	for (let _ of TorpedosData.keys()) {
		if(TorpedosData.get(_)[3] == 1){
			TorpedosData.get(_)[3]=0

            PIXI.sound.play('wtrBang');
			for (let i = 0; i < 5; i++) {
//			    console.log(TorpedosData.get(_)[0], TorpedosData.get(_)[1])
                WtrBangParticles0.push(new BangPrt0(TorpedosData.get(_)[0], TorpedosData.get(_)[1]))
            }
			ShakeXbnds += 10
			ShakeYbnds += 10
		}else if(TorpedosData.get(_)[3] == 2){
                    PIXI.sound.play('lnchTrpd');
                     TorpedosData.get(_)[3] = 0
		}
//		tornum.innerText = OBJs[0].get('<').get(_)[4];
//		if (OBJs[1].get('<').has(_)) {
//			grad=ctx.createLinearGradient(OffsetX+Number(OBJs[0].get('<').get(_)[0]+ (OBJs[1].get('<').get(_)[0] - OBJs[0].get('<').get(_)[0]) * (Date.now() - LastPING) / PING), OffsetY+Number(OBJs[0].get('<').get(_)[1]+ (OBJs[1].get('<').get(_)[1] - OBJs[0].get('<').get(_)[1]) * (Date.now() - LastPING) / PING),Number(OBJs[0].get('<').get(_)[0]+ (OBJs[1].get('<').get(_)[0] - OBJs[0].get('<').get(_)[0]) * (Date.now() - LastPING) / PING)-Math.cos(OBJs[0].get('<').get(_)[2]/180*Math.PI)*30, Number(OBJs[0].get('<').get(_)[1]+ (OBJs[1].get('<').get(_)[1] - OBJs[0].get('<').get(_)[1]) * (Date.now() - LastPING) / PING)-Math.sin(OBJs[0].get('<').get(_)[2]/180*Math.PI)*30);
//		}else{
			grad=ctx.createLinearGradient(GameW/2 + OffsetX - (X - TorpedosData.get(_)[0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - TorpedosData.get(_)[1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom,GameW/2 + OffsetX - (X - TorpedosData.get(_)[0]+Math.cos(TorpedosData.get(_)[2]/180*Math.PI)*TorpedosData.get(_)[4]/3 + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - TorpedosData.get(_)[1]+Math.sin(TorpedosData.get(_)[2]/180*Math.PI)*TorpedosData.get(_)[4]/3 + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
//		}
		if (Math.random() < 0.15){
		        WtrParticles0.push(new WtrPrt0(TorpedosData.get(_)[0], TorpedosData.get(_)[1]));
		}
		grad.addColorStop(1,"#FFFFFF00");
		grad.addColorStop(0,"#FFFFff88");
		ctx.strokeStyle = grad;
		ctx.lineWidth= 8/320*Zoom;
//		ctx.lineCap='round';
		ctx.beginPath()
		 ctx.lineCap='round';
        ctx.moveTo(GameW/2 + OffsetX - (X - TorpedosData.get(_)[0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - TorpedosData.get(_)[1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
        ctx.lineTo(GameW/2 + OffsetX - (X - TorpedosData.get(_)[0]+Math.cos(TorpedosData.get(_)[2]/180*Math.PI)*TorpedosData.get(_)[4]/3/320*Zoom + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - TorpedosData.get(_)[1]+Math.sin(TorpedosData.get(_)[2]/180*Math.PI)*TorpedosData.get(_)[4]/3/320*Zoom + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
//		}
		ctx.stroke();
        ctx.closePath()
//        ctx.lineCap='round';


		TorpedosData.get(_)[0]= TorpedosData.get(_)[6]+Math.cos(TorpedosData.get(_)[2]/180*Math.PI)*TorpedosData.get(_)[4]*(Date.now()-TorpedosData.get(_)[8])/1000
		TorpedosData.get(_)[1]= TorpedosData.get(_)[7]+Math.sin(TorpedosData.get(_)[2]/180*Math.PI)*TorpedosData.get(_)[4]*(Date.now()-TorpedosData.get(_)[8])/1000
		if (TorpedosData.get(_)[5] || TorpedosData.get(_)[0] > 20 || TorpedosData.get(_)[0] < -4 || TorpedosData.get(_)[1] > 19 || TorpedosData.get(_)[1] < -4){
		    TorpedosData.delete(_)
		}
	}

	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(15,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(15,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(16,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(16,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(17,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(17,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(18,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(18,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(19,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(19,NoTeamTag(Players[_][0]));}
	}
	for (let _ of MAPstatic['_']) {

                    ctx.beginPath()
                    ctx.moveTo(GameW/2 + OffsetX - (X - _[0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
                    ctx.lineTo(GameW/2 + OffsetX - (X - _[2] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[3] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
                    ctx.closePath()
                    ctx.strokeStyle = MAPstatic.CT.b2
                    ctx.lineCap = 'square';
                    ctx.lineWidth = 70/320*Zoom;
                    ctx.stroke();

    }
    for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(20,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(20,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(21,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(21,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(22,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(22,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(23,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(23,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(24,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(24,NoTeamTag(Players[_][0]));}
	}
    for (let _ of MAPstatic['B']){

			ctx.fillStyle = MAPstatic.CT.bf;
			ctx.strokeStyle = MAPstatic.CT.bs;
			ctx.lineJoin = 'bevel';
			ctx.beginPath();

			for (let l = 0; l < _.length; l += 1) {
					if (l == 0) {
						ctx.moveTo(GameW/2 + OffsetX - (X - _[0][0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[0][1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
					} else {
						ctx.lineTo(GameW/2 + OffsetX - (X - _[l][0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[l][1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom)
					}

			}
			ctx.closePath();
			ctx.lineWidth = ((Math.sin(timenow/50/180*Math.PI)+1)*5+2)/320*Zoom;
			ctx.fill();
			ctx.stroke();

    }
    for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(25,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(25,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(26,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(26,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(27,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(27,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(28,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(28,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(29,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(29,NoTeamTag(Players[_][0]));}
	}
        for (let _ of MAPstatic['G']){

            ctx.fillStyle = MAPstatic.CT.gf;
            ctx.strokeStyle = MAPstatic.CT.gs;
            ctx.lineWidth = 10/320*Zoom;
            ctx.lineJoin = 'bevel';
            ctx.beginPath();
			for (let l = 0; l < _.length; l += 1) {
					if (l == 0) {
						ctx.moveTo(GameW/2 + OffsetX - (X - _[0][0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[0][1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
					} else {
						ctx.lineTo(GameW/2 + OffsetX - (X - _[l][0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[l][1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom)
					}

			}
			ctx.closePath();

			ctx.fill();
			ctx.stroke();
    }

    for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(30,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(30,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(31,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(31,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(32,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(32,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(33,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(33,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(34,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(34,NoTeamTag(Players[_][0]));}
	}

            for (let _ = 0; _ < MAPstatic['*'].length; _++) {

                ctx.lineWidth= 10/320*Zoom;
                if (Zones[_] == '0') {
                    ctx.strokeStyle = 'rgba(255,0,0,0.25)';
                    ctx.fillStyle = 'rgba(255,0,0,0.25)';
                } else {
                    ctx.strokeStyle = 'rgba(0,0,255,0.25)';
                    ctx.fillStyle = 'rgba(0,0,255,0.25)';
                }

    //            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    //            ctx.fillStyle = 'rgba(255,255,255,0.1)';
                ctx.textAlign = 'center'
                ctx.font = (300/320*Zoom).toString()+"px ZCOOL QingKe HuangYou";
                ctx.beginPath()
                ctx.arc(GameW/2 + OffsetX - (X - MAPstatic['*'][_][1] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom, GameH/2+ OffsetY - (Y - MAPstatic['*'][_][2]+ (nY - Y) * (Date.now() - LastPING) / PING)*Zoom, 160/320*Zoom, 0, Math.PI * 2);
                ctx.fillText(MAPstatic['*'][_][0],GameW/2+ OffsetX - (X- MAPstatic['*'][_][1] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2+ OffsetY- (Y- MAPstatic['*'][_][2] + (nY - Y) * (Date.now() - LastPING) / PING )*Zoom+100/320*Zoom);
                ctx.closePath()

                ctx.stroke();
            }


    ctx.lineWidth=5;

    ctx.beginPath();
    ctx.rect(GameW/2 + OffsetX - (X + (nX - X) * (Date.now() - LastPING) / PING)*Zoom, GameH/2 + OffsetY - (Y + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom, WH*Zoom, WH*Zoom);
    ctx.closePath();
    ctx.strokeStyle = '#ff0000ff';
    ctx.stroke();
    for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(35,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(35,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(36,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(36,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(37,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(37,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(38,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(38,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(39,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(39,NoTeamTag(Players[_][0]));}
	}



    for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(40,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(40,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(41,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(41,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(42,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(42,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(43,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(43,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(44,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(44,NoTeamTag(Players[_][0]));}
	}

	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(45,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(45,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(46,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(46,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(47,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(47,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(48,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(48,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(49,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(49,NoTeamTag(Players[_][0]));}
	}


    	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(50,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(50,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(51,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(51,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(52,NoTeamTag(NoTeamTag(Players[_][0])))} else{Vehicles[Players[_][1]].draw(52,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(53,NoTeamTag(NoTeamTag(Players[_][0])))} else{Vehicles[Players[_][1]].draw(53,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(54,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(54,NoTeamTag(Players[_][0]));}
	}

//	if (ParticlesProcessing){
	for (i=0; i<CanBangParticles0.length; i++) {
	    ctx.fillStyle = "rgba(192,192,192,"+(CanBangParticles0[i].life**1.5)*1+")";
		ctx.beginPath();

		ctx.arc(OffsetX+(CanBangParticles0[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2,OffsetY+GameH/2+(CanBangParticles0[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom,CanBangParticles0[i].rad/320*Zoom,0,2*Math.PI);
		ctx.closePath();
		CanBangParticles0[i].x += CanBangParticles0[i].xs/10*CanBangParticles0[i].life/320
		CanBangParticles0[i].y += CanBangParticles0[i].ys/10*CanBangParticles0[i].life/320
		CanBangParticles0[i].rad+=0.1*CanBangParticles0[i].life/320*Zoom
		ctx.fill();
		CanBangParticles0[i].life *= 0.99
		if (CanBangParticles0[i].life < 0.001) {
			CanBangParticles0.splice(i, 1);
			i--;
		}
	}
//	}else{
//	CanBangParticles0 = []
//	}
	if (ParticlesProcessing){
	for (i=FireParticles0.length-1; i>=0; i--) {
	            //stage.fillStyle = "rgba(255,0,0,1)";
            ctx.fillStyle = "rgba(255," + 255*FireParticles0[i].life/60+","+255*((FireParticles0[i].life/60)**3)+"," +( Math.sin(FireParticles0[i].life/60*Math.PI)*0.75)+")";
            ctx.beginPath();
            //*Math.sin(particles[i].life/60*Math.PI)
            ctx.arc(OffsetX+(FireParticles0[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2-FireParticles0[i].cof*Math.cos(FireParticles0[i].dir)*FireParticles0[i].rad/320*Zoom,OffsetY+GameH/2+(FireParticles0[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom-FireParticles0[i].cof*Math.sin(FireParticles0[i].dir)*FireParticles0[i].rad/320*Zoom,FireParticles0[i].rad*Math.sin(FireParticles0[i].life/60*Math.PI)/320*Zoom,0,2*Math.PI);
            ctx.closePath();
            ctx.fill();
            FireParticles0[i].dirspd += (Math.random()*2-1)*0.03
            FireParticles0[i].dir += FireParticles0[i].dirspd
            FireParticles0[i].x+=Math.cos(FireParticles0[i].deg) * FireParticles0[i].speed*Math.sin(FireParticles0[i].life/60*Math.PI)*(1-FireParticles0[i].life/60)/320;
            FireParticles0[i].y+=Math.sin(FireParticles0[i].deg) * FireParticles0[i].speed *Math.sin(FireParticles0[i].life/60*Math.PI)*(1-FireParticles0[i].life/60)/320;
            FireParticles0[i].life *= 0.95
            if (FireParticles0[i].life < 5) {
                FireParticles0.splice(i, 1);
                i--;
            }
	}
	}else{
	FireParticles0 = []
	}







	if (Z >0){
        for (let _ of MAPstatic['_']) {
                    ctx.beginPath()
                    ctx.moveTo(GameW/2 + OffsetX - (X - _[0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
                    ctx.lineTo(GameW/2 + OffsetX - (X - _[2] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[3] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
                    ctx.closePath()
                    ctx.lineCap = 'square';

                        ctx.strokeStyle = MAPstatic.CT.b1;
                        ctx.lineWidth = 60/320*Zoom;
                        ctx.stroke();

                        ctx.strokeStyle = MAPstatic.CT.b0;
                        ctx.lineWidth = 50/320*Zoom;
                        ctx.stroke();
//                    }



    }}
    for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(55,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(55,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(56,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(56,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(57,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(57,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(58,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(58,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(59,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(59,NoTeamTag(Players[_][0]));}
	}

    for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(60,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(60,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(61,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(61,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(62,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(62,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(63,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(63,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(64,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(64,NoTeamTag(Players[_][0]));}
	}
	    	    		for (let _ of BulletsData.keys()) {

                if (BulletsData.get(_)[4] == 0 ){
                        if(BulletsData.get(_)[3] == 1 || BulletsData.get(_)[3] == 3){
                if (Math.random() < 1){


                    PIXI.sound.play('dmg'+Math.floor(Math.random()*4));
                }
                if(BulletsData.get(_)[3] == 3){
                    ShakeXbnds += 5
                    ShakeYbnds += 5
                }

                BulletsData.get(_)[3]=0
            }else if(BulletsData.get(_)[3] == 2){
                if (Math.random() < 1){

                        PIXI.sound.play('Sdmg'+Math.floor(Math.random()*3));

                }

                BulletsData.get(_)[3]=0
            }

    //		tornum.innerText = OBJs[0].get('<').get(_)[4];
    //		if (OBJs[1].get('<').has(_)) {
    //			grad=ctx.createLinearGradient(OffsetX+Number(OBJs[0].get('<').get(_)[0]+ (OBJs[1].get('<').get(_)[0] - OBJs[0].get('<').get(_)[0]) * (Date.now() - LastPING) / PING), OffsetY+Number(OBJs[0].get('<').get(_)[1]+ (OBJs[1].get('<').get(_)[1] - OBJs[0].get('<').get(_)[1]) * (Date.now() - LastPING) / PING),Number(OBJs[0].get('<').get(_)[0]+ (OBJs[1].get('<').get(_)[0] - OBJs[0].get('<').get(_)[0]) * (Date.now() - LastPING) / PING)-Math.cos(OBJs[0].get('<').get(_)[2]/180*Math.PI)*30, Number(OBJs[0].get('<').get(_)[1]+ (OBJs[1].get('<').get(_)[1] - OBJs[0].get('<').get(_)[1]) * (Date.now() - LastPING) / PING)-Math.sin(OBJs[0].get('<').get(_)[2]/180*Math.PI)*30);
    //		}else{
                grad=ctx.createLinearGradient(GameW/2 + OffsetX - (X - BulletsData.get(_)[0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - BulletsData.get(_)[1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom,GameW/2 + OffsetX - (X - BulletsData.get(_)[0]+Math.cos(BulletsData.get(_)[2]/180*Math.PI)*BulletsData.get(_)[11] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - BulletsData.get(_)[1]+Math.sin(BulletsData.get(_)[2]/180*Math.PI)*BulletsData.get(_)[11] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
    //		}
//            if (Math.random() < 0.15){
//                    WtrParticles0.push(new WtrPrt0(BulletsData.get(_)[0], BulletsData.get(_)[1]));
//            }
            if (Z < 2){
                grad.addColorStop(1,"#FFFF4400");
                grad.addColorStop(0,"#FFFF4488");
            }else{
                grad.addColorStop(1,"#ffff8800");
                grad.addColorStop(0,"#ffff8877");
            }
            ctx.strokeStyle = grad;
            ctx.lineWidth= BulletsData.get(_)[6]/320*Zoom;
    //		ctx.lineCap='round';
            ctx.beginPath()
             ctx.lineCap='round';
//             console.log(GameW/2 + OffsetX - (X - BulletsData.get(_)[0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - BulletsData.get(_)[1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom)
            ctx.moveTo(GameW/2 + OffsetX - (X - BulletsData.get(_)[0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - BulletsData.get(_)[1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
            ctx.lineTo(GameW/2 + OffsetX - (X - BulletsData.get(_)[0]+Math.cos(BulletsData.get(_)[2]/180*Math.PI)*BulletsData.get(_)[11] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - BulletsData.get(_)[1]+Math.sin(BulletsData.get(_)[2]/180*Math.PI)*BulletsData.get(_)[11] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
    //		}
            ctx.stroke();
            ctx.closePath()
    //        ctx.lineCap='round';


            BulletsData.get(_)[0]= BulletsData.get(_)[8]+Math.cos(BulletsData.get(_)[2]/180*Math.PI)*BulletsData.get(_)[5]*((Date.now()-BulletsData.get(_)[10])/1000)
            BulletsData.get(_)[1]= BulletsData.get(_)[9]+Math.sin(BulletsData.get(_)[2]/180*Math.PI)*BulletsData.get(_)[5]*((Date.now()-BulletsData.get(_)[10])/1000)
            if (((Date.now()-BulletsData.get(_)[10])/1000-1/15) > 0){
            BulletsData.get(_)[11] = BulletsData.get(_)[5]*((Date.now()-BulletsData.get(_)[10])/1000-2/15)
            if (BulletsData.get(_)[11] > 0.3){BulletsData.get(_)[11] = 0.3}
            }else{
            BulletsData.get(_)[11] = 0
            }

            if (BulletsData.get(_)[7] || BulletsData.get(_)[0] > 20 || BulletsData.get(_)[0] < -4 || BulletsData.get(_)[1] > 19 || BulletsData.get(_)[1] < -4){
                BulletsData.delete(_)
            }
            }
	}
		    for (let _ of SmokesData.keys()) {

//          ctx.strokeStyle = 'rgba(255,255,255,0.1)';
          try{
              ctx.fillStyle = 'rgba(255,255,255,0.25)';
              let kl = 0;
    //          smknum.innerText = OBJs[0].get('p').get(_)[3];

    //(Math.sqrt(x)-(Math.sqrt(x)-17.3)*Math.sqrt(x)*0.3)*0.02

                ctx.beginPath()
                let x = (Date.now() - SmokesData.get(_)[2]) / 100
    //            console.log((Math.sqrt(x)-(Math.sqrt(x)-17.3)*Math.sqrt(x)*0.3)*0.02)
                let y = (Math.sqrt(x)-(Math.sqrt(x)-17.3)*Math.sqrt(x)*0.3)*0.02
                ctx.arc(OffsetX+(SmokesData.get(_)[0]-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2,OffsetY+GameH/2+(SmokesData.get(_)[1]-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom, y*Zoom, 0, Math.PI * 2);
                ctx.closePath()
                ctx.fill();

                for (i=0; i<SmokesData.get(_)[4].length; i++) {
                    SmokesData.get(_)[4][i].hp-=1;
                    SmokesData.get(_)[4][i].dir+=SmokesData.get(_)[4][i].spd*0.025;
                    if (SmokesData.get(_)[4][i].hp < 0 ) {
                        SmokesData.get(_)[4].splice(i, 1);
                        i--;
                    }
                }
                for (i=0; i<SmokesData.get(_)[4].length; i++) {
                            ctx.fillStyle = "rgba("+SmokesData.get(_)[4][i].cl +','+SmokesData.get(_)[4][i].cl+',' +SmokesData.get(_)[4][i].cl +',' +SmokesData.get(_)[4][i].hp/1500+ ")";
                            ctx.beginPath();
                            kl+=1
                            ctx.arc(Math.cos(SmokesData.get(_)[4][i].dir)*SmokesData.get(_)[4][i].h*y*0.5*Zoom+(SmokesData.get(_)[0]-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2 ,Math.sin(SmokesData.get(_)[4][i].dir)*Zoom*SmokesData.get(_)[4][i].h*y*0.5+OffsetY+OffsetY+GameH/2+(SmokesData.get(_)[1]-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom, y*Zoom,0,2*Math.PI);
                            ctx.closePath()
                            ctx.fill()
                }
                if(Math.random() < 0.1 && kl < 10){
                    SmokesData.get(_)[4].push(new Particle3(_))
                }
                            if (SmokesData.get(_)[3]){
                    SmokesData.delete(_)
                }
            }catch{
                SmokesData.delete(_)
            }

    }
	for (let _ of MAPstatic['S']){

    		ctx.fillStyle = MAPstatic.CT.sf;
			ctx.lineWidth= 5/320*Zoom;
			ctx.lineJoin = 'round';
            ctx.strokeStyle = MAPstatic.CT.ss;
			ctx.beginPath();

			for (let l = 0; l < _.length; l += 1) {
				//		    console.log(OBJs[0].get('b').get(_)[l*2],OBJs[0].get('b').get(_)[l*2+1])
				// 	console.log(OFICIAL-MAP0.get('b').get(_)[2],OFICIAL-MAP0.get('b').get(_)[3])
				// 	console.log(OFICIAL-MAP0.get('b').get(_)[0],X)
					if (l == 0) {
						ctx.moveTo(GameW/2 + OffsetX - (X - _[0][0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[0][1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
					} else {
						ctx.lineTo(GameW/2 + OffsetX - (X - _[l][0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[l][1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom)
					}

			}
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
			ctx.lineJoin = 'miter';
    }
    		for (i=0; i<WtrBangParticles0.length; i++) {
	    ctx.fillStyle = "rgba(255,255,255,"+(WtrBangParticles0[i].life**0.33)*1+")";

		ctx.beginPath();
		ctx.arc(OffsetX+(WtrBangParticles0[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2,OffsetY+GameH/2+(WtrBangParticles0[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom,WtrBangParticles0[i].rad/320*Zoom,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "rgba(0,160,255,"+(WtrBangParticles0[i].life**1)*1+")";
		ctx.beginPath();
		ctx.arc(OffsetX+(WtrBangParticles0[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2+Math.cos(WtrBangParticles0[i].dir+WtrBangParticles0[i].life*Math.PI*2)*WtrBangParticles0[i].rad*0.2,OffsetY+GameH/2+(WtrBangParticles0[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom+Math.sin(WtrBangParticles0[i].dir+WtrBangParticles0[i].life*Math.PI*2)*WtrBangParticles0[i].rad*0.2,WtrBangParticles0[i].rad*0.8/320*Zoom,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
        WtrBangParticles0[i].dir += WtrBangParticles0[i].life*0.25
		WtrBangParticles0[i].x += WtrBangParticles0[i].xs/Zoom/4*WtrBangParticles0[i].life/320*Zoom
		WtrBangParticles0[i].y += WtrBangParticles0[i].ys/Zoom/4*WtrBangParticles0[i].life/320*Zoom
		WtrBangParticles0[i].rad+=0.75*WtrBangParticles0[i].life**1.25

		WtrBangParticles0[i].life *= 0.98
		if (WtrBangParticles0[i].life < 0.0001) {
			WtrBangParticles0.splice(i, 1);
			i--;
		}
	}
		for (i=0; i<BangParticles0.length; i++) {
	    ctx.fillStyle = "rgba(0,0,0,"+(BangParticles0[i].life**0.33)*1+")";

		ctx.beginPath();
		ctx.arc(OffsetX+(BangParticles0[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2,OffsetY+GameH/2+(BangParticles0[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom,BangParticles0[i].rad/320*Zoom,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "rgba(255,160,0,"+(BangParticles0[i].life**1)*1+")";
		ctx.beginPath();
		ctx.arc(OffsetX+(BangParticles0[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2+Math.cos(BangParticles0[i].dir+BangParticles0[i].life*Math.PI*2)*BangParticles0[i].rad*0.2/320*Zoom,OffsetY+GameH/2+(BangParticles0[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom+Math.sin(BangParticles0[i].dir+BangParticles0[i].life*Math.PI*2)*BangParticles0[i].rad*0.2/320*Zoom,BangParticles0[i].rad/320*Zoom*0.8,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
        BangParticles0[i].dir += BangParticles0[i].life*0.25
		BangParticles0[i].x += BangParticles0[i].xs/4*BangParticles0[i].life/320
		BangParticles0[i].y += BangParticles0[i].ys/4*BangParticles0[i].life/320
		BangParticles0[i].rad+=0.75*BangParticles0[i].life**1.25

		BangParticles0[i].life *= 0.98
		if (BangParticles0[i].life < 0.0001) {
			BangParticles0.splice(i, 1);
			i--;
		}
	}
//	if (ParticlesProcessing){
		for (i=0; i<CanBangParticles1.length; i++) {
	    ctx.fillStyle = "rgba(192,192,192,"+(CanBangParticles1[i].life**1.5)*1+")";
		ctx.beginPath();

		ctx.arc(OffsetX+(CanBangParticles1[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2,OffsetY+GameH/2+(CanBangParticles1[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom,CanBangParticles1[i].rad/320*Zoom,0,2*Math.PI);
		ctx.closePath();
		CanBangParticles1[i].x += CanBangParticles1[i].xs/10*CanBangParticles1[i].life/320
		CanBangParticles1[i].y += CanBangParticles1[i].ys/10*CanBangParticles1[i].life/320
		CanBangParticles1[i].rad+=0.1*CanBangParticles1[i].life/320*Zoom
		ctx.fill();
		CanBangParticles1[i].life *= 0.99
		if (CanBangParticles1[i].life < 0.001) {
			CanBangParticles1.splice(i, 1);
			i--;
		}
	}
//	}else{
//	CanBangParticles1 = []
//	}
	if (ParticlesProcessing){
	for (i=FireParticles1.length-1; i>=0; i--) {
	            //stage.fillStyle = "rgba(255,0,0,1)";
            ctx.fillStyle = "rgba(255," + 255*FireParticles1[i].life/60+","+255*((FireParticles1[i].life/60)**3)+"," +( Math.sin(FireParticles1[i].life/60*Math.PI)*0.75)+")";
            ctx.beginPath();
            //*Math.sin(particles[i].life/60*Math.PI)
            ctx.arc(OffsetX+(FireParticles1[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2-FireParticles1[i].cof*Math.cos(FireParticles1[i].dir)*FireParticles1[i].rad/320*Zoom,OffsetY+GameH/2+(FireParticles1[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom-FireParticles1[i].cof*Math.sin(FireParticles1[i].dir)*FireParticles1[i].rad/320*Zoom,FireParticles1[i].rad*Math.sin(FireParticles1[i].life/60*Math.PI)/320*Zoom,0,2*Math.PI);
            ctx.closePath();
            ctx.fill();
            FireParticles1[i].dirspd += (Math.random()*2-1)*0.03
            FireParticles1[i].dir += FireParticles1[i].dirspd
            FireParticles1[i].x+=Math.cos(FireParticles1[i].deg) * FireParticles1[i].speed*Math.sin(FireParticles1[i].life/60*Math.PI)*(1-FireParticles1[i].life/60)/320;
            FireParticles1[i].y+=Math.sin(FireParticles1[i].deg) * FireParticles1[i].speed *Math.sin(FireParticles1[i].life/60*Math.PI)*(1-FireParticles1[i].life/60)/320;
            FireParticles1[i].life *= 0.95
            if (FireParticles1[i].life < 5) {
                FireParticles1.splice(i, 1);
                i--;
            }
	}
	}else{
	FireParticles1 = []
	}
		for (i=0; i<BangParticles1.length; i++) {
	    ctx.fillStyle = "rgba(0,0,0,"+(BangParticles1[i].life**0.33)*1+")";

		ctx.beginPath();
		ctx.arc(OffsetX+(BangParticles1[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2,OffsetY+GameH/2+(BangParticles1[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom,BangParticles1[i].rad/320*Zoom,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "rgba(255,160,0,"+(BangParticles1[i].life**1)*1+")";
		ctx.beginPath();
		ctx.arc(OffsetX+(BangParticles1[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2+Math.cos(BangParticles1[i].dir+BangParticles1[i].life*Math.PI*2)*BangParticles1[i].rad*0.2/320*Zoom,OffsetY+GameH/2+(BangParticles1[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom+Math.sin(BangParticles1[i].dir+BangParticles1[i].life*Math.PI*2)*BangParticles1[i].rad*0.2/320*Zoom,BangParticles1[i].rad*0.8/320*Zoom,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
        BangParticles1[i].dir += BangParticles1[i].life*0.25
		BangParticles1[i].x += BangParticles1[i].xs/4*BangParticles1[i].life/320
		BangParticles1[i].y += BangParticles1[i].ys/4*BangParticles1[i].life/320
		BangParticles1[i].rad+=0.75*BangParticles1[i].life**1.25

		BangParticles1[i].life *= 0.98
		if (BangParticles1[i].life < 0.0001) {
			BangParticles1.splice(i, 1);
			i--;
		}
	}

    for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(65,NoTeamTag(Players[_][0]))} else {Vehicles[Players[_][1]].draw(65,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(66,NoTeamTag(Players[_][0]))} else {Vehicles[Players[_][1]].draw(66,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(67,NoTeamTag(Players[_][0]))} else {Vehicles[Players[_][1]].draw(67,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(68,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(68,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(69,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(69,NoTeamTag(Players[_][0]));}
	}
//    AARocketsData.set(larr[1],[Number(larr[2]),Number(larr[3]),Number(larr[4]),Number(larr[5]),Number(larr[6]),Number(larr[7]),Date.now(),false])
    for (let _ of BombsData.keys()){



//		ctx.lineCap='round';
        let relt = (Date.now()-BombsData.get(_)[6])/1000/BombsData.get(_)[5]
//        console.log(relt)

        let x = BombsData.get(_)[0]+(BombsData.get(_)[2]-BombsData.get(_)[0])*relt
        let y = BombsData.get(_)[1]+(BombsData.get(_)[3]-BombsData.get(_)[1])*relt
//        console.log(x,y)
//        console.log(BombsData.get(_)[4])
        if(BombsData.get(_)[4] == 1){
			BombsData.get(_)[4]=0

//            PIXI.sound.play('wtrBang');
            PIXI.sound.play('bang');
            for (let i = 0; i < 5; i++) {
                BangParticles1.push(new bangPrt(BombsData.get(_)[2],BombsData.get(_)[3]))

            }
			ShakeXbnds += 10
			ShakeYbnds += 10
		}else if(BombsData.get(_)[4] == 2){
                    PIXI.sound.play('bombFall');
                     BombsData.get(_)[4] = 0
		}else if(BombsData.get(_)[4] == 4){
            PIXI.sound.play('wtrBang');
			for (let i = 0; i < 5; i++) {
//			    console.log(TorpedosData.get(_)[0], TorpedosData.get(_)[1])
                WtrBangParticles0.push(new BangPrt0(BombsData.get(_)[2],BombsData.get(_)[3]))
            }
            ShakeXbnds += 5
			ShakeYbnds += 5

		}
		ctx.strokeStyle = '#111';
		ctx.lineWidth= 3/320*Zoom;
		ctx.beginPath()
		 ctx.lineCap='round';
		 bmbLen = 0.015
        ctx.moveTo(GameW/2 + OffsetX - (X - x + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - y + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
        ctx.lineTo(GameW/2 + OffsetX - (X - x + Math.cos(BombsData.get(_)[8]/180*Math.PI)*bmbLen + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - y  + Math.sin(BombsData.get(_)[8]/180*Math.PI)*bmbLen+ (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
//		}
		ctx.stroke();
        ctx.closePath()
//        ctx.lineCap='round';

		if (BombsData.get(_)[7] || x > 16 || x < 0 || y > 16 || y < 0){
		console.log(x,y)
		    BombsData.delete(_)
		}
    }
	for (let _ of AARocketsData.keys()) {
		if(AARocketsData.get(_)[3] == 1){
			AARocketsData.get(_)[3]=0

//            PIXI.sound.play('wtrBang');
			for (let i = 0; i < 15; i++) {
			FireParticles1.push(new FirePrt0(AARocketsData.get(_)[0],AARocketsData.get(_)[1],0.75))
//			    console.log(TorpedosData.get(_)[0], TorpedosData.get(_)[1])
//                WtrBangParticles0.push(new BangPrt0(AARocketsData.get(_)[0], AARocketsData.get(_)[1]))
            }
			ShakeXbnds += 10
			ShakeYbnds += 10
		}else if(AARocketsData.get(_)[3] == 2){
                    PIXI.sound.play('lnchRckt');
                     AARocketsData.get(_)[3] = 0
		}else if(AARocketsData.get(_)[3] == 4){
			for (let i = 0; i < 3; i++) {
			FireParticles1.push(new FirePrt0(AARocketsData.get(_)[0],AARocketsData.get(_)[1],0.5))
//			    console.log(TorpedosData.get(_)[0], TorpedosData.get(_)[1])
//                WtrBangParticles0.push(new BangPrt0(AARocketsData.get(_)[0], AARocketsData.get(_)[1]))
            }

		}
//		tornum.innerText = OBJs[0].get('<').get(_)[4];
//		if (OBJs[1].get('<').has(_)) {
//			grad=ctx.createLinearGradient(OffsetX+Number(OBJs[0].get('<').get(_)[0]+ (OBJs[1].get('<').get(_)[0] - OBJs[0].get('<').get(_)[0]) * (Date.now() - LastPING) / PING), OffsetY+Number(OBJs[0].get('<').get(_)[1]+ (OBJs[1].get('<').get(_)[1] - OBJs[0].get('<').get(_)[1]) * (Date.now() - LastPING) / PING),Number(OBJs[0].get('<').get(_)[0]+ (OBJs[1].get('<').get(_)[0] - OBJs[0].get('<').get(_)[0]) * (Date.now() - LastPING) / PING)-Math.cos(OBJs[0].get('<').get(_)[2]/180*Math.PI)*30, Number(OBJs[0].get('<').get(_)[1]+ (OBJs[1].get('<').get(_)[1] - OBJs[0].get('<').get(_)[1]) * (Date.now() - LastPING) / PING)-Math.sin(OBJs[0].get('<').get(_)[2]/180*Math.PI)*30);
//		}else{
			grad=ctx.createLinearGradient(GameW/2 + OffsetX - (X - AARocketsData.get(_)[0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - AARocketsData.get(_)[1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom,GameW/2 + OffsetX - (X - AARocketsData.get(_)[0]+Math.cos(AARocketsData.get(_)[2]/180*Math.PI)*AARocketsData.get(_)[4]/10 + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - AARocketsData.get(_)[1]+Math.sin(AARocketsData.get(_)[2]/180*Math.PI)*AARocketsData.get(_)[4]/10 + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
//		}
		if (Math.random() < 1){

		       RocketTraceParticles.push(new RcktTPrt0(AARocketsData.get(_)[0]-Math.cos(AARocketsData.get(_)[2]/180*Math.PI)*AARocketsData.get(_)[4]/20, AARocketsData.get(_)[1]-Math.sin(AARocketsData.get(_)[2]/180*Math.PI)*AARocketsData.get(_)[4]/20));
		}
		grad.addColorStop(1,"#FF880088");
		grad.addColorStop(0,"#cc0000ff");
		ctx.strokeStyle = grad;
		ctx.lineWidth= 2/320*Zoom;
//		ctx.lineCap='round';
		ctx.beginPath()
		 ctx.lineCap='round';
        ctx.moveTo(GameW/2 + OffsetX - (X - AARocketsData.get(_)[0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - AARocketsData.get(_)[1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
        ctx.lineTo(GameW/2 + OffsetX - (X - AARocketsData.get(_)[0]+Math.cos(AARocketsData.get(_)[2]/180*Math.PI)*AARocketsData.get(_)[4]/10 + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - AARocketsData.get(_)[1]+Math.sin(AARocketsData.get(_)[2]/180*Math.PI)*AARocketsData.get(_)[4]/10+ (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
//		}
		ctx.stroke();
        ctx.closePath()
//        ctx.lineCap='round';
        let t = (Date.now()-AARocketsData.get(_)[8])/1000
        distanceFromStart = AARocketsData.get(_)[4]*t+AARocketsData.get(_)[9]*t*t/2
		AARocketsData.get(_)[0]= AARocketsData.get(_)[6]+Math.cos(AARocketsData.get(_)[2]/180*Math.PI)*distanceFromStart
		AARocketsData.get(_)[1]= AARocketsData.get(_)[7]+Math.sin(AARocketsData.get(_)[2]/180*Math.PI)*distanceFromStart
		if (AARocketsData.get(_)[5] || AARocketsData.get(_)[0] > 20 || AARocketsData.get(_)[0] < -4 || AARocketsData.get(_)[1] > 19 || AARocketsData.get(_)[1] < -4){
		    AARocketsData.delete(_)
		}
	}
	if (ParticlesProcessing){
	for (i=RocketTraceParticles.length-1; i>=0; i--) {
	            //stage.fillStyle = "rgba(255,0,0,1)";
            ctx.fillStyle = "rgba(" + (150+105*RocketTraceParticles[i].life).toString() + "," + (150+105*RocketTraceParticles[i].life).toString()+","+(150-150*RocketTraceParticles[i].life)+"," +255*RocketTraceParticles[i].life+")";

            ctx.beginPath();
            //*Math.sin(particles[i].life/60*Math.PI)
            ctx.arc(OffsetX+(RocketTraceParticles[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2,OffsetY+GameH/2+(RocketTraceParticles[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom,RocketTraceParticles[i].rad*(RocketTraceParticles[i].life**0.3)*2/320*Zoom,0,2*Math.PI);
            ctx.closePath();
            ctx.fill();

            RocketTraceParticles[i].life *= 0.7
            if (RocketTraceParticles[i].life < 0.05) {
                RocketTraceParticles.splice(i, 1);
                i--;
            }
	}
	}else{
	RocketTraceParticles = []
	}
	ctx. globalCompositeOperation = "color"
		for (i=0; i<TracerParticles1.length; i++) {

	    ctx.strokeStyle = "rgba(200,0,0,"+(TracerParticles1[i].life**0.2)*4+")";
	    ctx.lineWidth = 3/320*Zoom
	    ctx.lineJoin = 'round'
        ctx.beginPath();
        ctx.moveTo(OffsetX+(TracerParticles1[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2,OffsetY+GameH/2+(TracerParticles1[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom)

        ctx.lineTo(OffsetX+(TracerParticles1[i].x1-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2,OffsetY+GameH/2+(TracerParticles1[i].y1-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom)
//		ctx.arc(OffsetX+(TracerParticles1[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2,OffsetY+GameH/2+(TracerParticles1[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom,2,0,2*Math.PI);
		ctx.closePath();

		ctx.stroke();

		TracerParticles1[i].life *= 0.93
		if (TracerParticles1[i].life < 0.00000001) {
			TracerParticles1.splice(i, 1);
			i--;
		}
	}
	ctx. globalCompositeOperation = "source-over"
	    for (let _ of BulletsData.keys()) {

                if (BulletsData.get(_)[4] == 1  ){
                        if(BulletsData.get(_)[3] == 1 || BulletsData.get(_)[3] == 3){
                if (Math.random() < 1){


                    PIXI.sound.play('dmg'+Math.floor(Math.random()*4));
                }
                if(BulletsData.get(_)[3] == 3){
                    ShakeXbnds += 5
                    ShakeYbnds += 5
                }

                BulletsData.get(_)[3]=0
            }else if(BulletsData.get(_)[3] == 2){
                if (Math.random() < 1){

                        PIXI.sound.play('Sdmg'+Math.floor(Math.random()*3));

                }

                BulletsData.get(_)[3]=0
            }

    //		tornum.innerText = OBJs[0].get('<').get(_)[4];
    //		if (OBJs[1].get('<').has(_)) {
    //			grad=ctx.createLinearGradient(OffsetX+Number(OBJs[0].get('<').get(_)[0]+ (OBJs[1].get('<').get(_)[0] - OBJs[0].get('<').get(_)[0]) * (Date.now() - LastPING) / PING), OffsetY+Number(OBJs[0].get('<').get(_)[1]+ (OBJs[1].get('<').get(_)[1] - OBJs[0].get('<').get(_)[1]) * (Date.now() - LastPING) / PING),Number(OBJs[0].get('<').get(_)[0]+ (OBJs[1].get('<').get(_)[0] - OBJs[0].get('<').get(_)[0]) * (Date.now() - LastPING) / PING)-Math.cos(OBJs[0].get('<').get(_)[2]/180*Math.PI)*30, Number(OBJs[0].get('<').get(_)[1]+ (OBJs[1].get('<').get(_)[1] - OBJs[0].get('<').get(_)[1]) * (Date.now() - LastPING) / PING)-Math.sin(OBJs[0].get('<').get(_)[2]/180*Math.PI)*30);
    //		}else{
                grad=ctx.createLinearGradient(GameW/2 + OffsetX - (X - BulletsData.get(_)[0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - BulletsData.get(_)[1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom,GameW/2 + OffsetX - (X - BulletsData.get(_)[0]+Math.cos(BulletsData.get(_)[2]/180*Math.PI)*BulletsData.get(_)[11] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - BulletsData.get(_)[1]+Math.sin(BulletsData.get(_)[2]/180*Math.PI)*BulletsData.get(_)[11] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
    //		}
//            if (Math.random() < 0.15){
//                    WtrParticles0.push(new WtrPrt0(BulletsData.get(_)[0], BulletsData.get(_)[1]));
//            }
            if (Z == 2){
                grad.addColorStop(1,"#FFFF4400");
                grad.addColorStop(0,"#FFFF4488");
            }else{
                grad.addColorStop(1,"#ffffaa00");
                grad.addColorStop(0,"#ffffaa88");
            }

            ctx.strokeStyle = grad;
            ctx.lineWidth= BulletsData.get(_)[6]/320*Zoom;
    //		ctx.lineCap='round';
            ctx.beginPath()
             ctx.lineCap='round';
//             console.log(GameW/2 + OffsetX - (X - BulletsData.get(_)[0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - BulletsData.get(_)[1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom)
            ctx.moveTo(GameW/2 + OffsetX - (X - BulletsData.get(_)[0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - BulletsData.get(_)[1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
            ctx.lineTo(GameW/2 + OffsetX - (X - BulletsData.get(_)[0]+Math.cos(BulletsData.get(_)[2]/180*Math.PI)*BulletsData.get(_)[11] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - BulletsData.get(_)[1]+Math.sin(BulletsData.get(_)[2]/180*Math.PI)*BulletsData.get(_)[11] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
    //		}
            ctx.stroke();
            ctx.closePath()
    //        ctx.lineCap='round';


            BulletsData.get(_)[0]= BulletsData.get(_)[8]+Math.cos(BulletsData.get(_)[2]/180*Math.PI)*BulletsData.get(_)[5]*((Date.now()-BulletsData.get(_)[10])/1000)
            BulletsData.get(_)[1]= BulletsData.get(_)[9]+Math.sin(BulletsData.get(_)[2]/180*Math.PI)*BulletsData.get(_)[5]*((Date.now()-BulletsData.get(_)[10])/1000)
            if (((Date.now()-BulletsData.get(_)[10])/1000-1/15) > 0){
            BulletsData.get(_)[11] = BulletsData.get(_)[5]*((Date.now()-BulletsData.get(_)[10])/1000-2/15)
            if (BulletsData.get(_)[11] > 0.3){BulletsData.get(_)[11] = 0.3}
            }else{
            BulletsData.get(_)[11] = 0
            }

            if (BulletsData.get(_)[7] || BulletsData.get(_)[0] > 20 || BulletsData.get(_)[0] < -4 || BulletsData.get(_)[1] > 19 || BulletsData.get(_)[1] < -4){
                BulletsData.delete(_)
            }
            }
	}

	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(70,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(70,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(71,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(71,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(72,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(72,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(73,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(73,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(74,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(74,NoTeamTag(Players[_][0]));}
	}
	if (ParticlesProcessing){
	for (i=FireParticles2.length-1; i>=0; i--) {
	            //stage.fillStyle = "rgba(255,0,0,1)";
            ctx.fillStyle = "rgba(255," + 255*FireParticles2[i].life/60+","+255*((FireParticles2[i].life/60)**3)+"," +( Math.sin(FireParticles2[i].life/60*Math.PI)*0.75)+")";
            ctx.beginPath();
            //*Math.sin(particles[i].life/60*Math.PI)
            ctx.arc(OffsetX+(FireParticles2[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2-FireParticles2[i].cof*Math.cos(FireParticles2[i].dir)*FireParticles2[i].rad/320*Zoom,OffsetY+GameH/2+(FireParticles2[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom-FireParticles2[i].cof*Math.sin(FireParticles2[i].dir)*FireParticles2[i].rad/320*Zoom,FireParticles2[i].rad*Math.sin(FireParticles2[i].life/60*Math.PI)/320*Zoom,0,2*Math.PI);
            ctx.closePath();
            ctx.fill();
            FireParticles2[i].dirspd += (Math.random()*2-1)*0.03
            FireParticles2[i].dir += FireParticles2[i].dirspd
            FireParticles2[i].x+=Math.cos(FireParticles2[i].deg) * FireParticles2[i].speed*Math.sin(FireParticles2[i].life/60*Math.PI)*(1-FireParticles2[i].life/60)/320;
            FireParticles2[i].y+=Math.sin(FireParticles2[i].deg) * FireParticles2[i].speed *Math.sin(FireParticles2[i].life/60*Math.PI)*(1-FireParticles2[i].life/60)/320;
            FireParticles2[i].life *= 0.95
            if (FireParticles2[i].life < 5) {
                FireParticles2.splice(i, 1);
                i--;
            }
	}
	}else{
	FireParticles1 = []
	}

		for (i=0; i<BangParticles2.length; i++) {
	    ctx.fillStyle = "rgba(0,0,0,"+(BangParticles2[i].life**0.33)*1+")";

		ctx.beginPath();
		ctx.arc(OffsetX+(BangParticles2[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2,OffsetY+GameH/2+(BangParticles2[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom,BangParticles2[i].rad/320*Zoom,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "rgba(255,160,0,"+(BangParticles2[i].life**1)*1+")";
		ctx.beginPath();
		ctx.arc(OffsetX+(BangParticles2[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2+Math.cos(BangParticles2[i].dir+BangParticles2[i].life*Math.PI*2)*BangParticles2[i].rad*0.2/320*Zoom,OffsetY+GameH/2+(BangParticles2[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom+Math.sin(BangParticles2[i].dir+BangParticles2[i].life*Math.PI*2)*BangParticles2[i].rad*0.2/320*Zoom,BangParticles2[i].rad*0.8/320*Zoom,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
        BangParticles2[i].dir += BangParticles2[i].life*0.25
		BangParticles2[i].x += BangParticles2[i].xs/Zoom/4*BangParticles2[i].life
		BangParticles2[i].y += BangParticles2[i].ys/Zoom/4*BangParticles2[i].life
		BangParticles2[i].rad+=0.75*BangParticles2[i].life**1.25

		BangParticles2[i].life *= 0.98
		if (BangParticles2[i].life < 0.0001) {
			BangParticles2.splice(i, 1);
			i--;
		}
	}

    	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(75,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(75,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(76,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(76,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(77,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(77,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(78,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(78,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(79,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(79,NoTeamTag(Players[_][0]));}
	}

	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(80,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(80,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(81,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(81,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(82,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(82,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(83,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(83,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(84,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(84,NoTeamTag(Players[_][0]));}
	}
	for(i=0; i<SnowParticles0.length; i++)
	{	
		// console.log(SnowParticles0[i].x,SnowParticles0[i].y)
		// console.log(newDeg)
		if (!(Math.abs(nX-X) >1 || Math.abs(nY-Y) > 1)){
			
		SnowParticles0[i].ra+=SnowParticles0[i].as;
		SnowParticles0[i].x -= SnowParticles0[i].d * Math.sqrt(SnowParticles0[i].r/2)*Math.cos(SnowParticles0[i].ra);
		SnowParticles0[i].y -= SnowParticles0[i].d * Math.sqrt(SnowParticles0[i].r/2)*Math.sin(SnowParticles0[i].ra);
		SnowParticles0[i].x -= SnowParticles0[i].d * Math.sqrt(SnowParticles0[i].r/2)*(nX-X)*Zoom;
		SnowParticles0[i].y -= SnowParticles0[i].d * Math.sqrt(SnowParticles0[i].r/2)*(nY-Y)*Zoom;
		}
		if(SnowParticles0[i].x > canvas.width+5)
		{
                SnowParticles0[i].x = -5;
		}else if (SnowParticles0[i].x < -5){
			    SnowParticles0[i].x = canvas.width+5;
        }
		if(SnowParticles0[i].y > canvas.height+5)
		{
                SnowParticles0[i].y = -5;
		}else if (SnowParticles0[i].y < -5){
			    SnowParticles0[i].y = canvas.height+5;
		}

		ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
		ctx.beginPath();
		ctx.arc(SnowParticles0[i].x, SnowParticles0[i].y, SnowParticles0[i].r, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	}
	for(i=0; i<RainParticles0.length; i++)
	{
		// console.log(SnowParticles0[i].x,SnowParticles0[i].y)
		// console.log(newDeg)
		if (!(Math.abs(nX-X) >1 || Math.abs(nY-Y) > 1)){

		RainParticles0[i].x -= (nX-X)*Zoom/2;
		RainParticles0[i].y -=  (nY-Y)*Zoom/2;
		}
		RainParticles0[i].life *= 1.05
		ctx.fillStyle = "rgba(64, 64, 255, "+ Math.sin(RainParticles0[i].life*Math.PI)*0.25+")";
		ctx.beginPath();
		ctx.arc(RainParticles0[i].x, RainParticles0[i].y, (1-(RainParticles0[i].life)*0.5)*10, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
		if (RainParticles0[i].life > 1){
            RainParticles0.splice(i, 1);
			i--;
		}
	}
    for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(85,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(85,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(86,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(86,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(87,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(87,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(88,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(88,NoTeamTag(Players[_][0]));}
	}
	for (let _ = 0; _ < Players.length; _++) {
                        if (Players[_][0]  == PlayerName){Vehicles[Players[_][1]].drawp(89,NoTeamTag(Players[_][0]))} else{Vehicles[Players[_][1]].draw(89,NoTeamTag(Players[_][0]));}
	}
        }
        window.requestAnimationFrame(DRAW);
       }catch(e)
       {
       console.log(e,e.stack)
       window.requestAnimationFrame(DRAW);

       }

}
LastAnime = Date.now()
window.requestAnimationFrame(DRAW);

function mousepos(e){
	mouseX = e.pageX;
	mouseY = e.pageY;
}
window.onload=function () {
document.getElementById('TitleScreen').classList = ['titlescrh']
GetServerInfo()
if(navigator.userAgent.match(/iPhone/i)){
document.documentElement.requestFullscreen()
}
}
function startgamebtn() {
document.getElementById('TitleScreen').classList = ['titlescrs']
setTimeout(startgame,1500)
}
