/* ---------- RENDER ---------- */
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,isTouch?1.5:2));
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
$('#view').appendChild(renderer.domElement);
const cv=renderer.domElement;
const wscene=new THREE.Scene(), sscene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75,1,.1,1200);camera.rotation.order='YXZ';
const hemi=new THREE.HemisphereLight(0xffffff,0x444444,.9);wscene.add(hemi);
const sun=new THREE.DirectionalLight(0xffffff,.8);sun.position.set(30,50,20);sun.castShadow=true;
sun.shadow.mapSize.set(isTouch?1024:2048,isTouch?1024:2048);const sc_=sun.shadow.camera;sc_.left=-38;sc_.right=38;sc_.top=38;sc_.bottom=-38;sc_.near=1;sc_.far=160;sun.shadow.bias=-.0008;sun.shadow.normalBias=.03;
wscene.add(sun);wscene.add(sun.target);
function resize(){const w=window.innerWidth,h=window.innerHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();if(window.UI&&UI.resizeMap)UI.resizeMap()}
window.addEventListener('resize',resize);

/* prototype geometries (non-indexed so they can be merged) */
const NI=g=>g.index?g.toNonIndexed():g;
const G={
  box:NI(new THREE.BoxGeometry(1,1,1)),cyl:NI(new THREE.CylinderGeometry(1,1,1,10)),cyl6:NI(new THREE.CylinderGeometry(1,1,1,6)),cyl16:NI(new THREE.CylinderGeometry(1,1,1,18)),
  cone:NI(new THREE.ConeGeometry(1,1,8)),cone4:NI(new THREE.ConeGeometry(1,1,4)),sph:NI(new THREE.SphereGeometry(1,10,8)),sphHi:NI(new THREE.SphereGeometry(1,16,12)),
  ico:NI(new THREE.IcosahedronGeometry(1,0)),ico1:NI(new THREE.IcosahedronGeometry(1,1)),dod:NI(new THREE.DodecahedronGeometry(1,0)),
  hemi:NI(new THREE.SphereGeometry(1,14,6,0,TAU,0,Math.PI/2)),tor:NI(new THREE.TorusGeometry(1,.22,6,18)),torThin:NI(new THREE.TorusGeometry(1,.08,5,24)),
  frus:NI(new THREE.CylinderGeometry(.6,1,1,8)),oct:NI(new THREE.OctahedronGeometry(1,0)),disc:NI(new THREE.CylinderGeometry(1,1,1,24))
};
G.prism=(()=>{const A=[.5,0,-.5],B=[.5,0,.5],C=[.5,1,0],A2=[-.5,0,-.5],B2=[-.5,0,.5],C2=[-.5,1,0],out=[],ctr=[0,.33,0];
  const tri=(a,b,c)=>{const u=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],v=[c[0]-a[0],c[1]-a[1],c[2]-a[2]],n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]],m=[(a[0]+b[0]+c[0])/3-ctr[0],(a[1]+b[1]+c[1])/3-ctr[1],(a[2]+b[2]+c[2])/3-ctr[2]];
    if(n[0]*m[0]+n[1]*m[1]+n[2]*m[2]<0)out.push(...a,...c,...b);else out.push(...a,...b,...c)};
  tri(A,B,C);tri(A2,B2,C2);tri(A,B,B2);tri(A,B2,A2);tri(A,A2,C2);tri(A,C2,C);tri(B,C,C2);tri(B,C2,B2);
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(out,3));g.computeVertexNormals();return g})();
for(const k in G)G[k].userData.shared=true;

