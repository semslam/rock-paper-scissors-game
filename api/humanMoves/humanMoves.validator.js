import Joi from 'joi';
import {payloadValidateErrorResponse} from "../../response/apiResponse.js";


const playingValidation = data =>{
    const schema = Joi.object({
        playersType:Joi.string().allow("computerVsComputer","humanVsComputer").required(),
        gameRound: Joi.string().allow(1,3).required().required()
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
        playersType:Joi.string().allow(["rock","paper","scissors"]).required(),   
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