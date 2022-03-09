import {convertDateToTimeStamp} from "../libraries/DateFormat.js";
const STATUS_FAILED = "Failed";
const STATUS_SUCCESS = "Successful";
const timestamp = convertDateToTimeStamp(new Date());

const successResponse = (res,HTTP_SUCCESS,successMessage, data = null) =>{
    let result = {
        code:HTTP_SUCCESS,
        timestamp: timestamp,
        status:STATUS_SUCCESS,
        message:successMessage
      }
      if(data !== undefined || data !== null || data !== [])  result.data = data;
      console.log(result);
   return res.status(HTTP_SUCCESS).send(result);
}

const errorResponse = (res,HTTP_ERROR,errorMessage) =>{
   let result = {
        code:HTTP_ERROR,
        timestamp: timestamp,
        status:STATUS_FAILED,
        message:errorMessage
      }
      console.log(result);
   return res.status(HTTP_ERROR).send(result);    
}

const payloadValidateErrorResponse = (res,next,error) =>{
    const isError = (error === undefined)? true:false;
    if(!isError){
       let result = {
            code:422,
            timestamp: timestamp,
            status:STATUS_FAILED,
            message:error.details[0].message
        }
      return res.status(422).json(result);
    }
    next();
}


 export {
    successResponse,
    errorResponse,
    payloadValidateErrorResponse
}