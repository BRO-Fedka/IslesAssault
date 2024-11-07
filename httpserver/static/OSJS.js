class MortarCannon extends Cannon{
    cannon_r = 12
    l = 18
    len_width = [8,5]

    constructor(x,y,r = 0.0375){

        super(x,y,r)

    }

    updatep(string){
//    console.log(string)
        string = super.updatep(string)
        let sublist = string.split(',',2)
        string = string.slice(sublist[0].length + sublist[1].length + 2)
        this.prev_status = this.status
        this.status = Number(sublist[0][0])
        this.prev_dir = this.dir
        this.dir = Number(sublist[0].slice(1))
        let shells = Number(sublist[1])
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

    drawp(layer,vehicle){
        if (layer=='OnWater+2'){
            super.drawp(layer,vehicle)
        }
    }


}

class ShipEngine extends PolygonModule{
    drawp(layer,vehicle){
        super.drawp(layer,vehicle)
    }
    drawe(layer,vehicle){
        super.drawe(layer,vehicle)
    }
}
class WaterPump extends PolygonModule{}
class ShipFuelTank extends PolygonModule{}
class ShipShellStorage extends PolygonModule{}
class ShipSegment extends PolygonModule{
    drawp(layer,vehicle){
        create_waterparticles_for_poly(vehicle,this.poly,Number(this.indication_char)/45)
        super.drawp(layer,vehicle)
    }
    drawe(layer,vehicle){
        create_waterparticles_for_poly(vehicle,this.poly,Number(this.indication_char)/45)
        super.drawe(layer,vehicle)
    }
}

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
            if (layer=='OnWater'){
                create_waterparticles_for_poly(this,POLY_SHAPE)
                drawF(this,POLY_SHAPE, this.f)
            }
            // console.log("DR")
            super.drawp(layer)
        }
    }
    drawe(layer){
        // console.log("DRAW!")
        if (layer.includes('OnWater')){
            if (layer=='OnWater'){
            create_waterparticles_for_poly(this,POLY_SHAPE)
                drawF(this,POLY_SHAPE, this.f)
            }
            // console.log("DR")
            super.drawe(layer)
        }
    }
}