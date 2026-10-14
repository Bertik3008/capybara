/* ---------- CHARACTER MODELS ---------- */
function eyes(h,x,y,z,r,o){o=o||{};for(const s of[-1,1]){mesh(G.sph,mat(o.white||0xffffff),s*x,y,z,r,r,r*.8,h);mesh(G.sph,mat(o.pupil||0x15100c),s*x,y+(o.py||0),z+r*.62,r*.58,r*.62,r*.4,h);mesh(G.sph,bmat(0xffffff),s*x+r*.2,y+r*.25,z+r*.85,r*.18,r*.18,r*.12,h)}}
const HEADS={
  capy(h,C){mesh(G.sph,mat(C.fur),0,.27,0,.3,.27,.33,h);mesh(G.box,mat(C.fur2),0,.2,.25,.33,.24,.26,h);mesh(G.box,mat(C.dark),0,.29,.375,.24,.07,.03,h);
    for(const s of[-1,1]){mesh(G.sph,mat(0x1b1010),s*.07,.27,.385,.03,.022,.02,h);mesh(G.sph,mat(C.dark),s*.19,.5,-.06,.075,.06,.05,h)}eyes(h,.16,.36,.16,.045,{white:0x1b1010});
    mesh(G.box,mat(0x2a1810),0,.13,.38,.08,.015,.01,h);return .31},
  goat(h,C){mesh(G.sph,mat(C.fur),0,.28,0,.25,.28,.27,h);mesh(G.sph,mat(C.fur2),0,.18,.19,.15,.14,.2,h);mesh(G.sph,mat(0x3a2a24),0,.22,.37,.05,.035,.03,h);
    for(const s of[-1,1]){mesh(G.cone,mat(0xd8c8a8),s*.1,.6,-.04,.05,.24,.05,h).rotation.set(-.55,0,s*.25);mesh(G.sph,mat(C.fur),s*.27,.38,0,.12,.04,.06,h).rotation.z=s*.45}
    eyes(h,.13,.36,.17,.05,{pupil:0x3a2a10});mesh(G.cone,mat(C.beard||0xf2eee6),0,.02,.22,.055,.16,.05,h).rotation.x=Math.PI;return .3},
  hare(h,C){mesh(G.sph,mat(C.fur),0,.26,0,.26,.25,.25,h);mesh(G.sph,mat(C.fur2),0,.19,.18,.14,.1,.12,h);mesh(G.sph,mat(0xff8fa8),0,.25,.29,.035,.03,.025,h);mesh(G.box,mat(0xffffff),0,.12,.27,.06,.06,.02,h);
    for(const s of[-1,1]){const e=mesh(G.sph,mat(C.fur),s*.1,.68,-.03,.07,.32,.035,h);e.rotation.z=-s*.15;mesh(G.sph,mat(0xffb3c4),s*.1,.68,-.005,.045,.26,.02,h).rotation.z=-s*.15}
    eyes(h,.12,.32,.17,.05);return .27},
  penguin(h,C){mesh(G.sph,mat(C.fur),0,.24,0,.24,.24,.24,h);mesh(G.sph,mat(0xf4f6fa),0,.22,.12,.18,.17,.13,h);mesh(G.cone,mat(0xff9a2e),0,.2,.29,.06,.15,.05,h).rotation.x=Math.PI/2;eyes(h,.08,.29,.2,.042);return .25},
  walrus(h,C){mesh(G.sph,mat(C.fur),0,.28,0,.32,.28,.3,h);for(const s of[-1,1]){mesh(G.sph,mat(C.fur2),s*.085,.17,.22,.13,.11,.12,h);mesh(G.cone,mat(0xfff8e8),s*.07,.0,.27,.035,.2,.035,h).rotation.x=Math.PI}
    mesh(G.sph,mat(0x3a2a24),0,.27,.29,.05,.04,.04,h);eyes(h,.14,.36,.2,.035);return .32},
  frog(h,C){mesh(G.sph,mat(C.fur),0,.2,0,.34,.2,.28,h);mesh(G.sph,mat(C.fur2),0,.13,.1,.28,.11,.2,h);
    for(const s of[-1,1]){mesh(G.sph,mat(C.fur),s*.15,.36,.07,.11,.11,.11,h);mesh(G.sph,mat(0xffffff),s*.15,.38,.13,.075,.075,.06,h);mesh(G.sph,mat(0x111111),s*.15,.39,.18,.04,.045,.03,h);mesh(G.sph,mat(0xff9fb6),s*.21,.15,.2,.05,.03,.02,h)}
    mesh(G.box,mat(0x2a3a1a),0,.12,.27,.3,.018,.02,h);return .34},
  robot(h,C){mesh(G.box,mat(C.fur),0,.2,0,.44,.34,.36,h);mesh(G.box,bmat(C.visor||0x7fe3e8),0,.22,.185,.34,.1,.02,h);mesh(G.box,mat(0x2c3439),0,.07,.185,.2,.04,.02,h);
    mesh(G.cyl,mat(0x5b6870),0,.44,0,.02,.16,.02,h);mesh(G.sph,bmat(C.tip||0xffab4a),0,.53,0,.045,.045,.045,h);for(const s of[-1,1])mesh(G.cyl,mat(0x5b6870),s*.23,.2,0,.06,.04,.06,h).rotation.z=Math.PI/2;return .24},
  raccoon(h,C){mesh(G.sph,mat(C.fur),0,.26,0,.27,.25,.26,h);mesh(G.sph,mat(0x2b2b33),0,.31,.15,.22,.08,.1,h);mesh(G.sph,mat(0xf2eee6),0,.19,.2,.13,.09,.13,h);mesh(G.sph,mat(0x111111),0,.23,.33,.04,.035,.03,h);
    for(const s of[-1,1]){mesh(G.cone,mat(C.fur),s*.17,.5,-.02,.08,.13,.05,h).rotation.z=-s*.3;mesh(G.sph,mat(0xf2eee6),s*.13,.39,.17,.05,.025,.02,h)}eyes(h,.11,.31,.22,.04);return .28},
  otter(h,C){mesh(G.sph,mat(C.fur),0,.26,0,.27,.25,.26,h);mesh(G.sph,mat(C.fur2),0,.19,.18,.17,.12,.14,h);mesh(G.sph,mat(0x2a1a14),0,.25,.31,.05,.035,.03,h);
    for(const s of[-1,1]){mesh(G.sph,mat(C.dark||0x5a3b26),s*.2,.43,-.02,.06,.05,.04,h);for(const k of[-1,1])mesh(G.box,mat(0xf2eee6),s*.2,.2+k*.025,.27,.16,.006,.006,h).rotation.y=s*.25}
    eyes(h,.12,.32,.19,.04);return .28},
  mole(h,C){mesh(G.sph,mat(C.fur),0,.25,0,.27,.25,.27,h);mesh(G.sph,mat(0xff8fb1),0,.22,.3,.07,.06,.06,h);for(let i=0;i<6;i++){const a=i/6*TAU;mesh(G.cone,mat(0xff8fb1),Math.cos(a)*.06,.22+Math.sin(a)*.06,.32,.025,.06,.025,h).rotation.set(Math.PI/2,0,a-Math.PI/2)}
    for(const s of[-1,1])mesh(G.sph,mat(0x111111),s*.1,.33,.22,.02,.02,.015,h);return .28}
};
const HATS={
  none(){},
  straw(h,r,C){const y=r*1.62;mesh(G.disc,mat(0xe8c870),0,y,0,.44,.025,.44,h);mesh(G.cyl,mat(0xe8c870),0,y+.08,0,.21,.15,.21,h);mesh(G.cyl,mat(C&&C.band||0xc94f3a),0,y+.04,0,.215,.045,.215,h)},
  beanie(h,r,C){mesh(G.hemi,mat(C&&C.hatc||0xd8453c),0,r*1.25,0,.28,.24,.28,h);mesh(G.cyl,mat(0xf4f0e8),0,r*1.27,0,.285,.06,.285,h);mesh(G.sph,mat(0xf4f0e8),0,r*1.25+.25,0,.08,.08,.08,h)},
  cap(h,r,C){mesh(G.hemi,mat(C&&C.hatc||0x3a6ad6),0,r*1.33,0,.28,.16,.28,h);mesh(G.box,mat(C&&C.hatc||0x3a6ad6),0,r*1.35,.27,.26,.025,.2,h)},
  propeller(h,r){HATS.cap(h,r,{hatc:0xffab4a});const p=new THREE.Group();p.position.set(0,r*1.33+.2,0);h.add(p);mesh(G.cyl,mat(0x444444),0,-.05,0,.015,.1,.015,p);mesh(G.box,mat(0x7fe3e8),0,0,0,.42,.015,.06,p);mesh(G.box,mat(0xff6b6b),0,0,0,.06,.016,.42,p);h.userData.prop=p},
  tophat(h,r){mesh(G.cyl,mat(0x23202a),0,r*1.4+.17,0,.17,.32,.17,h);mesh(G.disc,mat(0x23202a),0,r*1.42,0,.29,.025,.29,h);mesh(G.cyl,mat(0xb28cff),0,r*1.42+.05,0,.175,.06,.175,h)},
  crown(h,r){mesh(G.cyl,mat(0xffd36b,{shininess:80,specular:0xffffff}),0,r*1.42,0,.2,.12,.2,h);for(let i=0;i<5;i++){const a=i/5*TAU;mesh(G.cone,mat(0xffd36b,{shininess:80,specular:0xffffff}),Math.cos(a)*.17,r*1.42+.12,Math.sin(a)*.17,.045,.12,.045,h);mesh(G.sph,bmat(i%2?0xff6b6b:0x7fe3e8),Math.cos(a)*.2,r*1.42,Math.sin(a)*.2,.03,.03,.03,h)}},
  cosmo(h,r){const b=mesh(G.sphHi,new THREE.MeshPhongMaterial({color:0xbfefff,transparent:true,opacity:.28,shininess:120,specular:0xffffff,depthWrite:false}),0,r*.95,.02,r*1.75,r*1.75,r*1.75,h);b.renderOrder=3;mesh(G.tor,mat(0xdfe6ef),0,-.04,0,r*1.2,r*1.2,r*.8,h).rotation.x=Math.PI/2},
  hardhat(h,r){mesh(G.hemi,mat(0xffc83d),0,r*1.3,0,.3,.2,.3,h);mesh(G.disc,mat(0xffc83d),0,r*1.3,.03,.36,.02,.36,h)},
  beret(h,r){mesh(G.sph,mat(0xc94f6a),.04,r*1.62,0,.26,.07,.26,h);mesh(G.cyl,mat(0x333333),.04,r*1.62+.08,0,.015,.05,.015,h)},
  mandarin(h,r){mesh(G.sph,mat(0xff9a2e),0,r*1.62,0,.17,.15,.17,h);mesh(G.box,mat(0x4f9a3a),.07,r*1.62+.16,0,.16,.02,.07,h).rotation.z=.4},
  mushroom(h,r){mesh(G.hemi,mat(0xe2453c),0,r*1.35,0,.36,.26,.36,h);[[.14,.08],[-.12,.04],[0,-.15],[.04,.16]].forEach(d=>mesh(G.sph,mat(0xffffff),d[0],r*1.35+.2,d[1],.05,.025,.05,h))},
  goggles(h,r){mesh(G.cyl,mat(0x5a4630),0,r*1.25,0,r*1.02,.06,r*1.02,h);for(const s of[-1,1]){const g=mesh(G.tor,mat(0xc99a3a),s*.1,r*1.33,r*.86,.075,.075,.075,h);mesh(G.disc,bmat(0x9fe9ff),s*.1,r*1.33,r*.86,.065,.01,.065,h).rotation.x=Math.PI/2}},
  headphones(h,r){mesh(G.torThin,mat(0x333344),0,r*1.05,0,r*1.05,r*1.05,r*1.4,h).rotation.y=Math.PI/2;for(const s of[-1,1])mesh(G.cyl,mat(0xff6b6b),s*r*1.02,r*.9,0,.08,.08,.08,h).rotation.z=Math.PI/2}
};
const HAT_INFO={none:{name:'Без шапки',price:0},straw:{name:'Соломенная шляпа',price:10},beanie:{name:'Вязаная шапка',price:12},propeller:{name:'Кепка с пропеллером',price:18},beret:{name:'Берет художника',price:15},tophat:{name:'Цилиндр',price:20},cosmo:{name:'Шлем космонавта',price:25},crown:{name:'Корона',price:35}};

