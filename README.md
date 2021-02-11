# FrontEnd-EmporioLambda-POC

## Requisiti
Serve l'ultima versione di Node.js, che vi installerà il comando `npm` e l'installazione di **vercel** per il download delle variabili d'ambiente che serviranno per interfacciarsi in locale con lo **stage local** di AWS

## Installazione
 ### Cloning della repository e installazione dipendenze:

```
git clone https://github.com/OmicronSwe/FrontEnd-EmporioLambda.git
```
spostarsi dentro la cartella e lanciare `npm install` che installerà le dipendenze

### Installazione vercel

1. Lanciare il comando `npm i -g vercel`
2. Lanciare il comando `vercel env pull`, il quale vi chiederà le credenziali di vercel che si trovano su discord nel canale *#resources*. 
3. Lanciare il comando `vercel link`. Probabilmente vi chiedrà alcune configurazioni, in questo caso guardate la sezione [Project Linking](https://vercel.com/docs/cli).  

- `Which scope do you want to deploy to -> omicronswe`
- `What’s the name of your existing project? -> front-end-emporio-lambda`

4. Ridare il comando `vercel env pull`. Questo comando scaricherà le variabili d'ambiente.

Dopo ciò vercel non dovrebbe più servire perchè il deploy avviene tramite github, e vercel serve solo per scaricare queste variabili.

## Sviluppo
E' presente un esempio di sviluppo, il quale è suddiviso in cartelle quali:
- **components**: componenti utilizzati dalle pagine web create
- **interfaces**: interfacce per lo sviluppo del sito
- **lib**: elementi di supporto per lo sviluppo delle pagine web (importante è l'elemento `fetcher` che tramite il nome di una funzione AWS, richiami l'API di tale funzione e ritorna il risultato)
- **pages**: pagine che verranno visualizzate all'interno del sito
- **public**: immagini o elementi estetici del sito
- **styles**: css del sito
- **utils**: elementi utili per lo sviluppo (in questo caso dati dummy per l'esempio proposto)

L'esempio riguarda la creazione di pagine semplici. **Importante l'esempio della chiamata dell'API della funzione *hello* nel nostro back-end**

#### ⚠️ Questa struttura è da prendere come esempio, non è vincolante, ma serve comunque un ordine per tutto, sul quale dobbiamo discutere.

## Analisi statica
Viene fornita l'analisi statica di Prettier e ESLint. I controlli effettuati sono descritti nei file `.eslintrc.js` e `.prettierrc.js`
```
npm run lint           #controlla lo stile del codice tramite lint e prettier, fixando gli errori dove possibile
npm run checkWithLint   #controlla lo stile del codice tramite lint e prettier
```

Nelle *Github Actions* viene utilizzato `npm run checkWithLint`, senza il *fix* (per evitare correzioni automatiche non volute o nocive), quindi potrebbe trovare errori e rifiutare la build. Molte volte per fixare questi errori si può lanciare `npm run lint` da locale oppure fixare gli errori a mano.

## Visualizzazione sito
Per visualizzare il sito creato, in locale, si deve lanciare il comando `npm run dev` il quale hosterà il sito all'indirizzo http://localhost:3000/. Per meaggiori info vedere la documentazione [Next.js](https://nextjs.org/docs).

## Deploy
Useremo 3 enviroment per lo sviluppo:

- `production` : Tutto ciò che viene pushato in `master`, prodotto finito. Richiamerà le API dello stage `staging` di AWS 
- `preview` : Tutto ciò che viene pushato nel branch `develop`, prodotto che può essere testato liberamente dagli sviluppatori. Richiamerà le API dello stage `test` di AWS
- `local` : Tutto ciò che viene utilizzato localmente, quindi tramite il comando `npm run dev`. Richiamerà le API dello stage `local` di AWS

L'indirizzo del sito del deploy si trova nella descrizione della repository (per il sito in **production**), oppure come commento dopo il deploy da parte delle *GitHub Actions* (click sul simbolo del messaggio (💬) a sinistra della spunta verde -> andare in fondo alla pagina) 

#### ⚠️ Non si deve mai deployare in locale da vercel (tramite i comandi di vercel), perchè il deploy comunque avverrebbe in **preview** o **production**. Purtroppo esistono solo questi due stage (preview e production) per il deploy online del sito.
