// Forge Records artist data (shared by index and artist pages)
const JOIN=[{y:2026,items:[{d:'10/2026',h:'Se unió a Forge Records'}]}];
const ARTISTS=[
{s:'dereck-dfx',n:'Dereck DFX',img:'img/dereck-dfx.jpg',tl:[{y:2026,items:[{d:'10/2026',h:'Anunció su álbum “Las Reinas del Perreo”'},{d:'10/2026',t:'Sencillo “Moteles”'},{d:'10/2026',t:'Sencillo “Always”'},{d:'10/2026',t:'Se unió a Forge Records'}]}]},
{s:'ar',n:'AR',img:'img/c6.jpg'},
{s:'zoe-jpr',n:'Zoe J. P. R.',img:'img/c7.jpg'},
{s:'nox-del-sur',n:'Nox del Sur',img:'img/c1.jpg'},
{s:'los-forjados',n:'Los Forjados',img:'img/c2.jpg'},
{s:'luna-croma',n:'Luna Croma',img:'img/c3.jpg'},
{s:'solenne',n:'Solenne',img:'img/c5.jpg'},
{s:'valkyra',n:'Valkyra',img:'img/c3.jpg'},
{s:'kai-vertigo',n:'Kai Vertigo',img:'img/c1.jpg'},
{s:'rey-hierro',n:'Rey Hierro',img:'img/c2.jpg'},
{s:'mira-saint',n:'Mira Saint',img:'img/c5.jpg'},
{s:'dj-obsidiana',n:'DJ Obsidiana',img:'img/c1.jpg'}
].map(a=>({...a,tl:a.tl||JOIN}));
// cards on the home page: artists plus Dereck DFX's releases (they open his page)
const CARDS=[
{n:'DERECK DFX',img:'img/dereck-dfx.jpg',s:'dereck-dfx'},{n:'NOX DEL SUR',img:'img/c1.jpg',s:'nox-del-sur'},{n:'LAS REINAS DEL PERREO',img:'img/c4.jpg',s:'dereck-dfx'},
{n:'AR',img:'img/c6.jpg',s:'ar'},{n:'LUNA CROMA',img:'img/c3.jpg',s:'luna-croma'},{n:'ZOE J. P. R.',img:'img/c7.jpg',s:'zoe-jpr'},
{n:'LOS FORJADOS',img:'img/c2.jpg',s:'los-forjados'},{n:'MOTELES',img:'img/c4.jpg',s:'dereck-dfx'},{n:'SOLENNE',img:'img/c5.jpg',s:'solenne'},
{n:'ALWAYS',img:'img/c5.jpg',s:'dereck-dfx'},{n:'VALKYRA',img:'img/c3.jpg',s:'valkyra'},{n:'KAI VERTIGO',img:'img/c1.jpg',s:'kai-vertigo'},
{n:'REY HIERRO',img:'img/c2.jpg',s:'rey-hierro'},{n:'MIRA SAINT',img:'img/c5.jpg',s:'mira-saint'},{n:'DJ OBSIDIANA',img:'img/c1.jpg',s:'dj-obsidiana'}];

// label timeline (only what we know: founded 2026, the October 2026 announcements and signings)
const LABEL_TL=[{y:2026,items:[
{d:'10/2026',h:'Dereck DFX anunció su álbum “Las Reinas del Perreo”',a:'dereck-dfx'},
{d:'10/2026',t:'Dereck DFX — sencillo “Moteles”',a:'dereck-dfx'},
{d:'10/2026',t:'Dereck DFX — sencillo “Always”',a:'dereck-dfx'},
{d:'10/2026',t:'AR se unió a Forge Records',a:'ar'},
{d:'10/2026',t:'Zoe J. P. R. se unió a Forge Records',a:'zoe-jpr'},
{d:'10/2026',t:'Dereck DFX se unió a Forge Records',a:'dereck-dfx'},
{d:'2026',t:'Fundación de Forge Records'}]}];