function makeChar(sp){
  if(sp.sp==='snail')return makeSnail(sp);
  const s=sp.scale||1,robot=sp.sp==='robot',peng=sp.sp==='penguin';
  const C=Object.assign({fur:0x9a6236,fur2:0xd9b38a,dark:0x5a361d,shoe:0x3a2a20},sp.c||{});
  const root=new THREE.Group(),body=new THREE.Group();root.add(body);body.scale.setScalar(s);
  const legL=sp.legL!=null?sp.legL:(peng?.18:.5),hipY=legL+.08;
  const hips=new THREE.Group();hips.position.y=hipY;body.add(hips);
  const legs=[],arms=[];
  for(const side of[-1,1]){const g=new THREE.Group();g.position.set(side*(peng?.13:.15),0,0);hips.add(g);
    if(robot){mesh(G.box,mat(0x3b4348),0,-legL/2,0,.13,legL,.15,g);mesh(G.box,mat(0x2c3439),0,-legL+.04,.04,.18,.09,.26,g)}
    else if(peng){mesh(G.sph,mat(0xff9a2e),0,-legL+.04,.08,.12,.05,.17,g)}
    else{mesh(G.cyl,mat(C.pants||C.fur),0,-legL/2,0,.095,legL,.095,g);mesh(G.sph,mat(C.shoe),0,-legL+.02,.05,.12,.08,.17,g)}
    legs.push(g)}
  const torso=new THREE.Group();hips.add(torso);
  const bw=sp.bw||(peng?.34:.34),bh=sp.bh||(peng?.6:.46),bd=sp.bd||.3;
  if(robot){mesh(G.box,mat(C.fur),0,bh*.55,0,bw*2,bh*1.1,bd*2,torso);mesh(G.box,mat(0x2c3439),0,bh*.6,bd+.01,bw*1.2,bh*.5,.02,torso);mesh(G.box,bmat(C.visor||0x7fe3e8),-.08,bh*.7,bd+.02,.06,.06,.01,torso);mesh(G.box,bmat(0xffab4a),.06,bh*.7,bd+.02,.06,.06,.01,torso)}
  else{mesh(G.sph,mat(C.shirt||C.fur),0,bh*.62,0,bw,bh*.72,bd,torso);mesh(G.sph,mat(C.pants||C.shirt||C.fur),0,.06,0,bw*.94,.24,bd*.94,torso);
    if(C.belly)mesh(G.sph,mat(C.belly),0,bh*.55,bd*.5,bw*.68,bh*.6,bd*.5,torso);
    if(sp.overalls){const oc=C.pants||0x3d5a9a;mesh(G.box,mat(oc),0,bh*.45,bd*.82,bw*1.0,bh*.55,.08,torso);for(const x of[-1,1])mesh(G.box,mat(oc),x*bw*.45,bh*.95,bd*.55,.07,bh*.6,.06,torso).rotation.x=-.25;for(const x of[-1,1])mesh(G.sph,mat(0xffd36b),x*bw*.42,bh*.7,bd*.92,.035,.035,.02,torso)}
    if(sp.apron)mesh(G.box,mat(sp.apron),0,bh*.35,bd*.86,bw*1.2,bh*.85,.04,torso);
    if(sp.vest)for(const x of[-1,1])mesh(G.box,mat(sp.vest),x*bw*.55,bh*.65,bd*.72,bw*.55,bh*.9,.1,torso).rotation.y=x*.35;}
  const shY=bh*(robot?1.0:1.02);
  for(const side of[-1,1]){const g=new THREE.Group();g.position.set(side*(bw+(robot?.1:.03)),shY,0);torso.add(g);const aL=sp.armL||.44;
    if(peng)mesh(G.sph,mat(C.fur),0,-.24,0,.07,.28,.15,g);
    else if(robot){mesh(G.sph,mat(0x5b6870),0,0,0,.09,.09,.09,g);mesh(G.box,mat(C.fur),0,-aL/2,0,.12,aL,.12,g);mesh(G.box,mat(0x3b4348),0,-aL-.04,0,.14,.12,.14,g)}
    else{mesh(G.cyl,mat(C.shirt||C.fur),0,-aL*.28,0,.085,aL*.56,.085,g);mesh(G.cyl,mat(C.arm||C.fur),0,-aL*.72,0,.072,aL*.5,.072,g);mesh(G.sph,mat(C.paw||C.fur),0,-aL,.01,.085,.09,.085,g)}
    const paw=new THREE.Group();paw.position.set(0,-aL-.02,.02);g.add(paw);g.userData.paw=paw;arms.push(g)}
  const head=new THREE.Group();head.position.y=bh*1.22;torso.add(head);
  const hr=(HEADS[sp.sp]||HEADS.capy)(head,C,sp);
  if(sp.scarf){mesh(G.tor,mat(sp.scarf),0,bh*1.18,0,.25,.25,.3,torso).rotation.x=Math.PI/2;mesh(G.box,mat(sp.scarf),.12,bh*.9,bd*.85,.1,.3,.05,torso).rotation.z=.2}
  if(sp.glasses){for(const x of[-1,1])mesh(G.torThin,mat(0x333333),x*.11,hr*1.12,hr*.68,.065,.065,.065,head);mesh(G.box,mat(0x333333),0,hr*1.15,hr*.7,.08,.01,.01,head)}
  (HATS[sp.hat]||HATS.none)(head,hr,C);if(sp.hat2)HATS[sp.hat2](head,hr,C);
  if(sp.tail==='ring'){for(let i=0;i<4;i++)mesh(G.sph,mat(i%2?0x2b2b33:C.fur),0,.05+i*.04,-bd-.08-i*.13,.1,.1,.12,torso)}
  else if(sp.tail==='short')mesh(G.sph,mat(C.fur),0,.05,-bd-.02,.07,.07,.07,torso);
  else if(sp.tail==='otter'){const t=mesh(G.cone,mat(C.fur),0,.0,-bd-.2,.09,.5,.06,torso);t.rotation.x=-1.9}
  if(sp.prop)PROPS[sp.prop](arms[1].userData.paw);
  if(sp.propL)PROPS[sp.propL](arms[0].userData.paw);
  const c={root,body,hips,torso,legs,arms,head,hipY,s,sp,hr,headR:hr*s,headY:(hipY+bh*1.22+hr)*s,t0:Math.random()*10,look:0,walkPh:0,h:(hipY+bh*1.22+hr*2.1+(sp.hat&&sp.hat!=='none'?.25:0))*s};
  root.traverse(o=>{if(o.isMesh){o.castShadow=true}});
  return c;
}
function makeSnail(sp){
  const s=sp.scale||1,C=Object.assign({fur:0x7ad1a0,shell:0xe0b04a},sp.c||{});const root=new THREE.Group(),body=new THREE.Group();root.add(body);body.scale.setScalar(s);
  mesh(G.sph,mat(C.fur),0,.28,.15,.42,.28,.85,body);mesh(G.sph,mat(C.fur),0,.6,.62,.24,.34,.24,body);
  const shell=new THREE.Group();shell.position.set(0,.85,-.3);body.add(shell);mesh(G.sphHi,mat(C.shell),0,0,0,.62,.62,.5,shell);mesh(G.tor,mat(C.shell2||0xa8822e),.42,0,0,.36,.36,.5,shell).rotation.y=Math.PI/2;mesh(G.tor,mat(C.shell2||0xa8822e),.47,0,0,.17,.17,.35,shell).rotation.y=Math.PI/2;
  const head=new THREE.Group();head.position.set(0,.82,.66);body.add(head);
  for(const x of[-1,1]){const st=new THREE.Group();st.position.set(x*.1,0,0);st.rotation.z=-x*.25;head.add(st);mesh(G.cyl,mat(C.fur),0,.22,0,.035,.44,.035,st);mesh(G.sph,mat(0xffffff),0,.46,0,.08,.08,.08,st);mesh(G.sph,mat(0x111111),0,.47,.06,.04,.045,.03,st);st.userData.stalk=1}
  mesh(G.box,mat(0x2a5a40),0,-.08,.2,.14,.02,.02,head);
  if(sp.glasses)mesh(G.torThin,mat(0xffd36b),.1,.47,.09,.07,.07,.07,head);
  if(sp.hat)(HATS[sp.hat])(head,.3,C);
  root.traverse(o=>{if(o.isMesh)o.castShadow=true});
  return{root,body,head,legs:[],arms:[],hips:body,torso:body,hipY:0,s,sp,snail:true,hr:.3,headR:.3*s,headY:(.82+.35)*s,t0:Math.random()*10,look:0,walkPh:0,h:1.9*s};
}
const PROPS={
  hammer(p){mesh(G.cyl,mat(0x7a4a2a),0,0,.12,.025,.36,.025,p).rotation.x=Math.PI/2;mesh(G.box,mat(0x8a96a0),0,0,.3,.16,.08,.08,p)},
  brush(p){const g=new THREE.Group();g.rotation.x=Math.PI/2;p.add(g);mesh(G.cyl,mat(0xc99a3a),0,.18,0,.02,.36,.02,g);mesh(G.cone,mat(0xff6b6b),0,.4,0,.04,.1,.04,g)},
  rod(p){const g=new THREE.Group();g.rotation.x=1.1;p.add(g);mesh(G.cyl,mat(0x5a3b26),0,.8,0,.018,1.6,.018,g);mesh(G.cyl,mat(0xdddddd),0,1.6,0,.004,.004,.004,g)},
  staff(p){mesh(G.cyl,mat(0x9fd8f0),0,.05,0,.03,1.5,.03,p);mesh(G.oct,bmat(0x7fe3e8),0,.85,0,.1,.14,.1,p)},
  lantern(p){mesh(G.cyl,mat(0x333333),0,-.06,0,.012,.1,.012,p);const l=mesh(G.sph,bmat(0xffe08a),0,-.18,0,.09,.11,.09,p);l.add(glow(0xffd36b,1.4,.8))},
  wrench(p){mesh(G.box,mat(0x9aa6ad),0,0,.15,.04,.04,.34,p);mesh(G.tor,mat(0x9aa6ad),0,0,.34,.06,.06,.06,p)},
  parcel(p){mesh(G.box,mat(0xc99a5a),0,.05,.12,.3,.22,.24,p)}
};
const DEF_POSE={idle:1};
function charPose(c,t,pose,dt,lookAt){
  const tt=t+c.t0;
  if(c.snail){c.head.children.forEach((st,i)=>{if(st.userData.stalk)st.rotation.x=Math.sin(tt*2+i)*.2});c.body.position.y=Math.abs(Math.sin(tt*1.2))*.02;if(lookAt)lookHead(c,lookAt,dt);return}
  const L=c.legs,A=c.arms;
  c.hips.position.y=c.hipY;c.body.rotation.set(0,0,0);c.body.position.y=0;c.torso.rotation.set(0,0,0);c.head.rotation.x=0;c.head.rotation.z=0;
  L.forEach(l=>l.rotation.set(0,0,0));A.forEach((a,i)=>a.rotation.set(0,0,(i?1:-1)*(.1+Math.sin(tt*1.6)*.03)));
  c.torso.scale.y=1+Math.sin(tt*2.2)*.015;
  switch(pose){
    case'walk':{const ph=c.walkPh;L[0].rotation.x=Math.sin(ph)*.7;L[1].rotation.x=-Math.sin(ph)*.7;A[0].rotation.x=-Math.sin(ph)*.55;A[1].rotation.x=Math.sin(ph)*.55;c.hips.position.y=c.hipY+Math.abs(Math.cos(ph))*.05;c.torso.rotation.z=Math.sin(ph)*.04;break}
    case'wave':A[1].rotation.z=2.5+Math.sin(tt*8)*.35;c.torso.rotation.z=-.05;break;
    case'hammer':A[1].rotation.x=-1.25+Math.sin(tt*8)*.55;c.torso.rotation.x=.3;c.head.rotation.x=.35;break;
    case'paint':A[1].rotation.x=-1.4;A[1].rotation.z=.25+Math.sin(tt*2.6)*.45;c.head.rotation.x=.1;break;
    case'sit':c.hips.position.y=.11;L.forEach(l=>l.rotation.x=-1.45);A.forEach(a=>a.rotation.x=-.55);c.torso.rotation.x=-.08;break;
    case'dangle':c.hips.position.y=.11;L[0].rotation.x=-1.15+Math.sin(tt*2.4)*.25;L[1].rotation.x=-1.15-Math.sin(tt*2.4)*.25;A.forEach(a=>{a.rotation.x=-.2;a.rotation.z*=2.2});break;
    case'fish':c.hips.position.y=.11;L.forEach(l=>l.rotation.x=-1.45);A[0].rotation.x=-.9;A[1].rotation.x=-.95+Math.sin(tt*.9)*.05;A[0].rotation.z=.35;break;
    case'lie':c.body.rotation.x=-Math.PI/2;c.body.position.y=.3*c.s;A[0].rotation.z=-2.7;A[1].rotation.z=2.7;L[0].rotation.x=.08;c.torso.scale.y=1+Math.sin(tt*1.3)*.035;break;
    case'type':A.forEach((a,i)=>{a.rotation.x=-1.15+Math.sin(tt*14+i*2)*.08});c.head.rotation.x=.2;break;
    case'dance':c.hips.position.y=c.hipY+Math.abs(Math.sin(tt*5))*.08;A[0].rotation.z=-2.2-Math.sin(tt*5)*.4;A[1].rotation.z=2.2-Math.sin(tt*5)*.4;c.torso.rotation.z=Math.sin(tt*2.5)*.12;break;
    case'think':A[1].rotation.x=-2.0;A[1].rotation.z=.55;c.head.rotation.z=.12;break;
    case'staff':A[1].rotation.x=-.35;A[1].rotation.z=.25;break;
    case'hold':A.forEach(a=>{a.rotation.x=-1.0});break;
    case'cheer':A[0].rotation.z=-2.7+Math.sin(tt*9)*.2;A[1].rotation.z=2.7-Math.sin(tt*9)*.2;c.hips.position.y=c.hipY+Math.abs(Math.sin(tt*9))*.12;break;
  }
  if(c.head.userData.prop)c.head.userData.prop.rotation.y+=dt*14;
  if(lookAt&&pose!=='lie')lookHead(c,lookAt,dt);
}
function lookHead(c,p,dt){const w=c.root.getWorldPosition(_p);let a=Math.atan2(p.x-w.x,p.z-w.z)-c.root.rotation.y-(c.root.parent&&c.root.parent.rotation?c.root.parent.rotation.y:0);a=Math.atan2(Math.sin(a),Math.cos(a));const d=Math.hypot(p.x-w.x,p.z-w.z);const want=d<9&&Math.abs(a)<1.9?clamp(a,-1.05,1.05):0;c.look+=(want-c.look)*Math.min(1,dt*4);c.head.rotation.y=c.look}

