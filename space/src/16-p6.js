/* ---------- CHAPTER 3: toy banana blaster «Бананомёт», heat, planet «Магмара» and King Rogozhar ---------- */
/* toy blaster held in the right paw (first person) */
const gunOn=()=>!!S.got.blaster&&!S.gunOff;
const canShoot=()=>!!(L&&(L.canThrow||gunOn()));
let gunMesh=null,gunKick=0,gunCD=0;
function makeBananomet(){const g=new THREE.Group(),b=new THREE.Group();g.add(b);
  const Y=stdMat(0xf2c43a,{roughness:.38,metalness:.05}),Y2=stdMat(0xe0a92a,{roughness:.45}),DK=stdMat(0x2c3038,{roughness:.35,metalness:.7}),GR=stdMat(0x3a3f48,{roughness:.3,metalness:.8}),BR=stdMat(0x4a2e1e,{roughness:.7}),BL=stdMat(0x7fd0f0,{roughness:.2,metalness:.3});
  const R=o=>(o.rotation.x=Math.PI/2,o);
  mesh(G.box,Y,0,0,-.02,.13,.14,.5,b);mesh(G.box,Y2,0,-.035,-.02,.135,.05,.46,b);mesh(G.box,DK,0,.082,-.06,.05,.025,.4,b);
  for(let i=0;i<5;i++)mesh(G.box,DK,0,.1,-.22+i*.07,.055,.018,.03,b);
  R(mesh(G.cyl16,Y,0,.0,-.36,.062,.18,.062,b));for(let i=0;i<3;i++)R(mesh(G.cyl16,DK,0,0,-.3-i*.055,.066,.014,.066,b));
  R(mesh(G.cyl16,GR,0,0,-.52,.034,.22,.034,b));R(mesh(G.cyl16,stdMat(0xff8a2e,{roughness:.4}),0,0,-.635,.05,.03,.05,b));R(mesh(G.cyl16,stdMat(0x111111),0,0,-.652,.03,.01,.03,b));
  const tank=mesh(G.cyl16,new THREE.MeshStandardMaterial({color:lc(0xdff4ff),transparent:true,opacity:.45,roughness:.05,metalness:.1}),0,.17,.04,.065,.16,.065,b);tank.renderOrder=7;
  mesh(G.sph,stdMat(0xfff1b0,{roughness:.8}),0,.13,.04,.05,.045,.05,b);mesh(G.sph,stdMat(0xfff6d0,{roughness:.8}),.01,.19,.045,.045,.04,.045,b);
  mesh(G.cyl16,DK,0,.255,.04,.07,.02,.07,b);mesh(G.cyl16,stdMat(0x6a3a1e),0,.272,.04,.04,.02,.04,b);mesh(G.cyl16,DK,0,.09,.04,.07,.02,.07,b);
  const pipe=mesh(G.torThin,BL,0,.1,-.15,.09,.09,.09,b);pipe.rotation.y=Math.PI/2;
  const grip=mesh(G.box,BR,0,-.15,.14,.085,.2,.1,b);grip.rotation.x=.32;for(let i=0;i<3;i++){const r2=mesh(G.box,stdMat(0x3a2418),0,-.1-i*.05,.17+i*.015,.088,.012,.1,b);r2.rotation.x=.32}
  const tg=mesh(G.torThin,DK,0,-.1,.04,.06,.06,.06,b);tg.rotation.y=Math.PI/2;mesh(G.box,DK,0,-.095,.05,.02,.06,.02,b).rotation.x=-.3;
  mesh(G.box,Y2,0,.01,.29,.11,.13,.14,b);mesh(G.box,BR,0,.01,.37,.1,.15,.03,b);
  mesh(G.box,DK,0,.115,-.24,.03,.04,.03,b);const dot=mesh(G.sph,new THREE.MeshBasicMaterial({color:lc(0x7fe3e8),toneMapped:false}),0,.14,-.24,.012,.012,.012,b);
  for(const sd of[-1,1]){const st=new THREE.Group();st.position.set(sd*.067,.0,.0);st.rotation.y=sd*Math.PI/2;b.add(st);for(let k=0;k<5;k++){const a=-.6+k*.3;mesh(G.sph,stdMat(0xffe14a),Math.sin(a)*.06,Math.cos(a)*.03-.01,0,.018,.014,.004,st)}}
  mesh(G.sph,stdMat(0x9a6236,{roughness:.8}),0,-.2,.16,.07,.06,.08,b);mesh(G.sph,stdMat(0x9a6236,{roughness:.8}),-.07,-.05,-.3,.06,.05,.07,b);
  return g}
