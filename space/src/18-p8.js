/* ---------- FINAL CHAPTER: «Изнанка» behind the Rift, the Shadow of the Sneeze ---------- */
function shadowMat(op){return new THREE.MeshBasicMaterial({color:lc(0x241040),transparent:true,opacity:op==null?.88:op,depthWrite:true,toneMapped:false})}
function makeShadowCapy(scale){const c=makeCast('kapik');c.root.traverse(o=>{if(o.isMesh)o.material=shadowMat();if(o.isSprite)o.visible=false});c.body.scale.multiplyScalar(scale);
  for(const s of[-1,1]){const e=glow(0xb28cff,.5*scale,.95);e.position.set(s*.16*scale,(c.headY/c.s)*scale*.97,.33*scale);c.root.add(e)}return c}
function island(x,y,z,r,o){o=o||{};const top=o.col||0x4a3a7a;cyl(x,y-.6,z,r,.6,top,{g:G.cyl16,tex:TX.moss});vis(G.cone,o.under||0x2a1a4a,x,y-.6-r*.9,z,r*.95,r*1.8,r*.95,Math.PI,0,0,.05,TX.stone);
  for(let i=0;i<5;i++){const a=i/5*TAU+x;gvis(G.oct,pick([0x7fe3e8,0xb28cff,0xff8fb1]),x+Math.cos(a)*r*.55,y-.6-r*1.1-i*.1,z+Math.sin(a)*r*.55,.12*r,.35*r,.12*r)}
  if(!o.bare)for(let i=0;i<Math.round(r*1.2);i++){const a=hash2(x+i,z)*TAU,d=r*(.3+hash2(z,x+i)*.6);gvis(G.sph,pick([0x7fe3e8,0xb28cff,0xd7a0ff]),x+Math.cos(a)*d,y+.08,z+Math.sin(a)*d,.08,.08,.08)}}
