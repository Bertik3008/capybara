/* ---------- UI ---------- */
const UI={};
const ICON={
  tr:'<path d="M4 5h16v10H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
  jump2:'<path d="M12 3v6M9 6l3-3 3 3"/><path d="M6 21c2-2 4-2 6 0s4 2 6 0M6 17c2-2 4-2 6 0s4 2 6 0M6 13c2-2 4-2 6 0s4 2 6 0"/>',
  run:'<path d="M5 18h13a2 2 0 0 0 2-2l-6-2-2-6H7l-2 10z"/><path d="M3 21h17"/>',
  bag:'<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  boost:'<path d="M12 3c3 4 5 7 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z"/>',
  shield:'<path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  auto:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  lights:'<path d="M3 6c6 4 12 4 18 0"/><circle cx="7" cy="10" r="1.6"/><circle cx="12" cy="11" r="1.6"/><circle cx="17" cy="10" r="1.6"/>',
  tree:'<circle cx="12" cy="9" r="6"/><path d="M12 15v6"/><circle cx="10" cy="8" r="1"/><circle cx="14" cy="10" r="1"/>',
  hammock:'<path d="M3 4v16M21 4v16M3 9c4 6 14 6 18 0"/>',
  fountain:'<path d="M5 20h14l-1-5H6z"/><path d="M12 15V7M12 7c-3 0-4 2-5 4M12 7c3 0 4 2 5 4"/>',
  onsen:'<path d="M3 14h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M8 10c-1-2 1-3 0-5M12 10c-1-2 1-3 0-5M16 10c-1-2 1-3 0-5"/>',
  telescope:'<path d="M4 12l12-6 2 4-12 6z"/><path d="M10 14l-3 7M12 13l3 8"/>',
  garden:'<path d="M4 20h16"/><path d="M8 20v-5M12 20v-8M16 20v-6"/><circle cx="8" cy="14" r="2"/><circle cx="12" cy="10" r="2.5"/><circle cx="16" cy="13" r="2"/>'
};
const svgI=k=>`<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#ffab4a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICON[k]||''}</svg>`;

function toast(t){const d=document.createElement('div');d.className='toast';d.textContent=t;const box=$('#toasts');box.appendChild(d);while(box.children.length>3)box.firstChild.remove();setTimeout(()=>d.remove(),3400)}
let banT=0;
function banner(tag,title,sub){$('#bannerTag').textContent=tag;$('#bannerTitle').textContent=title;$('#bannerSub').textContent=sub||'';const b=$('#banner');b.hidden=true;void b.offsetWidth;b.hidden=false;clearTimeout(banT);banT=setTimeout(()=>b.hidden=true,3600)}
function flash(color){const f=$('#flash');f.style.transition='none';f.style.background=color;f.style.opacity='.6';requestAnimationFrame(()=>requestAnimationFrame(()=>{f.style.transition='opacity .7s';f.style.opacity='0'}))}
UI.coins=d=>{$('#coins').textContent=S.coins;if(d){const p=$('#coinPill');p.classList.remove('bump');void p.offsetWidth;p.classList.add('bump')}if(!$('#shop').hidden)renderShop();if(!$('#trade').hidden)renderTrade()};
UI.inv=bump=>{$('#bagN').textContent=`${invCount()}/${cap()}`;const p=$('#bagPill');p.classList.toggle('full',invCount()>=cap());if(bump){p.classList.remove('bump');void p.offsetWidth;p.classList.add('bump')}};
UI.bros=()=>{$('#bros').innerHTML=PIDS.map(p=>`<span class="bro ${S.rescued[p]?'on':''}" title="${CAST[PL[p].bro].name}"><img alt="" src="${portrait(PL[p].bro)}"></span>`).join('')};
UI.objFlash=()=>{const o=$('#objBox');o.classList.remove('flash');void o.offsetWidth;o.classList.add('flash');lastObj=''};
UI.refresh=()=>{UI.coins();UI.inv();UI.bros();lastObj='';objT=0};

