const jwt = require("jsonwebtoken");
const {successResponse,errorResponse} = require("../response/apiResponse");
require("dotenv/config");
const {ErrorCodes} = require("../libraries/sustainedValues");
const {findOne} = require("../repositories/UserRep")

const  authenticateToken = (req, res, next)=> {
  try {
    const token = getToken(req, res);
   
    //fetch user access token secret from database
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if(err) return errorResponse(res,ErrorCodes.FORBIDDEN, err.message || "Wrong Token Authorization Header");
      
      // This will be expensive for the app on each request  
     const fetchUser = await findOne({username:user.username});
      if(!fetchUser) return errorResponse(res,ErrorCodes.NOT_FOUND, err.message);
      else if(user.id !== fetchUser.id) return errorResponse(res,ErrorCodes.NOT_FOUND, "Wrong user information");

      next();
    })
  } catch (err) {
    return errorResponse(res,ErrorCodes.INTERNAL_ERROR, err.message);
  }
    
  }

  const getToken =(req, res)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return errorResponse(res,ErrorCodes.NOT_FOUND,"Missing Authorization Header"); 
    return token;
  }

  module.exports = {authenticateToken,getToken}