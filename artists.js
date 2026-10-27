// Forge Records artist data (shared by index and artist pages)
const FOUND={d:'27/07/2026',t:'Forge Records fue fundada'},SALE={d:'07/08/2026',h:'Alice Whitman compró Forge Records y pasó a ser parte de Starlight Records',q:'Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman.'},TL=(...items)=>[{y:2026,items:items.reverse()}],// pass entries oldest→newest; shown newest first
JOIN=TL(FOUND,{...SALE},{d:'10/2026',h:'Se unió a Forge Records'});
// featured collaborators credited on Dereck DFX releases. hidden:true = fully hidden from the site (data + images kept; flip the flag to bring them back)
const GUESTS=[{s:'alc',n:'ALC (Alice Whitman)',f:'alc-photo'},{s:'boyfiendyt',n:'BoyFiendYT',f:'boyfiendyt-photo'},{s:'iker',n:'Iker',f:'iker-photo'},{s:'anyelina',n:'Anyelina',f:'anyelina-photo'},{s:'super-67-dress',n:'Super 67 / Dress',f:'super-67-photo',fit:1},{s:'tyn',n:'T.Y.N',f:'tyn-photo'},{s:'sin-cut',n:'S.I.N C.U.T.',f:'sin-cut-photo'},{s:'angel-chavez-mateos',n:'Angel Chavez Mateos',f:'angel-chavez-mateos-photo'},{s:'seven-sex',n:'Seven Sex',f:'reinas-del-perreo-cover',a69:1},{s:'eszett',n:'ẞ',f:'reinas-del-perreo-cover',a69:1},{s:'la-fineasse',n:'La Fineasse',f:'reinas-del-perreo-cover',a69:1},
{s:'olivia-rodrigo',n:'Olivia Rodrigo',f:'olivia-rodrigo-photo',hidden:true},{s:'daniel-nigro',n:'Daniel Nigro',f:'daniel-nigro-photo',hidden:true}];
const HIDDEN=new Set(GUESTS.filter(g=>g.hidden).map(g=>g.s));
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
{t:'Purple',d:'25/08/2026',con:'Olivia Rodrigo y Daniel Nigro',feat:['olivia-rodrigo','daniel-nigro'],post:1,q:'Tercer lanzamiento de Dereck DFX bajo el sello: Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman.'},
{t:'Paint The Town Blue (from the series Arcane League of Legends: Season Two Original Soundtrack)',d:'09/09/2026',post:1,q:'Cuarto lanzamiento de Dereck DFX bajo el sello: Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman y Riot Games.'},
{t:'¿Qué Me Miras Las Crocs? (feat. Zoe Janet Perez Rios, BoyFiendYT, Iker, Anyelina & Super 67 / Dress) [Super 67, EXTREME PARENTAL ADVISORY EXPLICIT CONTENT Records®, todo qué vr records®, ehmmm i don\'t call u records® & VeVOL Records® Remix]',d:'11/09/2026',con:'La Reina de Tecámac, BoyFiendYT, Iker, Anyelina & Super 67 / Dress',feat:['zoe-jpr','boyfiendyt','iker','anyelina','super-67-dress'],post:1,q:'Quinto lanzamiento de Dereck DFX bajo el sello: Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman. Otros sellos: EXTREME PARENTAL ADVISORY EXPLICIT CONTENT Records®, todo qué vr records®, ehmmm i don\'t call u records® y VeVOL Records® (sello creado por Dereck DFX).'},
{t:'Fancy (Deluxe Version, Second Version)',d:'15/09/2026',post:1,q:'Sexto lanzamiento de Dereck DFX bajo el sello: Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman y Virgin EMI Records, a division of Universal Music Operations Limited.'},
{t:'Fancy (Instrumental)',d:'15/09/2026',post:1,q:'Séptimo lanzamiento de Dereck DFX bajo el sello: Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman y Virgin EMI Records, a division of Universal Music Operations Limited.'},
{t:'Super S! (fr. T.Y.N) (feat. T.Y.N)',d:'15/09/2026',con:'T.Y.N',feat:['tyn'],post:1,q:'Octavo lanzamiento de Dereck DFX bajo el sello: Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman.'},
{t:'Porn*gráfica (fr. S.I.N C.U.T.) (feat. S.I.N C.U.T., 5021 Records & S\'ny Music Entertainment España, S.L.)',d:'24/09/2026',con:'S.I.N C.U.T.',feat:['sin-cut'],post:1,q:'Noveno lanzamiento de Dereck DFX bajo el sello: Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman (producido por Forge Records). Publicado por 5021 Records / S\'ny Music Entertainment España, S.L.'},
{t:'Angel Chavez Mateos FTS Session 001 (feat. Angel Chavez Mateos, 5021 Records, S\'ny Music Entertainment México, S.L., S\'ny Music Entertainment México, S.L. FTS Sessions & FTS Sessions) [S\'ny Music Entertainment México, S.L. FTS Session 001]',d:'01/10/2026',con:'Angel Chavez Mateos',feat:['angel-chavez-mateos'],post:1,q:'Décimo lanzamiento de Dereck DFX bajo el sello: Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman (producido por Forge Records y Starlight). Publicado por el sello Fotos Sacadas del Classroom, derechos: S\'ny Music Entertainment México, S.L.'}];
const DFX_ANNOUNCED=[{d:'10/2026',h:'Anunció su álbum “Las Reinas del Perreo”',n:'Con Anyelina y La Reina de Tecámac'},{d:'10/2026',t:'Sencillo “Moteles”',rel:1},{d:'15/10/2026',t:'Always (Single)',rel:1,q:'Undécimo lanzamiento de Dereck DFX bajo el sello: Dereck DFX LLC under exclusive license to Forge Records, an exclusive license from Starlight Records, a division of Alice Whitman.'},{d:'18/10/2026',t:'POSSESSION',rel:1,q:'Duodécimo lanzamiento de Dereck DFX bajo el sello: Atlantic Recording Corporation / Forge Records, an exclusive license from Starlight Records, a division of Alice Whitman. Primer lanzamiento de Dereck DFX como parte de Atlantic Recording Corporation y posiblemente su último lanzamiento con Forge Records.'},{d:'19/10/2026',h:'Anunció el álbum “Que Tengan Celos De Lo Que Escribí De Ti”',n:'Con Valentina Granciano y Campos'}];
// hidden collaborators: drop them from feat; if every credited collaborator is hidden, drop the 'Con …' label too (returns automatically when unhidden)
DFX_RELEASES.forEach(r=>{if(!r.feat||!r.feat.length)return;r.feat=r.feat.filter(s=>!HIDDEN.has(s));if(!r.feat.length)delete r.con});
// "Su primer lanzamiento", "Su segundo lanzamiento"… counted oldest→newest over releases only (the album announcement is not a release)
const ORD=['primer','segundo','tercer','cuarto','quinto','sexto','séptimo','octavo','noveno','décimo','undécimo','duodécimo','decimotercer','decimocuarto','decimoquinto','decimosexto','decimoséptimo','decimoctavo','decimonoveno','vigésimo','vigésimo primer','vigésimo segundo','vigésimo tercer','vigésimo cuarto','vigésimo quinto'];
[...DFX_RELEASES.map(r=>(r.rel=1,r)),...DFX_ANNOUNCED].filter(r=>r.rel).forEach((r,k)=>{r.n=`Su ${ORD[k]} lanzamiento`+(r.con?' · Con '+r.con:r.ar?' · Con AR':'')});
// U.L.T.R.A album series + upcoming albums (cv = cover). Released ones go in the 2026 timeline; the rest in "Próximamente"
const ULTRA_LBL='Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman.';
const UA=(t,s,c,up,x)=>({t,cv:`img/albums/${s}.jpg`,n:`Álbum · ${c} canciones${x?' · '+x:''}`,q:ULTRA_LBL,up});
const DFX_ALBUMS=[UA('U.L.T.R.A (Normal)','ultra-normal',50),UA('U.L.T.R.A (Premium)','ultra-premium',59),UA('U.L.T.R.A (VIP)','ultra-vip',68),UA('U.L.T.R.A (Luxury)','ultra-luxury',76),UA('U.L.T.R.A (Deluxe)','ultra-deluxe',85),UA('U.L.T.R.A (Edición de Lujo)','ultra-edicion-de-lujo',94),UA('U.L.T.R.A (Elite)','ultra-elite',103),UA('U.L.T.R.A (Signature)','ultra-signature',112),UA('U.L.T.R.A (Prestige)','ultra-prestige',121,1),UA('U.L.T.R.A (First Class)','ultra-first-class',129,1),UA('U.L.T.R.A (Platinum)','ultra-platinum',138,1),
UA('U.L.T.R.A (Black)','ultra-black',147,1),UA('U.L.T.R.A (Custom Tailored)','ultra-custom-tailored',200,1),
UA('HD','hd',66,1,'Instrumental'),UA('Pantheon','pantheon',33,1),UA('UKTRA (Alternate Version of U.L.T.R.A)','ultra-uktra',200,1),{t:'UMG',n:'Álbum · Alrededor de 200 canciones',q:ULTRA_LBL,up:1}];
// DistroKid albums (label line: Forge Records)
const DK=(t,s,c,x,d)=>({t,cv:`img/albums/${s}.jpg`,n:`Álbum · ${c} canciones${x?' · '+x:''}`,q:'Forge Records',d});
DFX_ALBUMS.unshift(DK('Las Reinas del Perreo','reinas-del-perreo',35,'Explícito · Con Anyelina, La Reina de Tecámac, Seven Sex, ẞ, La Fineasse y AR','16/10/2026'),DK('Las Reinas del Perreo (Area 69, Second Edition)','reinas-del-perreo',35,'Explícito · Con Anyelina, La Reina de Tecámac, Seven Sex, ẞ, La Fineasse y AR','2026'),DK('Las Reinas del Perreo (Deluxe, Third Edition)','reinas-del-perreo',35,'Explícito · Con Anyelina, La Reina de Tecámac, Seven Sex, ẞ, La Fineasse y AR','2026'),DK('if','if',15,'Inspirado en BRAT','21/10/2026'),DK('Petal','petal',12,'Explícito · Inspirado en “Petal” de Ariana Grande','2026'));
DFX_ALBUMS.push({t:'Visualizer de “Petal”',cv:'img/albums/petal.jpg',n:'Dereck DFX lanzó el Visualizer de la canción “Petal” del álbum “Petal”',q:'Forge Records',d:'2026'});
// featured artists of Las Reinas del Perreo: the 3 editions on their own pages
const RG=DFX_ALBUMS.filter(a=>/^Las Reinas del Perreo/.test(a.t)).reverse().map(a=>({d:a.d,t:'Aparece en el álbum “'+a.t+'” de Dereck DFX',cv:a.cv,n:'Álbum · 35 canciones · Explícito',q:'Forge Records'}));
const ALB_OUT=DFX_ALBUMS.filter(a=>!a.up).map(a=>({...a,d:a.d||'2026'})),ALB_UP=DFX_ALBUMS.filter(a=>a.up).map(a=>({...a}));
const SOON=(g,f=x=>x)=>[{y:'Próximamente',items:ALB_UP.map(f).reverse()},...g];
const PRE=DFX_RELEASES.filter(r=>!r.post),POST=DFX_RELEASES.filter(r=>r.post),AR_JOIN={d:'03/08/2026',h:'Se unió a Forge Records'};
const ALBUM_GUEST={d:'10/2026',t:'Aparecerá en el álbum “Las Reinas del Perreo” de Dereck DFX'};
const AREA69={d:'10/2026',t:'Aparece en el álbum “Las Reinas del Perreo (Area 69, Second Edition)” de Dereck DFX'};
const FEAT=s=>DFX_RELEASES.filter(r=>(r.feat||[]).includes(s)).map(r=>({d:r.d,t:r.t,n:'Con Dereck DFX',q:r.q}));
const VG_ALBUM={d:'19/10/2026',h:'Anunció el álbum “Que Tengan Celos De Lo Que Escribí De Ti”',n:'De Dereck DFX, Valentina Granciano y Campos'};
const ALL_ARTISTS=[
{s:'dereck-dfx',n:'Dereck DFX',img:'img/dereck-dfx.jpg',tagline:'Y Esta Mierda Apenas Empieza',taglineBy:'Dereck DFX',tl:SOON(TL(FOUND,{d:'07/2026',h:'Se unió a Forge Records'},...PRE.map(r=>({d:r.d||'',t:r.t,n:r.n})),{...SALE},...POST.map(r=>({d:r.d,t:r.t,n:r.n,q:r.q})),...DFX_ANNOUNCED.map(r=>({...r})),...ALB_OUT))},
{s:'ar',n:'AR',img:'img/ar.jpg',tl:TL(FOUND,AR_JOIN,...PRE.filter(r=>r.ar).map(r=>({d:r.d,t:r.t,n:r.arn})),{...SALE},...POST.filter(r=>r.ar).map(r=>({d:r.d,t:r.t,n:r.arn,q:r.q})),...RG)},
{s:'zoe-jpr',n:'La Reina de Tecámac',img:'img/zoe-photo.jpg',fit:1,tl:TL(FOUND,{...SALE},...FEAT('zoe-jpr'),{d:'10/2026',h:'Se unió a Forge Records'},...RG)},
{s:'santiago-campos',n:'Campos',img:'img/santiago-photo.jpg',fit:1,tl:TL(FOUND,{...SALE},{d:'10/2026',h:'Se unió a Forge Records'},{...VG_ALBUM})},
{s:'valentina-granciano',n:'Valentina Granciano',img:'img/valentina-photo.jpg',pos:'center 60%',tl:TL(FOUND,{...SALE},{d:'19/10/2026',h:'Se unió a Forge Records'},{...VG_ALBUM})},
// collaborators credited on Dereck DFX releases (no join date known, so no "joined" entry)
...GUESTS.map(({s,n,f,hidden,fit,a69})=>({s,n,img:`img/${f||s}.jpg`,fit,pos:s==='iker'?'center 12%':s==='daniel-nigro'?'center 8%':undefined,guest:1,hidden,tl:TL(FOUND,{...SALE},...FEAT(s),...(s==='anyelina'||a69?RG:[]))}))
].map(a=>({...a,tl:a.tl||JOIN}));
const ARTISTS=ALL_ARTISTS.filter(a=>!a.hidden);// everything on the site reads ARTISTS, so hidden artists never show
// cards on the home page: only the label's artists (repeated to fill the hero)
const CARDS=[
{n:'DERECK DFX',img:'img/dereck-dfx.jpg',s:'dereck-dfx'},{n:'AR',img:'img/ar.jpg',s:'ar'},{n:'LA REINA DE TECÁMAC',img:'img/zoe-photo.jpg',s:'zoe-jpr',fit:1},
{n:'CAMPOS',img:'img/santiago-photo.jpg',s:'santiago-campos',fit:1},
{n:'VALENTINA GRANCIANO',img:'img/valentina-photo.jpg',s:'valentina-granciano',pos:'center 60%'}];
// featured collaborators: shown on the home hero too, but smaller and fewer than the 4 core artists
const GUEST_CARDS=ARTISTS.filter(a=>a.guest).map(a=>({n:a.n.toUpperCase(),img:a.img,s:a.s,g:1,fit:a.fit}));

