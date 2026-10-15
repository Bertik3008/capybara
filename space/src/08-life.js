/* ---------- BASE LIFE: brothers stroll between activities, play ball, can be treated, petted and chased ---------- */
const BRO_GIFT={yuzik:{hat:'mandarin',txt:'Юзик подарил свою мандариновую шапку!'},gribok:{hat:'mushroom',txt:'Грибок подарил грибную шляпку!'},vintik:{hat:'goggles',txt:'Винтик подарил лётные очки!'},snezhok:{hat:'beanie',txt:'Снежок связал Капику шапку!'}};
const FOOD=['mandarin','banana','berry','fish','icecream','juice','smoked','pillow'];
function broData(k){S.bros=S.bros||{};return S.bros[k]||(S.bros[k]={h:0})}
/* playground in the east yard + bench by the pond */
function buildYard(){
  const Y={};const tbl=[25,-2];
  box(tbl[0],0,tbl[1],2.4,.78,1.4,0xa0683c,{tex:TX.planks,nv:true});vis(G.box,0xb87a48,tbl[0],.74,tbl[1],2.5,.08,1.5,0,0,0,.02,TX.planks);for(const a of[-1,1])for(const b of[-1,1])vis(G.box,0x7a4a2a,tbl[0]+a*1.05,.36,tbl[1]+b*.55,.1,.72,.1);
  vis(G.cyl,0xff9a2e,tbl[0]-.4,.86,tbl[1],.12,.1,.12);vis(G.cyl,0xfff1d6,tbl[0]+.5,.82,tbl[1]+.2,.2,.03,.2);vis(G.sph,0xff9a2e,tbl[0]+.5,.88,tbl[1]+.2,.08,.07,.08);
  Y.stools=[[tbl[0],tbl[1]-1.3,0],[tbl[0],tbl[1]+1.3,Math.PI],[tbl[0]-1.55,tbl[1],Math.PI/2],[tbl[0]+1.55,tbl[1],-Math.PI/2]];
  Y.stools.forEach((s,i)=>{const c=[0xff6b6b,0x7fe3e8,0xffd36b,0x8ee08a][i];vis(G.cyl16,c,s[0],.44,s[1],.26,.06,.26);vis(G.cyl,0x7a4a2a,s[0],.2,s[1],.05,.4,.05);cyl(s[0],0,s[1],.28,.46,0,{nv:true})});
  /* swing set */
  const SW=[24,-11];for(const x of[SW[0]-2,SW[0]+2])for(const d of[-1,1])vis(G.cyl,0xc94f3a,x,1.3,SW[1]+d*.55,.07,2.75,.07,d*.22,0,0);vis(G.cyl,0xc94f3a,SW[0],2.62,SW[1],.07,4.1,.07,0,0,Math.PI/2);
  Y.seats=[];for(const ox of[-.8,.8]){const g=new THREE.Group();g.position.set(SW[0]+ox,2.6,SW[1]);L.group.add(g);for(const d of[-.22,.22])mesh(G.cyl,mat(0xd8c8a0),d,-1.05,0,.012,2.1,.012,g);mesh(G.box,mat(0x7fe3e8),0,-2.1,0,.56,.06,.3,g);mergeModel(g);Y.seats.push({g,ox,occ:null,ph:Math.random()*6,amp:.15})}
  inter({x:SW[0],y:.4,z:SW[1],r:2.2,label:'E - покачаться на качелях',act:()=>swingRide(Y.seats[0])});
  /* trampoline */
  const TR=[31,-13];addC({k:'c',x:TR[0],z:TR[1],r:1.7,y0:0,y1:.6,t:'bounce',pow:13});vis(G.cyl16,0x2c2c44,TR[0],.55,TR[1],1.7,.06,1.7);vis(G.tor,0x7fe3e8,TR[0],.58,TR[1],1.75,1.75,.8,Math.PI/2,0,0);for(let i=0;i<6;i++){const a=i/6*TAU;vis(G.cyl,0x9aa2aa,TR[0]+Math.cos(a)*1.6,.28,TR[1]+Math.sin(a)*1.6,.05,.56,.05)}
  Y.tramp=TR;
  /* campfire with log seats */
  const CF=[30,-5.5];for(let i=0;i<5;i++){const a=i/5*TAU;vis(G.dod,0x6a6674,CF[0]+Math.cos(a)*.6,.12,CF[1]+Math.sin(a)*.6,.22,.16,.22,0,i,0,.04,TX.stone)}for(let i=0;i<3;i++)vis(G.cyl,0x6b4628,CF[0],.12,CF[1],.06,.9,.06,Math.PI/2,i*1.05,0,.02,TX.bark);
  const fg=glow(0xff8a3a,3.4,.8);fg.position.set(CF[0],.6,CF[1]);L.group.add(fg);tick((t,dt)=>{fg.scale.setScalar(3+Math.sin(t*9)*.3+Math.sin(t*13)*.2);if(Math.random()<dt*12)FXW.burst(CF[0],.35,CF[1],{col:pick([0xffab4a,0xff6a2a,0xffd36b]),n:1,spd:.3,up:1.8,g:-.6,life:.9,size:.22})});
  Y.logs=[[CF[0]-1.9,CF[1],Math.PI/2],[CF[0]+1.9,CF[1],-Math.PI/2],[CF[0],CF[1]+1.9,Math.PI]];Y.logs.forEach(l=>{vis(G.cyl,0x7a4a2a,l[0],.22,l[1],.22,1.3,.22,Math.PI/2,l[2]+Math.PI/2,0,.02,TX.bark);cyl(l[0],0,l[1],.4,.4,0,{nv:true})});Y.fire=CF;
  /* bench by the pond */
  const BN=[3.3,16.4];vis(G.box,0xa0683c,BN[0],.45,BN[1],.5,.08,1.8,0,0,0,.02,TX.planks);vis(G.box,0xa0683c,BN[0]-.24,.8,BN[1],.06,.5,1.8,0,0,-.15,.02,TX.planks);for(const d of[-.75,.75])vis(G.box,0x6b4628,BN[0],.22,BN[1]+d,.45,.44,.08);box(BN[0],0,BN[1],.5,.48,1.8,0,{nv:true});
  Y.bench=[[BN[0],BN[1]-.45,Math.PI/2],[BN[0],BN[1]+.45,Math.PI/2]];
  /* the ball */
  const ball={x:27,z:-6,y:.3,vx:0,vz:0,vy:0,r:.3};const bm=mesh(G.sphHi,stdMat(0xff6b6b,{roughness:.5}),0,0,0,.3,.3,.3,L.group);mesh(G.tor,stdMat(0xffffff),0,0,0,.3,.3,.3,bm).rotation.x=Math.PI/2;bm.castShadow=true;Y.ball=ball;
  tick((t,dt)=>{const dx=ball.x-P.x,dz=ball.z-P.z,d=Math.hypot(dx,dz);if(d<.75&&P.y<.6){const sp=Math.hypot(P.vx,P.vz)+3;ball.vx=dx/d*sp*1.2;ball.vz=dz/d*sp*1.2;ball.vy=3;AU.sfx('thud')}
    ball.vy-=18*dt;ball.y+=ball.vy*dt;if(ball.y<.3){ball.y=.3;ball.vy=Math.abs(ball.vy)>2?-ball.vy*.45:0}const fr=Math.exp(-(ball.y<=.31?1.6:.3)*dt);ball.vx*=fr;ball.vz*=fr;ball.x+=ball.vx*dt;ball.z+=ball.vz*dt;
    const m={x:ball.x,z:ball.z};mobCollide(m,.3);if(m.x!==ball.x)ball.vx*=-.6;if(m.z!==ball.z)ball.vz*=-.6;ball.x=m.x;ball.z=m.z;if(Math.hypot(ball.x-24,ball.z+4)>14){ball.vx-=(ball.x-24)*.3*dt;ball.vz-=(ball.z+4)*.3*dt}
    bm.position.set(ball.x,ball.y,ball.z);bm.rotation.x+=ball.vz*dt/.3;bm.rotation.z-=ball.vx*dt/.3});
  /* swings sway */
  tick((t,dt)=>{for(const s of Y.seats){if(s.occ==='kapik')continue;s.g.rotation.x=.06*Math.sin(t*2.1+s.ph)}});
  return Y}
