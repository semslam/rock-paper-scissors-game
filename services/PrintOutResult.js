import chalk from "chalk";
import { createSpinner } from "nanospinner";


const spinner = createSpinner("Loading the result...").start();
await sleep();
let isConsole =''


/**
   * This format common game result
   * @param {String} gameResult 
   * @param {String} playerName 
   * @param {String} playerMove 
   * @param {String} computerMove 
   * @returns {String} result
   */
 commonTextDisplay = (gameResult,playerName,playerMove,computerMove,playerScore)=>{

    // const {gameResult,playerName,playerMove,computerMove,playerScore} = properties;

    let pickEmojiExpression = (result, actor) =>{return result === actor ? "😁" : result === TIED?  "🙄":"😞"}
     return `(${playerName}):${
         pickEmojiExpression(gameResult,playerName)
       }  ${this.gameComponents.chooseEmojiMove(playerMove)}(${playerMove}) ${
         playerScore
       } VS ${this.computerScore} ${computerMove} ${this.gameComponents.chooseEmojiMove(
         computerMove
       )} ${
         pickEmojiExpression(gameResult,COMPUTER)
       }:(Computer)`
 }


temporaryTied = (properties)=>{
         
    const {gameResult,playerName,playerMove,computerMove,playerScore,tieCount} = properties;
    let text = `The game is tied, ${this.commonTextDisplay(gameResult,playerName,playerMove,computerMove,playerScore)}, tie count ${tieCount}. ${chalk.green("Continue playing the game")}`;
    if(isConsole === "console")
    spinner.error({text: text,});
    else
     return text; 
}
    permanentTied = ()=>{}
    currentScore = () =>{}
    winner = () =>{}



export {
    temporaryTied,
    permanentTied,
    currentScore,
    winner
}