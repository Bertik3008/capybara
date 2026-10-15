/* ---------- BASE EXTRAS: forest ring, grandpa's secret cave with an arcade, vegetable beds ---------- */
const CAVE={x:-31,z:-36.6};
function baseForest(r,avoid){avoid.push([CAVE.x,CAVE.z,10]);
  scatter(r,Math.round(75*[.55,.8,1][Q.q]),40,61,avoid,(x,z,s)=>{const k=r();if(k<.3)tree(x,z,s*1.25,pick([0x2f6a2f,0x3f7a35,0x4a8a3c,0x356f30]));
    else if(k<.88){const h=(3.5+r()*2.5)*s;vis(G.trunk,0x5a3a26,x,h*.18,z,.22*s,h*.36,.22*s,0,0,0,.03,TX.bark);for(let i=0;i<3;i++)vis(G.cone,pick([0x2a5a3a,0x30603a,0x24503a]),x,h*(.35+i*.2),z,(1.5-i*.35)*s,h*.38,(1.5-i*.35)*s,0,i,0,.05,TX.leaves)}
    else{vis(G.sph,0x3a7a35,x,.5*s,z,1.1*s,.8*s,1.1*s,0,0,0,.05,TX.leaves);vis(G.sph,0x4a8a3c,x+.6*s,.4*s,z+.3*s,.7*s,.55*s,.7*s,0,0,0,.05,TX.leaves)}})}
