/* ---------- ECONOMY: gathering, trading, workshops ---------- */
const cap=()=>S.up.bag?30:12;
const invCount=()=>Object.values(S.inv).reduce((a,b)=>a+b,0);
function addRes(kind,n,quiet){const free=cap()-invCount();if(free<=0){if(!quiet){toast('Сумка полна. Продайте находки торговцу');AU.sfx('bad')}return 0}const k=Math.min(n,free);S.inv[kind]=(S.inv[kind]||0)+k;save();UI.inv(true);if(!quiet)toast(`+${k} · ${RES[kind].name}`);return k}
function takeRes(kind,n){if((S.inv[kind]||0)<n)return false;S.inv[kind]-=n;if(!S.inv[kind])delete S.inv[kind];save();UI.inv();return true}
const nodeLabel={fluff:'собрать звёздный пух',berry:'собрать ягоды',shroom:'сорвать светогриб',scrap:'разобрать железо',mandarin:'потрясти дерево'};
/* gathering node: hold E, gets resources, regrows after a while */
function node(kind,x,y,z,o){o=o||{};const g=new THREE.Group();g.position.set(x,y,z);L.group.add(g);const full=new THREE.Group();g.add(full);
  if(o.make)o.make(g,full);else if(kind==='berry'){mesh(G.sph,mat(0x2f6a3a),0,.5,0,.75,.55,.75,g).castShadow=true;mesh(G.sph,mat(0x3a7a44),.35,.7,.2,.45,.35,.45,g);for(let i=0;i<12;i++){const a=i*2.4,r2=.62+(i%3)*.1;mesh(G.sph,bmat(0x8ab8ff),Math.cos(a)*r2,.35+(i%4)*.18,Math.sin(a)*r2,.11,.11,.11,full)}const gg=glow(0x7aa8ff,3,.55);gg.position.y=.6;full.add(gg)}
  else if(kind==='shroom'){for(let i=0;i<3;i++){const a=i*2.1,x2=Math.cos(a)*.3,z2=Math.sin(a)*.3,h=.25+i*.1;mesh(G.cyl,mat(0xe8dcc8),x2,h/2,z2,.05,h,.05,full);mesh(G.hemi,bmat(0xd7a0ff),x2,h,z2,.18,.13,.18,full)}full.add(glow(0xd7a0ff,2.4,.5))}
  else if(kind==='fluff'){vis(G.cyl,0x6a9a4a,x,y+.45,z,.035,.9,.035);mesh(G.sph,bmat(0xfffbe8),0,.95,0,.32,.32,.32,full);for(let i=0;i<14;i++){const a=i*2.4,u=Math.cos(i*1.7);mesh(G.cyl,mat(0xf4ecd0),Math.cos(a)*.3*Math.sqrt(1-u*u),.95+u*.3,Math.sin(a)*.3*Math.sqrt(1-u*u),.012,.2,.012,full)}full.add(glow(0xfff4c0,1.6,.4)).position.y=.95}
  else if(kind==='scrap'){for(let i=0;i<7;i++){const a=i*1.7;const m=mesh(i%2?G.box:G.cyl,mat(pick([0x8a96a0,0x6a7078,0xb07a42]),{metal:.7}),Math.cos(a)*.4,.12+i*.05,Math.sin(a)*.4,.25,.12,.18,full);m.rotation.set(a,i,0);m.castShadow=true}mesh(G.tor,mat(0xffab4a,{metal:.6}),0,.45,0,.18,.18,.18,full).rotation.x=1.2}
  const n={kind,x,y,z,g,full,t:0,regrow:o.regrow||60,ready:true};L.nodes.push(n);if(o.solid!==false&&kind==='berry')cyl(x,y,z,.7,.9,0,{nv:true});
  inter({x,y:y+.4,z,r:o.r||1.9,hold:o.hold||.9,label:()=>'Удерживайте E - '+(o.label||nodeLabel[kind]),cond:()=>n.ready&&(!o.cond||o.cond()),act:()=>{const got=addRes(kind,o.yield||(kind==='berry'?3:kind==='scrap'?2:1));if(!got)return;n.ready=false;n.t=n.regrow;full.visible=false;AU.sfx(kind==='scrap'?'repair':'pickup');FXW.burst(x,y+.6,z,{col:parseInt(RES[kind].col.slice(1),16),n:14,spd:2.5,up:2,life:.6});if(o.onGet)o.onGet()}});
  return n}
