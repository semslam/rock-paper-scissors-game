
import GameComponents from "./GameComponents.js";
import ConsoleMode from "../cli/ConsoleMode.js";
import resultManagement from "./ResultManagement.js";
import {printOutType, repeatedValues,isConsoleOrApi} from "../libraries/sustainedValues.js";
import {ErrorCodes} from "../libraries/sustainedValues.js";
import {errorResponse} from "../response/apiResponse.js";
import sleep from "../libraries/sleep.js";
 

// print type list
const [ 
TEMP_TIED, 
PERM_TIED, 
CURR_SCORE, 
WINNER 
] = printOutType;
// repeated values
const [
ROCK,
PAPER,
SCISSORS,
COMPUTER,
TIED,
HUMAN_VS_COMPUTER,
COMPUTER_VS_COMPUTER,
] = repeatedValues;
const [CONSOLE,API, CONSOLE_AND_API] = isConsoleOrApi;
class RockPaperScissor{
  // * a user can pick either paper, scissors, or rock as a choice.
  // * the computer will choose a random option from the three choices to play against the user.
  // * the user can visually see what they chose and what the computer chose.
  // * the user will immediately know the outcome of their choice vs. the computer's choice.
  // * A user can see a score that is continuous beyond each iteration of the game.
  // * A user can see a console prompt to play again.

  constructor(gameMode) {
    this.gameMode = gameMode;
    this.consoleMode = new ConsoleMode();
    this.gameComponents = new GameComponents();
  }
  gameStatus =false;
  clear = console.clear;
  log = console.log;
  maxGameTie = 2;tieCount = 1;playerScore = 0;computerScore = 0;gameRound = 0;playerName = ""; token ="";
  consoleWelcome = async (startNewGame = false)  =>{
      if(!startNewGame){
        await this.consoleMode.welcome();
      }
    await this.consoleMode.startNewGame(startNewGame);
    let res = await this.consoleMode.chooseOneGameOption();
   this.gameRound = res.gameRound;
   this.consolePredictMove(res.gameOption,res.playerName)

  }


  

  consolePredictMove = async (gameOption,playerName)=>{
      
    let playerMove = "";
    let computerMove = this.gameComponents.computerMove();
    if (gameOption === HUMAN_VS_COMPUTER) { 
        this.playerName = playerName;
        playerMove = await this.consoleMode.humanMove(); 
    }else if (gameOption === COMPUTER_VS_COMPUTER ) { 
        this.playerName = playerName; 
        playerMove = this.gameComponents.computerMove();
    }
    this.predictMove(gameOption,playerName,playerMove,computerMove,null);
  }

  apiPlayingProcess(apiRes,properties){

    const gameOption = properties.playingMode;
    let externalMove = properties.externalMove;
    const playerName = properties.playerName;
    this.token = properties.token;
    if(gameOption === COMPUTER_VS_COMPUTER){
        this.gameRound = properties.gameRound;
        for (let i = 0; i < this.gameRound; i++) {
            this.apiPredictMove(apiRes,gameOption,playerName,'')   
        }
    }else if(gameOption === HUMAN_VS_COMPUTER){
        this.gameRound = properties.gameRound;
        if(this.gameStatus){
            errorResponse(apiRes,ErrorCodes.FORBIDDEN,"The has ended,You are have to start another game");
        }
        this.apiPredictMove(apiRes,gameOption,playerName,externalMove)
    }
    
  }

  apiPredictMove = (apiRes,gameOption,playerName,externalMove)=>{
    
    try {
        let playerMove = "";
    let computerMove = this.gameComponents.computerMove();
    if (gameOption === HUMAN_VS_COMPUTER) { 
        this.playerName = playerName;
        playerMove = externalMove; 
    }else if (gameOption === COMPUTER_VS_COMPUTER ) { 
        this.playerName = playerName; 
        playerMove = this.gameComponents.computerMove();
    }
    
     this.predictMove(gameOption,playerName,playerMove,computerMove,apiRes);
    } catch (err) {
       console.log(err.message)
       throw new Error(err.message)
    }
    
  }

