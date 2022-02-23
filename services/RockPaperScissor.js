
const inquirer = require("inquirer")
class RockPaperScissor{

// * For each iteration of the game, a user can pick either paper, scissors, or rock as a choice.
// * For each iteration of the game, the computer will choose a random option from the three choices to play against the user.
// * For each iteration of the game, the user can visually see what they chose and what the computer chose.
// * For each iteration of the game, the user will immediately know the outcome of their choice vs. the computer's choice.
// * A user can see a score that is continuous beyond each iteration of the game.
// * A user can see a console prompt to play again.


    constructor(){
        this.prompt = inquirer.createPromptModule();
        this.gameMoves = ["rock", "paper","scissors"];
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
        let result = await this.prompt({
            type: 'list',
            name: 'gameOption',
            message: "Please choose one.",
            choices: [
            {name:'Human vs Computer',value:"humanVsComputer"}
            ]
        });
        this.gameProcess(result.gameOption)
    }

     gameProcess = async (gameOption) =>{
        let playerName = '';
        let playerMove = '';
        let computerMove = this.computerMove()
        if (gameOption === "humanVsComputer"){
            playerName ='Xavas';
            playerMove = await this.humanMove();
        }

        if(playerMove ==='') {
            console.log("Human move cannot be empty. Please choose your move.");
            playerMove =  await this.humanMove();
        }
        // implement a method verified the winner
        console.log(`Yea I'm ${playerName} the best player so far!!, Who want to challenge me`);
        console.log(`Computer move ${computerMove} *********** ${playerName} move ${playerMove}`); 
    
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

    analyticalEngine(playerName, playerMove, computerMove){
        let winner = "";
        if (playerMove === computerMove) 
            winner = "tie game";

         else if (playerMove === 'rock') 
            winner = computerMove === 'paper'?  "computer" : playerName;

         else if (playerMove === 'paper') 
            winner = computerMove === 'scissors'? "computer": playerName

         else if (playerMove === 'scissors') 
            winner =  computerMove === 'rock'? "computer": playerName

         else {
            console.log("Wrong parameter pass");
            process.exit();
        }

        return new Promise((resolve, reject) => {
            resolve(winner);
        }); 
    }
}

module.exports = RockPaperScissor;