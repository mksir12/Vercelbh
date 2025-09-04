export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/favicon.ico') {
      return new Response('', { status: 204 });
    }
      
    const path = url.pathname;
    const method = request.method;


    if (path.startsWith('/spotify')) {
      return Response.json([{ id: 1, text: "Nice API!" }]);
      }
    } else if (path.startsWith('/naruto')) {  // <- new route for naruto video
      return Response.json({ username: "guest", role: "admin" });
    } else if (path.startsWith('/lost')) {
      const htmlRes = `<!DOCTYPE html><html lang="en"><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lost Episodes</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap" rel="stylesheet">
  <style>
    * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
       }

body {
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  background: url('https://files.catbox.moe/al89oi.png') no-repeat center center fixed;
  background-size: cover;
  padding: 40px 20px; /* padding to create space around container */
  color: #eee;
  position: relative;
  overflow-y: auto; /* enable scrolling */
  scrollbar-width: thin;
  scrollbar-color: rgba(107, 185, 240, 0.4) transparent;
}

body::-webkit-scrollbar {
  width: 8px;
}

body::-webkit-scrollbar-thumb {
  background: rgba(107, 185, 240, 0.3);
  border-radius: 8px;
}

.container {
  background: rgba(0, 0, 0, 0.65);
  border-radius: 30px;
  padding: 40px;
  max-width: 400px;
  width: 100%;
  margin: auto; /* center horizontally */
  box-shadow: 0 20px 40px rgba(0,0,0,0.8);
  text-align: center;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  color: #d0e8ff;
}

/* Overlay gradient on background for subtle darkening */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  z-index: 0;
  pointer-events: none;
}



.profile-pic {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 4px solid #6bb9f0;
  box-shadow: 0 0 20px #6bb9f0;
  object-fit: cover;
  margin: 0 auto 25px;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.profile-pic:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 0 40px #4d94f3;
}

h1 {
  font-weight: 600;
  font-size: 2.5rem;
  color: #6bb9f0;
  margin-bottom: 6px;
  letter-spacing: 2px;
}

p.subtitle {
  font-size: 1rem;
  font-style: italic;
  margin-bottom: 30px;
  color: #a0b9d8;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 35px;
}

.links button {
  display: inline-block;
  background: linear-gradient(135deg, #6bb9f0, #4d94f3);
  color: #0d1a2b;
  font-weight: 600;
  padding: 14px 24px;
  border-radius: 50px;
  box-shadow: 0 6px 15px rgba(107, 185, 240, 0.6);
  border: none;
  cursor: pointer;
  transition: all 0.35s ease;
  letter-spacing: 1px;
  user-select: none;
  position: relative;
  overflow: hidden;
  font-size: 1rem;
}

.links button::before {
  content: "";
  position: absolute;
  left: -75%;
  top: 0;
  width: 50%;
  height: 100%;
  background: rgba(255,255,255,0.35);
  transform: skewX(-25deg);
  transition: left 0.5s ease;
  z-index: 0;
}

.links button:hover::before {
  left: 125%;
}

.links button:hover {
  box-shadow: 0 10px 25px rgba(77, 148, 243, 0.85);
  color: #fff;
}

button#audio-btn {
  background: transparent;
  border: 2px solid #6bb9f0;
  border-radius: 30px;
  color: #6bb9f0;
  font-weight: 700;
  padding: 14px 36px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease, color 0.3s ease;
  margin: 0 auto 40px;
  display: block;
  font-size: 1rem;
  letter-spacing: 2px;
  box-shadow: 0 0 12px #6bb9f0;
  position: relative;
  overflow: hidden;
}

button#audio-btn:hover {
  background-color: #6bb9f0;
  color: #0d1a2b;
  box-shadow: 0 0 30px #4d94f3;
}

#time {
  font-size: 1.3rem;
  font-weight: 600;
  color: #6bb9f0;
  letter-spacing: 3px;
  margin-bottom: 40px;
  user-select: none;
  font-family: 'Courier New', Courier, monospace;
}

.about {
  font-size: 1rem;
  line-height: 1.6;
  color: #c2d9ff;
  text-align: left;
  border: 2px solid #6bb9f0;
  border-radius: 15px;
  padding: 20px 25px;
  box-shadow: inset 0 0 20px #6bb9f0;
  user-select: text;
}

.about h3 {
  margin-bottom: 12px;
  color: #6bb9f0;
  font-weight: 700;
  letter-spacing: 1.5px;
}

/* Floating particle effect */
.particle {
  position: absolute;
  background: #6bb9f0;
  border-radius: 50%;
  opacity: 0.25;
  animation: floatUp 6s ease-in-out infinite;
  pointer-events: none;
  filter: drop-shadow(0 0 4px #6bb9f0);
}

@keyframes floatUp {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.25;
  }
  50% {
    opacity: 0.7;
    transform: translateY(-40px) scale(1.2);
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.25;
  }
}
</style>
</head>
<body>
  <div class="container" role="main" aria-label="Lost Full Part Here.">
    <img src="https://ar-hosting.pages.dev/1748090755957.jpg" alt="Lost Full Part Here!" class="profile-pic" loading="lazy" tabindex="0">
    <h1>Lost Inc</h1>
    <p class="subtitle">ロスト・インセスト フルパート</p>

    <nav class="links" aria-label="Profile action buttons">
      <button type="button" onclick="window.location.href='/lost-part1'" tabindex="0">Lost Part-1</button>
      <button type="button" onclick="window.location.href='/lost-part2'" tabindex="0">Lost Part-2</button>
      <button type="button" onclick="window.location.href='/lost-part3'" tabindex="0">Lost Part-3</button>
      <button type="button" onclick="window.location.href='/lost-part4'" tabindex="0">Lost Part-4</button>
      <button type="button" onclick="window.location.href='/lost-part5'" tabindex="0">Lost Part-5</button>
      <button type="button" onclick="window.location.href='/lost-part6'" tabindex="0">Lost Part-6</button>
      <button type="button" onclick="window.location.href='/lost-part7'" tabindex="0">Lost Part-7</button>
    </nav>

    <button id="audio-btn" aria-pressed="false" aria-label="Play or pause background music" tabindex="0">Play Audio</button>
    <audio id="background-audio" src="https://files.catbox.moe/vyyryh.mp4" preload="auto" aria-hidden="true"></audio>

    <div id="time" aria-live="polite" aria-atomic="true" role="timer"></div>

    <section class="about" tabindex="0" aria-label="About section">
      <h3></h3>
      <p></p>
        You can click and view Lost Pdf Online Here! Click above to get Episode and Watch Online.
      <p></p>
    </section>
  </div>

<script>
  const audio = document.getElementById('background-audio');
  const audioBtn = document.getElementById('audio-btn');

audioBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    audioBtn.setAttribute('aria-pressed', 'true');
    audioBtn.textContent = 'Pause Audio';
  } else {
    audio.pause();
    audioBtn.setAttribute('aria-pressed', 'false');
    audioBtn.textContent = 'Play Audio';
  }
});

// Live time display
function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString();
  document.getElementById('time').textContent = timeStr;
}

setInterval(updateTime, 1000);
updateTime();

// Generate floating particles
const container = document.querySelector('.container');
const particleCount = 15;

for (let i = 0; i < particleCount; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random() * 8 + 4 + 'px';
  p.style.width = size;
  p.style.height = size;
  p.style.left = Math.random() * 100 + '%';
  p.style.top = Math.random() * 100 + '%';
  p.style.animationDelay = Math.random() * 6 + 's';
  p.style.animationDuration = (4 + Math.random() * 4) + 's';
  container.appendChild(p);
}
</script>
</body>
</html>`;
      return new Response(htmlRes, {
        headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      });
    } else if (path.startsWith('/comingsoon')) {
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Coming Soon | JerryCoder</title>
  <link href="https://fonts.googleapis.com/css2?family=Heebo&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      font-family: 'Heebo', sans-serif;
      background-image: url('https://ik.imagekit.io/Oggy/WwiXqo_BDCPRPVpk.jpg');
      background-size: cover;
      background-position: center center;
      background-attachment: fixed;
      background-repeat: no-repeat;
      color: #fff;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .coming-soon {
      text-align: center;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 40px;
      border-radius: 10px;
    }

    .coming-soon h1 {
      font-size: 48px;
      margin-bottom: 20px;
      color: #ff6347;
    }

    .home-box {
      margin-top: 30px;
    }

    .home-box a {
      text-decoration: none;
      background-color: #ff6347;
      color: #fff;
      padding: 15px 30px;
      font-size: 18px;
      border-radius: 8px;
      display: inline-block;
    }

    .home-box a:hover {
      background-color: #e53d2e;
      transition: background-color 0.3s ease;
    }
  </style>
