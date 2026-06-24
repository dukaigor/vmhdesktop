# Valery Mystic Hair — App Desktop

Apre il **gestionale** (vmhcrm.app) a tutto schermo. Quando entri nella pagina
**WhatsApp** del menu, lì compare **WhatsApp Web vero** (web.whatsapp.com) — con
tutto lo storico, foto, vocali e invio. Negli altri menu WhatsApp sparisce.

La sessione di WhatsApp resta salvata: scansioni il QR una sola volta.

---

## A) Avere il file .dmg SENZA terminale (consigliato)

Si costruisce da solo su GitHub, poi scarichi il `.dmg`.

1. Crea un repo su GitHub (es. `vmh-desktop`) → **Add file → Upload files** →
   carica **tutto il contenuto** di questa cartella (inclusa la cartella
   nascosta `.github`). Commit.
   - Se non vedi `.github` quando trascini, trascina i file/cartelle dalla
     finestra che mostra i file nascosti, oppure usa "upload" e seleziona tutto.
2. Vai nella scheda **Actions** del repo → parte da sola "Build Desktop App"
   (altrimenti premi **Run workflow**).
3. Quando finisce (~5 min), apri il run → sezione **Artifacts** → scarica
   **VMH-macOS-dmg** (e/o **VMH-Windows-exe**).
4. Apri il `.dmg`, trascina l'app in **Applicazioni**. Fatto.

> Prima apertura su Mac (app non firmata): **tasto destro sull'app → Apri →
> Apri**. Va fatto solo la prima volta.

---

## B) Avvio rapido per provarla subito (con terminale)

Serve **Node.js 18+** ( https://nodejs.org ).
```
cd ~/Downloads/vmh-desktop
npm install
npm start
```
Per generare il .dmg in locale: `npm run dist:mac` (esce in `dist/`).

---

## Come si usa
- Usa il gestionale normalmente.
- Clicca **WhatsApp** nel menu a sinistra: appare WhatsApp Web reale nell'area
  della pagina. La prima volta scansiona il QR dal telefono
  (**WhatsApp › Dispositivi collegati › Collega un dispositivo**).
- Cambiando pagina, WhatsApp si nasconde; tornando su WhatsApp resta connesso.

## Note
- URL del gestionale: `https://vmhcrm.app`. Per cambiarlo: `VMH_URL=... npm start`
  oppure modifica `DASHBOARD_URL` in `main.js`.
- Tieni l'app aperta perché WhatsApp resti collegato (come WhatsApp Web).
- Importante: perché WhatsApp compaia esattamente nella pagina, il gestionale su
  vmhcrm.app deve essere la versione aggiornata (carica l'`index.html` più
  recente nel repo collegato a Vercel).
