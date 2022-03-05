import chalk from "chalk";
import { createSpinner } from "nanospinner";
import GameComponents from "./GameComponents.js";
import {repeatedValues, printOutType,isConsoleOrApi} from "../libraries/sustainedValues.js";
import {getResult} from "../response/Princenter.js"
import sleep from "../libraries/sleep.js";
import {create,update,findOne,find} from "../repositories/GameRep.js"

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
    const [CONSOLE,API] = isConsoleOrApi; 
    
   const resType = {draw:"Draw",win:"Win"}

const gameComponents = new GameComponents();
let gameRecord = {}

let rowData = []
let drawTimes =0
let winningTimes = 0;
 const compilingResult = (records,resultType)=>{
    
    rowData.push({ resultType:resultType,playerOne:COMPUTER,playerOneMove:records.moves.computerMove,playerOneScores:records.scores.computerScore,
        playerTwo:records.playerName,playerTwoMove:records.moves.playerMove,playerTwoScores:records.scores.playerScore});
    gameRecord.playingHistory = rowData;
     
 }

 const finalCompile = (records)=>{
    gameRecord.clientId = "62222dc983398810e7d52f23";
    gameRecord.username = "semslam@gmail.com";
    gameRecord.gameMode =  "api";
    gameRecord.gameType = records.gameOption;
    gameRecord.drawTimes =  drawTimes; 
    gameRecord.winningTimes = winningTimes;
    gameRecord.scoreRecord ={
        playerOne:{
            name:COMPUTER,
            scores:records.scores.computerScore
        },
        playerTwo:{
            name:records.playerName,
            scores:records.scores.playerScore
        }
    }
 }

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
         drawTimes += 1
        resultStick.push(text);
        tempResult.push(text);
        compilingResult(properties,resType.draw);
        console.log(`|========SEMSALM========|${gameResult}`)
        if(gameOption === HUMAN_VS_COMPUTER)
           return getResult(apiRes,"TIED CONTINUE",tempResult);
    }
     
}
    let permanentTied = async (properties,apiRes)=>{
        const {gameResult,playerName,moves,scores,tieCount,gameMode,gameOption} = properties;
        let commonText = commonTextDisplay(gameResult,playerName,moves,scores);
        let path = ` 🙅‍♂️ continuing tie after ${tieCount} rounds of play, which is now officially tied`;
        let text = `The game sponsored by ${commonText},${gameMode === CONSOLE? chalk.red(path): path}`;
        if(gameMode === CONSOLE)
        await spinSleepAndPrint(PERM_TIED,text);
        else{
            drawTimes +=1
           
            finalCompile(properties)
            gameRecord.isWin = false;
            compilingResult(properties,resType.draw);
            resultStick.push(text);
            gameRecord.rowRecords = resultStick;

            resultStick = [];
            tempResult = [];
            rowData = []
            drawTimes =0;
            winningTimes =0;
            console.log(apiRes)
            console.log(`|========SEMSALM========|${gameResult}`)
            console.log(gameRecord);
            // insert the result in database
            await create(gameRecord)
           return getResult(apiRes,"TIED",gameRecord)
        }
             
    }
   let currentScore = async (properties,apiRes) =>{
        const {gameResult,playerName,moves,scores,gameMode,gameRound,gameOption} = properties;
        let commonText = commonTextDisplay(gameResult,playerName,moves,scores);
        let text = `Current score..., ** round ${4 - gameRound } ** ${commonText}, ${gameMode === CONSOLE? chalk.green("Play again"):"Play again"}`;
        if(gameMode === CONSOLE)
          await spinSleepAndPrint(CURR_SCORE,text);
        else{
          
            winningTimes +=1;
            compilingResult(properties,resType.win);
            resultStick.push(text);
            tempResult.push(text);
            console.log(`|========SEMSALM========|${gameResult}`)
            if(gameOption === HUMAN_VS_COMPUTER)
               return getResult(apiRes,"CURRENT SCORE",tempResult);
        }
    }
   let  finalWinner = async (properties,apiRes) =>{
        const {gameResult,playerName,moves,scores,gameMode,gameOption} = properties;
        let commonText = commonTextDisplay(gameResult,playerName,moves,scores);
        let text = `The winner is ${gameResult} *🤝 😁 🤴 🥳 🥂 🕺 💃 🍾* ${commonText}`;
        if(gameMode === CONSOLE)
          await spinSleepAndPrint(WINNER,text);
        else{
            gameRecord.isWin = true;
            gameRecord.winner = gameResult;
            winningTimes +=1;
            finalCompile(properties);
            compilingResult(properties,resType.win);
            resultStick.push(text);
            gameRecord.rowRecords = resultStick;

            resultStick = [];
            tempResult = [];
            rowData = [];
            drawTimes = 0;
            winningTimes = 0;
            console.log(apiRes)
            console.log(`|========SEMSALM========|${gameResult}`)
            console.log(gameRecord)
            await create(gameRecord)
           return getResult(apiRes,"WINNER",gameRecord)
        }
    }



export default {
    temporaryTied,
    permanentTied,
    currentScore,
    finalWinner
}