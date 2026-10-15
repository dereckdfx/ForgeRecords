const A=[["LAS REINAS DEL PERREO","ÁLBUM"],["MOTELES","SINGLE"],["ALWAYS","SINGLE"],["VALKYRA","ARTISTA"],["NOX DEL SUR","ARTISTA"],["LUNA CROMA","ARTISTA"],["KAI VERTIGO","ARTISTA"],["MIRA SAINT","ARTISTA"],["DJ OBSIDIANA","ARTISTA"],["REY HIERRO","ARTISTA"],["SOLENNE","ARTISTA"],["ZAFIRO 99","ARTISTA"],["ECHO BLANCO","ARTISTA"],["LA DIVINA K","ARTISTA"],["ATLAS ROSE","ARTISTA"],["NEÓN BRAVA","ARTISTA"]];
const P=[["#ff2d95","#2b0018"],["#c9a227","#1a1205"],["#3a4cff","#05051a"],["#00e0c6","#00211c"],["#ff6a00","#200800"],["#b14dff","#12001f"],["#e6e6e6","#222"],["#ff004c","#0a0005"]];
const w=document.getElementById('world'),mob=innerWidth<600,cards=[];
A.forEach((a,i)=>{const c=document.createElement('div');c.className='card';const p=P[i%P.length],g=(i*47)%360;
const s=(mob?.62:1)*(150+(i%3)*30);c.style.width=s+'px';c.style.height=s*1.25+'px';
c.innerHTML=`<div class="art" style="background:radial-gradient(circle at ${20+i*13%60}% ${30+i*7%50}%,${p[0]},transparent 60%),conic-gradient(from ${g}deg at 70% 70%,${p[1]},${p[0]}55,#000,${p[1]}),${p[1]}"></div><small>FORGE · ${a[1]}</small><b>${a[0]}</b>`;
w.appendChild(c);const ang=i/A.length*Math.PI*2;
cards.push({c,ang,r:(mob?.42:.36)+(i%4)*.05,z:-500+(i%5)*170,rot:(i%2?1:-1)*(8+i%4*6),sp:.00004+(i%3)*.00002,s,ph:i});});
let mx=0,my=0,tx=0,ty=0;
addEventListener('mousemove',e=>{tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5});
addEventListener('touchmove',e=>{const t=e.touches[0];tx=t.clientX/innerWidth-.5;ty=t.clientY/innerHeight-.5},{passive:true});
addEventListener('deviceorientation',e=>{if(e.gamma!=null){tx=Math.max(-.5,Math.min(.5,e.gamma/60));ty=Math.max(-.5,Math.min(.5,(e.beta-45)/60))}});
const f=document.getElementById('forge');let auto=true;addEventListener('mousemove',()=>auto=false,{once:true});
function loop(t){if(auto&&mob){tx=Math.sin(t/3000)*.3;ty=Math.cos(t/4000)*.2}
mx+=(tx-mx)*.06;my+=(ty-my)*.06;const W=innerWidth,H=innerHeight;
w.style.transform=`rotateY(${mx*14}deg) rotateX(${-my*10}deg)`;
f.style.transform=`translate3d(-50%,-50%,120px) rotateY(${mx*30+Math.sin(t/2500)*8}deg) rotateX(${-my*20}deg)`;
cards.forEach(k=>{const a=k.ang+t*k.sp;const x=Math.cos(a)*W*k.r*(mob?1.1:1.2),y=Math.sin(a)*H*k.r*.9+Math.sin(t/1800+k.ph)*12;
k.c.style.transform=`translate3d(${x-k.s/2-mx*(k.z+600)*.15}px,${y-k.s*.62-my*(k.z+600)*.1}px,${k.z}px) rotateY(${k.rot+mx*20}deg) rotateZ(${k.rot*.4}deg)`;
k.c.style.zIndex=k.z>0?6:1});requestAnimationFrame(loop)}
requestAnimationFrame(loop);
setTimeout(()=>{document.getElementById('intro').classList.add('out');document.body.classList.add('ready')},1500);
document.querySelectorAll('.view button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.view button').forEach(x=>x.classList.remove('on'));b.classList.add('on')});
if(location.search.includes('shot')){document.getElementById('intro').classList.add('out');document.getElementById('intro').style.display='none';document.body.classList.add('ready')}