/* ---------- OBJECTIVE + MARKER ---------- */
let lastObj='',objT=0,curObj=null;
function getObjective(){if(mode==='space')return spaceObjective();if(!L)return null;const c=chapterObj();if(c)return c;return L.objective?L.objective():null}
function updObjective(dt){objT-=dt;if(objT<=0){objT=.25;curObj=getObjective();const t=curObj?curObj.text:'';if(t!==lastObj){lastObj=t;$('#obj').textContent=t;$('#objTag').textContent=curObj&&curObj.tag||'Задача'}$('#objBox').hidden=!t}
  const dEl=$('#objDist');if(curObj&&curObj.pos&&mode!=='space'){const d=Math.hypot(curObj.pos[0]-P.x,curObj.pos[2]-P.z);dEl.textContent=Math.round(d)+' м'}else if(curObj&&curObj.dist!=null)dEl.textContent=curObj.dist;else dEl.textContent='';
  updMarker(curObj&&curObj.pos)}
function updMarker(pos){const mk=$('#marker');if(!pos||(mode!=='play'&&mode!=='space')){mk.hidden=true;return}
  tmpV.set(pos[0],pos[1],pos[2]);const dist=tmpV.distanceTo(camera.position);if(dist<3&&mode==='play'){mk.hidden=true;return}
  tmpV.project(camera);let x=tmpV.x,y=tmpV.y;const behind=tmpV.z>1;if(behind){x=-x;y=-y}
  const W=innerWidth,H=innerHeight,m=46;let sx=(x*.5+.5)*W,sy=(-y*.5+.5)*H;const off=behind||sx<m||sx>W-m||sy<m+70||sy>H-m;
  const b=mk.querySelector('b');
  if(off){let dx=sx-W/2,dy=sy-H/2;if(behind&&Math.abs(dy)<1)dy=1;const k=Math.min((W/2-m)/Math.max(Math.abs(dx),1e-6),(H/2-m-35)/Math.max(Math.abs(dy),1e-6));sx=W/2+dx*k;sy=H/2+dy*k;const a=Math.atan2(dy,dx);b.style.transform=`translate(${Math.cos(a)*22}px,${Math.sin(a)*22}px) rotate(${a*180/Math.PI-90}deg)`}
  mk.classList.toggle('off',off);mk.hidden=false;mk.style.transform=`translate(${sx}px,${sy}px)`;$('#markerD').textContent=Math.round(dist)+' м'}

/* ---------- DIALOG: storybook style ---------- */
const DCOL={kapik:'#ff9a2e',yuzik:'#ff9a2e',snezhok:'#3fb6c8',gribok:'#d8453c',vintik:'#c99a3a',otter:'#4a7bd1',mole:'#3a8a5a',citron:'#c94f3a',grushka:'#4f9a3a',morkovka:'#e07a1f',farmhand:'#4f9a3a',brr:'#2a8aa8',fyu:'#d84a4a',usach:'#2c5a8a',penguin:'#2a8aa8',sliz:'#8a4ab0',kvaba:'#8a4ab0',kvak:'#3a9a4a',frog:'#3a9a4a',shurup:'#e07a1f',bolt:'#2a8aa8',posylkin:'#3a6ad6',magnetron:'#c03030',cleaner:'#3a9a6a',robot:'#2a8aa8'};
let dlgQ=[],dlgEnd=null,typing=null,curText='',dlgRet='play';
function say(lines,onEnd){dlgQ=lines.slice();dlgEnd=onEnd||null;if(mode!=='dialog')dlgRet=mode==='space'?'space':'play';for(const k in keys)keys[k]=false;setMode('dialog');const d=$('#dlg');d.hidden=false;d.classList.remove('in');void d.offsetWidth;d.classList.add('in');nextLine()}
function nextLine(){
  if(!dlgQ.length){$('#dlg').hidden=true;clearInterval(typing);typing=null;const f=dlgEnd;dlgEnd=null;setMode(dlgRet);lock();if(f)f();return}
  const ln=dlgQ.shift(),c=CAST[ln[0]],alien=ln[2]==='alien';const d=$('#dlg');d.style.setProperty('--sp',alien?'#7a5ab0':(DCOL[ln[0]]||'#ff9a2e'));d.classList.toggle('kapik',ln[0]==='kapik');
  $('#dlgPic').src=portrait(ln[0]);$('#dlgName').textContent=alien?'???':c.name;const el=$('#dlgText');el.classList.toggle('alien',alien);$('#dlgNext').classList.remove('on');
  curText=ln[1];el.textContent='';let i=0;clearInterval(typing);
  typing=setInterval(()=>{i+=2;el.textContent=curText.slice(0,i);if(i%6===0)AU.sfx('talk',c.voice*(.9+Math.random()*.25));if(i>=curText.length){clearInterval(typing);typing=null;$('#dlgNext').classList.add('on')}},17);
}
function advance(){if(typing){clearInterval(typing);typing=null;$('#dlgText').textContent=curText;$('#dlgNext').classList.add('on');return}nextLine()}
$('#dlg').addEventListener('click',e=>{e.stopPropagation();advance()});

