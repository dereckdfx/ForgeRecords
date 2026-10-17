document.querySelectorAll('.badge-slot').forEach((e,i)=>e.innerHTML=badgeSVG(i));
const A=[["NOX DEL SUR",1],["LOS FORJADOS",2],["LUNA CROMA",3],["LAS REINAS DEL PERREO",4],["SOLENNE",5],["MOTELES",4],["ALWAYS",5],["VALKYRA",3],["KAI VERTIGO",1],["REY HIERRO",2],["MIRA SAINT",5],["DJ OBSIDIANA",1],["ATLAS ROSE",3],["ZAFIRO 99",2]];
const w=document.getElementById('world'),mob=innerWidth<600,cards=[];
// [cx,cy (fraction of hero W,H), width (fraction of W on mobile / px on desktop), aspect h/w, rotX, rotY, rotZ, z, artistIndex]
const LM=[[.30,.20,.27,.82,8,18,-7,3,10],[.29,.285,.23,.78,-6,14,4,4,3],[.92,.29,.25,1.4,4,-34,6,2,0],[.05,.40,.2,1.3,-4,38,3,1,7],
[.80,.45,.36,.75,6,-16,3,3,2],[.74,.535,.27,.6,-8,12,-4,5,5],[.93,.56,.2,.85,5,-30,-5,6,8],[.36,.585,.33,.93,-5,10,-8,4,1],
[.52,.69,.26,1.0,7,-8,4,5,6],[.83,.665,.25,1.0,-4,-20,5,2,4],[.10,.63,.18,1.1,4,30,6,2,9],[.58,.16,.16,1.1,-6,-12,5,1,11]];
const LD=[[.13,.22,190,.8,8,24,-6,3,10],[.21,.36,160,1.1,-6,16,4,4,3],[.92,.24,180,1.3,4,-30,6,2,0],[.05,.58,170,1.25,-4,34,3,2,7],
[.74,.40,230,.75,6,-14,3,3,2],[.83,.54,170,.75,-8,-20,-4,5,5],[.96,.70,160,.9,5,-30,-5,4,8],[.27,.62,200,.95,-5,14,-8,4,1],
[.50,.80,170,.7,7,-6,4,5,6],[.70,.74,180,1.0,-4,-18,5,2,4],[.36,.17,140,1.0,4,18,6,1,9],[.62,.15,150,1.1,-6,-12,5,1,11]];
const L=mob?LM:LD;
L.forEach((p,i)=>{const a=A[p[8]%A.length],c=document.createElement('div');c.className='card';
c.innerHTML=`<div class="art" style="background-image:url(img/c${a[1]}.jpg)"></div><b>${a[0]}</b>`;w.appendChild(c);
const r=k=>{const x=Math.sin((i+1)*12.9898+k*78.233)*43758.5453;return x-Math.floor(x)};
cards.push({c,p,i,tx:9000+r(1)*9000,ty:11000+r(2)*9000,tr:13000+r(3)*10000,ph:r(4)*6.28,ph2:r(5)*6.28,
turnP:16000+r(6)*14000,turnD:r(7),turnA:(r(8)>.5?1:-1)*(22+r(9)*20),ax:4+r(10)*5,ay:4+r(11)*5})});
const f=document.getElementById('forge'),hero=document.getElementById('hero');
let G=null;
function geo(){const hr=hero.getBoundingClientRect(),rel=q=>{const r=q.getBoundingClientRect();return{l:r.left-hr.left,r:r.right-hr.left,t:r.top-hr.top,b:r.bottom-hr.top}};
const W=hero.clientWidth,H=hero.clientHeight,ft=f.style.transform;f.style.transform='translate(-50%,-50%)';const B=rel(f);f.style.transform=ft;
const fw=B.r-B.l,fh=B.b-B.t;B.l+=fw*.035;B.r-=fw*.035;B.t+=fh*.05;B.b-=fh*.05;
const hb=document.querySelector('header').getBoundingClientRect().bottom,gap=mob?8:14;
cards.forEach(k=>{const p=k.p;let cw=mob?p[2]*W:p[2],ch=cw*p[3],x=p[0]*W,y=p[1]*H;
const mx=k.ax+cw*.1,my=k.ay+ch*.08;// room for drift + 3D tilt growth
// keep under header
y=Math.max(y,hb+gap+ch/2+my);
// push out of badge horizontally (or vertically if closer)
const ox=Math.min(x+cw/2+mx,B.r+gap)-Math.max(x-cw/2-mx,B.l-gap),oy=Math.min(y+ch/2+my,B.b+gap)-Math.max(y-ch/2-my,B.t-gap);
if(ox>0&&oy>0){const bcx=(B.l+B.r)/2,bcy=(B.t+B.b)/2;if(ox<oy*1.6)x+=x>bcx?ox:-ox;else y+=y>bcy?oy:-oy}
if(y-ch/2-my<hb+gap){y=hb+gap+ch/2+my;const ox2=Math.min(x+cw/2+mx,B.r+gap)-Math.max(x-cw/2-mx,B.l-gap),oy2=Math.min(y+ch/2+my,B.b+gap)-Math.max(y-ch/2-my,B.t-gap);if(ox2>0&&oy2>0)x+=x>(B.l+B.r)/2?ox2:-ox2}
k.x=x;k.y=y;k.w=cw;k.h=ch;k.c.style.width=cw+'px';k.c.style.height=ch+'px'});
G={B,hb,W,H}}
addEventListener('resize',()=>G=null);
const sm=x=>x*x*(3-2*x);
function place(t){if(!G)geo();
f.style.transform=`translate(-50%,-50%) perspective(700px) rotateY(${Math.sin(t/3400)*7}deg) rotateX(${3+Math.cos(t/4300)*2}deg) rotateZ(-1deg)`;
cards.forEach(k=>{const p=k.p,dx=Math.sin(t/k.tx*6.283+k.ph)*k.ax,dy=Math.sin(t/k.ty*6.283+k.ph2)*k.ay;
const wob=Math.sin(t/k.tr*6.283+k.ph);
// occasional gentle turn: a smooth swing on Y lasting ~3.5s once per turnP
const q=((t/k.turnP+k.turnD)%1)*k.turnP,dur=3500,turn=q<dur?Math.sin(Math.PI*sm(q/dur))*k.turnA:0;
k.c.style.transform=`translate(${k.x-k.w/2+dx}px,${k.y-k.h/2+dy}px) perspective(700px) rotateX(${p[4]+wob*3}deg) rotateY(${p[5]+wob*4+turn}deg) rotateZ(${p[6]+Math.sin(t/k.ty*6.283+k.ph)*1.5}deg)`;
k.c.style.zIndex=p[7]});}
const TOFF=+(new URLSearchParams(location.search).get('t')||0);function loop(t){place(t+TOFF);requestAnimationFrame(loop)}
if(location.search.includes('check')){setTimeout(()=>{geo();let hits=0,hh=0,log=[];
for(let i=0;i<600;i++){const t=i*200;place(t);const hr=hero.getBoundingClientRect();
for(const k of cards){const r=k.c.getBoundingClientRect(),q={l:r.left-hr.left,r:r.right-hr.left,t:r.top-hr.top,b:r.bottom-hr.top},o=G.B;
const ox=Math.min(q.r,o.r)-Math.max(q.l,o.l),oy=Math.min(q.b,o.b)-Math.max(q.t,o.t);if(ox>0&&oy>0){hits++;if(log.length<5)log.push(k.i+'@'+t+':'+(ox|0)+'x'+(oy|0))}
if(q.t<G.hb){hh++;if(log.length<5)log.push(k.i+'hdr'+(G.hb-q.t|0))}}}
document.title='BADGE '+hits+' HDR '+hh+' '+log.join(' ')},300)}
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
