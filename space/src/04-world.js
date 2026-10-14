/* ---------- LEVEL + PLAYER PHYSICS ---------- */
let L=null;
const P={x:0,y:0,z:0,vx:0,vy:0,vz:0,yaw:0,pitch:0,ground:true,sup:null,coyote:0,jumps:0,ladder:false,camY:1.6,bob:0,stepT:0,carry:null,fov:75,airT:0};
const STEP=.55,EYE=1.6,PR=.38,PH=1.72,GRAV=24,JUMPV=8.3;
const tmpV=new THREE.Vector3();

function hash2(x,z){const s=Math.sin(x*127.1+z*311.7)*43758.5453;return s-Math.floor(s)}
function noise2(x,z){const xi=Math.floor(x),zi=Math.floor(z),xf=x-xi,zf=z-zi,u=xf*xf*(3-2*xf),v=zf*zf*(3-2*zf);return lerp(lerp(hash2(xi,zi),hash2(xi+1,zi),u),lerp(hash2(xi,zi+1),hash2(xi+1,zi+1),u),v)}
function fbm(x,z){return noise2(x,z)*.6+noise2(x*2.1,z*2.1)*.28+noise2(x*4.3,z*4.3)*.12}

function newLevel(id,cfg){
  if(L){wscene.remove(L.group);disposeTree(L.group)}
  FXW.clear();tweens.length=0;
  L={id,cfg:cfg||{},group:new THREE.Group(),batch:new Batch(),gbatch:new Batch(),solids:[],ladders:[],triggers:[],inters:[],picks:[],movers:[],ticks:[],npcs:[],water:[],targets:[],proj:[],paths:[],spawn:{x:0,y:0,z:8,yaw:0},radius:62,surface:'grass',checkpoint:null,objective:null,update:null,canThrow:false,noGrass:[]};
  wscene.add(L.group);P.carry=null;updCarry();
}
const vis=(g,col,x,y,z,sx,sy,sz,rx,ry,rz,jit)=>L.batch.add(g,col,x,y,z,sx,sy,sz,rx,ry,rz,jit);
const gvis=(g,col,x,y,z,sx,sy,sz,rx,ry,rz)=>L.gbatch.add(g,col,x,y,z,sx,sy,sz,rx,ry,rz,0);
function addC(c){c.on=true;L.solids.push(c);return c}
function box(x,y,z,w,h,d,col,o){o=o||{};if(!o.nv)(o.glow?gvis:vis)(G.box,col,x,y+h/2,z,w,h,d,0,o.ry||0,0,o.jit);if(o.nc)return null;let W=w,D=d;if(o.ry&&Math.abs(Math.sin(o.ry))>.7){W=d;D=w}
  return addC({k:'b',x0:x-W/2,x1:x+W/2,y0:y,y1:y+h,z0:z-D/2,z1:z+D/2,t:o.t||'solid',surf:o.surf,pow:o.pow})}
function cyl(x,y,z,r,h,col,o){o=o||{};if(!o.nv)vis(o.g||G.cyl,col,x,y+h/2,z,r,h,r,0,o.ry||0,0,o.jit);if(o.nc)return null;return addC({k:'c',x,z,r:o.cr||r,y0:y,y1:y+h,t:o.t||'solid',surf:o.surf,pow:o.pow})}
function dynBox(x,y,z,w,h,d,col,o){o=o||{};const m=mesh(G.box,o.m||new THREE.MeshPhongMaterial({color:col,flatShading:true,shininess:10,specular:0x181818}),x,y+h/2,z,w,h,d,L.group);m.castShadow=m.receiveShadow=true;const c=addC({k:'b',x0:x-w/2,x1:x+w/2,y0:y,y1:y+h,z0:z-d/2,z1:z+d/2,t:o.t||'solid',surf:o.surf,w,h,d,m});return c}
function setBox(c,x,y,z){const dx=x-(c.x0+c.x1)/2,dy=y-c.y0,dz=z-(c.z0+c.z1)/2;c.x0+=dx;c.x1+=dx;c.y0+=dy;c.y1+=dy;c.z0+=dz;c.z1+=dz;if(c.m)c.m.position.set(x,y+c.h/2,z);return[dx,dy,dz]}
function mover(c,fn){const mv={c,fn,dx:0,dy:0,dz:0};c.mv=mv;L.movers.push(mv);return mv}
function crackTile(x,y,z,w,d,col){const c=dynBox(x,y,z,w,.35,d,col,{surf:'ice'});c.crack={t:0,down:0,bx:x,bz:z,by:y};
  c.onStand=dt=>{if(c.crack.down>0)return;c.crack.t+=dt;if(c.crack.t>.15&&!c.crack.snd){c.crack.snd=1;AU.sfx('crack')}};return c}
function ladder(x,z,y0,y1,ry,col){col=col||0x8a5a32;const s=Math.sin(ry),cs=Math.cos(ry);const h=y1-y0;
  for(const k of[-1,1])vis(G.box,col,x+cs*k*.32,y0+h/2,z-s*k*.32,.07,h,.07,0,ry,0);for(let y=y0+.35;y<y1;y+=.42)vis(G.box,col,x,y,z,.62,.05,.05,0,ry,0);
  L.ladders.push({x0:x-.45,x1:x+.45,z0:z-.45,z1:z+.45,y0,y1:y1+.25})}
