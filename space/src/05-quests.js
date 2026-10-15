/* ---------- QUESTS ---------- */
const QUESTS={
  m0:{t:'Голос галактики',pl:'base',main:1,giver:'otter',rw:0,steps:['Поговори с Тётушкой Выдрой в лавке','Собери 8 звёздных ягод','Отнеси ягоды Тётушке Выдре','Купи универсальный переводчик']},
  s0:{t:'Сувениры для Крота',pl:'base',giver:'mole',rw:40,steps:['Найди 4 сувенира, по одному на каждой планете. Они спрятаны высоко','Принеси сувениры Радисту Кроту на вышку']},
  m1:{t:'Юзик на ветряке',pl:'p1',main:1,giver:'citron',rw:15,steps:['Найди фермера Цитрона: он чинит крышу амбара','Загони 5 мандаринчиков в загон у ветряка','Поднимись на лифте ветряка к Юзику']},
  s1a:{t:'Пропавшее ведро',pl:'p1',giver:'grushka',rw:8,steps:['Найди ведро краски на крыше теплицы','Отнеси ведро Грушке на водонапорную башню']},
  s1b:{t:'Гонка по саду',pl:'p1',giver:'morkovka',rw:12,steps:['Пробеги через 6 флажков за 45 секунд']},
  m2:{t:'Снежок на льдине',pl:'p2',main:1,giver:'brr',rw:15,steps:['Поднимись к Старейшине Брр на ледяную башню','Переберись через Звонкое озеро к Снежку']},
  s2a:{t:'Снежный тир',pl:'p2',giver:'fyu',rw:10,steps:['Сбей 6 сосулек-мишеней снежками за 50 секунд']},
  s2b:{t:'Подлёдная рыбалка',pl:'p2',giver:'usach',rw:12,steps:['Поймай 3 рыбы в проруби у хижины Усача']},
  m3:{t:'Сон Грибка',pl:'p3',main:1,giver:'sliz',rw:15,steps:['Найди Старейшину Слизь на шляпке гриба','Зажги 3 цветка-фонаря на вершинах грибов','Поднимись по летающим шляпкам и разбуди Грибка']},
  s3a:{t:'Банка светлячков',pl:'p3',giver:'kvaba',rw:10,steps:['Поймай 8 светлячков в грибном лесу','Вернись к бабушке Ква-Ба']},
  s3b:{t:'Лягушачьи гонки',pl:'p3',giver:'kvak',rw:12,steps:['Обгони Квака до флага у пруда']},
  m4:{t:'Винтик в капсуле',pl:'p4',main:1,giver:'shurup',rw:15,steps:['Найди енота Шурупа на кабине крана','Вставь 3 энергоядра в гнёзда у башни','Поднимись на лифте башни и открой капсулу']},
  s4a:{t:'Сломанные уборщики',pl:'p4',giver:'bolt',rw:12,steps:['Почини 4 робота-уборщика','Вернись к Болтику']},
  s4b:{t:'Срочная доставка',pl:'p4',giver:'posylkin',rw:10,steps:['Отнеси ящик с гайками со склада на крышу цеха']},
  c2:{t:'Глава 2. Насморк Великого Пуха',pl:'p5',main:1,giver:'pushinka',rw:50,steps:['Поговори с Радистом Кротом на вышке','Лети на новую планету Одуванчия','Найди Хранительницу Пушинку у стебля Великого Пуха','Принеси Пушинке мандариновый сок и светоэликсир','Поставь пуховый фильтр на трубу завода на Шестерёнке','Поднимись по стеблю Великого Пуха и дай ему лекарство']},
  c3:{t:'Глава 3. Бессонный король Магмары',pl:'p6',main:1,giver:'rogozhar',rw:60,steps:['Лети на базу: братья пропали','Лети на Бананию: Профессор Макакин знает, где Бананомёт','Найди 3 золотых банана и открой древний храм','Лети на огненную планету Магмара','Остуди 3 лавовых фонтана у ворот замка','Войди в замок и остуди Короля Рогожара пломбиром']},
  c4:{t:'Глава 4. Тень Космического Чиха',pl:'p8',main:1,giver:'dedushka',rw:100,steps:['Поговори с Радистом Кротом: звёзды гаснут','Лети к Разлому над звездой','Собери 4 искры братьев на островах Изнанки','Пройди по мосту света и зажги 4 столпа','Победи Тень Космического Чиха']},
  s5a:{t:'Бельчата на ветру',pl:'p5',giver:'oreshka',rw:15,steps:['Найди трёх бельчат и отправь их домой','Вернись к Белке Орешке']},
  s5b:{t:'Пуховые подушки',pl:'p5',giver:'shishkin',rw:18,steps:['Сделай 2 пуховые подушки в подушечной и отдай Деду Шишкину']}
};
const qs=id=>S.q[id]||0, qdone=id=>S.q[id]===99;
function qd(id){return S.qd[id]||(S.qd[id]={})}
function qset(id,v){const was=S.q[id]||0;S.q[id]=v;save();if(was===0&&v>0){AU.sfx('ui');banner('Новое задание',QUESTS[id].t,QUESTS[id].steps[Math.min(v,QUESTS[id].steps.length)-1])}UI.objFlash()}
function qcomplete(id){if(qdone(id))return;S.q[id]=99;const rw=QUESTS[id].rw;save();AU.sfx('quest');banner('Задание выполнено',QUESTS[id].t,rw?'+'+coinsWord(rw):'');if(rw)setTimeout(()=>addCoins(rw),400);UI.objFlash()}
const nRescued=()=>PIDS.filter(p=>S.rescued[p]).length;
function rescueBro(pid,n){S.rescued[pid]=1;const id='m'+pid[1];if(qs(id)!==99){S.q[id]=98}qcomplete(id);AU.sfx('beam');UI.bros();
  if(n){n.hold=true;const c=n.c.root;const b=mesh(G.cyl,new THREE.MeshBasicMaterial({color:0x9ff3ff,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}),c.position.x,c.position.y+8,c.position.z,1.1,16,1.1,L.group);const y0=c.position.y;
    if(n.col)n.col.on=false;if(n.it)L.inters.splice(L.inters.indexOf(n.it),1);
    tween(1.6,p=>{b.material.opacity=Math.sin(p*Math.PI)*.5;c.position.y=y0+p*6;c.scale.setScalar(1-p*.9);c.rotation.y+=.2},()=>{c.visible=false;b.visible=false;FXW.burst(c.position.x,c.position.y,c.position.z,{col:0x9ff3ff,n:30,spd:4,life:1})})}
  setTimeout(()=>{if(nRescued()===4)banner('Все братья спасены','Лети домой, на базу','Братья ждут Капика у пруда');else toast(`${CAST[PL[pid].bro].name} телепортирован домой, на базу`)},2200)}
