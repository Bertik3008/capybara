/* ---------- RENDER ---------- */
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=isTouch?THREE.PCFShadowMap:THREE.PCFSoftShadowMap;
$('#view').appendChild(renderer.domElement);
const cv=renderer.domElement;
const wscene=new THREE.Scene(),sscene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(70,1,.1,1200);camera.rotation.order='YXZ';
const lc=h=>new THREE.Color(h).convertSRGBToLinear();
const hemi=new THREE.HemisphereLight(0xffffff,0x444444,.9);wscene.add(hemi);
const sun=new THREE.DirectionalLight(0xffffff,.8);sun.position.set(30,50,20);sun.castShadow=true;
const sc_=sun.shadow.camera;sc_.left=-40;sc_.right=40;sc_.top=40;sc_.bottom=-40;sc_.near=1;sc_.far=170;sun.shadow.bias=-.0006;sun.shadow.normalBias=.04;
wscene.add(sun);wscene.add(sun.target);
/* quality: 0 low, 1 medium, 2 high */
const Q={get q(){return S.set.q==null?(isTouch?1:2):S.set.q}};
function applyQuality(){const q=Q.q,dpr=window.devicePixelRatio||1;renderer.setPixelRatio(Math.min(dpr,(isTouch?[1,1.3,1.75]:[1,1.5,2])[q]));const sh=q>0;renderer.shadowMap.enabled=sh;sun.castShadow=sh;
  const ms=q===2?(isTouch?1536:2048):1024;if(sun.shadow.mapSize.x!==ms){sun.shadow.mapSize.set(ms,ms);if(sun.shadow.map){sun.shadow.map.dispose();sun.shadow.map=null}}resize()}
function resize(){const w=window.innerWidth,h=window.innerHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();if(window.UI&&UI.resizeMap)UI.resizeMap()}
window.addEventListener('resize',resize);

/* ---------- prototype geometries (non-indexed so they can be merged, smooth normals kept) ---------- */
const NI=g=>g.index?g.toNonIndexed():g;
function lathe(pts,seg){return NI(new THREE.LatheGeometry(pts.map(p=>new THREE.Vector2(p[0],p[1])),seg||16))}
const capPts=(()=>{const a=[];for(let i=0;i<=6;i++){const t=i/6*Math.PI/2;a.push([Math.sin(t),-1-Math.cos(t)*.0+(-Math.cos(t))*1])}return a})();
function capsuleGeo(){const pts=[];for(let i=0;i<=8;i++){const t=-Math.PI/2+i/8*Math.PI/2;pts.push([Math.cos(t),-0.5+Math.sin(t)*.5])}for(let i=0;i<=8;i++){const t=i/8*Math.PI/2;pts.push([Math.cos(t),0.5+Math.sin(t)*.5])}
  return lathe(pts.map(p=>[Math.max(p[0],0.0001),p[1]/2]),16)}
