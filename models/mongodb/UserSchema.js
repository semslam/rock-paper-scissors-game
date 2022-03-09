import mongoose from "mongoose";
import "dotenv/config";
import {gender} from "../../libraries/sustainedValues.js";
const {MALE,FEMALE} = gender;
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;


const UserSchema = new Schema({
    username: { type:String, required: true},
    password: { type:String, required: true},
    gender:{ type:String, required: false,enum: [MALE,FEMALE]},
    createAt:{ type: Date, default: Date.now},
    updateAt:{ type: Date}
});

export default mongoose.model(process.env.USERS_COLLECTION, UserSchema);