/* ---------- PROMPT ---------- */
function showPrompt(lab,p){const pr=$('#prompt');if(!lab){pr.hidden=true;return}pr.hidden=false;$('#promptText').textContent=lab;$('#keyRing').style.setProperty('--p',p||0)}

/* ---------- SCREENS ---------- */
let curScreen=null,screenRet='play';
function openScreen(sel){if(curScreen)$(curScreen).hidden=true;else screenRet=mode==='space'?'space':mode==='title'?'title':'play';for(const k in keys)keys[k]=false;ePressed=false;curScreen=sel;$(sel).hidden=false;if(screenRet!=='title')setMode('menu');AU.sfx('ui')}
function closeScreen(){if(curScreen)$(curScreen).hidden=true;const was=curScreen;curScreen=null;if(screenRet==='title'){$('#title').hidden=false;return}setMode(screenRet);lock();
  if((UI.rebuildAfter||UI.hatChanged)&&screenRet==='play'){UI.rebuildAfter=UI.hatChanged=false;rebuildHere()}else if((UI.hatChanged||UI.rebuildAfter)&&screenRet==='space'){UI.hatChanged=UI.rebuildAfter=false;SPX.repaint()}}
$$('[data-close]').forEach(b=>b.addEventListener('click',closeScreen));

/* pause menu */
let menuTab='quests';
function openMenu(tab){menuTab=tab||menuTab;const fromTitle=mode==='title';if(fromTitle&&(menuTab==='quests'||menuTab==='kapik'))menuTab='settings';openScreen('#menu');$('#menu').classList.toggle('fromTitle',fromTitle);$('#mResume').textContent=fromTitle?'Назад':'Продолжить';renderMenu()}
$('#menuTabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(!b)return;menuTab=b.dataset.tab;AU.sfx('ui');renderMenu()});
$('#mResume').addEventListener('click',closeScreen);
$('#mExit').addEventListener('click',()=>{closeScreen();toTitle()});
function renderMenu(){$$('#menuTabs [data-tab]').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===menuTab));const B=$('#menuBody');
  $('#menuTitle').textContent={quests:'Журнал заданий',kapik:'Капик и сумка',settings:'Настройки',controls:'Управление'}[menuTab];
  if(menuTab==='quests'){const order=['base','p1','p2','p3','p4','p5','p7','p6'];let h='';
    for(const pl of order){const ids=Object.keys(QUESTS).filter(id=>QUESTS[id].pl===pl&&qs(id)>0);if(!ids.length)continue;h+=`<div class="qsec">${PL[pl].name}</div>`;
      ids.sort((a,b)=>(qdone(a)-qdone(b))||(QUESTS[b].main||0)-(QUESTS[a].main||0)).forEach(id=>{const q=QUESTS[id],st=qs(id),done=st===99;
        h+=`<div class="card ${done?'done':''} ${L&&L.id===pl&&!done?'cur':''}"><div class="thumb"><img alt="" src="${portrait(q.giver)}"></div><div class="cardMain"><b>${q.t}</b><span>${done?'Выполнено':q.steps[Math.min(st,q.steps.length)-1]}</span><div class="tags">${q.main?'<span class="tag gold">Главное</span>':'<span class="tag">Побочное</span>'}${q.rw?`<span class="tag">Награда: ${coinsWord(q.rw)}</span>`:''}${done?'<span class="tag ok">Готово</span>':''}</div></div></div>`})}
    const hid=Object.keys(QUESTS).filter(id=>!qs(id)).length;B.innerHTML=`<div class="cards">${h||'<div class="empty">Пока заданий нет. Поговорите с жителями: над теми, у кого есть дело, горит оранжевый «!».</div>'}</div>${hid?`<p class="sub" style="margin-top:12px">Ещё не найдено заданий: ${hid}. Ищите жителей в необычных местах.</p>`:''}`}
  else if(menuTab==='kapik'){const own=Object.keys(HAT_INFO).filter(h=>S.hats[h]);const done=Object.keys(QUESTS).filter(qdone).length;const ks=Object.keys(S.inv).filter(k=>S.inv[k]>0);
    B.innerHTML=`<div class="card"><div class="thumb" style="flex-basis:96px;height:96px"><img alt="" src="${portrait('kapik')}"></div><div class="cardMain"><b>Капик</b><span>Братьев спасено: ${PIDS.filter(p=>S.rescued[p]).length} из 4 · Заданий: ${done} из ${Object.keys(QUESTS).length} · Сувениров: ${Object.keys(S.souv).length} из 4${S.got.rod?' · Удочка есть':''}</span></div></div>
    <div class="qsec">Сумка · ${invCount()} из ${cap()}</div><div class="cards">${ks.length?ks.map(k=>`<div class="card"><div class="thumb" style="background:${RES[k].col}33"><span class="resdot" style="background:${RES[k].col}"></span></div><div class="cardMain"><b>${RES[k].name}</b><span>${S.inv[k]} шт. · ${coinsWord(RES[k].price)} за штуку у торговцев</span></div></div>`).join(''):'<div class="empty">Сумка пуста. Собирайте ягоды, мандарины, рыбу, светогрибы и железо, продавайте торговцам.</div>'}</div>
    <div class="qsec">Шапки</div><div class="cards">${own.map(h=>`<div class="card ${S.hat===h?'cur':''}"><div class="thumb"><img alt="" src="${portraitHat(h)}"></div><div class="cardMain"><b>${HAT_INFO[h].name}</b></div><button data-hat="${h}" ${S.hat===h?'disabled':''}>${S.hat===h?'Надета':'Надеть'}</button></div>`).join('')}</div>`;
    B.querySelectorAll('[data-hat]').forEach(b=>b.onclick=()=>{S.hat=b.dataset.hat;save();AU.sfx('ui');renderMenu();UI.hatChanged=true})}
  else if(menuTab==='settings'){const s=S.set,q=Q.q;B.innerHTML=`<div class="cards">
    <div class="setrow"><span>Графика</span><div class="seg" id="sQ">${['Быстро','Сбалансированно','Красиво'].map((n,i)=>`<button data-q="${i}" aria-pressed="${q===i}">${n}</button>`).join('')}</div></div>
    <div class="setrow"><label for="sMus">Музыка</label><input id="sMus" type="range" min="0" max="1" step=".05" value="${s.music}"></div>
    <div class="setrow"><label for="sSfx">Звуки</label><input id="sSfx" type="range" min="0" max="1" step=".05" value="${s.sfx}"></div>
    <div class="setrow"><label for="sSens">Чувствительность камеры</label><input id="sSens" type="range" min=".3" max="2.5" step=".05" value="${s.sens}"></div>
    <label class="check"><input id="sInv" type="checkbox" ${s.invert?'checked':''}>Инвертировать камеру по вертикали</label>
    <label class="check"><input id="sHint" type="checkbox" ${s.hints?'checked':''}>Подсказки обучения</label></div>
    <p class="sub" style="margin-top:6px">«Быстро» без теней и с меньшим разрешением, для слабых телефонов. «Красиво» с мягкими тенями и густой травой.</p>
    <div class="btns" style="justify-content:flex-start;margin-top:8px">${S.tut<TUT.length&&mode!=='title'?'<button id="sSkip">Пропустить обучение</button>':''}</div>`;
    const up=()=>{s.music=+$('#sMus').value;s.sfx=+$('#sSfx').value;s.sens=+$('#sSens').value;s.invert=$('#sInv').checked;s.hints=$('#sHint').checked;save();AU.vol()};
    B.querySelectorAll('input').forEach(i=>i.addEventListener('input',up));
    $('#sQ').onclick=e=>{const b=e.target.closest('[data-q]');if(!b)return;s.q=+b.dataset.q;save();applyQuality();applyShadows();UI.rebuildAfter=true;renderMenu()};
    const sk=$('#sSkip');if(sk)sk.onclick=()=>{S.tut=TUT.length;save();renderMenu();toast('Обучение пропущено')}}
  else{const rows=isTouch?[['Джойстик слева','ходьба'],['Правая часть экрана','поворот камеры'],['Прыжок','прыжок; в воздухе ещё раз - двойной прыжок (нужны Пружинные лапы)'],['E','действие; удерживать, чтобы собирать и садиться в НЛО'],['Бросок','снежок на Ледоре'],['Карта','карта звёздной системы'],['В космосе: джойстик','газ и сдвиг'],['В космосе: правая часть','поворот тарелки, можно крутить сальто']]
    :[['W A S D','ходьба'],['Мышь','поворот камеры'],['Shift','бег'],['Пробел','прыжок; в воздухе ещё раз - двойной прыжок (нужны Пружинные лапы)'],['E','действие; удерживать, чтобы собирать и садиться в НЛО'],['Q','бросить предмет из лап'],['M','карта звёздной системы'],['Левая кнопка мыши','бросить снежок на Ледоре'],['J','журнал заданий'],['Esc','пауза'],['В космосе: W S','газ вперёд и назад'],['В космосе: мышь','поворот тарелки; можно крутить сальто'],['В космосе: Q и R','крен влево и вправо'],['В космосе: Shift','форсаж'],['В космосе: пробел и C','вверх и вниз'],['В космосе: V','вид из кабины или снаружи']];
    B.innerHTML=`<dl class="ctlgrid">${rows.map(r=>`<dt>${r[0]}</dt><dd>${r[1]}</dd>`).join('')}</dl>`}
}
function applyShadows(){wscene.traverse(o=>{if(o.material){(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.needsUpdate=true)}})}

