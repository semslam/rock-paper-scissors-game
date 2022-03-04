import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";


const sha512Encrypt = (data, secretKey)=> {
    
    try {
        if(!data && !secretKey) throw new Error('missing required data and a secret key for the hashing');
        
        return CryptoJS.HmacSHA512(JSON.stringify(data),secretKey).toString(CryptoJS.enc.Base64);
    } catch (err) {
       throw new Error(err); 
    }
    
}

const generateAccessToken =(user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "50s" })// 60, "2 days", "10h", "7d"
  }

const hashPassword = async (password)=>{
    try {
       return await bcrypt.hash(password, await bcrypt.genSalt());
    } catch (err) {
        throw new Error(err);
    }
    
}

const isPasswordMatch = async (clientPassword,hashedPassword)=>{
    try {
     return await bcrypt.compare(clientPassword,hashedPassword);
    } catch (err) {
        throw new Error(err);
    }
}

export {
    hashPassword,
    isPasswordMatch,
    sha512Encrypt,
    generateAccessToken
}