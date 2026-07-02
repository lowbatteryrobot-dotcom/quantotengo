// ============================================================
// MOTORE CONDIVISO — legge la configurazione del marketplace
// da window.QT_CONFIG (definito nel config.js di ogni cartella).
// Non modificare qui le tariffe: si cambiano nel config.js.
// ============================================================
const CFG = window.QT_CONFIG || {};
const TARIFFE = CFG.tariffe || { chiPagaCommissione: 'acquirente', commissionePercent: 0, commissioneFixed: 0, commissioneCap: null };

// Commissione su un dato prezzo, con eventuale tetto (cap) per articolo.
function getCommissione(prezzo) {
  if (prezzo <= 0) return 0;
  let c = prezzo * (TARIFFE.commissionePercent || 0) + (TARIFFE.commissioneFixed || 0);
  if (TARIFFE.commissioneCap != null) c = Math.min(c, TARIFFE.commissioneCap);
  return c;
}

// La commissione riduce il guadagno del venditore solo se è lui a pagarla.
const commissioneACaricoVenditore = () => TARIFFE.chiPagaCommissione === 'venditore';

// Bump (specifico di alcuni marketplace, es. Vinted). Se non configurato, vale 0.
function getBump(prezzo) {
  const b = CFG.bump;
  if (!b || !b.attivo || prezzo <= 0) return 0;
  if (prezzo <= b.prezzoMin) return b.costoBase;
  return Math.min(b.costoMax, parseFloat((b.costoBase + (prezzo - b.prezzoMin) * b.incrementoPerEuro).toFixed(2)));
}

// ============================================================
// STATE
// ============================================================
let spedOn = false, bumpOn = false, offerteOpen = false;
let offerteAutoOpened = false;
let obSpedOn = false, obBumpOn = false;
let bumpMode = 'auto'; // 'auto' = stima automatica | 'manual' = importo inserito dall'utente
let obBumpMode = 'auto'; // modalità Bump nel Prezzo Obiettivo
let storicoList = [];
let calculationTracked = false;
let obiettivoTracked = false;
let offerteInteractionTracked = false;

// Costo Bump effettivo: stima automatica oppure valore manuale inserito dall'utente.
// Il parametro prezzo serve solo alla stima automatica.
function getBumpEffettivo(prezzo) {
  if (bumpMode === 'manual') return v('inp-bump-manual');
  return getBump(prezzo);
}

function getObBumpEffettivo(prezzo) {
  if (obBumpMode === 'manual') return v('ob-bump-manual');
  return getBump(prezzo);
}

// ============================================================
// PERSISTENZA STORICO (localStorage — solo sul dispositivo)
// ============================================================
const STORICO_KEY = CFG.storicoKey || 'quantotengo_storico';

function loadStorico() {
  try {
    const raw = localStorage.getItem(STORICO_KEY);
    storicoList = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(storicoList)) storicoList = [];
  } catch (e) {
    storicoList = [];
  }
}

function persistStorico() {
  try {
    localStorage.setItem(STORICO_KEY, JSON.stringify(storicoList));
  } catch (e) {
    /* localStorage non disponibile (es. modalità privata): lo storico resta in memoria */
  }
}

const v  = id => parseFloat(document.getElementById(id).value) || 0;
const fmt = n => '\u20AC\u00a0' + n.toFixed(2).replace('.', ',');
const pct = n => n.toFixed(1).replace('.', ',') + '%';
const pctSmart = n => {
  if (!Number.isFinite(n)) return '\u2014';
  const abs = Math.abs(n);
  if (abs >= 1000) return n.toLocaleString('it-IT', { maximumFractionDigits: 0 }) + '%';
  if (abs >= 100) return n.toLocaleString('it-IT', { maximumFractionDigits: 1 }) + '%';
  return pct(n);
};


function trackEvent(name, data) {
  try {
    if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track(name, data || {});
    }
  } catch (e) {}
}

document.addEventListener('click', function(e) {
  const el = e.target.closest('[data-qt-event]');
  if (!el) return;
  trackEvent(el.getAttribute('data-qt-event'), {
    page: CFG.id || 'calcolatore',
    source_path: window.location.pathname,
    target_href: el.getAttribute('href') || ''
  });
});

const fmtPlain = n => '€' + n.toFixed(2).replace('.', ',');

function getMarginFeedback(margine, netto, hasPrice) {
  // Messaggi volutamente brevi: sono feedback orientativi, non consigli finanziari.
  if (!hasPrice) {
    return { level: 'neutral', label: 'Inserisci un prezzo', note: 'Inserisci prezzo e costi.' };
  }
  if (netto < 0) {
    return { level: 'bad', label: 'In perdita', note: 'Il guadagno stimato è negativo.' };
  }
  if (margine >= 60) {
    return { level: 'excellent', label: 'Margine ottimo', note: 'Ottimo: hai molto margine.' };
  }
  if (margine >= 40) {
    return { level: 'good', label: 'Buon margine', note: 'Buono: vendita sostenibile.' };
  }
  if (margine >= 20) {
    return { level: 'medium', label: 'Margine medio', note: 'Medio: valuta gli sconti.' };
  }
  if (margine > 0) {
    return { level: 'low', label: 'Margine basso', note: 'Basso: attenzione ai costi.' };
  }
  return { level: 'bad', label: 'Margine nullo', note: 'Guadagno stimato quasi nullo.' };
}

