import Joi from 'joi';
import {payloadValidateErrorResponse} from "../../response/apiResponse.js";
import {gender} from "../../libraries/sustainedValues.js";
const {MALE,FEMALE} = gender;


const onBoardValidation = data =>{
    const schema = Joi.object({
        username: Joi.string().email().required(),
        password:Joi.string().min(7).max(30).required(),
        gender:Joi.string().valid(MALE,FEMALE)
      });
      return schema.validate(data);
}

const onBoardValidateReq = (req,res,next) =>{
    const {error} =  onBoardValidation(req.body);
    payloadValidateErrorResponse(res,next,error); 
}


const loginValidation = data =>{
    const schema = Joi.object({
        username: Joi.string().email().required(),
        password:Joi.string().min(7).max(30).required()
      });
      return schema.validate(data);
}

const loginValidateReq = (req,res,next) =>{
    const {error} =  loginValidation(req.body);
    payloadValidateErrorResponse(res,next,error); 
}

export {
    onBoardValidateReq,
    loginValidateReq
}