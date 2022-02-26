import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

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

class RockPaperScissor {
  // * a user can pick either paper, scissors, or rock as a choice.
  // * the computer will choose a random option from the three choices to play against the user.
  // * the user can visually see what they chose and what the computer chose.
  // * the user will immediately know the outcome of their choice vs. the computer's choice.
  // * A user can see a score that is continuous beyond each iteration of the game.
  // * A user can see a console prompt to play again.

  constructor() {
    this.prompt = inquirer.createPromptModule();
    this.gameMoves = [ROCK, PAPER, SCISSORS];
    this.maxGameTie = 50,this.tieCount = 1,this.playerScore = 0,this.computerScore = 0,this.gameRound = 0;
    this.playerName = "";
  }
  clear = console.clear;
  log = console.log;
  sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
/**
 * This display welcome and game guide message 
 */
  welcome = async () => {
    this.clear();
    const rainbowTitle = chalkAnimation.rainbow(
      "Welcome to a classic game rock , paper, scissors \n"
    );

    await this.sleep();
    rainbowTitle.stop();

    this.log(`
          ${chalk.bgBlue("HOW TO PLAY")}

          1. Press Y -> continue,  n or any other key press -> ${chalk.bgRed(
            "exit the game"
          )}.
          2. Choose a game mode: Human vs Computer or Computer vs Computer
          3. Choose a game round: Play only once or Play three times
          4. Next, input the player's name.
          5. On three times play, the first player to win twice is declared the winner
          6. A tie with 50 rounds is a tie for life.
          
          ${chalk.green("CONTINUE THE GAME PROCESS")} 
        `);
    this.startNewGame();
  };

  /**
   * Prompt the a player to start game or end the game
   */
  startNewGame = async (isClean = false) => {
    let answer = await this.prompt({
      type: "confirm",
      name: "newGame",
      message: "Would you want to start a new game?",
    });
    if (!answer.newGame) {
      this.log(`${chalk.red("******* GAME END! ********")}`);
      process.exit();
    }
    if (isClean) this.clear();
    this.chooseOneGameOption();
  };

  /**
   * Prompt the player to select a game mode: Human vs Computer or Computer vs Computer
   * and also prompts the user to input the player's name
   */
  chooseOneGameOption = async () => {
    let playerType = "";
    let chooseGameMode = await this.prompt([
      {
        type: "list",
        name: "gameOption",
        message: "Please choose one",
        choices: [
          { name: "Human vs Computer", value: HUMAN_VS_COMPUTER },
          { name: "Computer vs Computer", value: COMPUTER_VS_COMPUTER },
        ],
      },
      {
        type: "list",
        name: "gameRound",
        message: "Please choose your game round",
        choices: [
          { name: "Play only once", value: 1 },
          { name: "Play three times", value: 3 },
        ],
      },
    ]);
    if (chooseGameMode.gameOption === HUMAN_VS_COMPUTER) {
      let humanPlayer = await this.prompt({
        type: "input",
        message: "Enter a player name",
        name: "playerName",
        validate: (value) => { if(value) return true; else return "You need a player name to continue";},
      });
      playerType = humanPlayer.playerName;
    } else playerType = "Robot";

    this.gameRound = chooseGameMode.gameRound;

    this.gameProcess(chooseGameMode.gameOption, playerType);
  };