// ============================================================
// CALCOLO PRINCIPALE
// ============================================================
function calcola() {
  const prezzo = v('inp-prezzo');
  const costo  = v('inp-costo');
  const imb    = v('inp-imballaggio');
  const sped   = spedOn ? v('inp-sped') : 0;
  const bump   = bumpOn && prezzo > 0 ? getBumpEffettivo(prezzo) : 0;

  const comm   = getCommissione(prezzo);
  const totAcq = commissioneACaricoVenditore() ? prezzo : prezzo + comm;
  const commVend = commissioneACaricoVenditore() ? comm : 0;
  const netto  = prezzo - costo - imb - sped - bump - commVend;
  const margine = prezzo > 0 ? (netto / prezzo) * 100 : 0;
  const roi = costo > 0 ? (netto / costo) * 100 : null;

  if (prezzo > 0 && !calculationTracked) {
    calculationTracked = true;
    trackEvent('calculation_started', { marketplace: CFG.id || CFG.nome || 'unknown' });
  }

  const feedback = getMarginFeedback(margine, netto, prezzo > 0);
  const box = document.getElementById('kpi-box');
  box.className = 'result-hero state-' + feedback.level;
  document.getElementById('res-netto').textContent = prezzo === 0 ? '\u20AC 0,00' : fmt(netto);

  const badge = document.getElementById('res-badge');
  if (badge) {
    badge.textContent = feedback.label;
    badge.className = 'margin-feedback-pill margin-' + feedback.level;
  }
  const marginNote = document.getElementById('res-margin-note');
  if (marginNote) marginNote.textContent = feedback.note;
  const marginBox = document.getElementById('margin-feedback');
  if (marginBox) marginBox.className = 'margin-feedback margin-' + feedback.level;

  const marginEl = document.getElementById('res-margine');
  marginEl.textContent = prezzo > 0 ? pct(margine) : '\u2014';
  marginEl.className = 'rh-v margin-value margin-' + feedback.level;

  const roiRow = document.getElementById('roi-row');
  const roiEl = document.getElementById('res-roi');
  if (roiRow && roiEl) {
    const showRoi = prezzo > 0 && costo > 0 && Number.isFinite(roi);
    roiRow.style.display = showRoi ? '' : 'none';
    if (showRoi) {
      roiEl.textContent = pctSmart(roi);
      roiEl.className = 'rh-v roi-value margin-' + feedback.level;
    } else {
      roiEl.textContent = '\u2014';
      roiEl.className = 'rh-v roi-value margin-neutral';
    }
  }

  document.getElementById('res-acq').textContent  = fmt(totAcq);

  document.getElementById('br-prezzo').textContent = fmt(prezzo);
  // La riga commissione cambia secondo chi la paga.
  const commRow = document.getElementById('br-comm-row');
  const commKey = document.getElementById('br-comm-key');
  const commVal = document.getElementById('br-comm');
  if (commissioneACaricoVenditore()) {
    if (commRow) commRow.className = 'br-row';
    if (commKey) commKey.textContent = '\u2212 Commissione' + (CFG.lingua && CFG.lingua.nomeCommissione ? ' ' + CFG.lingua.nomeCommissione : '');
    commVal.textContent = '\u2212\u00a0' + fmt(comm);
    commVal.className = 'br-val neg';
  } else {
    if (commRow) commRow.className = 'br-row br-info';
    if (commKey) commKey.textContent = 'Commissione (a carico dell\u2019acquirente)';
    commVal.textContent = fmt(comm);
    commVal.className = 'br-val';
  }
  show('br-sped-row', sped > 0);  if (sped > 0)  document.getElementById('br-sped').textContent  = '\u2212\u00a0' + fmt(sped);
  show('br-imb-row',  imb > 0);   if (imb > 0)   document.getElementById('br-imb').textContent   = '\u2212\u00a0' + fmt(imb);
  show('br-bump-row', bump > 0);  if (bump > 0)  document.getElementById('br-bump').textContent  = '\u2212\u00a0' + fmt(bump);
  show('br-costo-row',costo > 0); if (costo > 0) document.getElementById('br-costo').textContent = '\u2212\u00a0' + fmt(costo);
  const brNetto = document.getElementById('br-netto');
  brNetto.textContent = fmt(netto);
  brNetto.className = 'br-val ' + (netto >= 0 ? 'pos' : 'neg');

  const bumpTag = document.getElementById('bump-tag');
  if (bumpOn && prezzo > 0) { bumpTag.style.display = ''; bumpTag.textContent = '\u2212 ' + fmt(bump); }
  else { bumpTag.style.display = 'none'; }

  [10, 20, 30].forEach(d => {
    const { n, a, m } = calcolaOfferta(prezzo, d, costo, imb, sped);
    setOfferta(d, n, a, m, prezzo);
  });
  const cd = v('inp-custom');
  if (cd > 0) {
    const { n, a, m } = calcolaOfferta(prezzo, cd, costo, imb, sped);
    document.getElementById('off-custom-disc').textContent = 'Sconto \u2212' + cd + '%';
    setOfferta('custom', n, a, m, prezzo);
  } else {
    setOfferta('custom', null, null, null, 0);
    document.getElementById('off-custom-disc').textContent = 'Sconto —%';
  }

  if (prezzo <= 0 && offerteAutoOpened) {
    offerteAutoOpened = false;
    setOfferteOpen(false, false);
  }
  if (prezzo > 0 && !offerteAutoOpened) {
    offerteAutoOpened = true;
    setOfferteOpen(true, false);
  }

  calcolaInverso();
}

