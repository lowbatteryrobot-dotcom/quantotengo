# Come testare il sito in locale (senza pubblicarlo)

Il sito ora è una cartella con più file collegati tra loro. Per questo
non basta più fare doppio clic sull'HTML: il browser blocca il
caricamento dei file vicini (CSS, JavaScript) per sicurezza. Serve un
piccolo "server locale". Ecco tre modi, dal più facile al più tecnico.

────────────────────────────────────────────────────────
OPZIONE 1 — VS Code + Live Server (CONSIGLIATA, la più facile)
────────────────────────────────────────────────────────

1. Installa Visual Studio Code (gratis): https://code.visualstudio.com
2. Aprilo, vai su Estensioni (icona dei quadratini a sinistra),
   cerca "Live Server" e installalo.
3. File → Apri cartella → seleziona la cartella "site".
4. Tasto destro su "index.html" → "Open with Live Server".
5. Si apre il browser con il sito funzionante. Modifica un file,
   salva, e la pagina si aggiorna da sola.

────────────────────────────────────────────────────────
OPZIONE 2 — Un comando nel terminale (se hai Python)
────────────────────────────────────────────────────────

Mac e Linux di solito hanno già Python. Su Windows si installa da
python.org (spunta "Add to PATH" durante l'installazione).

1. Apri il Terminale.
2. Spostati nella cartella "site". Esempio:
      cd ~/Downloads/site
   (trascina la cartella nel terminale dopo "cd " per avere il percorso)
3. Avvia il server:
      python3 -m http.server 8000
   (su Windows a volte è solo "python" invece di "python3")
4. Apri il browser e vai su:
      http://localhost:8000
5. Per fermarlo: torna al terminale e premi Ctrl + C.

Le URL durante il test saranno:
   http://localhost:8000/            → homepage
   http://localhost:8000/vinted/     → calcolatore Vinted
   http://localhost:8000/cardmarket/ → calcolatore Cardmarket

────────────────────────────────────────────────────────
OPZIONE 3 — Pubblicare su GitHub Pages (è gratis e veloce)
────────────────────────────────────────────────────────

Visto che la destinazione finale è GitHub Pages, puoi anche testare
direttamente lì. Ti dà un link reale in pochi minuti.

1. Crea un account su github.com (gratis).
2. Crea un nuovo repository (es. "quantotengo").
3. Carica il contenuto della cartella "site" nel repository
   (i file vanno nella radice del repository, non dentro una
   sottocartella "site").
4. Vai su Settings → Pages → imposta la Source su "main" e la
   cartella su "/ (root)".
5. Dopo qualche minuto il sito sarà online su un indirizzo tipo
   https://tuonome.github.io/quantotengo/
6. Quando colleghi il dominio quantotengo.it (sempre da Settings →
   Pages → Custom domain), il sito risponderà lì.

NOTA: se carichi i file dentro una sottocartella invece che nella
radice, gli indirizzi cambiano e i collegamenti "/vinted/" non
funzionano. Tieni i file nella radice del repository.

────────────────────────────────────────────────────────
Perché prima funzionava col doppio clic e ora no?
────────────────────────────────────────────────────────

Prima era UN solo file HTML con tutto dentro: si apriva da solo.
Ora è una cartella di file collegati (per poterli condividere tra le
calcolatrici), e i browser bloccano questi collegamenti quando apri
col protocollo "file://". Il server locale risolve, perché serve i
file via "http://" come farebbe un sito vero. È normale e standard
per qualsiasi sito multi-file.
