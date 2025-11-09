export default async function handler(req, res) {
  // Abilita CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Log della richiesta per debug
  console.log('Request method:', req.method);
  console.log('Request body:', req.body);

  // Gestisci preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      received: req.method,
      expected: 'POST'
    });
  }

  const { text, targetLang } = req.body || {};

  if (!text || !targetLang) {
    return res.status(400).json({ 
      error: 'Missing text or targetLang',
      received: { text: !!text, targetLang: !!targetLang }
    });
  }

  // Verifica che l'API key sia configurata
  if (!process.env.DEEPL_API_KEY) {
    return res.status(500).json({ 
      error: 'DEEPL_API_KEY not configured. Please add it in Vercel Environment Variables.' 
    });
  }

  try {
    const params = new URLSearchParams({
      auth_key: process.env.DEEPL_API_KEY,
      text: text,
      source_lang: 'IT',
      target_lang: targetLang
    });

    // Usa https module
    const https = await import('https');
    
    const options = {
      hostname: 'api-free.deepl.com',
      path: '/v2/translate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(params.toString())
      }
    };

    const result = await new Promise((resolve, reject) => {
      const request = https.default.request(options, (response) => {
        let data = '';
        
        response.on('data', (chunk) => {
          data += chunk;
        });
        
        response.on('end', () => {
          console.log('DeepL response status:', response.statusCode);
          if (response.statusCode === 200) {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(new Error('Invalid JSON response from DeepL'));
            }
          } else {
            reject(new Error(`DeepL API error: ${response.statusCode} - ${data}`));
          }
        });
      });
      
      request.on('error', (error) => {
        reject(error);
      });
      
      request.write(params.toString());
      request.end();
    });

    return res.status(200).json({ translation: result.translations[0].text });
  } catch (error) {
    console.error('Translation error:', error);
    return res.status(500).json({ error: error.message });
  }
}
