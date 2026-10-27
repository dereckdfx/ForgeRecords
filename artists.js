 // Forge Records artist data (shared by index and artist pages)
 const FOUND={d:'27/07/2026',t:'Forge Records fue fundada'},SALE={d:'07/08/2026',h:'Alice Whitman compró Forge Records y pasó a ser parte de Starlight Records',q:'Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman.'},
 JOIN=TL(FOUND,{...SALE},{d:'10/2026',h:'Se unió a Forge Records'});
 // featured collaborators credited on Dereck DFX releases. hidden:true = fully hidden from the site (data + images kept; flip the flag to bring them back)
 const GUESTS=[{s:'alc',n:'ALC (Alice Whitman)',f:'alc-photo'},{s:'boyfiendyt',n:'BoyFiendYT',f:'boyfiendyt-photo'},{s:'iker',n:'Iker',f:'iker-photo'},{s:'anyelina',n:'Anyelina',f:'anyelina-photo'},
 {s:'zoe-jpr',n:'La Reina de Tecámac',f:'zoe-photo',fit:1},{s:'santiago-campos',n:'Campos de artista',f:'santiago-photo',fit:1},{s:'valentina-granciano',n:'Valentina Granciano',f:'valentina-photo',pos:'center 60%'},
 {s:'tyn',n:'T.Y.N',f:'tyn-photo'},{s:'sin-cut',n:'S.I.N C.U.T.',f:'sin-cut-photo'},{s:'super-67',n:'Super 67',f:'super-67-photo'},
 {s:'olivia-rodrigo',n:'Olivia Rodrigo',f:'olivia-rodrigo-photo',hidden:true},{s:'daniel-nigro',n:'Daniel Nigro',f:'daniel-nigro-photo',hidden:true}];
 const HIDDEN=new Set(GUESTS.filter(g=>g.hidden).map(g=>g.s));
 // Dereck DFX releases, exactly in the order the user gave them
 const DFX_RELEASES=[
@@
-const VG_ALBUM={d:'19/10/2026',h:'Anunció el álbum “Que Tengan Celos De Lo Que Escribí De Ti”',n:'De Dereck DFX, Valentina Granciano y Santiago “Capito” Campos'};
+const VG_ALBUM={d:'19/10/2026',h:'Anunció el álbum “Que Tengan Celos De Lo Que Escribí De Ti”',n:'De Dereck DFX, Valentina Granciano y Campos de artista'};
 const ALL_ARTISTS=[
 {s:'dereck-dfx',n:'Dereck DFX',img:'img/dereck-dfx.jpg',tagline:'Y Esta Mierda Apenas Empieza',taglineBy:'Dereck DFX',tl:SOON(TL(FOUND,{d:'07/2026',h:'Se unió a Forge Records'},...PRE.map(r=>({d:r.d||'',t:r.t,n:r.n,a:'dereck-dfx'})),{...SALE},...POST.map(r=>({d:r.d||'',t:r.t,n:r.n,q:r.q,a:'dereck-dfx'})),...RG))},
 {s:'ar',n:'AR',img:'img/ar.jpg',tl:TL(FOUND,AR_JOIN,...PRE.filter(r=>r.ar).map(r=>({d:r.d,t:r.t,n:r.arn})),{...SALE},...POST.filter(r=>r.ar).map(r=>({d:r.d,t:r.t,n:r.arn,q:r.q})),...RG)},
 {s:'zoe-jpr',n:'La Reina de Tecámac',img:'img/zoe-photo.jpg',fit:1,tl:TL(FOUND,{...SALE},...FEAT('zoe-jpr'),{d:'10/2026',h:'Se unió a Forge Records'},...RG)},
-{s:'santiago-campos',n:'Santiago “Capito” Campos',img:'img/santiago-photo.jpg',fit:1,tl:TL(FOUND,{...SALE},{d:'10/2026',h:'Se unió a Forge Records'},{...VG_ALBUM})},
+{s:'santiago-campos',n:'Campos de artista',img:'img/santiago-photo.jpg',fit:1,tl:TL(FOUND,{...SALE},{d:'10/2026',h:'Se unió a Forge Records'},{...VG_ALBUM})},
 {s:'valentina-granciano',n:'Valentina Granciano',img:'img/valentina-photo.jpg',pos:'center 60%',tl:TL(FOUND,{...SALE},{d:'19/10/2026',h:'Se unió a Forge Records'},{...VG_ALBUM})},
 // collaborators credited on Dereck DFX releases (no join date known, so no "joined" entry)
 ...GUESTS.map(({s,n,f,hidden,fit,a69})=>({s,n,img:`img/${f||s}.jpg`,fit,pos:s==='iker'?'center 12%':s==='daniel-nigro'?'center 8%':undefined,guest:1,hidden,tl:TL(FOUND,{...SALE},...FEAT(s),...(s===a69?[{d:'10/2026',t:'Aparece en el álbum “Las Reinas del Perreo (Area 69, Second Edition)” de Dereck DFX'}]:[]),...(s==='zoe-jpr'?[{d:'10/2026',h:'Se unió a Forge Records'}]:[]))})),
 ].map(a=>({...a,tl:a.tl||JOIN}));
 const ARTISTS=ALL_ARTISTS.filter(a=>!a.hidden);// everything on the site reads ARTISTS, so hidden artists never show
 // cards on the home page: only the label's artists (repeated to fill the hero)
 const CARDS=[
 {n:'DERECK DFX',img:'img/dereck-dfx.jpg',s:'dereck-dfx'},{n:'AR',img:'img/ar.jpg',s:'ar'},{n:'LA REINA DE TECÁMAC',img:'img/zoe-photo.jpg',s:'zoe-jpr',fit:1},
-{n:'SANTIAGO “CAPITO” CAMPOS',img:'img/santiago-photo.jpg',s:'santiago-campos',fit:1},
+{n:'CAMPOS DE ARTISTA',img:'img/santiago-photo.jpg',s:'santiago-campos',fit:1},
 {n:'VALENTINA GRANCIANO',img:'img/valentina-photo.jpg',s:'valentina-granciano',pos:'center 60%'}];
 // featured collaborators: shown on the home hero too, but smaller and fewer than the 4 core artists
 const GUEST_CARDS=ARTISTS.filter(a=>a.guest).map(a=>({n:a.n.toUpperCase(),img:a.img,s:a.s,g:1,fit:a.fit}));
@@
- {d:'10/2026',t:'Santiago “Capito” Campos se unió a Forge Records',a:'santiago-campos'},
+ {d:'10/2026',t:'Campos de artista se unió a Forge Records',a:'santiago-campos'},
@@
- {d:'19/10/2026',t:'Dereck DFX, Valentina Granciano y Santiago “Capito” Campos anunciaron el álbum “Que Tengan Celos De Lo Que Escribí De Ti”',a:'valentina-granciano'},
+ {d:'19/10/2026',t:'Dereck DFX, Valentina Granciano y Campos de artista anunciaron el álbum “Que Tengan Celos De Lo Que Escribí De Ti”',a:'valentina-granciano'},
 ...ALB_OUT.map(a=>({...a,t:'Dereck DFX — '+a.t,a:'dereck-dfx'}))),a=>({...a,t:'Dereck DFX — '+a.t,a:'dereck-dfx'}));