function calcolaOfferta(prezzo, sconto, costo, imb, sped) {
  if (prezzo === 0) return { n: null, a: null, m: null };

  // Nel Simulatore Offerte lo sconto si applica al prezzo di vendita,
  // non al guadagno netto. Esempio: prezzo 50 € con sconto 10% => offerta 45 €.
  const pScontato = prezzo * (1 - sconto / 100);

  // Il Bump resta fisso: se è già stato pagato/stimato sul prezzo di listino,
  // non diminuisce quando l'acquirente propone un'offerta più bassa.
  const bumpOff = bumpOn ? getBumpEffettivo(prezzo) : 0;

  const comm = getCommissione(pScontato);
  const commVend = commissioneACaricoVenditore() ? comm : 0;
  const n = pScontato - costo - imb - sped - bumpOff - commVend;
  const a = commissioneACaricoVenditore() ? pScontato : pScontato + comm;
  const m = pScontato > 0 ? (n / pScontato) * 100 : null;
  return { n, a, m };
}

function setOfferta(key, n, a, margine, prezzo) {
  const netEl = document.getElementById('off-net-' + key);
  const acqEl = document.getElementById('off-acq-' + key);
  const marginEl = document.getElementById('off-margin-' + key);
  if (!netEl || !acqEl) return;

  if (prezzo === 0 || n === null || margine === null || Number.isNaN(margine)) {
    netEl.textContent = '\u20AC\u00a0\u2014';
    acqEl.textContent = '\u20AC\u00a0\u2014';
    netEl.className = 'offer-net';
    if (marginEl) {
      marginEl.textContent = 'Margine —';
      marginEl.className = 'offer-margin margin-neutral';
      marginEl.setAttribute('title', 'Inserisci prezzo e costi.');
    }
    return;
  }

  const feedback = getMarginFeedback(margine, n, true);
  netEl.textContent = fmt(n);
  acqEl.textContent = fmt(a);
  netEl.className = 'offer-net margin-' + feedback.level;
  if (marginEl) {
    marginEl.textContent = 'Margine ' + pct(margine) + ' · ' + feedback.label;
    marginEl.className = 'offer-margin margin-' + feedback.level;
    marginEl.setAttribute('title', feedback.note);
  }
}

// ============================================================
// CALCOLO INVERSO
// ============================================================
function calcolaInverso() {
  const guadagno = v('inp-inv2');
  const costo    = v('ob-costo');
  const imb      = v('ob-imb');
  const sped     = obSpedOn ? v('ob-sped') : 0;

  if ((guadagno > 0 || costo > 0) && !obiettivoTracked) {
    obiettivoTracked = true;
    trackEvent('prezzo_obiettivo_used', { marketplace: CFG.id || CFG.nome || 'unknown' });
  }

  if (guadagno === 0 && costo === 0) {
    document.getElementById('inv-prezzo2').textContent = '\u20AC\u00a0\u2014';
    document.getElementById('inv-sub2').innerHTML = 'Inserisci il guadagno desiderato';
    const bumpTag = document.getElementById('ob-bump-tag');
    if (bumpTag) bumpTag.style.display = 'none';
    return;
  }

  // Prezzo da chiedere per ottenere il guadagno netto desiderato.
  // Se la commissione è a carico del venditore, va inclusa nel prezzo
  // (e dipende dal prezzo, quindi si itera). Lo stesso vale per il Bump.
  let prezzo = guadagno + costo + imb + sped;
  for (let i = 0; i < 40; i++) {
    const bumpEst = obBumpOn ? getObBumpEffettivo(prezzo) : 0;
    const commVend = commissioneACaricoVenditore() ? getCommissione(prezzo) : 0;
    const nuovo = guadagno + costo + imb + sped + bumpEst + commVend;
    if (Math.abs(nuovo - prezzo) < 0.001) break;
    prezzo = nuovo;
  }

  const comm = getCommissione(prezzo);
  const totAcq = commissioneACaricoVenditore() ? prezzo : prezzo + comm;
  const bumpOb = obBumpOn ? getObBumpEffettivo(prezzo) : 0;
  const bumpTag = document.getElementById('ob-bump-tag');
  if (bumpTag) {
    if (obBumpOn) { bumpTag.style.display = ''; bumpTag.textContent = '− ' + fmt(bumpOb); }
    else { bumpTag.style.display = 'none'; }
  }
  document.getElementById('inv-prezzo2').textContent = fmt(prezzo);
  if (commissioneACaricoVenditore()) {
    document.getElementById('inv-sub2').innerHTML = `Commissione: <strong>${fmt(comm)}</strong> (a tuo carico, già inclusa nel calcolo)`;
  } else {
    document.getElementById('inv-sub2').innerHTML = `L'acquirente pagherà: <strong>${fmt(totAcq)}</strong> (di cui ${fmt(comm)} di commissione, a suo carico)`;
  }
}

