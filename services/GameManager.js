
const {create,update,findOne,find} = require("../repositories/GameRep")

const fetchGameRecords = async (query)=>{
    return await find(query);
}



module.exports = {
    fetchGameRecords
}