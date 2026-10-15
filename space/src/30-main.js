/* ---------- MAIN: input, modes, travel, loop ---------- */
const keys={};let ePressed=false,eJust=false,jumpReq=false,throwReq=false,boostHeld=false;
let locked=false,noLock=isTouch||!('requestPointerLock' in cv),lockFails=0,drag=null,MX=0,MY=0;
const BUILD={base:buildBase,p1:buildP1,p2:buildP2,p3:buildP3,p4:buildP4,p5:buildP5,p6:buildP6,p7:buildP7,p8:buildP8};
let lockClick=false;
function lockFailed(){if(lockClick){lockFails++;if(lockFails>=2&&!noLock){noLock=true;toast('Зажмите левую кнопку мыши и тяните, чтобы смотреть')}}lockClick=false}
function lock(fromClick){if(isTouch||noLock||locked||(mode!=='play'&&mode!=='space'))return;lockClick=!!fromClick;try{const p=cv.requestPointerLock();if(p&&p.catch)p.catch(lockFailed)}catch(e){lockFailed()}}
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===cv;if(locked){lockFails=0;lockClick=false}else if((mode==='play'||mode==='space')&&!noLock)openMenu()});
document.addEventListener('pointerlockerror',lockFailed);
function setMode(m){mode=m;const play=m==='play',space=m==='space',act=play||space;
  $('#touch').hidden=!(isTouch&&act);$('#lookpad').hidden=!(isTouch&&act);
  $('#hud').hidden=!(act||m==='dialog'||(m==='menu'&&screenRet!=='title')||m==='fade');$('#title').hidden=m!=='title';$('#cross').hidden=!play;$('#shud').hidden=!(space||(m==='menu'&&screenRet==='space'));$('#labels').hidden=!space;
  $('#tJump').hidden=!play;$('#tMap').hidden=!act;$('#tAlt').hidden=!(space||(play&&L&&canShoot()));$('#tAlt').textContent=space?'Форсаж':gunOn()?'Пиу!':'Бросок';
  $('#shudHint').innerHTML=isTouch?'Карта - кнопка справа':`${KC('M')} карта · ${KC('V')} камера · ${KC('Shift')} форсаж`;
  if(!act){showPrompt(null);joy.x=joy.y=0;joy.id=null;$('#knob').style.transform='';look.id=null;boostHeld=false;$('#marker').hidden=true}
  if(m==='space'||m==='play')$('#carryTag').hidden=!P.carry||space;
  if((m==='menu'||m==='title'||m==='prologue'||m==='ending')&&document.pointerLockElement)document.exitPointerLock()}
