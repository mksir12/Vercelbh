export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ===== API endpoints =====
    const apiEndpoints = {
      "/api": { description: "Root API docs" },
      "/api/users": { description: "List users" },
      "/api/posts": { description: "List posts" },
      "/api/comments": { description: "List comments" },
      "/api/profile": { description: "Get profile info" }
    };

    // ===== API Router =====
    if (url.pathname.startsWith("/api")) {
      if (url.pathname === "/api") {
        return Response.json({
          name: "API Explorer",
          version: "1.0",
          endpoints: apiEndpoints
        });
      }
      if (url.pathname === "/api/users") {
        return Response.json([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
      }
      if (url.pathname === "/api/posts") {
        return Response.json([{ id: 1, title: "Hello World" }]);
      }
      if (url.pathname === "/api/comments") {
        return Response.json([{ id: 1, text: "Nice API!" }]);
      }
      if (url.pathname === "/api/profile") {
        return Response.json({ username: "guest", role: "admin" });
      }
      return new Response("Not Found", { status: 404 });
    }

    // ===== Static Files =====
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(indexHTML, {
        headers: { "content-type": "text/html;charset=UTF-8" }
      });
    }

    if (url.pathname === "/style.css") {
      return new Response(styleCSS, {
        headers: { "content-type": "text/css" }
      });
    }

    if (url.pathname === "/script.js") {
      return new Response(scriptJS, {
        headers: { "content-type": "application/javascript" }
      });
    }

    return new Response("Not Found", { status: 404 });
  }
};

// ====== Static Assets ======

// index.html
const indexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>API Explorer Docs</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header>
    <h1>📘 API Explorer Documentation</h1>
    <p>Search and browse available API endpoints.</p>
  </header>

  <main>
    <input type="text" id="search" placeholder="🔍 Search endpoints..." />
    <ul id="results"></ul>
  </main>

  <footer>
    <p>Powered by Cloudflare Workers</p>
  </footer>

  <script src="/script.js"></script>
</body>
</html>`;

// style.css
const styleCSS = `body {
  font-family: 'Segoe UI', sans-serif;
  background: #f4f6fa;
  margin: 0;
  padding: 0;
  color: #333;
}
header {
  background: #4f46e5;
  color: #fff;
  text-align: center;
  padding: 30px 20px;
}
header h1 {
  margin: 0;
  font-size: 2em;
}
header p {
  margin-top: 8px;
  font-size: 1.1em;
}
main {
  max-width: 800px;
  margin: 30px auto;
  padding: 0 20px;
}
#search {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 10px;
  margin-bottom: 20px;
}
#results {
  list-style: none;
  padding: 0;
}
#results li {
  background: #fff;
  margin: 10px 0;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.15s;
}
#results li:hover {
  transform: translateX(5px);
  background: #eef3ff;
}
footer {
  text-align: center;
  padding: 20px;
  font-size: 14px;
  background: #f9fafc;
  border-top: 1px solid #eee;
}`;

// script.js
const scriptJS = `async function fetchAPIs() {
  const res = await fetch("/api");
  const data = await res.json();
  return Object.keys(data.endpoints || {});
}
document.addEventListener("DOMContentLoaded", async () => {
  const search = document.getElementById("search");
  const results = document.getElementById("results");
  const endpoints = await fetchAPIs();
  function render(list) {
    results.innerHTML = "";
    list.forEach(ep => {
      const li = document.createElement("li");
      li.textContent = ep;
      li.onclick = () => window.open(ep, "_blank");
      results.appendChild(li);
    });
  }
  render(endpoints);
  search.addEventListener("input", () => {
    const term = search.value.toLowerCase();
    const filtered = endpoints.filter(ep => ep.toLowerCase().includes(term));
    render(filtered);
  });
});`;
