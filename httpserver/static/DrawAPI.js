function drawCannon(vehicle,cannon, r = 10,firesize = 1,l = 20,shtSND = "mcannon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles0,
bangPrt = BangPrt0,bangPrts = BangParticles0,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 5, bangCnt = 5 , lw = [5,3], fire = true, underbody = false,fill = true, strokeW = 2){
    let turcrd = [cannon.x, cannon.y]
    // console.log(turcrd)
    let cos = 0
    let sin = 0
    if ((vehicle.prev_dir < 360 && vehicle.prev_dir  >270) && (vehicle.dir  < 90 && vehicle.dir > -1)){
        sin = Math.sin((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir+360)+vehicle.prev_dir+90)/180*Math.PI)
        cos = Math.cos((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir+360)+vehicle.prev_dir+90)/180*Math.PI)
    }else if((vehicle.dir < 360 && vehicle.dir >270) && (vehicle.prev_dir < 90 && vehicle.prev_dir > -1)){
        sin = Math.sin((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir-360)+vehicle.prev_dir+90)/180*Math.PI)
        cos = Math.cos((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir-360)+vehicle.prev_dir+90)/180*Math.PI)
    }else{
        sin = Math.sin((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir)+vehicle.prev_dir+90)/180*Math.PI)
        cos = Math.cos((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir)+vehicle.prev_dir+90)/180*Math.PI)
    }
    if(cannon.status  <2){
        ctx.fillStyle = MAPstatic.CT.o0;
        ctx.strokeStyle = MAPstatic.CT.o0;
    }else{
        ctx.fillStyle = MAPstatic.CT.o1
        ctx.strokeStyle = MAPstatic.CT.o1
        if(fire){
            let a = Math.random()*Math.PI * 2;

            firePrts.push(new firePrt(vehicle.new_x+(vehicle.new_x-vehicle.x)*(Date.now() - LastPING) / PING+(turcrd[1]*cos)+(turcrd[0]*sin),vehicle.new_y+(vehicle.new_y-vehicle.y)*(Date.now() - LastPING) / PING+(turcrd[1]*sin)+(turcrd[0]*-cos),firesize));

        }
    }
    // console.log(vehicle.dir)
    // console.log(vehicle.prev_dir)

    // if(((PlayersData.get(playername).Z/2+"").substring(0,1) != (Xmod ? 1 : 0)) || underbody){
    //             ctx.fillStyle = 'rgba(0,0,0,0.2)'
    //             ctx.strokeStyle = 'rgba(0,0,0,0.2)'
    // }
    //TODO ?????????????????
    ctx.lineWidth= strokeW/320*Zoom;
    ctx.lineJoin = 'miter';
    ctx.beginPath()
    ctx.arc((vehicle.new_x+(vehicle.new_x-vehicle.x-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom+GameW/2 + OffsetX+(turcrd[1]*cos*Zoom)+(turcrd[0]*Zoom*sin) ,(vehicle.new_y+(vehicle.new_y-vehicle.y-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom+GameH/2 + OffsetY+(turcrd[1]*sin*Zoom)+(turcrd[0]*-cos*Zoom),r/320*Zoom,0, Math.PI * 2);
    
    ctx.closePath();
    if(fill) ctx.fill();
    ctx.stroke();
    // if(!(((PlayersData.get(playername).Z/2+"").substring(0,1) != (Xmod ? 1 : 0)) || underbody)){
    //     ctx.strokeStyle = MAPstatic.CT.os;
    //     ctx.stroke();
    // }

    

    sinc = 0
    cosc = 0
    if ((cannon.prev_dir < 360 && cannon.prev_dir >270) && (cannon.dir < 90 && cannon.dir > -1)){
        sinc = Math.sin((((Date.now() - LastPING)/ PING)*(cannon.dir-cannon.prev_dir+360)+cannon.prev_dir)/180*Math.PI)
        cosc = Math.cos((((Date.now() - LastPING)/ PING)*(cannon.dir-cannon.prev_dir+360)+cannon.prev_dir)/180*Math.PI)
    }else if((cannon.dir < 360 && cannon.dir >270) && (cannon.prev_dir < 90 && cannon.prev_dir > -1)){
        sinc = Math.sin((((Date.now() - LastPING)/ PING)*(cannon.dir-cannon.prev_dir-360)+cannon.prev_dir)/180*Math.PI)
        cosc = Math.cos((((Date.now() - LastPING)/ PING)*(cannon.dir-cannon.prev_dir-360)+cannon.prev_dir)/180*Math.PI)
    }else{
        sinc = Math.sin((((Date.now() - LastPING)/ PING)*(cannon.dir-cannon.prev_dir)+cannon.prev_dir)/180*Math.PI)
        cosc = Math.cos((((Date.now() - LastPING)/ PING)*(cannon.dir-cannon.prev_dir)+cannon.prev_dir)/180*Math.PI)
    }
    ctx.beginPath()
    ctx.moveTo((vehicle.new_x+(vehicle.new_x-vehicle.x-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom+GameW/2 + OffsetX +(turcrd[1]*cos*Zoom)+(turcrd[0]*Zoom*sin),(vehicle.new_y+(vehicle.new_y-vehicle.y-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom+GameH/2+(turcrd[1]*sin*Zoom)+(turcrd[0]*-cos*Zoom) + OffsetY);
    ctx.lineTo((vehicle.new_x+(vehicle.new_x-vehicle.x-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom+GameW/2 + OffsetX+(turcrd[1]*cos*Zoom)+(turcrd[0]*Zoom*sin) + cosc*l/320*Zoom,(vehicle.new_y+(vehicle.new_y-vehicle.y-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom+GameH/2 + OffsetY+(turcrd[1]*sin*Zoom)+(turcrd[0]*-cos*Zoom) + sinc*l/320*Zoom);
    ctx.closePath()
    if(cannon.status <2){
        ctx.strokeStyle = MAPstatic.CT.l0
        if (cannon.status == 1){
            for (let _ = 0; _ < canbangCnt; _++) {
                canbangPrts.push(new canbangPrt(vehicle.new_x+(vehicle.new_x-vehicle.x)*(Date.now() - LastPING) / PING +(turcrd[1]*cos)+(turcrd[0]*sin) + cosc*l/320,vehicle.new_y+(vehicle.new_y-vehicle.y)*(Date.now() - LastPING) / PING +(turcrd[1]*sin)+(turcrd[0]*-cos) + sinc*l/320))
            }
           PIXI.sound.play(shtSND);
           cannon.status = 0
        }
    }else{
        if (cannon.status == 3){
            PIXI.sound.play(bngSND);
            for (let _ = 0; _ < bangCnt; _++) {
                bangPrts.push(new bangPrt(vehicle.new_x+(vehicle.new_x-vehicle.x)*(Date.now() - LastPING) / PING +(turcrd[1]*cos)+(turcrd[0]*sin),vehicle.new_y+(vehicle.new_y-vehicle.y)*(Date.now() - LastPING) / PING +(turcrd[1]*sin)+(turcrd[0]*-cos)))
            }
            cannon.status = 2
        }
        ctx.strokeStyle = MAPstatic.CT.l1
    }
    // if(((PlayersData.get(playername).Z/2+"").substring(0,1) != (Xmod ? 1 : 0))|| underbody){
	// 		ctx.fillStyle = 'rgba(0,0,0,0.2)'
	// 		ctx.strokeStyle = 'rgba(0,0,0,0.2)'
	// 	}
    ctx.lineCap = 'square';
    ctx.lineWidth = lw[0]/320*Zoom;
    ctx.stroke();

    if(cannon.status <2){
                    ctx.strokeStyle = MAPstatic.CT.o0;
    }else{
                    ctx.strokeStyle = MAPstatic.CT.o1
    }
    // if(((PlayersData.get(playername).Z/2+"").substring(0,1) != (Xmod ? 1 : 0))|| underbody){
    // 	ctx.fillStyle = 'rgba(0,0,0,0.2)'
    // 	ctx.strokeStyle = 'rgba(0,0,0,0.2)'
    // }
    ctx.lineWidth = lw[1]/320*Zoom;
    ctx.stroke();
}
function drawCircularModuleIndicator(vehicle,x=0,y=0, r = 10,char='0',level=0){
    let turcrd = [x, y]
    let cos = 0
    let sin = 0
    if ((vehicle.prev_dir < 360 && vehicle.prev_dir  >270) && (vehicle.dir  < 90 && vehicle.dir > -1)){
        sin = Math.sin((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir+360)+vehicle.prev_dir+90)/180*Math.PI)
        cos = Math.cos((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir+360)+vehicle.prev_dir+90)/180*Math.PI)
    }else if((vehicle.dir < 360 && vehicle.dir >270) && (vehicle.prev_dir < 90 && vehicle.prev_dir > -1)){
        sin = Math.sin((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir-360)+vehicle.prev_dir+90)/180*Math.PI)
        cos = Math.cos((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir-360)+vehicle.prev_dir+90)/180*Math.PI)
    }else{
        sin = Math.sin((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir)+vehicle.prev_dir+90)/180*Math.PI)
        cos = Math.cos((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir)+vehicle.prev_dir+90)/180*Math.PI)
    }
    setIndicatorStyles(char,level)
    ctx.lineWidth= 1/320*Zoom;
    ctx.lineJoin = 'miter';
    ctx.beginPath()
    ctx.arc((vehicle.new_x+(vehicle.new_x-vehicle.x-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom+GameW/2 + OffsetX+(turcrd[1]*cos*Zoom)+(turcrd[0]*Zoom*sin) ,(vehicle.new_y+(vehicle.new_y-vehicle.y-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom+GameH/2 + OffsetY+(turcrd[1]*sin*Zoom)+(turcrd[0]*-cos*Zoom),r/320*Zoom,0, Math.PI * 2);

    ctx.closePath();
    ctx.fill()
    ctx.stroke();
  
}
function setIndicatorStyles(char='0',level=0){
    switch (char) {
        case '1':
            ctx.strokeStyle = 'rgba(255,255,0,0.25)'
            ctx.fillStyle = 'rgba(255,255,0,0.25)'
            break;
        case '2':
            ctx.strokeStyle = 'rgba(255,0,0,0.25)'
            ctx.fillStyle = 'rgba(255,0,0,0.25)'
            break;
        case '3':
            ctx.strokeStyle = '#f00'
            ctx.fillStyle = 'rgba(0,0,0,0.2)'
            break;
    
        default:
            ctx.strokeStyle = 'rgba(200,200,200,0.2)'
            ctx.fillStyle = 'rgba(200,200,200,0.2)'
            break;
    }
}
function drawF(vehicle,poly=[[0,0],[0,0]], cls ={}){
        let cos = 0
        let sin = 0
        if ((vehicle.prev_dir < 360 && vehicle.prev_dir  >270) && (vehicle.dir  < 90 && vehicle.dir > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir+360)+vehicle.prev_dir+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir+360)+vehicle.prev_dir+90)/180*Math.PI)
        }else if((vehicle.dir < 360 && vehicle.dir >270) && (vehicle.prev_dir < 90 && vehicle.prev_dir > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir-360)+vehicle.prev_dir+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir-360)+vehicle.prev_dir+90)/180*Math.PI)
        }else{
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir)+vehicle.prev_dir+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir)+vehicle.prev_dir+90)/180*Math.PI)
        }
		
		if (cls[vehicle.color_id] != undefined){
		    ctx.fillStyle =  cls[vehicle.color_id]
		}else{
		    ctx.fillStyle =  "#fff"
		}
        // console.log(poly)
        ctx.strokeStyle = MAPstatic.CT.fs
        ctx.beginPath();
		
		// if((PlayersData.get(playername).Z/2+"").substring(0,1) != (Xmod ? 1 : 0)){
		// 	ctx.fillStyle = 'rgba(0,0,0,0.2)'
		// 	ctx.strokeStyle = 'rgba(0,0,0,0.2)'
		// }
		ctx.moveTo((vehicle.new_x+(vehicle.new_x-vehicle.x-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 + OffsetX+(poly[0][1]*Zoom*cos) +(poly[0][0]*Zoom*sin),(vehicle.new_y+(vehicle.new_y-vehicle.y-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom + GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
        for (let _ = 1; _ < poly.length; _+=1) {
            ctx.lineTo((vehicle.new_x+(vehicle.new_x-vehicle.x-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 + OffsetX+(poly[_][1]*cos*Zoom)+(poly[_][0]*Zoom*sin) ,(vehicle.new_y+(vehicle.new_y-vehicle.y-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom+GameH/2 + OffsetY+(poly[_][1]*sin*Zoom)+(poly[_][0]*-cos*Zoom));


        }
        ctx.lineTo((vehicle.new_x+(vehicle.new_x-vehicle.x-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 + OffsetX+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,(vehicle.new_y+(vehicle.new_y-vehicle.y-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom +GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
		ctx.closePath();
		ctx.lineWidth= 2/320*Zoom;
        ctx.fill();
	    ctx.stroke();
}

function drawPolygonModuleIndicator(vehicle,poly=[[0,0],[0,0]], char='0',level=0){
    let cos = 0
    let sin = 0
    if ((vehicle.prev_dir < 360 && vehicle.prev_dir  >270) && (vehicle.dir  < 90 && vehicle.dir > -1)){
        sin = Math.sin((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir+360)+vehicle.prev_dir+90)/180*Math.PI)
        cos = Math.cos((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir+360)+vehicle.prev_dir+90)/180*Math.PI)
    }else if((vehicle.dir < 360 && vehicle.dir >270) && (vehicle.prev_dir < 90 && vehicle.prev_dir > -1)){
        sin = Math.sin((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir-360)+vehicle.prev_dir+90)/180*Math.PI)
        cos = Math.cos((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir-360)+vehicle.prev_dir+90)/180*Math.PI)
    }else{
        sin = Math.sin((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir)+vehicle.prev_dir+90)/180*Math.PI)
        cos = Math.cos((((Date.now() - LastPING)/ PING)*(vehicle.dir-vehicle.prev_dir)+vehicle.prev_dir+90)/180*Math.PI)
    }
    setIndicatorStyles(char,level)
    ctx.beginPath();
    ctx.moveTo((vehicle.new_x+(vehicle.new_x-vehicle.x-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 + OffsetX+(poly[0][1]*Zoom*cos) +(poly[0][0]*Zoom*sin),(vehicle.new_y+(vehicle.new_y-vehicle.y-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom + GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
    for (let _ = 1; _ < poly.length; _+=1) {
        ctx.lineTo((vehicle.new_x+(vehicle.new_x-vehicle.x-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 + OffsetX+(poly[_][1]*cos*Zoom)+(poly[_][0]*Zoom*sin) ,(vehicle.new_y+(vehicle.new_y-vehicle.y-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom+GameH/2 + OffsetY+(poly[_][1]*sin*Zoom)+(poly[_][0]*-cos*Zoom));


    }
    ctx.lineTo((vehicle.new_x+(vehicle.new_x-vehicle.x-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 + OffsetX+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,(vehicle.new_y+(vehicle.new_y-vehicle.y-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom +GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
    ctx.closePath();
    ctx.lineWidth= 1/320*Zoom;
    ctx.fill();
    ctx.stroke();
}
function DrawNickname(name, hp, hpmax,x,y,z=0){

    if (cameraMode) return
    var p = NoTeamTag(PlayerName)
    if (PlayerTags.get(p) == PlayerTags.get(name) && PlayerTags.get(p) != null){
        ctx.fillStyle = 'rgba(0,0,255,0.75)';
    }else{
        if (z == 1 && Z != 1) return
        ctx.fillStyle = 'rgba(255,0,0,0.75)';
    }

    ctx.strokeStyle = 'rgba(0,0,0,0.5)'
    ctx.lineWidth = 1
    ctx.textAlign = 'center'
    ctx.font = Math.round(20/320*Zoom)+"px Arial";
    if (PlayerTags.get(name) != null){
        ctx.fillText("["+PlayerTags.get(name)+"]"+name, x, y-50/320*Zoom);
    }else{
        ctx.fillText(name, x, y-50/320*Zoom);
    }

    ctx.fillStyle = 'rgba('+255*(1-(hp/hpmax))+','+255*(hp/hpmax)+',0,0.75)'
    ctx.fillRect(x-37/320*Zoom,y-45/320*Zoom,75*(hp/hpmax)/320*Zoom,7/320*Zoom) //50*Number(larr[4])
    ctx.strokeRect(x-37/320*Zoom,y-45/320*Zoom,75/320*Zoom,7/320*Zoom)
}

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

//  BASE    =======================================

class Vehicle{
    type_id = 0
    f = {}

    constructor(id,name){
        this.id = id
        this.name = name
        this.modules = null
        this.color_id = 0
        this.hp = 0
        this.dir = 0
        this.prev_dir = 0
        this.new_x = 0
        this.new_y = 0
        this.x = 0
        this.y = 0
    }

    drawp(layer){
        this.modules.forEach(module => {
            // console.log(module)
            module.drawp(layer,this)
        });
    }

    drawe(layer){
        this.modules.forEach(module => {
            module.drawe(layer,this)
        });
    }

    parse_common_string(string){
        console.log(string)
        let lst = []
        for (let arg = 0; arg < 6; arg++) {
            let substr = string.split(',')[0]
            lst.push(substr)
            string = string.slice(substr.length+1)

            
        }
        this.name = lst[0]
        this.color_id = Number(lst[1])
        this.hp = Number(lst[2])
        this.prev_dir = this.dir
        this.dir = Number(lst[3])
        this.x = this.new_x
        this.y = this.new_y
        this.new_x = Number(lst[4])
        this.new_y = Number(lst[5])

        console.log(string)
        return string
        
    }

    updatep(string){
        string = this.parse_common_string(string)
        X = this.x
        Y = this.y
        nX = this.new_x
        nY = this.new_y
        this.modules.forEach(module => {
            // console.log(string)
            string = module.updatep(string)
        });
    }

    updatee(string){
        string = this.parse_common_string(string)
        this.modules.forEach(module => {
            string = module.updatee(string)
        });
    }
}

class Module{
    constructor(){

    }

    updatep(string){
        return string
    }

    updatee(string){
        return string
    }

    drawp(layer, vehicle){}

    drawe(layer, vehicle){}

}

class RealModule extends Module{

    constructor(){
        super()
        this.indication_char = '0'
    }

    updatep(string){
        this.indication_char = string[0]
        return string.slice(1)
    }
}

class PolygonModule extends RealModule{

    constructor(poly){
        super()
        this.poly = poly
    }
    
    drawp(layer,vehicle){
        // console.log(this.indication_char)
        drawPolygonModuleIndicator(vehicle,this.poly,this.indication_char)
    }


}

class CircularModule extends RealModule{

    constructor(x,y,r){
        super()
        this.x = x
        this.y = y
        this.r = r
    }

    drawp(layer,vehicle){
        // console.log(this.indication_char)
        drawCircularModuleIndicator(vehicle,this.x,this.y,12,this.indication_char)
    }
}

class MortarCannon extends CircularModule{
    constructor(x,y,r = 0.0375){
        
        super(x,y,r)
        this.dir = 0
        this.prev_dir = 0
        this.status = 0
    }
    
    updatep(string){
        string = super.updatep(string)
        let sublist = string.split(',',2)
        string = string.slice(sublist[0].length + sublist[1].length + 2)
        this.status = Number(sublist[0][0])
        this.prev_dir = this.dir
        this.dir = Number(sublist[0].slice(1))
        let shells = Number(sublist[1])
        return string
    }

    drawp(layer,vehicle){
        if (layer=='OnWater+2'){
            drawCannon(vehicle,this) // r = 12,firesize = 0.75,l = 18,shtSND = "mcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles0,bangPrt = BangPrt0,bangPrts = BangParticles0,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 5, bangCnt = 5,lw=[8,5]
            super.drawp(layer,vehicle)
        }
    }
}

class ShipEngine extends PolygonModule{}
class WaterPump extends PolygonModule{}
class ShipFuelTank extends PolygonModule{}
class ShipShellStorage extends PolygonModule{}
class ShipSegment extends PolygonModule{}

class TorpedoFrontalTube extends PolygonModule{
    constructor(poly){
        super(poly)
        this.amount = 0
    }
    
    updatep(string){
        string = super.updatep(string)
        let substring = string.split(',',1)[0]
        string = string.slice(substring.length + 1)
        this.amount = Number(substring)
        return string
    }
}

class SmokeGenerator extends PolygonModule{
    constructor(poly){
        super(poly)
        this.amount = 0
    }
    
    updatep(string){
        string = super.updatep(string)
        let substring = string.split(',',1)[0]
        string = string.slice(substring.length + 1)
        this.amount = Number(substring)
        return string
    }
}

POLY_SHAPE = [[0.15, 0], [0, 0.06], [-0.15, 0.045], [-0.15, -0.045], [0, -0.06]]
POLY_SHAPE_N = [[0.06, 0.15], [-0.015, 0.15], [-1, 0], [-0.015, -0.15], [0.06, -0.15]]
SEG1 = [[0.15,0],[0.05,-0.04],[0.05,0.04]]
SEG2 = [[0.05,-0.04],[0.05,0.04],[0, 0.06],[-0.05,0.055],[-0.05,-0.055],[0, -0.06]]
SEG3 = [[-0.05,-0.055],[-0.05,0.055],[-0.15,0.045],[-0.15,-0.045]]
ENG = [[-0.15,0.025],[-0.15,-0.025],[-0.05,-0.025],[-0.05,0.025]]
AMM = [[-0.05,0.05],[-0.02,0.05],[-0.02,-0.05],[-0.05,-0.05]]
TUBE = [[0.085,0.01],[0.085,-0.01],[0.135,-0.01],[0.135,0.01]]
FUEL1 = [[0.085,0.02],[0.085,-0.02],[0.06,-0.03],[0.06,0.03]]
FUEL2 = [[0,0.005],[0,0.055],[0.05,0.035],[0.05,0.005]]
FUEL3 = [[0,-0.005],[0,-0.055],[0.05,-0.035],[0.05,-0.005]]
PMP = [[0.075,0.015],[0.12,0.015],[0.12,-0.015],[0.075,-0.015]]
SMK = [[0.045,0.025],[0.075,0.025],[0.075,-0.025],[0.045,-0.025]]

class Heavy extends Vehicle{
    f = {
        '0': '#131313',
        '1': '#2a200c',
        '2': '#122b0b',
        '3': '#10222b',
        '4': '#323232',
        '5': '#713567',
        '6':'#723636'}

    constructor(id,name){
        super(id,name)
        this.modules = [
            new MortarCannon(0,0),
            new MortarCannon(-0.1,0),
            new TorpedoFrontalTube(TUBE),
            new SmokeGenerator(SMK),
            new ShipEngine(ENG),
            new WaterPump(PMP),
            new ShipFuelTank(FUEL1),
            new ShipFuelTank(FUEL2),
            new ShipFuelTank(FUEL3),
            new ShipShellStorage(AMM),
            new ShipSegment(SEG1),
            new ShipSegment(SEG2),
            new ShipSegment(SEG3),
        ]
        
    }

    drawp(layer){
        // console.log("DRAW!")
        if (layer.includes('OnWater')){
            // console.log("DRAW")
            if (layer=='OnWater'){
                drawF(this,POLY_SHAPE, this.f)
            }
            // console.log("DR")
            super.drawp(layer)
        }
    }
}