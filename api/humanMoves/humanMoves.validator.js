import Joi from 'joi';
import {payloadValidateErrorResponse} from "../../response/apiResponse.js";
import {repeatedValues} from "../../libraries/sustainedValues.js";
    const [ROCK,PAPER,SCISSORS,COMPUTER,TIED,HUMAN_VS_COMPUTER,COMPUTER_VS_COMPUTER] = repeatedValues;


const playingValidation = data =>{
    const schema = Joi.object({
        playersType:Joi.string().valid(COMPUTER_VS_COMPUTER,HUMAN_VS_COMPUTER).required(),
        gameRound: Joi.string().valid(1,3).required()
      });
      return schema.validate(data);
}

const playingValidateReq = (req,res,next) =>{
    const {error} =  playingValidation(req.body);
    payloadValidateErrorResponse(res,next,error); 
}


const playerNameValidation = data =>{
    const schema = Joi.object({
        playerName:Joi.string().min(2).max(30).required()
      });
      return schema.validate(data);
}

const playerNameValidateReq = (req,res,next) =>{
    const {error} =  playerNameValidation(req.body);
    payloadValidateErrorResponse(res,next,error); 
}

const playerMoveValidation = data =>{
    const schema = Joi.object({
        playersMove:Joi.string().valid(ROCK,PAPER,SCISSORS).required(),   
      });
      return schema.validate(data);
}

const playerMoveValidateReq = (req,res,next) =>{
    const {error} =  playerMoveValidation(req.body);
    payloadValidateErrorResponse(res,next,error); 
}

export {
    playingValidateReq,
    playerNameValidateReq,
    playerMoveValidateReq
}