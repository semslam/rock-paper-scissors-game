import express from "express";
import humanMovesRoute from "./humanMoves/humanMoves.route.js";
import authenticationRoute from "./authentication/authentication.route.js";

export default (app) => {
    let router = express.Router();
    app.use("/process",  humanMovesRoute(router));
    app.use("/authorize", authenticationRoute(router));    
  };