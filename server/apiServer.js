const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));

const middleWare = jsonServer.defaults({
  static: "node_modules/json-server/dist",
});

server.use(middleWare);

server.use(jsonServer.bodyParser);
server.use(function (req, res, next) {
  setTimeout(next, 200);
});

// Create All Posts Request Handler
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// Get Email ID and Password from the request body

// Use default router
server.use(router);

// Start server
const port = 3002;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
