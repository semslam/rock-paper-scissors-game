import GameRecord from "../models/mongodb/GameRecordsSchema.js"


create = async (query) =>{
    try {
        const gameRecord = await GameRecord.create(query);
        if(!gameRecord) throw Error('It cannot create user');
        return true;

    } catch (err) {
        return  err;
    }
   
}
update = async (filter, update) =>{
    try {
        const gameRecord = await GameRecord.findOneAndUpdate(filter, update, {
            returnOriginal: false
          });

    return gameRecord
    } catch (err) {
        throw new Error(err);
    }
   
}

findOne = async (query) =>{
    try {
        const gameRecord = await GameRecord.findOne(query).exec();
        if(!gameRecord) throw Error('It cannot find game record entries.');
        return gameRecord;

    } catch (err) {
        throw new Error(err);
    }
   
}
find = async (query) =>{
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