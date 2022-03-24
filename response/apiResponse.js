const {convertDateToTimeStamp} = require("../libraries/DateFormat");
const {isEmpty} = require("../libraries/Validator")
const STATUS_FAILED = "Failed";
const STATUS_SUCCESS = "Successful";
const timestamp = convertDateToTimeStamp(new Date());

const writableEnded = (res)=>{
  if(res.writableEnded)return;
}

const successResponse = (res,HTTP_SUCCESS,successMessage, data = null) =>{
    let result = {
        code:HTTP_SUCCESS,
        timestamp: timestamp,
        status:STATUS_SUCCESS,
        message:successMessage
      }
      if(!isEmpty(data))  result.data = data;
      console.log(result);
      writableEnded(res);

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
      writableEnded(res);

   return res.status(HTTP_ERROR).send(result);    
}

const payloadValidateErrorResponse = (res,next,error) =>{
    if(!isEmpty(error)){
       let result = {
            code:422,
            timestamp: timestamp,
            status:STATUS_FAILED,
            message:error.details[0].message
        }
        console.log(result);
      return res.status(422).json(result);
    }
    writableEnded(res);
    
    next();
}


 module.exports = {
    successResponse,
    errorResponse,
    payloadValidateErrorResponse
}