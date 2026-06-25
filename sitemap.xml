# QuantoTengo — struttura del progetto

Questo non è più un singolo file HTML, ma un piccolo ecosistema con un
"motore" condiviso e una pagina per ogni marketplace. Gira su GitHub Pages
senza backend e senza build.

## Struttura delle cartelle

```
site/
├─ assets/
│  ├─ style.css      ← il design, il dark mode, tutto il CSS (condiviso)
│  └─ engine.js      ← la logica: calcolo, storico, dropdown (condivisa)
│
├─ vinted/
│  ├─ index.html     ← la pagina (carica style.css + config.js + engine.js)
│  └─ config.js      ← SOLO ciò che è specifico di Vinted (tariffe, lingua, colore)
│
├─ cardmarket/       ← (in costruzione) stessa struttura di vinted/
│
└─ index.html        ← (in costruzione) homepage hub con i link a ogni calcolatrice
```

## L'idea

Tutto ciò che è uguale tra le calcolatrici vive in `assets/` (motore).
Tutto ciò che è diverso vive nel `config.js` di ogni marketplace.

- Per **aggiornare una tariffa** di Vinted → modifica `vinted/config.js`.
- Per **cambiare il design** di tutte le calcolatrici → modifica `assets/style.css`.
- Per **aggiungere un marketplace** → copia la cartella `vinted/`, rinominala,
  e modifica il suo `config.js`. Il motore fa il resto.

## Stato attuale

- [x] Struttura cartelle
- [x] `assets/style.css` estratto
- [x] `assets/engine.js` estratto (da generalizzare)
- [x] `vinted/config.js` creato
- [ ] motore generalizzato per leggere config.js
- [ ] `vinted/index.html` che carica i tre file
- [ ] cartella `cardmarket/`
- [ ] homepage hub

## Come pubblicare su GitHub Pages

Carica la cartella `site/` nel repository. Imposta GitHub Pages sulla
cartella. Le URL saranno:
- `quantotengo.it/` → homepage
- `quantotengo.it/vinted/` → calcolatrice Vinted
- `quantotengo.it/cardmarket/` → calcolatrice Cardmarket
