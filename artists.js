// Forge Records artist data (shared by index and artist pages)
const FOUND={d:'27/07/2026',t:'Forge Records fue fundada'},TL=(...items)=>[{y:2026,items:items.reverse()}],// pass entries oldest→newest; shown newest first
JOIN=TL(FOUND,{d:'10/2026',h:'Se unió a Forge Records'});
// Dereck DFX releases, exactly in the order the user gave them
const DFX_RELEASES=[
{t:'The eye always looks at you (From “La Historia: Chapter 4” Original Game Soundtrack)',d:'07/2026'},
{t:'All Seeing Eye (From “La Historia: Chapter 4” Original Game Soundtrack)',d:'07/2026'},
{t:'The eye always looks at you second edition (From “La Historia: Chapter 4” Original Game Soundtrack)',d:'07/2026'},
{t:'Don’t Wait For Me (From “La Historia: Chapter 4” Original Game Soundtrack)',d:'07/2026'},
{t:'The Graveyard (From “La Historia: Chapter 4” Original Game Soundtrack)',d:'28/07/2026'},
{t:'The Graveyard (From “La Historia: Chapter 4” Original Game Soundtrack Remastered)',d:'28/07/2026'},
{t:'Soy Lo Peor (Bb Trickz Remix Instrumental)',d:'30/07/2026'},
{t:'Primer EP “DepresionTrickz (AR)”: Soy Lo Peor (Bb Trickz Remix Instrumental) · Todo Da Igual (AR Remix) · Es Verano y Qué (AR Remix)',d:'03/08/2026',by:'Dereck DFX & AR',ar:1},
{t:'Residue (AR Remix, & Dereck DFX)',d:'04/08/2026',by:'AR & Dereck DFX',ar:1}];
const DFX_ANNOUNCED=[{d:'10/2026',h:'Anunció su álbum “Las Reinas del Perreo”'},{d:'10/2026',t:'Sencillo “Moteles”'},{d:'10/2026',t:'Sencillo “Always”'}];
const ARTISTS=[
{s:'dereck-dfx',n:'Dereck DFX',img:'img/dereck-dfx.jpg',tl:TL(FOUND,{d:'07/2026',h:'Se unió a Forge Records'},...DFX_RELEASES.map(r=>({d:r.d||'',t:r.t})),...DFX_ANNOUNCED.map(r=>({...r})))},
{s:'ar',n:'AR',img:'img/c6.jpg',tl:TL(FOUND,...DFX_RELEASES.filter(r=>r.ar).map(r=>({d:r.d,t:r.t})),{d:'10/2026',h:'Se unió a Forge Records'})},
{s:'zoe-jpr',n:'Zoe J. P. R.',img:'img/c7.jpg'},
{s:'santiago-campos',n:'Santiago “Capito” Campos',img:'img/c8.jpg'}
].map(a=>({...a,tl:a.tl||JOIN}));
// cards on the home page: artists plus Dereck DFX's releases (they open his page)
const CARDS=[
{n:'DERECK DFX',img:'img/dereck-dfx.jpg',s:'dereck-dfx'},{n:'AR',img:'img/c6.jpg',s:'ar'},{n:'ZOE J. P. R.',img:'img/c7.jpg',s:'zoe-jpr'},
{n:'SANTIAGO “CAPITO” CAMPOS',img:'img/c8.jpg',s:'santiago-campos'},
{n:'LAS REINAS DEL PERREO',img:'img/c4.jpg',s:'dereck-dfx'},{n:'MOTELES',img:'img/c4.jpg',s:'dereck-dfx'},{n:'ALWAYS',img:'img/c5.jpg',s:'dereck-dfx'}];

// label timeline (only what we know: founded 2026, the October 2026 announcements and signings)
const LABEL_TL=TL(
{d:'27/07/2026',h:'Fundación de Forge Records'},
{d:'27/07/2026',t:'Dereck DFX se unió a Forge Records',a:'dereck-dfx'},
...DFX_RELEASES.map(r=>({d:r.d||'',t:(r.by||'Dereck DFX')+' — '+r.t,a:'dereck-dfx'})),
{d:'10/2026',t:'Dereck DFX anunció su álbum “Las Reinas del Perreo”',a:'dereck-dfx'},
{d:'10/2026',t:'Dereck DFX — sencillo “Moteles”',a:'dereck-dfx'},
{d:'10/2026',t:'Dereck DFX — sencillo “Always”',a:'dereck-dfx'},
{d:'10/2026',t:'AR se unió a Forge Records',a:'ar'},
{d:'10/2026',t:'Zoe J. P. R. se unió a Forge Records',a:'zoe-jpr'},
{d:'10/2026',t:'Santiago “Capito” Campos se unió a Forge Records',a:'santiago-campos'});
