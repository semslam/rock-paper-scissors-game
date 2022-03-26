
const {successResponse,errorResponse} = require("../response/apiResponse");
const {hashPassword, isPasswordMatch} = require("../libraries/encryptAndDecrypt");
const {create,update,findOne,find} = require( "../repositories/UserRep");
const {generateAccessToken} = require("../libraries/encryptAndDecrypt");
const {ErrorCodes,HttpCodes} = require("../libraries/sustainedValues");


const userOnboardProcess = async (req,res)=>{
    try {
        const hashedPassword = await hashPassword(req.password);
    let user = {username:req.username,password:hashedPassword,gender:req.gender};
    user = await create(user);
    successResponse(res,HttpCodes.CREATED,"Account was successful created",{username:user.username,gender:user.gender});
    } catch (err) {
       return errorResponse(res,ErrorCodes.INTERNAL_ERROR,err.message);
    }
    
}


const loginProcess = async (req,res)=>{
    try {
        const  user = await findOne({username:req.username});
         const passer = await isPasswordMatch(req.password,user.password);
         if(!passer){
             return errorResponse(res,ErrorCodes.MISSING_PARAMETER,"Wrong user login details")
         }
         
       const accessToken = generateAccessToken({id:user._id,username:user.username});

       successResponse(res,HttpCodes.OK,"The login was successful!",{ accessToken: accessToken});
    } catch (err) {
        return errorResponse(res,ErrorCodes.INTERNAL_ERROR,err.message);
    }
    
    
}



module.exports = {
    userOnboardProcess,
    loginProcess
}