// ============================================================
// STORICO
// ============================================================
function salvaStorico() {
  const prezzo = v('inp-prezzo');
  if (prezzo === 0) {
    const btn = document.getElementById('btn-salva');
    btn.textContent = '\u26a0\ufe0f Inserisci un prezzo prima';
    setTimeout(() => { btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Salva nello Storico'; }, 2000);
    return;
  }

  const nome  = (document.getElementById('inp-nome').value.trim()) || null;
  const costo = v('inp-costo');
  const imb   = v('inp-imballaggio');
  const sped  = spedOn ? v('inp-sped') : 0;
  const bump  = bumpOn ? getBumpEffettivo(prezzo) : 0;
  const comm  = getCommissione(prezzo);
  const commVend = commissioneACaricoVenditore() ? comm : 0;
  const netto = prezzo - costo - imb - sped - bump - commVend;
  const now   = new Date();

  storicoList.unshift({
    id: Date.now(),
    data: now.toLocaleDateString('it-IT', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }),
    nome, prezzo, costo, netto, comm,
    sped: spedOn ? sped : null,
    bump: bumpOn ? bump : null
  });

  persistStorico();
  trackEvent('storico_saved', { marketplace: CFG.id || CFG.nome || 'unknown' });
  renderStorico();

  const btn = document.getElementById('btn-salva');
  btn.classList.add('saved');
  btn.innerHTML = '\u2713 Salvato!';
  setTimeout(() => {
    btn.classList.remove('saved');
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Salva nello Storico';
  }, 2000);
}

function renderStorico() {
  const empty   = document.getElementById('storico-empty-state');
  const content = document.getElementById('storico-content');
  const list    = document.getElementById('storico-list');

  if (storicoList.length === 0) {
    empty.style.display = '';
    content.style.display = 'none';
    list.innerHTML = '';
    return;
  }
  empty.style.display = 'none';
  content.style.display = '';

  list.innerHTML = storicoList.map(item => {
    const details = [];
    if (item.costo > 0) details.push('Acquisto: ' + fmt(item.costo));
    if (item.sped != null) details.push('Sped.: ' + fmt(item.sped));
    if (item.bump != null) details.push('Bump: ' + fmt(item.bump));

    return `<div class="storico-item">
      <div class="storico-item-left">
        <div class="storico-item-date">${item.data}</div>
        <div class="storico-item-desc">${item.nome ? item.nome : 'Articolo senza nome'}</div>
        <div class="storico-item-detail">Prezzo: ${fmt(item.prezzo)} &middot; Comm.: ${fmt(item.comm)}${details.length ? ' &middot; ' + details.join(' &middot; ') : ''}</div>
      </div>
      <div class="storico-item-right">
        <div class="storico-netto ${item.netto >= 0 ? 'pos' : 'neg'}">${fmt(item.netto)}</div>
        <div class="storico-stima-label">~ stimato</div>
      </div>
      <button class="btn-del" onclick="deleteStorico(${item.id})" aria-label="Elimina">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
      </button>
    </div>`;
  }).join('');
}

function deleteStorico(id) {
  storicoList = storicoList.filter(i => i.id !== id);
  persistStorico();
  renderStorico();
}

let clearArmed = false;
let clearTimer = null;
function clearStorico() {
  const btn = document.getElementById('btn-clear');
  if (!clearArmed) {
    // Primo clic: chiede conferma sul pulsante stesso
    clearArmed = true;
    btn.textContent = 'Sei sicuro? Tocca di nuovo';
    btn.classList.add('armed');
    clearTimer = setTimeout(() => {
      clearArmed = false;
      btn.textContent = 'Cancella tutto';
      btn.classList.remove('armed');
    }, 4000);
    return;
  }
  // Secondo clic: cancella davvero
  clearTimeout(clearTimer);
  clearArmed = false;
  btn.textContent = 'Cancella tutto';
  btn.classList.remove('armed');
  storicoList = [];
  persistStorico();
  renderStorico();
}

// ============================================================
// COPIA DATI CHAT — fix con fallback
// ============================================================
function copiaTesto() {
  const prezzo = v('inp-prezzo');
  if (prezzo === 0) {
    alert('Inserisci prima un prezzo di vendita.');
    return;
  }
  const comm = getCommissione(prezzo);
  const p = prezzo.toFixed(2).replace('.', ',');
  let testo;
  if (commissioneACaricoVenditore()) {
    // Es. Cardmarket: la commissione la paga il venditore, il compratore paga il prezzo.
    testo = `Ciao! Per l'articolo ti chiedo \u20AC${p} (pi\u00f9 le spese di spedizione, che vedi al checkout). Fammi sapere se ti va bene! \ud83d\ude0a`;
  } else {
    // Es. Vinted: la commissione (Protezione Acquisti) la paga l'acquirente e si aggiunge al totale.
    const totAcq = (prezzo + comm).toFixed(2).replace('.', ',');
    testo = `Ciao! Per massima trasparenza: il prezzo dell'articolo \u00e8 \u20AC${p}. ${CFG.nome || ''} aggiunge automaticamente la Protezione Acquisti, quindi il totale sar\u00e0 \u20AC${totAcq} (escluse le spese di spedizione, che scegli tu nell'app). Fammi sapere se ti va bene! \ud83d\ude0a`;
  }

  const btn = document.getElementById('btn-copy');

  const btnHtml = '<span class="btn-copy-main"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copia messaggio per l\'acquirente</span><span class="btn-copy-sub">Mostra in modo chiaro cosa vedr\u00e0 e quanto lo coster\u00e0.</span>';

  const doFallback = () => {
    const ta = document.createElement('textarea');
    ta.value = testo;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try {
      document.execCommand('copy');
      btn.classList.add('copied');
      btn.innerHTML = '<span class="btn-copy-main">\u2713 Messaggio copiato!</span>';
    } catch(e) {
      prompt('Copia il testo qui sotto:', testo);
    }
    document.body.removeChild(ta);
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = btnHtml;
    }, 2200);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(testo).then(() => {
      btn.classList.add('copied');
      btn.innerHTML = '<span class="btn-copy-main">\u2713 Messaggio copiato!</span>';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = btnHtml;
      }, 2200);
    }).catch(doFallback);
  } else {
    doFallback();
  }
}


