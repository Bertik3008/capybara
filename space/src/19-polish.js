/* ---------- v8 polish: shared set-dressing helpers used to finish every planet ---------- */
const _gearG={};
function gearGeo(R,teeth,depth,th){const k=[R,teeth,depth,th].join(':');if(_gearG[k])return _gearG[k];
  const s=new THREE.Shape(),w=TAU/teeth,ri=R-depth;
  for(let i=0;i<teeth;i++){const a=i*w,pts=[[ri,a],[R,a+w*.18],[R,a+w*.46],[ri,a+w*.64]];pts.forEach((p,j)=>{const x=Math.cos(p[1])*p[0],y=Math.sin(p[1])*p[0];if(i===0&&j===0)s.moveTo(x,y);else s.lineTo(x,y)})}
  s.closePath();const hole=(cx,cy,r)=>{const h=new THREE.Path();h.absarc(cx,cy,r,0,TAU,true);s.holes.push(h)};hole(0,0,R*.16);
  for(let i=0;i<5;i++){const a=i/5*TAU+.3;hole(Math.cos(a)*ri*.56,Math.sin(a)*ri*.56,ri*.22)}
  const g=new THREE.ExtrudeGeometry(s,{depth:th,bevelEnabled:true,bevelSize:.04,bevelThickness:.04,bevelSegments:1,curveSegments:10});g.translate(0,0,-th/2);g.computeVertexNormals();g.userData.shared=true;_gearG[k]=g;return g}
/* a pair of big turning cogs on a stand - the landmark of «Шестерёнка» */
function gearMonument(x,z,ry,o){o=o||{};const R=o.R||3.4,R2=R*.55,T1=18,T2=10,root=new THREE.Group();root.position.set(x,0,z);root.rotation.y=ry;L.group.add(root);
  const brass=stdMat(o.col||0xc8964a,{roughness:.42,metalness:.45}),steel=stdMat(0x7a8590,{roughness:.5,metalness:.4});
  const hy=R+1.2,g1=mesh(gearGeo(R,T1,.45,.5),brass,0,hy,0,1,1,1,root),g2=mesh(gearGeo(R2,T2,.45,.5),steel,R+R2-.32,hy-R*.62,.02,1,1,1,root);g1.castShadow=g2.castShadow=true;
  mesh(G.cyl16,steel,0,hy,0,.5,.9,.5,root).rotation.x=Math.PI/2;mesh(G.cyl16,steel,R+R2-.32,hy-R*.62,0,.35,.9,.35,root).rotation.x=Math.PI/2;
  /* stand */
  const c=Math.cos(ry),s=Math.sin(ry),W=(lx,lz)=>[x+lx*c+lz*s,z-lx*s+lz*c];
  for(const sd of[-1,1]){const p=W(0,sd*.5);vis(G.box,0x4a5258,p[0],hy/2,p[1],.35,hy,.25,0,ry,0,.03,TX.metal)}
  {const p=W(R+R2-.32,0);vis(G.box,0x4a5258,p[0],(hy-R*.62)/2,p[1],.3,hy-R*.62,.9,0,ry,0,.03,TX.metal)}
  vis(G.cyl16,0x5a6068,x,.25,z,R*.75,.5,R*.75,0,0,0,.03,TX.metal);vis(G.cyl16,0xffab4a,x,.52,z,R*.78,.06,R*.78,0,0,0,.02,TX.stripes);cyl(x,0,z,R*.75,.5,0,{nv:true,surf:'metal'});
  tick((t,dt)=>{g1.rotation.z+=dt*.25;g2.rotation.z-=dt*.25*T1/T2});return root}
/* elevated pipe on trestles; the player walks underneath */
function pipeRun(x0,z0,x1,z1,o){o=o||{};const h=o.h||4.2,r=o.r||.42,col=o.col||0x8a96a0,d=Math.hypot(x1-x0,z1-z0),ry=Math.atan2(x1-x0,z1-z0),n=Math.max(1,Math.round(d/6)),px=Math.cos(ry),pz=-Math.sin(ry);
  vis(G.cyl16,col,(x0+x1)/2,h,(z0+z1)/2,r,d,r,Math.PI/2,ry,0,.03,TX.metal);
  for(let i=0;i<=n;i++){const t=i/n,x=lerp(x0,x1,t),z=lerp(z0,z1,t);for(const sd of[-1,1])cyl(x+px*sd*.7,0,z+pz*sd*.7,.1,h-r,0x3b4348,{g:G.cyl,cr:.18});vis(G.box,0x3b4348,x,h-r-.08,z,1.7,.16,.22,0,ry,0,.02,TX.metal);
    if(i&&i<n||o.ends)vis(G.cyl16,0x5a6068,x,h,z,r+.1,.18,r+.1,Math.PI/2,ry,0,.02,TX.metal)}
  if(o.valve){const x=lerp(x0,x1,.5)+px*.1,z=lerp(z0,z1,.5)+pz*.1;vis(G.cyl,0x5a6068,x,h+r+.2,z,.07,.4,.07);vis(G.tor,0xc94f3a,x,h+r+.42,z,.26,.26,.26,Math.PI/2,0,0)}}
