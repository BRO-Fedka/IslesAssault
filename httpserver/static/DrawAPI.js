function drawCannon(a,t=0,e=10,s=[0,0],o=1,r=20,l="mcannon",P="bang",c=FirePrt0,i=FireParticles0,D=BangPrt0,n=BangParticles0,y=CanPrt0,g=CanBangParticles0,h=5,I=5,m=0,N=0,f=[5,3],x=!0,C=!1,G=!0,M=2){if(PlayersData.get(a).CNs[t].STS<2?(ctx.fillStyle=MAPstatic.CT.o0,ctx.strokeStyle=MAPstatic.CT.o0):(ctx.fillStyle=MAPstatic.CT.o1,ctx.strokeStyle=MAPstatic.CT.o1,x&&(Math.random(),Math.PI,i.push(new c(PlayersData.get(a).actX+(PlayersData.get(a).actX-PlayersData.get(a).prevX)*(Date.now()-LastPING)/PING+s[1]*m+s[0]*N,PlayersData.get(a).actY+(PlayersData.get(a).actY-PlayersData.get(a).prevY)*(Date.now()-LastPING)/PING+s[1]*N+s[0]*-m,o)))),(PlayersData.get(a).Z/2+"").substring(0,1)==(Xmod?1:0)&&!C||(ctx.fillStyle="rgba(0,0,0,0.2)",ctx.strokeStyle="rgba(0,0,0,0.2)"),ctx.lineWidth=M/320*Zoom,ctx.lineJoin="miter",ctx.beginPath(),ctx.arc((PlayersData.get(a).actX+(PlayersData.get(a).actX-PlayersData.get(a).prevX-nX+X)*(Date.now()-LastPING)/PING-X)*Zoom+GameW/2+OffsetX+s[1]*m*Zoom+s[0]*Zoom*N,(PlayersData.get(a).actY+(PlayersData.get(a).actY-PlayersData.get(a).prevY-nY+Y)*(Date.now()-LastPING)/PING-Y)*Zoom+GameH/2+OffsetY+s[1]*N*Zoom+s[0]*-m*Zoom,e/320*Zoom,0,2*Math.PI),ctx.closePath(),G&&ctx.fill(),ctx.stroke(),(PlayersData.get(a).Z/2+"").substring(0,1)!=(Xmod?1:0)||C||(ctx.strokeStyle=MAPstatic.CT.os,ctx.stroke()),sinc=0,cosc=0,cosc=PlayersData.get(a).CNs[t].pDIR<360&&270<PlayersData.get(a).CNs[t].pDIR&&PlayersData.get(a).CNs[t].DIR<90&&-1<PlayersData.get(a).CNs[t].DIR?(sinc=Math.sin(((Date.now()-LastPING)/PING*(PlayersData.get(a).CNs[t].DIR-PlayersData.get(a).CNs[t].pDIR+360)+PlayersData.get(a).CNs[t].pDIR)/180*Math.PI),Math.cos(((Date.now()-LastPING)/PING*(PlayersData.get(a).CNs[t].DIR-PlayersData.get(a).CNs[t].pDIR+360)+PlayersData.get(a).CNs[t].pDIR)/180*Math.PI)):PlayersData.get(a).CNs[t].DIR<360&&270<PlayersData.get(a).CNs[t].DIR&&PlayersData.get(a).CNs[t].pDIR<90&&-1<PlayersData.get(a).CNs[t].pDIR?(sinc=Math.sin(((Date.now()-LastPING)/PING*(PlayersData.get(a).CNs[t].DIR-PlayersData.get(a).CNs[t].pDIR-360)+PlayersData.get(a).CNs[t].pDIR)/180*Math.PI),Math.cos(((Date.now()-LastPING)/PING*(PlayersData.get(a).CNs[t].DIR-PlayersData.get(a).CNs[t].pDIR-360)+PlayersData.get(a).CNs[t].pDIR)/180*Math.PI)):(sinc=Math.sin(((Date.now()-LastPING)/PING*(PlayersData.get(a).CNs[t].DIR-PlayersData.get(a).CNs[t].pDIR)+PlayersData.get(a).CNs[t].pDIR)/180*Math.PI),Math.cos(((Date.now()-LastPING)/PING*(PlayersData.get(a).CNs[t].DIR-PlayersData.get(a).CNs[t].pDIR)+PlayersData.get(a).CNs[t].pDIR)/180*Math.PI)),ctx.beginPath(),ctx.moveTo((PlayersData.get(a).actX+(PlayersData.get(a).actX-PlayersData.get(a).prevX-nX+X)*(Date.now()-LastPING)/PING-X)*Zoom+GameW/2+OffsetX+s[1]*m*Zoom+s[0]*Zoom*N,(PlayersData.get(a).actY+(PlayersData.get(a).actY-PlayersData.get(a).prevY-nY+Y)*(Date.now()-LastPING)/PING-Y)*Zoom+GameH/2+s[1]*N*Zoom+s[0]*-m*Zoom+OffsetY),ctx.lineTo((PlayersData.get(a).actX+(PlayersData.get(a).actX-PlayersData.get(a).prevX-nX+X)*(Date.now()-LastPING)/PING-X)*Zoom+GameW/2+OffsetX+s[1]*m*Zoom+s[0]*Zoom*N+cosc*r/320*Zoom,(PlayersData.get(a).actY+(PlayersData.get(a).actY-PlayersData.get(a).prevY-nY+Y)*(Date.now()-LastPING)/PING-Y)*Zoom+GameH/2+OffsetY+s[1]*N*Zoom+s[0]*-m*Zoom+sinc*r/320*Zoom),ctx.closePath(),PlayersData.get(a).CNs[t].STS<2){if(ctx.strokeStyle=MAPstatic.CT.l0,1==PlayersData.get(a).CNs[t].STS){for(let t=0;t<h;t++)g.push(new y(PlayersData.get(a).actX+(PlayersData.get(a).actX-PlayersData.get(a).prevX)*(Date.now()-LastPING)/PING+s[1]*m+s[0]*N+cosc*r/320,PlayersData.get(a).actY+(PlayersData.get(a).actY-PlayersData.get(a).prevY)*(Date.now()-LastPING)/PING+s[1]*N+s[0]*-m+sinc*r/320));PIXI.sound.play(l),PlayersData.get(a).CNs[t].STS=0}}else{if(3==PlayersData.get(a).CNs[t].STS){PIXI.sound.play(P);for(let t=0;t<I;t++)n.push(new D(PlayersData.get(a).actX+(PlayersData.get(a).actX-PlayersData.get(a).prevX)*(Date.now()-LastPING)/PING+s[1]*m+s[0]*N,PlayersData.get(a).actY+(PlayersData.get(a).actY-PlayersData.get(a).prevY)*(Date.now()-LastPING)/PING+s[1]*N+s[0]*-m));PlayersData.get(a).CNs[t].STS=2}ctx.strokeStyle=MAPstatic.CT.l1}(PlayersData.get(a).Z/2+"").substring(0,1)==(Xmod?1:0)&&!C||(ctx.fillStyle="rgba(0,0,0,0.2)",ctx.strokeStyle="rgba(0,0,0,0.2)"),ctx.lineCap="square",ctx.lineWidth=f[0]/320*Zoom,ctx.stroke(),PlayersData.get(a).CNs[t].STS<2?ctx.strokeStyle=MAPstatic.CT.o0:ctx.strokeStyle=MAPstatic.CT.o1,(PlayersData.get(a).Z/2+"").substring(0,1)==(Xmod?1:0)&&!C||(ctx.fillStyle="rgba(0,0,0,0.2)",ctx.strokeStyle="rgba(0,0,0,0.2)"),ctx.lineWidth=f[1]/320*Zoom,ctx.stroke()}function PdrawCannon(t,a=0,e=10,s=[0,0],o=1,r=20,l="mcannon",P="bang",c=FirePrt0,i=FireParticles0,D=BangPrt0,n=BangParticles0,y=CanPrt0,g=CanBangParticles0,h=5,I,m=0,N=0,f=[5,3],x=!0,C=!1,G=!0,M=2){if(ctx.lineJoin="miter",ctx.beginPath(),PlayersData.get(t).CNs[a].STS<2?(ctx.fillStyle=MAPstatic.CT.o0,ctx.strokeStyle=MAPstatic.CT.o0):(ctx.fillStyle=MAPstatic.CT.o1,ctx.strokeStyle=MAPstatic.CT.o1,x&&(Math.random(),Math.PI,i.push(new c(X+(nX-X)*(Date.now()-LastPING)/PING+s[1]*m+s[0]*N,Y+(nY-Y)*(Date.now()-LastPING)/PING+s[1]*N+s[0]*-m,o)))),C&&(ctx.fillStyle="rgba(0,0,0,0.2)",ctx.strokeStyle="rgba(0,0,0,0.2)"),ctx.lineWidth=M/320*Zoom,ctx.arc(GameW/2+OffsetX+s[1]*m*Zoom+s[0]*Zoom*N,GameH/2+OffsetY+s[1]*N*Zoom+s[0]*-m*Zoom,e/320*Zoom,0,2*Math.PI),ctx.closePath(),G&&ctx.fill(),ctx.stroke(),ctx.strokeStyle=MAPstatic.CT.os,ctx.stroke(),sinc=0,cosc=0,cosc=PlayersData.get(t).CNs[a].pDIR<360&&270<PlayersData.get(t).CNs[a].pDIR&&PlayersData.get(t).CNs[a].DIR<90&&-1<PlayersData.get(t).CNs[a].DIR?(sinc=Math.sin(((Date.now()-LastPING)/PING*(PlayersData.get(t).CNs[a].DIR-PlayersData.get(t).CNs[a].pDIR+360)+PlayersData.get(t).CNs[a].pDIR)/180*Math.PI),Math.cos(((Date.now()-LastPING)/PING*(PlayersData.get(t).CNs[a].DIR-PlayersData.get(t).CNs[a].pDIR+360)+PlayersData.get(t).CNs[a].pDIR)/180*Math.PI)):PlayersData.get(t).CNs[a].DIR<360&&270<PlayersData.get(t).CNs[a].DIR&&PlayersData.get(t).CNs[a].pDIR<90&&-1<PlayersData.get(t).CNs[a].pDIR?(sinc=Math.sin(((Date.now()-LastPING)/PING*(PlayersData.get(t).CNs[a].DIR-PlayersData.get(t).CNs[a].pDIR-360)+PlayersData.get(t).CNs[a].pDIR)/180*Math.PI),Math.cos(((Date.now()-LastPING)/PING*(PlayersData.get(t).CNs[a].DIR-PlayersData.get(t).CNs[a].pDIR-360)+PlayersData.get(t).CNs[a].pDIR)/180*Math.PI)):(sinc=Math.sin(((Date.now()-LastPING)/PING*(PlayersData.get(t).CNs[a].DIR-PlayersData.get(t).CNs[a].pDIR)+PlayersData.get(t).CNs[a].pDIR)/180*Math.PI),Math.cos(((Date.now()-LastPING)/PING*(PlayersData.get(t).CNs[a].DIR-PlayersData.get(t).CNs[a].pDIR)+PlayersData.get(t).CNs[a].pDIR)/180*Math.PI)),ctx.beginPath(),ctx.moveTo(GameW/2+OffsetX+s[1]*m*Zoom+s[0]*Zoom*N,GameH/2+s[1]*N*Zoom+s[0]*-m*Zoom+OffsetY),ctx.lineTo(GameW/2+OffsetX+s[1]*m*Zoom+s[0]*Zoom*N+cosc*r/320*Zoom,GameH/2+OffsetY+s[1]*N*Zoom+s[0]*-m*Zoom+sinc*r/320*Zoom),ctx.closePath(),PlayersData.get(t).CNs[a].STS<2){if(ctx.strokeStyle=MAPstatic.CT.l0,1==PlayersData.get(t).CNs[a].STS){for(let t=0;t<h;t++)g.push(new y(X+(nX-X)*(Date.now()-LastPING)/PING+s[1]*m+s[0]*N+cosc*r/320,Y+(nY-Y)*(Date.now()-LastPING)/PING+s[1]*N+s[0]*-m+sinc*r/320));PIXI.sound.play(l),PlayersData.get(t).CNs[a].STS=0}}else{if(3==PlayersData.get(t).CNs[a].STS){PIXI.sound.play(P);for(let t=0;t<5;t++)n.push(new D(X+(nX-X)*(Date.now()-LastPING)/PING+s[1]*m+s[0]*N,Y+(nY-Y)*(Date.now()-LastPING)/PING+s[1]*N+s[0]*-m));PlayersData.get(t).CNs[a].STS=2}ctx.strokeStyle=MAPstatic.CT.l1}C&&(ctx.fillStyle="rgba(0,0,0,0.2)",ctx.strokeStyle="rgba(0,0,0,0.2)"),ctx.lineCap="square",ctx.lineWidth=f[0]/320*Zoom,ctx.stroke(),PlayersData.get(t).CNs[a].STS<2?ctx.strokeStyle=MAPstatic.CT.o0:ctx.strokeStyle=MAPstatic.CT.o1,ctx.lineWidth=f[1]/320*Zoom,C&&(ctx.fillStyle="rgba(0,0,0,0.2)",ctx.strokeStyle="rgba(0,0,0,0.2)"),ctx.stroke()}function drawF(a,e=[[0,0],[0,0]],s=0,o=0,t={}){ctx.beginPath(),null!=t[PlayersData.get(a).COLOR]?ctx.fillStyle=t[PlayersData.get(a).COLOR]:ctx.fillStyle="#fff",ctx.strokeStyle=MAPstatic.CT.fs,(PlayersData.get(a).Z/2+"").substring(0,1)!=(Xmod?1:0)&&(ctx.fillStyle="rgba(0,0,0,0.2)",ctx.strokeStyle="rgba(0,0,0,0.2)"),ctx.moveTo((PlayersData.get(a).actX+(PlayersData.get(a).actX-PlayersData.get(a).prevX-nX+X)*(Date.now()-LastPING)/PING-X)*Zoom+GameW/2+OffsetX+e[0][1]*Zoom*s+e[0][0]*Zoom*o,(PlayersData.get(a).actY+(PlayersData.get(a).actY-PlayersData.get(a).prevY-nY+Y)*(Date.now()-LastPING)/PING-Y)*Zoom+GameH/2+OffsetY+e[0][1]*o*Zoom+e[0][0]*-s*Zoom);for(let t=1;t<e.length;t+=1)ctx.lineTo((PlayersData.get(a).actX+(PlayersData.get(a).actX-PlayersData.get(a).prevX-nX+X)*(Date.now()-LastPING)/PING-X)*Zoom+GameW/2+OffsetX+e[t][1]*s*Zoom+e[t][0]*Zoom*o,(PlayersData.get(a).actY+(PlayersData.get(a).actY-PlayersData.get(a).prevY-nY+Y)*(Date.now()-LastPING)/PING-Y)*Zoom+GameH/2+OffsetY+e[t][1]*o*Zoom+e[t][0]*-s*Zoom);ctx.lineTo((PlayersData.get(a).actX+(PlayersData.get(a).actX-PlayersData.get(a).prevX-nX+X)*(Date.now()-LastPING)/PING-X)*Zoom+GameW/2+OffsetX+e[0][1]*s*Zoom+e[0][0]*Zoom*o,(PlayersData.get(a).actY+(PlayersData.get(a).actY-PlayersData.get(a).prevY-nY+Y)*(Date.now()-LastPING)/PING-Y)*Zoom+GameH/2+OffsetY+e[0][1]*o*Zoom+e[0][0]*-s*Zoom),ctx.closePath(),ctx.lineWidth=2/320*Zoom,ctx.fill(),ctx.stroke()}function PdrawF(t,a=[[0,0],[0,0]],e=0,s=0,o={}){ctx.beginPath(),null!=o[PlayersData.get(t).COLOR]?ctx.fillStyle=o[PlayersData.get(t).COLOR]:ctx.fillStyle="#fff",ctx.strokeStyle=MAPstatic.CT.fs,ctx.moveTo(GameW/2+OffsetX+a[0][1]*Zoom*e+a[0][0]*Zoom*s,GameH/2+OffsetY+a[0][1]*s*Zoom+a[0][0]*-e*Zoom);for(let t=1;t<a.length;t+=1)ctx.lineTo(GameW/2+OffsetX+a[t][1]*e*Zoom+a[t][0]*Zoom*s,GameH/2+OffsetY+a[t][1]*s*Zoom+a[t][0]*-e*Zoom);ctx.lineTo(GameW/2+OffsetX+a[0][1]*e*Zoom+a[0][0]*Zoom*s,GameH/2+OffsetY+a[0][1]*s*Zoom+a[0][0]*-e*Zoom),ctx.closePath(),ctx.lineWidth=2/320*Zoom,ctx.fill(),ctx.stroke()}function DrawNickname(t,a,e,s,o){var r;cameraMode||(r=NoTeamTag(PlayerName),PlayerTags.get(r)==PlayerTags.get(t)&&null!=PlayerTags.get(r)?ctx.fillStyle="rgba(0,0,255,0.75)":ctx.fillStyle="rgba(255,0,0,0.75)",ctx.strokeStyle="rgba(0,0,0,0.5)",ctx.lineWidth=1,ctx.textAlign="center",ctx.font=Math.round(.0625*Zoom)+"px Arial",null!=PlayerTags.get(t)?ctx.fillText("["+PlayerTags.get(t)+"]"+t,s,o-.15625*Zoom):ctx.fillText(t,s,o-.15625*Zoom),ctx.fillStyle="rgba("+255*(1-a/e)+","+a/e*255+",0,0.75)",ctx.fillRect(s-37/320*Zoom,o-45/320*Zoom,a/e*75/320*Zoom,7/320*Zoom),ctx.strokeRect(s-37/320*Zoom,o-45/320*Zoom,75/320*Zoom,7/320*Zoom))}function BangPrt0(t,a,e=2*Math.random()*Math.PI){this.x=t,this.y=a,this.life=1,this.dir=2*Math.random()*Math.PI,this.xs=Math.cos(e),this.ys=Math.sin(e),this.rad=1}function CanPrt0(t,a,e=2*Math.random()*Math.PI){this.x=t,this.y=a,this.life=1,this.xs=Math.cos(e),this.ys=Math.sin(e),this.rad=1}function WtrPrt0(t,a){this.x=t,this.y=a,this.life=1,this.rad=Math.random()+1}function RcktTPrt0(t,a){this.x=t,this.y=a,this.life=1,this.rad=Math.random()+.25}function Particle0(t,a,e,s,o){this.x=t,this.y=a,this.xs=e,this.ys=s,this.life=1.5,this.rad=o}function TrcrPrt1(t,a,e,s,o=1){this.x=t,this.y=a,this.life=1,this.cl=o,this.x1=e,this.y1=s}function FirePrt0(t,a,e=1){this.x=t,this.y=a,this.deg=2*Math.random()*Math.PI,this.dir=2*Math.random()*Math.PI,this.life=60,this.dirspd=0,this.cof=.5+Math.random(),this.speed=.25+.25*Math.random(),this.rad=(5+5*Math.random())*e}function Particle1(t,a,e,s,o){this.x=t,this.y=a,this.deg=e,this.life=1.5,this.speed=s,this.rad=o}function Particle2(t,a){this.x=Math.random()*t,this.y=Math.random()*a,this.r=8-Math.floor(2*Math.sqrt(Math.sqrt(256*Math.random()))),this.d=1+.25*Math.random(),this.ra=Math.random()*Math.PI*2,this.as=.2*Math.random()-.1}function Particle3(t){this.id=t,this.hp=500+500*Math.random(),this.cl=64*Math.random()+191,this.h=Math.random(),this.dir=(2*Math.random()-1)*Math.PI,this.spd=2*Math.random()-1}function Particle4(){this.x=Math.random()*(GameW+500)-250,this.y=Math.random()*(GameH+500)-250,this.dir=360*Math.random(),this.life=.01}