function updGun(dt){const show=gunOn()&&mode==='play'&&!P.carry;if(show&&!gunMesh){gunMesh=makeBananomet();gunMesh.scale.setScalar(.6);gunMesh.position.set(.25,-.23,-.62);gunMesh.rotation.y=.05;gunMesh.traverse(o=>{if(o.material)o.renderOrder=o.renderOrder||6});camera.add(gunMesh)}
  if(gunMesh){gunMesh.visible=show;gunKick=Math.max(0,gunKick-dt*6);gunMesh.position.z=-.62+gunKick*.05;gunMesh.rotation.x=gunKick*.18+(P.ground?Math.sin(P.bob)*.015:0)}
  gunCD-=dt;$('#gunHint').hidden=!show||isTouch;if(show)$('#gunHint').innerHTML=`${KC('ЛКМ')} банановый пломбир · ${KC('G')} убрать`}
function shootMandarin(){if(gunCD>0)return;gunCD=.22;gunKick=1;const dir=new THREE.Vector3(0,0,-1).applyEuler(camera.rotation);const m=new THREE.Group();mesh(G.sph,mat(0xfff1b0),0,0,0,.12,.11,.12,m);mesh(G.hemi,mat(0x6a3a1e),0,.03,0,.1,.06,.1,m);for(let k=0;k<4;k++)mesh(G.box,mat(pick([0xff6b9a,0x7fe3e8,0xffd36b])),Math.cos(k*1.6)*.06,.09,Math.sin(k*1.6)*.06,.03,.008,.008,m);L.group.add(m);
  const o=new THREE.Vector3(.2,-.18,-.9).applyEuler(camera.rotation);L.proj.push({m,kind:'mand',x:camera.position.x+o.x,y:camera.position.y+o.y,z:camera.position.z+o.z,vx:dir.x*30,vy:dir.y*30+1.2,vz:dir.z*30,life:2.5,g:6});AU.sfx('pop');FXW.burst(camera.position.x+o.x,camera.position.y+o.y,camera.position.z+o.z,{col:0xeaf8ff,n:5,spd:1.2,up:.5,g:0,life:.35,size:.12})}
/* npcs say something funny when splatted */
function splatNPC(b){for(const n of L.npcs){if(n.noSplat)continue;const dx=b.x-n.x,dz=b.z-n.z,dy=b.y-(n.c.root.position.y+n.c.h*.6);if(dx*dx+dz*dz<.5&&Math.abs(dy)<n.c.h*.6){if(!n.splatT||T-n.splatT>2){n.splatT=T;toast(`${CAST[n.key].name}: ${pick(['Ай! Липко!','Эй, это мандарин?','Хи-хи, щекотно!','Вкусно, но в глаз!','Прямо в нос!'])}`);const c=n.c;tween(.3,p=>{c.root.position.y=n.y+Math.sin(p*Math.PI)*.35})}return true}}return false}

/* heat meter (Magmara only) */
function addHeat(v,msg){if(!L||!L.heatOn)return;L.heat=Math.min(100,(L.heat||0)+v);if(v>10){flash('rgba(255,120,40,.45)');AU.sfx('fire')}if(L.heat>=100){L.heat=0;AU.sfx('bad');respawn(msg||'Капик перегрелся и отдышался у точки возврата')}}

