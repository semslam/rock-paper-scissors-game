import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;


const GameRecordsSchema = new Schema({
    clientId: { type:Number, required: true},
    batchId: { type:String, required: true,index: true, unique: true},
    startTime:{ type:Number},
    endTime:{ type:Number},
    gameMode:{ type:String, required: false,enum: ['console','api']},
    gameType:{ type:String, required: false,enum: ["humanVsComputer","computerVsComputer"]},
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
        scoreType:{ type:String, required: true,enum: ["draw","win"]},
        playerOne:{ type:String, required: true},
        playerOneMove:{ type:String, required: true,enum: ["rock","paper","scissors"]},
        playerOneScores:{ type:Number, default: 0},
        playerTwo:{ type:Number, default: 0},
        playerTwoMove:{ type:String, required: true,enum: ["rock","paper","scissors"]},
        playerOneScores:{ type:Number, default: 0}
        }
    ],
    rowRecords:[[String]],
    winningTimes:{ type:Number, default: 0},
    drawTimes:{ type:Number, default: 0},
    createAt:{ type: Date, default: Date.now},
    updateAt:{ type: Date}
});

const GameRecordsSchema = mongoose.model('game_records', GameRecordsSchema);