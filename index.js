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
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Jerry API</title>
  <style>
    body { margin:0; font-family:sans-serif; background:#000; color:#fff; text-align:center; }
    h1 { margin-top:10vh; font-size:3em; }
    p { font-size:1.2em; }
    a { color:#0ff; text-decoration:none; margin:0 10px; }
    .counter { margin-top:40px; font-size:1.5em; color:#0ff; }
  </style>
</head>
<body>
  <h1>🚀 Welcome to Jerry API</h1>
  <p>Clean & Powerful Tools for Developers</p>
  <p>
    <a href="/spotify">/spotify</a> | 
    <a href="/naruto">/naruto</a> | 
    <a href="/lost">/lost</a> | 
    <a href="/comingsoon">/comingsoon</a>
  </p>
  <div class="counter">
    Total Visitors: <span id="visitors">{{VISITORS}}</span>
  </div>
</body>
</html>`;

/* ================= Error Page (Glitch Neon with Music) ================= */
const errorHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Error - Jerry API</title>
  <style>
    body {
      margin: 0;
      height: 100vh;
      background: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
    h1 {
      font-size: 5em;
      color: #0ff;
      text-shadow: 0 0 5px #0ff, 0 0 15px #0ff, 0 0 30px #f0f, 0 0 50px #f0f;
      position: relative;
      animation: glitch 2s infinite;
    }
    @keyframes glitch {
      0% { transform: translate(0); }
      20% { transform: translate(-5px, 5px); }
      40% { transform: translate(-5px, -5px); }
      60% { transform: translate(5px, 5px); }
      80% { transform: translate(5px, -5px); }
      100% { transform: translate(0); }
    }
    h1::before, h1::after {
      content: "Intro 500";
      position: absolute;
      left: 0; top: 0;
      width: 100%; height: 100%;
      background: #000;
      overflow: hidden;
      clip: rect(0, 900px, 0, 0);
    }
    h1::before {
      left: 2px;
      text-shadow: -2px 0 red;
      animation: glitchTop 2s infinite linear alternate-reverse;
    }
    h1::after {
      left: -2px;
      text-shadow: -2px 0 blue;
      animation: glitchBottom 2s infinite linear alternate-reverse;
    }
    @keyframes glitchTop {
      0% { clip: rect(0, 9999px, 0, 0); }
      50% { clip: rect(10px, 9999px, 85px, 0); }
      100% { clip: rect(0, 9999px, 0, 0); }
    }
    @keyframes glitchBottom {
      0% { clip: rect(0, 9999px, 0, 0); }
      50% { clip: rect(85px, 9999px, 140px, 0); }
      100% { clip: rect(0, 9999px, 0, 0); }
    }
    audio { display:none; }
  </style>
</head>
<body>
  <h1>Intro 500</h1>
  <audio autoplay loop>
    <source src="https://files.catbox.moe/f5855r.mp4" type="audio/mpeg">
  </audio>
</body>
</html>`;