/* ---------- SHOP ---------- */
const UPG={
  gear:[{id:'tr',name:'Универсальный переводчик',price:10,desc:'Капик понимает жителей всех четырёх планет',own:()=>S.tr,buy:()=>{S.tr=true;if(qs('m0')!==99)qcomplete('m0')}},
    {id:'bag',name:'Большая сумка',price:25,desc:'Вмещает 30 находок вместо 12'},
    {id:'run',name:'Ботинки-скороходы',price:35,desc:'Капик бегает на 18% быстрее'},
    {id:'jump2',name:'Пружинные лапы',price:45,desc:'Двойной прыжок: прыгните ещё раз в воздухе. Открывает самые высокие тайники'}],
  ship:[{id:'boost',name:'Форсаж+',price:40,desc:'Форсаж тарелки на 40% мощнее и восстанавливается быстрее'},
    {id:'shield',name:'Щит-отражатель',price:35,desc:'Астероиды почти не тормозят тарелку'},
    {id:'auto',name:'Автопилот',price:70,desc:'Тарелка сама летит к планете, выбранной на карте'}],
  decor:[{id:'garden',name:'Ягодная грядка',price:20,desc:'Ещё четыре куста звёздных ягод у амбара'},{id:'lights',name:'Гирлянды',price:20,desc:'Разноцветные огни над площадкой НЛО'},{id:'tree',name:'Мандариновое дерево',price:25,desc:'Юзик будет счастлив. Дерево можно трясти'},
    {id:'hammock',name:'Гамак',price:30,desc:'Для Грибка, который любит поспать'},{id:'fountain',name:'Фонтан',price:40,desc:'Каменный фонтан в центре базы'},
    {id:'onsen',name:'Горячий источник',price:55,desc:'Тёплая купель у пруда. Капибары это обожают'},{id:'telescope',name:'Телескоп',price:35,desc:'Ставится на крышу амбара. В него видно все планеты'}]
};
let shopTab='gear';
const SHOP_LINES=['Переводчики, лапы, ботинки. Всё для храброй капибары.','Монеты не пахнут, а мандарины пахнут. Плати монетами.','Купишь гамак - братья скажут спасибо.','Ягоды, рыбу и всё прочее принимаю на вкладке «Продать».'];
function openShop(){openScreen('#shop');$('#shopPic').src=portrait('otter');$('#shopSay').innerHTML='<b>Тётушка Выдра:</b> '+(S.tr?pick(SHOP_LINES):'Без переводчика на других планетах ты услышишь только «блорп». Он стоит 10 монет.');renderShop()}
$('#shopTabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(!b)return;if(b.dataset.tab==='sell'){openTrade('otter');return}shopTab=b.dataset.tab;AU.sfx('ui');renderShop()});
function renderShop(){$$('#shopTabs [data-tab]').forEach(b=>b.setAttribute('aria-selected',b.dataset.tab===shopTab));$('#shopCoins').textContent=S.coins;let h='';
  const row=(thumb,name,desc,own,price,attr,useLabel)=>`<div class="card ${own?'done':''}"><div class="thumb ${thumb.sw?'sw':''}" ${thumb.sw?`style="background:${thumb.sw}"`:''}>${thumb.img?`<img alt="" src="${thumb.img}">`:thumb.svg||''}</div><div class="cardMain"><b>${name}</b><span>${desc}</span></div>${own?(useLabel?`<button ${attr} data-use="1">${useLabel}</button>`:'<span class="tag ok">Куплено</span>'):`<button ${attr} ${S.coins<price?'disabled':''} class="primary"><span class="price"><span class="coin"></span>${price}</span></button>`}</div>`;
  if(shopTab==='gear')UPG.gear.forEach(u=>h+=row({svg:svgI(u.id)},u.name,u.desc,u.own?u.own():S.up[u.id],u.price,`data-buy="${u.id}"`));
  else if(shopTab==='ship'){UPG.ship.forEach(u=>h+=row({svg:svgI(u.id)},u.name,u.desc,S.up[u.id],u.price,`data-buy="${u.id}"`));h+='<div class="qsec">Покраска тарелки</div>';
    for(const k in PAINTS){const p=PAINTS[k],own=S.paints[k];if(p.secret&&!own)continue;h+=row({sw:'#'+p.col.toString(16).padStart(6,'0')},p.name,own?(S.paint===k?'Тарелка сейчас в этом цвете':'Уже куплена'):'Новая краска для дедушкиной тарелки',own,p.price,`data-paint="${k}"`,own&&S.paint!==k?'Покрасить':null)}}
  else if(shopTab==='hats'){for(const k in HAT_INFO){if(k==='none')continue;const hi=HAT_INFO[k],own=S.hats[k];if(hi.secret&&!own)continue;h+=row({img:portraitHat(k)},hi.name,own?(S.hat===k?'Сейчас на Капике':'Уже куплена'):'Видно в разговорах и в окне тарелки',own,hi.price,`data-hat="${k}"`,own&&S.hat!==k?'Надеть':null)}}
  else UPG.decor.forEach(u=>h+=row({svg:svgI(u.id)},u.name,u.desc,S.decor[u.id],u.price,`data-decor="${u.id}"`));
  $('#shopList').innerHTML=h}
$('#shopList').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;
  const pay=p=>{if(S.coins<p){AU.sfx('bad');return false}S.coins-=p;AU.sfx('buy');UI.coins();return true};
  if(b.dataset.buy){const u=[...UPG.gear,...UPG.ship].find(x=>x.id===b.dataset.buy);if(!pay(u.price))return;if(u.buy)u.buy();else S.up[u.id]=true;toast('Куплено: '+u.name);UI.inv()}
  else if(b.dataset.paint){const k=b.dataset.paint;if(!S.paints[k]){if(!pay(PAINTS[k].price))return;S.paints[k]=1}S.paint=k;AU.sfx('ui');toast('Тарелка: '+PAINTS[k].name.toLowerCase()+' покраска');UI.rebuildAfter=true}
  else if(b.dataset.hat){const k=b.dataset.hat;if(!S.hats[k]){if(!pay(HAT_INFO[k].price))return;S.hats[k]=1}S.hat=k;toast('Капик надел: '+HAT_INFO[k].name.toLowerCase());UI.rebuildAfter=true}
  else if(b.dataset.decor){const u=UPG.decor.find(x=>x.id===b.dataset.decor);if(!pay(u.price))return;S.decor[u.id]=1;toast(u.name+' появится на базе');UI.rebuildAfter=true}
  save();renderShop()});