  /**
   * The method procedure allows the players to move,
   * it permits replay if the game is tied, and it may be played once, three times, or 50 times in a tie.
   * @param {String} gameOption
   * @param {String} playerName
   */
  gameProcess = async (gameOption, playerName) => {
    let playerMove = "", gameResult = "";
    let computerMove = this.computerMove();
    if (gameOption === HUMAN_VS_COMPUTER) { this.playerName = playerName; playerMove = await this.humanMove(); } 
    else if (gameOption === COMPUTER_VS_COMPUTER) { playerMove = this.computerMove();this.playerName = playerName; }

    gameResult = await this.analyticalEngine(this.playerName,playerMove,computerMove);

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
        this.printOutOptions(gameOption,playerName,computerMove,playerMove,WINNER,gameResult);
      }
    }
  };

  /**
   * This returns emoji that represent game moves
   * @param {String} emojiName 
   * @returns {String} emoji
   */
  chooseEmojiMove = (emojiName) => {
    switch (emojiName) {
      case ROCK:
        return "🤜";
      case PAPER:
        return "✋";
      case SCISSORS:
        return "✌";
      default:
        console.log("Wrong parameter pass");
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
   * Computer choose a random option from the three choices
   * @returns {String} move
   */
  computerMove = () => {
    return this.gameMoves[Math.floor(Math.random() * this.gameMoves.length)];
  };
  /**
   * Prompt the player pick either paper, scissors, or rock as a choice.
   * @returns {String} move
   */
  humanMove = async () => {
    let result = await this.prompt({
      type: "list",
      name: "move",
      message: "Please choose your move.",
      choices: [
        { name: "Rock 🤜", value: ROCK },
        { name: "Paper ✋", value: PAPER },
        { name: "Scissors ✌️", value: SCISSORS },
      ],
    });
    return result.move;
  };

  /**
   * Determine the winner of the game, whether it is a tie between the two players or not.
   * @param {String} playerName
   * @param {String} playerMove
   * @param {String} computerMove
   * @returns {String} winner
   */
  analyticalEngine = (playerName, playerMove, computerMove) => {
    let winner = "";
    switch (playerMove) {
      case computerMove:
        winner = TIED;
        break;
      case ROCK:
        winner = computerMove === PAPER ? COMPUTER : playerName;
        break;
      case PAPER:
        winner = computerMove === SCISSORS ? COMPUTER : playerName;
        break;
      case SCISSORS:
        winner = computerMove === ROCK ? COMPUTER : playerName;
        break;
      default:
        console.log("Wrong parameter pass");
        process.exit();
    }

    return new Promise((resolve, reject) => {
      resolve(winner);
    });
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
      } ${this.chooseEmojiMove(playerMove)}(${playerMove}) ${
        this.playerScore
      } VS ${this.computerScore} ${computerMove} ${this.chooseEmojiMove(
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
    const spinner = createSpinner("Loading the result...").start();
    await this.sleep();
    

    switch (printType) {
      case TEMP_TIED:
        spinner.error({
          text: `The game is tied, ${this.commonTextDisplay(gameResult,playerName,playerMove,computerMove)}, tie count ${this.tieCount}. ${chalk.green("Continue playing the game")}`,
        });
        this.tieCount++;
        this.gameProcess(gameOption, playerName);
        break;
      case PERM_TIED:
        spinner.error({
          text: `After ${this.tieCount} rounds of play, the game, sponsored by ${this.commonTextDisplay(gameResult,playerName,playerMove,computerMove)}, 🙅‍♂️ is officially tied`,
        });
        process.exit();
        break;
      case CURR_SCORE:
        spinner.success({
          text: `Current score..., ** round ${
            4 - this.gameRound
          } ** ${this.commonTextDisplay(gameResult,playerName,playerMove,computerMove)}, ${chalk.green("Play again")}`,
        });
        this.gameRound--, this.tieCount = 1;
        this.gameProcess(gameOption, playerName);
        break;
      case WINNER:
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
  formatGameResult = (gameResult,playerName,playerMove,computerMove,spinner) => {
    figlet(
      `Congrats , ${gameResult} !\n \n You Are The Winner...`,
      (err, data) => {
        this.log(gradient.pastel.multiline(data) + "\n");
        spinner.success({
          text: `The winner is ${gameResult} *🤝 😁 🤴 🥳 🥂 🕺 💃 🍾* ${this.commonTextDisplay(gameResult,playerName,playerMove,computerMove)}`,
        });
        this.computerScore = 0, this.playerScore = 0, this.tieCount = 1;
        this.startNewGame(true);
      }
    );
  };
}

export default RockPaperScissor;
