const userSchema = require("../models/mongodb/UserSchema");


const create = async (query) =>{
    try {
        return await userSchema.create(query);  
    } catch (err) {
        throw new Error("User information already exists");
    } 
        
}
const update = async (filter, update) =>{
        const user = await userSchema.findOneAndUpdate(filter, update, {
            returnOriginal: false
          });

    if(!user)throw new Error('It cannot update the user record');
    return user;
}

const findOne = async (query) =>{
    const user = await userSchema.findOne(query).exec();
    if(!user) throw Error("It cannot find the user's record");
    return user;   
}
const find = async (query) =>{
    const users = await userSchema.find(query);
    if(!users) throw Error("It cannot find users' records");
    return users; 
}

 module.exports = {
    create,
    update,
    findOne,
    find
}