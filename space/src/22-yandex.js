/* ---------- v10: Yandex Games platform glue (SDK is optional: everything is a no-op off-platform) ---------- */
const YA={sdk:null,ready:false,wantReady:false,gp:null,want:null,adOn:false,lastAd:Date.now(),pause:new Set()};
function yaInit(){if(typeof YaGames==='undefined')return;
  YaGames.init().then(s=>{YA.sdk=s;if(YA.wantReady)yaReady();if(YA.want!=null)yaGameplay(YA.want,true);
    try{s.on('game_api_pause',()=>{yaPause('platform',true);if(mode==='play'||mode==='space')openMenu()});s.on('game_api_resume',()=>yaPause('platform',false))}catch(e){}}).catch(()=>{})}
/* the player can start playing (title screen is up and all meshes are built) */
function yaReady(){YA.wantReady=true;if(!YA.sdk||YA.ready)return;YA.ready=true;try{YA.sdk.features.LoadingAPI&&YA.sdk.features.LoadingAPI.ready()}catch(e){}}
/* gameplay markup: start while the player is actually playing, stop in menus, title, endings and ads */
function yaGameplay(on,force){YA.want=on;if(YA.adOn)on=false;if(YA.gp===on&&!force)return;YA.gp=on;if(!YA.sdk)return;try{const g=YA.sdk.features.GameplayAPI;if(g)on?g.start():g.stop()}catch(e){}}
function yaModeChanged(m){yaGameplay(['play','space','dialog','cut','fade','swing','scope'].includes(m))}
/* sound stops whenever the tab is hidden, the platform pauses us or an ad is on screen */
function yaPause(reason,on){if(on)YA.pause.add(reason);else YA.pause.delete(reason);AU.pause(YA.pause.size>0)}
document.addEventListener('visibilitychange',()=>{yaPause('hidden',document.hidden);if(document.hidden)yaGameplay(false);else yaModeChanged(mode)});
/* fullscreen ad only at a natural pause (take-off), never more often than every 3 minutes, never in the first minutes */
function yaAd(after){if(!YA.sdk||YA.adOn||Date.now()-YA.lastAd<180000){after();return}
  YA.adOn=true;yaGameplay(false);yaPause('ad',true);let done=false;const fin=()=>{if(done)return;done=true;YA.adOn=false;yaPause('ad',false);yaModeChanged(mode);after()};
  try{YA.sdk.adv.showFullscreenAdv({callbacks:{onClose:w=>{if(w)YA.lastAd=Date.now();fin()},onError:()=>fin()}})}catch(e){fin()}}
/* rewarded video: optional bonus on the daily board */
function yaRewarded(onReward){if(!YA.sdk||YA.adOn){toast('Видео сейчас недоступно');return}YA.adOn=true;yaGameplay(false);yaPause('ad',true);let got=false;
  const fin=()=>{YA.adOn=false;yaPause('ad',false);yaModeChanged(mode);if(got)onReward()};
  try{YA.sdk.adv.showRewardedVideo({callbacks:{onRewarded:()=>{got=true},onClose:()=>fin(),onError:()=>{toast('Видео сейчас недоступно');fin()}}})}catch(e){fin()}}
document.addEventListener('contextmenu',e=>e.preventDefault());
yaInit();
