function badgeSVG(id){return `<svg viewBox="-20 -20 440 350" xmlns="http://www.w3.org/2000/svg"><defs>
<linearGradient id="c${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".18" stop-color="#e3e7ec"/><stop offset=".42" stop-color="#6b7179"/><stop offset=".5" stop-color="#1c1f23"/><stop offset=".56" stop-color="#f7f9fb"/><stop offset=".75" stop-color="#9aa1a9"/><stop offset="1" stop-color="#40454c"/></linearGradient>
<linearGradient id="d${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fdfdfd"/><stop offset=".3" stop-color="#7a8088"/><stop offset=".5" stop-color="#eef1f4"/><stop offset=".7" stop-color="#2a2e33"/><stop offset="1" stop-color="#c9ced4"/></linearGradient>
<linearGradient id="k${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050607"/><stop offset=".5" stop-color="#23272c"/><stop offset="1" stop-color="#08090a"/></linearGradient>
<filter id="b${id}" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="bl"/><feSpecularLighting in="bl" surfaceScale="5" specularConstant="1.1" specularExponent="22" lighting-color="#fff" result="sp"><feDistantLight azimuth="235" elevation="48"/></feSpecularLighting><feComposite in="sp" in2="SourceAlpha" operator="in" result="s2"/><feComposite in="SourceGraphic" in2="s2" operator="arithmetic" k2="1" k3=".75"/></filter>
<g id="sw${id}"><path d="M0 0 C 6 -30, 34 -44, 58 -30 C 40 -30, 22 -20, 0 0Z"/></g></defs>
<filter id="s${id}" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="14" stdDeviation="12" flood-color="#000" flood-opacity=".9"/></filter><rect x="8" y="8" width="384" height="284" rx="46" fill="#000" filter="url(#s${id})"/><rect x="8" y="8" width="384" height="284" rx="46" fill="url(#d${id})" filter="url(#b${id})"/>
<rect x="22" y="22" width="356" height="256" rx="34" fill="url(#k${id})" stroke="#000" stroke-width="2"/>
<text x="150" y="196" text-anchor="middle" font-family="Archivo Black" font-style="italic" font-size="215" fill="url(#c${id})" stroke="#f4f6f8" stroke-width="2.5" filter="url(#b${id})" transform="skewX(-10)">1</text>
<g transform="translate(272 118)" fill="url(#c${id})" stroke="#fff" stroke-width="1.2" filter="url(#b${id})">
<circle r="62" fill="none" stroke="url(#d${id})" stroke-width="7"/>
${[0,60,120,180,240,300].map(a=>`<use href="#sw${id}" transform="rotate(${a})"/>`).join('')}<circle r="9" fill="url(#d${id})"/></g>
<rect x="40" y="206" width="320" height="56" rx="28" fill="url(#k${id})" stroke="url(#d${id})" stroke-width="5" filter="url(#b${id})"/>
<text x="200" y="250" text-anchor="middle" font-family="Archivo Black" font-size="46" letter-spacing="10" textLength="270" fill="url(#c${id})" stroke="#fff" stroke-width="1" filter="url(#b${id})">FORGE</text></svg>`}
document.querySelectorAll('.badge-slot').forEach((e,i)=>e.innerHTML=badgeSVG(i));
const A=[["NOX DEL SUR",1],["LOS FORJADOS",2],["LUNA CROMA",3],["LAS REINAS DEL PERREO",4],["SOLENNE",5],["MOTELES",4],["ALWAYS",5],["VALKYRA",3],["KAI VERTIGO",1],["REY HIERRO",2],["MIRA SAINT",5],["DJ OBSIDIANA",1],["ATLAS ROSE",3],["ZAFIRO 99",2]];
const w=document.getElementById('world'),mob=innerWidth<600,cards=[];
// mobile: [cx,cy,w,h,rotY,rotZ,idx]
const MP=[[.025,.25,72,150,42,-3,4],[.27,.27,128,146,24,-6,0],[.985,.44,84,128,-40,4,2],[.165,.545,142,116,16,4,1],[.06,.73,74,100,26,2,3]];
const list=mob?MP.map(m=>A[m[6]]):A;
list.forEach((a,i)=>{const c=document.createElement('div');c.className='card';
c.innerHTML=`<div class="art" style="background-image:url(img/c${a[1]}.jpg)"></div><b>${a[0]}</b>`;
w.appendChild(c);
if(mob){const m=MP[i];c.style.width=m[2]+'px';c.style.height=m[3]+'px';cards.push({c,m,i})}
else{const s=150+(i%3)*34;c.style.width=s+'px';c.style.height=s*1.3+'px';cards.push({c,ang:i/list.length*Math.PI*2,r:.36+(i%4)*.05,z:-520+(i%5)*140,rot:(i%2?1:-1)*(14+i%4*7),sp:.00004+(i%3)*.00002,s,ph:i})}});
let mx=0,my=0,tx=0,ty=0;
addEventListener('mousemove',e=>{tx=e.clientX/innerWidth-.5;ty=e.clientY/innerHeight-.5});
addEventListener('touchmove',e=>{const t=e.touches[0];tx=t.clientX/innerWidth-.5;ty=t.clientY/innerHeight-.5},{passive:true});
addEventListener('deviceorientation',e=>{if(e.gamma!=null){tx=Math.max(-.5,Math.min(.5,e.gamma/60));ty=Math.max(-.5,Math.min(.5,(e.beta-45)/60))}});
const f=document.getElementById('forge');let auto=true;addEventListener('mousemove',()=>auto=false,{once:true});
function loop(t){if(auto&&mob){tx=Math.sin(t/3000)*.2;ty=Math.cos(t/4000)*.12}
mx+=(tx-mx)*.06;my+=(ty-my)*.06;const W=innerWidth,H=innerHeight;
if(mob){w.style.transform='none';
f.style.transform=`translate(-50%,-50%) perspective(700px) rotateY(${mx*22+Math.sin(t/2500)*6}deg) rotateX(${4-my*14}deg) rotateZ(-1deg)`;
cards.forEach(({c,m,i})=>{const x=m[0]*W-m[2]/2+Math.sin(t/2600+i)*5-mx*16,y=m[1]*H-m[3]/2+Math.cos(t/3100+i)*5-my*10;
c.style.transform=`translate(${x}px,${y}px) perspective(500px) rotateY(${m[4]+mx*10}deg) rotateZ(${m[5]}deg)`})}
else{w.style.transform=`rotateY(${mx*14}deg) rotateX(${-my*10}deg)`;
f.style.transform=`translate3d(-50%,-50%,300px) rotateY(${mx*35+Math.sin(t/2500)*10}deg) rotateX(${8-my*22}deg) rotateZ(-3deg)`;
cards.forEach(k=>{const a=k.ang+t*k.sp;const x=Math.cos(a)*W*k.r*1.2,y=Math.max(-H/2+90+k.s*.65,Math.min(H/2-110-k.s*.65,Math.sin(a)*H*k.r*.9+Math.sin(t/1800+k.ph)*12));
k.c.style.transform=`translate3d(${x-k.s/2-mx*(k.z+600)*.15}px,${y-k.s*.65-my*(k.z+600)*.1}px,${k.z}px) rotateY(${(x<0?1:-1)*28+mx*20}deg) rotateZ(${k.rot*.15}deg)`;k.c.style.zIndex=1})}
requestAnimationFrame(loop)}
requestAnimationFrame(loop);
setTimeout(()=>{document.getElementById('intro').classList.add('out');document.body.classList.add('ready')},1500);
document.querySelectorAll('.view button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.view button').forEach(x=>x.classList.remove('on'));b.classList.add('on')});
if(location.search.includes('shot')){document.getElementById('intro').classList.add('out');document.getElementById('intro').style.display='none';document.body.classList.add('ready')}
