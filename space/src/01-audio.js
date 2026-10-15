/* ---------- AUDIO: procedural music + sfx ---------- */
const AU=(()=>{
  let ctx=null,master,musG,sfxG,rev,noiseBuf,eng=null,amb=null;
  const mtof=m=>440*Math.pow(2,(m-69)/12);
  function impulse(sec){const r=ctx.sampleRate,n=r*sec,b=ctx.createBuffer(2,n,r);for(let c=0;c<2;c++){const d=b.getChannelData(c);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,2.6)}return b}
  function init(){
    if(ctx){if(ctx.state==='suspended')ctx.resume();return ctx}
    try{ctx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return null}
    master=ctx.createGain();master.gain.value=.9;
    const comp=ctx.createDynamicsCompressor();comp.threshold.value=-14;comp.ratio.value=3;master.connect(comp);comp.connect(ctx.destination);
    musG=ctx.createGain();sfxG=ctx.createGain();musG.connect(master);sfxG.connect(master);
    rev=ctx.createConvolver();rev.buffer=impulse(2.4);const rg=ctx.createGain();rg.gain.value=.32;rev.connect(rg);rg.connect(master);
    noiseBuf=ctx.createBuffer(1,ctx.sampleRate,ctx.sampleRate);const d=noiseBuf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
    vol();setInterval(tick,40);return ctx;
  }
  function vol(){if(!ctx)return;musG.gain.setTargetAtTime(S.set.music*.42,ctx.currentTime,.1);sfxG.gain.setTargetAtTime(S.set.sfx,ctx.currentTime,.05)}
  // generic voice
  function tone(t,f,dur,o){o=o||{};const os=ctx.createOscillator(),g=ctx.createGain();os.type=o.type||'sine';os.frequency.setValueAtTime(f,t);
    if(o.slide)os.frequency.exponentialRampToValueAtTime(Math.max(20,f*o.slide),t+(o.slideT||dur));if(o.detune)os.detune.value=o.detune;
    let node=os;if(o.lp){const fl=ctx.createBiquadFilter();fl.type='lowpass';fl.frequency.value=o.lp;fl.Q.value=o.q||.7;os.connect(fl);node=fl}
    const a=o.a||.005,v=o.v||.1;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);
    if(o.sus){g.gain.setValueAtTime(v,t+dur);g.gain.exponentialRampToValueAtTime(.0001,t+dur+(o.r||.3))}else g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    if(o.vib){const l=ctx.createOscillator(),lg=ctx.createGain();l.frequency.value=o.vib;lg.gain.value=f*.012;l.connect(lg);lg.connect(os.frequency);l.start(t);l.stop(t+dur+(o.r||.3)+.05)}
    node.connect(g);g.connect(o.dest||sfxG);if(o.wet){const w=ctx.createGain();w.gain.value=o.wet;g.connect(w);w.connect(rev)}
    os.start(t);os.stop(t+dur+(o.sus?(o.r||.3):0)+.05);return os}
  function noise(t,dur,o){o=o||{};const s=ctx.createBufferSource();s.buffer=noiseBuf;s.loop=true;const f=ctx.createBiquadFilter();f.type=o.ft||'lowpass';f.frequency.setValueAtTime(o.f||1000,t);if(o.fTo)f.frequency.exponentialRampToValueAtTime(o.fTo,t+dur);f.Q.value=o.q||.8;
    const g=ctx.createGain(),v=o.v||.1,a=o.a||.003;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    s.connect(f);f.connect(g);g.connect(o.dest||sfxG);if(o.wet){const w=ctx.createGain();w.gain.value=o.wet;g.connect(w);w.connect(rev)}s.start(t,Math.random()*.5);s.stop(t+dur+.05)}

  /* ---------- MUSIC ---------- */
  const MAJ=[0,2,4,5,7,9,11],MIN=[0,2,3,5,7,8,10],DOR=[0,2,3,5,7,9,10],LYD=[0,2,4,6,7,9,11];
  const TR={
    title:{bpm:80,root:57,mode:MAJ,prog:[0,5,3,4],pad:'triangle',bass:[0],arp:4,arpI:'bell',lead:'flute',dens:.22,seed:3,drums:null},
    base:{bpm:90,root:60,mode:MAJ,prog:[0,5,3,4],pad:'triangle',bass:[0,8],arp:4,arpI:'pluck',lead:'pluck',dens:.32,seed:7,drums:{k:'x.......x.......',h:'..x...x...x...x.',hv:.012}},
    p1:{bpm:106,root:62,mode:MAJ,prog:[0,3,4,0,5,3,4,4],pad:'triangle',bass:[0,6,8,14],arp:2,arpI:'pluck',lead:'pluck',dens:.5,seed:11,drums:{k:'x...x...x...x...',c:'....x.......x...',h:'x.x.x.x.x.x.x.x.',hv:.02}},
    p2:{bpm:70,root:64,mode:MIN,prog:[0,5,2,6],pad:'sine',bass:[0],arp:4,arpI:'bell',lead:'bell',dens:.2,seed:19,drums:{h:'........x.......',hv:.015}},
    p3:{bpm:82,root:62,mode:DOR,prog:[0,3,0,6],pad:'triangle',bass:[0,10],arp:2,arpI:'wood',lead:'flute',dens:.3,seed:23,drums:{w:'x..x..x...x..x..'}},
    p4:{bpm:114,root:57,mode:MIN,prog:[0,5,6,4],pad:'sawtooth',bass:[0,2,4,6,8,10,12,14],bassT:'sawtooth',arp:1,arpI:'square',lead:'square',dens:.18,seed:29,drums:{k:'x...x...x...x...',h:'..x...x...x...x.',c:'....x.......x...',hv:.025}},
    p5:{bpm:96,root:65,mode:LYD,prog:[0,4,1,4],pad:'sine',bass:[0,8],arp:2,arpI:'bell',lead:'flute',dens:.36,seed:41,drums:{h:'x...x...x...x...',w:'..x...x...x...x.',hv:.012}},
    p8:{bpm:64,root:59,mode:LYD,prog:[0,2,5,1],pad:'sine',bass:[0],arp:4,arpI:'bell',lead:'flute',dens:.22,seed:83,drums:null},
    p7:{bpm:112,root:60,mode:MAJ,prog:[0,4,5,3],pad:'triangle',bass:[0,4,8,12],arp:2,arpI:'wood',lead:'pluck',dens:.45,seed:71,drums:{w:'x..x..x...x..x..',h:'..x...x...x...x.',hv:.015}},
    p6:{bpm:100,root:52,mode:[0,1,3,5,7,8,10],prog:[0,1,0,6],pad:'sawtooth',bass:[0,3,8,11],bassT:'sawtooth',arp:2,arpI:'pluck',lead:'square',dens:.26,seed:53,drums:{k:'x.....x...x.....',c:'....x.......x...',h:'..x...x...x...x.',hv:.02}},
    boss:{bpm:136,root:52,mode:[0,1,3,5,7,8,10],prog:[0,1,6,1],pad:'sawtooth',bass:[0,2,4,6,8,10,12,14],bassT:'sawtooth',arp:1,arpI:'square',lead:'square',dens:.32,seed:61,drums:{k:'x...x...x...x...',h:'x.x.x.x.x.x.x.x.',c:'....x.......x...',hv:.03}},
    space:{bpm:68,root:55,mode:LYD,prog:[0,1,0,4],pad:'sawtooth',bass:[0],arp:4,arpI:'bell',lead:'bell',dens:.14,seed:31,drums:null}
  };
  let cur=null,next=0,step=0,leadBar=null,leadIdx=-1;
  function chordNotes(tr,deg){const m=tr.mode,o=[];for(let i=0;i<3;i++){const d=deg+i*2;o.push(tr.root+m[d%7]+12*Math.floor(d/7))}return o}
  function genLead(tr,bar){const r=rng(tr.seed*97+(bar%4)*13+(bar%8>=4?5:0)),out=[];const chord=chordNotes(tr,tr.prog[bar%tr.prog.length]);let deg=Math.floor(r()*5);
    for(let s=0;s<16;s++){if(s%2===0&&r()<tr.dens*(s%4===0?1.5:1)){if(s%8===0)out.push(chord[Math.floor(r()*3)]+12);else{deg=clamp(deg+Math.floor(r()*5)-2,0,9);const m=tr.mode;out.push(tr.root+12+m[deg%7]+12*Math.floor(deg/7))}}else out.push(null)}return out}
  function inst(name,t,f,dur){
    if(name==='pluck')tone(t,f,dur*1.6,{type:'triangle',v:.07,lp:2600,dest:musG,wet:.25});
    else if(name==='bell'){tone(t,f,1.4,{v:.05,dest:musG,wet:.5});tone(t,f*2.76,.6,{v:.012,dest:musG,wet:.5})}
    else if(name==='flute')tone(t,f,dur*1.4,{v:.05,a:.05,vib:5.5,dest:musG,wet:.35,sus:true,r:.25});
    else if(name==='square')tone(t,f,dur*.9,{type:'square',v:.028,lp:1700,dest:musG,wet:.2});
    else if(name==='wood')tone(t,f*2,.09,{type:'sine',v:.05,dest:musG,wet:.3});
  }
  function playStep(t){
    const tr=TR[cur];if(!tr)return;const s=step%16,bar=Math.floor(step/16),sd=60/tr.bpm/4;const deg=tr.prog[bar%tr.prog.length];const ch=chordNotes(tr,deg);
    if(s===0){ch.forEach((n,i)=>{tone(t,mtof(n),sd*15,{type:tr.pad,v:.018,a:.35,lp:tr.pad==='sawtooth'?700:1400,dest:musG,wet:.4,sus:true,r:.8,detune:i===1?6:-4})});leadBar=genLead(tr,bar)}
    if(tr.bass.indexOf(s)>=0)tone(t,mtof(ch[0]-24),sd*(tr.bass.length>4?1.6:6),{type:tr.bassT||'triangle',v:tr.bassT?.035:.07,lp:tr.bassT?500:900,dest:musG});
    if(tr.arp&&s%tr.arp===0){const k=Math.floor(s/tr.arp);inst(tr.arpI,t,mtof(ch[k%3]+12*(1+Math.floor(k/3)%2)),sd*tr.arp)}
    if(leadBar&&leadBar[s]!=null)inst(tr.lead,t,mtof(leadBar[s]),sd*2);
    const dr=tr.drums;if(dr){
      if(dr.k&&dr.k[s]==='x')tone(t,140,.22,{v:.16,slide:.32,slideT:.12,dest:musG});
      if(dr.h&&dr.h[s]==='x')noise(t,.045,{ft:'highpass',f:7500,v:dr.hv||.015,dest:musG});
      if(dr.c&&dr.c[s]==='x')noise(t,.14,{ft:'bandpass',f:1600,q:1.2,v:.05,dest:musG,wet:.3});
      if(dr.w&&dr.w[s]==='x')tone(t,900+((s*37)%5)*120,.06,{v:.035,dest:musG,wet:.2});
    }
  }
  function tick(){
    if(!ctx||!cur)return;const tr=TR[cur];const sd=60/tr.bpm/4;
    if(next<ctx.currentTime)next=ctx.currentTime+.05;
    while(next<ctx.currentTime+.2){playStep(next);next+=sd*(step%2?1-(tr.swing||0):1+(tr.swing||0));step++}
    ambTick();
  }
  function music(id){if(!ctx){cur=id;return}if(cur===id)return;
    musG.gain.cancelScheduledValues(ctx.currentTime);musG.gain.setTargetAtTime(0,ctx.currentTime,.25);
    setTimeout(()=>{cur=id;step=0;next=ctx.currentTime+.05;vol()},600)}
  /* ---------- AMBIENCE ---------- */
  let ambT=0;
  function ambient(type){amb=type;if(!ctx)return}
  function ambTick(){if(!amb||!ctx)return;const t=ctx.currentTime;if(t<ambT)return;
    if(amb==='birds'){ambT=t+1.5+Math.random()*4;const f=2000+Math.random()*1500;for(let i=0;i<2+Math.random()*3;i++)tone(t+i*.09,f*(1+Math.random()*.15),.07,{v:.012,slide:1.3,wet:.4})}
    else if(amb==='wind'){ambT=t+3;noise(t,3.4,{f:400+Math.random()*300,fTo:250,q:2,v:.025,a:1.2})}
    else if(amb==='drips'){ambT=t+.8+Math.random()*2.5;tone(t,1200+Math.random()*900,.12,{v:.02,slide:.6,wet:.7})}
    else if(amb==='hum'){ambT=t+2;tone(t,55,2.2,{type:'sawtooth',v:.008,lp:200,a:.5});if(Math.random()<.35)noise(t+.5,.25,{ft:'highpass',f:3000,v:.012})}
    else ambT=t+5;
  }
  /* ---------- SFX ---------- */
  function sfx(n,p){if(!ctx)return;const t=ctx.currentTime;
    switch(n){
      case'coin':tone(t,1318,.07,{type:'square',v:.03,lp:4000});tone(t+.06,1976,.14,{type:'square',v:.03,lp:4000});break;
      case'chest':[523,659,784,1047,1319].forEach((f,i)=>tone(t+i*.06,f,.25,{type:'triangle',v:.06,wet:.3}));noise(t+.25,.4,{ft:'highpass',f:6000,v:.03});break;
      case'pop':tone(t,900,.08,{type:'triangle',v:.06,slide:.5});tone(t+.03,1500,.06,{v:.03,slide:1.6});break;
      case'splat':noise(t,.12,{ft:'bandpass',f:1200,v:.07});tone(t,320,.1,{v:.04,slide:.4});break;
      case'fire':noise(t,.35,{f:900,v:.07});tone(t,130,.3,{type:'sawtooth',v:.03,slide:.6,lp:800});break;
      case'roar':tone(t,95,.9,{type:'sawtooth',v:.08,slide:.7,lp:700});noise(t,.6,{f:400,v:.05});break;
      case'sizzle':noise(t,.5,{ft:'highpass',f:3500,v:.04});break;
      case'jump':tone(t,300,.12,{v:.05,slide:1.8});break;
      case'djump':tone(t,500,.16,{v:.05,slide:2,type:'triangle'});noise(t,.15,{ft:'bandpass',f:2500,v:.03});break;
      case'land':noise(t,.1,{f:500,v:.07});break;
      case'step':{const s=p||'grass';if(s==='snow')noise(t,.09,{ft:'bandpass',f:3000,q:.7,v:.035});else if(s==='metal'){tone(t,500+Math.random()*120,.05,{type:'triangle',v:.03});noise(t,.03,{ft:'highpass',f:5000,v:.015})}else if(s==='wood'){tone(t,180+Math.random()*40,.06,{v:.05});noise(t,.03,{f:1500,v:.02})}else if(s==='ice')noise(t,.04,{ft:'highpass',f:4500,v:.02});else if(s==='moss')noise(t,.07,{f:500,v:.04});else noise(t,.06,{f:900+Math.random()*300,v:.035});break}
      case'ui':tone(t,700,.05,{v:.04,type:'triangle'});break;
      case'buy':tone(t,880,.08,{v:.05,type:'triangle'});tone(t+.07,1320,.18,{v:.05,type:'triangle',wet:.3});noise(t,.2,{ft:'highpass',f:5000,v:.02});break;
      case'ok':[523,659,784,1047].forEach((f,i)=>tone(t+i*.09,f,.22,{type:'triangle',v:.07,wet:.3}));break;
      case'quest':[523,659,784].forEach(f=>tone(t,f,.5,{type:'triangle',v:.05,wet:.4}));[659,784,1047].forEach(f=>tone(t+.32,f,.9,{type:'triangle',v:.05,wet:.5}));tone(t+.32,1568,.9,{v:.03,wet:.6});break;
      case'bad':tone(t,190,.3,{type:'sawtooth',v:.04,slide:.6,lp:1200});break;
      case'talk':tone(t,p||440,.05,{type:'triangle',v:.035,slide:1.1});break;
      case'warp':tone(t,140,1,{v:.07,slide:7,slideT:.9,wet:.5});noise(t,1.1,{f:300,fTo:5000,v:.04,a:.6});break;
      case'item':tone(t,560,.3,{type:'triangle',v:.07,slide:1.8,wet:.3});break;
      case'bounce':tone(t,180,.35,{v:.09,slide:3.5,slideT:.25,vib:18});break;
      case'crack':for(let i=0;i<3;i++)noise(t+i*.05,.06,{ft:'bandpass',f:1800+i*500,q:3,v:.06});break;
      case'splash':noise(t,.6,{f:1800,fTo:300,v:.12});tone(t,300,.2,{v:.04,slide:.5});break;
      case'throw':noise(t,.16,{ft:'bandpass',f:1200,fTo:2600,q:1.5,v:.05});break;
      case'hit':noise(t,.12,{f:2200,v:.08});tone(t,420,.1,{type:'square',v:.03,lp:1500});break;
      case'ring':tone(t,1318,.6,{v:.05,wet:.5});tone(t+.05,1760,.7,{v:.04,wet:.5});break;
      case'thud':noise(t,.35,{f:350,v:.18});tone(t,70,.3,{v:.12,slide:.5});break;
      case'beam':tone(t,300,1.3,{v:.06,slide:5,slideT:1.2,wet:.6});for(let i=0;i<6;i++)tone(t+i*.15,1200+i*200,.15,{v:.02,wet:.6});break;
      case'repair':for(let i=0;i<5;i++)tone(t+i*.06,800+Math.random()*900,.05,{type:'square',v:.02,lp:3000});break;
      case'zap':tone(t,90,.35,{type:'sawtooth',v:.08,lp:2400});noise(t,.3,{ft:'highpass',f:3000,v:.06});break;
      case'reel':for(let i=0;i<4;i++)tone(t+i*.04,1500,.02,{type:'square',v:.015});break;
      case'lamp':tone(t,660,.8,{v:.05,wet:.6});tone(t+.1,990,.9,{v:.04,wet:.6});tone(t+.2,1320,1,{v:.03,wet:.6});break;
      case'pickup':tone(t,420,.12,{type:'triangle',v:.06,slide:1.4});break;
      case'drop':tone(t,300,.12,{type:'triangle',v:.05,slide:.6});break;
      case'elev':tone(t,110,1.2,{type:'sawtooth',v:.02,lp:300,a:.2});break;
      case'chick':tone(t,1400+Math.random()*400,.08,{v:.03,slide:1.3});break;
      case'boost':noise(t,.4,{f:600,fTo:3000,v:.05,a:.05});break;
    }
  }
  /* ---------- ENGINE ---------- */
  function engine(on,thr,boost){if(!ctx)return;
    if(on&&!eng){const o=ctx.createOscillator(),o2=ctx.createOscillator(),f=ctx.createBiquadFilter(),g=ctx.createGain();o.type='sawtooth';o2.type='sawtooth';o.frequency.value=48;o2.frequency.value=48.6;f.type='lowpass';f.frequency.value=220;g.gain.value=0;o.connect(f);o2.connect(f);f.connect(g);g.connect(sfxG);o.start();o2.start();
      const n=ctx.createBufferSource();n.buffer=noiseBuf;n.loop=true;const nf=ctx.createBiquadFilter();nf.type='bandpass';nf.frequency.value=800;const ng=ctx.createGain();ng.gain.value=0;n.connect(nf);nf.connect(ng);ng.connect(sfxG);n.start();eng={o,o2,f,g,n,nf,ng}}
    if(!on&&eng){const e=eng;eng=null;e.g.gain.setTargetAtTime(0,ctx.currentTime,.1);e.ng.gain.setTargetAtTime(0,ctx.currentTime,.1);setTimeout(()=>{try{e.o.stop();e.o2.stop();e.n.stop()}catch(x){}},500);return}
    if(eng){const t=ctx.currentTime;eng.o.frequency.setTargetAtTime(44+thr*40+(boost?30:0),t,.15);eng.o2.frequency.setTargetAtTime(44.7+thr*41+(boost?31:0),t,.15);eng.f.frequency.setTargetAtTime(180+thr*500+(boost?600:0),t,.15);eng.g.gain.setTargetAtTime(.035+thr*.05,t,.15);eng.ng.gain.setTargetAtTime(boost?.05:thr*.012,t,.1);eng.nf.frequency.setTargetAtTime(boost?1600:700,t,.2)}
  }
  return{init,vol,music,sfx,engine,ambient,get ready(){return!!ctx}};
})();
