/* ---------- LEVEL: P4 «Шестерёнка» ---------- */
function container(x,y,z,len,alongX,col,o){o=o||{};const w=alongX?len:2.4,d=alongX?2.4:len;
  if(o.open){const t=.15;if(alongX){box(x,y,z-1.2+t/2,len,2.4,t,col);box(x,y,z+1.2-t/2,len,2.4,t,col);box(x,y+2.25,z,len,.15,2.4,col)}else{box(x-1.2+t/2,y,z,t,2.4,len,col);box(x+1.2-t/2,y,z,t,2.4,len,col);box(x,y+2.25,z,2.4,.15,len,col)}vis(G.box,0x2a2a30,x,y+.02,z,w-.3,.04,d-.3)}
  else box(x,y,z,w,2.4,d,col);
  const n=Math.floor(len/.6);for(let i=0;i<=n;i++){const k=-len/2+i*len/n;if(alongX){vis(G.box,new THREE.Color(col).multiplyScalar(.75).getHex(),x+k,y+1.2,z-1.22,.08,2.3,.04);vis(G.box,new THREE.Color(col).multiplyScalar(.75).getHex(),x+k,y+1.2,z+1.22,.08,2.3,.04)}else{vis(G.box,new THREE.Color(col).multiplyScalar(.75).getHex(),x-1.22,y+1.2,z+k,.04,2.3,.08);vis(G.box,new THREE.Color(col).multiplyScalar(.75).getHex(),x+1.22,y+1.2,z+k,.04,2.3,.08)}}}
