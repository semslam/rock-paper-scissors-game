import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

// }
// scrToken: { type:String, required: true},
const UserSchema = new Schema({
    username: { type:String, required: true},
    password: { type:String, required: true},
    gender:{ type:String, required: false,enum: ['Male','Female']},
    createAt:{ type: Date, default: Date.now},
    updateAt:{ type: Date}
});

export default mongoose.model('users', UserSchema);