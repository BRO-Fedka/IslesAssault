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
    let xy = global_xy_to_screen(vehicle.local_xy_to_global(turcrd))
    ctx.arc(xy[0],xy[1],r/320*Zoom,0, Math.PI * 2);
    
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
    ctx.moveTo(xy[0],xy[1]);
    ctx.lineTo(xy[0] + cosc*l/320*Zoom,xy[1] + sinc*l/320*Zoom);
    ctx.closePath()

    if(fire){
        xy = vehicle.local_xy_to_global(turcrd)
        for (let _ = 0; _ < canbangCnt; _++) {
            canbangPrts.push(new canbangPrt(xy[0] + cosc*l/320,xy[1] + sinc*l/320))
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
function drawCircularModuleIndicator(layer,vehicle,x=0,y=0, r = 0.05,char='0',level=0){
    let turcrd = [x, y]
    let cos = vehicle.cos
    let sin = vehicle.sin

    setIndicatorStyles(char,layer,ctx)
    ctx.lineWidth= 1/320*Zoom;
    ctx.lineJoin = 'miter';
    ctx.beginPath()
    let xy = global_xy_to_screen(vehicle.local_xy_to_global(turcrd))
    ctx.arc(xy[0], xy[1],r*Zoom,0, Math.PI * 2);

    ctx.closePath();
    ctx.fill()
    ctx.stroke();
  
}

function drawPlayerCircularModuleIndicator(layer,vehicle,x=0,y=0, r = 10,char='0',level=0){
    let turcrd = [x, y]
    let cos = vehicle.cos
    let sin = vehicle.sin
    let zoom = 480
    setIndicatorStyles(char,layer,pmcctx)
    pmcctx.lineWidth= 1;
    pmcctx.lineJoin = 'miter';
    pmcctx.beginPath()
    pmcctx.arc(((y*vehicle.cos) +(x*vehicle.sin))*zoom+zoom*0.17,((y*vehicle.sin)+(x*-vehicle.cos))*zoom+zoom*0.17,r*zoom,0, Math.PI * 2);

    pmcctx.closePath();
    pmcctx.fill()
    pmcctx.stroke();

}

function setIndicatorStyles(char='0',layer, context){
    let l = 1
    if (layer == "DEFAULT"){
        l = 2
    }
    switch (char) {
        case '1':
            context.strokeStyle = 'rgba(255,255,128,1)'
            context.fillStyle = 'rgba(255,255,0,'+0.25*l+')'
            break;
        case '2':
            context.strokeStyle = 'rgba(255,128,0)'
            context.fillStyle = 'rgba(255,0,0,'+0.3*l+')'
            break;
        case '3':
            context.strokeStyle = '#f00'
            context.fillStyle = 'rgba(0,0,0,'+0.3*l+')'
            break;
        case '6':
            context.strokeStyle = '#0f0'
            context.fillStyle = 'rgba(128,255,128,'+0.5*l*(0.5+Math.sin(Date.now()/600)*0.5)+')'
            break;
        default:
            context.strokeStyle = 'rgba(255,255,255,1)'
            context.fillStyle = 'rgba(255,255,255,'+0.1*l+')'
            break;
    }
}


function getIndicatorBGForIndicationChar(char='0'){
    switch (char) {
        case '1':
            return 'rgba(255,255,0,0.5)'
        case '2':
            return 'rgba(255,0,0,0.5)'
        case '3':
            return 'rgba(0,0,0,0.8)'
        case '4':
            return 'rgba(0,0,0,0.8)'
        case '6':
            return 'rgba(0,255,0,1)'


        default:
            return 'rgba(0,0,0,0.2)'
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
		let xy = global_xy_to_screen(vehicle.local_xy_to_global(poly[0]))
		ctx.moveTo(xy[0],xy[1]);
        for (let _ = 1; _ < poly.length; _+=1) {
            xy = global_xy_to_screen(vehicle.local_xy_to_global(poly[_]))
            ctx.lineTo(xy[0],xy[1]);


        }
        xy = global_xy_to_screen(vehicle.local_xy_to_global(poly[0]))
        ctx.lineTo(xy[0],xy[1]);
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


function drawPolygonModuleIndicator(layer,vehicle,poly=[[0,0],[0,0]], char='0',level=0){
    setIndicatorStyles(char,layer,ctx)
    ctx.beginPath();
    let xy = global_xy_to_screen(vehicle.local_xy_to_global(poly[0]))
    ctx.moveTo(xy[0],xy[1]);
    for (let _ = 1; _ < poly.length; _+=1) {
            xy = global_xy_to_screen(vehicle.local_xy_to_global(poly[_]))
            ctx.lineTo(xy[0],xy[1]);


    }
    xy = global_xy_to_screen(vehicle.local_xy_to_global(poly[0]))
    ctx.lineTo(xy[0],xy[1]);
    ctx.closePath();
    ctx.lineWidth= 1/320*Zoom;
    ctx.fill();
    ctx.stroke();
}

function drawPlayerPolygonModuleIndicator(layer,vehicle,poly=[[0,0],[0,0]], char='0',level=0){
//    console.log('!')
    setIndicatorStyles(char,layer,pmcctx)
    pmcctx.beginPath();
    let zoom = 480
    pmcctx.moveTo(((poly[0][1]*vehicle.cos) +(poly[0][0]*vehicle.sin))*zoom+zoom*0.17,((poly[0][1]*vehicle.sin)+(poly[0][0]*-vehicle.cos))*zoom+zoom*0.17);

    for (let _ = 1; _ < poly.length; _+=1) {

            pmcctx.lineTo(((poly[_][1]*vehicle.cos) +(poly[_][0]*vehicle.sin))*zoom+zoom*0.17,((poly[_][1]*vehicle.sin)+(poly[_][0]*-vehicle.cos))*zoom+zoom*0.17);


    }
    pmcctx.lineTo(((poly[0][1]*vehicle.cos) +(poly[0][0]*vehicle.sin))*zoom+zoom*0.17,((poly[0][1]*vehicle.sin)+(poly[0][0]*-vehicle.cos))*zoom+zoom*0.17);
    pmcctx.closePath();
    pmcctx.lineWidth= 1;
    pmcctx.fill();
    pmcctx.stroke();
}


//function DrawNickname(name, hp, hpmax,x,y,z=0){
//
//    if (cameraMode) return
//    var p = NoTeamTag(PlayerName)
//    if (PlayerTags.get(p) == PlayerTags.get(name) && PlayerTags.get(p) != null){
//        ctx.fillStyle = 'rgba(0,0,255,0.75)';
//    }else{
//        if (z == 1 && Z != 1) return
//        ctx.fillStyle = 'rgba(255,0,0,0.75)';
//    }
//
//    ctx.strokeStyle = 'rgba(0,0,0,0.5)'
//    ctx.lineWidth = 1
//    ctx.textAlign = 'center'
//    ctx.font = Math.round(20/320*Zoom)+"px Arial";
//    if (PlayerTags.get(name) != null){
//        ctx.fillText("["+PlayerTags.get(name)+"]"+name, x, y-50/320*Zoom);
//    }else{
//        ctx.fillText(name, x, y-50/320*Zoom);
//    }
//
//    ctx.fillStyle = 'rgba('+255*(1-(hp/hpmax))+','+255*(hp/hpmax)+',0,0.75)'
//    ctx.fillRect(x-37/320*Zoom,y-45/320*Zoom,75*(hp/hpmax)/320*Zoom,7/320*Zoom) //50*Number(larr[4])
//    ctx.strokeRect(x-37/320*Zoom,y-45/320*Zoom,75/320*Zoom,7/320*Zoom)
//}

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
        let xy = vehicle.local_xy_to_global([wtrprtx,wtrprty])
        WtrParticles0.push(new WtrPrt0(xy[0],xy[1]));
    }
}


    function global_xy_to_screen(xy){
        return [(xy[0]+(-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom+GameW/2 + OffsetX,(xy[1]+(-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom+GameH/2 + OffsetY]
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

    local_xy_to_global(xy){
        return [(this.new_x+(this.new_x-this.x)*(Date.now() - LastPING) / PING) + (xy[1]*this.cos)+(xy[0]*this.sin) ,(this.new_y+(this.new_y-this.y)*(Date.now() - LastPING) / PING) +(xy[1]*this.sin)+(xy[0]*-this.cos)]
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

    draw_player_indicators(layer){
        this.calculate_sin_cos()
        this.modules.forEach(module => {

            module.draw_player_indicator(layer,this)
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


let last_indicator_id = 0

class Indicator{
    constructor(image,indicators_container=indicators){
        this.image = image
        this.id = last_indicator_id
        this.indicators = indicators_container
        last_indicator_id += 1
    }
}

class TwoImagesIndicator extends Indicator{

    update(module,icon_src,classes_image="",is_visible=true){
    //animation-repair
        let indicator = document.getElementById('indicator'+this.id)
        if (indicator == undefined){
            this.indicators.innerHTML += '<div class="indicator" id="indicator'+this.id+'"><img src="'+this.image+'" alt="ico" class="'+classes_image+'"><img id="icon'+this.id+'" src="'+icon_src+'" alt="ico"></div>'
            //indicators.innerHTML += '<div class="indicator" id="indicator'+this.id+'"><img src="'+this.image+'" alt="ico"></div>'
            indicator = document.getElementById('indicator'+this.id)
        }
        indicator.style.background = getIndicatorBGForIndicationChar(module.indication_char)
        let icon = document.getElementById('icon'+this.id)
        icon.src = icon_src
        if (is_visible){
            indicator.style.display = ''
        }else{
            indicator.style.display = 'none'
        }

    }

}

class SimpleIndicator extends Indicator{

    update(module){
        let indicator = document.getElementById('indicator'+this.id)
        if (indicator == undefined){
            this.indicators.innerHTML += '<div class="indicator" id="indicator'+this.id+'"><img src="'+this.image+'" alt="ico"></div>'
            indicator = document.getElementById('indicator'+this.id)
        }
        indicator.style.background = getIndicatorBGForIndicationChar(module.indication_char)
    }

}

class ValueIndicator extends Indicator{

    update(module,value){
        let indicator = document.getElementById('indicator'+this.id)
        if (indicator == undefined){
            this.indicators.innerHTML += '<div class="indicator" id="indicator'+this.id+'"><img src="'+this.image+'" alt="ico"><div class="ceil" id="value'+this.id+'"></div></div>'
            indicator = document.getElementById('indicator'+this.id)
        }
        indicator.style.background = getIndicatorBGForIndicationChar(module.indication_char)
        if (module.indication_char == '4' || module.indication_char == '3'){
            document.getElementById('value'+this.id).style.color = '#000'
        }else{
            document.getElementById('value'+this.id).style.color = ''
        }
        document.getElementById('value'+this.id).innerHTML = value
    }

}

class AmountIndicator extends Indicator{

    update(module,amount,max_amount){
        let indicator = document.getElementById('indicator'+this.id)
        if (indicator == undefined){
            this.indicators.innerHTML += '<div class="indicator" id="indicator'+this.id+'"><img src="'+this.image+'" alt="ico"><div class="ceil"><div style="font-size:18px" id="amount'+this.id+'"></div><div style="font-size:12px; color:rgba(255,255,255,0.5)" id="max'+this.id+'"></div></div></div>'
            indicator = document.getElementById('indicator'+this.id)
        }
        indicator.style.background = getIndicatorBGForIndicationChar(module.indication_char)
        if (module.indication_char == '4' || module.indication_char == '3'){
            document.getElementById('amount'+this.id).style.color = '#000'
            document.getElementById('max'+this.id).style.color = '#000'
        }else{
            document.getElementById('amount'+this.id).style.color = ''
            document.getElementById('max'+this.id).style.color = ''
        }
        document.getElementById('amount'+this.id).innerHTML = amount
        document.getElementById('max'+this.id).innerHTML = max_amount
    }
}

class Module{
    image = ''
    constructor(){
    }

    updatep(string){
        return string
    }

    updatee(string){
        return string
    }

    drawp(layer, vehicle){

    }

    drawe(layer, vehicle){}

    draw_player_indicator(layer, vehicle){}

    draw_indicator(layer,vehicle){}
}

class MockModule extends Module{
    constructor(){
        super()
    }
}

class RepairKit extends Module{
    image = 'static/indication/repair_animation.svg'
    constructor(vehicle){
        super()
        this.indicator = new TwoImagesIndicator(this.image,upperIndicators)
        this.indication_char = '0'
        this.vehicle = vehicle
    }
    updatep(string){
        let sublist = string.split(',',1)
//        console.log(sublist[0])
//        console.log(this.vehicle.modules)
//        console.log(this.vehicle.modules[Number(sublist[0])])

        if (sublist[0]==''){
            this.indicator.update(this,'','animation-repair',false)

        }else if (sublist[0]=='-'){
            this.indicator.update(this,'static/indication/armor_icon.svg','animation-repair',true)
        }
        else{
            this.indicator.update(this,this.vehicle.modules[Number(sublist[0])].image,'animation-repair',true)
        }

        string = string.slice(sublist[0].length + 1)
        return string
    }
}

class OverloadIndication extends Module{
image='static/indication/mass_icon.svg'
    constructor(poly){
        super()
        this.indicator = new ValueIndicator(this.image)
        this.indication_char = '0'
    }

    updatep(string){
        let sublist = string.split(',',1)
        this.indication_char = sublist[0].charAt(0)
        this.indicator.update(this,Number(sublist[0].slice(1)))

        string = string.slice(sublist[0].length + 1)
        return string
    }

}

class ArmorIndication extends Module{
    constructor(poly){
        super()
        this.poly = poly
        this.armor_modules = []
        for (let _=0; _ < poly.length; _++){
            let ln = Math.sqrt((poly[(_ + 1)%poly.length][0]-poly[_][0])*(poly[(_ + 1)%poly.length][0]-poly[_][0])+(poly[(_ + 1)%poly.length][1]-poly[_][1])*(poly[(_ + 1)%poly.length][1]-poly[_][1]))
            let cnt = Math.floor(ln / 0.01)
//            console.log(ln, cnt)
            for (let i=0; i < cnt; i++){
                this.armor_modules.push(0)
            }
        }
    }

    updatep(string){
        let sublist = string.split(',',1)
        let str = BigInt(sublist[0]).toString(2)
//        console.log(str)
        while (str.length < this.armor_modules.length){
            str = '0'+str
        }
        for (let i = 0; i < str.length; i++) {
          this.armor_modules[i] = Number(str.charAt(i));
        }
//        console.log(this.armor_modules)
        string = string.slice(sublist[0].length + 1)
        return string
    }

    updatee(string){
        return this.updatep(string)
    }
    draw_player_indicator(layer,vehicle){
        pmcctx.strokeStyle = "#f00"
        ctx.lineCap = 'butt';
        pmcctx.beginPath();
        let poly = this.poly
        let zoom = 480
        let ind = 0
        for (let _=0; _ < poly.length; _++){
            let ln = Math.sqrt((poly[(_ + 1)%poly.length][0]-poly[_][0])*(poly[(_ + 1)%poly.length][0]-poly[_][0])+(poly[(_ + 1)%poly.length][1]-poly[_][1])*(poly[(_ + 1)%poly.length][1]-poly[_][1]))
            let cnt = Math.floor(ln / 0.01)
//            console.log(ln, cnt)
            for (let i=0; i < cnt; i++){
                if (this.armor_modules[ind]!=0){
                    let x = poly[_][0] + (poly[(_ + 1)%poly.length][0]-poly[_][0]) * i/cnt
                    let y = poly[_][1] + (poly[(_ + 1)%poly.length][1]-poly[_][1]) * i/cnt
                    let x1 = poly[_][0] + (poly[(_ + 1)%poly.length][0]-poly[_][0]) * (i+1)/cnt
                    let y1 = poly[_][1] + (poly[(_ + 1)%poly.length][1]-poly[_][1]) * (i+1)/cnt
                    pmcctx.moveTo(((y*vehicle.cos) +(x*vehicle.sin))*zoom+zoom*0.17,((y*vehicle.sin)+(x*-vehicle.cos))*zoom+zoom*0.17);
                    pmcctx.lineTo(((y1*vehicle.cos) +(x1*vehicle.sin))*zoom+zoom*0.17,((y1*vehicle.sin)+(x1*-vehicle.cos))*zoom+zoom*0.17);
                }
                ind ++
            }
        }

        pmcctx.closePath();
        pmcctx.lineWidth= 4;
        pmcctx.stroke();
    }
    drawp(layer,vehicle){
        if (layer != "OnWater+1") return
        ctx.strokeStyle = "#000"
        ctx.lineCap = 'round';
        ctx.beginPath();
        let poly = this.poly
        let ind = 0
        for (let _=0; _ < poly.length; _++){
            let ln = Math.sqrt((poly[(_ + 1)%poly.length][0]-poly[_][0])*(poly[(_ + 1)%poly.length][0]-poly[_][0])+(poly[(_ + 1)%poly.length][1]-poly[_][1])*(poly[(_ + 1)%poly.length][1]-poly[_][1]))
            let cnt = Math.floor(ln / 0.01)
//            console.log(ln, cnt)
            for (let i=0; i < cnt; i++){
                if (this.armor_modules[ind]!=0){
                    let x = poly[_][0] + (poly[(_ + 1)%poly.length][0]-poly[_][0]) * i/cnt
                    let y = poly[_][1] + (poly[(_ + 1)%poly.length][1]-poly[_][1]) * i/cnt
                    let x1 = poly[_][0] + (poly[(_ + 1)%poly.length][0]-poly[_][0]) * (i+1)/cnt
                    let y1 = poly[_][1] + (poly[(_ + 1)%poly.length][1]-poly[_][1]) * (i+1)/cnt
                    let p = global_xy_to_screen(vehicle.local_xy_to_global([x,y]))
                    let p1 = global_xy_to_screen(vehicle.local_xy_to_global([x1,y1]))
                    ctx.moveTo(p[0],p[1]);
                    ctx.lineTo(p1[0],p1[1]);
                }
                ind ++
            }
        }

        ctx.closePath();
        ctx.lineWidth= 2/320*Zoom;
        ctx.stroke();
    }
    drawe(layer,vehicle){
        this.drawp(layer,vehicle)
    }
}

class RealModule extends Module{
    bang_prt_amount = 5
    snd_bang = 'bang'
    indication_layer = 'DEFAULT'
    constructor(){
        super()
        this.indication_char = '0'
        this.prev_indication_char = '0'
    }

    get_random_point(){
        return [0,0]
    }

    draw_indicator(){}

    draw_player_indicator(){}

    explode(vehicle){

        let cos = vehicle.cos
        let sin = vehicle.sin
        let bangPrts = vehicle.bang_particles_list
        let bangPrt = vehicle.bang_particle
        PIXI.sound.play(this.snd_bang);
        for (let _ = 0; _ < this.bang_prt_amount; _++) {
            let xy = vehicle.local_xy_to_global(this.get_random_point())
            bangPrts.push(new bangPrt(xy[0],xy[1]))
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
        if (layer != this.indication_layer) return
        drawPolygonModuleIndicator(layer,vehicle,this.poly,this.indication_char)
    }

    draw_player_indicator(layer, vehicle){
        if (layer != this.indication_layer) return
        drawPlayerPolygonModuleIndicator(layer,vehicle,this.poly,this.indication_char)

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
    if (layer != this.indication_layer) return
        drawCircularModuleIndicator(layer,vehicle,this.x,this.y,this.r,this.indication_char)
    }
    draw_player_indicator(layer, vehicle){
    if (layer != this.indication_layer) return
        drawPlayerCircularModuleIndicator(layer,vehicle,this.x,this.y,this.r,this.indication_char)

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
        super(x,y,r)
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

