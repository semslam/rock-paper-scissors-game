import Joi from 'joi';
import {payloadValidateErrorResponse} from "../../response/apiResponse.js";


onBoardValidation = data =>{
    const schema = Joi.object({
        username: Joi.string().email().required(),
        password:Joi.string().min(7).max(30).required(),
        gender:Joi.string().allow("Male","Female")
      });
      return schema.validate(data);
}

onBoardValidateReq = (req,res,next) =>{
    const {error} =  onBoardValidation(req.body);
    payloadValidateErrorResponse(res,next,error); 
}


loginValidation = data =>{
    const schema = Joi.object({
        username: Joi.string().email().required(),
        password:Joi.string().min(7).max(30).required()
      });
      return schema.validate(data);
}

loginValidateReq = (req,res,next) =>{
    const {error} =  loginValidation(req.body);
    payloadValidateErrorResponse(res,next,error); 
}

export {
    onBoardValidateReq,
    loginValidateReq
}