const _m=new THREE.Matrix4(),_q=new THREE.Quaternion(),_e=new THREE.Euler(),_p=new THREE.Vector3(),_s=new THREE.Vector3(),_c=new THREE.Color();
class Batch{
  constructor(){this.list=[];this.n=0}
  add(g,col,x,y,z,sx,sy,sz,rx,ry,rz,jit){_e.set(rx||0,ry||0,rz||0,'YXZ');_q.setFromEuler(_e);_m.compose(_p.set(x,y,z),_q,_s.set(sx,sy==null?sx:sy,sz==null?sx:sz));this.list.push({g,col,e:_m.elements.slice(),jit:jit==null?.06:jit});this.n+=g.attributes.position.count}
  build(mat){if(!this.n)return null;const pos=new Float32Array(this.n*3),ca=new Float32Array(this.n*3);let o=0,j=1;
    for(const it of this.list){const p=it.g.attributes.position.array,e=it.e;_c.set(it.col);const cnt=p.length/3;
      for(let i=0;i<cnt;i++){const x=p[i*3],y=p[i*3+1],z=p[i*3+2];pos[o]=e[0]*x+e[4]*y+e[8]*z+e[12];pos[o+1]=e[1]*x+e[5]*y+e[9]*z+e[13];pos[o+2]=e[2]*x+e[6]*y+e[10]*z+e[14];
        if(i%3===0)j=1+(Math.random()*2-1)*it.jit;ca[o]=_c.r*j;ca[o+1]=_c.g*j;ca[o+2]=_c.b*j;o+=3}}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(ca,3));g.computeVertexNormals();g.computeBoundingSphere();
    return new THREE.Mesh(g,mat)}
}
const batchMat=new THREE.MeshPhongMaterial({vertexColors:true,flatShading:true,shininess:8,specular:0x161616});
const glowBatchMat=new THREE.MeshBasicMaterial({vertexColors:true});
const MC={};
function mat(c,o){const k=c+(o?JSON.stringify(o):'');if(!MC[k]){MC[k]=new THREE.MeshPhongMaterial(Object.assign({color:c,flatShading:true,shininess:10,specular:0x181818},o||{}));MC[k].userData.shared=true}return MC[k]}
function bmat(c,o){const k='b'+c+(o?JSON.stringify(o):'');if(!MC[k]){MC[k]=new THREE.MeshBasicMaterial(Object.assign({color:c},o||{}));MC[k].userData.shared=true}return MC[k]}
function mesh(g,m,x,y,z,sx,sy,sz,parent){const o=new THREE.Mesh(g,m);o.position.set(x||0,y||0,z||0);if(sx!=null)o.scale.set(sx,sy==null?sx:sy,sz==null?sx:sz);if(parent)parent.add(o);return o}
function disposeTree(g){g.traverse(o=>{if(o.geometry&&!o.geometry.userData.shared)o.geometry.dispose();if(o.material){(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(m.userData&&m.userData.shared)return;if(m.map&&m.map!==glowTex)m.map.dispose();m.dispose()})}})}

const glowTex=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d');const gr=g.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.25,'rgba(255,255,255,.5)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,64,64);const t=new THREE.CanvasTexture(c);t.userData={shared:true};return t})();
function glow(color,size,op){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color,transparent:true,opacity:op==null?1:op,blending:THREE.AdditiveBlending,depthWrite:false}));s.scale.set(size,size,1);return s}
function rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
function textSprite(txt,o){o=o||{};const size=o.size||40;const c=document.createElement('canvas');const ctx=c.getContext('2d');const font=`${o.w||800} ${size}px ${o.font||'Nunito, system-ui, sans-serif'}`;ctx.font=font;const tw=Math.ceil(ctx.measureText(txt).width);c.width=tw+Math.round(size*1.1);c.height=Math.ceil(size*1.5);ctx.font=font;
  ctx.fillStyle=o.bg||'rgba(18,14,38,.72)';rr(ctx,0,0,c.width,c.height,c.height/2);ctx.fill();ctx.fillStyle=o.fg||'#f7eee1';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(txt,c.width/2,c.height/2+size*.05);
  const tex=new THREE.CanvasTexture(c);tex.minFilter=THREE.LinearFilter;tex.generateMipmaps=false;const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthWrite:false,depthTest:o.depthTest!==false}));const h=o.h||.4;sp.scale.set(h*c.width/c.height,h,1);return sp}
