const userSchema = require("../models/mongodb/UserSchema");


const create = async (query) =>{
    try {  
    //    const isExist = await userSchema.findOne({username:query.username}).exec();
    //    if(isExist) throw Error('User already exist') 
        const user = await userSchema.create(query);
        if(!user) throw new Error('It cannot create user');
        return user;

    } catch (err) {
        throw err.message;
    }
   
}
const update = async (filter, update) =>{
    try {
        const user = await userSchema.findOneAndUpdate(filter, update, {
            returnOriginal: false
          });

    return user
    } catch (err) {
        throw err.message;
    }
   
}

const findOne = async (query) =>{
    try {
        const user = await userSchema.findOne(query).exec();
        if(!user) throw Error('It cannot find user in the entries.');
        return user;

    } catch (err) {
        throw err.message;
    }
   
}
const find = async (query) =>{
    try {
        const users = await userSchema.find(query);
        if(!users) throw Error('It cannot find message entries.');
        return users;

    } catch (err) {
        throw err.message;
    }
   
}

 module.exports = {
    create,
    update,
    findOne,
    find
}