/* the cave: a rocky hill at the forest edge, entrance faces the edge of the world */
function buildCave(){const C=CAVE,ang=Math.atan2(C.z,C.x),dx=Math.cos(ang),dz=Math.sin(ang),R=5.4;
  const rockM=stdMat(0x7a7268,{roughness:.95}),inM=new THREE.MeshStandardMaterial({color:lc(0x2a2430),roughness:1,side:THREE.BackSide});
  const outer=mesh(new THREE.SphereGeometry(1,40,20,0,TAU,0,Math.PI/2),rockM,C.x,0,C.z,R+.6,4.6,R+.6,L.group);outer.castShadow=true;outer.receiveShadow=true;
  {const pa=outer.geometry.attributes.position;for(let i=0;i<pa.count;i++){const x=pa.getX(i),y=pa.getY(i),z=pa.getZ(i),k=1+(hash2(x*7,z*7)-.5)*.16*y;pa.setXYZ(i,x*k,y,z*k)}outer.geometry.computeVertexNormals()}
  mesh(new THREE.SphereGeometry(1,32,16,0,TAU,0,Math.PI/2),inM,C.x,0,C.z,R,4.1,R,L.group);
  for(let i=0;i<14;i++){const a=i/14*TAU+.2;if(Math.abs(Math.atan2(Math.sin(a-ang),Math.cos(a-ang)))<.42)continue;vis(G.dod,pick([0x6a645c,0x7a7268,0x8a8276]),C.x+Math.cos(a)*(R+.9),.7,C.z+Math.sin(a)*(R+.9),1.4,1.1,1.4,i,i,0,.05,TX.stone)}
  /* walls: ring of colliders with a gap toward the outside */
  for(let i=0;i<28;i++){const a=i/28*TAU;if(Math.abs(Math.atan2(Math.sin(a-ang),Math.cos(a-ang)))<.3)continue;cyl(C.x+Math.cos(a)*R,0,C.z+Math.sin(a)*R,.75,4.5,0,{nv:true})}
  /* entrance hidden behind boulders and bushes */
  const ex=C.x+dx*(R+.4),ez=C.z+dz*(R+.4);for(const s of[-1,1]){const px=ex-dz*s*2.1,pz=ez+dx*s*2.1;vis(G.dod,0x6a645c,px,1,pz,1.3,1.6,1.3,s,s*2,0,.05,TX.stone);cyl(px,0,pz,1.1,2,0,{nv:true})}
  for(const s of[-1,1])vis(G.sph,0x3a7a35,ex+dx*1.6-dz*s*1.4,.5,ez+dz*1.6+dx*s*1.4,1,.75,1,0,0,0,.05,TX.leaves);
  vis(G.disc,0x231c22,C.x,.02,C.z,R*.98,.02,R*.98);
  /* inside: crystals, paintings, grandpa's workshop */
  const cr=[0x7fe3e8,0xb28cff,0xff8fb1,0xffd36b];for(let i=0;i<10;i++){const a=i/10*TAU+.5;if(Math.abs(Math.atan2(Math.sin(a-ang),Math.cos(a-ang)))<.6)continue;const c=cr[i%4],x=C.x+Math.cos(a)*(R-.5),z=C.z+Math.sin(a)*(R-.5);for(let k=0;k<3;k++)gvis(G.oct,c,x+(k-1)*.25,.35+k*.12,z,.12,.4+k*.12,.12);const g=glow(c,2.2,.45);g.position.set(x,.8,z);L.group.add(g)}
  const back=ang+Math.PI,bx=C.x+Math.cos(back)*(R-.35),bz=C.z+Math.sin(back)*(R-.35);
  const pc=document.createElement('canvas');pc.width=512;pc.height=256;const pg=pc.getContext('2d');pg.fillStyle='rgba(0,0,0,0)';pg.fillRect(0,0,512,256);pg.strokeStyle='#e8c890';pg.fillStyle='#e8c890';pg.lineWidth=5;pg.lineCap='round';
  const capy=(x,y,s)=>{pg.beginPath();pg.ellipse(x,y,22*s,14*s,0,0,TAU);pg.stroke();pg.beginPath();pg.ellipse(x+20*s,y-10*s,10*s,8*s,0,0,TAU);pg.stroke();for(const k of[-12,0,12])pg.fillRect(x+k*s,y+12*s,3,10*s)};
  capy(70,190,1.4);capy(150,205,.8);capy(195,205,.8);capy(240,205,.8);capy(285,205,.8);pg.beginPath();pg.ellipse(400,80,60,16,0,0,TAU);pg.stroke();pg.beginPath();pg.arc(400,72,22,Math.PI,0);pg.stroke();for(let i=0;i<3;i++){pg.beginPath();pg.moveTo(380+i*20,100);pg.lineTo(370+i*30,140);pg.stroke()}
  for(let i=0;i<9;i++){const a=i/9*TAU;pg.beginPath();pg.moveTo(470+Math.cos(a)*8,30+Math.sin(a)*8);pg.lineTo(470+Math.cos(a)*16,30+Math.sin(a)*16);pg.stroke()}pg.font='bold 22px serif';pg.fillText('ДЕД',40,60);
  const pt=new THREE.CanvasTexture(pc);pt.encoding=THREE.sRGBEncoding;const paint=mesh(new THREE.PlaneGeometry(4,2),new THREE.MeshBasicMaterial({map:pt,transparent:true,opacity:.85,toneMapped:false}),bx,2.1,bz,1,1,1,L.group);paint.lookAt(C.x,2.1,C.z);
  /* arcade cabinet */
  const aa=back+.95,ax=C.x+Math.cos(aa)*(R-1.4),az=C.z+Math.sin(aa)*(R-1.4);const cab=new THREE.Group();cab.position.set(ax,0,az);cab.lookAt(C.x,0,C.z);L.group.add(cab);
  mesh(G.box,stdMat(0xc94f3a,{roughness:.6}),0,.95,0,.9,1.9,.7,cab);mesh(G.box,stdMat(0x2a2030),0,1.35,.3,.78,.6,.12,cab);mesh(G.box,stdMat(0xffd36b),0,1.85,.3,.86,.22,.12,cab);mesh(G.box,stdMat(0x3a3048),0,.95,.42,.86,.14,.3,cab).rotation.x=-.3;
  mesh(G.sph,bmat(0xff4a4a),-.15,1.03,.5,.05,.04,.05,cab);mesh(G.cyl,stdMat(0x111111),.15,1.08,.48,.02,.14,.02,cab);mesh(G.sph,bmat(0xff4a4a),.15,1.16,.48,.04,.04,.04,cab);
  const sc=document.createElement('canvas');sc.width=128;sc.height=96;const sg=sc.getContext('2d');const st=new THREE.CanvasTexture(sc);const scr=mesh(new THREE.PlaneGeometry(.66,.48),new THREE.MeshBasicMaterial({map:st,toneMapped:false}),0,1.36,.37,1,1,1,cab);
  mergeModel(cab);const sglow=glow(0x7fe3e8,2.4,.35);sglow.position.set(0,1.4,.6);cab.add(sglow);cyl(ax,0,az,.6,1.9,0,{nv:true});
  let sT=0;tick((t,dt)=>{sT-=dt;if(sT>0||Math.hypot(P.x-ax,P.z-az)>12)return;sT=.12;sg.fillStyle='#0a0820';sg.fillRect(0,0,128,96);for(let i=0;i<14;i++){sg.fillStyle='#fff';sg.fillRect((i*37+t*40)%128,(i*23)%96,1,1)}
    sg.fillStyle='#ffd36b';sg.font='bold 13px monospace';sg.textAlign='center';sg.fillText('КАПИ-ПРЫГ',64,20);sg.fillStyle='#7fe3e8';sg.beginPath();sg.ellipse(40,50+Math.sin(t*4)*8,10,4,0,0,TAU);sg.fill();sg.fillStyle='#8a8276';sg.fillRect(80,0,14,30);sg.fillRect(80,62,14,40);
    if(Math.floor(t*2)%2){sg.fillStyle='#ff8fb1';sg.font='bold 10px monospace';sg.fillText('ВСТАВЬ ЛАПУ',64,90)}st.needsUpdate=true});
  inter({x:ax,y:.5,z:az,r:2,label:'E - сыграть в дедушкин автомат «Капи-Прыг»',act:()=>openArcade()});
  /* hologram projector with grandpa's message */
  const hx=C.x+Math.cos(back-.95)*(R-1.6),hz=C.z+Math.sin(back-.95)*(R-1.6);cyl(hx,0,hz,.45,.5,0x4a4a5a,{g:G.cyl16,tex:TX.metal});gvis(G.disc,0x7fe3e8,hx,.52,hz,.35,.02,.35);
  const ded=makeCast('dedushka');ded.root.position.set(hx,.55,hz);ded.root.rotation.y=Math.atan2(C.x-hx,C.z-hz);const holo=new THREE.MeshBasicMaterial({color:lc(0x7fe3e8),transparent:true,opacity:.42,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false});ded.root.traverse(o=>{if(o.isMesh)o.material=holo;if(o.isSprite)o.visible=false});L.group.add(ded.root);
  const beam=mesh(new THREE.CylinderGeometry(.3,.45,2.6,16,1,true),new THREE.MeshBasicMaterial({color:lc(0x7fe3e8),transparent:true,opacity:.12,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false}),hx,1.8,hz,1,1,1,L.group);
  tick((t,dt)=>{holo.opacity=.3+Math.sin(t*9)*.05+(Math.random()<.03?-.2:0);ded.root.position.y=.55+Math.sin(t*1.5)*.04;charPose(ded,t,'idle',dt,null)});
  inter({x:hx,y:.5,z:hz,r:2,label:'E - включить голограмму',act:()=>{const first=!S.got.holo;S.got.holo=1;save();AU.sfx('zap');
    say([['dedushka','Пш-ш... Запись номер один. Если ты это видишь, значит, нашёл мою тайную пещеру. Молодец, внучок!'],['dedushka','Здесь я строил тарелку. И здесь стоит мой автомат «Капи-Прыг». Мой рекорд - 25. Побьёшь? Не побьёшь!'],['dedushka','Береги братьев. Старший - не тот, кто старше. А тот, кто возвращается за каждым.'],['kapik','Дедушка...']],()=>{if(first){addCoins(15);banner('Пасхалка найдена','Тайная пещера дедушки','+15 монет. Побей дедушкин рекорд в «Капи-Прыге»')}})}});
  /* old chest */
  const chx=C.x+Math.cos(back+.25)*(R-1.2),chz=C.z+Math.sin(back+.25)*(R-1.2);vis(G.box,0x7a4a2a,chx,.3,chz,.9,.6,.6,0,-back,0,.03,TX.planks);vis(G.box,0xffd36b,chx,.62,chz,.92,.05,.62,0,-back,0);
  inter({x:chx,y:.3,z:chz,r:1.8,label:'E - открыть старый сундук',act:()=>say([['kapik','Чертежи тарелки, фотография пяти маленьких капибар и записка...'],['kapik','«Лестницу к тарелке сделать обязательно. Внуки маленькие». Сделали, дедушка.']])});
}
/* ---------- grandpa's arcade: «Капи-Прыг» (flappy-style) ---------- */
const AR={on:false,y:0,vy:0,cols:[],t:0,score:0,state:'ready',sp:120};
function openArcade(){openScreen('#arcade');AR.state='ready';AR.y=160;AR.vy=0;AR.cols=[];AR.score=0;AR.t=0;arcadeDraw();$('#arBest').textContent=`Твой рекорд: ${S.arcade||0} · рекорд дедушки: 25`}
function arcadeFlap(){if(AR.state==='over'){if(AR.t>.6){AR.state='ready';AR.y=160;AR.vy=0;AR.cols=[];AR.score=0}return}if(AR.state==='ready'){AR.state='play';AR.t=0;AR.next=.4}AR.vy=-230;AU.sfx('jump')}
function arcadeTick(dt){if(curScreen!=='#arcade')return;AR.t+=dt;if(AR.state==='play'){AR.vy+=620*dt;AR.y+=AR.vy*dt;const sp=120+AR.score*4;AR.next-=dt;if(AR.next<=0){AR.next=1.55;const gap=110-Math.min(30,AR.score*1.2);AR.cols.push({x:500,g:60+Math.random()*(200-gap),h:gap,ok:false})}
  for(const c of AR.cols){c.x-=sp*dt;if(!c.ok&&c.x<70){c.ok=true;AR.score++;AU.sfx('coin')}if(c.x<104&&c.x>36&&(AR.y-10<c.g||AR.y+10>c.g+c.h))arcadeOver()}AR.cols=AR.cols.filter(c=>c.x>-60);if(AR.y>310||AR.y<0)arcadeOver()}arcadeDraw()}
