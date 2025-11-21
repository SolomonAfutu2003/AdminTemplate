export default async function handler(req, res) {
    const path = req.query.path || [];
    const targetUrl = `http://195.201.122.224:1401/api/${path.join('/')}`;
  
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
    // Handle preflight request
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
    try {
      const response = await fetch(targetUrl, {
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          ...(req.headers.authorization && { Authorization: req.headers.authorization }),
        },
        body: req.body ? JSON.stringify(req.body) : undefined,
      });
  
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error('Proxy error:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      });
    }
  }