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
