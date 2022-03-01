'use strict';
// import * as RockPaperScissor from "../../services/RockPaperScissor.js";  

// const rockPaperScissor = new RockPaperScissor("api")

const provideGameOption = (req, res)=>{
//computer or human
// choose game round
// playerName
res.json({ message:req.body });
}

const gameMove = (req, res)=>{
    //player move
    res.json({ message:req.body });
}


export default {
    provideGameOption,
    gameMove
}