/* interactive swing: pump to build momentum, enough of it and Kapik goes all the way round */
const SWG={seat:null,th:0,w:0,loops:0,lx:0,ly:0,pump:false};
function swingRide(seat){if(P.carry)dropCarry();SWG.seat=seat;SWG.th=.15;SWG.w=0;SWG.loops=0;SWG.lx=SWG.ly=0;seat.occ='kapik';setMode('swing');$('#swingUI').hidden=false;AU.sfx('ui')}
function swingUpdate(dt,mx,my){const s=SWG.seat;if(!s)return;const pump=keys.Space||keys.KeyW||keys.ArrowUp||SWG.pump;
  const acc=-(9.8/2.1)*Math.sin(SWG.th)-.22*SWG.w+(pump?2.7*(SWG.w>=0?1:-1):0);SWG.w+=acc*dt;SWG.w=clamp(SWG.w,-9,9);SWG.th+=SWG.w*dt;
  if(SWG.th>Math.PI||SWG.th<-Math.PI){SWG.th+=SWG.th>0?-TAU:TAU;SWG.loops++;AU.sfx('djump');banner('Сальто!',SWG.loops>1?`Уже ${SWG.loops} раза подряд!`:'Полный оборот на качелях','');if(!S.got.swingFlip){S.got.swingFlip=1;save();setTimeout(()=>{addCoins(10);toast('Первое сальто на качелях: +10 монет')},500)}}
  const th=SWG.th,g=s.g;g.rotation.x=th;SWG.lx=clamp(SWG.lx-mx*.002,-1.2,1.2);SWG.ly=clamp(SWG.ly-my*.002,-.6,.6);
  camera.position.set(g.position.x,g.position.y-Math.cos(th)*1.18,g.position.z-Math.sin(th)*1.18);camera.rotation.set(th+SWG.ly,SWG.lx,0);
  if(Math.abs(SWG.w)>3&&Math.random()<dt*3)AU.sfx('step')}
