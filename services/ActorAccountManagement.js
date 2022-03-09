
import {successResponse,errorResponse} from "../response/apiResponse.js";
import {hashPassword, isPasswordMatch} from "../libraries/encryptAndDecrypt.js";
import {create,update,findOne,find} from "../repositories/UserRep.js"
import {generateAccessToken} from "../libraries/encryptAndDecrypt.js"
import {ErrorCodes,HttpCodes} from "../libraries/sustainedValues.js";


const userOnboardProcess = async (req,res)=>{
    try {
        const hashedPassword = await hashPassword(req.password);
    let user = {username:req.username,password:hashedPassword,gender:req.gender};
    user = await create(user);
    successResponse(res,HttpCodes.CREATED,"Account was successful created",{username:user.username,gender:user.gender});
    } catch (err) {
       return errorResponse(res,ErrorCodes.INTERNAL_ERROR,err);
    }
    
}


const loginProcess = async (req,res)=>{
    try {
        console.log(req);
        const  user = await findOne({username:req.username});
         const passer = await isPasswordMatch(req.password,user.password);
         if(!passer){
             return errorResponse(res,ErrorCodes.FORBIDDEN,"Password not match")
         }
         
       const accessToken = generateAccessToken({id:user._id,username:user.username});

       successResponse(res,HttpCodes.OK,"The login was successful!",{ accessToken: accessToken});
    } catch (err) {
        return errorResponse(res,ErrorCodes.INTERNAL_ERROR,err);
    }
    
    
}



export default {
    userOnboardProcess,
    loginProcess
}