function stairs(x,y,z,ry,n,w,sh,sd,col,o){const s=Math.sin(ry),c=Math.cos(ry);for(let i=0;i<n;i++){const d=i*sd+sd/2;box(x+s*d,y,z+c*d,(Math.abs(s)>.7?sd:w),sh*(i+1),(Math.abs(s)>.7?w:sd),col,o)}}
function trig(x0,x1,y0,y1,z0,z1,o){const t=Object.assign({x0,x1,y0,y1,z0,z1,in:false,on:true},o);L.triggers.push(t);return t}
function inter(o){const it=Object.assign({y:0,r:2.4,hold:0},o);L.inters.push(it);return it}
function tick(fn){L.ticks.push(fn)}
function path(pts,w,col){L.paths.push({pts,w,col})}
function water(x,z,r,o){L.water.push({x,z,r,hazard:!(o&&o.safe)});const m=mesh(new THREE.CircleGeometry(r,48),new THREE.MeshPhongMaterial({color:(o&&o.col)||0x3aa0d0,transparent:true,opacity:.82,shininess:120,specular:0xaaddff}),x,(o&&o.y)||.03,z,1,1,1,L.group);m.rotation.x=-Math.PI/2;m.receiveShadow=true;L.noGrass.push([x,z,r+.5]);return m}
function inWater(x,z){for(const w of L.water)if(w.hazard&&(x-w.x)*(x-w.x)+(z-w.z)*(z-w.z)<w.r*w.r)return true;return false}

/* pickups: coins, chests, carried items */
function coin(id,x,y,z){if(S.got[id])return;const o=coinMesh();o.position.set(x,y+.9,z);L.group.add(o);L.picks.push({id,x,y:y+.9,z,obj:o,coin:true})}
function coinRow(id,pts){pts.forEach((p,i)=>coin(id+i,p[0],p[1],p[2]))}
function itemPick(id,x,y,z,obj,cond,onGet){if(S.got[id])return null;obj.position.set(x,y,z);L.group.add(obj);const p={id,x,y:y+.4,z,obj,cond,onGet,base:y};L.picks.push(p);return p}
function chest(id,x,y,z,ry,n){const m=makeChest();m.position.set(x,y,z);m.rotation.y=ry||0;L.group.add(m);const open=!!S.got[id];if(open)m.userData.lid.rotation.x=-1.9;
  const s=Math.abs(Math.sin(ry||0))>.7;box(x,y,z,s?.6:.9,.55,s?.9:.6,0,{nv:true});
  if(!open){const it=inter({x,y:y+.4,z,r:2,label:'E - открыть сундук',act:()=>{S.got[id]=1;L.inters.splice(L.inters.indexOf(it),1);AU.sfx('chest');tween(.5,p=>{m.userData.lid.rotation.x=-1.9*p});FXW.burst(x,y+.8,z,{col:0xffd36b,n:30,spd:4,up:5,life:1});addCoins(n);toast(`Сундук: +${coinsWord(n)}`);if(L.onChest)L.onChest(id)}})}}
function carryItem(kind,make,x,y,z,o){o=o||{};const obj=make();obj.position.set(x,y,z);L.group.add(obj);const label=o.label||'взять';
  const it=inter({x,y:y+.4,z,r:1.9,label:'E - '+label,cond:()=>!P.carry&&(!o.when||o.when()),act:()=>{L.inters.splice(L.inters.indexOf(it),1);L.group.remove(obj);P.carry={kind,make,o,obj:null};updCarry();AU.sfx('pickup');if(o.onPick)o.onPick()}});
  L.ticks.push(t=>{if(obj.parent)obj.rotation.y=t*.8});return it}
function dropCarry(){if(!P.carry)return;const c=P.carry;P.carry=null;updCarry();const fx=-Math.sin(P.yaw),fz=-Math.cos(P.yaw);carryItem(c.kind,c.make,P.x+fx*.9,P.y,P.z+fz*.9,c.o);AU.sfx('drop')}
let carryMesh=null;
function updCarry(){if(carryMesh){camera.remove(carryMesh);disposeTree(carryMesh);carryMesh=null}const tag=$('#carryTag');
  if(P.carry){carryMesh=P.carry.make();carryMesh.scale.setScalar(.6);carryMesh.position.set(.42,-.5,-.85);carryMesh.traverse(o=>{if(o.material)o.renderOrder=6});camera.add(carryMesh);tag.hidden=false;tag.textContent=(P.carry.o.name||'Предмет')+(isTouch?' · E у цели':' · E у цели, Q - бросить')}else if(tag)tag.hidden=true}

/* NPCs */
function npc(key,x,y,z,o){o=o||{};const c=makeCast(key);c.root.position.set(x,y,z);c.root.rotation.y=o.yaw||0;L.group.add(c.root);
  const n={c,key,x,y,z,o,pose:o.pose||'idle',pi:0,wait:0,speed:o.speed||1.5,col:null};
  if(!o.nc)n.col=addC({k:'c',x,z,r:o.cr||.45*c.s+.1,y0:y,y1:y+c.h*.9,t:'solid'});
  if(o.talk)n.it=inter({x,y:y+.9,z,r:o.r||2.6,label:o.label||'E - поговорить: '+CAST[key].name,act:()=>o.talk(n)});
  const mk=textSprite('!',{fg:'#20163a',bg:'#ffab4a',size:64,h:.55});mk.visible=false;mk.position.y=c.h+.55;c.root.add(mk);n.mk=mk;
  const mq=textSprite('?',{fg:'#20163a',bg:'#7fe3e8',size:64,h:.55});mq.visible=false;mq.position.y=c.h+.55;c.root.add(mq);n.mq=mq;
  L.npcs.push(n);return n}
