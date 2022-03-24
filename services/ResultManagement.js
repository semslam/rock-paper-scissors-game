const colors = require('colors');
const { createSpinner } = require("nanospinner");
const GameComponents = require("./GameComponents");
const {repeatedValues, printOutType,isConsoleOrApi, resType} = require("../libraries/sustainedValues");
const sleep = require("../libraries/sleep");
const {create} = require("../repositories/GameRep");
const {decryptToken} = require("../libraries/encryptAndDecrypt");
const {successResponse,errorResponse} = require("../response/apiResponse");
const {HttpCodes} = require("../libraries/sustainedValues");

const [ROCK,PAPER,SCISSORS,COMPUTER,TIED,HUMAN_VS_COMPUTER,COMPUTER_VS_COMPUTER] = repeatedValues;
const [TEMP_TIED, PERM_TIED,CURR_SCORE, WINNER ] = printOutType;
const [CONSOLE,API] = isConsoleOrApi;  
const {draw,win} = resType;

const gameComponents = new GameComponents();
const log = console.log;
let gameRecord = {}

let rowData = []
let drawTimes =0
let winningTimes = 0;
let resultStick = [];


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
 const finalCompile = async (records)=>{
    const uniqId = async (token)=> {return await decryptToken(token);}
    const token = await uniqId(records.token);
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
            throw new Error('Wrong parameter pass in spinSleepAndPrint');
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
       } VS ${scores.computerScore} (${moves.computerMove})${gameComponents.chooseEmojiMove(
        moves.computerMove
       )} ${
         pickEmojiExpression(gameResult,COMPUTER)
       }:(Computer)`;
 };
    /**
     * On a tie, designate the console and API current result
     * @param {Object} properties 
     * @param {Object} apiRes 
     */
    const temporaryTied = async (properties,apiRes)=>{
        const {gameResult,playerName,moves,scores,tieCount,gameMode,gameOption} = properties;
        let commonText = commonTextDisplay(gameResult,playerName,moves,scores);
        let text = `The game is tied, ${commonText}, tie count ${tieCount}. ${gameMode === CONSOLE? colors.green("Continue playing the game"): "Continue playing the game"}`;
        
        if(gameMode === CONSOLE){
            await spinSleepAndPrint(TEMP_TIED,text);
        }else{
            drawTimes += 1
            currentDataProcess(apiRes,properties,text,draw,"TIED CONTINUE");
        }
        
    }

    /**
     * Designate the current console and API result as the winner
     * @param {Object} properties 
     * @param {Object} apiRes 
     */

    const currentScore = async (properties,apiRes) =>{
        const {gameResult,playerName,moves,scores,gameMode,gameRound,gameOption} = properties;
        let commonText = commonTextDisplay(gameResult,playerName,moves,scores);
        let text = `Current score..., ** round ${4 - gameRound } ** ${commonText}, ${gameMode === CONSOLE? colors.green("Play again"):"Play again"}`;
        if(gameMode === CONSOLE)
          await spinSleepAndPrint(CURR_SCORE,text);
        else{
            winningTimes +=1;
            currentDataProcess(apiRes,properties,text,win,"WIN CONTINUE");
        }
    }
    /**
     * Determine the final result tie between the console and the API
     * @param {Object} properties 
     * @param {Object} apiRes 
     */
    const permanentTied = async (properties,apiRes)=>{
        const {gameResult,playerName,moves,scores,tieCount,gameMode,gameOption,token} = properties;
        let commonText = commonTextDisplay(gameResult,playerName,moves,scores);
        let path = ` 🙅‍♂️ continuing tie after ${tieCount} rounds of play, which is now officially tied`;
        let text = `The game sponsored by ${commonText},${gameMode === CONSOLE? colors.red(path): path}`;
        if(gameMode === CONSOLE)
        await spinSleepAndPrint(PERM_TIED,text);
        else{
            drawTimes +=1
            finalDataProcess(apiRes,properties,text,draw,"TIED")        
        }     
    }
    /**
     * Designate console and API final results based on the winner
     * @param {Object} properties 
     * @param {Object} apiRes 
     */
    const  finalWinner = async (properties,apiRes) =>{
        const {gameResult,playerName,moves,scores,gameMode,gameOption,token} = properties;
        let commonText = commonTextDisplay(gameResult,playerName,moves,scores);
        let text = `The winner is ${gameResult} *🤝 😁 🤴 🥳 🥂 🕺 💃 🍾* ${commonText}`;
        if(gameMode === CONSOLE)
          await spinSleepAndPrint(WINNER,text);
        else{
            winningTimes +=1;
            finalDataProcess(apiRes,properties,text,win,"WINNER")
        }
    }
    /**
     * final game result processor
     * @param {Object} apiRes 
     * @param {Object} properties 
     * @param {String} text 
     * @param {String} resultType 
     * @param {String} winOrDraw 
     * @returns 
     */
  async function finalDataProcess(apiRes,properties,text,resultType,winOrDraw){
        gameRecord.isWin = resultType === win? true:false;
            gameRecord.winner = resultType === win? properties.gameResult:"N/A";
            await finalCompile(properties);
            compilingResult(properties,resultType);
            resultStick.push(text);
            gameRecord.rowRecords = resultStick;
            resultStick = [],rowData = [],drawTimes = 0,winningTimes = 0;
            const game = await create(gameRecord)
            gameRecord = {}
            
        return successResponse(apiRes,HttpCodes.OK,winOrDraw,game)
    }
    /**
     * current game result processor
     * @param {Object} apiRes 
     * @param {Object} properties 
     * @param {String} text 
     * @param {String} resultType 
     * @param {String} winOrDraw 
     * @returns 
     */
   function currentDataProcess(apiRes,properties,text,resultType,winOrDraw){
        compilingResult(properties,resultType);
        resultStick.push(text);
        if(properties.gameOption === HUMAN_VS_COMPUTER){
            return successResponse(apiRes,HttpCodes.OK,winOrDraw,resultStick);
        } 
   } 



module.exports  ={
    temporaryTied,
    permanentTied,
    currentScore,
    finalWinner
}