#!/usr/bin/env node

import RockPaperScissor from  './services/RockPaperScissor';
import chalk from "chalk";
console.log(chalk.blue('Hello world!'));
const consoleGame = new RockPaperScissor();
consoleGame.startNewGame();