// ============================================================
// COPIA RISULTATO — testo breve e condivisibile
// ============================================================
function copiaRiepilogo() {
  trackEvent('risultato_copia_click', { marketplace: CFG.id || CFG.nome || 'unknown' });
  const prezzo = v('inp-prezzo');
  if (prezzo === 0) {
    alert('Inserisci prima un prezzo di vendita.');
    return;
  }

  const costo = v('inp-costo');
  const imb = v('inp-imballaggio');
  const sped = spedOn ? v('inp-sped') : 0;
  const bump = bumpOn ? getBumpEffettivo(prezzo) : 0;
  const comm = getCommissione(prezzo);
  const commVend = commissioneACaricoVenditore() ? comm : 0;
  const netto = prezzo - costo - imb - sped - bump - commVend;
  const margine = prezzo > 0 ? (netto / prezzo) * 100 : 0;
  const roi = costo > 0 ? (netto / costo) * 100 : null;
  const feedback = getMarginFeedback(margine, netto, true);
  const costi = costo + imb + sped + bump + commVend;
  const nomeEl = document.getElementById('inp-nome');
  const nome = nomeEl ? (nomeEl.value || '').trim() : '';

  const righe = [];
  if (nome) righe.push('Articolo: ' + nome);
  righe.push('Prezzo di vendita: ' + fmtPlain(prezzo));
  righe.push('Costi inseriti: -' + fmtPlain(costi));
  righe.push('Guadagno netto stimato: ' + fmtPlain(netto));
  righe.push('Margine stimato: ' + pct(margine) + ' · ' + feedback.label);
  if (roi !== null && Number.isFinite(roi)) righe.push('Rendimento sul costo (ROI): ' + pctSmart(roi));
  righe.push('');
  righe.push('Calcolato con QuantoTengo.it — quantotengo.it/vinted/');

  const testo = righe.join('\n');
  const btn = document.getElementById('btn-copy-summary');
  const original = '<span class="btn-copy-main"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 17h8"/><path d="M8 13h8"/><path d="M8 9h4"/><rect x="4" y="3" width="16" height="18" rx="2"/></svg> Copia risultato</span><span class="btn-copy-sub">Utile per appunti, gruppi o per confrontare offerte.</span>';

  const showFeedback = (message) => {
    if (!btn) return;
    btn.classList.add('copied');
    btn.innerHTML = '<span class="btn-copy-main">✓ ' + message + '</span>';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = original;
    }, 2200);
  };

  const copyFallback = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(testo).then(() => {
        showFeedback('Risultato copiato!');
        trackEvent('risultato_copiato', { marketplace: CFG.id || CFG.nome || 'unknown', method: 'clipboard' });
      }).catch(copyTextareaFallback);
    } else {
      copyTextareaFallback();
    }
  };

  const copyTextareaFallback = () => {
    const ta = document.createElement('textarea');
    ta.value = testo;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand('copy'); showFeedback('Risultato copiato!'); trackEvent('risultato_copiato', { marketplace: CFG.id || CFG.nome || 'unknown', method: 'textarea' }); }
    catch(e) { prompt('Copia il testo qui sotto:', testo); }
    document.body.removeChild(ta);
  };

  const isMobile = window.matchMedia && window.matchMedia('(max-width: 700px)').matches;
  if (isMobile && navigator.share) {
    navigator.share({ title: 'Risultato QuantoTengo', text: testo }).then(() => {
      showFeedback('Condiviso!');
      trackEvent('risultato_copiato', { marketplace: CFG.id || CFG.nome || 'unknown', method: 'share' });
    }).catch(copyFallback);
  } else {
    copyFallback();
  }
}

function voteNextPlatform(nome) {
  try { localStorage.setItem('quantotengo_next_platform_vote', nome); } catch(e) {}
  trackEvent('vote_next_platform', { platform: nome });
  const msg = document.getElementById('roadmap-vote-thanks');
  if (msg) msg.textContent = 'Grazie! Terrò conto del voto per ' + nome + '.';
  const row = document.getElementById('roadmap-vote-row');
  if (row) {
    row.querySelectorAll('button').forEach(btn => btn.classList.toggle('selected', btn.textContent.trim() === nome));
  }
}