function swingExit(){const s=SWG.seat;if(!s)return;s.occ=null;SWG.seat=null;S.swingT=Date.now();save();$('#swingUI').hidden=true;P.x=s.g.position.x;P.z=s.g.position.z+1.5;P.y=0;P.vx=P.vy=P.vz=0;P.yaw=0;P.pitch=0;P.camY=EYE;setMode('play');lock();if(SWG.loops)toast(`Сальто за заезд: ${SWG.loops}`);else toast('Ух! Дух захватывает')}


/* brothers: each one has a little daily routine */
function buildBrothers(Y,D){if(qs('c3')>0&&qs('c3')<99)return;reqTick();buildReqItems();
  const st=Y.stools,lg=Y.logs,bn=Y.bench;
  const R={
    yuzik:[[st[0][0],st[0][1],'sit',.36,st[0][2],9],[27,-5,null,0,null,0],[0,0,'ball',0,null,14],[st[2][0],st[2][1],'sit',.36,st[2][2],7],[0,0,'ball',0,null,12]],
    snezhok:D.onsen?[[bn[0][0],bn[0][1],'sit',.36,bn[0][2],10],[8,6,null],[17.5,17,'sit',.1,-2.5,14],[8,6,null]]:[[bn[0][0],bn[0][1],'sit',.36,bn[0][2],10],[7,7,null],[17,5,null],[23,4.6,null],[lg[2][0],lg[2][1],'sit',.3,lg[2][2],12],[23,4.6,null],[17,5,null],[7,7,null]],
    gribok:D.hammock?[[-21,11.75,'lie',.66,Math.PI,22],[-12,14,null],[bn[1][0],bn[1][1],'sit',.36,bn[1][2],10],[-12,14,null]]:[[-6,11,'lie',0,.5,18],[bn[1][0],bn[1][1],'sit',.36,bn[1][2],10]],
    vintik:[[4.5,-8.5,'hammer',0,-.6,10],[9,-10,null],[22,-10.5,null],[Y.tramp[0],Y.tramp[1],'jump',0,0,8],[st[1][0],st[1][1],'sit',.36,st[1][2],8],[22,-10.5,null],[9,-10,null]]};
  const bros=[];
  for(const k of['yuzik','snezhok','gribok','vintik']){const pid={yuzik:'p1',snezhok:'p2',gribok:'p3',vintik:'p4'}[k];if(!S.rescued[pid])continue;const route=R[k];const p0=route[0];
    const n=npc(k,p0[0],0,p0[1],{yaw:p0[4]||0,nc:true,r:2.4,talk:nn=>openBro(nn),mark:()=>{const q=reqOf(k);if(q&&reqReady(k,q))return'?';if(q)return'!';return broData(k).h>=5&&!broData(k).gift?'?':null}});
    n.route=route;n.ri=0;n.state='stay';n.wait=(p0[5]||6)*Math.random();n.pose=p0[2]||'idle';n.yOff=p0[3]||0;n.c.root.position.y=n.yOff;bros.push(n)}
  L.bros=bros;
  tick((t,dt)=>{for(const n of bros){if(n.game)continue;const c=n.c;
    if(n.state==='stay'){n.wait-=dt;const sp=n.route[n.ri];
      if(sp[2]==='jump'){const h=Math.abs(Math.sin(t*3.2+n.c.t0))*1.4;c.root.position.y=.55+h;n.pose=h>.3?'cheer':'idle'}
      if(sp[2]==='ball'){const b=Y.ball,dx=b.x-n.x,dz=b.z-n.z,d=Math.hypot(dx,dz);if(d>.7){const s=Math.min(d,3.4*dt);n.x+=dx/d*s;n.z+=dz/d*s;turnTo(n,Math.atan2(dx,dz),dt);c.walkPh+=dt*16;n.pose='walk'}else{const a=Math.random()*TAU;b.vx=Math.cos(a)*7;b.vz=Math.sin(a)*7;b.vy=4;AU.sfx('thud');n.pose='cheer'}}
      if(n.wait<=0){n.ri=(n.ri+1)%n.route.length;n.state='move';n.yOff=0;c.root.position.y=0;n.pose='walk'}}
    else{const tg=n.route[n.ri];if(tg[2]==='ball'){n.state='stay';n.wait=tg[5]||10;continue}const dx=tg[0]-n.x,dz=tg[1]-n.z,d=Math.hypot(dx,dz);
      if(d<.12){if(tg[2]){n.state='stay';n.wait=tg[5]||8;n.pose=tg[2];n.yOff=tg[3]||0;c.root.position.y=n.yOff;if(tg[4]!=null)c.root.rotation.y=tg[4]}else{n.ri=(n.ri+1)%n.route.length}}
      else{const s=Math.min(d,1.6*dt);n.x+=dx/d*s;n.z+=dz/d*s;turnTo(n,Math.atan2(dx,dz),dt);c.walkPh+=dt*8;n.pose='walk'}}
    c.root.position.x=n.x;c.root.position.z=n.z;if(n.it){n.it.x=n.x;n.it.z=n.z}}})}