  /**
   * Predict the moves of the two players.
   * @param {String} gameOption
   * @param {String} playerName
   */
  predictMove = async (gameOption, playerName,playerMove,computerMove,apiRes = null) => {
   let gameResult = await this.gameComponents.analyticalEngine(this.playerName,playerMove,computerMove);

    if (gameResult === TIED) {
      if (this.tieCount === this.maxGameTie) {
        this.firstPlayerToWinTwice(gameOption,gameResult,playerName,playerMove,computerMove,apiRes);
      }
      this.printOutOptions(gameOption,playerName,computerMove,playerMove,TEMP_TIED,gameResult,apiRes);
    } else {
      gameResult === COMPUTER ? this.computerScore++ : this.playerScore++;
      if (this.gameRound > 1) 
        if (this.computerScore === 2 || this.playerScore === 2) this.printOutOptions(gameOption,playerName,computerMove,playerMove,WINNER,gameResult,apiRes);
         else this.printOutOptions(gameOption,playerName,computerMove,playerMove,CURR_SCORE,gameResult,apiRes);
        
       else this.printOutOptions(gameOption,playerName,computerMove,playerMove,WINNER,gameResult,apiRes);
    }
  };

  /**
   * To get first player to win twice,or if the game is tied
   * @param {String} gameResult
   * @param {String} playerName
   * @param {String} playerMove
   * @param {String} computerMove
   */
  firstPlayerToWinTwice = (gameOption,gameResult,playerName,playerMove,computerMove,apiRes) => {
    
    this.computerScore > this.playerScore
      ? this.printOutOptions(gameOption,playerName,computerMove,playerMove,WINNER,COMPUTER,apiRes)
      : this.playerScore > this.computerScore
      ? this.printOutOptions(gameOption,playerName,computerMove,playerMove,WINNER,playerName,apiRes)
      : this.printOutOptions(gameOption,playerName,computerMove,playerMove,PERM_TIED,gameResult,apiRes);
  };

    /**
     * This print out result base options
     * @param {String} gameOption 
     * @param {String} playerName 
     * @param {String} computerMove 
     * @param {String} playerMove 
     * @param {String} printType 
     * @param {String} gameResult 
     */
  printOutOptions = async (gameOption,playerName,computerMove,playerMove,printType,gameResult = "", apiRes = null) => {
    
    let properties = {gameResult,playerName,moves:{playerMove,computerMove},scores:{playerScore:this.playerScore,computerScore:this.computerScore},gameMode:this.gameMode,gameOption,token:this.token}
    
    switch (printType) {
        case TEMP_TIED:
            properties.tieCount = this.tieCount;
          this.tieCount++;
          if(this.gameMode === CONSOLE){
            await resultManagement.temporaryTied(properties)
            this.consolePredictMove(properties.gameOption, properties.playerName);
          }else{
            await resultManagement.temporaryTied(properties,apiRes)  
          }
          break;
        case PERM_TIED:
            properties.tieCount = this.tieCount;
          this.gameRound = 0;this.computerScore = 0; this.playerScore = 0; this.tieCount = 1; this.token =""; this.gameStatus= true;

          if(this.gameMode === CONSOLE){
            await resultManagement.permanentTied(properties)
            process.exit();
          }else{
            await resultManagement.permanentTied(properties,apiRes);
          }
          break;
        case CURR_SCORE:
            properties.gameRound = this.gameRound;
          this.gameRound--, this.tieCount = 1; // set tieCount back to 1
          if(this.gameMode === CONSOLE){
            await resultManagement.currentScore(properties)
            this.consolePredictMove(properties.gameOption,properties.playerName);
          }else{
            await resultManagement.currentScore(properties,apiRes);
          }
          break;
        case WINNER:
         this.gameRound = 0;this.computerScore = 0; this.playerScore = 0; this.tieCount = 1; this.token =""; this.gameStatus= true;
         if(this.gameMode === CONSOLE){
            await resultManagement.finalWinner(properties);
            await this.consoleMode.congratsWinner(properties.gameResult)
            await this.playAgain();
         }else{
            await resultManagement.finalWinner(properties,apiRes);
         }
          
          break;
        default:
          console.log("Wrong parameter pass printOutOptions");
          throw new Error("Wrong parameter pass in printOutOptions");
      }
    
  };


  /**
   * play again
   */
  playAgain = async () =>{
    await sleep(500)
    this.consoleWelcome(true);
  }
}

export default RockPaperScissor;