function beanGeo(){const pts=[];for(let i=0;i<=16;i++){const t=-Math.PI/2+i/16*Math.PI;const r=Math.cos(t)*(1+.12*Math.sin(t*.5+.8)),y=Math.sin(t);pts.push([Math.max(r,0.0001),y])}return lathe(pts,20)}
function rockGeo(seed){const g=new THREE.IcosahedronGeometry(1,1),p=g.attributes.position,r=rng(seed);const map={};for(let i=0;i<p.count;i++){const k=p.getX(i).toFixed(3)+p.getY(i).toFixed(3)+p.getZ(i).toFixed(3);if(!map[k])map[k]=.78+r()*.38;const s=map[k];p.setXYZ(i,p.getX(i)*s,p.getY(i)*s,p.getZ(i)*s)}g.computeVertexNormals();return NI(g)}
const G={
  box:NI(new THREE.BoxGeometry(1,1,1)),cyl:NI(new THREE.CylinderGeometry(1,1,1,14)),cyl6:NI(new THREE.CylinderGeometry(1,1,1,6)),cyl16:NI(new THREE.CylinderGeometry(1,1,1,28)),
  cone:NI(new THREE.ConeGeometry(1,1,14)),cone4:NI(new THREE.ConeGeometry(1,1,4)),sph:NI(new THREE.SphereGeometry(1,18,14)),sphLo:NI(new THREE.SphereGeometry(1,12,9)),sphTiny:NI(new THREE.SphereGeometry(1,7,5)),sphHi:NI(new THREE.SphereGeometry(1,28,20)),
  ico:NI(new THREE.IcosahedronGeometry(1,0)),ico1:NI(new THREE.SphereGeometry(1,14,10)),dod:rockGeo(5),rock2:rockGeo(9),
  hemi:NI(new THREE.SphereGeometry(1,24,10,0,TAU,0,Math.PI/2)),tor:NI(new THREE.TorusGeometry(1,.22,10,28)),torThin:NI(new THREE.TorusGeometry(1,.08,8,32)),
  frus:NI(new THREE.CylinderGeometry(.6,1,1,12)),trunk:NI(new THREE.CylinderGeometry(.62,1,1,10)),oct:NI(new THREE.OctahedronGeometry(1,0)),disc:NI(new THREE.CylinderGeometry(1,1,1,32)),
  cap:capsuleGeo(),bean:beanGeo()
};
G.prism=(()=>{const A=[.5,0,-.5],B=[.5,0,.5],C=[.5,1,0],A2=[-.5,0,-.5],B2=[-.5,0,.5],C2=[-.5,1,0],out=[],ctr=[0,.33,0];
  const tri=(a,b,c)=>{const u=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],v=[c[0]-a[0],c[1]-a[1],c[2]-a[2]],n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]],m=[(a[0]+b[0]+c[0])/3-ctr[0],(a[1]+b[1]+c[1])/3-ctr[1],(a[2]+b[2]+c[2])/3-ctr[2]];
    if(n[0]*m[0]+n[1]*m[1]+n[2]*m[2]<0)out.push(...a,...c,...b);else out.push(...a,...b,...c)};
  tri(A,B,C);tri(A2,B2,C2);tri(A,B,B2);tri(A,B2,A2);tri(A,A2,C2);tri(A,C2,C);tri(B,C,C2);tri(B,C2,B2);
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(out,3));g.computeVertexNormals();return g})();
for(const k in G)G[k].userData.shared=true;

/* ---------- procedural textures ---------- */
const TX={plain:0,planks:1,brick:2,shingle:3,cobble:4,metal:5,corr:6,ice:7,snow:8,straw:9,bark:10,leaves:11,stripes:12,stone:13,moss:14,flat:15};
function tileNoise(size,period,seed){const r=rng(seed),g=[];for(let i=0;i<period*period;i++)g.push(r());const f=(x,y)=>{const s=size/period,gx=x/s,gy=y/s,x0=Math.floor(gx),y0=Math.floor(gy),fx=gx-x0,fy=gy-y0,u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy);
  const a=g[(y0%period)*period+(x0%period)],b=g[(y0%period)*period+((x0+1)%period)],c=g[((y0+1)%period)*period+(x0%period)],d=g[((y0+1)%period)*period+((x0+1)%period)];return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v};return f}
