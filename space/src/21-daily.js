/* ---------- v9: «Доска заданий» - three small daily tasks that tie the side systems together ---------- */
const DAILY_POOL=[
  {id:'res',ev:'res',need:12,rw:15,t:n=>`Собери ${n} находок на любых планетах`},
  {id:'mini',ev:'mini',need:2,rw:20,t:n=>`Выиграй ${n} мини-игры: мастерские или рыбалка`},
  {id:'garden',ev:'garden',need:1,rw:15,t:()=>'Вырасти и собери урожай на огороде'},
  {id:'req',ev:'req',need:1,rw:20,t:()=>'Выполни просьбу кого-нибудь из братьев'},
  {id:'bro',ev:'bro',need:3,rw:15,t:n=>`Порадуй братьев ${n} раза: угости, почеши или поиграй`},
  {id:'arcade',ev:'arcade',need:8,max:true,rw:20,t:n=>`Набери ${n} очков в дедушкином «Капи-Прыге»`,ok:()=>S.got.holo},
  {id:'sell',ev:'sell',need:6,rw:15,t:n=>`Продай торговцам ${n} находок`},
  {id:'swing',ev:'swingflip',need:1,rw:15,t:()=>'Сделай сальто на качелях'},
  {id:'ufo',ev:'ufoflip',need:2,rw:15,t:n=>`Сделай ${n} сальто на тарелке в космосе`},
  {id:'land',ev:'land',need:2,uniq:true,rw:20,t:n=>`Слетай на ${n} разные планеты`},
  {id:'hit',ev:'hit',need:6,rw:20,t:n=>`Попади Бананомётом в ${n} целей`,ok:()=>S.got.blaster},
  {id:'coins',ev:'coins',need:60,rw:15,t:n=>`Заработай ${n} монет`}
];
function dayKey(){const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
function dailyState(){const k=dayKey();let D=S.daily;
  if(!D||D.day!==k){const prev=D,r=rng(k.split('-').reduce((a,v)=>a*37+ +v,7)),pool=DAILY_POOL.filter(p=>!p.ok||p.ok()),pick3=[];
    while(pick3.length<3&&pool.length)pick3.push(pool.splice(Math.floor(r()*pool.length),1)[0]);
    const y=new Date(Date.now()-864e5),yk=y.getFullYear()+'-'+(y.getMonth()+1)+'-'+y.getDate();
    D=S.daily={day:k,tasks:pick3.map(p=>({id:p.id,n:0,seen:[],paid:false})),bonus:false,streak:prev&&prev.bonus&&prev.day===yk?prev.streak:0,full:(prev&&prev.full)||0};save()}
  return D}
/* event from gameplay; cheap when nothing matches */
function ev(name,v){if(!S||!S.prologue)return;const D=dailyState();let changed=false;
  for(const tk of D.tasks){const p=DAILY_POOL.find(x=>x.id===tk.id);if(!p||p.ev!==name||tk.n>=p.need)continue;
    if(p.uniq){if(tk.seen.includes(v))continue;tk.seen.push(v);tk.n++}else if(p.max)tk.n=Math.max(tk.n,v||0);else tk.n+=v||1;
    tk.n=Math.min(tk.n,p.need);changed=true;if(tk.n>=p.need){AU.sfx('quest');setTimeout(()=>banner('Задание дня выполнено',p.t(p.need),'Забери награду у доски заданий на базе'),400)}}
  if(changed){save();if(curScreen==='#daily')renderDaily()}}
function dailyReady(){const D=dailyState();return D.tasks.some(tk=>{const p=DAILY_POOL.find(x=>x.id===tk.id);return p&&tk.n>=p.need&&!tk.paid})||(!D.bonus&&D.tasks.every(t=>t.paid))}
function openDaily(){dailyState();openScreen('#daily');renderDaily()}
function renderDaily(){const D=dailyState();const sb=Math.min(35,D.streak*5);
  $('#dailyList').innerHTML=D.tasks.map((tk,i)=>{const p=DAILY_POOL.find(x=>x.id===tk.id),done=tk.n>=p.need;return`<div class="card daily ${tk.paid?'paid':''}"><div class="cardMain"><b>${p.t(p.need)}</b><span>${tk.paid?'Награда получена':done?'Готово!':`Прогресс: ${tk.n} из ${p.need}`}</span><div class="dbar"><i style="width:${tk.n/p.need*100}%"></i></div></div>
    ${tk.paid?'<span class="dok">✓</span>':`<button data-dpay="${i}" class="${done?'primary':''}" ${done?'':'disabled'}>+${p.rw} монет</button>`}</div>`}).join('');
  const all=D.tasks.every(t=>t.paid);
  $('#dailyBonus').innerHTML=`<div class="cardMain"><b>Все три задания</b><span>${D.bonus?'Бонус дня получен. Новые задания завтра':`+25 монет${sb?` и +${sb} за серию дней`:''}`}${D.full<5?` · дней до звёздной покраски тарелки: ${5-D.full}`:''}</span></div>${D.bonus?'<span class="dok">✓</span>':`<button id="dBonus" class="${all?'primary':''}" ${all?'':'disabled'}>Бонус</button>`}`;
  $('#dailyStreak').textContent=D.streak?`Серия: ${D.streak} ${D.streak===1?'день':D.streak<5?'дня':'дней'} подряд`:'Выполни все три задания, чтобы начать серию дней'}
$('#dailyList').addEventListener('click',e=>{const b=e.target.closest('[data-dpay]');if(!b)return;const D=dailyState(),tk=D.tasks[+b.dataset.dpay],p=DAILY_POOL.find(x=>x.id===tk.id);if(tk.paid||tk.n<p.need)return;tk.paid=true;addCoins.skip=true;addCoins(p.rw);addCoins.skip=false;AU.sfx('chest');save();renderDaily()});
$('#dailyBonus').addEventListener('click',e=>{if(!e.target.closest('#dBonus'))return;const D=dailyState();if(D.bonus||!D.tasks.every(t=>t.paid))return;D.bonus=true;D.streak++;D.full++;addCoins.skip=true;addCoins(25+Math.min(35,(D.streak-1)*5));addCoins.skip=false;AU.sfx('quest');
  if(D.full>=5&&!S.paints.starry){S.paints.starry=1;setTimeout(()=>banner('Награда за 5 дней','Звёздная покраска тарелки','Надень её в меню «Тарелка»'),300)}save();renderDaily()});
/* the board itself, next to the spawn on the base */
function buildDailyBoard(x,z){const ry=Math.atan2(0-x,6-z);
  for(const s of[-1,1])vis(G.box,0x6b4628,x+Math.cos(ry)*s*1.1,1.1,z-Math.sin(ry)*s*1.1,.16,2.2,.16,0,ry,0,.03,TX.bark);
  vis(G.box,0x9a6a3a,x,1.45,z,2.4,1.3,.1,0,ry,0,.03,TX.planks);vis(G.prism,0x8a3a2a,x,2.25,z,2.8,.5,.5,0,ry,0,.03,TX.shingle);
  const nm=[];for(let i=0;i<3;i++){const m=mesh(G.box,stdMat(0xfff6e0,{roughness:.9}),x+Math.cos(ry)*(i-1)*.72+Math.sin(ry)*.07,1.45+(i%2?.12:-.06),z-Math.sin(ry)*(i-1)*.72+Math.cos(ry)*.07,.56,.7,.02,L.group);m.rotation.set(0,ry,(i-1)*.06);nm.push(m)}
  const pin=textSprite('!',{size:44,h:.42,bg:'#ffd36b',fg:'#2a1606'});pin.position.set(x,2.9,z);L.group.add(pin);
  cyl(x,0,z,.9,2.4,0,{nv:true});
  tick(()=>{if(Math.hypot(P.x-x,P.z-z)>30)return;const D=dailyState();D.tasks.forEach((tk,i)=>{const p=DAILY_POOL.find(q=>q.id===tk.id);nm[i].material.color.set(tk.paid?0xb8e8a8:p&&tk.n>=p.need?0xffd36b:0xfff6e0)});pin.visible=dailyReady()});
  inter({x,y:.5,z,r:2.4,label:'E - доска заданий дня',act:openDaily})}
