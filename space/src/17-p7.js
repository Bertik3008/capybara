/* ---------- LEVEL: P7 «Банания» (глава 3: тут спрятан Бананомёт) ---------- */
function goldBanana(){const g=new THREE.Group();for(let i=0;i<6;i++){const a=-.9+i*.36;mesh(G.sph,mat(0xffd36b,{metal:.8,rough:.25}),Math.sin(a)*.28,.4+Math.cos(a)*.2,0,.09,.09,.09,g)}mesh(G.cyl,mat(0x6a4a2a),Math.sin(-.9)*.28,.4+Math.cos(-.9)*.2+.06,0,.03,.08,.03,g);g.add(glow(0xffd36b,2.2,.75));return g}
function buildP7(){
  newLevel('p7');
  setSky({top:0x3aa8f0,hor:0xfff0b0,bot:0xffe8a0,fog:0xd8f0c8,near:48,far:180,hs:0xfffaf0,hg:0x4a7a3a,hi:.72,sc:0xfff4d0,si:.95,sd:[.45,.62,-.4],sunGlow:0xfff4b0,clouds:16});
  skyBody(0xffe14a,[-170,110,-260],26,0xfff2b0);skyBody(0x8fd8e0,[230,90,-140],11);
  L.spawn={x:0,y:0,z:9,yaw:0};L.surface='grass';L.waterMsg='Бр-р! Капибары плавают, но течение унесло Капика на берег';
  path([[0,9],[0,-2]],1.6,0xe8d098);path([[0,4],[-12,14],[-14,20]],1.3,0xe8d098);path([[0,4],[18,6],[28,8]],1.3,0xe8d098);path([[0,-14],[0,-27]],1.6,0xe8d098);path([[0,6],[-20,8]],1.1,0xe8d098);
  placeUFO(0,16,{pad:0xc8b080});
  const Q=qd('c3');Q.gb=Q.gb||{};
  /* river and the raft */
  for(let x=-52;x<=52;x+=4.2)water(x,-8,3.4,{col:0x4ac0d8,deep:0x1a6a8a});
  const raft=addC({k:'b',x0:-1.4,x1:1.4,y0:-.05,y1:.3,z0:-1.4,z1:1.4,t:'solid',surf:'wood',h:.35});const rg=new THREE.Group();L.group.add(rg);
  for(let i=0;i<5;i++){const lg=mesh(G.cyl,mat(0x9a6a3a),-1.1+i*.55,0,0,.26,2.8,.26,rg);lg.rotation.x=Math.PI/2;lg.castShadow=true}for(const z of[-.9,.9])mesh(G.box,mat(0x6b4628),0,.2,z,2.8,.08,.12,rg);mesh(G.cyl,mat(0x6b4628),-.9,.9,-.9,.05,1.6,.05,rg);const flagM=mesh(G.box,mat(0xffe14a),-.6,1.5,-.9,.6,.36,.02,rg);
  raft.m=rg;rg.position.set(0,.15,-3.6);
  mover(raft,t=>{const per=16,k=(t%per)/per;let u=k<.15?0:k<.5?(k-.15)/.35:k<.65?1:1-(k-.65)/.35;u=u*u*(3-2*u);return[0,-.05+Math.sin(t*2)*.03,lerp(-3.6,-12.4,u)]});
  for(const z of[-3.2,-12.8])for(const s of[-1,1])vis(G.cyl,0x6b4628,s*1.7,.6,z,.12,1.4,.12,0,0,0,.02,TX.bark);
  cyl(3.6,0,-8,1.05,1.15,0x8a8a7a,{g:G.dod,tex:TX.stone});vis(G.sph,0x4aa040,3.4,1.18,-7.8,.5,.15,.5);
  itemPick('gban2',3.6,1.2,-8,goldBanana(),()=>qs('c3')>=2,()=>gotBanana(2));
  /* tall banana palm with a vine ladder: golden banana #1 at the top */
  const PX=-26,PZ=6;cyl(PX,0,PZ,.55,13,0x8a6a3a,{g:G.cyl16,tex:TX.bark});for(let y=1;y<13;y+=1.1)vis(G.tor,0x7a5a2a,PX,y,PZ,.6,.6,.35,Math.PI/2,0,0);
  for(let i=0;i<8;i++){const a=i/8*TAU;const lf=new THREE.Group();lf.position.set(PX,13.1,PZ);lf.rotation.y=-a;L.group.add(lf);mesh(G.sph,mat(0x3a9a3a),2.4,-.4,0,2.6,.12,.7,lf).rotation.z=-.3}
  box(PX,12.7,PZ-1.25,3,.3,2.7,0,{nv:true,surf:'wood'});vis(G.box,0x7a5a2a,PX,12.85,PZ-1.25,3,.1,2.7,0,0,0,.02,TX.planks);
  ladder(PX,PZ+.62,0,12.85,0,0x4a8a2a);
  itemPick('gban0',PX+.8,13,PZ-1.6,goldBanana(),()=>qs('c3')>=2,()=>gotBanana(0));
  /* waterfall with a secret alcove: golden banana #2 behind the water */
  const WX=33;box(WX+1,0,2,4,9,4,0x7a7a6a,{tex:TX.stone});box(WX+1,0,14,4,9,4,0x7a7a6a,{tex:TX.stone});box(WX+2.5,0,8,1,9,8,0x6a6a5a,{tex:TX.stone});box(WX+.5,3,8,3,6,8,0x7a7a6a,{tex:TX.stone});
  for(let i=0;i<6;i++)vis(G.sph,0x4aa040,WX+1+Math.cos(i)*1.5,9.1,2+i*2.4,1.2,.5,1.2,0,0,0,.05,TX.leaves);
  const wfM=new THREE.ShaderMaterial({transparent:true,depthWrite:false,side:THREE.DoubleSide,uniforms:{time:UNI.time},vertexShader:'varying vec2 vu;void main(){vu=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform float time;varying vec2 vu;float h(vec2 p){return fract(sin(dot(p,vec2(12.9,78.2)))*43758.5);}void main(){float s=h(vec2(floor(vu.x*40.),0.));float y=fract(vu.y*3.+time*(1.2+s*.8)+s);float st=smoothstep(.0,.5,y)*smoothstep(1.,.6,y);vec3 c=mix(vec3(.55,.85,.95),vec3(1.),st*.7);gl_FragColor=vec4(c,.55+st*.3);}'});
  const wf=mesh(new THREE.PlaneGeometry(8,9),wfM,WX-1.05,4.5,8,1,1,1,L.group);wf.rotation.y=Math.PI/2;water(WX-4,8,3.2,{safe:true,col:0x6ad0e8,deep:0x2a8aa8});
  tick((t,dt)=>{if(Math.random()<dt*20)FXW.burst(WX-1.6,.3,4.5+Math.random()*7,{col:0xffffff,n:1,spd:1,up:2.5,g:6,life:.6,size:.35})});
  itemPick('gban1',WX+.8,.2,8,goldBanana(),()=>qs('c3')>=2,()=>gotBanana(1));const ag=glow(0xffd36b,4,.3);ag.position.set(WX+.8,1.4,8);L.group.add(ag);
  /* monkey village */
  const stilt=(x,z,w,d,top,roof)=>{box(x,top-.3,z,w,.3,d,0x9a6a3a,{surf:'wood',tex:TX.planks});for(const a of[-1,1])for(const b of[-1,1])vis(G.cyl,0x6b4628,x+a*(w/2-.2),(top-.3)/2,z+b*(d/2-.2),.13,top-.3,.13,0,0,0,.02,TX.bark);
    vis(G.cone,roof,x,top+1.5,z,w*.85,2,d*.85,0,Math.PI/4,0,.04,TX.straw);for(const a of[-1,1])vis(G.cyl,0x6b4628,x+a*(w/2-.4),top+.6,z+d/2-.3,.08,1.2,.08)};
  stilt(-15,22,4.4,4.4,2.6,0xd8b860);ladder(-15,24.45,0,2.6,0,0x6b4628);stilt(-23,18,3.6,3.6,3.2,0xc8a850);stilt(-7,27,4,4,2.2,0xe0c070);box(-11,2.3,24.5,4.2,.2,1.2,0x9a6a3a,{surf:'wood',tex:TX.planks});
  npc('bananych',-15,2.6,22,{yaw:Math.PI,pose:'staff',talk:bananychTalk,mark:()=>S.tr&&qs('c3')===2?'!':null});
  npc('makakin',-6,0,20,{yaw:Math.PI*.8,pose:'think',talk:makakinTalk,mark:()=>S.tr&&(qs('c3')===2||qs('c3')===3&&Object.keys(qd('c3').gb||{}).length>=3)?'!':null});
  vis(G.box,0xf4f6fa,-4.2,.9,19,1.1,1.8,.9,0,0,0,.02,TX.metal);gvis(G.box,0xbfefff,-4.2,1.2,19.46,.9,.9,.02);vis(G.box,0x8a96a0,-3.6,1.1,19.46,.06,.4,.06);
  workshop(-4.2,0,18.3,{title:'Мороженица',kind:'mash',help:'Крутите ручку мороженицы: жмите E или кнопку быстро, пока пломбир не загустеет.',from:'banana',need:4,to:'icecream',btn:'Крутить',r:2.2});
  box(8,0,20,3.4,.9,1.2,0xc98a4a,{tex:TX.planks});for(let i=0;i<5;i++)vis(G.box,i%2?0xfff1d6:0xffe14a,6.6+i*.7,2.6,20,.7,.1,1.6,.25,0,0,.02,TX.stripes);for(const s of[-1,1])vis(G.box,0x6b4628,8+s*1.6,1.3,20.5,.12,2.6,.12);
  for(let i=0;i<4;i++){const b=mesh(G.cap,mat(0xffe14a),6.9+i*.7,1.05,20,.05,.26,.05,L.group);b.rotation.z=1}
  npc('frukta',8,0,21.2,{yaw:Math.PI,trader:1,talk:n=>{if(needTr('frukta'))return;openTrade('frukta')}});
  npc('monkey',-2,0,12,{walk:[[-2,12],[6,14],[4,24],[-10,16]],speed:1.6,talk:n=>{if(needTr('monkey'))return;talk(n,[['monkey',pick(['У-у-а! Плот сам ходит туда-сюда. Просто встань и жди.','Вождь говорит, в храме за рекой спит что-то холодное.','Один золотой банан прячется там, где шумит вода.','Высокая пальма видит всё. И один золотой банан тоже.'])]])}});
  npc('monkey',-24,3.2,18,{yaw:.8,pose:'dangle',talk:n=>{if(needTr('monkey'))return;talk(n,[['monkey','Ик! Банан на камне посреди реки. Прыгай с плота, когда он мимо проплывает!']])}});
  /* banana plants to gather */
  [[-8,6],[10,4],[14,12],[-18,-2],[22,-2],[-30,14],[6,28],[18,22]].forEach(p=>node('banana',p[0],0,p[1],{regrow:55,yield:2}));
  /* ancient temple across the river */
  const TZ=-36;box(0,0,TZ,14,1.5,12,0x9a9a7a,{tex:TX.stone});box(0,1.5,TZ-.5,10,1.5,9,0x8a8a6a,{tex:TX.stone});box(0,3,TZ-1,6,1.5,6,0x7a7a5a,{tex:TX.stone});
  stairs(0,0,-27.6,Math.PI,9,3,.5,.65,0xa8a888);for(const s of[-1,1])for(let k=0;k<3;k++)vis(G.sph,0x4aa040,s*(6.5-k*2),1.5+k*1.5,TZ+5.6-k*.5,.8,.5,.8,0,0,0,.05,TX.leaves);
  const SH=TZ-1.5;box(-2.2,4.5,SH,.4,3,3,0x6a6a4a,{tex:TX.stone});box(2.2,4.5,SH,.4,3,3,0x6a6a4a,{tex:TX.stone});box(0,4.5,SH-1.5,4.8,3,.4,0x6a6a4a,{tex:TX.stone});box(0,7.5,SH,4.8,.5,3.4,0x5a5a3a,{tex:TX.stone});
  vis(G.cone,0x5a5a3a,0,8.6,SH,2.8,1.6,2.4,0,Math.PI/4,0);for(let i=0;i<3;i++)gvis(G.sph,Object.keys(Q.gb).length>i||qs('c3')>=4?0xffd36b:0x5a5a3a,-1+i,7.1,SH+1.75,.16,.16,.08);
  const doorC=box(0,4.5,SH+1.5,4,2.9,.3,0,{nv:true});const doorM=mesh(G.box,stdMat(0x8a7a4a,{roughness:.9}),0,5.95,SH+1.5,4,2.9,.3,L.group);mesh(G.box,stdMat(0xffd36b,{metalness:.7,roughness:.3}),0,0,.6,.15,.2,.1,doorM);
  const opened=()=>qs('c3')>=4||Q.door;const openDoor=anim=>{doorC.on=false;if(!anim){doorM.visible=false;return}tween(1.5,p=>{doorM.position.y=5.95-p*3},()=>{doorM.visible=false});AU.sfx('quest');banner('Храм открыт','Внутри холодно...','Бананомёт где-то здесь')};if(opened())openDoor(false);
  inter({x:0,y:4.5,z:SH+2.6,r:2.6,hold:1,label:()=>`Удерживайте E - вставить золотые бананы (${Object.keys(Q.gb).length} из 3)`,cond:()=>!opened()&&qs('c3')>=2,act:()=>{const n=Object.keys(Q.gb).length;if(n<3){say([['kapik',`На двери три углубления в форме бананов. У меня только ${n}. Где же остальные?`]]);return}Q.door=1;save();openDoor(true)}});
  /* the freezer with the blaster inside */
  vis(G.box,0xf4f6fa,0,5.4,SH-.9,1.4,1.8,.7,0,0,0,.02,TX.metal);gvis(G.box,0xbfefff,0,5.6,SH-.54,1.1,1.2,.02);const fz=glow(0xbfefff,5,.5);fz.position.set(0,5.6,SH-.2);L.group.add(fz);
  tick((t,dt)=>{if(Math.random()<dt*6)FXW.burst((Math.random()-.5)*1.2,5,SH-.4,{col:0xeaf8ff,n:1,spd:.3,up:-.3,g:-.5,life:1.4,size:.3})});
  const gun=makeBananomet();gun.scale.setScalar(1.6);gun.rotation.y=Math.PI/2;const holder=new THREE.Group();holder.add(gun);vis(G.cyl16,0x9a9a8a,0,4.95,SH+.4,.45,.9,.45,0,0,0,.02,TX.stone);
  itemPick('blaster',0,5.45,SH+.4,holder,()=>opened(),()=>{S.got.blaster=1;S.gunOff=false;if(qs('c3')<4)qset('c3',4);banner('Бананомёт!','Стреляет шариками холодного бананового пломбира',isTouch?'Кнопка «Пиу!» - выстрел':'Левая кнопка мыши - выстрел · G - убрать');AU.sfx('quest');setMode('play');setTimeout(()=>say([['kapik','Тяжёлый, холодный и пахнет бананом. То, что нужно против огня.'],['kapik','Теперь на Магмару. Держитесь, малыши!']]),900)});
  function gotBanana(i){Q.gb[i]=1;save();const n=Object.keys(Q.gb).length;AU.sfx('quest');banner('Золотой банан',`Найдено: ${n} из 3`,n>=3?'Неси их к храму за рекой':'Где-то спрятаны ещё');if(qs('c3')===2)qset('c3',3)}
  /* scenery */
  const r=rng(81),avoid=[[0,16,7],[0,9,4],[0,-8,6],[PX,PZ,4],[WX,8,7],[-14,22,10],[8,20,4],[0,TZ,10],[-4,19,3]];
  scatter(r,34,10,58,avoid,(x,z,s)=>{if(Math.abs(z+8)<4.5)return;const h=(5+r()*4)*s;vis(G.cyl16,0x9a7a4a,x,h/2,z,.22*s,h,.22*s,r()*.1,0,r()*.1,.03,TX.bark);for(let i=0;i<6;i++){const a=i/6*TAU+r();vis(G.sph,pick([0x3a9a3a,0x4aa040,0x2f8a30]),x+Math.cos(a)*1.4*s,h,z+Math.sin(a)*1.4*s,1.8*s,.1,.5*s,0,-a,-.35,.05,TX.leaves)}if(r()<.5)for(let i=0;i<3;i++)gvis(G.cap,0xffe14a,x+.25,h-.4,z+(i-1)*.12,.04,.2,.04)});
  scatter(r,40,6,58,avoid,(x,z,s)=>{if(Math.abs(z+8)<4.5)return;for(let i=0;i<4;i++)vis(G.sph,pick([0x4aa040,0x3a8a3a,0x5ab84a]),x+Math.cos(i*1.6)*.4*s,.3*s,z+Math.sin(i*1.6)*.4*s,.6*s,.35*s,.6*s,0,0,0,.05,TX.leaves);if(r()<.4)gvis(G.sph,pick([0xff6b9a,0xffd36b,0xff8a3a]),x,.65*s,z,.15,.15,.15)});
  scatter(r,8,12,52,avoid,(x,z,s)=>rock(x,z,s*.8,0x9a9a8a));
  tick((t,dt)=>{if(Math.random()<dt*3){const a=Math.random()*TAU,d=8+Math.random()*25;FXW.burst(P.x+Math.cos(a)*d,2+Math.random()*4,P.z+Math.sin(a)*d,{col:pick([0xff6b9a,0x7fe3e8,0xffd36b]),n:2,spd:.8,up:.4,g:0,life:2.2,size:.2})}});
  grass(520,[0x5ab84a,0x4aa040,0x7ac850],81);
  makeGround({edge:'trees',crowns:[0x3a9a3a,0x4aa040,0x2f8a30],c1:0x6ac04a,c2:0x58a840,mount:0x5a9a5a,snow:0xd8f0a0,path:0xe8d098,seed:81,snowY:16,mh:22});
  finishLevel();
  AU.music('p7');AU.ambient('birds');
  L.arrive=[['kapik','Банания! Пахнет бананами и тёплым дождём.'],['kapik','Где-то тут живёт Профессор Макакин. Надо найти обезьянью деревню.']];
  L.objective=()=>{const st=qs('c3'),n=Object.keys(Q.gb).length;
    if(!S.tr)return{text:'Без переводчика обезьян не понять',pos:null};
    if(st===2)return{text:'Найди Профессора Макакина в обезьяньей деревне',pos:[-6,2.2,20],tag:'Глава 3'};
    if(st===3&&n<3){const spots=[[PX+.8,13.8,PZ-1.6],[WX+.8,1.2,8],[3.6,2,-8]];const left=[0,1,2].filter(i=>!Q.gb[i]);let b=left[0],bd=1e9;for(const i of left){const d=Math.hypot(spots[i][0]-P.x,spots[i][2]-P.z);if(d<bd){bd=d;b=i}}
      return{text:['Золотой банан на верхушке высокой пальмы. Лиана ведёт наверх','Золотой банан там, где шумит вода. Загляни за водопад','Золотой банан на камне посреди реки. Прыгни с плота'][b]+` (${n} из 3)`,pos:spots[b],tag:'Глава 3'}}
    if(st===3)return{text:opened()?'Храм открыт. Забери Бананомёт у морозильника':'Все бананы найдены! Переплыви реку на плоту и открой храм',pos:opened()?[0,6,SH+.4]:[0,6,SH+2.6],tag:'Глава 3'};
    if(st>=4&&st<99&&!S.got.blaster)return{text:'Забери Бананомёт в храме',pos:[0,6,SH+.4],tag:'Глава 3'};
    if(st>=4&&st<99)return{text:'Бананомёт у тебя. Лети на Магмару!',pos:null,tag:'Глава 3'};
    return{text:'На Банании можно собирать бананы и делать пломбир в мороженице',pos:null}};
}
function makakinTalk(n){if(needTr('makakin'))return;const st=qs('c3'),gb=Object.keys(qd('c3').gb||{}).length;
  if(st===2){talk(n,[['makakin','О! Капибара! Вы ведь не просто так прилетели? У вас такие тревожные усы.'],['kapik','Король Рогожар украл моих братьев. Мне нужно что-то очень холодное.'],['makakin','Тогда вам нужен мой Бананомёт! Стреляет шариками бананового пломбира минус сорок градусов.'],['makakin','Беда: вождь запер его в древнем храме за рекой. Говорит, слишком опасная штука для обезьян.'],['makakin','Дверь открывают три золотых банана. Один на верхушке высокой пальмы, другой за водопадом, третий на камне посреди реки.']],()=>{qset('c3',3)});return}
  if(st===3){talk(n,[['makakin',gb>=3?'Все три! Плот отвезёт вас к храму. Морозильник внутри, Бананомёт там.':`Золотых бананов: ${gb} из 3. Пальма, водопад и река. Ищите!`]]);return}
  if(st>=4){talk(n,[['makakin',pick(['Бананомёт работает? Не забывайте: пломбир надо стрелять, а не есть!','Из бананов в мороженице получается отличный пломбир. Торговцы его обожают.'])]]);return}
  talk(n,[['makakin','Я изобретаю мороженое. Или мороженое изобретает меня?']])}
function bananychTalk(n){if(needTr('bananych'))return;const st=qs('c3');
  if(st===2){talk(n,[['bananych','У-у-ух. Я вождь Бананыч. Ищешь Бананомёт? Поговори с Макакиным, он его выдумал на нашу голову.']]);return}
  if(st===3){talk(n,[['bananych','Раз Рогожар обижает малышей, пусть будет Бананомёт. Но бананы для двери найди сам. Таков закон джунглей.']]);return}
  talk(n,[['bananych',pick(['Банания рада гостям. Особенно пушистым.','Раньше храм стерёг холод. Теперь его стережёшь ты.'])]])}