function mobCollide(m,r){for(const c of L.solids){if(!c.on||c.y0>.6||c.y1<.2)continue;if(c.k==='c'){const dx=m.x-c.x,dz=m.z-c.z,d=Math.hypot(dx,dz),mm=c.r+r;if(d<mm&&d>1e-4){m.x=c.x+dx/d*mm;m.z=c.z+dz/d*mm}}
  else{const nx=clamp(m.x,c.x0,c.x1),nz=clamp(m.z,c.z0,c.z1),dx=m.x-nx,dz=m.z-nz,d=Math.hypot(dx,dz);if(d<r){if(d>1e-4){m.x=nx+dx/d*r;m.z=nz+dz/d*r}else{m.x+=r}}}}
  const d=Math.hypot(m.x,m.z);if(d>55){m.x*=55/d;m.z*=55/d}}
const SOUV={p1:{name:'Золотой мандарин',item:'gold_mandarin'},p2:{name:'Звёздная снежинка',item:'snowflake'},p3:{name:'Светящаяся спора',item:'spore'},p4:{name:'Золотая шестерёнка',item:'gear'}};
function souvenir(pid,x,y,z){const p=itemPick('souv-'+pid,x,y,z,ITEMS[SOUV[pid].item](),null,()=>{S.souv[pid]=1;save();banner('Сувенир найден',SOUV[pid].name,qs('s0')?`Сувениров: ${Object.keys(S.souv).length} из 4`:'Радист Крот на базе собирает такие')});return p}
