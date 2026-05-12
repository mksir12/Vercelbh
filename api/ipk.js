// api/ip.js

function getClientIP(req) {
  // Custom proxy header
  const customProxyIP = req.headers["x-custom-client-ip"];

  if (
    customProxyIP &&
    customProxyIP !== "unknown" &&
    customProxyIP !== "null"
  ) {
    return customProxyIP;
  }

  // Vercel / Proxy IP
  const forwarded = req.headers["x-forwarded-for"];

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  // Cloudflare fallback
  const cfIP = req.headers["cf-connecting-ip"];

  if (cfIP) {
    return cfIP;
  }

  // Final fallback
  return req.socket?.remoteAddress || "unknown";
}

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");

  // OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    let ip = getClientIP(req);

    // Clean IPv6 prefix
    if (ip.startsWith("::ffff:")) {
      ip = ip.replace("::ffff:", "");
    }

    // localhost fix
    if (ip === "::1") {
      ip = "127.0.0.1";
    }

    // Fetch user IP details
    const response = await fetch(`https://ipwho.is/${ip}`);
    const data = await response.json();

    // If API failed
    if (!data.success) {
      return res.status(400).json({
        success: false,
        ip,
        message: "Failed to fetch IP details",
      });
    }

    // Return clean response
    return res.status(200).json({
      ip: data.ip,
      type: data.type,
      continent: data.continent,
      continent_code: data.continent_code,
      country: data.country,
      country_code: data.country_code,
      region: data.region,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
      postal: data.postal,
      timezone: data.timezone?.id,
      connection: data.connection,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
