import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import GameComponents from "./GameComponents";
import ConsoleMode from "../cli/ConsoleMode";
import printOutResult from "./PrintOutResult";

// print type list
const [ 
TEMP_TIED, 
PERM_TIED, 
CURR_SCORE, 
WINNER 
] = [
"temporaryTied",
"permanentTied",
"currentScore",
"winner",
];
// repeated values
const [
ROCK,
PAPER,
SCISSORS,
COMPUTER,
TIED,
HUMAN_VS_COMPUTER,
COMPUTER_VS_COMPUTER,
] = [
"rock",
"paper",
"scissors",
"computer",
"tied",
"humanVsComputer",
"computerVsComputer",
];

class RockPaperScissor{
  // * a user can pick either paper, scissors, or rock as a choice.
  // * the computer will choose a random option from the three choices to play against the user.
  // * the user can visually see what they chose and what the computer chose.
  // * the user will immediately know the outcome of their choice vs. the computer's choice.
  // * A user can see a score that is continuous beyond each iteration of the game.
  // * A user can see a console prompt to play again.

  constructor(gameMode) {

    printOutResult.isConsoleOrApi = "console"
    this.gameMode = gameMode;
    this.maxGameTie = 2,this.tieCount = 1,this.playerScore = 0,this.computerScore = 0,this.gameRound = 0;
    this.playerName = "";
    this.consoleMode = new ConsoleMode();
    this.gameComponents = new GameComponents();
    // this.printOutResult = new PrintOutResult();
  }
  
  clear = console.clear;
  log = console.log;
  sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

  consoleWelcome = async (startNewGame = false)  =>{
      if(!startNewGame){
        await this.consoleMode.welcome();
      }
    await this.consoleMode.startNewGame(startNewGame);
    let res = await this.consoleMode.chooseOneGameOption();
   this.gameRound = res.gameRound;
   this.gameProcess(res.gameOption, res.playerType);

  }



  /** rename this function moveProduction
   * The method procedure allows the players to move,
   * it permits replay if the game is tied, and it may be played once, three times, or 50 times in a tie.
   * @param {String} gameOption
   * @param {String} playerName
   */
  gameProcess = async (gameOption, playerName,externalMove = '') => {

    
      
    let playerMove = "", gameResult = "";
    let computerMove = 'rock'//this.gameComponents.computerMove();
    if (gameOption === HUMAN_VS_COMPUTER) { 
        this.playerName = playerName; 
        playerMove = this.gameMode === "console"? await this.consoleMode.humanMove() : externalMove; 
    }else if (gameOption === COMPUTER_VS_COMPUTER ) { 
        playerMove = this.gameComponents.computerMove();
        this.playerName = playerName; 
    }
   
    gameResult = await this.gameComponents.analyticalEngine(this.playerName,playerMove,computerMove);

    if (gameResult === TIED) {
      if (this.tieCount === this.maxGameTie) {
        this.firstPlayerToWinTwice(gameOption,gameResult,playerName,playerMove,computerMove);
      }
      this.printOutOptions(gameOption,playerName,computerMove,playerMove,TEMP_TIED,gameResult);
    } else {
      gameResult === COMPUTER ? this.computerScore++ : this.playerScore++;
      if (this.gameRound > 1) {
        if (this.computerScore === 2 || this.playerScore === 2) {
          this.printOutOptions(gameOption,playerName,computerMove,playerMove,WINNER,gameResult);
        } else {
           
          this.printOutOptions(gameOption,playerName,computerMove,playerMove,CURR_SCORE,gameResult);
        }
      } else {
        console.log(`ioqi=======${CURR_SCORE} ==${this.gameRound}== ${WINNER}`)
        this.printOutOptions(gameOption,playerName,computerMove,playerMove,WINNER,gameResult);
      }
    }
  };

  /**
   * This announce first player to win twice,or print if the game is tied
   * @param {String} gameResult
   * @param {String} playerName
   * @param {String} playerMove
   * @param {String} computerMove
   */
  firstPlayerToWinTwice = (gameOption,gameResult,playerName,playerMove,computerMove) => {
    
    this.computerScore > this.playerScore
      ? this.printOutOptions(gameOption,playerName,computerMove,playerMove,WINNER,COMPUTER)
      : this.playerScore > this.computerScore
      ? this.printOutOptions(gameOption,playerName,computerMove,playerMove,WINNER,playerName)
      : this.printOutOptions(gameOption,playerName,computerMove,playerMove,PERM_TIED,gameResult);
  };


