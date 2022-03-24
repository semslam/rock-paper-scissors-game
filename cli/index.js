#!/usr/bin/env node

const { isConsoleOrApi} = require("../libraries/sustainedValues");
const RockPaperScissor = require("../services/RockPaperScissor");
const [CONSOLE,API] = isConsoleOrApi
const rockPaperScissor = new RockPaperScissor(CONSOLE);
//Starting point for CLI mode 

const startGame = ()=>{
    try {
        rockPaperScissor.cliWelcome();
    } catch (err) {
        console.log(err.message);
    }
    
}
startGame();