function buildP8(){
  newLevel('p8');L.noFloor=true;L.radius=80;L.heat=0;L.heatOn=true;L.heatName='Тьма';
  setSky({top:0x05030f,hor:0x2a1050,bot:0x05030f,fog:0x1a0a35,near:45,far:160,hs:0xb8a8ff,hg:0x2a1a4a,hi:.75,sc:0xd8c8ff,si:.7,sd:[.2,.8,-.4],sunGlow:0x8a5aff,stars:true,exp:1.1});
  aurora();skyBody(0xd8c8ff,[0,160,-240],46,0x8a5aff);
  L.spawn={x:0,y:0,z:9,yaw:0};L.surface='moss';L.waterMsg='';
  island(0,0,12,9.5,{col:0x3a2a6a});placeUFO(0,16,{pad:0x4a3a7a});
  if(qs('c4')===2){S.q.c4=3;save()}
  const Q=qd('c4');Q.sp=Q.sp||{};Q.lit=Q.lit||{};
  /* grandpa's spirit guides */
  const ded=makeCast('dedushka');ded.root.position.set(4.5,0,7);ded.root.rotation.y=-.6;const holo=new THREE.MeshBasicMaterial({color:lc(0xbfefff),transparent:true,opacity:.45,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false});ded.root.traverse(o=>{if(o.isMesh)o.material=holo;if(o.isSprite)o.visible=false});L.group.add(ded.root);
  tick((t,dt)=>{ded.root.position.y=.15+Math.sin(t*1.3)*.12;holo.opacity=.38+Math.sin(t*5)*.06;charPose(ded,t,'idle',dt,tmpV.set(P.x,P.y,P.z));if(Math.random()<dt*6)FXW.burst(4.5+(Math.random()-.5),.3,7+(Math.random()-.5),{col:0xbfefff,n:1,spd:.2,up:1.2,g:-.4,life:1.5,size:.2})});
  inter({x:4.5,y:.5,z:7,r:2.6,label:'E - поговорить с духом дедушки',act:()=>dedSpiritTalk()});
  /* spark altars */
  const SPK=[{k:'yuzik',col:0xffab4a,name:'Искра Юзика'},{k:'snezhok',col:0x7fe3e8,name:'Искра Снежка'},{k:'gribok',col:0xd7a0ff,name:'Искра Грибка'},{k:'vintik',col:0x8ee08a,name:'Искра Винтика'}];
  const spark=(i,x,y,z)=>{const s=SPK[i];const g=new THREE.Group();mesh(G.oct,new THREE.MeshBasicMaterial({color:lc(s.col),toneMapped:false}),0,.6,0,.28,.45,.28,g);g.add(glow(s.col,3,.9));
    cyl(x,y,z,.7,.5,0x2a1a4a,{g:G.cyl16,tex:TX.stone});itemPick('spark'+i,x,y+.5,z,g,()=>qs('c4')>=3,()=>{Q.sp[i]=1;save();AU.sfx('quest');const n=Object.keys(Q.sp).length;banner(s.name,`Искры: ${n} из 4`,n>=4?'Мост света ведёт к Тени!':'Память брата светится в лапах');if(n>=4)lightBridge(true)})};
  /* A: blinking ghost platforms (west) */
  const ghosts=[];for(let i=0;i<7;i++){const x=-11.5-i*3.4,y=i*.45,z=12+Math.sin(i*1.3)*2;const c=addC({k:'b',x0:x-1,x1:x+1,y0:y-.25,y1:y,z0:z-1,z1:z+1,t:'solid',surf:'moss'});
    const m=mesh(G.box,new THREE.MeshBasicMaterial({color:lc(0xffab4a),transparent:true,opacity:.7,toneMapped:false}),x,y-.12,z,2,.25,2,L.group);ghosts.push({c,m,ph:i*.55})}
  tick((t,dt)=>{for(const g of ghosts){const k=((t*.45+g.ph)%1);const on=k<.62;g.c.on=on;g.m.material.opacity=on?(k>.5?.25+Math.sin(t*40)*.2:.75):.08}});
  island(-38,3.2,12,3.2,{col:0x5a3a2a});spark(0,-38,3.2,12);
  /* B: low gravity gap (east) */
  island(25,1,12,3.4,{col:0x2a4a6a});spark(1,26.5,1,12);
  const LG={x0:8.5,x1:23,z0:6,z1:18};for(let i=0;i<14;i++)gvis(G.sph,0x7fe3e8,lerp(LG.x0,LG.x1,i/13),1+Math.sin(i)*1.2,12+Math.cos(i*1.7)*3,.08,.08,.08);
  tick((t,dt)=>{if(P.x>LG.x0&&P.x<LG.x1&&P.z>LG.z0&&P.z<LG.z1&&!P.ground){P.vy+=GRAV*.72*dt;if(!S.seen.lowg){S.seen.lowg=1;toast('Тут почти нет тяжести! Прыжок длится долго')}}
    if(Math.random()<dt*14)FXW.burst(lerp(LG.x0,LG.x1,Math.random()),-2+Math.random()*6,LG.z0+Math.random()*12,{col:0x7fe3e8,n:1,spd:.2,up:.6,g:-.3,life:2.4,size:.2})});
  /* C: path of memory - steps appear one after another (south-west spiral) */
  const MX=-16,MZ=-8;island(MX+4,-.2,MZ+6,3,{col:0x3a2a5a});island(-7,0,4,1.3,{col:0x3a2a5a,bare:true});island(-9.5,0,1,1.3,{col:0x3a2a5a,bare:true});const mem=[];for(let i=0;i<9;i++){const a=i*.75,x=MX+Math.cos(a)*4,z=MZ+Math.sin(a)*4,y=.6+i*.95;const c=addC({k:'b',x0:x-.9,x1:x+.9,y0:y-.25,y1:y,z0:z-.9,z1:z+.9,t:'solid',surf:'moss'});
    const m=mesh(G.box,new THREE.MeshBasicMaterial({color:lc(0xd7a0ff),transparent:true,opacity:.8,toneMapped:false}),x,y-.12,z,1.8,.25,1.8,L.group);const ring=mesh(G.torThin,new THREE.MeshBasicMaterial({color:lc(0xd7a0ff),transparent:true,opacity:.25,toneMapped:false}),x,y,z,.9,.9,.9,L.group);ring.rotation.x=Math.PI/2;
    const on=i===0||!!(Q.mem&&Q.mem>=i);c.on=on;m.visible=on;mem.push({c,m,ring,y})}
  cyl(MX,0,MZ,.6,9,0x5a3a8a,{g:G.cyl16});const spire=glow(0xd7a0ff,6,.6);spire.position.set(MX,9.5,MZ);L.group.add(spire);
  const topA=8*.75,TX0=MX+Math.cos(topA+.75)*4,TZ0=MZ+Math.sin(topA+.75)*4;island(TX0,9.2,TZ0,2.2,{col:0x4a2a6a,bare:true});spark(2,TX0,9.2,TZ0);
  tick((t,dt)=>{for(let i=0;i<mem.length;i++){const s=mem[i];s.ring.rotation.z=t;if(P.sup===s.c&&i+1<mem.length&&!mem[i+1].c.on){const n=mem[i+1];n.c.on=true;n.m.visible=true;n.m.scale.setScalar(.01);tween(.4,p=>n.m.scale.set(1.8*p+.01,.25,1.8*p+.01));AU.sfx('ring');Q.mem=i+1;save()}}});
  /* D: shadow wisps guard the last spark (south-east) - shoot them */
  island(21,0,-10,5,{col:0x2a3a3a});spark(3,23,0,-11.5);for(let i=0;i<5;i++){const x=6.5+i*2.4,z=4-i*2.6;cyl(x,-.4,z,.9,.4,0x3a2a5a,{g:G.cyl16,tex:TX.moss})}
  const wisps=[];const wisp=(x,z,home)=>{const c=makeShadowCapy(.55);c.root.position.set(x,0,z);L.group.add(c.root);const W={c,x,z,hx:x,hz:z,alive:true,cd:0,home};W.tg={x,y:.7,z,r:.8,get on(){return W.alive},hit:()=>{W.alive=false;c.root.visible=false;AU.sfx('sizzle');FXW.burst(W.x,.8,W.z,{col:0xb28cff,n:24,spd:3,up:2,life:1,size:.5});if(W.home)setTimeout(()=>{if(!wisps.includes(W))return;W.alive=true;W.x=W.hx;W.z=W.hz;c.root.visible=true},30000)}};L.targets.push(W.tg);wisps.push(W);return W};
  [[19,-8],[23,-8],[19,-12],[24,-13]].forEach(p=>wisp(p[0],p[1],true));
  tick((t,dt)=>{for(const W of wisps){if(!W.alive)continue;W.cd-=dt;const dx=P.x-W.x,dz=P.z-W.z,d=Math.hypot(dx,dz);let pose='idle';const lim=W.home?6.5:12;
    if(d<9&&Math.abs(P.y-W.c.root.position.y)<3){W.x+=dx/d*2.6*dt;W.z+=dz/d*2.6*dt;pose='walk';W.c.walkPh+=dt*12;W.c.root.rotation.y=Math.atan2(dx,dz)}const ox=W.x-W.hx,oz=W.z-W.hz,od=Math.hypot(ox,oz);if(od>lim){W.x=W.hx+ox/od*lim;W.z=W.hz+oz/od*lim}
    if(d<1.1&&W.cd<=0){W.cd=1.2;addHeat(25,'Тьма окутала Капика. Он очнулся у точки возврата');P.vx=dx/d*8;P.vz=dz/d*8;P.vy=4;P.ground=false;toast(pick(['Брр, холодная тень!','Тень шипит: «Уходи...»','Ой! Темно в глазах']))}
    W.c.root.position.set(W.x,.1+Math.sin(t*3+W.hx)*.15,W.z);charPose(W.c,t,pose,dt,null);W.tg.x=W.x;W.tg.z=W.z}});
  /* bridge of light to the arena */
  const AZ=-30,bridge=[];for(let i=0;i<9;i++){const z=1.8-i*2.55,x=Math.sin(i*.7)*.5;const c=addC({k:"b",x0:x-1.25,x1:x+1.25,y0:-.25,y1:0,z0:z-1,z1:z+1,t:"solid",surf:"moss"});const m=mesh(G.box,new THREE.MeshBasicMaterial({color:lc(0xfff0b0),transparent:true,opacity:.8,toneMapped:false}),x,-.12,z,2.5,.25,2,L.group);bridge.push({c,m})}
  function lightBridge(anim){bridge.forEach((b,i)=>{if(anim){b.c.on=false;b.m.visible=false;setTimeout(()=>{b.c.on=true;b.m.visible=true;AU.sfx('ring');FXW.burst(b.m.position.x,.2,b.m.position.z,{col:0xfff0b0,n:12,spd:2,up:2,life:.7})},i*160)}else{b.c.on=true;b.m.visible=true}});if(qs('c4')===3)qset('c4',4)}
  const nSp=()=>Object.keys(Q.sp).length;if(nSp()>=4||qs('c4')>=4)lightBridge(false);else bridge.forEach(b=>{b.c.on=false;b.m.visible=false});
  checkpoint(0,0,-17,4,3,Math.PI*0);
  /* the arena and the Shadow of the Sneeze */
  island(0,0,AZ,12,{col:0x2a1a4a});checkpoint(0,0,AZ+9,6,3,0);
  const PIL=[[-8,AZ-6],[8,AZ-6],[-8,AZ+6],[8,AZ+6]],pils=[];
  PIL.forEach((p,i)=>{cyl(p[0],0,p[1],.7,3.2,0x3a2a5a,{g:G.cyl16,tex:TX.stone});const top=mesh(G.oct,new THREE.MeshBasicMaterial({color:lc(0x3a2a5a),toneMapped:false}),p[0],3.6,p[1],.4,.6,.4,L.group);const gl=glow(SPK[i].col,4,0);gl.position.set(p[0],3.6,p[1]);L.group.add(gl);
    const beam=mesh(new THREE.CylinderGeometry(.08,.08,1,8,1,true),new THREE.MeshBasicMaterial({color:lc(SPK[i].col),transparent:true,opacity:.75,toneMapped:false,blending:THREE.AdditiveBlending,depthWrite:false}),0,0,0,1,1,1,L.group);beam.visible=false;
    const P_={i,x:p[0],z:p[1],top,gl,beam,lit:()=>!!Q.lit[i]};pils.push(P_);
    inter({x:p[0],y:.5,z:p[1],r:2.2,hold:1,label:`Удерживайте E - зажечь столп: ${SPK[i].name.toLowerCase()}`,cond:()=>qs('c4')>=4&&!Q.lit[i]&&!!Q.sp[i],act:()=>{Q.lit[i]=1;save();AU.sfx('lamp');FXW.burst(p[0],3.6,p[1],{col:SPK[i].col,n:40,spd:4,life:1.2});const n=Object.keys(Q.lit).length;toast(`Столпы горят: ${n} из 4`);if(n>=4){banner('Щит Тени разбит','Свет братьев сильнее тьмы','Теперь Бананомёт попадает по Тени');AU.sfx('quest');if(qs('c4')<5)qset('c4',5)}}})});
  const B=L.boss={hp:12,max:12,state:qs('c4')>=99?'gone':'wait',x:0,y:3,z:AZ,a:0,fb:2};const SH=makeShadowCapy(3.2);SH.root.position.set(0,3,AZ);L.group.add(SH.root);const aura=glow(0x6a3aff,16,.35);SH.root.add(aura);aura.position.y=3;if(B.state==='gone')SH.root.visible=false;
  const shieldM=new THREE.MeshBasicMaterial({color:lc(0xb28cff),transparent:true,opacity:.18,depthWrite:false,toneMapped:false,blending:THREE.AdditiveBlending});const shield=mesh(G.sphHi,shieldM,0,3.4,0,3.6,4.4,3.6,SH.root);
  const bossHit={x:0,y:5,z:AZ,r:2.4,get on(){return B.state==='fight'},hit:()=>{if(Object.keys(Q.lit).length<4){AU.sfx('bad');toast('Пломбир отскакивает от щита. Сначала зажги 4 столпа искрами');FXW.burst(B.x,B.y+3,B.z,{col:0xb28cff,n:10,spd:3,life:.5});return}
    B.hp--;AU.sfx('splat');FXW.burst(B.x,B.y+3,B.z,{col:0xfff0b0,n:20,spd:3,up:2,life:.8,size:.5});SH.root.scale.setScalar(.92);setTimeout(()=>SH.root.scale.setScalar(1),120);$('#bossFill').style.width=(B.hp/B.max*100)+'%';
    if(Math.random()<.35)toast(`Тень: ${pick(['Свет... жжётся...','Почему вы вместе, а я один?','Не подходи!','Тепло... странное чувство...'])}`);if(B.hp===6){wisp(-5,AZ+3,false);wisp(5,AZ+3,false);AU.sfx('roar')}if(B.hp<=0)shadowDown()}};L.targets.push(bossHit);
  const orbs=[];function orb(){const from=new THREE.Vector3(B.x,B.y+4.5,B.z),to=new THREE.Vector3(P.x,P.y+1,P.z),dir=to.sub(from);const d=dir.length();dir.normalize();const m=new THREE.Group();m.add(glow(0x6a3aff,2.4,.95));mesh(G.sph,new THREE.MeshBasicMaterial({color:lc(0x1a0a2a),toneMapped:false}),0,0,0,.4,.4,.4,m);m.position.copy(from);L.group.add(m);
    const f={m,v:dir.multiplyScalar(9),life:d/9+1.5};f.tg={x:from.x,y:from.y,z:from.z,r:.9,on:true,hit:()=>{f.life=0;AU.sfx('sizzle');FXW.burst(m.position.x,m.position.y,m.position.z,{col:0xb28cff,n:14,spd:2,life:.6})}};L.targets.push(f.tg);orbs.push(f)}
  function shadowDown(){B.state='down';$('#bossBar').hidden=true;orbs.forEach(f=>f.life=0);wisps.forEach(W=>{if(!W.home&&W.alive)W.tg.hit()});AU.music('p8');
    tween(2.2,p=>{const s=1-p*.82;SH.root.scale.setScalar(s);SH.root.position.y=lerp(3,0,p);shieldM.opacity=.18*(1-p)},()=>{
    say([['tenek','...Почему ты не испугался?'],['kapik','Испугался. Но братьев я боюсь потерять больше.'],['tenek','Я - тень от первого полёта твоего дедушки. Тарелка улетела, а я остался один в темноте.'],['tenek','Я чихал, чтобы позвать кого-нибудь. А чих уносил всех от меня ещё дальше...'],['dedushka','Прости меня, маленький. Я не знал, что ты есть.'],['kapik','Пойдём с нами. На Пастбище места хватит всем. Даже теням.'],['tenek','...Правда? Тогда я больше никогда не буду чихать.']],()=>{
      B.state='gone';SH.root.visible=false;AU.sfx('beam');for(let i=0;i<8;i++)setTimeout(()=>FXW.burst((Math.random()-.5)*16,4+Math.random()*4,AZ+(Math.random()-.5)*16,{col:pick([0xfff0b0,0x7fe3e8,0xff8fb1,0xffab4a]),n:30,spd:5,up:2,g:0,life:1.5,size:.4}),i*220);
      setTimeout(()=>{qcomplete('c4');showEnding(4)},2400)})})}
  tick((t,dt)=>{const c=SH;
    if(B.state==='wait'){c.root.position.set(0,3+Math.sin(t)*.3,AZ);c.root.rotation.y=Math.atan2(P.x,P.z-AZ);charPose(c,t,'idle',dt,null);
      if(qs('c4')>=4&&P.z<AZ+11&&P.z>AZ-12&&Math.abs(P.x)<12&&P.y>-1){B.state='intro';AU.sfx('roar');say([['tenek','Ты... принёс свет. Зачем? Здесь всегда было темно.'],['kapik','Ты Тень Чиха? Это из-за тебя братьев уносило по всей галактике?'],['tenek','Уходи! Или я чихну так, что погаснут все звёзды!']],()=>{B.state='fight';$('#bossBar').hidden=false;$('#bossFill').style.width=(B.hp/B.max*100)+'%';AU.music('boss')})}}
    else if(B.state==='fight'){B.a+=dt*.35;B.x=Math.cos(B.a)*4;B.z=AZ+Math.sin(B.a)*4;B.y=3+Math.sin(t*1.3)*.6;B.fb-=dt;if(B.fb<=0){B.fb=Object.keys(Q.lit).length>=4?1.3:2.2;orb()}
      c.root.position.set(B.x,B.y,B.z);c.root.rotation.y=Math.atan2(P.x-B.x,P.z-B.z);charPose(c,t,B.fb<.3?'wave':'idle',dt,null)}
    shield.visible=Object.keys(Q.lit).length<4;shieldM.opacity=.14+Math.sin(t*3)*.05;
    pils.forEach(p=>{const on=p.lit();p.gl.material.opacity=on?.9:0;p.top.material.color.copy(lc(on?SPK[p.i].col:0x3a2a5a));p.beam.visible=on&&(B.state==='fight'||B.state==='intro'||B.state==='wait');
      if(p.beam.visible){const a=new THREE.Vector3(p.x,3.6,p.z),b=new THREE.Vector3(B.x,B.y+3.4,B.z),mid=a.clone().add(b).multiplyScalar(.5);p.beam.position.copy(mid);p.beam.scale.set(1,a.distanceTo(b),1);p.beam.lookAt(b);p.beam.rotateX(Math.PI/2)}});
    bossHit.x=B.x;bossHit.y=B.y+3.5;bossHit.z=B.z;
    for(let i=orbs.length-1;i>=0;i--){const f=orbs[i];f.life-=dt;f.m.position.addScaledVector(f.v,dt);f.tg.x=f.m.position.x;f.tg.y=f.m.position.y;f.tg.z=f.m.position.z;const p=f.m.position;
      if(Math.hypot(p.x-P.x,p.z-P.z)<1&&p.y>P.y-.2&&p.y<P.y+2){f.life=0;addHeat(30,'Тьма окутала Капика. Он очнулся у точки возврата');FXW.burst(p.x,p.y,p.z,{col:0x6a3aff,n:20,spd:4,life:.7,size:.5})}
      if(f.life<=0){L.group.remove(f.m);f.tg.on=false;L.targets.splice(L.targets.indexOf(f.tg),1);orbs.splice(i,1)}}});
  L.onRespawn=()=>{L.heat=0;orbs.forEach(f=>f.life=0)};
  tick((t,dt)=>{L.heat=Math.max(0,(L.heat||0)-8*dt);$('#heatFill').style.width=L.heat+'%'});
  /* supernatural scenery: floating rocks, ghost trees, a spirit whale, rising sparks */
  const rocks=[];const r=rng(91);for(let i=0;i<26;i++){const a=r()*TAU,d=22+r()*45,m=mesh(G.dod,stdMat(pick([0x3a2a5a,0x4a3a6a,0x2a1a4a]),{roughness:1}),Math.cos(a)*d,-6+r()*22,Math.sin(a)*d-8,1+r()*3,1+r()*2,1+r()*3,L.group);rocks.push({m,ph:r()*6,y:m.position.y})}
  tick((t,dt)=>{for(const k of rocks){k.m.position.y=k.y+Math.sin(t*.4+k.ph)*.8;k.m.rotation.y+=dt*.08}});
  for(const p of[[-5,15],[6,13],[-6,9],[2,19],[-34,10],[28,14],[22,-6],[-6,AZ-8],[6,AZ+8],[9,AZ-3],[-10,AZ+2]]){vis(G.cyl,0x6a5a9a,p[0],1,p[1],.12,2,.12);gvis(G.sph,pick([0x7fe3e8,0xb28cff]),p[0],2.4,p[1],.9,.9,.9)}
  const wh=new THREE.Group();{const wb=new THREE.MeshBasicMaterial({color:lc(0x7fe3e8),transparent:true,opacity:.22,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false});mesh(G.sphHi,wb,0,0,0,5,4,14,wh);const tl=new THREE.Group();tl.position.z=-13;wh.add(tl);for(const s of[-1,1]){mesh(G.sph,wb,s*3,0,-3,3.4,.6,1.8,tl).rotation.y=s*.5;mesh(G.sph,wb,s*5,-1.5,6,3,.5,1.5,wh)}wh.userData.tl=tl}
  L.group.add(wh);tick((t,dt)=>{const a=t*.05;wh.position.set(Math.cos(a)*60,18+Math.sin(t*.3)*4,Math.sin(a)*60-10);wh.rotation.y=-a;wh.userData.tl.rotation.x=Math.sin(t*1.1)*.35;
    if(Math.random()<dt*25){const aa=Math.random()*TAU,d=Math.random()*30;FXW.burst(P.x+Math.cos(aa)*d,-4+Math.random()*4,P.z+Math.sin(aa)*d,{col:pick([0xb28cff,0x7fe3e8,0xfff0b0]),n:1,spd:.2,up:2,g:-.6,life:4,size:.18})}});
  finishLevel();
  $('#heat').hidden=false;$('#heat small').textContent='Тьма';$('#bossBar b').textContent='Тень Космического Чиха';
  AU.music(B.state==='fight'?'boss':'p8');AU.ambient('drips');
  L.arrive=[['kapik','Тут всё наоборот... Острова висят в пустоте, а звёзды шепчут.'],['kapik','Кажется, это изнанка космоса. И кто-то здесь очень одинокий.']];
  L.objective=()=>{const st=qs('c4'),n=nSp();if(st===99)return{text:'Изнанка затихла. Тенёк живёт теперь на Пастбище',pos:null};
    if(st===3){const left=[0,1,2,3].filter(i=>!Q.sp[i]);const SP=[[-38,4.4,12],[26.5,2.2,12],[TX0,10.4,TZ0],[23,1.2,-11.5]],TXT=['Запад: прыгай по мерцающим плитам, пока они горят','Восток: тут почти нет тяжести, прыгай через пропасть','Юго-запад: ступени памяти появляются под лапами одна за другой','Юго-восток: Тени-призраки стерегут искру. Бананомёт им не нравится'];
      let b=left[0],bd=1e9;for(const i of left){const d=Math.hypot(SP[i][0]-P.x,SP[i][2]-P.z);if(d<bd){bd=d;b=i}}return{text:`${TXT[b]} (искры: ${n} из 4)`,pos:SP[b],tag:'Финал'}}
    const lit=Object.keys(Q.lit).length;if(st===4&&lit<4){const pl=pils.find(p=>!p.lit());return{text:`Зажги столпы света вокруг Тени: ${lit} из 4. Удерживай E у столпа`,pos:pl?[pl.x,4,pl.z]:null,tag:'Финал'}}
    if(B.state==='fight')return{text:'Стреляй пломбиром в Тень и сбивай тёмные сферы',pos:null,tag:'Финал'};
    return{text:'Мост света ведёт к Тени. Иди по нему на юг',pos:[0,1,AZ+9],tag:'Финал'}};
}
function dedSpiritTalk(){const st=qs('c4'),n=Object.keys(qd('c4').sp||{}).length;
  if(st===3&&!n){say([['dedushka','Внучок... Ты добрался даже сюда. Это Изнанка, место, куда падают тени и сны.'],['dedushka','Кто-то здесь чихает так, что гаснут звёзды. Но он прячется за щитом тьмы.'],['dedushka','Свет братьев сильнее любой тьмы. Собери четыре искры: их память рассыпалась по островам.'],['dedushka','Запад, восток, юго-запад и юго-восток. Иди, я посвечу тебе отсюда.']]);return}
  if(st===3){say([['dedushka',`Искр у тебя: ${n} из 4. Ты молодец. Старший - тот, кто возвращается за каждым.`]]);return}
  if(st>=4&&st<99){say([['dedushka','Мост света готов. Зажги столпы искрами, и щит Тени рассыплется.']]);return}
  say([['dedushka','Я горжусь тобой, Капик. Береги братьев. И Тенька тоже.']])}
