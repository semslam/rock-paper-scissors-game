import express from "express";
import humanMovesRoute from "./humanMoves/humanMoves.route.js";

export default (app) => {
    let router = express.Router();
    app.use("/process", humanMovesRoute(router));
    // app.use("/api_v1/authorize", authorRoute(router));
    // app.use("/api_v1/template", templateRoute(router));
    // app.use("/api_v1/user", userRoute(router));
    // app.use("/api_v1/message", messageRoute(router));
    
  };