/* ---------- LEVEL: P1 «Мандарина» ---------- */
function buildP1(){
  newLevel('p1');
  setSky({top:0x5aa0e8,hor:0xffd9a0,bot:0xffc890,fog:0xffd2a0,near:45,far:175,hs:0xfff4dc,hg:0x8a5a3a,hi:.68,sc:0xfff0d0,si:.85,sd:[.4,.55,-.6],sunGlow:0xfff0b0});
  skyBody(0xfff2c4,[120,150,-280],24);skyBody(0xb28cff,[-230,80,-120],16,0xe0d0ff);
  L.spawn={x:0,y:0,z:9,yaw:0};L.surface='grass';
  path([[0,9],[0,-28]],1.8,0xc98a4a);path([[0,4],[-10,-8]],1.5,0xc98a4a);path([[0,2],[16,-12]],1.5,0xc98a4a);path([[0,9],[20,12]],1.3,0xc98a4a);path([[0,9],[-12,20],[-12,30]],1.3,0xc98a4a);
  placeUFO(0,16,{pad:0xa08a70});
  const q=qd('m1');q.caps=q.caps||0;
  /* crate stairs near landing */
  crate(7,0,6,1.2);crate(8.4,0,6,1.2);crate(8.4,1.2,6,1.2);crate(9.8,0,6,1.2);crate(9.8,1.2,6,1.2);crate(9.8,2.4,6,1.2);
  /* market stall: sells nothing, buys everything */
  box(10,0,13,3.6,1,1,0x8a5a32,{tex:TX.planks});for(const s2 of[-1,1])vis(G.box,0x6b4628,10+s2*1.7,1.4,13.6,.14,2.8,.14,0,0,0,.02,TX.bark);for(let i=0;i<5;i++)vis(G.box,i%2?0xfff1d6:0xff8a2e,10-1.6+i*.8,2.85,13.4,.8,.1,1.6,.25,0,0,.02,TX.stripes);
  for(let i=0;i<4;i++)vis(G.sph,0xff9a2e,9+i*.6,1.15,13,.16,.15,.16);
  npc('clem',10,0,14.2,{yaw:Math.PI,trader:1,label:'E - торговка Клементина',talk:n=>{if(needTr('clem'))return;openTrade('clem')}});
  /* barn with farmer on the roof */
  building({x:-18,z:-8,w:12,d:10,h:5,col:0xc9572f,trim:0xf4ead8,door:'e',dw:3,dh:3.6,doorCol:0xf4ead8,roof:'flat',roofCol:0x7a3a22,rail:{gap:{side:'e',at:3,w:1.3}},railCol:0xf4ead8,floor:0xa08060});
  ladder(-11.62,-5,0,5.3,Math.PI/2,0x7a4a2a);
  box(-20,2.7,-11,7.2,.3,3,0x8a6a4a);box(-15.7,0,-11,1.4,2,1.4,0xe8c870);box(-15.7,0,-9.2,1.4,1,1.4,0xe8c870);for(const p of[[-16.6,-12.3],[-16.6,-9.7],[-23.4,-9.7]])cyl(p[0],0,p[1],.13,2.7,0x6b4628);
  for(let i=0;i<5;i++)vis(G.box,0xe8c870,-22.5+i*1.2,3.35,-11,1.1,.7,1.1,0,i*.2,0,.04,TX.straw);
  const citron=npc('citron',-15.8,5.3,-9.6,{yaw:Math.PI/2,pose:'hammer',talk:citronTalk,mark:()=>S.tr&&qs('m1')<2?'!':null});
  vis(G.box,0x6b3a22,-14.5,5.4,-9.6,1.6,.08,1.2);
  /* windmill */
  const WZ=-34;cyl(0,0,WZ,3.3,12.6,0xf4ead8,{g:G.cyl,cr:.1});box(0,0,WZ,6,12.6,6,0,{nv:true});for(let y=2;y<12;y+=3.2)vis(G.cyl,0xc9572f,0,y,WZ,3.36,.3,3.36);
  vis(G.box,0x7a4a2a,0,1.4,WZ+3.3,1.4,2.8,.2);
  box(0,12.6,WZ,8.4,.3,8.4,0x8a6a4a);railRect(-4.2,WZ-4.2,4.2,WZ+4.2,12.9,0x7a4a2a,{side:'s',at:0,w:2.8});
  box(0,12.9,WZ,2.6,2,2.6,0xc9572f);vis(G.box,0x7a3a22,0,14.95,WZ,2.9,.12,2.9);vis(G.cone,0xffab4a,1,15.4,WZ+1,.25,.8,.25);
  const blades=new THREE.Group();blades.position.set(0,13.9,WZ-1.6);L.group.add(blades);mesh(G.cyl,mat(0x6b4628),0,0,0,.3,.6,.3,blades).rotation.x=Math.PI/2;
  for(let i=0;i<4;i++){const b=new THREE.Group();b.rotation.z=i*Math.PI/2;blades.add(b);mesh(G.box,mat(0x7a4a2a),0,3.2,0,.18,6,.12,b);mesh(G.box,mat(0xfff1d6),.45,3.6,0,.8,4.6,.05,b)}
  tick((t,dt)=>{blades.rotation.z+=dt*(qs('m1')>=3?1.4:.25)});
  souvenir('p1',0,14.95,WZ);
  /* lift */
  for(const s of[-1,1])vis(G.box,0x7a4a2a,s*1.45,6.6,-29.6,.18,13.2,.18);vis(G.box,0x7a4a2a,0,13.1,-29.6,3.1,.2,.2);
  const lift=dynBox(0,0,-29.6,2.4,.3,2.4,0,{m:mat(0xffab4a)});const LIFT={y:0,st:'down',t:0};
  const ls=textSprite('Лифт обесточен',{size:34,h:.36});ls.position.set(0,2.4,-28.2);L.group.add(ls);
  mover(lift,(t,dt)=>{const on=qs('m1')>=3;ls.visible=!on;if(!on)return[0,0,-29.6];const stand=P.sup===lift;
    if(LIFT.st==='down'){if(stand){LIFT.t+=dt;if(LIFT.t>.5){LIFT.st='up';LIFT.t=0;AU.sfx('elev')}}else LIFT.t=0}
    else if(LIFT.st==='up'){LIFT.y=Math.min(12.6,LIFT.y+dt*2.6);if(LIFT.y>=12.6)LIFT.st='top'}
    else if(LIFT.st==='top'){LIFT.t+=dt;if(stand&&LIFT.t>5||!stand&&LIFT.t>6){LIFT.st='dn';LIFT.t=0;AU.sfx('elev')}}
    else if(LIFT.st==='dn'){LIFT.y=Math.max(0,LIFT.y-dt*2.6);if(LIFT.y<=0){LIFT.st='down';LIFT.t=0}}
    return[0,LIFT.y,-29.6]});
  if(!S.rescued.p1){const yz=npc('yuzik',2.9,12.9,WZ+2.4,{yaw:Math.PI*.75,pose:'sit',talk:n=>{if(qs('m1')<3){talk(n,[['yuzik','Капик?! Я тут застрял!']]);return}
    talk(n,[['yuzik','Капик! Я полез за самым большим мандарином, а лифт взял и уехал вниз.'],['yuzik','Мандарин я, кстати, съел. Очень вкусный.'],['kapik','Главное, что ты цел. Телепорт тарелки заберёт тебя домой. Остальных братьев тоже найду.']],()=>rescueBro('p1',n))},mark:()=>qs('m1')>=3?'?':null});}
  /* pen and runaway chicks */
  const PX0=12,PX1=22,PZ0=-26,PZ1=-16;fence(PX0,PZ0,PX1,PZ0,0xa0683c);fence(PX0,PZ0,PX0,PZ1,0xa0683c);fence(PX1,PZ0,PX1,PZ1,0xa0683c);fence(PX0,PZ1,15.8,PZ1,0xa0683c);fence(18.2,PZ1,PX1,PZ1,0xa0683c);
  vis(G.box,0xffab4a,14.6,1.6,PZ1,.2,1.2,.2);vis(G.box,0xffab4a,19.4,1.6,PZ1,.2,1.2,.2);sign(13,0,-15,0,['ЗАГОН'],{fs:70,w:1.4,h:.6});
  const wheel=new THREE.Group();wheel.position.set(19.5,1.8,-23.5);L.group.add(wheel);mesh(G.tor,mat(0xffab4a),0,0,0,1.6,1.6,1.6,wheel);mesh(G.tor,mat(0xffab4a),0,0,-.8,1.6,1.6,1.6,wheel);for(let i=0;i<8;i++){const a=i/8*TAU;mesh(G.box,mat(0xc99a5a),Math.cos(a)*1.6,Math.sin(a)*1.6,-.4,.12,.12,.9,wheel)}
  vis(G.box,0x6b4628,19.5,.9,-23.1,.2,1.8,.2);vis(G.box,0x6b4628,19.5,.9,-24.7,.2,1.8,.2);box(19.5,0,-23.9,1.2,1.2,2,0,{nv:true});
  tick((t,dt)=>{wheel.rotation.z+=dt*(q.caps>=5?3:0)});
  const starts=[[-34,8],[30,26],[-8,-46],[44,-22],[8,40]];const chicks=[];
  for(let i=0;i<5;i++){const m=makeChick();L.group.add(m);const inPen=i<q.caps;const c={m,x:inPen?14+i*1.6:starts[i][0],z:inPen?-24+(i%2)*3:starts[i][1],a:Math.random()*TAU,t:0,cap:inPen,hop:0};chicks.push(c);m.position.set(c.x,0,c.z)}
  tick((t,dt)=>{const active=qs('m1')===2;for(const c of chicks){const dx=c.x-P.x,dz=c.z-P.z,d=Math.hypot(dx,dz);let vx=0,vz=0;
    if(c.cap){c.t-=dt;if(c.t<=0){c.a=Math.random()*TAU;c.t=1+Math.random()*2}vx=Math.cos(c.a)*.7;vz=Math.sin(c.a)*.7}
    else if(active&&d<6){vx=dx/d*5.4;vz=dz/d*5.4;const ex=17-c.x,ez=-17.5-c.z,ed=Math.hypot(ex,ez);if(ed<8){vx+=ex/ed*3.2;vz+=ez/ed*3.2}if(Math.random()<dt*2)AU.sfx('chick')}
    else{c.t-=dt;if(c.t<=0){c.a=Math.random()*TAU;c.t=1.5+Math.random()*2.5}const sp=Math.random()<.5?0:.9;vx=Math.cos(c.a)*sp;vz=Math.sin(c.a)*sp}
    c.x+=vx*dt;c.z+=vz*dt;mobCollide(c,.35);
    if(c.cap){c.x=clamp(c.x,PX0+.6,PX1-.6);c.z=clamp(c.z,PZ0+.6,PZ1-.9)}
    else if(c.x>PX0+.4&&c.x<PX1-.4&&c.z>PZ0+.4&&c.z<PZ1-.6){c.cap=true;q.caps++;save();AU.sfx('ok');FXW.burst(c.x,.8,c.z,{col:0xffab4a,n:20,spd:3,life:.8});toast(`Мандаринчик в загоне: ${q.caps} из 5`);
      if(q.caps>=5){qset('m1',3);banner('Колесо крутится','Лифт ветряка работает','Поднимись к Юзику');AU.sfx('quest')}}
    const sp=Math.hypot(vx,vz);c.hop+=dt*sp*3;c.m.position.set(c.x,Math.abs(Math.sin(c.hop))*.25,c.z);if(sp>.1)c.m.rotation.y=Math.atan2(vx,vz)}});
  /* water tower with the painter */
  const WX=26,WTZ=12;for(const a of[-1,1])for(const b of[-1,1])cyl(WX+a*1.5,0,WTZ+b*1.5,.18,7,0x8a6a4a);
  cyl(WX,7,WTZ,2.4,3,0x8fc8d8,{g:G.cyl16});vis(G.cyl16,0x6aa8b8,WX,10.05,WTZ,2.5,.12,2.5);vis(G.sph,0xff9a2e,WX+2.2,8.5,WTZ,.1,.9,.9);vis(G.box,0x4f9a3a,WX+2.32,9.5,WTZ+.2,.05,.2,.5);
  ladder(WX-2.65,WTZ,0,10.1,-Math.PI/2,0x6b4628);
  npc('grushka',WX+1.2,10.1,WTZ+.8,{yaw:Math.PI/2,pose:'dangle',talk:grushkaTalk,mark:()=>!S.tr?null:qs('s1a')===0?'!':qs('s1a')===1&&qd('s1a').has?'?':null});
  /* greenhouse */
  const gx=-26,gz=18,gw=8,gd=6,gh=3;const glass=new THREE.MeshPhongMaterial({color:0xbfefff,transparent:true,opacity:.28,shininess:120,specular:0xffffff,depthWrite:false,side:THREE.DoubleSide});
  for(const x of[gx-gw/2,gx+gw/2])for(let z=gz-gd/2;z<=gz+gd/2+.01;z+=gd/3)vis(G.box,0xf4ead8,x,gh/2,z,.14,gh,.14);for(let x=gx-gw/2;x<=gx+gw/2+.01;x+=gw/4){vis(G.box,0xf4ead8,x,gh/2,gz-gd/2,.14,gh,.14);vis(G.box,0xf4ead8,x,gh/2,gz+gd/2,.14,gh,.14)}
  const pane=(x,z,w,d)=>{mesh(G.box,glass,x,gh/2,z,w,gh,d,L.group).renderOrder=2;box(x,0,z,w,gh,d,0,{nv:true})};
  pane(gx,gz-gd/2,gw,.1);pane(gx,gz+gd/2,gw,.1);pane(gx-gw/2,gz,.1,gd);pane(gx+gw/2,gz-1.95,.1,2.1);pane(gx+gw/2,gz+1.95,.1,2.1);
  mesh(G.box,glass,gx,gh+.08,gz,gw+.2,.12,gd+.2,L.group).renderOrder=2;box(gx,gh,gz,gw+.2,.15,gd+.2,0,{nv:true});for(let x=gx-gw/2;x<=gx+gw/2+.01;x+=gw/4)vis(G.box,0xf4ead8,x,gh+.1,gz,.14,.14,gd+.2);
  for(const z of[gz-1.6,gz+1.6]){box(gx-.8,0,z,5.2,.7,1,0x7a4a2a);for(let i=0;i<6;i++)vis(G.sph,i%2?0xff9a2e:0x6fbf73,gx-3+i*.9,.85,z,.25,.2,.25)}
  for(const z of[gz-1.6,gz+1.6])for(const xx of[gx-2.4,gx+.4])node('mandarin',xx,.7,z,{label:'собрать мандарины с грядки',yield:2,regrow:80,make:(g,full)=>{for(let i=0;i<3;i++){mesh(G.sph,mat(0x4f9a3a),i*.5-.5,.15,0,.22,.18,.22,g);mesh(G.sph,mat(0xff9a2e,{emissive:0x3a1a00}),i*.5-.5,.32,.05,.1,.1,.1,full)}}});
  crate(-23,0,22.6,1);box(-24.4,0,22.2,1.2,2,1.2,0xb07a42);vis(G.box,0x7a4a2a,-24.4,1,22.2,1.22,.12,1.22);
  itemPick('p1-bucket',gx-1.5,gh+.15,gz-1,ITEMS.bucket(),()=>qs('s1a')===1&&!qd('s1a').has,()=>{qd('s1a').has=1;save();toast('Ведро краски у Капика. Отнеси его Грушке');UI.objFlash()});
  /* farmhouse */
  building({x:-12,z:34,w:8,d:7,h:3.4,col:0xf4e6c8,trim:0x9a6a4a,door:'n',dw:2,dh:2.6,doorCol:0x7a4a2a,roof:'gable',roofCol:0xc9572f,rh:2.4,floor:0x9a7a5a,tex:TX.brick});
  sign(-9.4,0,30,0,['СОКОДАВИЛЬНЯ'],{fs:52,w:2,h:.6,bg:'#c9572f'});
  /* juice press: a big wooden screw press */
  cyl(-12,0,35,1.1,1.1,0x8a5a32,{tex:TX.planks});vis(G.cyl,0x6b3a22,-12,1.15,35,1.15,.1,1.15,0,0,0,.02,TX.planks);for(const s2 of[-1,1])vis(G.box,0x6b4628,-12+s2*1.2,1.4,35,.2,2.8,.2,0,0,0,.02,TX.bark);vis(G.box,0x6b4628,-12,2.75,35,2.6,.25,.3,0,0,0,.02,TX.bark);
  const screw=new THREE.Group();screw.position.set(-12,2,35);L.group.add(screw);mesh(G.cyl,mat(0x9aa6ad,{metal:.8}),0,0,0,.12,1.6,.12,screw);mesh(G.cyl,mat(0x8a5a32),0,-.8,0,.8,.12,.8,screw);mesh(G.box,mat(0x6b4628),0,.75,0,1.6,.1,.1,screw);
  for(let i=0;i<6;i++)vis(G.cyl,0xff8a2e,-14.6+i*.32,.3,37.3,.12,.6,.12,0,0,0,.02);vis(G.box,0x8a5a32,-13.8,.4,37.3,2.4,.8,.6,0,0,0,.02,TX.planks);
  workshop(-12,0,33.6,{title:'Сокодавильня',kind:'mash',help:'Жмите E или кнопку как можно быстрее, пока банка не наполнится соком.',from:'mandarin',need:5,to:'juice',btn:'Давить!',onMade:()=>tween(1,p=>{screw.rotation.y=p*TAU*2})});
  /* tree house with the racer kid */
  const THX=36,TZ=-4;cyl(THX,0,TZ,.8,7,0x6b4628);vis(G.ico1,0x4a8a3c,THX,8.6,TZ,3.4,2.2,3.4);vis(G.ico1,0x5a9a40,THX+1.4,9.6,TZ-.6,2,1.6,2);
  box(THX,4.5,TZ,4.4,.3,4.4,0x9a6a3a);railRect(THX-2.2,TZ-2.2,THX+2.2,TZ+2.2,4.8,0x7a4a2a,{side:'n',at:0,w:2.2});
  [[Math.PI,1.2],[Math.PI*1.25,2.4],[Math.PI*1.5,3.6]].forEach((s,i)=>{const sx=THX+Math.cos(s[0])*3.2,sz=TZ+Math.sin(s[0])*3.2;box(sx,s[1]-.25,sz,1.3,.25,1.3,0x9a6a3a);vis(G.box,0x6b4628,sx,(s[1]-.25)/2,sz,.12,s[1]-.25,.12)});
  const mork=npc('morkovka',THX+.8,4.8,TZ+.6,{yaw:-Math.PI/2,pose:'wave',talk:morkTalk,mark:()=>S.tr&&(!qdone('s1b')||qs('c3')===2)?'!':null});
  {const ch=new THREE.Group();mesh(G.box,mat(0xc94f3a),0,.2,0,.7,.4,.45,ch);mesh(G.box,mat(0xffd36b),0,.42,0,.74,.06,.49,ch);mesh(G.cyl16,mat(0xff9a2e),0,.56,0,.08,.5,.08,ch).rotation.z=Math.PI/2;mesh(G.sph,mat(0xff8a1e),-.05,.7,0,.13,.12,.13,ch);mesh(G.box,mat(0x4f9a3a),-.02,.84,0,.1,.02,.05,ch);
    itemPick('blaster',THX-1.3,4.8,TZ-1.3,ch,()=>qs('c3')>=2,()=>{S.got.blaster=1;S.gunOff=false;if(qs('c3')<4)qset('c3',4);banner('Мандаринострел!','Стреляет холодными мандариновыми дольками',isTouch?'Кнопка «Пиу!» - выстрел':'Левая кнопка мыши - выстрел · G - убрать');AU.sfx('quest');setMode('play')})}
  /* race */
  const gates=[[24,-8],[8,-13],[-6,-22],[-26,-22],[-32,2],[-14,13]];const gObj=gates.map((g,i)=>{vis(G.box,0xf4ead8,g[0]-1.8,1.6,g[1],.2,3.2,.2);vis(G.box,0xf4ead8,g[0]+1.8,1.6,g[1],.2,3.2,.2);vis(G.box,0xff6b6b,g[0],3.2,g[1],3.8,.3,.25);
    const ring=mesh(new THREE.TorusGeometry(1.8,.08,6,32),new THREE.MeshBasicMaterial({color:0xffd36b,transparent:true,opacity:0}),g[0],1.7,g[1],1,1,1,L.group);return ring});
  const R={on:false,t:0,i:0};L.race=R;
  morkTalk.start=()=>{R.on=true;R.t=35;R.i=0;$('#timer').hidden=false;AU.sfx('ok');toast('Беги! Флажки светятся по очереди')};
  tick((t,dt)=>{gObj.forEach((g,i)=>{g.material.opacity=R.on&&i===R.i?.9:R.on&&i>R.i?.25:0;g.rotation.y=t});
    if(!R.on)return;R.t-=dt;const tm=$('#timer');tm.innerHTML=`<small>Флажок ${R.i+1} из 6</small>${R.t.toFixed(1)}`;tm.classList.toggle('warn',R.t<8);
    const g=gates[R.i];if(Math.hypot(P.x-g[0],P.z-g[1])<2.4){R.i++;AU.sfx('ring');if(R.i>=gates.length){R.on=false;tm.hidden=true;qcomplete('s1b');mork.pose='cheer'}}
    if(R.on&&R.t<=0){R.on=false;tm.hidden=true;AU.sfx('bad');toast('Время вышло. Морковка ждёт на дереве, попробуй ещё раз')}});
  /* orchard & farm details */
  const r=rng(21);for(let x=-40;x<=-28;x+=6)for(let z=-40;z<=-24;z+=6)fruitTree(x+(r()-.5),z+(r()-.5),1+r()*.25);sign(-26,0,-24,0,['МАНДАРИНОВЫЙ','САД'],{fs:50,w:1.8,h:.8,bg:'#4f9a3a'});
  for(let i=0;i<6;i++)box(22.5+i*1.5,0,-1+(i%2)*.3,1.2,.9,1,0xe8c870);
  vis(G.cyl,0x6b4628,10,1.2,22,.06,2.4,.06);vis(G.box,0x6b4628,10,1.8,22,1.4,.08,.08);vis(G.sph,0xe8c870,10,2.6,22,.3,.3,.3);vis(G.box,0x4f7ad6,10,1.6,22,.5,.6,.3);HATS.straw({add:o=>{o.position.x+=10;o.position.y+=2.2;o.position.z+=22;L.group.add(o)}},.3);
  for(let i=0;i<4;i++){box(-4+i*1.4,0,24,.9,1,.9,0xffd36b);vis(G.box,0xc99a3a,-4+i*1.4,1.02,24,1,.08,1)}
  const avoid=[[0,16,7],[0,9,4],[8.4,6,3],[-18,-8,9],[0,-32,7],[17,-21,8],[26,12,4],[-26,18,6],[-12,34,6],[36,-4,5],[-34,-32,10],...gates.map(g=>[g[0],g[1],3.5])];
  scatter(r,26,16,58,avoid,(x,z,s)=>tree(x,z,s*1.1,pick([0x4c8a35,0x5a9a40]),{fruit:r()<.6?0xff9a2e:null}));
  scatter(r,12,10,58,avoid,(x,z,s)=>rock(x,z,s*.7,0xb7743a));
  npc('farmhand',-6,0,-6,{walk:[[-6,-6],[8,-10],[8,2],[-6,2]],speed:1.3,talk:n=>{if(needTr('farmhand'))return;talk(n,[['farmhand',pick(['Мандаринчики только с виду милые. Убегают быстрее ветра. Заходи с дальней стороны и гони к загону.','Грушка опять рисует на водонапорной башне. Говорит, это искусство.','Лифт ветряка крутит колесо в загоне. Нет мандаринчиков, нет лифта.'])]])}});
  flowers(r,70,[0xffd36b,0xff8fb1,0xffffff,0xff9a2e],4,50);
  grass(650,[0x6f9a3a,0x5f8a34,0x7faa48],22);
  makeGround({edge:'trees',crowns:[0x4c8a35,0x5a9a3a,0x6aa840],c1:0x7da044,c2:0x6a9038,mount:0xb07a50,snow:0xfff0d8,path:0xb07a3a,seed:21,snowY:16,mh:24});
  finishLevel();
  AU.music('p1');AU.ambient('birds');
  L.arrive=[['kapik','Пахнет мандаринами! Юзик точно где-то рядом.'],['kapik','Здесь живут фермеры. Наверное, кто-то из них его видел.']];
  L.objective=()=>{const st=qs('m1');
    if(S.rescued.p1)return{text:nRescued()===4?'Все братья спасены. Лети на базу':'Юзик спасён. Удерживай E у тарелки, чтобы лететь дальше',pos:[0,3.2,16]};
    if(!S.tr)return{text:'Жители говорят на своём языке. Переводчик продаётся на базе',pos:null};
    if(st<2)return{text:'Найди фермера Цитрона: он чинит крышу амбара',pos:[-15.8,7.4,-9.6]};
    if(st===2){let best=null,bd=1e9;for(const c of chicks)if(!c.cap){const d=Math.hypot(c.x-P.x,c.z-P.z);if(d<bd){bd=d;best=c}}return{text:`Загони мандаринчиков в загон: ${q.caps} из 5. Заходи с дальней стороны`,pos:best?[best.x,1,best.z]:null}}
    return{text:'Поднимись на лифте ветряка к Юзику',pos:P.y>10?[2.9,14,-31.6]:[0,1,-29.6]}};
}
function citronTalk(n){if(needTr('citron'))return;const st=qs('m1');
  if(st<2){talk(n,[['citron','Тук-тук... Ой! Капибара на моей крыше. Ты, наверное, брат малыша с мандарином на голове?'],['citron','Он залез на ветряк за самым большим мандарином. А лифт ветряка крутят мандаринчики в колесе.'],['citron','Сегодня утром они сбежали из загона и разбежались по всей долине.'],['citron','Загони пятерых обратно. Они убегают от тебя, так что заходи с дальней стороны и гони к воротам загона. Загон у ветряка.']],()=>{qset('m1',2)});return}
  if(st===2){talk(n,[['citron',`Мандаринчиков в загоне: ${qd('m1').caps} из 5. Гони их к воротам с оранжевыми столбиками.`]]);return}
  talk(n,[['citron',S.rescued.p1?'Заходи ещё. И передай Юзику: мандарины не растут на ветряке.':'Колесо крутится, лифт работает! Встань на оранжевую площадку у ветряка.']])}