window.addEventListener('keydown',e=>{
  if(mode==='dialog'){if((e.code==='KeyE'||e.code==='Space'||e.code==='Enter')&&!e.repeat){e.preventDefault();advance()}return}
  if(mode==='swing'){if((e.code==='KeyE'||e.code==='Escape')&&!e.repeat)swingExit();else keys[e.code]=true;e.preventDefault();return}
  if(mode==='scope'){if(e.code==='Escape'||e.code==='KeyE'||e.code==='KeyQ')SPX.scopeEnd();else if(e.code==='KeyA'||e.code==='ArrowLeft')SPX.scopeNext(-1);else if(e.code==='KeyD'||e.code==='ArrowRight'||e.code==='Space')SPX.scopeNext(1);e.preventDefault();return}
  if(mode==='menu'){if(e.code==='Escape'||(e.code==='KeyM'&&curScreen==='#map')||(e.code==='KeyJ'&&curScreen==='#menu')||(e.code==='KeyF'&&curScreen==='#bag')){closeScreen()}else if(curScreen==='#fish'&&(e.code==='KeyE'||e.code==='Space')&&!e.repeat){e.preventDefault();fishHook()}else if(curScreen==='#arcade'&&(e.code==='KeyE'||e.code==='Space'||e.code==='ArrowUp'||e.code==='KeyW')&&!e.repeat){e.preventDefault();arcadeFlap()}return}
  if(mode!=='play'&&mode!=='space')return;
  keys[e.code]=true;if(e.code==='Space'||e.code.indexOf('Arrow')===0)e.preventDefault();
  if(e.repeat)return;
  if(e.code==='KeyE'){ePressed=true;eJust=true}
  if(e.code==='Space'&&mode==='play')jumpReq=true;
  if(e.code==='KeyQ'&&mode==='play')dropCarry();
  if(e.code==='KeyJ')openMenu('quests');
  if(e.code==='KeyF')openBag();
  if(e.code==='KeyG'&&mode==='play'&&S.got.blaster){S.gunOff=!S.gunOff;save();AU.sfx('ui');toast(S.gunOff?'Бананомёт убран':'Бананомёт в лапах');setMode('play')}
  if(e.code==='KeyM')SPX.openMap();
  if(e.code==='KeyV'&&mode==='space')SPX.setCam();
  if((e.code==='KeyW'||e.code==='KeyS')&&mode==='space')SPX.stopAuto();
  if(e.code==='Escape'&&noLock)openMenu();
});
window.addEventListener('keyup',e=>{keys[e.code]=false;if(e.code==='KeyE')ePressed=false});
window.addEventListener('blur',()=>{for(const k in keys)keys[k]=false;ePressed=false});
cv.addEventListener('mousedown',e=>{if(isTouch)return;if(mode==='dialog'){advance();return}if(mode!=='play'&&mode!=='space')return;
  if(!locked&&!noLock){lock(true);return}if(locked&&e.button===0&&mode==='play'&&L&&canShoot())throwReq=true;if(noLock){drag={x:e.clientX,y:e.clientY};if(e.button===0&&mode==='play'&&L&&canShoot())throwReq=true}});
window.addEventListener('mouseup',()=>{drag=null});
window.addEventListener('mousemove',e=>{if(mode!=='play'&&mode!=='space')return;if(locked){MX+=e.movementX;MY+=e.movementY}else if(drag){MX+=(e.clientX-drag.x)*1.6;MY+=(e.clientY-drag.y)*1.6;drag.x=e.clientX;drag.y=e.clientY}});
/* touch */
const joy={x:0,y:0,id:null,cx:0,cy:0},look={id:null,x:0,y:0};const joyEl=$('#joy'),knob=$('#knob');
function moveJoy(t){let dx=t.clientX-joy.cx,dy=t.clientY-joy.cy;const m=50,d=Math.hypot(dx,dy);if(d>m){dx*=m/d;dy*=m/d}joy.x=dx/m;joy.y=dy/m;knob.style.transform=`translate(${dx}px,${dy}px)`}
joyEl.addEventListener('touchstart',e=>{e.preventDefault();const t=e.changedTouches[0];joy.id=t.identifier;const r=joyEl.getBoundingClientRect();joy.cx=r.left+r.width/2;joy.cy=r.top+r.height/2;moveJoy(t)},{passive:false});
$('#lookpad').addEventListener('touchstart',e=>{e.preventDefault();const t=e.changedTouches[0];look.id=t.identifier;look.x=t.clientX;look.y=t.clientY},{passive:false});
window.addEventListener('touchmove',e=>{let used=false;for(const t of e.changedTouches){if(t.identifier===joy.id){moveJoy(t);used=true}if(t.identifier===look.id){MX+=(t.clientX-look.x)*2.6;MY+=(t.clientY-look.y)*2.6;look.x=t.clientX;look.y=t.clientY;used=true}}if(used)e.preventDefault()},{passive:false});
function endT(e){for(const t of e.changedTouches){if(t.identifier===joy.id){joy.id=null;joy.x=joy.y=0;knob.style.transform=''}if(t.identifier===look.id)look.id=null}}
window.addEventListener('touchend',endT);window.addEventListener('touchcancel',endT);
const tbtn=(id,down,up)=>{const b=$(id);b.addEventListener('touchstart',e=>{e.preventDefault();e.stopPropagation();down()},{passive:false});b.addEventListener('touchend',e=>{e.preventDefault();if(up)up()},{passive:false});b.addEventListener('click',e=>{if(!isTouch){down();if(up)setTimeout(up,120)}})};
tbtn('#tE',()=>{ePressed=true;eJust=true},()=>{ePressed=false});
tbtn('#tJump',()=>{jumpReq=true;keys.Space=true},()=>{keys.Space=false});
tbtn('#tAlt',()=>{if(mode==='space')boostHeld=true;else throwReq=true},()=>{boostHeld=false});
tbtn('#tMap',()=>{if(mode==='space'||mode==='play')SPX.openMap()});
$('#bPause').addEventListener('click',e=>{e.stopPropagation();if(mode==='play'||mode==='space')openMenu()});
$('#bJournal').addEventListener('click',e=>{e.stopPropagation();if(mode==='play'||mode==='space')openMenu('quests')});
$('#bagPill').addEventListener('click',e=>{e.stopPropagation();if(mode==='play'||mode==='space')openBag()});
window.addEventListener('pointerdown',e=>{if(mode==='dialog'&&isTouch&&!e.target.closest('#dlg')){advance()}});

