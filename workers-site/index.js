addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  try {
    return await fetch(new URL(request.url, `https://${request.headers.get('host')}`));
  } catch (err) {
    return new Response('Not found', { status: 404 });
  }
}