function grushkaTalk(n){if(needTr('grushka'))return;const st=qs('s1a');
  if(st===0){talk(n,[['grushka','Ой, привет! Ты как сюда залез? Хотя я и сама залезла.'],['grushka','Рисую самый большой мандарин в галактике. Но ветер сдул моё ведро с краской прямо на крышу теплицы.'],['grushka','Теплица в западной части сада. Принеси ведро, и я заплачу 8 монет.']],()=>qset('s1a',1));return}
  if(st===1&&qd('s1a').has){talk(n,[['grushka','Моё ведро! Теперь мандарин будет оранжевым, а не грустно-серым.']],()=>qcomplete('s1a'));return}
  if(st===1){talk(n,[['grushka','Ведро на крыше теплицы. Залезь по ящикам у южной стены.']]);return}
  talk(n,[['grushka',pick(['Как тебе мандарин? Я считаю, шедевр.','Отсюда видно всю долину. И твою тарелку тоже.'])]])}
function morkTalk(n){if(needTr('morkovka'))return;
  if(qs('c3')===2){talk(n,[['morkovka','Король Рогожар? Огненный? Ух! Тогда тебе нужен мой Мандаринострел!'],['morkovka','Он стреляет холодными мандариновыми дольками. Шлёп - и всё шипит!'],['morkovka','Он в красном сундучке прямо тут, в домике. Бери, только верни потом! Ну... когда-нибудь.']],()=>qset('c3',3));return}
  if(qs('c3')===3){talk(n,[['morkovka','Красный сундучок в углу домика! Хватай!']]);return}
  if(qdone('s1b')){talk(n,[['morkovka','Ты быстрее ветра! Даже быстрее мандаринчиков.']]);return}
  if(L.race&&L.race.on){talk(n,[['morkovka','Беги же! Время идёт!']]);return}
  talk(n,[['morkovka','Эй, капибара! Спорим, ты не пробежишь мои 6 флажков за 35 секунд?'],['morkovka','Флажки светятся по очереди. Первый у загона. Выиграешь, отдам 12 монет из копилки!'],['kapik','Спорим.']],()=>{if(!qs('s1b'))qset('s1b',1);morkTalk.start()})}