/* ---------- INTERACTION ---------- */
let target=null,holdT=0,holdLatch=false;
function updInteract(dt){let best=null,bd=1e9;
  for(const it of L.inters){if(it.cond&&!it.cond())continue;const d=Math.hypot(P.x-it.x,P.z-it.z),dy=(P.y+.9)-(it.y||0);if(d<it.r&&Math.abs(dy)<2.3&&d<bd){bd=d;best=it}}
  if(best!==target){target=best;holdT=0}
  if(!target){if(eJust&&P.carry&&isTouch)dropCarry();showPrompt(isTouch&&P.carry?'E - бросить предмет':null);return}
  const hold=typeof target.hold==='function'?target.hold():target.hold,lab=typeof target.label==='function'?target.label():target.label;
  if(!ePressed){holdLatch=false;holdT=0}
  if(hold>0){if(ePressed&&!holdLatch){holdT+=dt;if(holdT>=hold){holdLatch=true;holdT=0;target.act()}}}else if(eJust){holdLatch=true;target.act()}
  if(mode==='play')showPrompt(lab,hold>0?holdT/hold:0)}

/* ---------- TRAVEL ---------- */
function fadeTo(text,mid,after){setMode('fade');AU.sfx('warp');$('#fadeText').textContent=text;$('#fade').classList.add('on');setTimeout(()=>{mid();setTimeout(()=>{$('#fade').classList.remove('on');if(after)after()},380)},650)}
function placePlayer(){P.x=L.spawn.x;P.y=L.spawn.y||0;P.z=L.spawn.z;P.yaw=L.spawn.yaw;P.pitch=0;P.vx=P.vy=P.vz=0;P.camY=P.y+EYE;P.sup=null;P.ground=true;L.checkpoint=null}
function build(id){$('#heat').hidden=true;$('#bossBar').hidden=true;BUILD[id]();placePlayer();UI.refresh();target=null;precompile()}
/* compile every shader of the new level up front, so nothing stutters the first time it comes into view */
function precompile(){try{camera.updateMatrixWorld();renderer.compile(wscene,camera)}catch(e){}}
function rebuildHere(){const s={x:P.x,y:P.y,z:P.z,yaw:P.yaw,pitch:P.pitch};$('#heat').hidden=true;$('#bossBar').hidden=true;BUILD[L.id]();Object.assign(P,s);P.vx=P.vy=P.vz=0;P.camY=P.y+EYE;UI.refresh();target=null;precompile()}
function takeoff(){if(P.carry)dropCarry();const from=L.id;fadeTo('Взлёт',()=>{S.at=from;save();camera.far=3200;camera.updateProjectionMatrix();SPX.enter(from);setMode('space')},()=>{lock();if(!S.seen.space){S.seen.space=1;save();say([['kapik','Открытый космос! Дедушкина кабина, все кнопки на месте. Работают из них, правда, только руль и газ.'],['kapik',isTouch?'Кнопка «Карта» покажет все планеты. У планеты удерживаю E для посадки.':'Клавиша M покажет звёздную карту. У планеты удерживаю E для посадки.']])}})}
function landOn(id){fadeTo('Посадка: '+PL[id].name,()=>{SPX.exit();camera.far=1200;camera.updateProjectionMatrix();build(id);S.at=id;save();setMode('play')},()=>{lock();afterArrive(id)})}
function toTitle(){save();if(screenRet==='space'||mode==='space')SPX.exit();camera.far=3200;camera.updateProjectionMatrix();$('#dlg').hidden=true;$('#timer').hidden=true;AU.engine(false);showTitle()}
function afterArrive(id){
  if(id==='base'&&nRescued()===4&&!S.ending){say([['yuzik','Мы дома!'],['snezhok','И тут тепло.'],['gribok','Можно я теперь посплю? Долго-долго.'],['vintik','А я разберу тарелку и сделаю её быстрее!'],['kapik','Сначала пруд. Все вместе. Как раньше.']],()=>{S.ending=true;save();showEnding()});return}
  if(S.ending&&!qs('c2'))setTimeout(()=>{if(!qs('c2'))qset('c2',1)},1500);
  if(qdone('c3')&&!qs('c4'))setTimeout(()=>{if(qs('c4'))return;qset('c4',1);say([['mole','Капик! Срочно! Звёзды над Пастбищем гаснут одна за другой! Поднимись ко мне на вышку!']])},1600);
  if(qdone('c2')&&!qs('c3'))setTimeout(()=>{if(qs('c3'))return;qset('c3',1);say([['mole','Капик! Это Крот, по радио! Срочно лети на базу! Тут всё в саже, а братьев нигде нет!']])},1500);
  if(!S.seen[id]&&L.arrive){S.seen[id]=1;save();say(L.arrive)}else if(!S.seen[id]){S.seen[id]=1;save()}}