</head>
<body>
  <div class="coming-soon">
    <h1>Coming Soon</h1>
    <p>Something awesome is in the works...</p>
    <div class="home-box">
      <a href="https://jerrycoder.oggyapi.workers.dev/">Go to Home</a>
    </div>
  </div>
</body>
</html>`;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=UTF-8' },
      });
    }

    // Serve the inline HTML and CSS for the root path or any unmatched paths
    const jerryHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Jerry API</title>
  <link rel="icon" href="https://jerryapi.vercel.app/o8CCbg.jpg" type="image/jpeg">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: 'Poppins', sans-serif;
      background-color: #000;
      color: #eee;
    }

    header {
      background-color: #0a0a0a;
      padding: 15px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #333;
    }

    .logo {
      font-size: 20px;
      font-weight: 600;
      color: #fff;
    }

    nav a {
      margin-left: 20px;
      color: #ccc;
      text-decoration: none;
      font-weight: 500;
      font-size: 14px;
      transition: color 0.3s;
    }

    nav a:hover {
      color: #fff;
    }

    .hero {
      min-height: 90vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 40px 20px;
    }

    .hero h1 {
      font-size: 36px;
      font-weight: 500;
      margin-bottom: 15px;
    }

    .hero p {
      font-size: 16px;
      color: #bbb;
      margin-bottom: 25px;
    }

    .fade {
      transition: opacity 0.5s ease-in-out;
      opacity: 1;
   }

     .fade.hidden {
       opacity: 0;
    }
    
    .btn {
      background: none;
      border: 1px solid #fff;
      padding: 10px 25px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      border-radius: 20px;
      transition: all 0.3s;
    }

    .btn:hover {
      background-color: #fff;
      color: #000;
    }

    .features {
      padding: 60px 20px;
      max-width: 960px;
      margin: auto;
    }

    .features h2 {
      font-size: 28px;
      text-align: center;
      margin-bottom: 40px;
    }

    .api-item {
      background: #111;
      padding: 18px;
      border-radius: 8px;
      margin-bottom: 20px;
      border: 1px solid #222;
    }

    .api-item h3 {
      color: #fff;
      font-size: 18px;
      margin-bottom: 6px;
    }

    .api-item p {
      color: #aaa;
      font-size: 14px;
      margin-bottom: 10px;
    }

    .api-buttons {
      display: flex;
      gap: 10px;
    }

    .api-buttons button {
      background: none;
      border: 1px solid #fff;
      padding: 6px 16px;
      font-size: 13px;
      color: #fff;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .api-buttons button:hover {
      background-color: #fff;
      color: #000;
    }

    footer {
      text-align: center;
      padding: 20px;
      color: #777;
      font-size: 13px;
      background: #0a0a0a;
    }
  </style>
</head>
<body>

  <header>
    <div class="logo">Jerry API</div>
    <nav>
      <a href="#features">API Menu</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
  
<section class="hero"> 
  <h1>Welcome to Jerry API</h1>
  <p>Clean & Powerful Tools for Developers</p>
  <br>
  <h2>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" 
       width="40" 
       height="40" 
       style="margin-right:10px; vertical-align: middle;">
  Total Requests: <strong id="request-counter" class="fade">6020</strong>
</h2>
  <br><br>
  <a href="#features" class="btn">Get Started</a>
</section>

  <section id="features" class="features">
    <h2>API Menu</h2>

    <div class="api-item">
      <h3>Instagram Downloader</h3>
      <p>Download Instagram media via post URL.</p>
      <div class="api-buttons">
        <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/insta?url=https://www.instagram.com/reel/DJHgFtpzyFG')">Try</button>
        <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/insta?url=')">Copy</button>
      </div>
    </div>

    <div class="api-item">
    <h3>API 2: YouTube Search</h3>
                <p>Search for YouTube videos using keywords and get quick results.</p>
                <div class="api-buttons">
                <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/yt-search?q=cat videos')">Try</button>
                <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/yt-search?q=')">Copy</button>
                </div>
              </div>
              
              <div class="api-item">
                <h3>API 3: YouTube Downloader</h3>
                <p>Download YouTube videos in various formats.</p>
                <div class="api-buttons">
                  <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/ytmp4?url=https://youtube.com/shorts/9OzwU9zzcYE?si=1XELEsEMqAOaJysx')">Try</button>
                  <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/ytmp4?url=')">Copy</button>
                </div>
              </div>
              
              <div class="api-item">
                <h3>API 4: Facebook Downloader</h3>
                <p>Download Facebook videos.</p>
                <div class="api-buttons">
                  <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/fb?url=')">Try</button>
                  <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/fb?url=')">Copy</button>
                </div>
              </div>
              
              <div class="api-item">
                <h3>API 5: Spotify Search</h3>
                <p>Search for Spotify Audios using keywords and get quick results.</p>
                <div class="api-buttons">
                <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/spotify?search=jhol slowed')">Try</button>
                <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/spotify?search=')">Copy</button>
                </div>
              </div>
              
              <div class="api-item">
                <h3>API 6: Spotify Audio Downloader</h3>
                <p>Download audio from Spotify by track name or link.</p>
                <div class="api-buttons">
                  <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/dspotify?url=https://open.spotify.com/track/3aYSK9wOna5vkPUcHN7MW8')">Try</button>
                  <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/dspotify?url=')">Copy</button>
                </div>
              </div>
              
              <div class="api-item">
              <h3>API 7: XNXX Search</h3>
              <p>Search for videos on XNXX using keywords.</p>
              <div class="api-buttons">
              <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/xnxx?search=teacher')">Try</button>
              <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/xnxx?search=')">Copy</button>
              </div>
              </div>
              
              <div class="api-item">
              <h3>API 8: XNXX Downloader</h3>
              <p>Download XNXX videos by providing a video URL.</p>
              <div class="api-buttons">
              <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/dxnxx?url=https://www.xnxx.com/video-z6yp9c2/tutor4k._young_man_doesnt_want_to_study_but_drill_this_beautiful_teacher')">Try</button>
              <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/dxnxx?url=')">Copy</button>
              </div>
              </div>
              
              <div class="api-item">
                <h3>API 9: Waifu Downloader</h3>
                <p>Download random waifu images.</p>
                <div class="api-buttons">
                  <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/waifu')">Try</button>
                  <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/waifu')">Copy</button>
                </div>
              </div>
              
              <div class="api-item">
                <h3>API 10: Pinterest Downloader</h3>
                <p>Download images and videos from Pinterest easily.</p>
                <div class="api-buttons">
                  <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/pinterest?url=https://pin.it/5GyJ54onB')">Try</button>
                  <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/pinterest?url=')">Copy</button>
                </div>
              </div>

              <div class="api-item">
               <h3>API 11: Web to ZIP</h3>
               <p>Download a full website as a ZIP file from any public URL.</p>
               <div class="api-buttons">
               <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/web2zip?url=https://oggy-api.vercel.app/')">Try</button>
               <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/web2zip?url=')">Copy</button>
               </div>
             </div>
             
              <div class="api-item">
                <h3>API 12: Screenshot Generator</h3>
                <p>Capture mobile-style screenshots of any website.</p>
                <div class="api-buttons">
                <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/ss?url=https://oggy-api.vercel.app/')">Try</button>
                <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/ss?url=')">Copy</button>
                </div>
              </div>
              
              <div class="api-item">
              <h3>API 13: Full Page Screenshot</h3>
              <p>Generate a full-page screenshot of any website.</p>
              <div class="api-buttons">
              <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/fullss?url=https://oggy-api.vercel.app/')">Try</button>
              <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/fullss?url=')">Copy</button>
              </div>
              </div>
              
              <div class="api-item">
              <h3>API 14: Neko Image</h3>
              <p>Get a random neko image directly in your browser.</p>
              <div class="api-buttons">
              <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/neko')">Try</button>
              <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/neko')">Copy</button>
              </div>
              </div>
              
              <div class="api-item">
              <h3>API 15: Naruto Video</h3>
              <p>Watch a random Naruto video in your browser. Refresh for a new one!</p>
              <div class="api-buttons">
              <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/naruto')">Try</button>
              <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/naruto')">Copy</button>
              </div>
              </div>

              <div class="api-item">
                <h3>API 16: Nfw Blow</h3>
                <p>Get a random nfw blow image directly in your browser.</p>
                <div class="api-buttons">
                  <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/nsfw/blow')">Try</button>
                  <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/nsfw/blow')">Copy</button>
                </div>
              </div>
              
              <div class="api-item">
                <h3>API 17: Nfw Trap</h3>
                <p>Get a random nfw trap image directly in your browser.</p>
                <div class="api-buttons">
                <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/nsfw/trap')">Try</button>
                <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/nsfw/trap')">Copy</button>
                </div>
              </div>
              
              <div class="api-item">
              <h3>API 18: Nfw Neko</h3>
              <p>Get a random nfw neko image directly in your browser.</p>
              <div class="api-buttons">
              <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/nsfw/neko')">Try</button>
              <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/nsfw/neko')">Copy</button>
              </div>
              </div>
              
              <div class="api-item">
              <h3>API 19: Nfw Waifu</h3>
              <p>Get a random nfw waifu image directly in your browser.</p>
              <div class="api-buttons">
              <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/nsfw/waifu')">Try</button>
              <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/nsfw/waifu')">Copy</button>
              </div>
              </div>
              
              <div class="api-item">
              <h3>API 20: Random Nfw Waifu</h3>
              <p>Watch a random Naruto video in your browser. Refresh for a new one!</p>
              <div class="api-buttons">
              <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/waifu')">Try</button>
              <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/waifu')">Copy</button>
              </div>
              </div>
  
              <div class="api-item">
              <h3>API 21: Lost Stories ( Lost Inc )</h3>
              <p>You can click and view Lost Pdf Online Here! Click above to get Episode and Watch Online..</p>
              <div class="api-buttons">
              <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/lost')">Try</button>
              <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/lost')">Copy</button>
              </div>
             </div>

              <div class="api-item">
                <h3>API 🧿:ㅤ</h3>
                <p>New Api Coming....</p>
                <div class="api-buttons">
                <button onclick="window.open('https://jerrycoder.oggyapi.workers.dev/comingsoon')">Try it</button>
                <button onclick="copyUrl('https://jerrycoder.oggyapi.workers.dev/')">Copy URL</button>
                </div>
              </div>
    <!-- More API sections can be added similarly -->

  </section>

<footer id="contact">
  <p>&copy; 2025 Jerry API — All rights reserved.</p>
  <div style="margin-top: 10px;">
    <a href="https://t.me/oggy_workshop" target="_blank" style="margin-right: 15px; color: #eee; text-decoration: none;">
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/telegram.svg" alt="Telegram" width="20" style="vertical-align: middle; filter: invert(100%); margin-right: 5px;">
      Telegram
    </a>
    <a href="https://wa.me/919633902730" target="_blank" style="color: #eee; text-decoration: none;">
      <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" alt="WhatsApp" width="20" style="vertical-align: middle; filter: invert(100%); margin-right: 5px;">
      WhatsApp
    </a>
  </div>
</footer>


  <script>
  const COUNTER_KEY = "jerry-api-counter";
  const counterEl = document.getElementById("request-counter");

  let counter = parseInt(localStorage.getItem(COUNTER_KEY)) || 6020;
  counterEl.textContent = counter;

  function incrementCounter() {
    // Add fade-out
    counterEl.classList.add("hidden");

    setTimeout(() => {
      counter++;
      localStorage.setItem(COUNTER_KEY, counter);
      counterEl.textContent = counter;

      // Add fade-in
      counterEl.classList.remove("hidden");
    }, 500); // Matches fade-out duration
  }

  // Increase every 3 minutes
  setInterval(incrementCounter, 4000);
  
    function copyUrl(url) {
      navigator.clipboard.writeText(url).then(() => {
        alert('URL copied to clipboard!');
      }).catch(err => {
        console.error('Copy failed', err);
      });
    }
  </script>

</body>
</html>`;

    try {
      let html = jerryHtml;
      let totalVisitors = 0;

      try {
        // Ensure visitors table exists
        await VISITOR_DB.prepare(`
          CREATE TABLE IF NOT EXISTS visitors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `).run();

        // Insert new visitor
        await env.VISITOR_DB.prepare(`INSERT INTO visitors DEFAULT VALUES`).run();

        // Get total visitors
        const result = await env.VISITOR_DB.prepare(
          `SELECT COUNT(*) AS total FROM visitors`
        ).all();
        totalVisitors = result.results[0]?.total || 0;
      } catch (dbErr) {
        console.error("D1 error:", dbErr);
        totalVisitors = 0; // fallback if DB fails
      }

      // Replace placeholders in HTML
      html = html.replace(
        /<h4 class="text-primary mb-0" id="visitors">.*?<\/h4>/,
        `<h4 class="text-primary mb-0" id="visitors">${totalVisitors}</h4>`
      );
      html = html.replace(
        /<h5 class="mb-0" id="total-visitors">.*?<\/h5>/,
        `<h5 class="mb-0" id="total-visitors">${totalVisitors}</h5>`
      );

      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=UTF-8" },
      });
    } catch (err) {
      console.error("HTML error:", err);

      // Fallback if something breaks
      let fallbackHtml = jerryHtml;
      fallbackHtml = fallbackHtml.replace(
        /<h4 class="text-primary mb-0" id="visitors">.*?<\/h4>/,
        `<h4 class="text-primary mb-0" id="visitors">0</h4>`
      );
      fallbackHtml = fallbackHtml.replace(
        /<h5 class="mb-0" id="total-visitors">.*?<\/h5>/,
        `<h5 class="mb-0" id="total-visitors">0</h5>`
      );

      return new Response(fallbackHtml, {
        headers: { "Content-Type": "text/html; charset=UTF-8" },
      });
        }
},
};