/* ---------- MINI-GAME (fishing and workshops share one timing bar) ---------- */
const MINI={on:false,t:0,zone:[.4,.6],caught:0,o:null,spd:1.3,v:.5};
function openMini(o){MINI.on=true;MINI.o=o;MINI.kind=o.kind||'timing';MINI.v=0;MINI.holding=false;MINI.t=Math.random()*5;MINI.caught=0;MINI.spd=1.3;$('#fneedle').style.display=MINI.kind==='mash'?'none':'';$('#miniTitle').textContent=o.title;$('#miniHelp').textContent=o.help;$('#fHook').textContent=o.btn||'Жать';newZone();openScreen('#fish');updMiniUI()}
function newZone(){if(MINI.kind==='mash'){$('#fzone').style.left='0';$('#fzone').style.width='0';return}const w=Math.max(.1,(MINI.kind==='hold'?.2:.22)-MINI.caught*.025),a=(MINI.kind==='hold'?.35:.08)+Math.random()*((MINI.kind==='hold'?.6:.84)-w);MINI.zone=[a,a+w];$('#fzone').style.left=a*100+'%';$('#fzone').style.width=w*100+'%'}
function updMiniUI(){const o=MINI.o;$('#fishCount').textContent=MINI.kind==='mash'?`${o.unit}: ${Math.round(MINI.v*100)}%`:o.loop?`${o.unit}: ${MINI.caught}`:`${o.unit}: ${MINI.caught} из ${o.need}`}
function fishTick(dt){if(!MINI.on)return;
  if(MINI.kind==='mash'){MINI.v=Math.max(0,MINI.v-.3*dt);$('#fzone').style.width=MINI.v*100+'%';updMiniUI();return}
  if(MINI.kind==='hold'){if(MINI.holding){MINI.v+=dt*.62;if(MINI.v>=1){MINI.v=0;MINI.holding=false;AU.sfx('bad');toast('Перебор! Отпускайте раньше')}}else MINI.v=Math.max(0,MINI.v-dt*1.5);$('#fneedle').style.left=MINI.v*100+'%';return}
  MINI.t+=dt*MINI.spd;const v=(Math.sin(MINI.t*2.2)+1)/2*.96+.02;MINI.v=v;$('#fneedle').style.left=v*100+'%'}
