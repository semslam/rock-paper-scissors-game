
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { repeatedValues} from "../libraries/sustainedValues";
import sleep from "../libraries/sleep";

const [
    ROCK,
    PAPER,
    SCISSORS,
    COMPUTER,
    TIED,
    HUMAN_VS_COMPUTER,
    COMPUTER_VS_COMPUTER] = repeatedValues;

class ConsoleMode{

    constructor(){
        this.prompt = inquirer.createPromptModule();
    }
    clear = console.clear;
    log = console.log;

    /**
     * This display welcome and game guide message 
     */
    welcome = async () => {
        this.clear();
        const rainbowTitle = chalkAnimation.rainbow(
        "Welcome to a classic game rock , paper, scissors \n"
        );

        await sleep();
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
  };


  /**
   * Prompt the player to select a game mode: Human vs Computer or Computer vs Computer
   * and also prompts the user to input the player's name
   * @returns {Object} gameOptions
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

    return{
        gameRound : chooseGameMode.gameRound,
        playerType : playerType,
        gameOption : chooseGameMode.gameOption
    }
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
   * figlet the winner to the console.
   */
   congratsWinner = async (winnerName) => {
    figlet(
      `Congrats , ${winnerName} !\n \n You Are The Winner...`,
      (err, data) => {
        this.log(gradient.pastel.multiline(data) + "\n");
      }
    );
  };

}

export default ConsoleMode;