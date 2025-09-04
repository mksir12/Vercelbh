export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/favicon.ico") {
      return new Response("", { status: 204 });
    }

    // Example API endpoints
    if (path.startsWith("/spotify")) {
      return Response.json([{ id: 1, text: "Nice API!" }]);
    } else if (path.startsWith("/naruto")) {
      return Response.json({ username: "guest", role: "admin" });
    } else if (path.startsWith("/lost")) {
      return new Response("<h1>Lost Endpoint</h1>", {
        headers: { "Content-Type": "text/html" },
      });
    } else if (path.startsWith("/comingsoon")) {
      return new Response("<h1>Coming Soon 🚀</h1>", {
        headers: { "Content-Type": "text/html" },
      });
    }

    // 📌 Root (/) → JerryHtml with visitors count
    if (path === "/") {
      let totalVisitors = 0;
      try {
        // Ensure visitors table exists
        await env.VISITOR_DB.prepare(`
          CREATE TABLE IF NOT EXISTS visitors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `).run();

        // Increment visitor count
        await env.VISITOR_DB.prepare(`INSERT INTO visitors DEFAULT VALUES`).run();

        // Get total visitors
        const result = await env.VISITOR_DB
          .prepare(`SELECT COUNT(*) AS total FROM visitors`)
          .all();
        totalVisitors = result.results[0]?.total || 0;
      } catch (dbErr) {
        console.error("D1 error:", dbErr);
      }

      // Inject visitor count into JerryHtml
      let html = jerryHtml.replace("{{VISITORS}}", totalVisitors);

      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=UTF-8" },
      });
    }

    // ❌ Undefined routes → Error page
    return new Response(errorHtml, {
      headers: { "Content-Type": "text/html; charset=UTF-8" },
      status: 404,
    });
  },
};

