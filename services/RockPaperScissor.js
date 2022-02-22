
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
            console.log("******* Game End ********");
            process.exit();
        }
        console.log(`********* Let's get the game started **********`);
    }
}

module.exports = RockPaperScissor;