function showEnding(ch){ch=ch||1;setMode('ending');const E={
    1:{who:['kapik','yuzik','snezhok','gribok','vintik'],t:'Все дома<span>Конец первой главы</span>',x:'Капик вернул всех четырёх братьев. Пруд снова тёплый, мандарины снова сладкие. Но Радист Крот уже ловит странный сигнал...',ok:'Дальше: глава 2'},
    2:{who:['kapik','pushinka','yuzik','snezhok','gribok','vintik'],t:'Пух здоров<span>Конец второй главы</span>',x:'Великий Пух больше не чихает ураганами, а завод Шестерёнки дымит чистым паром. Белки-летяги научили Капика планировать.',ok:'Дальше: глава 3',rw:'+50 монет и покраска тарелки «Пушистая»'},
    4:{who:['kapik','tenek','yuzik','snezhok','gribok','vintik','dedushka'],t:'Конец<span>Капик в космосе</span>',x:'Тень Космического Чиха больше не одинока, и галактика больше не чихает. Пятеро братьев и маленький Тенёк сидят у тёплого пруда и смотрят, как снова зажигаются звёзды. Идея и геймдизайн: Сергей. Собрано вместе с Claude.',ok:'Остаться на Пастбище',rw:'+100 монет и Тенёк теперь живёт на базе'},
    3:{who:['kapik','rogozhar','yuzik','snezhok','gribok','vintik'],t:'Король уснул<span>Конец третьей главы</span>',x:'Банановый пломбир остудил Рогожара, и он впервые за триста лет сладко уснул. Братья снова дома, а Бананомёт остался у Капика.',ok:'Дальше: финальная глава',rw:'+60 монет и корона короля Магмары'}}[ch];
  $('#endArt').innerHTML=E.who.map((k,i)=>`<img alt="" class="${i?'':'big'}" src="${portrait(k)}">`).join('');$('#endTitle').innerHTML=E.t;$('#endText').textContent=E.x;
  $('#endReward').hidden=!E.rw;if(E.rw)$('#endReward').innerHTML='<span class="coin"></span>'+E.rw;if(ch===2&&!S.paints.fluffy){S.paints.fluffy=1;save()}if(ch===3&&!S.hats.crown){S.hats.crown=1;save()}
  S.lastEnd=ch;$('#endOk').textContent=E.ok;$('#end').hidden=false;AU.sfx('quest')}
