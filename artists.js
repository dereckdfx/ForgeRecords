// Forge Records artist data (shared by index and artist pages)
const FOUND={d:'27/07/2026',t:'Forge Records fue fundada'},SALE={d:'07/08/2026',h:'Alice Whitman compró Forge Records y pasó a ser parte de Starlight Records',q:'Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman.'},TL=(...items)=>[{y:2026,items:items.reverse()}],// pass entries oldest→newest; shown newest first
JOIN=TL(FOUND,{...SALE},{d:'10/2026',h:'Se unió a Forge Records'});
// Dereck DFX releases, exactly in the order the user gave them
const DFX_RELEASES=[
{t:'The eye always looks at you (From “La Historia: Chapter 4” Original Game Soundtrack)',d:'07/2026'},
{t:'All Seeing Eye (From “La Historia: Chapter 4” Original Game Soundtrack)',d:'07/2026'},
{t:'The eye always looks at you second edition (From “La Historia: Chapter 4” Original Game Soundtrack)',d:'07/2026'},
{t:'Don’t Wait For Me (From “La Historia: Chapter 4” Original Game Soundtrack)',d:'07/2026'},
{t:'The Graveyard (From “La Historia: Chapter 4” Original Game Soundtrack)',d:'28/07/2026'},
{t:'The Graveyard (From “La Historia: Chapter 4” Original Game Soundtrack Remastered)',d:'28/07/2026'},
{t:'Soy Lo Peor (Bb Trickz Remix Instrumental)',d:'30/07/2026'},
{t:'Primer EP “DepresionTrickz (AR)”: Soy Lo Peor (Bb Trickz Remix Instrumental) · Todo Da Igual (AR Remix) · Es Verano y Qué (AR Remix)',d:'03/08/2026',by:'Dereck DFX & AR',ar:1,arn:'Su primer EP viral'},
{t:'Residue (AR Remix, & Dereck DFX)',d:'04/08/2026',by:'AR & Dereck DFX',ar:1,arn:'Su primer sencillo viral'},
{t:'Entering the room (AR Remix)',d:'04/08/2026',by:'Dereck DFX & AR',ar:1},
{t:'Entering the Elevator (AR Remix)',d:'04/08/2026',by:'Dereck DFX & AR',ar:1},
{t:'The Elevator (AR Remix)',d:'04/08/2026',by:'Dereck DFX & AR',ar:1},
{t:'Pink Diamond (feat. AR)',d:'13/08/2026',by:'Dereck DFX feat. AR',ar:1,post:1,q:'Primer lanzamiento de Dereck DFX bajo el sello: Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman.'},
{t:'Persona featuring. ALC (Alice Whitman) (feat. ALC (Alice Whitman))',d:'17/08/2026',con:'ALC (Alice Whitman)',feat:['alc'],post:1,q:'Segundo lanzamiento de Dereck DFX bajo el sello: Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman.'},
{t:'Purple',d:'25/08/2026',post:1,q:'Tercer lanzamiento de Dereck DFX bajo el sello: Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman.'},
{t:'Paint The Town Blue (from the series Arcane League of Legends: Season Two Original Soundtrack)',d:'09/09/2026',post:1,q:'Cuarto lanzamiento de Dereck DFX bajo el sello: Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman y Riot Games.'},
{t:'¿Qué Me Miras Las Crocs? (feat. Zoe Janet Perez Rios, BoyFiendYT, Iker, Anyelina & Super 67 / Dress) [Super 67, EXTREME PARENTAL ADVISORY EXPLICIT CONTENT Records®, todo qué vr records®, ehmmm i don\'t call u records® & VeVOL Records® Remix]',d:'11/09/2026',con:'La Reina de Tecámac, BoyFiendYT, Iker, Anyelina & Super 67 / Dress',feat:['zoe-jpr','boyfiendyt','iker','anyelina','super-67-dress'],post:1,q:'Quinto lanzamiento de Dereck DFX bajo el sello: Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman. Otros sellos: EXTREME PARENTAL ADVISORY EXPLICIT CONTENT Records®, todo qué vr records®, ehmmm i don\'t call u records® y VeVOL Records® (sello creado por Dereck DFX).'},
{t:'Fancy (Deluxe Version, Second Version)',d:'15/09/2026',post:1,q:'Sexto lanzamiento de Dereck DFX bajo el sello: Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman y Virgin EMI Records, a division of Universal Music Operations Limited.'},
{t:'Fancy (Instrumental)',d:'15/09/2026',post:1,q:'Séptimo lanzamiento de Dereck DFX bajo el sello: Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman y Virgin EMI Records, a division of Universal Music Operations Limited.'}];
const DFX_ANNOUNCED=[{d:'10/2026',h:'Anunció su álbum “Las Reinas del Perreo”',n:'Con Anyelina y La Reina de Tecámac'},{d:'10/2026',t:'Sencillo “Moteles”',rel:1},{d:'10/2026',t:'Sencillo “Always”',rel:1}];
// "Su primer lanzamiento", "Su segundo lanzamiento"… counted oldest→newest over releases only (the album announcement is not a release)
const ORD=['primer','segundo','tercer','cuarto','quinto','sexto','séptimo','octavo','noveno','décimo','undécimo','duodécimo','decimotercer','decimocuarto','decimoquinto','decimosexto','decimoséptimo','decimoctavo','decimonoveno','vigésimo','vigésimo primer','vigésimo segundo','vigésimo tercer','vigésimo cuarto','vigésimo quinto'];
[...DFX_RELEASES.map(r=>(r.rel=1,r)),...DFX_ANNOUNCED].filter(r=>r.rel).forEach((r,k)=>{r.n=`Su ${ORD[k]} lanzamiento`+(r.con?' · Con '+r.con:r.ar?' · Con AR':'')});
const PRE=DFX_RELEASES.filter(r=>!r.post),POST=DFX_RELEASES.filter(r=>r.post),AR_JOIN={d:'03/08/2026',h:'Se unió a Forge Records'};
const ALBUM_GUEST={d:'10/2026',t:'Aparecerá en el álbum “Las Reinas del Perreo” de Dereck DFX'};
const FEAT=s=>DFX_RELEASES.filter(r=>(r.feat||[]).includes(s)).map(r=>({d:r.d,t:r.t,n:'Con Dereck DFX',q:r.q}));
const ARTISTS=[
{s:'dereck-dfx',n:'Dereck DFX',img:'img/dereck-dfx.jpg',tl:TL(FOUND,{d:'07/2026',h:'Se unió a Forge Records'},...PRE.map(r=>({d:r.d||'',t:r.t,n:r.n})),{...SALE},...POST.map(r=>({d:r.d,t:r.t,n:r.n,q:r.q})),...DFX_ANNOUNCED.map(r=>({...r})))},
{s:'ar',n:'AR',img:'img/ar.jpg',tl:TL(FOUND,AR_JOIN,...PRE.filter(r=>r.ar).map(r=>({d:r.d,t:r.t,n:r.arn})),{...SALE},...POST.filter(r=>r.ar).map(r=>({d:r.d,t:r.t,n:r.arn,q:r.q})))},
{s:'zoe-jpr',n:'La Reina de Tecámac',img:'img/c7.jpg',tl:TL(FOUND,{...SALE},...FEAT('zoe-jpr'),{d:'10/2026',h:'Se unió a Forge Records'},ALBUM_GUEST)},
{s:'santiago-campos',n:'Santiago “Capito” Campos',img:'img/c8.jpg'},
// collaborators credited on Dereck DFX releases (no join date known, so no "joined" entry)
...[['alc','ALC (Alice Whitman)'],['boyfiendyt','BoyFiendYT','boyfiendyt-photo'],['iker','Iker'],['anyelina','Anyelina','anyelina-photo'],['super-67-dress','Super 67 / Dress','super67']].map(([s,n,f])=>({s,n,img:`img/${f||s}.jpg`,guest:1,tl:TL(FOUND,{...SALE},...FEAT(s),...(s==='anyelina'?[ALBUM_GUEST]:[]))}))
].map(a=>({...a,tl:a.tl||JOIN}));
// cards on the home page: only the label's artists (repeated to fill the hero)
const CARDS=[
{n:'DERECK DFX',img:'img/dereck-dfx.jpg',s:'dereck-dfx'},{n:'AR',img:'img/ar.jpg',s:'ar'},{n:'LA REINA DE TECÁMAC',img:'img/c7.jpg',s:'zoe-jpr'},
{n:'SANTIAGO “CAPITO” CAMPOS',img:'img/c8.jpg',s:'santiago-campos'}];
// featured collaborators: shown on the home hero too, but smaller and fewer than the 4 core artists
const GUEST_CARDS=ARTISTS.filter(a=>a.guest).map(a=>({n:a.n.toUpperCase(),img:a.img,s:a.s,g:1}));