/* street lamp; glow sprites are capped by quality */
let _lampN=0,_lampL=null;
function lamp(x,z,o){o=o||{};if(_lampL!==L){_lampL=L;_lampN=0}const h=o.h||3.6,col=o.col||0xffd89a;vis(G.cyl,o.pole||0x3b4348,x,h/2,z,.08,h,.08,0,0,0,.02,TX.metal);vis(G.box,o.pole||0x3b4348,x,h+.05,z,.5,.12,.5,0,0,0,.02,TX.metal);gvis(G.sph,col,x,h-.12,z,.2,.2,.2);cyl(x,0,z,.15,h,0,{nv:true});
  if(_lampN++<[4,8,14][Q.q]){const g=glow(col,o.g||2.4,.45);g.position.set(x,h-.15,z);L.group.add(g)}}
/* little vent with drifting steam */
function steamVent(x,z,o){o=o||{};vis(G.box,0x3b4348,x,.08,z,1,.16,1,0,o.ry||0,0,.02,TX.metal);for(let i=-1;i<=1;i++)vis(G.box,0x1f2328,x+i*.25,.17,z,.08,.02,.8,0,o.ry||0,0);
  let k=0;tick((t,dt)=>{if(Math.hypot(P.x-x,P.z-z)>45)return;k+=dt;if(k>.18){k=0;FXW.burst(x+(Math.random()-.5)*.5,.3,z+(Math.random()-.5)*.5,{col:o.col||0xe8eef4,n:1,spd:.3,up:1.4+Math.random(),g:-.3,life:2.4,size:.8})}})}
/* rails with a little ore cart running back and forth */
function cartTrack(x0,z0,x1,z1,o){o=o||{};const d=Math.hypot(x1-x0,z1-z0),ry=Math.atan2(x1-x0,z1-z0),px=Math.cos(ry),pz=-Math.sin(ry),n=Math.floor(d/.9);
  for(const sd of[-1,1])vis(G.box,0x8a8a92,(x0+x1)/2+px*sd*.5,.09,(z0+z1)/2+pz*sd*.5,.08,.1,d,0,ry,0,.02,TX.metal);
  for(let i=0;i<=n;i++){const t=i/n;vis(G.box,0x5a3a26,lerp(x0,x1,t),.03,lerp(z0,z1,t),1.4,.06,.22,0,ry,0,.05,TX.planks)}
  const cart=new THREE.Group();L.group.add(cart);const cm=stdMat(o.col||0x8a5a3a,{roughness:.7});
  mesh(G.box,cm,0,.65,0,1.1,.6,1.5,cart);mesh(G.box,stdMat(0x3b4348),0,.98,0,1.16,.08,1.56,cart);
  for(const a of[-1,1])for(const b of[-1,1])mesh(G.cyl,stdMat(0x2a2a30),a*.5,.25,b*.5,.22,.1,.22,cart).rotation.z=Math.PI/2;
  for(let i=0;i<5;i++)mesh(G.dod,stdMat(o.load||0x9aa2aa,{roughness:.5,metalness:.4}),(i%3-1)*.3,1.0,(i>2?.3:-.3)*(i%2?1:-1),.25,.2,.25,cart);
  mergeModel(cart);cart.rotation.y=ry;cart.traverse(m=>{if(m.isMesh)m.castShadow=true});
  let u=0,dir=1,wait=0;tick((t,dt)=>{if(wait>0){wait-=dt;return}u+=dir*dt*2.2/d;if(u>1||u<0){u=clamp(u,0,1);dir=-dir;wait=1.5}cart.position.set(lerp(x0,x1,u),0,lerp(z0,z1,u))});
  return cart}