function paintTile(type,S2){const c=document.createElement('canvas');c.width=c.height=S2;const g=c.getContext('2d'),img=g.createImageData(S2,S2),d=img.data,r=rng(type*31+7);
  const n1=tileNoise(S2,8,type+1),n2=tileNoise(S2,32,type+5),n3=tileNoise(S2,64,type+9);
  const put=(x,y,v)=>{const i=(y*S2+x)*4;v=clamp(v,0,1)*255;d[i]=d[i+1]=d[i+2]=v;d[i+3]=255};
  const pts=[];if(type===TX.cobble||type===TX.stone)for(let i=0;i<(type===TX.cobble?28:10);i++)pts.push([r()*S2,r()*S2,.82+r()*.18]);
  const plank=[];for(let i=0;i<8;i++)plank.push([.8+r()*.2,Math.floor(r()*S2)]);
  for(let y=0;y<S2;y++)for(let x=0;x<S2;x++){let v=.9+(n1(x,y)-.5)*.12+(n2(x,y)-.5)*.08;
    switch(type){
      case TX.planks:{const row=Math.floor(y/32),py=y%32;const p=plank[row%8];v=p[0]+(n3((x*.25+row*40)%S2,y)-.5)*.18+Math.sin((x+row*17)*.09+n2(x,y)*6)*.03;if(py<2)v*=.55;if(Math.abs(((x+p[1])%S2)-S2/2)<1.2)v*=.6;break}
      case TX.brick:{const row=Math.floor(y/32),off=row%2?32:0,bx=(x+off)%64,py=y%32;v=.86+(n2(x,y)-.5)*.2+((Math.floor((x+off)/64)*7+row*3)%5)*.025;if(py<3||bx<3)v=1.0;break}
      case TX.shingle:{const row=Math.floor(y/32),off=row%2?16:0,sx=((x+off)%32)-16,py=y%32,edge=26-Math.sqrt(Math.max(0,256-sx*sx))*.4;v=.85+(n2(x,y)-.5)*.15;if(py>edge)v*=.62;if(Math.abs(sx)>14.5)v*=.75;break}
      case TX.cobble:case TX.stone:{let b=1e9,b2=1e9,bi=0;for(let k=0;k<pts.length;k++)for(const ox of[-S2,0,S2])for(const oy of[-S2,0,S2]){const dd=Math.hypot(x-pts[k][0]-ox,y-pts[k][1]-oy);if(dd<b){b2=b;b=dd;bi=k}else if(dd<b2)b2=dd}
        const e=b2-b;v=pts[bi][2]+(n3(x,y)-.5)*.15;if(e<(type===TX.cobble?3:4))v*=.45+e*.1;break}
      case TX.metal:{const px=x%128,py=y%128;v=.82+(n3(x,(y*8)%S2)-.5)*.06+(n1(x,y)-.5)*.08;if(px<2||py<2)v*=.55;if((px-8)**2+(py-8)**2<5||(px-120)**2+(py-8)**2<5||(px-8)**2+(py-120)**2<5||(px-120)**2+(py-120)**2<5)v=1;break}
      case TX.corr:v=.8+Math.sin(x/S2*TAU*16)*.12+(n2(x,y)-.5)*.08;break;
      case TX.ice:{v=.92+(n1(x,y)-.5)*.12;const cr=Math.abs(n2(x,y)-.5);if(cr<.012)v=1.08;break}
      case TX.snow:v=.95+(n2(x,y)-.5)*.06+(r()<.004?.15:0);break;
      case TX.straw:v=.8+(n3(x,(y*12)%S2)-.5)*.35+(n1(x,y)-.5)*.1;break;
      case TX.bark:v=.75+(n3((x*10)%S2,y)-.5)*.4;if(n2((x*4)%S2,y)<.25)v*=.7;break;
      case TX.leaves:{v=.78+(n3(x,y)-.5)*.35+(n2(x,y)-.5)*.2;if(n3((x*2)%S2,(y*2)%S2)>.72)v+=.12;break}
      case TX.stripes:v=Math.floor(x/(S2/4))%2?1:.78;v+=(n2(x,y)-.5)*.05;break;
      case TX.moss:v=.8+(n3(x,y)-.5)*.3+(n1(x,y)-.5)*.2;break;
      case TX.flat:v=1;break;
    }put(x,y,v)}
  g.putImageData(img,0,0);return c}
const ATLAS=(()=>{const N=256,c=document.createElement('canvas');c.width=c.height=N*4;const g=c.getContext('2d');
  for(let t=0;t<16;t++){const tile=paintTile(t,N),cx=(t%4)*N,cy=Math.floor(t/4)*N;g.save();g.beginPath();g.rect(cx,cy,N,N);g.clip();const s=N-8;for(const ox of[-1,0,1])for(const oy of[-1,0,1])g.drawImage(tile,cx+4+ox*s,cy+4+oy*s,s,s);g.restore()}
  const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.anisotropy=4;t.userData={shared:true};return t})();
function groundTex(kind){const N=512,c=document.createElement('canvas');c.width=c.height=N;const g=c.getContext('2d'),img=g.createImageData(N,N),d=img.data,r=rng(kind.length*13);
  const n1=tileNoise(N,8,kind.length),n2=tileNoise(N,32,kind.length+3),n3=tileNoise(N,128,kind.length+7);
  for(let y=0;y<N;y++)for(let x=0;x<N;x++){let v=.9+(n1(x,y)-.5)*.12+(n2(x,y)-.5)*.05+(n3(x,y)-.5)*.02;
    if(kind==='metal'){const px=x%256,py=y%256;v=.85+(n3(x,(y*4)%N)-.5)*.05;if(px<3||py<3)v*=.6;if(px%64<2&&py%64<2)v=1}
    if(kind==='snow')v=.96+(n2(x,y)-.5)*.05;
    const i=(y*N+x)*4;v=clamp(v,0,1)*255;d[i]=d[i+1]=d[i+2]=v;d[i+3]=255}
  g.putImageData(img,0,0);
  if(kind==='grass'||kind==='moss'){for(let i=0;i<2200;i++){const x=r()*N,y=r()*N,l=3+r()*6,a=-Math.PI/2+(r()-.5)*.8,b=r();g.strokeStyle=b<.5?`rgba(0,0,0,${.05+r()*.05})`:`rgba(255,255,255,${.05+r()*.05})`;g.lineWidth=1+r();g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(a)*l,y+Math.sin(a)*l);g.stroke()}}
  if(kind==='snow'){for(let i=0;i<600;i++){g.fillStyle=`rgba(255,255,255,${.4+r()*.6})`;g.fillRect(r()*N,r()*N,1.5,1.5)}for(let i=0;i<120;i++){g.fillStyle='rgba(120,150,180,.08)';g.beginPath();g.ellipse(r()*N,r()*N,6+r()*14,3+r()*6,r()*3,0,TAU);g.fill()}}
  const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.encoding=THREE.sRGBEncoding;t.anisotropy=8;return t}