// ============================================================
// MARKETPLACE — dropdown + "coming soon"
// ============================================================
function toggleMarketMenu(e) {
  e.stopPropagation();
  const sel = document.getElementById('market-select');
  const trigger = document.getElementById('market-trigger');
  const open = sel.classList.toggle('open');
  trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
}
document.addEventListener('click', (e) => {
  const sel = document.getElementById('market-select');
  if (sel && !sel.contains(e.target)) {
    sel.classList.remove('open');
    document.getElementById('market-trigger').setAttribute('aria-expanded', 'false');
  }
});

let marketToastTimer = null;
function comingSoon(nome) {
  const toast = document.getElementById('market-toast');
  toast.textContent = 'Il calcolatore per ' + nome + ' sta arrivando \u2014 resta sintonizzato!';
  toast.classList.add('show');
  clearTimeout(marketToastTimer);
  marketToastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  document.getElementById('market-select').classList.remove('open');
  document.getElementById('market-trigger').setAttribute('aria-expanded', 'false');
}

// ============================================================
// TABS
// ============================================================
function switchTab(name) {
  ['calcolo','obiettivo','storico','faq'].forEach(t => {
    document.getElementById('panel-' + t).classList.toggle('active', t === name);
    const btn = document.getElementById('tab-' + t);
    btn.classList.toggle('active', t === name);
    btn.setAttribute('aria-selected', t === name ? 'true' : 'false');
  });
  if (name === 'storico') renderStorico();
}

// ============================================================
// FAQ
// ============================================================
function toggleFaq(el) {
  const item = el.parentElement;
  item.classList.toggle('open');
}

// ============================================================
// HELPERS
// ============================================================
function show(id, visible) {
  document.getElementById(id).style.display = visible ? '' : 'none';
}

function setOfferteOpen(open, shouldTrack) {
  offerteOpen = open;
  const icon = document.getElementById('icon-offerte');
  const body = document.getElementById('offerte-body');
  const tgl = document.getElementById('offerte-toggle');
  if (icon) icon.classList.toggle('open', offerteOpen);
  if (body) body.style.display = offerteOpen ? '' : 'none';
  if (tgl) tgl.setAttribute('aria-expanded', offerteOpen ? 'true' : 'false');
  if (offerteOpen && shouldTrack) trackEvent('simulatore_offerte_opened', { marketplace: CFG.id || CFG.nome || 'unknown' });
}

function toggleOfferte() {
  setOfferteOpen(!offerteOpen, true);
}

function setupToggle(btnId, fieldId, stateKey, callback) {
  document.getElementById(btnId).addEventListener('click', () => {
    if (stateKey === 'sped') spedOn = !spedOn;
    if (stateKey === 'bump') bumpOn = !bumpOn;
    const on = stateKey === 'sped' ? spedOn : bumpOn;
    document.getElementById(btnId).classList.toggle('on', on);
    if (fieldId) show(fieldId, on);
    document.getElementById('bump-detail').classList.toggle('show', bumpOn);
    callback();
  });
}

setupToggle('toggle-sped', 'field-sped', 'sped', calcola);
setupToggle('toggle-bump', null,         'bump', calcola);

function setBumpMode(mode) {
  bumpMode = mode;
  document.getElementById('bump-mode-auto').classList.toggle('active', mode === 'auto');
  document.getElementById('bump-mode-manual').classList.toggle('active', mode === 'manual');
  document.getElementById('bump-manual-field').style.display = mode === 'manual' ? '' : 'none';
  document.getElementById('bump-auto-note').style.display = mode === 'manual' ? 'none' : '';
  calcola();
}

['inp-prezzo','inp-costo','inp-imballaggio','inp-sped','inp-custom','inp-inv2','inp-bump-manual'].forEach(id => {
  document.getElementById(id).addEventListener('input', calcola);
});

const offerteBodyEl = document.getElementById('offerte-body');
if (offerteBodyEl) {
  const trackOfferteInteraction = () => {
    if (offerteInteractionTracked) return;
    offerteInteractionTracked = true;
    trackEvent('simulatore_offerte_used', { marketplace: CFG.id || CFG.nome || 'unknown' });
  };
  offerteBodyEl.addEventListener('input', trackOfferteInteraction);
  offerteBodyEl.addEventListener('click', trackOfferteInteraction);
}

document.addEventListener('submit', function(e) {
  const form = e.target.closest('[data-alert-form]');
  if (!form) return;
  e.preventDefault();
  trackEvent('alert_form_submit', { source_path: window.location.pathname, marketplace: CFG.id || CFG.nome || 'unknown' });
  submitAlertForm(form);
});

