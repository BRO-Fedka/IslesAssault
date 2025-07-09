PACK_ID = 0

IK.FORWARD = new InputKey(0,"Move forward",87,'static/indication/forward_icon.svg')
IK.BACKWARD = new InputKey(1,"Move backward",83,'static/indication/backward_icon.svg')
IK.LEFT = new InputKey(2,"Turn left",65,'static/indication/left_icon.svg')
IK.RIGHT = new InputKey(3,"Turn right",68,'static/indication/right_icon.svg')
IK.LAUNCH_TORPEDO = new InputKey(4,"Launch torpedo",32,'static/indication/torpedo_icon.svg')
IK.SMOKE = new InputKey(6,"Deploy smoke shield",71,'static/indication/smoke_generator_icon.svg')


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
class ConstructionTool extends RotatingModule{
    layers=[['+1',0],['+1',-1],['+1',1],]
    stroke='rgba(0,0,0,0.5)'
    fill='#CE875C'
    constructor(x,y,r = 0.01){
        super(x,y,r)
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
    constructor(poly,sndsrc){
        super(poly)
        this.long_sound_player = new LongSoundPlayer(sndsrc)
        this.indicator = new SimpleIndicator(this.image)
    }

    updatep(string){
        string = super.updatep(string)
        this.indicator.update(this)
        return string
    }
    drawp(layer,vehicle){
        super.drawp(layer,vehicle)
        this.long_sound_player.update(vehicle.x,vehicle.y,vehicle.aver_speed_vec,0)
    }
    drawe(layer,vehicle){
        super.drawe(layer,vehicle)
        this.long_sound_player.update(vehicle.x,vehicle.y,vehicle.aver_speed_vec)
    }
}
class ShipEngine extends Engine{
    input_keys = [IK.FORWARD,IK.BACKWARD]
    indication_layer = 'BOTTOM'
    constructor(poly){super(poly,LSND_SHIP_ENGINE)}

}
class TankEngine extends Engine{
    indication_layer = 'DEFAULT'

}
class WaterPump extends PolygonModule{
    image='static/indication/water_pump_icon.svg'
    layers=[['+1',0],['+1',-1],['+1',1],]
    stroke='rgba(0,0,0,0.15)'
    fill='rgba(0,0,0,0.15)'
    width=0.5
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

class PlaceForVehicle extends SquareModule{
    stroke='rgba(0,0,0,0.1)'
    fill='rgba(0,0,0,0.1)'
    width=0.5
    constructor(x,y){
        super(x,y,0.06,0.04)
    }
    updatee(string){
        return string
    }
    updatep(string){
        return string
    }
}

class Track extends PolygonModule{
    input_keys = [IK.FORWARD, IK.BACKWARD, IK.LEFT, IK.RIGHT]
    indication_layer = 'DEFAULT'
    layers=[['+1',0],['+1',-1],['+1',1],]
    fill='#444'
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
    input_keys = [IK.LAUNCH_TORPEDO]
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
class ShipSteering extends Module{
    input_keys = [IK.LEFT, IK.RIGHT]
    comboboxes = [CB.SHIP_CONTROL_TYPE]
}
class SmokeGenerator extends PolygonModule{
    input_keys = [IK.SMOKE]
    image='static/indication/smoke_generator_icon.svg'
    layers=[['+1',0],['+1',-1],['+1',1],]
    stroke='rgba(0,0,0,0.15)'
    fill='rgba(0,0,0,0.15)'
    width=0.5
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
    poly = POLY_SHAPE0
    layers = [['OnWater',0],['UnderWater',-1]]
    water_particles_rate_cof = 40
    constructor(id,name){
        super(id,name)
        this.modules = [
            new MapModule(),
            new InteractionModule(),
            new MortarCannon(0,0),
            new MortarCannon(-0.1,0),
            new TorpedoFrontalTube(TUBE0,12),
            new SmokeGenerator(SMK0,5),
            new ShipSteering(),
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
      this.init_inputs()
        
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
    water_particles_rate_cof = 10
    poly = POLY_SHAPE1
    layers = [['OnWater',0],['UnderWater',-1],['OnGround',1]]
    constructor(id,name){
        super(id,name)
        this.modules = [
            new MapModule(),
            new InteractionModule(),
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
      this.init_inputs()
        
    }
}
POLY_SHAPE2 = [[0,0.075],[0.15,0.075],[0.2,0.05],[0.225,0],[0.2,-0.05],[0.15,-0.075],[0,-0.075],[-0.15,-0.075],[-0.225,-0.075],[-0.25,-0.05],[-0.25,0.05],[-0.225,0.075]]
POLY_SHAPE_N2 = [[-0.0, 0.15], [0.025, 0.05], [0.05, 0.025], [0.05, -0.025], [0.025, -0.05], [-0.0, -0.15], [-0.0, -0.15], [-0.0, -0.075], [-0.025, -0.025], [-0.1, 0.0], [-0.025, 0.025], [-0.0, 0.225]]
SEG12 = [[-0.15, -0.075], [-0.225, -0.075], [-0.25, -0.05], [-0.25, 0.05], [-0.225, 0.075], [-0.1, 0.075], [-0.1, -0.075], [-0.15, -0.075]]
SEG22 = [[0.1, 0.075], [0.1, -0.075], [0.0, -0.075], [-0.1, -0.075], [-0.1, 0.075], [0.0, 0.075], [0.1, 0.075]]
SEG32 = [[0.15, 0.075], [0.2, 0.05], [0.225, 0.0], [0.2, -0.05], [0.15, -0.075], [0.1, -0.075], [0.1, 0.075], [0.15, 0.075]]
ENG2 = [[-0.15,0.025],[-0.25,0.025],[-0.25,-0.025],[-0.15,-0.025]]
FUEL12 = [[0.025,0.03],[0.025,0.07],[0.125,0.07],[0.125,0.03]]
FUEL22 = [[-0.025,0.03],[-0.025,0.07],[-0.125,0.07],[-0.125,0.03]]
FUEL32 = [[0.025,-0.03],[0.025,-0.07],[0.125,-0.07],[0.125,-0.03]]
FUEL42 = [[-0.025,-0.03],[-0.025,-0.07],[-0.125,-0.07],[-0.125,-0.03]]
PMP2 = [[0.16,0.03],[0.2,0.03],[0.2,-0.03],[0.16,-0.03]]


class CargoShip extends Vehicle{
    f = {
        '0': '#131313',
        '1': '#2a200c',
        '2': '#122b0b',
        '3': '#10222b',
        '4': '#323232',
        '5': '#713567',
        '6':'#723636'}
    zoom = 300
    poly = POLY_SHAPE2
    layers = [['OnWater',0],['UnderWater',-1]]
    constructor(id,name){
        super(id,name)
        // this.wtp_spawner = new PolyStrokeModuleParticleSpawner({poly:POLY_SHAPE2},WaterTraceParticle,1)
        // this.wtp_spawner.set_activation_to(true)
        this.modules = [
            new MapModule(),
            new InteractionModule(),
            new ShipSteering(),
            new MockModule(),
            new ShipEngine(ENG2),
            new WaterPump(PMP2),
            new ShipFuelTank(FUEL12),
            new ShipFuelTank(FUEL22),
            new ShipFuelTank(FUEL32),
            new ShipFuelTank(FUEL42),
            new ShipSegment(SEG12),
            new ShipSegment(SEG22),
            new ShipSegment(SEG32),
            new ArmorIndication(POLY_SHAPE2),
            new OverloadIndication(),
            new RepairKit(this)
      ]
      this.init_inputs()
        
    }


}

POLY_SHAPE3 = [[-0.17,0.045],[-0.12,0.055],[0,0.055],[0.105,0.055],[0.155,0.035],[0.17,0],[0.155,-0.035],[0.105,-0.055],[0,-0.055],[-0.12,-0.055],[-0.17,-0.045]]
//POLY_SHAPE_N = [[-0.0, 0.15], [0.025, 0.05], [0.05, 0.025], [0.05, -0.025], [0.025, -0.05], [-0.0, -0.15], [-0.0, -0.15], [-0.0, -0.075], [-0.025, -0.025], [-0.1, 0.0], [-0.025, 0.025], [-0.0, 0.225]]
SEG13 = [[-0.12, 0.055], [-0.07, 0.055], [-0.07, -0.055], [-0.12, -0.055], [-0.17, -0.045], [-0.17, 0.045], [-0.12, 0.055]]
SEG23 = [[0.0, 0.055], [0.055, 0.055], [0.055, -0.055], [0.0, -0.055], [-0.07, -0.055], [-0.07, 0.055], [0.0, 0.055]]
SEG33 = [[0.105, 0.055], [0.155, 0.035], [0.17, 0.0], [0.155, -0.035], [0.105, -0.055], [0.055, -0.055], [0.055, 0.055], [0.105, 0.055]]
ENG3 = [[-0.17,-0.025],[-0.17,0.025],[-0.07,0.025],[-0.07,-0.025]]

class LandingShip extends Vehicle{
    f = {
        '0': '#131313',
        '1': '#2a200c',
        '2': '#122b0b',
        '3': '#10222b',
        '4': '#323232',
        '5': '#713567',
        '6':'#723636'}
    zoom = 300
    poly = POLY_SHAPE3
    layers = [['OnWater',0],['UnderWater',-1]]
    constructor(id,name){
        super(id,name)
        // this.wtp_spawner = new PolyStrokeModuleParticleSpawner({poly:POLY_SHAPE3},WaterTraceParticle,1)
        // this.wtp_spawner.set_activation_to(true)
        this.modules = [
            new MapModule(),
            new InteractionModule(),
            new PlaceForVehicle(-0.075, 0.025),
            new PlaceForVehicle(-0.075, -0.025),
            new PlaceForVehicle(-0.005, 0.025),
            new PlaceForVehicle(-0.005, -0.025),
            new PlaceForVehicle(0.065, 0.025),
            new PlaceForVehicle(0.065, -0.025),
            new ShipSteering(),
            new MockModule(),
            new ShipEngine(ENG3),
            // new WaterPump(PMP2),
            // new ShipFuelTank(FUEL12),
            // new ShipFuelTank(FUEL22),
            // new ShipFuelTank(FUEL32),
            // new ShipFuelTank(FUEL42),
            new ShipSegment(SEG13),
            new ShipSegment(SEG23),
            new ShipSegment(SEG33),
            new ArmorIndication(POLY_SHAPE3),
            new OverloadIndication(),
            new RepairKit(this)
      ]
      this.init_inputs()
        
    }

}
class ConstructionVehicle extends Vehicle{
    zoom = 1700
    poly = POLY_SHAPE1
    water_particles_rate_cof = 10
    layers = [['OnWater',0],['UnderWater',-1],['OnGround',1]]
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
        // this.wtp_spawner = new PolyStrokeModuleParticleSpawner({poly:POLY_SHAPE1},WaterTraceParticle,1)
        // this.wtp_spawner.set_activation_to(true)
        this.modules = [
            new MapModule(),
            new InteractionModule(),
            new ConstructionTool(0.015, 0),
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
      this.init_inputs()
        
    }
}
let VehiclesTable = {

    0:Heavy,
    1:Tank,
    2:CargoShip,
    3:LandingShip,
    4:ConstructionVehicle
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

LayerList = ["SH0","SH1","UnderWater-2","UnderWater-1","UnderWater",'w',"UnderWater+1",'w',"UnderWater+2",'w',"UnderWater+3",'w','W','_1',"OnWater-2","OnWater-1","B",'BD',"OnWater","OnWater+1","OnWater+2","OnWater+3",'_0','g','G','c','C','R','_2','_',"OnGround","OnGround+1","OnGround+2",'S','#!','T',"NICKNAMES"]

let LayersFunctions = {
    'BD': drawCeils,
    'w':drawSurface
}
onPackageLoaded()