function turnTo(n,ya,dt){const c=n.c;let df=ya-c.root.rotation.y;df=Math.atan2(Math.sin(df),Math.cos(df));c.root.rotation.y+=df*Math.min(1,dt*7)}

/* interaction sheet */
let broCur=null;
function openBro(n){broCur=n;const k=n.key,b=broData(k);openScreen('#bro');$('#broPic').src=portrait(k);$('#broName').textContent=CAST[k].name;renderBro()}
function renderBro(){const n=broCur,k=n.key,b=broData(k);renderReq(k);const h=Math.floor(b.h),half=b.h-h>=.5;
  $('#broHearts').innerHTML=Array.from({length:5},(_,i)=>`<span class="heart ${i<h?'on':i===h&&half?'half':''}"></span>`).join('');
  const food=FOOD.find(f=>S.inv[f]>0);
  $('#broMood').textContent=b.h>=5?(b.gift?'Лучшие друзья навсегда!':'Кажется, у брата есть для тебя подарок'):['Немного скучает.','Рад тебя видеть.','Улыбается.','Весело машет лапой.','Сияет от счастья.'][Math.min(4,h)];
  $('#broFeed').disabled=!food;$('#broFeed').textContent=food?`Угостить: ${RES[food].one}`:'Угостить (нужна еда в сумке)';
  $('#broGift').hidden=!(b.h>=5&&!b.gift)}
