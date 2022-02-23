
const inquirer = require("inquirer")
class RockPaperScissor{
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
}

module.exports = RockPaperScissor;