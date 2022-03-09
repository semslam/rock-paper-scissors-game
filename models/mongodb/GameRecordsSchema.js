import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

// const playingHistories = new Schema({ 
//     resultType:{ type:String, required: true,enum:["draw","win"]},
//     playerOne:{ type:String, required: true},
//     playerOneMove:{ type:String, required: true,enum:["rock","paper","scissors"]},
//     playerOneScores:{ type:Number, default: 0},
//     playerTwo:{ type:String, required: true},
//     playerTwoMove:{ type:String, required: true,enum:["rock","paper","scissors"]},
//     playerOneScores:{ type:Number, default: 0}
//     });

const GameRecordsSchema = new Schema({
    userId: { type:String, required: true},
    gameMode:{ type:String, required: false,enum:['console','api']},
    gameType:{ type:String, required: false,enum:["humanVsComputer","computerVsComputer"]},
    isWin:{ type:Boolean, default: false},
    winner:{ type:String, required: false},
    scoreRecord:{
        playerOne:{
            name:{ type:String, required: true},
            scores:{ type:Number, default: 0}
        },
        playerTwo:{
            name:{ type:String, required: true},
            scores:{ type:Number, default: 0}
        }
    },
    playingHistory:[
        { 
            resultType:{ type:String, required: true,enum:["Draw","Win"]},
            playerOne:{ type:String, required: true},
            playerOneMove:{ type:String, required: true,enum:["rock","paper","scissors"]},
            playerOneScores:{ type:Number, default: 0},
            playerTwo:{ type:String, required: true},
            playerTwoMove:{ type:String, required: true,enum:["rock","paper","scissors"]},
            playerTwoScores:{ type:Number, default: 0}
            }
    ],
    rowRecords:[String],
    winningTimes:{ type:Number, default: 0},
    drawTimes:{ type:Number, default: 0},
    createAt:{ type: Date, default: Date.now},
    updateAt:{ type: Date}
});

export default mongoose.model('gamerecords', GameRecordsSchema);