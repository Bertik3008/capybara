/* ---------- LEVEL: P2 «Ледора» ---------- */
function aurora(){const g=new THREE.PlaneGeometry(260,50,60,1);const m=new THREE.ShaderMaterial({uniforms:{t:{value:0}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,fog:false,
    vertexShader:'uniform float t;varying vec2 vu;void main(){vu=uv;vec3 p=position;p.z+=sin(p.x*.03+t*.4)*18.+sin(p.x*.011-t*.25)*30.;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}',
    fragmentShader:'uniform float t;varying vec2 vu;void main(){float a=smoothstep(0.,.35,vu.y)*smoothstep(1.,.45,vu.y);a*=.55+.45*sin(vu.x*40.+t*1.3);vec3 c=mix(vec3(.2,1.,.6),vec3(.6,.4,1.),vu.y);gl_FragColor=vec4(c,a*.45);}'});
  for(let i=0;i<3;i++){const a=mesh(g,i?m.clone():m,(i-1)*60,95+i*12,-170+i*70,1,1,1,L.group);a.rotation.x=-.15;a.rotation.y=(i-1)*.4;a.renderOrder=-5;a.frustumCulled=false;tick(t=>{a.material.uniforms.t.value=t+i*3})}}
function igloo(x,z,o){o=o||{};vis(G.hemi,0xf4f8fb,x,0,z,3,2.4,3,0,0,0,.03);for(let i=0;i<4;i++)vis(G.torThin,0xd8e8f0,x,.5+i*.55,z,2.95-i*.35,2.95-i*.35,2.95-i*.35,Math.PI/2,0,0);
  vis(G.box,0xf4f8fb,x+3.1,1.0,z,1.6,2.0,1.9);vis(G.box,0x2a3a4a,x+3.92,.9,z,.02,1.8,1.3);
  for(let k=0;k<12;k++){const a=k/12*TAU;if(Math.abs(Math.atan2(Math.sin(a),Math.cos(a)))<.42)continue;box(x+Math.cos(a)*2.65,0,z+Math.sin(a)*2.65,1.3,2.0,1.3,0,{nv:true})}
  box(x,2.0,z,3.6,.4,3.6,0,{nv:true});for(const s of[-1,1])box(x+3.1,0,z+s*.85,1.6,1.9,.2,0,{nv:true});box(x+3.1,1.9,z,1.6,.2,1.9,0,{nv:true})}
function buildP2(){
  newLevel('p2');
  setSky({top:0x08102e,hor:0x2a5878,bot:0x1a2a3a,fog:0x2a4a62,near:35,far:150,hs:0xb8d8f0,hg:0x4a6a88,hi:.62,sc:0xcfe8ff,si:.5,sd:[.3,.55,.5],sunGlow:0x9fc8ff,stars:true});
  aurora();skyBody(0xdfe8ff,[140,110,-220],20);
  L.spawn={x:0,y:0,z:9,yaw:0};L.surface='snow';L.pathKind='snow';L.waterMsg='Бр-р! Ледяная вода. Капик вернулся на точку возврата';
  path([[0,9],[0,-18]],1.6,0xbcd4e0);path([[0,4],[12,-2]],1.3,0xbcd4e0);path([[0,6],[-20,6]],1.3,0xbcd4e0);
  placeUFO(0,16,{pad:0x9aaab8});
  /* ice tower with the elder */
  const ITX=16,TZ=-4,ice=0xbfe8ff;cyl(ITX,0,TZ,1.5,9.9,0x9fd8f0,{g:G.cyl6,tex:TX.ice});vis(G.cyl6,0xffffff,ITX,9.95,TZ,1.55,.1,1.55);
  for(let i=0;i<8;i++){const a=Math.PI*.5+i*TAU/8,h=(i+1)*1.1;const x=ITX+Math.cos(a)*2.75,z=TZ+Math.sin(a)*2.75;box(x,0,z,1.5,h,1.5,ice,{jit:.08,tex:TX.ice});vis(G.box,0xffffff,x,h+.04,z,1.56,.1,1.56)}
  const brr=npc('brr',ITX,9.9,TZ,{yaw:Math.PI/2,pose:'staff',talk:brrTalk,mark:()=>S.tr&&qs('m2')<2?'!':null,r:2.4});
  for(let i=0;i<4;i++){const l=glow(0x7fe3e8,2.5,.6);l.position.set(ITX+Math.cos(i*1.6)*1.6,10.5,TZ+Math.sin(i*1.6)*1.6);L.group.add(l)}
  /* lake */
  const LX=0,LZ=-40,LR=21;water(LX,LZ,LR,{col:0x1f5a7a});for(let i=0;i<40;i++){const a=i/40*TAU;vis(G.dod,0xd8e8f0,LX+Math.cos(a)*(LR+.6),.15,LZ+Math.sin(a)*(LR+.6),.9,.45,.9,0,i)}
  box(0,0,-20,2.2,.5,3,0x8a6a4a,{surf:'wood',tex:TX.planks});for(const s of[-1,1])vis(G.cyl,0x6b4628,s*1,0,-21.4,.1,1.2,.1);
  checkpoint(0,.5,-19.6,2.2,1.6,Math.PI);
  crackTile(0,0,-23,2,2,ice);crackTile(0,0,-26,2,2,ice);
  const fa=dynBox(0,0,-29.5,3,.4,3,0,{m:mat(0xe8f6ff),surf:'ice'});fa.t='ice';mover(fa,t=>[-3.5+3.5*Math.cos(t*.6),0,-29.5]);
  box(-8,0,-33.5,4,.7,4,0xe8f6ff,{surf:'snow',tex:TX.snow});vis(G.cone,0xbfe8ff,-9.2,1.3,-34.8,.4,1.4,.4);vis(G.cone,0xbfe8ff,-9.4,1,-32.5,.3,.9,.3);checkpoint(-8,.7,-33.5,3.6,3.6,Math.PI*.8);
  const isl1Sign=textSprite('Точка возврата',{size:30,h:.3});isl1Sign.position.set(-8,2.3,-33.5);L.group.add(isl1Sign);
  crackTile(-4.2,0,-36,2,2,ice);crackTile(-1.4,0,-38.5,2,2,ice);crackTile(1.4,0,-41,2,2,ice);
  const fb=dynBox(4.6,0,-44.5,3,.4,3,0,{m:mat(0xe8f6ff),surf:'ice'});fb.t='ice';mover(fb,t=>[4.6,0,-44.5-3*Math.cos(t*.55)]);
  box(4.5,0,-51,4,.8,3.5,0xe8f6ff,{surf:'snow',tex:TX.snow});vis(G.cone,0xbfe8ff,6,1.6,-52.2,.5,1.6,.5);vis(G.disc,0x0f2a3a,3.6,.81,-51.6,.45,.02,.45);
  if(!S.rescued.p2)npc('snezhok',4.2,.8,-50.6,{yaw:Math.PI*.95,pose:'sit',talk:n=>talk(n,[['snezhok','Капик! Я хотел поймать рыбку, а льдину отнесло на середину озера.'],['snezhok','Я так замёрз, что даже шарф замёрз. Апчхи!'],['kapik','Телепорт тарелки заберёт тебя домой. Там пруд и тепло.']],()=>rescueBro('p2',n)),mark:()=>'?'});
  /* igloo village */
  igloo(-24,6);igloo(-31,-7);igloo(-35,12);
  /* smokehouse inside the first igloo */
  vis(G.cyl,0x5a5a6a,-25,.6,6,.7,1.2,.7,0,0,0,.03,TX.stone);gvis(G.sph,0xff8a2e,-25,.35,6,.45,.2,.45);const smk=glow(0xff8a3a,3,.6);smk.position.set(-25,.8,6);L.group.add(smk);for(let i=0;i<4;i++)vis(G.box,0x9fd8f0,-24+i*.0,1.7,5+i*.6,.5,.12,.08);
  tick(t=>{smk.material.opacity=.45+Math.sin(t*9)*.1;if(Math.random()<.05)FXW.burst(-25,1.4,6,{col:0x999999,n:1,spd:.2,up:.6,g:-.2,life:2,size:.6})});
  workshop(-25,0,6,{title:'Коптильня',kind:'hold',help:'Удерживайте E, чтобы раздуть жар, и отпустите в зелёной зоне. Три удачные копчёнки.',from:'fish',need:3,to:'smoked',btn:'Подложить',r:2.6});
  sign(-20.6,0,7.6,Math.PI/2,['КОПТИЛЬНЯ'],{fs:56,w:1.6,h:.55,bg:'#5a7a9a'});
  for(let i=0;i<3;i++){vis(G.cone,0xbfe8ff,-31+i*.6,.6,-7.4+(i%2)*.8,.25,1.2,.25,0,0,0,.05,TX.ice);vis(G.sph,0xdff6ff,-31.6+i*.7,.4,-6.4,.3,.35,.3,0,0,0,.04,TX.ice)}
  const sleepy=npc('penguin',-35.6,0,12,{yaw:0,pose:'lie',nc:true});
  npc('penguin',-20,0,0,{walk:[[-20,0],[-28,1],[-27,14],[-19,12]],speed:1,talk:n=>{if(needTr('penguin'))return;talk(n,[['penguin',pick(['Фью-фью! Лёд у берега тонкий. Не стой на одном месте, а то провалишься.','Старейшина Брр сидит на башне и смотрит на сияние. Всегда.','Морж Усач ловит рыбу на западном пирсе. Ворчит, но добрый.'])]])}});
  npc('penguin',8,0,4,{walk:[[8,4],[14,8],[6,12]],speed:.9,pause:3});
  /* snowball range */
  box(28,0,8,1.2,2.4,6,0xf4f8fb,{tex:TX.snow});box(26.6,0,5.6,1.2,.8,1.2,0xf4f8fb,{tex:TX.snow});box(26.6,0,6.9,1.2,1.6,1.2,0xf4f8fb,{tex:TX.snow});for(let z=5.4;z<=10.6;z+=1.3)vis(G.box,0xe8f2f8,28.7,2.55,z,.4,.35,.8);
  const fyu=npc('fyu',28,2.4,9.6,{yaw:Math.PI/2,pose:'wave',talk:fyuTalk,mark:()=>S.tr&&!qdone('s2a')?'!':null});
  const tpos=[[36,0,2,1.4],[38,0,10,2.2],[42,0,5,3],[44,0,14,1.8],[40,0,-2,2.6],[46,0,8,3.6]];const T=[];
  tpos.forEach((p,i)=>{vis(G.cyl,0x6b4628,p[0],p[3]/2,p[2],.08,p[3],.08);const g=new THREE.Group();g.position.set(p[0],p[3],p[2]);L.group.add(g);
    mesh(G.disc,mat(0xff4a4a),0,0,0,.55,.06,.55,g).rotation.z=Math.PI/2;mesh(G.disc,mat(0xffffff),-.035,0,0,.36,.06,.36,g).rotation.z=Math.PI/2;mesh(G.disc,mat(0xff4a4a),-.07,0,0,.16,.06,.16,g).rotation.z=Math.PI/2;
    mesh(G.cone,mat(0xbfe8ff),0,-.75,0,.12,.6,.12,g).rotation.x=Math.PI;
    const tg={x:p[0],y:p[3],z:p[2],r:.75,on:false,g,hit:t=>{t.on=false;AU.sfx('hit');tween(.5,k=>{g.rotation.z=-k*1.4});FXW.burst(t.x,t.y,t.z,{col:0xbfe8ff,n:20,spd:3,life:.7});RG.hits++;toast(`Мишень: ${RG.hits} из 6`);if(RG.hits>=6){RG.on=false;$('#timer').hidden=true;qcomplete('s2a');fyu.pose='cheer'}}};T.push(tg);L.targets.push(tg)});
  const RG={on:false,t:0,hits:0};fyuTalk.start=()=>{RG.on=true;RG.t=50;RG.hits=0;T.forEach(t=>{t.on=true;t.g.rotation.z=0});L.canThrow=true;$('#tAlt').hidden=!isTouch;AU.sfx('ok');toast(isTouch?'Целься и жми «Бросок»':'Целься и бросай левой кнопкой мыши')};
  tick((t,dt)=>{if(!RG.on)return;RG.t-=dt;const tm=$('#timer');tm.hidden=false;tm.innerHTML=`<small>Мишени: ${RG.hits} из 6</small>${RG.t.toFixed(1)}`;tm.classList.toggle('warn',RG.t<10);
    if(RG.t<=0){RG.on=false;tm.hidden=true;AU.sfx('bad');toast('Время вышло. Фью ждёт на снежной стене');T.forEach(x=>{x.on=false;x.g.rotation.z=0})}});
  if(qs('s2a')>=1){L.canThrow=true}
  /* walrus pier */
  box(-20.5,0,-36,7,.5,4,0x8a6a4a,{surf:'wood',tex:TX.planks});for(let x=-23.5;x<=-17.5;x+=2)for(const s of[-1,1])vis(G.cyl,0x6b4628,x,0,-36+s*1.9,.12,1,.12);
  building({x:-26.2,z:-36,w:3.2,d:3.4,h:2.6,col:0x8a5a3a,trim:0x6b4628,door:'e',dw:1.3,dh:2.1,roof:'gable',roofCol:0x4a6a8a,rh:1.4,floor:0x7a5a3a});
  for(let i=0;i<3;i++)vis(G.cyl,0x7a4a2a,-27+i*.7,.35,-37,.25,.7,.25,0,0,0,.03,TX.planks);
  vis(G.disc,0x0a1e2a,-18.2,.51,-36,.55,.02,.55);vis(G.cyl,0x7a4a2a,-19.4,.5,-35.2,.32,.6,.32);box(-19.4,.5,-35.2,.6,.6,.6,0,{nv:true});
  npc('usach',-19.4,1.1,-35.2,{yaw:Math.PI/2+.4,pose:'fish',trader:1,talk:usachTalk,mark:()=>S.tr&&!qdone('s2b')?(qs('s2b')===0?'!':null):null,r:3});
  for(const h of[[-14,-22.5],[13,-22],[22,-34]]){vis(G.disc,0x0a1e2a,h[0],.03,h[1],.6,.02,.6);vis(G.tor,0xdff6ff,h[0],.05,h[1],.65,.65,.4,Math.PI/2,0,0,.02,TX.ice);fishingSpot(h[0],0,h[1],{r:1.6})}
  inter({x:-18.2,y:.5,z:-36,r:1.4,label:'E - рыбачить в проруби (задание Усача)',cond:()=>qs('s2b')===1,act:()=>openMini({title:'Прорубь Усача',help:'Удочку дал Усач. Жмите E или кнопку, когда поплавок в зелёной зоне. Нужно три рыбы.',need:3,btn:'Подсечь',unit:'Поймано',onWin:()=>{say([['usach','Три рыбы! Да ещё какие толстые. Усы благодарят тебя.']],()=>qcomplete('s2b'))}})});
  /* ice spire parkour */
  [[24,-14,1.2],[26.2,-15.6,2.4],[28.4,-17.2,3.6],[30.6,-18.8,4.8]].forEach((p,i)=>{box(p[0],0,p[1],1.4,p[2],1.4,0xcfeefc,{jit:.08,tex:TX.ice});vis(G.box,0xffffff,p[0],p[2]+.04,p[1],1.46,.1,1.46)});
  box(33,0,-20.6,1.4,6.4,1.4,0xa8dcf0,{jit:.08,tex:TX.ice});vis(G.cone,0xa8dcf0,33,7.2,-20.6,.6,1.4,.6);souvenir('p2',33,6.45,-20.6);
  /* scenery */
  const r=rng(31),avoid=[[0,16,7],[0,9,4],[16,-4,6],[0,-40,24],[-24,6,6],[-31,-7,6],[-35,12,6],[28,8,4],[40,8,9],[-21,-36,6],[28,-17,8]];
  scatter(r,40,14,58,avoid,(x,z,s)=>pine(x,z,s*1.2,0x2f5a4a,true));
  scatter(r,14,10,58,avoid,(x,z,s)=>{const h=1.5+r()*3;vis(G.cone,0xa8dcf0,x,h*s/2,z,.6*s,h*s,.6*s,0,r()*3);cyl(x,0,z,.5*s,h*s*.6,0,{nv:true})});
  for(const p of[[6,2],[-10,-10]]){vis(G.sph,0xffffff,p[0],.55,p[1],.6,.55,.6);vis(G.sph,0xffffff,p[0],1.35,p[1],.42,.4,.42);vis(G.sph,0xffffff,p[0],1.95,p[1],.3,.28,.3);vis(G.cone,0xff9a2e,p[0],1.95,p[1]+.35,.06,.25,.06,Math.PI/2,0,0);cyl(p[0],0,p[1],.6,2.2,0,{nv:true})}
  for(const p of[[-6,4],[8,-12],[-14,-14],[20,10]]){vis(G.cyl,0x3a3f4a,p[0],1.5,p[1],.09,3,.09);gvis(G.sph,0xffc070,p[0],3.1,p[1],.3,.3,.3);const l=glow(0xffa040,3.4,.6);l.position.set(p[0],3.1,p[1]);L.group.add(l);cyl(p[0],0,p[1],.2,3,0,{nv:true})}
  const sn=700,pos=new Float32Array(sn*3);for(let i=0;i<sn;i++){pos[i*3]=(Math.random()-.5)*60;pos[i*3+1]=Math.random()*30;pos[i*3+2]=(Math.random()-.5)*60}
  const sg2=new THREE.BufferGeometry();sg2.setAttribute('position',new THREE.BufferAttribute(pos,3));const snow=new THREE.Points(sg2,new THREE.PointsMaterial({color:0xffffff,size:.22,map:glowTex,transparent:true,opacity:.9,depthWrite:false}));snow.frustumCulled=false;L.group.add(snow);
  tick((t,dt)=>{for(let i=0;i<sn;i++){let y=pos[i*3+1]-dt*(2+(i%5)*.3);if(y<0)y+=30;pos[i*3+1]=y;pos[i*3]+=Math.sin(t+i)*dt*.3}sg2.attributes.position.needsUpdate=true;snow.position.set(P.x,0,P.z)});
  grass(250,[0xdfeef6,0xc8e0ec],32,{scale:.8});
  groundDetail(31,'snow',70);
  makeGround({edge:'pines',c1:0xd6e6f0,c2:0xc2d8e6,mount:0x7a98b0,snow:0xeef6fb,path:0xa8c4d6,seed:31,snowY:12,mh:26});
  finishLevel();
  AU.music('p2');AU.ambient('wind');
  L.arrive=[['kapik','Бр-р-р! Тут ужасно холодно. И небо светится.'],['kapik','Снежок где-то здесь. В его шарфе он не замёрзнет... надеюсь.']];
  L.objective=()=>{if(S.rescued.p2)return{text:nRescued()===4?'Все братья спасены. Лети на базу':'Снежок спасён. Удерживай E у тарелки, чтобы лететь дальше',pos:[0,3.2,16]};
    if(!S.tr)return{text:'Пингвины говорят на своём языке. Переводчик продаётся на базе',pos:[ITX,11.5,TZ]};
    if(qs('m2')<2)return{text:'Поднимись к Старейшине Брр на ледяную башню',pos:[ITX,11.6,TZ]};
    return{text:'Переберись через Звонкое озеро к Снежку. Тонкий лёд трещит, не стой на месте',pos:[4.5,2,-51]}};
}
function brrTalk(n){if(needTr('brr'))return;const st=qs('m2');
  if(st<2){talk(n,[['brr','Брр. Капибара на Ледоре? Ты замёрзнешь быстрее, чем скажешь «рыба».'],['brr','Твой брат в шарфе уплыл на льдине на остров посреди Звонкого озера. Отсюда его видно.'],['brr','Лёд у берега тонкий: трещит под лапами и через миг ломается. Льдины плавают туда-сюда.'],['brr','Упадёшь в воду, окажешься на последней точке возврата. Беги и не останавливайся.']],()=>qset('m2',2));return}
  talk(n,[['brr',S.rescued.p2?'Брр. Береги брата. И шарф.':'Остров с братом на севере озера. Прыгай по льдинам.']])}
function fyuTalk(n){if(needTr('fyu'))return;
  if(qdone('s2a')){talk(n,[['fyu','Фью! Ты лучший метатель снежков на всей Ледоре.']]);return}
  talk(n,[['fyu','Фью! Хочешь в снежный тир? Сбей все 6 мишеней за 50 секунд.'],['fyu',isTouch?'Снежки бросай кнопкой «Бросок». Выиграешь, дам 10 монет!':'Снежки бросай левой кнопкой мыши. Выиграешь, дам 10 монет!']],()=>{if(!qs('s2a'))qset('s2a',1);fyuTalk.start()})}
function usachTalk(n){if(needTr('usach'))return;const st=qs('s2b');
  if(st===0){talk(n,[['usach','Хм-м... Усы мёрзнут, а рыба не клюёт. Стар я стал.'],['usach','Поймаешь три рыбы в проруби у края пирса, дам 12 монет. Подсекай, когда поплавок в зелёной зоне.']],()=>qset('s2b',1));return}
  if(qdone('s2b')){openTrade('usach');return}talk(n,[['usach','Прорубь у края пирса. Подсекай вовремя. А рыбу и прочее я куплю.']],()=>openTrade('usach'))}