function pathTex(kind){const W=256,H=512,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d'),r=rng(kind.length*7+1);
  const base={dirt:'#d9c2a0',cobble:'#c9c2b8',snow:'#eef4f8',metal:'#9aa2aa',moss:'#b8a8d0'}[kind]||'#d9c2a0';g.fillStyle=base;g.fillRect(0,0,W,H);
  const n=tileNoise(H,16,kind.length);const img=g.getImageData(0,0,W,H),d=img.data;
  for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*4,v=.9+(n(x%H,y)-.5)*.14;d[i]*=v;d[i+1]*=v;d[i+2]*=v;const edge=Math.min(x,W-1-x)/W,rag=.06+n((x*3)%H,(y*2)%H)*.12;d[i+3]=edge<rag?0:255}
  g.putImageData(img,0,0);g.globalCompositeOperation='source-atop';
  if(kind==='cobble'){for(let yy=0;yy<H;yy+=26)for(let xx=-10;xx<W;xx+=32){const ox=(yy/26)%2?16:0;g.fillStyle=`rgba(${150+r()*40|0},${145+r()*35|0},${135+r()*35|0},1)`;g.beginPath();g.ellipse(xx+ox+r()*4,yy+13,13,10,0,0,TAU);g.fill();g.strokeStyle='rgba(60,50,40,.5)';g.lineWidth=2;g.stroke()}}
  else if(kind==='metal'){g.fillStyle='rgba(60,64,70,.6)';for(let y=0;y<H;y+=64)g.fillRect(0,y,W,3);g.fillStyle='#e8b23a';for(let y=0;y<H;y+=40){g.save();g.translate(0,y);g.transform(1,0,-.6,1,0,0);g.fillRect(14,0,14,20);g.fillRect(W-28,0,14,20);g.restore()}}
  else{for(let i=0;i<(kind==='snow'?30:70);i++){const x=r()*W,y=r()*H,s=1.5+r()*4;g.fillStyle=kind==='snow'?'rgba(140,170,200,.25)':kind==='moss'?`rgba(${200+r()*55|0},${170+r()*60|0},255,.6)`:`rgba(${120+r()*50|0},${100+r()*40|0},${75+r()*30|0},.35)`;g.beginPath();g.ellipse(x,y,s,s*.7,r()*3,0,TAU);g.fill()}
    if(kind==='snow')for(let y=20;y<H;y+=46){g.fillStyle='rgba(120,150,180,.25)';g.beginPath();g.ellipse(W*.4,y,9,14,0,0,TAU);g.fill();g.beginPath();g.ellipse(W*.6,y+23,9,14,0,0,TAU);g.fill()}}
  const t=new THREE.CanvasTexture(c);t.wrapT=THREE.RepeatWrapping;t.encoding=THREE.sRGBEncoding;t.anisotropy=8;return t}
