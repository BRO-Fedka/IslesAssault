function drawCannon(playername,CN = 0, r = 10,turcrd = [0,0],firesize = 1,l = 20,shtSND = "mcannon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles0,
bangPrt = BangPrt0,bangPrts = BangParticles0,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 5, bangCnt = 5 ,cos =0 , sin =0, lw = [5,3], fire = true, underbody = false){
    if(PlayersData.get(playername).CNs[CN].STS  <2){
        ctx.fillStyle = MAPstatic.CT.o0;
        ctx.strokeStyle = MAPstatic.CT.o0;
    }else{
        ctx.fillStyle = MAPstatic.CT.o1
        ctx.strokeStyle = MAPstatic.CT.o1
        if(fire){
            let a = Math.random()*Math.PI * 2;

            firePrts.push(new firePrt(PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING+(turcrd[1]*cos)+(turcrd[0]*sin),PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING+(turcrd[1]*sin)+(turcrd[0]*-cos),firesize));

        }
    }
    if(((PlayersData.get(playername).Z/2+"").substring(0,1) != (Xmod ? 1 : 0)) || underbody){
                ctx.fillStyle = 'rgba(0,0,0,0.2)'
                ctx.strokeStyle = 'rgba(0,0,0,0.2)'
    }
    ctx.lineWidth= 2;
    ctx.lineJoin = 'miter';
    ctx.beginPath()
    ctx.arc((PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*320+window.innerWidth/2 + OffsetX+(turcrd[1]*cos*320)+(turcrd[0]*320*sin) ,(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*320+window.innerHeight/2 + OffsetY+(turcrd[1]*sin*320)+(turcrd[0]*-cos*320),r,0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = 'rgba(0,0,0,0.25)';
    ctx.stroke();
    sinc = 0
    cosc = 0
    if ((PlayersData.get(playername).CNs[CN].pDIR < 360 && PlayersData.get(playername).CNs[CN].pDIR >270) && (PlayersData.get(playername).CNs[CN].DIR < 90 && PlayersData.get(playername).CNs[CN].DIR > -1)){
        sinc = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).CNs[CN].DIR-PlayersData.get(playername).CNs[CN].pDIR+360)+PlayersData.get(playername).CNs[CN].pDIR)/180*Math.PI)
        cosc = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).CNs[CN].DIR-PlayersData.get(playername).CNs[CN].pDIR+360)+PlayersData.get(playername).CNs[CN].pDIR)/180*Math.PI)
    }else if((PlayersData.get(playername).CNs[CN].DIR < 360 && PlayersData.get(playername).CNs[CN].DIR >270) && (PlayersData.get(playername).CNs[CN].pDIR < 90 && PlayersData.get(playername).CNs[CN].pDIR > -1)){
        sinc = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).CNs[CN].DIR-PlayersData.get(playername).CNs[CN].pDIR-360)+PlayersData.get(playername).CNs[CN].pDIR)/180*Math.PI)
        cosc = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).CNs[CN].DIR-PlayersData.get(playername).CNs[CN].pDIR-360)+PlayersData.get(playername).CNs[CN].pDIR)/180*Math.PI)
    }else{
        sinc = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).CNs[CN].DIR-PlayersData.get(playername).CNs[CN].pDIR)+PlayersData.get(playername).CNs[CN].pDIR)/180*Math.PI)
        cosc = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).CNs[CN].DIR-PlayersData.get(playername).CNs[CN].pDIR)+PlayersData.get(playername).CNs[CN].pDIR)/180*Math.PI)
    }
    ctx.beginPath()
    ctx.moveTo((PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*320+window.innerWidth/2 + OffsetX +(turcrd[1]*cos*320)+(turcrd[0]*320*sin),(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*320+window.innerHeight/2+(turcrd[1]*sin*320)+(turcrd[0]*-cos*320) + OffsetY);
    ctx.lineTo((PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*320+window.innerWidth/2 + OffsetX+(turcrd[1]*cos*320)+(turcrd[0]*320*sin) + cosc*l,(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*320+window.innerHeight/2 + OffsetY+(turcrd[1]*sin*320)+(turcrd[0]*-cos*320) + sinc*l);
    ctx.closePath()
    if(PlayersData.get(playername).CNs[CN].STS <2){
        ctx.strokeStyle = MAPstatic.CT.l0
        if (PlayersData.get(playername).CNs[CN].STS == 1){
            for (let _ = 0; _ < canbangCnt; _++) {
                canbangPrts.push(new canbangPrt(PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING +(turcrd[1]*cos)+(turcrd[0]*sin) + cosc*l/320,PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING +(turcrd[1]*sin)+(turcrd[0]*-cos) + sinc*l/320))
            }
           PIXI.sound.play(shtSND);
           PlayersData.get(playername).CNs[CN].STS = 0
        }
    }else{
        if (PlayersData.get(playername).CNs[CN].STS == 3){
            PIXI.sound.play(bngSND);
            for (let _ = 0; _ < bangCnt; _++) {
                bangPrts.push(new bangPrt(PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX)*(Date.now() - LastPING) / PING +(turcrd[1]*cos)+(turcrd[0]*sin),PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY)*(Date.now() - LastPING) / PING +(turcrd[1]*sin)+(turcrd[0]*-cos)))
            }
            PlayersData.get(playername).CNs[CN].STS = 2
        }
        ctx.strokeStyle = MAPstatic.CT.l1
    }
    if(((PlayersData.get(playername).Z/2+"").substring(0,1) != (Xmod ? 1 : 0))|| underbody){
			ctx.fillStyle = 'rgba(0,0,0,0.2)'
			ctx.strokeStyle = 'rgba(0,0,0,0.2)'
		}
        ctx.lineCap = 'square';
        ctx.lineWidth = lw[0];
        ctx.stroke();

        if(PlayersData.get(playername).CNs[CN].STS <2){
                        ctx.strokeStyle = MAPstatic.CT.o0;
        }else{
                        ctx.strokeStyle = MAPstatic.CT.o1
        }
        if(((PlayersData.get(playername).Z/2+"").substring(0,1) != (Xmod ? 1 : 0))|| underbody){
			ctx.fillStyle = 'rgba(0,0,0,0.2)'
			ctx.strokeStyle = 'rgba(0,0,0,0.2)'
		}
        ctx.lineWidth = lw[1];
        ctx.stroke();
}
function PdrawCannon(playername,CN = 0, r = 10,turcrd = [0,0],firesize = 1,l = 20,shtSND = "mcannon",bngSND = "bang",firePrt = FirePrt0,firePrts = FireParticles0,
bangPrt = BangPrt0,bangPrts = BangParticles0,canbangPrt = CanPrt0,canbangPrts = CanBangParticles0, canbangCnt = 5, bangCnt = 5 ,cos =0 , sin =0, lw = [5,3], fire = true, underbody = false){
	    ctx.lineJoin = 'miter';
        ctx.beginPath()
        if(PlayersData.get(playername).CNs[CN].STS  <2){
                    ctx.fillStyle = MAPstatic.CT.o0;
                    ctx.strokeStyle = MAPstatic.CT.o0;
        }else{
                    ctx.fillStyle = MAPstatic.CT.o1
                    ctx.strokeStyle = MAPstatic.CT.o1
                    if(fire){
                        let a = Math.random()*Math.PI * 2;

                        firePrts.push(new firePrt(X+(nX-X)*(Date.now() - LastPING) / PING+(turcrd[1]*cos)+(turcrd[0]*sin), Y+(nY-Y)*(Date.now() - LastPING) / PING+(turcrd[1]*sin)+(turcrd[0]*-cos),0.75));

                    }
        }
        if(underbody){
                    ctx.fillStyle = 'rgba(0,0,0,0.2)'
                    ctx.strokeStyle = 'rgba(0,0,0,0.2)'
        }
        ctx.lineWidth= 2;
        ctx.arc(window.innerWidth/2 + OffsetX+(turcrd[1]*cos*320)+(turcrd[0]*320*sin) ,window.innerHeight/2 + OffsetY+(turcrd[1]*sin*320)+(turcrd[0]*-cos*320),r,0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = 'rgba(0,0,0,0.25)';
        ctx.stroke();
        sinc = 0
        cosc = 0

        if ((PlayersData.get(playername).CNs[CN].pDIR < 360 && PlayersData.get(playername).CNs[CN].pDIR >270) && (PlayersData.get(playername).CNs[CN].DIR < 90 && PlayersData.get(playername).CNs[CN].DIR > -1)){
            sinc = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).CNs[CN].DIR-PlayersData.get(playername).CNs[CN].pDIR+360)+PlayersData.get(playername).CNs[CN].pDIR)/180*Math.PI)
            cosc = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).CNs[CN].DIR-PlayersData.get(playername).CNs[CN].pDIR+360)+PlayersData.get(playername).CNs[CN].pDIR)/180*Math.PI)
        }else if((PlayersData.get(playername).CNs[CN].DIR < 360 && PlayersData.get(playername).CNs[CN].DIR >270) && (PlayersData.get(playername).CNs[CN].pDIR < 90 && PlayersData.get(playername).CNs[CN].pDIR > -1)){
            sinc = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).CNs[CN].DIR-PlayersData.get(playername).CNs[CN].pDIR-360)+PlayersData.get(playername).CNs[CN].pDIR)/180*Math.PI)
            cosc = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).CNs[CN].DIR-PlayersData.get(playername).CNs[CN].pDIR-360)+PlayersData.get(playername).CNs[CN].pDIR)/180*Math.PI)
        }else{
            sinc = Math.sin((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).CNs[CN].DIR-PlayersData.get(playername).CNs[CN].pDIR)+PlayersData.get(playername).CNs[CN].pDIR)/180*Math.PI)
            cosc = Math.cos((((Date.now() - LastPING)/ PING)*(PlayersData.get(playername).CNs[CN].DIR-PlayersData.get(playername).CNs[CN].pDIR)+PlayersData.get(playername).CNs[CN].pDIR)/180*Math.PI)
        }
        ctx.beginPath()

        ctx.moveTo(window.innerWidth/2 + OffsetX +(turcrd[1]*cos*320)+(turcrd[0]*320*sin),window.innerHeight/2+(turcrd[1]*sin*320)+(turcrd[0]*-cos*320) + OffsetY);
        ctx.lineTo(window.innerWidth/2 + OffsetX+(turcrd[1]*cos*320)+(turcrd[0]*320*sin) + cosc*l,window.innerHeight/2 + OffsetY+(turcrd[1]*sin*320)+(turcrd[0]*-cos*320) + sinc*l);


        ctx.closePath()
        if(PlayersData.get(playername).CNs[CN].STS <2){
                        ctx.strokeStyle = MAPstatic.CT.l0
                        if (PlayersData.get(playername).CNs[CN].STS == 1){
                            for (let _ = 0; _ < canbangCnt; _++) {
                                canbangPrts.push(new canbangPrt(X+(nX-X)*(Date.now() - LastPING) / PING +(turcrd[1]*cos)+(turcrd[0]*sin) + cosc*20/320,Y+(nY-Y)*(Date.now() - LastPING) / PING +(turcrd[1]*sin)+(turcrd[0]*-cos) + sinc*20/320))
                            }


                                    PIXI.sound.play(shtSND);


                            PlayersData.get(playername).CNs[CN].STS = 0
                        }

        }else{
                        if (PlayersData.get(playername).CNs[CN].STS == 3){
                            PIXI.sound.play(bngSND);
                            for (let _ = 0; _ < 5; _++) {
                                bangPrts.push(new bangPrt(X+(nX-X)*(Date.now() - LastPING) / PING +(turcrd[1]*cos)+(turcrd[0]*sin),Y+(nY-Y)*(Date.now() - LastPING) / PING +(turcrd[1]*sin)+(turcrd[0]*-cos)))

                            }
                            PlayersData.get(playername).CNs[CN].STS = 2
                        }
                        ctx.strokeStyle = MAPstatic.CT.l1

        }
        if(underbody){
                    ctx.fillStyle = 'rgba(0,0,0,0.2)'
                    ctx.strokeStyle = 'rgba(0,0,0,0.2)'
        }
        ctx.lineCap = 'square';
        ctx.lineWidth = lw[0];
        ctx.stroke();

        if(PlayersData.get(playername).CNs[CN].STS <2){
                        ctx.strokeStyle = MAPstatic.CT.o0;
        }else{
                        ctx.strokeStyle = MAPstatic.CT.o1
        }
        //t
        ctx.lineWidth = lw[1];
        if(underbody){
                    ctx.fillStyle = 'rgba(0,0,0,0.2)'
                    ctx.strokeStyle = 'rgba(0,0,0,0.2)'
        }
        ctx.stroke();
}
function drawF(playername,poly=[[0,0],[0,0]],cos=0,sin=0, cls ={}){
		ctx.beginPath();
		ctx.fillStyle =  cls[PlayersData.get(playername).COLOR]
		ctx.strokeStyle = "rgba(0,0,0,0.5)"
		if((PlayersData.get(playername).Z/2+"").substring(0,1) != (Xmod ? 1 : 0)){
			ctx.fillStyle = 'rgba(0,0,0,0.2)'
			ctx.strokeStyle = 'rgba(0,0,0,0.2)'
		}
		ctx.moveTo((PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*320 +window.innerWidth/2 + OffsetX+(poly[0][1]*320*cos) +(poly[0][0]*320*sin),(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*320 + window.innerHeight/2 + OffsetY+(poly[0][1]*sin*320)+(poly[0][0]*-cos*320));
        for (let _ = 1; _ < poly.length; _+=1) {
            ctx.lineTo((PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*320 +window.innerWidth/2 + OffsetX+(poly[_][1]*cos*320)+(poly[_][0]*320*sin) ,(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*320+window.innerHeight/2 + OffsetY+(poly[_][1]*sin*320)+(poly[_][0]*-cos*320));


        }
        ctx.lineTo((PlayersData.get(playername).actX+(PlayersData.get(playername).actX-PlayersData.get(playername).prevX-nX+X)*(Date.now() - LastPING) / PING-X)*320 +window.innerWidth/2 + OffsetX+(poly[0][1]*cos*320)+(poly[0][0]*320*sin) ,(PlayersData.get(playername).actY+(PlayersData.get(playername).actY-PlayersData.get(playername).prevY-nY+Y)*(Date.now() - LastPING) / PING-Y)*320 +window.innerHeight/2 + OffsetY+(poly[0][1]*sin*320)+(poly[0][0]*-cos*320));
		ctx.closePath();
		ctx.lineWidth= 2;
        ctx.fill();
	    ctx.stroke();
}
function PdrawF(playername,poly=[[0,0],[0,0]],cos=0,sin=0, cls ={}){
		ctx.beginPath();

		ctx.fillStyle =  cls[PlayersData.get(playername).COLOR]
		ctx.strokeStyle = "rgba(0,0,0,0.5)"
		ctx.moveTo(window.innerWidth/2 + OffsetX+(poly[0][1]*320*cos) +(poly[0][0]*320*sin),window.innerHeight/2 + OffsetY+(poly[0][1]*sin*320)+(poly[0][0]*-cos*320));
        for (let _ = 1; _ < poly.length; _+=1) {
            ctx.lineTo(window.innerWidth/2 + OffsetX+(poly[_][1]*cos*320)+(poly[_][0]*320*sin) ,window.innerHeight/2 + OffsetY+(poly[_][1]*sin*320)+(poly[_][0]*-cos*320));


        }
        ctx.lineTo(window.innerWidth/2 + OffsetX+(poly[0][1]*cos*320)+(poly[0][0]*320*sin) ,window.innerHeight/2 + OffsetY+(poly[0][1]*sin*320)+(poly[0][0]*-cos*320));
		ctx.closePath();
		ctx.lineWidth= 2;
        ctx.fill();
	    ctx.stroke();
}