$('#broTalk').addEventListener('click',()=>{const n=broCur;closeScreen();talk(n,[[n.key,pick(BRO_LINES[n.key])]])});
$('#broFeed').addEventListener('click',()=>{const n=broCur,b=broData(n.key),f=FOOD.find(x=>S.inv[x]>0);if(!f)return;takeRes(f,1);b.h=Math.min(5,b.h+1);save();AU.sfx('pickup');hearts(n);toast(`${CAST[n.key].name}: ${pick(['Ням!','Вкуснотища!','Ещё хочу!','Спасибо, братик!'])}`);renderBro()});
$('#broPet').addEventListener('click',()=>{const n=broCur,b=broData(n.key);if(!n.petted){n.petted=1;b.h=Math.min(5,b.h+.5);save()}AU.sfx('ok');hearts(n);toast(`${CAST[n.key].name}: ${pick(['Кур-р-р...','Хи-хи, щекотно!','Ещё за ушком!'])}`);renderBro()});
$('#broPlay').addEventListener('click',()=>{const n=broCur;closeScreen();startTag(n)});
$('#broGift').addEventListener('click',()=>{const n=broCur,b=broData(n.key),g=BRO_GIFT[n.key];b.gift=1;if(S.hats[g.hat]){addCoins(15);banner('Подарок',CAST[n.key].name,'Копилка брата: +15 монет')}else{S.hats[g.hat]=1;banner('Подарок',g.txt,'Надеть можно в меню, вкладка «Капик»')}save();AU.sfx('quest');renderBro()});
const BRO_LINES={yuzik:['Сыграем в мяч? Я быстрее!','За столом мандарины. Я не все съел. Почти.','Капик, ты лучший старший брат.'],snezhok:['У пруда так спокойно... и не холодно.','Апчхи! Это от радости, честно.','Костёр почти как горячий источник. Почти.'],
  gribok:['Мм... ещё пять минуток...','Качели убаюкивают лучше всего.','Мне снилось, что я гриб. Хороший сон.'],vintik:['Батут пружинит на 12 процентов слабее. Подкручу!','Тарелке нужна новая лестница? Ой, уже есть.','Я придумал мандариновый двигатель. Пока не работает.']};
