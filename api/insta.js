export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: "Missing url parameter",
      });
    }

    const body = new URLSearchParams();
    body.append("url", url);
    body.append("v", "3");
    body.append("lang", "en");

    const response = await fetch("https://api.downloadgram.org/media", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        "Referer": "https://downloadgram.org/",
        "Origin": "https://downloadgram.org",
      },
      body: body.toString(),
    });

    let text = await response.text();

    // ✅ STEP 1: Decode escaped characters
    text = text
      .replace(/\\x22/g, '"') // quotes
      .replace(/\\x20/g, ' ') // spaces
      .replace(/\\n/g, '')
      .replace(/\\r/g, '');

    // ✅ STEP 2: Extract video
    const videoMatch = text.match(/<source[^>]+src="([^"]+)"/i);
    const video = videoMatch ? videoMatch[1] : null;

    // ✅ STEP 3: Extract thumbnail
    const thumbMatch = text.match(/poster="([^"]+)"/i);
    const thumbnail = thumbMatch ? thumbMatch[1] : null;

    // ✅ STEP 4: Extract download link
    const downloadMatch = text.match(/<a[^>]+href="([^"]+)"/i);
    const download = downloadMatch ? downloadMatch[1] : video;

    return res.status(200).json({
      success: true,
      type: "video",
      thumbnail,
      video,
      download,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
