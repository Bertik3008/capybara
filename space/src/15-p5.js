/* ---------- LEVEL: P5 «Одуванчия» (глава 2) ---------- */
/* chapter-2 objective shown on every other planet while the chapter runs */
function chapterObj(){const s3=qs('c3');if(s3&&s3<99&&L){const id=L.id;
    if(s3===1)return id==='base'?{text:'Братьев нет! У тарелки лежит обгоревшая записка',pos:[3.5,1.2,-5.5],tag:'Глава 3'}:{text:'Лети на базу: братья пропали',pos:null,tag:'Глава 3'};
    if(s3===2)return id==='p1'?{text:'Найди Морковку в домике на дереве на востоке сада',pos:[36.8,6.6,-3.4],tag:'Глава 3'}:{text:'Лети на Мандарину: у Морковки есть игрушечный Мандаринострел',pos:null,tag:'Глава 3'};
    if(s3===3)return id==='p1'?{text:'Забери Мандаринострел из сундучка в домике на дереве',pos:[34.7,5.8,-5.3],tag:'Глава 3'}:{text:'Лети на Мандарину за Мандаринострелом',pos:null,tag:'Глава 3'};
    if(id!=='p6')return{text:'Лети на Магмару: открой карту клавишей M',pos:null,tag:'Глава 3'};return null}
  const st=qs('c2');if(!st||st===99||!L)return null;const id=L.id;
  if(st===1)return id==='base'?{text:'Радист Крот машет с вышки: он поймал странный сигнал',pos:[-10,9.5,20],tag:'Глава 2'}:{text:'Лети на базу: Радист Крот поймал странный сигнал',pos:null,tag:'Глава 2'};
  if(id==='p5')return null;
  if(st===4){if(!(S.inv.juice>0))return{text:'Для лекарства нужен мандариновый сок: 5 мандаринов в сокодавильне на Мандарине',pos:null,tag:'Глава 2'};
    if(!(S.inv.elixir>0))return{text:'Для лекарства нужен светоэликсир: 4 светогриба в зельеварне на Грибнии',pos:null,tag:'Глава 2'};
    return{text:'Сок и эликсир в сумке. Лети к Пушинке на Одуванчию',pos:null,tag:'Глава 2'}}
  if(st===5){if(id==='p4')return{text:'Поставь пуховый фильтр на дымящую трубу завода. Ступени вьются вокруг трубы',pos:[L.chimney?L.chimney[0]:0,14.5,L.chimney?L.chimney[1]:0],tag:'Глава 2'};
    return{text:'Лети на Шестерёнку: пуховый фильтр нужно поставить на трубу завода',pos:null,tag:'Глава 2'}}
  return{text:'Лети на Одуванчию: открой карту клавишей M',pos:null,tag:'Глава 2'}}