function buildP6(){
  newLevel('p6');L.heat=0;L.heatOn=true;
  setSky({top:0x1a0608,hor:0xff6a3a,bot:0x2a0808,fog:0x6a2414,near:38,far:150,hs:0xffc0a0,hg:0x3a1010,hi:.62,sc:0xffa070,si:.95,sd:[.3,.5,-.7],sunGlow:0xff7a40,stars:true});
  skyBody(0xff3a1a,[-150,90,-260],42,0xffab4a);skyBody(0xffd36b,[230,120,-120],10);
  L.spawn={x:0,y:0,z:9,yaw:0};L.surface='moss';L.pathKind='cobble';L.waterMsg='Ай-ай, лава! Капик отпрыгнул назад';
  path([[0,9],[0,-3]],1.6,0x6a4a44);path([[0,-3],[-12,-4]],1.3,0x6a4a44);path([[0,-3],[12,-4]],1.3,0x6a4a44);path([[-12,-13],[0,-20],[12,-13]],1.3,0x6a4a44);path([[0,-20],[0,-27]],1.6,0x6a4a44);
  placeUFO(0,16,{pad:0x5a4040});
  if(qs('c3')===4){S.q.c3=5;save()}
  /* lava river with two bridges */
  river(-50,50,-8,3.3,{col:0xffa040,deep:0xc8280a,op:.97});
  const glowL=[];for(let x=-44;x<=44;x+=11){const g=glow(0xff6a2a,9,.45);g.position.set(x,.6,-8);L.group.add(g);glowL.push(g)}
  for(const bx of[-12,12]){box(bx,0,-8,2.6,.3,9.4,0x5a3a30,{tex:TX.planks,surf:'wood'});for(const s of[-1,1])vis(G.box,0x3a2420,bx+s*1.25,.7,-8,.12,.8,9.4,0,0,0,.02,TX.planks)}
  tick((t,dt)=>{glowL.forEach((g,i)=>g.material.opacity=.38+Math.sin(t*2+i)*.1);if(Math.random()<dt*10)FXW.burst(-48+Math.random()*96,.3,-8+(Math.random()-.5)*5,{col:pick([0xffd36b,0xff6a2a]),n:2,spd:1,up:3,g:6,life:.8,size:.25});
    if(Math.random()<dt*20){const a=Math.random()*TAU,d=Math.random()*25;FXW.burst(P.x+Math.cos(a)*d,6+Math.random()*6,P.z+Math.sin(a)*d,{col:0x8a7a7a,n:1,spd:.2,up:-.4,g:.3,life:5,size:.15})}
    /* heat */
    const nearLava=Math.abs(P.z+8)<4.6&&!(Math.abs(Math.abs(P.x)-12)<1.4);L.heat=clamp((L.heat||0)+(nearLava?4:-9)*dt,0,100);$('#heatFill').style.width=L.heat+'%'});
  /* guide */
  const isk=npc('iskorka',5,0,4,{yaw:-.6,pose:'wave',trader:1,talk:iskorkaTalk,mark:()=>qs('c3')===5&&!S.seen.isk?'!':null});
  /* lava fountains guarding the gate */
  const Q=qd('c3');Q.cool=Q.cool||{};const FT=[[-16,-19],[16,-19],[0,-22]];const fountains=[];
  FT.forEach((f,i)=>{cyl(f[0],0,f[1],1.7,.9,0x3a2424,{g:G.cyl16,tex:TX.stone});const pool=mesh(G.disc,new THREE.MeshBasicMaterial({color:lc(0xff7a2a),toneMapped:false}),f[0],.92,f[1],1.45,.02,1.45,L.group);
    const col=mesh(new THREE.CylinderGeometry(.35,.6,1,12,1,true),new THREE.MeshBasicMaterial({color:lc(0xffa040),toneMapped:false,transparent:true,opacity:.9,side:THREE.DoubleSide}),f[0],1.9,f[1],1,2,1,L.group);const gl=glow(0xff6a2a,6,.7);gl.position.set(f[0],2.2,f[1]);L.group.add(gl);
    const F={x:f[0],z:f[1],hp:4,pool,col,gl,i,done:!!Q.cool[i]};fountains.push(F);
    const setCool=()=>{col.visible=false;gl.visible=false;pool.material.color.copy(lc(0x6a6670));};if(F.done)setCool();
    L.targets.push({x:f[0],y:2,z:f[1],r:1.5,get on(){return!F.done&&qs('c3')>=5},hit:()=>{F.hp--;AU.sfx('sizzle');FXW.burst(f[0],2.2,f[1],{col:0xdddddd,n:16,spd:2,up:3,g:-1,life:1.2,size:.6});col.scale.y=Math.max(.3,F.hp/4)*2;
      if(F.hp<=0){F.done=true;Q.cool[i]=1;save();setCool();AU.sfx('quest');const n=Object.keys(Q.cool).length;toast(`Фонтан остыл: ${n} из 3`);for(let k=0;k<4;k++)setTimeout(()=>FXW.burst(f[0],1.5,f[1],{col:0xeeeeee,n:20,spd:3,up:4,g:-1,life:1.6,size:.8}),k*200);if(n>=3)openGate(true)}}});
    tick((t,dt)=>{if(F.done)return;col.scale.y=(F.hp/4)*2*(1+Math.sin(t*6+i)*.15);col.position.y=.9+col.scale.y/2;if(Math.random()<dt*4)FXW.burst(f[0],1+col.scale.y,f[1],{col:pick([0xffd36b,0xff6a2a]),n:3,spd:2,up:4,g:8,life:.9,size:.3});if(Math.hypot(P.x-f[0],P.z-f[1])<2.6)addHeat(14*dt)})});
  /* castle of King Rogozhar */
  const WC=0x2a1c22,TOP=0x3a2a30;const wall=(x,z,w,d)=>{box(x,0,z,w,6,d,WC,{tex:TX.stone});for(let k=-w/2+.5;k<w/2;k+=1.6)if(w>d)vis(G.box,TOP,x+k,6.35,z,.8,.7,d,0,0,0,.03,TX.stone);for(let k=-d/2+.5;k<d/2;k+=1.6)if(d>w)vis(G.box,TOP,x,6.35,z+k,w,.7,.8,0,0,0,.03,TX.stone)};
  wall(-8.5,-28,13,1.2);wall(8.5,-28,13,1.2);wall(-15,-42,1.2,28);wall(15,-42,1.2,28);wall(0,-56,31.2,1.2);vis(G.box,WC,0,5.5,-28,4.2,1,1.2,0,0,0,.03,TX.stone);
  for(const p of[[-15,-28],[15,-28],[-15,-56],[15,-56]]){cyl(p[0],0,p[1],2.1,9,WC,{g:G.cyl16,tex:TX.stone});vis(G.cone,0x5a1a1a,p[0],10.4,p[1],2.6,2.8,2.6);gvis(G.box,0xff8a3a,p[0]+(p[1]>-40?0:0),6.4,p[1]+(p[1]>-40?2.12:-2.12),.5,.9,.06)}
  for(const s of[-1,1]){const fl=glow(0xff8a3a,2.6,.85);fl.position.set(s*3.2,4.2,-27.2);L.group.add(fl);vis(G.cyl,0x2a1a1a,s*3.2,3.4,-27.3,.08,1.2,.08)}
  const gateC=box(0,0,-28,4,5.2,1,0,{nv:true});const gateM=mesh(G.box,stdMat(0x5a2a1a,{roughness:.8}),0,2.6,-28,4,5.2,.6,L.group);for(let i=0;i<5;i++)mesh(G.box,stdMat(0x2a1a1a,{metalness:.6}),-1.6+i*.8,2.6,-27.65,.12,5.2,.1,L.group).userData.gate=1;
  const gateBars=L.group.children.filter(o=>o.userData.gate);
  function openGate(anim){gateC.on=false;if(!anim){gateM.visible=false;gateBars.forEach(b=>b.visible=false);return}AU.sfx('quest');banner('Ворота открыты','Замок Рогожара','Внутри король и братья');tween(1.6,p=>{gateM.position.y=2.6-p*5.4;gateBars.forEach(b=>b.position.y=2.6-p*5.4)},()=>{gateM.visible=false;gateBars.forEach(b=>b.visible=false)});if(qs('c3')<6)qset('c3',6)}
  if(qs('c3')>=6||Object.keys(Q.cool).length>=3)openGate(false);
  checkpoint(0,0,-24,6,3,0);checkpoint(0,0,-31,8,3,Math.PI*0);
  /* arena */
  vis(G.box,0x1f141a,0,.02,-42,28.6,.04,26.6,0,0,0,.02,TX.stone);for(let i=0;i<6;i++)gvis(G.box,0xff6a2a,(i%2?-1:1)*(4+i*1.4),.045,-34-i*3.2,.12,.01,2.6);
  for(const s of[-1,1]){gvis(G.box,0xff7a2a,s*13.6,.06,-42,.9,.04,24);const g2=glow(0xff6a2a,8,.35);g2.position.set(s*13.6,.4,-42);L.group.add(g2)}
  box(0,0,-51.5,7,1.2,4.4,0x3a2228,{tex:TX.stone});stairs(0,0,-47.2,Math.PI,2,3,.6,.7,0x3a2228);
  vis(G.box,0x5a1a2a,0,1.9,-52.4,2.4,1.4,1.2);vis(G.box,0x5a1a2a,0,3.6,-53,2.4,3.4,.4);for(const s of[-1,1])vis(G.cone,0xf4e6c8,s*1,5.6,-53,.25,1.1,.25,0,0,-s*.35);vis(G.box,0xffd36b,0,4.9,-52.78,.5,.5,.04);
  /* caged brothers */
  const CG=[['yuzik',-11,-36],['snezhok',-11,-46],['gribok',11,-36],['vintik',11,-46]];const cages=[];
  CG.forEach(cg=>{const g=new THREE.Group();g.position.set(cg[1],0,cg[2]);L.group.add(g);for(let i=0;i<12;i++){const a=i/12*TAU;mesh(G.cyl,stdMat(0x2a2a33,{metalness:.6}),Math.cos(a)*1,1.1,Math.sin(a)*1,.04,2.2,.04,g)}mesh(G.disc,stdMat(0x2a2a33,{metalness:.6}),0,2.25,0,1.1,.1,1.1,g);mesh(G.disc,stdMat(0x2a2a33),0,.05,0,1.1,.1,1.1,g);mergeModel(g);
    const c=addC({k:'c',x:cg[1],z:cg[2],r:1.1,y0:0,y1:2.3,t:'solid'});let b=null;if(qs('c3')<99){b=npc(cg[0],cg[1],.1,cg[2],{yaw:-Math.sign(cg[1])*Math.PI/2,pose:'sit',nc:true,r:2.6,talk:n=>talk(n,[[cg[0],pick(['Капик! Он не злой, он просто не спит триста лет!','Стреляй в него пломбиром, ему станет прохладно!','Я знал, что ты придёшь!'])]])});b.noSplat=true}cages.push({g,c,b,key:cg[0]})});
  /* imps */
  const imps=[];function imp(x,z,home){const c=makeCast('ugolek');c.root.position.set(x,0,z);L.group.add(c.root);const I={c,x,z,hx:x,hz:z,state:'idle',cd:0,t:Math.random()*5,home:home!==false,alive:true};
    I.tg={x,y:.7,z,r:.75,get on(){return I.alive},hit:()=>{I.alive=false;AU.sfx('sizzle');AU.sfx('pop');FXW.burst(I.x,.7,I.z,{col:0xdddddd,n:24,spd:2.5,up:3,g:-1,life:1.2,size:.6});c.root.visible=false;toast(pick(['Пш-ш! Уголёк остыл','Бесёнок зашипел и убежал','Уголёк стал простым камешком']));if(I.home)setTimeout(()=>{if(!L||!imps.includes(I))return;I.alive=true;I.x=I.hx;I.z=I.hz;c.root.visible=true},35000)}};
    L.targets.push(I.tg);imps.push(I);return I}
  [[-6,-15],[6,-15],[-20,-20],[20,-20],[0,-13.5],[-24,-2],[24,-2]].forEach(p=>imp(p[0],p[1]));
  tick((t,dt)=>{for(const I of imps){if(!I.alive)continue;const c=I.c;I.cd-=dt;const dx=P.x-I.x,dz=P.z-I.z,d=Math.hypot(dx,dz);let pose='idle';
    if(d<11&&Math.abs(P.y-0)<3){const sp=3.1*dt;I.x+=dx/d*sp;I.z+=dz/d*sp;pose='walk';c.walkPh+=dt*14;const ya=Math.atan2(dx,dz);c.root.rotation.y=ya}
    else{const hx=I.hx-I.x,hz=I.hz-I.z,hd=Math.hypot(hx,hz);if(hd>.5){I.x+=hx/hd*1.4*dt;I.z+=hz/hd*1.4*dt;pose='walk';c.walkPh+=dt*8;c.root.rotation.y=Math.atan2(hx,hz)}}
    const m={x:I.x,z:I.z};mobCollide(m,.35);if(Math.abs(m.z+8)<3.6&&Math.abs(Math.abs(m.x)-12)>1.3)m.z=I.z<-8?-11.7:-4.3;I.x=m.x;I.z=m.z;
    if(d<1.05&&I.cd<=0){I.cd=1.2;addHeat(26,'Бесёнки-угольки перегрели Капика');P.vx=dx/d*9;P.vz=dz/d*9;P.vy=4;P.ground=false;AU.sfx('fire');toast(pick(['Горячо! Бесёнок кусается','Ай! Как утюг!','Уголёк обжёгся об Капика. Или наоборот?']))}
    c.root.position.set(I.x,Math.abs(Math.sin(t*8+I.t))*.12,I.z);charPose(c,t,pose,dt,null);I.tg.x=I.x;I.tg.z=I.z}});
  /* ---- King Rogozhar ---- */
  const B=L.boss={hp:15,max:15,state:qs('c3')>=99?'asleep':'throne',x:0,y:1.2,z:-51.8,pi:0,fb:2.5,hop:null,phase:1};const K=makeCast('rogozhar');K.root.position.set(B.x,B.y,B.z);L.group.add(K.root);
  const bossHit={x:0,y:3.2,z:-51.8,r:1.7,get on(){return B.state==='fight'},hit:()=>{B.hp--;AU.sfx('splat');AU.sfx('sizzle');FXW.burst(B.x,B.y+3,B.z,{col:0xff9a2e,n:18,spd:3,up:2,life:.7,size:.4});FXW.burst(B.x,B.y+4,B.z,{col:0xeeeeee,n:8,spd:1.5,up:3,g:-1,life:1,size:.6});
    K.root.scale.set(1.08,.92,1.08);setTimeout(()=>K.root.scale.set(1,1,1),120);$('#bossFill').style.width=(B.hp/B.max*100)+'%';
    if(Math.random()<.35)toast(`Рогожар: ${pick(['Ай! Холодно!','Хо-хо, щекотно!','Кто кидается мороженым?!','Брр! Мне... приятно?'])}`);
    if(B.hp===10&&B.phase===1){B.phase=2;AU.sfx('roar');toast('Рогожар: Угольки, ко мне!');imp(-6,-40,false);imp(6,-40,false)}
    if(B.hp===5&&B.phase===2){B.phase=3;AU.sfx('roar');toast('Рогожар: Ну всё, я разогреваюсь!');imp(-8,-34,false);imp(8,-34,false);imp(0,-36,false)}
    if(B.hp<=0)bossDown()}};L.targets.push(bossHit);
  const fbs=[];function fireball(){const from=new THREE.Vector3(B.x+.9,B.y+3.6,B.z+.8);const lead=new THREE.Vector3(P.x+P.vx*.4,P.y+1,P.z+P.vz*.4);const dir=lead.sub(from);const d=dir.length();dir.normalize();const sp=11+B.phase;
    const m=new THREE.Group();m.add(glow(0xff6a2a,2.2,.95));mesh(G.sph,new THREE.MeshBasicMaterial({color:lc(0xffd36b),toneMapped:false}),0,0,0,.35,.35,.35,m);m.position.copy(from);L.group.add(m);
    const f={m,v:dir.multiplyScalar(sp),life:d/sp+1.5};f.v.y+=2;f.tg={x:from.x,y:from.y,z:from.z,r:.8,on:true,hit:()=>{f.life=0;AU.sfx('sizzle');FXW.burst(m.position.x,m.position.y,m.position.z,{col:0xeeeeee,n:16,spd:2,life:.8,size:.5})}};L.targets.push(f.tg);fbs.push(f);AU.sfx('fire')}
  function bossDown(){B.state='down';$('#bossBar').hidden=true;AU.music('p6');fbs.forEach(f=>f.life=0);imps.forEach(I=>{if(!I.home&&I.alive)I.tg.hit()});
    say([['rogozhar','Ох... Ох-хо-хо... Прохла-а-адно...'],['rogozhar','Триста лет на этой сковородке... И впервые мне... не жарко.'],['kapik','Ты украл моих братьев, чтобы остыть?'],['rogozhar','Я слышал, капибары самые спокойные в галактике. Думал, рядом с ними усну...'],['rogozhar','А-а-аууу... Пломбир... лучше... колыбельной... Хр-р-р...'],['kapik','Уснул. Братья, домой!']],()=>{
      B.state='asleep';K.root.position.set(0,1.2,-51.8);cages.forEach((cg,i)=>{setTimeout(()=>{cg.g.visible=false;cg.c.on=false;if(cg.b){const c=cg.b.c,y0=c.root.position.y;AU.sfx('beam');tween(1.3,p=>{c.root.position.y=y0+p*6;c.root.scale.setScalar(1-p*.9)},()=>{c.root.visible=false})}},i*450)});
      setTimeout(()=>{qcomplete('c3');showEnding(3)},2600)})}
  tick((t,dt)=>{const c=K;
    if(B.state==='throne'){c.root.position.set(0,1.2,-51.8);c.root.rotation.y=0;charPose(c,t,'sit',dt,tmpV.set(P.x,P.y,P.z));
      if(qs('c3')===6&&P.z<-31.5&&Math.abs(P.x)<14){B.state='intro';AU.sfx('roar');say([['rogozhar','КТО ПОСМЕЛ ВОЙТИ В МОЙ ЖАРКИЙ ЗАМОК?!'],['kapik','Капик. Старший брат. Отдай малышей!'],['rogozhar','Не отдам! Они такие спокойные... А я не сплю уже ТРИСТА ЛЕТ!'],['rogozhar','Попробуй отбери, пушистый! Огненные шары, вперёд!']],()=>{B.state='fight';B.fb=1.5;$('#bossBar').hidden=false;$('#bossFill').style.width='100%';AU.music('boss');B.x=0;B.y=0;B.z=-45})}}
    else if(B.state==='fight'){B.fb-=dt;if(B.fb<=0){B.fb=[0,2.2,1.6,1.15][B.phase];fireball();if(B.phase===3&&Math.random()<.5)setTimeout(()=>{if(B.state==='fight')fireball()},250)}
      if(!B.hop&&Math.random()<dt*(B.phase*.22)){const spots=[[0,-45],[-7,-41],[7,-41],[0,-38],[-5,-48],[5,-48]];const s=pick(spots);B.hop={x0:B.x,z0:B.z,x1:s[0],z1:s[1],t:0}}
      if(B.hop){B.hop.t+=dt/.8;const k=Math.min(1,B.hop.t);B.x=lerp(B.hop.x0,B.hop.x1,k);B.z=lerp(B.hop.z0,B.hop.z1,k);B.y=Math.sin(k*Math.PI)*3;if(k>=1){B.hop=null;B.y=0;AU.sfx('thud');FXW.burst(B.x,.2,B.z,{col:0xff6a2a,n:20,spd:5,up:2,life:.6,size:.4})}}
      c.root.position.set(B.x,B.y,B.z);c.root.rotation.y=Math.atan2(P.x-B.x,P.z-B.z);charPose(c,t,B.hop?'cheer':(B.fb<.4?'wave':'staff'),dt,null)}
    else if(B.state==='asleep'||B.state==='down'){c.root.position.set(0,1.2,-51.8);c.root.rotation.y=0;charPose(c,t,B.state==='asleep'?'lie':'think',dt,null);if(B.state==='asleep'&&Math.random()<dt*.8)FXW.burst(0,4.5,-51.8,{col:0xbfefff,n:1,spd:.2,up:1,g:-.3,life:2.5,size:.5})}
    else charPose(c,t,'sit',dt,null);
    bossHit.x=B.x;bossHit.y=B.y+3.2;bossHit.z=B.z;
    for(let i=fbs.length-1;i>=0;i--){const f=fbs[i];f.life-=dt;f.v.y-=3*dt;f.m.position.addScaledVector(f.v,dt);f.tg.x=f.m.position.x;f.tg.y=f.m.position.y;f.tg.z=f.m.position.z;
      const p=f.m.position;if(Math.hypot(p.x-P.x,p.z-P.z)<1&&p.y>P.y-.2&&p.y<P.y+2){f.life=0;addHeat(34,'Огненный шар перегрел Капика');FXW.burst(p.x,p.y,p.z,{col:0xff6a2a,n:24,spd:4,life:.7,size:.5})}
      if(p.y<.1||f.life<=0){if(p.y<.1)FXW.burst(p.x,.2,p.z,{col:0xff8a3a,n:12,spd:3,up:2,life:.6,size:.35});L.group.remove(f.m);f.tg.on=false;L.targets.splice(L.targets.indexOf(f.tg),1);fbs.splice(i,1)}}});
  L.onRespawn=()=>{L.heat=0;if(B.state==='fight'){fbs.forEach(f=>f.life=0)}};
  /* scenery: basalt, obsidian crystals, glowing cracks */
  const r=rng(71),avoid=[[0,16,7],[0,9,4],[5,4,3],[0,-8,5],[-12,-8,4],[12,-8,4],[0,-42,18],[-16,-19,4],[16,-19,4],[0,-22,4]];
  scatter(r,26,10,56,avoid,(x,z,s)=>{if(Math.abs(z+8)<5)return;for(let k=0;k<3;k++){const h=(1.2+r()*3)*s;vis(G.cyl6,pick([0x2a1a1a,0x3a2424,0x231418]),x+(k%2)*.8,h/2,z+(k>1?.8:0),.45*s,h,.45*s,0,r(),0,.03,TX.stone)}cyl(x+.4,0,z+.3,.9*s,1,0,{nv:true})});
  scatter(r,16,8,56,avoid,(x,z,s)=>{if(Math.abs(z+8)<5)return;for(let k=0;k<3;k++)vis(G.oct,0x4a2a5a,x+(r()-.5),.4*s,z+(r()-.5),.25*s,.7*s,.25*s,r()*.4,r()*3,r()*.4,.04)});
  scatter(r,24,6,56,avoid,(x,z,s)=>{if(Math.abs(z+8)<5)return;gvis(G.box,0xff6a2a,x,.03,z,.08,.01,1.6*s,0,r()*3,0)});
  grass(160,[0x3a1a1a,0x5a2a1a,0x2a1414],71);
  makeGround({edge:'basalt',c1:0x3a2422,c2:0x2a1a1a,mount:0x4a2a26,snow:0xff7a3a,path:0x6a4a44,seed:71,snowY:13,mh:20});
  finishLevel();
  AU.music(B.state==='fight'?'boss':'p6');AU.ambient('hum');
  L.arrive=[['kapik','Магмара... Жарко, как в печке. Воздух дрожит.'],['kapik','Где-то там замок Рогожара. Держитесь, малыши!']];
  L.objective=()=>{const st=qs('c3');if(st===99)return{text:'Рогожар сладко спит. На Магмаре наконец тихо',pos:null};
    if(st<=5){const left=fountains.filter(f=>!f.done);if(!left.length)return{text:'Ворота открыты. Иди в замок',pos:[0,2,-28],tag:'Глава 3'};let b=left[0],bd=1e9;for(const f of left){const d=Math.hypot(f.x-P.x,f.z-P.z);if(d<bd){bd=d;b=f}}
      return{text:`Остуди лавовые фонтаны пломбиром: ${3-left.length} из 3. Мост через лаву - слева и справа`,pos:[b.x,2.6,b.z],tag:'Глава 3'}}
    if(B.state==='fight')return{text:'Стреляй пломбиром в Рогожара. Сбивай огненные шары!',pos:null,tag:'Глава 3'};
    return{text:'Войди в замок и найди Рогожара',pos:P.z>-28?[0,2,-28]:[0,3,-50],tag:'Глава 3'}};
  $('#heat').hidden=false;$('#heat small').textContent='Жар';$('#bossBar b').textContent='Король Рогожар';
}
function iskorkaTalk(n){if(needTr('iskorka'))return;S.seen.isk=1;save();const st=qs('c3');
  if(st>=5&&st<99){talk(n,[['iskorka','Тс-с, гость! Я Искорка. Тут правит Король Рогожар. Он утащил в замок четырёх пушистиков.'],['iskorka','Ворота держат три лавовых фонтана. Остуди их, и ворота откроются.'],['iskorka','Бананомёт с пломбиром? Отличная идея! Холодные шарики шипят на лаве, как газировка.'],['iskorka','Бесёнки-угольки кусаются жаром. Шкала «Жар» слева: полная - и ты упадёшь без сил у точки возврата.']]);return}
  if(st===99){talk(n,[['iskorka','Король спит! Впервые за триста лет на Магмаре слышно, как поёт лава.']],()=>openTrade('iskorka'));return}
  openTrade('iskorka')}
