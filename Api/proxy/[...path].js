// api/proxy/[...path].js
export default async function handler(req, res) {
  const path = req.query.path || [];
  const targetUrl = `http://195.201.122.224:1401/api/${path.join('/')}`;

  // Log the incoming request
  console.log('🔁 Proxy request:', {
    method: req.method,
    targetUrl: targetUrl,
    path: path.join('/')
  });

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Parse the request body if it exists
    let body;
    if (req.body && Object.keys(req.body).length > 0) {
      body = JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { Authorization: req.headers.authorization }),
      },
      body: body,
    });

    // Get the response data
    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = text;
    }

    console.log('✅ Proxy response:', {
      status: response.status,
      statusText: response.statusText
    });

    // Forward the status and data
    res.status(response.status).json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}

// Important: Export for Vercel serverless functions
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};