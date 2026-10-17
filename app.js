document.querySelectorAll('.badge-slot').forEach((e,i)=>e.innerHTML=badgeSVG(i));
const A=[["NOX DEL SUR",1],["LOS FORJADOS",2],["LUNA CROMA",3],["LAS REINAS DEL PERREO",4],["SOLENNE",5],["MOTELES",4],["ALWAYS",5],["VALKYRA",3],["KAI VERTIGO",1],["REY HIERRO",2],["MIRA SAINT",5],["DJ OBSIDIANA",1],["ATLAS ROSE",3],["ZAFIRO 99",2]];
const w=document.getElementById('world'),mob=innerWidth<600,cards=[];
const N=mob?9:12,list=A.slice(0,N);
list.forEach((a,i)=>{const c=document.createElement('div');c.className='card';
c.innerHTML=`<div class="art" style="background-image:url(img/c${a[1]}.jpg)"></div><b>${a[0]}</b>`;
w.appendChild(c);cards.push({c,i,m:1+(i%3)*.18,ar:[1.15,.85,1.3][i%3],a0:i/N*Math.PI*2})});
const f=document.getElementById('forge'),hero=document.getElementById('hero'),PER=26000,GAP=8;
let G=null;
function geo(){const hr=hero.getBoundingClientRect(),rel=q=>{const r=q.getBoundingClientRect();return{l:r.left-hr.left,r:r.right-hr.left,t:r.top-hr.top,b:r.bottom-hr.top}};
const W=hero.clientWidth,H=hero.clientHeight,ft=f.style.transform;f.style.transform='translate(-50%,-50%)';const B=rel(f);f.style.transform=ft;
const fw=B.r-B.l,fh=B.b-B.t;B.l+=fw*.035;B.r-=fw*.035;B.t+=fh*.05;B.b-=fh*.05;
const ex=fw*.03,ey=fh*.03;B.l-=ex;B.r+=ex;B.t-=ey;B.b+=ey;// allow for the badge's idle tilt
const C=[...hero.querySelectorAll('.corner')].map(c=>{const rs=[...c.children].map(rel);return{l:Math.min(...rs.map(r=>r.l)),r:Math.max(...rs.map(r=>r.r)),t:Math.min(...rs.map(r=>r.t)),b:Math.max(...rs.map(r=>r.b))}});
const hb=document.querySelector('header').getBoundingClientRect().bottom-hr.top;
const O=[B,...C].map(o=>({x:(o.l+o.r)/2,y:(o.t+o.b)/2,w:(o.r-o.l)/2+GAP,h:(o.b-o.t)/2+GAP}));
const cTop=Math.min(...C.map(c=>c.t)),cBot=Math.max(...C.map(c=>c.b));
const top=Math.max(hb,0)+GAP,bot=H-GAP;
const bandA=[B.b+GAP,cTop-GAP],bandB=[cBot+GAP,bot],front=(bandA[1]-bandA[0])>=(bandB[1]-bandB[0])*.8?bandA:bandB,back=[top,B.t-GAP];
const w0=mob?W*.22:Math.min(150,W*.105);
G={W,H,O,top,bot,front,back,w0,yF:(front[0]+front[1])/2,yB:(back[0]+back[1])/2,cx:W/2,cy:(B.t+B.b)/2,Rx:front===bandA?(B.r-B.l)/2+w0*(mob?.75:.85)+GAP:W/2+w0*1.6*1.3+GAP,useA:front===bandA,P:mob?700:1100,Rz:mob?W*.5:W*.36}}
addEventListener('resize',()=>G=null);
const cl=(v,a,b)=>Math.max(a,Math.min(b,v)),ss=v=>v*v*(3-2*v);
function place(t){if(!G)geo();const g=G;
f.style.transform=`translate(-50%,-50%) perspective(700px) rotateY(${Math.sin(t/3400)*9}deg) rotateX(${4+Math.cos(t/4300)*3}deg) rotateZ(-1deg)`;
cards.forEach(k=>{const a=k.a0+t/PER*Math.PI*2,sn=Math.sin(a),cs=Math.cos(a),z=cs*g.Rz,sd=g.P/(g.P-z*.9),d=(cs+1)/2;
let x,y;if(g.useA){x=g.cx+Math.sign(sn)*Math.pow(Math.abs(sn),.5)*g.Rx;const e=Math.pow(Math.abs(cs),.45);y=cs>=0?g.cy+e*(g.yF-g.cy):g.cy-e*(g.cy-g.yB)}else{const u=cl(sn*1.3,-1,1),v=cl(cs*2.4,-1,1);x=g.cx+g.Rx*Math.sin(u*Math.PI/2);y=v>=0?g.cy+ss(v)*(g.yF-g.cy):g.cy+ss(-v)*(g.yB-g.cy)}
const w0=g.w0*k.m,h0=w0*k.ar,fx=1.3,fy=1.2;
let kf=sd;for(const o of g.O){const kx=(Math.abs(x-o.x)-o.w)/(w0*fx/2),ky=(Math.abs(y-o.y)-o.h)/(h0*fy/2);kf=Math.min(kf,Math.max(kx,ky))}
kf=Math.min(kf,(y-g.top)/(h0*fy/2),(g.bot-y)/(h0*fy/2));const sc=Math.max(0,kf);k.sc=sc;k.x=x;
k.c.style.width=w0+'px';k.c.style.height=h0+'px';
k.c.style.transform=`translate(${x-w0/2}px,${y-h0/2}px) scale(${sc}) perspective(600px) rotateY(${sn*40}deg) rotateZ(${Math.sin(a*2+k.a0)*4}deg)`;
k.c.style.zIndex=1+Math.round(d*8);k.c.style.filter=`brightness(${.55+.5*d})`;k.c.style.opacity=.75+.25*d});}
const TOFF=+(new URLSearchParams(location.search).get('t')||0);function loop(t){place(t+TOFF);requestAnimationFrame(loop)}
if(location.search.includes('check')){setTimeout(()=>{geo();let hits=0,log=[],mn=9,ma=0;const hr=hero.getBoundingClientRect();
const R=[...G.O.map(o=>({l:o.x-o.w+GAP,r:o.x+o.w-GAP,t:o.y-o.h+GAP,b:o.y+o.h-GAP}))];
for(let i=0;i<520;i++){const t=i/520*PER;place(t);
for(const k of cards){const r=k.c.getBoundingClientRect(),q={l:r.left-hr.left,r:r.right-hr.left,t:r.top-hr.top,b:r.bottom-hr.top};
const vis=q.r>0&&q.l<G.W;if(vis&&k.sc<mn){mn=k.sc;ma=i}
R.forEach((o,j)=>{const ox=Math.min(q.r,o.r+GAP)-Math.max(q.l,o.l-GAP),oy=Math.min(q.b,o.b+GAP)-Math.max(q.t,o.t-GAP);if(ox>0&&oy>0){hits++;if(log.length<4)log.push(k.i+'@'+i+':o'+j+':'+(ox|0)+'x'+(oy|0))}});
if(q.t<G.top-GAP+GAP&&vis){hits++;if(log.length<4)log.push(k.i+'hdr')}if(q.b>G.H&&vis){hits++;if(log.length<4)log.push(k.i+'bot')}}}
document.title='HITS '+hits+' minVisScale '+mn.toFixed(2)+'@'+ma+' '+log.join(' ')+' band '+(G.front[1]-G.front[0]|0)},300)}
else requestAnimationFrame(loop);
setTimeout(()=>{document.getElementById('intro').classList.add('out');document.body.classList.add('ready')},1500);
document.querySelectorAll('.view button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.view button').forEach(x=>x.classList.remove('on'));b.classList.add('on')});
if(location.search.includes('shot')){document.getElementById('intro').classList.add('out');document.getElementById('intro').style.display='none';document.body.classList.add('ready')}

