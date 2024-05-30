document.onkeydown=function(event) {
    if (event.keyCode == 9) {  //tab pressed
        event.preventDefault(); // stops its action
    }
}
window.onresize = resize
function ExitGame(){
    Send = true
    messagebtn.innerText = "Global"
    messageinput.value = "/leave"
}
GetServerInfo()
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
function ShowName(name, hp, hpmax,x,y){

    var p = NoTeamTag(PlayerName)
//      console.log(PlayerTags)
//    console.log(p,PlayerTags.get(p),PlayerTags.get(name))
    if (PlayerTags.get(p) == PlayerTags.get(name) && PlayerTags.get(p) != null){
    ctx.fillStyle = '#0000ff';
    }else{
    ctx.fillStyle = '#ff0000';
    }

    ctx.strokeStyle = '#000'
    ctx.lineWidth = 1
    ctx.textAlign = 'center'
    ctx.font = "20px Arial";
    if (PlayerTags.get(name) != null){
        ctx.fillText("["+PlayerTags.get(name)+"]"+name, x, y-50);
    }else{
        ctx.fillText(name, x, y-50);
    }
    ctx.fillStyle = '#00ff00';
    ctx.fillStyle = 'rgb('+255*(1-(hp/hpmax))+','+255*(hp/hpmax)+',0)'
    ctx.fillRect(x-25,y-45,50*(hp/hpmax),7) //50*Number(larr[4])
    ctx.strokeRect(x-25,y-45,50,7)
}
PIXI.sound.add("bang","static\\bang.mp3")
PIXI.sound.add("wtrBang","static\\wtrBang.mp3")
PIXI.sound.add("lnchTrpd","static\\TorpedoLaunch.mp3")

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