// label timeline (only what we know: founded 2026, the October 2026 announcements and signings)
const LABEL_TL=SOON(TL(
{d:'27/07/2026',h:'Fundación de Forge Records'},
{d:'27/07/2026',t:'Dereck DFX se unió a Forge Records',a:'dereck-dfx'},
...PRE.filter(r=>r.d!=='03/08/2026'&&r.d!=='04/08/2026').map(r=>({d:r.d||'',t:(r.by||'Dereck DFX')+' — '+r.t,n:r.n,a:'dereck-dfx'})),
{d:'03/08/2026',t:'AR se unió a Forge Records',a:'ar'},
...PRE.filter(r=>r.d==='03/08/2026'||r.d==='04/08/2026').map(r=>({d:r.d,t:(r.by||'Dereck DFX')+' — '+r.t,n:r.n,a:'dereck-dfx'})),
{...SALE},
...POST.map(r=>({d:r.d||'',t:(r.by||'Dereck DFX')+' — '+r.t,n:r.n,q:r.q,a:'dereck-dfx'})),
{d:'10/2026',t:'Dereck DFX anunció su álbum “Las Reinas del Perreo”',n:'Con Anyelina y La Reina de Tecámac',a:'dereck-dfx'},
{d:'10/2026',t:'Dereck DFX — sencillo “Moteles”',n:DFX_ANNOUNCED[1].n,a:'dereck-dfx'},
{d:'10/2026',t:'La Reina de Tecámac se unió a Forge Records',a:'zoe-jpr'},
{d:'10/2026',t:'Campos se unió a Forge Records',a:'santiago-campos'},
{d:'15/10/2026',t:'Dereck DFX — Always (Single)',n:DFX_ANNOUNCED[2].n,q:DFX_ANNOUNCED[2].q,a:'dereck-dfx'},
{d:'18/10/2026',t:'Dereck DFX — POSSESSION',n:DFX_ANNOUNCED[3].n,q:DFX_ANNOUNCED[3].q,a:'dereck-dfx'},
{d:'19/10/2026',t:'Valentina Granciano se unió a Forge Records',a:'valentina-granciano'},
{d:'19/10/2026',t:'Dereck DFX, Valentina Granciano y Campos anunciaron el álbum “Que Tengan Celos De Lo Que Escribí De Ti”',a:'valentina-granciano'},
...ALB_OUT.map(a=>({...a,t:'Dereck DFX — '+a.t,a:'dereck-dfx'}))),a=>({...a,t:'Dereck DFX — '+a.t,a:'dereck-dfx'}));
