
import {successResponse,errorResponse} from "../response/apiResponse.js";
import {hashPassword, isPasswordMatch} from "../libraries/encryptAndDecrypt.js";
import {create,update,findOne,find} from "../repositories/UserRep.js"
import {generateAccessToken} from "../libraries/encryptAndDecrypt.js"

const userOnboardProcess = async (req,res)=>{
    try {
        const hashedPassword = await hashPassword(req.password);
    let user = {username:req.username,password:hashedPassword,gender:req.gender};
    user = await create(user);
    console.log(user)
    const token = generateAccessToken({id:user._id,username:user.username});
    console.log(token)
    res.json({ token: token});
    } catch (err) {
       return errorResponse(res,500,new Error(err))
    }
    
}


const loginProcess = async (req,res)=>{
    try {
        console.log(req);
        const  user = await findOne({username:req.username});
         const passer = await isPasswordMatch(req.password,user.password);
         if(!passer){
             return res.json({ message: "password not match" });
         }
       const accessToken = generateAccessToken({id:user._id,username:user.username})
     
       res.json({ accessToken: accessToken})
         res.json({ message:req}); 
    } catch (err) {
        return errorResponse(res,500,new Error(err))
    }
    
    
}


export default {
    userOnboardProcess,
    loginProcess
}