$('#scPrev').addEventListener('click',()=>SPX.scopeNext(-1));$('#scNext').addEventListener('click',()=>SPX.scopeNext(1));$('#scExit').addEventListener('click',()=>SPX.scopeEnd());
$('#endOk').addEventListener('click',()=>{$('#end').hidden=true;if(S.lastEnd===4&&L&&L.id!=='base'){S.lastEnd=0;fadeTo('Пастбище',()=>{build('base');S.at='base';save();setMode('play')},()=>{lock();say([['tenek','Так вот какое оно, Пастбище... Тут тепло. Можно я буду ходить за тобой?'],['kapik','Конечно. Добро пожаловать домой, Тенёк.']])});return}setMode('play');lock();if(!qs('c2'))setTimeout(()=>{qset('c2',1);say([['kapik','Ой. Радист Крот машет мне с вышки. Похоже, что-то случилось.']])},700);else if(qdone('c3')&&!qs('c4'))setTimeout(()=>{if(qs('c4'))return;qset('c4',1);say([['mole','Капик! Срочно! Звёзды над Пастбищем гаснут одна за другой! Поднимись ко мне на вышку!']])},900);else if(qdone('c2')&&!qs('c3'))setTimeout(()=>{if(qs('c3'))return;qset('c3',1);say([['mole','Капик! Это Крот, по радио! Срочно лети на базу! Тут всё в саже, а братьев нигде нет!']])},900)});

/* ---------- TITLE & PROLOGUE ---------- */
const SLIDES=[
  {art:()=>`<div class="art"><img class="big" alt="" src="${portrait('kapik')}"></div>`,text:'Далеко-далеко, на тёплом астероиде Пастбище, жил Капик. Самый старший и самый спокойный капибара во всей галактике.'},
  {art:()=>`<div class="art">${['yuzik','snezhok','gribok','vintik'].map(k=>`<img alt="" src="${portrait(k)}">`).join('')}</div>`,text:'У Капика четыре младших брата: сладкоежка Юзик, мерзляка Снежок, соня Грибок и умелец Винтик. По воскресеньям они вместе отмокали в тёплом пруду.'},
  {art:()=>`<div class="vortex"><span></span><span></span><span></span>${['yuzik','snezhok','gribok','vintik'].map((k,i)=>`<img alt="" src="${portrait(k)}" style="animation-delay:${-i*1.25}s">`).join('')}</div>`,text:'Однажды над прудом раскрылся Космический Чих, огромный вихрь из звёздной пыли. Он подхватил малышей и разбросал их по четырём далёким планетам.'},
  {art:()=>`<div class="art"><img class="big" alt="" src="${portrait('kapik')}"><img alt="" src="${portrait('otter')}"></div>`,text:'В старом сарае стояла дедушкина летающая тарелка. Капик стёр с неё пыль и сказал: «Я старший. Я верну каждого».'},
  {art:()=>`<div class="art"><img class="big" alt="" src="${portrait('otter')}"></div>`,text:'Инопланетяне не говорят по-капибарьи. Тётушка Выдра продаёт универсальный переводчик за 10 монет. А монеты в галактике зарабатывают честно: собирают, ловят, мастерят и продают.'}
];
let slide=0;
function showTitle(){setMode('title');$('#title').hidden=false;$('#tConfirm').hidden=true;const sv=loadSave(),has=!!(sv&&sv.prologue);$('#bPlay').textContent=has?'Продолжить':'Играть';$('#bNew').hidden=!has;AU.music('title')}
function showSlide(){const s=SLIDES[slide];$('#proArt').innerHTML=s.art();$('#proText').textContent=s.text;$('#proStep').textContent=`${slide+1} / ${SLIDES.length}`;$('#proNext').textContent=slide===SLIDES.length-1?'Начать':'Дальше'}
function endPrologue(){S.prologue=true;save();$('#pro').hidden=true;fadeTo('Пастбище',()=>{camera.far=1200;camera.updateProjectionMatrix();build('base');S.at='base';setMode('play')},()=>{lock();say([['kapik','Так. Денег у меня нет совсем. Зато есть Тётушка Выдра, у неё всегда найдётся работа.'],['kapik','Её лавка слева от тарелки.']])})}
function startNew(){AU.init();wipeSave();S=freshSave();save();$('#title').hidden=true;setMode('prologue');$('#pro').hidden=false;slide=0;showSlide()}
function startCont(){AU.init();S=loadSave()||freshSave();AU.vol();$('#title').hidden=true;const at=BUILD[S.at]?S.at:'base';fadeTo(PL[at].name,()=>{camera.far=1200;camera.updateProjectionMatrix();build(at);setMode('play')},()=>{lock();afterArrive(at)})}
$('#bPlay').addEventListener('click',()=>{const sv=loadSave();if(sv&&sv.prologue)startCont();else startNew()});
$('#bNew').addEventListener('click',()=>{AU.init();$('#tConfirm').hidden=false});
$('#bNewYes').addEventListener('click',startNew);$('#bNewNo').addEventListener('click',()=>{$('#tConfirm').hidden=true});
$('#bSet').addEventListener('click',()=>{AU.init();openMenu('settings');$('#title').hidden=true});
$('#proNext').addEventListener('click',()=>{AU.sfx('ui');if(slide<SLIDES.length-1){slide++;showSlide()}else endPrologue()});
$('#proSkip').addEventListener('click',endPrologue);