function signTex(lines,o){o=o||{};const c=document.createElement('canvas');c.width=o.cw||512;c.height=o.ch||256;const g=c.getContext('2d');g.fillStyle=o.bg||'#7a4a2a';g.fillRect(0,0,c.width,c.height);g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=10;g.strokeRect(5,5,c.width-10,c.height-10);
  g.fillStyle=o.fg||'#fff1d6';g.textAlign='center';g.textBaseline='middle';const fs=o.fs||64;g.font=`400 ${fs}px "Russo One", Arial Black, sans-serif`;lines.forEach((l,i)=>g.fillText(l,c.width/2,c.height/2+(i-(lines.length-1)/2)*fs*1.15));const t=new THREE.CanvasTexture(c);return t}

/* sky dome */
function makeSky(top,hor,bot,sunDir,sunCol){
  const m=new THREE.ShaderMaterial({uniforms:{t:{value:new THREE.Color(top)},h:{value:new THREE.Color(hor)},b:{value:new THREE.Color(bot)},sd:{value:new THREE.Vector3().copy(sunDir||new THREE.Vector3(0,1,0)).normalize()},sc:{value:new THREE.Color(sunCol||0xfff0c0)}},
    vertexShader:'varying vec3 vp;void main(){vp=normalize(position);vec4 p=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_Position=p.xyww;}',
    fragmentShader:'uniform vec3 t,h,b,sd,sc;varying vec3 vp;void main(){float y=vp.y;vec3 c=y>0.?mix(h,t,pow(clamp(y,0.,1.),.55)):mix(h,b,clamp(-y*4.,0.,1.));float s=max(dot(normalize(vp),sd),0.);c+=sc*(pow(s,600.)*1.4+pow(s,12.)*.18);gl_FragColor=vec4(c,1.);}',
    side:THREE.BackSide,depthWrite:false,fog:false});
  const s=new THREE.Mesh(new THREE.SphereGeometry(500,32,16),m);s.renderOrder=-10;s.frustumCulled=false;return s}
function makeStars(n,r,size){const p=new Float32Array(n*3),c=new Float32Array(n*3);for(let i=0;i<n;i++){const u=Math.random()*2-1,a=Math.random()*TAU,q=Math.sqrt(1-u*u);p[i*3]=Math.cos(a)*q*r;p[i*3+1]=u*r;p[i*3+2]=Math.sin(a)*q*r;const w=.7+Math.random()*.3,tint=Math.random();c[i*3]=w*(tint<.15?.8:1);c[i*3+1]=w*.95;c[i*3+2]=w*(tint>.85?.8:1)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(p,3));g.setAttribute('color',new THREE.BufferAttribute(c,3));
  const s=new THREE.Points(g,new THREE.PointsMaterial({size:size||1.6,vertexColors:true,fog:false,sizeAttenuation:false,transparent:true,depthWrite:false}));s.frustumCulled=false;s.renderOrder=-9;return s}

