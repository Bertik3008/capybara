/* ---------- LEVEL: BASE «Пастбище» ---------- */
function buildBase(){
  newLevel('base');
  setSky({top:0x2b2068,hor:0xf2a07e,bot:0x3a2a5a,fog:0xc98f8a,near:60,far:210,hs:0xd2c2ff,hg:0x3d5a2c,hi:.75,sc:0xffd2a0,si:.95,sd:[-.5,.32,-.8],sunGlow:0xffb070,stars:true,clouds:14,cloudCol:0xffc8b0});
  L.spawn={x:0,y:0,z:6,yaw:0};L.pathKind='dirt';
  path([[0,6],[0,-10]],1.6);path([[0,4],[-6,-2],[-10,-6]],1.3);path([[0,4],[6,-1],[11,-2]],1.3);path([[0,6],[-5,13],[-10,19]],1.1);path([[0,6],[5,10],[8.6,10.4]],1.1);path([[6,-1],[14,6],[20,10]],1.1);
  skyBody(0xffb38a,[-190,95,-300],62,0xffe0b8);skyBody(0xd8e0ff,[220,140,-160],12);
  placeUFO(0,-14);
  if(qs('c3')===1){vis(G.disc,0x1a1414,3.5,.03,-5.5,2.2,.02,1.6);const nt=mesh(G.box,stdMat(0xe8d8b0,{roughness:1}),3.5,.06,-5.5,.5,.02,.36,L.group);nt.rotation.y=.4;mesh(G.box,stdMat(0x3a1a10),3.62,.075,-5.42,.18,.01,.12,L.group);
    tick((t,dt)=>{if(qs('c3')===1&&Math.random()<dt*4)FXW.burst(3.5+(Math.random()-.5)*2,.2,-5.5+(Math.random()-.5)*1.4,{col:0x554444,n:1,spd:.2,up:1.2,g:-.3,life:2.2,size:.7})});
    inter({x:3.5,y:0,z:-5.5,r:2.2,label:'E - прочитать обгоревшую записку',cond:()=>qs('c3')===1,act:()=>say([['kapik','Бумага ещё тёплая... Тут пахнет углём и серой.'],['rogozhar','«Пушистикам. Я, Король Рогожар, забрал четырёх самых спокойных капибар галактики на Магмару. Мне нужен покой. Не ищи. Всё равно сгоришь!»'],['kapik','Ну уж нет. Против огня нужно что-то очень холодное...'],['kapik','Точно! Тётушка Выдра рассказывала про Профессора Макакина с Банании. Он изобрёл Бананомёт, который стреляет мороженым!']],()=>{qset('c3',2);banner('Глава 3','Бессонный король Магмары','Новая планета на карте: Банания')})})}
  /* shop */
  const wood=0xa0683c,dk=0x7a4a2a;
  box(-17.2,0,-6,.4,3.2,8.4,wood,{tex:TX.planks});box(-14.6,0,-10.1,5.6,3.2,.4,wood,{tex:TX.planks});box(-14.6,0,-1.9,5.6,3.2,.4,wood,{tex:TX.planks});
  box(-14.4,3.2,-6,6.6,.25,9,dk,{tex:TX.planks});for(let i=0;i<9;i++)vis(G.box,i%2?0xfff1d6:0xffab4a,-11.2,3.05,-9.9+i*.98,1.4,.12,.98,0,0,-.35,.02,TX.stripes);
  box(-12.1,0,-6,.8,1.1,7.4,dk,{tex:TX.planks});vis(G.box,0xc99a5a,-12.1,1.12,-6,.95,.06,7.6,0,0,0,.02,TX.planks);
  for(let r=0;r<3;r++)vis(G.box,dk,-16.7,.8+r*.8,-6,.5,.06,7.6,0,0,0,.02,TX.planks);
  const gc=[0xff6b6b,0x7fe3e8,0xb28cff,0x8ee08a,0xffd36b];for(let i=0;i<18;i++)vis(G.box,gc[i%5],-16.65,1.05+Math.floor(i/6)*.8,-9.2+(i%6)*1.25,.3,.42,.5);
  for(let i=0;i<4;i++)gvis(G.oct,gc[i],-12.1,1.35,-8.6+i*1.7,.12,.18,.12);
  for(let i=0;i<3;i++){vis(G.cyl,0x7a4a2a,-11,.4,-1.2+i*.0-i*.9,.3,.8,.3,0,0,0,.03,TX.planks);vis(G.sph,0x7aa8ff,-11,.85,-1.2-i*.9,.25,.12,.25)}
  sign(-10.6,0,-10.6,Math.PI/2,['ЛАВКА','ТЁТУШКИ ВЫДРЫ'],{fs:58,bg:'#ffab4a',fg:'#2a1606',w:2.2,h:1.1});
  const lamp=glow(0xffc070,3,.5);lamp.position.set(-12.2,2.8,-6);L.group.add(lamp);
  npc('otter',-14.2,0,-6,{yaw:Math.PI/2,label:'E - лавка Тётушки Выдры',talk:otterTalk,r:3.4,trader:1,mark:()=>{const st=qs('m0');return st<2?'!':st===2&&(S.inv.berry||0)>=8?'?':null}});
  /* barn: hay loft with grandpa's fishing rod */
  building({x:16,z:-2,w:10,d:12,h:5,col:0xb5452f,trim:0xf4ead8,door:'w',dw:3,dh:3.6,doorCol:0xf4ead8,roof:'flat',roofCol:0x6b3a22,rail:{gap:{side:'s',at:-3,w:1.2}},railCol:0xf4ead8,floor:0x9a7a4a,tex:TX.planks});
  for(const zz of[-6,2]){vis(G.box,0xf4ead8,10.92,2.4,zz,.05,.16,3.6,Math.PI/5,0,0);vis(G.box,0xf4ead8,10.92,2.4,zz,.05,.16,3.6,-Math.PI/5,0,0)}
  trig(11.2,20.8,-.5,4,-7.8,3.8,{enter:()=>{tutBarn=true}});
  const hay={tex:TX.straw};box(12.6,0,2.4,1.6,1,1.6,0xe8c870,hay);box(14.3,0,2.4,1.6,2,1.6,0xe8c870,hay);box(19.5,0,-6.6,1.6,1,1.6,0xe8c870,hay);box(19.5,1,-6.6,1.6,1,1.6,0xdcb860,hay);box(17.6,0,-6.8,1.6,1,1.4,0xdcb860,hay);
  box(18,2.7,1.3,5.6,.3,4.8,0x8a6a4a,{tex:TX.planks});for(const p of[[15.4,-.8],[15.4,3.5],[20.6,-.8]])cyl(p[0],0,p[1],.14,2.7,0x6b4628,{tex:TX.bark});
  railRect(15.25,-1.05,20.8,3.7,3,0x6b4628,{side:'w',at:1.6,w:2.6});
  vis(G.box,0x8a5a32,19.6,3.4,2.6,1.2,.8,.8,0,0,0,.03,TX.planks);
  itemPick('rod',19.4,3.85,2.6,ITEMS.rod(),null,()=>{banner('Находка','Дедушкина удочка','Теперь можно рыбачить у пирса на пруду и в проруби на Ледоре');AU.sfx('quest')});
  ladder(13,4.38,0,5.3,0,0x6b4628);
  vis(G.cyl,0x6b4628,19,6.3,-6,.05,2,.05);vis(G.cone,0xffd36b,19.3,7.2,-6,.1,.5,.1,0,0,-Math.PI/2);
  for(let i=0;i<4;i++)vis(G.cyl,0x9aa6ad,13+i*.9,.5,-7.4,.32,1,.32,0,0,0,.03,TX.corr);
  /* berry meadow */
  const bush=[[21,0,9],[24,0,5],[26.5,0,11],[22.5,0,15],[27,0,17],[19.5,0,20]];if(S.decor.garden)bush.push([13,0,-11],[16,0,-11.5],[19,0,-11],[22,0,-11.5]);
  bush.forEach(b=>node('berry',b[0],b[1],b[2],{regrow:55}));
  fence(18,6,30,6,0xa0683c,{nc:true});sign(18.5,0,5,0,['ЗВЁЗДНЫЕ','ЯГОДЫ'],{fs:56,w:1.4,h:.7,bg:'#3a5a8a'});
  /* pond pier for fishing */
  water(9,16,5,{safe:true,col:0x5cc3e6,deep:0x1a5a7a});for(let i=0;i<22;i++){const a=i/22*TAU;vis(G.dod,0x8d8a99,9+Math.cos(a)*5.3,.1,16+Math.sin(a)*5.3,.45,.3,.45,0,i,0,.05,TX.stone)}
  for(let i=0;i<5;i++){const a=i*1.3;vis(G.cyl,0x3f8a6a,9+Math.cos(a)*2.5,.06,16+Math.sin(a)*2.2,.5,.03,.5)}
  box(9,0,12.2,1.6,.35,3.2,0x9a6a3a,{tex:TX.planks,surf:'wood'});for(const s of[-1,1])vis(G.cyl,0x6b4628,9+s*.7,.2,13.6,.08,.9,.08,0,0,0,.02,TX.bark);
  fishingSpot(9,.35,13.4,{r:1.8});
  /* radio tower with the Mole */
  const tx=-10,tz=20;for(const a of[-1,1])for(const b of[-1,1])cyl(tx+a*1.3,0,tz+b*1.3,.12,8,0x8a8aa0,{tex:TX.metal});
  for(let y=1.5;y<8;y+=2.2)for(const s of[-1,1]){vis(G.box,0x8a8aa0,tx,y,tz+s*1.3,2.6,.08,.08,0,0,.6*s,.02,TX.metal);vis(G.box,0x8a8aa0,tx+s*1.3,y,tz,.08,.08,2.6,.6*s,0,0,.02,TX.metal)}
  box(tx,8,tz,3.4,.25,3.4,0x6b6b80,{tex:TX.metal});railRect(tx-1.7,tz-1.7,tx+1.7,tz+1.7,8.25,0xffab4a,{side:'s',at:0,w:1.2});ladder(tx,tz+1.95,0,8.25,0,0x8a8aa0);
  vis(G.cyl,0x8a8aa0,tx+1.2,10,tz-1.2,.06,3.6,.06);vis(G.hemi,0xdfe6ef,tx+1.2,11.4,tz-1.2,.7,.25,.7,1.2,0,0,.02,TX.metal);const bl=glow(0xff4a4a,1.2,.9);bl.position.set(tx+1.2,11.9,tz-1.2);L.group.add(bl);tick(t=>{bl.material.opacity=Math.sin(t*4)>0?.95:.15});
  npc('mole',tx-.6,8.25,tz-.7,{yaw:0,pose:'sit',talk:moleTalk,mark:()=>qs('c4')===1||qs('c2')===1?'!':qs('s0')===0&&S.tr?'!':qs('s0')===1&&Object.keys(S.souv).length>=4?'?':null});
  /* decor */
  const D=S.decor;
  if(D.lights){for(let i=0;i<8;i++){const a=i/8*TAU;const x=Math.cos(a)*6.3,z=-14+Math.sin(a)*6.3;vis(G.cyl,0x6b4628,x,1.5,z,.06,3,.06);const a2=(i+1)/8*TAU,x2=Math.cos(a2)*6.3,z2=-14+Math.sin(a2)*6.3;for(let k=1;k<6;k++){const t=k/6;gvis(G.sph,[0xff6b6b,0xffd36b,0x7fe3e8,0x8ee08a,0xb28cff][k%5],lerp(x,x2,t),2.9-Math.sin(t*Math.PI)*.5,lerp(z,z2,t),.1,.1,.1)}}}
  if(D.tree)fruitTree(-4,17,1.3);
  if(D.hammock){tree(-22.6,8.3,1.1,0x3f7a35);tree(-22.6,15.2,1.1,0x3f7a35);
    const HX=-21,Z0=9.4,Z1=14.1,top=1.75,end=1.05,mid=.62;for(const z of[Z0,Z1]){cyl(HX,0,z,.12,top+.15,0x6b4628,{tex:TX.bark});for(const s of[-1,1])vis(G.box,0x6b4628,HX+s*.35,.55,z+(z<12?-.25:.25),.08,1.3,.08,s*.45,0,(z<12?1:-1)*.3,.02,TX.bark)}
    const za=Z0+.55,zb=Z1-.55,N=9,yAt=t=>end-(end-mid)*Math.sin(t*Math.PI);
    for(const z of[Z0,Z1]){const ze=z<12?za:zb,dy=top-end,dz=ze-z,len=Math.hypot(dy,dz);for(const s of[-.35,0,.35])vis(G.cyl,0xd8c8a0,HX+s*.6,(top+end)/2,(z+ze)/2,.018,len,.018,Math.atan2(-dz,dy),0,0)}
    for(let i=0;i<N;i++){const t0=i/N,t1=(i+1)/N,z0=lerp(za,zb,t0),z1=lerp(za,zb,t1),y0=yAt(t0),y1=yAt(t1),len=Math.hypot(z1-z0,y1-y0)+.02,ang=Math.atan2(y1-y0,z1-z0);
      vis(G.box,i%2?0xc94f3a:0xe8d8b8,HX,(y0+y1)/2,(z0+z1)/2,1.05,.05,len,-ang,0,0,.02);vis(G.box,0x8a6a4a,HX-.53,(y0+y1)/2+.03,(z0+z1)/2,.04,.06,len,-ang,0,0);vis(G.box,0x8a6a4a,HX+.53,(y0+y1)/2+.03,(z0+z1)/2,.04,.06,len,-ang,0,0)}
    box(HX,0,11.75,1,.6,4,0,{nv:true})}
  if(D.fountain){cyl(-6,0,5,2,.6,0x9a96a8,{g:G.cyl16,tex:TX.stone});water(-6,5,1.75,{safe:true,y:.62,col:0x6fd8f0});cyl(-6,0,5,.3,1.8,0x9a96a8,{tex:TX.stone});vis(G.cyl16,0x9a96a8,-6,1.8,5,.9,.15,.9,0,0,0,.02,TX.stone);tick(t=>{if(Math.random()<.5)FXW.burst(-6,2,5,{col:0x9fd8ff,n:2,spd:1.2,up:3,g:8,life:.8,size:.18})})}
  if(D.onsen){cyl(17.5,0,17,2.4,.5,0x7a7684,{g:G.cyl16,tex:TX.stone});water(17.5,17,2.1,{safe:true,y:.48,col:0x8fe6f0});for(let i=0;i<10;i++){const a=i/10*TAU;vis(G.dod,0x6a6674,17.5+Math.cos(a)*2.5,.45,17+Math.sin(a)*2.5,.5,.4,.5,0,i,0,.04,TX.stone)}tick(t=>{if(Math.random()<.25)FXW.burst(17.5+(Math.random()-.5)*3,.6,17+(Math.random()-.5)*3,{col:0xaaaaaa,n:1,spd:.3,up:.8,g:-.3,life:2,size:.7})})}
  if(D.telescope){const TX0=7,TZ0=-7;cyl(TX0,0,TZ0,1.3,.12,0x9a96a8,{g:G.cyl16,tex:TX.stone});
    for(let i=0;i<3;i++){const a=i/3*TAU+.3,fx=TX0+Math.cos(a)*.7,fz=TZ0+Math.sin(a)*.7;const len=Math.hypot(.7,1.3);vis(G.cyl,0x5a4630,(fx+TX0)/2,.12+.65,(fz+TZ0)/2,.045,len,.045,Math.sin(a)*Math.atan2(.7,1.3)*-1,0,Math.cos(a)*Math.atan2(.7,1.3),.02,TX.bark)}
    vis(G.sph,0x3a3a4a,TX0,1.45,TZ0,.16,.16,.16);const tube=new THREE.Group();tube.position.set(TX0,1.55,TZ0);tube.rotation.set(-.6,.8,0,'YXZ');L.group.add(tube);
    mesh(G.cyl16,stdMat(0xb28cff,{metalness:.5,roughness:.35}),0,0,-.2,.14,1.5,.14,tube).rotation.x=Math.PI/2;mesh(G.cyl16,stdMat(0xffd36b,{metalness:.7,roughness:.3}),0,0,.58,.18,.12,.18,tube).rotation.x=Math.PI/2;mesh(G.cyl16,stdMat(0xffd36b,{metalness:.7,roughness:.3}),0,0,-.9,.12,.1,.12,tube).rotation.x=Math.PI/2;
    mesh(G.disc,bmat(0x9fe9ff),0,0,.65,.15,.01,.15,tube).rotation.x=Math.PI/2;mesh(G.cyl,stdMat(0x2a2a33),0,-.06,-1.0,.05,.16,.05,tube).rotation.x=Math.PI/2;
    mergeModel(tube);inter({x:TX0,y:.5,z:TZ0,r:2.2,label:'E - посмотреть в телескоп',act:()=>SPX.scopeStart()})}
  /* brothers live in the yard now */
  const Y=buildYard();buildBrothers(Y,D);
  if(qdone('c4')){const tn=npc('tenek',2,0,8,{nc:true,r:2.2,talk:n=>talk(n,[['tenek',pick(['Здесь так светло... И никто не уходит.','Я научился не чихать! Почти. Апч... нет, показалось.','Можно я посижу в твоей тени? Ой, это же я тень.','Юзик дал мне мандарин. Я не знаю, что с ним делать, но мне приятно.'])]])});
    tn.c.root.traverse(o=>{if(o.isMesh&&o.material===charMat){o.material=new THREE.MeshStandardMaterial({vertexColors:true,transparent:true,opacity:.82,roughness:.6})}});const eg=glow(0xb28cff,1.2,.6);eg.position.y=.8;tn.c.root.add(eg);
    tick((t,dt)=>{if(tn===talkingTo)return;const tx=P.x+Math.sin(P.yaw)*1.8+Math.cos(t*.7)*.6,tz=P.z+Math.cos(P.yaw)*1.8,dx=tx-tn.x,dz=tz-tn.z,d=Math.hypot(dx,dz);if(d>.4&&Math.hypot(P.x-tn.x,P.z-tn.z)>1.4){const sp=Math.min(d*1.6,6)*dt;tn.x+=dx/d*sp;tn.z+=dz/d*sp;tn.c.root.rotation.y=Math.atan2(dx,dz);tn.c.walkPh+=dt*10;tn.pose='walk'}else tn.pose='idle';
      tn.c.root.position.set(tn.x,.15+Math.sin(t*2)*.08,tn.z);if(tn.it){tn.it.x=tn.x;tn.it.z=tn.z}})}
  /* scenery */
  buildDailyBoard(4.8,3.4);
  const r=rng(11),avoid=[[4.8,3.4,2.6],[-6,-22.5,4.5],[27,-6,10],[3.3,16.4,2],[7,-7,2.5],[0,-14,7],[-14,-6,6],[16,-2,9],[9,16,7],[-10,20,4],[0,6,4],[-6,5,3],[17.5,17,3.5],[-21,11.75,4],[-4,17,3],[24,12,9]];
  scatter(r,38,22,58,avoid,(x,z,s)=>tree(x,z,s*1.15,pick([0x3f7a35,0x4a8a3c,0x5a9a40]),{fruit:r()<.25?0xffd36b:null}));
  scatter(r,18,12,58,avoid,(x,z,s)=>rock(x,z,s*.8,0x8d8a9a));
  scatter(r,16,8,40,avoid,(x,z,s)=>{vis(G.sph,0x4a8a3c,x,.4*s,z,.8*s,.6*s,.8*s,0,0,0,.05,TX.leaves);vis(G.sph,0x5a9a44,x+.4*s,.35*s,z+.2*s,.5*s,.4*s,.5*s,0,0,0,.05,TX.leaves)});
  baseForest(r,avoid);buildCave();buildGarden();
  vis(G.box,0x4a7bd1,-3,1.0,7.2,.5,.4,.35);vis(G.cyl,0x6b4628,-3,.4,7.2,.05,.8,.05);
  fence(-26,-20,-26,-30,0xa0683c);fence(-26,-30,-16,-30,0xa0683c);
  flowers(r,90,[0xffd36b,0xff8fb1,0xb28cff,0xffffff],4,48);
  grass(900,[0x6fae52,0x5a9a40,0x7fbf5a],12);
  groundDetail(3,'meadow',40);
  makeGround({edge:'trees',c1:0x5f9a48,c2:0x4c8a3c,mount:0x6b5a7a,snow:0xd8c8e8,seed:3,snowY:15,mh:20});
  finishLevel();
  AU.music('base');AU.ambient('birds');
  const nearestBush=()=>{let b=null,bd=1e9;for(const n of L.nodes)if(n.ready&&n.kind==='berry'){const d=Math.hypot(n.x-P.x,n.z-P.z);if(d<bd){bd=d;b=n}}return b};
  L.objective=()=>{
    if(!S.tr){const st=qs('m0');if(st<2)return{text:'Поговори с Тётушкой Выдрой в лавке слева от тарелки',pos:[-12,2,-6]};
      if(st===2){const n=S.inv.berry||0;if(n<8){const b=nearestBush();return{text:`Собери звёздные ягоды: ${n} из 8. Удерживай E у кустов`,pos:b?[b.x,1.4,b.z]:[23,1.4,12]}}return{text:'Отнеси ягоды Тётушке Выдре',pos:[-12,2,-6]}}
      return{text:S.coins>=10?'Купи универсальный переводчик у Тётушки Выдры':'Заработай 10 монет: продай ягоды или рыбу Тётушке Выдре',pos:[-12,2,-6]}}
    if(qs('s0')===1&&Object.keys(S.souv).length>=4)return{text:'Отнеси сувениры Радисту Кроту на вышку',pos:[tx,9.5,tz]};
    const nx=PIDS.find(p=>!S.rescued[p]);if(!nx&&S.tr&&dailyReady())return{text:'Задание дня выполнено. Забери награду у доски заданий',pos:[4.8,2.6,3.4],tag:'Задания дня'};if(!nx){const rb=(L.bros||[]).find(n=>reqOf(n.key));if(rb)return{text:`${CAST[rb.key].name} о чём-то просит. Подойди и поговори`,pos:[rb.x,rb.c.h+.6,rb.z],tag:'Просьба брата'};return{text:'Все братья дома. В галактике остались сувениры, кольца и мастерские',pos:null,tag:'Свободная игра'}}
    return{text:`Удерживай E у тарелки и лети на планету ${PL[nx].name}`,pos:[0,3.2,-14]}};
}
function otterTalk(n){const st=qs('m0');
  if(st<2){talk(n,[['otter','Капик, милый! Слышала про Космический Чих. Тебе нужен переводчик, иначе инопланетяне тебя не поймут.'],['otter','Денег у тебя нет, я знаю. Давай так: собери мне 8 звёздных ягод с кустов за амбаром. Я испеку пирог и заплачу 10 монет.'],['otter','Кусты светятся синим. Подойди и удерживай E. А дедушкина удочка, кстати, лежит на сеновале в амбаре. Рыбу я тоже покупаю.']],()=>qset('m0',2));return}
  if(st===2&&(S.inv.berry||0)>=8){talk(n,[['otter','Какие крупные! Держи 10 монет, как договаривались.'],['otter','Переводчик стоит ровно 10. Остальное, что найдёшь, приноси: всё куплю на вкладке «Продать».']],()=>{takeRes('berry',8);addCoins(10);qset('m0',3);openShop()});return}
  if(st===2){talk(n,[['otter',`Ягод пока ${S.inv.berry||0} из 8. Кусты за амбаром, у ограды. Удерживай E.`]]);return}
  openShop()}
