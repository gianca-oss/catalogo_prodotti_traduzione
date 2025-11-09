# Traduttore Excel Multilingua - Vercel

## 🔧 SOLUZIONE al problema GET 404

### Step per risolvere:

1. **Verifica endpoint di test**:
   Apri nel browser: `https://traduttore-fdp.vercel.app/api/test`
   
   Se vedi errore 404, Vercel non sta rilevando le funzioni.

2. **Risoluzione**:
   - Elimina il progetto su Vercel
   - Ricarica tutti i file (assicurati che ci sia `vercel.json`)
   - Riconfigura `DEEPL_API_KEY` in Environment Variables
   - Seleziona **Production, Preview E Development**
   - Redeploy

3. **Test rapido**:
   ```bash
   curl https://traduttore-fdp.vercel.app/api/test
   ```

## 📦 Deploy su Vercel

1. Carica tutti i file su GitHub o drag & drop su Vercel
2. Aggiungi Environment Variable: `DEEPL_API_KEY`
3. Redeploy

## 📁 Struttura richiesta

```
vercel-app/
├── index.html
├── api/
│   ├── translate.js
│   └── test.js
├── vercel.json
└── package.json
```

## 🔐 Configurazione API Key

1. Vercel Dashboard → Settings → Environment Variables
2. Name: `DEEPL_API_KEY`
3. Value: La tua chiave DeepL
4. **SELEZIONA TUTTI E 3**: Production, Preview, Development
5. Redeploy

## ⚡ Ottieni DeepL API Key

https://www.deepl.com/pro-api (500.000 caratteri/mese gratis)