/* ---------- LOOP ---------- */
let last=performance.now(),T=0;
let frameN=0;
function frame(now){requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000);last=now;step(dt);camera.updateMatrixWorld();
  /* phones: refresh the shadow map every second frame (sun and shadows barely move between frames) */
  const sm=renderer.shadowMap;if(isTouch&&Q.q<2){sm.autoUpdate=false;sm.needsUpdate=(frameN++&1)===0}else sm.autoUpdate=true;
  renderer.render(isSpaceView()?sscene:wscene,camera)}
function isSpaceView(){return mode==='space'||mode==='scope'||mode==='title'||mode==='prologue'||(mode==='menu'&&(screenRet==='space'||screenRet==='title'))||(mode==='dialog'&&dlgRet==='space')}
function step(dt){T+=dt;UNI.time.value=T;
  const sens=.0022*S.set.sens,inv=S.set.invert?-1:1;
  if(mode==='play'&&L){
    P.yaw-=MX*sens;P.pitch=clamp(P.pitch-MY*sens*inv,-1.45,1.45);tutLook+=(Math.abs(MX)+Math.abs(MY))*.004;
    const inp={mx:(keys.KeyD||keys.ArrowRight?1:0)-(keys.KeyA||keys.ArrowLeft?1:0)+joy.x,mz:(keys.KeyW||keys.ArrowUp?1:0)-(keys.KeyS||keys.ArrowDown?1:0)-joy.y,sprint:keys.ShiftLeft||keys.ShiftRight,jump:jumpReq};
    if(jumpReq)tutJump=true;if(Math.hypot(inp.mx,inp.mz)>.3)tutMove+=dt;
    updMovers(T,dt);playerUpdate(dt,inp);updCracks(dt);updPicks(T,dt);updNodes(dt);updInteract(dt);if(throwReq)throwBall();updProj(dt);updGun(dt);if(L.update)L.update(dt);
    const sp=Math.hypot(P.vx,P.vz);const ty=P.y+EYE;P.camY=Math.abs(ty-P.camY)>1.2?ty:lerp(P.camY,ty,Math.min(1,dt*18));
    camera.position.set(P.x,P.camY+(P.ground?Math.sin(P.bob)*.045*Math.min(1,sp/5):0),P.z);camera.rotation.set(P.pitch,P.yaw,0);
    const wf=70+(sp>7?6:0);if(Math.abs(camera.fov-wf)>.05){camera.fov=Math.abs(camera.fov-wf)>15?wf:lerp(camera.fov,wf,Math.min(1,dt*5));camera.updateProjectionMatrix()}
  }else if(mode==='space'){
    const inp={thr:(keys.KeyW||keys.ArrowUp?1:0)-(keys.KeyS||keys.ArrowDown?1:0)-joy.y,str:(keys.KeyD||keys.ArrowRight?1:0)-(keys.KeyA||keys.ArrowLeft?1:0)+joy.x,vert:(keys.Space?1:0)-(keys.KeyC||keys.ControlLeft?1:0),boost:keys.ShiftLeft||keys.ShiftRight||boostHeld,roll:(keys.KeyQ?1:0)-(keys.KeyR?1:0),lx:MX*sens*.75,ly:MY*sens*.75*inv,eHeld:ePressed};
    if(isTouch&&Math.abs(joy.y)>.3)SPX.stopAuto();SPX.update(dt,inp);
  }else if(mode==='swing'){swingUpdate(dt,MX,MY);
  }else if(mode==='scope'){SPX.scopeUpdate(dt,{lx:MX*sens,ly:MY*sens*inv});
  }else if(mode==='title'||mode==='prologue'||(mode==='menu'&&screenRet==='title'))SPX.titleView(T,dt);
  MX=0;MY=0;eJust=false;jumpReq=false;throwReq=false;
  updTweens(dt);
  const inSpace=isSpaceView();
  if(!inSpace&&L){for(const f of L.ticks)f(T,dt);updNPCs(T,dt);FXW.update(dt);if(L.sky)L.sky.position.copy(camera.position);if(L.stars)L.stars.position.copy(camera.position);
    if(L.sunDir){sun.position.set(P.x+L.sunDir.x*70,P.y+L.sunDir.y*70,P.z+L.sunDir.z*70);sun.target.position.set(P.x,P.y,P.z)}}
  else FXS.update(dt);
  fishTick(dt);arcadeTick(dt);
  if(mode==='play'||mode==='space'){updObjective(dt);updTut()}else{$('#marker').hidden=true;if(mode!=='dialog'&&mode!=='menu')$('#tut').hidden=true}
  const ch=$('#clickhint'),show=(mode==='play'||mode==='space')&&!isTouch&&!noLock&&!locked;if(ch.hidden===show)ch.hidden=!show;
}

