function drawCannon(vehicle,cannon, fire=false){
    let turcrd = [cannon.x, cannon.y]
    let cos = vehicle.cos
    let sin = vehicle.sin
    let l = cannon.l
    let r = cannon.cannon_r
    let lw = cannon.len_width
    let fill = cannon.fill
    let strokeW = cannon.stroke_width
    let canbangCnt = cannon.canbang_prt_amount
    let canbangPrt = vehicle.canbang_particle
    let canbangPrts = vehicle.canbang_particles_list
    let underbody = cannon.underbody
    let shtSND = cannon.snd_shoot

    switch (cannon.indication_char) {
        case '3':
            ctx.fillStyle = MAPstatic.CT.o1
            ctx.strokeStyle = MAPstatic.CT.o1
            break;

        default:
            ctx.fillStyle = MAPstatic.CT.o0;
            ctx.strokeStyle = MAPstatic.CT.o0;
            break;
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
    ctx.strokeStyle = MAPstatic.CT.os;
    ctx.stroke();
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

    if(fire){

        for (let _ = 0; _ < canbangCnt; _++) {
            canbangPrts.push(new canbangPrt(vehicle.new_x+(vehicle.new_x-vehicle.x)*(Date.now() - LastPING) / PING +(turcrd[1]*cos)+(turcrd[0]*sin) + cosc*l/320,vehicle.new_y+(vehicle.new_y-vehicle.y)*(Date.now() - LastPING) / PING +(turcrd[1]*sin)+(turcrd[0]*-cos) + sinc*l/320))
        }
        PIXI.sound.play(shtSND);
    }

    switch (cannon.indication_char) {
    case '3':
        ctx.strokeStyle = MAPstatic.CT.l1
        break;

    default:
        ctx.strokeStyle = MAPstatic.CT.l0;
        break;
    }
    // if(((PlayersData.get(playername).Z/2+"").substring(0,1) != (Xmod ? 1 : 0))|| underbody){
	// 		ctx.fillStyle = 'rgba(0,0,0,0.2)'
	// 		ctx.strokeStyle = 'rgba(0,0,0,0.2)'
	// 	}

    ctx.lineCap = 'square';
    ctx.lineWidth = lw[0]/320*Zoom;
    ctx.stroke();

    switch (cannon.indication_char) {
    case '3':
        ctx.strokeStyle = MAPstatic.CT.o1
        break;

    default:
        ctx.strokeStyle = MAPstatic.CT.o0;
        break;
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
    let cos = vehicle.cos
    let sin = vehicle.sin

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
function drawF(vehicle,poly=[[0,0],[0,0]], cls ={},water_stroke=false){
        let cos = vehicle.cos
        let sin = vehicle.sin
		
		if (cls[vehicle.color_id] != undefined){
		    ctx.fillStyle =  cls[vehicle.color_id]
		}else{
		    ctx.fillStyle =  "#fff"
		}
        // console.log(poly)

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
		ctx.lineJoin = 'round'
//		ctx.lineWidth= (6+Math.sin(Date.now()*0.001)*2)/320*Zoom;
//		ctx.strokeStyle = 'rgba(255,255,255,'+ (0.3-Math.sin(Date.now()*0.001)*0.1).toString()+')'
//		ctx.stroke();
		ctx.lineWidth= 2/320*Zoom;
		ctx.strokeStyle = MAPstatic.CT.fs
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

function create_waterparticles_for_poly(vehicle,poly,rate = null){
    if (rate == null){
        rate = (Math.sqrt((vehicle.new_x-vehicle.x)**2+(vehicle.new_y-vehicle.y)**2)*FPS)**3
    }

    if (Math.random() < rate) {
        let maxdst =  1.5;
        let polydsttoprt = Math.random()*maxdst
        let _ = 0
        while (Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)< polydsttoprt){
            polydsttoprt-=Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2);
            _+=1;
        }
        let wtrptrcof = polydsttoprt/Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)
        let wtrprtx = poly[_%poly.length][0] +(poly[(_+1)%poly.length][0]-poly[_%poly.length][0])*wtrptrcof
        let wtrprty = poly[_%poly.length][1] +(poly[(_+1)%poly.length][1]-poly[_%poly.length][1])*wtrptrcof
        WtrParticles0.push(new WtrPrt0(vehicle.new_x+(vehicle.new_x-vehicle.x)*(Date.now() - LastPING) / PING+(wtrprty*vehicle.cos)+(wtrprtx*vehicle.sin), vehicle.new_y+(vehicle.new_y-vehicle.y)*(Date.now() - LastPING) / PING+(wtrprty*vehicle.sin)+(wtrprtx*-vehicle.cos)));
    }
}



//  BASE    =======================================

class Vehicle{
    type_id = 0
    f = {}
    canbang_particle = CanPrt0
    canbang_particles_list = CanBangParticles0
    bang_particle = BangPrt0
    bang_particles_list = BangParticles0

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
        this.sin = 0
        this.cos = 0
    }

    calculate_sin_cos(){
    if ((this.prev_dir < 360 && this.prev_dir  >270) && (this.dir  < 90 && this.dir > -1)){
        this.sin = Math.sin((((Date.now() - LastPING)/ PING)*(this.dir-this.prev_dir+360)+this.prev_dir+90)/180*Math.PI)
        this.cos = Math.cos((((Date.now() - LastPING)/ PING)*(this.dir-this.prev_dir+360)+this.prev_dir+90)/180*Math.PI)
    }else if((this.dir < 360 && this.dir >270) && (this.prev_dir < 90 && this.prev_dir > -1)){
        this.sin = Math.sin((((Date.now() - LastPING)/ PING)*(this.dir-this.prev_dir-360)+this.prev_dir+90)/180*Math.PI)
        this.cos = Math.cos((((Date.now() - LastPING)/ PING)*(this.dir-this.prev_dir-360)+this.prev_dir+90)/180*Math.PI)
    }else{
        this.sin = Math.sin((((Date.now() - LastPING)/ PING)*(this.dir-this.prev_dir)+this.prev_dir+90)/180*Math.PI)
        this.cos = Math.cos((((Date.now() - LastPING)/ PING)*(this.dir-this.prev_dir)+this.prev_dir+90)/180*Math.PI)
    }
    }

    draw_indicators(layer){
        this.calculate_sin_cos()
        this.modules.forEach(module => {

            module.draw_indicator(layer,this)
        });
    }

    drawp(layer){
        this.calculate_sin_cos()
        this.modules.forEach(module => {
            // console.log(module)
            module.drawp(layer,this)
        });
    }

    drawe(layer){
        this.calculate_sin_cos()
        this.modules.forEach(module => {
            module.drawe(layer,this)
        });
    }

    parse_common_string(string){
//        console.log(string)
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

//        console.log(string)
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
    bang_prt_amount = 5
    snd_bang = 'bang'
    constructor(){
        super()
        this.indication_char = '0'
        this.prev_indication_char = '0'
    }

    get_random_point(){
        return [0,0]
    }

    draw_indicator(){}

    explode(vehicle){

        let cos = vehicle.cos
        let sin = vehicle.sin
        let bangPrts = vehicle.bang_particles_list
        let bangPrt = vehicle.bang_particle
        PIXI.sound.play(this.snd_bang);
        for (let _ = 0; _ < this.bang_prt_amount; _++) {
            let turcrd = this.get_random_point()
            bangPrts.push(new bangPrt(vehicle.new_x+(vehicle.new_x-vehicle.x)*(Date.now() - LastPING) / PING +(turcrd[1]*cos)+(turcrd[0]*sin),vehicle.new_y+(vehicle.new_y-vehicle.y)*(Date.now() - LastPING) / PING +(turcrd[1]*sin)+(turcrd[0]*-cos)))
        }
    }

    emit_fire(){}

    drawp(layer,vehicle){
        switch (this.indication_char) {
            case '3':
                if (this.prev_indication_char == '2' || this.prev_indication_char=='1' || this.prev_indication_char=='0'){
                    this.explode(vehicle)
                    this.prev_indication_char = '3'
                }
                break;

        }
    }

    drawe(layer,vehicle){
        switch (this.indication_char) {
            case '3':
                if (this.prev_indication_char == '2' || this.prev_indication_char=='1' || this.prev_indication_char=='0'){
                    this.explode(vehicle)
                    this.prev_indication_char = '3'
                }
            break;

        }
    }

    updatep(string){
        this.prev_new_indication_char = this.indication_char
        this.indication_char = string[0]

        return string.slice(1)
    }

    updatee(string){
        this.prev_new_indication_char = this.indication_char
        this.indication_char = string[0]

        return string.slice(1)
    }
}

class PolygonModule extends RealModule{

    constructor(poly){
        super()
        this.poly = poly
        this.x = 0
        this.y = 0
        this.poly.forEach(point => {
            this.x=this.x + point[0]
            this.y=this.y + point[1]
        });
        this.x = this.x/this.poly.length
        this.y = this.y/this.poly.length
    }

    get_random_point(){
        return [this.x,this.y]
    }

    draw_indicator(layer, vehicle){
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

    get_random_point(){
        let a = Math.random()*2*Math.PI
        let r = Math.random()* this.r
        return [Math.cos(a)*r,Math.sin(a)*r]
    }

    draw_indicator(layer,vehicle){
        drawCircularModuleIndicator(vehicle,this.x,this.y,12,this.indication_char)
    }
}

class Cannon extends CircularModule{
    cannon_r = 10
    l = 20
    len_width = [5,3]
    fill = true
    stroke_width = 2
    canbang_prt_amount = 5
    underbody = false
    snd_shoot = 'mcanon'
    constructor(x,y,r){
        super(x,y)
        this.dir = 0
        this.prev_dir = 0
        this.status = 0
        this.prev_status = 0
    }

    drawp(layer,vehicle){
        drawCannon(vehicle,this,this.prev_status!=this.status)
        this.prev_status = this.status
    }

    drawe(layer,vehicle){
        drawCannon(vehicle,this,this.prev_status!=this.status)
        this.prev_status = this.status
    }
}

