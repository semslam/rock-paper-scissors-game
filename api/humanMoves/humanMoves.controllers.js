// 'use strict';
// const RockPaperScissor = require("../../services/RockPaperScissor");
const {playingProcess, getStatus} = require("../../services/ApiBootstrap")
const {successResponse,errorResponse} = require("../../response/apiResponse");
const {HttpCodes} = require("../../libraries/sustainedValues");
const {isObjEmpty} = require("../../libraries/Validator");
const auth = require("../../middleware/jsonwebtokenAuthentication");
const {repeatedValues} = require("../../libraries/sustainedValues")
const [ROCK,PAPER,SCISSORS,COMPUTER,TIED,HUMAN_VS_COMPUTER,COMPUTER_VS_COMPUTER] = repeatedValues;


let gameOptionsAndMoves = {};

const provideGameOption = async (req, res)=>{

gameOptionsAndMoves = {};
gameOptionsAndMoves.token = auth.getToken(req,res);
gameOptionsAndMoves.gameRound = req.body.gameRound;
gameOptionsAndMoves.playingMode = req.body.playersType;

    if(req.body.playersType === HUMAN_VS_COMPUTER){
        getStatus();
        successResponse(res,HttpCodes.OK,"Please provide the player name",{message:`You have chosen ${gameOptionsAndMoves.playingMode} as player type, You are playing ${req.body.gameRound} round`});
    }else{
        gameOptionsAndMoves.playerName = "Robot";
        playingProcess(res,gameOptionsAndMoves);
    } 

}

const providePlayerName = (req, res)=>{

    if(isObjEmpty(gameOptionsAndMoves)){
        return errorResponse(res,HttpCodes.NOTACCEPTABLE,{ message:"Sorry, a player name will not be accepted. You must start a new game." });
    }
    if(gameOptionsAndMoves.playingMode === COMPUTER_VS_COMPUTER){
       return errorResponse(res,HttpCodes.NOTACCEPTABLE,{ message:"You are not permitted to provide a player name since the game is played by computer vs computer" });
    }else{
        gameOptionsAndMoves.playerName = req.body.playerName 
        let response = {message:`Your game properties include ${gameOptionsAndMoves.playingMode} as the game type, ${gameOptionsAndMoves.gameRound} round(s) and ${req.body.playerName} as the player name`,
        nextRequest:['Please choose a move from the list',["rock", "paper", "scissors"]]};
        successResponse(res,HttpCodes.OK,"Your player name is acceptable. The next step is to play a move",response);
    }

}

const gameMove = (req, res)=>{
   
    if(isObjEmpty(gameOptionsAndMoves)){
        return errorResponse(res,HttpCodes.NOTACCEPTABLE,{ message:"Sorry, playing a move is not permitted. You must start a new game" });
    }
    if(gameOptionsAndMoves.playingMode === COMPUTER_VS_COMPUTER){
        return errorResponse(res,HttpCodes.NOTACCEPTABLE,{ message:"You are not permitted to make any moves; the game is played by computer vs computer" });
    }else{
        gameOptionsAndMoves.externalMove = req.body.playersMove;
        playingProcess(res,gameOptionsAndMoves);
    }
    
}


module.exports = {
    provideGameOption,
    gameMove,
    providePlayerName
}