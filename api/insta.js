export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  try {
    const response = await fetch("https://snapinsta.top/action.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64; rv:147.0) Gecko/20100101 Firefox/147.0",
        "Origin": "https://snapinsta.top",
        "Referer": "https://snapinsta.top/"
      },
      body: new URLSearchParams({
        url: url
      })
    });

    const html = await response.text();

    if (!html) {
      return res.status(500).json({ error: "Empty response" });
    }

    // Extrct download link using regex
    const match = html.match(/href=['"](\/dl\.php\?token=[^'"]+)['"]/i);

    if (match && match[1]) {
      const downloadLink = "https://snapinsta.top" + match[1];

      return res.status(200).json({
        success: true,
        download: downloadLink
      });
    }

    // Detect error message
    if (html.toLowerCase().includes("error")) {
      return res.status(400).json({
        success: false,
        error: "Invalid Instagram URL or media not available"
      });
    }

    return res.status(404).json({
      success: false,
      error: "Download link not found"
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
