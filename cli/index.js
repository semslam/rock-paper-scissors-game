#!/usr/bin/env node

// import ConsoleMode from "./cli/ConsoleMode";

// const consoleMode = new ConsoleMode()
// consoleMode.welcome()
import RockPaperScissor from  '../services/RockPaperScissor.js';
const consoleGame = new RockPaperScissor("console");
consoleGame.consoleWelcome();
