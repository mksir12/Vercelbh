addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Serve files from the workers-site folder
  if (pathname === "/" || pathname === "/index.html") {
    return new Response(await fetch("https://cloudflare-file-hosting.oggyapi.workers.dev/index.html").then(r => r.text()), {
      headers: { "content-type": "text/html;charset=UTF-8" }
    });
  } else if (pathname === "/style.css") {
    return new Response(await fetch("https://cloudflare-file-hosting.oggyapi.workers.dev/style.css").then(r => r.text()), {
      headers: { "content-type": "text/css;charset=UTF-8" }
    });
  } else if (pathname === "/script.js") {
    return new Response(await fetch("https://cloudflare-file-hosting.oggyapi.workers.dev/script.js").then(r => r.text()), {
      headers: { "content-type": "application/javascript;charset=UTF-8" }
    });
  } else {
    return new Response("404 - Not Found", { status: 404 });
  }
}
