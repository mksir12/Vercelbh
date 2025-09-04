export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Favicon
    if (url.pathname === '/favicon.ico') {
      return new Response('', { status: 204 });
    }

    // Determine key in KV
    const path = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);

    try {
      const file = await env.WEBSITE_KV.get(path);
      if (!file) return new Response('File not found', { status: 404 });

      let contentType = 'text/html';
      if (path.endsWith('.css')) contentType = 'text/css';
      else if (path.endsWith('.js')) contentType = 'application/javascript';
      else if (path.endsWith('.json')) contentType = 'application/json';
      else if (path.endsWith('.png')) contentType = 'image/png';
      else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) contentType = 'image/jpeg';

      return new Response(file, { headers: { 'Content-Type': contentType } });
    } catch (err) {
      return new Response('Internal Server Error', { status: 500 });
    }
  }
};
