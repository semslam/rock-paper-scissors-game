// 'use strict';
import RockPaperScissor from "../../services/RockPaperScissor.js";
import {successResponse,errorResponse} from "../../response/apiResponse.js"
import {HttpCodes} from "../../libraries/sustainedValues.js"

const rockPaperScissor = new RockPaperScissor("api");

let gameOptionsAndMoves = {};

const provideGameOption = (req, res)=>{
//computer or human
// choose game round
// playerName
gameOptionsAndMoves = {};
gameOptionsAndMoves.gameRound = req.body.gameRound;
gameOptionsAndMoves.playingMode = req.body.playersType;

// if computer and computer no need to provide a name and moves
let response = {message:`You have chosen ${gameOptionsAndMoves.playingMode} as playerTypes, You are playing ${req.body.gameRound} round`};
    if(req.body.playersType === "humanVsComputer"){
        response.nextRequest = "Please provide the player name";
        rockPaperScissor.gameStatus = false;
        successResponse(res,HttpCodes.OK,"Please provide the player name",response);
    }else{
        gameOptionsAndMoves.playerName = "Robot";
        rockPaperScissor.apiPlayingProcess(res,gameOptionsAndMoves)
    } 

}

const providePlayerName = (req, res)=>{
    
    if(gameOptionsAndMoves.playingMode === "computerVsComputer"){
        errorResponse(res,HttpCodes.NOTACCEPTABLE,{ message:"You are not meant to provide player name, the game is playing by computer vs computer" });
    }else{
        gameOptionsAndMoves.playerName = req.body.playerName
        let response = {message:`Your player name is: ${req.body.playerName}`,nextRequest:['Please choose your move',["rock", "paper", "scissors"]]};
        successResponse(res,HttpCodes.OK,"Please choose your move",response);
    }
   
}

const gameMove = (req, res)=>{
    if(gameOptionsAndMoves.playingMode === "computerVsComputer"){
        errorResponse(res,HttpCodes.NOTACCEPTABLE,{ message:"You are not meant to provide player name, the game is playing by computer vs computer" });
    }else{
        gameOptionsAndMoves.externalMove = req.body.playersMove;
        rockPaperScissor.apiPlayingProcess(res,gameOptionsAndMoves);
    }
   
}


export default {
    provideGameOption,
    gameMove,
    providePlayerName
}