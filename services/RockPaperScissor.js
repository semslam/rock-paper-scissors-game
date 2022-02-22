
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
        console.log(result.gameOption);
    }
}

module.exports = RockPaperScissor;