/* a low curb with hazard stripes along a straight path edge */
function curb(x0,z0,x1,z1,col){const d=Math.hypot(x1-x0,z1-z0),ry=Math.atan2(x1-x0,z1-z0);vis(G.box,col||0xffc83d,(x0+x1)/2,.07,(z0+z1)/2,.24,.14,d,0,ry,0,.02,TX.stripes)}
/* soft mound of decor on the ground that hides a seam and adds life */
function tuft(x,z,s,col){vis(G.sph,col,x,.12*s,z,.6*s,.35*s,.6*s,0,x,0,.06,TX.leaves);vis(G.sph,col,x+.35*s,.1*s,z+.2*s,.4*s,.25*s,.4*s,0,z,0,.06,TX.leaves)}
/* small themed clutter on empty ground: stones, flowers, drifts, ferns, glowing caps... (batched, cheap) */
function groundDetail(seed,theme,n){const r=rng(seed*13+5),avoid=[[0,16,7],[0,9,4]];n=Math.round(n*[.55,.8,1][Q.q]);
  const onPath=(x,z)=>L.paths.some(p=>distPoly(x,z,p.pts)<p.w+.6)||L.water.some(w=>Math.hypot(x-w.x,z-w.z)<w.r+.8);
  const stone=(x,z,s,c)=>vis(r()<.5?G.dod:G.rock2,c,x,.12*s,z,.35*s,.25*s,.3*s,0,r()*6,0,.05,TX.stone);
  const flowers=(x,z,s,cols)=>{for(let k=0;k<5;k++){const ox=x+(r()-.5)*1.4,oz=z+(r()-.5)*1.4,h=(.25+r()*.2)*s;vis(G.cyl,0x4a8a3a,ox,h/2,oz,.02,h,.02,0,0,0,.05);gvis(G.sph,pick(cols),ox,h,oz,.08*s,.06*s,.08*s);if(k<2)vis(G.sph,0x3e7a30,ox,.04,oz,.16,.06,.16,0,0,0,.05)}};
  scatter(r,n,5,60,avoid,(x,z,s)=>{if(onPath(x,z))return;const k=r();
    if(theme==='meadow'){if(k<.45)flowers(x,z,s,[0xfff6e0,0xffd36b,0xff9ab8,0xb8a0ff]);else if(k<.75)stone(x,z,s,pick([0x9a948a,0x8a847a]));else{vis(G.sph,pick([0x4c8a35,0x5a9a3a]),x,.25*s,z,.6*s,.45*s,.6*s,0,0,0,.06,TX.leaves);vis(G.sph,0x4c8a35,x+.4*s,.2*s,z+.2*s,.4*s,.32*s,.4*s,0,0,0,.06,TX.leaves)}}
    else if(theme==='snow'){if(k<.4){vis(G.sph,0xf4f8fb,x,0,z,(1+r())*s,.45*s,(.8+r()*.6)*s,0,r()*3,0,.02,TX.snow)}else if(k<.65){for(let j=0;j<3;j++)vis(G.oct,0xbfe6f4,x+(r()-.5)*.8,.3*s,z+(r()-.5)*.8,.14*s,(.4+r()*.4)*s,.14*s,(r()-.5)*.5,r()*3,(r()-.5)*.5,.03,TX.ice)}else if(k<.85){stone(x,z,s,0x7a8a98);vis(G.sph,0xf4f8fb,x,.22*s,z,.3*s,.1*s,.26*s,0,0,0,.02,TX.snow)}else{vis(G.cone,0x2f5a4a,x,.5*s,z,.45*s,1*s,.45*s,0,0,0,.05,TX.leaves);vis(G.cone,0xf2f8ff,x,.75*s,z,.28*s,.4*s,.28*s,0,0,0,.02,TX.snow)}}
    else if(theme==='shroom'){if(k<.45){for(let j=0;j<4;j++){const ox=x+(r()-.5)*1.2,oz=z+(r()-.5)*1.2,h=(.2+r()*.35)*s;vis(G.cyl,0xe8dcc8,ox,h/2,oz,.04*s,h,.04*s);gvis(G.hemi,pick([0x7fe3e8,0xb28cff,0xff8fb1,0x9bffb0]),ox,h,oz,.16*s,.1*s,.16*s)}}else if(k<.75)vis(G.sph,pick([0x5a3a8a,0x4a3a7a]),x,.05,z,.8*s,.18*s,.7*s,0,r()*3,0,.06,TX.moss);else for(let j=0;j<3;j++)gvis(G.oct,pick([0xb28cff,0x7fe3e8]),x+(r()-.5)*.7,.25*s,z+(r()-.5)*.7,.1*s,.35*s,.1*s,(r()-.5)*.4,r()*3,0)}
    else if(theme==='jungle'){if(k<.4){for(let j=0;j<5;j++){const a=j/5*TAU+r();vis(G.cone,pick([0x3a9a3a,0x2f8a30]),x+Math.cos(a)*.35*s,.25*s,z+Math.sin(a)*.35*s,.12*s,.9*s,.3*s,1.1,-a+Math.PI/2,0,.06,TX.leaves)}}else if(k<.65)flowers(x,z,s,[0xff6b6b,0xffd36b,0xff9ab8,0xffffff]);else if(k<.85)stone(x,z,s,0x8a8a7a);else for(let j=0;j<3;j++)vis(G.sph,0x6b4628,x+(r()-.5)*.6,.12,z+(r()-.5)*.6,.13,.13,.13,0,0,0,.05,TX.bark)}
    else if(theme==='dandelion'){if(k<.5){for(let j=0;j<4;j++){const ox=x+(r()-.5)*1.2,oz=z+(r()-.5)*1.2,h=(.35+r()*.25)*s;vis(G.cyl,0x6a9a4a,ox,h/2,oz,.02,h,.02);gvis(G.sph,j%2?0xfffbe8:0xffd84a,ox,h,oz,.11*s,.11*s,.11*s)}}else if(k<.8)vis(G.sph,pick([0x5aa040,0x6ab04a]),x,.06,z,.9*s,.15*s,.8*s,0,r()*3,0,.06,TX.leaves);else stone(x,z,s,0x9a9a8a)}});}
