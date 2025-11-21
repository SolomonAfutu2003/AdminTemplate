export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Parse body manually (IMPORTANT for Vercel)
  let body = null;
  if (req.method !== "GET") {
    body = await new Promise((resolve) => {
      let data = "";
      req.on("data", (chunk) => (data += chunk));
      req.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve({});
        }
      });
    });
  }

  const { path = [] } = req.query;
  const url = `http://195.201.122.224:1401/api/${path.join("/")}`;

  console.log(`🔄 Proxying ${req.method} to: ${url}`);

  try {
    const options = {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: req.method === "GET" ? undefined : JSON.stringify(body),
    };

    if (req.headers.authorization) {
      options.headers.Authorization = req.headers.authorization;
    }

    const response = await fetch(url, options);
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    res.status(response.status).json(data);
  } catch (error) {
    console.error("❌ Proxy failed:", error);
    res.status(500).json({ error: "Proxy request failed" });
  }
}