/* ---------- CAST ---------- */
const CAST={
  kapik:{name:'Капик',voice:300,spec:()=>({sp:'capy',scarf:0xffab4a,hat:S.hat,c:{fur:0x9a6236,fur2:0x6d4225,dark:0x4a2a16}})},
  yuzik:{name:'Юзик',voice:520,spec:()=>({sp:'capy',scale:.72,hat:'mandarin',c:{fur:0xa86b3c,fur2:0x6d4225,dark:0x4a2a16}})},
  snezhok:{name:'Снежок',voice:480,spec:()=>({sp:'capy',scale:.72,scarf:0x7fe3e8,hat:'beanie',c:{fur:0x9d6a44,fur2:0x6d4225,dark:0x4a2a16,hatc:0x5fc3cc}})},
  gribok:{name:'Грибок',voice:440,spec:()=>({sp:'capy',scale:.72,hat:'mushroom',c:{fur:0x93603a,fur2:0x6d4225,dark:0x4a2a16}})},
  vintik:{name:'Винтик',voice:560,spec:()=>({sp:'capy',scale:.72,hat:'goggles',c:{fur:0xa06540,fur2:0x6d4225,dark:0x4a2a16},overalls:true})},
  otter:{name:'Тётушка Выдра',voice:360,spec:()=>({sp:'otter',apron:0x4a7bd1,glasses:true,tail:'otter',c:{fur:0x7a5236,fur2:0xd9b38a,shirt:0xf4e6c8,arm:0x7a5236,paw:0x7a5236,pants:0x7a5236}})},
  mole:{name:'Радист Крот',voice:250,spec:()=>({sp:'mole',hat:'headphones',vest:0x3a6a4a,c:{fur:0x4a4258,fur2:0x6a6278,shirt:0xe8dcc8,pants:0x4a4258,paw:0xff8fb1}})},
  citron:{name:'Фермер Цитрон',voice:230,spec:()=>({sp:'goat',hat:'straw',overalls:true,prop:'hammer',tail:'short',c:{fur:0xf0e8d8,fur2:0xffffff,shirt:0xc94f3a,pants:0x3d5a9a,arm:0xf0e8d8,paw:0xf0e8d8}})},
  grushka:{name:'Художница Грушка',voice:520,spec:()=>({sp:'hare',hat:'beret',apron:0xfff1d6,prop:'brush',tail:'short',c:{fur:0xc9a27a,fur2:0xf6efe6,shirt:0x6fbf73,pants:0x6fbf73,arm:0xc9a27a,paw:0xc9a27a}})},
  morkovka:{name:'Морковка',voice:640,spec:()=>({sp:'hare',scale:.78,hat:'cap',tail:'short',c:{fur:0xe8dccc,fur2:0xffffff,shirt:0xff9a2e,pants:0x3d5a9a,arm:0xe8dccc,paw:0xe8dccc,hatc:0x4f9a3a}})},
  farmhand:{name:'Козёл Пастух',voice:210,spec:()=>({sp:'goat',hat:'cap',tail:'short',c:{fur:0x8a7a6a,fur2:0xd8ccbc,shirt:0x4f9a3a,pants:0x6a5a4a,arm:0x8a7a6a,paw:0x8a7a6a,hatc:0xc94f3a}})},
  brr:{name:'Старейшина Брр',voice:200,spec:()=>({sp:'penguin',scale:1.15,hat:'crown',scarf:0x7fe3e8,prop:'staff',c:{fur:0x23304a}})},
  fyu:{name:'Пингвинёнок Фью',voice:700,spec:()=>({sp:'penguin',scale:.8,hat:'beanie',scarf:0xff6b6b,c:{fur:0x2a3a58}})},
  usach:{name:'Морж Усач',voice:170,spec:()=>({sp:'walrus',scale:1.2,hat:'beanie',prop:'rod',bw:.46,bd:.4,c:{fur:0x8a6a5a,fur2:0xc9a890,shirt:0x2c5a8a,pants:0x2c3a4a,arm:0x8a6a5a,paw:0x8a6a5a,hatc:0xc94f3a}})},
  penguin:{name:'Пингвин',voice:600,spec:()=>({sp:'penguin',scale:.9,scarf:pick([0xffab4a,0x8ee08a,0xb28cff]),c:{fur:0x23304a}})},
  sliz:{name:'Старейшина Слизь',voice:180,spec:()=>({sp:'snail',scale:1.3,hat:'tophat',glasses:true,c:{fur:0x8ad6a8,shell:0xb06ad6,shell2:0x7d48a0}})},
  kvaba:{name:'Бабушка Ква-Ба',voice:330,spec:()=>({sp:'frog',glasses:true,scarf:0xb28cff,prop:'lantern',apron:0xf4e6c8,c:{fur:0x6fae5a,fur2:0xc8e0a0,shirt:0x9b5ab0,pants:0x9b5ab0,arm:0x6fae5a,paw:0x6fae5a,shoe:0x6fae5a}})},
  kvak:{name:'Лягушонок Квак',voice:620,spec:()=>({sp:'frog',scale:.85,hat:'cap',c:{fur:0x5fc46a,fur2:0xd8f0b0,shirt:0xffab4a,pants:0x3d5a9a,arm:0x5fc46a,paw:0x5fc46a,shoe:0x5fc46a,hatc:0x7fe3e8}})},
  frog:{name:'Лягушка',voice:500,spec:()=>({sp:'frog',scale:.9,c:{fur:0x7ab85a,fur2:0xd8f0b0,shirt:pick([0x7fe3e8,0xff8fb1,0xffd36b]),pants:0x4a3a5a,arm:0x7ab85a,paw:0x7ab85a,shoe:0x7ab85a}})},
  shurup:{name:'Енот Шуруп',voice:300,spec:()=>({sp:'raccoon',hat:'hardhat',overalls:true,prop:'wrench',tail:'ring',c:{fur:0x8a8a96,fur2:0xf2eee6,shirt:0x4a4a52,pants:0xff8a2e,arm:0x8a8a96,paw:0x2b2b33}})},
  bolt:{name:'Робот Болтик',voice:520,spec:()=>({sp:'robot',scale:.85,c:{fur:0x9aa6ad,visor:0x7fe3e8}})},
  posylkin:{name:'Робот Посылкин',voice:440,spec:()=>({sp:'robot',hat:'cap',prop:'parcel',c:{fur:0xc9a25a,visor:0x8ee08a,hatc:0x3a6ad6}})},
  magnetron:{name:'Магнетрон',voice:120,spec:()=>({sp:'robot',scale:2,c:{fur:0x6b3434,visor:0xff3a3a,tip:0xff3a3a}})},
  cleaner:{name:'Робот-уборщик',voice:600,spec:()=>({sp:'robot',scale:.6,c:{fur:0x8ee0a8,visor:0x333333}})},
  robot:{name:'Робот',voice:480,spec:()=>({sp:'robot',scale:.9,c:{fur:pick([0x9aa6ad,0xc9a25a,0x8fb0c0]),visor:pick([0x7fe3e8,0x8ee08a,0xffd36b])}})}
};
function makeCast(key){const c=makeChar(CAST[key].spec());c.key=key;return c}

