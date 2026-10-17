document.querySelectorAll('.badge-slot').forEach((e,i)=>e.innerHTML=badgeSVG(i));
const A=[["NOX DEL SUR",1],["LOS FORJADOS",2],["LUNA CROMA",3],["LAS REINAS DEL PERREO",4],["SOLENNE",5],["MOTELES",4],["ALWAYS",5],["VALKYRA",3],["KAI VERTIGO",1],["REY HIERRO",2],["MIRA SAINT",5],["DJ OBSIDIANA",1],["ATLAS ROSE",3],["ZAFIRO 99",2]];
const w=document.getElementById('world'),mob=innerWidth<600,cards=[];
const N=mob?9:12,list=A.slice(0,N);
const YO=mob?[-.24,.02,-.08,.26,-.2,.12,-.02,.22,-.14]:[-.26,.05,-.12,.24,-.22,.14,-.02,.28,-.16,.08,-.3,.2];
list.forEach((a,i)=>{const c=document.createElement('div');c.className='card';
c.innerHTML=`<div class="art" style="background-image:url(img/c${a[1]}.jpg)"></div><b>${a[0]}</b>`;
w.appendChild(c);const s=(mob?78:120)*(1+(i%3)*.18),ar=[1.15,.85,1.3][i%3];
c.style.width=s+'px';c.style.height=s*ar+'px';cards.push({c,s,h:s*ar,a0:i/N*Math.PI*2,yo:YO[i%YO.length]})});
const f=document.getElementById('forge'),PER=26000;
let OB=null,OBt=0;function obst(){const now=performance.now();if(OB&&now-OBt<500)return OB;OBt=now;const pad=10,rc=e=>{const q=e.getBoundingClientRect();return{l:q.left-pad,r:q.right+pad,t:q.top-pad,b:q.bottom+pad}};
const fr=f.getBoundingClientRect(),bw=fr.width,bh=fr.height;// use unrotated footprint, svg has padding inside
const B={l:fr.left+bw*.02-pad,r:fr.right-bw*.02+pad,t:fr.top+bh*.03-pad,b:fr.bottom-bh*.03+pad};
const hd=document.querySelector('header').getBoundingClientRect().bottom+8;
const so=document.querySelector('#hero .social').getBoundingClientRect();
OB={badge:B,corners:[...document.querySelectorAll('#hero .corner')].map(rc),top:hd,bot:innerHeight-so.top+10};return OB}
function loop(t){const W=innerWidth,H=innerHeight,R=mob?W*.5:W*.36,P=mob?700:1100,cx=W/2,cy=H*(mob?.43:.48);
w.style.transform='none';
f.style.transform=`translate(-50%,-50%) perspective(700px) rotateY(${Math.sin(t/3400)*9}deg) rotateX(${4+Math.cos(t/4300)*3}deg) rotateZ(-1deg)`;
const ob=obst();
cards.forEach(k=>{const a=k.a0+t/PER*Math.PI*2,x=Math.sin(a)*R,z=Math.cos(a)*R,sc=P/(P-z*.9),d=(z/R+1)/2;
const y=k.yo*H*(mob?.85:.8)-z*.1;const cw=k.s*sc,ch=k.h*sc,ccx=cx+x*sc;let ccy=cy+y*sc;
const top=ob.top+ch/2,bot=H-ob.bot-ch/2;ccy=Math.max(top,Math.min(bot,ccy));
// badge: glide above/below when horizontally near
const b=ob.badge,gx=Math.max(b.l-(ccx+cw/2),(ccx-cw/2)-b.r);let fb=Math.max(0,Math.min(1,1-gx/90));fb=fb*fb*(3-2*fb);
if(fb>0){const up=(k.side??=(ccy<(b.t+b.b)/2?-1:1));const safe=up<0?Math.min(ccy,b.t-ch/2):Math.max(ccy,b.b+ch/2);ccy+= (safe-ccy)*fb}else k.side=null;
// corners: glide up above vinyl/swirl when horizontally near
for(const c of ob.corners){const g=Math.max(c.l-(ccx+cw/2),(ccx-cw/2)-c.r);let fc=Math.max(0,Math.min(1,1-g/70));fc=fc*fc*(3-2*fc);if(fc>0){const safe=Math.min(ccy,c.t-ch/2);ccy+=(safe-ccy)*fc}}
const r={l:ccx-cw/2,r:ccx+cw/2,t:ccy-ch/2,b:ccy+ch/2};
const hit=[b,...ob.corners].some(o=>r.l<o.r&&r.r>o.l&&r.t<o.b&&r.b>o.t)||r.t<ob.top||r.b>H-ob.bot;
k.c.style.transform=`translate(${ccx-k.s/2}px,${ccy-k.h/2}px) scale(${sc}) perspective(600px) rotateY(${Math.sin(a)*48}deg) rotateZ(${Math.sin(a*2+k.a0)*4}deg)`;
k.c.style.zIndex=1;k.c.style.filter=`brightness(${.55+.5*d})`;k.c.style.opacity=hit?0:.75+.25*d});
requestAnimationFrame(loop)}
requestAnimationFrame(loop);
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