async function submitAlertForm(form) {
  const action = (form.getAttribute('action') || '').trim();
  const isPlaceholder = !action || action === 'FORM_ENDPOINT' || action.indexOf('FORM_ENDPOINT') !== -1;
  const usesFormSubmit = action.indexOf('formsubmit.co') !== -1;
  const note = form.querySelector('.alert-form-note');
  const btn = form.querySelector('button[type="submit"]');
  const originalBtn = btn ? btn.textContent : '';

  form.classList.remove('is-success', 'is-error');

  if (isPlaceholder) {
    form.classList.add('is-error');
    if (note) note.textContent = "Modulo non ancora collegato: configura l'endpoint del provider statico per attivare l'invio.";
    return;
  }

  setHiddenFormValue(form, 'source_path', window.location.pathname);
  setHiddenFormValue(form, 'source_url', window.location.href);
  setHiddenFormValue(form, 'form_name', 'vinted_fee_alert');

  if (!window.fetch || !window.FormData) {
    // Fallback estremo: con un endpoint reale lascia lavorare il provider statico.
    HTMLFormElement.prototype.submit.call(form);
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = 'Invio…'; }
  if (note) note.textContent = 'Invio in corso…';

  try {
    const res = await fetch(action, {
      method: (form.getAttribute('method') || 'POST').toUpperCase(),
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) throw new Error('Form endpoint error');
    form.reset();
    form.classList.add('is-success');
    if (note) note.textContent = 'Grazie! Ti avviseremo solo se cambiano commissioni o Protezione Acquisti.';
    trackEvent('alert_form_success', { source_path: window.location.pathname, marketplace: CFG.id || CFG.nome || 'unknown' });
  } catch (err) {
    form.classList.add('is-error');
    if (note) note.textContent = usesFormSubmit
      ? "Invio non riuscito. Se è il primo test, controlla ciao@quantotengo.it e conferma FormSubmit; poi riprova."
      : "Invio non riuscito. Controlla l'endpoint del form e riprova.";
    trackEvent('alert_form_error', { source_path: window.location.pathname, marketplace: CFG.id || CFG.nome || 'unknown' });
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = originalBtn || 'Avvisami'; }
  }
}

function setHiddenFormValue(form, name, value) {
  let input = form.querySelector('input[name="' + name + '"]');
  if (!input) {
    input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    form.appendChild(input);
  }
  input.value = value;
}

