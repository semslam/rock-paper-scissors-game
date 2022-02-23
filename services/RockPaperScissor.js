
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
        this.maxGameTie = 50,this.tieCount = 1,this.humanScore= 0,this.computerScore= 0;
        this.playerName = '';
    }

     startNewGame = async () => {
        let answer = await this.prompt({
            type: 'confirm',
            name: 'newGame',
            message: "Would you want to start a new game?"
        });
        if(!answer.newGame){
            console.log("******* Game End! ********");
            process.exit();
        }
        this.chooseOneGameOption();
    }

     chooseOneGameOption = async () =>{
        let result = await this.prompt([{
            type: 'list',
            name: 'gameOption',
            message: "Please choose one.",
            choices: [
            {name:'Human vs Computer',value:"humanVsComputer"}
            ]
        },{
            type:'input',
            message:'Enter a player name',
            name:"playerName",
            validate: (value) => { if(value){ return true} else {return 'You need to playerName to continue'}}
        }]
        );

        this.gameProcess(result.gameOption,result.playerName)
    }

     gameProcess = async (gameOption, playerName) =>{
        let playerMove = '', gameResult = '';
        this.computerScore=0, this.humanScore =0;
        let computerMove = this.computerMove();
        if (gameOption === "humanVsComputer"){
            this.playerName = playerName;
            playerMove = await this.humanMove();
        }
        if(playerMove ==='') {
            console.log("Human move cannot be empty. Please choose your move.");
            playerMove =  await this.humanMove();
        }
        
        gameResult = await this.analyticalEngine(this.playerName, playerMove, computerMove);

        if(gameResult === "tied"){
            if(this.tieCount === this.maxGameTie){
                console.log(`After ${this.tieCount} rounds of play, the game, sponsored by ${playerName} VS. Computer, is officially tied`);
                process.exit();
            }
            console.log(`The game is tied after ${this.tieCount} round(s). Continue playing the game`);
            this.tieCount++;
            this.gameProcess(gameOption)
        }else{
            gameResult === "computer"? this.computerScore++ : this.humanScore++;
            this.formatGameResult(gameResult, playerName, playerMove,computerMove);
            this.startNewGame();
        }
       
    }

    computerMove = () =>{
        return this.gameMoves[Math.floor(Math.random() * this.gameMoves.length)];
    }

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
    formatGameResult = (gameResult, playerName, playerMove,computerMove)=>{
        console.log(`The winner is ${gameResult} ** ${playerName}:(${playerMove}) ${this.humanScore} VS ${this.computerScore} Computer:(${computerMove}) `);
    }
}

module.exports = RockPaperScissor;