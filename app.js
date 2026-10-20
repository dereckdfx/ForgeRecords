document.querySelectorAll('.badge-slot').forEach((e,i)=>e.innerHTML=badgeSVG(i));
const w=document.getElementById('world'),mob=innerWidth<600,cards=[],GAP=6;
const N=mob?(innerHeight<740?8:10):14;
// random order on every visit (like a shuffled artist feed); artist cards are always included
let SEED=location.search.includes('check')?7:(Date.now()%1e9);const R=()=>{SEED|=0;SEED=SEED+0x6D2B79F5|0;let t=Math.imul(SEED^SEED>>>15,1|SEED);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=R()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const GC=typeof GUEST_CARDS!=='undefined'?GUEST_CARDS:[],NC=Math.min(N,CARDS.length+GC.length),NG=NC-CARDS.length;
// every artist at most once: the 4 core artists always, plus a subset of featured collaborators (rotated while off-screen)
const list=shuf([...CARDS,...shuf(GC).slice(0,NG)]);
// deterministic pseudo-random per card
const rnd=(i,k)=>{const x=Math.sin((i+1)*12.9898+k*78.233)*43758.5453;return x-Math.floor(x)};
list.forEach((a,i)=>{const c=document.createElement('a');c.className='card';c.href=`artist.html?a=${a.s}&frontpage=true`;c.setAttribute('aria-label',a.n);
c.innerHTML=`<div class="art" style="background-image:url(${a.img})${a.fit?';background-size:contain;background-repeat:no-repeat;background-color:#000':''}"></div><b>${a.n}</b>`;// fit: show the whole photo, uncropped
w.appendChild(c);const s=(mob?72:112)*(a.g?.94:1+(i%3)*.16),ar=a.fit?4/3:[1.15,.85,1.3][i%3];
c.style.width=s+'px';c.style.height=s*ar+'px';
cards.push({c,i,s,h:s*ar,f1:.05+rnd(i,1)*.06,f2:.04+rnd(i,2)*.05,p1:rnd(i,3)*6.28,p2:rnd(i,4)*6.28,zf:1/(9+rnd(i,5)*9),zp:rnd(i,6)*6.28,
ry:18+rnd(i,7)*26,ryf:1/(7+rnd(i,8)*8),rx:4+rnd(i,9)*6,rz:3+rnd(i,10)*4,sp:(mob?26:38)*(.75+rnd(i,11)*.5)})});
cards.forEach((k,j)=>{k.a=list[j];k.sw=0});
// rotate featured collaborators: a guest card that is fully off-screen swaps to a collaborator not currently shown (never a duplicate)
let ROT=false;function rotate(k,t){if(!k.a.g||t-k.sw<4000)return;const shown=new Set(cards.map(m=>m.a.s)),pool=GC.filter(g=>!shown.has(g.s));if(!pool.length)return;
const g=pool[R()*pool.length|0];k.a=g;k.sw=t;k.c.href=`artist.html?a=${g.s}&frontpage=true`;k.c.setAttribute('aria-label',g.n);
const art=k.c.querySelector('.art');art.style.backgroundImage=`url(${g.img})`;art.style.backgroundSize=g.fit?'contain':'';art.style.backgroundRepeat=g.fit?'no-repeat':'';art.style.backgroundColor=g.fit?'#000':'';k.c.querySelector('b').textContent=g.n}
const f=document.getElementById('forge'),hero=document.getElementById('hero');
const TOFF=+(new URLSearchParams(location.search).get('t')||0);let OBS=null;addEventListener('resize',()=>{OBS=null;init=false});
function obs(){const hr=hero.getBoundingClientRect(),rel=q=>{const r=q.getBoundingClientRect();return{l:r.left-hr.left,r:r.right-hr.left,t:r.top-hr.top,b:r.bottom-hr.top}};
const ft=f.style.transform;f.style.transform='translate(-50%,-50%)';const B=rel(f);f.style.transform=ft;
const bw=B.r-B.l,bh=B.b-B.t;B.l+=bw*.01-GAP;B.r-=bw*.01-GAP;B.t+=bh*.02-GAP;B.b-=bh*.02-GAP;
const C=[...hero.querySelectorAll('.corner')].map(c=>{const rs=[...c.children].map(rel);return{l:Math.min(...rs.map(r=>r.l))-GAP,r:Math.max(...rs.map(r=>r.r))+GAP,t:Math.min(...rs.map(r=>r.t))-GAP,b:Math.max(...rs.map(r=>r.b))+GAP}});
const top=document.querySelector('header').getBoundingClientRect().bottom-hr.top+GAP;
const H=hero.clientHeight,ct=Math.min(...C.map(c=>c.t)),cb=Math.max(...C.map(c=>c.b));
// horizontal "lanes" free of obstacles: above the badge, between badge and the corner icons, below the corners
const bands=[[top,B.t],[B.b,ct],[cb,H]].map(([t0,b0])=>[t0+28,b0-28]).filter(([t0,b0])=>b0>t0);
const W0=hero.clientWidth;return OBS={all:[B,...C,{l:1e5,r:1e5+1,t:-1e5,b:1e5}],B0:{...B},top,W:W0,W0,H,bands}}
// desktop menu panel: the right-side panel becomes an obstacle whose left edge slides in with it, so cards are swept left and never sit under it
const DESK=()=>innerWidth>=900;let PL=null;function panel(O,dt){const open=DESK()&&document.body.classList.contains('menu-open'),m=document.getElementById('menu'),tg=open?O.W0-m.offsetWidth:O.W0+40;if(PL==null||!DESK())PL=tg;else PL+=(tg-PL)*Math.min(1,dt*7);if(Math.abs(tg-PL)<.5)PL=tg;
const P=O.all[3];if(PL<O.W0){P.l=PL-GAP;P.r=O.W0+4000}else{P.l=1e5;P.r=1e5+1}O.W=Math.min(O.W0,PL-GAP);O.pan=PL<O.W0-1;
// the FORGE badge recentres in the space left of the panel (moves with it, so it stays an exact obstacle)
BX=Math.min(0,(PL-O.W0)/2);const B0=O.B0,Bn=O.all[0];Bn.l=B0.l+BX;Bn.r=B0.r+BX;CS=Math.min(1,Math.pow(O.W/O.W0/.85,1.6))}let BX=0;
function laneY(O,f){const tot=O.bands.reduce((s,b)=>s+b[1]-b[0],0);let d=Math.min(.999,Math.max(0,f))*tot;for(const b of O.bands){const L=b[1]-b[0];if(d<=L)return b[0]+d;d-=L}return O.bands.at(-1)[1]}
const FX=1.32,FY=1.28,SEP=26,PAD=2,LR=mob?170:260,LRF=mob?22:30;// bbox allowance for 3D tilt
const half=(k,sc)=>[k.s*sc*FX/2,k.h*sc*FY/2];
let CS=1;// global card scale: <1 only while the desktop menu panel narrows the free hero
function sdepth(k,t){return (.82+.3*(.5+.5*Math.sin(t/1000*k.zf*6.283+k.zp)))*CS}// 0.82..1.12 "depth" scale
// push a card centre out of an expanded rect along the shallowest axis
function resolve(k,O,sc){const [hw,hh]=half(k,sc);for(let it=0;it<6;it++){let moved=false;for(const o of O.all){
const ox=Math.min(k.x+hw,o.r)-Math.max(k.x-hw,o.l),oy=Math.min(k.y+hh,o.b)-Math.max(k.y-hh,o.t);
if(ox>0&&oy>0){const cx=(o.l+o.r)/2,cy=(o.t+o.b)/2;if(ox<oy){k.x+=(k.x>cx?1:-1)*(ox+.01);k.vx*=.3}else{k.y+=(k.y>cy?1:-1)*(oy+.01);k.vy*=.3}moved=true}}
const yt=O.top+hh;if(k.y<yt){k.y=yt;k.vy=Math.abs(k.vy)*.3;moved=true}const yb=O.H-hh;if(k.y>yb){k.y=yb;k.vy=-Math.abs(k.vy)*.3;moved=true}
const xl=-hw*1.05,xr=O.W+hw*1.05;if(k.x<xl){k.x=xl;k.vx=Math.abs(k.vx)*.3}if(k.x>xr){k.x=xr;k.vx=-Math.abs(k.vx)*.3}
if(!moved)break}}
let init=false,last=null;
// lanes: evenly spaced heights, randomly dealt to the cards; re-dealt whenever the page scrolls
const ghost=(k,O)=>{const h=k.s*(k.sc||1)*FX/2;return k.x<-.85*h||k.x>O.W+.85*h};// cards that have (almost) left the screen don't block others
let LANES=[],curT=0,dealY=scrollY;addEventListener('scroll',()=>{if(Math.abs(scrollY-dealY)>90){dealY=scrollY;deal(curT)}},{passive:true});
const BOOST=1.6;let boostT=-1e9;
function deal(t){const n=cards.length,sl=cards.map((_,j)=>(j+.5)/n);let ord=shuf(cards);
const O=OBS;if(O&&init){// keep most cards on their side of the badge so they reshuffle on screen; one random pair swaps sides
const Ym=(O.all[0].t+O.all[0].b)/2,cut=(O.bands[0][1]-O.bands[0][0])/O.bands.reduce((s,b)=>s+b[1]-b[0],0);let up=shuf(cards.filter(k=>k.y<Ym)),dn=shuf(cards.filter(k=>k.y>=Ym));
if(up.length&&dn.length&&R()<.5){const a1=up.pop(),b1=dn.pop();up.push(b1);dn.push(a1)}
let nu=sl.filter(v=>v<cut).length;while(up.length>nu&&nu<n)nu++;while(up.length<nu&&nu>0)nu--;ord=[...up,...dn]}
ord.forEach((k,j)=>{LANES[k.i]=sl[j];k.ly=sl[j];if(k.sd!=null&&R()<.5)k.sd=-k.sd});boostT=t;ROT=true}
deal(-1e9);
function setup(O){cards.forEach(k=>k.px=0);cards.forEach(k=>{for(let tries=0;tries<200;tries++){k.x=rnd(k.i,20+tries)*O.W;k.y=O.top+rnd(k.i,40+tries)*(O.H-O.top);const [hw,hh]=half(k,1.15);
if(!O.all.some(o=>k.x+hw>o.l&&k.x-hw<o.r&&k.y+hh>o.t&&k.y-hh<o.b)&&k.y-hh>O.top&&k.x-hw>0&&k.x+hw<O.W&&k.y+hh<O.H&&!cards.some(m=>m!==k&&m.px&&Math.abs(m.x-k.x)<hw+half(m,1.15)[0]+8&&Math.abs(m.y-k.y)<hh+half(m,1.15)[1]+8))break}k.px=1;k.vx=0;k.vy=0;resolve(k,O,sdepth(k,0))});init=true}
function step(t,dt){curT=t;const O=OBS||obs();panel(O,dt);if(!init)setup(O);const ts=t/1000;rotStep(t);
cards.forEach(k=>{// wander: each card seeks its own slowly moving target spread over the whole hero
// Atlantic-style sweep: glide across the hero to beyond the far edge, then turn back on a new lane
const [hwS]=half(k,sdepth(k,t));if(k.sd==null){k.sd=R()<.5?1:-1;k.ly=LANES[k.i]}
if((k.sd>0&&k.x>O.W-hwS-14)||(k.sd<0&&k.x<hwS+14)){k.sd=-k.sd;k.vx*=.35;k.ly=Math.min(.97,Math.max(.03,LANES[k.i]+(R()-.5)*.1))}
if(k.lane==null){k.stall=(k.vx*k.sd<6)?(k.stall||0)+dt:0;if(k.stall>1.2+rnd(k.i,30)){k.sd=-k.sd;k.stall=0}}// blocked head-on: turn around
const tx=k.sd>0?O.W+hwS*.3:-hwS*.3,ty=laneY(O,k.ly)+10*Math.sin(ts*k.f2+k.p2);
const Ym=(O.all[0].t+O.all[0].b)/2,rc=k.y<Ym?0:1;k.rt=ty<Ym-40?0:ty>Ym+40?1:(k.rt??rc);
let gx=tx,gy=ty;if(k.rt!==rc){const [hw0,hh0]=half(k,1.15);if(k.lane==null)k.lane=(O.pan||k.x<O.W/2)?0:1;
const Cn=O.all[1+k.lane],off=k.lane?O.W+hw0*.97:-hw0*.97,edge=k.lane?O.W-hw0-4:hw0+4,dir=k.rt?1:-1,yl=k.y+dir*(hh0+50);
const need=Math.max(k.y,yl)+hh0>Cn.t&&Math.min(k.y,yl)-hh0<Cn.b,lx=need?off:edge;
gy=k.rt?Math.max(ty,Ym+80):Math.min(ty,Ym-80);if(need&&Math.abs(k.x-off)>12)gy=k.y;gx=lx}else k.lane=null;
let dx0=gx-k.x,dy0=gy-k.y;const L0=Math.hypot(dx0,dy0)||1,bo=1+BOOST*Math.max(0,1-(t-boostT)/3500),sp=k.sp*bo*Math.min(1,L0/60);
let ax=(dx0/L0*sp-k.vx)*.9,ay=(dy0/L0*sp-k.vy)*.9;
k.sq=Math.min(1,(k.sq??1)+.002);const sc=sdepth(k,t)*k.sq,[hw,hh]=half(k,sc);
// steer away from obstacles before reaching them
for(const o of O.all){const dx=Math.max(o.l-(k.x+hw),0,(k.x-hw)-o.r),dy=Math.max(o.t-(k.y+hh),0,(k.y-hh)-o.b),d=Math.hypot(dx,dy);
if(d<45){const cx=(o.l+o.r)/2,cy=(o.t+o.b)/2;let nx=k.x-cx,ny=k.y-cy;const L=Math.hypot(nx,ny)||1;const s=(45-d)/45*70;nx/=L;ny/=L;ax+=nx*s;ay+=ny*s;let tx2=-ny,ty2=nx;if(tx2*dx0+ty2*dy0<0){tx2=-tx2;ty2=-ty2}const st=(45-d)/45*k.sp*3;ax+=tx2*st;ay+=ty2*st}}
// card-card separation: soft repulsion that starts SEP px before boxes touch
const gk=ghost(k,O);for(const m of cards){if(m===k||m.x==null||gk||ghost(m,O))continue;const [mw,mh]=half(m,m.sc??sdepth(m,t));const gx2=Math.abs(k.x-m.x)-hw-mw,gy2=Math.abs(k.y-m.y)-hh-mh,d=Math.max(gx2,gy2);
const cd=Math.hypot(k.x-m.x,k.y-m.y);if(cd<LR){ax+=(k.x-m.x)/(cd||1)*(1-cd/LR)*LRF;ay+=(k.y-m.y)/(cd||1)*(1-cd/LR)*LRF}
if(d<SEP*2.5&&(m.x-k.x)*k.sd>0){const sd2=(SEP*2.5-Math.max(d,0))/(SEP*2.5)*k.sp*2.2*(m.sd===k.sd?.5:1);ay+=k.sd*sd2*(Math.abs(k.y-m.y)<4?1:Math.sign(k.y-m.y)*k.sd)}
if(d<SEP){let nx=k.x-m.x,ny=k.y-m.y;const L=Math.hypot(nx,ny)||1;nx/=L;ny/=L;const s=d<0?140:(SEP-d)/SEP*90;ax+=nx*s;ay+=ny*s}}
// keep wandering cards on screen (only lane transits may slip past the edges)
if(k.lane==null){if(k.x<hw+2)ax+=(hw+2-k.x)*5;if(k.x>O.W-hw-2)ax-=(k.x-(O.W-hw-2))*5}
// soft bounds
k.vx+=ax*dt;k.vy+=ay*dt;const v=Math.hypot(k.vx,k.vy),vm=k.sp*1.6*bo;if(v>vm){k.vx*=vm/v;k.vy*=vm/v}
k.x+=k.vx*dt;k.y+=k.vy*dt;resolve(k,O,sc);
// if squeezed between elements, shrink just enough to keep the gap (continuous, never hidden)
const hw1=k.s*FX/2,hh1=k.h*FY/2;let kf=sc;for(const o of O.all){const kx=(Math.abs(k.x-(o.l+o.r)/2)-(o.r-o.l)/2)/hw1,ky=(Math.abs(k.y-(o.t+o.b)/2)-(o.b-o.t)/2)/hh1;kf=Math.min(kf,Math.max(kx,ky))}
kf=Math.min(kf,(k.y-O.top)/hh1);k.sc=Math.max(.05,Math.min(sc,(k.sc??sc)+.02,kf))});
// hard pass: separate any overlapping pair, then re-apply obstacle constraints (obstacles always win)
for(let it=0;it<5;it++){let any=false;for(let a1=0;a1<cards.length;a1++)for(let b1=a1+1;b1<cards.length;b1++){const p=cards[a1],q=cards[b1];if(ghost(p,O)||ghost(q,O))continue;const [pw,ph]=half(p,p.sc),[qw,qh]=half(q,q.sc);
const ox=pw+qw+PAD-Math.abs(p.x-q.x),oy=ph+qh+PAD-Math.abs(p.y-q.y);if(ox>0&&oy>0){any=true;const sv=[p.x,p.y,q.x,q.y],tryAx=ax2=>{p.x=sv[0];p.y=sv[1];q.x=sv[2];q.y=sv[3];if(ax2){const s=(p.x<q.x?-1:1)*ox/2;p.x+=s;q.x-=s}else{const s=(p.y<q.y?-1:1)*oy/2;p.y+=s;q.y-=s}resolve(p,O,p.sc);resolve(q,O,q.sc);return Math.max(0,Math.min(pw+qw-Math.abs(p.x-q.x),ph+qh-Math.abs(p.y-q.y)))};
if(tryAx(ox<oy)>0&&tryAx(!(ox<oy))>0&&it===4){const v=p.sc<q.sc?p:q;v.sq=Math.max(.45,v.sq-.03);v.sc=Math.max(.3,v.sc-.012)}}}if(!any)break}}
function rotStep(t){if(!OBS||NG>=GC.length)return;for(const k of cards)if(ghost(k,OBS)&&(ROT||t-k.sw>15000))rotate(k,t);ROT=false}
function render(t){f.style.transform=`translate(calc(-50% + ${BX}px),-50%) perspective(700px) rotateY(${Math.sin(t/3400)*9}deg) rotateX(${4+Math.cos(t/4300)*3}deg) rotateZ(-1deg)`;
cards.forEach(k=>{const ts=t/1000,d=(k.sc/CS-.82)/.3;
k.c.style.transform=`translate(${k.x-k.s/2}px,${k.y-k.h/2}px) scale(${k.sc}) perspective(600px) rotateY(${Math.sin(ts*k.ryf*6.283+k.p2)*k.ry}deg) rotateX(${Math.sin(ts*.13+k.p1)*k.rx}deg) rotateZ(${Math.sin(ts*.09+k.zp)*k.rz}deg)`;
k.c.style.zIndex=1+Math.round(d*7);k.c.style.filter=`brightness(${.55+.5*d})`;k.c.style.opacity=.8+.2*d})}
const NOLOOP=location.search.includes('check');
const SIM=+(new URLSearchParams(location.search).get('sim')||0);let simDone=false;
function loop(now){if(!simDone){simDone=true;for(let i=0;i<SIM/16;i++)step(i*16,.016);if(SIM){last=null}}if(last==null)last=now;const dt=Math.min(.05,(now-last)/1000);last=now;if(!document.body.classList.contains('timeView')){step(now+TOFF+SIM,dt);render(now+TOFF+SIM)}requestAnimationFrame(loop)}
if(NOLOOP)setTimeout(()=>{const O=obs();panel(O,1);const hr=hero.getBoundingClientRect();let hits=0,hdr=0,log=[];const R=O.all.map(o=>({l:o.l+GAP,r:o.r-GAP,t:o.t+GAP,b:o.b-GAP}));
let DUP=0;const SEEN=new Set();let mn=9,xs=cards.map(()=>[1e9,-1e9]),ys=cards.map(()=>[1e9,-1e9]),jump=0,mxo=0,trj=[],offn=0,offl=0,offs=0,wl='',ov5=0,run=0,mrun=0,vis=0,clump=0;const grid=Array(12).fill(0);const prev=cards.map(k=>k.sc);
for(let i=-60;i<0;i++)step(i*16+960,.016);// 1 s warm-up (spawn settles while the intro covers the hero)
for(let i=0;i<8000;i++){const t=i*16+960;if(i%625==300)deal(t);step(t,.016);cards.forEach((k,j)=>{if(k.x>0&&k.x<O.W)mn=Math.min(mn,k.sc);ys[j][0]=Math.min(ys[j][0],k.y);xs[j][0]=Math.min(xs[j][0],k.x);xs[j][1]=Math.max(xs[j][1],k.x);ys[j][1]=Math.max(ys[j][1],k.y);jump=Math.max(jump,Math.abs(k.sc-prev[j]));prev[j]=k.sc});if(i%4)continue;render(t);const rs=[];for(const k of cards){const r=k.c.getBoundingClientRect(),q={l:r.left-hr.left,r:r.right-hr.left,t:r.top-hr.top,b:r.bottom-hr.top};
R.forEach((o,j)=>{const ox=Math.min(q.r,o.r+GAP)-Math.max(q.l,o.l-GAP),oy=Math.min(q.b,o.b+GAP)-Math.max(q.t,o.t-GAP);if(ox>0&&oy>0){hits++;if(log.length<4)log.push(k.i+'@'+i+':'+j+':'+ox.toFixed(1)+'x'+oy.toFixed(1))}});
rs.push(q);if(q.t<O.top-GAP){hdr++;if(log.length<4)log.push(k.i+'hdr'+(O.top-GAP-q.t).toFixed(1))}}
const ar=r=>Math.max(0,r.r-Math.max(r.l,0))*0+(r.r-r.l)*(r.b-r.t);let fm=0;
for(let x=0;x<rs.length;x++)for(let y=x+1;y<rs.length;y++){const A=rs[x],B=rs[y],w2=Math.min(A.r,B.r,O.W)-Math.max(A.l,B.l,0),h2=Math.min(A.b,B.b)-Math.max(A.t,B.t);if(w2>0&&h2>0){const pc=w2*h2/Math.min(ar(A),ar(B));if(pc>mxo&&pc>fm)wl=`W${cards[x].i}/${cards[y].i}@${i}:M${(half(cards[x],cards[x].sc)[0]+half(cards[y],cards[y].sc)[0]-Math.abs(cards[x].x-cards[y].x))|0},${(half(cards[x],cards[x].sc)[1]+half(cards[y],cards[y].sc)[1]-Math.abs(cards[x].y-cards[y].y))|0} R${A.l|0},${A.t|0},${A.r|0},${A.b|0}/${B.l|0},${B.t|0},${B.r|0},${B.b|0}:${cards[x].x|0},${cards[x].y|0},${cards[x].sc.toFixed(2)}|${cards[y].x|0},${cards[y].y|0},${cards[y].sc.toFixed(2)}`;fm=Math.max(fm,pc);if(pc>.05)ov5++}}
mxo=Math.max(mxo,fm);{const ss=cards.map(k=>k.a.s);if(new Set(ss).size!==ss.length)DUP++;cards.forEach(k=>SEEN.add(k.a.s))}if(fm>.03){run++;mrun=Math.max(mrun,run)}else run=0;
const Cl=O.all[1],Cr=O.all[2];cards.forEach(k=>{if(!(k.x>0&&k.x<O.W)){offn++;if(k.lane!=null)offl++;if(k.sc<.6)offs++}if(k.x>0&&k.x<O.W){vis++;if(k.x>Cl.r&&k.x<Cr.l&&k.y>Math.min(Cl.t,Cr.t))clump++;grid[Math.min(2,Math.floor(k.x/O.W*3))*4+Math.min(3,Math.max(0,Math.floor((k.y-O.top)/(O.H-O.top)*4)))]++}})}
window.TRJ=trj;document.title='HITS '+hits+' DUP '+DUP+' CARDS '+cards.length+' SEEN '+SEEN.size+' HDR '+hdr+' MAXOV '+(mxo*100).toFixed(1)+'% '+wl+' pairs>5% '+ov5+' vis '+(vis/2000).toFixed(1)+' off '+(offn/2000).toFixed(1)+'/lane '+(offl/2000).toFixed(1)+'/small '+(offs/2000).toFixed(1)+' longest>3%run '+(mrun*64)+'ms clump '+(clump/vis*100).toFixed(1)+'% grid '+grid.map(g=>(g/vis*100|0)).join(',')+' minsc '+mn.toFixed(2)+' maxScaleStep '+(+jump||0).toFixed(3)+' yrange '+ys.map(r=>(r[1]-r[0])|0).join(',')+' xrange '+xs.map(r=>(r[1]-r[0])|0).join(',')+' pos '+cards.map(k=>[k.x|0,k.y|0,k.sc.toFixed(2),k.sd,k.lane,(k.vx|0)].join('/')).join(' ')+' '+log.join(' ')},300);
else requestAnimationFrame(loop);
const NOINTRO=document.documentElement.classList.contains('nointro');
if(NOINTRO){document.getElementById('intro').classList.add('out');document.body.classList.add('ready')}
else setTimeout(()=>{document.getElementById('intro').classList.add('out');document.body.classList.add('ready')},1500);
// View by: grid (the floating artists) or time (label timeline), like the reference site
{const tvl=document.getElementById('tvl'),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
tvl.innerHTML=LABEL_TL.map(g=>`<h2 class="yr${isNaN(g.y)?' sm':''}">${g.y}</h2>`+g.items.map(it=>{const tx=`${it.d?`<div class="d">${it.d}</div>`:''}<div class="h">${esc(it.h||it.t)}</div>${it.n?`<div class="n">${esc(it.n)}</div>`:''}${it.q?`<div class="q">${esc(it.q)}</div>`:''}`;return `<div class="ev${it.h?'':' s'}">${it.a?`<a href="artist.html?a=${it.a}&frontpage=true">${tx}</a>`:tx}</div>`}).join('')).join('');
const vb=[...document.querySelectorAll('.view button')],setView=v=>{document.body.classList.toggle('timeView',v==='time');vb.forEach((x,i)=>x.classList.toggle('on',(i===1)===(v==='time')));scrollTo(0,0);OBS=null};
vb[0].onclick=()=>setView('grid');vb[1].onclick=()=>setView('time');
document.querySelector('header .logo').onclick=()=>setView(document.body.classList.contains('timeView')?'grid':'time');
if(location.search.includes('time'))setView('time')}
if(location.search.includes('shot')){document.getElementById('intro').classList.add('out');document.getElementById('intro').style.display='none';document.body.classList.add('ready')}

const menu=document.getElementById('menu'),bg=document.querySelector('.burger');
{const hb=()=>document.documentElement.style.setProperty('--hb',document.querySelector('header').offsetHeight+'px');hb();addEventListener('resize',hb)}
menu.querySelector('.msoc').innerHTML=document.querySelector('nav.social').innerHTML;
bg.onclick=()=>{const o=!document.body.classList.contains('menu-open');document.body.classList.toggle('menu-open',o);menu.setAttribute('aria-hidden',!o);bg.setAttribute('aria-expanded',o)};
addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('menu-open'))bg.click()});
menu.querySelector('form').onsubmit=e=>{e.preventDefault();const i=e.target.querySelector('input');if(i.checkValidity()){forgeMail(i.value);e.target.innerHTML='<p class="ok">¡Casi listo! Envía el correo que se abrió para suscribirte.</p>'}};
if(/[?&]menu\b/.test(location.search)){document.body.classList.add('notrans');bg.click();requestAnimationFrame(()=>requestAnimationFrame(()=>document.body.classList.remove('notrans')))}
// keep the address clean: drop one-shot params (menu, nointro) so going back/reloading lands on the plain index
{const u=new URL(location.href);let ch=false;['menu','nointro'].forEach(k=>{if(u.searchParams.has(k)){u.searchParams.delete(k);ch=true}});if(ch)history.replaceState(null,'',u.pathname+(u.search?u.search:'')+u.hash)}
const closeMenu=()=>{if(document.body.classList.contains('menu-open')){document.body.classList.add('notrans');bg.click();requestAnimationFrame(()=>requestAnimationFrame(()=>document.body.classList.remove('notrans')))}};
// leaving through a menu link closes the menu, so a back navigation (incl. bfcache restore) shows the closed home
menu.addEventListener('click',e=>{const l=e.target.closest('a[href]');if(l&&!l.getAttribute('href').startsWith('#'))setTimeout(closeMenu,400)});
addEventListener('pageshow',e=>{if(e.persisted){closeMenu();const it=document.getElementById('intro');it.classList.add('out');it.style.display='none';document.body.classList.add('ready')}});

