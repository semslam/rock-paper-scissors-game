import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

const log = console.log;
const clear = console.clear;

class RockPaperScissor{

// * a user can pick either paper, scissors, or rock as a choice.
// * the computer will choose a random option from the three choices to play against the user.
// * the user can visually see what they chose and what the computer chose.
// * the user will immediately know the outcome of their choice vs. the computer's choice.
// * A user can see a score that is continuous beyond each iteration of the game.
// * A user can see a console prompt to play again.


    constructor(){
        this.prompt = inquirer.createPromptModule();
        this.gameMoves = ["rock", "paper","scissors"];
        this.maxGameTie = 5,this.tieCount = 1,this.playerScore= 0,this.computerScore= 0,this.gameRound = 0;
        this.playerName = '';
    }

    

      welcome = async () => {
        clear();
        const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
        const rainbowTitle = chalkAnimation.rainbow(
          'Welcome to a classic game rock , paper, scissors \n'
        );
      
        await sleep();
        rainbowTitle.stop();
      
        log(`
          ${chalk.bgBlue('HOW TO PLAY')}

          1. Press Y -> continue,  n or any other key press -> ${chalk.bgRed('exit the game')}.
          2. Choose a game mode: Human vs Computer or Computer vs Computer
          3. Choose a game round: Play only once or Play three times
          4. Next, input the player's name.
          5. On three times play, the first player to win twice is declared the winner
          6. A tie with 50 rounds is a tie for life.
          
          ${chalk.green('CONTINUE THE GAME PROCESS')} 
        `);
        this.startNewGame();
      }

    /**
     * Prompt the a player to start game or end the game
     */
     startNewGame = async () => {
        let answer = await this.prompt({
            type: 'confirm',
            name: 'newGame',
            message: "Would you want to start a new game?"
        });
        if(!answer.newGame){
            log(`${chalk.red('******* GAME END! ********')}`);
            process.exit();
        }
        this.chooseOneGameOption();
    }

    /**
     * Prompt the player to select a game mode: Human vs Computer or Computer vs Computer
     * and also prompts the user to input the player's name
     */
     chooseOneGameOption = async () =>{
        let playerType = '';
        let chooseGameMode = await this.prompt([{
            type: 'list',
            name: 'gameOption',
            message: "Please choose one",
            choices: [
            {name:'Human vs Computer',value:"humanVsComputer"},
            {name: 'Computer vs Computer', value:"computerVsComputer"}
            ]
        },{
            type: 'list',
            name: 'gameRound',
            message: "Please choose your game round",
            choices: [
            {name:'Play only once',value:1},
            {name: 'Play three times', value:3}
            ]
        }
    ]);
        if(chooseGameMode.gameOption === "humanVsComputer"){
            let humanPlayer = await this.prompt({
                type:'input',
                message:'Enter a player name',
                name:"playerName",
                validate: (value) => { if(value){ return true} else {return 'You need a player name to continue'}}
            }
            );
            playerType = humanPlayer.playerName;
        }else playerType = "Robot"
        
        this.gameRound = chooseGameMode.gameRound;
       
        this.gameProcess(chooseGameMode.gameOption,playerType)
    }

    /**
     * The method procedure allows the players to move, 
     * it permits replay if the game is tied, and it may be played once, three times, or 50 times in a tie.
     * @param {String} gameOption 
     * @param {String} playerName 
     */
     gameProcess = async (gameOption, playerName) =>{
        let playerMove = '', gameResult = '';
        let computerMove = this.computerMove();
        if (gameOption === "humanVsComputer"){
            this.playerName = playerName;
            playerMove = await this.humanMove();
        }else if (gameOption === "computerVsComputer") {
            playerMove = this.computerMove();
            this.playerName = playerName;
        } 

        gameResult = await this.analyticalEngine(this.playerName, playerMove, computerMove);

        if(gameResult === "tied"){
            if(this.tieCount === this.maxGameTie){
                this.firstPlayerToWinTwice(gameResult, playerName, playerMove,computerMove)
            }
            console.log(`The game is tied after ${this.tieCount} round(s). Continue playing the game`);
            this.tieCount++;
            this.gameProcess(gameOption, playerName)
        }else{
            gameResult === "computer"? this.computerScore++ : this.playerScore++;
            if(this.gameRound > 1){
                if(this.computerScore === 2 || this.playerScore === 2){
                    this.formatGameResult(gameResult, playerName, playerMove,computerMove);
                }else{
                    console.log(`Current score ${this.gameRound}** ${playerName}:(${playerMove}) ${this.playerScore} VS ${this.computerScore} Computer:(${computerMove}) `);
                    this.gameRound--, this.tieCount = 1;
                    this.gameProcess(gameOption, playerName);
                }
                
            }else{
                this.formatGameResult(gameResult, playerName, playerMove,computerMove);
            }
        }
       
    }

    /**
     * This announce first player to win twice,or print if the game is tied
     * @param {String} gameResult 
     * @param {String} playerName 
     * @param {String} playerMove 
     * @param {String} computerMove 
     */
    firstPlayerToWinTwice = (gameResult, playerName, playerMove,computerMove) =>{
        this.computerScore > this.playerScore ? this.formatGameResult(gameResult, playerName, playerMove,computerMove) :
        this.playerScore > this.computerScore ? this.formatGameResult(gameResult, playerName, playerMove,computerMove) :
        console.log(`After ${this.tieCount} rounds of play, the game, sponsored by ${playerName} VS. Computer, is officially tied`); process.exit();
    }

    /**
     * Computer choose a random option from the three choices
     * @returns {String} move
     */
    computerMove = () =>{
        return this.gameMoves[Math.floor(Math.random() * this.gameMoves.length)];
    }
    /**
     * Prompt the player pick either paper, scissors, or rock as a choice.
     * @returns {String} move
     */
     humanMove = async ()=> {
        let result = await this.prompt({
            type: 'list',
            name: 'move',
            message: "Please choose your move.",
            choices: [
            { name: 'Rock', value: "rock" },
            { name: 'Paper', value: "paper" },
            { name: 'Scissors', value: "scissors" }
            ]
        });
        return result.move;
    }

    /**
     * Determine the winner of the game, whether it is a tie between the two players or not.
     * @param {String} playerName 
     * @param {String} playerMove 
     * @param {String} computerMove 
     * @returns {String} winner
     */
    analyticalEngine = (playerName, playerMove, computerMove)=>{
        let winner = "";
        switch(playerMove) {
            case computerMove:
                winner = "tied";
              break;
            case 'rock':
                winner = computerMove === 'paper'?  "computer" : playerName;
              break;
            case 'paper':
                winner = computerMove === 'scissors'? "computer": playerName
              break;
            case 'scissors':
                winner =  computerMove === 'rock'? "computer": playerName
              break;
            default:
                console.log("Wrong parameter pass");
                process.exit();
          }
          
          
        return new Promise((resolve, reject) => {
            resolve(winner);
        }); 
    }
    /**
     * Print the final score of the game.
     * @param {String} gameResult 
     * @param {String} playerName 
     * @param {String} playerMove 
     * @param {String} computerMove 
     */
     formatGameResult = (gameResult, playerName, playerMove,computerMove)=>{
        console.log(`The winner is ${gameResult} ** ${playerName}:(${playerMove}) ${this.playerScore} VS ${this.computerScore} Computer:(${computerMove}) `);
        this.computerScore = 0, this.playerScore = 0, this.tieCount = 1;
        this.startNewGame();
    }
}

export default RockPaperScissor;