function updNPCs(t,dt){for(const n of L.npcs){const c=n.c;let pose=n.pose;
  if(n.o.walk&&!n.hold){const pts=n.o.walk,tg=pts[n.pi];if(n.wait>0){n.wait-=dt}else{const dx=tg[0]-n.x,dz=tg[1]-n.z,d=Math.hypot(dx,dz);if(d<.15){n.pi=(n.pi+1)%pts.length;n.wait=n.o.pause!=null?n.o.pause:1.5}else{const s=Math.min(d,n.speed*dt);n.x+=dx/d*s;n.z+=dz/d*s;const ya=Math.atan2(dx,dz);let df=ya-c.root.rotation.y;df=Math.atan2(Math.sin(df),Math.cos(df));c.root.rotation.y+=df*Math.min(1,dt*6);c.walkPh+=dt*n.speed*5;pose='walk';if(n.o.hop)c.root.position.y=n.y+Math.abs(Math.sin(c.walkPh*.5))*.4}}
    c.root.position.x=n.x;c.root.position.z=n.z;if(n.col){n.col.x=n.x;n.col.z=n.z}if(n.it){n.it.x=n.x;n.it.z=n.z}}
  if(n.o.face&&mode==='dialog'&&n===talkingTo){const ya=Math.atan2(P.x-n.x,P.z-n.z);let df=ya-c.root.rotation.y;df=Math.atan2(Math.sin(df),Math.cos(df));c.root.rotation.y+=df*Math.min(1,dt*4)}
  charPose(c,t,pose,dt,n.o.noLook?null:tmpV.set(P.x,P.y,P.z));
  const m=n.o.mark?n.o.mark():null;n.mk.visible=m==='!';n.mq.visible=m==='?';const by=(n.pose==='sit'||n.pose==='dangle'||n.pose==='fish'?c.h*.72:n.pose==='lie'?.9:c.h)+.55+Math.sin(t*3)*.08;n.mk.position.y=n.mq.position.y=by}}
let talkingTo=null;
function talk(n,lines,onEnd){talkingTo=n;say(lines,()=>{talkingTo=null;if(onEnd)onEnd()})}
const SYL=['блорп','кзык','ууф','тррр','мнях','зиб','вуу','флюк','шшп','гррм','пик','ыых','бзз','чирк','кво','фьють'];
function gib(){let s='';const n=6+Math.floor(Math.random()*5);for(let i=0;i<n;i++)s+=pick(SYL)+(Math.random()<.18?'! ':Math.random()<.18?'? ':' ');return s.trim()}
function needTr(key){if(S.tr)return false;say([[key,gib(),'alien'],[key,gib(),'alien'],['kapik','Ни слова не понимаю. Нужен универсальный переводчик из лавки Тётушки Выдры на базе.']]);return true}

/* tweens */
const tweens=[];
function tween(d,fn,done){tweens.push({t:0,d,fn,done})}
function updTweens(dt){for(let i=tweens.length-1;i>=0;i--){const w=tweens[i];w.t+=dt;const p=Math.min(1,w.t/w.d);w.fn(p);if(p>=1){tweens.splice(i,1);if(w.done)w.done()}}}

