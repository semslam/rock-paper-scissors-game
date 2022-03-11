const {successResponse,errorResponse} = require("./apiResponse");
const {HttpCodes} = require("../libraries/sustainedValues")
const getResult = (ctx,megs,data)=>{
    // ctx.json({megs, data});
    // ctx.status(200).send({megs, data})
    return successResponse(ctx,HttpCodes.OK,megs,data)
}
const errorResult = (ctx,megs)=>{
    errorResponse(ctx,HttpCodes.NOTACCEPTABLE,megs)
}

module.exports ={
    getResult,
    errorResult
}