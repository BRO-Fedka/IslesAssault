TracerCL = new Map()
Vehicles = {
0:{
hp:1000,
views:1,
viewsIcons:[''],
f:{
        '0': '#131313',
        '1': '#2a200c',
        '2': '#122b0b',
        '3': '#10222b',
        '4': '#323232',
        '5': '#713567',
        '6':'#723636'},
draw:function(layer, playername){
    if( layer==52 && PlayersData.get(playername).prevX!= null){
    // console.log("????????????")
        let sin = 0
        let cos = 0
        let sinc = 0
        let cosc = 0
        if ((PlayersData.get(playername).prevDIR < 360 && PlayersData.get(playername).prevDIR >270) && (PlayersData.get(playername).actDIR < 90 && PlayersData.get(playername).actDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else if((PlayersData.get(playername).actDIR < 360 && PlayersData.get(playername).actDIR >270) && (PlayersData.get(playername).prevDIR < 90 && PlayersData.get(playername).prevDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else{
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }
        //_0 = posScr(PlayersData[enemy]['COL'],PlayersData[player]['X'],PlayersData[player]['Y'],Zoom,PlayersInputs[player]["w"],PlayersInputs[player]["h"])
        let poly = [[0.15, 0], [0, 0.06], [-0.15, 0.045], [-0.15, -0.045], [0, -0.06]]
//        console.log((Math.sqrt((PlayersData.get(playername).actX-PlayersData.get(playername).prevX)**2+(PlayersData.get(playername).acty-PlayersData.get(playername).prevY)**2)*FPS)**2)
        if (Math.random() < (Math.sqrt((PlayersData.get(playername).actX-PlayersData.get(playername).prevX)**2+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)**2)*FPS)**3) {
        let maxdst =  0.161+0.15+0.09+0.161+0.15;
        let polydsttoprt = Math.random()*maxdst
        let _ = 0
        while (Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)< polydsttoprt){
            polydsttoprt-=Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2);
            _+=1;
        }
        let wtrptrcof = polydsttoprt/Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)
        let wtrprtx = poly[_%poly.length][0] +(poly[(_+1)%poly.length][0]-poly[_%poly.length][0])*wtrptrcof
        let wtrprty = poly[_%poly.length][1] +(poly[(_+1)%poly.length][1]-poly[_%poly.length][1])*wtrptrcof
        WtrParticles0.push(new WtrPrt0(PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin), PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)));
        }

		drawF(playername,poly=poly,cos=cos,sin=sin,cls = this.f)

    drawCannon(playername,CN = 0, r = 12,turcrd = [0,0],firesize = 0.75,l = 18,shtSND = "mcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles0,bangPrt = BangPrt0,bangPrts = BangParticles0,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 5, bangCnt = 5 ,cos =cos,sin = sin,lw=[8,5])
    drawCannon(playername,CN = 1, r = 12,turcrd = [0-0.1,0],firesize = 0.75,l = 18,shtSND = "mcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles0,bangPrt = BangPrt0,bangPrts = BangParticles0,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 5, bangCnt = 5 ,cos =cos,sin = sin,lw=[8,5])


    }
    else if(layer == 87 && PlayersData.get(playername).prevX!= null){

        DrawNickname(playername,PlayersData.get(playername).HP,1000, (PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 +OffsetY  ,(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom+GameH/2 + OffsetY)
    }

},
drawp:function(layer, playername){
//    console.log(layer)

    if( layer==52 && PlayersData.has(playername)){
       // console.log(playername)
        let sin = 0
        let cos = 0
        let sinc = 0
        let cosc = 0
        if ((PlayersData.get(playername).prevDIR < 360 && PlayersData.get(playername).prevDIR >270) && (PlayersData.get(playername).actDIR < 90 && PlayersData.get(playername).actDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else if((PlayersData.get(playername).actDIR < 360 && PlayersData.get(playername).actDIR >270) && (PlayersData.get(playername).prevDIR < 90 && PlayersData.get(playername).prevDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else{
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }
        //_0 = posScr(PlayersData[enemy]['COL'],PlayersData[player]['X'],PlayersData[player]['Y'],Zoom,PlayersInputs[player]["w"],PlayersInputs[player]["h"])
        let poly = [[0.15, 0], [0, 0.06], [-0.15, 0.045], [-0.15, -0.045], [0, -0.06]]
//        console.log((Math.sqrt((nX-X)**2+(nY-Y)**2)*FPS)**2)
        if (Math.random() < (Math.sqrt((nX-X)**2+(nY-Y)**2)*FPS)**3) {
        let maxdst =  0.161+0.15+0.09+0.161+0.15;
        let polydsttoprt = Math.random()*maxdst
        let _ = 0
        while (Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)< polydsttoprt){
            polydsttoprt-=Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2);
            _+=1;
        }
        let wtrptrcof = polydsttoprt/Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)
        let wtrprtx = poly[_%poly.length][0] +(poly[(_+1)%poly.length][0]-poly[_%poly.length][0])*wtrptrcof
        let wtrprty = poly[_%poly.length][1] +(poly[(_+1)%poly.length][1]-poly[_%poly.length][1])*wtrptrcof
        WtrParticles0.push(new WtrPrt0(X+(nX-X)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin), Y+(nY-Y)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)));
        }

	    PdrawF(playername,poly=poly,cos=cos,sin=sin,cls = this.f)
	    PdrawCannon(playername,CN = 0, r = 12,turcrd = [0,0],firesize = 0.75,l = 18,shtSND = "mcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles0,bangPrt = BangPrt0,bangPrts = BangParticles0,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 5, bangCnt = 5 ,cos =cos,sin = sin,lw=[8,5])
        PdrawCannon(playername,CN = 1, r = 12,turcrd = [0-0.1,0],firesize = 0.75,l = 18,shtSND = "mcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles0,bangPrt = BangPrt0,bangPrts = BangParticles0,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 5, bangCnt = 5 ,cos =cos,sin = sin,lw=[8,5])


    }
},
updatep:function(playername,argarr){

     if (argarr.length > 0){
        if (!PlayersData.has(playername)){
//        console.log(this)
            document.getElementById('TorInv').style.display = "";
            document.getElementById('SmkInv').style.display = "";
            document.getElementById('CmodInv').style.display = "";
            document.getElementById('XmodInv').style.display = "";
            PlayersData.set(playername,
            {
                prevX : null,
                prevY : null,
                actX : null,
                actY : null,
                prevDIR : null,
                actDIR : null,
                COLOR:null,
                CNs:[{pDIR:null,DIR: null , STS: 0},{pDIR:null,DIR: null , STS: 0}]

            } )
        }
        PlayersData.get(playername).prevX = PlayersData.get(playername).actX
        PlayersData.get(playername).prevY = PlayersData.get(playername).actY
        PlayersData.get(playername).actX = Number(argarr[5])
        PlayersData.get(playername).actY = Number(argarr[6])
        PlayersData.get(playername).prevDIR = PlayersData.get(playername).actDIR
        PlayersData.get(playername).actDIR = Number(argarr[3])

        PlayersData.get(playername).COLOR =Number( argarr[11])
        PlayersData.get(playername).CNs[0].pDIR = PlayersData.get(playername).CNs[0].DIR;
        PlayersData.get(playername).CNs[0].DIR = Number((argarr[9]).substring(1));
        PlayersData.get(playername).CNs[0].STS = Number((argarr[9]).substring(0,1));
        PlayersData.get(playername).CNs[1].pDIR = PlayersData.get(playername).CNs[1].DIR;
        PlayersData.get(playername).CNs[1].DIR = Number((argarr[10]).substring(1));
        PlayersData.get(playername).CNs[1].STS = Number((argarr[10]).substring(0,1));
        Z = Number(argarr[7])
        nX=PlayersData.get(playername).actX
        nY=PlayersData.get(playername).actY
        X=PlayersData.get(playername).prevX
        Y=PlayersData.get(playername).prevY
        hp.innerHTML = argarr[4] + '/1000'
        tornum.innerText= argarr[0]
        smknum.innerText = argarr[1]
        gasnum.innerHTML = 'GAS: '+Number(argarr[2]*25)
        dirnum.innerHTML = 'DIR: '+argarr[3]
        spdnum.innerHTML = 'SPD: '+argarr[8];
        xnum.innerHTML = 'X: ' + Math.round(argarr[5]*100)/100;
        ynum.innerHTML = 'Y: ' + Math.round(argarr[6]*100)/100;
        if (Number( argarr[12]) == 1){
            document.getElementById('TorLoading').style.display = "block"
        }else{
        document.getElementById('TorLoading').style.display = "none"
        }
        if (Number( argarr[13]) == 1){
            document.getElementById('SmkLoading').style.display = "block"
        }else{
        document.getElementById('SmkLoading').style.display = "none"
        }
     }
//    PlayersData[playername] = {X:infarr[0].split(',')[1],}
    //PlayersData[player]['STR'] = f'{PlayersData[player]["TORPEDOS"]},{PlayersData[player]["SMOKES"]},'+str(PlayersData[player]['GAS']/25)+f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"]*1000)/1000},{int(PlayersData[player]["Y"]*1000)/1000},{PlayersData[player]["Z"]*2+int(PlayersData[player]["ONGROUND"])},'+str(int(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*100))+f',0{PlayersData[player]["CAN"][0][7]},0{PlayersData[player]["CAN"][1][7]}'

},
update:function(playername,argarr){
     if (argarr.length > 0){
        if (!PlayersData.has(playername)){
            PlayersData.set(playername,
            {
                prevX : null,
                prevY : null,
                actX : null,
                actY : null,
                prevDIR : null,
                actDIR : null,
                HP:null,
                Z:null,
                CNs:[{pDIR:null,DIR: null , STS: 0},{pDIR:null,DIR: null , STS: 0}]

            } )
        }
        PlayersData.get(playername).prevX = PlayersData.get(playername).actX
        PlayersData.get(playername).prevY = PlayersData.get(playername).actY
        PlayersData.get(playername).actX = Number(argarr[2])
        PlayersData.get(playername).actY = Number(argarr[3])
        PlayersData.get(playername).prevDIR = PlayersData.get(playername).actDIR
        PlayersData.get(playername).actDIR = Number(argarr[0])
        PlayersData.get(playername).CNs[0].pDIR = PlayersData.get(playername).CNs[0].DIR;
        PlayersData.get(playername).CNs[0].DIR = Number((argarr[5]).substring(1));
        PlayersData.get(playername).CNs[0].STS = Number((argarr[5]).substring(0,1));
        PlayersData.get(playername).CNs[1].pDIR = PlayersData.get(playername).CNs[1].DIR;
        PlayersData.get(playername).CNs[1].DIR = Number((argarr[5]).substring(1));
        PlayersData.get(playername).CNs[1].STS = Number((argarr[5]).substring(0,1));
        PlayersData.get(playername).Z = Number(argarr[4])
//        console.log(argarr)
        PlayersData.get(playername).HP = Number(argarr[1])
//        console.log(argarr[7])
//        console.log("????????????")
        PlayersData.get(playername).COLOR =Number( argarr[7])
//        PlayersData[player]['STR'] = f'+,{str(int(PlayersData[enemy]["DIR"]))},{PlayersData[enemy]["HP"]},{int(PlayersData[enemy]["X"] * 1000) / 1000},{int(PlayersData[enemy]["Y"] * 1000) / 1000},{PlayersData[enemy]["Z"] * 2 + int(PlayersData[enemy]["ONGROUND"])},' + f',{PlayersData[enemy]["CAN"][0][8]}{PlayersData[enemy]["CAN"][0][7]},{PlayersData[enemy]["CAN"][1][8]}{PlayersData[enemy]["CAN"][1][7]},' + str(int(not (PlayersData[enemy]['STATUS'] == 'BURNING' or PlayersData[enemy]['STATUS'] == 'DEAD')) * PlayersCosmetics[enemy]['COLOR'])

     }
//    PlayersData[playername] = {X:infarr[0].split(',')[1],}
    //PlayersData[player]['STR'] = f'{PlayersData[player]["TORPEDOS"]},{PlayersData[player]["SMOKES"]},'+str(PlayersData[player]['GAS']/25)+f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"]*1000)/1000},{int(PlayersData[player]["Y"]*1000)/1000},{PlayersData[player]["Z"]*2+int(PlayersData[player]["ONGROUND"])},'+str(int(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*100))+f',0{PlayersData[player]["CAN"][0][7]},0{PlayersData[player]["CAN"][1][7]}'

}


},


2:{ //TODO
hp:30,
views:1,
viewsIcons:[''],
f:{
        '0': '#131313',
        '1': '#2a200c',
        '2': '#122b0b',
        '3': '#10222b',
        '4': '#323232',
        '5': '#713567',
        '6':'#723636'},
draw:function(layer, playername){
    if( layer==52 && PlayersData.get(playername).prevX!= null){
//        console.log()
        let sin = 0
        let cos = 0
        let sinc = 0
        let cosc = 0
        if ((PlayersData.get(playername).prevDIR < 360 && PlayersData.get(playername).prevDIR >270) && (PlayersData.get(playername).actDIR < 90 && PlayersData.get(playername).actDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else if((PlayersData.get(playername).actDIR < 360 && PlayersData.get(playername).actDIR >270) && (PlayersData.get(playername).prevDIR < 90 && PlayersData.get(playername).prevDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else{
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }
        //_0 = posScr(PlayersData[enemy]['COL'],PlayersData[player]['X'],PlayersData[player]['Y'],Zoom,PlayersInputs[player]["w"],PlayersInputs[player]["h"])
        let poly = [[0.075, 0], [0, 0.03], [-0.065, 0.02], [-0.065, -0.02], [0, -0.03]]

//        console.log((Math.sqrt((PlayersData.get(playername).actX-PlayersData.get(playername).prevX)**2+(PlayersData.get(playername).acty-PlayersData.get(playername).prevY)**2)*FPS)**2)
        if (Math.random() < (Math.sqrt((PlayersData.get(playername).actX-PlayersData.get(playername).prevX)**2+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)**2)*FPS)**3) {
        let maxdst =  0.161/2+0.066+0.04+0.161/2+0.066;
        let polydsttoprt = Math.random()*maxdst
        let _ = 0
        while (Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)< polydsttoprt){
            polydsttoprt-=Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2);
            _+=1;
        }
        let wtrptrcof = polydsttoprt/Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)
        let wtrprtx = poly[_%poly.length][0] +(poly[(_+1)%poly.length][0]-poly[_%poly.length][0])*wtrptrcof
        let wtrprty = poly[_%poly.length][1] +(poly[(_+1)%poly.length][1]-poly[_%poly.length][1])*wtrptrcof
        WtrParticles0.push(new WtrPrt0(PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin), PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)));
        }
//        [['m',0,0,50,datetime.datetime.now(),None,True,0],['m',0-0.1,0,50,datetime.datetime.now(),None,True,0]]
//        caninfo = {
//    'm':[12/Zoom,18/Zoom,6/Zoom,50,1000000*3,0.75,6,2,4,3],
//    'p':[5/Zoom,12/Zoom,2/Zoom,1,1000000*0.09,1,2,3,1,0],
//    't':[9/Zoom,20/Zoom,4/Zoom,25,1000000*2,1.25,4,1,3,2],
//    'h':[7/Zoom,14/Zoom,2/Zoom,5,1000000*0.5,1,3,1,2,1],
//    'f':[0/Zoom,0/Zoom,0/Zoom,1,1000000*0.09,1,3,3,1,0],

//PlayersData[player]['STR'] = f'{PlayersCosmetics[player]["VEHICLE"]},{player},{PlayersAccs[player]["money"]},{PlayersData[player]["TORPEDOS"]},{PlayersData[player]["SMOKES"]},'+str(PlayersData[player]['GAS']/25)+f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"]*1000)/1000},{int(PlayersData[player]["Y"]*1000)/1000},{PlayersData[player]["Z"]*2+int(PlayersData[player]["ONGROUND"])},'+str(int(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*100))+f',0{PlayersData[player]["CAN"][0][7]},0{PlayersData[player]["CAN"][1][7]}'
	    drawF(playername,poly=poly,cos=cos,sin=sin,cls = this.f)
	    drawCannon(playername,CN = 0, r = 7,turcrd = [0,0],firesize = 0.75,l = 18,shtSND = "hcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles0,bangPrt = BangPrt0,bangPrts = BangParticles0,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 2, bangCnt = 3 ,cos =cos,sin = sin,lw=[4,2])

    }else if (layer == 87  && PlayersData.get(playername).prevX!= null){
    DrawNickname(playername,PlayersData.get(playername).HP,30, (PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 +OffsetY  ,(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom+GameH/2 + OffsetY)
    }
},
drawp:function(layer, playername){
//    console.log(layer)

    if( layer==52){
        let sin = 0
        let cos = 0
        let sinc = 0
        let cosc = 0
        if ((PlayersData.get(playername).prevDIR < 360 && PlayersData.get(playername).prevDIR >270) && (PlayersData.get(playername).actDIR < 90 && PlayersData.get(playername).actDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else if((PlayersData.get(playername).actDIR < 360 && PlayersData.get(playername).actDIR >270) && (PlayersData.get(playername).prevDIR < 90 && PlayersData.get(playername).prevDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else{
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }
        //_0 = posScr(PlayersData[enemy]['COL'],PlayersData[player]['X'],PlayersData[player]['Y'],Zoom,PlayersInputs[player]["w"],PlayersInputs[player]["h"])
        let poly = [[0.075, 0], [0, 0.03], [-0.065, 0.02], [-0.065, -0.02], [0, -0.03]]
//        console.log((Math.sqrt((nX-X)**2+(nY-Y)**2)*FPS)**2)
        if (Math.random() < (Math.sqrt((nX-X)**2+(nY-Y)**2)*FPS)**3) {
        let maxdst = 0.161/2+0.066+0.04+0.161/2+0.066;
        let polydsttoprt = Math.random()*maxdst
        let _ = 0
        while (Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)< polydsttoprt){
            polydsttoprt-=Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2);
            _+=1;
        }
        let wtrptrcof = polydsttoprt/Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)
        let wtrprtx = poly[_%poly.length][0] +(poly[(_+1)%poly.length][0]-poly[_%poly.length][0])*wtrptrcof
        let wtrprty = poly[_%poly.length][1] +(poly[(_+1)%poly.length][1]-poly[_%poly.length][1])*wtrptrcof
        WtrParticles0.push(new WtrPrt0(X+(nX-X)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin), Y+(nY-Y)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)));
        }

	    PdrawF(playername,poly=poly,cos=cos,sin=sin,cls = this.f)
	    PdrawCannon(playername,CN = 0, r = 7,turcrd = [0,0],firesize = 0.75,l = 18,shtSND = "hcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles0,bangPrt = BangPrt0,bangPrts = BangParticles0,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 2, bangCnt = 3 ,cos =cos,sin = sin,lw=[4,2])

    }
},
updatep:function(playername,argarr){
     if (argarr.length > 0){
        if (!PlayersData.has(playername)){
            document.getElementById('TorInv').style.display = "";
            document.getElementById('SmkInv').style.display = "";
            document.getElementById('XmodInv').style.display = "";
            PlayersData.set(playername,
            {
                prevX : null,
                prevY : null,
                actX : null,
                actY : null,
                prevDIR : null,
                actDIR : null,
                COLOR:null,
                CNs:[{pDIR:null,DIR: null , STS: 0}]


            } )
        }

        PlayersData.get(playername).prevX = PlayersData.get(playername).actX
        PlayersData.get(playername).prevY = PlayersData.get(playername).actY
        PlayersData.get(playername).actX = Number(argarr[5])
        PlayersData.get(playername).actY = Number(argarr[6])
        PlayersData.get(playername).prevDIR = PlayersData.get(playername).actDIR
        PlayersData.get(playername).actDIR = Number(argarr[3])
        PlayersData.get(playername).CNs[0].STS = Number((argarr[9]).substring(0,1));
        PlayersData.get(playername).CNs[0].pDIR = PlayersData.get(playername).CNs[0].DIR
        PlayersData.get(playername).CNs[0].DIR = Number((argarr[9]).substring(1));
        PlayersData.get(playername).COLOR =Number( argarr[10])
        Z = Number(argarr[7])
        nX=PlayersData.get(playername).actX
        nY=PlayersData.get(playername).actY
        X=PlayersData.get(playername).prevX
        Y=PlayersData.get(playername).prevY
        hp.innerHTML = argarr[4] + '/30'
        tornum.innerText= argarr[0]
        smknum.innerText = argarr[1]
        gasnum.innerHTML = 'GAS: '+Number(argarr[2]*25)
        dirnum.innerHTML = 'DIR: '+argarr[3]
        spdnum.innerHTML = 'SPD: '+argarr[8];
        xnum.innerHTML = 'X: ' + Math.round(argarr[5]*100)/100;
        ynum.innerHTML = 'Y: ' + Math.round(argarr[6]*100)/100;
                if (Number( argarr[11]) == 1){
            document.getElementById('TorLoading').style.display = "block"
        }else{
        document.getElementById('TorLoading').style.display = "none"
        }
        if (Number( argarr[12]) == 1){
            document.getElementById('SmkLoading').style.display = "block"
        }else{
        document.getElementById('SmkLoading').style.display = "none"
        }
     }
//    PlayersData[playername] = {X:infarr[0].split(',')[1],}
    //PlayersData[player]['STR'] = f'{PlayersData[player]["TORPEDOS"]},{PlayersData[player]["SMOKES"]},'+str(PlayersData[player]['GAS']/25)+f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"]*1000)/1000},{int(PlayersData[player]["Y"]*1000)/1000},{PlayersData[player]["Z"]*2+int(PlayersData[player]["ONGROUND"])},'+str(int(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*100))+f',0{PlayersData[player]["CAN"][0][7]},0{PlayersData[player]["CAN"][1][7]}'

},
update:function(playername,argarr){
     if (argarr.length > 0){
        if (!PlayersData.has(playername)){
            PlayersData.set(playername,
            {
                prevX : null,
                prevY : null,
                actX : null,
                actY : null,
                prevDIR : null,
                actDIR : null,
                CN0STS:null,
                CN0DIR:null,
                CN0pDIR:null,
                CN1STS:null,
                CN1DIR:null,
                CN1pDIR:null,
                HP:null,
                Z:null,
                CNs:[{pDIR:null,DIR: null , STS: 0}]

            } )
        }
        PlayersData.get(playername).prevX = PlayersData.get(playername).actX
        PlayersData.get(playername).prevY = PlayersData.get(playername).actY
        PlayersData.get(playername).actX = Number(argarr[2])
        PlayersData.get(playername).actY = Number(argarr[3])
        PlayersData.get(playername).prevDIR = PlayersData.get(playername).actDIR
        PlayersData.get(playername).actDIR = Number(argarr[0])
        PlayersData.get(playername).CNs[0].STS = Number((argarr[5]).substring(0,1));
        PlayersData.get(playername).CNs[0].pDIR = PlayersData.get(playername).CNs[0].DIR
        PlayersData.get(playername).CNs[0].DIR = Number((argarr[5]).substring(1));
//        console.log(argarr)
        PlayersData.get(playername).Z = Number(argarr[4])
        PlayersData.get(playername).HP = Number(argarr[1])
        PlayersData.get(playername).COLOR =Number( argarr[6])
//        PlayersData[player]['STR'] = f'+,{str(int(PlayersData[enemy]["DIR"]))},{PlayersData[enemy]["HP"]},{int(PlayersData[enemy]["X"] * 1000) / 1000},{int(PlayersData[enemy]["Y"] * 1000) / 1000},{PlayersData[enemy]["Z"] * 2 + int(PlayersData[enemy]["ONGROUND"])},' + f',{PlayersData[enemy]["CAN"][0][8]}{PlayersData[enemy]["CAN"][0][7]},{PlayersData[enemy]["CAN"][1][8]}{PlayersData[enemy]["CAN"][1][7]},' + str(int(not (PlayersData[enemy]['STATUS'] == 'BURNING' or PlayersData[enemy]['STATUS'] == 'DEAD')) * PlayersCosmetics[enemy]['COLOR'])

     }
     }


},
4:{ //TODO
hp:2500,
views:1,
viewsIcons:[''],
f:{
        '0': '#131313',
        '1': '#2a200c',
        '2': '#122b0b',
        '3': '#10222b',
        '4': '#323232',
        '5': '#713567',
        '6':'#723636'},
draw:function(layer, playername){
//    console.log(playername)
    if( ((layer==52 && PlayersData.get(playername).CARRY==0) || (PlayersData.get(playername).CARRY>0 && layer==53)) && PlayersData.get(playername).prevX!= null){
    // console.log("????????????")
        let sin = 0
        let cos = 0
        let sinc = 0
        let cosc = 0
        if ((PlayersData.get(playername).prevDIR < 360 && PlayersData.get(playername).prevDIR >270) && (PlayersData.get(playername).actDIR < 90 && PlayersData.get(playername).actDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else if((PlayersData.get(playername).actDIR < 360 && PlayersData.get(playername).actDIR >270) && (PlayersData.get(playername).prevDIR < 90 && PlayersData.get(playername).prevDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else{
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }
        //_0 = posScr(PlayersData[enemy]['COL'],PlayersData[player]['X'],PlayersData[player]['Y'],Zoom,PlayersInputs[player]["w"],PlayersInputs[player]["h"])
        let poly = [[0.3, -0.03],[0.3, 0.03],[0.275, 0.03],[0.25, 0.055],[0.06, 0.055],[0.045, 0.08],[-0.045, 0.08],[-0.06, 0.055],[-0.25, 0.055],[-0.275, 0.03],[-0.3, 0.03],[-0.3, -0.03],[-0.275, -0.03],[-0.25, -0.055],[0.25, -0.055],[0.275, -0.03]]
//        console.log((Math.sqrt((PlayersData.get(playername).actX-PlayersData.get(playername).prevX)**2+(PlayersData.get(playername).acty-PlayersData.get(playername).prevY)**2)*FPS)**2)
        if (Math.random() < (Math.sqrt((PlayersData.get(playername).actX-PlayersData.get(playername).prevX)**2+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)**2)*FPS)**3) {
        let maxdst =  5;
        let polydsttoprt = Math.random()*maxdst
        let _ = 0
        while (Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)< polydsttoprt){
            polydsttoprt-=Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2);
            _+=1;
        }
        let wtrptrcof = polydsttoprt/Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)
        let wtrprtx = poly[_%poly.length][0] +(poly[(_+1)%poly.length][0]-poly[_%poly.length][0])*wtrptrcof
        let wtrprty = poly[_%poly.length][1] +(poly[(_+1)%poly.length][1]-poly[_%poly.length][1])*wtrptrcof
        WtrParticles0.push(new WtrPrt0(PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin), PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)));
        }
	    drawF(playername,poly=poly,cos=cos,sin=sin,cls = this.f)
	    poly = [[0.3, -0.03],[0.3, 0.03],[-0.3, 0.03],[-0.3, -0.03]]
		ctx.fillStyle =  MAPstatic.CT.os

//		ctx.fillStyle =  cls[PlayersData.get(playername).COLOR]
        ctx.beginPath();
        ctx.moveTo((PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 + OffsetX+(0*Zoom*cos) +(0.25*Zoom*sin),(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom + GameH/2 + OffsetY+(0*sin*Zoom)+(0.25*-cos*Zoom));
        ctx.lineTo((PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 + OffsetX+(0*Zoom*cos) +(-0.25*Zoom*sin),(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom + GameH/2 + OffsetY+(0*sin*Zoom)+(-0.25*-cos*Zoom));


        ctx.setLineDash([4.57/320*Zoom,4.57/320*Zoom])
        ctx.strokeStyle = "rgba(255,255,255,0.5)"
        ctx.stroke()
        ctx.closePath();
        ctx.setLineDash([])

        ctx.beginPath();
		ctx.fillStyle =  MAPstatic.CT.os
		if((PlayersData.get(playername).Z/2+"").substring(0,1) != (Xmod ? 1 : 0)){
			ctx.fillStyle = 'rgba(0,0,0,0)'
			ctx.strokeStyle = 'rgba(0,0,0,0)'
		}
		ctx.moveTo((PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 + OffsetX+(poly[0][1]*Zoom*cos) +(poly[0][0]*Zoom*sin),(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom + GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
        for (let _ = 1; _ < poly.length; _+=1) {
            ctx.lineTo((PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 + OffsetX+(poly[_][1]*cos*Zoom)+(poly[_][0]*Zoom*sin) ,(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom+GameH/2 + OffsetY+(poly[_][1]*sin*Zoom)+(poly[_][0]*-cos*Zoom));


        }
        ctx.lineTo((PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 + OffsetX+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom +GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
		ctx.closePath();
		ctx.lineWidth= 2/320*Zoom;
        ctx.fill();
	    drawCannon(playername,CN = 0, r = 7,turcrd = [0.025, 0.055],firesize = 0.75,l = 18,shtSND = "hcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles0,bangPrt = BangPrt0,bangPrts = BangParticles0,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 2, bangCnt = 3 ,cos =cos,sin = sin,lw=[4,2])
//	    ctx.lineJoin = 'miter';

        drawCannon(playername,CN = 1, r = 7,turcrd = [-0.025, 0.055],firesize = 0.75,l = 18,shtSND = "hcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles0,bangPrt = BangPrt0,bangPrts = BangParticles0,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 2, bangCnt = 3 ,cos =cos,sin = sin,lw=[4,2])



    }else if (layer == 87  && PlayersData.get(playername).prevX!= null){
    if (PlayersData.get(playername).CARRY>0){
        DrawNickname(playername+"["+"✈".repeat(PlayersData.get(playername).CARRY)+"]",PlayersData.get(playername).HP,2500, (PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 +OffsetY  ,(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom+GameH/2 + OffsetY)
    }else{
        DrawNickname(playername,PlayersData.get(playername).HP,2500, (PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 +OffsetY  ,(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom+GameH/2 + OffsetY)
    }
    }
},
drawp:function(layer, playername){
//    console.log(layer)

    if( layer==52){
        let sin = 0
        let cos = 0
        let sinc = 0
        let cosc = 0
        if ((PlayersData.get(playername).prevDIR < 360 && PlayersData.get(playername).prevDIR >270) && (PlayersData.get(playername).actDIR < 90 && PlayersData.get(playername).actDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else if((PlayersData.get(playername).actDIR < 360 && PlayersData.get(playername).actDIR >270) && (PlayersData.get(playername).prevDIR < 90 && PlayersData.get(playername).prevDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else{
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }
        //_0 = posScr(PlayersData[enemy]['COL'],PlayersData[player]['X'],PlayersData[player]['Y'],Zoom,PlayersInputs[player]["w"],PlayersInputs[player]["h"])
        let poly = [[0.3, -0.03],[0.3, 0.03],[0.275, 0.03],[0.25, 0.055],[0.06, 0.055],[0.045, 0.08],[-0.045, 0.08],[-0.06, 0.055],[-0.25, 0.055],[-0.275, 0.03],[-0.3, 0.03],[-0.3, -0.03],[-0.275, -0.03],[-0.25, -0.055],[0.25, -0.055],[0.275, -0.03]]
//        console.log((Math.sqrt((nX-X)**2+(nY-Y)**2)*FPS)**2)
        if (Math.random() < (Math.sqrt((nX-X)**2+(nY-Y)**2)*FPS)**3) {
        let maxdst =  5;
        let polydsttoprt = Math.random()*maxdst
        let _ = 0
        while (Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)< polydsttoprt){
            polydsttoprt-=Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2);
            _+=1;
        }
        let wtrptrcof = polydsttoprt/Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)
        let wtrprtx = poly[_%poly.length][0] +(poly[(_+1)%poly.length][0]-poly[_%poly.length][0])*wtrptrcof
        let wtrprty = poly[_%poly.length][1] +(poly[(_+1)%poly.length][1]-poly[_%poly.length][1])*wtrptrcof
        WtrParticles0.push(new WtrPrt0(X+(nX-X)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin), Y+(nY-Y)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)));
        }
	    PdrawF(playername,poly=poly,cos=cos,sin=sin,cls = this.f)
	    		ctx.beginPath();
	    poly = [[0.3, -0.03],[0.3, 0.03],[-0.3, 0.03],[-0.3, -0.03]]
		ctx.fillStyle =  MAPstatic.CT.os

//		ctx.fillStyle =  cls[PlayersData.get(playername).COLOR]
        ctx.beginPath();
        ctx.moveTo(GameW/2 + OffsetX+(0*Zoom*cos) +(0.25*Zoom*sin),GameH/2 + OffsetY+(0*sin*Zoom)+(0.25*-cos*Zoom));
        ctx.lineTo(GameW/2 + OffsetX+(0*cos*Zoom)+(-0.25*Zoom*sin) ,GameH/2 + OffsetY+(0*sin*Zoom)+(-0.25*-cos*Zoom));


        ctx.setLineDash([4.57/320*Zoom,4.57/320*Zoom])
        ctx.strokeStyle = "rgba(255,255,255,0.5)"
        ctx.stroke()
        ctx.closePath();
        ctx.setLineDash([])
        ctx.beginPath();
		ctx.moveTo(GameW/2 + OffsetX+(poly[0][1]*Zoom*cos) +(poly[0][0]*Zoom*sin),GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
        for (let _ = 1; _ < poly.length; _+=1) {
            ctx.lineTo(GameW/2 + OffsetX+(poly[_][1]*cos*Zoom)+(poly[_][0]*Zoom*sin) ,GameH/2 + OffsetY+(poly[_][1]*sin*Zoom)+(poly[_][0]*-cos*Zoom));


        }
        ctx.lineTo(GameW/2 + OffsetX+(poly[0][1]*cos*Zoom)+(poly[0][0]*Zoom*sin) ,GameH/2 + OffsetY+(poly[0][1]*sin*Zoom)+(poly[0][0]*-cos*Zoom));
		ctx.closePath();
		ctx.lineWidth= 2/320*Zoom;
        ctx.fill();
	    PdrawCannon(playername,CN = 0, r = 7,turcrd = [0.025, 0.055],firesize = 0.75,l = 18,shtSND = "hcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles0,bangPrt = BangPrt0,bangPrts = BangParticles0,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 2, bangCnt = 3 ,cos =cos,sin = sin,lw=[4,2])
//	    ctx.lineJoin = 'miter';

        PdrawCannon(playername,CN = 1, r = 7,turcrd = [-0.025, 0.055],firesize = 0.75,l = 18,shtSND = "hcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles0,bangPrt = BangPrt0,bangPrts = BangParticles0,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 2, bangCnt = 3 ,cos =cos,sin = sin,lw=[4,2])


    }
},
updatep:function(playername,argarr){
     if (argarr.length > 0){
        if (!PlayersData.has(playername)){
            document.getElementById('CarryInv').style.display = "";
            document.getElementById('CmodInv').style.display = "";
            document.getElementById('XmodInv').style.display = "";

            PlayersData.set(playername,
            {
                prevX : null,
                prevY : null,
                actX : null,
                actY : null,
                prevDIR : null,
                actDIR : null,
                COLOR:null,
                CNs:[{pDIR:null,DIR: null , STS: 0},{pDIR:null,DIR: null , STS: 0}]
            } )
        }
        PlayersData.get(playername).prevX = PlayersData.get(playername).actX
        PlayersData.get(playername).prevY = PlayersData.get(playername).actY
        PlayersData.get(playername).actX = Number(argarr[3])
        PlayersData.get(playername).actY = Number(argarr[4])
        PlayersData.get(playername).prevDIR = PlayersData.get(playername).actDIR
        PlayersData.get(playername).actDIR = Number(argarr[1])
        PlayersData.get(playername).CNs[0].pDIR = PlayersData.get(playername).CNs[0].DIR;
        PlayersData.get(playername).CNs[0].DIR = Number((argarr[7]).substring(1));
        PlayersData.get(playername).CNs[0].STS = Number((argarr[7]).substring(0,1));
        PlayersData.get(playername).CNs[1].pDIR = PlayersData.get(playername).CNs[1].DIR;
        PlayersData.get(playername).CNs[1].DIR = Number((argarr[8]).substring(1));
        PlayersData.get(playername).CNs[1].STS = Number((argarr[8]).substring(0,1));
        PlayersData.get(playername).COLOR =Number( argarr[9])
        Z = Number(argarr[5])
        nX=PlayersData.get(playername).actX
        nY=PlayersData.get(playername).actY
        X=PlayersData.get(playername).prevX
        Y=PlayersData.get(playername).prevY
        hp.innerHTML = argarr[2] + '/2500'
        carrynum.innerHTML =  argarr[10]

        gasnum.innerHTML = 'GAS: '+Number(argarr[0]*25)
        dirnum.innerHTML = 'DIR: '+argarr[1]
        spdnum.innerHTML = 'SPD: '+argarr[6];
        xnum.innerHTML = 'X: ' + Math.round(argarr[3]*100)/100;
        ynum.innerHTML = 'Y: ' + Math.round(argarr[4]*100)/100;
     }
//    PlayersData[playername] = {X:infarr[0].split(',')[1],}
    //PlayersData[player]['STR'] = f'{PlayersData[player]["TORPEDOS"]},{PlayersData[player]["SMOKES"]},'+str(PlayersData[player]['GAS']/25)+f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"]*1000)/1000},{int(PlayersData[player]["Y"]*1000)/1000},{PlayersData[player]["Z"]*2+int(PlayersData[player]["ONGROUND"])},'+str(int(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*100))+f',0{PlayersData[player]["CAN"][0][7]},0{PlayersData[player]["CAN"][1][7]}'

},
update:function(playername,argarr){
     if (argarr.length > 0){
        if (!PlayersData.has(playername)){
            PlayersData.set(playername,
            {
                prevX : null,
                prevY : null,
                actX : null,
                actY : null,
                prevDIR : null,
                actDIR : null,
                HP:null,
                Z:null,
                CARRY: 0,
                CNs:[{pDIR:null,DIR: null , STS: 0},{pDIR:null,DIR: null , STS: 0}]

            } )
        }
        PlayersData.get(playername).prevX = PlayersData.get(playername).actX
        PlayersData.get(playername).prevY = PlayersData.get(playername).actY
        PlayersData.get(playername).actX = Number(argarr[2])
        PlayersData.get(playername).actY = Number(argarr[3])
        PlayersData.get(playername).prevDIR = PlayersData.get(playername).actDIR
        PlayersData.get(playername).actDIR = Number(argarr[0])
        PlayersData.get(playername).Z = Number(argarr[4])
        PlayersData.get(playername).CNs[0].pDIR = PlayersData.get(playername).CNs[0].DIR;
        PlayersData.get(playername).CNs[0].DIR = Number((argarr[5]).substring(1));
        PlayersData.get(playername).CNs[0].STS = Number((argarr[5]).substring(0,1));
        PlayersData.get(playername).CNs[1].pDIR = PlayersData.get(playername).CNs[1].DIR;
        PlayersData.get(playername).CNs[1].DIR = Number((argarr[6]).substring(1));
        PlayersData.get(playername).CNs[1].STS = Number((argarr[6]).substring(0,1));
        PlayersData.get(playername).HP = Number(argarr[1])
        PlayersData.get(playername).CARRY = Number(argarr[8])
//        console.log(argarr[8])

        PlayersData.get(playername).COLOR =Number( argarr[7])
     }

}


},
1:{//TODO
hp:90,
views:1,
viewsIcons:[''],
f:{
        '0': '#131313',
        '1': '#2a200c',
        '2': '#122b0b',
        '3': '#10222b',
        '4': '#323232',
        '5': '#713567',
        '6':'#723636'},
draw:function(layer, playername){
    if( ((layer==52 && PlayersData.get(playername).Z == 0 ) || (layer==62 && PlayersData.get(playername).Z == 1)) && PlayersData.get(playername).prevX!= null){
        let sin = 0
        let cos = 0
        let sinc = 0
        let cosc = 0
        if ((PlayersData.get(playername).prevDIR < 360 && PlayersData.get(playername).prevDIR >270) && (PlayersData.get(playername).actDIR < 90 && PlayersData.get(playername).actDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else if((PlayersData.get(playername).actDIR < 360 && PlayersData.get(playername).actDIR >270) && (PlayersData.get(playername).prevDIR < 90 && PlayersData.get(playername).prevDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else{
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }
        //_0 = posScr(PlayersData[enemy]['COL'],PlayersData[player]['X'],PlayersData[player]['Y'],Zoom,PlayersInputs[player]["w"],PlayersInputs[player]["h"])
        let poly = [[0.06, 0.04], [-0.06, 0.04], [-0.06, -0.04], [0.06, -0.04]]

//        console.log((Math.sqrt((PlayersData.get(playername).actX-PlayersData.get(playername).prevX)**2+(PlayersData.get(playername).acty-PlayersData.get(playername).prevY)**2)*FPS)**2)
        if (PlayersData.get(playername).Z == 0  && Math.random() < (Math.sqrt((PlayersData.get(playername).actX-PlayersData.get(playername).prevX)**2+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)**2)*FPS)**3) {
        let maxdst =  (0.12+0.08)*2;
        let polydsttoprt = Math.random()*maxdst
        let _ = 0
        while (Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)< polydsttoprt){
            polydsttoprt-=Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2);
            _+=1;
        }
        let wtrptrcof = polydsttoprt/Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)
        let wtrprtx = poly[_%poly.length][0] +(poly[(_+1)%poly.length][0]-poly[_%poly.length][0])*wtrptrcof
        let wtrprty = poly[_%poly.length][1] +(poly[(_+1)%poly.length][1]-poly[_%poly.length][1])*wtrptrcof
        WtrParticles0.push(new WtrPrt0(PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin), PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)));
        }
	    drawF(playername,poly=poly,cos=cos,sin=sin,cls = this.f)
	    if (PlayersData.get(playername).Z == 0){
	    drawCannon(playername,CN = 0, r = 9,turcrd = [0.01,0],firesize = 0.5,l = 18,shtSND = "tcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles0,bangPrt = BangPrt0,bangPrts = BangParticles0,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 4, bangCnt = 4 ,cos =cos,sin = sin,lw=[6,4])
	    }else{
	    drawCannon(playername,CN = 0, r = 9,turcrd = [0.01,0],firesize = 0.5,l = 18,shtSND = "tcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles1,bangPrt = BangPrt0,bangPrts = BangParticles1,canbangPrt = CanPrt0,canbangPrts = CanBangParticles1, canbangCnt = 4, bangCnt = 4 ,cos =cos,sin = sin,lw=[6,4])
	    }



    }else if (layer == 87 && PlayersData.get(playername).prevX!= null){
    DrawNickname(playername,PlayersData.get(playername).HP,90, (PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 +OffsetY  ,(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom+GameH/2 + OffsetY)
    }
},
drawp:function(layer, playername){
//    console.log(layer)

    if( (layer==52 && Z == 0 ) || (layer==62 && Z == 1)){
        let sin = 0
        let cos = 0
        let sinc = 0
        let cosc = 0
        if ((PlayersData.get(playername).prevDIR < 360 && PlayersData.get(playername).prevDIR >270) && (PlayersData.get(playername).actDIR < 90 && PlayersData.get(playername).actDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else if((PlayersData.get(playername).actDIR < 360 && PlayersData.get(playername).actDIR >270) && (PlayersData.get(playername).prevDIR < 90 && PlayersData.get(playername).prevDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else{
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }
        //_0 = posScr(PlayersData[enemy]['COL'],PlayersData[player]['X'],PlayersData[player]['Y'],Zoom,PlayersInputs[player]["w"],PlayersInputs[player]["h"])
        let poly = [[0.06, 0.04], [-0.06, 0.04], [-0.06, -0.04], [0.06, -0.04]]
        //console.log((Math.sqrt((nX-X)**2+(nY-Y)**2)*FPS)**2)
        if ( Z ==0 && Math.random() < (Math.sqrt((nX-X)**2+(nY-Y)**2)*FPS)**3) {
        let maxdst = 0.4;
        let polydsttoprt = Math.random()*maxdst
        let _ = 0
        while (Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)< polydsttoprt){
            polydsttoprt-=Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2);
            _+=1;
        }
        let wtrptrcof = polydsttoprt/Math.sqrt((poly[_%poly.length][0]-poly[(_+1)%poly.length][0])**2+(poly[_%poly.length][1]-poly[(_+1)%poly.length][1])**2)
        let wtrprtx = poly[_%poly.length][0] +(poly[(_+1)%poly.length][0]-poly[_%poly.length][0])*wtrptrcof
        let wtrprty = poly[_%poly.length][1] +(poly[(_+1)%poly.length][1]-poly[_%poly.length][1])*wtrptrcof
        WtrParticles0.push(new WtrPrt0(X+(nX-X)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin), Y+(nY-Y)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)));
        }
        PdrawF(playername,poly=poly,cos=cos,sin=sin,cls = this.f)
	    if (PlayersData.get(playername).Z == 0){
	        PdrawCannon(playername,CN = 0, r = 9,turcrd = [0.01,0],firesize = 0.5,l = 18,shtSND = "tcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles0,bangPrt = BangPrt0,bangPrts = BangParticles0,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 4, bangCnt = 4 ,cos =cos,sin = sin,lw=[6,4])
	    }else{
	        PdrawCannon(playername,CN = 0, r = 9,turcrd = [0.01,0],firesize = 0.5,l = 18,shtSND = "tcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles1,bangPrt = BangPrt0,bangPrts = BangParticles1,canbangPrt = CanPrt0,canbangPrts = CanBangParticles1, canbangCnt = 4, bangCnt = 4 ,cos =cos,sin = sin,lw=[6,4])
	    }

    }
},
updatep:function(playername,argarr){
     if (argarr.length > 0){
        if (!PlayersData.has(playername)){
            document.getElementById('XmodInv').style.display = "";
            PlayersData.set(playername,
            {
                prevX : null,
                prevY : null,
                actX : null,
                actY : null,
                prevDIR : null,
                actDIR : null,
                COLOR:null,
                CNs:[{pDIR:null,DIR: null , STS: 0}]
            } )
        }

        PlayersData.get(playername).prevX = PlayersData.get(playername).actX
        PlayersData.get(playername).prevY = PlayersData.get(playername).actY
        PlayersData.get(playername).actX = Number(argarr[3])
        PlayersData.get(playername).actY = Number(argarr[4])
        PlayersData.get(playername).prevDIR = PlayersData.get(playername).actDIR
        PlayersData.get(playername).actDIR = Number(argarr[1])
        PlayersData.get(playername).CNs[0].STS = Number((argarr[7]).substring(0,1));
        PlayersData.get(playername).CNs[0].pDIR = PlayersData.get(playername).CNs[0].DIR
        PlayersData.get(playername).CNs[0].DIR = Number((argarr[7]).substring(1));
        PlayersData.get(playername).COLOR =Number( argarr[8])
        Z = Number(argarr[5])
        nX=PlayersData.get(playername).actX
        nY=PlayersData.get(playername).actY
        X=PlayersData.get(playername).prevX
        Y=PlayersData.get(playername).prevY
        hp.innerHTML = argarr[2] + '/90'

        gasnum.innerHTML = 'GAS: '+Number(argarr[0]*25)
        dirnum.innerHTML = 'DIR: '+argarr[1]
        spdnum.innerHTML = 'SPD: '+argarr[6];
        xnum.innerHTML = 'X: ' + Math.round(argarr[3]*100)/100;
        ynum.innerHTML = 'Y: ' + Math.round(argarr[4]*100)/100;

     }
},
update:function(playername,argarr){
     if (argarr.length > 0){
        if (!PlayersData.has(playername)){
            PlayersData.set(playername,
            {
                prevX : null,
                prevY : null,
                actX : null,
                actY : null,
                prevDIR : null,
                actDIR : null,
                HP:null,
                Z:null,
                CNs:[{pDIR:null,DIR: null , STS: 0}]

            } )
        }
        PlayersData.get(playername).prevX = PlayersData.get(playername).actX
        PlayersData.get(playername).prevY = PlayersData.get(playername).actY
        PlayersData.get(playername).actX = Number(argarr[2])
        PlayersData.get(playername).actY = Number(argarr[3])
        PlayersData.get(playername).Z = Number(argarr[4])
        PlayersData.get(playername).prevDIR = PlayersData.get(playername).actDIR
        PlayersData.get(playername).actDIR = Number(argarr[0])
        PlayersData.get(playername).CNs[0].STS = Number((argarr[5]).substring(0,1));
        PlayersData.get(playername).CNs[0].pDIR = PlayersData.get(playername).CNs[0].DIR
        PlayersData.get(playername).CNs[0].DIR = Number((argarr[5]).substring(1));
//        console.log(argarr)

        PlayersData.get(playername).HP = Number(argarr[1])
        PlayersData.get(playername).COLOR =Number( argarr[6])
//        PlayersData[player]['STR'] = f'+,{str(int(PlayersData[enemy]["DIR"]))},{PlayersData[enemy]["HP"]},{int(PlayersData[enemy]["X"] * 1000) / 1000},{int(PlayersData[enemy]["Y"] * 1000) / 1000},{PlayersData[enemy]["Z"] * 2 + int(PlayersData[enemy]["ONGROUND"])},' + f',{PlayersData[enemy]["CAN"][0][8]}{PlayersData[enemy]["CAN"][0][7]},{PlayersData[enemy]["CAN"][1][8]}{PlayersData[enemy]["CAN"][1][7]},' + str(int(not (PlayersData[enemy]['STATUS'] == 'BURNING' or PlayersData[enemy]['STATUS'] == 'DEAD')) * PlayersCosmetics[enemy]['COLOR'])

     }
     }


},
8:{ //TODO
hp:30,
views:1,
viewsIcons:[''],
f:{
        '0': '#131313',
        '1': '#2a200c',
        '2': '#122b0b',
        '3': '#10222b',
        '4': '#323232',
        '5': '#713567',
        '6':'#723636'},
draw:function(layer, playername){
    if( layer==72  && PlayersData.get(playername).prevX!= null){
        let sin = 0
        let cos = 0
        let sinc = 0
        let cosc = 0
        if ((PlayersData.get(playername).prevDIR < 360 && PlayersData.get(playername).prevDIR >270) && (PlayersData.get(playername).actDIR < 90 && PlayersData.get(playername).actDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else if((PlayersData.get(playername).actDIR < 360 && PlayersData.get(playername).actDIR >270) && (PlayersData.get(playername).prevDIR < 90 && PlayersData.get(playername).prevDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else{
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }
        //_0 = posScr(PlayersData[enemy]['COL'],PlayersData[player]['X'],PlayersData[player]['Y'],Zoom,PlayersInputs[player]["w"],PlayersInputs[player]["h"])
        let poly = [[0.02, 0.01],[0.02, -0.01],[0.01, -0.01],[0.01, -0.04],[-0.01, -0.04],[-0.01, -0.0075],[-0.03, -0.005],[-0.03, -0.02],[-0.04, -0.02],[-0.04, 0.02],[-0.03, 0.02],[-0.03, 0.005],[-0.01, 0.0075],[-0.01, 0.04],[0.01, 0.04],[0.01, 0.01]]

        drawF(playername,poly=poly,cos=cos,sin=sin,cls = this.f)
        let turcrd = [0,0]
        if (PlayersData.get(playername).CN0STS == 1){
        PIXI.sound.play('fcanon');
        PlayersData.get(playername).CN0STS = 0
        }

        if(!(PlayersData.get(playername).CN0STS  <2)){

                    if(Math.random()<1){
                        let a = Math.random()*Math.PI * 2;

                        FireParticles2.push(new FirePrt0(PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(turcrd[1]*cos)+(turcrd[0]*sin),PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(turcrd[1]*sin)+(turcrd[0]*-cos), 0.25));

                    }
        }



                        if (PlayersData.get(playername).CN0STS == 3){
                            for (let _ = 0; _ < 1; _++) {

                                BangParticles2.push(new BangPrt0(PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING +(turcrd[1]*cos)+(turcrd[0]*sin),PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING +(turcrd[1]*sin)+(turcrd[0]*-cos)))
                            }
                            PlayersData.get(playername).CN0STS = 2
                        }
                        ctx.strokeStyle = MAPstatic.CT.l1






    }else if (layer == 87 && PlayersData.get(playername).prevX!= null){
    DrawNickname(playername,PlayersData.get(playername).HP,30, (PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 +OffsetY  ,(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom+GameH/2 + OffsetY)
    }
},
drawp:function(layer, playername){
//    console.log(layer)

    if( layer==72){
        let sin = 0
        let cos = 0
        let sinc = 0
        let cosc = 0
        if ((PlayersData.get(playername).prevDIR < 360 && PlayersData.get(playername).prevDIR >270) && (PlayersData.get(playername).actDIR < 90 && PlayersData.get(playername).actDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else if((PlayersData.get(playername).actDIR < 360 && PlayersData.get(playername).actDIR >270) && (PlayersData.get(playername).prevDIR < 90 && PlayersData.get(playername).prevDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else{
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }
        //_0 = posScr(PlayersData[enemy]['COL'],PlayersData[player]['X'],PlayersData[player]['Y'],Zoom,PlayersInputs[player]["w"],PlayersInputs[player]["h"])
        let poly = [[0.02, 0.01],[0.02, -0.01],[0.01, -0.01],[0.01, -0.04],[-0.01, -0.04],[-0.01, -0.0075],[-0.03, -0.005],[-0.03, -0.02],[-0.04, -0.02],[-0.04, 0.02],[-0.03, 0.02],[-0.03, 0.005],[-0.01, 0.0075],[-0.01, 0.04],[0.01, 0.04],[0.01, 0.01]]

    PdrawF(playername,poly=poly,cos=cos,sin=sin,cls = this.f)
        let turcrd = [0,0]
        if (PlayersData.get(playername).CN0STS == 1){
        PIXI.sound.play('fcanon');
        PlayersData.get(playername).CN0STS = 0
        }
        if(!(PlayersData.get(playername).CN0STS  <2)){

                    if(Math.random()<1){
                        let a = Math.random()*Math.PI * 2;

                        FireParticles2.push(new FirePrt0(X+(nX-X)*(Date.now() - LastPING) / PING+(turcrd[1]*cos)+(turcrd[0]*sin), Y+(nY-Y)*(Date.now() - LastPING) / PING+(turcrd[1]*sin)+(turcrd[0]*-cos), 0.4));

                    }
        }



                        if (PlayersData.get(playername).CN0STS == 3){
                            for (let _ = 0; _ < 1; _++) {
                                BangParticles2.push(new BangPrt0(X+(nX-X)*(Date.now() - LastPING) / PING +(turcrd[1]*cos)+(turcrd[0]*sin),Y+(nY-Y)*(Date.now() - LastPING) / PING +(turcrd[1]*sin)+(turcrd[0]*-cos)))

                            }
                            PlayersData.get(playername).CN0STS = 2
                        }




    }
},
updatep:function(playername,argarr){
     if (argarr.length > 0){
        if (!PlayersData.has(playername)){
            document.getElementById('XmodInv').style.display = "";
            document.getElementById('AARocketInv').style.display = ''
            document.getElementById('TracerInv').style.display = ''
            PlayersData.set(playername,
            {
                prevX : null,
                prevY : null,
                actX : null,
                actY : null,
                prevDIR : null,
                actDIR : null,
                CN0STS:null,
                COLOR:null,
                lastTP1x: null,
                lastTP1y: null,
                lastTP2x: null,
                lastTP2y: null,
                TRACER:0

            } )
        }

        PlayersData.get(playername).prevX = PlayersData.get(playername).actX
        PlayersData.get(playername).prevY = PlayersData.get(playername).actY
        PlayersData.get(playername).actX = Number(argarr[3])
        PlayersData.get(playername).actY = Number(argarr[4])
        PlayersData.get(playername).prevDIR = PlayersData.get(playername).actDIR
        PlayersData.get(playername).actDIR = Number(argarr[1])
        PlayersData.get(playername).CN0STS = Number((argarr[7]));
        PlayersData.get(playername).COLOR = Number(argarr[8])
        PlayersData.get(playername).TRACER =Number( argarr[9])
        Z = Number(argarr[5])
        nX=PlayersData.get(playername).actX
        nY=PlayersData.get(playername).actY
        X=PlayersData.get(playername).prevX
        Y=PlayersData.get(playername).prevY
        hp.innerHTML = argarr[2] + '/30'

        gasnum.innerHTML = argarr[0]
//        console.log(argarr)
        dirnum.innerHTML = 'DIR: '+argarr[1]
        spdnum.innerHTML = 'SPD: '+argarr[6];
        xnum.innerHTML = 'X: ' + Math.round(argarr[3]*100)/100;
        ynum.innerHTML = 'Y: ' + Math.round(argarr[4]*100)/100;
        aarnum.innerText= argarr[10]
        if (Cmod ) {
                let sin = 0
                let cos = 0
                let sinc = 0
                let cosc = 0
                if ((PlayersData.get(playername).prevDIR < 360 && PlayersData.get(playername).prevDIR >270) && (PlayersData.get(playername).actDIR < 90 && PlayersData.get(playername).actDIR > -1)){
                    sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                    cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                }else if((PlayersData.get(playername).actDIR < 360 && PlayersData.get(playername).actDIR >270) && (PlayersData.get(playername).prevDIR < 90 && PlayersData.get(playername).prevDIR > -1)){
                    sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                    cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                }else{
                    sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                    cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                }
            let poly = [[0.02, 0.01],[0.02, -0.01],[0.01, -0.01],[0.01, -0.04],[-0.01, -0.04],[-0.01, -0.0075],[-0.03, -0.005],[-0.03, -0.02],[-0.04, -0.02],[-0.04, 0.02],[-0.03, 0.02],[-0.03, 0.005],[-0.01, 0.0075],[-0.01, 0.04],[0.01, 0.04],[0.01, 0.01]]
            if( PlayersData.get(playername).lastTP1x == null){
                let wtrprtx = poly[4][0]
                let wtrprty = poly[4][1]
                PlayersData.get(playername).lastTP1x = X+(nX-X)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin)
                PlayersData.get(playername).lastTP1y = Y+(nY-Y)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)
                TracerParticles1.push(new TrcrPrt1(PlayersData.get(playername).lastTP1x,PlayersData.get(playername).lastTP1y,PlayersData.get(playername).lastTP1x,PlayersData.get(playername).lastTP1y ,PlayersData.get(playername).TRACER));
                wtrprtx = poly[13][0]
                wtrprty = poly[13][1]
                PlayersData.get(playername).lastTP2x = X+(nX-X)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin)
                PlayersData.get(playername).lastTP2y = Y+(nY-Y)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)
                TracerParticles1.push(new TrcrPrt1(PlayersData.get(playername).lastTP2x,PlayersData.get(playername).lastTP2y,PlayersData.get(playername).lastTP2x,PlayersData.get(playername).lastTP2y,PlayersData.get(playername).TRACER));


            }else{
                let wtrprtx = poly[4][0]
                let wtrprty = poly[4][1]
                TracerParticles1.push(new TrcrPrt1(X+(nX-X)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin),Y+(nY-Y)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos),PlayersData.get(playername).lastTP1x,PlayersData.get(playername).lastTP1y ,PlayersData.get(playername).TRACER));
                PlayersData.get(playername).lastTP1x = X+(nX-X)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin)
                PlayersData.get(playername).lastTP1y = Y+(nY-Y)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)
                wtrprtx = poly[13][0]
                wtrprty = poly[13][1]
                TracerParticles1.push(new TrcrPrt1(X+(nX-X)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin),Y+(nY-Y)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos),PlayersData.get(playername).lastTP2x,PlayersData.get(playername).lastTP2y,PlayersData.get(playername).TRACER));
                PlayersData.get(playername).lastTP2x = X+(nX-X)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin)
                PlayersData.get(playername).lastTP2y = Y+(nY-Y)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)

            }

        }else{
            PlayersData.get(playername).lastTP1x = null
            PlayersData.get(playername).lastTP1y = null
            PlayersData.get(playername).lastTP2x = null
            PlayersData.get(playername).lastTP2y = null
        }

     }
//PlayersData[player]['STR'] = f'{PlayersCosmetics[player]["VEHICLE"]},{player},{PlayersAccs[player]["money"]},'+str(PlayersData[player]['GAS'])+f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"]*1000)/1000},{int(PlayersData[player]["Y"]*1000)/1000},{PlayersData[player]["Z"]*2+int(PlayersData[player]["ONGROUND"])},'+str(int(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*100))+f',{PlayersData[player]["CAN"][0][8]},'+ str(int(not (PlayersData[player]['STATUS'] == 'BURNING' or PlayersData[player]['STATUS'] == 'DEAD')) * PlayersCosmetics[player]['COLOR'])+','+str(PlayersInputs[player]['Cmod'])
},
update:function(playername,argarr){
     if (argarr.length > 0){
        if (!PlayersData.has(playername)){
            PlayersData.set(playername,
            {
                prevX : null,
                prevY : null,
                actX : null,
                actY : null,
                prevDIR : null,
                actDIR : null,
                CN0STS:null,
                HP:null,
                Z:null,
                lastTP1x: null,
                lastTP1y: null,
                lastTP2x: null,
                lastTP2y: null,
                TRACER:0

            } )
        }
        PlayersData.get(playername).prevX = PlayersData.get(playername).actX
        PlayersData.get(playername).prevY = PlayersData.get(playername).actY
        PlayersData.get(playername).actX = Number(argarr[2])
        PlayersData.get(playername).actY = Number(argarr[3])
        PlayersData.get(playername).prevDIR = PlayersData.get(playername).actDIR
        PlayersData.get(playername).actDIR = Number(argarr[0])
        PlayersData.get(playername).CN0STS = Number((argarr[5]));

        PlayersData.get(playername).Z = Number(argarr[4])
        PlayersData.get(playername).HP = Number(argarr[1])
        PlayersData.get(playername).COLOR =Number( argarr[6])
        PlayersData.get(playername).TRACER =Number( argarr[7])

        if (PlayersData.get(playername).TRACER != 0  ) {
                let sin = 0
                let cos = 0
                let sinc = 0
                let cosc = 0
                 if ((PlayersData.get(playername).prevDIR < 360 && PlayersData.get(playername).prevDIR >270) && (PlayersData.get(playername).actDIR < 90 && PlayersData.get(playername).actDIR > -1)){
                    sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                    cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                }else if((PlayersData.get(playername).actDIR < 360 && PlayersData.get(playername).actDIR >270) && (PlayersData.get(playername).prevDIR < 90 && PlayersData.get(playername).prevDIR > -1)){
                    sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                    cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                }else{
                    sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                    cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                }
            let poly = [[0.02, 0.01],[0.02, -0.01],[0.01, -0.01],[0.01, -0.04],[-0.01, -0.04],[-0.01, -0.0075],[-0.03, -0.005],[-0.03, -0.02],[-0.04, -0.02],[-0.04, 0.02],[-0.03, 0.02],[-0.03, 0.005],[-0.01, 0.0075],[-0.01, 0.04],[0.01, 0.04],[0.01, 0.01]]
            if( PlayersData.get(playername).lastTP1x == null){
                let wtrprtx = poly[4][0]
                let wtrprty = poly[4][1]
                PlayersData.get(playername).lastTP1x = PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin)
                PlayersData.get(playername).lastTP1y = PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)
                TracerParticles1.push(new TrcrPrt1(PlayersData.get(playername).lastTP1x,PlayersData.get(playername).lastTP1y,PlayersData.get(playername).lastTP1x,PlayersData.get(playername).lastTP1y ,PlayersData.get(playername).TRACER));
                wtrprtx = poly[13][0]
                wtrprty = poly[13][1]
                PlayersData.get(playername).lastTP2x = PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin)
                PlayersData.get(playername).lastTP2y = PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)
                TracerParticles1.push(new TrcrPrt1(PlayersData.get(playername).lastTP2x,PlayersData.get(playername).lastTP2y,PlayersData.get(playername).lastTP2x,PlayersData.get(playername).lastTP2y,PlayersData.get(playername).TRACER));


            }else{
                let wtrprtx = poly[4][0]
                let wtrprty = poly[4][1]
                TracerParticles1.push(new TrcrPrt1(PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin),PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos),PlayersData.get(playername).lastTP1x,PlayersData.get(playername).lastTP1y ,PlayersData.get(playername).TRACER));
                PlayersData.get(playername).lastTP1x = PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin)
                PlayersData.get(playername).lastTP1y = PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)
                wtrprtx = poly[13][0]
                wtrprty = poly[13][1]
                TracerParticles1.push(new TrcrPrt1(PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin),PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos),PlayersData.get(playername).lastTP2x,PlayersData.get(playername).lastTP2y,PlayersData.get(playername).TRACER));
                PlayersData.get(playername).lastTP2x = PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin)
                PlayersData.get(playername).lastTP2y = PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)

            }

        }else{
            PlayersData.get(playername).lastTP1x = null
            PlayersData.get(playername).lastTP1y = null
            PlayersData.get(playername).lastTP2x = null
            PlayersData.get(playername).lastTP2y = null
        }
     }
     }


},
3:{//TODO
hp:1000,
views:1,
viewsIcons:[''],
f:{
        '228': '#bbb26e'},
draw:function(layer, playername){
    if( layer==73 && PlayersData.get(playername).prevX!= null){
//    console.log("????????????")
        let sin = 0
        let cos = 0
        let sinc = 0
        let cosc = 0
        if ((PlayersData.get(playername).prevDIR < 360 && PlayersData.get(playername).prevDIR >270) && (PlayersData.get(playername).actDIR < 90 && PlayersData.get(playername).actDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else if((PlayersData.get(playername).actDIR < 360 && PlayersData.get(playername).actDIR >270) && (PlayersData.get(playername).prevDIR < 90 && PlayersData.get(playername).prevDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else{
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }
        //_0 = posScr(PlayersData[enemy]['COL'],PlayersData[player]['X'],PlayersData[player]['Y'],Zoom,PlayersInputs[player]["w"],PlayersInputs[player]["h"])
        let poly = [[-0.3, 0],[-0.325, 0.055],[-0.2, 0.04],[0, 0.06],[0.225, 0.06],[0.275, 0.04],[0.3, 0],[0.275, -0.04],[0.225, -0.06],[0, -0.06],[-0.2, -0.04],[-0.325, -0.055]]
		if(PlayersData.get(playername).COLOR  == 0){
            for (let _ = 0; _ < 1; _++) {
//                let hx = Math.random()*0.5-0.25
//                let hy = Math.random()*0.06-0.03
                let turcrd =[Math.random()*0.5-0.25,Math.random()*0.06-0.03]
                FireParticles2.push(new FirePrt0(PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(turcrd[1]*cos)+(turcrd[0]*sin),PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(turcrd[1]*sin)+(turcrd[0]*-cos),1));


            }
		}

            drawF(playername,poly=poly,cos=cos,sin=sin,cls = this.f)
	        drawCannon(playername,CN = 0, r = 5,turcrd = [-0.2, 0],firesize = 0.75,l = 14,shtSND = "pcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles2,bangPrt = BangPrt0,bangPrts = BangParticles2,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 0, bangCnt = 5 ,cos =cos,sin = sin,lw=[2,1],fire = false,underbody = true)
            drawCannon(playername,CN = 1, r = 5,turcrd = [0.265,0],firesize = 0.75,l = 14,shtSND = "pcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles2,bangPrt = BangPrt0,bangPrts = BangParticles2,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 0, bangCnt = 5 ,cos =cos,sin = sin,lw=[2,1],fire = false,underbody = true)


    }else if (layer == 87 && PlayersData.get(playername).prevX!= null){
    if (PlayersData.get(playername).CARRY>0){
        DrawNickname(playername+"["+"✈".repeat(PlayersData.get(playername).CARRY)+"]",PlayersData.get(playername).HP,1000, (PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 +OffsetY  ,(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom+GameH/2 + OffsetY)
    }else{
        DrawNickname(playername,PlayersData.get(playername).HP,1000, (PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 +OffsetY  ,(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom+GameH/2 + OffsetY)
    }
    }
},
drawp:function(layer, playername){
//    console.log(layer)

    if( layer==72){
        let sin = 0
        let cos = 0
        let sinc = 0
        let cosc = 0

        if ((PlayersData.get(playername).prevDIR < 360 && PlayersData.get(playername).prevDIR >270) && (PlayersData.get(playername).actDIR < 90 && PlayersData.get(playername).actDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else if((PlayersData.get(playername).actDIR < 360 && PlayersData.get(playername).actDIR >270) && (PlayersData.get(playername).prevDIR < 90 && PlayersData.get(playername).prevDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else{
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }
        let poly = [[-0.3, 0],[-0.325, 0.055],[-0.2, 0.04],[0, 0.06],[0.225, 0.06],[0.275, 0.04],[0.3, 0],[0.275, -0.04],[0.225, -0.06],[0, -0.06],[-0.2, -0.04],[-0.325, -0.055]]
		ctx.beginPath();
		if(PlayersData.get(playername).COLOR  == 0){

            for (let _ = 0; _ < 1; _++) {
//                let hx = Math.random()*0.5-0.25
//                let hy = Math.random()*0.06-0.03
                let turcrd =[Math.random()*0.5-0.25,Math.random()*0.06-0.03]
                FireParticles2.push(new FirePrt0(X+(nX-X)*(Date.now() - LastPING) / PING+(turcrd[1]*cos)+(turcrd[0]*sin), Y+(nY-Y)*(Date.now() - LastPING) / PING+(turcrd[1]*sin)+(turcrd[0]*-cos),1));


            }

		}
        PdrawF(playername,poly=poly,cos=cos,sin=sin,cls = this.f)
	    PdrawCannon(playername,CN = 0, r = 5,turcrd = [-0.2, 0],firesize = 0.75,l = 14,shtSND = "pcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles2,bangPrt = BangPrt0,bangPrts = BangParticles2,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 0, bangCnt = 5 ,cos =cos,sin = sin,lw=[2,1],fire = false,underbody = true)
        PdrawCannon(playername,CN = 1, r = 5,turcrd = [0.265,0],firesize = 0.75,l = 14,shtSND = "pcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles2,bangPrt = BangPrt0,bangPrts = BangParticles2,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 0, bangCnt = 5 ,cos =cos,sin = sin,lw=[2,1],fire = false,underbody = true)
//	    drawCannon(playername,CN = 0, r = 5,turcrd = [-0.2, 0],firesize = 0.75,l = 14,shtSND = "pcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles2,bangPrt = BangPrt0,bangPrts = BangParticles2,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 0, bangCnt = 5 ,cos =cos,sin = sin,lw=[2,1],fire = false)
//        drawCannon(playername,CN = 1, r = 5,turcrd = [0.265,0],firesize = 0.75,l = 14,shtSND = "pcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles2,bangPrt = BangPrt0,bangPrts = BangParticles2,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 0, bangCnt = 5 ,cos =cos,sin = sin,lw=[2,1],fire = false)
    }
},
updatep:function(playername,argarr){
     if (argarr.length > 0){
        if (!PlayersData.has(playername)){
            document.getElementById('CarryInv').style.display = "";
            document.getElementById('CmodInv').style.display = "";
            document.getElementById('XmodInv').style.display = "";
            PlayersData.set(playername,
            {
                prevX : null,
                prevY : null,
                actX : null,
                actY : null,
                prevDIR : null,
                actDIR : null,
                COLOR:null,
                CNs:[{pDIR:null,DIR: null , STS: 0},{pDIR:null,DIR: null , STS: 0}]

            } )
        }
//                console.log("!!!!!!!!!!!!!!!")
//        console.log(argarr)
        PlayersData.get(playername).prevX = PlayersData.get(playername).actX
        PlayersData.get(playername).prevY = PlayersData.get(playername).actY
        PlayersData.get(playername).actX = Number(argarr[3])
        PlayersData.get(playername).actY = Number(argarr[4])
        PlayersData.get(playername).prevDIR = PlayersData.get(playername).actDIR
        PlayersData.get(playername).actDIR = Number(argarr[1])
        PlayersData.get(playername).COLOR =Number( argarr[9])
        PlayersData.get(playername).CNs[0].pDIR = PlayersData.get(playername).CNs[0].DIR;
        PlayersData.get(playername).CNs[0].DIR = Number((argarr[7]).substring(1));
        PlayersData.get(playername).CNs[0].STS = Number((argarr[7]).substring(0,1));
        PlayersData.get(playername).CNs[1].pDIR = PlayersData.get(playername).CNs[1].DIR;
        PlayersData.get(playername).CNs[1].DIR = Number((argarr[8]).substring(1));
        PlayersData.get(playername).CNs[1].STS = Number((argarr[8]).substring(0,1));
        carrynum.innerHTML =  argarr[10]
        Z = Number(argarr[5])
        nX=PlayersData.get(playername).actX
        nY=PlayersData.get(playername).actY
        X=PlayersData.get(playername).prevX
        Y=PlayersData.get(playername).prevY
        hp.innerHTML = argarr[2] + '/1000'

        gasnum.innerHTML = 'GAS: '+Number(argarr[0]*25)
        dirnum.innerHTML = 'DIR: '+argarr[1]
        spdnum.innerHTML = 'SPD: '+argarr[6];
        xnum.innerHTML = 'X: ' + Math.round(argarr[3]*100)/100;
        ynum.innerHTML = 'Y: ' + Math.round(argarr[4]*100)/100;
     }
//    PlayersData[playername] = {X:infarr[0].split(',')[1],}
    //PlayersData[player]['STR'] = f'{PlayersData[player]["TORPEDOS"]},{PlayersData[player]["SMOKES"]},'+str(PlayersData[player]['GAS']/25)+f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"]*1000)/1000},{int(PlayersData[player]["Y"]*1000)/1000},{PlayersData[player]["Z"]*2+int(PlayersData[player]["ONGROUND"])},'+str(int(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*100))+f',0{PlayersData[player]["CAN"][0][7]},0{PlayersData[player]["CAN"][1][7]}'

},
update:function(playername,argarr){
     if (argarr.length > 0){
        if (!PlayersData.has(playername)){
            PlayersData.set(playername,
            {
                prevX : null,
                prevY : null,
                actX : null,
                actY : null,
                prevDIR : null,
                actDIR : null,
                HP:null,
                Z:null,
                CARRY: 0,
                CNs:[{pDIR:null,DIR: null , STS: 0},{pDIR:null,DIR: null , STS: 0}]
            } )
        }
        PlayersData.get(playername).CARRY = Number(argarr[8])
        PlayersData.get(playername).prevX = PlayersData.get(playername).actX
        PlayersData.get(playername).prevY = PlayersData.get(playername).actY
        PlayersData.get(playername).actX = Number(argarr[2])
        PlayersData.get(playername).actY = Number(argarr[3])
        PlayersData.get(playername).prevDIR = PlayersData.get(playername).actDIR
        PlayersData.get(playername).actDIR = Number(argarr[0])
        PlayersData.get(playername).Z = Number(argarr[4])
        PlayersData.get(playername).CNs[0].pDIR = PlayersData.get(playername).CNs[0].DIR;
        PlayersData.get(playername).CNs[0].DIR = Number((argarr[5]).substring(1));
        PlayersData.get(playername).CNs[0].STS = Number((argarr[5]).substring(0,1));
        PlayersData.get(playername).CNs[1].pDIR = PlayersData.get(playername).CNs[1].DIR
        PlayersData.get(playername).CNs[1].DIR = Number((argarr[6]).substring(1));
        PlayersData.get(playername).CNs[1].STS = Number((argarr[6]).substring(0,1));
        PlayersData.get(playername).HP = Number(argarr[1])

        PlayersData.get(playername).COLOR =Number( argarr[7])

     }

}


},
5:{ //TODO
hp:40,
views:2,
viewsIcons:['./static/HELMinv.svg','./static/SCOPEinv.svg'],
f:{
        '0': '#131313',
        '1': '#2a200c',
        '2': '#122b0b',
        '3': '#10222b',
        '4': '#323232',
        '5': '#713567',
        '6':'#723636'},
draw:function(layer, playername){
    if( layer==72  && PlayersData.get(playername).prevX!= null){
        let sin = 0
        let cos = 0
        let sinc = 0
        let cosc = 0
        if ((PlayersData.get(playername).prevDIR < 360 && PlayersData.get(playername).prevDIR >270) && (PlayersData.get(playername).actDIR < 90 && PlayersData.get(playername).actDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else if((PlayersData.get(playername).actDIR < 360 && PlayersData.get(playername).actDIR >270) && (PlayersData.get(playername).prevDIR < 90 && PlayersData.get(playername).prevDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else{
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }
        //_0 = posScr(PlayersData[enemy]['COL'],PlayersData[player]['X'],PlayersData[player]['Y'],Zoom,PlayersInputs[player]["w"],PlayersInputs[player]["h"])
        let poly = [[0.02, 0.011],[0.02, -0.011],[0.01, -0.011],[0.01, -0.05],[-0.015, -0.05],[-0.015, -0.011],[-0.025, -0.011],[-0.05, -0.007],[-0.05, -0.02],[-0.065, -0.02],[-0.065, 0.02],[-0.05, 0.02],[-0.05, 0.006],[-0.025, 0.011],[-0.015, 0.011],[-0.015, 0.05],[0.01, 0.05],[0.01, 0.011]]

        drawF(playername,poly=poly,cos=cos,sin=sin,cls = this.f)
        drawCannon(playername,CN = 0, r = 3,turcrd = [-0.025, 0],firesize = 0.25,l = 6,shtSND = "pcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles2,bangPrt = BangPrt0,bangPrts = BangParticles2,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 0, bangCnt = 5 ,cos =cos,sin = sin,lw=[1,1],fire = false,underbody = false, fill = false, strokeW = 1)
        if (PlayersData.get(playername).CN0STS == 1){
        PIXI.sound.play('fcanon');
        PlayersData.get(playername).CN0STS = 0
        }

        if(!(PlayersData.get(playername).CN0STS  <2)){

                    if(Math.random()<1){
                        let a = Math.random()*Math.PI * 2;

                        FireParticles2.push(new FirePrt0(PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(turcrd[1]*cos)+(turcrd[0]*sin),PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(turcrd[1]*sin)+(turcrd[0]*-cos), 0.25));

                    }
        }



                        if (PlayersData.get(playername).CN0STS == 3){
                            for (let _ = 0; _ < 1; _++) {

                                BangParticles2.push(new BangPrt0(PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING +(turcrd[1]*cos)+(turcrd[0]*sin),PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING +(turcrd[1]*sin)+(turcrd[0]*-cos)))
                            }
                            PlayersData.get(playername).CN0STS = 2
                        }
                        ctx.strokeStyle = MAPstatic.CT.l1






    }else if (layer == 87 && PlayersData.get(playername).prevX!= null){
    DrawNickname(playername,PlayersData.get(playername).HP,40, (PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*Zoom +GameW/2 +OffsetY  ,(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*Zoom+GameH/2 + OffsetY)
    }
},
drawp:function(layer, playername){
//    console.log(layer)

    if( layer==72){
        let sin = 0
        let cos = 0
        let sinc = 0
        let cosc = 0
        if ((PlayersData.get(playername).prevDIR < 360 && PlayersData.get(playername).prevDIR >270) && (PlayersData.get(playername).actDIR < 90 && PlayersData.get(playername).actDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else if((PlayersData.get(playername).actDIR < 360 && PlayersData.get(playername).actDIR >270) && (PlayersData.get(playername).prevDIR < 90 && PlayersData.get(playername).prevDIR > -1)){
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }else{
            sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
            cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.25)'
        ctx.lineWidth = 10/320*Zoom;
        ctx.beginPath()

        ctx.arc(GameW/2 + OffsetX+(sin*Zoom)*((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).speed-PlayersData.get(playername).prevSpeed)+PlayersData.get(playername).prevSpeed)/75) ,GameH/2 + OffsetY+(-cos*Zoom)*((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).speed-PlayersData.get(playername).prevSpeed)+PlayersData.get(playername).prevSpeed)/75), (((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).speed-PlayersData.get(playername).prevSpeed)+PlayersData.get(playername).prevSpeed)/100*Zoom/5,0,2*Math.PI)
        ctx.closePath()
        ctx.stroke()
        //_0 = posScr(PlayersData[enemy]['COL'],PlayersData[player]['X'],PlayersData[player]['Y'],Zoom,PlayersInputs[player]["w"],PlayersInputs[player]["h"])
        let poly = [[0.02, 0.011],[0.02, -0.011],[0.01, -0.011],[0.01, -0.05],[-0.015, -0.05],[-0.015, -0.011],[-0.025, -0.011],[-0.05, -0.007],[-0.05, -0.02],[-0.065, -0.02],[-0.065, 0.02],[-0.05, 0.02],[-0.05, 0.006],[-0.025, 0.011],[-0.015, 0.011],[-0.015, 0.05],[0.01, 0.05],[0.01, 0.011]]

        PdrawF(playername,poly=poly,cos=cos,sin=sin,cls = this.f)

        PdrawCannon(playername,CN = 0, r = 3,turcrd = [-0.025, 0],firesize = 0.25,l = 6,shtSND = "pcanon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles2,bangPrt = BangPrt0,bangPrts = BangParticles2,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 0, bangCnt = 5 ,cos =cos,sin = sin,lw=[1,1],fire = false,underbody = false, fill = false, strokeW = 1)

        if (PlayersData.get(playername).CN0STS == 1){
        PIXI.sound.play('pcanon');
        PlayersData.get(playername).CN0STS = 0
        }
        if(!(PlayersData.get(playername).CN0STS  <2)){

                    if(Math.random()<1){
                        let a = Math.random()*Math.PI * 2;

                        FireParticles2.push(new FirePrt0(X+(nX-X)*(Date.now() - LastPING) / PING+(turcrd[1]*cos)+(turcrd[0]*sin), Y+(nY-Y)*(Date.now() - LastPING) / PING+(turcrd[1]*sin)+(turcrd[0]*-cos), 0.4));

                    }
        }



                        if (PlayersData.get(playername).CN0STS == 3){
                            for (let _ = 0; _ < 1; _++) {
                                BangParticles2.push(new BangPrt0(X+(nX-X)*(Date.now() - LastPING) / PING +(turcrd[1]*cos)+(turcrd[0]*sin),Y+(nY-Y)*(Date.now() - LastPING) / PING +(turcrd[1]*sin)+(turcrd[0]*-cos)))

                            }
                            PlayersData.get(playername).CN0STS = 2
                        }




    }
},
updatep:function(playername,argarr){
     if (argarr.length > 0){
        if (!PlayersData.has(playername)){
            document.getElementById('XmodInv').style.display = "";
            document.getElementById('AARocketInv').style.display = ''
            document.getElementById('TracerInv').style.display = ''
            document.getElementById('ViewInv').style.display = ''
            document.getElementById('BombInv').style.display = ''
            PlayersData.set(playername,
            {
                prevX : null,
                prevY : null,
                actX : null,
                actY : null,
                prevDIR : null,
                actDIR : null,
                CN0STS:null,
                COLOR:null,
                lastTP1x: null,
                lastTP1y: null,
                lastTP2x: null,
                lastTP2y: null,
                TRACER:0,
                CNs:[{pDIR:null,DIR: null , STS: 0}],
                prevSpeed:0,
                speed:0

            } )
        }

        PlayersData.get(playername).prevX = PlayersData.get(playername).actX
        PlayersData.get(playername).prevY = PlayersData.get(playername).actY
        PlayersData.get(playername).actX = Number(argarr[3])
        PlayersData.get(playername).actY = Number(argarr[4])
        PlayersData.get(playername).prevDIR = PlayersData.get(playername).actDIR
        PlayersData.get(playername).actDIR = Number(argarr[1])
        PlayersData.get(playername).CN0STS = Number((argarr[7]));
        PlayersData.get(playername).COLOR = Number(argarr[8])
        PlayersData.get(playername).TRACER =Number( argarr[9])
        Z = Number(argarr[5])
        PlayersData.get(playername).CNs[0].pDIR = PlayersData.get(playername).CNs[0].DIR;
        PlayersData.get(playername).CNs[0].DIR = Number((argarr[11]).substring(1));
        PlayersData.get(playername).CNs[0].STS = Number((argarr[11]).substring(0,1));
        nX=PlayersData.get(playername).actX
        nY=PlayersData.get(playername).actY
        X=PlayersData.get(playername).prevX
        Y=PlayersData.get(playername).prevY
        hp.innerHTML = argarr[2] + '/40'
        PlayersData.get(playername).prevSpeed = PlayersData.get(playername).speed
        PlayersData.get(playername).speed = Number(argarr[6])
        gasnum.innerHTML = argarr[0]
//        console.log(argarr)
        dirnum.innerHTML = 'DIR: '+argarr[1]
        spdnum.innerHTML = 'SPD: '+Math.round(Number(argarr[6]));
        xnum.innerHTML = 'X: ' + Math.round(argarr[3]*100)/100;
        ynum.innerHTML = 'Y: ' + Math.round(argarr[4]*100)/100;
        aarnum.innerText= argarr[10]
        if (Cmod ) {
                let sin = 0
                let cos = 0
                let sinc = 0
                let cosc = 0
                if ((PlayersData.get(playername).prevDIR < 360 && PlayersData.get(playername).prevDIR >270) && (PlayersData.get(playername).actDIR < 90 && PlayersData.get(playername).actDIR > -1)){
                    sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                    cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                }else if((PlayersData.get(playername).actDIR < 360 && PlayersData.get(playername).actDIR >270) && (PlayersData.get(playername).prevDIR < 90 && PlayersData.get(playername).prevDIR > -1)){
                    sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                    cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                }else{
                    sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                    cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                }
            let poly = [[0.02, 0.011],[0.02, -0.011],[0.01, -0.011],[0.01, -0.05],[-0.015, -0.05],[-0.015, -0.011],[-0.025, -0.011],[-0.05, -0.007],[-0.05, -0.02],[-0.065, -0.02],[-0.065, 0.02],[-0.05, 0.02],[-0.05, 0.006],[-0.025, 0.011],[-0.015, 0.011],[-0.015, 0.05],[0.01, 0.05],[0.01, 0.011]]
            if( PlayersData.get(playername).lastTP1x == null){
                let wtrprtx = poly[4][0]
                let wtrprty = poly[4][1]
                PlayersData.get(playername).lastTP1x = X+(nX-X)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin)
                PlayersData.get(playername).lastTP1y = Y+(nY-Y)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)
                TracerParticles1.push(new TrcrPrt1(PlayersData.get(playername).lastTP1x,PlayersData.get(playername).lastTP1y,PlayersData.get(playername).lastTP1x,PlayersData.get(playername).lastTP1y ,PlayersData.get(playername).TRACER));
                wtrprtx = poly[15][0]
                wtrprty = poly[15][1]
                PlayersData.get(playername).lastTP2x = X+(nX-X)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin)
                PlayersData.get(playername).lastTP2y = Y+(nY-Y)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)
                TracerParticles1.push(new TrcrPrt1(PlayersData.get(playername).lastTP2x,PlayersData.get(playername).lastTP2y,PlayersData.get(playername).lastTP2x,PlayersData.get(playername).lastTP2y,PlayersData.get(playername).TRACER));


            }else{
                let wtrprtx = poly[4][0]
                let wtrprty = poly[4][1]
                TracerParticles1.push(new TrcrPrt1(X+(nX-X)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin),Y+(nY-Y)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos),PlayersData.get(playername).lastTP1x,PlayersData.get(playername).lastTP1y ,PlayersData.get(playername).TRACER));
                PlayersData.get(playername).lastTP1x = X+(nX-X)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin)
                PlayersData.get(playername).lastTP1y = Y+(nY-Y)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)
                wtrprtx = poly[15][0]
                wtrprty = poly[15][1]
                TracerParticles1.push(new TrcrPrt1(X+(nX-X)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin),Y+(nY-Y)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos),PlayersData.get(playername).lastTP2x,PlayersData.get(playername).lastTP2y,PlayersData.get(playername).TRACER));
                PlayersData.get(playername).lastTP2x = X+(nX-X)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin)
                PlayersData.get(playername).lastTP2y = Y+(nY-Y)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)

            }

        }else{
            PlayersData.get(playername).lastTP1x = null
            PlayersData.get(playername).lastTP1y = null
            PlayersData.get(playername).lastTP2x = null
            PlayersData.get(playername).lastTP2y = null
        }

     }
//PlayersData[player]['STR'] = f'{PlayersCosmetics[player]["VEHICLE"]},{player},{PlayersAccs[player]["money"]},'+str(PlayersData[player]['GAS'])+f',{str(int(PlayersData[player]["DIR"]))},{PlayersData[player]["HP"]},{int(PlayersData[player]["X"]*1000)/1000},{int(PlayersData[player]["Y"]*1000)/1000},{PlayersData[player]["Z"]*2+int(PlayersData[player]["ONGROUND"])},'+str(int(PlayersData[player]['SPEED']/vehicleinfo[PlayersCosmetics[player]['VEHICLE']]['GROUNDSPEED']*100))+f',{PlayersData[player]["CAN"][0][8]},'+ str(int(not (PlayersData[player]['STATUS'] == 'BURNING' or PlayersData[player]['STATUS'] == 'DEAD')) * PlayersCosmetics[player]['COLOR'])+','+str(PlayersInputs[player]['Cmod'])
},
update:function(playername,argarr){
     if (argarr.length > 0){
        if (!PlayersData.has(playername)){
            PlayersData.set(playername,
            {
                prevX : null,
                prevY : null,
                actX : null,
                actY : null,
                prevDIR : null,
                actDIR : null,
                CN0STS:null,
                HP:null,
                Z:null,
                lastTP1x: null,
                lastTP1y: null,
                lastTP2x: null,
                lastTP2y: null,
                TRACER:0,
                CNs:[{pDIR:null,DIR: null , STS: 0}]


            } )
        }
        PlayersData.get(playername).prevX = PlayersData.get(playername).actX
        PlayersData.get(playername).prevY = PlayersData.get(playername).actY
        PlayersData.get(playername).actX = Number(argarr[2])
        PlayersData.get(playername).actY = Number(argarr[3])
        PlayersData.get(playername).prevDIR = PlayersData.get(playername).actDIR
        PlayersData.get(playername).actDIR = Number(argarr[0])
        PlayersData.get(playername).CN0STS = Number((argarr[5]));
        PlayersData.get(playername).CNs[0].pDIR = PlayersData.get(playername).CNs[0].DIR;
        PlayersData.get(playername).CNs[0].DIR = Number((argarr[8]).substring(1));
        PlayersData.get(playername).CNs[0].STS = Number((argarr[8]).substring(0,1));
        PlayersData.get(playername).Z = Number(argarr[4])
        PlayersData.get(playername).HP = Number(argarr[1])
        PlayersData.get(playername).COLOR =Number( argarr[6])
        PlayersData.get(playername).TRACER =Number( argarr[7])

        if (PlayersData.get(playername).TRACER != 0  ) {
                let sin = 0
                let cos = 0
                let sinc = 0
                let cosc = 0
                 if ((PlayersData.get(playername).prevDIR < 360 && PlayersData.get(playername).prevDIR >270) && (PlayersData.get(playername).actDIR < 90 && PlayersData.get(playername).actDIR > -1)){
                    sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                    cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR+360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                }else if((PlayersData.get(playername).actDIR < 360 && PlayersData.get(playername).actDIR >270) && (PlayersData.get(playername).prevDIR < 90 && PlayersData.get(playername).prevDIR > -1)){
                    sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                    cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR-360)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                }else{
                    sin = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                    cos = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).actDIR-PlayersData.get(playername).prevDIR)+PlayersData.get(playername).prevDIR+90)/180*Math.PI)
                }
            let poly = [[0.02, 0.011],[0.02, -0.011],[0.01, -0.011],[0.01, -0.05],[-0.015, -0.05],[-0.015, -0.011],[-0.025, -0.011],[-0.05, -0.007],[-0.05, -0.02],[-0.065, -0.02],[-0.065, 0.02],[-0.05, 0.02],[-0.05, 0.006],[-0.025, 0.011],[-0.015, 0.011],[-0.015, 0.05],[0.01, 0.05],[0.01, 0.011]]
            if( PlayersData.get(playername).lastTP1x == null){
                let wtrprtx = poly[4][0]
                let wtrprty = poly[4][1]
                PlayersData.get(playername).lastTP1x = PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin)
                PlayersData.get(playername).lastTP1y = PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)
                TracerParticles1.push(new TrcrPrt1(PlayersData.get(playername).lastTP1x,PlayersData.get(playername).lastTP1y,PlayersData.get(playername).lastTP1x,PlayersData.get(playername).lastTP1y ,PlayersData.get(playername).TRACER));
                wtrprtx = poly[15][0]
                wtrprty = poly[15][1]
                PlayersData.get(playername).lastTP2x = PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin)
                PlayersData.get(playername).lastTP2y = PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)
                TracerParticles1.push(new TrcrPrt1(PlayersData.get(playername).lastTP2x,PlayersData.get(playername).lastTP2y,PlayersData.get(playername).lastTP2x,PlayersData.get(playername).lastTP2y,PlayersData.get(playername).TRACER));


            }else{
                let wtrprtx = poly[4][0]
                let wtrprty = poly[4][1]
                TracerParticles1.push(new TrcrPrt1(PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin),PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos),PlayersData.get(playername).lastTP1x,PlayersData.get(playername).lastTP1y ,PlayersData.get(playername).TRACER));
                PlayersData.get(playername).lastTP1x = PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin)
                PlayersData.get(playername).lastTP1y = PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)
                wtrprtx = poly[15][0]
                wtrprty = poly[15][1]
                TracerParticles1.push(new TrcrPrt1(PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin),PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos),PlayersData.get(playername).lastTP2x,PlayersData.get(playername).lastTP2y,PlayersData.get(playername).TRACER));
                PlayersData.get(playername).lastTP2x = PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(wtrprty*cos)+(wtrprtx*sin)
                PlayersData.get(playername).lastTP2y = PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(wtrprty*sin)+(wtrprtx*-cos)

            }

        }else{
            PlayersData.get(playername).lastTP1x = null
            PlayersData.get(playername).lastTP1y = null
            PlayersData.get(playername).lastTP2x = null
            PlayersData.get(playername).lastTP2y = null
        }
     }
     }


}
}
