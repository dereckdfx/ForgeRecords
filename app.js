document.querySelectorAll('.badge-slot').forEach((e,i)=>e.innerHTML=badgeSVG(i));
const A=[["NOX DEL SUR",1],["LOS FORJADOS",2],["LUNA CROMA",3],["LAS REINAS DEL PERREO",4],["SOLENNE",5],["MOTELES",4],["ALWAYS",5],["VALKYRA",3],["KAI VERTIGO",1],["REY HIERRO",2],["MIRA SAINT",5],["DJ OBSIDIANA",1],["ATLAS ROSE",3],["ZAFIRO 99",2]];
const w=document.getElementById('world'),mob=innerWidth<600,cards=[];
const N=mob?9:12,list=A.slice(0,N);
list.forEach((a,i)=>{const c=document.createElement('div');c.className='card';
c.innerHTML=`<div class="art" style="background-image:url(img/c${a[1]}.jpg)"></div><b>${a[0]}</b>`;
w.appendChild(c);cards.push({c,a0:i/N*Math.PI*2,ar:[1.2,1,1.3][i%3]})});
const f=document.getElementById('forge'),hero=document.getElementById('hero'),PER=mob?24000:28000;
let G=null;
function geo(){const hr=hero.getBoundingClientRect(),rel=q=>{const r=q.getBoundingClientRect();return{l:r.left-hr.left,r:r.right-hr.left,t:r.top-hr.top,b:r.bottom-hr.top}};
const W=hero.clientWidth,H=hero.clientHeight,ft=f.style.transform;f.style.transform='translate(-50%,-50%)';const B=rel(f);f.style.transform=ft;
const fw=B.r-B.l,fh=B.b-B.t;B.l+=fw*.035;B.r-=fw*.035;B.t+=fh*.05;B.b-=fh*.05;
const C=[...hero.querySelectorAll('.corner')].map(c=>{const rs=[...c.children].map(rel);return{l:Math.min(...rs.map(r=>r.l)),r:Math.max(...rs.map(r=>r.r)),t:Math.min(...rs.map(r=>r.t)),b:Math.max(...rs.map(r=>r.b))}});
const hb=document.querySelector('header').getBoundingClientRect().bottom,gap=mob?8:14;
const O=[B,...C].map(o=>({x:(o.l+o.r)/2,y:(o.t+o.b)/2,w:(o.r-o.l)/2+gap,h:(o.b-o.t)/2+gap}));
const cx=(B.l+B.r)/2,cy=(B.t+B.b)/2,bw=(B.r-B.l)/2,bh=(B.b-B.t)/2,cTop=Math.min(...C.map(c=>c.t));
const w0=mob?W*.27:Math.min(170,W*.12);
const yBack=(hb+B.t)/2, yFrontSide=Math.min(B.b+(cTop-B.b)*.5, B.b+w0*.85), yFront=Math.min(H-40-w0*.7,Math.max(yFrontSide,(B.b+Math.min(H,cTop+120))/2+30));
G={W,H,cx,cy,bw,bh,O,hb,w0,P:mob?800:1200,Rz:mob?W*.5:W*.35,Rx:bw+w0*(mob?.62:.7)+gap,yBack,yFrontSide,yFront,B,C}}
addEventListener('resize',()=>G=null);
function place(t){if(!G)geo();const g=G;
f.style.transform=`translate(-50%,-50%) perspective(700px) rotateY(${Math.sin(t/3400)*7}deg) rotateX(${3+Math.cos(t/4300)*2}deg) rotateZ(-1deg)`;
cards.forEach(k=>{const a=k.a0+t/PER*Math.PI*2,sn=Math.sin(a),cs=Math.cos(a),z=cs*g.Rz,sd=g.P/(g.P-z*.9),d=(cs+1)/2;
const e=Math.pow(Math.abs(cs),.45),dip=Math.pow(Math.max(0,cs),10);
const x=g.cx+Math.sign(sn)*Math.pow(Math.abs(sn),.5)*g.Rx,y=cs>=0?g.cy+e*(g.yFrontSide-g.cy):g.cy-e*(g.cy-g.yBack);
const w0=g.w0,h0=w0*k.ar,ex=1.14,ey=1.08;
let kf=9;for(const o of g.O){const kx=(Math.abs(x-o.x)-o.w)/(w0*ex/2),ky=(Math.abs(y-o.y)-o.h)/(h0*ey/2);kf=Math.min(kf,Math.max(kx,ky))}
kf=Math.min(kf,(y-g.hb-6)/(h0*ey/2),(g.H-6-y)/(h0*ey/2));
const sc=Math.max(0,Math.min(sd,kf));k.sc=sc;
k.c.style.width=w0+'px';k.c.style.height=h0+'px';
k.c.style.transform=`translate(${x-w0/2}px,${y-h0/2}px) scale(${sc}) perspective(600px) rotateY(${sn*38}deg)`;
k.c.style.zIndex=1+Math.round(d*8);k.c.style.filter=`brightness(${.5+.55*d})`;k.c.style.opacity=1});}
const TOFF=+(new URLSearchParams(location.search).get('t')||0);function loop(t){place(t+TOFF);requestAnimationFrame(loop)}
if(location.search.includes('check')){setTimeout(()=>{geo();let hits=0,worst=0,log=[];const obs=()=>{const hr=hero.getBoundingClientRect();const R=[G.B,...G.C];return R};
for(let i=0;i<400;i++){const t=i/400*PER;place(t);const hr=hero.getBoundingClientRect();
for(const k of cards){const r=k.c.getBoundingClientRect(),q={l:r.left-hr.left,r:r.right-hr.left,t:r.top-hr.top,b:r.bottom-hr.top};
for(const o of [G.B,...G.C]){const ox=Math.min(q.r,o.r)-Math.max(q.l,o.l),oy=Math.min(q.b,o.b)-Math.max(q.t,o.t);if(ox>0&&oy>0){hits++;worst=Math.max(worst,Math.min(ox,oy));if(log.length<6)log.push([i,Math.round(ox),Math.round(oy),o===G.B?'B':'C'].join(':'))}}
if(q.t<G.hb){hits++;if(log.length<6)log.push(i+':hdr:'+Math.round(G.hb-q.t))}}}
let mn=9,ma=0;for(let i=0;i<400;i++){place(i/400*PER);for(const k of cards)if(k.sc<mn){mn=k.sc;ma=((k.a0+i/400*Math.PI*2)*180/Math.PI%360)|0}}mn=mn.toFixed(2)+'@'+ma;document.title='HITS '+hits+' minsc '+mn+' worst '+worst.toFixed(1)+' '+log.join(' ')+' '+JSON.stringify({w0:G.w0|0,yB:G.yBack|0,yFS:G.yFrontSide|0,yF:G.yFront|0,cy:G.cy|0,H:G.H,C:G.C.map(c=>[c.l|0,c.t|0,c.r|0,c.b|0])})},300)}
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
