export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: "Missing url parameter",
      });
    }

    // ✅ Create multipart form data
    const form = new FormData();
    form.append("url", url);
    form.append("action", "post");

    // ✅ Request
    const response = await fetch("https://apdev.in.net/action.php", {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/148 Safari/537.36",
        Origin: "https://apdev.in.net",
        Referer: "https://apdev.in.net/",
        Accept: "*/*",
      },
      body: form,
    });

    const html = await response.text();

    // DEBUG
    console.log(html);

    // =========================
    // ✅ THUMBNAIL EXTRACT
    // =========================
    let thumbnail = null;

    const thumbMatch = html.match(
      /<img[^>]+src="([^"]+)"/i
    );

    if (thumbMatch && thumbMatch[1]) {
      thumbnail = thumbMatch[1];

      // Fix relative URL
      if (thumbnail.startsWith("/")) {
        thumbnail = "https://apdev.in.net" + thumbnail;
      }
    }

    // =========================
    // ✅ DOWNLOAD LINK EXTRACT
    // =========================
    let download = null;

    const dlMatch = html.match(
      /href="(\/dl\.php\?token=[^"]+)"/i
    );

    if (dlMatch && dlMatch[1]) {
      download = "https://apdev.in.net" + dlMatch[1];
    }

    // =========================
    // ✅ TYPE DETECT
    // =========================
    let type = "image";

    if (html.includes("icon-dlvideo")) {
      type = "video";
    }

    return res.status(200).json({
      success: true,
      thumbnail,
      download,
      type,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
