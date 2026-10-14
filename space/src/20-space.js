/* ---------- SPACE FLIGHT ---------- */
const SPX=(()=>{
  const PLN={base:{pos:[300,0,700],r:30,col:0x8fdc7a},p1:{pos:[-380,40,380],r:60,col:0xff9a3a},p2:{pos:[-780,-30,-160],r:70,col:0xcfeeff,ring:0xdff6ff},p3:{pos:[160,60,-720],r:62,col:0xb06ad6},p4:{pos:[760,-20,-260],r:56,col:0x7a8a94,ring:0xffab4a}};
  const IDS=['base','p1','p2','p3','p4'];
  let built=false,ship=null,cam=0,auto=false,rocks=[],rockIM=null,rings=[],junk=[],labels={},comet=null,shake=0;
  const sh={pos:new THREE.Vector3(),vel:new THREE.Vector3(),yaw:0,pitch:0,roll:0,boost:1,thr:0};
  const v3=(a)=>new THREE.Vector3(a[0],a[1],a[2]);
  function planetMesh(id){const p=PLN[id],r=p.r,g=new THREE.Group();g.position.copy(v3(p.pos));sscene.add(g);
    if(id==='base'){const geo=NI(new THREE.DodecahedronGeometry(r,1));const pa=geo.attributes.position,ca=new Float32Array(pa.count*3),c=new THREE.Color();
      for(let i=0;i<pa.count;i++){const x=pa.getX(i),y=pa.getY(i),z=pa.getZ(i);const k=.85+fbm(x*.08+5,z*.08+y*.05)*.3;pa.setXYZ(i,x*k,y*k*.7,z*k);c.set(y>r*.25?0x6fae52:0x7d6a8a);ca[i*3]=c.r;ca[i*3+1]=c.g;ca[i*3+2]=c.b}
      geo.setAttribute('color',new THREE.BufferAttribute(ca,3));geo.computeVertexNormals();g.add(new THREE.Mesh(geo,new THREE.MeshPhongMaterial({vertexColors:true,flatShading:true,shininess:5})));
      const pad=mesh(G.disc,bmat(0xffd36b),0,r*.62,0,5,.3,5,g);const bn=mesh(G.box,mat(0xc9572f),9,r*.6+2,4,6,4,5,g);const tw=mesh(G.cyl,mat(0x8a8aa0),-8,r*.6+4,-6,.4,8,.4,g);
      const bl=glow(0xffab4a,40,.5);bl.position.y=r*.7;g.add(bl);p.mesh=g;return}
    const geo=NI(new THREE.IcosahedronGeometry(r,3)),pa=geo.attributes.position,ca=new Float32Array(pa.count*3),c=new THREE.Color(),base=new THREE.Color(p.col),seed=IDS.indexOf(id)*7.3;
    for(let i=0;i<pa.count;i+=3){let cx=0,cy=0,cz=0;for(let k=0;k<3;k++){cx+=pa.getX(i+k);cy+=pa.getY(i+k);cz+=pa.getZ(i+k)}const n=fbm(cx*.02+seed,cz*.02+cy*.02);
      if(id==='p1')c.copy(base).lerp(new THREE.Color(n>.55?0x6fa840:0xffc070),n>.55?.8:.3);else if(id==='p2')c.copy(base).lerp(new THREE.Color(n>.6?0x5aa8d0:0xffffff),.6);else if(id==='p3')c.copy(base).lerp(new THREE.Color(n>.55?0x3a2456:0xff8fb1),.5);else c.copy(base).lerp(new THREE.Color(n>.55?0xffab4a:0x3b4348),.45);
      const j=.9+Math.random()*.15;for(let k=0;k<3;k++){ca[(i+k)*3]=c.r*j;ca[(i+k)*3+1]=c.g*j;ca[(i+k)*3+2]=c.b*j;const x=pa.getX(i+k),y=pa.getY(i+k),z=pa.getZ(i+k),d=1+(fbm(x*.05+seed,z*.05+y*.03)-.5)*.06;pa.setXYZ(i+k,x*d,y*d,z*d)}}
    geo.setAttribute('color',new THREE.BufferAttribute(ca,3));geo.computeVertexNormals();const pm=new THREE.Mesh(geo,new THREE.MeshPhongMaterial({vertexColors:true,flatShading:true,shininess:8}));g.add(pm);p.body=pm;
    const at=glow(p.col,r*3.1,.35);g.add(at);
    if(p.ring){const rg=new THREE.Mesh(new THREE.RingGeometry(r*1.4,r*2.1,72),new THREE.MeshBasicMaterial({color:p.ring,side:THREE.DoubleSide,transparent:true,opacity:.45,depthWrite:false}));rg.rotation.set(-1.2,.3,0);g.add(rg)}
    if(id==='p4'){const gr=new THREE.Group();g.add(gr);for(let i=0;i<3;i++){const t=mesh(G.tor,mat(0xffab4a),0,0,0,r*.25,r*.25,r*.5,gr);t.position.set(Math.cos(i*2.1)*r*1.6,Math.sin(i*1.3)*r*.3,Math.sin(i*2.1)*r*1.6)}p.gears=gr}
    if(id==='p3'){for(let i=0;i<14;i++){const a=Math.random()*TAU,u=Math.random()*2-1,q=Math.sqrt(1-u*u);const s=glow(0xd7a0ff,6,.8);s.position.set(Math.cos(a)*q*r*1.02,u*r*1.02,Math.sin(a)*q*r*1.02);g.add(s)}}
    p.mesh=g}
  function build(){if(built)return;built=true;
    sscene.background=new THREE.Color(0x05040f);sscene.add(new THREE.HemisphereLight(0xb8c8ff,0x201830,.55));const pl=new THREE.PointLight(0xfff0d0,1.3,0,0);sscene.add(pl);sscene.add(new THREE.AmbientLight(0x605878,.9));
    const skyG=new THREE.Group();sscene.add(skyG);SP.stars=skyG;skyG.add(makeStars(2600,1100,1.6));
    const neb=(c,x,y,z,s,o)=>{const n=glow(c,s,o);n.position.set(x,y,z);n.material.depthWrite=false;n.renderOrder=-8;skyG.add(n);return n};neb(0x6a3aa8,-600,200,-650,900,.22);neb(0x2a6aa8,650,-150,400,800,.18);neb(0xa83a6a,150,350,700,700,.14);
    mesh(new THREE.SphereGeometry(90,32,16),new THREE.MeshBasicMaterial({color:0xffd27a}),0,0,0,1,1,1,sscene);const sg1=glow(0xffb050,520,.9);sscene.add(sg1);const sg2=glow(0xff8a30,900,.35);sscene.add(sg2);
    IDS.forEach(planetMesh);
    const r=rng(77),geo=new THREE.DodecahedronGeometry(1,0);rockIM=new THREE.InstancedMesh(geo,new THREE.MeshPhongMaterial({color:0x8a7f8a,flatShading:true,shininess:4}),320);const m4=new THREE.Matrix4(),c=new THREE.Color();
    for(let i=0;i<320;i++){const a=r()*TAU,d=380+r()*60,s=2+r()*7;const x=Math.cos(a)*d,z=Math.sin(a)*d,y=(r()-.5)*36;rocks.push({x,y,z,s,rx:r()*3,ry:r()*3,sp:(r()-.5)*.6});m4.compose(_p.set(x,y,z),_q.setFromEuler(_e.set(r()*3,r()*3,0)),_s.set(s,s*(.7+r()*.5),s));rockIM.setMatrixAt(i,m4);rockIM.setColorAt(i,c.setHSL(.75+r()*.1,.08,.35+r()*.2))}
    sscene.add(rockIM);
    const CR=[{st:[60,10,560],dir:[-1,0,-.35],rw:15},{st:[-560,0,-520],dir:[1,0,-.15],rw:20},{st:[560,30,140],dir:[.15,0,-1],rw:25}];
    CR.forEach((c,k)=>{const d=v3(c.dir).normalize(),side=new THREE.Vector3(-d.z,0,d.x),pts=[];for(let i=0;i<7;i++)pts.push(v3(c.st).addScaledVector(d,i*70).addScaledVector(side,Math.sin(i*.9)*45).add(new THREE.Vector3(0,Math.cos(i*.7)*25,0)));
      const course={k,rw:c.rw,rings:[],next:0,t:0,on:false};for(let i=0;i<6;i++){const p=pts[i],n=pts[i+1].clone().sub(p).normalize();const tm=mesh(new THREE.TorusGeometry(9,.7,8,32),new THREE.MeshBasicMaterial({color:0x7fe3e8,transparent:true,opacity:.7}),p.x,p.y,p.z,1,1,1,sscene);tm.lookAt(p.clone().add(n));course.rings.push({p,n,m:tm,side:0})}
      rings.push(course)});
    for(let i=0;i<12;i++){const a=r()*TAU,d=180+r()*900,x=Math.cos(a)*d,z=Math.sin(a)*d,y=(r()-.5)*120;if(IDS.some(id=>Math.hypot(PLN[id].pos[0]-x,PLN[id].pos[2]-z)<PLN[id].r+60)){i--;continue}
      const g=ITEMS.crate();g.scale.setScalar(4);g.position.set(x,y,z);g.add(glow(0xffd36b,3,.7));sscene.add(g);junk.push({i,g,x,y,z})}
    comet=new THREE.Group();comet.add(glow(0xbfefff,30,.9));for(let i=1;i<14;i++){const t=glow(0x7fe3e8,30-i*1.6,.5-i*.03);t.position.z=i*12;comet.add(t)}sscene.add(comet);
    const lb=$('#labels');IDS.forEach(id=>{const d=document.createElement('div');d.className='plabel';d.innerHTML=`<b>${PL[id].name}</b><span></span><i></i>`;d.style.color='#'+new THREE.Color(PLN[id].col).getHexString();d.hidden=true;lb.appendChild(d);labels[id]=d});
    const rl=document.createElement('div');rl.className='plabel ringlabel';rl.innerHTML='<b></b><span></span>';rl.hidden=true;lb.appendChild(rl);labels.ring=rl;
    ship=makeUFO(S.paint);sscene.add(ship)}
  function repaint(){if(!ship)return;const p=ship.position.clone(),r=ship.rotation.clone();sscene.remove(ship);disposeTree(ship);ship=makeUFO(S.paint);ship.position.copy(p);ship.rotation.copy(r);sscene.add(ship)}
  const SP={};
  function enter(from){build();repaint();const p=PLN[from];const tgt=routeTarget();const tp=v3(PLN[tgt].pos);const pp=v3(p.pos);let dir=tp.clone().sub(pp);if(dir.lengthSq()<1)dir.set(0,0,-1);dir.normalize();
    sh.pos.copy(pp).addScaledVector(dir,p.r+40);sh.pos.y+=6;sh.vel.set(0,0,0);sh.yaw=Math.atan2(-dir.x,-dir.z);sh.pitch=Math.asin(clamp(dir.y,-1,1))*.5;sh.boost=1;auto=false;camSnap=true;
    junk.forEach(j=>j.g.visible=!S.got['junk'+j.i]);IDS.forEach(id=>labels[id].hidden=false);AU.music('space');AU.ambient(null);AU.engine(true,0,false)}
  function exit(){camera.up.set(0,1,0);camera.fov=75;camera.updateProjectionMatrix();IDS.forEach(id=>labels[id].hidden=true);labels.ring.hidden=true;AU.engine(false);rings.forEach(c=>{c.on=false;c.next=0});$('#timer').hidden=true}
  function routeTarget(){if(S.route&&PLN[S.route])return S.route;const nx=PIDS.find(p=>!S.rescued[p]);if(!S.tr)return'base';return nx||'base'}
  let camSnap=true,holdT=0;const fwd=new THREE.Vector3(),rgt=new THREE.Vector3(),upv=new THREE.Vector3(),camT=new THREE.Vector3();
  function update(dt,inp){if(!built)return;const t=performance.now()/1000;
    // steering
    if(auto&&S.up.auto){const tp=v3(PLN[routeTarget()].pos),d=tp.clone().sub(sh.pos),dist=d.length();d.normalize();const wy=Math.atan2(-d.x,-d.z),wp=Math.asin(clamp(d.y,-1,1));let dy=wy-sh.yaw;dy=Math.atan2(Math.sin(dy),Math.cos(dy));sh.yaw+=dy*Math.min(1,dt*1.5);sh.pitch+=(wp-sh.pitch)*Math.min(1,dt*1.5);inp.thr=1;inp.boost=dist>500&&sh.boost>.3;
      if(dist<PLN[routeTarget()].r+90){auto=false;toast('Автопилот: прибыли. Удерживайте E для посадки')}}
    sh.yaw-=inp.lx;sh.pitch=clamp(sh.pitch-inp.ly,-1.3,1.3);
    fwd.set(-Math.sin(sh.yaw)*Math.cos(sh.pitch),Math.sin(sh.pitch),-Math.cos(sh.yaw)*Math.cos(sh.pitch));rgt.set(Math.cos(sh.yaw),0,-Math.sin(sh.yaw));upv.crossVectors(rgt,fwd);
    const boosting=inp.boost&&sh.boost>.02&&inp.thr>=0;const acc=50*(boosting?(S.up.boost?3.1:2.2):1);
    if(boosting){sh.boost=Math.max(0,sh.boost-dt*(S.up.boost?.18:.25));if(!SP.bst)AU.sfx('boost');SP.bst=true}else{sh.boost=Math.min(1,sh.boost+dt*(S.up.boost?.18:.12));SP.bst=false}
    const thr=boosting?1:inp.thr;sh.vel.addScaledVector(fwd,thr*acc*dt).addScaledVector(rgt,inp.str*30*dt).addScaledVector(upv,inp.vert*30*dt);sh.vel.multiplyScalar(Math.exp(-.9*dt));
    sh.pos.addScaledVector(sh.vel,dt);sh.thr=Math.min(1,Math.abs(thr)+(boosting?.5:0));
    // collisions
    for(const id of IDS){const p=PLN[id],pp=_p.set(p.pos[0],p.pos[1],p.pos[2]),d=sh.pos.distanceTo(pp),m=p.r*(id==='base'?.8:1.02)+4;if(d<m){const n=sh.pos.clone().sub(pp).normalize();sh.pos.copy(pp).addScaledVector(n,m);const vn=sh.vel.dot(n);if(vn<0)sh.vel.addScaledVector(n,-vn*1.4);if(vn<-15){AU.sfx('thud');shake=.4}}}
    const ds=sh.pos.length();if(ds<150){const n=sh.pos.clone().normalize();sh.vel.addScaledVector(n,(150-ds)*dt*6);if(!SP.hotT||t-SP.hotT>3){SP.hotT=t;toast('Слишком жарко! Звезда отталкивает тарелку');AU.sfx('bad')}}
    if(ds>1350){sh.vel.addScaledVector(sh.pos.clone().normalize(),-(ds-1350)*dt*.8);if(!SP.farT||t-SP.farT>4){SP.farT=t;toast('Дальше только пустота. Разворачивайся')}}
    for(const r of rocks){const dx=sh.pos.x-r.x,dy=sh.pos.y-r.y,dz=sh.pos.z-r.z,m=r.s+3.2;if(Math.abs(dx)<m&&Math.abs(dz)<m&&Math.abs(dy)<m){const d=Math.hypot(dx,dy,dz);if(d<m&&d>.01){const n=new THREE.Vector3(dx/d,dy/d,dz/d);sh.pos.set(r.x,r.y,r.z).addScaledVector(n,m);const vn=sh.vel.dot(n);if(vn<0){sh.vel.addScaledVector(n,-vn*(S.up.shield?1.3:1.6));if(!S.up.shield)sh.vel.multiplyScalar(.6)}AU.sfx('thud');shake=.5;FXS.burst(sh.pos.x-n.x*3,sh.pos.y-n.y*3,sh.pos.z-n.z*3,{col:0xbbaacc,n:14,spd:8,g:0,life:.8,size:1.2})}}}
    // junk
    for(const j of junk){if(!j.g.visible)continue;j.g.rotation.y+=dt;j.g.rotation.x+=dt*.5;if(sh.pos.distanceTo(j.g.position)<8){j.g.visible=false;S.got['junk'+j.i]=1;addCoins(3);AU.sfx('chest');toast('Космический ящик: +3 монеты');FXS.burst(j.x,j.y,j.z,{col:0xffd36b,n:30,spd:10,g:0,life:1,size:1.4})}}
    // rings
    let near=null;for(const c of rings){const r=c.rings[c.next];if(!r)continue;const rel=_p.copy(sh.pos).sub(r.p),side=rel.dot(r.n),lat=rel.clone().addScaledVector(r.n,-side).length();
      if(r.side<0&&side>=0&&lat<9.5){AU.sfx('ring');FXS.burst(r.p.x,r.p.y,r.p.z,{col:0x7fe3e8,n:30,spd:10,g:0,life:.8,size:1.2});r.m.material.color.set(0x8ee08a);if(c.next===0){c.on=true;c.t=45}c.next++;
        if(c.next>=6){const first=!S.got['ring'+c.k];c.on=false;$('#timer').hidden=true;if(first){S.got['ring'+c.k]=1;save();banner('Кольца пройдены',['Мандариновая трасса','Ледяная трасса','Заводская трасса'][c.k],'+'+coinsWord(c.rw));setTimeout(()=>addCoins(c.rw),300)}else{addCoins(2);toast('Трасса пройдена снова: +2 монеты')}AU.sfx('quest');setTimeout(()=>{c.next=0;c.rings.forEach(x=>{x.m.material.color.set(0x7fe3e8);x.side=0})},1500)}}
      r.side=side;if(c.on){c.t-=dt;const tm=$('#timer');tm.hidden=false;tm.innerHTML=`<small>Кольца: ${c.next} из 6</small>${c.t.toFixed(1)}`;tm.classList.toggle('warn',c.t<8);if(c.t<=0){c.on=false;c.next=0;tm.hidden=true;c.rings.forEach(x=>{x.m.material.color.set(0x7fe3e8);x.side=0});toast('Время на трассе вышло. Начните с первого кольца')}}
      const d0=sh.pos.distanceTo(c.rings[c.next]?c.rings[c.next].p:c.rings[0].p);if(d0<350&&(!near||d0<near.d))near={c,d:d0}}
    rings.forEach(c=>c.rings.forEach((r,i)=>{r.m.material.opacity=i===c.next?.95:.35;if(i===c.next)r.m.scale.setScalar(1+Math.sin(t*4)*.05)}));
    // ship visual
    ship.position.copy(sh.pos);const latV=sh.vel.dot(rgt);sh.roll+=(clamp(-latV*.02-inp.lx*8,-.6,.6)-sh.roll)*Math.min(1,dt*4);ship.rotation.set(0,0,0);ship.rotateY(sh.yaw);ship.rotateX(sh.pitch*.5);ship.rotateZ(sh.roll);ship.userData.update(t,sh.thr);
    // camera
    const sk=shake>0?(shake-=dt,shake*.6):0;
    if(cam===0){camT.copy(sh.pos).addScaledVector(fwd,-15).addScaledVector(upv,5);if(camSnap){camera.position.copy(camT);camSnap=false}else camera.position.lerp(camT,1-Math.exp(-dt*7));camera.up.copy(upv);camera.lookAt(_p.copy(sh.pos).addScaledVector(fwd,10).addScaledVector(upv,1.5));ship.userData.dome.visible=true;ship.userData.head.root.visible=true}
    else{camera.position.copy(sh.pos).addScaledVector(upv,1.25).addScaledVector(fwd,.4);camera.up.copy(upv);camera.lookAt(_p.copy(camera.position).add(fwd));ship.userData.dome.visible=false;ship.userData.head.root.visible=false}
    if(sk){camera.position.x+=(Math.random()-.5)*sk;camera.position.y+=(Math.random()-.5)*sk}
    const spd=sh.vel.length();camera.fov+=(75+Math.min(spd/6,18)-camera.fov)*Math.min(1,dt*3);camera.updateProjectionMatrix();
    SP.stars.position.copy(camera.position);
    // planets spin, comet
    IDS.forEach(id=>{const p=PLN[id];if(p.body)p.body.rotation.y+=dt*.02;if(p.gears)p.gears.rotation.y+=dt*.2});
    const ca=t*.03;comet.position.set(Math.cos(ca)*1000,200+Math.sin(ca*2)*80,Math.sin(ca)*700);comet.lookAt(Math.cos(ca-.05)*1000,200+Math.sin((ca-.05)*2)*80,Math.sin(ca-.05)*700);comet.rotateY(Math.PI);
    // landing prompt
    let land=null,ld=1e9;for(const id of IDS){const p=PLN[id],d=sh.pos.distanceTo(_p.set(p.pos[0],p.pos[1],p.pos[2]));if(d<p.r+70&&d<ld){ld=d;land=id}}
    if(land){if(inp.eHeld){holdT+=dt;if(holdT>=1){holdT=0;landOn(land);return}}else holdT=0;showPrompt('Удерживайте E - посадка: '+PL[land].name,holdT/1)}else{holdT=0;showPrompt(null)}
    if(land&&S.route===land){S.route=null;save()}
    // hud
    $('#spd').textContent=Math.round(spd);$('#boostFill').style.width=(sh.boost*100)+'%';
    const tgt=routeTarget();IDS.forEach(id=>{const el=labels[id],p=PLN[id];tmpV.set(p.pos[0],p.pos[1]+p.r*1.15,p.pos[2]);const d=sh.pos.distanceTo(_p.set(p.pos[0],p.pos[1],p.pos[2]));tmpV.project(camera);
      if(tmpV.z>1||Math.abs(tmpV.x)>1.1||Math.abs(tmpV.y)>1.1){el.style.display='none';return}el.style.display='';el.style.transform=`translate(${(tmpV.x*.5+.5)*innerWidth}px,${(-tmpV.y*.5+.5)*innerHeight}px) translate(-50%,-100%)`;el.classList.toggle('tgt',id===tgt);el.querySelector('span').textContent=(S.rescued[id]||id==='base'?'':'брат ждёт · ')+Math.round(d)+' м'});
    const rl=labels.ring;if(near){const r=near.c.rings[near.c.next]||near.c.rings[0];tmpV.copy(r.p);tmpV.y+=12;tmpV.project(camera);if(tmpV.z<1&&Math.abs(tmpV.x)<1.1&&Math.abs(tmpV.y)<1.1){rl.hidden=false;rl.style.transform=`translate(${(tmpV.x*.5+.5)*innerWidth}px,${(-tmpV.y*.5+.5)*innerHeight}px) translate(-50%,-100%)`;rl.querySelector('b').textContent=near.c.next===0?'Трасса колец: влетайте':'Кольцо '+(near.c.next+1);rl.querySelector('span').textContent=S.got['ring'+near.c.k]?'пройдена':'награда '+near.c.rw}else rl.hidden=true}else rl.hidden=true;
  }
  function objective(){const tgt=routeTarget(),p=PLN[tgt];const d=sh.pos.distanceTo(_p.set(p.pos[0],p.pos[1],p.pos[2]));
    let text=tgt==='base'?(!S.tr?'Вернись на базу: без переводчика на планетах не обойтись':'Курс: база Пастбище'):`Курс: ${PL[tgt].name}`+(S.rescued[tgt]?'':' · там ждёт '+CAST[PL[tgt].bro].name);
    if(auto)text='Автопилот · '+text;return{text,pos:[p.pos[0],p.pos[1]+p.r*1.1,p.pos[2]],dist:Math.round(d)+' м',tag:'Борткомпьютер'}}
  /* ---------- MAP ---------- */
  let mapSel=null;const mc=$('#mapc');
  function openMap(){build();mapSel=routeTarget();openScreen('#map');$('#mAuto').hidden=!S.up.auto;renderMapInfo();resizeMap();requestAnimationFrame(()=>requestAnimationFrame(resizeMap))}
  function resizeMap(){if($('#map').hidden)return;const r=mc.getBoundingClientRect(),dpr=Math.min(2,devicePixelRatio||1);mc.width=Math.max(10,r.width*dpr);mc.height=Math.max(10,r.height*dpr);drawMap()}
  function mapXY(x,z){const w=mc.width,h=mc.height,s=(Math.min(w,h)/2-30)/1250;return[w/2+x*s,h/2+z*s,s]}
  function drawMap(){const g=mc.getContext('2d'),w=mc.width,h=mc.height,dpr=w/mc.getBoundingClientRect().width||1;g.clearRect(0,0,w,h);const[cx,cy,s]=mapXY(0,0);
    g.strokeStyle='rgba(255,255,255,.06)';g.lineWidth=1;for(let r=250;r<=1250;r+=250){g.beginPath();g.arc(cx,cy,r*s,0,TAU);g.stroke()}
    g.strokeStyle='rgba(180,160,200,.28)';g.lineWidth=60*s;g.setLineDash([3*dpr,5*dpr]);g.beginPath();g.arc(cx,cy,410*s,0,TAU);g.stroke();g.setLineDash([]);
    const sg=g.createRadialGradient(cx,cy,0,cx,cy,140*s);sg.addColorStop(0,'#fff2c0');sg.addColorStop(.5,'rgba(255,180,80,.6)');sg.addColorStop(1,'rgba(255,140,40,0)');g.fillStyle=sg;g.beginPath();g.arc(cx,cy,140*s,0,TAU);g.fill();
    g.font=`700 ${11*dpr}px Nunito, sans-serif`;g.textAlign='center';g.fillStyle='rgba(255,240,200,.7)';g.fillText('Звезда',cx,cy+(100*s)+12*dpr);g.fillText('Пояс астероидов',cx,cy-450*s);
    rings.forEach(c=>{g.strokeStyle=S.got['ring'+c.k]?'rgba(142,224,138,.7)':'rgba(127,227,232,.8)';g.lineWidth=1.5*dpr;c.rings.forEach(r=>{const[x,y]=mapXY(r.p.x,r.p.z);g.beginPath();g.arc(x,y,3.5*dpr,0,TAU);g.stroke()})});
    junk.forEach(j=>{if(S.got['junk'+j.i])return;const[x,y]=mapXY(j.x,j.z);g.fillStyle='rgba(255,211,107,.8)';g.fillRect(x-2*dpr,y-2*dpr,4*dpr,4*dpr)});
    const[sx,sy]=mapXY(sh.pos.x,sh.pos.z),tg=PLN[mapSel||routeTarget()];if(tg){const[tx,ty]=mapXY(tg.pos[0],tg.pos[2]);g.strokeStyle='#ffab4a';g.lineWidth=2*dpr;g.setLineDash([6*dpr,6*dpr]);g.beginPath();g.moveTo(sx,sy);g.lineTo(tx,ty);g.stroke();g.setLineDash([])}
    IDS.forEach(id=>{const p=PLN[id],[x,y]=mapXY(p.pos[0],p.pos[2]),rr=Math.max(9*dpr,p.r*s*1.6);g.fillStyle='#'+new THREE.Color(p.col).getHexString();g.beginPath();g.arc(x,y,rr,0,TAU);g.fill();
      if(id===mapSel){g.strokeStyle='#ffd36b';g.lineWidth=3*dpr;g.beginPath();g.arc(x,y,rr+5*dpr,0,TAU);g.stroke()}
      g.fillStyle='#f7eee1';g.font=`400 ${13*dpr}px "Russo One", sans-serif`;g.fillText(PL[id].name,x,y-rr-8*dpr);g.font=`700 ${11*dpr}px Nunito, sans-serif`;g.fillStyle=id==='base'?'#b3a8c9':S.rescued[id]?'#8ee08a':'#ffab4a';g.fillText(id==='base'?'дом':S.rescued[id]?'брат спасён':CAST[PL[id].bro].name+' ждёт',x,y+rr+14*dpr)});
    g.save();g.translate(sx,sy);g.rotate(-sh.yaw);g.fillStyle='#7fe3e8';g.beginPath();g.moveTo(0,-10*dpr);g.lineTo(7*dpr,8*dpr);g.lineTo(0,4*dpr);g.lineTo(-7*dpr,8*dpr);g.closePath();g.fill();g.restore();
    g.fillStyle='#7fe3e8';g.font=`800 ${11*dpr}px Nunito, sans-serif`;g.fillText('Вы здесь',sx,sy+20*dpr)}
  function renderMapInfo(){const done=id=>Object.keys(QUESTS).filter(q=>QUESTS[q].pl===id&&qdone(q)).length,all=id=>Object.keys(QUESTS).filter(q=>QUESTS[q].pl===id).length;
    $('#mapInfo').innerHTML=IDS.map(id=>{const d=Math.round(sh.pos.distanceTo(_p.set(PLN[id].pos[0],PLN[id].pos[1],PLN[id].pos[2])));
      return `<button class="mi ${id===mapSel?'cur':''}" data-pl="${id}" style="text-align:left;${id===mapSel?'border-color:var(--mandarin);background:rgba(255,171,74,.1)':''}"><b style="color:#${new THREE.Color(PLN[id].col).getHexString()}">${PL[id].name}</b><span>${PL[id].kind}. ${PL[id].desc}.</span><span>${id==='base'?'Лавка, братья, Радист Крот':(S.rescued[id]?'Брат спасён':'Здесь '+CAST[PL[id].bro].name)} · заданий ${done(id)} из ${all(id)}${SOUV[id]?(S.souv[id]?' · сувенир найден':' · сувенир спрятан'):''} · ${d} м</span></button>`}).join('')+
      `<p>Колец пройдено: ${[0,1,2].filter(k=>S.got['ring'+k]).length} из 3. Ящиков собрано: ${junk.filter(j=>S.got['junk'+j.i]).length} из ${junk.length}.</p>`;
    $('#mClose').textContent=mapSel?'Лететь: '+PL[mapSel].name:'Лететь'}
  $('#mapInfo').addEventListener('click',e=>{const b=e.target.closest('[data-pl]');if(!b)return;select(b.dataset.pl)});
  function select(id){mapSel=id;S.route=id;save();AU.sfx('ui');drawMap();renderMapInfo()}
  mc.addEventListener('pointerdown',e=>{const r=mc.getBoundingClientRect(),dpr=mc.width/r.width,x=(e.clientX-r.left)*dpr,y=(e.clientY-r.top)*dpr;let best=null,bd=50*dpr;IDS.forEach(id=>{const[px,py]=mapXY(PLN[id].pos[0],PLN[id].pos[2]);const d=Math.hypot(px-x,py-y);if(d<bd){bd=d;best=id}});if(best)select(best)});
  $('#mClose').addEventListener('click',()=>closeScreen());
  $('#mAuto').addEventListener('click',()=>{if(!S.up.auto)return;if(!mapSel)mapSel=routeTarget();S.route=mapSel;auto=true;save();closeScreen();toast('Автопилот включён. Любое движение мышью его не отключит, нажмите W или S')});
  return{build,enter,exit,update,objective,openMap,resizeMap,repaint,setCam:()=>{cam=1-cam;toast(cam?'Вид из кабины':'Вид сзади')},stopAuto:()=>{if(auto){auto=false;toast('Автопилот выключен')}},get auto(){return auto},PLN};
})();
function spaceObjective(){return SPX.objective()}
UI.resizeMap=()=>SPX.resizeMap();
