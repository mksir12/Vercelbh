// File: api/ip.js

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow GET
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method Not Allowed",
    });
  }

  try {
    // Get user IP
    let ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      req.ip;

    // Clean localhost IPv6 format
    if (ip === "::1") ip = "127.0.0.1";

    // Fetch IP details
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();

    // Same response style
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch IP details",
      message: err.message,
    });
  }
}
