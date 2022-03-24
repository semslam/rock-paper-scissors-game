const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
require("dotenv/config");

/**
 * Encrypt a data with SHA 512
 * @param {Object} data 
 * @param {String} secretKey 
 * @returns 
 */
const sha512Encrypt = (data, secretKey)=> {
    
        if(!data && !secretKey) throw new Error('missing required data and a secret key for the hashing');
        
        return CryptoJS.HmacSHA512(JSON.stringify(data),secretKey).toString(CryptoJS.enc.Base64);
    
}
/**
 * Generate access token
 * @param {Object} data 
 * @returns 
 */
const generateAccessToken =(data) =>{
        return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "365 days"})// 60, "2 days", "10h", "7d" "50s" "365 days" 
  }
/**
 * Decrypt provided token
 * @param {String} token 
 * @returns 
 */
const decryptToken = (token)=>{
   return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if(err) throw err.message
      return user
    });
}  
/**
 * Hash the provided password
 * @param {String} password 
 * @returns 
 */
const hashPassword = async (password)=>{
       return await bcrypt.hash(password, await bcrypt.genSalt());  
}
/**
 * Check if the provided password and hash password match
 * @param {String} clientPassword 
 * @param {String} hashedPassword 
 * @returns 
 */
const isPasswordMatch = async (clientPassword,hashedPassword)=>{
     return await bcrypt.compare(clientPassword,hashedPassword);
    
}

module.exports = {
    hashPassword,
    isPasswordMatch,
    sha512Encrypt,
    generateAccessToken,
    decryptToken
}