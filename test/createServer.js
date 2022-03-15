const express = require("express");
const routes = require("../api/routes");

function createServer() {
  const app = express();
  app.use(express.json());
  routes(app);
  return app;
}

module.exports = createServer;