/* ---------- WORLD BUILD HELPERS ---------- */
function setSky(o){
  wscene.background=new THREE.Color(o.hor);wscene.fog=new THREE.Fog(o.fog||o.hor,o.near||40,o.far||170);
  hemi.color.set(o.hs);hemi.groundColor.set(o.hg);hemi.intensity=o.hi;sun.color.set(o.sc);sun.intensity=o.si;
  L.sunDir=new THREE.Vector3(o.sd[0],o.sd[1],o.sd[2]).normalize();
  const sky=makeSky(o.top,o.hor,o.bot||o.hor,L.sunDir,o.sunGlow||o.sc);L.group.add(sky);L.sky=sky;
  if(o.stars){const st=makeStars(900,420,1.4);L.group.add(st);L.stars=st}
}
function makeGround(o){
  const N=96,S2=230,g=new THREE.PlaneGeometry(S2,S2,N,N);g.rotateX(-Math.PI/2);const pos=g.attributes.position,col=new Float32Array(pos.count*3);
  const c1=new THREE.Color(o.c1),c2=new THREE.Color(o.c2),cm=new THREE.Color(o.mount),cs=new THREE.Color(o.snow||o.mount),cp=new THREE.Color(o.path||o.c2),tmp=new THREE.Color();
  for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i),r=Math.hypot(x,z);let y=0;const n=fbm(x*.06+o.seed,z*.06);tmp.copy(c1).lerp(c2,clamp(n*1.6-.4,0,1));
    if(r>66){const k=r-66;y=(1-Math.exp(-k/12))*(o.mh||20)*(.55+fbm(x*.04,z*.04+o.seed)*.9)+fbm(x*.15,z*.15)*2;tmp.copy(cm).lerp(c1,clamp(1-k/8,0,1)*.6);if(y>(o.snowY||22))tmp.lerp(cs,clamp((y-(o.snowY||22))/6,0,1))}
    else{for(const p of L.paths){const d=distPoly(x,z,p.pts);if(d<p.w){tmp.lerp(new THREE.Color(p.col||o.path),clamp((p.w-d)/p.w*2,0,1)*.9)}}}
    pos.setY(i,y);col[i*3]=tmp.r;col[i*3+1]=tmp.g;col[i*3+2]=tmp.b}
  g.setAttribute('color',new THREE.BufferAttribute(col,3));g.computeVertexNormals();
  const m=new THREE.Mesh(g,new THREE.MeshPhongMaterial({vertexColors:true,flatShading:true,shininess:4,specular:0x0}));m.receiveShadow=true;L.group.add(m);
}
function distPoly(x,z,pts){let best=1e9;for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1],dx=b[0]-a[0],dz=b[1]-a[1],l=dx*dx+dz*dz;let t=l?((x-a[0])*dx+(z-a[1])*dz)/l:0;t=clamp(t,0,1);const d=Math.hypot(x-a[0]-dx*t,z-a[1]-dz*t);if(d<best)best=d}return best}
function grass(n,cols,seed,o){o=o||{};const r=rng(seed),g=new THREE.ConeGeometry(.07,.45,4);g.translate(0,.22,0);const im=new THREE.InstancedMesh(g,new THREE.MeshLambertMaterial({color:0xffffff}),n*3);const m4=new THREE.Matrix4(),c=new THREE.Color();let k=0;
  for(let i=0;i<n&&k<n*3-3;i++){const a=r()*TAU,d=4+Math.sqrt(r())*58,x=Math.cos(a)*d,z=Math.sin(a)*d;if(blocked(x,z))continue;if(L.paths.some(p=>distPoly(x,z,p.pts)<p.w))continue;
    for(let j=0;j<3;j++){const s=(.7+r()*.8)*(o.scale||1);m4.makeRotationFromEuler(_e.set((r()-.5)*.5,r()*TAU,(r()-.5)*.5));m4.scale(_s.set(s,s*(.8+r()*.8),s));m4.setPosition(x+(r()-.5)*.5,0,z+(r()-.5)*.5);im.setMatrixAt(k,m4);im.setColorAt(k,c.set(pick(cols)).multiplyScalar(.85+r()*.3));k++}}
  im.count=k;im.receiveShadow=true;L.group.add(im)}
function blocked(x,z){for(const c of L.solids){if(c.y0>.3)continue;if(c.k==='b'){if(x>c.x0-.3&&x<c.x1+.3&&z>c.z0-.3&&z<c.z1+.3)return true}else if(Math.hypot(x-c.x,z-c.z)<c.r+.3)return true}for(const w of L.noGrass)if(Math.hypot(x-w[0],z-w[1])<w[2])return true;return false}
function finishLevel(){const m=L.batch.build(batchMat);if(m){m.castShadow=m.receiveShadow=true;L.group.add(m)}const gm=L.gbatch.build(glowBatchMat);if(gm)L.group.add(gm);L.batch=null;L.gbatch=null}

/* common scenery */
function tree(x,z,s,crown,o){o=o||{};vis(G.cyl,o.trunk||0x6b4628,x,1.1*s,z,.22*s,2.2*s,.22*s);vis(G.ico1,crown,x,2.9*s,z,1.5*s,1.25*s,1.5*s,0,x*z);vis(G.ico1,crown,x+.5*s,3.6*s,z-.2*s,.9*s,.8*s,.9*s,0,x);
  if(o.fruit!=null)for(let i=0;i<7;i++){const a=i/7*TAU+.4;gvis(G.sph,o.fruit,x+Math.cos(a)*1.35*s,2.7*s+Math.sin(i*2.1)*.5*s,z+Math.sin(a)*1.35*s,.17*s,.17*s,.17*s)}
  cyl(x,0,z,.32*s,2.4*s,0,{nv:true})}
function pine(x,z,s,col,snow){vis(G.cyl,0x5a3a22,x,.6*s,z,.2*s,1.2*s,.2*s);for(let i=0;i<3;i++){vis(G.cone,col,x,(1.4+i*1.1)*s,z,(1.6-i*.4)*s,1.6*s,(1.6-i*.4)*s,0,i);if(snow)vis(G.cone,0xf4f8fb,x,(1.75+i*1.1)*s,z,(1.0-i*.25)*s,.9*s,(1.0-i*.25)*s,0,i)}cyl(x,0,z,.35*s,2*s,0,{nv:true})}
function rock(x,z,s,col,o){vis(G.dod,col,x,.4*s,z,s,s*.7,s,0,x*z);if(!(o&&o.nc))cyl(x,0,z,.8*s,.7*s,0,{nv:true})}
function fence(x0,z0,x1,z1,col,o){o=o||{};const d=Math.hypot(x1-x0,z1-z0),n=Math.max(1,Math.round(d/2)),ry=Math.atan2(x1-x0,z1-z0),h=o.h||1;
  for(let i=0;i<=n;i++){const t=i/n;vis(G.box,col,lerp(x0,x1,t),h/2,lerp(z0,z1,t),.14,h,.14)}vis(G.box,col,(x0+x1)/2,h*.75,(z0+z1)/2,.07,.12,d,0,ry,0);vis(G.box,col,(x0+x1)/2,h*.38,(z0+z1)/2,.07,.12,d,0,ry,0);
  if(!o.nc){const w=Math.abs(x1-x0)<.01?.2:Math.abs(x1-x0),dd=Math.abs(z1-z0)<.01?.2:Math.abs(z1-z0);box((x0+x1)/2,0,(z0+z1)/2,w,h,dd,0,{nv:true})}}