const glowTex=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d');const gr=g.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.25,'rgba(255,255,255,.5)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,64,64);const t=new THREE.CanvasTexture(c);t.userData={shared:true};return t})();
const cloudTex=(()=>{const c=document.createElement('canvas');c.width=256;c.height=128;const g=c.getContext('2d'),r=rng(3);for(let i=0;i<26;i++){const x=40+r()*176,y=50+r()*40,s=18+r()*30;const gr=g.createRadialGradient(x,y,0,x,y,s);gr.addColorStop(0,'rgba(255,255,255,.55)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,s,0,TAU);g.fill()}const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.userData={shared:true};return t})();

/* ---------- materials ---------- */
const UNI={time:{value:0}};
function atlasMat(){const m=new THREE.MeshStandardMaterial({vertexColors:true,map:ATLAS,roughness:.86,metalness:0});
  m.onBeforeCompile=sh=>{sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nattribute vec2 uvt;varying vec2 vUvT;').replace('#include <uv_vertex>','#include <uv_vertex>\nvUvT=uvt;');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec2 vUvT;').replace('#include <map_fragment>',`#ifdef USE_MAP
      vec2 tuv=vUvT+fract(vUv)*0.2421875+0.00390625;
      #if __VERSION__ >= 300
      vec4 texelColor=textureGrad(map,tuv,dFdx(vUv)*0.2421875,dFdy(vUv)*0.2421875);
      #else
      vec4 texelColor=texture2D(map,tuv);
      #endif
      texelColor=mapTexelToLinear(texelColor);texelColor.rgb=mix(vec3(0.78),texelColor.rgb,0.5);diffuseColor*=texelColor;
      #endif`)};m.userData.shared=true;return m}
const batchMat=atlasMat();
const glowBatchMat=new THREE.MeshBasicMaterial({vertexColors:true,toneMapped:false});glowBatchMat.userData.shared=true;
const charMat=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.62,metalness:0});charMat.userData.shared=true;
const MC={};
function mat(c,o){const k=c+(o?JSON.stringify(o):'');if(!MC[k]){const p={color:lc(c),roughness:.65,metalness:0};
    if(o){if(o.shininess>50){p.roughness=.28;p.metalness=.35}if(o.emissive!=null)p.emissive=lc(o.emissive);for(const kk of['transparent','opacity','side','depthWrite'])if(o[kk]!=null)p[kk]=o[kk];if(o.metal){p.metalness=o.metal;p.roughness=o.rough!=null?o.rough:.35}}
    MC[k]=new THREE.MeshStandardMaterial(p);MC[k].userData.shared=true}return MC[k]}
function bmat(c,o){const k='b'+c+(o?JSON.stringify(o):'');if(!MC[k]){MC[k]=new THREE.MeshBasicMaterial(Object.assign({color:lc(c),toneMapped:false},o||{}));MC[k].userData.shared=true}return MC[k]}
function stdMat(c,o){return new THREE.MeshStandardMaterial(Object.assign({color:lc(c),roughness:.6,metalness:0},o||{}))}
function mesh(g,m,x,y,z,sx,sy,sz,parent){const o=new THREE.Mesh(g,m);o.position.set(x||0,y||0,z||0);if(sx!=null)o.scale.set(sx,sy==null?sx:sy,sz==null?sx:sz);if(parent)parent.add(o);return o}
function disposeTree(g){g.traverse(o=>{if(o.geometry&&!o.geometry.userData.shared)o.geometry.dispose();if(o.material){(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{if(m.userData&&m.userData.shared)return;if(m.map&&!(m.map.userData&&m.map.userData.shared))m.map.dispose();m.dispose()})}})}

/* ---------- static batching: merged, chunked, textured ---------- */
const _m=new THREE.Matrix4(),_q=new THREE.Quaternion(),_e=new THREE.Euler(),_p=new THREE.Vector3(),_s=new THREE.Vector3(),_c=new THREE.Color(),_n3=new THREE.Matrix3();
class Batch{
  constructor(){this.list=[]}
  add(g,col,x,y,z,sx,sy,sz,rx,ry,rz,jit,tex){_e.set(rx||0,ry||0,rz||0,'YXZ');_q.setFromEuler(_e);_m.compose(_p.set(x,y,z),_q,_s.set(sx,sy==null?sx:sy,sz==null?sx:sz));_n3.getNormalMatrix(_m);
    this.list.push({g,col,e:_m.elements.slice(),n:_n3.elements.slice(),jit:jit==null?.04:jit,t:tex||0,x,z})}
  build(mat,glow){if(!this.list.length)return[];const chunks={};for(const it of this.list){const k=Math.floor(it.x/26)+','+Math.floor(it.z/26);(chunks[k]=chunks[k]||[]).push(it)}
    const out=[];for(const k in chunks){const L2=chunks[k];let n=0;for(const it of L2)n+=it.g.attributes.position.count;
      const pos=new Float32Array(n*3),nor=new Float32Array(n*3),ca=new Float32Array(n*3),uv=new Float32Array(n*2),ut=new Float32Array(n*2);let o=0,j=1;
      for(const it of L2){const p=it.g.attributes.position.array,na=it.g.attributes.normal?it.g.attributes.normal.array:null,e=it.e,m3=it.n;_c.set(it.col).convertSRGBToLinear();const cnt=p.length/3,tx=(it.t%4)*.25,ty=1-(Math.floor(it.t/4)+1)*.25;
        for(let i=0;i<cnt;i++){const x=p[i*3],y=p[i*3+1],z=p[i*3+2];const wx=e[0]*x+e[4]*y+e[8]*z+e[12],wy=e[1]*x+e[5]*y+e[9]*z+e[13],wz=e[2]*x+e[6]*y+e[10]*z+e[14];pos[o]=wx;pos[o+1]=wy;pos[o+2]=wz;
          let nx=0,ny=1,nz=0;if(na){const a=na[i*3],b=na[i*3+1],c=na[i*3+2];nx=m3[0]*a+m3[3]*b+m3[6]*c;ny=m3[1]*a+m3[4]*b+m3[7]*c;nz=m3[2]*a+m3[5]*b+m3[8]*c;const l=Math.hypot(nx,ny,nz)||1;nx/=l;ny/=l;nz/=l}nor[o]=nx;nor[o+1]=ny;nor[o+2]=nz;
          const ax=Math.abs(nx),ay=Math.abs(ny),az=Math.abs(nz),u2=o/3*2;if(ay>=ax&&ay>=az){uv[u2]=wx*.5;uv[u2+1]=wz*.5}else if(ax>=az){uv[u2]=wz*.5;uv[u2+1]=wy*.5}else{uv[u2]=wx*.5;uv[u2+1]=wy*.5}ut[u2]=tx;ut[u2+1]=ty;
          if(i%3===0)j=1+(Math.random()*2-1)*it.jit;ca[o]=_c.r*j;ca[o+1]=_c.g*j;ca[o+2]=_c.b*j;o+=3}}
      const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('normal',new THREE.BufferAttribute(nor,3));g.setAttribute('color',new THREE.BufferAttribute(ca,3));
      if(!glow){g.setAttribute('uv',new THREE.BufferAttribute(uv,2));g.setAttribute('uvt',new THREE.BufferAttribute(ut,2))}g.computeBoundingSphere();out.push(new THREE.Mesh(g,mat))}
    return out}
}
/* merge a model's static meshes per node to cut draw calls (smooth vertex-coloured) */
function mergeModel(root){root.updateMatrixWorld(true);
  (function walk(node){const kids=node.children.slice();const groups={std:[],basic:[]};
    for(const ch of kids){if(ch.isMesh&&!ch.userData.keep&&ch.children.length===0&&!ch.isSkinnedMesh){const m=ch.material;if(m&&!Array.isArray(m)&&!m.transparent&&!m.map){if(m.isMeshStandardMaterial&&!(m.emissive&&m.emissive.getHex()))groups.std.push(ch);else if(m.isMeshBasicMaterial)groups.basic.push(ch)}}}
    for(const key of['std','basic']){const arr=groups[key];if(arr.length<2)continue;let n=0;for(const ch of arr)n+=(ch.geometry.index?ch.geometry.index.count:ch.geometry.attributes.position.count);
      const pos=new Float32Array(n*3),nor=new Float32Array(n*3),col=new Float32Array(n*3);let o=0;
      for(const ch of arr){ch.updateMatrix();const g=ch.geometry.index?ch.geometry.toNonIndexed():ch.geometry,p=g.attributes.position.array,na=g.attributes.normal&&g.attributes.normal.array,e=ch.matrix.elements;_n3.getNormalMatrix(ch.matrix);const m3=_n3.elements,c=ch.material.color;
        for(let i=0;i<p.length/3;i++){const x=p[i*3],y=p[i*3+1],z=p[i*3+2];pos[o]=e[0]*x+e[4]*y+e[8]*z+e[12];pos[o+1]=e[1]*x+e[5]*y+e[9]*z+e[13];pos[o+2]=e[2]*x+e[6]*y+e[10]*z+e[14];
          if(na){const a=na[i*3],b=na[i*3+1],cc=na[i*3+2];let nx=m3[0]*a+m3[3]*b+m3[6]*cc,ny=m3[1]*a+m3[4]*b+m3[7]*cc,nz=m3[2]*a+m3[5]*b+m3[8]*cc;const l=Math.hypot(nx,ny,nz)||1;nor[o]=nx/l;nor[o+1]=ny/l;nor[o+2]=nz/l}
          col[o]=c.r;col[o+1]=c.g;col[o+2]=c.b;o+=3}if(g!==ch.geometry)g.dispose();node.remove(ch);if(!ch.geometry.userData.shared)ch.geometry.dispose()}
      const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('normal',new THREE.BufferAttribute(nor,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));g.computeBoundingSphere();
      const mm=new THREE.Mesh(g,key==='std'?charMat:glowBatchMat);mm.castShadow=key==='std';node.add(mm)}
    for(const ch of node.children)if(!ch.isMesh)walk(ch)})(root);
  return root}

function glow(color,size,op){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color:lc(color),transparent:true,opacity:op==null?1:op,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false}));s.scale.set(size,size,1);return s}
function rr(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
function textSprite(txt,o){o=o||{};const size=o.size||40;const c=document.createElement('canvas');const ctx=c.getContext('2d');const font=`${o.w||800} ${size}px ${o.font||'Nunito, system-ui, sans-serif'}`;ctx.font=font;const tw=Math.ceil(ctx.measureText(txt).width);c.width=tw+Math.round(size*1.1);c.height=Math.ceil(size*1.5);ctx.font=font;
  ctx.fillStyle=o.bg||'rgba(18,14,38,.72)';rr(ctx,0,0,c.width,c.height,c.height/2);ctx.fill();ctx.fillStyle=o.fg||'#f7eee1';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(txt,c.width/2,c.height/2+size*.05);
  const tex=new THREE.CanvasTexture(c);tex.minFilter=THREE.LinearFilter;tex.generateMipmaps=false;tex.encoding=THREE.sRGBEncoding;const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthWrite:false,toneMapped:false,depthTest:o.depthTest!==false}));const h=o.h||.4;sp.scale.set(h*c.width/c.height,h,1);return sp}
