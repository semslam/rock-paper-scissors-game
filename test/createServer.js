const express = require("express");
const routes = require("../api/routes");
const {authenticateToken} = require("../middleware/jsonwebtokenAuthentication");

function createServer() {
  const app = express();

  app.use(express.json());

//   app.use(authenticateToken);

  routes(app);

  return app;
}

module.exports = createServer;