function buildP4(){
  newLevel('p4');
  setSky({top:0x1a2a40,hor:0xe0884a,bot:0x2a2a30,fog:0xa86a4a,near:40,far:165,hs:0xffe4cc,hg:0x4a4a52,hi:1.0,sc:0xffb478,si:.95,sd:[.6,.25,-.5],sunGlow:0xff9a50});
  skyBody(0xff6b4a,[-200,70,-210],30,0x7fe3e8);skyBody(0x9fd8e0,[160,130,-160],10);
  L.spawn={x:0,y:0,z:9,yaw:0};L.surface='metal';L.pathKind='metal';
  path([[0,9],[0,-28]],1.8,0x8a7a50);path([[0,4],[-20,-8]],1.4,0x8a7a50);path([[0,4],[16,-6]],1.4,0x8a7a50);path([[0,6],[-12,22]],1.4,0x8a7a50);path([[0,9],[8,26]],1.4,0x8a7a50);
  placeUFO(0,16,{pad:0x5a6068});
  const q=qd('m4');q.ins=q.ins||{};
  const grid=new THREE.GridHelper(130,65,0x6a7078,0x4a4e54);grid.position.y=.02;grid.material.transparent=true;grid.material.opacity=.35;L.group.add(grid);
  /* assembly tower */
  const TZ=-34;box(0,0,TZ,6,14,6,0x6a7880);for(let y=1;y<14;y+=2.5){vis(G.box,0xffab4a,0,y,TZ,6.08,.25,6.08)}for(const s of[-1,1])vis(G.box,0x3b4348,s*3.05,7,TZ,.1,14,1.2);
  box(0,14,TZ,8,.3,8,0x4a5258,{surf:'metal'});railRect(-4,TZ-4,4,TZ+4,14.3,0xffab4a,{side:'s',at:0,w:2.8});
  const cap=mesh(new THREE.CylinderGeometry(1.3,1.3,2.4,20,1,true),new THREE.MeshPhongMaterial({color:0x9fe9ff,transparent:true,opacity:.32,shininess:120,specular:0xffffff,side:THREE.DoubleSide,depthWrite:false}),0,15.5,TZ,1,1,1,L.group);cap.renderOrder=2;
  vis(G.cyl16,0x3b4348,0,14.4,TZ,1.4,.2,1.4);vis(G.hemi,0x3b4348,0,16.7,TZ,1.4,.6,1.4);const capC=cyl(0,14.3,TZ,1.3,2.4,0,{nv:true});
  for(const s of[-1,1])vis(G.box,0x3b4348,s*1.45,7.1,-29.6,.18,14.2,.18);
  const lift=dynBox(0,0,-29.6,2.4,.3,2.4,0,{m:mat(0xffab4a),surf:'metal'});const LF={y:0,st:'down',t:0};const ls=textSprite('Нет питания',{size:34,h:.36});ls.position.set(0,2.4,-28.2);L.group.add(ls);
  mover(lift,(t,dt)=>{const on=qs('m4')>=3;ls.visible=!on;if(!on)return[0,0,-29.6];const st=P.sup===lift;
    if(LF.st==='down'){if(st){LF.t+=dt;if(LF.t>.5){LF.st='up';LF.t=0;AU.sfx('elev')}}else LF.t=0}else if(LF.st==='up'){LF.y=Math.min(14,LF.y+dt*2.8);if(LF.y>=14)LF.st='top'}
    else if(LF.st==='top'){LF.t+=dt;if(st&&LF.t>5||!st&&LF.t>6){LF.st='dn';LF.t=0;AU.sfx('elev')}}else if(LF.st==='dn'){LF.y=Math.max(0,LF.y-dt*2.8);if(LF.y<=0){LF.st='down';LF.t=0}}return[0,LF.y,-29.6]});
  let vin=null;if(!S.rescued.p4){vin=npc('vintik',0,14.3,TZ,{yaw:0,pose:'sit',nc:true});
    inter({x:0,y:14.3,z:TZ,r:3,hold:1.4,label:'Удерживайте E - открыть капсулу',cond:()=>qs('m4')>=3&&!S.rescued.p4,act:()=>{capC.on=false;tween(.8,p=>{cap.position.y=15.5+p*2.5;cap.material.opacity=.32*(1-p)});AU.sfx('zap');
      say([['vintik','Капик! Я почти собрал отмычку из скрепки и двух болтов!'],['kapik','Отличная отмычка. Но сегодня ключ - это я.'],['vintik','Можно я заберу с собой одну шестерёнку? Маленькую!'],['kapik','Одну. Телепорт отправит тебя домой.']],()=>rescueBro('p4',vin))}})}
  /* sockets */
  const SOCK=[[-4.6,TZ-2],[-4.6,TZ],[-4.6,TZ+2]];const sockCore=[];
  SOCK.forEach((s,i)=>{vis(G.cyl,0x3b4348,s[0],.4,s[1],.55,.8,.55);gvis(G.torThin,0x7fe3e8,s[0],.82,s[1],.45,.45,.45,Math.PI/2,0,0);cyl(s[0],0,s[1],.55,.8,0,{nv:true});const cm=ITEMS.core();cm.position.set(s[0],.8,s[1]);cm.visible=false;L.group.add(cm);sockCore.push(cm)});
  const nIns=()=>Object.keys(q.ins).length;for(let i=0;i<nIns();i++)sockCore[i].visible=true;
  inter({x:-4.6,y:.5,z:TZ,r:3.4,label:'E - вставить энергоядро',cond:()=>P.carry&&P.carry.kind==='core',act:()=>{const id=P.carry.o.id;P.carry=null;updCarry();q.ins[id]=1;save();const n=nIns();sockCore[n-1].visible=true;AU.sfx('zap');AU.sfx('ok');FXW.burst(-4.6,1.2,SOCK[n-1][1],{col:0x7fe3e8,n:30,spd:4,life:.8});toast(`Энергоядро на месте: ${n} из 3`);
    if(n>=3){if(qs('m4')<2)S.q.m4=2;qset('m4',3);banner('Башня ожила','Лифт работает','Поднимись к капсуле с Винтиком');AU.sfx('quest');darkVisor()}}});
  const mag=npc('magnetron',7.5,0,TZ,{yaw:-Math.PI/2,nc:false,cr:1.1,talk:n=>{if(needTr('magnetron'))return;talk(n,[['magnetron',qs('m4')>=3?'Ж-ж-ж... питание... на башне... режим... сна...':'ВНИМАНИЕ. ПОСТОРОННЯЯ КАПИБАРА. ЯДРА ИЗЪЯТЫ. КАПСУЛА ЗАПЕРТА. ПОКИНЬТЕ ТЕРРИТОРИЮ.']])}});
  const darkVisor=()=>{mag.c.head.traverse(o=>{if(o.isSprite||(o.isMesh&&(o.material===glowBatchMat||o.material.isMeshBasicMaterial)))o.visible=false})};if(qs('m4')>=3)darkVisor();
  /* cores */
  const coreAt=(id,x,y,z)=>{if(q.ins[id])return;carryItem('core',ITEMS.core,x,y,z,{id,name:'Энергоядро',label:'взять энергоядро'})};
  /* container yard: core 1 */
  crate(16.2,0,-8,1.2,0x9a7a4a);container(20,0,-8,6,true,0xc94f3a);crate(18.4,2.4,-8,1.2,0x9a7a4a);container(21.5,2.4,-9,6,false,0x3a6ad6);crate(21.5,4.8,-6.9,1.2,0x9a7a4a);container(23.5,4.8,-11,6,true,0x4f9a6a);
  coreAt('c1',25.6,7.2,-11);node('scrap',21.5,4.8,-8.6,{regrow:70});
  container(27,0,-1,6,true,0xffab4a,{open:true});node('scrap',26,0,-1,{regrow:60});node('scrap',28.4,0,-1,{regrow:60});container(18,0,4,6,false,0x8a5ab0,{open:true});node('scrap',18,0,5.4,{regrow:60});
  /* crane with the raccoon: core 3 on the jib */
  const CX=-24,CZ=-12;box(CX,0,CZ,1.4,11,1.4,0xffc83d);for(let y=.5;y<11;y+=1.2)vis(G.box,0x3b4348,CX,y,CZ,1.45,.08,1.45);
  box(CX,11,CZ,2.2,2,2.2,0xffc83d);vis(G.box,0x9fe9ff,CX+1.11,12.1,CZ,.02,.8,1.4);ladder(CX,CZ+1.36,0,13,0,0x3b4348);
  box(CX+8,12.2,CZ,14,.5,1,0xffc83d,{surf:'metal'});box(CX-3,12.2,CZ,4,.5,1,0xffc83d);vis(G.box,0x5a6068,CX-4.4,11.4,CZ,1.4,1.2,1.4);for(let x=CX+1;x<CX+15;x+=1.4)vis(G.box,0x3b4348,x,12.0,CZ,.08,.3,1.02,0,0,.7);
  vis(G.cyl,0x333333,CX+13.5,10,CZ,.03,4,.03);vis(G.tor,0x8a8a8a,CX+13.5,7.8,CZ,.3,.3,.3);
  coreAt('c3',CX+13.2,12.7,CZ);node('scrap',CX+9,12.7,CZ,{regrow:80,r:1.6});
  const shurup=npc('shurup',CX-.5,13,CZ-.4,{yaw:Math.PI/2,pose:'dangle',talk:shurupTalk,mark:()=>S.tr&&qs('m4')<2?'!':null});
  /* factory hall: core 2 behind conveyor and laser */
  const FX=-22,FZ=22;building({x:FX,z:FZ,w:16,d:12,h:7,col:0x7a8088,trim:0x4a5258,door:'e',dw:3.6,dh:4.2,doorCol:0xffab4a,roof:'flat',roofCol:0x4a5258,rail:{gap:{side:'s',at:6,w:1.3}},railCol:0xffab4a,floor:0x5a5e64});
  const conv=box(FX+1,0,FZ,12,.3,11.4,0x2a2a30,{surf:'metal'});conv.conv=[3.2,0];const belt=[];for(let i=0;i<14;i++){const m=mesh(G.box,mat(0xffab4a),FX-5+i*.9,.31,FZ,.12,.02,11.2,L.group);belt.push(m)}
  tick((t,dt)=>{belt.forEach((m,i)=>{m.position.x=FX-5+((i*.9+t*3.2)%12.6)})});
  box(FX-6.6,0,FZ,2.6,2.4,6,0x5a6068,{surf:'metal'});box(FX-4.6,0,FZ+2.4,1.4,1.2,1.2,0x9a7a4a);coreAt('c2',FX-6.6,2.4,FZ);
  const sweep=new THREE.Group();sweep.position.set(FX+.5,.55,FZ);L.group.add(sweep);mesh(G.cyl,mat(0x3b4348),0,-.25,0,.25,.6,.25,sweep);const beam=mesh(G.box,bmat(0xff3a3a),2.8,0,0,5.6,.1,.1,sweep);const bg=glow(0xff3a3a,2,.6);bg.position.x=5.6;sweep.add(bg);
  let swA=0;tick((t,dt)=>{swA+=dt*1.7;sweep.rotation.y=swA;if(mode!=='play')return;const ex=Math.cos(-swA),ez=Math.sin(-swA),px=P.x-(FX+.5),pz=P.z-FZ,k=clamp(px*ex+pz*ez,0,5.6),dx=px-ex*k,dz=pz-ez*k;
    if(Math.hypot(dx,dz)<.45&&P.y<.75){AU.sfx('zap');flash('rgba(255,60,60,.6)');respawn('Лазер! Капик вернулся к входу в цех')}});
  checkpoint(FX+6.6,0,FZ,2,4,-Math.PI/2);
  ladder(-16,FZ+6.35,0,7.3,0,0x3b4348);node('scrap',-24,7.3,26,{regrow:70});
  /* electric floor */
  const tiles=[];for(let i=0;i<3;i++)for(let j=0;j<6;j++){const x=-12.8+i*2.1,z=17+j*2.1;const m=mesh(G.box,new THREE.MeshPhongMaterial({color:0x3a3f4a,emissive:0}),x,.03,z,2,.06,2,L.group);m.receiveShadow=true;tiles.push({x,z,m,a:(i+j)%2})}
  tick((t,dt)=>{const ph=Math.floor(t/2)%2,warn=(t%2)>1.5;for(const tl of tiles){const on=tl.a===ph;tl.m.material.emissive.set(on?0x2a7a9a:warn&&tl.a!==ph?0x553311:0);tl.on=on}
    if(mode==='play'&&P.ground&&!P.sup)for(const tl of tiles)if(tl.on&&Math.abs(P.x-tl.x)<1&&Math.abs(P.z-tl.z)<1){AU.sfx('zap');flash('rgba(120,220,255,.6)');respawn('Под током! Ступай на тёмные плиты');break}
    if(Math.random()<dt*6){const tl=pick(tiles);if(tl.on)FXW.burst(tl.x+(Math.random()-.5)*1.6,.1,tl.z+(Math.random()-.5)*1.6,{col:0x7fe3e8,n:3,spd:2,up:2,life:.3,size:.15})}});
  checkpoint(-4.5,0,FZ,2,6,Math.PI/2);
  /* chimney with souvenir */
  cyl(FX-5,7.3,FZ-4,1,6.6,0x8a5a4a,{g:G.cyl16});vis(G.cyl16,0x3b3438,FX-5,13.95,FZ-4,1.1,.1,1.1);
  [[0,1.2],[Math.PI/2,2.4],[Math.PI,3.6],[Math.PI*1.5,4.8]].forEach(b=>box(FX-5+Math.cos(b[0])*1.6,7.3+b[1]-.3,FZ-4+Math.sin(b[0])*1.6,1,.3,1,0x5a6068,{surf:'metal'}));
  souvenir('p4',FX-5,13.9,FZ-4);L.chimney=[FX-5,FZ-4];const filt=new THREE.Group();filt.position.set(FX-5,14,FZ-4);L.group.add(filt);mesh(G.cyl16,mat(0xfff6e0),0,.15,0,1.15,.3,1.15,filt);for(let i=0;i<8;i++){const a=i/8*TAU;mesh(G.sph,bmat(0xfffbe8),Math.cos(a)*.9,.35,Math.sin(a)*.9,.22,.22,.22,filt)}filt.visible=!!S.got.filterOn;
  tick((t,dt)=>{if(Math.random()<dt*5)FXW.burst(FX-5,14.2,FZ-4,{col:S.got.filterOn?0xf4f4f4:0x553a3a,n:1,spd:.4,up:1.6,g:-.4,life:3,size:S.got.filterOn?.7:1.2})});
  inter({x:FX-5,y:13.2,z:FZ-4,r:2.6,hold:1.2,label:'Удерживайте E - поставить пуховый фильтр',cond:()=>qs('c2')===5&&!S.got.filterOn,act:()=>{S.got.filterOn=1;save();filt.visible=true;filt.scale.setScalar(.01);tween(.5,p=>filt.scale.setScalar(Math.max(.01,p)));AU.sfx('repair');FXW.burst(FX-5,14.4,FZ-4,{col:0xfffbe8,n:40,spd:4,life:1});qset('c2',6);banner('Фильтр на месте','Дым стал белым','Лети на Одуванчию и поднимись к венчику Пуха')}});
  /* courier quest */
  const pos=npc('posylkin',FX-4,7.3,FZ+3,{yaw:Math.PI/2,pose:'hold',talk:posTalk,mark:()=>!S.tr?null:qs('s4b')===0?'!':null});
  vis(G.box,0xffab4a,FX+4,7.32,FZ-3,2.2,.04,2.2);const dl=textSprite('ДОСТАВКА',{size:36,h:.4,bg:'#ffab4a',fg:'#2a1606'});dl.position.set(FX+4,8.6,FZ-3);L.group.add(dl);
  const dcrate=ITEMS.crate();dcrate.position.set(FX+4,7.3,FZ-3);dcrate.visible=qdone('s4b');L.group.add(dcrate);
  inter({x:FX+4,y:7.3,z:FZ-3,r:2.4,label:'E - поставить ящик',cond:()=>P.carry&&P.carry.kind==='crate',act:()=>{P.carry=null;updCarry();dcrate.visible=true;AU.sfx('drop');say([['posylkin','БИП-БИП. Посылка доставлена. Оценка курьеру: пять звёзд.']],()=>qcomplete('s4b'))}});
  building({x:8,z:28,w:6,d:5,h:3.2,col:0x9a7a4a,trim:0x5a4030,door:'n',dw:2,dh:2.6,doorCol:0xffab4a,roof:'gable',roofCol:0x5a6068,rh:1.4,floor:0x6a5a4a});
  if(!qdone('s4b'))carryItem('crate',ITEMS.crate,7,0,29.2,{name:'Ящик с гайками',label:'взять ящик с гайками',when:()=>qs('s4b')===1});
  /* smelter in the warehouse */
  vis(G.cyl,0x5a4a44,9.6,.9,29.2,.8,1.8,.8,0,0,0,.03,TX.brick);vis(G.cone,0x5a4a44,9.6,2.3,29.2,.8,1,.8,0,0,0,.03,TX.brick);gvis(G.box,0xff7a2e,9.6,.7,28.4,.6,.5,.05);const sm=glow(0xff7a2e,3,.7);sm.position.set(9.6,.8,28.2);L.group.add(sm);tick(t=>{sm.material.opacity=.5+Math.sin(t*11)*.15});
  workshop(9.6,0,28,{title:'Плавильня',kind:'hold',help:'Удерживайте E, чтобы нагреть металл, и отпустите в зелёной зоне. Перегреете - начнёте заново.',from:'scrap',need:5,to:'cog',btn:'Раздуть',r:2.2});
  /* broken cleaners */
  const CL=[[14,0,-3],[-18,7.3,26.4],[9.6,0,26.4],[CX+6,12.7,CZ]];
  CL.forEach((p,i)=>{const done=!!S.got['cl'+i];const n=npc('cleaner',p[0],p[1],p[2],{yaw:i,pose:done?'idle':'lie',nc:true,walk:done&&p[1]===0?[[p[0],p[2]],[p[0]+2,p[2]+1],[p[0],p[2]+2]]:null,speed:.8});
    if(!done){const sp=textSprite('!',{size:44,h:.4,bg:'#ff6b6b',fg:'#2a1606'});sp.position.y=1.2;n.c.root.add(sp);n.sp=sp;sp.visible=false;tick(()=>{if(n.sp)n.sp.visible=qs('s4a')===1})
      const it=inter({x:p[0],y:p[1]+.3,z:p[2],r:2,hold:1.5,label:'Удерживайте E - починить робота',cond:()=>qs('s4a')===1&&!S.got['cl'+i],act:()=>{S.got['cl'+i]=1;const qq=qd('s4a');qq.n=(qq.n||0)+1;save();n.pose='dance';if(n.sp){n.c.root.remove(n.sp);n.sp=null}AU.sfx('repair');FXW.burst(p[0],p[1]+.5,p[2],{col:0xffd36b,n:24,spd:3,life:.6});toast(`Робот починен: ${qq.n} из 4`);if(qq.n>=4)qset('s4a',2)}})}});
  /* pipe with Bolt */
  box(9,1.8,6,10,1.6,1.6,0,{nv:true,surf:'metal'});const pp=mesh(G.cyl16,mat(0x8a96a0),9,2.6,6,.8,10,.8,L.group);pp.rotation.z=Math.PI/2;pp.castShadow=true;for(const x of[5,9,13])vis(G.box,0x3b4348,x,.9,6,.3,1.8,.3);
  crate(2.6,0,6,1.2,0x9a7a4a);crate(3.9,0,6,1.2,0x9a7a4a);crate(3.9,1.2,6,1.2,0x9a7a4a);
  npc('bolt',10,3.4,6.6,{yaw:0,pose:'dangle',talk:boltTalk,mark:()=>!S.tr?null:qs('s4a')===0?'!':qs('s4a')===2?'?':null});
  /* scrap yard */
  for(const p of[[-8,-18],[-12,-22],[12,-20],[34,6],[30,16],[-34,8],[-30,-24]])node('scrap',p[0],0,p[1],{regrow:75});
  box(6,0,12,3,1,1.1,0x5a6068,{tex:TX.metal});vis(G.box,0xffab4a,6,2.6,12.4,3.4,.15,1.8,0,0,0,.02,TX.corr);for(const s2 of[-1,1])vis(G.box,0x3b4348,6+s2*1.5,1.3,12.8,.12,2.6,.12,0,0,0,.02,TX.metal);
  npc('gaykin',6,0,13.1,{yaw:Math.PI,trader:1,label:'E - скупщик Гайкин',talk:n=>{if(needTr('gaykin'))return;openTrade('gaykin')}});
  npc('robot',-6,0,-8,{walk:[[-6,-8],[6,-10],[8,0],[-6,0]],speed:1.2,talk:n=>{if(needTr('robot'))return;talk(n,[['robot',pick(['БИП. Не наступай на светящиеся плиты. Они под напряжением.','Магнетрон снял ядра с башни и раскидал их. Одно на кране, одно в цехе, одно на контейнерах.','Шуруп сидит на кране. Он знает всё про эту планету.'])]])}});
  /* scenery */
  const r=rng(51),avoid=[[0,16,7],[0,9,4],[0,-34,8],[CX,CZ,6],[22,-8,9],[FX,FZ,12],[8,28,6],[9,6,7],[-8,22,6],[27,-1,5],[18,4,5]];
  scatter(r,16,14,58,avoid,(x,z,s)=>{const h=(3+r()*5)*s;cyl(x,0,z,.7*s,h,pick([0x8a5a4a,0x6a7078]),{g:G.cyl16});vis(G.cyl16,0x3b3438,x,h+.05,z,.75*s,.1,.75*s)});
  scatter(r,14,10,58,avoid,(x,z,s)=>crate(x,0,z,1+r()*.4,pick([0x9a7a4a,0xb07a42])));
  scatter(r,8,16,58,avoid,(x,z,s)=>container(x,0,z,6,r()<.5,pick([0xc94f3a,0x3a6ad6,0x4f9a6a,0xffab4a])));
  for(let i=0;i<6;i++){const a=i/6*TAU+.3;vis(G.cyl,0x3b4348,Math.cos(a)*40,4,Math.sin(a)*40,.15,8,.15);gvis(G.sph,0xffd36b,Math.cos(a)*40,8.1,Math.sin(a)*40,.25,.25,.25)}
  makeGround({edge:'pipes',c1:0x6a6e74,c2:0x5a5e64,mount:0x4a3c38,snow:0x7a6a5a,path:0x9a8a5a,seed:51,snowY:30,mh:16});
  finishLevel();
  AU.music('p4');AU.ambient('hum');
  L.arrive=[['kapik','Сплошное железо. Пахнет маслом и искрами.'],['kapik','Винтик тут как дома. Надеюсь, он ничего не разобрал.']];
  L.objective=()=>{if(S.rescued.p4)return{text:nRescued()===4?'Все братья спасены. Лети на базу':'Винтик спасён. Удерживай E у тарелки, чтобы лететь дальше',pos:[0,3.2,16]};
    if(!S.tr)return{text:'Роботы говорят на машинном языке. Переводчик продаётся на базе',pos:null};
    const st=qs('m4');if(st<2)return{text:'Найди енота Шурупа на кабине крана',pos:[CX,14.6,CZ]};
    if(st===2){if(P.carry&&P.carry.kind==='core')return{text:`Отнеси энергоядро к гнёздам у башни: ${nIns()} из 3`,pos:[-4.6,1.6,TZ]};
      const left=[['c1',25.6,8,-11],['c2',FX-6.6,3.2,FZ],['c3',CX+13.2,13.5,CZ]].filter(c=>!q.ins[c[0]]);let b=left[0],bd=1e9;for(const c of left){const d=Math.hypot(c[1]-P.x,c[3]-P.z);if(d<bd){bd=d;b=c}}
      return{text:`Найди энергоядра и вставь в гнёзда у башни: ${nIns()} из 3`,pos:b?[b[1],b[2],b[3]]:null}}
    return{text:'Поднимись на лифте башни и открой капсулу',pos:P.y>12?[0,16,TZ]:[0,1,-29.6]}};
}
function shurupTalk(n){if(needTr('shurup'))return;const st=qs('m4');
  if(st<2){talk(n,[['shurup','О, капибара на кране! Смелая. Я Шуруп, местный механик.'],['shurup','Малыш в очках залез в сборочную башню и стал крутить всё подряд. Магнетрон запер его в капсуле и вынул из башни энергоядра.'],['shurup','Ядер три. Одно на конце этой стрелы, другое в цеху за конвейером и лазером, третье на верхнем контейнере.'],['shurup','Вставь все три в гнёзда у башни, и лифт поедет. В лапах ядро держи крепко: двойной прыжок с ним не выйдет.']],()=>{if(qs('m4')<2)qset('m4',2)});return}
  talk(n,[['shurup',st>=3?'Башня гудит! Поднимайся на лифте.':`Ядер в гнёздах: ${Object.keys(qd('m4').ins||{}).length} из 3. По стреле иди аккуратно.`]])}