function signTex(lines,o){o=o||{};const c=document.createElement('canvas');c.width=o.cw||512;c.height=o.ch||256;const g=c.getContext('2d');g.fillStyle=o.bg||'#7a4a2a';g.fillRect(0,0,c.width,c.height);
  for(let y=0;y<c.height;y+=42){g.fillStyle='rgba(0,0,0,.08)';g.fillRect(0,y,c.width,2)}g.strokeStyle='rgba(0,0,0,.3)';g.lineWidth=12;g.strokeRect(6,6,c.width-12,c.height-12);
  g.fillStyle=o.fg||'#fff1d6';g.textAlign='center';g.textBaseline='middle';const fs=o.fs||64;g.font=`400 ${fs}px "Russo One", Arial Black, sans-serif`;lines.forEach((l,i)=>g.fillText(l,c.width/2,c.height/2+(i-(lines.length-1)/2)*fs*1.15));const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.anisotropy=4;return t}

/* sky dome */
function makeSky(top,hor,bot,sunDir,sunCol){
  const m=new THREE.ShaderMaterial({uniforms:{t:{value:new THREE.Color(top)},h:{value:new THREE.Color(hor)},b:{value:new THREE.Color(bot)},sd:{value:new THREE.Vector3().copy(sunDir||new THREE.Vector3(0,1,0)).normalize()},sc:{value:new THREE.Color(sunCol||0xfff0c0)}},
    vertexShader:'varying vec3 vp;void main(){vp=normalize(position);vec4 p=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_Position=p.xyww;}',
    fragmentShader:'uniform vec3 t,h,b,sd,sc;varying vec3 vp;void main(){float y=vp.y;vec3 c=y>0.?mix(h,t,pow(clamp(y,0.,1.),.5)):mix(h,b,clamp(-y*4.,0.,1.));float s=max(dot(normalize(vp),sd),0.);c+=sc*(smoothstep(.9985,.9992,s)*1.2+pow(s,10.)*.22+pow(s,80.)*.25);float n=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);c+=(n-.5)/255.;gl_FragColor=vec4(c,1.);}',
    side:THREE.BackSide,depthWrite:false,fog:false,toneMapped:false});
  const s=new THREE.Mesh(new THREE.SphereGeometry(500,32,16),m);s.renderOrder=-10;s.frustumCulled=false;return s}
