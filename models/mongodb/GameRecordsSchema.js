import mongoose from "mongoose";
import "dotenv/config";
import {repeatedValues,isConsoleOrApi, resType} from "../../libraries/sustainedValues.js"
const [ROCK,PAPER,SCISSORS,COMPUTER,TIED,HUMAN_VS_COMPUTER,COMPUTER_VS_COMPUTER] = repeatedValues;
const [CONSOLE,API] = isConsoleOrApi;  
const {draw,win} = resType;
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const GameRecordsSchema = new Schema({
    userId: { type:String, required: true},
    gameMode:{ type:String, required: false,enum:[CONSOLE,API]},
    gameType:{ type:String, required: false,enum:[HUMAN_VS_COMPUTER,COMPUTER_VS_COMPUTER]},
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
            resultType:{ type:String, required: true,enum:[draw,win]},
            playerOne:{ type:String, required: true},
            playerOneMove:{ type:String, required: true,enum:[ROCK,PAPER,SCISSORS]},
            playerOneScores:{ type:Number, default: 0},
            playerTwo:{ type:String, required: true},
            playerTwoMove:{ type:String, required: true,enum:[ROCK,PAPER,SCISSORS]},
            playerTwoScores:{ type:Number, default: 0}
            }
    ],
    rowRecords:[String],
    winningTimes:{ type:Number, default: 0},
    drawTimes:{ type:Number, default: 0},
    createAt:{ type: Date, default: Date.now},
    updateAt:{ type: Date}
});

export default mongoose.model(process.env.GAME_RECORDS_COLLECTION, GameRecordsSchema);