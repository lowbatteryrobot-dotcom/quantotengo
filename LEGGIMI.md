# QuantoTengo — struttura del progetto

Ecosistema con un "motore" condiviso e una pagina per ogni marketplace.
Gira su GitHub Pages senza backend e senza build.

## Struttura

```
site/
├─ index.html        ← homepage hub (i link a ogni calcolatrice)
├─ assets/
│  ├─ style.css      ← design, dark mode, tutto il CSS (condiviso)
│  └─ engine.js      ← logica: calcolo, storico, dropdown (condivisa, generica)
├─ vinted/
│  ├─ index.html     ← la pagina (carica style.css + config.js + engine.js)
│  └─ config.js      ← SOLO ciò che è specifico di Vinted
└─ cardmarket/
   ├─ index.html
   └─ config.js      ← commissione del venditore, tetto 100€, lingua TCG
```

## L'idea

Tutto ciò che è uguale tra le calcolatrici vive in `assets/` (il motore).
Tutto ciò che è diverso vive nel `config.js` di ogni marketplace:
tariffe, lingua, colore, campi.

- Aggiornare una tariffa → modifica il `config.js` di quel marketplace.
- Cambiare il design di TUTTE → modifica `assets/style.css`.
- Aggiungere un marketplace → copia una cartella, cambia il `config.js`.

Il motore gestisce automaticamente: commissione a carico dell'acquirente
(Vinted) O del venditore (Cardmarket), tetto per articolo, Bump, livelli.

## Stato

- [x] Motore generico (engine.js legge config.js)
- [x] Vinted refattorizzato sul motore — identico all'originale (testato)
- [x] Cardmarket — commissione venditore + tetto 100€ (testato)
- [x] Homepage hub
- [ ] Cardmarket: selettore livello (Private/Pro/Power) e FAQ proprie
- [ ] Subito, eBay

## Pubblicare su GitHub Pages

Carica la cartella `site/` nel repository, imposta Pages sulla cartella.
URL: `quantotengo.it/`, `quantotengo.it/vinted/`, `quantotengo.it/cardmarket/`
