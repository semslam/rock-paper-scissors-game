const GameRecord = require("../models/mongodb/GameRecordsSchema");


const create = async (query) =>{
    const gameRecord = await GameRecord.create(query);
    if(!gameRecord) throw Error('It cannot create user');
    return gameRecord;
}
const update = async (filter, update) =>{

    const gameRecord = await GameRecord.findOneAndUpdate(filter, update, {
        returnOriginal: false
    });
    if(!gameRecord) throw Error('It cannot update game record.');

    return gameRecord
}

const findOne = async (query) =>{
        const gameRecord = await GameRecord.findOne(query).exec();
        if(!gameRecord) throw Error('It cannot find game record entries.');
        return gameRecord;
   
}
const find = async (query) =>{
        const gameRecord = await GameRecord.find(query);
        if(!gameRecord) throw Error('It cannot find game records.');
        return gameRecord;   
}

module.exports ={
    create,
    update,
    findOne,
    find
}