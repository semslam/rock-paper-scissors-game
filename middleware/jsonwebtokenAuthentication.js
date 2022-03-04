import jwt from "jsonwebtoken";
import {successResponse,errorResponse} from "../response/apiResponse";
import "dotenv/config";

const  authenticateToken = (req, res, next)=> {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null){
        return errorResponse(res,401,"Missing Authorization Header");
    } 
    //fetch user access token secret from database
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if(err){
        return errorResponse(res,403,"Wrong Token Authorization Header");
      } 

      next()
    })
  }

  export default authenticateToken;