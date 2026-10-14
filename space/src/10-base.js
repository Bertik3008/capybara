/* ---------- LEVEL: BASE «Пастбище» ---------- */
function buildBase(){
  newLevel('base');
  setSky({top:0x2b2068,hor:0xf2a07e,bot:0x3a2a5a,fog:0xc98f8a,near:55,far:200,hs:0xd2c2ff,hg:0x3d5a2c,hi:.85,sc:0xffd2a0,si:.95,sd:[-.5,.32,-.8],sunGlow:0xffb070,stars:true});
  L.spawn={x:0,y:0,z:6,yaw:0};
  path([[0,6],[0,-10]],1.6,0xb08a5a);path([[0,4],[-6,-2],[-10,-6]],1.4,0xb08a5a);path([[0,4],[6,-1],[11,-2]],1.4,0xb08a5a);path([[0,6],[-5,13],[-10,19]],1.2,0xb08a5a);path([[0,6],[5,11],[8,13]],1.2,0xb08a5a);
  skyBody(0xffb38a,[-190,95,-300],62,0xffe0b8);skyBody(0xd8e0ff,[220,140,-160],12);
  placeUFO(0,-14);
  /* shop */
  const wood=0xa0683c,dk=0x7a4a2a;
  box(-17.2,0,-6,.4,3.2,8.4,wood);box(-14.6,0,-10.1,5.6,3.2,.4,wood);box(-14.6,0,-1.9,5.6,3.2,.4,wood);
  box(-14.4,3.2,-6,6.6,.25,9,dk);for(let i=0;i<9;i++)vis(G.box,i%2?0xfff1d6:0xffab4a,-11.2,3.05,-9.9+i*.98,1.4,.12,.98,0,0,-.35);
  box(-12.1,0,-6,.8,1.1,7.4,dk);vis(G.box,0xc99a5a,-12.1,1.12,-6,.95,.06,7.6);
  for(let r=0;r<3;r++)vis(G.box,dk,-16.7,.8+r*.8,-6,.5,.06,7.6);
  const gc=[0xff6b6b,0x7fe3e8,0xb28cff,0x8ee08a,0xffd36b];for(let i=0;i<18;i++)vis(G.box,gc[i%5],-16.65,1.05+Math.floor(i/6)*.8,-9.2+(i%6)*1.25,.3,.42,.5);
  for(let i=0;i<4;i++)gvis(G.oct,gc[i],-12.1,1.35,-8.6+i*1.7,.12,.18,.12);
  sign(-10.6,0,-10.6,Math.PI/2,['ЛАВКА','ТЁТУШКИ ВЫДРЫ'],{fs:58,bg:'#ffab4a',fg:'#2a1606',w:2.2,h:1.1});
  npc('otter',-14.2,0,-6,{yaw:Math.PI/2,label:'E - лавка Тётушки Выдры',talk:()=>openShop(),r:3.4,mark:()=>!S.tr&&S.coins>=10?'!':null});
  /* barn */
  const bi=building({x:16,z:-2,w:10,d:12,h:5,col:0xb5452f,trim:0xf4ead8,door:'w',dw:3,dh:3.6,doorCol:0xf4ead8,roof:'flat',roofCol:0x6b3a22,rail:{gap:{side:'s',at:-3,w:1.2}},railCol:0xf4ead8,floor:0x9a7a4a});
  for(const zz of[-6,2]){vis(G.box,0xf4ead8,10.92,2.4,zz,.05,.16,3.6,Math.PI/5,0,0);vis(G.box,0xf4ead8,10.92,2.4,zz,.05,.16,3.6,-Math.PI/5,0,0)}
  trig(11.2,20.8,-.5,4,-7.8,3.8,{enter:()=>{tutBarn=true}});
  chest('b-ch1',13.6,0,-6.6,0,5);
  coinRow('b-f',[[13,0,-3],[14.2,0,-3],[15.4,0,-3]]);
  box(12.6,0,2.4,1.6,1,1.6,0xe8c870);vis(G.box,0xc9a850,12.6,.5,2.4,1.62,.12,1.62);box(14.3,0,2.4,1.6,2,1.6,0xe8c870);vis(G.box,0xc9a850,14.3,1.0,2.4,1.62,.12,1.62);vis(G.box,0xc9a850,14.3,1.6,2.4,1.62,.12,1.62);
  box(18,2.7,1.3,5.6,.3,4.8,0x8a6a4a);for(const p of[[15.4,-.8],[15.4,3.5],[20.6,-.8]])cyl(p[0],0,p[1],.14,2.7,0x6b4628);
  railRect(15.25,-1.05,20.8,3.7,3,0x6b4628,{side:'w',at:1.6,w:2.6});
  coinRow('b-l',[[16.2,3,0],[17.2,3,0],[18.2,3,0],[19.2,3,0],[16.2,3,1.4]]);
  chest('b-ch2',19.8,3,2.6,-Math.PI/2,5);
  vis(G.box,0xe8c870,19.5,.5,-6.6,1.6,1,1.6);box(19.5,0,-6.6,1.6,1,1.6,0,{nv:true});
  ladder(13,4.38,0,5.3,0,0x6b4628);
  coinRow('b-r',[[14,5.3,-5],[16,5.3,-5],[18,5.3,-5]]);
  vis(G.cyl,0x6b4628,19,6.3,-6,.05,2,.05);vis(G.cone,0xffd36b,19.3,7.2,-6,.1,.5,.1,0,0,-Math.PI/2);
  /* radio tower with the Mole */
  const tx=-10,tz=20;for(const a of[-1,1])for(const b of[-1,1])cyl(tx+a*1.3,0,tz+b*1.3,.12,8,0x8a8aa0);
  for(let y=1.5;y<8;y+=2.2)for(const s of[-1,1]){vis(G.box,0x8a8aa0,tx,y,tz+s*1.3,2.6,.08,.08,0,0,.6*s);vis(G.box,0x8a8aa0,tx+s*1.3,y,tz,.08,.08,2.6,.6*s,0,0)}
  box(tx,8,tz,3.4,.25,3.4,0x6b6b80);railRect(tx-1.7,tz-1.7,tx+1.7,tz+1.7,8.25,0xffab4a,{side:'s',at:0,w:1.2});ladder(tx,tz+1.95,0,8.25,0,0x8a8aa0);
  vis(G.cyl,0x8a8aa0,tx+1.2,10,tz-1.2,.06,3.6,.06);vis(G.hemi,0xdfe6ef,tx+1.2,11.4,tz-1.2,.7,.25,.7,1.2,0,0);const bl=glow(0xff4a4a,1.2,.9);bl.position.set(tx+1.2,11.9,tz-1.2);L.group.add(bl);tick(t=>{bl.material.opacity=Math.sin(t*4)>0?.95:.15});
  const mole=npc('mole',tx-.6,8.25,tz-.7,{yaw:0,pose:'sit',talk:moleTalk,mark:()=>qs('s0')===0?'!':qs('s0')===1&&Object.keys(S.souv).length>=4?'?':null});
  /* pond */
  water(9,16,5,{safe:true,col:0x4cb3d6});for(let i=0;i<20;i++){const a=i/20*TAU;vis(G.dod,0x8d8a99,9+Math.cos(a)*5.3,.1,16+Math.sin(a)*5.3,.45,.3,.45,0,i)}
  for(let i=0;i<5;i++){const a=i*1.3;vis(G.cyl,0x3f8a6a,9+Math.cos(a)*2.5,.05,16+Math.sin(a)*2.2,.5,.03,.5)}
  /* decor */
  const D=S.decor;
  if(D.lights){for(let i=0;i<8;i++){const a=i/8*TAU;const x=Math.cos(a)*6.3,z=-14+Math.sin(a)*6.3;vis(G.cyl,0x6b4628,x,1.5,z,.06,3,.06);const a2=(i+1)/8*TAU,x2=Math.cos(a2)*6.3,z2=-14+Math.sin(a2)*6.3;for(let k=1;k<6;k++){const t=k/6;gvis(G.sph,[0xff6b6b,0xffd36b,0x7fe3e8,0x8ee08a,0xb28cff][k%5],lerp(x,x2,t),2.9-Math.sin(t*Math.PI)*.5,lerp(z,z2,t),.1,.1,.1)}}}
  if(D.tree)tree(-4,17,1.3,0x3f7a35,{fruit:0xff9a2e});
  if(D.hammock){tree(-21,9,1.1,0x3f7a35);tree(-21,14.5,1.1,0x3f7a35);vis(G.box,0xe8d8b8,-21,1.0,11.75,1,.08,4.2);vis(G.box,0xc94f3a,-21,1.02,11.75,.9,.06,3.8);box(-21,0,11.75,1,1.05,4,0,{nv:true})}
  if(D.fountain){cyl(-6,0,5,2,.6,0x9a96a8,{g:G.cyl16});vis(G.disc,0x6fc8e8,-6,.62,5,1.75,.02,1.75);cyl(-6,0,5,.3,1.8,0x9a96a8);vis(G.cyl16,0x9a96a8,-6,1.8,5,.9,.15,.9);tick(t=>{if(Math.random()<.5)FXW.burst(-6,2,5,{col:0x9fd8ff,n:2,spd:1.2,up:3,g:8,life:.8,size:.18})})}
  if(D.onsen){cyl(17.5,0,17,2.4,.5,0x7a7684,{g:G.cyl16});vis(G.disc,0x8fd6e0,17.5,.48,17,2.1,.02,2.1);for(let i=0;i<10;i++){const a=i/10*TAU;vis(G.dod,0x6a6674,17.5+Math.cos(a)*2.5,.45,17+Math.sin(a)*2.5,.5,.4,.5)}tick(t=>{if(Math.random()<.25)FXW.burst(17.5+(Math.random()-.5)*3,.6,17+(Math.random()-.5)*3,{col:0xaaaaaa,n:1,spd:.3,up:.8,g:-.3,life:2,size:.7})})}
  if(D.telescope){vis(G.cyl,0x5a5a6a,18.5,5.9,0,.06,1.2,.06);vis(G.cyl,0xb28cff,18.5,6.7,0,.18,1.6,.18,.9,0,0);vis(G.cyl,0x333344,18.5,6.65,.75,.2,.1,.2,.9,0,0)}
  /* brothers */
  const B=[];
  if(S.rescued.p1)B.push(npc('yuzik',6.5,0,12,{yaw:2.3,pose:'sit',talk:n=>talk(n,[['yuzik',pick(['Капик, а на базе мандарины есть? Купи дерево у Выдры, а?','Я посторожу пруд. И мандарины, если найдутся.','На Мандарине я видел золотой мандарин. Высоко-высоко, на самой крыше ветряка.'])]])}));
  if(S.rescued.p2)B.push(D.onsen?npc('snezhok',17.5,.1,17,{yaw:-2.5,pose:'sit',nc:true,talk:n=>talk(n,[['snezhok','Горячий источник! Капик, ты лучший брат во всей галактике.']])}):npc('snezhok',12.5,0,10.5,{yaw:-.6,pose:'sit',talk:n=>talk(n,[['snezhok',pick(['Тут тепло. Но я всё равно не сниму шарф.','Апчхи! Это не простуда, это радость.','Выдра говорит, бывают горячие источники. Вот бы такой у пруда.'])]])}));
  if(S.rescued.p3)B.push(D.hammock?npc('gribok',-21,1.05,11.75,{yaw:Math.PI,pose:'lie',nc:true,talk:n=>talk(n,[['gribok','Хр-р... Гамак... лучший подарок... хр-р...']])}):npc('gribok',-6,0,11,{yaw:.5,pose:'lie',talk:n=>talk(n,[['gribok',pick(['Мм... можно я посплю прямо тут, на траве?','Улитки научили меня жить медленно. Очень медленно.','Хорошо бы гамак. Только никому не говори.'])]])}));
  if(S.rescued.p4)B.push(npc('vintik',4.5,0,-8.5,{yaw:-.6,pose:'hammer',talk:n=>talk(n,[['vintik',pick(['Я открутил у тарелки одну лишнюю гайку. Она точно была лишней.','Если поставить на тарелку форсаж, она полетит быстрее! В лавке есть.','Магнетрон спит. Я оставил ему записку: «Не балуйся».'])]])}));
  /* scenery */
  const r=rng(11),avoid=[[0,-14,7],[-14,-6,6],[16,-2,9],[9,16,7],[-10,20,4],[0,6,4],[-6,5,3],[17.5,17,3.5],[-21,11.75,4],[-4,17,3]];
  scatter(r,40,22,58,avoid,(x,z,s)=>tree(x,z,s*1.15,pick([0x3f7a35,0x4a8a3c,0x5a9a40]),{fruit:r()<.25?0xffd36b:null}));
  scatter(r,18,12,58,avoid,(x,z,s)=>rock(x,z,s*.8,0x7d7a8c));
  scatter(r,14,8,40,avoid,(x,z,s)=>vis(G.ico1,0x4a8a3c,x,.4*s,z,.8*s,.6*s,.8*s));
  sign(2.6,0,7.5,-.4,['ПАСТБИЩЕ','астероид-база'],{fs:56,w:1.8,h:.9});
  vis(G.box,0x4a7bd1,-3,1.0,7.2,.5,.4,.35);vis(G.cyl,0x6b4628,-3,.4,7.2,.05,.8,.05);
  fence(-26,-20,-26,-30,0xa0683c);fence(-26,-30,-16,-30,0xa0683c);
  flowers(r,90,[0xffd36b,0xff8fb1,0xb28cff,0xffffff],4,48);
  grass(700,[0x6fae52,0x5a9a40,0x7fbf5a],12);
  makeGround({c1:0x5f9a48,c2:0x4c8a3c,mount:0x6b5a7a,snow:0xd8c8e8,path:0xb08a5a,seed:3,snowY:15,mh:20});
  finishLevel();
  AU.music('base');AU.ambient('birds');
  L.objective=()=>{
    if(!S.tr){if(S.coins<10){if(!S.got['b-ch1'])return{text:'Найди монеты: загляни в амбар справа',pos:[11,1.6,-2]};return{text:'Собери монеты на сеновале амбара',pos:[18,4.2,1]}}return{text:'Купи универсальный переводчик у Тётушки Выдры',pos:[-11,1.8,-6]}}
    if(qs('s0')===1&&Object.keys(S.souv).length>=4)return{text:'Отнеси сувениры Радисту Кроту на вышку',pos:[tx,9.5,tz]};
    const nx=PIDS.find(p=>!S.rescued[p]);if(!nx)return{text:'Все братья дома. В галактике остались сувениры и кольца',pos:null,tag:'Свободная игра'};
    return{text:`Удерживай E у тарелки и лети на планету ${PL[nx].name}`,pos:[0,3.2,-14]}};
}
function moleTalk(n){const st=qs('s0'),cnt=Object.keys(S.souv).length;
  if(st===0){talk(n,[['mole','А? Кто тут? А, Капик. Я Радист Крот, слушаю космос с этой вышки.'],['mole','По радио болтают, что на каждой из четырёх планет спрятан сувенир. Всегда на самом верху, куда без Пружинных лап не допрыгнуть.'],['mole','Принеси мне все четыре, и я отдам тебе свои сбережения. Сорок монет!'],['kapik','Договорились. Только лапы сначала куплю.']],()=>qset('s0',1));return}
  if(st===1&&cnt>=4){talk(n,[['mole','Мандарин, снежинка, спора и шестерёнка! Как по радио.'],['mole','Держи монеты. А сувениры я повешу на антенну, пусть вся галактика видит.']],()=>{qset('s0',2);qcomplete('s0')});return}
  if(st===1){talk(n,[['mole',`Сувениров у тебя ${cnt} из 4. Ищи на самых высоких крышах, шапках и трубах.`]]);return}
  talk(n,[['mole',pick(['Ш-ш-ш... ловлю волну. Кажется, где-то в поясе астероидов летает мусор с монетами.','Говорят, у каждой планеты есть кольца для гонок. Пролетишь все - получишь награду.','В телескоп с крыши амбара видно все планеты. Красота.'])]])}