/* ================= Jerry API Homepage ================= */
const jerryHtml = `
<!DOCTYPE html><html lang="en" class="layout-navbar-fixed layout-menu-fixed layout-compact" dir="ltr" data-skin="default" data-assets-path="../../assets/" data-template="vertical-menu-template" data-bs-theme="light"><head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
  <title>Dashboard - JerryCoder API</title>
  <meta name="description" content="JerryCoder api provides various types of json api for your javascript applications, starting from downloader, stalking, searching, converter, and several other tools.">
  <link rel="icon" href="https://jerryapi.vercel.app/jerry.jpg" type="image/jpeg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&ampdisplay=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/iconify-icons.css">
  <link rel="stylesheet" href="css/node-waves.css">
  <link rel="stylesheet" href="css/pickr-themes.css">
  <link rel="stylesheet" href="css/core.css">
  <link rel="stylesheet" href="css/demo.css">
  <link href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css" rel="stylesheet">
  <link rel="stylesheet" href="css/perfect-scrollbar.css">
  <link rel="stylesheet" href="css/apex-charts.css">
  <script src="js/helpers.js"></script>
  <script src="js/template-customizer.js"></script>
  <script src="js/config.js"></script>
</head>

<body>
  <div class="layout-wrapper layout-content-navbar  ">
    <div class="layout-container">
      <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
        <div class="app-brand demo">
          <a href="/" class="app-brand-link">
            <span class="app-brand-logo demo me-1">
              <img src="https://jerryapi.vercel.app/jerrylogo.jpg" alt="JerryCoder Official" width="105">
            </span>
          </a>
          <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto">
            <i class="menu-toggle-icon d-xl-block align-middle"></i>
          </a>
        </div>
        <div class="menu-inner-shadow"></div>
        <ul class="menu-inner py-1">
          <li class="menu-item active open">
            <a href="javascript:void(0);" class="menu-link menu-toggle">
              <i class="menu-icon tf-icons ri ri-home-smile-line"></i>
              <div data-i18n="Dashboards">Dashboards</div>
            </a>
            <ul class="menu-sub">
              <li class="menu-item">
                <a href="https://t.me/oggy_workshop" target="_blank" class="menu-link">
                  <div data-i18n="Canvas">Telegram</div>
                </a>
              </li>
              <li class="menu-item active">
                <a href="index.html" class="menu-link">
                  <div data-i18n="Rest Api">Rest Api</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="https://wa.me/919633902730" target="_blank" class="menu-link">
                  <div data-i18n="YouTube">contact</div>
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-item">
            <a href="javascript:void(0);" class="menu-link menu-toggle">
              <i class="menu-icon tf-icons ri ri-wechat-line"></i>
              <div data-i18n="Support">Support</div>
            </a>
            <ul class="menu-sub">
              <li class="menu-item">
                <a href="https://wa.me/919633902730" class="menu-link">
                  <div data-i18n="Channel">JerryCoder</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="https://t.me/oggy24help" class="menu-link">
                  <div data-i18n="Group Chat">Telegram Chat</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="https://wa.me/919633902730" class="menu-link">
                  <div data-i18n="WhatsApp">WhatsApp</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="https://t.me/oggy_workshop" class="menu-link">
                  <div data-i18n="Telegram">Telegram</div>
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-header mt-7">
            <span class="menu-header-text">Apps & Router</span>
          </li>
          <li class="menu-item">
            <a href="javascript:void(0);" class="menu-link menu-toggle">
              <i class="menu-icon tf-icons ri ri-download-cloud-line"></i>
              <div data-i18n="Downloader">Downloader</div>
            </a>
            <ul class="menu-sub">
              <li class="menu-item">
                <a href="/api/capcutdl?url=https://www.capcut.net/sharevideo?template_id=7446548553788411141" class="menu-link">
                  <div data-i18n="CapCut">CapCut</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/fbdl?url=https://www.facebook.com/share/r/1B5sDSg6EU/" class="menu-link">
                  <div data-i18n="Facebook">Facebook</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/download/fdroid?url=https://f-droid.org/en/packages/com.termux" class="menu-link">
                  <div data-i18n="F-Droid">F-Droid</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/drive?url=https://drive.google.com/file/d/1DrZxDdfPSGcabL3qkqI-4ON9xY3oDPdO/view?usp=drivesdk" class="menu-link">
                  <div data-i18n="Google Drive">Google Drive</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/insta?url=https://www.instagram.com/reel/C6AtQa1LEX0/?igsh=YzljYTk1ODg3Zg==" class="menu-link">
                  <div data-i18n="Instagram">Instagram</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/download/instagram2?url=https://www.instagram.com/reel/C6AtQa1LEX0/?igsh=YzljYTk1ODg3Zg==" class="menu-link">
                  <div data-i18n="Instagram 2">Instagram 2</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/mediafiredl?url=https://www.mediafire.com/file/1iu7hqs377e96uf/qioV19(Beal).zip/file" class="menu-link">
                  <div data-i18n="MediaFire">MediaFire</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/download/pinterest?url=https://pinterest.com/pin/92534967353837069" class="menu-link">
                  <div data-i18n="Pinterest">Pinterest</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/sfile?url=https://sfile.mobi/4MJIjvGqTmi" class="menu-link">
                  <div data-i18n="SFile">SFile</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/spotify?url=https://open.spotify.com/track/3k68kVFWTTBP0Jb4LOzCax" class="menu-link">
                  <div data-i18n="Spotify">Spotify</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/download/threads?url=https://www.threads.com/@dagelanviral/post/DKEVezCSqm-?xmt=AQF0ZrYIQCL3ELLpiFmyyPz4Wn4NkueofDax_ffZhWIPpg" class="menu-link">
                  <div data-i18n="Threads">Threads</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/tiktok?url=https://vt.tiktok.com/ZSr6HXMxk/" class="menu-link">
                  <div data-i18n="TikTok">TikTok</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/tikmusic?url=https://vt.tiktok.com/ZSr6HXMxk/" class="menu-link">
                  <div data-i18n="TikTok Music">TikTok Music</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/xnxxdl?query=https://www.xnxx.com/video-fzypdd8/beautiful_filipina_with_big_tits" class="menu-link">
                  <div data-i18n="XNXX">XNXX</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/ytmp3?url=https://youtube.com/watch?v=KHgllosZ3kA" class="menu-link">
                  <div data-i18n="YouTube MP3">YouTube MP3</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/ytmp4?url=https://youtube.com/watch?v=KHgllosZ3kA" class="menu-link">
                  <div data-i18n="YouTube MP4">YouTube MP4</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/ytplaymp3?query=DJ malam pagi slowed" class="menu-link">
                  <div data-i18n="YouTube Play MP3">YouTube Play MP3</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/ytplaymp4?query=DJ malam pagi slowed" class="menu-link">
                  <div data-i18n="YouTube Play MP4">YouTube Play MP4</div>
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-item">
            <a href="javascript:void(0);" class="menu-link menu-toggle">
              <i class="menu-icon tf-icons ri ri-search-line"></i>
              <div data-i18n="Searching">Searching</div>
            </a>
            <ul class="menu-sub">
              <li class="menu-item">
                <a href="/api/bukalapak?query=iPhone 13" class="menu-link">
                  <div data-i18n="Bukalapak">Bukalapak</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/search/capcut?query=Trend viral" class="menu-link">
                  <div data-i18n="CapCut">CapCut</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/search/fdroid?query=termux" class="menu-link">
                  <div data-i18n="F-Droid">F-Droid</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/search/genius/find?lagu=Jomblo happy" class="menu-link">
                  <div data-i18n="Genius Search">Genius Search</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/search/genius/lyrics?url=https://genius.com/Gamma1-jomblo-happy-lyrics" class="menu-link">
                  <div data-i18n="Genius Lyrics">Genius Lyrics</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/gimage?query=yahya almuthahar" class="menu-link">
                  <div data-i18n="Google Image">Google Image</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/google?query=yahya almuthahar" class="menu-link">
                  <div data-i18n="Google">Google</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/hero?query=layla" class="menu-link">
                  <div data-i18n="Hero">Hero</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/search/herodetail?url=https://mobile-legends.fandom.com/wiki/Miya" class="menu-link">
                  <div data-i18n="Hero Detail">Hero Detail</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/instagram/hashtags?query=yahyaalmthr" class="menu-link">
                  <div data-i18n="Instagram Hashtags">Instagram Hashtags</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/instagram/reels?query=yahyaalmthr" class="menu-link">
                  <div data-i18n="Instagram Reels">Instagram Reels</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/instagram/users?query=yahyaalmthr" class="menu-link">
                  <div data-i18n="Instagram Users">Instagram Users</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/search/listhero" class="menu-link">
                  <div data-i18n="List Hero">List Hero</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/lirik?lagu=bila nanti" class="menu-link">
                  <div data-i18n="Lyrics">Lyrics</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/pinterest?query=anime" class="menu-link">
                  <div data-i18n="Pinterest">Pinterest</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/search/pinterest?query=anime&limit=10" class="menu-link">
                  <div data-i18n="Pinterest 2">Pinterest 2</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/pixiv-r18?query=loli" class="menu-link">
                  <div data-i18n="Pixiv R18">Pixiv R18</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/playstore?query=epep" class="menu-link">
                  <div data-i18n="Playstore">Playstore</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/sfile-search?query=ff mod" class="menu-link">
                  <div data-i18n="SFile Mobi">SFile Mobi</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/spotifysearch?query=dj opus" class="menu-link">
                  <div data-i18n="Spotify">Spotify</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/search/spotify?query=dj opus" class="menu-link">
                  <div data-i18n="Spotify 2">Spotify 2</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/search/tiktok?query=Copyright Coding" class="menu-link">
                  <div data-i18n="TikTok">TikTok</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/xnxxsearch?query=bokep" class="menu-link">
                  <div data-i18n="XNXX">XNXX</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/yts?query=dj ambatukam" class="menu-link">
                  <div data-i18n="YouTube">YouTube</div>
                </a>
              </li>
            </ul>
          </li>          
          <li class="menu-item">
            <a href="javascript:void(0);" class="menu-link menu-toggle">
              <i class="menu-icon tf-icons ri ri-gamepad-line"></i>
              <div data-i18n="Game">Game</div>
            </a>
            <ul class="menu-sub">
              <li class="menu-item">
                <a href="/api/tebakgambar" class="menu-link">
                  <div data-i18n="Guess the Picture">Guess the Picture</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/tebakhero" class="menu-link">
                  <div data-i18n="Guess the Hero">Guess the Hero</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/tebakff" class="menu-link">
                  <div data-i18n="Guess Free Fire">Guess Free Fire</div>
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-item">
            <a href="javascript:void(0);" class="menu-link menu-toggle">
              <i class="menu-icon tf-icons ri ri-brain-line"></i>
              <div data-i18n="OpenAI">OpenAI</div>
            </a>
            <ul class="menu-sub">
              <li class="menu-item">
                <a href="/api/artificial/aiease/img2img/filter?url=https://files.catbox.moe/2pvb4j.jpg&style=4" class="menu-link">
                  <div data-i18n="Ai Filter">Ai Filter</div>
                  <div class="badge bg-label-primary fs-tiny rounded-pill ms-auto">Limits</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/amazonai?prompt=Anime%20witch%20girl%20with%20silver%20hair%20and%20black%20hat,%20detailed%20illustration,%20fantasy%20style&frame=6" class="menu-link">
                  <div data-i18n="Amazon Image">Amazon Image</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/animagine?prompt=elaina with blue eyes and blue hair holding a magic wand" class="menu-link">
                  <div data-i18n="Animagine">Animagine</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/imgedit/background?url=https://files.catbox.moe/pz2oib.jpg&style=default&prompt=cyberpunk%20modern%20city&reff_url=" class="menu-link">
                  <div data-i18n="Background Changer">Background Changer</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/colorizer?url=https://files.catbox.moe/59cswd.jpg" class="menu-link">
                  <div data-i18n="Colorizer">Colorizer</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/deepimage/<models>?prompt=graceful%20and%20beautiful%20princess%20girl&shape=portrait" class="menu-link">
                  <div data-i18n="DeepAI Image">DeepAI Image</div>
                  <div class="badge bg-label-primary fs-tiny rounded-pill ms-auto">118 styles</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/aiease/img2img/enhance?url=https://files.catbox.moe/2pvb4j.jpg" class="menu-link">
                  <div data-i18n="Enhance Image">Enhance Image</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/imgedit/faceswap?from=https://files.catbox.moe/hf50g5.jpg&to=https://files.catbox.moe/poc1tg.jpg" class="menu-link">
                  <div data-i18n="Face Swap">Face Swap</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/flux?prompt=Anime%20witch%20girl%20with%20silver%20hair%20and%20black%20hat,%20detailed%20illustration,%20fantasy%20style&model=flux_1_schnell&size=1_1_HD&style=anime&color=vibrant&lighting=golden_hour" class="menu-link">
                  <div data-i18n="Flux Generator">Flux Generator</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/hdr?url=https://files.catbox.moe/1lzxuc.jpg&pixel=4" class="menu-link">
                  <div data-i18n="HDR Image">HDR Image</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/removebg?url=https://files.catbox.moe/1lzxuc.jpg&pixel=4" class="menu-link">
                  <div data-i18n="RemoveBG">RemoveBG</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/imgedit/cartoon?url=https://files.catbox.moe/pz2oib.jpg&style=3d" class="menu-link">
                  <div data-i18n="Image To Cartoon">Image To Cartoon</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/imgedit/expand?url=https://files.catbox.moe/2pvb4j.jpg&top=100&bottom=100&left=100&right=100" class="menu-link">
                  <div data-i18n="Image Expand">Image Expand</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/imgedit/filter?url=https://files.catbox.moe/2pvb4j.jpg&reff_url=https://files.catbox.moe/q10axl.jpg&creativity=0.5" class="menu-link">
                  <div data-i18n="Image Filter">Image Filter</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/imgedit/sketch?url=https://files.catbox.moe/pz2oib.jpg&style=sketch" class="menu-link">
                  <div data-i18n="Image To Sketch">Image To Sketch</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="api/artificial/aiease/style" class="menu-link">
                  <div data-i18n="List Model">List Model</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/logic?query=buatkan gambar manusia disawah" class="menu-link">
                  <div data-i18n="Logic Detector">Logic Detector</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/mora?query=hai&username=yournumber" class="menu-link">
                  <div data-i18n="Mora">Mora</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/qioo2?query=hai&username=yournumber" class="menu-link">
                  <div data-i18n="Qioo v2">Qioo v2</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/aiease/img2img/removebg?url=https://files.catbox.moe/2pvb4j.jpg" class="menu-link">
                  <div data-i18n="Remove Background">Remove Background</div>
                  <div class="badge bg-label-primary fs-tiny rounded-pill ms-auto">Limits</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/simi?query=hai&lang=id" class="menu-link">
                  <div data-i18n="Simi">Simi</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/aiease/text2img?prompt=Magical%20floating%20islands%20in%20the%20sky%20with%20waterfalls,%20crystal%20formations,%20and%20ancient%20ruins&style=19" class="menu-link">
                  <div data-i18n="Text To Image v2">Text To Image v2</div>
                  <div class="badge bg-label-primary fs-tiny rounded-pill ms-auto">Limits</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/text2image?prompt=graceful%20and%20beautiful%20princess%20girl" class="menu-link">
                  <div data-i18n="Text To Image">Text To Image</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/aiease/img2img/watermark?url=https://files.catbox.moe/juy8py.jpg" class="menu-link">
                  <div data-i18n="Watermark Remover">Watermark Remover</div>
                  <div class="badge bg-label-primary fs-tiny rounded-pill ms-auto">Limits</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/artificial/ximage?prompt=Anime%20witch%20girl%20with%20silver%20hair%20and%20black%20hat,%20detailed%20illustration,%20fantasy%20style" class="menu-link">
                  <div data-i18n="Ximage Generator">Ximage Generator</div>
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-item">
            <a href="javascript:void(0);" class="menu-link menu-toggle">
              <i class="menu-icon tf-icons ri ri-image-line"></i>
              <div data-i18n="ePhoto360 Maker">ePhoto360</div>
            </a>
            <ul class="menu-sub">
              <li class="menu-item">
                <a href="/api/maker/ephoto/glitchtext?text=vreden" class="menu-link">
                  <div data-i18n="Glitch Text">Glitch Text</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/writetext?text=vreden" class="menu-link">
                  <div data-i18n="Write Text">Write Text</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/advancedglow?text=vreden" class="menu-link">
                  <div data-i18n="Advanced Glow">Advanced Glow</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/typographytext?text=vreden" class="menu-link">
                  <div data-i18n="Typography Text">Typography Text</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/pixelglitch?text=vreden" class="menu-link">
                  <div data-i18n="Pixel Glitch">Pixel Glitch</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/neonglitch?text=vreden" class="menu-link">
                  <div data-i18n="Neon Glitch">Neon Glitch</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/flagtext?text=vreden" class="menu-link">
                  <div data-i18n="Flag Text">Flag Text</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/flag3dtext?text=vreden" class="menu-link">
                  <div data-i18n="Flag 3D Text">Flag 3D Text</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/deletingtext?text=vreden" class="menu-link">
                  <div data-i18n="Deleting Text">Deleting Text</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/blackpinkstyle?text=vreden" class="menu-link">
                  <div data-i18n="Blackpink Style">Blackpink Style</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/glowingtext?text=vreden" class="menu-link">
                  <div data-i18n="Glowing Text">Glowing Text</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/underwatertext?text=vreden" class="menu-link">
                  <div data-i18n="Underwater Text">Underwater Text</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/logomaker?text=vreden" class="menu-link">
                  <div data-i18n="Logo Maker">Logo Maker</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/cartoonstyle?text=vreden" class="menu-link">
                  <div data-i18n="Cartoon Style">Cartoon Style</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/papercutstyle?text=vreden" class="menu-link">
                  <div data-i18n="Papercut Style">Papercut Style</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/watercolortext?text=vreden" class="menu-link">
                  <div data-i18n="Watercolor Text">Watercolor Text</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/effectclouds?text=vreden" class="menu-link">
                  <div data-i18n="Effect Clouds">Effect Clouds</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/blackpinklogo?text=vreden" class="menu-link">
                  <div data-i18n="Blackpink Logo">Blackpink Logo</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/gradienttext?text=vreden" class="menu-link">
                  <div data-i18n="Gradient Text">Gradient Text</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/summerbeach?text=vreden" class="menu-link">
                  <div data-i18n="Summer Beach">Summer Beach</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/luxurygold?text=vreden" class="menu-link">
                  <div data-i18n="Luxury Gold">Luxury Gold</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/multicoloredneon?text=vreden" class="menu-link">
                  <div data-i18n="Multicolored Neon">Multicolored Neon</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/sandsummer?text=vreden" class="menu-link">
                  <div data-i18n="Sand Summer">Sand Summer</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/galaxywallpaper?text=vreden" class="menu-link">
                  <div data-i18n="Galaxy Wallpaper">Galaxy Wallpaper</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/1917style?text=vreden" class="menu-link">
                  <div data-i18n="1917 Style">1917 Style</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/makingneon?text=vreden" class="menu-link">
                  <div data-i18n="Making Neon">Making Neon</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/royaltext?text=vreden" class="menu-link">
                  <div data-i18n="Royal Text">Royal Text</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/freecreate?text=vreden" class="menu-link">
                  <div data-i18n="Free Create">Free Create</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/galaxystyle?text=vreden" class="menu-link">
                  <div data-i18n="Galaxy Style">Galaxy Style</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/maker/ephoto/lighteffects?text=vreden" class="menu-link">
                  <div data-i18n="Light Effects">Light Effects</div>
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-item">
            <a href="javascript:void(0);" class="menu-link menu-toggle">
              <i class="menu-icon tf-icons ri ri-search-eye-line"></i>
              <div data-i18n="Stalker">Stalker</div>
            </a>
            <ul class="menu-sub">
              <li class="menu-item">
                <a href="/api/mlstalk?id=109088431&zoneid=2558" class="menu-link">
                  <div data-i18n="Mobile Legends">Mobile Legends</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/ffstalk?id=12345678" class="menu-link">
                  <div data-i18n="Free Fire">Free Fire</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/npmstalk?query=@vreden/meta" class="menu-link">
                  <div data-i18n="NPM">NPM</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/tiktokStalk?query=yusufalmuthahar" class="menu-link">
                  <div data-i18n="TikTok">TikTok</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/igstalk?query=yahyaalmthr" class="menu-link">
                  <div data-i18n="Instagram">Instagram</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/stalk/pinterest?query=vreden" class="menu-link">
                  <div data-i18n="Pinterest">Pinterest</div>
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-item">
            <a href="javascript:void(0);" class="menu-link menu-toggle">
              <i class="menu-icon tf-icons ri ri-shuffle-line"></i>
              <div data-i18n="Random">Random</div>
            </a>
            <ul class="menu-sub">
              <li class="menu-item">
                <a href="/api/bocil" class="menu-link">
                  <div data-i18n="Bocil">Bocil</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/galau" class="menu-link">
                  <div data-i18n="Galau">Galau</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/hentaivid" class="menu-link">
                  <div data-i18n="Hentai Video">Hentai Video</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/meme" class="menu-link">
                  <div data-i18n="Meme">Meme</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/myinstants" class="menu-link">
                  <div data-i18n="MyInstants">MyInstants</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/neko" class="menu-link">
                  <div data-i18n="Neko">Neko</div>
                </a>
              </li>
              <li class="menu-item">
                <a href="/api/waifu" class="menu-link">
                  <div data-i18n="Waifu">Waifu</div>
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-item">
            <a href="javascript:void(0);" class="menu-link menu-toggle">
              <i class="menu-icon tf-icons ri ri-tools-line"></i>
              <div data-i18n="Tools">Tools</div>
            </a>
            <ul class="menu-sub">                            
              <li class="menu-item">
                <a href="/ss?url=https://www.vreden.my.id&type=tablet" class="menu-link">
                  <div data-i18n="Screenshot Web">Screenshot Web</div>
                </a>
              </li>              
              <li class="menu-item">
                <a href="/fullss?url=https://www.vreden.my.id" class="menu-link">
                  <div data-i18n="TinyURL">Full Screenshot</div>
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-header mt-7">
            <span class="menu-header-text">Misc</span>
          </li>
          <li class="menu-item">
            <a href="https://t.me/oggy_workshop" target="_blank" class="menu-link">
              <i class="menu-icon tf-icons ri ri-telegram-line"></i>
              <div data-i18n="Telegram">Telegram</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="https://wa.me/919633902730" target="_blank" class="menu-link">
              <i class="menu-icon tf-icons ri ri-chat-voice-line"></i>
              <div data-i18n="Chat Bots">Connect Me</div>
            </a>
          </li>
        </ul>
      </aside>

      <div class="menu-mobile-toggler d-xl-none rounded-1">
        <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large text-bg-secondary p-2 rounded-1">
          <i class="ri ri-menu-line icon-base"></i>
          <i class="ri ri-arrow-right-s-line icon-base"></i>
        </a>
      </div>

      <div class="layout-page">
        <nav class="layout-navbar container-xxl navbar-detached navbar navbar-expand-xl align-items-center bg-navbar-theme" id="layout-navbar">
          <div class="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0   d-xl-none ">
            <a class="nav-item nav-link px-0 me-xl-6" href="javascript:void(0)">
              <i class="icon-base ri ri-menu-line icon-md"></i>
            </a>
          </div>
          <div class="navbar-nav-right d-flex align-items-center justify-content-end" id="navbar-collapse">
  <div class="navbar-nav align-items-center">
    <div class="nav-item navbar-search-wrapper mb-0">
      <a class="nav-item nav-link search-toggler px-0" href="javascript:void(0);" id="searchToggle">
        <i class="ri-search-line ri-20px text-body"></i>
      </a>
    </div>
  </div>

<!-- Hidden Search Bar -->
<div id="searchBar" class="search-bar d-none">
  <input type="text" id="searchInput" class="form-control" placeholder="Search API (e.g. peace, spotify)" />
  <ul id="searchResults" class="list-group mt-2"></ul>
</div>
             <ul class="navbar-nav flex-row align-items-center ms-md-auto">
              <li class="nav-item dropdown me-sm-2 me-xl-0">
                <a class="nav-link dropdown-toggle hide-arrow btn btn-icon btn-text-secondary rounded-pill" id="nav-theme" href="javascript:void(0);" data-bs-toggle="dropdown">
                  <i class="icon-base ri ri-sun-line icon-22px theme-icon-active"></i>
                  <span class="d-none ms-2" id="nav-theme-text">Toggle theme</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="nav-theme-text">
                  <li>
                    <button type="button" class="dropdown-item align-items-center active" data-bs-theme-value="light" aria-pressed="false">
                      <span> <i class="icon-base ri ri-sun-line icon-md me-3" data-icon="sun-line"></i>Light</span>
                    </button>
                  </li>
                  <li>
                    <button type="button" class="dropdown-item align-items-center" data-bs-theme-value="dark" aria-pressed="true">
                      <span> <i class="icon-base ri ri-moon-clear-line icon-md me-3" data-icon="moon-clear-line"></i>Dark</span>
                    </button>
                  </li>
                  <li>
                    <button type="button" class="dropdown-item align-items-center" data-bs-theme-value="system" aria-pressed="false">
                      <span> <i class="icon-base ri ri-computer-line icon-md me-3" data-icon="computer-line"></i>System</span>
                    </button>
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown-shortcuts navbar-dropdown dropdown">
                <a class="nav-link btn btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                  <i class="ri ri-star-smile-line ri ri-22px"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-end py-0">
                  <div class="dropdown-menu-header border-bottom py-50">
                    <div class="dropdown-header d-flex align-items-center py-2">
                      <h6 class="mb-0 me-auto">Connect JerryCoder</h6>
                      <a href="javascript:void(0)" class="btn btn-text-secondary rounded-pill btn-icon dropdown-shortcuts-add" data-bs-toggle="tooltip" data-bs-placement="top" title="Add shortcuts"><i class="ri ri-layout-grid-line ri ri-24px text-heading"></i></a>
                    </div>
                  </div>
                  <div class="dropdown-shortcuts-list scrollable-container">
                    <div class="row row-bordered overflow-visible g-0">
                      <div class="dropdown-shortcuts-item col">
                        <span class="dropdown-shortcuts-icon rounded-circle mb-2">
                          <i class="ri ri-dashboard-line ri ri-26px text-heading"></i>
                        </span>
                        <a href="https://oggy-api.vercel.app" class="stretched-link">Homepage</a>
                        <small>Official Website</small>
                      </div>
                      <div class="dropdown-shortcuts-item col">
                        <span class="dropdown-shortcuts-icon rounded-circle mb-2">
                          <i class="ri ri-youtube-line ri ri-26px text-heading"></i>
                        </span>
                        <a href="https://t.me/oggy_workshop" class="stretched-link">Telegram</a>
                        <small>Downloader & Info</small>
                      </div>
                    </div>
                    <div class="row row-bordered overflow-visible g-0">
                      <div class="dropdown-shortcuts-item col">
                        <span class="dropdown-shortcuts-icon rounded-circle mb-2">
                          <i class="ri ri-brush-line ri ri-26px text-heading"></i>
                        </span>
                        <a href="https://wa.me/919633902730" class="stretched-link">Contact</a>
                        <small>Contact</small>
                      </div>
                      <div class="dropdown-shortcuts-item col">
                        <span class="dropdown-shortcuts-icon rounded-circle mb-2">
                          <i class="ri ri-server-line ri ri-26px text-heading"></i>
                        </span>
                        <a href="https://jerrycoder.oggyapi.workers.dev" class="stretched-link">Rest API</a>
                        <small>Rest Api Free</small>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item dropdown-notifications navbar-dropdown dropdown me-4 me-xl-1">
                <a class="nav-link btn btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                  <i class="ri ri-notification-2-line ri ri-22px"></i>
                  <span class="position-absolute top-0 start-50 translate-middle-y badge badge-dot bg-danger mt-2 border"></span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end py-0">
                  <li class="dropdown-menu-header border-bottom">
                    <div class="dropdown-header d-flex align-items-center py-3">
                      <h6 class="mb-0 me-auto">Update And Notice</h6>
                      <div class="d-flex align-items-center">
                        <span class="badge rounded-pill bg-label-primary me-2">19 New</span>
                        <a href="javascript:void(0)" class="btn btn-text-secondary rounded-pill btn-icon dropdown-notifications-all" data-bs-toggle="tooltip" data-bs-placement="top" title="Mark all as read"><i class="ri ri-mail-open-line ri ri-20px text-body"></i></a>
                      </div>
                    </div>
                  </li>
                  <li class="dropdown-notifications-list scrollable-container">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item list-group-item-action dropdown-notifications-item">
                        <div class="d-flex">
                          <div class="flex-shrink-0 me-3">
                            <div class="avatar">
                              <span class="avatar-initial rounded-circle bg-label-danger"><i class="ri ri-notification-line"></i></span>
                            </div>
                          </div>
                          <div class="flex-grow-1">
                            <h6 class="small mb-1">Stop Newsletter</h6>
                            <small class="mb-1 d-block text-body">Info update akan di kabari melalui channel, jadi banner ini hanya akan digunakan jika keadaan darurat</small>
                            <small class="text-muted">23 Maret 2025</small>
                          </div>
                          <div class="flex-shrink-0 dropdown-notifications-actions">
                            <a href="javascript:void(0)" class="dropdown-notifications-read"><span class="badge badge-dot"></span></a>
                            <a href="javascript:void(0)" class="dropdown-notifications-archive"><span class="ri ri-close-line"></span></a>
                          </div>
                        </div>
                      </li>                                          
                      <li class="list-group-item list-group-item-action dropdown-notifications-item">
                        <div class="d-flex">
                          <div class="flex-shrink-0 me-3">
                            <div class="avatar">
                              <span class="avatar-initial rounded-circle bg-label-success"><i class="ri ri-tools-line"></i></span>
                            </div>
                          </div>
                          <div class="flex-grow-1">
                            <h6 class="small mb-1">Added Check TCP</h6>
                            <small class="mb-1 d-block text-body">Create a checker TCP for a website url</small>
                            <small class="text-muted">19 Maret 2025</small>
                          </div>
                          <div class="flex-shrink-0 dropdown-notifications-actions">
                            <a href="javascript:void(0)" class="dropdown-notifications-read"><span class="badge badge-dot"></span></a>
                            <a href="javascript:void(0)" class="dropdown-notifications-archive"><span class="ri ri-close-line"></span></a>
                          </div>
                        </div>
                      </li>
                      <li class="list-group-item list-group-item-action dropdown-notifications-item">
                        <div class="d-flex">
                          <div class="flex-shrink-0 me-3">
                            <div class="avatar">
                              <span class="avatar-initial rounded-circle bg-label-success"><i class="ri ri-brain-line"></i></span>
                            </div>
                          </div>
                          <div class="flex-grow-1">
                            <h6 class="small mb-1">Added Image Colorizer</h6>
                            <small class="mb-1 d-block text-body">Ubah foto hitam putih menjadi berwarna menggunakan ai</small>
                            <small class="text-muted">19 Maret 2025</small>
                          </div>
                          <div class="flex-shrink-0 dropdown-notifications-actions">
                            <a href="javascript:void(0)" class="dropdown-notifications-read"><span class="badge badge-dot"></span></a>
                            <a href="javascript:void(0)" class="dropdown-notifications-archive"><span class="ri ri-close-line"></span></a>
                          </div>
                        </div>
                      </li>
                      <li class="list-group-item list-group-item-action dropdown-notifications-item">
                        <div class="d-flex">
                          <div class="flex-shrink-0 me-3">
                            <div class="avatar">
                              <span class="avatar-initial rounded-circle bg-label-success"><i class="ri ri-download-cloud-line"></i></span>
                            </div>
                          </div>
                          <div class="flex-grow-1">
                            <h6 class="small mb-1">Fixed Spotify Download</h6>
                            <small class="mb-1 d-block text-body">Error result code 500 saat mendownload telah kami perbaiki</small>
                            <small class="text-muted">18 Maret 2025</small>
                          </div>
                          <div class="flex-shrink-0 dropdown-notifications-actions">
                            <a href="javascript:void(0)" class="dropdown-notifications-read"><span class="badge badge-dot"></span></a>
                            <a href="javascript:void(0)" class="dropdown-notifications-archive"><span class="ri ri-close-line"></span></a>
                          </div>
                        </div>
                      </li>
                      <li class="list-group-item list-group-item-action dropdown-notifications-item">
                        <div class="d-flex">
                          <div class="flex-shrink-0 me-3">
                            <div class="avatar">
                              <span class="avatar-initial rounded-circle bg-label-danger"><i class="ri ri-search-eye-line"></i></span>
                            </div>
                          </div>
                          <div class="flex-grow-1">
                            <h6 class="mb-1 small">Stoped FF Stalk</h6>
                            <small class="mb-1 d-block text-body">Kami menghentikan fitur ffstalk untuk sementara waktu</small>
                            <small class="text-muted">16 Maret 2025</small>
                          </div>
                          <div class="flex-shrink-0 dropdown-notifications-actions">
                            <a href="javascript:void(0)" class="dropdown-notifications-read"><span class="badge badge-dot"></span></a>
                            <a href="javascript:void(0)" class="dropdown-notifications-archive"><span class="ri ri-close-line"></span></a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li class="border-top">
                    <div class="d-grid p-4">
                      <a class="btn btn-primary btn-sm d-flex" href="https://t.me/oggy_workshop">
                        <small class="align-middle">Join Channel Update</small>
                      </a>
                    </div>
                  </li>
                </ul>
              </li>
              <div class="nav-item d-flex align-items-center">
                <img src="https://jerryapi.vercel.app/jerry.jpg" alt="JerryCoder Official" width="35">
              </div>
            </ul>
          </div>
        </nav>

        <div class="content-wrapper">
          <div class="container-xxl flex-grow-1 container-p-y">

<div class="row gy-6">
  <div class="col-md-12 col-lg-4">
    <div class="card">
      <div class="card-body text-nowrap">
        <h5 class="card-title mb-0 flex-wrap text-nowrap">Welcome user! 🧋</h5>
        <p class="mb-2">To JerryCoder Rest Api</p>
        <h4 class="text-primary mb-0" id="visitors">0</h4>
        <p class="mb-2">Total visitor 🛸</p>
        <a href="https://t.me/oggy_workshop" class="btn btn-sm btn-primary">Join Channel</a>
      </div>
      <img src="images/me.png" class="position-absolute bottom-0 end-0 me-5 mb-5" width="83" alt="JerryCoder Apis">
    </div>
  </div>
  <div class="col-lg-8">
    <div class="card h-100">
      <div class="card-header">
        <div class="d-flex align-items-center justify-content-between">
          <h5 class="card-title m-0 me-2">Penggunaan</h5>
        </div>
        <p class="small mb-0">
          <span class="h6 mb-0">Request statistik</span> for this API
        </p>
      </div>
      <div class="card-body pt-lg-10">
        <div class="row g-6">
          <div class="col-md-3 col-6">
            <div class="d-flex align-items-center">
              <div class="avatar">
                <div class="avatar-initial bg-label-primary rounded shadow-xs">
                  <i class="icon-base ri ri-pie-chart-2-line ri ri-24px"></i>
                </div>
              </div>
              <div class="ms-3">
                <p class="mb-0">Request</p>
                <h5 class="mb-0" id="total-hits">0</h5>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-6">
            <div class="d-flex align-items-center">
              <div class="avatar">
                <div class="avatar-initial bg-label-info rounded shadow-xs">
                  <i class="icon-base ri ri-group-line ri ri-24px"></i>
                </div>
              </div>
              <div class="ms-3">
                <p class="mb-0">Visitor</p>
                <h5 class="mb-0" id="total-visitors">0</h5>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-6">
            <div class="d-flex align-items-center">
              <div class="avatar">
                <div class="avatar-initial bg-label-success rounded shadow-xs">
                  <i class="icon-base ri ri-checkbox-circle-line ri ri-24px"></i>
                </div>
              </div>
              <div class="ms-3">
                <p class="mb-0">Success</p>
                <h5 class="mb-0" id="successful-requests">0</h5>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-6">
            <div class="d-flex align-items-center">
              <div class="avatar">
                <div class="avatar-initial bg-label-danger rounded shadow-xs">
                  <i class="icon-base ri ri-bug-line ri ri-24px"></i>
                </div>
              </div>
              <div class="ms-3">
                <p class="mb-0">Failed</p>
                <h5 class="mb-0" id="total-errors">0</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-xl-4 col-md-6">
  <div class="card">
    <div class="card-header">
      <h5 class="card-title m-0">Persentase</h5>
      <p class="small mb-0">
        <span class="h6 mb-0">APIs healthy</span> for router response.
      </p>
    </div>
    <div class="card-body text-center">
      <!-- Chart -->
      <svg id="percentageChart" viewBox="0 0 200 100" width="100%" height="120"></svg>

      <!-- Percentage number -->
      <h3 id="percentageValue" class="mt-2 mb-1">0%</h3>

      <div class="percent-label">
        <h6 class="mb-1">Persent Rate</h6>
        <span class="badge bg-label-primary text-dark">Task Success</span>
      </div>
    </div>
  </div>
  </div>
  <div class="col-xl-4 col-md-6">
    <div class="card">
      <div class="card-header">
        <div class="d-flex justify-content-between">
          <h5 class="mb-1">Statistics</h5>
        </div>
      </div>
      <div class="card-body pt-lg-2">
        <div id="weeklyOverviewChart"></div>
        <div class="mt-1 mt-md-3">
          <div class="d-flex align-items-center gap-4">
            <h4 class="mb-0" id="total-weekly">0</h4>
            <p class="mb-0">Total hit weekly and statistics</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="col-xl-4 col-md-6">
  <div class="card-group">
    <div class="card mb-0">
      <div class="card-body card-separator">
        <div class="d-flex justify-content-between align-items-center flex-wrap mb-4">
          <h5 class="m-0 me-2">Latest Usage</h5>
        </div>
        <div id="usage-content" class="pt-2">
          <ul id="usage-list" class="p-0 m-0 list-unstyled"></ul>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="col-xl-4 col-md-6">
  <div class="card-group">
    <div class="card mb-0">
      <div class="card-body card-separator">
        <div class="d-flex justify-content-between align-items-center flex-wrap mb-4">
          <h5 class="m-0 me-2">Latest Error</h5>
        </div>
        <div id="error-content" class="pt-2">
          <ul id="error-list" class="p-0 m-0">
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

          </div>
          <footer class="content-footer footer bg-footer-theme">
            <div class="container-xxl">
              <div class="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
                <div class="mb-2 mb-md-0"> ©
                  <script> document.write(new Date().getFullYear());</script> • Build on
                  <span class="text-body"><i class="icon-base tf-icons ri ri-cloud-line"></i></span>
                  <a href="https://oggy-api.vercel.app" target="_blank" class="footer-link text-body">JerryCoder</a>
                </div>
              </div>
            </div>
          </footer>
          <div class="content-backdrop fade"></div>
        </div>
      </div>
    </div>
    <div class="layout-overlay layout-menu-toggle"></div>
    <div class="drag-target"></div>
  </div>

<style>

.search-bar {
  position: absolute;
  top: 60px;
  right: 20px;
  width: 250px; /* smaller medium size */
  z-index: 1050;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
#searchResults {
  max-height: 200px;
  overflow-y: auto;
}
  
.percent-label {
      text-align: center;
      margin-top: -10px;
    }
/* === Custom Styles === */
#usage-list li {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}

#usage-list .check-icon {
  background: #e6f4ea;
  color: #34a853;
  font-size: 18px;
  border-radius: 12px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

#usage-list .details {
  flex: 1;
}

#usage-list .name {
  font-weight: normal;
}

#usage-list .time {
  display: block;
  font-size: 13px;
  color: #6c757d;
  margin-top: 4px;
}

#usage-list .tag {
  background: #e6f4ea;
  color: #34a853;
  font-size: 13px;
  padding: 2px 10px;
  border-radius: 12px;
  font-weight: 500;
  white-space: nowrap;
}
</style>

<script>
// Your API list
const apiList = [
  { name: "Peace", endpoint: "/peace" },
  { name: "Lost Part 4", endpoint: "/lost-part4" },
  { name: "Spotify", endpoint: "/spotify" },
  { name: "TikTok", endpoint: "/tiktok" },
  { name: "YouTube Mp3", endpoint: "/ytmp3" },
  { name: "Play MP3", endpoint: "/playmp3" },
  { name: "Meme", endpoint: "/meme" }
];

document.addEventListener("DOMContentLoaded", function() {
  const toggleBtn = document.getElementById("searchToggle");
  const searchBar = document.getElementById("searchBar");
  const searchInput = document.getElementById("searchInput");
  const resultsList = document.getElementById("searchResults");

  // Toggle search bar
  toggleBtn.addEventListener("click", function () {
    searchBar.classList.toggle("d-none");
    if (!searchBar.classList.contains("d-none")) {
      searchInput.focus();
    }
  });

  // Filter API list while typing
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    resultsList.innerHTML = "";

    if (!query) return;

    const filtered = apiList.filter(api => 
      api.name.toLowerCase().includes(query) || 
      api.endpoint.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      resultsList.innerHTML = `<li class="list-group-item">No results found</li>`;
      return;
    }

    filtered.forEach(api => {
      const li = document.createElement("li");
      li.className = "list-group-item list-group-item-action";
      li.textContent = `${api.name} (${api.endpoint})`;

      // ✅ Redirect instead of fetch
      li.addEventListener("click", () => {
        window.location.href = api.endpoint;
      });

      resultsList.appendChild(li);
    });
  });
});
</script>
    
<script>
// Function to create cut-cut gauge
function createGauge(percentage) {
  const svg = document.getElementById("percentageChart");
  svg.innerHTML = ""; // clear old chart

  const segments = 40; // number of cuts
  const radius = 80;
  const cx = 100, cy = 100; // center bottom
  const startAngle = -180, endAngle = 0; // semi-circle
  const angleStep = (endAngle - startAngle) / (segments - 1);

  for (let i = 0; i < segments; i++) {
    const angle = (startAngle + i * angleStep) * Math.PI / 180;
    const x1 = cx + radius * Math.cos(angle);
    const y1 = cy + radius * Math.sin(angle);

    const x2 = cx + (radius - 10) * Math.cos(angle);
    const y2 = cy + (radius - 10) * Math.sin(angle);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke-width", "4");
    line.setAttribute("stroke-linecap", "round");

    // Active / Inactive color
    const activePercent = (i / (segments - 1)) * 100;
    if (activePercent <= percentage) {
      line.setAttribute("stroke", "#007bff"); // blue active
    } else {
      line.setAttribute("stroke", "#e0e0e0"); // gray inactive
    }

    svg.appendChild(line);
  }

  // Update percentage text
  document.getElementById("percentageValue").textContent = percentage.toFixed(2) + "%";
}

// Example usage
createGauge(97.86);
</script>
    
<script>
async function loadUsage() {
  try {
    // 👉 Replace with your Worker endpoint
    const res = await fetch("https://jerrycoder.oggyapi.workers.dev/peace");
    const data = await res.json();

    const usageList = document.getElementById("usage-list");
    usageList.innerHTML = "";

    data.forEach(item => {
      const li = document.createElement("li");

      li.innerHTML = `
  <div class="avatar me-2">
    <div class="avatar-initial bg-label-success rounded shadow-xs">
      <i class="ri ri-checkbox-circle-line ri-24px"></i>
    </div>
  </div>
  <div class="details flex-grow-1">
    <span class="name">${item.name}</span>
    <span class="time d-block">
      <i class="ri ri-calendar-line me-1"></i> ${item.time}
    </span>
  </div>
  <div>
    <span class="tag">${item.tag}</span>
  </div>
