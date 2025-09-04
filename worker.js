addEventListener('fetch', event => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  const url = new URL(event.request.url);
  let path = url.pathname;

  // Serve index.html if root or missing
  if (path === "/") path = "/index.html";

  try {
    const file = await fetch(`https://YOUR_BUCKET_OR_RAW_FILES_HOST${path}`);
    if (!file.ok) throw new Error("File not found");
    return new Response(await file.text(), {
      headers: { "content-type": getContentType(path) },
    });
  } catch (err) {
    return new Response("404 Not Found", { status: 404 });
  }
}

function getContentType(path) {
  if (path.endsWith(".html")) return "text/html";
  if (path.endsWith(".css")) return "text/css";
  if (path.endsWith(".js")) return "application/javascript";
  if (path.endsWith(".png")) return "image/png";
  if (path.endsWith(".jpg") || path.endsWith(".jpeg")) return "image/jpeg";
  return "text/plain";
}
