#!/usr/bin/env node

const { isConsoleOrApi} = require("../libraries/sustainedValues");
const RockPaperScissor = require("../services/RockPaperScissor");
const ConsoleMode = require("./ConsoleMode");
const [CONSOLE,API] = isConsoleOrApi
const rockPaperScissor = new RockPaperScissor(CONSOLE);
//Starting point for CLI mode  
rockPaperScissor.cliWelcome();