function hearts(n){const p=n.c.root.position;for(let i=0;i<3;i++)setTimeout(()=>FXW.burst(p.x,p.y+n.c.h+.2,p.z,{col:0xff6b9a,n:6,spd:1.2,up:2,g:-.5,life:1,size:.35}),i*150)}
/* catch game */
function startTag(n){const c=n.c;n.game=true;n.pose='walk';n.tl=20;AU.sfx('ok');toast(`Догонялки! Поймай ${CAST[n.key].name.replace('Юзик','Юзика').replace('Снежок','Снежка').replace('Грибок','Грибка').replace('Винтик','Винтика')} за 20 секунд`);$('#timer').hidden=false;c.root.position.y=0;
  const fn=(t,dt)=>{if(!n.game)return;n.tl-=dt;const tl=n.tl;let dx=n.x-P.x,dz=n.z-P.z;const d=Math.hypot(dx,dz)||1;dx/=d;dz/=d;const wob=Math.sin(t*1.7+c.t0)*.8;const ax=dx*Math.cos(wob)-dz*Math.sin(wob),az=dx*Math.sin(wob)+dz*Math.cos(wob);
    const sp=d<6?5.1:2.6;const m={x:n.x+ax*sp*dt,z:n.z+az*sp*dt};mobCollide(m,.4);const r=Math.hypot(m.x-8,m.z-2);if(r>26){m.x-=(m.x-8)/r*(r-26);m.z-=(m.z-2)/r*(r-26)}n.x=m.x;n.z=m.z;turnTo(n,Math.atan2(ax,az),dt);c.walkPh+=dt*16;c.root.position.set(n.x,Math.abs(Math.sin(t*9))*.12,n.z);if(n.it){n.it.x=n.x;n.it.z=n.z}
    $('#timer').innerHTML=`<small>Догонялки</small>${tl.toFixed(1)}`;
    if(d<1.4){end(true)}else if(tl<=0)end(false)};
  const end=win=>{n.game=false;$('#timer').hidden=true;const b=broData(n.key);n.state='move';if(win){b.h=Math.min(5,b.h+1);save();const rq=reqOf(n.key);if(rq&&rq.t==='tag')setTimeout(()=>reqDone(n.key),600);hearts(n);AU.sfx('quest');toast(`Поймал! ${CAST[n.key].name} хохочет. +1 сердечко`)}else{AU.sfx('bad');toast(`${CAST[n.key].name}: Не догонишь! Давай ещё раз?`)}};
  n.tagEnd=end;if(!n.tagOn){n.tagOn=1;tick((t,dt)=>n.tagFn&&n.tagFn(t,dt))}n.tagFn=fn}

/* ---------- brothers' requests: they ask, Kapik helps ---------- */
const REQS={
  yuzik:[{t:'bring',k:'mandarin',n:3,txt:'Капик, я голодный, как чёрная дыра! Принеси 3 мандарина?'},{t:'tag',txt:'Скучно! Сыграем в догонялки? Спорим, не поймаешь!'},{t:'bring',k:'banana',n:2,txt:'Я слышал, на Банании растут бананы. Принесёшь парочку?'},{t:'bring',k:'icecream',n:1,txt:'Хочу банановый пломбир! Его делают в мороженице на Банании.'}],
  snezhok:[{t:'find',id:'scarf',pos:[-10,8.25,20],txt:'Ветер унёс мой шарф! Кажется, он зацепился за радиовышку Крота.'},{t:'bring',k:'smoked',n:1,txt:'Соскучился по Ледоре... Привезёшь копчёную рыбку из коптильни?'},{t:'scope',id:'whale',txt:'Говорят, вокруг звезды плавает космический кит! Найди его в телескоп.'},{t:'bring',k:'berry',n:4,txt:'Хочу морс из звёздных ягод. Нужно 4 ягоды.'}],
  gribok:[{t:'find',id:'nightcap',pos:[18.6,3,0],txt:'Я потерял ночной колпак... Кажется, оставил на сеновале в амбаре.'},{t:'bring',k:'pillow',n:1,txt:'Мм... Вот бы пуховую подушку с Одуванчии. Самую мягкую.'},{t:'swing',txt:'Покачайся на качелях, а я посмотрю. Это убаюкивает.'},{t:'bring',k:'shroom',n:2,txt:'Скучаю по светогрибам. Принеси 2, я поставлю их у гамака.'}],
  vintik:[{t:'bring',k:'scrap',n:3,txt:'Чиню батут. Нужно 3 железки с Шестерёнки.'},{t:'find',id:'wrench',pos:[-14.4,3.45,-8.5],txt:'Мой гаечный ключ! Я оставил его на крыше лавки Тётушки Выдры.'},{t:'bring',k:'cog',n:1,txt:'Для мандаринового двигателя нужна шестерня из плавильни.'},{t:'tag',txt:'Проверим мои новые ботинки! Догони меня!'}]};