function buildP5(){
  newLevel('p5');
  setSky({top:0x5aa8e0,hor:0xfff0c8,bot:0xffe8b8,fog:0xfff0d0,near:50,far:185,hs:0xfffaf0,hg:0x7a9a5a,hi:.72,sc:0xfff4d8,si:.85,sd:[-.35,.6,-.5],sunGlow:0xfff8d0,clouds:14});
  skyBody(0xffe8f0,[160,120,-260],20);skyBody(0x8fdc7a,[-240,90,-120],12);
  L.spawn={x:0,y:0,z:9,yaw:0};L.surface='grass';
  path([[0,9],[0,-23]],1.7,0xc8b080);path([[0,4],[-20,6]],1.4,0xc8b080);path([[0,4],[18,6]],1.4,0xc8b080);path([[0,-4],[26,-12]],1.2,0xc8b080);
  placeUFO(0,16,{pad:0xb8b090});
  if(qs('c2')===2){S.q.c2=3;save()}
  const SX=0,SZ=-30;L.stem=[SX,SZ];
  /* ---- the Great Fluff: stem, leaves, wind, drifting seeds, sepal ring and the puffball ---- */
  cyl(SX,0,SZ,1.5,32,0x5aa04a,{g:G.cyl16});for(let y=2;y<32;y+=4)vis(G.cyl16,0x4a8a3c,SX,y,SZ,1.53,.25,1.53);
  const leafAt=(a,y,r,big)=>{const x=SX+Math.cos(a)*(r||3.6),z=SZ+Math.sin(a)*(r||3.6),w=big?3.4:2.6;vis(G.sph,0x6abf4a,x,y-.15,z,w*.62,.16,w*.55,0,-a,0);vis(G.box,0x4a8a3c,x,y-.06,z,w*.9,.04,.08,0,-a,0);vis(G.cyl,0x5aa04a,(x+SX)/2,y-.35,(z+SZ)/2,.12,.12,(r||3.6)*.9,Math.PI/2,-a+Math.PI/2,0);
    return box(x,y-.3,z,w*.8,.3,w*.8,0,{nv:true,surf:'moss'})};
  const steps=[[1.55,1.2],[2.35,2.4],[3.15,3.6],[3.95,4.8],[4.75,6.0]];steps.forEach(s=>leafAt(s[0],s[1]));
  /* updraft columns: wind lifts Kapik like a dandelion seed */
  const drafts=[];const draft=(x,z,y0,y1,r)=>{const d={x,z,y0,y1,r};drafts.push(d);const m=mesh(new THREE.CylinderGeometry(r,r,y1-y0,24,1,true),new THREE.MeshBasicMaterial({color:0xfff8d8,transparent:true,opacity:.1,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending,toneMapped:false}),x,(y0+y1)/2,z,1,1,1,L.group);d.m=m;
    for(let i=0;i<5;i++){const rg=mesh(G.torThin,new THREE.MeshBasicMaterial({color:0xfff8d8,transparent:true,opacity:.35,depthWrite:false,toneMapped:false}),x,y0,z,r,r,r,L.group);rg.rotation.x=Math.PI/2;d['r'+i]=rg}return d};
  const a1=5.55,U1=draft(SX+Math.cos(a1)*3.7,SZ+Math.sin(a1)*3.7,5.7,17.3,1.25);leafAt(6.35,16.5,3.6,true);checkpoint(SX+Math.cos(6.35)*3.6,16.5,SZ+Math.sin(6.35)*3.6,2.6,2.6,0);
  const seeds=[];for(let i=0;i<3;i++){const y=17.7+i*1.2;const c=addC({k:'b',x0:-1.1,x1:1.1,y0:y-.25,y1:y,z0:-1.1,z1:1.1,t:'solid',surf:'moss',h:.25});const g=new THREE.Group();L.group.add(g);
    mesh(G.cyl16,mat(0xfff6e0),0,-.12,0,1.15,.12,1.15,g);for(let k=0;k<10;k++){const a=k/10*TAU;const s=mesh(G.cyl,mat(0xfffbe8),Math.cos(a)*.7,.25,Math.sin(a)*.7,.03,.8,.03,g);s.rotation.set(Math.sin(a)*.5,0,-Math.cos(a)*.5)}g.add(glow(0xfff2b0,3.2,.35));c.m=g;c.h=.25;
    const ph=i*.55,rr=5.6;seeds.push(c);mover(c,t=>{const a=t*.32+ph;return[SX+Math.cos(a)*rr,y-.25+Math.sin(t*1.4+i)*.12,SZ+Math.sin(a)*rr]})}
  const a7=2.2;leafAt(a7,21.3,3.6,true);checkpoint(SX+Math.cos(a7)*3.6,21.3,SZ+Math.sin(a7)*3.6,2.6,2.6,0);
  const U2=draft(SX+Math.cos(a7)*6.4,SZ+Math.sin(a7)*6.4,21,33,1.3);
  /* sepal ring and puffball */
  addC({k:'c',x:SX,z:SZ,r:5.4,y0:31.7,y1:32,t:'solid',surf:'moss'});vis(G.cyl16,0x5aa04a,SX,31.85,SZ,5.4,.3,5.4);
  for(let i=0;i<12;i++){const a=i/12*TAU;vis(G.sph,0x6abf4a,SX+Math.cos(a)*5.3,31.7,SZ+Math.sin(a)*5.3,1.4,.14,.5,0,-a,.5)}
  const puff=new THREE.Group();puff.position.set(SX,40,SZ);L.group.add(puff);const pm=mesh(new THREE.IcosahedronGeometry(6,3),stdMat(0xfffbea,{roughness:1}),0,0,0,1,1,1,puff);pm.castShadow=true;
  for(let i=0;i<70;i++){const u=Math.random()*2-1,a=Math.random()*TAU,q=Math.sqrt(1-u*u),dir=new THREE.Vector3(q*Math.cos(a),u,q*Math.sin(a));const s=mesh(G.cyl,mat(0xf4ecd0),dir.x*7,dir.y*7,dir.z*7,.05,2.4,.05,puff);s.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir);const tip=mesh(G.sph,bmat(0xfffbe8),dir.x*8.2,dir.y*8.2,dir.z*8.2,.35,.35,.35,puff)}
  const pg=glow(0xfff4c0,26,.35);puff.add(pg);addC({k:'c',x:SX,z:SZ,r:4.2,y0:34.6,y1:48,t:'solid'});
  const face=textSprite('◕‿◕',{size:64,h:1.6,bg:'rgba(0,0,0,0)',fg:'#c98a5a'});face.position.set(SX,37.4,SZ+5.4);L.group.add(face);
  checkpoint(SX,32,SZ+3.5,4,3,0);
  tick((t,dt)=>{puff.rotation.y=t*.05;const sick=qs('c2')!==99;puff.scale.setScalar(1+Math.sin(t*(sick?2.4:1))*(sick?.025:.01));face.material.opacity=.9;
    for(const d of drafts){d.m.material.opacity=.07+Math.sin(t*3)*.03;for(let i=0;i<5;i++){const k=((t*.35+i/5)%1);const rg=d['r'+i];rg.position.y=d.y0+k*(d.y1-d.y0);rg.material.opacity=.35*Math.sin(k*Math.PI)}
      if(Math.random()<dt*10)FXW.burst(d.x+(Math.random()-.5)*d.r,d.y0+Math.random()*(d.y1-d.y0),d.z+(Math.random()-.5)*d.r,{col:0xfff8d8,n:1,spd:.3,up:4,g:-2,life:1.2,size:.25});
      if(Math.hypot(P.x-d.x,P.z-d.z)<d.r&&P.y>=d.y0-.2&&P.y<d.y1){P.vy=P.y<d.y1-1.4?Math.min(9,Math.max(P.vy,0)+42*dt):Math.max(1.3,P.vy-26*dt);P.ground=false;if(!S.seen.draft){S.seen.draft=1;save();toast('Ветер подхватил Капика! Двигайтесь в сторону листа')}}}});
  /* glider: hold jump while falling */
  tick((t,dt)=>{if(!S.got.glider||P.ground||P.ladder||!keys.Space||P.vy>-2.4)return;P.vy=-2.4;if(Math.random()<dt*12)FXW.burst(P.x,P.y+2.2,P.z,{col:0xfffbe8,n:1,spd:.5,up:.5,g:0,life:.6,size:.25})});
  /* ---- Pushinka at the stem base ---- */
  box(SX+4.2,0,SZ+5.5,2.4,.5,1.4,0x8a6a4a,{tex:TX.planks});
  npc('pushinka',SX+3.2,0,SZ+5.2,{yaw:Math.PI*.85,pose:'wave',talk:pushinkaTalk,mark:()=>{const st=qs('c2');return st===3||(st===4&&S.inv.juice>0&&S.inv.elixir>0)||st===6?'!':null}});
  /* ---- the village of flying squirrels ---- */
  const stump=(x,z,r,h,roof)=>{cyl(x,0,z,r,h,0x7a5a3a,{g:G.cyl16,tex:TX.bark});if(roof)vis(G.cone,roof,x,h+1.1,z,r*1.35,2.2,r*1.35);else{vis(G.cyl16,0x9a7a52,x,h+.02,z,r*1.02,.06,r*1.02);for(let i=0;i<8;i++){const a=i/8*TAU;gvis(G.sph,0xffd36b,x+Math.cos(a)*(r-.2),h+.12,z+Math.sin(a)*(r-.2),.08,.08,.08)}}vis(G.box,0x3a2a1a,x,1.1,z+r-.02,.9,1.6,.08);vis(G.box,0xffe8a0,x+r*.62,h*.62,z+r*.72,.5,.5,.06,0,-.7,0)};
  stump(-22,10,2.6,4.2,0);stump(-28,2,2.2,3.6,0xffab4a);stump(-16,18,2,3.4,0x7fc0e8);
  npc('oreshka',-22,0,13.4,{yaw:0,pose:'idle',talk:oreshkaTalk,mark:()=>!S.tr?null:qs('s5a')===0?'!':qs('s5a')===2?'?':null});
  /* Shishkin's pillow shop */
  building({x:18,z:4,w:5,d:4,h:2.8,col:0xf0d8b0,trim:0x8a5a3a,door:'s',dw:1.6,dh:2.2,roof:'gable',roofCol:0x6abf8a,rh:1.4});
  box(18,0,7.2,3.2,.9,.9,0x8a5a32,{tex:TX.planks});for(let i=0;i<3;i++)vis(G.sph,0xf4d0e8,17+i*1,1.05,7.2,.32,.12,.24);
  npc('shishkin',18,0,8.4,{yaw:Math.PI,trader:1,talk:shishkinTalk,mark:()=>!S.tr?null:qs('s5b')===0?'!':qs('s5b')===1&&(S.inv.pillow||0)>=2?'?':null});
  vis(G.box,0x6b4628,21.6,.55,6.6,1.6,1.1,1,0,0,0,.02,TX.planks);vis(G.cyl,0xf4d0e8,21.6,1.2,6.6,.5,.2,.4);
  workshop(21.6,0,6.6,{title:'Подушечная',kind:'mash',help:'Взбивайте пух: жмите E или кнопку быстро-быстро, пока подушка не станет пышной.',from:'fluff',need:5,to:'pillow',btn:'Взбить',r:2.2});
  /* bee on a giant flower tower (bouncy heads) */
  const gflower=(x,z,top,r,col,pow)=>{vis(G.cyl,0x5aa04a,x,top/2,z,.25,top,.25);for(let i=0;i<8;i++){const a=i/8*TAU;vis(G.sph,col,x+Math.cos(a)*r*.75,top+.05,z+Math.sin(a)*r*.75,r*.45,.12,r*.28,0,-a,0)}vis(G.sph,0xffd36b,x,top+.12,z,r*.45,.2,r*.45);
    return addC({k:'c',x,z,r:r*.9,y0:top-.2,y1:top+.2,t:pow?'bounce':'solid',pow:pow||0,surf:'moss'})};
  gflower(30,-4,1.4,1.4,0xff8fb1,15);gflower(33,-8,5.2,1.6,0xb28cff,14);gflower(30,-12.5,8.6,1.8,0x7fc0e8,0);
  npc('bee',29.6,8.8,-12.2,{yaw:-2.2,pose:'wave',nc:true,r:3,talk:n=>{if(needTr('bee'))return;talk(n,[['bee',pick(['Жу-жу! Розовые цветы пружинят. Прыгай прямо на серединку!','Великий Пух чихает раз в сто лет. В прошлый раз чих долетел до самого Пастбища.','С облачного острова видно всю Одуванчию. Туда только планировать, ж-ж-ж.'])]])}});
  /* cloud island (reach it by gliding from the high leaf) */
  const IX=20,IZ=-34,IY=8;addC({k:'b',x0:IX-2.6,x1:IX+2.6,y0:IY-.6,y1:IY,z0:IZ-2.6,z1:IZ+2.6,t:'solid',surf:'moss'});
  for(let i=0;i<9;i++){const a=i/9*TAU;vis(G.sph,0xffffff,IX+Math.cos(a)*2.2,IY-.5,IZ+Math.sin(a)*2.2,1.3,.8,1.3)}vis(G.sph,0xffffff,IX,IY-.45,IZ,2.6,.5,2.6);
  /* fluff meadow: gather star fluff */
  const fl=[[-8,-6],[-12,-14],[9,-8],[12,-16],[-6,18],[8,20],[-30,-12],[26,14],[-18,-24],[16,-24]];
  fl.forEach(p=>node('fluff',p[0],0,p[1],{regrow:50,yield:2}));
  /* lost squirrel kids (side quest) */
  const kids=[[IX,IY,IZ,'на облачном острове'],[30,8.8,-12.5,'на синем цветке'],[-21.4,4.2,10.6,'на крыше высокого пня']];
  kids.forEach((k,i)=>{if(S.got['kid'+i]||qdone('s5a'))return;const n=npc('belchonok',k[0]+(i===1?.8:0),k[1],k[2]+(i===1?.6:0),{yaw:Math.random()*6,pose:'wave',nc:true,r:2.4,label:'Удерживайте E - отправить бельчонка домой',talk:()=>{}});
    n.it.hold=1;n.it.cond=()=>qs('s5a')===1;n.it.act=()=>{S.got['kid'+i]=1;const q=qd('s5a');q.n=(q.n||0)+1;save();AU.sfx('beam');const c=n.c.root,y0=c.position.y;n.it.cond=()=>false;tween(1.2,p=>{c.position.y=y0+p*5;c.scale.setScalar(1-p*.9)},()=>{c.visible=false;FXW.burst(c.position.x,c.position.y,c.position.z,{col:0xfff2b0,n:24,spd:3,life:.9})});toast(`Бельчата: ${q.n} из 3`);if(q.n>=3)qset('s5a',2)};
    n.vis=true;n.kid=i});
  /* roof of the tall stump is the third kid's spot: ladder up */
  ladder(-22,7.3,0,4.2,0,0x6b4628);
  /* scenery */
  const r=rng(61),avoid=[[0,16,7],[0,9,4],[SX,SZ,9],[-22,10,8],[18,5,7],[31,-8,7],[IX,IZ,5],[0,-4,3]];
  scatter(r,26,12,58,avoid,(x,z,s)=>tree(x,z,s*1.1,pick([0x6abf4a,0x8ad05a,0x5aa04a])));
  scatter(r,40,6,58,avoid,(x,z,s)=>{vis(G.cyl,0x7aa04a,x,.35*s,z,.03,.7*s,.03);gvis(G.sph,0xfffbe8,x,.75*s,z,.18*s,.18*s,.18*s)});
  scatter(r,30,6,58,avoid,(x,z,s)=>{for(let i=0;i<5;i++)gvis(G.sph,pick([0xffd36b,0xff8fb1,0xffffff]),x+Math.cos(i*1.3)*.15,.15,z+Math.sin(i*1.3)*.15,.06,.04,.06)});
  scatter(r,6,14,50,avoid,(x,z,s)=>rock(x,z,s*.7,0x9a9a8a));
  tick((t,dt)=>{if(Math.random()<dt*6){const a=Math.random()*TAU,d=Math.random()*30;FXW.burst(P.x+Math.cos(a)*d,1+Math.random()*6,P.z+Math.sin(a)*d,{col:0xfffbe8,n:1,spd:.6,up:.4,g:-.2,life:4,size:.2})}});
  grass(520,[0x6aa83a,0x5a9a3a,0x8ac850],61);
  makeGround({edge:'puffs',c1:0x7ab84a,c2:0x6aa840,mount:0x8aa070,snow:0xfffbe8,path:0xc8b080,seed:61,snowY:14,mh:20});
  finishLevel();
  AU.music('p5');AU.ambient('birds');
  L.arrive=[['kapik','Одуванчия... Всё вокруг в пуху. Даже воздух щекочет нос.'],['kapik','А вот и Великий Пух. Какой огромный! Кажется, у него насморк.']];
  L.objective=()=>{const st=qs('c2');
    if(!S.tr)return{text:'Без переводчика не обойтись',pos:null};
    if(st===3)return{text:'Найди Хранительницу Пушинку у стебля Великого Пуха',pos:[SX+3.2,2.2,SZ+5.2],tag:'Глава 2'};
    if(st===4){if(S.inv.juice>0&&S.inv.elixir>0)return{text:'Отдай сок и эликсир Пушинке',pos:[SX+3.2,2.2,SZ+5.2],tag:'Глава 2'};return{text:'Нужны мандариновый сок (Мандарина) и светоэликсир (Грибния)',pos:null,tag:'Глава 2'}}
    if(st===5)return{text:'Лети на Шестерёнку: пуховый фильтр нужно поставить на трубу завода',pos:null,tag:'Глава 2'};
    if(st===6){const y=P.y;if(y<6)return{text:'Поднимись по листьям стебля. На верхнем листе прыгни в поток ветра',pos:[SX+Math.cos(4.75)*3.6,7,SZ+Math.sin(4.75)*3.6],tag:'Глава 2'};
      if(y<16)return{text:'Встань в поток ветра, он поднимет к большому листу',pos:[U1.x,17,U1.z],tag:'Глава 2'};
      if(y<21)return{text:'Прыгай по летающим семенам к листу выше',pos:[SX+Math.cos(a7)*3.6,22.5,SZ+Math.sin(a7)*3.6],tag:'Глава 2'};
      return{text:'Последний поток ветра поднимет к венчику. Дай Пуху лекарство',pos:[SX,33.5,SZ+3],tag:'Глава 2'}}
    if(qs('s5a')===1){const k=kids.findIndex((k,i)=>!S.got['kid'+i]);if(k>=0)return{text:`Найди бельчонка ${kids[k][3]}. Удерживай пробел в падении, чтобы планировать`,pos:[kids[k][0],kids[k][1]+1.5,kids[k][2]]}}
    if(qs('s5b')===1)return{text:`Сделай 2 пуховые подушки для Деда Шишкина: ${S.inv.pillow||0} из 2`,pos:[21.6,1.5,6.6]};
    return{text:qdone('c2')?'Великий Пух здоров. Собирай пух и помогай белкам':'Поговори с жителями Одуванчии',pos:null}};
  /* the final medicine */
  inter({x:SX,y:32,z:SZ+3,r:3.2,hold:1.2,label:'Удерживайте E - дать Великому Пуху лекарство',cond:()=>qs('c2')===6,act:()=>{
    say([['kapik','Великий Пух, открой... э-э... нос. Это микстура от Пушинки.'],['pushinka','Я тут, рядом! Лей прямо в серединку цветка, Капик!'],['kapik','Ап... ап... Держись! Сейчас чихнёт!']],()=>{
      AU.sfx('warp');for(let i=0;i<6;i++)setTimeout(()=>FXW.burst(SX,38,SZ,{col:0xfffbe8,n:60,spd:12,up:3,g:1,life:3,size:.5}),i*180);
      setTimeout(()=>say([['pushinka','Тихий-тихий чих! Ни одной капибары не унесло!'],['pushinka','Пух здоров. А фильтр на заводе больше не пустит к нам пыль. Спасибо, Капик!'],['kapik','Пора домой. Братья ждут рассказа.']],()=>{qcomplete('c2');showEnding(2)}),1300)})}});
}
function pushinkaTalk(n){if(needTr('pushinka'))return;const st=qs('c2');
  if(st===3){talk(n,[['pushinka','Ой! Настоящая капибара! Я Пушинка, хранительница Великого Пуха.'],['pushinka','Это Пух устроил Космический Чих. Не нарочно! У него насморк от заводской пыли с Шестерёнки.'],['pushinka','Скоро он снова чихнёт, и твоих братьев опять разнесёт по галактике.'],['kapik','Только не это. Что нужно?'],['pushinka','Лекарство. Принеси банку мандаринового сока и светоэликсир, я сварю микстуру.'],['pushinka','А пока держи семечко-парашют. В прыжке удерживай пробел, и будешь планировать, как я.']],()=>{S.got.glider=1;qset('c2',4);banner('Новая способность','Семечко-парашют',isTouch?'Удерживайте «Прыжок» в падении, чтобы планировать':'Удерживайте пробел в падении, чтобы планировать')});return}
  if(st===4){if(S.inv.juice>0&&S.inv.elixir>0){talk(n,[['pushinka','Сок и эликсир! Сейчас смешаю... Буль-буль... Готово!'],['pushinka','Но этого мало. Пыль с завода Шестерёнки снова застудит Пуху нос.'],['pushinka','Я сшила пуховый фильтр. Поставь его на дымящую трубу завода, а потом возвращайся.']],()=>{takeRes('juice',1);takeRes('elixir',1);S.got.filter=1;qset('c2',5);banner('Получено','Микстура и пуховый фильтр','Фильтр - на трубу завода Шестерёнки')});return}
    talk(n,[['pushinka','Нужны банка мандаринового сока и светоэликсир.'],['pushinka','Сок делают на Мандарине из пяти мандаринов, эликсир варят на Грибнии из четырёх светогрибов.']]);return}
  if(st===5){talk(n,[['pushinka','Фильтр на трубу Шестерёнки! Без него лекарство не поможет.']]);return}
  if(st===6){talk(n,[['pushinka','Фильтр стоит? Ура! Теперь наверх, к венчику. Листья, ветер и летающие семена приведут тебя.'],['pushinka','Упадёшь, не страшно: планируй на семечке.']]);return}
  talk(n,[['pushinka',pick(['Пух снова улыбается. Слышишь, как шуршит?','Заглядывай! На Одуванчии всегда найдётся пух для подушек.'])]])}
