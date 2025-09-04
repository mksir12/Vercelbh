export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // API endpoints definition
    const apiEndpoints = {
      "/api": { description: "Root API docs" },
      "/api/users": { description: "List users" },
      "/api/posts": { description: "List posts" },
      "/api/comments": { description: "List comments" },
      "/api/profile": { description: "Get profile info" }
    };

    // API router
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

    // Static file serving (index.html, css, js)
    return env.ASSETS.fetch(request);
  }
};
