const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
require("dotenv/config");


const sha512Encrypt = (data, secretKey)=> {
    
    try {
        if(!data && !secretKey) throw new Error('missing required data and a secret key for the hashing');
        
        return CryptoJS.HmacSHA512(JSON.stringify(data),secretKey).toString(CryptoJS.enc.Base64);
    } catch (err) {
       throw new Error(err); 
    }
    
}

const generateAccessToken =(data) =>{
    try {
        return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "365 days"})// 60, "2 days", "10h", "7d" "50s" "365 days" 
    } catch (err) {
        throw new Error(err); 
    }
    
  }

const decryptToken = (token)=>{
   return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if(err) throw err.message
      return user
    });
}  

const hashPassword = async (password)=>{
    try {
       return await bcrypt.hash(password, await bcrypt.genSalt());
    } catch (err) {
        throw err.message;
    }
    
}

const isPasswordMatch = async (clientPassword,hashedPassword)=>{
    try {
     return await bcrypt.compare(clientPassword,hashedPassword);
    } catch (err) {
        throw new Error(err).message;
    }
}

module.exports = {
    hashPassword,
    isPasswordMatch,
    sha512Encrypt,
    generateAccessToken,
    decryptToken
}