function oreshkaTalk(n){if(needTr('oreshka'))return;const st=qs('s5a');
  if(st===0){talk(n,[['oreshka','Капибара, помоги! Мои бельчата полетели кататься на ветре и застряли.'],['oreshka','Один на облачном острове у Великого Пуха, другой на синем цветке у Шмеля, третий на крыше моего пня.'],['oreshka','Найди их и отправь домой. Дам 15 монет и орехов в придачу!']],()=>qset('s5a',1));return}
  if(st===2){talk(n,[['oreshka','Все трое дома, чумазые и счастливые! Держи, как обещала.']],()=>qcomplete('s5a'));return}
  if(st===1){talk(n,[['oreshka',`Бельчат дома: ${qd('s5a').n||0} из 3. На облачный остров только планировать с высокого листа.`]]);return}
  talk(n,[['oreshka','Спасибо тебе за малышей! Заходи на орешки.']])}
function shishkinTalk(n){if(needTr('shishkin'))return;const st=qs('s5b');
  if(st===0){talk(n,[['shishkin','Кхе-кхе. Я Дед Шишкин, торгую подушками. А подушек нет: руки уже не те.'],['shishkin','Собери звёздный пух на лугу и взбей в подушечной рядом. Две подушки, и получишь 18 монет.']],()=>qset('s5b',1));return}
  if(st===1&&(S.inv.pillow||0)>=2){talk(n,[['shishkin','Мягкие, как облако! Вот твои монеты.']],()=>{takeRes('pillow',2);qcomplete('s5b')});return}
  if(st===1){talk(n,[['shishkin',`Подушек: ${S.inv.pillow||0} из 2. Пять пушинок на одну.`]],()=>openTrade('shishkin'));return}
  openTrade('shishkin')}