function updNodes(dt){for(const n of L.nodes){if(n.ready)continue;n.t-=dt;if(n.t<=0){n.ready=true;n.full.visible=true;n.full.scale.setScalar(.01);const f=n.full;tween(.6,p=>f.scale.setScalar(Math.max(.01,p)))}}}
/* fruit tree: shake it, fruit falls to the ground to be picked up */
function fruitTree(x,z,s,o){o=o||{};tree(x,z,s,o.crown||0x4c8a35);const fr=new THREE.Group();L.group.add(fr);const fpos=[];for(let i=0;i<7;i++){const a=i/7*TAU+.3;const fx=x+Math.cos(a)*1.3*s,fy=2.8*s+Math.sin(i*2.1)*.5*s,fz=z+Math.sin(a)*1.3*s;fpos.push([fx,fy,fz]);mesh(G.sph,mat(0xff9a2e,{emissive:0x3a1a00}),fx,fy,fz,.17*s,.16*s,.17*s,fr)}
  const n={ready:true,t:0};tick((t,dt)=>{if(!n.ready){n.t-=dt;if(n.t<=0){n.ready=true;fr.visible=true}}});
  inter({x,y:0,z,r:2.6,hold:.7,label:'Удерживайте E - потрясти дерево',cond:()=>n.ready,act:()=>{n.ready=false;n.t=o.regrow||75;fr.visible=false;AU.sfx('thud');
    for(let i=0;i<3;i++){const a=Math.random()*TAU,d=1+Math.random()*1.2,px=x+Math.cos(a)*d,pz=z+Math.sin(a)*d;const m=resModel('mandarin');m.position.set(px,2.6*s,pz);L.group.add(m);const p={id:'tmp',x:px,y:.3,z:pz,obj:m,base:0,tmp:true,onGet:()=>{addRes('mandarin',1,true);toast('+1 · Мандарины')}};
      tween(.5+i*.08,k=>{m.position.y=lerp(2.6*s,.02,k*k)},()=>{L.picks.push(p)})}}});}
/* trade screen: sell everything in the bag */
let tradeWho=null;
function openTrade(who){tradeWho=who||'otter';openScreen('#trade');$('#tradePic').src=portrait(tradeWho);$('#tradeSay').innerHTML=`<b>${CAST[tradeWho].name}:</b> `+pick(['Покажи, что принёс.','Беру всё, что честно собрано.','Цены честные, лапы не обманут.']);renderTrade()}
function renderTrade(){$('#tradeCoins').textContent=S.coins;$('#tradeBag').textContent=`${invCount()} / ${cap()}`;const ks=Object.keys(S.inv).filter(k=>S.inv[k]>0);
  $('#tradeList').innerHTML=ks.length?ks.map(k=>`<div class="card"><div class="thumb" style="background:${RES[k].col}33"><span class="resdot" style="background:${RES[k].col}"></span></div><div class="cardMain"><b>${RES[k].name}</b><span>В сумке: ${S.inv[k]} · цена ${coinsWord(RES[k].price)} за штуку</span></div><button data-sell="${k}" data-n="1">Продать 1</button><button data-sell="${k}" data-n="all" class="primary"><span class="price"><span class="coin"></span>+${S.inv[k]*RES[k].price}</span></button></div>`).join('')
    :'<div class="empty">Сумка пуста. Ягоды, мандарины, рыба, светогрибы и железо продаются здесь. В мастерских из них делают товары подороже.</div>'}
