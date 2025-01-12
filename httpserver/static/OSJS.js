class MortarCannon extends Cannon{
    constructor(x,y,r = 0.0375){
        super(x,y,r)
    }
    drawp(layer,vehicle){
        if (layer.includes('+2')){
            super.drawp(layer,vehicle)
        }
    }
    drawe(layer,vehicle){
        if (layer.includes('+2')){
            super.drawe(layer,vehicle)
        }
    }
}
class TankCannon extends Cannon{
    cannon_r = 4.8
    l = 10
    len_width = [3,2]
    fill = true
    stroke_width = 1
    canbang_prt_amount = 2
    constructor(x,y,r = 0.015){
        super(x,y,r)
    }
    drawp(layer,vehicle){
        if (layer.includes('+2')){
            super.drawp(layer,vehicle)
        }
    }
    drawe(layer,vehicle){
        if (layer.includes('+2')){
            super.drawe(layer,vehicle)
        }
    }
}

class Engine extends PolygonModule{
    image = 'static/indication/engine_icon.svg'
    constructor(poly){
        super(poly)
        this.indicator = new SimpleIndicator(this.image)
    }

    updatep(string){
        string = super.updatep(string)
        this.indicator.update(this)
        return string
    }
    // drawp(layer,vehicle){
    //     super.drawp(layer,vehicle)
    // }
    // drawe(layer,vehicle){
    //     super.drawe(layer,vehicle)
    // }
}
class ShipEngine extends Engine{
    indication_layer = 'BOTTOM'

}
class TankEngine extends Engine{
    indication_layer = 'DEFAULT'

}
class WaterPump extends PolygonModule{
image='static/indication/water_pump_icon.svg'
    constructor(poly){
        super(poly)
        this.indicator = new SimpleIndicator(this.image)
    }

    updatep(string){
        string = super.updatep(string)
        this.indicator.update(this)
        return string
    }
}
class ShipFuelTank extends PolygonModule{
    image='static/indication/fuel_tank_icon.svg'
    indication_layer = 'BOTTOM'
}

class Track extends PolygonModule{
    indication_layer = 'DEFAULT'
    constructor(poly,image){
        super(poly)
        this.image = image
        this.indicator = new SimpleIndicator(this.image)
    }

    explode(){
        return
    }

    updatep(string){
        string = super.updatep(string)
        this.indicator.update(this)
        return string
    }
}
class LeftTrack extends Track{
    constructor(poly){super(poly,'static/indication/track_l_icon.svg')}
}
class RightTrack extends Track{
    constructor(poly){super(poly,'static/indication/track_r_icon.svg')}
}
class ShipShellStorage extends PolygonModule{
    indication_layer = 'BOTTOM'
    image='static/indication/shell_icon.svg'
    constructor(poly, max){
        super(poly)
        this.amount = max
        this.max_amount = max
        this.indicator = new AmountIndicator(this.image)

    }
    updatep(string){

        string = super.updatep(string)
        let substring = string.split(',',1)[0]
        string = string.slice(substring.length + 1)
        this.amount = Number(substring)
        this.indicator.update(this,this.amount,this.max_amount)
        return string
    }
}
class ShipSegment extends PolygonModule{
    constructor(poly){
        super(poly)
        this.wtp_spawner = new PolyStrokeModuleParticleSpawner(this,WaterTraceParticle,20)
        this.wtp_spawner.set_activation_to(true)
    }
    image='static/indication/segment_icon.svg'
    indication_layer = 'BOTTOM'
    drawp(layer,vehicle){
        if (layer=='OnWater'){
            super.drawp(layer,vehicle)
            this.wtp_spawner.rate = Number(this.indication_char)*2
            // console.log('0')
            this.wtp_spawner.update(vehicle)
            
        }
        
    }
    drawe(layer,vehicle){
        if (layer=='OnWater'){
            super.drawp(layer,vehicle)
            this.wtp_spawner.rate = Number(this.indication_char)*10
            this.wtp_spawner.update(vehicle)
            
        }
    }
}

