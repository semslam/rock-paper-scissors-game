const GameRecord = require("../models/mongodb/GameRecordsSchema");


const create = async (query) =>{
    try {
        const gameRecord = await GameRecord.create(query);
        if(!gameRecord) throw Error('It cannot create user');
        return gameRecord;
    } catch (err) {
        throw err.message;
    }
   
}
const update = async (filter, update) =>{
    try {
        const gameRecord = await GameRecord.findOneAndUpdate(filter, update, {
            returnOriginal: false
          });

    return gameRecord
    } catch (err) {
        throw err.message;
    }
   
}

const findOne = async (query) =>{
    try {
        const gameRecord = await GameRecord.findOne(query).exec();
        if(!gameRecord) throw Error('It cannot find game record entries.');
        return gameRecord;

    } catch (err) {
        throw err.message;
    }
   
}
const find = async (query) =>{
    try {
        const gameRecord = await GameRecord.find(query);
        if(!gameRecord) throw Error('It cannot find game records.');
        return gameRecord;

    } catch (err) {
        throw err.message;
    }
   
}

module.exports ={
    create,
    update,
    findOne,
    find
}