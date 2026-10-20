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

function forgeMail(em){var s='Quiero recibir el boletín de Forge Records',b='Hola Forge Records,\n\nQuiero suscribirme al boletín y recibir notificaciones por email de nuevos lanzamientos, artistas y noticias.\n\nMi correo: '+(em||'')+'\n\n¡Gracias!';location.href='mailto:email@forgerecordsmusicgroup.com?subject='+encodeURIComponent(s)+'&body='+encodeURIComponent(b)}
