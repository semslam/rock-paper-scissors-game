import GameRecord from "../models/mongodb/GameRecordsSchema.js"


const create = async (query) =>{
    try {
        console.log(`||=========Before Inserting Game Records ===========||`);
        console.log(query)
        const gameRecord = await GameRecord.create(query);
        console.log(`||=========Inserting Game Records ===========||`);
        console.log(gameRecord)
        if(!gameRecord) throw Error('It cannot create user');
        return true;

    } catch (err) {
        console.log(err)
        throw Error(err)
    }
   
}
const update = async (filter, update) =>{
    try {
        const gameRecord = await GameRecord.findOneAndUpdate(filter, update, {
            returnOriginal: false
          });

    return gameRecord
    } catch (err) {
        throw new Error(err);
    }
   
}

const findOne = async (query) =>{
    try {
        const gameRecord = await GameRecord.findOne(query).exec();
        if(!gameRecord) throw Error('It cannot find game record entries.');
        return gameRecord;

    } catch (err) {
        throw new Error(err);
    }
   
}
const find = async (query) =>{
    try {
        const gameRecord = await GameRecord.find(query);
        if(!gameRecord) throw Error('It cannot find game records.');
        return gameRecord;

    } catch (err) {
        throw new Error(err);
    }
   
}

export {
    create,
    update,
    findOne,
    find
}