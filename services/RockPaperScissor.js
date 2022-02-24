
const inquirer = require("inquirer")
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
        this.maxGameTie = 50,this.tieCount = 1,this.playerScore= 0,this.computerScore= 0;
        this.playerName = '';
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
            console.log("******* GAME END! ********");
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
        let chooseGameMode = await this.prompt({
            type: 'list',
            name: 'gameOption',
            message: "Please choose one",
            choices: [
            {name:'Human vs Computer',value:"humanVsComputer"},
            {name: 'Computer vs Computer', value:"computerVsComputer"}
            ]
        });
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
        this.computerScore=0, this.playerScore =0;
        let computerMove =  this.computerMove();
        if (gameOption === "humanVsComputer"){
            this.playerName = playerName;
            playerMove = await this.humanMove();
        }else if (gameOption === "computerVsComputer") {
            playerMove = this.computerMove();
            this.playerName = playerName;
        } 
        // if(playerMove ==='') {
        //     console.log("Human move cannot be empty. Please choose your move.");
        //     playerMove =  await this.humanMove();
        // }
        
        gameResult = await this.analyticalEngine(this.playerName, playerMove, computerMove);

        if(gameResult === "tied"){
            if(this.tieCount === this.maxGameTie){
                console.log(`After ${this.tieCount} rounds of play, the game, sponsored by ${playerName} VS. Computer, is officially tied`);
                process.exit();
            }
            console.log(`The game is tied after ${this.tieCount} round(s). Continue playing the game`);
            this.tieCount++;
            this.gameProcess(gameOption, playerName)
        }else{
            gameResult === "computer"? this.computerScore++ : this.playerScore++;
            this.formatGameResult(gameResult, playerName, playerMove,computerMove);
            this.startNewGame();
        }
       
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
    }
}

module.exports = RockPaperScissor;