var Players=[];
var ColorPack = 'Summer';
var Vehicles;
var PlayersData = new Map();
var VehList;
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
function ShowPrevVeh(){
    sessionStorage.setItem('VehicleSelectVal',document.getElementById('VehicleSelect').value)
    //console.log(document.getElementById('VehicleSelect').value)
    document.getElementById('VehicleSelect').value
	for (let _ of VehList) {
        if(_[1]==document.getElementById('VehicleSelect').value){
            document.getElementById('vehprev').src = _[2];

            document.getElementById('ShopVehLink').href = location.href+"shop/"+_[1]


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
function GetServerInfo(){
			let socket = new WebSocket(document.getElementById('ServerSelect').value);
			socket.addEventListener('open', function (event) {
			    console.log('!');
				socket.send('info');
			});

			function taken(event) {
			    console.log(event.data)
				var data = JSON.parse(event.data);
				console.log(data)
				document.getElementById('impprev').src = data.map;
				document.getElementById('Map').src = data.map;
				document.getElementById('online').innerHTML = "Players: "+data.online;
				document.getElementById('text').innerHTML = data.text;
				document.getElementById('prevmpjs').src = data.js;
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

			socket.addEventListener('message', taken);
}
var MAPstatic = {
'*':[],
'B':[],
'Z':[],
'G':[],
'S':[],
'_':[],
'CT':{
		sf: '#000',
		ss: '#000',
		bg:'#000',
		zs:'#000',
		zf:'#000',
		bf:'#000',
		bs:'#000',
		gf:'#000',
		gs:'#000',
        f0: '#000',
        f1: '#000',
        f2: '#000',
        f3: '#000',
        f4: '#000',
        f5: '#000',
        f228: '#000',
		o0:'#000',
		o1:'#000',
		l0:'#000',
		l1:'#000',
		b0:'#000',
		b1:'#000',
		b2:'#000'

	}
};
function startgame() {
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

		try {
//console.log('1')
			let socket = new WebSocket(document.getElementById('ServerSelect').value);
//			console.log('2')
			socket.addEventListener('open', function (event) {
				socket.send('n'+nicknameinput.value+'\n'+activecl+'\n'+document.getElementById('VehicleSelect').value+'\n'+document.getElementById('NICK').innerText+'\n'+document.getElementById('PASS').innerText);
				vehicle = Number(document.getElementById('VehicleSelect').value)

			});
			function taken(event) {
				if (event.data[0] == 'E'){
//				    console.log('EEEEEEEEEEEEE')
					document.getElementById('TitleScreen').classList = ['titlescrh']
					document.getElementById('MainScreen').style.display = '';
					document.getElementById('MainForm').style.display = '';
					document.getElementById('AboutForm').style.display = '';
					document.getElementById('SelectForm').style.display = '';
					document.getElementById('NEbar').style.display = '';
//					document.getElementById('MoneyNum').style.display = 'flex';
					alert( event.data.split(',')[1])
				}else if(event.data[0] == 'M'){
//				console.log(event.data.substring(1))

				document.getElementById('TitleScreen').classList = ['titlescrh']


				MAPstatic = JSON.parse(event.data.substring(1));
//				console.log(MAPstatic)
				WH = MAPstatic['WH']
//				console.log(MAPstatic)
                ZonesNum.innerHTML = ''
                for(let _ = 0; _ < MAPstatic['*'].length; _++){
                    ZonesNum.innerHTML += '<div class="Zone" style="background-color: red" id="zone'+_ +'"><b>'+MAPstatic['*'][_][0]+'</b></div>'
                }
				socket.send((input.get('m0') || dobleinput.get('m0')  ? 1 : 0).toString()+(input.get(87) || dobleinput.get(87) ? 1 : 0).toString()+(input.get(65) || dobleinput.get(65) ? 1 : 0).toString()+(input.get(83) || dobleinput.get(83) ? 1 : 0).toString()+(input.get(68) || dobleinput.get(68) ? 1 : 0).toString()+(input.get(32) || dobleinput.get(32) ? 1 : 0).toString()+(input.get(71) || dobleinput.get(71) ? 1 : 0).toString()+(input.get('Tab') ? 1 : 0).toString()+(Cmod ? 1 : 0).toString()+(Xmod ? 1 : 0).toString()+'0'+(mouseX).toString()+','+(mouseY).toString()+','+(window.innerWidth).toString()+','+(window.innerHeight).toString()+SENDB+SENDS);
				}
				else if (event.data[0] == 'D'){
						socket.close();
						PlayersData = new Map()

                        let children = document.getElementById('Inventory').children;
                        for (let i = 0; i < children.length; i++) {
                          children[i].style.display = ""
                        }
                        document.getElementById('MainScreen').style.display = '';
                        document.getElementById('MainForm').style.display = '';
                        document.getElementById('AboutForm').style.display = '';
                        document.getElementById('SelectForm').style.display = '';
                        document.getElementById('NEbar').style.display = '';
                        chatview.innerHTML = ""
//                        PIXI.sound.play('MainMenuMusic');
                        StartMainMusicPlay = Date.now()
                        Players = []
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
					// console.log(PING)
//                    console.log(Date.now())
                    console.log(INFO)
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
                                    div.innerHTML = '<b><a onclick="Send = true; messageinput.value = \'/team join '+larr[1].split(']')[0].slice(1)+'\';">['+larr[1].split(']')[0].slice(1) +"]</a>" +larr[1].split(']')[1]+'</b> ' +larr[2];
                                }else{
                                    div.innerHTML = "<b>"+larr[1]+"</b> "+larr[2];
                                }

								chatview.append(div);
								div.scrollIntoView();
								MSGs.push(Number(larr[3]))
							}
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
									'        <td><b><a onclick="Send = true; messageinput.value = \''+ '/team join '+larr[_].split(']')[0].slice(1)+'\';">[' + larr[_].split(']')[0].slice(1)+ "]</a>"+larr[_].split(']')[1] + '</b></td>\n' +
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
                            console.log('del',key)
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
					    socket.send((input.get('m0') || dobleinput.get('m0')  ? 1 : 0).toString()+(input.get(87) || dobleinput.get(87) ? 1 : 0).toString()+(input.get(65) || dobleinput.get(65) ? 1 : 0).toString()+(input.get(83) || dobleinput.get(83) ? 1 : 0).toString()+(input.get(68) || dobleinput.get(68) ? 1 : 0).toString()+(input.get(32) || dobleinput.get(32) ? 1 : 0).toString()+(input.get(71) || dobleinput.get(71) ? 1 : 0).toString()+(input.get('Tab') ? 1 : 0).toString()+(Cmod ? 1 : 0).toString()+(Xmod ? 1 : 0).toString()+'0'+(mouseX).toString()+','+(mouseY).toString()+','+(window.innerWidth).toString()+','+(window.innerHeight).toString()+SENDB+SENDS+',m/team chat '+messageinput.value);
					    }else{
					    socket.send((input.get('m0') || dobleinput.get('m0')  ? 1 : 0).toString()+(input.get(87) || dobleinput.get(87) ? 1 : 0).toString()+(input.get(65) || dobleinput.get(65) ? 1 : 0).toString()+(input.get(83) || dobleinput.get(83) ? 1 : 0).toString()+(input.get(68) || dobleinput.get(68) ? 1 : 0).toString()+(input.get(32) || dobleinput.get(32) ? 1 : 0).toString()+(input.get(71) || dobleinput.get(71) ? 1 : 0).toString()+(input.get('Tab') ? 1 : 0).toString()+(Cmod ? 1 : 0).toString()+(Xmod ? 1 : 0).toString()+'0'+(mouseX).toString()+','+(mouseY).toString()+','+(window.innerWidth).toString()+','+(window.innerHeight).toString()+SENDB+SENDS+',m'+messageinput.value);
					    }
						messageinput.value = ''
						Send=false
					}else{
						socket.send((input.get('m0') || dobleinput.get('m0')  ? 1 : 0).toString()+(input.get(87) || dobleinput.get(87) ? 1 : 0).toString()+(input.get(65) || dobleinput.get(65) ? 1 : 0).toString()+(input.get(83) || dobleinput.get(83) ? 1 : 0).toString()+(input.get(68) || dobleinput.get(68) ? 1 : 0).toString()+(input.get(32) || dobleinput.get(32) ? 1 : 0).toString()+(input.get(71) || dobleinput.get(71) ? 1 : 0).toString()+(input.get('Tab') ? 1 : 0).toString()+(Cmod ? 1 : 0).toString()+(Xmod ? 1 : 0).toString()+'0'+(mouseX).toString()+','+(mouseY).toString()+','+(window.innerWidth).toString()+','+(window.innerHeight).toString()+SENDB+SENDS);
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
				document.getElementById('AboutForm').style.display = '';
				document.getElementById('SelectForm').style.display = '';
				document.getElementById('NEbar').style.display = '';
				console.log('ERROR')
			}
			document.getElementById('MainScreen').style.display = 'none';
			document.getElementById('MainForm').style.display = 'none';
			document.getElementById('AboutForm').style.display = 'none';
			document.getElementById('SelectForm').style.display = 'none';

			document.getElementById('NEbar').style.display = 'none';
		} catch (err){
			document.getElementById('MainForm').style.display = 'none';
			// document.getElementById('ErrorForm').style.display = 'block';
		}
	}
}
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
let SnowParticles0 = [];
let SnowParticles0max = 100;
let FireParticles0 = [];
let FireParticles1 = [];
let FireParticles2 = [];
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
let availablecolors = document.getElementById('ColorMenu').innerText.split(',')
for (let _ = 0; _ < availablecolors.length; _ += 1) {
availablecolors[_] = Number(availablecolors[_])
}
let activecl = availablecolors[0]
try{
activecl =Number( sessionStorage.getItem("SelectedCL"))
if (availablecolors.indexOf(activecl) == -1){
activecl = availablecolors[0]
}

}catch{
activecl = availablecolors[0]
}
document.getElementById('ColorMenu').innerHTML = ''
console.log(availablecolors)
for (let _ of availablecolors){
	let a = document.createElement('div')
	a.classList.add('cl')
	if(_ == activecl){
		a.classList.add('activecl')
	}
	a.id = 'cl'+_
	document.getElementById('ColorMenu').appendChild(a)
	document.getElementById('cl'+_).onclick= function () {
		for (let i of availablecolors){
			document.getElementById('cl'+i).classList.remove('activecl');
		}
		document.getElementById('cl'+_).classList.add('activecl');
		sessionStorage.setItem("SelectedCL",_)
		activecl = Number(_);
	}
}
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
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.width = canvas.width + "px";
	canvas.style.height = canvas.height + "px";
//	console.log(canvas.width,canvas.style.width)
}
function fresize(){
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.width = canvas.width + "px";
	canvas.style.height = canvas.height + "px";
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
	 else if (event.key == 'Enter' ) {
	 	// if (clansi.style.display == 'none'){
		if (messagefield.style.display == 'none'){
			messagefield.style.display = 'block';
			messageinput.focus();
		}else {
			messagefield.style.display = 'none'
			Send = true;
		}


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
if(ColorPack == 'Winter'){
    for(var i = 0; i < SnowParticles0max; i++)
        {
            SnowParticles0.push(new Particle2(canvas.width,canvas.height))
        }
        }
function DRAW(timestamp)  {

try{
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
            ctx.lineWidth = 160;
			for (let l = 0; l < _.length; l += 1) {
					if (l == 0) {
						ctx.moveTo(window.innerWidth/2 + OffsetX - (X - _[0][0] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2 + OffsetY - (Y - _[0][1] + (nY - Y) * (Date.now() - LastPING) / PING)*320);
					} else {
						ctx.lineTo(window.innerWidth/2 + OffsetX - (X - _[l][0] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2 + OffsetY - (Y - _[l][1] + (nY - Y) * (Date.now() - LastPING) / PING)*320)
					}

			}
			ctx.closePath();
			ctx.stroke();

    }
   	for (let _ of MAPstatic['S']){

		    ctx.strokeStyle = MAPstatic.CT.zs;

			ctx.lineJoin = 'bevel';
			ctx.beginPath();
            ctx.lineWidth = 80;
			for (let l = 0; l < _.length; l += 1) {
					if (l == 0) {
						ctx.moveTo(window.innerWidth/2 + OffsetX - (X - _[0][0] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2 + OffsetY - (Y - _[0][1] + (nY - Y) * (Date.now() - LastPING) / PING)*320);
					} else {
						ctx.lineTo(window.innerWidth/2 + OffsetX - (X - _[l][0] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2 + OffsetY - (Y - _[l][1] + (nY - Y) * (Date.now() - LastPING) / PING)*320)
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
            ctx.lineWidth = 80;
			for (let l = 0; l < _.length; l += 1) {
					if (l == 0) {
						ctx.moveTo(window.innerWidth/2 + OffsetX - (X - _[0][0] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2 + OffsetY - (Y - _[0][1] + (nY - Y) * (Date.now() - LastPING) / PING)*320);
					} else {
						ctx.lineTo(window.innerWidth/2 + OffsetX - (X - _[l][0] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2 + OffsetY - (Y - _[l][1] + (nY - Y) * (Date.now() - LastPING) / PING)*320)
					}

			}
			ctx.closePath();
			ctx.stroke();

    }
    for (let _ of MAPstatic['S']){

		    ctx.strokeStyle = MAPstatic.CT.zf;

			ctx.lineJoin = 'bevel';
			ctx.beginPath();
            ctx.lineWidth = 40;
			for (let l = 0; l < _.length; l += 1) {
					if (l == 0) {
						ctx.moveTo(window.innerWidth/2 + OffsetX - (X - _[0][0] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2 + OffsetY - (Y - _[0][1] + (nY - Y) * (Date.now() - LastPING) / PING)*320);
					} else {
						ctx.lineTo(window.innerWidth/2 + OffsetX - (X - _[l][0] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2 + OffsetY - (Y - _[l][1] + (nY - Y) * (Date.now() - LastPING) / PING)*320)
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
		ctx.arc(OffsetX+(WtrParticles0[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*320+window.innerWidth/2,OffsetY+window.innerHeight/2+(WtrParticles0[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*320,(WtrParticles0[i].rad-(WtrParticles0[i].life*WtrParticles0[i].rad))*7.5+2.5,0,2*Math.PI);
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
	for (let _ of OBJs[0].get('<').keys()) {
		if(OBJs[0].get('<').get(_)[3] == 1){
			OBJs[0].get('<').get(_)[3]=0

            PIXI.sound.play('wtrBang');
			for (let i = 0; i < 5; i++) {
                WtrBangParticles0.push(new BangPrt0(X+(nX-X)*(Date.now() - LastPING) / PING + OBJs[0].get('<').get(_)[0]/320-window.innerWidth/640, Y+(nY-Y)*(Date.now() - LastPING) / PING+ OBJs[0].get('<').get(_)[1]/320-window.innerHeight/640))
            }
			ShakeXbnds += 10
			ShakeYbnds += 10
		}else if(OBJs[0].get('<').get(_)[3] == 2){
                    PIXI.sound.play('lnchTrpd');
                     OBJs[0].get('<').get(_)[3] = 0
		}
//		tornum.innerText = OBJs[0].get('<').get(_)[4];
		if (OBJs[1].get('<').has(_)) {
			grad=ctx.createLinearGradient(OffsetX+Number(OBJs[0].get('<').get(_)[0]+ (OBJs[1].get('<').get(_)[0] - OBJs[0].get('<').get(_)[0]) * (Date.now() - LastPING) / PING), OffsetY+Number(OBJs[0].get('<').get(_)[1]+ (OBJs[1].get('<').get(_)[1] - OBJs[0].get('<').get(_)[1]) * (Date.now() - LastPING) / PING),Number(OBJs[0].get('<').get(_)[0]+ (OBJs[1].get('<').get(_)[0] - OBJs[0].get('<').get(_)[0]) * (Date.now() - LastPING) / PING)-Math.cos(OBJs[0].get('<').get(_)[2]/180*Math.PI)*30, Number(OBJs[0].get('<').get(_)[1]+ (OBJs[1].get('<').get(_)[1] - OBJs[0].get('<').get(_)[1]) * (Date.now() - LastPING) / PING)-Math.sin(OBJs[0].get('<').get(_)[2]/180*Math.PI)*30);
		}else{
			grad=ctx.createLinearGradient(OffsetX+Number(OBJs[0].get('<').get(_)[0]),Number(OBJs[0].get('<').get(_)[1]),OffsetY+Number(OBJs[0].get('<').get(_)[0]-Math.cos(OBJs[0].get('<').get(_)[2]/180*Math.PI)*30),Number(OBJs[0].get('<').get(_)[1]-Math.sin(OBJs[0].get('<').get(_)[2]/180*Math.PI)*30));
		}
		if (Math.random() < 0.15){
		        WtrParticles0.push(new WtrPrt0(X+(nX-X)*(Date.now() - LastPING) / PING + OBJs[0].get('<').get(_)[0]/320-window.innerWidth/640, Y+(nY-Y)*(Date.now() - LastPING) / PING+ OBJs[0].get('<').get(_)[1]/320-window.innerHeight/640));
		}
		grad.addColorStop(1,"#FFFFFF00");
		grad.addColorStop(0,"#FFFFff88");
		ctx.strokeStyle = grad;
		ctx.lineWidth= 8;
		ctx.beginPath()
		ctx.lineCap='round';
		if (OBJs[1].get('<').has(_)) {
			ctx.moveTo(OffsetX+Number(OBJs[0].get('<').get(_)[0]+ (OBJs[1].get('<').get(_)[0] - OBJs[0].get('<').get(_)[0]) * (Date.now() - LastPING) / PING),OffsetY+ Number(OBJs[0].get('<').get(_)[1]+ (OBJs[1].get('<').get(_)[1] - OBJs[0].get('<').get(_)[1]) * (Date.now() - LastPING) / PING));
			ctx.lineTo(OffsetX+Number(OBJs[0].get('<').get(_)[0]+ (OBJs[1].get('<').get(_)[0] - OBJs[0].get('<').get(_)[0]) * (Date.now() - LastPING) / PING)-Math.cos(OBJs[0].get('<').get(_)[2]/180*Math.PI)*30, OffsetY +Number(OBJs[0].get('<').get(_)[1]+ (OBJs[1].get('<').get(_)[1] - OBJs[0].get('<').get(_)[1]) * (Date.now() - LastPING) / PING)-Math.sin(OBJs[0].get('<').get(_)[2]/180*Math.PI)*30);
		}else{
			ctx.moveTo(OffsetX+Number(OBJs[0].get('<').get(_)[0]),OffsetY+Number(OBJs[0].get('<').get(_)[1]));
			ctx.lineTo(OffsetX+Number(OBJs[0].get('<').get(_)[0]-Math.cos(OBJs[0].get('<').get(_)[2]/180*Math.PI)*30),OffsetY+Number(OBJs[0].get('<').get(_)[1]-Math.sin(OBJs[0].get('<').get(_)[2]/180*Math.PI)*30));
		}

		ctx.stroke();
		ctx.closePath()
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
                    ctx.moveTo(window.innerWidth/2 + OffsetX - (X - _[0] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2 + OffsetY - (Y - _[1] + (nY - Y) * (Date.now() - LastPING) / PING)*320);
                    ctx.lineTo(window.innerWidth/2 + OffsetX - (X - _[2] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2 + OffsetY - (Y - _[3] + (nY - Y) * (Date.now() - LastPING) / PING)*320);
                    ctx.closePath()
                    ctx.strokeStyle = MAPstatic.CT.b2
                    ctx.lineCap = 'square';
                    ctx.lineWidth = 70;
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
						ctx.moveTo(window.innerWidth/2 + OffsetX - (X - _[0][0] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2 + OffsetY - (Y - _[0][1] + (nY - Y) * (Date.now() - LastPING) / PING)*320);
					} else {
						ctx.lineTo(window.innerWidth/2 + OffsetX - (X - _[l][0] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2 + OffsetY - (Y - _[l][1] + (nY - Y) * (Date.now() - LastPING) / PING)*320)
					}

			}
			ctx.closePath();
			ctx.lineWidth = (Math.sin(timenow/50/180*Math.PI)+1)*5+2;
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
            ctx.lineWidth = 10;
            ctx.lineJoin = 'bevel';
            ctx.beginPath();
			for (let l = 0; l < _.length; l += 1) {
					if (l == 0) {
						ctx.moveTo(window.innerWidth/2 + OffsetX - (X - _[0][0] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2 + OffsetY - (Y - _[0][1] + (nY - Y) * (Date.now() - LastPING) / PING)*320);
					} else {
						ctx.lineTo(window.innerWidth/2 + OffsetX - (X - _[l][0] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2 + OffsetY - (Y - _[l][1] + (nY - Y) * (Date.now() - LastPING) / PING)*320)
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

                ctx.lineWidth= 10;
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
                ctx.font = "300px ZCOOL QingKe HuangYou";
                ctx.beginPath()
                ctx.arc(window.innerWidth/2 + OffsetX - (X - MAPstatic['*'][_][1] + (nX - X) * (Date.now() - LastPING) / PING)*320, window.innerHeight/2+ OffsetY - (Y - MAPstatic['*'][_][2]+ (nY - Y) * (Date.now() - LastPING) / PING)*320, 160, 0, Math.PI * 2);
                ctx.fillText(MAPstatic['*'][_][0],window.innerWidth/2+ OffsetX - (X- MAPstatic['*'][_][1] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2+ OffsetY- (Y- MAPstatic['*'][_][2] + (nY - Y) * (Date.now() - LastPING) / PING )*320+100);
                ctx.closePath()

                ctx.stroke();
            }


    ctx.lineWidth=5;

    ctx.beginPath();
    ctx.rect(window.innerWidth/2 + OffsetX - (X + (nX - X) * (Date.now() - LastPING) / PING)*320, window.innerHeight/2 + OffsetY - (Y + (nY - Y) * (Date.now() - LastPING) / PING)*320, WH*320, WH*320);
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
    for (let _ of MAPstatic['S']){

    		ctx.fillStyle = MAPstatic.CT.sf;
			ctx.lineWidth= 5;
			ctx.lineJoin = 'round';
            ctx.strokeStyle = MAPstatic.CT.ss;
			ctx.beginPath();

			for (let l = 0; l < _.length; l += 1) {
				//		    console.log(OBJs[0].get('b').get(_)[l*2],OBJs[0].get('b').get(_)[l*2+1])
				// 	console.log(OFICIAL-MAP0.get('b').get(_)[2],OFICIAL-MAP0.get('b').get(_)[3])
				// 	console.log(OFICIAL-MAP0.get('b').get(_)[0],X)
					if (l == 0) {
						ctx.moveTo(window.innerWidth/2 + OffsetX - (X - _[0][0] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2 + OffsetY - (Y - _[0][1] + (nY - Y) * (Date.now() - LastPING) / PING)*320);
					} else {
						ctx.lineTo(window.innerWidth/2 + OffsetX - (X - _[l][0] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2 + OffsetY - (Y - _[l][1] + (nY - Y) * (Date.now() - LastPING) / PING)*320)
					}

			}
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
			ctx.lineJoin = 'miter';
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

    for (let _ of OBJs[0].get('>').keys()) {
		if(OBJs[0].get('>').get(_)[4] >0){
			continue
		}
		if (OBJs[1].get('>').has(_)) {
			grad=ctx.createLinearGradient(OffsetX+Number(OBJs[0].get('>').get(_)[0]+ (OBJs[1].get('>').get(_)[0] - OBJs[0].get('>').get(_)[0]) * (Date.now() - LastPING) / PING),OffsetY+ Number(OBJs[0].get('>').get(_)[1]+ (OBJs[1].get('>').get(_)[1] - OBJs[0].get('>').get(_)[1]) * (Date.now() - LastPING) / PING),Number(OBJs[0].get('>').get(_)[2]+ (OBJs[1].get('>').get(_)[2] - OBJs[0].get('>').get(_)[2]) * (Date.now() - LastPING) / PING), Number(OBJs[0].get('>').get(_)[3]+ (OBJs[1].get('>').get(_)[3] - OBJs[0].get('>').get(_)[3]) * (Date.now() - LastPING) / PING));
		}else{
			grad=ctx.createLinearGradient(OffsetX+Number(OBJs[0].get('>').get(_)[0]),OffsetY+Number(OBJs[0].get('>').get(_)[1]),Number(OBJs[0].get('>').get(_)[2]),Number(OBJs[0].get('>').get(_)[3]));
		}

		grad.addColorStop(0,"#FFFFFF00");
		grad.addColorStop(1,"#FFFF0088");
		ctx.strokeStyle = grad
		ctx.lineWidth= Math.abs(Number(OBJs[0].get('>').get(_)[4]));

		if(OBJs[0].get('>').get(_)[5] == 1 || OBJs[0].get('>').get(_)[5] == 3){
			if (Math.random() < 1){


                PIXI.sound.play('dmg'+Math.floor(Math.random()*4));
			}
			if(OBJs[0].get('>').get(_)[5] == 3){
				ShakeXbnds += 5
				ShakeYbnds += 5
			}

			OBJs[0].get('>').get(_)[5]=0
		}else if(OBJs[0].get('>').get(_)[5] == 2){
			if (Math.random() < 1){

					PIXI.sound.play('Sdmg'+Math.floor(Math.random()*3));

			}

			OBJs[0].get('>').get(_)[5]=0
		}
		ctx.beginPath()
//		ctx.lineCap='round';
		if (OBJs[1].get('>').has(_)) {
			ctx.moveTo(OffsetX+Number(OBJs[0].get('>').get(_)[0]+ (OBJs[1].get('>').get(_)[0] - OBJs[0].get('>').get(_)[0]) * (Date.now() - LastPING) / PING),OffsetY+ Number(OBJs[0].get('>').get(_)[1]+ (OBJs[1].get('>').get(_)[1] - OBJs[0].get('>').get(_)[1]) * (Date.now() - LastPING) / PING));
			ctx.lineTo(OffsetX+Number(OBJs[0].get('>').get(_)[2]+ (OBJs[1].get('>').get(_)[2] - OBJs[0].get('>').get(_)[2]) * (Date.now() - LastPING) / PING),OffsetY+ Number(OBJs[0].get('>').get(_)[3]+ (OBJs[1].get('>').get(_)[3] - OBJs[0].get('>').get(_)[3]) * (Date.now() - LastPING) / PING));
		}else{
			ctx.moveTo(OffsetX+Number(OBJs[0].get('>').get(_)[0]),OffsetY+ Number(OBJs[0].get('>').get(_)[1]));
			ctx.lineTo(OffsetX+Number(OBJs[0].get('>').get(_)[2]),OffsetY+ Number(OBJs[0].get('>').get(_)[3]));
		}
		ctx.stroke();
		ctx.closePath()

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

		ctx.arc(OffsetX+(CanBangParticles0[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*320+window.innerWidth/2,OffsetY+window.innerHeight/2+(CanBangParticles0[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*320,CanBangParticles0[i].rad,0,2*Math.PI);
		ctx.closePath();
		CanBangParticles0[i].x += CanBangParticles0[i].xs/320/10*CanBangParticles0[i].life
		CanBangParticles0[i].y += CanBangParticles0[i].ys/320/10*CanBangParticles0[i].life
		CanBangParticles0[i].rad+=0.1*CanBangParticles0[i].life
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
            ctx.arc(OffsetX+(FireParticles0[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*320+window.innerWidth/2-FireParticles0[i].cof*Math.cos(FireParticles0[i].dir)*FireParticles0[i].rad,OffsetY+window.innerHeight/2+(FireParticles0[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*320-FireParticles0[i].cof*Math.sin(FireParticles0[i].dir)*FireParticles0[i].rad,FireParticles0[i].rad*Math.sin(FireParticles0[i].life/60*Math.PI),0,2*Math.PI);
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

	for (i=0; i<BangParticles0.length; i++) {
	    ctx.fillStyle = "rgba(0,0,0,"+(BangParticles0[i].life**0.33)*1+")";

		ctx.beginPath();
		ctx.arc(OffsetX+(BangParticles0[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*320+window.innerWidth/2,OffsetY+window.innerHeight/2+(BangParticles0[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*320,BangParticles0[i].rad,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "rgba(255,160,0,"+(BangParticles0[i].life**1)*1+")";
		ctx.beginPath();
		ctx.arc(OffsetX+(BangParticles0[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*320+window.innerWidth/2+Math.cos(BangParticles0[i].dir+BangParticles0[i].life*Math.PI*2)*BangParticles0[i].rad*0.2,OffsetY+window.innerHeight/2+(BangParticles0[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*320+Math.sin(BangParticles0[i].dir+BangParticles0[i].life*Math.PI*2)*BangParticles0[i].rad*0.2,BangParticles0[i].rad*0.8,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
        BangParticles0[i].dir += BangParticles0[i].life*0.25
		BangParticles0[i].x += BangParticles0[i].xs/320/4*BangParticles0[i].life
		BangParticles0[i].y += BangParticles0[i].ys/320/4*BangParticles0[i].life
		BangParticles0[i].rad+=0.75*BangParticles0[i].life**1.25

		BangParticles0[i].life *= 0.98
		if (BangParticles0[i].life < 0.0001) {
			BangParticles0.splice(i, 1);
			i--;
		}
	}


		for (i=0; i<WtrBangParticles0.length; i++) {
	    ctx.fillStyle = "rgba(255,255,255,"+(WtrBangParticles0[i].life**0.33)*1+")";

		ctx.beginPath();
		ctx.arc(OffsetX+(WtrBangParticles0[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*320+window.innerWidth/2,OffsetY+window.innerHeight/2+(WtrBangParticles0[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*320,WtrBangParticles0[i].rad,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "rgba(0,160,255,"+(WtrBangParticles0[i].life**1)*1+")";
		ctx.beginPath();
		ctx.arc(OffsetX+(WtrBangParticles0[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*320+window.innerWidth/2+Math.cos(WtrBangParticles0[i].dir+WtrBangParticles0[i].life*Math.PI*2)*WtrBangParticles0[i].rad*0.2,OffsetY+window.innerHeight/2+(WtrBangParticles0[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*320+Math.sin(WtrBangParticles0[i].dir+WtrBangParticles0[i].life*Math.PI*2)*WtrBangParticles0[i].rad*0.2,WtrBangParticles0[i].rad*0.8,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
        WtrBangParticles0[i].dir += WtrBangParticles0[i].life*0.25
		WtrBangParticles0[i].x += WtrBangParticles0[i].xs/320/4*WtrBangParticles0[i].life
		WtrBangParticles0[i].y += WtrBangParticles0[i].ys/320/4*WtrBangParticles0[i].life
		WtrBangParticles0[i].rad+=0.75*WtrBangParticles0[i].life**1.25

		WtrBangParticles0[i].life *= 0.98
		if (WtrBangParticles0[i].life < 0.0001) {
			WtrBangParticles0.splice(i, 1);
			i--;
		}
	}


	if (Z >0){
        for (let _ of MAPstatic['_']) {
                    ctx.beginPath()
                    ctx.moveTo(window.innerWidth/2 + OffsetX - (X - _[0] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2 + OffsetY - (Y - _[1] + (nY - Y) * (Date.now() - LastPING) / PING)*320);
                    ctx.lineTo(window.innerWidth/2 + OffsetX - (X - _[2] + (nX - X) * (Date.now() - LastPING) / PING)*320,window.innerHeight/2 + OffsetY - (Y - _[3] + (nY - Y) * (Date.now() - LastPING) / PING)*320);
                    ctx.closePath()
                    ctx.lineCap = 'square';

                        ctx.strokeStyle = MAPstatic.CT.b1;
                        ctx.lineWidth = 60;
                        ctx.stroke();

                        ctx.strokeStyle = MAPstatic.CT.b0;
                        ctx.lineWidth = 50;
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
//	if (ParticlesProcessing){
		for (i=0; i<CanBangParticles1.length; i++) {
	    ctx.fillStyle = "rgba(192,192,192,"+(CanBangParticles1[i].life**1.5)*1+")";
		ctx.beginPath();

		ctx.arc(OffsetX+(CanBangParticles1[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*320+window.innerWidth/2,OffsetY+window.innerHeight/2+(CanBangParticles1[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*320,CanBangParticles1[i].rad,0,2*Math.PI);
		ctx.closePath();
		CanBangParticles1[i].x += CanBangParticles1[i].xs/320/10*CanBangParticles1[i].life
		CanBangParticles1[i].y += CanBangParticles1[i].ys/320/10*CanBangParticles1[i].life
		CanBangParticles1[i].rad+=0.1*CanBangParticles1[i].life
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
            ctx.arc(OffsetX+(FireParticles1[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*320+window.innerWidth/2-FireParticles1[i].cof*Math.cos(FireParticles1[i].dir)*FireParticles1[i].rad,OffsetY+window.innerHeight/2+(FireParticles1[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*320-FireParticles1[i].cof*Math.sin(FireParticles1[i].dir)*FireParticles1[i].rad,FireParticles1[i].rad*Math.sin(FireParticles1[i].life/60*Math.PI),0,2*Math.PI);
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
		ctx.arc(OffsetX+(BangParticles1[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*320+window.innerWidth/2,OffsetY+window.innerHeight/2+(BangParticles1[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*320,BangParticles1[i].rad,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "rgba(255,160,0,"+(BangParticles1[i].life**1)*1+")";
		ctx.beginPath();
		ctx.arc(OffsetX+(BangParticles1[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*320+window.innerWidth/2+Math.cos(BangParticles1[i].dir+BangParticles1[i].life*Math.PI*2)*BangParticles1[i].rad*0.2,OffsetY+window.innerHeight/2+(BangParticles1[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*320+Math.sin(BangParticles1[i].dir+BangParticles1[i].life*Math.PI*2)*BangParticles1[i].rad*0.2,BangParticles1[i].rad*0.8,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
        BangParticles1[i].dir += BangParticles1[i].life*0.25
		BangParticles1[i].x += BangParticles1[i].xs/320/4*BangParticles1[i].life
		BangParticles1[i].y += BangParticles1[i].ys/320/4*BangParticles1[i].life
		BangParticles1[i].rad+=0.75*BangParticles1[i].life**1.25

		BangParticles1[i].life *= 0.98
		if (BangParticles1[i].life < 0.0001) {
			BangParticles1.splice(i, 1);
			i--;
		}
	}
	    for (let _ of OBJs[0].get('p').keys()) {

//          ctx.strokeStyle = 'rgba(255,255,255,0.1)';
          ctx.fillStyle = 'rgba(255,255,255,0.75)';
          let kl = 0;
//          smknum.innerText = OBJs[0].get('p').get(_)[3];


                if (OBJs[1].get('p').has(_)) {
                    ctx.beginPath()
                    ctx.arc(OffsetX + OBJs[0].get('p').get(_)[0] + (OBJs[1].get('p').get(_)[0] - OBJs[0].get('p').get(_)[0]) * (Date.now() - LastPING) / PING, OffsetY + OBJs[0].get('p').get(_)[1] + (OBJs[1].get('p').get(_)[1] - OBJs[0].get('p').get(_)[1]) * (Date.now() - LastPING) / PING, OBJs[0].get('p').get(_)[2] + (OBJs[1].get('p').get(_)[2] - OBJs[0].get('p').get(_)[2]) * (Date.now() - LastPING) / PING, 0, Math.PI * 2);
                    ctx.closePath()
                    ctx.fill();
                    for (i=0; i<SmokeParticles0.length; i++) {
                        if(SmokeParticles0[i].id == _)
                        {ctx.fillStyle = "rgba("+SmokeParticles0[i].cl +','+SmokeParticles0[i].cl+',' +SmokeParticles0[i].cl +',' +SmokeParticles0[i].hp/1500+ ")";
                        ctx.beginPath();
                        kl+=1
                        ctx.arc(Math.cos(SmokeParticles0[i].dir)*SmokeParticles0[i].h*OBJs[0].get('p').get(_)[2]*0.5+OffsetX+OBJs[0].get('p').get(_)[0] + (OBJs[1].get('p').get(_)[0] - OBJs[0].get('p').get(_)[0]) * (Date.now() - LastPING) / PING ,Math.sin(SmokeParticles0[i].dir)*SmokeParticles0[i].h*OBJs[0].get('p').get(_)[2]*0.5+OffsetY+OBJs[0].get('p').get(_)[1] + (OBJs[1].get('p').get(_)[1] - OBJs[0].get('p').get(_)[1]) * (Date.now() - LastPING) / PING, OBJs[0].get('p').get(_)[2] + (OBJs[1].get('p').get(_)[2] - OBJs[0].get('p').get(_)[2]) * (Date.now() - LastPING) / PING,0,2*Math.PI);
                        ctx.closePath()
                        ctx.fill();}
                    }
                } else {
                    //console.log('!')
                    ctx.beginPath()
                    ctx.arc(OffsetX + OBJs[0].get('p').get(_)[0], OffsetY + OBJs[0].get('p').get(_)[1], OBJs[0].get('p').get(_)[2], 0, Math.PI * 2);
                    ctx.closePath()
                    ctx.fill();
                    for (i=0; i<SmokeParticles0.length; i++) {
                        if(SmokeParticles0[i].id == _)
                        {ctx.fillStyle = "rgba("+SmokeParticles0[i].cl +','+SmokeParticles0[i].cl+',' +SmokeParticles0[i].cl +',' +SmokeParticles0[i].hp/1500+ ")";
                        ctx.beginPath();
                        kl+=1
                        ctx.arc(OffsetX+OBJs[0].get('p').get(_)[0] ,OffsetY+OBJs[0].get('p').get(_)[1],OBJs[0].get('p').get(_)[2],0,2*Math.PI);
                        ctx.closePath()
                        ctx.fill()}
                    }
                }
                    if(Math.random() < 0.1 && kl < 16){
                        SmokeParticles0.push(new Particle3(_))
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
	ctx. globalCompositeOperation = "color"
		for (i=0; i<TracerParticles1.length; i++) {

	    ctx.strokeStyle = "rgba(200,0,0,"+(TracerParticles1[i].life**0.2)*4+")";
	    ctx.lineWidth = 3
	    ctx.lineJoin = 'round'
        ctx.beginPath();
        ctx.moveTo(OffsetX+(TracerParticles1[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*320+window.innerWidth/2,OffsetY+window.innerHeight/2+(TracerParticles1[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*320)

        ctx.lineTo(OffsetX+(TracerParticles1[i].x1-(X+(nX-X)*((Date.now()-LastPING)/PING)))*320+window.innerWidth/2,OffsetY+window.innerHeight/2+(TracerParticles1[i].y1-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*320)
//		ctx.arc(OffsetX+(TracerParticles1[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*320+window.innerWidth/2,OffsetY+window.innerHeight/2+(TracerParticles1[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*320,2,0,2*Math.PI);
		ctx.closePath();

		ctx.stroke();

		TracerParticles1[i].life *= 0.975
		if (TracerParticles1[i].life < 0.00000001) {
			TracerParticles1.splice(i, 1);
			i--;
		}
	}
	ctx. globalCompositeOperation = "source-over"

	for (let _ of OBJs[0].get('>').keys()) {
//	    ctx.lineCap='round';
		if(OBJs[0].get('>').get(_)[4] <0){
			continue
		}
		if (OBJs[1].get('>').has(_)) {
			grad=ctx.createLinearGradient(OffsetX+Number(OBJs[0].get('>').get(_)[0]+ (OBJs[1].get('>').get(_)[0] - OBJs[0].get('>').get(_)[0]) * (Date.now() - LastPING) / PING),OffsetY+ Number(OBJs[0].get('>').get(_)[1]+ (OBJs[1].get('>').get(_)[1] - OBJs[0].get('>').get(_)[1]) * (Date.now() - LastPING) / PING),Number(OBJs[0].get('>').get(_)[2]+ (OBJs[1].get('>').get(_)[2] - OBJs[0].get('>').get(_)[2]) * (Date.now() - LastPING) / PING), Number(OBJs[0].get('>').get(_)[3]+ (OBJs[1].get('>').get(_)[3] - OBJs[0].get('>').get(_)[3]) * (Date.now() - LastPING) / PING));
		}else{
			grad=ctx.createLinearGradient(OffsetX+Number(OBJs[0].get('>').get(_)[0]),OffsetY+Number(OBJs[0].get('>').get(_)[1]),Number(OBJs[0].get('>').get(_)[2]),Number(OBJs[0].get('>').get(_)[3]));
		}

		grad.addColorStop(0,"#FFFFFF00");
		grad.addColorStop(1,"#FFFF0088");
		ctx.strokeStyle = grad
		ctx.lineWidth= Number(OBJs[0].get('>').get(_)[4]);

		if(OBJs[0].get('>').get(_)[5] == 1 || OBJs[0].get('>').get(_)[5] == 3){
			if (Math.random() < 1){

								PIXI.sound.play('dmg'+Math.floor(Math.random()*4));


				}

			if(OBJs[0].get('>').get(_)[5] == 3){
				ShakeXbnds += 5
				ShakeYbnds += 5
			}

			OBJs[0].get('>').get(_)[5]=0
		}else if(OBJs[0].get('>').get(_)[5] == 2){
			if (Math.random() < 1){

								PIXI.sound.play('Sdmg'+Math.floor(Math.random()*3));

			}

			OBJs[0].get('>').get(_)[5]=0
		}
		ctx.beginPath()

		if (OBJs[1].get('>').has(_)) {
			ctx.moveTo(OffsetX+Number(OBJs[0].get('>').get(_)[0]+ (OBJs[1].get('>').get(_)[0] - OBJs[0].get('>').get(_)[0]) * (Date.now() - LastPING) / PING),OffsetY+ Number(OBJs[0].get('>').get(_)[1]+ (OBJs[1].get('>').get(_)[1] - OBJs[0].get('>').get(_)[1]) * (Date.now() - LastPING) / PING));
			ctx.lineTo(OffsetX+Number(OBJs[0].get('>').get(_)[2]+ (OBJs[1].get('>').get(_)[2] - OBJs[0].get('>').get(_)[2]) * (Date.now() - LastPING) / PING),OffsetY+ Number(OBJs[0].get('>').get(_)[3]+ (OBJs[1].get('>').get(_)[3] - OBJs[0].get('>').get(_)[3]) * (Date.now() - LastPING) / PING));
		}else{
			ctx.moveTo(OffsetX+Number(OBJs[0].get('>').get(_)[0]),OffsetY+ Number(OBJs[0].get('>').get(_)[1]));
			ctx.lineTo(OffsetX+Number(OBJs[0].get('>').get(_)[2]),OffsetY+ Number(OBJs[0].get('>').get(_)[3]));
		}
		ctx.stroke();
		ctx.closePath()

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
            ctx.arc(OffsetX+(FireParticles2[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*320+window.innerWidth/2-FireParticles2[i].cof*Math.cos(FireParticles2[i].dir)*FireParticles2[i].rad,OffsetY+window.innerHeight/2+(FireParticles2[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*320-FireParticles2[i].cof*Math.sin(FireParticles2[i].dir)*FireParticles2[i].rad,FireParticles2[i].rad*Math.sin(FireParticles2[i].life/60*Math.PI),0,2*Math.PI);
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
		ctx.arc(OffsetX+(BangParticles2[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*320+window.innerWidth/2,OffsetY+window.innerHeight/2+(BangParticles2[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*320,BangParticles2[i].rad,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "rgba(255,160,0,"+(BangParticles2[i].life**1)*1+")";
		ctx.beginPath();
		ctx.arc(OffsetX+(BangParticles2[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*320+window.innerWidth/2+Math.cos(BangParticles2[i].dir+BangParticles2[i].life*Math.PI*2)*BangParticles2[i].rad*0.2,OffsetY+window.innerHeight/2+(BangParticles2[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*320+Math.sin(BangParticles2[i].dir+BangParticles2[i].life*Math.PI*2)*BangParticles2[i].rad*0.2,BangParticles2[i].rad*0.8,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
        BangParticles2[i].dir += BangParticles2[i].life*0.25
		BangParticles2[i].x += BangParticles2[i].xs/320/4*BangParticles2[i].life
		BangParticles2[i].y += BangParticles2[i].ys/320/4*BangParticles2[i].life
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
    for (i=0; i<SmokeParticles0.length; i++) {
		SmokeParticles0[i].hp-=1;
		SmokeParticles0[i].dir+=SmokeParticles0[i].spd*0.025;
		if (SmokeParticles0[i].hp < 0 ) {
			SmokeParticles0.splice(i, 1);
			i--;
		}
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
		SnowParticles0[i].x -= SnowParticles0[i].d * Math.sqrt(SnowParticles0[i].r/2)*(nX-X)*320;
		SnowParticles0[i].y -= SnowParticles0[i].d * Math.sqrt(SnowParticles0[i].r/2)*(nY-Y)*320;
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

	for (let _ of OBJs[0].get('n').keys()) {

		if (OBJs[0].get('n').get(_)[4] == 1) {
			if (OBJs[0].get('n').get(_)[2] > 0){
				ctx.fillStyle = '#0000ff';
			}else{
				ctx.fillStyle = '#ff0000';
			}

			ctx.strokeStyle = '#000'
		}else {
			if (OBJs[0].get('n').get(_)[2] > 0){
				ctx.fillStyle = 'rgba(0,0,255,0.2)';
			}else{
				ctx.fillStyle = 'rgba(255,0,0,0.2)';
			}

			ctx.strokeStyle = 'rgba(0,0,0,0.2)'
		}
		let a = ''
		if (OBJs[0].get('n').get(_).length > 5){
			a = '['+OBJs[0].get('n').get(_)[5]+'] '
		}
		ctx.lineWidth = 1
		ctx.textAlign = 'center'
		ctx.font = "20px Supermercado One";
		if(OBJs[1].get('n').has(_)) {
			ctx.fillText(a+String(_),OffsetX+ OBJs[0].get('n').get(_)[0] + (OBJs[1].get('n').get(_)[0] - OBJs[0].get('n').get(_)[0]) * (Date.now() - LastPING) / PING, OBJs[0].get('n').get(_)[1] + (OBJs[1].get('n').get(_)[1] - OBJs[0].get('n').get(_)[1]) * (Date.now() - LastPING) / PING - 50);
		}else{
			ctx.fillText(a+String(_),OffsetX +OBJs[0].get('n').get(_)[0],OffsetY+ OBJs[0].get('n').get(_)[1] - 50);
		}
		// ctx.fillStyle = '#00ff00';

		if (OBJs[0].get('n').get(_)[4] == 1) {

			ctx.fillStyle = 'rgb('+255*(1-Number(OBJs[0].get('n').get(_)[3]))+','+255*OBJs[0].get('n').get(_)[3]+',0)'
			}else {
			ctx.fillStyle = 'rgba('+255*(1-Number(OBJs[0].get('n').get(_)[3]))+','+255*OBJs[0].get('n').get(_)[3]+',0,0.2)'
		}
		if(OBJs[1].get('n').has(_)) {
			ctx.fillRect(OffsetX+OBJs[0].get('n').get(_)[0] + (OBJs[1].get('n').get(_)[0] - OBJs[0].get('n').get(_)[0]) * (Date.now() - LastPING) / PING - 25, OffsetY+OBJs[0].get('n').get(_)[1] + (OBJs[1].get('n').get(_)[1] - OBJs[0].get('n').get(_)[1]) * (Date.now() - LastPING) / PING - 45, 50 * (OBJs[0].get('n').get(_)[3] + (OBJs[1].get('n').get(_)[3] - OBJs[0].get('n').get(_)[3]) * (Date.now() - LastPING) / PING), 10) //50*Number(larr[4])
			ctx.strokeRect(OffsetX+OBJs[0].get('n').get(_)[0] + (OBJs[1].get('n').get(_)[0] - OBJs[0].get('n').get(_)[0]) * (Date.now() - LastPING) / PING - 25, OffsetY+OBJs[0].get('n').get(_)[1] + (OBJs[1].get('n').get(_)[1] - OBJs[0].get('n').get(_)[1]) * (Date.now() - LastPING) / PING - 45, 50, 10)
		}else{
			ctx.fillRect(OffsetX+OBJs[0].get('n').get(_)[0] - 25,OffsetY+ OBJs[0].get('n').get(_)[1] - 45, 50 * OBJs[0].get('n').get(_)[3], 10) //50*Number(larr[4])
			ctx.strokeRect(OffsetX+OBJs[0].get('n').get(_)[0]  - 25,OffsetY+ OBJs[0].get('n').get(_)[1] - 45, 50, 10)
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
if(navigator.userAgent.match(/iPhone/i)){
document.documentElement.requestFullscreen()
}
}
function startgamebtn() {
document.getElementById('TitleScreen').classList = ['titlescrs']
setTimeout(startgame,1500)
}