function crate(x,y,z,s,col){box(x,y,z,s,s,s,col||0xb07a42);vis(G.box,0x7a4a2a,x,y+s/2,z,s*1.02,s*.12,s*1.02);vis(G.box,0x7a4a2a,x,y+s-.04,z,s*1.03,.06,s*1.03)}
function sign(x,y,z,ry,lines,o){o=o||{};vis(G.cyl,0x6b4628,x,y+.7,z,.07,1.4,.07);const tex=signTex(lines,o);const m=mesh(new THREE.PlaneGeometry(o.w||1.6,o.h||.8),new THREE.MeshLambertMaterial({map:tex,side:THREE.DoubleSide}),x,y+1.5,z,1,1,1,L.group);m.rotation.y=ry||0;m.castShadow=true}
function flag(x,z,col,h){vis(G.cyl,0xdddddd,x,(h||3)/2,z,.05,h||3,.05);const f=mesh(G.box,mat(col),x+.45,(h||3)-.35,z,.9,.55,.03,L.group);L.ticks.push(t=>{f.rotation.y=Math.sin(t*3+x)*.25});return f}
/* building with an interior: walls with a door gap; returns inner bounds */
function building(o){const{x,z,w,d,h,col}=o,Y=o.y||0,_ng=L.noGrass.push([o.x,o.z,Math.max(o.w,o.d)*.62]),t=o.t||.3,door=o.door||'s',dw=o.dw||2.4,dh=o.dh||3.2,dc=o.doorAt||0;const x0=x-w/2,x1=x+w/2,z0=z-d/2,z1=z+d/2,tc=o.trim||col;
  const wall=(side,len,cx,cz,horiz)=>{if(side===door){const a=(len-dw)/2+dc,b=(len-dw)/2-dc;
      if(horiz){box(cx-len/2+a/2,Y,cz,a,h,t,col);box(cx+len/2-b/2,Y,cz,b,h,t,col);box(cx+dc,Y+dh,cz,dw,h-dh,t,col)}else{box(cx,Y,cz-len/2+a/2,t,h,a,col);box(cx,Y,cz+len/2-b/2,t,h,b,col);box(cx,Y+dh,cz+dc,t,h-dh,dw,col)}
      if(o.doorCol){if(horiz)vis(G.box,o.doorCol,cx+dc-dw/2-.12,Y+dh/2,cz,.18,dh,t+.08),vis(G.box,o.doorCol,cx+dc+dw/2+.12,Y+dh/2,cz,.18,dh,t+.08),vis(G.box,o.doorCol,cx+dc,Y+dh+.1,cz,dw+.4,.2,t+.08);else vis(G.box,o.doorCol,cx,Y+dh/2,cz+dc-dw/2-.12,t+.08,dh,.18),vis(G.box,o.doorCol,cx,Y+dh/2,cz+dc+dw/2+.12,t+.08,dh,.18),vis(G.box,o.doorCol,cx,Y+dh+.1,cz+dc,t+.08,.2,dw+.4)}}
    else if(horiz)box(cx,Y,cz,len,h,t,col);else box(cx,Y,cz,t,h,len,col)};
  wall('s',w,x,z1-t/2,true);wall('n',w,x,z0+t/2,true);wall('w',d-2*t,x0+t/2,z,false);wall('e',d-2*t,x1-t/2,z,false);
  for(const cx of[x0,x1])for(const cz of[z0,z1])vis(G.box,tc,cx,Y+h/2,cz,.4,h+.05,.4);
  vis(G.box,o.floor||0x8a6a4a,x,Y+.02,z,w-.2,.04,d-.2,0,0,0,.02);
  if(o.roof==='flat'){box(x,Y+h,z,w+.4,.3,d+.4,o.roofCol||tc);if(o.rail)railRect(x0-.05,z0-.05,x1+.05,z1+.05,Y+h+.3,o.railCol||tc,o.rail.gap)}
  else if(o.roof==='gable'){const rh=o.rh||2.4,rc=o.roofCol||0x8a3a2a;const along=w>=d;
    if(along)vis(G.prism,rc,x,Y+h,z,w+.7,rh,d+.8);else vis(G.prism,rc,x,Y+h,z,d+.7,rh,w+.8,0,Math.PI/2,0);
    box(x,Y+h,z,w,rh*.5,d,0,{nv:true});box(x,Y+h,z,along?w:w*.45,rh,along?d*.45:d,0,{nv:true})}
  return{x0:x0+t,x1:x1-t,z0:z0+t,z1:z1-t}}
function rail(x0,z0,x1,z1,y,col){const d=Math.hypot(x1-x0,z1-z0);if(d<.05)return;const ry=Math.atan2(x1-x0,z1-z0),n=Math.max(1,Math.round(d/1.4));
  for(let i=0;i<=n;i++){const t=i/n;vis(G.box,col,lerp(x0,x1,t),y+.45,lerp(z0,z1,t),.1,.9,.1)}vis(G.box,col,(x0+x1)/2,y+.92,(z0+z1)/2,.09,.09,d,0,ry,0);
  box((x0+x1)/2,y,(z0+z1)/2,Math.max(.16,Math.abs(x1-x0)),1,Math.max(.16,Math.abs(z1-z0)),0,{nv:true})}
