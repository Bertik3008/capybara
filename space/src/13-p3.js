/* ---------- LEVEL: P3 «Грибния» ---------- */
const CAPC=[0xb06ad6,0x7fe3e8,0xff8fb1,0x9b7dff,0xffab4a];
function shroom(x,z,top,r,col,o){o=o||{};const sr=o.sr||Math.max(.3,r*.22);cyl(x,0,z,sr,top-.55,0xe8dcc8,{g:G.cyl});vis(G.hemi,col,x,top-.6,z,r,.9,r,0,0,0,.04);vis(G.cyl16,new THREE.Color(col).multiplyScalar(.7).getHex(),x,top-.62,z,r*.98,.08,r*.98);
  for(let i=0;i<5;i++){const a=i*1.3+x,d=r*.55;gvis(G.sph,0xffffff,x+Math.cos(a)*d,top-.6+.75*Math.sqrt(1-(d/r)**2*.9)+.02,z+Math.sin(a)*d,.12*r/1.5,.05,.12*r/1.5)}
  addC({k:'c',x,z,r,y0:top-.6,y1:top,t:'solid',surf:'moss'})}
function pad(x,y,z,r,pow,col){vis(G.cyl,0xe8dcc8,x,y+.2,z,r*.3,.4,r*.3);vis(G.hemi,col||0x7fe3e8,x,y+.35,z,r,.45,r);gvis(G.disc,col||0x7fe3e8,x,y+.8,z,r*.7,.02,r*.7);const g=glow(col||0x7fe3e8,r*3,.5);g.position.set(x,y+.9,z);L.group.add(g);return addC({k:'c',x,z,r,y0:y,y1:y+.8,t:'bounce',pow:pow||15})}
function flower(id,x,y,z){const lit=()=>!!qd('m3').lit&&!!qd('m3').lit[id];vis(G.cyl,0x3f8a5a,x,y+.6,z,.07,1.2,.07);
  const head=new THREE.Group();head.position.set(x,y+1.3,z);L.group.add(head);const petM=new THREE.MeshPhongMaterial({color:0x6a5a8a,emissive:0x000000,flatShading:true});
  for(let i=0;i<6;i++){const p=mesh(G.sph,petM,Math.cos(i/6*TAU)*.32,0,Math.sin(i/6*TAU)*.32,.22,.08,.14,head);p.rotation.y=-i/6*TAU}const core=mesh(G.sph,new THREE.MeshBasicMaterial({color:0x554466}),0,.05,0,.18,.15,.18,head);
  const gl=glow(0xffe08a,5,0);head.add(gl);const set=on=>{petM.emissive.set(on?0xc97aff:0);core.material.color.set(on?0xfff0b0:0x554466);gl.material.opacity=on?.85:0};set(lit());
  tick(t=>{head.rotation.y=t*.4;if(lit())gl.scale.setScalar(4.5+Math.sin(t*3)*.6)});
  inter({x,y:y+.4,z,r:2,label:'E - зажечь цветок-фонарь',cond:()=>!lit(),act:()=>{if(qs('m3')<2){say([['kapik','Странный цветок. Похоже, его можно зажечь. Сначала спрошу местных, зачем.']]);return}
    const q=qd('m3');q.lit=q.lit||{};q.lit[id]=1;save();set(true);AU.sfx('lamp');FXW.burst(x,y+1.3,z,{col:0xffe08a,n:40,spd:4,life:1.2});const n=Object.keys(q.lit).length;toast(`Цветок-фонарь горит: ${n} из 3`);
    if(n>=3){qset('m3',3);L.reveal()}}});return{x,y,z,lit}}