const REQ_ITEM={scarf:{name:'Шарф Снежка',col:0x7fe3e8},nightcap:{name:'Ночной колпак Грибка',col:0xb28cff},wrench:{name:'Ключ Винтика',col:0x9aa6ad}};
function reqState(k){S.req=S.req||{};return S.req[k]||(S.req[k]={i:-1,on:false,cd:0})}
function reqOf(k){const r=reqState(k);return r.on?REQS[k][r.i]:null}
function reqReady(k,q){const r=reqState(k);if(q.t==='bring')return(S.inv[q.k]||0)>=q.n;if(q.t==='find')return!!r.found;if(q.t==='scope')return!!(S.scopeLog&&S.scopeLog[q.id]>r.t0);if(q.t==='swing')return!!(S.swingT&&S.swingT>r.t0);return false}
function reqTick(){for(const k of Object.keys(REQS)){const pid={yuzik:'p1',snezhok:'p2',gribok:'p3',vintik:'p4'}[k];if(!S.rescued[pid])continue;const r=reqState(k);if(!r.on&&Date.now()>r.cd){let i=(r.i+1)%REQS[k].length;if(REQS[k][i].t==='scope'&&!S.decor.telescope)i=(i+1)%REQS[k].length;r.i=i;r.on=true;r.found=false;r.t0=Date.now();save()}}}
function reqDone(k){const r=reqState(k),q=REQS[k][r.i];if(!r.on)return;if(q.t==='bring'&&!takeRes(q.k,q.n))return;r.on=false;r.cd=Date.now()+75000;const b=broData(k);b.h=Math.min(5,b.h+1);const rw=q.t==='bring'?6+q.n*2:8;addCoins(rw);save();AU.sfx('quest');
  banner('Просьба выполнена',CAST[k].name+' счастлив','+1 сердечко и '+coinsWord(rw));const n=(L.bros||[]).find(x=>x.key===k);if(n)hearts(n);if(curScreen==='#bro')renderBro()}
function renderReq(k){const q=reqOf(k),el=$('#broReq');if(!q){el.hidden=true;return}el.hidden=false;const ready=reqReady(k,q);
  let st='';if(q.t==='bring')st=`В сумке: ${S.inv[q.k]||0} из ${q.n} · ${RES[q.k].name.toLowerCase()}`;else if(q.t==='find')st=reqState(k).found?'Находка у тебя!':'Найди и принеси';else if(q.t==='tag')st='Нажми «Догонялки» и поймай брата';else if(q.t==='scope')st=ready?'Нашёл! Расскажи брату':'Телескоп стоит у тарелки';else if(q.t==='swing')st=ready?'Покачался! Расскажи брату':'Качели во дворе у костра';
  $('#broReqTxt').textContent='«'+q.txt+'»';$('#broReqSt').textContent=st;const bt=$('#broReqDo');bt.hidden=!(ready&&q.t!=='tag');bt.textContent=q.t==='bring'?`Отдать: ${q.n} ${RES[q.k].one}`:q.t==='find'?'Отдать находку':'Рассказать'}
$('#broReqDo').addEventListener('click',()=>{if(broCur)reqDone(broCur.key)});
function buildReqItems(){for(const k of Object.keys(REQS)){const q=reqOf(k),r=reqState(k);if(!q||q.t!=='find'||r.found)continue;const it=REQ_ITEM[q.id];const g=new THREE.Group();mesh(G.tor,mat(it.col),0,.2,0,.18,.18,.25,g);mesh(G.sph,mat(it.col),0,.2,0,.1,.1,.1,g);g.add(glow(it.col,1.6,.6));
  const pk=itemPick('req_'+q.id+'_'+r.t0,q.pos[0],q.pos[1],q.pos[2],g,null,()=>{r.found=true;save();toast(`Найдено: ${it.name}. Отнеси брату`);AU.sfx('item')})}}

{const b=$('#swPump');const on=e=>{e.preventDefault();SWG.pump=true},off=()=>{SWG.pump=false};b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointerleave',off);b.addEventListener('pointercancel',off);$('#swOff').addEventListener('click',()=>swingExit())}