/* ---------- PROPS ---------- */
const PAINTS={silver:{name:'Дедушкино серебро',col:0xb8c4d6,price:0},mandarin:{name:'Мандариновая',col:0xffab4a,price:15},mint:{name:'Мятная',col:0x6fe0b0,price:15},violet:{name:'Фиалковая',col:0xa98cff,price:15},gold:{name:'Золотая',col:0xffd36b,price:30}};
function makeUFO(paint){
  const g=new THREE.Group();const col=(PAINTS[paint]||PAINTS.silver).col;
  const hull=mesh(new THREE.SphereGeometry(3,32,14),new THREE.MeshPhongMaterial({color:col,shininess:90,specular:0x888888}),0,0,0,1,.28,1,g);
  mesh(new THREE.TorusGeometry(3,.32,10,40),new THREE.MeshPhongMaterial({color:new THREE.Color(col).multiplyScalar(.6),shininess:60,specular:0x444444}),0,0,0,1,1,1,g).rotation.x=Math.PI/2;
  mesh(new THREE.CylinderGeometry(1.6,2.3,.5,24),mat(0x56607a),0,-.6,0,1,1,1,g);
  const head=makeCast('kapik');head.root.scale.setScalar(.85);head.root.position.set(0,-.1,0);head.root.rotation.y=Math.PI;g.add(head.root);
  const dome=mesh(new THREE.SphereGeometry(1.45,24,12,0,TAU,0,Math.PI/2),new THREE.MeshPhongMaterial({color:0x8fe8ff,transparent:true,opacity:.35,shininess:120,specular:0xffffff,depthWrite:false}),0,.55,0,1,1,1,g);dome.renderOrder=2;
  const lights=[];for(let i=0;i<12;i++){const a=i/12*TAU;lights.push(mesh(G.sph,new THREE.MeshBasicMaterial({color:0xffd27a}),Math.cos(a)*2.75,-.05,Math.sin(a)*2.75,.15,.15,.15,g))}
  const eng=glow(0x7fe3e8,3.5,.7);eng.position.y=-.9;g.add(eng);
  const legs=new THREE.Group();g.add(legs);for(let i=0;i<3;i++){const a=i/3*TAU+.5;mesh(G.cyl,mat(0x56607a),Math.cos(a)*1.7,-1.05,Math.sin(a)*1.7,.08,1.5,.08,legs);mesh(G.cyl,mat(0x56607a),Math.cos(a)*1.7,-1.78,Math.sin(a)*1.7,.32,.07,.32,legs)}
  g.traverse(o=>{if(o.isMesh)o.castShadow=true});
  g.userData={lights,eng,legs,dome,head,hull};
  g.userData.update=(t,thr)=>{lights.forEach((l,i)=>l.material.color.setHSL((t*.15+i/12)%1,.85,.66));eng.material.opacity=.45+(thr||0)*.5;eng.scale.setScalar(3.2+(thr||0)*2.5);charPose(head,t,'idle',.016)};
  return g;
}
const coinGeo=(()=>{const c=new THREE.CylinderGeometry(.32,.32,.07,20);c.rotateX(Math.PI/2);c.userData.shared=true;return c})();
const coinMat=new THREE.MeshPhongMaterial({color:0xf2b62a,emissive:0x3a2200,shininess:90,specular:0xffffff});coinMat.userData.shared=true;
function coinMesh(){const g=new THREE.Group();g.add(new THREE.Mesh(coinGeo,coinMat));g.add(glow(0xffd36b,1.1,.45));return g}
function makeChest(){const g=new THREE.Group(),w=mat(0x8a5a32),gold=mat(0xffc83d,{shininess:80,specular:0xffffff});
  mesh(G.box,w,0,.27,0,.9,.54,.6,g);[-.35,.35].forEach(x=>mesh(G.box,gold,x,.27,0,.07,.56,.62,g));
  const lid=new THREE.Group();lid.position.set(0,.54,-.3);g.add(lid);mesh(G.box,w,0,.11,.3,.92,.22,.62,lid);[-.35,.35].forEach(x=>mesh(G.box,gold,x,.11,.3,.07,.24,.64,lid));mesh(G.box,gold,0,.0,.62,.14,.16,.04,lid);
  g.traverse(o=>{if(o.isMesh)o.castShadow=true});g.userData.lid=lid;return g}
