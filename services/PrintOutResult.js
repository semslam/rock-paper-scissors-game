import chalk from "chalk";
import { createSpinner } from "nanospinner";
import GameComponents from "./GameComponents";
import {repeatedValues, printOutType} from "../libraries/sustainedValues";


const [
    ROCK,
    PAPER,
    SCISSORS,
    COMPUTER,
    TIED,
    ...values] = repeatedValues;
    const [ 
        TEMP_TIED, 
        PERM_TIED, 
        CURR_SCORE, 
        WINNER 
        ] = printOutType;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

var isConsoleOrApi =''
const gameComponents = new GameComponents();


let spinSleepAndPrint = async (type,text)=>{ 
    const spinner = createSpinner("Loading the result...").start();
    await sleep();
    
    switch (type) {
        case TEMP_TIED:
            spinner.error({text: text,});
            break;
        case PERM_TIED:
            spinner.error({text: text,});
            break;
        case CURR_SCORE:
            spinner.success({text: text,});
            break;    
        default:
            console.log('Wrong parameter pass in spinSleepAndPrint')
            break;
    }
    
   
}


/**
   * This format common game result
   * @param {String} gameResult 
   * @param {String} playerName 
   * @param {String} playerMove 
   * @param {String} computerMove 
   * @returns {String} result
   */
 function commonTextDisplay(gameResult,playerName,moves,scores){


    // const {gameResult,playerName,playerMove,computerMove,playerScore,} = properties;

    let pickEmojiExpression = (result, actor) =>{return result === actor ? "😁" : result === TIED?  "🙄":"😞"}
     return `(${playerName}):${
         pickEmojiExpression(gameResult,playerName)
       }  ${gameComponents.chooseEmojiMove(moves.playerMove)}(${moves.playerMove}) ${
        scores.playerScore
       } VS ${scores.computerScore} ${moves.computerMove} ${gameComponents.chooseEmojiMove(
        moves.computerMove
       )} ${
         pickEmojiExpression(gameResult,COMPUTER)
       }:(Computer)`;
 };


let temporaryTied = async (properties)=>{
    const {gameResult,playerName,moves,scores,tieCount,gameMode} = properties;

    let text = `The game is tied, ${commonTextDisplay(gameResult,playerName,moves,scores)}, tie count ${tieCount}. ${chalk.green("Continue playing the game")}`;
    if(gameMode === "console"){
        await spinSleepAndPrint(TEMP_TIED,text);
    }else{ 
       return text; }
     
}
    let permanentTied = async (properties)=>{
        const {gameResult,playerName,moves,scores,tieCount,gameMode} = properties;
       
        let text = `After ${tieCount} rounds of play, the game, sponsored by ${commonTextDisplay(gameResult,playerName,moves,scores)}, 🙅‍♂️ is officially tied`;
        if(gameMode === "console")
        await spinSleepAndPrint(CURR_SCORE,text);
        else
          return text;   
    }
   let currentScore = async (properties) =>{
        const {gameResult,playerName,moves,scores,tieCount,gameMode} = properties;

        let text = `Current score..., ** round ${4 - gameRound } ** ${commonTextDisplay(gameResult,playerName,moves,scores)}, ${chalk.green("Play again")}`
        if(gameMode === "console")
          await spinSleepAndPrint(PERM_TIED,text);
        else
        return text;
    }
    // winner = (options) =>{
    //     figlet(
    //         `Congrats , ${gameResult} !\n \n You Are The Winner...`,
    //         options
    //       );
    // }



export default {
    temporaryTied,
    permanentTied,
    currentScore,
    // winner
}

// export default commonTextDisplay

// temporaryTied({gameResult:"ibro",playerName:"ibro",playerMove:"rock",computerMove:"rock",scores:{playerScore:1,computerScore:1},tieCount:1})