# Come pubblicare QuantoTengo su GitHub Pages

## ⚠️ La regola d'oro

I file devono stare nella **RADICE** del repository, NON dentro una
sottocartella. Questa è la struttura corretta:

```
tuo-repository/
├── index.html          ← la home
├── assets/
│   ├── style.css
│   └── engine.js
├── vinted/
│   ├── index.html
│   └── config.js        ← IMPORTANTE: senza questo la calcolatrice non funziona!
├── cardmarket/
│   ├── index.html
│   └── config.js        ← IMPORTANTE: senza questo la calcolatrice non funziona!
├── LEGGIMI.md
└── COME-TESTARE.md
```

❌ SBAGLIATO: tuo-repository/site/index.html  (dentro una sottocartella)
✅ GIUSTO:    tuo-repository/index.html        (nella radice)

Se metti tutto dentro "site/", gli indirizzi diventano
quantotengo.it/site/vinted/ e i collegamenti si rompono.

## Il file config.js è essenziale

Ogni calcolatrice ha DUE file: index.html E config.js.
- index.html = la pagina
- config.js = le tariffe, i colori, i testi di quel marketplace

Se carichi solo index.html e dimentichi config.js, la calcolatrice
si apre ma NON calcola (è quello che era successo prima).
Controlla sempre che in vinted/ e cardmarket/ ci siano ENTRAMBI i file.

## Come caricare (dalla pagina web di GitHub, senza terminale)

1. Scompatta il file quantotengo-sito.zip che ti ho dato.
   Dentro troverai già la struttura corretta (index.html, assets/,
   vinted/, cardmarket/).
2. Vai sul tuo repository su github.com.
3. Clicca "Add file" → "Upload files".
4. Trascina TUTTO il contenuto della cartella scompattata
   (i file e le cartelle, non la cartella che li contiene).
5. GitHub mantiene la struttura delle cartelle. Clicca "Commit changes".
6. Vai su Settings → Pages → Source: "main", cartella "/ (root)".
7. Dopo qualche minuto il sito è online.

## Come controllare che funzioni

Apri quantotengo.it/vinted/ e premi F12 (apre la console del browser).
- Se NON vedi righe rosse di errore → tutto ok, il Bump funziona.
- Se vedi "engine.js 404" o "config is not defined" → i file sono
  nella cartella sbagliata. Ricontrolla che siano nella radice.


## Dominio www / non-www

Per evitare contenuti duplicati in Google, usa una sola versione pubblica del dominio.
La versione consigliata per QuantoTengo.it è:

```
https://www.quantotengo.it/
```

Controlla nel pannello del dominio/hosting che `https://quantotengo.it/` rediriga
in modo permanente verso `https://www.quantotengo.it/` (redirect 301 o 308).
Canonical, sitemap e robots.txt sono già impostati sulla versione `www`.

## Aggiornare il sito in futuro

Quando ti do file nuovi, ricarichi allo stesso modo (Upload files).
GitHub sostituisce i file con lo stesso nome. Carica sempre TUTTO
per sicurezza, così non rischi di lasciare versioni vecchie.


## Pagina informativa Tasse Vinted

È stata aggiunta `/tasse-vinted/` con scopo informativo generale. La pagina distingue tra commissioni della piattaforma, Protezione Acquisti, DAC7 e possibili obblighi fiscali. Non presenta la calcolatrice come strumento fiscale e contiene disclaimer visibili. Dopo il deploy, invia anche questa URL a Google Search Console/Bing e verifica che il link nel sitemap sia raggiungibile.


## Modulo email / Avvisami

I moduli nel footer di `/vinted/` e `/tasse-vinted/` usano un endpoint statico FormSubmit:

`https://formsubmit.co/ajax/ciao@quantotengo.it`

Al primo invio FormSubmit può chiedere una conferma via email a `ciao@quantotengo.it`. Dopo la conferma, gli invii successivi arrivano a quell'indirizzo. Se preferisci Formspree, Formspark, Basin o un altro provider, sostituisci solo l'attributo `action` dei due form mantenendo `method="POST"` e `data-alert-form`.