function boltTalk(n){if(needTr('bolt'))return;const st=qs('s4a');
  if(st===0){talk(n,[['bolt','БИП. Капибара. Ты не из охраны. Хорошо.'],['bolt','Мои друзья, роботы-уборщики, сломались. Их четыре: у контейнеров, на складе, на крыше цеха и даже на стреле крана.'],['bolt','Подойди и удерживай E, чтобы починить. Награда: 12 монет.']],()=>qset('s4a',1));return}
  if(st===2){talk(n,[['bolt','Все четыре снова убирают! БИП-БИП. Держи монеты.']],()=>qcomplete('s4a'));return}
  talk(n,[['bolt',qdone('s4a')?'Чисто. Блестяще. БИП.':`Починено: ${qd('s4a').n||0} из 4.`]])}
function posTalk(n){if(needTr('posylkin'))return;const st=qs('s4b');
  if(st===0){talk(n,[['posylkin','БИП. Курьерская служба. Срочный заказ: ящик с гайками со склада на крышу цеха.'],['posylkin','У меня колесо отвалилось. Отнесёшь? Склад у южного края. Жёлтая площадка тут, на крыше. 10 монет.']],()=>qset('s4b',1));return}
  talk(n,[['posylkin',qdone('s4b')?'Посылка на месте. Спасибо за быструю доставку.':'Ящик на складе. Неси на жёлтую площадку. По лестнице с ящиком тоже можно.']])}
