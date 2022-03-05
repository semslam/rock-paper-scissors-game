import {successResponse,errorResponse} from "./apiResponse.js";
import {HttpCodes} from "../libraries/sustainedValues.js"
const getResult = (ctx,megs,data)=>{
    // ctx.json({megs, data});
    // ctx.status(200).send({megs, data})
    return successResponse(ctx,HttpCodes.OK,megs,data)
}
const errorResult = (ctx,megs)=>{
    errorResponse(ctx,HttpCodes.NOTACCEPTABLE,megs)
}

export {
    getResult,
    errorResult
}