  /**
   * This format common game result
   * @param {String} gameResult 
   * @param {String} playerName 
   * @param {String} playerMove 
   * @param {String} computerMove 
   * @returns {String} result
   */
  commonTextDisplay = (gameResult,playerName,playerMove,computerMove)=>{

   let pickEmojiExpression = (result, actor) =>{return result === actor ? "😁" : result === TIED?  "🙄":"😞"}
    return `(${playerName}):${
        pickEmojiExpression(gameResult,playerName)
      }  ${this.gameComponents.chooseEmojiMove(playerMove)}(${playerMove}) ${
        this.playerScore
      } VS ${this.computerScore} ${computerMove} ${this.gameComponents.chooseEmojiMove(
        computerMove
      )} ${
        pickEmojiExpression(gameResult,COMPUTER)
      }:(Computer)`
}

    /**
     * This print out result base options
     * @param {String} gameOption 
     * @param {String} playerName 
     * @param {String} computerMove 
     * @param {String} playerMove 
     * @param {String} printType 
     * @param {String} gameResult 
     */
  printOutOptions = async (gameOption,playerName,computerMove,playerMove,printType,gameResult = "") => {
    
    let property = {gameResult,playerName,moves:{playerMove,computerMove},scores:{playerScore:this.playerScore,computerScore:this.computerScore},tieCount:this.tieCount,gameMode:this.gameMode}

    switch (printType) {
      case TEMP_TIED:
        // spinner.error({
        //   text: `The game is tied, ${this.commonTextDisplay(gameResult,playerName,playerMove,computerMove)}, tie count ${this.tieCount}. ${chalk.green("Continue playing the game")}`,
        // });
        // console.log(`SHOW game mode ${printOutResult.isConsoleOrApi}`);
        
        await printOutResult.temporaryTied(property)
        this.tieCount++;
        this.gameProcess(gameOption, playerName);
        break;
      case PERM_TIED:
        // const spinner = createSpinner("Loading the result...").start();
        // await this.sleep();
        // let property = {gameResult,playerName,moves:{playerMove,computerMove},scores:{playerScore:this.playerScore,computerScore:this.computerScore},tieCount:this.tieCount,gameMode:this.gameMode}
        // spinner.error({
        //   text: `After ${this.tieCount} rounds of play, the game, sponsored by ${this.commonTextDisplay(gameResult,playerName,playerMove,computerMove)}, 🙅‍♂️ is officially tied`,
        // });
        await printOutResult.temporaryTied(property)
        process.exit();
        break;
      case CURR_SCORE:
          console.log(`TYPE OF score=== ${CURR_SCORE} , === ${printType}`)
        // const spinner = createSpinner("Loading the result...").start();
        // await this.sleep();
        
        // spinner.success({
        //   text: `Current score..., ** round ${
        //     4 - this.gameRound
        //   } ** ${this.commonTextDisplay(gameResult,playerName,playerMove,computerMove)}, ${chalk.green("Play again")}`,
        // });
        property.gameRound = this.gameRound;
        await printOutResult.currentScore(property)
        this.gameRound--, this.tieCount = 1;
        this.gameProcess(gameOption, playerName);
        break;
      case WINNER:
        // const spinner = createSpinner("Loading the result...").start();
        // await this.sleep();
        console.log(`TYPE OF WINNER=== ${WINNER} , === ${printType}`)
         this.formatGameResult(gameResult,playerName,playerMove,computerMove,spinner);
        break;
      default:
        console.log("Wrong parameter pass");
        break;
    }
  };

  /**
   * Print the final score of the game.
   * @param {String} gameResult
   * @param {String} playerName
   * @param {String} playerMove
   * @param {String} computerMove
   */
  formatGameResult = async (gameResult,playerName,playerMove,computerMove,spinner) => {
    figlet(
      `Congrats , ${gameResult} !\n \n You Are The Winner...`,
      (err, data) => {
        this.log(gradient.pastel.multiline(data) + "\n");
        spinner.success({
          text: `The winner is ${gameResult} *🤝 😁 🤴 🥳 🥂 🕺 💃 🍾* ${this.commonTextDisplay(gameResult,playerName,playerMove,computerMove)}`,
        });
        this.computerScore = 0, this.playerScore = 0, this.tieCount = 1;
         this.consoleWelcome(true);
      }
    );
    // winner((err, data) => {
    //     this.log(gradient.pastel.multiline(data) + "\n");
    //     spinner.success({
    //       text: `The winner is ${gameResult} *🤝 😁 🤴 🥳 🥂 🕺 💃 🍾* ${this.commonTextDisplay(gameResult,playerName,playerMove,computerMove)}`,
    //     });
    //     this.computerScore = 0, this.playerScore = 0, this.tieCount = 1;
    //      this.consoleWelcome(true);
    //   })
   
  };
}

export default RockPaperScissor;