/* particles */
function makeFX(scene,max){
  max=max||500;const pos=new Float32Array(max*3),col=new Float32Array(max*3),siz=new Float32Array(max),alp=new Float32Array(max);
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));g.setAttribute('size',new THREE.BufferAttribute(siz,1));g.setAttribute('alpha',new THREE.BufferAttribute(alp,1));
  const m=new THREE.ShaderMaterial({uniforms:{map:{value:glowTex},ps:{value:renderer.getPixelRatio()*window.innerHeight*.5}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    vertexShader:'attribute float size;attribute float alpha;attribute vec3 color;varying vec3 vc;varying float va;uniform float ps;void main(){vc=color;va=alpha;vec4 mv=modelViewMatrix*vec4(position,1.);gl_PointSize=size*ps/max(-mv.z,.1);gl_Position=projectionMatrix*mv;}',
    fragmentShader:'uniform sampler2D map;varying vec3 vc;varying float va;void main(){vec4 t=texture2D(map,gl_PointCoord);gl_FragColor=vec4(vc,va*t.a);}'});
  const pts=new THREE.Points(g,m);pts.frustumCulled=false;pts.renderOrder=5;scene.add(pts);
  const P=[];for(let i=0;i<max;i++)P.push({life:0});let head=0;
  function burst(x,y,z,o){o=o||{};_c.set(o.col||0xffd36b);const n=o.n||12;for(let k=0;k<n;k++){const p=P[head];head=(head+1)%max;const a=Math.random()*TAU,u=o.dir?1:Math.random()*2-1,q=Math.sqrt(1-u*u),sp=(o.spd||3)*(.4+Math.random()*.6);
    p.x=x+(Math.random()-.5)*(o.spread||0);p.y=y+(Math.random()-.5)*(o.spread||0);p.z=z+(Math.random()-.5)*(o.spread||0);p.vx=Math.cos(a)*q*sp;p.vz=Math.sin(a)*q*sp;p.vy=(o.up!=null?o.up*(.6+Math.random()*.6):u*sp);
    p.life=p.max=(o.life||.8)*(.6+Math.random()*.5);p.g=o.g==null?6:o.g;p.size=(o.size||.3)*(.6+Math.random()*.6);p.r=_c.r;p.gg=_c.g;p.b=_c.b;p.drag=o.drag||1.5}}
  function update(dt){for(let i=0;i<max;i++){const p=P[i];if(p.life>0){p.life-=dt;p.vy-=p.g*dt;const d=Math.exp(-p.drag*dt);p.vx*=d;p.vz*=d;p.x+=p.vx*dt;p.y+=p.vy*dt;p.z+=p.vz*dt;
      pos[i*3]=p.x;pos[i*3+1]=p.y;pos[i*3+2]=p.z;col[i*3]=p.r;col[i*3+1]=p.gg;col[i*3+2]=p.b;siz[i]=p.size;alp[i]=Math.max(0,p.life/p.max)}else alp[i]=0}
    g.attributes.position.needsUpdate=true;g.attributes.color.needsUpdate=true;g.attributes.size.needsUpdate=true;g.attributes.alpha.needsUpdate=true;m.uniforms.ps.value=renderer.getPixelRatio()*window.innerHeight*.5}
  function clear(){P.forEach(p=>p.life=0)}
  return{burst,update,clear};
}
const FXW=makeFX(wscene,600),FXS=makeFX(sscene,400);

/* portraits rendered from the 3D models */
const PORT={r:null,cache:{}};
function portrait(key){return portraitOf(key+(key==='kapik'||key==='ufo'?':'+S.hat:''),()=>makeCast(key))}
function portraitHat(h){return portraitOf('hat:'+h,()=>makeChar(Object.assign(CAST.kapik.spec(),{hat:h})))}
function portraitOf(k,make){
  if(PORT.cache[k])return PORT.cache[k];
  try{
    if(!PORT.r){const r=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});r.setPixelRatio(1);r.setSize(200,200);PORT.r=r;PORT.sc=new THREE.Scene();
      PORT.sc.add(new THREE.HemisphereLight(0xffffff,0x554466,.95));const d=new THREE.DirectionalLight(0xffffff,.75);d.position.set(2,3,4);PORT.sc.add(d);const d2=new THREE.DirectionalLight(0xffab4a,.35);d2.position.set(-3,1,-2);PORT.sc.add(d2);PORT.cam=new THREE.PerspectiveCamera(30,1,.05,50)}
    const c=make();PORT.sc.add(c.root);c.root.updateMatrixWorld(true);
    const hy=c.headY,hr=c.headR*(c.sp&&c.sp.hat&&c.sp.hat!=='none'?1.15:1),dist=hr*6.2;
    PORT.cam.position.set(dist*.32,hy+hr*.25,dist*.95);PORT.cam.lookAt(0,hy-hr*.45,0);
    PORT.r.render(PORT.sc,PORT.cam);const url=PORT.r.domElement.toDataURL();
    PORT.sc.remove(c.root);disposeTree(c.root);PORT.cache[k]=url;return url;
  }catch(e){return ''}
}
