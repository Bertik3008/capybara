/* ---------- CORE ---------- */
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const clamp=(v,a,b)=>v<a?a:v>b?b:v, lerp=(a,b,t)=>a+(b-a)*t, TAU=Math.PI*2;
const pick=a=>a[Math.floor(Math.random()*a.length)];
const isTouch=(window.matchMedia&&matchMedia('(pointer: coarse)').matches)||('ontouchstart' in window&&navigator.maxTouchPoints>0);
if(isTouch)document.body.classList.add('touch');
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const plural=(n,a,b,c)=>{const m=n%10,h=n%100;return m===1&&h!==11?a:m>=2&&m<=4&&(h<10||h>=20)?b:c};
const coinsWord=n=>n+' '+plural(n,'монета','монеты','монет');

let mode='boot';
/* ---------- SAVE ---------- */
const SAVE_KEY='kapik-space-v3';
function freshSave(){return{v:3,coins:0,tr:false,inv:{},up:{},paint:'silver',paints:{silver:1},hat:'none',hats:{none:1},decor:{},rescued:{},q:{},qd:{},got:{},seen:{},souv:{},prologue:false,ending:false,at:'base',tut:0,route:null,
  set:{music:.5,sfx:.8,sens:1,q:null,invert:false,hints:true,voices:true}}}
let S=freshSave();
function save(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(S))}catch(e){}}
function loadSave(){try{const r=localStorage.getItem(SAVE_KEY);if(!r)return null;const d=JSON.parse(r);const f=freshSave();
  for(const k in d){if(f[k]&&typeof f[k]==='object'&&!Array.isArray(f[k])&&d[k]&&typeof d[k]==='object')f[k]=Object.assign(f[k],d[k]);else f[k]=d[k]}return f}catch(e){return null}}
function wipeSave(){try{localStorage.removeItem(SAVE_KEY)}catch(e){}}
function addCoins(n){S.coins+=n;save();if(n>0&&typeof ev==='function'&&!addCoins.skip)ev('coins',n);if(window.UI)UI.coins(n)}

const PIDS=['p1','p2','p3','p4'];
const PL={
  base:{name:'Пастбище',kind:'Астероид-база',desc:'Дом Капика: лавка Тётушки Выдры, амбар и пруд',col:'#8fdc7a'},
  p1:{name:'Мандарина',kind:'Садовая планета',desc:'Мандариновые сады, амбары и ветряк',bro:'yuzik',col:'#ffab4a'},
  p2:{name:'Ледора',kind:'Ледяная планета',desc:'Северное сияние, иглу и Звонкое озеро',bro:'snezhok',col:'#bfe8ff'},
  p3:{name:'Грибния',kind:'Грибная планета',desc:'Гигантские грибы, лягушачья деревня и светлячки',bro:'gribok',col:'#c79bff'},
  p4:{name:'Шестерёнка',kind:'Планета-завод',desc:'Заводы, краны, конвейеры и роботы',bro:'vintik',col:'#8fd8e0'},
  p8:{name:'Разлом',kind:'Изнанка космоса',desc:'Острова в пустоте, искры братьев и Тень Космического Чиха',col:'#b28cff'},
  p7:{name:'Банания',kind:'Тропическая планета',desc:'Банановые пальмы, водопад, река с плотом и древний храм обезьян',col:'#ffe14a'},
  p6:{name:'Магмара',kind:'Огненная планета',desc:'Лавовые реки, бесёнки-угольки и замок Короля Рогожара',col:'#ff7a4a'},
  p5:{name:'Одуванчия',kind:'Пуховая планета',desc:'Великий Пух, белки-летяги и потоки ветра',col:'#f4f0a0'}
};