`;
      usageList.appendChild(li);
    });
  } catch (err) {
    document.getElementById("usage-list").innerHTML =
      "<li class='text-danger'>Error loading data</li>";
  }
}

loadUsage();
</script>

  <script src="js/jquery.js"></script>
  <script src="js/popper.js"></script>
  <script src="js/bootstrap.js"></script>
  <script src="js/node-waves.js"></script>
  <script src="js/autocomplete-js.js"></script>
  <script src="js/pickr.js"></script>
  <script src="js/perfect-scrollbar.js"></script>
  <script src="js/hammer.js"></script>
  <script src="js/i18n.js"></script>
  <script src="js/menu.js"></script>
  <script src="js/apexcharts.js"></script>
  <script src="js/main.js"></script>
  <script src="js/dashboards-analytics.js"></script>




</div></body></html>`;

/* ================= Error Page (Glitch Neon with Music) ================= */
const errorHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 Not Found</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      background: black;
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif;
      height: 100vh;
      overflow-y: auto; /* enable scroll */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }

    .bg-video {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      object-fit: cover;
      z-index: -1;
      opacity: 0.35;
    }

    /* Status bar */
    .status-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 90%;
      max-width: 420px;
      font-size: 0.9rem;
      margin-top: 12px;
    }
    .status-left i, .status-right i {
      font-size: 1.2rem;
    }
    .status-right {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Lockscreen Center */
    .lockscreen {
      text-align: center;
      margin-top: 8vh;
    }
    .time {
      font-size: 5.2rem;
      font-weight: 500;
      letter-spacing: -2px;
    }
    .date {
      font-size: 1.1rem;
      margin-top: 6px;
      opacity: 0.85;
    }
    .message {
      font-size: 1.3rem;
      margin-top: 40px;
      opacity: 0.9;
    }

    /* Footer */
    .footer {
      font-size: 0.9rem;
      color: #aaa;
      margin-bottom: 60px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .footer i {
      font-size: 1.2rem;
      color: #aaa;
    }

    /* Theme toggle icon button */
    .toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(255,255,255,0.1);
      border: none;
      padding: 12px;
      border-radius: 50%;
      cursor: pointer;
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    .toggle i {
      font-size: 1.4rem;
      color: white;
    }

    /* Light theme */
    .light {
      background: white;
      color: black;
    }
    .light .footer,
    .light .status-bar {
      color: black;
    }
    .light .footer i,
    .light .status-bar i,
    .light .toggle i {
      color: black;
    }
    .light .toggle {
      background: rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <!-- Background Video -->
  <video autoplay muted loop playsinline class="bg-video">
    <source src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4" type="video/mp4">
  </video>

  <!-- Status Bar -->
  <div class="status-bar">
    <div class="status-left">
      <i class="ri-signal-fill"></i>
      <i class="ri-wifi-fill"></i>
    </div>
    <div class="status-right">
      <span id="battery-level">--%</span>
      <i class="ri-battery-2-fill"></i>
    </div>
  </div>

  <!-- Lockscreen -->
  <div class="lockscreen">
    <div class="time" id="time">00:00</div>
    <div class="date" id="date">Monday, Jan 1</div>
    <div class="message">
      <i class="ri-alert-fill"></i> 404 – Page Not Found
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <i class="ri-mac-line"></i> <span id="ip">Loading IP...</span>
  </div>

  <!-- Theme Toggle Icon -->
  <button class="toggle" onclick="toggleTheme()">
    <i class="ri-contrast-line"></i>
  </button>

  <script>
    // Time + Date
    function updateTime() {
      const now = new Date();
      document.getElementById("time").innerText =
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      document.getElementById("date").innerText =
        now.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" });
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Battery API
    if (navigator.getBattery) {
      navigator.getBattery().then(battery => {
        function updateBattery() {
          document.getElementById("battery-level").innerText =
            Math.round(battery.level * 100) + "%";
        }
        updateBattery();
        battery.addEventListener("levelchange", updateBattery);
      });
    }

    // Get IP
    fetch("https://api64.ipify.org?format=json")
      .then(res => res.json())
      .then(data => document.getElementById("ip").innerText = data.ip);

    // Clock animation
    anime({
      targets: '.time',
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 1500,
      easing: 'easeOutElastic'
    });

    // Theme toggle
    function toggleTheme() {
      document.body.classList.toggle("light");
    }
  </script>
</body>
</html>`;
