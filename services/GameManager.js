
import {create,update,findOne,find} from "../repositories/GameRep.js"

const fetchGameRecords = async (query)=>{
    return await find(query);
}



export default {
    fetchGameRecords
}