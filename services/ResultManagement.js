import chalk from "chalk";
import { createSpinner } from "nanospinner";
import GameComponents from "./GameComponents.js";
import {repeatedValues, printOutType,isConsoleOrApi} from "../libraries/sustainedValues.js";
import {getResult} from "../response/Princenter.js"
import sleep from "../libraries/sleep.js";

const [
    ROCK,
    PAPER,
    SCISSORS,
    COMPUTER,
    TIED,
    HUMAN_VS_COMPUTER,
    COMPUTER_VS_COMPUTER] = repeatedValues;
    const [ 
        TEMP_TIED, 
        PERM_TIED, 
        CURR_SCORE, 
        WINNER 
        ] = printOutType;
    const [CONSOLE,API, CONSOLE_AND_API] = isConsoleOrApi;    

// var isConsoleOrApi =''
const gameComponents = new GameComponents();

let resultStick = [];
let tempResult = [];
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


let temporaryTied = async (properties,apiRes)=>{
    const {gameResult,playerName,moves,scores,tieCount,gameMode,gameOption} = properties;
    let commonText = commonTextDisplay(gameResult,playerName,moves,scores);
    let text = `The game is tied, ${commonText}, tie count ${tieCount}. ${gameMode === CONSOLE? chalk.green("Continue playing the game"): "Continue playing the game"}`;
    if(gameMode === CONSOLE){
        await spinSleepAndPrint(TEMP_TIED,text);
    }else{
        resultStick.push(text);
        tempResult.push(text);
        console.log(`|========SEMSALM========|${gameResult}`)
        if(gameOption === HUMAN_VS_COMPUTER)
            getResult(apiRes,"TIED CONTINUE",tempResult);
    }
     
}
    let permanentTied = async (properties,apiRes)=>{
        const {gameResult,playerName,moves,scores,tieCount,gameMode} = properties;
        let commonText = commonTextDisplay(gameResult,playerName,moves,scores);
        let path = ` 🙅‍♂️ continuing tie after ${tieCount} rounds of play, which is now officially tied`;
        let text = `The game sponsored by ${commonText},${gameMode === CONSOLE? chalk.red(path): path}`;
        if(gameMode === CONSOLE)
        await spinSleepAndPrint(PERM_TIED,text);
        else{
            resultStick.push(text);
            const data = resultStick;
            resultStick = [];
            tempResult = [];
            console.log(`|========SEMSALM========|${gameResult}`)
            getResult(apiRes,"TIED",data)
        }
             
    }
   let currentScore = async (properties,apiRes) =>{
        const {gameResult,playerName,moves,scores,gameMode,gameRound,gameOption} = properties;
        let commonText = commonTextDisplay(gameResult,playerName,moves,scores);
        let text = `Current score..., ** round ${4 - gameRound } ** ${commonText}, ${gameMode === CONSOLE? chalk.green("Play again"):"Play again"}`
        if(gameMode === CONSOLE)
          await spinSleepAndPrint(CURR_SCORE,text);
        else{
            resultStick.push(text);
            tempResult.push(text)
            console.log(`|========SEMSALM========|${gameResult}`)
            if(gameOption === HUMAN_VS_COMPUTER)
                getResult(apiRes,"CURRENT SCORE",tempResult);
        }
    }
   let  finalWinner = async (properties,apiRes) =>{
        const {gameResult,playerName,moves,scores,gameMode} = properties;
        let commonText = commonTextDisplay(gameResult,playerName,moves,scores);
        let text = `The winner is ${gameResult} *🤝 😁 🤴 🥳 🥂 🕺 💃 🍾* ${commonText}`
        if(gameMode === CONSOLE)
          await spinSleepAndPrint(WINNER,text);
        else{
            resultStick.push(text);
            const data = resultStick;
            resultStick = [];
            tempResult = [];
            getResult(apiRes,"WINNER",data)
        }
    }



export default {
    temporaryTied,
    permanentTied,
    currentScore,
    finalWinner
}