function miniWin(){const o=MINI.o;MINI.on=false;setTimeout(()=>{closeScreen();if(o.onWin)o.onWin()},450)}
function fishRelease(){if(!MINI.on||MINI.kind!=='hold'||!MINI.holding)return;MINI.holding=false;const v=MINI.v,o=MINI.o;
  if(v>=MINI.zone[0]&&v<=MINI.zone[1]){AU.sfx('item');MINI.caught++;updMiniUI();if(MINI.caught>=o.need){miniWin();return}newZone()}else{AU.sfx('bad');toast(v<MINI.zone[0]?'Рано отпустили':'Поздно, перегрели')}MINI.v=0}
function fishHook(){if(!MINI.on)return;
  if(MINI.kind==='mash'){MINI.v=Math.min(1,MINI.v+.09);AU.sfx('ui');if(MINI.v>=1){AU.sfx('item');miniWin()}return}
  if(MINI.kind==='hold'){MINI.holding=true;return}
  const v=MINI.v,o=MINI.o;if(v>=MINI.zone[0]&&v<=MINI.zone[1]){AU.sfx('reel');AU.sfx('item');MINI.spd=Math.min(3.2,MINI.spd+.25);
    if(o.loop){if(!o.onCatch()){MINI.on=false;setTimeout(closeScreen,600);return}MINI.caught++;updMiniUI();newZone();return}
    MINI.caught++;updMiniUI();if(MINI.caught>=o.need){MINI.on=false;setTimeout(()=>{closeScreen();if(o.onWin)o.onWin()},450);return}newZone()}else{AU.sfx('bad');toast(o.loop?'Сорвалась':'Мимо, ещё раз')}}