$('#tradeList').addEventListener('click',e=>{const b=e.target.closest('[data-sell]');if(!b)return;const k=b.dataset.sell,n=b.dataset.n==='all'?S.inv[k]:1;if(!takeRes(k,n))return;addCoins(n*RES[k].price);AU.sfx('buy');renderTrade();if(L&&L.onSell)L.onSell(k,n)});
/* workshop: turn raw goods into a pricier product with a timing mini-game */
function workshop(x,y,z,o){inter({x,y,z,r:o.r||2.4,label:()=>`E - ${o.title}: ${o.need} ${RES[o.from].one} → ${RES[o.to].one}`,act:()=>{
  if((S.inv[o.from]||0)<o.need){say([['kapik',`Нужно ${o.need} шт.: ${RES[o.from].name.toLowerCase()}. Сейчас в сумке ${S.inv[o.from]||0}.`]]);AU.sfx('bad');return}
  openMini({title:o.title,help:o.help,need:3,btn:o.btn||'Жать!',unit:'Готово',onWin:()=>{takeRes(o.from,o.need);S.inv[o.to]=(S.inv[o.to]||0)+1;save();UI.inv(true);banner('Сделано',RES[o.to].name,`Стоит ${coinsWord(RES[o.to].price)} у любого торговца`);AU.sfx('quest');if(o.onMade)o.onMade()}})}})}
/* fishing spot: needs grandpa's rod */
function fishingSpot(x,y,z,o){o=o||{};inter({x,y,z,r:o.r||2,label:'E - рыбачить',cond:o.cond,act:()=>{if(!S.got['rod']){say([['kapik','Без удочки не порыбачишь. Дедушкина удочка лежала где-то в амбаре на базе.']]);return}
  openMini({title:'Рыбалка',help:'Жмите E или кнопку, когда поплавок в зелёной зоне.',need:1,btn:'Подсечь',unit:'Поймано',loop:true,onCatch:()=>{const k=addRes('fish',1);if(o.onFish&&k)o.onFish();return k>0}})}})}
/* bag screen (F): see everything, throw away any amount */
function openBag(){openScreen('#bag');renderBag()}
function renderBag(){$('#bagCoins').textContent=S.coins;const ks=Object.keys(S.inv).filter(k=>S.inv[k]>0);
  $('#bagSub').textContent=`Занято ${invCount()} из ${cap()}. Ненужное можно выбросить: выберите количество ползунком.`;
  $('#bagList').innerHTML=ks.length?ks.map(k=>{const n=S.inv[k];return`<div class="card bagRow"><div class="thumb" style="background:${RES[k].col}33"><span class="resdot" style="background:${RES[k].col}"></span></div><div class="cardMain"><b>${RES[k].name}</b><span>${n} шт. · торговцы платят ${coinsWord(RES[k].price)} за штуку</span></div>
    <div class="bagCtl"><input type="range" min="1" max="${n}" step="1" value="${n}" data-k="${k}" aria-label="Сколько выбросить"><output id="bo-${k}">${n}</output><button class="danger" data-drop="${k}">Выбросить</button></div></div>`}).join('')
    :'<div class="empty">Сумка пуста. Собирайте ягоды, мандарины, рыбу, светогрибы, железо и пух, продавайте торговцам.</div>'}
$('#bagList').addEventListener('input',e=>{const r=e.target.closest('input[data-k]');if(r)$('#bo-'+r.dataset.k).textContent=r.value});
$('#bagList').addEventListener('click',e=>{const b=e.target.closest('[data-drop]');if(!b)return;const k=b.dataset.drop,r=$(`#bagList input[data-k="${k}"]`),n=Math.min(+r.value,S.inv[k]||0);if(!n)return;takeRes(k,n);AU.sfx('thud');toast(`Выброшено: ${RES[k].name.toLowerCase()} × ${n}`);renderBag()});