function arcadeOver(){if(AR.state!=='play')return;AR.state='over';AR.t=0;AU.sfx('bad');const sc=AR.score,best=S.arcade||0;if(sc>best){S.arcade=sc;save()}
  const msg=[];if(sc>=10&&!S.hats.pilot){S.hats.pilot=1;save();msg.push('Награда: дедушкин шлем пилота!')}if(sc>=26&&!S.got.arcadeGold){S.got.arcadeGold=1;S.paints.retro=1;save();addCoins(30);msg.push('Рекорд дедушки побит! +30 монет и ретро-покраска тарелки')}
  if(msg.length)setTimeout(()=>{banner('Капи-Прыг',msg[0],msg[1]||'');AU.sfx('quest')},300);$('#arBest').textContent=`Твой рекорд: ${S.arcade||0} · рекорд дедушки: 25`}
function arcadeDraw(){const c=$('#arc'),g=c.getContext('2d'),W=480,H=320;g.fillStyle='#0a0820';g.fillRect(0,0,W,H);for(let i=0;i<40;i++){g.fillStyle=i%5?'#5a5a8a':'#fff';g.fillRect((i*97-AR.t*20*(1+i%3))%W+(i*97-AR.t*20*(1+i%3)<0?W:0),(i*53)%H,i%5?1:2,i%5?1:2)}
  for(const cl of AR.cols){for(const [y0,y1] of [[0,cl.g],[cl.g+cl.h,H]]){g.fillStyle='#7a7268';g.beginPath();g.roundRect?g.roundRect(cl.x,y0-8,34,y1-y0+16,10):g.rect(cl.x,y0,34,y1-y0);g.fill();g.fillStyle='#5a544c';for(let k=y0+14;k<y1-6;k+=26){g.beginPath();g.arc(cl.x+12+(k%3)*4,k,5,0,TAU);g.fill()}}}
  const y=AR.y,tilt=clamp(AR.vy/500,-.5,.6);g.save();g.translate(70,y);g.rotate(tilt);g.fillStyle='#b8c4d6';g.beginPath();g.ellipse(0,0,22,8,0,0,TAU);g.fill();g.fillStyle='#9fe9ff';g.beginPath();g.arc(0,-4,10,Math.PI,0);g.fill();g.fillStyle='#9a6236';g.beginPath();g.arc(0,-6,5,0,TAU);g.fill();g.fillStyle='#ffd36b';for(const k of[-12,0,12]){g.fillRect(k-1.5,1,3,3)}g.restore();
  g.fillStyle='#ffd36b';g.font='bold 28px monospace';g.textAlign='center';g.fillText(AR.score,W/2,40);
  if(AR.state==='ready'){g.fillStyle='#fff';g.font='bold 16px monospace';g.fillText(isTouch?'КОСНИСЬ, ЧТОБЫ ЛЕТЕТЬ':'ПРОБЕЛ - ВВЕРХ',W/2,H/2+60)}
  if(AR.state==='over'){g.fillStyle='rgba(0,0,0,.55)';g.fillRect(0,0,W,H);g.fillStyle='#ff8fb1';g.font='bold 26px monospace';g.fillText('БУМ!',W/2,H/2-20);g.fillStyle='#fff';g.font='bold 15px monospace';g.fillText(`Счёт: ${AR.score}`,W/2,H/2+10);g.fillText(isTouch?'Коснись - ещё раз':'Пробел - ещё раз',W/2,H/2+36)}}