function makeStars(n,r,size){const p=new Float32Array(n*3),c=new Float32Array(n*3);for(let i=0;i<n;i++){const u=Math.random()*2-1,a=Math.random()*TAU,q=Math.sqrt(1-u*u);p[i*3]=Math.cos(a)*q*r;p[i*3+1]=u*r;p[i*3+2]=Math.sin(a)*q*r;const w=.55+Math.random()*.45,tint=Math.random();c[i*3]=w*(tint<.15?.75:1);c[i*3+1]=w*.95;c[i*3+2]=w*(tint>.85?.75:1)}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(p,3));g.setAttribute('color',new THREE.BufferAttribute(c,3));
  const s=new THREE.Points(g,new THREE.PointsMaterial({size:size||1.6,vertexColors:true,fog:false,sizeAttenuation:false,transparent:true,depthWrite:false,toneMapped:false}));s.frustumCulled=false;s.renderOrder=-9;return s}

/* particles */
function makeFX(scene,max){
  max=max||500;const pos=new Float32Array(max*3),col=new Float32Array(max*3),siz=new Float32Array(max),alp=new Float32Array(max);
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));g.setAttribute('size',new THREE.BufferAttribute(siz,1));g.setAttribute('alpha',new THREE.BufferAttribute(alp,1));
  const m=new THREE.ShaderMaterial({uniforms:{map:{value:glowTex},ps:{value:renderer.getPixelRatio()*window.innerHeight*.5}},transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,
    vertexShader:'attribute float size;attribute float alpha;attribute vec3 color;varying vec3 vc;varying float va;uniform float ps;void main(){vc=color;va=alpha;vec4 mv=modelViewMatrix*vec4(position,1.);gl_PointSize=size*ps/max(-mv.z,.1);gl_Position=projectionMatrix*mv;}',
    fragmentShader:'uniform sampler2D map;varying vec3 vc;varying float va;void main(){vec4 t=texture2D(map,gl_PointCoord);gl_FragColor=vec4(vc,va*t.a);}'});
  const pts=new THREE.Points(g,m);pts.frustumCulled=false;pts.renderOrder=5;scene.add(pts);
  const P=[];for(let i=0;i<max;i++)P.push({life:0});let head=0,alive=0;
  function burst(x,y,z,o){o=o||{};_c.set(o.col||0xffd36b);const n=o.n||12;alive=max;for(let k=0;k<n;k++){const p=P[head];head=(head+1)%max;const a=Math.random()*TAU,u=o.dir?1:Math.random()*2-1,q=Math.sqrt(1-u*u),sp=(o.spd||3)*(.4+Math.random()*.6);
    p.x=x+(Math.random()-.5)*(o.spread||0);p.y=y+(Math.random()-.5)*(o.spread||0);p.z=z+(Math.random()-.5)*(o.spread||0);p.vx=Math.cos(a)*q*sp;p.vz=Math.sin(a)*q*sp;p.vy=(o.up!=null?o.up*(.6+Math.random()*.6):u*sp);
    p.life=p.max=(o.life||.8)*(.6+Math.random()*.5);p.g=o.g==null?6:o.g;p.size=(o.size||.3)*(.6+Math.random()*.6);p.r=_c.r;p.gg=_c.g;p.b=_c.b;p.drag=o.drag||1.5}}
  function update(dt){if(!alive)return;let a=0;for(let i=0;i<max;i++){const p=P[i];if(p.life>0){a++;p.life-=dt;p.vy-=p.g*dt;const d=Math.exp(-p.drag*dt);p.vx*=d;p.vz*=d;p.x+=p.vx*dt;p.y+=p.vy*dt;p.z+=p.vz*dt;
      pos[i*3]=p.x;pos[i*3+1]=p.y;pos[i*3+2]=p.z;col[i*3]=p.r;col[i*3+1]=p.gg;col[i*3+2]=p.b;siz[i]=p.size;alp[i]=Math.max(0,p.life/p.max)}else alp[i]=0}
    alive=a?max:0;g.attributes.position.needsUpdate=true;g.attributes.color.needsUpdate=true;g.attributes.size.needsUpdate=true;g.attributes.alpha.needsUpdate=true;m.uniforms.ps.value=renderer.getPixelRatio()*window.innerHeight*.5}
  function clear(){P.forEach(p=>p.life=0);alp.fill(0);g.attributes.alpha.needsUpdate=true}
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
    if(!PORT.r){const r=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});r.setPixelRatio(1);r.setSize(220,220);r.outputEncoding=THREE.sRGBEncoding;r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1.15;PORT.r=r;PORT.sc=new THREE.Scene();
      PORT.sc.add(new THREE.HemisphereLight(0xffffff,0x554466,1.0));const d=new THREE.DirectionalLight(0xfff4e0,1.1);d.position.set(2,3,4);PORT.sc.add(d);const d2=new THREE.DirectionalLight(0xffab4a,.55);d2.position.set(-3,1,-2);PORT.sc.add(d2);PORT.cam=new THREE.PerspectiveCamera(30,1,.05,50)}
    const c=make();PORT.sc.add(c.root);c.root.updateMatrixWorld(true);
    const hy=c.headY,hr=c.headR*(c.sp&&c.sp.hat&&c.sp.hat!=='none'?1.15:1),dist=hr*6.2;
    PORT.cam.position.set(dist*.32,hy+hr*.25,dist*.95);PORT.cam.lookAt(0,hy-hr*.45,0);
    PORT.r.render(PORT.sc,PORT.cam);const url=PORT.r.domElement.toDataURL();
    PORT.sc.remove(c.root);disposeTree(c.root);PORT.cache[k]=url;return url;
  }catch(e){return ''}
}
