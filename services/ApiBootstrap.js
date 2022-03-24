const {successResponse,errorResponse} = require("../response/apiResponse");
const {HttpCodes,ErrorCodes} = require("../libraries/sustainedValues");
const GameComponents = require("./GameComponents");
const RockPaperScissor = require("./RockPaperScissor");
const {repeatedValues, printOutType,isConsoleOrApi, resType} = require("../libraries/sustainedValues");
const [ROCK,PAPER,SCISSORS,COMPUTER,TIED,HUMAN_VS_COMPUTER,COMPUTER_VS_COMPUTER] = repeatedValues;
const [CONSOLE,API] = isConsoleOrApi;  
const rps = new RockPaperScissor(API);
const gameComponents = new GameComponents();
/**
 * Get the game status
 */
const getStatus = ()=>{ 
    rps.gameStatus = false;
}
/**
 * It process the game properties
 * @param {Object} res 
 * @param {Object} properties 
 * @returns 
 */
const  playingProcess = (res,properties)=>{
    try {
        const gameOption = properties.playingMode;
        let externalMove = properties.externalMove;
        const playerName = properties.playerName;
        rps.token = properties.token;
        if(gameOption === COMPUTER_VS_COMPUTER){
            rps.gameRound = properties.gameRound;
            for (let i = 0; i < rps.gameRound; i++) {
                playerMove(res,gameOption,playerName,'')   
            }
        }else if(gameOption === HUMAN_VS_COMPUTER){
            rps.gameRound = properties.gameRound;
            if(rps.gameStatus){
            return errorResponse(res,ErrorCodes.FORBIDDEN,"The has ended,You are have to start another game");
            }
            playerMove(res,gameOption,playerName,externalMove)
        } 
    } catch (err) {
        return errorResponse(res,ErrorCodes.INTERNAL_ERROR,err.message);
    }
  }
  /**
   * Generate player and computer move
   * @param {Object} res 
   * @param {String} gameOption 
   * @param {String} playerName 
   * @param {String} externalMove 
   * @returns 
   */
  const  playerMove = (res,gameOption,playerName,externalMove)=>{
    
    try {
        let playerMove = "";
    let computerMove = gameComponents.computerMove();
    if (gameOption === HUMAN_VS_COMPUTER) { 
        rps.playerName = playerName;
        playerMove = externalMove; 
    }else if (gameOption === COMPUTER_VS_COMPUTER ) { 
        rps.playerName = playerName; 
        playerMove = gameComponents.computerMove();
    }
    
    rps.predictMove(gameOption,playerName,playerMove,computerMove,res);
    } catch (err) {
        return errorResponse(res,ErrorCodes.INTERNAL_ERROR,err.message);
    }
    
  }


  module.exports = {playingProcess,getStatus}