/* rail around a rectangle; gap = {side:'n'|'s'|'e'|'w', at: offset from side center, w: width} */
function railRect(x0,z0,x1,z1,y,col,gap){const sides={n:[x0,z0,x1,z0],s:[x0,z1,x1,z1],w:[x0,z0,x0,z1],e:[x1,z0,x1,z1]};
  for(const k in sides){const[a,b,c,d]=sides[k];if(gap&&gap.side===k){const horiz=k==='n'||k==='s';const mid=(horiz?(a+c)/2:(b+d)/2)+(gap.at||0),hw=(gap.w||1.4)/2;
      if(horiz){rail(a,b,mid-hw,d,y,col);rail(mid+hw,b,c,d,y,col)}else{rail(a,b,c,mid-hw,y,col);rail(a,mid+hw,c,d,y,col)}}else rail(a,b,c,d,y,col)}}
function placeUFO(x,z,o){o=o||{};const pad=cyl(x,0,z,4.6,.15,o.pad||0x8a8aa0,{g:G.disc});vis(G.torThin,0xffd36b,x,.16,z,4.3,4.3,4.3,Math.PI/2,0,0);
  const u=makeUFO(S.paint);u.position.set(x,2.9,z);L.group.add(u);L.ufo=u;cyl(x,0,z,3,4,0,{nv:true});
  const beam=mesh(new THREE.CylinderGeometry(1.4,2.8,2,24,1,true),new THREE.MeshBasicMaterial({color:0x9ff3ff,transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending}),x,1.1,z,1,1,1,L.group);
  tick((t,dt)=>{u.position.y=2.9+Math.sin(t*1.4)*.1;u.rotation.y+=dt*.15;u.userData.update(t,0);beam.material.opacity=clamp((7.5-Math.hypot(P.x-x,P.z-z))/4,0,.3)});
  inter({x,y:0,z,r:5.6,label:'Удерживайте E - сесть в НЛО',hold:1,act:takeoff});L.ufoPos=[x,z]}

function skyBody(col,pos,r,ring){const c=new THREE.Color(col);const m=mesh(G.sphHi,new THREE.MeshLambertMaterial({color:col,emissive:c.clone().multiplyScalar(.45),fog:false}),pos[0],pos[1],pos[2],r,r,r,L.group);
  if(ring){const t=new THREE.Mesh(new THREE.RingGeometry(r*1.35,r*2.1,64),new THREE.MeshBasicMaterial({color:ring,fog:false,side:THREE.DoubleSide,transparent:true,opacity:.55,depthWrite:false}));t.position.copy(m.position);t.rotation.set(-1.25,.35,0);L.group.add(t)}return m}