function buildP3(){
  newLevel('p3');
  setSky({top:0x170c36,hor:0x6a3a8a,bot:0x2a1846,fog:0x3a2456,near:30,far:135,hs:0xd8b8ff,hg:0x2a1a3a,hi:.85,sc:0xffc8f0,si:.55,sd:[-.4,.4,-.6],sunGlow:0xff9ad8,stars:true});
  skyBody(0x7fe3e8,[150,110,-230],22,0xb28cff);skyBody(0xffab4a,[-200,60,-80],9);
  L.spawn={x:0,y:0,z:9,yaw:0};L.surface='moss';L.pathKind='moss';
  path([[0,9],[0,-30]],1.6,0x5a4a72);path([[0,4],[-10,-4]],1.3,0x5a4a72);path([[0,4],[20,8]],1.3,0x5a4a72);path([[0,9],[-8,18]],1.3,0x5a4a72);
  placeUFO(0,16,{pad:0x6a5a80});
  const q=qd('m3');q.lit=q.lit||{};
  /* elder snail on a cap */
  shroom(-12,-6,5,2.4,0xb06ad6);pad(-8.4,0,-3.8,.9);
  npc('sliz',-12.3,5,-6.3,{yaw:Math.PI*.3,talk:slizTalk,mark:()=>S.tr&&qs('m3')<2?'!':null,r:3,cr:.7});
  /* flower tower 1: staircase of caps */
  [[-22,-22,1.2,1.4],[-24.5,-23.5,2.4,1.4],[-26.5,-25.5,3.6,1.4],[-27.5,-28.2,4.8,1.4],[-25.4,-31,6,1.8]].forEach((c,i)=>shroom(c[0],c[1],c[2],c[3],CAPC[i%5]));
  const F1=flower('f1',-25.4,6,-31);node('shroom',-24.5,2.4,-23.5,{regrow:70});node('shroom',-27.5,4.8,-28.2,{regrow:70});node('shroom',-12.8,5,-5.2,{regrow:70});node('shroom',4,7,-40,{regrow:70});
  /* flower tower 2: bounce chain */
  pad(20,0,-24,.9);shroom(22.5,-26,4.6,1.8,0x9b7dff);pad(23.2,4.6,-26.6,.6,15);shroom(25.6,-29.2,9,2,0xff8fb1,{sr:.5});const F2=flower('f2',25.6,9,-29.2);
  node('shroom',22.5,4.6,-25.3,{regrow:70});node('shroom',25.6,9,-28.2,{regrow:70});
  /* frog village on stilts */
  const stilt=(x,z,w,d,top)=>{box(x,top-.3,z,w,.3,d,0x7a5a3a,{surf:'wood'});for(const a of[-1,1])for(const b of[-1,1])vis(G.cyl,0x5a4030,x+a*(w/2-.2),(top-.3)/2,z+b*(d/2-.2),.13,top-.3,.13)};
  stilt(22,10,4.4,4.4,3);stilt(30,10.5,4.4,4.4,3);box(26,2.8,10.3,3.8,.2,1.4,0x8a6a4a,{surf:'wood'});
  ladder(19.55,10,0,3,-Math.PI/2,0x5a4030);
  building({x:22.8,z:9.2,y:3,w:2.6,d:2.4,h:2.2,col:0x6fae5a,trim:0x5a4030,door:'s',dw:1.2,dh:1.9,roof:'gable',roofCol:0xb06ad6,rh:1.2,floor:0x7a5a3a});
  /* potion cauldron on granny's porch */
  vis(G.sph,0x2a2a33,20.6,3.45,8.6,.6,.5,.6,0,0,0,.03,TX.metal);gvis(G.disc,0xb9ff7a,20.6,3.82,8.6,.48,.02,.48);for(const a of[0,2.1,4.2])vis(G.cap,0x2a2a33,20.6+Math.cos(a)*.45,3.15,8.6+Math.sin(a)*.45,.06,.35,.06);const cg=glow(0xb9ff7a,2.4,.6);cg.position.set(20.6,4,8.6);L.group.add(cg);
  tick(t=>{if(Math.random()<.08)FXW.burst(20.6,3.9,8.6,{col:0xb9ff7a,n:1,spd:.3,up:.8,g:-.3,life:1.4,size:.3})});
  workshop(20.6,3,8.6,{title:'Зельеварня',help:'Помешивайте зелье в ритм: три точных нажатия - светоэликсир.',from:'shroom',need:4,to:'elixir',btn:'Помешать',r:2.2});
  box(30.8,3,9.5,1.6,1,1.2,0x8a5a3a,{tex:TX.planks});node('shroom',30.8,4,9.5,{regrow:70});
  const kvaba=npc('kvaba',21,3,11.5,{yaw:-.6,pose:'sit',trader:1,talk:kvabaTalk,mark:()=>!S.tr?null:qs('s3a')===0?'!':qs('s3a')===2?'?':null});
  const kvak=npc('kvak',29.5,3,11.6,{yaw:Math.PI,pose:'wave',talk:kvakTalk,mark:()=>S.tr&&!qdone('s3b')?'!':null});
  box(30,7.7,3,2.6,.3,2.6,0x7a5a3a,{surf:'wood'});for(const a of[-1,1])for(const b of[-1,1])cyl(30+a*1.1,0,3+b*1.1,.12,7.7,0x5a4030);railRect(28.7,1.7,31.3,4.3,8,0x5a4030,{side:'s',at:0,w:1.2});ladder(30,4.55,0,8,0,0x5a4030);
  vis(G.hemi,0xb06ad6,30,9.9,3,1.8,.8,1.8);for(const a of[-1,1])for(const b of[-1,1])vis(G.cyl,0x5a4030,30+a*1.1,9,3+b*1.1,.06,2,.06);
  const F3=flower('f3',30,8,3);
  npc('frog',16,0,16,{walk:[[16,16],[24,18],[26,6],[14,4]],speed:1.6,hop:true,talk:n=>{if(needTr('frog'))return;talk(n,[['frog',pick(['Ква! Синие грибы подкидывают высоко-высоко. Не бойся, на мох падать мягко.','Королевский гриб на севере. Говорят, на нём спит маленькая капибара.','Бабушка Ква-Ба потеряла светлячков. Опять.'])]])}});
  /* royal mushroom */
  const RX=0,RZ=-44;cyl(RX,0,RZ,2.5,5.5,0xe8dcc8,{g:G.cyl16});vis(G.hemi,0xd84a9a,RX,5.5,RZ,7.2,2,7.2);vis(G.cyl16,0x9a2a6a,RX,5.45,RZ,7.1,.15,7.1);for(let i=0;i<9;i++){const a=i/9*TAU;gvis(G.sph,0xfff0b0,RX+Math.cos(a)*4.5,6.9,RZ+Math.sin(a)*4.5,.4,.12,.4)}
  addC({k:'c',x:RX,z:RZ,r:7,y0:5.5,y1:7,t:'solid',surf:'moss'});pad(RX+8.6,0,RZ,.9,18.5,0xffd36b);checkpoint(RX,7,RZ,6,6,0);
  const caps=[];const capM=[0xb06ad6,0x7fe3e8,0xff8fb1,0x9b7dff,0xffab4a];
  for(let i=0;i<5;i++){const a=i*Math.PI/3,cx=RX+Math.cos(a)*5,cz=RZ+Math.sin(a)*5,top=8.1+i*1.15;const c=addC({k:'b',x0:cx-1.4,x1:cx+1.4,y0:top-.4,y1:top,z0:cz-1.4,z1:cz+1.4,t:'solid',surf:'moss',h:.4});
    const g=new THREE.Group();L.group.add(g);mesh(G.hemi,mat(capM[i]),0,-.3,0,1.6,.6,1.6,g);mesh(G.disc,bmat(capM[i]),0,-.32,0,1.55,.05,1.55,g);g.add(glow(capM[i],4,.4));c.m=g;c.h=.4;
    const on=qs('m3')>=3;c.on=on;g.visible=on;g.position.set(cx,top-.2,cz);caps.push({c,g,cx,cz,top,ph:i});
    mover(c,t=>[cx,top-.4+Math.sin(t*1.2+i)*.12,cz])}
  const gzC=addC({k:'c',x:RX,z:RZ,r:2.3,y0:13.45,y1:13.85,t:'solid',surf:'moss'});const gzG=new THREE.Group();L.group.add(gzG);
  mesh(G.cyl16,mat(0x7a5a3a),RX,13.65,RZ,2.3,.4,2.3,gzG);for(let i=0;i<4;i++){const a=i/4*TAU+.4;mesh(G.cyl,mat(0xe8dcc8),RX+Math.cos(a)*1.8,14.95,RZ+Math.sin(a)*1.8,.1,2.2,.1,gzG)}mesh(G.hemi,mat(0xe2453c),RX,16.05,RZ,2.6,1.2,2.6,gzG);
  const svC=addC({k:'c',x:RX+4.4*Math.cos(-1.1),z:RZ+4.4*Math.sin(-1.1),r:1,y0:15.05,y1:15.45,t:'solid'});const svG=mesh(G.hemi,mat(0xffd36b),svC.x,15.0,svC.z,1.1,.45,1.1,L.group);
  const shown=qs('m3')>=3;gzC.on=svC.on=shown;gzG.visible=svG.visible=shown;
  const gribok=!S.rescued.p3?npc('gribok',RX+.3,13.85,RZ-.2,{yaw:.4,pose:'lie',nc:true}):null;if(gribok)gribok.c.root.visible=shown;
  const sv=souvenir('p3',svC.x,15.45,svC.z);if(sv&&!shown)sv.obj.visible=false;if(sv)sv.cond=()=>qs('m3')>=3;
  if(gribok){const zz=textSprite('z z z',{size:40,h:.45,bg:'rgba(0,0,0,0)',fg:'#d7a0ff'});zz.position.set(RX+.3,15.1,RZ);L.group.add(zz);tick(t=>{zz.visible=gribok.c.root.visible&&!S.rescued.p3;zz.position.y=15.1+(t%2)*.3;zz.material.opacity=1-(t%2)/2})
    inter({x:RX,y:13.85,z:RZ,r:2.6,hold:1.4,label:'Удерживайте E - разбудить Грибка',cond:()=>qs('m3')>=3&&!S.rescued.p3,act:()=>say([['gribok','Хр-р... М-м? Капик? Я спал всего пять минут?'],['kapik','Пять дней, соня. Тебя унёс Космический Чих.'],['gribok','А я думал, мне снится. Тут так мягко...'],['kapik','Телепорт отправит тебя домой. Там тоже мягко. Обещаю.']],()=>rescueBro('p3',gribok))})}
  L.reveal=()=>{banner('Цветы-фонари горят','Королевский гриб проснулся','Над ним появились летающие шляпки');AU.sfx('quest');gzC.on=svC.on=true;gzG.visible=svG.visible=true;if(gribok)gribok.c.root.visible=true;if(sv)sv.obj.visible=true;
    caps.forEach((k,i)=>{setTimeout(()=>{k.c.on=true;k.g.visible=true;k.g.scale.setScalar(.01);tween(.6,p=>k.g.scale.setScalar(Math.max(.01,p)));AU.sfx('ring');FXW.burst(k.cx,k.top,k.cz,{col:0xd7a0ff,n:20,spd:3,life:.8})},i*350)})};
  /* fireflies quest */
  const ffp=[[-6,1.2,-14],[10,1.6,-18],[-18,1.4,4],[-26.5,4.8,-25.5],[31,4.2,9],[-30,1,10],[-12,1.3,22],[22.5,5.8,-26]];const FF=[];
  ffp.forEach((p,i)=>{if(S.got['ff'+i])return;const g=glow(0xd8ff7a,1.4,.95);g.position.set(p[0],p[1],p[2]);L.group.add(g);FF.push({g,p,i,ph:Math.random()*6})});
  tick((t,dt)=>{const on=qs('s3a')===1;for(const f of FF){if(f.done)continue;f.g.visible=on;if(!on)continue;const x=f.p[0]+Math.sin(t*1.3+f.ph)*.6,y=f.p[1]+Math.sin(t*2.1+f.ph)*.3,z=f.p[2]+Math.cos(t*1.1+f.ph)*.6;f.g.position.set(x,y,z);f.g.material.opacity=.6+Math.sin(t*6+f.ph)*.35;
    if(Math.hypot(P.x-x,P.y+1-y,P.z-z)<1.4){f.done=true;f.g.visible=false;S.got['ff'+f.i]=1;const qq=qd('s3a');qq.n=(qq.n||0)+1;save();AU.sfx('item');FXW.burst(x,y,z,{col:0xd8ff7a,n:16,spd:2,life:.7});toast(`Светлячки: ${qq.n} из 8`);if(qq.n>=8)qset('s3a',2)}}});
  /* hollow log */
  const lg=mesh(new THREE.CylinderGeometry(1.4,1.4,7,14,1,true),new THREE.MeshPhongMaterial({color:0x6b4a32,side:THREE.DoubleSide,flatShading:true}),-30,1.3,10,1,1,1,L.group);lg.rotation.z=Math.PI/2;lg.castShadow=true;
  box(-30,0,11.3,7,2.4,.3,0,{nv:true});box(-30,0,8.7,7,2.4,.3,0,{nv:true});box(-30,2.3,10,7,.4,2.8,0,{nv:true});node('shroom',-31.5,0,10,{regrow:60});node('shroom',-28.5,0,10,{regrow:60});
  for(let i=0;i<6;i++)gvis(G.sph,0xd8ff7a,-33+i*1.2,2.75,10+(i%2?.4:-.3),.12,.1,.12);
  /* glow pond + race finish */
  water(-9,21,4,{safe:true,col:0x5a3a8a});const fin=flag(-8,16,0xffd36b,3.2);
  const RC={on:false,i:0,x:0,z:0};const route=[[27,6],[16,8],[6,1],[-4,4],[-9,13],[-8,16]];
  const fz=kvak;kvakTalk.start=()=>{RC.on=true;RC.i=0;RC.x=27;RC.z=6;fz.hold=true;fz.c.root.position.set(27,0,6);fz.x=27;fz.z=6;fz.y=0;if(fz.col)fz.col.on=false;$('#timer').hidden=false;$('#timer').innerHTML='<small>Обгони Квака</small>Старт!';AU.sfx('ok')};
  tick((t,dt)=>{if(!RC.on)return;const tg=route[RC.i];const dx=tg[0]-RC.x,dz=tg[1]-RC.z,d=Math.hypot(dx,dz);const sp=4.8*dt;if(d<sp){RC.i++;if(RC.i>=route.length){RC.on=false;$('#timer').hidden=true;AU.sfx('bad');toast('Квак первый! Поговори с ним, чтобы попробовать снова');resetKvak();return}}else{RC.x+=dx/d*sp;RC.z+=dz/d*sp}
    const c=fz.c;c.root.position.set(RC.x,Math.abs(Math.sin(t*7))*.5,RC.z);c.root.rotation.y=Math.atan2(dx,dz);c.walkPh+=dt*10;fz.pose='walk';
    const pd=Math.hypot(P.x+8,P.z-16);$('#timer').innerHTML=`<small>До флага</small>${Math.round(pd)} м`;if(pd<2.6){RC.on=false;$('#timer').hidden=true;qcomplete('s3b');resetKvak(true)}});
  function resetKvak(win){fz.hold=false;fz.pose=win?'cheer':'wave';fz.c.root.position.set(29.5,3,11.6);fz.x=29.5;fz.z=11.6;fz.y=3;if(fz.col)fz.col.on=true}
  /* scenery */
  const r=rng(41),avoid=[[0,16,7],[0,9,4],[-12,-6,4],[-25,-27,8],[23,-27,6],[26,9,10],[0,-44,10],[-30,10,5],[-9,21,6],[-8,16,3]];
  scatter(r,34,10,58,avoid,(x,z,s)=>{const top=(2.5+r()*4.5)*s;shroom(x,z,top,(1.2+r()*1.4)*s,pick(CAPC))});
  scatter(r,30,6,58,avoid,(x,z,s)=>{vis(G.cyl,0xe8dcc8,x,.3*s,z,.08*s,.6*s,.08*s);gvis(G.hemi,pick(CAPC),x,.55*s,z,.3*s,.2*s,.3*s)});
  scatter(r,8,12,50,avoid,(x,z,s)=>rock(x,z,s*.8,0x4a3a6a));
  tick((t,dt)=>{if(Math.random()<dt*14){const a=Math.random()*TAU,d=Math.random()*30;FXW.burst(P.x+Math.cos(a)*d,.5+Math.random()*4,P.z+Math.sin(a)*d,{col:pick([0xd8ff7a,0xd7a0ff,0x7fe3e8]),n:1,spd:.4,up:.3,g:-.1,life:3,size:.25})}});
  grass(500,[0x5a3a7a,0x4a2a6a,0x6a4a8a],42);
  makeGround({edge:'shrooms',c1:0x3e2c56,c2:0x2e2244,mount:0x4a3a6a,snow:0xb28cff,path:0x5a4a72,seed:41,snowY:14,mh:18});
  finishLevel();
  AU.music('p3');AU.ambient('drips');
  L.arrive=[['kapik','Светящиеся грибы... Тут даже воздух мерцает.'],['kapik','Грибок наверняка где-то спит. Он везде спит.']];
  L.objective=()=>{if(S.rescued.p3)return{text:nRescued()===4?'Все братья спасены. Лети на базу':'Грибок спасён. Удерживай E у тарелки, чтобы лететь дальше',pos:[0,3.2,16]};
    if(!S.tr)return{text:'Жители говорят на своём языке. Переводчик продаётся на базе',pos:null};
    const st=qs('m3');if(st<2)return{text:'Найди Старейшину Слизь на шляпке гриба. Синие грибы подбрасывают вверх',pos:[-12,6.8,-6]};
    if(st===2){const fl=[F1,F2,F3].filter(f=>!f.lit());let b=fl[0],bd=1e9;for(const f of fl){const d=Math.hypot(f.x-P.x,f.z-P.z);if(d<bd){bd=d;b=f}}return{text:`Зажги цветы-фонари: ${3-fl.length} из 3`,pos:b?[b.x,b.y+1.5,b.z]:null}}
    return{text:'Поднимись по летающим шляпкам и разбуди Грибка. Золотой гриб подбросит на Королевский',pos:P.y>6?[RX,15,RZ]:[RX+8.6,1.5,RZ]}};
}
function slizTalk(n){if(needTr('sliz'))return;const st=qs('m3');
  if(st<2){talk(n,[['sliz','Ш-ш-ш... Медленно, капибара. Здесь всё делается медленно.'],['sliz','Твой брат в грибной шляпке уснул на вершине Королевского гриба. Туда ведут только летающие шляпки.'],['sliz','Шляпки просыпаются, когда горят три цветка-фонаря. Цветы растут на самых высоких грибах.'],['sliz','Один на западе, на лестнице из шляпок. Другой на востоке, туда подбросят синие грибы. Третий на вышке лягушачьей деревни.']],()=>qset('m3',2));return}
  talk(n,[['sliz',st>=3?'Ш-ш-ш... Шляпки летают. Золотой гриб у Королевского подбросит тебя наверх.':`Цветов горит: ${Object.keys(qd('m3').lit||{}).length} из 3. Не торопись.`]])}
