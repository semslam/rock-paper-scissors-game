#!/usr/bin/env node

// import ConsoleMode from "./cli/ConsoleMode";

// const consoleMode = new ConsoleMode()
// consoleMode.welcome()
const RockPaperScissor = require("../services/RockPaperScissor");
const consoleGame = new RockPaperScissor("console");
consoleGame.consoleWelcome();