class TorpedoFrontalTube extends PolygonModule{
    indication_layer = 'BOTTOM'
    image='static/indication/torpedo_icon.svg'
    constructor(poly, max){
        super(poly)
        this.amount = max
        this.max_amount = max
        this.indicator = new AmountIndicator(this.image)

    }
    
    updatep(string){

        string = super.updatep(string)
        let substring = string.split(',',1)[0]
        string = string.slice(substring.length + 1)
        this.amount = Number(substring)
        this.indicator.update(this,this.amount,this.max_amount)
        return string
    }
}

class SmokeGenerator extends PolygonModule{
image='static/indication/smoke_generator_icon.svg'
    constructor(poly,max){
        super(poly)
        this.amount = max
        this.max_amount = max
        this.indicator = new AmountIndicator(this.image)
    }
    
    updatep(string){
        string = super.updatep(string)
        let substring = string.split(',',1)[0]
        string = string.slice(substring.length + 1)
        this.amount = Number(substring)
        this.indicator.update(this,this.amount,this.max_amount)
        return string
    }
}

POLY_SHAPE0 = [[0.15, 0], [0, 0.06], [-0.15, 0.045], [-0.15, -0.045], [0, -0.06]]
POLY_SHAPE_N0 = [[0.06, 0.15], [-0.015, 0.15], [-1, 0], [-0.015, -0.15], [0.06, -0.15]]
SEG10 = [[0.15,0],[0.05,-0.04],[0.05,0.04]]
SEG20 = [[0.05,-0.04],[0.05,0.04],[0, 0.06],[-0.05,0.055],[-0.05,-0.055],[0, -0.06]]
SEG30 = [[-0.05,-0.055],[-0.05,0.055],[-0.15,0.045],[-0.15,-0.045]]
ENG0 = [[-0.15,0.025],[-0.15,-0.025],[-0.05,-0.025],[-0.05,0.025]]
AMM0 = [[-0.05,0.05],[-0.02,0.05],[-0.02,-0.05],[-0.05,-0.05]]
TUBE0 = [[0.085,0.01],[0.085,-0.01],[0.135,-0.01],[0.135,0.01]]
FUEL10 = [[0.085,0.02],[0.085,-0.02],[0.06,-0.03],[0.06,0.03]]
FUEL20 = [[0,0.005],[0,0.055],[0.05,0.035],[0.05,0.005]]
FUEL30 = [[0,-0.005],[0,-0.055],[0.05,-0.035],[0.05,-0.005]]
PMP0 = [[0.075,0.015],[0.12,0.015],[0.12,-0.015],[0.075,-0.015]]
SMK0 = [[0.045,0.025],[0.075,0.025],[0.075,-0.025],[0.045,-0.025]]



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
        this.wtp_spawner = new PolyStrokeModuleParticleSpawner({poly:POLY_SHAPE0},WaterTraceParticle,1)
        this.wtp_spawner.set_activation_to(true)
        this.modules = [
            new MortarCannon(0,0),
            new MortarCannon(-0.1,0),
            new TorpedoFrontalTube(TUBE0,12),
            new SmokeGenerator(SMK0,5),
            new MockModule(),
            new MockModule(),
            new ShipEngine(ENG0),
            new WaterPump(PMP0),
            new ShipFuelTank(FUEL10),
            new ShipFuelTank(FUEL20),
            new ShipFuelTank(FUEL30),
            new ShipShellStorage(AMM0,200),
            new ShipSegment(SEG10),
            new ShipSegment(SEG20),
            new ShipSegment(SEG30),
            new ArmorIndication(POLY_SHAPE0),
            new OverloadIndication(),
            new RepairKit(this)
      ]
        
    }

    drawp(layer){
        // console.log("DRAW!")
        if (layer.includes('OnWater')){
            if (layer=='OnWater'){
                // console.log((Math.sqrt((this.new_x-this.x)**2+(this.new_y-this.y)**2)*FPS)**3)
                this.wtp_spawner.rate = (Math.sqrt((this.new_x-this.x)**2+(this.new_y-this.y)**2)*FPS)**3*40
                this.wtp_spawner.update(this)
                drawF(this,POLY_SHAPE0, this.f)
//                console.log(this.id)
            }
            // console.log("DR")
            super.drawp(layer)
        }
    }
    drawe(layer){
        // console.log("DRAW!")
        if (layer.includes('OnWater')){
            if (layer=='OnWater'){
                this.wtp_spawner.rate = (Math.sqrt((this.new_x-this.x)**2+(this.new_y-this.y)**2)*FPS)**3*40
                this.wtp_spawner.update(this)
                drawF(this,POLY_SHAPE0, this.f)
//                console.log(this.id)
            }
            // console.log("DR")
            super.drawe(layer)
        }
    }
}
POLY_SHAPE1 = [[0.03, 0.02], [0.03, -0.02], [-0.03, -0.02], [-0.03, 0.02]]
POLY_SHAPE_N1 = [[1, 0], [0, -1], [-1, 0], [0, 1]]
TRACK_L1 = [[-0.03,0.015],[-0.03,0.0225],[0.03,0.0225],[0.03,0.015]]
TRACK_R1 = [[-0.03,-0.015],[-0.03,-0.0225],[0.03,-0.0225],[0.03,-0.015]]
ENG1 = [[-0.03,0.01],[-0.015,0.01],[-0.015,-0.01],[-0.03,-0.01]]
class Tank extends Vehicle{
    zoom = 1700
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
        this.wtp_spawner = new PolyStrokeModuleParticleSpawner({poly:POLY_SHAPE1},WaterTraceParticle,1)
        this.wtp_spawner.set_activation_to(true)
        this.modules = [
            new TankCannon(0.005, 0),
            new TankEngine(ENG1),
            new LeftTrack(TRACK_L1),
            new RightTrack(TRACK_R1),
            new MockModule(),
            new MockModule(),
            new ShipSegment(POLY_SHAPE1),
            new ArmorIndication(POLY_SHAPE1),
            new OverloadIndication(),
            new RepairKit(this)

      ]
        
    }

    drawp(layer){
        if ((this.z == 1 && layer.includes('OnGround'))||(this.z == 0 && layer.includes('OnWater'))){
            if (layer=='OnWater'){
                drawF(this,POLY_SHAPE1, this.f)
                this.wtp_spawner.rate = (Math.sqrt((this.new_x-this.x)**2+(this.new_y-this.y)**2)*FPS)**3*10
                this.wtp_spawner.update(this)
            }else if(layer=='OnGround'){
                drawF(this,POLY_SHAPE1, this.f)
            }
            super.drawp(layer)
        }
    }
    drawe(layer){
        if ((this.z == 1 && layer.includes('OnGround'))||(this.z == 0 && layer.includes('OnWater'))){
            if (layer=='OnWater'){
                drawF(this,POLY_SHAPE1, this.f)
                this.wtp_spawner.rate = (Math.sqrt((this.new_x-this.x)**2+(this.new_y-this.y)**2)*FPS)**3*10
                this.wtp_spawner.update(this)
            }else if(layer=='OnGround'){
                drawF(this,POLY_SHAPE1, this.f)
            }
            super.drawe(layer)
        }
    }
}

let VehiclesTable = {

    0:Heavy,
    1:Tank
}
let EntitiesTable = {

    0:Shell,
    1:Torpedo,
    2:Smoke
}
let StructuresTable = {
    'B':Beach,
    'G':Grass,
    'C':Concrete,
    'S':Stone,
    '_':Bridge,
    'R':Road,
    'T':TreeGroup,
    '#':BuildingsGroup
    
    
}

let LayerList = ["SH0","SH1",'W','_1',"B",'_0','g','G','C','BD','R','r',"OnWater-2","OnWater-1","OnWater","OnWater+1","OnWater+2","OnWater+3",'_2','_',"OnGround","OnGround+1","OnGround+2",'S','c','#','T']

let LayersFunctions = {
    'BD': drawCeils
}