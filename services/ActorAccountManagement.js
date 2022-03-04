
import {successResponse,errorResponse} from "../response/apiResponse.js";
import {hashPassword, isPasswordMatch} from "../libraries/encryptAndDecrypt.js";

const userOnboardProcess = async (req,res)=>{
    const hashedPassword = await hashPassword(req.password);
    console.log(req)
    let user = {username:req.username,password:hashedPassword,gender:req.gender};
    console.log(user)
    res.json({ message: user});
}


const loginProcess = async (req,res)=>{
    console.log(req.password);
    const passer = await isPasswordMatch(req.password,'$2b$10$2z4xtuL/Bh6f/9vAy9rTmebGGh/H82ZCsA.OGxPEFiO3zRy9tTP.u');
    if(!passer){
        return res.json({ message: "password not match" });
    }
    console.log(req);
    res.json({ message:req});
    
}


export default {
    userOnboardProcess,
    loginProcess
}