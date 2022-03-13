// 'use strict';
const RockPaperScissor = require("../../services/RockPaperScissor");
const {successResponse,errorResponse} = require("../../response/apiResponse");
const {HttpCodes} = require("../../libraries/sustainedValues");
const {isObjEmpty} = require("../../libraries/Validator");
const auth = require("../../middleware/jsonwebtokenAuthentication");
const {repeatedValues} = require("../../libraries/sustainedValues")
const [ROCK,PAPER,SCISSORS,COMPUTER,TIED,HUMAN_VS_COMPUTER,COMPUTER_VS_COMPUTER] = repeatedValues;

const rockPaperScissor = new RockPaperScissor("api");

// wrongRequest = (res,message)=>{
//     // check if the gameOptionsAndMoves is empty
//     if(isObjEmpty(gameOptionsAndMoves))
//         return errorResponse(res,HttpCodes.NOTACCEPTABLE,{ message:"Sorry, you have to start a new game" });
    
//    else if(gameOptionsAndMoves.playingMode === COMPUTER_VS_COMPUTER)
//        return errorResponse(res,HttpCodes.NOTACCEPTABLE,{ message:`You are not meant to provide ${message}; the game is played by computer versus computer` });
    
// }

let gameOptionsAndMoves = {};

const provideGameOption = async (req, res)=>{

gameOptionsAndMoves = {};
gameOptionsAndMoves.token = auth.getToken(req,res);
gameOptionsAndMoves.gameRound = req.body.gameRound;
gameOptionsAndMoves.playingMode = req.body.playersType;

// if computer vs computer no need to provide a name and moves
let response = {message:`You have chosen ${gameOptionsAndMoves.playingMode} as playerTypes, You are playing ${req.body.gameRound} round`};
    if(req.body.playersType === HUMAN_VS_COMPUTER){
        rockPaperScissor.gameStatus = false;
        successResponse(res,HttpCodes.OK,"Please provide the player name",response);
    }else{
        gameOptionsAndMoves.playerName = "Robot";
        rockPaperScissor.apiPlayingProcess(res,gameOptionsAndMoves);
    } 

}

const providePlayerName = (req, res)=>{
    // check if the gameOptionsAndMoves is empty
    if(isObjEmpty(gameOptionsAndMoves)){
        return errorResponse(res,HttpCodes.NOTACCEPTABLE,{ message:"Sorry, you have to start a new game" });
    }
    if(gameOptionsAndMoves.playingMode === COMPUTER_VS_COMPUTER){
       return errorResponse(res,HttpCodes.NOTACCEPTABLE,{ message:"You are not meant to provide a player name; the game is played by computer versus computer" });
    }else{
        gameOptionsAndMoves.playerName = req.body.playerName
        let response = {message:`Your player name is: ${req.body.playerName}`,nextRequest:['Please choose your move',["rock", "paper", "scissors"]]};
        successResponse(res,HttpCodes.OK,"Please choose your move",response);
    }

    
    // wrongRequest(res,"a player name");
    // gameOptionsAndMoves.playerName = req.body.playerName
    //     let response = {message:`Your player name is: ${req.body.playerName}`,nextRequest:['Please choose your move',["rock", "paper", "scissors"]]};
    //     successResponse(res,HttpCodes.OK,"Please choose your move",response);
   
}

const gameMove = (req, res)=>{
    // check if the gameOptionsAndMoves is empty
    if(isObjEmpty(gameOptionsAndMoves)){
        return errorResponse(res,HttpCodes.NOTACCEPTABLE,{ message:"Sorry, you have to start a new game" });
    }
    if(gameOptionsAndMoves.playingMode === COMPUTER_VS_COMPUTER){
        return errorResponse(res,HttpCodes.NOTACCEPTABLE,{ message:"You are not meant to provide any move; the game is played by computer vs. computer" });
    }else{
        gameOptionsAndMoves.externalMove = req.body.playersMove;
        rockPaperScissor.apiPlayingProcess(res,gameOptionsAndMoves);
    }
    // wrongRequest(res,"any move");
    // gameOptionsAndMoves.externalMove = req.body.playersMove;
    // rockPaperScissor.apiPlayingProcess(res,gameOptionsAndMoves);
}


module.exports = {
    provideGameOption,
    gameMove,
    providePlayerName
}