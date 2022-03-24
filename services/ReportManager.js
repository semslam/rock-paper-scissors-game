
const gameRep = require("../repositories/GameRep")
const userRepo = require("../repositories/UserRep")

const fetchGameRecords = async (query)=>{
    return await gameRep.find(query);
}

const fetchUserRecords = async (query)=>{
    return await userRepo.find(query);
}
const fetchSingleUserRecord = async (query)=>{
    return await userRepo.findOne(query);
}


module.exports = {
    fetchGameRecords,
    fetchUserRecords,
    fetchSingleUserRecord
}