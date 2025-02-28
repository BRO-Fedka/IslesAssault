PACK_ID = null
function drawCannon(vehicle,cannon, fire=false){
    let turcrd = [cannon.x, cannon.y]
    let cos = vehicle.cos
    let sin = vehicle.sin
    let l = cannon.l
    let r = cannon.cannon_r
    let lw = cannon.len_width
    let fill = cannon.fill
    let strokeW = cannon.stroke_width
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

    if(fire && (!(vehicle.first_appearance))){
        // console.log(vehicle.first_appearance,(!(vehicle.first_appearance)))
        xy = vehicle.local_xy_to_global(turcrd)
        for (let _ = 0; _ < 5; _++) {
            // canbangPrts.push(new canbangPrt(xy[0] + cosc*l/320,xy[1] + sinc*l/320))
            new ShotSmokeParticle(xy[0] + cosc*l/320,xy[1] + sinc*l/320)
            // console.log('!')
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
    let zoom = vehicle.zoom
    setIndicatorStyles(char,layer,pmcctx)
    pmcctx.lineWidth= 1;
    pmcctx.lineJoin = 'miter';
    pmcctx.beginPath()
    pmcctx.arc(((y*vehicle.cos) +(x*vehicle.sin))*zoom+80,((y*vehicle.sin)+(x*-vehicle.cos))*zoom+80,r*zoom,0, Math.PI * 2);

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
        case '4':
            context.strokeStyle = '#f00'
            context.fillStyle = 'rgba(0,0,0,0)'
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
    let zoom = vehicle.zoom
    pmcctx.moveTo(((poly[0][1]*vehicle.cos) +(poly[0][0]*vehicle.sin))*zoom+80,((poly[0][1]*vehicle.sin)+(poly[0][0]*-vehicle.cos))*zoom+80);

    for (let _ = 1; _ < poly.length; _+=1) {

            pmcctx.lineTo(((poly[_][1]*vehicle.cos) +(poly[_][0]*vehicle.sin))*zoom+80,((poly[_][1]*vehicle.sin)+(poly[_][0]*-vehicle.cos))*zoom+80);


    }
    pmcctx.lineTo(((poly[0][1]*vehicle.cos) +(poly[0][0]*vehicle.sin))*zoom+80,((poly[0][1]*vehicle.sin)+(poly[0][0]*-vehicle.cos))*zoom+80);
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


function global_x_to_screen(x){
    return (x+(-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom+GameW/2 + OffsetX
}

function global_y_to_screen(y){
    return (y+(-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom+GameH/2 + OffsetY
}

function global_xy_to_screen(xy){
    return [global_x_to_screen(xy[0]),global_y_to_screen(xy[1])]
}

// InputKeys ======================================

class InputKey{
    constructor(id,name,def_char,icon_link){
        this.id = id
        this.name = name
        this.def_char = def_char
        this.is_pressed = false
        this.was_pressed = false
        this.cur_char = def_char
        this.icon_link = icon_link

    }
    update(){
        if (localStorage.hasOwnProperty(PACK_ID+"k"+this.id)){
            this.cur_char = Number(localStorage.getItem(PACK_ID+"k"+this.id))
        }
        
        this.is_pressed = false
    }
}
let IK = {
    REPAIR : new InputKey(5,"Repair",70,'static/indication/repair_animation.svg')
}


//  BASE    =======================================

class Vehicle{
    type_id = 0
    f = {}
    zoom = 480

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
        this.first_appearance = true
        this.input_keys = null
        
    }

    init_inputs(){
        let modules = new Set() 
        this.modules.forEach(module => {
            module.input_keys.forEach(input_key => {
                modules.add(input_key)
            });
        });
        this.input_keys = Array.from(modules)
        console.log(this.input_keys)
        this.input_keys = this.input_keys.sort((m0, m1) => m0.id > m1.id ? 1: -1)
        this.input_keys.forEach(ik => {
            ik.update()
        });
        console.log(this.input_keys)
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
        for (let arg = 0; arg < 7; arg++) {
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
        this.z = Number(lst[6])

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
    input_keys = []
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
    input_keys = [IK.LAUNCH_TORPEDO]
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
        let zoom = vehicle.zoom
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
                    pmcctx.moveTo(((y*vehicle.cos) +(x*vehicle.sin))*zoom+80,((y*vehicle.sin)+(x*-vehicle.cos))*zoom+80);
                    pmcctx.lineTo(((y1*vehicle.cos) +(x1*vehicle.sin))*zoom+80,((y1*vehicle.sin)+(x1*-vehicle.cos))*zoom+80);
                }
                ind ++
            }
        }

        pmcctx.closePath();
        pmcctx.lineWidth= 4;
        pmcctx.stroke();
    }
    drawp(layer,vehicle){
        if (!(layer.includes("+1"))) return
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
    input_keys = [IK.REPAIR]
    bang_prt_amount = 5
    indication_layer = 'DEFAULT'
    bang_particle_class = Bang
    underwater_bang_particle_class = WaterBang
    bang_freq = 5
    constructor(){
        super()
        this.indication_char = '0'
        this.prev_indication_char = '0'
        this.bang_spawner = null
    }

    get_random_point(){
        return [0,0]
    }

    draw_indicator(){}

    draw_player_indicator(){}

    explode(vehicle){
        //console.log(vehicle.first_appearance)
        if ((vehicle.first_appearance)){
            return
        }
        this.bang_spawner.spawn(this.bang_prt_amount)
        if (vehicle.z == -1){
            this.bang_spawner.particle = this.underwater_bang_particle_class
        }else{
            this.bang_spawner.particle = this.bang_particle_class
        }

    }

    emit_fire(){}

    drawp(layer,vehicle){
        this.bang_spawner.update(vehicle)
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
        this.bang_spawner.update(vehicle)
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
        this.bang_spawner = new ModuleParticleSpawner(this,this.bang_particle_class, this.bang_freq)
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
        this.bang_spawner = new ModuleParticleSpawner(this,this.bang_particle_class, this.bang_freq)

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
    cannon_r = 12
    l = 18
    len_width = [8,5]
    fill = true
    stroke_width = 2
    canbang_prt_amount = 5
    underbody = false
    snd_shoot = 'mcanon'
    image='static/indication/mortar_turret_direct_icon.svg'
    constructor(x,y,r){
        super(x,y,r)
        this.indicator = new SimpleIndicator(this.image)
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
    updatep(string){
        string = super.updatep(string)
        let sublist = string.split(',',2)
        string = string.slice(sublist[0].length + 1)
        this.prev_status = this.status
        this.status = Number(sublist[0][0])
        this.prev_dir = this.dir
        this.dir = Number(sublist[0].slice(1))
        this.indicator.update(this)
        return string
    }
    updatee(string){
        string = super.updatep(string)
        let sublist = string.split(',',1)
        string = string.slice(sublist[0].length + 1)
        this.prev_status = this.status
        this.status = Number(sublist[0][0])
        this.prev_dir = this.dir
        this.dir = Number(sublist[0].slice(1))
        return string
    }
}


class Entity{

    constructor(larr){
        this.id = larr[2]
        this.is_active = true
    }

    update(larr){

    }

    delete(larr){

    }

    draw(layer){

    }
}

class Projectile extends Entity{
    grad_color_0 ="#FFFF4488"
    grad_color_1 ="#FFFF4400"
    tail_length = 0.3
    constructor(larr){
        super(larr)
        this.x = Number(larr[4])
        this.y = Number(larr[5])
        this.start_x = Number(larr[4])
        this.start_y = Number(larr[5])
        this.dir = Number(larr[6])
        this.status = Number(larr[7])
        this.speed = Number(larr[8])
        this.width = Number(larr[9])
        this.start_time = Date.now()
        this.distance = 0

    }

    delete(larr){
        this.status = Number(larr[4])
        this.is_active = false
    }

    draw(layer=false){
        if (layer != false && layer != 'OnWater+3') return 
        let grad=ctx.createLinearGradient(GameW/2 + OffsetX - (X - this.x + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - this.y + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom,GameW/2 + OffsetX - (X - this.x+Math.cos(this.dir/180*Math.PI)*this.distance + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - this.y+Math.sin(this.dir/180*Math.PI)*this.distance + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);

        grad.addColorStop(1,this.grad_color_1);
        grad.addColorStop(0,this.grad_color_0);
        
        ctx.strokeStyle = grad
        ctx.lineWidth= this.width/320*Zoom;
        ctx.beginPath()
        ctx.lineCap='round';
        ctx.moveTo(GameW/2 + OffsetX - (X - this.x + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - this.y + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
        ctx.lineTo(GameW/2 + OffsetX - (X - this.x+Math.cos(this.dir/180*Math.PI)*this.distance + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - this.y+Math.sin(this.dir/180*Math.PI)*this.distance + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
        ctx.stroke();
        ctx.closePath()
        this.x = this.start_x+Math.cos(this.dir/180*Math.PI)*this.speed*((Date.now()-this.start_time)/1000)
        this.y = this.start_y+Math.sin(this.dir/180*Math.PI)*this.speed*((Date.now()-this.start_time)/1000)
        if (((Date.now()-this.start_time)/1000-1/15) > 0){
            this.distance = this.speed*((Date.now()-this.start_time)/1000-2/15)
            if (this.distance > this.tail_length){this.distance = this.tail_length}
        }else{
            this.distance = 0
        }
        if (this.x > 20 || this.x < -4 || this.y > 20 || this.y < -4){
            this.is_active = false
        }
    }
}

class Shell extends Projectile{

    draw(layer){
    if (layer != 'S') return 
    if(this.status == 1 ){
        if (Math.random() < 1){
            PIXI.sound.play('dmg'+Math.floor(Math.random()*4));
        }
        this.status=0
    }else if(this.status == 3){
        if (Math.random() < 1){
                PIXI.sound.play('Sdmg'+Math.floor(Math.random()*2));
        }
        this.status=0
    }


    super.draw()
    }

}
class Torpedo extends Projectile{
    grad_color_0 ="#FFFFFF88"
    grad_color_1 ="#FFFFFF00"
    tail_length = 0.15
    draw(layer){
        if (layer != 'OnWater-2') return 
        if(this.status == 1){
			this.status=0
            WaterBang.spawn(5,this.x, this.y)
			// for (let i = 0; i < 5; i++) {
            //    new  WaterBang(this.x, this.y)
            //     // WtrBangParticles0.push(new BangPrt0(this.x, this.y))
            // }
			ShakeXbnds += 10
			ShakeYbnds += 10
		}else if(this.status == 2){
            PIXI.sound.play('lnchTrpd');
            this.status = 0
		}
		if (Math.random() < 0.15){
            new WaterTraceParticle(this.x, this.y)
		        // WtrParticles0.push(new WtrPrt0(this.x, this.y));
		}


    super.draw()
    }

}
// function Particle3(id) {
//     this.id =id;
//     this.hp = 500+Math.random()*500
//     this.cl = Math.random()*64+191;
// 	this.h= Math.random();
//     this.spd = Math.random()*2 -1;
//     this.dir = (Math.random()*2-1)*Math.PI;
//     this.spd = Math.random()*2 -1;
// }
class Smoke extends Entity{

    constructor(larr){
        super(larr)
        this.x = Number(larr[4])
        this.y = Number(larr[5])
        this.start_time = Date.now()


    }

    delete(larr){
        this.status = Number(larr[4])
        this.is_active = false
    }

    draw(layer=false){
        if (layer != false && layer != 'OnWater+3') return 
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.beginPath()
        let x = (Date.now() - this.start_time) / 100
        let y = (Math.sqrt(x)-(Math.sqrt(x)-17.3)*Math.sqrt(x)*0.3)*0.01
        if (y <= 0 || (Date.now() - this.start_time)/1000>33) {
            this.is_active = false
            return  
        }
        ctx.arc(OffsetX+(this.x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2,OffsetY+GameH/2+(this.y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom, y*Zoom, 0, Math.PI * 2);
        ctx.closePath()
        ctx.fill();

        if(Math.random() < 0.01 ){
            new SmokeParticle(this.x,this.y,this.start_time)
        }

    }
}

class Particle{
    layer = ""
    calc_x(){
        return OffsetX+(this.x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2
    }
    calc_y(){
        return OffsetY+GameH/2+(this.y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom
    }
    constructor(layer,x,y){
        this.is_active = true
        this.layer = layer
        this.x = x
        this.y = y
        if (Particles.has(this.layer)){
            Particles.get(this.layer).push(this)
        }else{
            Particles.set(this.layer,[this])
        }

        

        
    }
    static spawn(amount,...args){
        for (let _ = 0; _ < amount; _++) {
            new this(...args)
        }
    }
}

class ShotSmokeParticle extends Particle{
    constructor(x,y,dir = Math.random()*2*Math.PI){

        super("S",x,y)
        this.life=1;
        this.xs = Math.cos(dir);
        this.ys = Math.sin(dir);
        this.rad = 1;

    }
    draw(){
	    ctx.fillStyle = "rgba(192,192,192,"+(this.life**1.5)*1+")";
		ctx.beginPath();
		ctx.arc(this.calc_x(),this.calc_y(),this.rad/320*Zoom,0,2*Math.PI);
		ctx.closePath();
		this.x += this.xs/10*this.life/320
		this.y += this.ys/10*this.life/320
		this.rad+=0.1*this.life/320*Zoom
		ctx.fill();
		this.life *= 0.99
		if (this.life < 0.001) {
			this.is_active = false
		}
    }

}

class WaterTraceParticle extends Particle{
    constructor(x,y){
        if (ParticlesProcessing==false){
            this.is_active = false
            return
        }
        super("OnWater-2",x,y)
        this.life=1
        this.rad = 1// Math.random()+1

    }
    draw(){
		ctx.fillStyle = "rgba(255,255,255,"+(this.life**1.5)*0.25+")";
		ctx.beginPath();
		ctx.arc(this.calc_x(),this.calc_y(),((this.rad-(this.life*this.rad))/320*Zoom*7.5+2.5)/320*Zoom,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
//		console.log(OffsetX+(WtrParticles0[i].x-(X+(nX-X)*((Date.now()-LastPING)/PING)))*Zoom+GameW/2,OffsetY+GameH/2+(WtrParticles0[i].y-(Y+(nY-Y)*((Date.now()-LastPING)/PING)))*Zoom)
        this.life *= 0.99
		if (this.life < 0.15) {
			this.is_active = false
		}
    }

}


class BangProto extends Particle{
    _color0=''
    _color1=''
    constructor(x,y,dir = Math.random()*2*Math.PI){

        super("S",x,y)
        this.life=1;
        this.xs = Math.cos(dir);
        this.ys = Math.sin(dir);
        this.rad = 1;
        this.dir = dir

    }
    draw(){
	    ctx.fillStyle = "rgba(" +this._color0+","+(this.life**0.33)*1+")";

		ctx.beginPath();
		ctx.arc(this.calc_x(),this.calc_y(),this.rad/320*Zoom,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "rgba(" +this._color1+","+(this.life**1)*1+")";
		ctx.beginPath();
		ctx.arc(this.calc_x()+Math.cos(this.dir+this.life*Math.PI*5)*this.rad*0.2,this.calc_y()+Math.sin(this.dir+this.life*Math.PI*5)*this.rad*0.2,this.rad*0.8/320*Zoom,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
        this.dir += this.life*0.25
		this.x += this.xs/Zoom/4*this.life/320*Zoom
		this.y += this.ys/Zoom/4*this.life/320*Zoom
		this.rad+=0.75*this.life**1.25

		this.life *= 0.98
		if (this.life < 0.0001) {
			this.is_active = false
		}
    }

}

class WaterBang extends BangProto{
    _color0='255,255,255'
    _color1='0,160,255'
    constructor(x,y){
        super(x,y)
        PIXI.sound.play('wtrBang');
    }
}

class Bang extends BangProto{
    constructor(x,y){
        super(x,y)
        PIXI.sound.play('bang');
    }
    _color0='0,0,0'
    _color1='255,160,0'
}

class SmokeParticle extends Particle{
    constructor(x,y, start_time,dir = Math.random()*2*Math.PI){

        super("S",x,y)
        this.hp = 500+Math.random()*500
        this.cl = Math.random()*64+191;
        this.h= Math.random();
        this.spd = Math.random()*2 -1;
        this.dir = dir
        this.maxhp = this.hp
        this.start_time = start_time

    }

    draw(){
        let x = (Date.now() - this.start_time) / 100
        let y = (Math.sqrt(x)-(Math.sqrt(x)-17.3)*Math.sqrt(x)*0.3)*0.01
        this.hp-=1
        if (y <= 0) {
            this.is_active = false
            return  
        }
        this.dir+=this.spd*0.025
        if (this.hp < 0 ) {
            this.is_active = false
        }
        ctx.fillStyle = "rgba("+this.cl +','+this.cl+',' +this.cl +',' +this.hp/this.maxhp+ ")";
        ctx.beginPath();
        ctx.arc(Math.cos(this.dir)*this.h*y*0.2*Zoom+this.calc_x() ,Math.sin(this.dir)*Zoom*this.h*y*0.2+this.calc_y(), y*Zoom,0,2*Math.PI);
        ctx.closePath()
        ctx.fill()
                if (y <= 0 || (Date.now() - this.start_time)/1000>33) {
            this.is_active = false
            return  
        }

    }
}

class ModuleParticleSpawner{
    constructor(module,particle,rate=10){
        this.particles_to_draw = 0
        this.is_active = false
        this.rate = rate
        this.particle = particle
        this.last_particle_time = Date.now()
        this.params = []
        this.module = module
    }

    update(vehicle){
        if (this.rate == 0) return
        if (this.particles_to_draw > 0 || this.is_active){
            let delta = (Date.now()- this.last_particle_time)/1000
            if (delta > 1) delta = 1
            let amnt = delta*this.rate
            amnt = Math.floor(amnt)
            if (amnt>5) amnt = 5
            // console.log((Date.now()- this.last_particle_time)/1000)
            if (amnt>this.particles_to_draw && this.particles_to_draw>0){
                amnt = this.particles_to_draw 
            }
            this.spawn_particles(amnt,vehicle)

            this.particles_to_draw -= amnt
            if (amnt >0 ) this.last_particle_time = Date.now()
            
        } 
        
    }

    set_exstra_params(...args){
        this.params = args
    }

    spawn(amount){
        this.particles_to_draw = amount
        this.last_particle_time = Date.now()
    }

    set_activation_to(val){

        this.is_active = val 
        this.last_particle_time = Date.now()

    }

    spawn_particles(amnt,vehicle){
        for (let _ = 0; _ < amnt; _++) {
            new this.particle(...vehicle.local_xy_to_global([this.module.x,this.module.y]),...this.params)
            
        }
        
    }
}
class PolyStrokeModuleParticleSpawner extends ModuleParticleSpawner{
    max_dst = 1.5
    spawn_particles(amnt,vehicle){
        for (let _ = 0; _ < amnt; _++) {
            let maxdst =  1.5;
            let polydsttoprt = Math.random()*maxdst
            let _ = 0
            let poly = this.module.poly
            while (Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)< polydsttoprt){
                polydsttoprt-=Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2);
                _+=1;
            }
            let wtrptrcof = polydsttoprt/Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)
            let wtrprtx = poly[_%poly.length][0] +(poly[(_+1)%poly.length][0]-poly[_%poly.length][0])*wtrptrcof
            let wtrprty = poly[_%poly.length][1] +(poly[(_+1)%poly.length][1]-poly[_%poly.length][1])*wtrptrcof
            let xy = vehicle.local_xy_to_global([wtrprtx,wtrprty])
            new this.particle(xy[0],xy[1],...this.params)
        }
    }
}

class Strucure{
constructor(layer){
    this.layer = layer
    if (Strucures.has(this.layer)){
        Strucures.get(this.layer).push(this)
    }else{
        Strucures.set(this.layer,[this])
    }

}

update(args){

}

draw(){

}

}

class PolyStructure extends Strucure{
    constructor(layer,poly){
        super(layer)
        this.poly = poly
    }

    draw(){
        ctx.beginPath();
        for (let l = 0; l < this.poly.length; l += 1) {
            if (l == 0) {
                ctx.moveTo(...global_xy_to_screen(this.poly[l]));
            } else {
                ctx.lineTo(...global_xy_to_screen(this.poly[l]));
            }
        }
        ctx.closePath();
    }
}

class ShoreLine0 extends PolyStructure{

    constructor(poly,width=0.5){
        super('SH0',poly)
        this.width = width
    }

    draw(){
        ctx.strokeStyle = MAPstatic.CT.zs;
        ctx.lineJoin = 'bevel';
        ctx.lineWidth = this.width*Zoom;
        super.draw()
        ctx.stroke();

    }
}
class ShoreLine1 extends PolyStructure{

    constructor(poly,width=0.25){
        super('SH1',poly)
        this.width = width
    }

    draw(){
        ctx.strokeStyle = MAPstatic.CT.zf;
        ctx.lineJoin = 'bevel';
        ctx.lineWidth = this.width*Zoom;
        super.draw()
        ctx.stroke();

    }
}

class Waves extends PolyStructure{

    constructor(poly,widthcof=1){
        super('W',poly)
        this.widthcof = widthcof
    }

    draw(){
        ctx.strokeStyle = MAPstatic.CT.bs;
        ctx.lineWidth = ((Math.sin(timenow/50/180*Math.PI)+1)*7+3)/320*Zoom*this.widthcof;
        ctx.lineJoin = 'bevel';
        super.draw()
        ctx.stroke();
    }
}

class Beach extends PolyStructure{
    constructor(poly){
        super('B',poly)
        new ShoreLine0(poly)
        new ShoreLine1(poly)
        new Waves(poly)
    }

    draw(){
        ctx.fillStyle = MAPstatic.CT.bf;
        super.draw()
        ctx.fill();
    }
}
class Concrete extends PolyStructure{
    constructor(poly){
        super('C',poly)
        new ShoreLine0(poly,60/320)
        new ShoreLine1(poly,30/320)
    }

    draw(){
        ctx.fillStyle = MAPstatic.CT.cf;
        ctx.strokeStyle = MAPstatic.CT.cs;
        ctx.lineWidth = 2.5/320*Zoom;
        ctx.lineJoin = 'bevel';
        super.draw()
        ctx.fill();
        ctx.stroke();
    }
}
class Stone extends PolyStructure{
    constructor(poly){
        super('S',poly)
        new ShoreLine0(poly,80/320)
        new ShoreLine1(poly,40/320)
    }

    draw(){
        ctx.fillStyle = MAPstatic.CT.sf;
        ctx.strokeStyle = MAPstatic.CT.ss;
        ctx.lineWidth = 5/320*Zoom;
        ctx.lineJoin = 'bevel';
        super.draw()
        ctx.fill();
        ctx.stroke();
    }
}

class Soil extends PolyStructure{

    constructor(poly){
        super('g',poly)
    }

    draw(){
        ctx.strokeStyle = MAPstatic.CT.gs;
        ctx.lineJoin = 'bevel';
        ctx.lineWidth = 20/320*Zoom;
        super.draw()
        ctx.stroke();

    }
}

class Grass extends PolyStructure{
    constructor(poly){
        super('G',poly)
        new Soil(poly)
    }

    draw(){
        ctx.fillStyle = MAPstatic.CT.gf;
        super.draw()
        ctx.fill();
    }
}

class LineStructure extends Strucure{
    constructor(layer,coords){
        super(layer)
        this.p0 = [coords[0],coords[1]]
        this.p1 = [coords[2],coords[3]]
        
    }
    draw(){
        ctx.beginPath()
        ctx.moveTo(...global_xy_to_screen(this.p0));
        ctx.lineTo(...global_xy_to_screen(this.p1));
        ctx.closePath()
    }
}

class BridgeShadow0 extends LineStructure{
    constructor(coords){
        super('_0',coords)
    }
    draw(){
        if (Z > 0) return
        ctx.lineCap = 'square';
        ctx.lineJoin = 'miter';
        super.draw()
        ctx.strokeStyle = MAPstatic.CT.b2

        ctx.lineWidth = 60/320*Zoom;
        ctx.stroke();
    }
}
class BridgeShadow1 extends LineStructure{
    constructor(coords){
        super('_1',coords)
    }
    draw(){
        if (Z == 0) return
        ctx.lineCap = 'square';
        ctx.lineJoin = 'miter';
        super.draw()
        ctx.strokeStyle = MAPstatic.CT.b2

        ctx.lineWidth = 70/320*Zoom;
        ctx.stroke();
    }
}
class BridgeBase extends LineStructure{
    constructor(coords){
        super('_2',coords)
    }
    draw(){
        if (Z > 0) return
        ctx.lineJoin = 'miter';
        let len = 0.1/Math.sqrt( (this.p0[0]- this.p1[0])**2+(this.p0[1]-this.p1[1])**2)
        ctx.strokeStyle = MAPstatic.CT.cs;
        ctx.lineWidth = 60/320*Zoom;
        ctx.lineCap = 'square';
        ctx.beginPath()
        // ctx.lineJoin = 'miter';
        ctx.moveTo(GameW/2 + OffsetX - (X - this.p0[0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - this.p0[1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom)
        ctx.lineTo(GameW/2 + OffsetX - (X - ( this.p0[0]+(this.p1[0]- this.p0[0])*len) + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - ( this.p0[1]+(this.p1[1]- this.p0[1])*len) + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
        ctx.closePath()
        ctx.stroke();
        ctx.beginPath()
        ctx.moveTo(GameW/2 + OffsetX - (X - this.p1[0] + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - this.p1[1] + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom)
        ctx.lineTo(GameW/2 + OffsetX - (X - ( this.p0[0]+(this.p1[0]- this.p0[0])*(1-len)) + (nX - X) * (Date.now() - LastPING) / PING)*Zoom,GameH/2 + OffsetY - (Y - ( this.p0[1]+(this.p1[1]- this.p0[1])*(1-len)) + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom);
        ctx.closePath()
        ctx.stroke();
    }
}
class Bridge extends LineStructure{
    constructor(coords){
        super('_',coords)
        ctx.lineCap = 'square';
        ctx.lineJoin = 'miter';
        new BridgeBase(coords)
        new BridgeShadow0(coords)
        new BridgeShadow1(coords)
        
    }
    draw(){
        if (Z == 0) return
        super.draw()
        ctx.lineCap = 'square';
        ctx.lineJoin = 'miter';
        ctx.strokeStyle = MAPstatic.CT.b1;
        ctx.lineWidth = 60/320*Zoom;
        ctx.stroke();
        ctx.strokeStyle = MAPstatic.CT.b0;
        ctx.lineWidth = 50/320*Zoom;
        ctx.stroke();
    }
}


class LinesStructure extends Strucure{
    constructor(layer,coords){
        super(layer)
        this.coords = coords
        
    }
    draw(){
        ctx.beginPath();
        for (let l = 0; l < this.coords.length; l += 1) {
                if (l == 0) {
                    ctx.moveTo(...global_xy_to_screen(this.coords[l]));
                } else {
                    ctx.lineTo(...global_xy_to_screen(this.coords[l]))
                }
        }
        
    }
}

class Road extends LinesStructure{
    constructor(coords){
        super('R',coords)
        new RoadDashes(coords)
    }
    draw(){
        super.draw()
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = MAPstatic.CT.cs;
        ctx.lineWidth = 40/320*Zoom;
        ctx.stroke()
        ctx.closePath();
    }
}

class RoadDashes extends LinesStructure{
    constructor(coords){
        super('r',coords)
    }
    draw(){
        super.draw()
        ctx.lineWidth = 2/320*Zoom;
        ctx.strokeStyle = MAPstatic.CT.rd;
        ctx.setLineDash([10/320*Zoom,10/320*Zoom])
        ctx.stroke()
        ctx.closePath();
        ctx.setLineDash([])
    }
}


class Tree{

    //[0, 6.67, 4.4, 2]
    constructor(id,x,y,size){
        this.id = id
        this.x = x
        this.y = y
        this.size = size
        // console.log(id,x,y,size)
        this.tree_size={
            0:0.1,
            1:0.15,
            2:0.2,
            3:0.25
        }
    }
    draw(alpha){

    }
}

class ClassicalTree extends Tree{
    draw(alpha){
        
        ctx.beginPath();
        ctx.fillStyle = MAPstatic.CT.tf+alpha;
        ctx.arc(...global_xy_to_screen([this.x,this.y]), Zoom * this.tree_size[this.size]/2,0,2*Math.PI)
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = MAPstatic.CT.tm+alpha;
        ctx.arc(global_x_to_screen(this.x) - this.tree_size[this.size]*Math.cos(this.id*24)/5*Zoom,global_y_to_screen(this.y) - this.tree_size[this.size]*Math.sin(this.id*15)/5*Zoom, Zoom * this.tree_size[this.size]/2*2/3,0,2*Math.PI)
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = MAPstatic.CT.tt+alpha;
        ctx.arc(global_x_to_screen(this.x) - this.tree_size[this.size]*Math.cos(this.id*648)/5*Zoom,global_y_to_screen(this.y) - this.tree_size[this.size]*Math.sin(this.id*541)/5*Zoom, Zoom * this.tree_size[this.size]/2*2/3,0,2*Math.PI)
        // ctx.arc(GameW/2 + OffsetX - (X - _[l][1] + (nX - X) * (Date.now() - LastPING) / PING - this.tree_size[this.size]*Math.cos(l*648)/5)*Zoom,GameH/2 + OffsetY - (Y - _[l][2] + (nY - Y) * (Date.now() - LastPING) / PING - this.tree_size[this.size]*Math.sin(l*541)/5)*Zoom, Zoom * this.tree_size[this.size]/2*2/3,0,2*Math.PI)
        ctx.fill();
        ctx.closePath();
    }
}

class FirTree extends Tree{
    draw(alpha){
        
        ctx.beginPath();
        ctx.fillStyle = MAPstatic.CT.ff+alpha;
        ctx.arc(...global_xy_to_screen([this.x,this.y]), Zoom * this.tree_size[this.size]/2,0,2*Math.PI)
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = MAPstatic.CT.fm+alpha;
        ctx.arc(global_x_to_screen(this.x) - this.tree_size[this.size]*Math.cos(this.id*24)/24*Zoom,global_y_to_screen(this.y) - this.tree_size[this.size]*Math.sin(this.id*15)/24*Zoom, Zoom * this.tree_size[this.size]/2*2/3,0,2*Math.PI)
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = MAPstatic.CT.ft+alpha;
        ctx.arc(global_x_to_screen(this.x) - this.tree_size[this.size]*Math.cos(this.id*648)/24*Zoom,global_y_to_screen(this.y) - this.tree_size[this.size]*Math.sin(this.id*541)/24*Zoom, Zoom * this.tree_size[this.size]/2/3,0,2*Math.PI)
        // ctx.arc(GameW/2 + OffsetX - (X - _[l][1] + (nX - X) * (Date.now() - LastPING) / PING - this.tree_size[this.size]*Math.cos(l*648)/5)*Zoom,GameH/2 + OffsetY - (Y - _[l][2] + (nY - Y) * (Date.now() - LastPING) / PING - this.tree_size[this.size]*Math.sin(l*541)/5)*Zoom, Zoom * this.tree_size[this.size]/2*2/3,0,2*Math.PI)
        ctx.fill();
        ctx.closePath();
    }
}

class PalmTree extends Tree{
    draw(alpha){
        ctx.beginPath();
        ctx.fillStyle = MAPstatic.CT.pf+alpha;
        ctx.arc(...global_xy_to_screen([this.x,this.y]), Zoom * this.tree_size[this.size]/2,0,2*Math.PI)
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.strokeStyle = MAPstatic.CT.pm+alpha;
        ctx.arc(global_x_to_screen(this.x) - this.tree_size[this.size]*Math.cos(this.id*24)/24*Zoom,global_y_to_screen(this.y) - this.tree_size[this.size]*Math.sin(this.id*15)/24*Zoom, Zoom * this.tree_size[this.size]/3,0,2*Math.PI)
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.strokeStyle = MAPstatic.CT.pt+alpha;
        ctx.arc(global_x_to_screen(this.x) - this.tree_size[this.size]*Math.cos(this.id*648)/24*Zoom,global_y_to_screen(this.y) - this.tree_size[this.size]*Math.sin(this.id*541)/24*Zoom, Zoom * this.tree_size[this.size]/2/3,0,2*Math.PI)
        // ctx.arc(GameW/2 + OffsetX - (X - _[l][1] + (nX - X) * (Date.now() - LastPING) / PING - this.tree_size[this.size]*Math.cos(l*648)/5)*Zoom,GameH/2 + OffsetY - (Y - _[l][2] + (nY - Y) * (Date.now() - LastPING) / PING - this.tree_size[this.size]*Math.sin(l*541)/5)*Zoom, Zoom * this.tree_size[this.size]/2*2/3,0,2*Math.PI)
        ctx.stroke();
        ctx.closePath();
    }
}


class TreeGroup extends Strucure{
    TreesTable = {
        0: ClassicalTree,
        1: FirTree,
        2: PalmTree                                                                                                                                                                                                               
    }
    constructor(trees){
        super('T')
        this.trees = []
        let i = 0
        trees.forEach(element => {
            i++
            // console.log(this.TreesTable[element[0]])
            this.trees.push(new this.TreesTable[element[0]](i,element[1],element[2],element[3]))
        });
        // console.log(this.trees)
    }
    draw(){
        let alpha = 'ff'
        if (Z == 1){
            alpha = "88"
        }
        this.trees.forEach(tree => {
            tree.draw(alpha)
        });
    }

}

class Building{
    //[0, 4.21, 9.99, 0.2, 0.2, 161]
    constructor(id,x,y,w,h,dir){
        this.id = id
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.dir = dir
        // console.log(id,x,y,size)
        this.tree_size={
            0:0.1,
            1:0.15,
            2:0.2,
            3:0.25
        }
    }
    draw(alpha){

    }
}
class BasedBuilding extends Building{
    constructor(id,x,y,w,h,dir){
        super(id,x,y,w,h,dir)
        new Basement(x,y,w,h,dir)
    }
}

class Basement extends Strucure{
    constructor(x,y,w,h,dir){
        super('c')
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this .dir = dir
        // console.log(0)
    }

    draw(){
        // console.log(1)
        let poly = []
        let cos = Math.cos(this.dir/180*Math.PI)
        let sin = Math.sin(this.dir/180*Math.PI)
        poly = [[-this.h/2, -this.w/2], [-this.h/2, this.w/2], [this.h/2,this.w/2], [this.h/2, -this.w/2]]
        ctx.beginPath();
        ctx.fillStyle = MAPstatic.CT.cs
        ctx.lineWidth = 2/320*Zoom
        ctx.moveTo(global_x_to_screen(this.x)+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
        for (let p = 1; p < poly.length; p+=1) {
            ctx.lineTo(global_x_to_screen(this.x)+(poly[p][1]*cos*Zoom)+(poly[p][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[p][1]*sin*Zoom)+(poly[p][0]*-cos*Zoom));
        }
        ctx.lineTo(global_x_to_screen(this.x)+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
        ctx.fill();
        ctx.closePath();
    }
}

class HouseBuilding extends BasedBuilding{


    
    draw(){
        // console.log(1)

        let poly = []
        let cos = Math.cos(this.dir/180*Math.PI)
        let sin = Math.sin(this.dir/180*Math.PI)
        if (this.w > this.h){
            poly = [[0, -this.w/2], [0, this.w/2], [this.h/2,this.w/2], [this.h/2, -this.w/2]]
        }else{
            poly = [[-this.h/2, 0], [this.h/2, 0], [this.h/2,this.w/2], [-this.h/2, this.w/2]]
        }        
        ctx.beginPath();
        ctx.fillStyle = MAPstatic.CT.rr
        ctx.lineWidth = 2/320*Zoom
        ctx.moveTo(global_x_to_screen(this.x)+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
        for (let p = 1; p < poly.length; p+=1) {
            ctx.lineTo(global_x_to_screen(this.x)+(poly[p][1]*cos*Zoom)+(poly[p][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[p][1]*sin*Zoom)+(poly[p][0]*-cos*Zoom));
        }
        ctx.lineTo(global_x_to_screen(this.x)+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
        ctx.fill();
        ctx.closePath();

        if (this.w > this.h){
            poly = [[-this.h/2, -this.w/2], [-this.h/2, this.w/2], [0, this.w/2], [0, -this.w/2]]
        }else{
            poly = [[-this.h/2,-this.w/2 ], [this.h/2,-this.w/2 ], [ this.h/2,0], [ -this.h/2,0]]      
        }
            ctx.beginPath();
        ctx.fillStyle = MAPstatic.CT.rl
        ctx.lineWidth = 2/320*Zoom
        ctx.moveTo(global_x_to_screen(this.x)+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
        for (let p = 1; p < poly.length; p+=1) {
            ctx.lineTo(global_x_to_screen(this.x)+(poly[p][1]*cos*Zoom)+(poly[p][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[p][1]*sin*Zoom)+(poly[p][0]*-cos*Zoom));
        }
        ctx.lineTo(global_x_to_screen(this.x)+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
        ctx.fill();
        ctx.closePath();
    }

}


class ContainerBuilding extends Building{


    
    draw(){
        let poly = []
        let cos = Math.cos(this.dir/180*Math.PI)
        let sin = Math.sin(this.dir/180*Math.PI)
        poly = [[ -this.w,0], [this.w,0 ]]
        ctx.beginPath();

        ctx.moveTo(global_x_to_screen(this.x)+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
        ctx.lineTo(global_x_to_screen(this.x)+(poly[1][1]*cos*Zoom)+(poly[1][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[1][1]*sin*Zoom)+(poly[1][0]*-cos*Zoom));
        ctx.lineCap = 'butt'
        ctx.lineWidth = this.h*Zoom/2
        ctx.strokeStyle = MAPstatic.CT['w'+this.id%3]
        ctx.stroke();
        ctx.strokeStyle = MAPstatic.CT['e'+this.id%3]
        ctx.setLineDash([2/320*Zoom,2/320*Zoom])
        ctx.stroke();
        ctx.setLineDash([])
        ctx.closePath();
    }

}

class ChimneyBuilding extends BasedBuilding{


    
    draw(){
        let poly = []
        let cos = Math.cos(this.dir/180*Math.PI)
        let sin = Math.sin(this.dir/180*Math.PI)
        poly = [[-this.w/2, -this.w/2], [-this.w/2, this.w/2], [this.w/2, this.w/2], [this.w/2, -this.w/2]]
        ctx.beginPath();
        ctx.fillStyle = MAPstatic.CT.if
        ctx.moveTo(global_x_to_screen(this.x)+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
        for (let p = 1; p < poly.length; p+=1) {
            ctx.lineTo(global_x_to_screen(this.x)+(poly[p][1]*cos*Zoom)+(poly[p][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[p][1]*sin*Zoom)+(poly[p][0]*-cos*Zoom));
        }
        ctx.lineTo(global_x_to_screen(this.x)+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = MAPstatic.CT.is
        ctx.arc(global_x_to_screen(this.x),global_y_to_screen(this.y),this.w/2*Zoom,0 , Math.PI*2 )
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = MAPstatic.CT.io
        ctx.arc(global_x_to_screen(this.x),global_y_to_screen(this.y),this.w*Zoom/3,0 , Math.PI*2 )
        ctx.fill();
        ctx.closePath();
    }

}

class HangarBuilding extends BasedBuilding{


    
    draw(){
        let poly = []
        let cos = Math.cos(this.dir/180*Math.PI)
        let sin = Math.sin(this.dir/180*Math.PI)
        poly = [[-this.h/2, -this.w/2], [-this.h/2, this.w/2], [this.h/2, this.w/2], [this.h/2, -this.w/2]]
        ctx.beginPath();
        ctx.fillStyle = MAPstatic.CT.hf
        ctx.strokeStyle = MAPstatic.CT.hs
        ctx.lineWidth = 2/320*Zoom
        ctx.moveTo(global_x_to_screen(this.x)+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
        for (let p = 1; p < poly.length; p+=1) {
            ctx.lineTo(global_x_to_screen(this.x)+(poly[p][1]*cos*Zoom)+(poly[p][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[p][1]*sin*Zoom)+(poly[p][0]*-cos*Zoom));
        }
        ctx.lineTo(global_x_to_screen(this.x)+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        if (this.w > this.h){
            ctx.lineWidth = this.h*Zoom
            poly = [[ 0,-this.w/2], [0,this.w/2 ]]
        }else{
            ctx.lineWidth = this.w*Zoom
            poly = [[ -this.h/2,0], [this.h/2,0]]
        }
        ctx.beginPath();

        ctx.moveTo(global_x_to_screen(this.x)+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
        ctx.lineTo(global_x_to_screen(this.x)+(poly[1][1]*cos*Zoom)+(poly[1][0]*Zoom*sin) ,global_y_to_screen(this.y)+(poly[1][1]*sin*Zoom)+(poly[1][0]*-cos*Zoom));
        ctx.lineCap = 'butt'
        ctx.strokeStyle = MAPstatic.CT.hs
        ctx.setLineDash([2/320*Zoom,6/320*Zoom])
        ctx.stroke();
        ctx.setLineDash([])
        ctx.closePath();
    }

}

class BuildingsGroup extends Strucure{
    BuildingsTable = {
        0: HouseBuilding,
        1: ContainerBuilding,
        2: ChimneyBuilding,
        3: HangarBuilding                                                                                                                                                                                                              
    }
    constructor(buildings){
        super('#')
        this.buildings = []
        let i = 0
        buildings.forEach(element => {
            i++
            // console.log(this.BuildingsTable[element[0]])
            this.buildings.push(new this.BuildingsTable[element[0]](i,element[1],element[2],element[3],element[4],element[5]))
        });
        // console.log(this.buildings)
    }
    draw(){
        let alpha = 'ff'
        if (Z == 1){
            alpha = "88"
        }
        this.buildings.forEach(tree => {
            tree.draw(alpha)
        });
    }

}

function drawCeils(){
    ctx.lineWidth=Zoom/320*3;
    ctx.beginPath();
    
    for (let x = 0; x < WH+1; x++) {
        ctx.moveTo(GameW/2 + OffsetX - (X + (nX - X) * (Date.now() - LastPING) / PING)*Zoom+Zoom*x, GameH/2 + OffsetY - (Y + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom)
        ctx.lineTo(GameW/2 + OffsetX - (X + (nX - X) * (Date.now() - LastPING) / PING)*Zoom+Zoom*x, GameH/2 + OffsetY - (Y + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom + WH*Zoom)
    }
    for (let y = 0; y < WH+1; y++) {
        ctx.moveTo(GameW/2 + OffsetX - (X + (nX - X) * (Date.now() - LastPING) / PING)*Zoom, GameH/2 + OffsetY - (Y + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom+Zoom*y)
        ctx.lineTo(GameW/2 + OffsetX - (X + (nX - X) * (Date.now() - LastPING) / PING)*Zoom + WH*Zoom, GameH/2 + OffsetY - (Y + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom+Zoom*y)
    }
    ctx.rect(GameW/2 + OffsetX - (X + (nX - X) * (Date.now() - LastPING) / PING)*Zoom, GameH/2 + OffsetY - (Y + (nY - Y) * (Date.now() - LastPING) / PING)*Zoom, WH*Zoom, WH*Zoom);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.stroke();
}
function drawSurface(){
    ctx.fillStyle = MAPstatic.CT.bg+'55'
    ctx.fillRect(0,0,canvas.width,canvas.height);

}