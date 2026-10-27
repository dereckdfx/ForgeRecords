const FOUND={d:'27/07/2026',t:'Forge Records fue fundada'};
const SALE={d:'07/08/2026',h:'Alice Whitman compró Forge Records y pasó a ser parte de Starlight Records',q:'Forge Records, under exclusive license from Starlight Records, a division of Alice Whitman.'};
const JOIN=TL(FOUND,{...SALE},{d:'10/2026',h:'Se unió a Forge Records'});
const TL=(...items)=>[{y:'2026',items:items.filter(Boolean).map(item=>({d:item.d||'',h:item.h||'',t:item.t||'',n:item.n||'',q:item.q||'',a:item.a||'',cv:item.cv||''}))}];
const SOON=(g,f=x=>x)=>[{y:'Próximamente',items:[]},...g];
const VG_ALBUM={d:'19/10/2026',h:'Anunció el álbum “Que Tengan Celos De Lo Que Escribí De Ti”',n:'De Dereck DFX, Valentina Granciano y Campos de artista'};
const ALL_ARTISTS=[
  {s:'dereck-dfx',n:'Dereck DFX',img:'img/dereck-dfx.jpg',tagline:'Y Esta Mierda Apenas Empieza',taglineBy:'Dereck DFX',tl:TL({d:'07/2026',h:'Se unió a Forge Records'})},
  {s:'ar',n:'AR',img:'img/ar.jpg',tl:TL({d:'03/08/2026',h:'Se unió a Forge Records'})},
  {s:'zoe-jpr',n:'La Reina de Tecámac',img:'img/zoe-photo.jpg',fit:1,tl:TL({d:'10/2026',h:'Se unió a Forge Records'})},
  {s:'santiago-campos',n:'Campos de artista',img:'img/santiago-photo.jpg',fit:1,tl:TL({d:'10/2026',h:'Se unió a Forge Records'},{...VG_ALBUM})},
  {s:'valentina-granciano',n:'Valentina Granciano',img:'img/valentina-photo.jpg',pos:'center 60%',tl:TL({d:'19/10/2026',h:'Se unió a Forge Records'},{...VG_ALBUM})}
].map(a=>({...a,tl:a.tl||JOIN}));
const ARTISTS=ALL_ARTISTS.filter(a=>!a.hidden);
const CARDS=[
  {n:'DERECK DFX',img:'img/dereck-dfx.jpg',s:'dereck-dfx'},
  {n:'AR',img:'img/ar.jpg',s:'ar'},
  {n:'LA REINA DE TECÁMAC',img:'img/zoe-photo.jpg',s:'zoe-jpr',fit:1},
  {n:'CAMPOS DE ARTISTA',img:'img/santiago-photo.jpg',s:'santiago-campos',fit:1},
  {n:'VALENTINA GRANCIANO',img:'img/valentina-photo.jpg',s:'valentina-granciano',pos:'center 60%'}
];
const GUEST_CARDS=[];
const LABEL_TL=[
  {y:'2026',items:[
    {d:'10/2026',t:'Campos de artista se unió a Forge Records',a:'santiago-campos'},
    {d:'19/10/2026',t:'Dereck DFX, Valentina Granciano y Campos de artista anunciaron el álbum “Que Tengan Celos De Lo Que Escribí De Ti”',a:'valentina-granciano'}
  ]}
];
