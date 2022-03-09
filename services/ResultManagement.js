import chalk from "chalk";
import { createSpinner } from "nanospinner";
import GameComponents from "./GameComponents.js";
import {repeatedValues, printOutType,isConsoleOrApi, resType} from "../libraries/sustainedValues.js";
import sleep from "../libraries/sleep.js";
import {create} from "../repositories/GameRep.js";
import {decryptToken} from "../libraries/encryptAndDecrypt.js";
import {successResponse,errorResponse} from "../response/apiResponse.js";
import {HttpCodes} from "../libraries/sustainedValues.js"

const [ROCK,PAPER,SCISSORS,COMPUTER,TIED,HUMAN_VS_COMPUTER,COMPUTER_VS_COMPUTER] = repeatedValues;
const [TEMP_TIED, PERM_TIED,CURR_SCORE, WINNER ] = printOutType;
const [CONSOLE,API] = isConsoleOrApi;  
const {draw,win} = resType;

const gameComponents = new GameComponents();
let gameRecord = {}

let rowData = []
let drawTimes =0
let winningTimes = 0;
let resultStick = [];
let tempResult = [];


/**
 * compiling the game row Result
 * @param {Object} records 
 * @param {String} resultType 
 */
 const compilingResult = (records,resultType)=>{
    
    rowData.push({ 
        resultType:resultType,playerOne:COMPUTER,
        playerOneMove:records.moves.computerMove,
        playerOneScores:records.scores.computerScore,
        playerTwo:records.playerName,
        playerTwoMove:records.moves.playerMove,
        playerTwoScores:records.scores.playerScore
    });
    gameRecord.playingHistory = rowData;
     
 }
/**
 * Compile final game result
 * @param {Object} records 
 * @param {String} userToken 
 */
 const finalCompile = async (records,userToken)=>{
    const uniqId = async (token)=> {return await decryptToken(token);}
    const token = await uniqId(userToken);
    gameRecord.userId = token.id;
    gameRecord.gameMode =  API;
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
       } VS (${scores.computerScore}) ${moves.computerMove} ${gameComponents.chooseEmojiMove(
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
        compilingResult(properties,draw);
        console.log(`|========SEMSALM====temporaryTied====|${gameResult}`);
        console.log(properties);
        if(gameOption === HUMAN_VS_COMPUTER){
            return successResponse(apiRes,HttpCodes.OK,"TIED CONTINUE",resultStick);
        }
    }
     
}
    let permanentTied = async (properties,apiRes)=>{
        const {gameResult,playerName,moves,scores,tieCount,gameMode,gameOption,token} = properties;
        let commonText = commonTextDisplay(gameResult,playerName,moves,scores);
        let path = ` 🙅‍♂️ continuing tie after ${tieCount} rounds of play, which is now officially tied`;
        let text = `The game sponsored by ${commonText},${gameMode === CONSOLE? chalk.red(path): path}`;
        if(gameMode === CONSOLE)
        await spinSleepAndPrint(PERM_TIED,text);
        else{
            drawTimes +=1
           
            await finalCompile(properties,token)
            gameRecord.isWin = false;
            gameRecord.winner = "N/A";
            compilingResult(properties,draw);
            resultStick.push(text);
            gameRecord.rowRecords = resultStick;

            resultStick = [];tempResult = [];rowData = [];drawTimes =0;winningTimes =0;
            
            // console.log(apiRes)
            console.log(`|========SEMSALM====permanentTied====|${gameResult}`)
            console.log(properties);
            // insert the result in database
            const game = await create(gameRecord);
            console.log(game)
            gameRecord = {}
           return await successResponse(apiRes,HttpCodes.OK,"TIED",game);
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
            compilingResult(properties,win);
            resultStick.push(text);
            tempResult.push(text);
            console.log(`|========SEMSALM=====currentScore===|${gameResult}`)
            console.log(properties);
            if(gameOption === HUMAN_VS_COMPUTER){
                return successResponse(apiRes,HttpCodes.OK,"CURRENT SCORE",resultStick);
            } 
        }
    }
   let  finalWinner = async (properties,apiRes) =>{
        const {gameResult,playerName,moves,scores,gameMode,gameOption,token} = properties;
        let commonText = commonTextDisplay(gameResult,playerName,moves,scores);
        let text = `The winner is ${gameResult} *🤝 😁 🤴 🥳 🥂 🕺 💃 🍾* ${commonText}`;
        if(gameMode === CONSOLE)
          await spinSleepAndPrint(WINNER,text);
        else{
            gameRecord.isWin = true;
            gameRecord.winner = gameResult;
            winningTimes +=1;
            await finalCompile(properties,token);
            compilingResult(properties,win);
            resultStick.push(text);
            gameRecord.rowRecords = resultStick;

            resultStick = [],tempResult = [],rowData = [],drawTimes = 0,winningTimes = 0;

            // console.log(apiRes);
            console.log(`|========SEMSALM====finalWinner====|${gameResult}`)
            const game = await create(gameRecord)
            gameRecord = {}
           return successResponse(apiRes,HttpCodes.OK,"WINNER",game)
        }
    }



export default {
    temporaryTied,
    permanentTied,
    currentScore,
    finalWinner
}