// ============================================================
// THEME TOGGLE
// ============================================================
(function() {
  const btn  = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let dark = root.getAttribute('data-theme') === 'dark';
  root.setAttribute('data-theme', dark ? 'dark' : 'light');
  updateIcon();
  btn.addEventListener('click', () => { dark = !dark; root.setAttribute('data-theme', dark ? 'dark' : 'light'); try{localStorage.setItem('qt_theme', dark ? 'dark' : 'light');}catch(err){} updateIcon(); });
  function updateIcon() {
    btn.innerHTML = dark
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
})();

// ============================================================
// ESPORTA CSV
// ============================================================
function esportaCSV() {
  if (storicoList.length === 0) return;
  const nomeMkt = (CFG.nome || 'Marketplace');
  const headers = ['Data','Articolo','Prezzo (€)','Costo Acquisto (€)','Spedizione (€)','Bump (€)','Commissione ' + nomeMkt + ' (€)','Guadagno Netto Stimato (€)'];
  const esc = (s) => '"' + String(s).replace(/"/g,'""') + '"';
  const num = (n) => (n != null ? Number(n).toFixed(2).replace('.',',') : '0,00');
  const rows = storicoList.map(item => [
    esc(item.data),
    esc(item.nome || 'Articolo senza nome'),
    num(item.prezzo), num(item.costo), num(item.sped), num(item.bump), num(item.comm), num(item.netto)
  ]);
  // "sep=;" dice a Excel (anche in locale italiano) di usare il punto e virgola.
  const csvContent = 'sep=;\r\n' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n');
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0,10);
  a.href = url;
  a.download = 'storico-' + (CFG.id || 'quantotengo') + '-' + dateStr + '.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ============================================================
// ESPORTA EXCEL (.xlsx) — la libreria SheetJS viene caricata
// solo al primo clic, per non appesantire la pagina.
// ============================================================
let xlsxLibPromise = null;
function loadXLSXLib() {
  if (xlsxLibPromise) return xlsxLibPromise;
  xlsxLibPromise = new Promise((resolve, reject) => {
    if (window.XLSX) return resolve(window.XLSX);
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx-js-style/1.2.0/xlsx.bundle.js';
    s.onload = () => window.XLSX ? resolve(window.XLSX) : reject(new Error('XLSX non disponibile'));
    s.onerror = () => reject(new Error('Impossibile caricare la libreria'));
    document.head.appendChild(s);
  });
  return xlsxLibPromise;
}

async function esportaXLSX() {
  if (storicoList.length === 0) return;
  const btn = document.getElementById('btn-export');
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.textContent = 'Preparazione…';

  try {
    const XLSX = await loadXLSXLib();

    const nomeMkt = (CFG.nome || 'Marketplace');
    const idMkt = (CFG.id || 'quantotengo');
    const headers = ['Data','Articolo','Prezzo (€)','Costo acquisto (€)','Spedizione (€)','Bump (€)','Commissione ' + nomeMkt + ' (€)','Guadagno netto (€)'];
    const data = storicoList.map(it => [
      it.data,
      it.nome || 'Articolo senza nome',
      round2(it.prezzo),
      round2(it.costo),
      it.sped != null ? round2(it.sped) : 0,
      it.bump != null ? round2(it.bump) : 0,
      round2(it.comm),
      round2(it.netto)
    ]);

    // Riga totali
    const tot = storicoList.reduce((a, it) => ({
      prezzo: a.prezzo + it.prezzo,
      costo:  a.costo + it.costo,
      sped:   a.sped + (it.sped || 0),
      bump:   a.bump + (it.bump || 0),
      comm:   a.comm + it.comm,
      netto:  a.netto + it.netto
    }), { prezzo:0, costo:0, sped:0, bump:0, comm:0, netto:0 });
    const totalRow = ['TOTALE','', round2(tot.prezzo), round2(tot.costo), round2(tot.sped), round2(tot.bump), round2(tot.comm), round2(tot.netto)];

    const aoa = [headers, ...data, [], totalRow];
    const ws = XLSX.utils.aoa_to_sheet(aoa);

    // Larghezze colonne
    ws['!cols'] = [{wch:18},{wch:24},{wch:11},{wch:15},{wch:13},{wch:11},{wch:14},{wch:17}];

    // Formato valuta e stile celle
    const range = XLSX.utils.decode_range(ws['!ref']);
    const lastRow = range.e.r;
    for (let R = 0; R <= lastRow; R++) {
      for (let C = 0; C <= range.e.c; C++) {
        const addr = XLSX.utils.encode_cell({r:R, c:C});
        const cell = ws[addr];
        if (!cell) continue;
        // Header
        if (R === 0) {
          cell.s = {
            font: { bold:true, color:{rgb:'FFFFFF'}, sz:11 },
            fill: { fgColor:{rgb:'01696F'} },
            alignment: { horizontal:'center', vertical:'center', wrapText:true },
            border: thinBorder('FFFFFF')
          };
        } else if (R === lastRow) {
          // Totali
          cell.s = {
            font: { bold:true, color:{rgb:'01696F'}, sz:11 },
            fill: { fgColor:{rgb:'E0F0F0'} },
            border: thinBorder('B9D9DA')
          };
          if (C >= 2 && typeof cell.v === 'number') cell.z = '#,##0.00 €';
        } else {
          // Celle dati
          const zebra = (R % 2 === 0);
          cell.s = {
            fill: { fgColor:{rgb: zebra ? 'F5F8F8' : 'FFFFFF'} },
            border: thinBorder('E6E6E6'),
            alignment: { vertical:'center' }
          };
          if (C >= 2 && typeof cell.v === 'number') cell.z = '#,##0.00 €';
        }
      }
    }
    ws['!freeze'] = { xSplit:0, ySplit:1 };

    const wb = XLSX.utils.book_new();
    const sheetName = ('Storico ' + nomeMkt).slice(0, 31);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    const dateStr = new Date().toISOString().slice(0,10);
    XLSX.writeFile(wb, 'storico-' + idMkt + '-' + dateStr + '.xlsx');

    btn.innerHTML = '\u2713 Esportato!';
    setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 1800);
  } catch (e) {
    // Fallback: se la libreria non si carica, esporta in CSV
    btn.innerHTML = original;
    btn.disabled = false;
    esportaCSV();
  }
}

function round2(n) { return Math.round(n * 100) / 100; }
function thinBorder(rgb) {
  const s = { style:'thin', color:{rgb} };
  return { top:s, bottom:s, left:s, right:s };
}


function setObBumpMode(mode) {
  obBumpMode = mode === 'manual' ? 'manual' : 'auto';
  const autoBtn = document.getElementById('ob-bump-mode-auto');
  const manualBtn = document.getElementById('ob-bump-mode-manual');
  const manualField = document.getElementById('ob-bump-manual-field');
  const autoNote = document.getElementById('ob-bump-auto-note');
  if (autoBtn) autoBtn.classList.toggle('active', obBumpMode === 'auto');
  if (manualBtn) manualBtn.classList.toggle('active', obBumpMode === 'manual');
  if (manualField) manualField.style.display = obBumpMode === 'manual' ? '' : 'none';
  if (autoNote) autoNote.style.display = obBumpMode === 'manual' ? 'none' : '';
  calcolaInverso();
}

// OBIETTIVO TAB TOGGLES
(function() {
  document.getElementById('ob-toggle-sped').addEventListener('click', () => {
    obSpedOn = !obSpedOn;
    document.getElementById('ob-toggle-sped').classList.toggle('on', obSpedOn);
    document.getElementById('ob-field-sped').style.display = obSpedOn ? '' : 'none';
    calcolaInverso();
  });
  document.getElementById('ob-toggle-bump').addEventListener('click', () => {
    obBumpOn = !obBumpOn;
    document.getElementById('ob-toggle-bump').classList.toggle('on', obBumpOn);
    const detail = document.getElementById('ob-bump-detail');
    if (detail) detail.classList.toggle('show', obBumpOn);
    calcolaInverso();
  });
  ['inp-inv2','ob-costo','ob-imb','ob-sped','ob-bump-manual'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calcolaInverso);
  });
})();

// ============================================================
// APPLICA LA CONFIGURAZIONE DEL MARKETPLACE (colore, lingua)
// ============================================================
function applyConfig() {
  const root = document.documentElement;
  if (CFG.accent)      root.style.setProperty('--accent', CFG.accent);
  if (CFG.accentName)  root.style.setProperty('--accent-name', CFG.accentName);
  if (CFG.accentLight) root.style.setProperty('--primary-light', CFG.accentLight);

  const setText = (id, txt) => { const el = document.getElementById(id); if (el && txt != null) el.textContent = txt; };
  const setHTML = (id, html) => { const el = document.getElementById(id); if (el && html != null) el.innerHTML = html; };

  if (CFG.lingua) {
    setText('page-h1', CFG.lingua.h1);
    setHTML('page-intro-text', CFG.lingua.intro);
  }
  // Nome del marketplace nel selettore in alto
  setText('market-trigger-name', CFG.nome);
}

// INIT
applyConfig();
loadStorico();
renderStorico();
calcola();