function moleTalk(n){const st=qs('s0'),cnt=Object.keys(S.souv).length;
  if(qs('c4')===1){talk(n,[['mole','Смотри в небо, Капик! Звёзды гаснут... А над нашей звездой открылась дыра. Лиловая, как синяк.'],['mole','Я поймал оттуда звук. Кто-то всхлипывает и... чихает. Тот самый Космический Чих!'],['kapik','Значит, всё началось там. Я лечу к Разлому.'],['mole','Координаты в борткомпьютере. Будь осторожен: говорят, по ту сторону всё наоборот.']],()=>{qset('c4',2);banner('Финальная глава','Тень Космического Чиха','На карте появился Разлом')});return}
  if(qs('c2')===1){talk(n,[['mole','Капик! Слушай! Ш-ш-ш... пи-пи... Чувствуешь? Это сигнал с новой планеты.'],['mole','Её зовут Одуванчия. Там растёт Великий Пух, огромный одуванчик. И он... простужен.'],['mole','Космический Чих, который унёс твоих братьев, прилетел оттуда. И скоро будет новый!'],['kapik','Тогда я лечу туда. Второй раз братьев не отдам.'],['mole','Я записал координаты в твой борткомпьютер. Открой карту, Одуванчия уже там.']],()=>{qset('c2',2);banner('Новая планета','Одуванчия','Открыта на звёздной карте')});return}
  if(st===0){talk(n,[['mole','А? Кто тут? А, Капик. Я Радист Крот, слушаю космос с этой вышки.'],['mole','По радио болтают, что на каждой из четырёх планет спрятан сувенир. Всегда на самом верху, куда без Пружинных лап не допрыгнуть.'],['mole','Принеси мне все четыре, и я отдам тебе свои сбережения. Сорок монет!'],['kapik','Договорились. Только лапы сначала куплю.']],()=>qset('s0',1));return}
  if(st===1&&cnt>=4){talk(n,[['mole','Мандарин, снежинка, спора и шестерёнка! Как по радио.'],['mole','Держи монеты. А сувениры я повешу на антенну, пусть вся галактика видит.']],()=>{qset('s0',2);qcomplete('s0')});return}
  if(st===1){talk(n,[['mole',`Сувениров у тебя ${cnt} из 4. Ищи на самых высоких крышах, шапках и трубах.`]]);return}
  talk(n,[['mole',pick(['Ш-ш-ш... ловлю волну. В каждой планете есть мастерская: из сырья там делают товар, который стоит втрое дороже.','Говорят, у каждой планеты есть кольца для гонок. Пролетишь все - получишь награду.','В телескоп с крыши амбара видно все планеты. Красота.'])]])}