// label timeline (only what we know: founded 2026, the October 2026 announcements and signings)
const LABEL_TL=TL(
{d:'27/07/2026',h:'Fundación de Forge Records'},
{d:'27/07/2026',t:'Dereck DFX se unió a Forge Records',a:'dereck-dfx'},
...PRE.filter(r=>r.d!=='03/08/2026'&&r.d!=='04/08/2026').map(r=>({d:r.d||'',t:(r.by||'Dereck DFX')+' — '+r.t,n:r.n,a:'dereck-dfx'})),
{d:'03/08/2026',t:'AR se unió a Forge Records',a:'ar'},
...PRE.filter(r=>r.d==='03/08/2026'||r.d==='04/08/2026').map(r=>({d:r.d,t:(r.by||'Dereck DFX')+' — '+r.t,n:r.n,a:'dereck-dfx'})),
{...SALE},
...POST.map(r=>({d:r.d||'',t:(r.by||'Dereck DFX')+' — '+r.t,n:r.n,q:r.q,a:'dereck-dfx'})),
{d:'10/2026',t:'Dereck DFX anunció su álbum “Las Reinas del Perreo”',n:'Con Anyelina y La Reina de Tecámac',a:'dereck-dfx'},
{d:'10/2026',t:'Dereck DFX — sencillo “Moteles”',n:DFX_ANNOUNCED[1].n,a:'dereck-dfx'},
{d:'10/2026',t:'Dereck DFX — sencillo “Always”',n:DFX_ANNOUNCED[2].n,a:'dereck-dfx'},
{d:'10/2026',t:'La Reina de Tecámac se unió a Forge Records',a:'zoe-jpr'},
{d:'10/2026',t:'Santiago “Capito” Campos se unió a Forge Records',a:'santiago-campos'});