/* ---------- vegetable beds: plant a fruit, it grows in real time ---------- */
const SEEDS=['berry','mandarin','banana'];
function buildGarden(){const GX=-7,GZ=-23.5;S.garden=S.garden||{};
  for(let i=0;i<4;i++){const x=GX+(i%2)*2.4,z=GZ+Math.floor(i/2)*2;vis(G.box,0x6a4a2a,x,.12,z,1.8,.24,1.3,0,0,0,.02,TX.planks);vis(G.box,0x4a3020,x,.26,z,1.6,.04,1.1);
    const plant=new THREE.Group();plant.position.set(x,.28,z);L.group.add(plant);const sprout=new THREE.Group(),bush=new THREE.Group(),fruit=new THREE.Group();plant.add(sprout,bush,fruit);
    for(let k=0;k<4;k++)mesh(G.sph,mat(0x5aa040),(k%2-.5)*.6,.08,(Math.floor(k/2)-.5)*.5,.08,.12,.05,sprout);for(let k=0;k<4;k++)mesh(G.sph,mat(0x4a8a3c),(k%2-.5)*.6,.25,(Math.floor(k/2)-.5)*.5,.28,.24,.28,bush);
    const setFruit=kind=>{while(fruit.children.length)fruit.remove(fruit.children[0]);for(let k=0;k<6;k++){const m=resModel(kind);m.scale.setScalar(.7);m.position.set((k%3-1)*.45,.3,(Math.floor(k/3)-.5)*.45);fruit.add(m)}};
    mergeModel(sprout);mergeModel(bush);const bed={i,x,z,plant,sprout,bush,fruit,setFruit};const upd=()=>{const g=S.garden[i];const st=!g?0:Math.min(1,(Date.now()-g.t)/120000);sprout.visible=!!g&&st<.4;bush.visible=!!g&&st>=.4;fruit.visible=!!g&&st>=1;if(g&&st>=1&&bed.k!==g.k){bed.k=g.k;setFruit(g.k)}bed.st=st;return st};
    upd();tick(()=>{upd();bush.scale.setScalar(.6+Math.min(1,bed.st)*.4)});
    inter({x,y:.3,z,r:1.6,label:()=>{const g=S.garden[i];if(!g)return'E - посадить на грядку '+(SEEDS.some(k=>S.inv[k]>0)?'('+RES[SEEDS.find(k=>S.inv[k]>0)].one+')':'(нужен ягода, мандарин или банан)');const st=upd();return st>=1?'E - собрать урожай: '+RES[g.k].name.toLowerCase():`Растёт: ${Math.round(st*100)}% · ещё ${Math.ceil((1-st)*120)} с`},
      act:()=>{const g=S.garden[i];if(!g){const k=SEEDS.find(k=>S.inv[k]>0);if(!k){say([['kapik','Чтобы что-то вырастить, нужна ягода, мандарин или банан в сумке.']]);return}takeRes(k,1);S.garden[i]={k,t:Date.now()};save();AU.sfx('pickup');toast(`Посажено: ${RES[k].one}. Вырастет за 2 минуты, даже пока ты в космосе`);return}
        if(upd()<1){toast('Ещё не выросло. Загляни попозже');return}const got=addRes(g.k,4);if(got){delete S.garden[i];bed.k=null;save();AU.sfx('quest');FXW.burst(x,.8,z,{col:parseInt(RES[g.k].col.slice(1),16),n:20,spd:2,up:2,life:.8})}}})}
  fence(GX-1.4,GZ-1.2,GX+3.8,GZ-1.2,0xa0683c,{nc:true,h:.6});vis(G.cyl,0x7aa8ff,GX+4.4,.25,GZ+.6,.25,.5,.25);vis(G.cyl,0x7aa8ff,GX+4.4,.55,GZ+.85,.04,.3,.04,.8,0,0)}

$('#arc').addEventListener('pointerdown',e=>{e.preventDefault();arcadeFlap()});
