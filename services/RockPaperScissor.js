
import GameComponents from "./GameComponents.js";
import ConsoleMode from "../cli/ConsoleMode.js";
import resultManagement from "./ResultManagement.js";
import {printOutType, repeatedValues,isConsoleOrApi} from "../libraries/sustainedValues.js";
import {getResult,errorResult} from "../response/Princenter.js"
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
  maxGameTie = 2;tieCount = 1;playerScore = 0;computerScore = 0;gameRound = 0;playerName = "";
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
    console.log({gameOption,playerName,playerMove,gameRound:this.gameRound});
    this.predictMove(gameOption,playerName,playerMove,computerMove,null);
  }

  apiPlayingProcess(apiRes,properties){

    const gameOption = properties.playingMode;
    let externalMove = properties.externalMove;
    const playerName = properties.playerName;
    console.log({gameOption, playerName});
    if(gameOption === COMPUTER_VS_COMPUTER){
        this.gameRound = properties.gameRound;
        for (let i = 0; i < this.gameRound; i++) {
            this.apiPredictMove(apiRes,gameOption,playerName,'')   
        }
    }else if(gameOption === HUMAN_VS_COMPUTER){
        this.gameRound = properties.gameRound;
        console.info({gameOption,playerName,externalMove});
        console.log(`Biggin ==== ${this.gameStatus}`)
        if(this.gameStatus){
            console.log(`End ==== ${this.gameStatus}`)
            errorResult(apiRes,"The has ended,You are have to play another game");
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

    // console.log({ gameOption,playerName,externalMove,computerMove,apiRes});
    
     this.predictMove(gameOption,playerName,playerMove,computerMove,apiRes);
    } catch (err) {
       console.log(err) 
    }
    
    
  }

  /**
   * Predict the moves of the two players.
   * @param {String} gameOption
   * @param {String} playerName
   */
  predictMove = async (gameOption, playerName,playerMove,computerMove,apiRes = null) => {
    console.log({gameOption, playerName,playerMove,computerMove})
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
    
    let properties = {gameResult,playerName,moves:{playerMove,computerMove},scores:{playerScore:this.playerScore,computerScore:this.computerScore},gameMode:this.gameMode,gameOption}
    console.log(properties);
    if(this.gameMode === CONSOLE){
        this.consolePrintOption(properties,printType);
    }else{
        this.apiPrintOption(properties,printType,apiRes)
    }


    
  };

  consolePrintOption= async (property,printType)=>{
    switch (printType) {
        case TEMP_TIED:
          property.tieCount = this.tieCount;
          this.tieCount++;
          await resultManagement.temporaryTied(property)
          this.consolePredictMove(property.gameOption, property.playerName);
          break;
        case PERM_TIED:
          property.tieCount = this.tieCount;
          this.gameRound = 0,this.computerScore = 0, this.playerScore = 0, this.tieCount = 1;
          await resultManagement.permanentTied(property)
          process.exit();
          break;
        case CURR_SCORE:
          property.gameRound = this.gameRound;
          this.gameRound--, this.tieCount = 1;
          await resultManagement.currentScore(property)
            this.consolePredictMove(property.gameOption,property.playerName);
          break;
        case WINNER:
          this.computerScore = 0, this.playerScore = 0, this.tieCount = 1;
          await resultManagement.finalWinner(property);
            await this.consoleMode.congratsWinner(property.gameResult)
            await this.playAgain();
          break;
        default:
          console.log("Wrong parameter pass");
          break;
      }

  }
  apiPrintOption= async (property,printType,apiRes)=>{
    switch (printType) {
        case TEMP_TIED:
          property.tieCount = this.tieCount;
          this.tieCount++;
          await resultManagement.temporaryTied(property,apiRes)
                // if(gameOption === HUMAN_VS_COMPUTER){
                //     this.apiPredictMove(property.gameOption,property.playerName,'',apiRes);
                // }
          break;
        case PERM_TIED:
          property.tieCount = this.tieCount;
          this.gameRound = 0,this.computerScore = 0, this.playerScore = 0, this.tieCount = 1, this.gameStatus= true;
          await resultManagement.permanentTied(property,apiRes)
        case CURR_SCORE:
          property.gameRound = this.gameRound;
          this.gameRound--, this.tieCount = 1;
          await resultManagement.currentScore(property,apiRes)
        //   this.apiPredictMove(property.gameOption,property.playerName,'',apiRes);
          break;
        case WINNER:
          this.computerScore = 0, this.playerScore = 0, this.tieCount = 1, this.gameStatus= true;
          await resultManagement.finalWinner(property,apiRes);
          break;
        default:
          console.log("Wrong parameter pass");
          break;
      }
    }

  /**
   * play again
   */
  playAgain = async () =>{
    await sleep(500)
    this.consoleWelcome(true);
  }
}

export default RockPaperScissor;
