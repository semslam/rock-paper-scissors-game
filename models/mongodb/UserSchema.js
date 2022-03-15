const mongoose = require("mongoose");
require("dotenv/config");
const {gender} = require("../../libraries/sustainedValues");
const {MALE,FEMALE} = gender;
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    username: { type:String, required: true,unique: true},
    password: { type:String, required: true},
    gender:{ type:String, required: false,enum: [MALE,FEMALE]},
    createAt:{ type: Date, default: Date.now},
    updateAt:{ type: Date}
});

module.exports = mongoose.model(process.env.USERS_COLLECTION, UserSchema);