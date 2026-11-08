(() => {
  'use strict';
  const languages = ['es', 'en', 'pt', 'fr'];
  const names = ['Español', 'English', 'Português', 'Français'];
  const preferred = (navigator.languages || [navigator.language]).map(tag => tag.split('-')[0].toLowerCase());
  const fallback = preferred.find(lang => languages.includes(lang)) || 'en';
  const phrases = new Map(forgePhrases.flatMap(row => row.map(key => [key, row])));
  phrases.set('1 year', phrases.get('1 Year'));
  const originals = new WeakMap();
  const controls = [];
  const read = (storage, key) => { try { return window[storage].getItem(key); } catch { return null; } };
  const save = (storage, key, value) => { try { window[storage].setItem(key, value); } catch {} };
  let choice = read('localStorage', 'forge.language');
  let country = read('sessionStorage', 'forge.country');
  let active;
  function autoLanguage() {
    if (!/^[A-Z]{2}$/.test(country || '')) return fallback;
    const regional = {CA:['en','fr'], BE:['nl','fr','de'], CH:['de','fr','it'], LU:['lb','fr','de'], CM:['fr','en'], GQ:['es','fr','pt']};
    const candidates = regional[country];
    if (candidates) return preferred.find(lang => languages.includes(lang) && candidates.includes(lang)) || candidates.find(lang => languages.includes(lang)) || fallback;
    const lang = new Intl.Locale('und-' + country).maximize().language;
    return languages.includes(lang) ? lang : fallback;
  }
  const match = (es,en,pt,fr) => [es,en,pt,fr][languages.indexOf(active)];
  const ordinal = word => {
    const index = typeof ORD === 'undefined' ? -1 : ORD.indexOf(word.toLowerCase());
    const n = index + 1;
    if (!n) return word;
    const suffix = (n % 100 < 11 || n % 100 > 13) && ['th','st','nd','rd'][n % 10] || 'th';
    return match(word,n+suffix,n+'º',n+(n===1?'er':'e'));
  };
  function timeline(value) {
    if (active === 'es') return value;
    return value
      .replace(/^Su (.+?) lanzamiento/, (_,word) => ordinal(word)+' '+match('','release','lançamento','disque'))
      .replace(/^(.+?) lanzamiento de Dereck DFX bajo el sello: /, (_,word) => ordinal(word)+' '+match('','Dereck DFX release on ','lançamento de Dereck DFX pela ','disque de Dereck DFX chez '))
      .replace(/ se unió a Forge Records$/,match('',' joined Forge Records',' entrou para a Forge Records',' a rejoint Forge Records'))
      .replace(/anunciaron el álbum/,match('','announced the album','anunciaram o álbum','ont annoncé l’album'))
      .replace(/anunció su álbum/i,match('','announced the album','anunciou o álbum','a annoncé l’album'))
      .replace(/^Anunció el álbum/,match('','Announced the album','Anunciou o álbum','A annoncé l’album'))
      .replace(/^(Aparece en el álbum|Aparecerá en el álbum) (.+) de Dereck DFX$/, (_,verb,title) => (verb.startsWith('Aparecerá') ? match('','Will appear on','Participará de','Figurera sur') : match('','Appears on','Participa de','Figure sur'))+' '+title+match('',' by Dereck DFX',' de Dereck DFX',' de Dereck DFX'))
      .replace(/^(Álbum · )?(Alrededor de )?(\d+) canciones/,(_,album,approx,num) => (album?'Album · ':'')+(approx?match('','about ','cerca de ','environ '):'')+num+' '+match('','tracks','faixas','titres'))
      .replace(/(^| · )Con /g,'$1'+match('','With ','Com ','Avec '))
      .replace(/^De Dereck DFX/,match('','By Dereck DFX','De Dereck DFX','De Dereck DFX'))
      .replace(/ · Explícito/g,' · '+match('','Explicit','Explícito','Explicite'))
      .replace(/Inspirado en /g,match('','Inspired by ','Inspirado em ','Inspiré de '))
      .replace(/(^| — )Primer EP /,'$1'+match('','First EP ','Primeiro EP ','Premier EP '))
      .replace(/(^| — )[Ss]encillo “/,'$1'+match('','Single “','Single “','Single “'))
      .replace(/Visualizer de “/,match('','Visualizer for “','Visualizer de “','Visualizer de “'));
  }
  function translate(node, key, current, write) {
    if (!current || !current.trim()) return;
    const memo = originals.get(node) || {};
    const previous = memo[key];
    const source = previous && previous.output === current ? previous.source : current;
    const token = source.trim();
    const row = phrases.get(token);
    const owner = node.nodeType === 3 ? node.parentElement : node;
    if (!row && !owner?.closest('.ev')) return;
    const text = row ? row[languages.indexOf(active)] : timeline(token);
    const output = source.replace(token, () => text);
    if (current !== output) write(output);
    memo[key] = {source,output}; originals.set(node,memo);
  }
  function visit(node) {
    if (node.nodeType === 3) {
      translate(node,'text',node.data, value => { node.data = value; });
      return;
    }
    if (node.nodeType !== 1 || node.matches('script,style,select,svg,[translate="no"]')) return;
    for (const key of ['aria-label','placeholder','alt']) translate(node,key,node.getAttribute(key), value => node.setAttribute(key,value));
    node.childNodes.forEach(visit);
  }
  function apply() {
    active = languages.includes(choice) ? choice : autoLanguage();
    document.documentElement.lang = active;
    visit(document.querySelector('title'));
    visit(document.body);
    for (const select of controls) {
      select.value = languages.includes(choice) ? choice : 'auto';
      select.setAttribute('aria-label', phrases.get('Language')[languages.indexOf(active)]);
      select.options[0].text = phrases.get('Automatic')[languages.indexOf(active)];
    }
  }
  document.querySelectorAll('[data-language]').forEach(host => {
    const select = document.createElement('select');
    select.className = 'language-choice';
    select.add(new Option('Automatic','auto'));
    languages.forEach((lang,i) => select.add(new Option(names[i],lang)));
    select.onchange = () => { choice = select.value; save('localStorage','forge.language',choice); apply(); detect(); };
    controls.push(select);
    host.append(select);
  });
  apply();
  const observer = new MutationObserver(records => {
    for (const change of records) {
      if (change.target.parentElement?.closest('select,script,style,svg,[translate="no"]') || change.target.closest?.('select')) continue;
      if (change.type === 'childList') change.addedNodes.forEach(visit);
      else if (change.type === 'attributes') translate(change.target, change.attributeName, change.target.getAttribute(change.attributeName), value => change.target.setAttribute(change.attributeName,value));
      else visit(change.target);
    }
  });
  observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','placeholder','alt']});
  let pending = false;
  async function detect() {
    if (country || pending || languages.includes(choice)) return;
    pending = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(),2500);
    try {
      const response = await fetch('/api/country',{signal:controller.signal,credentials:'omit',referrerPolicy:'no-referrer'});
      if (!response.ok) return;
      const data = await response.json();
      if (typeof data.country === 'string' && /^[A-Z]{2}$/.test(data.country)) {
        country = data.country;
        save('sessionStorage','forge.country',country);
        apply();
      }
    } catch {} finally { clearTimeout(timeout); pending = false; }
  }
  detect();
})();
