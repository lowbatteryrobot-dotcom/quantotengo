# SEO — sitemap e Search Console

Hai già registrato il sito su Google Search Console. Adesso bisogna
dirgli quali pagine hai, con il sitemap.

## Cosa sono questi due file

- **sitemap.xml** — la mappa del sito: elenca le tue pagine (home,
  home, vinted, guida tasse Vinted e privacy) così Google le trova e le indicizza tutte. Cardmarket resta noindex finché non è pronto.
- **robots.txt** — dice ai motori di ricerca cosa possono visitare
  (tutto, in questo caso) e dove trovare il sitemap.

Entrambi vanno nella RADICE del sito, come index.html. Dopo il caricamento
saranno visibili a questi indirizzi:
- https://www.quantotengo.it/sitemap.xml
- https://www.quantotengo.it/robots.txt

## Come inviare il sitemap a Google (2 minuti)

1. Vai su Google Search Console (search.google.com/search-console).
2. Seleziona la proprietà quantotengo.it.
3. Nel menu a sinistra, clicca su "Sitemap".
4. Nel campo "Aggiungi un nuovo sitemap", scrivi: sitemap.xml
5. Clicca "Invia".
6. Lo stato diventerà "Riuscito" entro qualche ora o giorno.

Da quel momento Google inizia a indicizzare le pagine. Comparire nei
risultati di ricerca può richiedere da pochi giorni ad alcune settimane:
è normale per un sito nuovo, abbi pazienza.

## Cosa controllare dopo

In Search Console, nei giorni successivi:
- "Pagine" → mostra quali pagine sono indicizzate.
- "Rendimento" → mostra per quali ricerche compari e quanti clic ricevi.
  (All'inizio sarà vuoto: i dati arrivano col tempo.)

## Suggerimento

Puoi usare lo strumento "Controllo URL" in alto in Search Console:
incolla https://www.quantotengo.it/vinted/ e https://www.quantotengo.it/tasse-vinted/ e clicca "Richiedi
indicizzazione" per accelerare un po' le cose per ogni pagina.
