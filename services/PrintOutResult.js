import chalk from "chalk";
import { createSpinner } from "nanospinner";
import GameComponents from "./GameComponents";
import {repeatedValues, printOutType,isConsoleOrApi} from "../libraries/sustainedValues";
import sleep from "../libraries/sleep";

const [
    ROCK,
    PAPER,
    SCISSORS,
    COMPUTER,
    TIED,
    ...values] = repeatedValues;
    const [ 
        TEMP_TIED, 
        PERM_TIED, 
        CURR_SCORE, 
        WINNER 
        ] = printOutType;
    const [CONSOLE,API, CONSOLE_AND_API] = isConsoleOrApi;    

// var isConsoleOrApi =''
const gameComponents = new GameComponents();

/**
 * print out console base result
 * @param {Object} type 
 * @param {String} text 
 */
let spinSleepAndPrint = async (type,text)=>{ 
    const spinner = createSpinner("Loading the result...").start();
    await sleep();
    
    switch (type) {
        case TEMP_TIED:
            spinner.error({text: text,});
            break;
        case PERM_TIED:
            spinner.error({text: text,});
            break;
        case CURR_SCORE:
            spinner.success({text: text,});
            break; 
        case WINNER:
            spinner.success({text: text,});
            break;        
        default:
            console.log('Wrong parameter pass in spinSleepAndPrint')
            break;
    }
    
   
}


/**
   * This format common game result
   * @param {String} gameResult 
   * @param {String} playerName 
   * @param {String} playerMove 
   * @param {String} computerMove 
   * @returns {String} result
   */
 function commonTextDisplay(gameResult,playerName,moves,scores){

    let pickEmojiExpression = (result, actor) =>{return result === actor ? "😁" : result === TIED?  "🙄":"😞"}
     return `(${playerName}):${
         pickEmojiExpression(gameResult,playerName)
       }  ${gameComponents.chooseEmojiMove(moves.playerMove)}(${moves.playerMove}) ${
        scores.playerScore
       } VS ${scores.computerScore} ${moves.computerMove} ${gameComponents.chooseEmojiMove(
        moves.computerMove
       )} ${
         pickEmojiExpression(gameResult,COMPUTER)
       }:(Computer)`;
 };


let temporaryTied = async (properties)=>{
    const {gameResult,playerName,moves,scores,tieCount,gameMode} = properties;

    let text = `The game is tied, ${commonTextDisplay(gameResult,playerName,moves,scores)}, tie count ${tieCount}. ${chalk.green("Continue playing the game")}`;
    if(gameMode === CONSOLE){
        await spinSleepAndPrint(TEMP_TIED,text);
    }else{ 
       return text; }
     
}
    let permanentTied = async (properties)=>{
        const {gameResult,playerName,moves,scores,tieCount,gameMode} = properties;
       
        let text = `The game sponsored by ${commonTextDisplay(gameResult,playerName,moves,scores)},${chalk.red(` 🙅‍♂️ continuing tie after ${tieCount} rounds of play, which is now officially tied`)}`;
        if(gameMode === CONSOLE)
        await spinSleepAndPrint(PERM_TIED,text);
        else
          return text;   
    }
   let currentScore = async (properties) =>{
        const {gameResult,playerName,moves,scores,gameMode,gameRound} = properties;
        let text = `Current score..., ** round ${4 - gameRound } ** ${commonTextDisplay(gameResult,playerName,moves,scores)}, ${chalk.green("Play again")}`
        if(gameMode === CONSOLE)
          await spinSleepAndPrint(CURR_SCORE,text);
        else
        return text;
    }
   let  finalWinner = async (properties) =>{
        const {gameResult,playerName,moves,scores,gameMode} = properties;
        let text = `The winner is ${gameResult} *🤝 😁 🤴 🥳 🥂 🕺 💃 🍾* ${commonTextDisplay(gameResult,playerName,moves,scores)}`
        if(gameMode === CONSOLE)
          await spinSleepAndPrint(WINNER,text);
        else
        return text;
    }



export default {
    temporaryTied,
    permanentTied,
    currentScore,
    finalWinner
}