/* ---------- BOOT ---------- */
wscene.add(camera);
if(location.hash==="#dev")window.__K={info:()=>{const i=renderer.info.render;return{calls:i.calls,tris:i.triangles,geo:renderer.info.memory.geometries,tex:renderer.info.memory.textures,prog:renderer.info.programs.length}},stepT:(n)=>{const t0=performance.now();for(let i=0;i<n;i++)step(1/60);return ((performance.now()-t0)/n).toFixed(2)},get MINI(){return MINI},fire:()=>throwBall(),boss:()=>L.boss,freshSave,addRes,openTrade,openShop2:()=>openShop(),get inv(){return S.inv},get S(){return S},set S(v){S=v},P,get L(){return L},get mode(){return mode},build,setMode,takeoff,landOn,SPX,openShop,openMenu,closeScreen,say,advance,keys,qset,qs,rescueBro,save,AU,get target(){return target},jump:()=>{jumpReq=true},pressE:()=>{ePressed=true;eJust=true},releaseE:()=>{ePressed=false},sim:(sec,inp)=>{const n=Math.round(sec*60);for(let i=0;i<n;i++){if(inp)Object.assign(keys,inp);step(1/60)}if(inp)for(const k in inp)keys[k]=false}};
function start(data){
  resize();try{if(window.claude&&window.claude.hot&&window.claude.hot.snapshot)window.claude.hot.snapshot(()=>({save:S,lvl:L&&L.id,mode}))}catch(e){}
  const sv=loadSave();if(sv)S=sv;
  if(data&&data.save&&data.lvl&&data.mode&&data.mode!=='title'&&data.mode!=='prologue'){S=Object.assign(freshSave(),data.save);build(data.lvl);setMode('play')}
  else{camera.far=3200;camera.updateProjectionMatrix();SPX.build();showTitle()}
  applyQuality();applyShadows();UI.refresh();$('#loading').hidden=true;requestAnimationFrame(frame)}
function boot(){window.claude?.hot?.ready?window.claude.hot.ready(start):start(window.claude?.hot?.data??{})}
const fontsReady=document.fonts&&document.fonts.ready?Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,1500))]):Promise.resolve();
fontsReady.then(boot);
