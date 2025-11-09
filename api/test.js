export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  return res.status(200).json({ 
    message: 'API is working!',
    method: req.method,
    hasApiKey: !!process.env.DEEPL_API_KEY,
    timestamp: new Date().toISOString()
  });
}