$('#fHook').addEventListener('pointerdown',e=>{e.preventDefault();fishHook()});$('#fHook').addEventListener('pointerup',fishRelease);$('#fHook').addEventListener('pointerleave',fishRelease);window.addEventListener('keyup',e=>{if(curScreen==='#fish'&&(e.code==='KeyE'||e.code==='Space'))fishRelease()});$('#fQuit').addEventListener('click',()=>{MINI.on=false;closeScreen()});

/* ---------- TUTORIAL ---------- */
const KC=k=>`<span class="kc">${k}</span>`;
const TUT=[
  {t:()=>isTouch?'Проведите пальцем по правой части экрана, чтобы осмотреться':'Двигайте мышью, чтобы осмотреться',ok:()=>tutLook>2.2},
  {t:()=>isTouch?'Двигайте джойстик слева, чтобы идти':`Идите: ${KC('W')}${KC('A')}${KC('S')}${KC('D')}, бег: ${KC('Shift')}`,ok:()=>tutMove>2.5},
  {t:()=>isTouch?'Нажмите «Прыжок»':`Прыгните: ${KC('Пробел')}`,ok:()=>tutJump},
  {t:()=>`Поговорите с Тётушкой Выдрой в лавке слева от тарелки: ${KC('E')}`,ok:()=>qs('m0')>=2},
  {t:()=>`Соберите звёздные ягоды: удерживайте ${KC('E')} у кустов с синими огоньками`,ok:()=>(S.inv.berry||0)>=8||qs('m0')>=3},
  {t:()=>'Отнесите ягоды Тётушке Выдре и получите первые монеты',ok:()=>qs('m0')>=3},
  {t:()=>'Купите универсальный переводчик в лавке',ok:()=>S.tr},
  {t:()=>`Подойдите к тарелке и удерживайте ${KC('E')}, чтобы взлететь`,ok:()=>mode==='space'||(L&&L.id!=='base')},
  {t:()=>isTouch?'Вы в кабине! Джойстик - газ, правая часть экрана - руль. «Карта» - курс. Летите к Мандарине и удерживайте E у планеты':`Вы в кабине! Мышь - руль, ${KC('W')} - газ, ${KC('Shift')} - форсаж, ${KC('M')} - карта. Летите к Мандарине и удерживайте ${KC('E')} у планеты`,ok:()=>L&&L.id==='p1'&&mode!=='space'}
];
let tutLook=0,tutMove=0,tutJump=false,tutBarn=false,tutShown=-1;
function tutCheck(){if(S.tut>=TUT.length)return;let ch=false;while(S.tut<TUT.length&&TUT[S.tut].ok()){S.tut++;ch=true}if(ch){save();const el=$('#tut');el.classList.remove('done');void el.offsetWidth;el.classList.add('done');AU.sfx('ui')}}
function updTut(){const el=$('#tut');const show=S.set.hints&&S.tut<TUT.length&&(mode==='play'||mode==='space')&&(S.tut<8||mode==='space'||L&&L.id!=='base');
  if(!show){el.hidden=true;return}tutCheck();if(S.tut>=TUT.length){el.hidden=true;return}el.hidden=false;if(tutShown!==S.tut){tutShown=S.tut;$('#tutText').innerHTML=TUT[S.tut].t();$('#tutN').textContent=`${S.tut+1} из ${TUT.length}`;$('#tutBar').style.width=(S.tut/TUT.length*100)+'%'}}