document.querySelectorAll('.fsoc').forEach(e=>e.innerHTML=document.querySelector('nav.social').innerHTML);
function wireFoot(root){const fm=root.querySelector('.fform');fm.onsubmit=e=>{e.preventDefault();const i=fm.querySelector('input[type=email]');if(!i.value||!i.checkValidity()){i.focus();i.style.borderColor='#ff6b6b';return}forgeMail(i.value);fm.innerHTML='<p class="fthanks">¡Casi listo! Envía el correo que se abrió para suscribirte.</p>'}}
wireFoot(document.getElementById('foot'));
{const cl=document.getElementById('foot').cloneNode(true);cl.removeAttribute('id');cl.querySelectorAll('.fl')[0].remove();cl.querySelector('.fsoc').remove();cl.querySelector('.fform').remove();cl.querySelectorAll('.fjoin').forEach(x=>x.remove());const fl=cl.querySelectorAll('.fl');if(fl[0])fl[0].remove();menu.querySelector('.mwrap').appendChild(cl)}
if(location.search.includes('foot'))document.getElementById('hero').style.display='none';

{const sp=new URLSearchParams(location.search).get('scroll');if(sp)setTimeout(()=>scrollTo(0,(document.documentElement.scrollHeight-innerHeight)*+sp),400)}