const menu=document.getElementById('menu'),bg=document.querySelector('.burger');
menu.querySelector('.msoc').innerHTML=document.querySelector('nav.social').innerHTML;
bg.onclick=()=>{const o=!document.body.classList.contains('menu-open');document.body.classList.toggle('menu-open',o);menu.setAttribute('aria-hidden',!o);bg.setAttribute('aria-expanded',o)};
addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('menu-open'))bg.click()});
menu.querySelector('form').onsubmit=e=>{e.preventDefault();const i=e.target.querySelector('input');if(i.checkValidity()){e.target.innerHTML='<p class="ok">¡Gracias! Te avisaremos.</p>'}};
if(location.search.includes('menu')){document.body.classList.add('notrans');bg.click()}

document.querySelectorAll('.fsoc').forEach(e=>e.innerHTML=document.querySelector('nav.social').innerHTML);
function wireFoot(root){const fm=root.querySelector('.fform');fm.onsubmit=e=>{e.preventDefault();const i=fm.querySelector('input[type=email]');if(!i.value||!i.checkValidity()){i.focus();i.style.borderColor='#ff6b6b';return}fm.innerHTML='<p class="fthanks">¡Gracias! Te mantendremos al tanto.</p>'}}
wireFoot(document.getElementById('foot'));
{const cl=document.getElementById('foot').cloneNode(true);cl.removeAttribute('id');cl.querySelectorAll('.fl')[0].remove();cl.querySelector('.fsoc').remove();cl.querySelector('.fform').remove();cl.querySelectorAll('.fjoin').forEach(x=>x.remove());const fl=cl.querySelectorAll('.fl');if(fl[0])fl[0].remove();menu.querySelector('.mwrap').appendChild(cl)}
if(location.search.includes('foot'))document.getElementById('hero').style.display='none';

{const sp=new URLSearchParams(location.search).get('scroll');if(sp)setTimeout(()=>scrollTo(0,(document.documentElement.scrollHeight-innerHeight)*+sp),400)}
