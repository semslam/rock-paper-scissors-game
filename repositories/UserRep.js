import userSchema from "../models/mongodb/UserSchema.js"


const create = async (query) =>{
    try {
        
       const isExist = await userSchema.findOne({username:query.username}).exec();
       if(isExist) throw new Error('User already exist') 
        const user = await userSchema.create(query);
        if(!user) throw new Error('It cannot create user');
        return user;

    } catch (err) {
        console.log(err)
        throw new Error(err);
    }
   
}
const update = async (filter, update) =>{
    try {
        const user = await userSchema.findOneAndUpdate(filter, update, {
            returnOriginal: false
          });

    return user
    } catch (err) {
        throw new Error(err);
    }
   
}

const findOne = async (query) =>{
    try {
        console.log(query);
        const user = await userSchema.findOne({ username: 'semslam@gmail.com' }).lean();
        console.log(user);
        if(!user) throw Error('It cannot find user in the entries.');
        return user;

    } catch (err) {
        throw new Error(err);
    }
   
}
const find = async (query) =>{
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