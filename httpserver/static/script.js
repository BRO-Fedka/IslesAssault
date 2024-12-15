PIXI.sound.add("MainMenuMusic",{
    url: "static\\mainMenuMusic.mp3",
    autoPlay:true
   })

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
     parseInt(result[1], 16),
     parseInt(result[2], 16),
     parseInt(result[3], 16)
   ]: null;
}

function rgbToHex(r, g, b) {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

let tree_size = new Map()
tree_size.set(0,0.1)
tree_size.set(1,0.15)
tree_size.set(2,0.2)
tree_size.set(3,0.25)

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
        }
    }else{
        if (Zoom < GameW/VIEW_X/2){
            Zoom = GameW/VIEW_X/2
        }
    }}
}
let GameStatus = "MainMenu"

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
function forgetServer(){
    document.getElementById('online').innerHTML = '?/?'
    document.getElementById('text').innerHTML = 'No information yet'
    document.getElementById('impprev').src = ''

}
function onMouseUpdate(e) {
  let x = e.pageX;
  for (let i = 0; i < BGLayers.length; i++) {
        document.getElementById("SvgLayer"+i).style.transform= 'translateX('+((x - window.innerWidth / 2) * BGLayers[i][0])*1920/window.innerWidth+'px)'
  }

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
                        PIXI.sound.play('MainMenuMusic');
                        document.getElementById('Inventory').innerHTML = ""
                        document.getElementById('chk-game').checked = false
                        document.getElementById("chkInterfaceHide").checked = false
                        chatview.innerHTML = ""
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
function NoTeamTag(name, updTags=false){
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
PIXI.sound.add("rocketHit","static\\rocketHit.mp3")

PIXI.sound.add("dmg0","static\\dmg\\0.mp3")
PIXI.sound.add("dmg1","static\\dmg\\1.mp3")
PIXI.sound.add("dmg2","static\\dmg\\2.mp3")
PIXI.sound.add("dmg3","static\\dmg\\3.mp3")

PIXI.sound.add("Sdmg0","static\\Sdmg\\0.mp3")
PIXI.sound.add("Sdmg1","static\\Sdmg\\1.mp3")

PIXI.sound.add("mcanon","static\\mcanon.mp3")
PIXI.sound.add("pcanon","static\\pcanon.mp3")
PIXI.sound.add("tcanon","static\\mcanon.mp3")
PIXI.sound.add("hcanon","static\\pcanon.mp3")
PIXI.sound.add("fcanon","static\\pcanon.mp3")

let TVehicles = new Map()

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
let PlayerVehicleID = 0
var CurVehicle;
var Zones = '';
var SelectedVehicleShopId = null
function onWheel(e){
    if (e.deltaY > 0){
        Zoom -= 10
    }else{
        Zoom += 10
    }
    if (Zoom > 640){Zoom = 640}
    ZoomCorrection()
}
function ShowPrevVeh(){
    sessionStorage.setItem('VehicleSelectVal',document.getElementById('VehicleSelect').value)
	for (let _ of VehList) {
        if(_[1]==document.getElementById('VehicleSelect').value){
            document.getElementById('vehprev').src = _[2];
            SelectedVehicleShopId = _[3]
            break;
        }
	}
}

function drawLayer(layer) {
    for (let _ of Entities.keys()) {
        Entities.get(_).draw(layer)

    }
    TVehicles.forEach(vehicle => {
        if (vehicle.id == CurVehicleID){
            vehicle.drawp(layer)
        }else{
            vehicle.drawe(layer)
        }
    })
    if (Particles.has(layer)){
        Particles.get(layer).forEach(particle => {
            particle.draw()
        })
    }
    if (MAPstatic.hasOwnProperty(layer)){
        
        //#TODO draw map static in drawLayer
    }


}

function GetServerInfo(){
            try{
                let soc = new WebSocket(document.getElementById('ServerAddress').value);

                soc.addEventListener('open', function (event) {
//                    console.log('!');
                    soc.send('info');
                });

                function taken(event) {
//                    console.log(event.data)
                    var data = JSON.parse(event.data);
//                    console.log(data)
                    document.getElementById('impprev').src = data.map;
                    document.getElementById('Map').src = data.map;
                    document.getElementById('online').innerHTML = "Players: "+data.online;
                    document.getElementById('text').innerHTML = data.text;
//                    console.log(data.js)
//                    console.log(document.getElementById('prevmpjs').src)
                    document.getElementById('prevmpjs').src = data.js;
                    BGLayers = data.bg;
                    UpdateBG()
                    MainScreen.style.background = data.bg_cl
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
//                        console.log(data.vehicleAvailable[0][1])
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
'Q':[],
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

let Zoom = 320
let currentZoom = 320
let socket = null
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
let OffsetX = 0
let OffsetY=0
let indicators = document.getElementById('indicators')

document.getElementById('VolumeRange').value = localStorage.getItem('SettingsVolumeRangeVal')
document.getElementById('MusicRange').value = localStorage.getItem('SettingsMusicRangeVal')
UpdtVolumes()
let MSGTKNDT = new Date();
let FPS = 30;
let PING = 0;
let LastPING = Date.now();
let Send = false;
let hp = document.getElementById('HPNum');
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
let playerModulesCanvas = document.getElementById('player-modules-canvas')
let pmcctx = playerModulesCanvas.getContext('2d');
pmcctx.globalCompositeOperation='xor';
playerModulesCanvas.width = 160
playerModulesCanvas.height = 160
let chatview = document.getElementById('ChatView');
let map = document.getElementById('MapForm');
let mapimg = document.getElementById('Map');
let tab = document.getElementById('TabForm');
let moneys = document.getElementById('MoneyB');
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

function changeColor(){
sessionStorage.setItem("SelectedCL",document.querySelector('input[name="color"]:checked').value)
}
try{
document.querySelector('input[name="color"][value="'+ sessionStorage.getItem("SelectedCL")+'"]').checked = true
}
catch{}

let MSGs = [];
let Particles = new Map();

let input = new Map();
input.set(87,false);
input.set(65,false);
input.set(83,false);
input.set(68,false);
input.set(32,false);
input.set(71,false);
input.set(70,false);
input.set(79,false);
input.set('Tab',false);
input.set('m0',false);
let dobleinput = new Map();
dobleinput.set(87,false);
dobleinput.set(79,false);
dobleinput.set(65,false);
dobleinput.set(83,false);
dobleinput.set(68,false);
dobleinput.set(32,false);
dobleinput.set(71,false);
dobleinput.set(70,false);
dobleinput.set('m0',false);
let mouseX = 0;
let mouseY = 0;
let INFO = '';
let MAP = new Map()
MAP.set('b',new Map())
MAP.set('s',new Map())
MAP.set('z',new Map())
MAP.set('g',new Map())
let lastMSGid = 0
let Entities = new Map()

function startgame() {
    document.getElementById('chk-game').checked = true
    GameStatus = "InGame"
    UpdateObjs = true
    PIXI.sound.stop('MainMenuMusic')
	if (true) {
		canvas.addEventListener("mousedown", mclick, false);
		document.addEventListener("mouseup", mrelease, false);
		document.addEventListener('mousemove', mousepos, false);
		document.addEventListener('fullscreenchange', fresize  );
		document.addEventListener('keydown',keydown);
		document.addEventListener('keyup', keyup);
		messagefield.addEventListener("focusout",mifo)
		document.addEventListener("wheel", onWheel);

		try {
			socket = new WebSocket(document.getElementById('ServerAddress').value);
			socket.addEventListener('open', function (event) {

				socket.send('n'+nicknameinput.value+'\n'+document.querySelector('input[name="color"]:checked').value+'\n'+document.getElementById('VehicleSelect').value+'\n'+document.getElementById('NICK').innerText+'\n'+document.getElementById('PASS').innerText);
				vehicle = Number(document.getElementById('VehicleSelect').value)
			});
			function taken(event) {
			    lastMSGid = event.data.split(',')[0]
			    let eventdata = event.data.slice(lastMSGid.length+1,event.data.length)
//			    console.log(eventdata)
			    lastMSGid = Number(lastMSGid)
				if (eventdata[0] == 'E'){
				    GameStatus= "Error"
					document.getElementById('TitleScreen').classList = ['titlescrh']
					document.getElementById("chkInterfaceHide").checked = false
					alert( eventdata.split(',')[1])
				}else if(eventdata[0] == 'M'){

                    document.getElementById('TitleScreen').classList = ['titlescrh']
                    var xmlHttp = new XMLHttpRequest();
                    xmlHttp.open( "GET", eventdata.substring(1), false ); // false for synchronous request
                    xmlHttp.send( null );
                    MAPstatic = JSON.parse(xmlHttp.responseText);
                    for (let _ in MAPstatic['#']){
                        for(let t in MAPstatic['#'][_]){
                            MAPstatic['#'][_][t].push(0)
                        }
                    }
                    WH = MAPstatic['WH']
                    ZonesNum.innerHTML = ''
                    for(let _ = 0; _ < MAPstatic['*'].length; _++){
                        ZonesNum.innerHTML += '<div class="Zone" style="background-color: red" id="zone'+_ +'"><b>'+MAPstatic['*'][_][0]+'</b></div>'
                    }

                    setTimeout(function(){UpdateObjs = true}, 300);
                    socket.send((input.get('m0') || dobleinput.get('m0')  ? 1 : 0).toString()+(input.get(87) || dobleinput.get(87) ? 1 : 0).toString()+(input.get(65) || dobleinput.get(65) ? 1 : 0).toString()+(input.get(83) || dobleinput.get(83) ? 1 : 0).toString()+(input.get(68) || dobleinput.get(68) ? 1 : 0).toString()+(input.get(32) || dobleinput.get(32) ? 1 : 0).toString()+(input.get(71) || dobleinput.get(71) ? 1 : 0).toString()+(input.get(70) || dobleinput.get(70) ? 1 : 0).toString()+(input.get('Tab') ? 1 : 0).toString()+(Cmod ? 1 : 0).toString()+(Xmod ? 1 : 0).toString()+(curView).toString()+((mouseX-GameW/2/window.devicePixelRatio)/Zoom).toString()+','+((mouseY-GameH/2/window.devicePixelRatio)/Zoom).toString());
				}
				else if (eventdata[0] == 'D'){
						GameStatus = "MainMenu"
						PlayersData = new Map()
						PIXI.sound.play('MainMenuMusic');
                        let children = document.getElementById('Inventory').children;
                        for (let i = 0; i < children.length; i++) {
                          children[i].style.display = "none"
                        }
                        document.getElementById("chk-game").checked = false
                        document.getElementById("chkInterfaceHide").checked = false
                        chatview.innerHTML = ""
                        StartMainMusicPlay = Date.now()
                        Players = []
                        socket.close();
				}else if (eventdata[0] == 'R'){
						socket.close();
						SaveMusicPos()
						location.replace(event.data.slice(1));
				}else {
 					MSGTKNDT = new Date();
					INFO = eventdata;
					PING = Date.now() - LastPING;
					LastPING = Date.now();
					let infarr = INFO.split('\n');
					let grad = null;
					Players = []
					splstr = infarr[0].split(',')
					PlayerTags = new Map()
					PlayerName = splstr[4]
					CurVehicleID = Number(splstr[2])
					CurVehicleType = Number(splstr[3])
//                    console.log(INFO)
					Z = Number(splstr[1])
					Money = splstr[0]
//					Zones = splstr[splstr.length -1].toString()
//					for(let _ = 0; _ < Zones.length; _++){
//                        let tmp = document.getElementById("zone"+_.toString());
//                        if (Zones[_] == '1'){
//                            tmp.style.background = '#44f'
//                        }else{
//                            tmp.style.background = '#f00'
//                        }
//					}
					// argarr = []
					// for (let _ = 4; _ < splstr.length; _++){
                    //             argarr.push(splstr[_])
					// }
                    if (!(PlayerName=="" || PlayerName == undefined)){
//                        console.log(PlayerName)
                        // PlayerName = NoTeamTag(PlayerName,true)
//                        console.log(PlayerName)
                        // Players.push([PlayerName,CurVehicleType]);
                        if (!(TVehicles.has(CurVehicleID))){
                            TVehicles.set(CurVehicleID,new Heavy(CurVehicleID,PlayerName))
                        }
                        let pad = splstr[0].length + 1 + splstr[1].length + 1 + splstr[2].length + 1 + splstr[3].length + 1
//                        console.log(infarr[0],pad)
                         
                        let str = infarr[0].slice(pad)
//                        console.log(str)
                        TVehicles.get(CurVehicleID).updatep(str)
                    }else{
                    UpdateObjs= true
                    }
					if(!(moneyb == null)) {
						moneyb.innerText = Money
					}
					PlayerMark.style.left = (X/WH*100).toString()+'%'
					PlayerMark.style.top = (Y/WH*100).toString()+'%'
					if (infarr[0].split(',')[6]==0 && false){
						BURNING = true
					}
					let ceilswas = false;
					for (let h = 1; h < infarr.length; h++) {
						let larr =infarr[h].split(',');
						// console.log(larr[0])
						if (larr[0] == '#'){
                            switch (larr[1]) {
                                case 'c':
                                    Entities.set(larr[3],new EntitiesTable[larr[2]](larr))
                                    break;
                                case 'u':
                                    if (Entities.has(larr[3])){
                                        Entities.get(larr[3]).update(larr)
                                    }
                                case 'd':
                                    if (Entities.has(larr[3])){
                                        Entities.get(larr[3]).delete(larr)
                                    }
                                    break;
                            }
                            

						}else 	if (larr[0] == '+' ){
//						    console.log(larr)
                            PN = larr[3]
                            CVID = larr[1]
                            CVT = larr[2]
                            if (!(TVehicles.has(CVID))){
                                TVehicles.set(CVID,new Heavy(CVID,PN))
                            }
                            let pad = larr[0].length + 1 + larr[1].length + 1 + larr[2].length + 1 //+ larr[3].length + 1


                            let str = infarr[h].slice(pad)
//                            console.log(str)
                            TVehicles.get(CVID).updatee(str)
						}
					}
					dellarr = []

                    while (dellarr.length > 0){
                        PlayersData.delete(dellarr[0])
                        dellarr.shift()
                    }

					if (Send == true){
					    if(messagebtn.innerText == "Team"){
					    socket.send(lastMSGid.toString()+','+(input.get('m0') || dobleinput.get('m0')  ? 1 : 0).toString()+(input.get(87) || dobleinput.get(87) ? 1 : 0).toString()+(input.get(65) || dobleinput.get(65) ? 1 : 0).toString()+(input.get(83) || dobleinput.get(83) ? 1 : 0).toString()+(input.get(68) || dobleinput.get(68) ? 1 : 0).toString()+(input.get(32) || dobleinput.get(32) ? 1 : 0).toString()+(input.get(71) || dobleinput.get(71) ? 1 : 0).toString()+(input.get(70) || dobleinput.get(70) ? 1 : 0).toString()+(input.get('Tab') ? 1 : 0).toString()+(Cmod ? 1 : 0).toString()+(Xmod ? 1 : 0).toString()+(curView).toString()+((mouseX-GameW/2/window.devicePixelRatio)/Zoom).toString()+','+((mouseY-GameH/2/window.devicePixelRatio)/Zoom).toString()+',m/team chat '+messageinput.value);
					    }else{
					    socket.send(lastMSGid.toString()+','+(input.get('m0') || dobleinput.get('m0')  ? 1 : 0).toString()+(input.get(87) || dobleinput.get(87) ? 1 : 0).toString()+(input.get(65) || dobleinput.get(65) ? 1 : 0).toString()+(input.get(83) || dobleinput.get(83) ? 1 : 0).toString()+(input.get(68) || dobleinput.get(68) ? 1 : 0).toString()+(input.get(32) || dobleinput.get(32) ? 1 : 0).toString()+(input.get(71) || dobleinput.get(71) ? 1 : 0).toString()+(input.get(70) || dobleinput.get(70) ? 1 : 0).toString()+(input.get('Tab') ? 1 : 0).toString()+(Cmod ? 1 : 0).toString()+(Xmod ? 1 : 0).toString()+(curView).toString()+((mouseX-GameW/2/window.devicePixelRatio)/Zoom).toString()+','+((mouseY-GameH/2/window.devicePixelRatio)/Zoom).toString()+',m'+messageinput.value);
					    }
						messageinput.value = ''
						Send=false
					}else{
						socket.send(lastMSGid.toString()+','+(input.get('m0') || dobleinput.get('m0')  ? 1 : 0).toString()+(input.get(87) || dobleinput.get(87) ? 1 : 0).toString()+(input.get(65) || dobleinput.get(65) ? 1 : 0).toString()+(input.get(83) || dobleinput.get(83) ? 1 : 0).toString()+(input.get(68) || dobleinput.get(68) ? 1 : 0).toString()+(input.get(32) || dobleinput.get(32) ? 1 : 0).toString()+(input.get(71) || dobleinput.get(71) ? 1 : 0).toString()+(input.get(70) || dobleinput.get(70) ? 1 : 0).toString()+(input.get('Tab') ? 1 : 0).toString()+(Cmod ? 1 : 0).toString()+(Xmod ? 1 : 0).toString()+(curView).toString()+((mouseX-GameW/2/window.devicePixelRatio)/Zoom*window.devicePixelRatio).toString()+','+((mouseY-GameH/2/window.devicePixelRatio)/Zoom*window.devicePixelRatio).toString());
					}
					SENDB = ''
					SENDS = ''
					dobleinput.set(87,false);
					dobleinput.set(79,false);
					dobleinput.set(65,false);
					dobleinput.set(83,false);
					dobleinput.set(68,false);
					dobleinput.set(32,false);
					dobleinput.set(71,false);
					dobleinput.set(70,false);
					dobleinput.set('m0',false);
					input.set('Tab',false)
			}}
			socket.addEventListener('message', taken);
			socket.onerror =  function (e) {
				document.getElementById('TitleScreen').classList = ['titlescrh']
				document.getElementById("chkInterfaceHide").checked = false
//				console.log('ERROR')
			}

		} catch (err){
//		    console.log(err,err.stack)
		}
	}
}


function resize(){
    GameW = window.innerWidth*window.devicePixelRatio;
    GameH = window.innerHeight*window.devicePixelRatio;
	canvas.width  = window.innerWidth*window.devicePixelRatio;
	canvas.height = window.innerHeight*window.devicePixelRatio;
	canvas.style.width = window.innerWidth + "px";
	canvas.style.height = window.innerHeight + "px";
    ZoomCorrection()
}
function fresize(){
    GameW = window.innerWidth*window.devicePixelRatio;
    GameH = window.innerHeight*window.devicePixelRatio;
	canvas.width  = window.innerWidth*window.devicePixelRatio;
	canvas.height = window.innerHeight*window.devicePixelRatio;
	canvas.style.width = window.innerWidth + "px";
	canvas.style.height = window.innerHeight + "px";
	ZoomCorrection()
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
	if (messagefield.style.display == 'none' && (event.keyCode == 87 || event.keyCode == 65 || event.keyCode == 83 || event.keyCode == 68 || event.keyCode == 32|| event.keyCode == 71 || event.keyCode == 79|| event.keyCode == 70)){
		input.set(event.keyCode,true);
		dobleinput.set(event.keyCode,true)
	}
	 else if (event.key == 'Enter' && GameStatus == "InGame") {
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
		document.getElementById('ViewImg').src = Vehicles[CurVehicle].viewsIcons[curView]
	}else if (messagefield.style.display == 'none' && (event.keyCode == 77 )) {
		map.style.display = 'block';
	}else if (messagefield.style.display == 'none' && (event.keyCode == 9) ) {
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
	if (event.keyCode == 87 || event.keyCode == 65 || event.keyCode == 83 || event.keyCode == 68 || event.keyCode == 32 || event.keyCode == 71|| event.keyCode == 79|| event.keyCode == 70){
		input.set(event.keyCode,false);
	} else if (event.keyCode == 77 ) {
		map.style.display = 'none';
	}else if (event.keyCode == 9 ) {
		tab.style.display = 'none';
	}
}
let start = null;
let timenow = Date.now()
let VisibleObjs = new Object()
let UpdateObjs = true
let QupdtSequence = 0
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
	LastAnime = Date.now()
    if (!start) start = timestamp;
    let progress = timestamp - start; //'#2879ADFF'
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	pmcctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = MAPstatic.CT.bg;
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.fill()
    if (GameStatus == "InGame" || true){
        if (((Math.round(X) != Math.round(nX) || Math.round(Y) != Math.round(nY))&& QupdtSequence != X*nX+Y*nY) || UpdateObjs){
            VisibleObjs = new Object()
            UpdateObjs = false
            for (let x=Math.round(X)-VIEW_X-2; x < Math.round(X)+VIEW_X+2; x++){
                for (let y=Math.round(Y)-VIEW_Y-2; y < Math.round(Y)+VIEW_Y+2; y++){
                    if (x < 0 || y <0 || x >= WH || y >= WH) continue
        //                console.log(MAPstatic
        //                console.log(MAPstatic['Q'][x])
                        let q = MAPstatic['Q'][x][y]
        //                console.log(q)
                        q_keys = Object.keys(q)
                        for (let _ in q_keys){
                            if (!(q_keys[_] in VisibleObjs) ){
                                VisibleObjs[q_keys[_]] = new Set()
                            }
                            for(let i of MAPstatic['Q'][x][y][q_keys[_]]){
                                VisibleObjs[q_keys[_]].add(i)
                            }
                        }

                }

            }
            QupdtSequence = X*nX+Y*nY

            }

	for (let __ of VisibleObjs['B']){
	        let _ = MAPstatic['B'][__]
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
	for (let __ of VisibleObjs['S']){
	        let _ = MAPstatic['S'][__]
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
	for (let __ of VisibleObjs['C']){
	        let _ = MAPstatic['C'][__]
		    ctx.strokeStyle = MAPstatic.CT.zs;
			ctx.lineJoin = 'bevel';
			ctx.beginPath();
            ctx.lineWidth = 60/320*Zoom;
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
	for (let __ of VisibleObjs['B']){
	        let _ = MAPstatic['B'][__]
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
	for (let __ of VisibleObjs['S']){
	        let _ = MAPstatic['S'][__]
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
    	for (let __ of VisibleObjs['C']){
	        let _ = MAPstatic['C'][__]
		    ctx.strokeStyle = MAPstatic.CT.zf;
			ctx.lineJoin = 'bevel';
			ctx.beginPath();
            ctx.lineWidth = 30/320*Zoom;
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


    if(Z!=0){
    for (let __ of VisibleObjs['_']){
        let _ = MAPstatic['_'][__]
                ctx.beginPath()
                ctx.moveTo(GameW/2 + OffsetX - (X - _[0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
                ctx.lineTo(GameW/2 + OffsetX - (X - _[2] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[3] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
                ctx.closePath()
                ctx.strokeStyle = MAPstatic.CT.b2
                ctx.lineCap = 'square';
                ctx.lineWidth = 70/320*Zoom;
                ctx.stroke();
    }}
    ctx.fillStyle = MAPstatic.CT.bf;
    ctx.strokeStyle = MAPstatic.CT.bs;
    ctx.lineWidth = ((Math.sin(timenow/50/180*Math.PI)+1)*7+3)/320*Zoom;
	for (let __ of VisibleObjs['B']){
	        let _ = MAPstatic['B'][__]

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
			ctx.stroke();
    }
    for (let __ of VisibleObjs['B']){
        let _ = MAPstatic['B'][__]
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
    }
    ctx.fillStyle = MAPstatic.CT.gf;
    ctx.strokeStyle = MAPstatic.CT.gs;
	for (let __ of VisibleObjs['G']){
	        let _ = MAPstatic['G'][__]
            ctx.lineWidth = 20/320*Zoom;
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
			ctx.stroke();
    }

    for (let __ of VisibleObjs['G']){
        let _ = MAPstatic['G'][__]
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
    }
    if(Z==0){
    for (let __ of VisibleObjs['_']){
        let _ = MAPstatic['_'][__]
                ctx.beginPath()
                ctx.moveTo(GameW/2 + OffsetX - (X - _[0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
                ctx.lineTo(GameW/2 + OffsetX - (X - _[2] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[3] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
                ctx.closePath()
                ctx.strokeStyle = MAPstatic.CT.b2
                ctx.lineCap = 'square';
                ctx.lineWidth = (60)/320*Zoom;
                ctx.stroke();
    }}
    for (let __ of VisibleObjs['C']){
	        let _ = MAPstatic['C'][__]
            ctx.fillStyle = MAPstatic.CT.cf;
            ctx.strokeStyle = MAPstatic.CT.cs;
            ctx.lineWidth = 2.5/320*Zoom;
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
    for (let __ of VisibleObjs['R']){
	        let _ = MAPstatic['R'][__]
            ctx.strokeStyle = MAPstatic.CT.cs;
            ctx.lineWidth = 40/320*Zoom;

            ctx.beginPath();
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
			for (let l = 0; l < _.length; l += 1) {
					if (l == 0) {
						ctx.moveTo(GameW/2 + OffsetX - (X - _[0][0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[0][1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
					} else {
						ctx.lineTo(GameW/2 + OffsetX - (X - _[l][0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[l][1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom)
					}
			}

			ctx.stroke();
			ctx.closePath();
			ctx.lineCap = 'square';
			ctx.lineJoin = 'bevel';
    }
        for (let __ of VisibleObjs['R']){
	        let _ = MAPstatic['R'][__]
            ctx.lineWidth = 2/320*Zoom;
			ctx.strokeStyle = MAPstatic.CT.rd;
            ctx.setLineDash([10/320*Zoom,10/320*Zoom])
            ctx.beginPath();
			for (let l = 0; l < _.length; l += 1) {
					if (l == 0) {
						ctx.moveTo(GameW/2 + OffsetX - (X - _[0][0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[0][1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
					} else {
						ctx.lineTo(GameW/2 + OffsetX - (X - _[l][0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[l][1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom)
					}
			}

			ctx.stroke();
			ctx.setLineDash([])
			ctx.closePath();

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
                ctx.textAlign = 'center'
                ctx.font = (MAPstatic['*'][_][3]*300/320*Zoom).toString()+"px ZCOOL QingKe HuangYou";
                ctx.beginPath()
                ctx.arc(GameW/2 + OffsetX - (X - MAPstatic['*'][_][1] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom, GameH/2+ OffsetY - (Y - MAPstatic['*'][_][2]+ (nY - Y) * (Date.now() - LastPING) / PING)*Zoom, MAPstatic['*'][_][3]*Zoom/2, 0, Math.PI * 2);
                ctx.fillText(MAPstatic['*'][_][0],GameW/2+ OffsetX - (X- MAPstatic['*'][_][1] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2+ OffsetY- (Y- MAPstatic['*'][_][2] + (nY - Y) * (Date.now() - LastPING) / PING )*Zoom+MAPstatic['*'][_][3]*100/320*Zoom);
                ctx.closePath()
                ctx.stroke();
    }

    ctx.lineWidth=5;
    ctx.beginPath();
    ctx.rect(GameW/2 + OffsetX - (X + (nX - X) * (Date.now() - LastPING) / PING)*Zoom, GameH/2 + OffsetY - (Y + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom, WH*Zoom, WH*Zoom);
    ctx.closePath();
    ctx.strokeStyle = '#ff0000ff';
    ctx.stroke();


    ["OnWater-2","OnWater-1","OnWater","OnWater+1","OnWater+2","OnWater+3"].forEach(drawLayer);



    for (let __ of VisibleObjs['_']){
	        ctx.lineCap = 'butt';
	        let _ = MAPstatic['_'][__]
            len = 0.1/Math.sqrt( (_[0]- _[2])*(_[0]- _[2])+(_[1]- _[3])*(_[1]- _[3]))
            ctx.beginPath()
            ctx.lineCap = 'butt';
            ctx.moveTo(GameW/2 + OffsetX - (X - _[0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
            ctx.lineTo(GameW/2 + OffsetX - (X - ( _[0]+(_[2]- _[0])*len) + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - ( _[1]+(_[3]- _[1])*len) + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);

            ctx.moveTo(GameW/2 + OffsetX - (X - _[2] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[3] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
            ctx.lineTo(GameW/2 + OffsetX - (X - ( _[0]+(_[2]- _[0])*(1-len)) + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - ( _[1]+(_[3]- _[1])*(1-len)) + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
            ctx.closePath()
            ctx.strokeStyle = MAPstatic.CT.cs;
            ctx.lineWidth = 60/320*Zoom;
            ctx.stroke();
    }
	if (Z >0){
	for (let __ of VisibleObjs['_']){
	        ctx.lineCap = 'square';
	        let _ = MAPstatic['_'][__]
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
    }}
        for (let __ of VisibleObjs['#']){

	        let _ = MAPstatic['#'][__]



			for (let l = 0; l < _.length; l += 1) {
                if (_[l][6] == 2) {dddddd

                    let poly = []
                    let cos = Math.cos(_[l][5]/180*Math.PI)
                    let sin = Math.sin(_[l][5]/180*Math.PI)
                    poly = [[-_[l][4]/2, -_[l][3]/2], [-_[l][4]/2, _[l][3]/2], [_[l][4]/2, _[l][3]/2], [_[l][4]/2, -_[l][3]/2]]
                    ctx.beginPath();
                    ctx.fillStyle = MAPstatic.CT.cs
                    ctx.lineWidth = 2/320*Zoom
                    ctx.moveTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
                    for (let p = 1; p < poly.length; p+=1) {
                        ctx.lineTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[p][1]*cos*Zoom)+(poly[p][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[p][1]*sin*Zoom)+(poly[p][0]*-cos*Zoom));
                    }
                    ctx.lineTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
                    ctx.fill();
                    ctx.closePath();
                }

			}
    }


	for (let __ of VisibleObjs['S']){
	        let _ = MAPstatic['S'][__]
    		ctx.fillStyle = MAPstatic.CT.sf;
			ctx.lineWidth= 5/320*Zoom;
			ctx.lineJoin = 'round';
            ctx.strokeStyle = MAPstatic.CT.ss;
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
			ctx.lineJoin = 'miter';
    }

    for (let __ of VisibleObjs['#']){

	        let _ = MAPstatic['#'][__]



			for (let l = 0; l < _.length; l += 1) {
			    if (_[l][6]%2==1) {
                    if (_[l][6] == 3){
//                        PIXI.sound.play('bang');
//                        for (let i = 0; i < 5; i++) {
//                            BangParticles1.push(new bangPrt(BombsData.get(_)[2],BombsData.get(_)[3]))
//                        }
                        ShakeXbnds += 10
                        ShakeYbnds += 1
                    }else{

                    }
                    _[l][6]-=1
			    }
                if (_[l][6] == 2) {

                    continue
                }

                if (_[l][0] == 0){
                    let poly = []
                    let cos = Math.cos(_[l][5]/180*Math.PI)
                    let sin = Math.sin(_[l][5]/180*Math.PI)
                    if (_[l][3] > _[l][4]){
                        poly = [[0, -_[l][3]/2], [0, _[l][3]/2], [_[l][4]/2, _[l][3]/2], [_[l][4]/2, -_[l][3]/2]]
                    }else{
                        poly = [[ -_[l][4]/2,0], [ _[l][4]/2,0], [ _[l][4]/2,_[l][3]/2], [ -_[l][4]/2, _[l][3]/2]]
                    }
                    ctx.beginPath();
                    ctx.fillStyle = MAPstatic.CT.rr
                    ctx.moveTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
                    for (let p = 1; p < poly.length; p+=1) {
                        ctx.lineTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[p][1]*cos*Zoom)+(poly[p][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[p][1]*sin*Zoom)+(poly[p][0]*-cos*Zoom));
                    }
                    ctx.lineTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
                    ctx.fill();
                    ctx.closePath();
                    if (_[l][3] > _[l][4]){
                        poly = [[-_[l][4]/2, -_[l][3]/2], [-_[l][4]/2, _[l][3]/2], [0, _[l][3]/2], [0, -_[l][3]/2]]
                    }else{
                        poly = [[-_[l][4]/2,-_[l][3]/2 ], [_[l][4]/2,-_[l][3]/2 ], [ _[l][4]/2,0], [ -_[l][4]/2,0]]
                    }
                    ctx.beginPath();
                    ctx.fillStyle = MAPstatic.CT.rl
                    ctx.moveTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
                    for (let p = 1; p < poly.length; p+=1) {
                        ctx.lineTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[p][1]*cos*Zoom)+(poly[p][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[p][1]*sin*Zoom)+(poly[p][0]*-cos*Zoom));
                    }
                    ctx.lineTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
                    ctx.fill();
                    ctx.closePath();
                }else if(_[l][0] == 1){
                    let poly = []
                    let cos = Math.cos(_[l][5]/180*Math.PI)
                    let sin = Math.sin(_[l][5]/180*Math.PI)
                    poly = [[ -_[l][3],0], [_[l][3],0 ]]
                    ctx.beginPath();

                    ctx.moveTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
                    for (let p = 1; p < poly.length; p+=1) {
                        ctx.lineTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[p][1]*cos*Zoom)+(poly[p][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[p][1]*sin*Zoom)+(poly[p][0]*-cos*Zoom));
                    }
                    ctx.lineCap = 'butt'
                    ctx.lineWidth = _[l][4]*Zoom/2
                    ctx.strokeStyle = MAPstatic.CT['w'+l%3]
                    ctx.stroke();
                    ctx.strokeStyle = MAPstatic.CT['e'+l%3]
                    ctx.setLineDash([2/320*Zoom,2/320*Zoom])
                    ctx.stroke();
                    ctx.setLineDash([])
                    ctx.closePath();

                }else if(_[l][0] == 2){
                    let poly = []
                    let cos = Math.cos(_[l][5]/180*Math.PI)
                    let sin = Math.sin(_[l][5]/180*Math.PI)
                    poly = [[-_[l][3]/2, -_[l][3]/2], [-_[l][3]/2, _[l][3]/2], [_[l][3]/2, _[l][3]/2], [_[l][3]/2, -_[l][3]/2]]
                    ctx.beginPath();
                    ctx.fillStyle = MAPstatic.CT.if
                    ctx.moveTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
                    for (let p = 1; p < poly.length; p+=1) {
                        ctx.lineTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[p][1]*cos*Zoom)+(poly[p][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[p][1]*sin*Zoom)+(poly[p][0]*-cos*Zoom));
                    }
                    ctx.lineTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
                    ctx.fill();
                    ctx.closePath();
                    ctx.beginPath();
                    ctx.fillStyle = MAPstatic.CT.is
                    ctx.arc(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom +GameH/2 + OffsetY,_[l][3]/2*Zoom,0 , Math.PI*2 )
                    ctx.fill();
                    ctx.closePath();
                    ctx.beginPath();
                    ctx.fillStyle = MAPstatic.CT.io
                    ctx.arc(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom +GameH/2 + OffsetY,_[l][3]*Zoom/3,0 , Math.PI*2 )
                    ctx.fill();
                    ctx.closePath();

                }else if(_[l][0] == 3){
                    let poly = []
                    let cos = Math.cos(_[l][5]/180*Math.PI)
                    let sin = Math.sin(_[l][5]/180*Math.PI)
                    poly = [[-_[l][4]/2, -_[l][3]/2], [-_[l][4]/2, _[l][3]/2], [_[l][4]/2, _[l][3]/2], [_[l][4]/2, -_[l][3]/2]]
                    ctx.beginPath();
                    ctx.fillStyle = MAPstatic.CT.hf
                    ctx.strokeStyle = MAPstatic.CT.hs
                    ctx.lineWidth = 2/320*Zoom
                    ctx.moveTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
                    for (let p = 1; p < poly.length; p+=1) {
                        ctx.lineTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[p][1]*cos*Zoom)+(poly[p][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[p][1]*sin*Zoom)+(poly[p][0]*-cos*Zoom));
                    }
                    ctx.lineTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
                    ctx.fill();
                    ctx.stroke();
                    ctx.closePath();
                    cos = Math.cos(_[l][5]/180*Math.PI)
                    sin = Math.sin(_[l][5]/180*Math.PI)

                    if (_[l][3] > _[l][4]){
                        poly = [[ 0,-_[l][3]/2], [0,_[l][3]/2 ]]
                    }else{
                        poly = [[ -_[l][4]/2,0], [_[l][4]/2,0]]
                    }
                    ctx.beginPath();

                    ctx.moveTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
                    for (let p = 1; p < poly.length; p+=1) {
                        ctx.lineTo(((-nX+X)*(Date.now() - LastPING) / PING-X+_[l][1])*Zoom +GameW/2 + OffsetX+(poly[p][1]*cos*Zoom)+(poly[p][0]*Zoom*sin) ,((-nY+Y)*(Date.now() - LastPING) / PING-Y+_[l][2])*Zoom+GameH/2 + OffsetY+(poly[p][1]*sin*Zoom)+(poly[p][0]*-cos*Zoom));
                    }
                    ctx.lineCap = 'butt'
                    if (_[l][3] > _[l][4]){
                        ctx.lineWidth = _[l][4]*Zoom
                    }else{
                        ctx.lineWidth = _[l][3]*Zoom
                    }
                    ctx.strokeStyle = MAPstatic.CT.hs
                    ctx.setLineDash([2/320*Zoom,6/320*Zoom])
                    ctx.stroke();
                    ctx.setLineDash([])
                    ctx.closePath();
                }

			}



    }

	let alpha = 'ff'
    if (Z == 1){
        alpha = "88"
    }
    for (let __ of VisibleObjs['T']){

	        let _ = MAPstatic['T'][__]


			for (let l = 0; l < _.length; l += 1) {


			    if (_[l][0] == 0){
			        ctx.beginPath();

			        ctx.fillStyle = MAPstatic.CT.tf+alpha;
			        ctx.arc(GameW/2 + OffsetX - (X - _[l][1] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[l][2] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom, Zoom * tree_size.get(_[l][3])/2,0,2*Math.PI)
			        ctx.fill();
			        ctx.closePath();
			        ctx.beginPath();
			        ctx.fillStyle = MAPstatic.CT.tm+alpha;
			        ctx.arc(GameW/2 + OffsetX - (X - _[l][1] + (nX - X) * (Date.now() - LastPING) / PING - tree_size.get(_[l][3])*Math.cos(l*24)/5)*Zoom,GameH/2 + OffsetY - (Y - _[l][2] + (nY - Y) * (Date.now() - LastPING) / PING - tree_size.get(_[l][3])*Math.sin(l*15)/5)*Zoom, Zoom * tree_size.get(_[l][3])/2*2/3,0,2*Math.PI)
			        ctx.fill();
			        ctx.closePath();
			        ctx.beginPath();
			        ctx.fillStyle = MAPstatic.CT.tt+alpha;
			        ctx.arc(GameW/2 + OffsetX - (X - _[l][1] + (nX - X) * (Date.now() - LastPING) / PING - tree_size.get(_[l][3])*Math.cos(l*648)/5)*Zoom,GameH/2 + OffsetY - (Y - _[l][2] + (nY - Y) * (Date.now() - LastPING) / PING - tree_size.get(_[l][3])*Math.sin(l*541)/5)*Zoom, Zoom * tree_size.get(_[l][3])/2*2/3,0,2*Math.PI)
			        ctx.fill();
                    ctx.beginPath();
			    }
			    else if (_[l][0] == 1){
			        ctx.beginPath();
			        ctx.fillStyle = MAPstatic.CT.ff+alpha;
			        ctx.arc(GameW/2 + OffsetX - (X - _[l][1] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[l][2] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom, Zoom * tree_size.get(_[l][3])/2,0,2*Math.PI)
			        ctx.fill();
			        ctx.closePath();
			        ctx.beginPath();
			        ctx.fillStyle = MAPstatic.CT.fm+alpha;
			        ctx.arc(GameW/2 + OffsetX - (X - _[l][1] + (nX - X) * (Date.now() - LastPING) / PING - tree_size.get(_[l][3])*Math.cos(l*648)/24)*Zoom,GameH/2 + OffsetY - (Y - _[l][2] + (nY - Y) * (Date.now() - LastPING) / PING - tree_size.get(_[l][3])*Math.sin(l*463)/24)*Zoom, Zoom * tree_size.get(_[l][3])/2*2/3,0,2*Math.PI)
			        ctx.fill();
			        ctx.closePath();
			        ctx.beginPath();
			        ctx.fillStyle = MAPstatic.CT.ft+alpha;
			        ctx.arc(GameW/2 + OffsetX - (X - _[l][1] + (nX - X) * (Date.now() - LastPING) / PING  - tree_size.get(_[l][3])*Math.cos(l*765)/24)*Zoom,GameH/2 + OffsetY - (Y - _[l][2] + (nY - Y) * (Date.now() - LastPING) / PING - tree_size.get(_[l][3])*Math.sin(l*245)/24)*Zoom, Zoom * tree_size.get(_[l][3])/2*1/3,0,2*Math.PI)
			        ctx.fill();
                    ctx.beginPath();
			    }
			    else if (_[l][0] == 2){
			        ctx.lineWidth = Zoom * tree_size.get(_[l][3])/12
			        ctx.beginPath();
			        ctx.fillStyle = MAPstatic.CT.pf+alpha;
			        ctx.arc(GameW/2 + OffsetX - (X - _[l][1] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[l][2] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom, Zoom * tree_size.get(_[l][3])/2,0,2*Math.PI)
			        ctx.fill();
                    ctx.closePath();
                    ctx.beginPath();
			        ctx.strokeStyle = MAPstatic.CT.pm+alpha;
			        ctx.arc(GameW/2 + OffsetX - (X - _[l][1] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[l][2] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom, Zoom * tree_size.get(_[l][3])/3,0,2*Math.PI)
			        ctx.stroke();
                    ctx.closePath();
                    ctx.beginPath();
			        ctx.strokeStyle = MAPstatic.CT.pt+alpha;
			        ctx.arc(GameW/2 + OffsetX - (X - _[l][1] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - _[l][2] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom, Zoom * tree_size.get(_[l][3])/2/3,0,2*Math.PI)
			        ctx.stroke();
                    ctx.closePath();
			    }

			}



    }


    TVehicles.forEach(vehicle => {
        if ( input.get(79)){

            vehicle.draw_indicators("BOTTOM")
            vehicle.draw_indicators("DEFAULT")
        }
        if (vehicle.id == CurVehicleID) {
            vehicle.draw_player_indicators("BOTTOM")
            vehicle.draw_player_indicators("DEFAULT")
        }
    });


    for (let _ of Entities.keys()) {
        if (!(Entities.get(_).is_active)){
            Entities.delete(_)    
        }

    }
    for (let _ of Particles.keys()) {
        let i = 0;
        while (i < Particles.get(_).length){
            if (Particles.get(_)[i].is_active==false){
                Particles.get(_).splice(i, 1)
                i--
            }
            i++
        }

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
PIXI.sound.stop('MainMenuMusic');
document.getElementById('TitleScreen').classList = ['titlescrs']
setTimeout(startgame,1500)
}