function makeChick(){const g=new THREE.Group();const b=new THREE.Group();g.add(b);mesh(G.sph,mat(0xff9a2e),0,.32,0,.3,.28,.3,b);mesh(G.box,mat(0x4f9a3a),.05,.62,0,.2,.03,.09,b).rotation.z=.4;
  for(const s of[-1,1]){mesh(G.sph,mat(0xffffff),s*.1,.4,.24,.06,.06,.04,b);mesh(G.sph,mat(0x111111),s*.1,.41,.27,.03,.035,.02,b);mesh(G.cyl,mat(0x6a3a10),s*.1,.06,0,.025,.12,.025,b)}
  mesh(G.cone,mat(0xffd36b),0,.32,.32,.05,.1,.05,b).rotation.x=Math.PI/2;g.traverse(o=>{if(o.isMesh)o.castShadow=true});g.userData.b=b;return g}
const ITEMS={
  bucket(){const g=new THREE.Group();mesh(G.cyl,mat(0x9aa6ad),0,.2,0,.2,.4,.2,g);mesh(G.disc,mat(0xff6b9a),0,.41,0,.18,.02,.18,g);mesh(G.torThin,mat(0x666666),0,.42,0,.2,.2,.2,g).rotation.z=Math.PI/2;g.add(glow(0xff8fb1,1.6,.6));return g},
  core(){const g=new THREE.Group();mesh(G.cyl,mat(0x3b4348),0,.05,0,.2,.1,.2,g);mesh(G.cyl,bmat(0x7fe3e8),0,.32,0,.15,.45,.15,g);mesh(G.cyl,mat(0x3b4348),0,.6,0,.2,.1,.2,g);const l=glow(0x7fe3e8,2.2,.8);l.position.y=.32;g.add(l);return g},
  crate(){const g=new THREE.Group();mesh(G.box,mat(0xb07a42),0,.3,0,.6,.6,.6,g);[-.31,.31].forEach(z=>mesh(G.box,mat(0x7a4a2a),0,.3,z,.62,.1,.03,g));mesh(G.cyl,mat(0x9aa6ad),0,.62,0,.06,.04,.06,g);return g},
  gold_mandarin(){const g=new THREE.Group();mesh(G.sphHi,mat(0xffd36b,{shininess:100,specular:0xffffff,emissive:0x5a3a00}),0,.3,0,.3,.27,.3,g);mesh(G.box,mat(0x8ee08a),.08,.6,0,.25,.03,.1,g).rotation.z=.4;g.add(glow(0xffd36b,2.4,.8));return g},
  snowflake(){const g=new THREE.Group();for(let i=0;i<3;i++)mesh(G.box,mat(0xdff6ff,{emissive:0x335566}),0,.4,0,.08,.7,.04,g).rotation.z=i*Math.PI/3;g.add(glow(0xbfefff,2.4,.8));g.children.forEach(c=>c.position.y=.4);return g},
  spore(){const g=new THREE.Group();mesh(G.ico1,bmat(0xd7a0ff),0,.35,0,.25,.25,.25,g);const l=glow(0xd7a0ff,2.6,.9);l.position.y=.35;g.add(l);return g},
  gear(){const g=new THREE.Group();const m=mat(0xffd36b,{shininess:100,specular:0xffffff,emissive:0x5a3a00});mesh(G.tor,m,0,.4,0,.24,.24,.6,g);for(let i=0;i<8;i++){const a=i/8*TAU;mesh(G.box,m,Math.cos(a)*.3,.4+Math.sin(a)*.3,0,.1,.1,.08,g).rotation.z=a}const l=glow(0xffd36b,2.4,.8);l.position.y=.4;g.add(l);return g},
  can(){const g=new THREE.Group();mesh(G.cyl,mat(0x4a9ad6),0,.2,0,.18,.36,.18,g);const sp=mesh(G.cyl,mat(0x4a9ad6),.25,.28,0,.03,.4,.03,g);sp.rotation.z=-1;mesh(G.torThin,mat(0x2a6aa6),-.05,.42,0,.13,.13,.13,g);g.add(glow(0x7fe3e8,1.6,.5));return g}
};