function scatter(r,n,rmin,rmax,avoid,fn){let k=0,tries=0;while(k<n&&tries<n*50){tries++;const a=r()*TAU,d=rmin+r()*(rmax-rmin),x=Math.cos(a)*d,z=Math.sin(a)*d;if(avoid.some(v=>Math.hypot(x-v[0],z-v[1])<v[2]))continue;if(blocked(x,z))continue;avoid.push([x,z,2.2]);fn(x,z,.8+r()*.6,r);k++}}
function flowers(r,n,cols,rmin,rmax){for(let i=0;i<n;i++){const a=r()*TAU,d=rmin+r()*(rmax-rmin),x=Math.cos(a)*d,z=Math.sin(a)*d;if(blocked(x,z))continue;vis(G.cyl,0x3f7a35,x,.15,z,.02,.3,.02);vis(G.sph,pick(cols),x,.32,z,.1,.07,.1)}}
/* ---------- PLAYER UPDATE ---------- */
function overXZ(c,x,z,r){if(c.k==='c')return Math.hypot(x-c.x,z-c.z)<c.r+r*.6;const nx=clamp(x,c.x0,c.x1),nz=clamp(z,c.z0,c.z1);return(x-nx)*(x-nx)+(z-nz)*(z-nz)<r*r}
function headroom(y){for(const c of L.solids){if(!c.on)continue;if(c.y0>=y+.01&&c.y0<y+PH&&overXZ(c,P.x,P.z,PR*.9))return false}return true}
function collideH(){
  for(const c of L.solids){if(!c.on)continue;if(P.y>=c.y1-.002||P.y+PH<=c.y0)continue;
    if(c.k==='c'){const dx=P.x-c.x,dz=P.z-c.z,d=Math.hypot(dx,dz),m=c.r+PR;if(d>=m)continue;
      if(c.y1-P.y<=STEP&&(P.ground||P.ladder)&&headroom(c.y1)){P.y=c.y1;continue}
      if(d<1e-4){P.x+=m;continue}P.x=c.x+dx/d*m;P.z=c.z+dz/d*m}
    else{const nx=clamp(P.x,c.x0,c.x1),nz=clamp(P.z,c.z0,c.z1),dx=P.x-nx,dz=P.z-nz,d2=dx*dx+dz*dz;if(d2>=PR*PR)continue;
      if(c.y1-P.y<=STEP&&(P.ground||P.ladder)&&c.t!=='bounce'&&headroom(c.y1)){P.y=c.y1;continue}
      const d=Math.sqrt(d2);if(d>1e-4){P.x=nx+dx/d*PR;P.z=nz+dz/d*PR}
      else{const l=P.x-c.x0,r=c.x1-P.x,b=P.z-c.z0,f=c.z1-P.z,mn=Math.min(l,r,b,f);if(mn===l)P.x=c.x0-PR;else if(mn===r)P.x=c.x1+PR;else if(mn===b)P.z=c.z0-PR;else P.z=c.z1+PR}}}
}
function collideV(dt){
  const ny=P.y+P.vy*dt,wasG=P.ground;P.ground=false;P.sup=null;
  if(P.vy<=0){let best=-1e9,sup=null;
    for(const c of L.solids){if(!c.on)continue;if(c.y1>P.y+.08||c.y1<ny-.08)continue;if(!overXZ(c,P.x,P.z,PR*.85))continue;if(c.y1>best){best=c.y1;sup=c}}
    if(!inWater(P.x,P.z)&&P.y>=-.06&&ny<=.06&&0>best){best=0;sup=null}
    if(best>-1e9){const fv=-P.vy;P.y=best;P.vy=0;P.ground=true;P.sup=sup;P.jumps=0;
      if(sup&&sup.t==='bounce'){P.vy=sup.pow||15;P.ground=false;P.sup=null;AU.sfx('bounce');FXW.burst(P.x,P.y+.1,P.z,{col:0x7fe3e8,n:16,spd:4,up:2,life:.6});if(sup.onBounce)sup.onBounce()}
      else{if(!wasG&&fv>7){AU.sfx('land');FXW.burst(P.x,P.y+.05,P.z,{col:0xcccccc,n:8,spd:2,up:1,g:4,life:.4,size:.25})}if(sup&&sup.onStand)sup.onStand(dt)}}
    else P.y=ny}
  else{let y=ny;for(const c of L.solids){if(!c.on)continue;if(c.y0<P.y+PH-.05||c.y0>ny+PH+.02)continue;if(!overXZ(c,P.x,P.z,PR*.85))continue;y=Math.min(y,c.y0-PH);P.vy=0}P.y=y}
  if(wasG&&!P.ground&&P.vy<=0)P.coyote=.12;else if(P.ground)P.coyote=0;else P.coyote-=dt;
}
function ladderAt(){for(const l of L.ladders)if(P.x>l.x0-PR&&P.x<l.x1+PR&&P.z>l.z0-PR&&P.z<l.z1+PR&&P.y>=l.y0-.1&&P.y<l.y1)return l;return null}
function surfAt(){if(P.sup)return P.sup.surf||(P.sup.t==='ice'?'ice':L.supSurf||L.surface);return L.groundSurf?L.groundSurf(P.x,P.z):L.surface}
function playerUpdate(dt,inp){
  const up=S.up;let sp=(isTouch?7:5.4*(inp.sprint?1.55:1))*(up.run?1.18:1);if(P.carry)sp*=.88;
  const fx=-Math.sin(P.yaw),fz=-Math.cos(P.yaw),rx=Math.cos(P.yaw),rz=-Math.sin(P.yaw);
  let wx=fx*inp.mz+rx*inp.mx,wz=fz*inp.mz+rz*inp.mx;const wl=Math.hypot(wx,wz);if(wl>1){wx/=wl;wz/=wl}
  const surf=P.ground?surfAt():null;const acc=P.ground?(surf==='ice'?2.4:28):7;
  P.vx+=(wx*sp-P.vx)*Math.min(1,acc*dt);P.vz+=(wz*sp-P.vz)*Math.min(1,acc*dt);
  if(P.ground&&P.sup&&P.sup.conv){P.x+=P.sup.conv[0]*dt;P.z+=P.sup.conv[1]*dt}
  const lad=ladderAt();
  if(lad&&(inp.mz>.2||(P.ladder&&!P.ground&&inp.mz>-.2))&&!inp.jump){P.ladder=true;P.vy=inp.mz*4.4;if(P.y<lad.y1-.7){P.vx=0;P.vz=0}P.jumps=0}
  else{if(P.ladder&&inp.jump){P.vy=JUMPV*.7;inp.jump=false}P.ladder=false}
  if(!P.ladder&&inp.jump){if(P.ground||P.coyote>0){P.vy=JUMPV;P.ground=false;P.coyote=0;P.jumps=1;AU.sfx('jump')}
    else if(up.jump2&&P.jumps<2&&!P.carry){P.vy=JUMPV*.9;P.jumps=2;AU.sfx('djump');FXW.burst(P.x,P.y,P.z,{col:0x7fe3e8,n:16,spd:3,up:-1,g:0,life:.5})}}
  if(!P.ladder){P.vy-=GRAV*dt;if(P.vy<-34)P.vy=-34}
  if(P.sup&&P.sup.mv){P.x+=P.sup.mv.dx;P.y+=P.sup.mv.dy;P.z+=P.sup.mv.dz}
  const n=Math.max(1,Math.ceil(Math.max(Math.abs(P.vx),Math.abs(P.vz))*dt/.25));
  for(let i=0;i<n;i++){P.x+=P.vx*dt/n;P.z+=P.vz*dt/n;collideH()}
  collideV(dt);
  const d=Math.hypot(P.x,P.z);if(d>L.radius){P.x*=L.radius/d;P.z*=L.radius/d}
  if(P.y<.08&&P.vy<=0&&inWater(P.x,P.z)){AU.sfx('splash');FXW.burst(P.x,.1,P.z,{col:0x9fd8ff,n:30,spd:4,up:5,life:.9});respawn(L.waterMsg||'Капик промок и вернулся на берег')}
  if(P.y<-15)respawn();
  // footsteps
  const hs=Math.hypot(P.vx,P.vz);if(P.ground&&hs>1){P.stepT-=dt*hs;if(P.stepT<=0){P.stepT=2.1;AU.sfx('step',surfAt())}P.bob+=dt*hs*1.7}
  // triggers
  for(const t of L.triggers){if(!t.on)continue;const i=P.x>t.x0&&P.x<t.x1&&P.z>t.z0&&P.z<t.z1&&P.y+.5>t.y0&&P.y<t.y1;if(i&&!t.in){t.in=true;if(t.enter)t.enter(t)}else if(!i&&t.in){t.in=false;if(t.exit)t.exit(t)}if(i&&t.stay)t.stay(dt,t)}
}
function respawn(msg){const c=L.checkpoint||L.spawn;P.x=c.x;P.y=c.y||0;P.z=c.z;P.vx=P.vy=P.vz=0;if(c.yaw!=null)P.yaw=c.yaw;P.camY=P.y+EYE;flash('rgba(160,220,255,.7)');if(msg)toast(msg);if(L.onRespawn)L.onRespawn()}
function checkpoint(x,y,z,w,d,yaw){const t=trig(x-w/2,x+w/2,y-.5,y+3,z-d/2,z+d/2,{enter:()=>{if(L.checkpoint&&L.checkpoint.x===x&&L.checkpoint.z===z)return;L.checkpoint={x,y,z,yaw};toast('Точка возврата');AU.sfx('ui')}});return t}
function updMovers(t,dt){for(const mv of L.movers){const p=mv.fn(t,dt);if(!p){mv.dx=mv.dy=mv.dz=0;continue}const d=setBox(mv.c,p[0],p[1],p[2]);mv.dx=d[0];mv.dy=d[1];mv.dz=d[2]}}
function updCracks(dt){for(const c of L.solids){if(!c.crack)continue;const k=c.crack;
  if(k.down>0){k.down-=dt;if(k.down<=0){c.on=true;c.m.visible=true;c.m.position.y=k.by+c.h/2;k.t=0;k.snd=0}continue}
  if(k.t>0){c.m.position.x=k.bx+(Math.random()-.5)*.08*Math.min(1,k.t*2);c.m.material.color.setRGB(1,1-k.t*.4,1-k.t*.4);if(P.sup!==c)k.t+=dt*.5}
  if(k.t>.85){c.on=false;c.m.visible=false;k.down=3;AU.sfx('crack');FXW.burst(k.bx,k.by+.3,k.bz,{col:0xdff6ff,n:20,spd:3,up:2,life:.7});c.m.material.color.setRGB(1,1,1);c.m.position.x=k.bx}}}
