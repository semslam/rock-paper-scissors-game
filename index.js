const inquirer = require("inquirer");

inquirer.prompt([{
    type:"list",
    name:"userMove",
    choices:["rock","paper","scissor"]
}]).then(({userMove}) =>{
    console.log(`The user chooses a move: ${userMove}`);
})