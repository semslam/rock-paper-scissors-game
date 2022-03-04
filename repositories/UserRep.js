import userSchema from "../models/mongodb/UserSchema.js"


create = async (query) =>{
    try {
        const user = await userSchema.create(query);
        if(!user) throw Error('It cannot create user');
        return true;

    } catch (err) {
        throw new Error(err);
    }
   
}
update = async (filter, update) =>{
    try {
        const user = await userSchema.findOneAndUpdate(filter, update, {
            returnOriginal: false
          });

    return user
    } catch (err) {
        throw new Error(err);
    }
   
}

findOne = async (query) =>{
    try {
        const user = await userSchema.findOne(query).exec();
        if(!user) throw Error('It cannot find user entries.');
        return user;

    } catch (err) {
        throw new Error(err);
    }
   
}
find = async (query) =>{
    try {
        const users = await userSchema.find(query);
        if(!users) throw Error('It cannot find message entries.');
        return users;

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