function kvabaTalk(n){if(needTr('kvaba'))return;const st=qs('s3a');
  if(st===0){talk(n,[['kvaba','Ква-а... Внучек, мои светлячки разлетелись, а без них фонарь не светит.'],['kvaba','Поймай восемь. Просто подойди к ним вплотную, они ленивые. Дам 10 монет.']],()=>qset('s3a',1));return}
  if(st===2){talk(n,[['kvaba','Все восемь! Фонарь снова горит. Держи монетки, внучек.']],()=>qcomplete('s3a'));return}
  if(qdone('s3a')){openTrade('kvaba');return}talk(n,[['kvaba',`Светлячков: ${qd('s3a').n||0} из 8. Они любят высокие шляпки и старое бревно. А светогрибы я покупаю.`]],()=>openTrade('kvaba'))}
function kvakTalk(n){if(needTr('kvak'))return;
  if(qdone('s3b')){talk(n,[['kvak','Ты обогнал меня! Никто никогда не обгонял Квака.']]);return}
  talk(n,[['kvak','Ква! Гонка до золотого флага у пруда! Кто первый, тот и чемпион.'],['kvak','Выиграешь, отдам 12 монет. Я стартую снизу. Раз, два... три!']],()=>{if(!qs('s3b'))qset('s3b',1);kvakTalk.start()})}
