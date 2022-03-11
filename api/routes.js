const express = require("express");
const humanMovesRoute = require("./humanMoves/humanMoves.route");
const authenticationRoute = require("./authentication/authentication.route");
const graphQlRoute = require("./GraphQl.route");

module.exports = (app) => {
    //express session
    let router = express.Router();
    app.use("/process",  humanMovesRoute(router));
    app.use("/authorize", authenticationRoute(router)); 
    app.use("/queries", graphQlRoute(router));   
  };