function updPicks(t,dt){for(const p of L.picks){if(p.got)continue;if(p.cond&&!p.cond()){p.obj.visible=false;continue}p.obj.visible=true;
  if(p.coin){p.obj.rotation.y+=dt*2.6;p.obj.position.y=p.y+Math.sin(t*2.4+p.x)*.12;if(S.up.magnet){const dx=P.x-p.x,dy=P.y+1-p.y,dz=P.z-p.z,d=Math.hypot(dx,dy,dz);if(d<5&&d>.1){const s=Math.min(d,dt*9);p.x+=dx/d*s;p.y+=dy/d*s;p.z+=dz/d*s;p.obj.position.x=p.x;p.obj.position.z=p.z}}}
  else{p.obj.rotation.y+=dt*1.5;p.obj.position.y=p.base+Math.sin(t*2)*.1}
  const dx=P.x-p.x,dz=P.z-p.z,dy=(P.y+.9)-p.y;if(dx*dx+dz*dz<1.3&&Math.abs(dy)<1.3){p.got=true;S.got[p.id]=1;p.obj.visible=false;
    if(p.coin){addCoins(1);AU.sfx('coin');FXW.burst(p.x,p.y,p.z,{col:0xffd36b,n:10,spd:2.5,up:2,life:.5,size:.22})}else{AU.sfx('item');FXW.burst(p.x,p.y,p.z,{col:0xffffff,n:18,spd:3,up:3,life:.7});if(p.onGet)p.onGet()}save()}}}
function updProj(dt){for(let i=L.proj.length-1;i>=0;i--){const b=L.proj[i];b.vy-=14*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;b.z+=b.vz*dt;b.m.position.set(b.x,b.y,b.z);b.life-=dt;let hit=b.y<0||b.life<0;
  for(const t of L.targets){if(!t.on)continue;if((b.x-t.x)**2+(b.y-t.y)**2+(b.z-t.z)**2<t.r*t.r){t.hit(t);hit=true;break}}
  if(!hit)for(const c of L.solids){if(c.on&&c.k==='b'&&b.x>c.x0&&b.x<c.x1&&b.y>c.y0&&b.y<c.y1&&b.z>c.z0&&b.z<c.z1){hit=true;break}}
  if(hit){FXW.burst(b.x,Math.max(b.y,.1),b.z,{col:0xffffff,n:12,spd:2.5,up:1.5,life:.5,size:.25});L.group.remove(b.m);L.proj.splice(i,1)}}}
function throwBall(){if(!L.canThrow)return;const dir=new THREE.Vector3(0,0,-1).applyEuler(camera.rotation);const m=mesh(G.sph,mat(0xf4f8fb),0,0,0,.14,.14,.14,L.group);
  L.proj.push({m,x:camera.position.x+dir.x*.6,y:camera.position.y-.15+dir.y*.6,z:camera.position.z+dir.z*.6,vx:dir.x*24,vy:dir.y*24+2.5,vz:dir.z*24,life:3});AU.sfx('throw')}
