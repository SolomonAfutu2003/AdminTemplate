// api/proxy/[...path].js
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // Handle OPTIONS/preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { path = [] } = req.query;
  const url = `http://195.201.122.224:1401/api/${path.join('/')}`;
  
  console.log(`🔄 Proxying ${req.method} to: ${url}`);

  try {
    const options = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Copy authorization header
    if (req.headers.authorization) {
      options.headers.Authorization = req.headers.authorization;
    }

    // Add body for non-GET requests
    if (req.method !== 'GET' && req.body) {
      options.body = JSON.stringify(req.body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    console.log(`✅ Proxy success: ${response.status}`);
    res.status(response.status).json(data);
  } catch (error) {
    console.error('❌ Proxy failed:', error);
    res.status(500).json({ error: 'Proxy request failed' });
  }
}