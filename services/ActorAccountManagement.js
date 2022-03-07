
import {successResponse,errorResponse} from "../response/apiResponse.js";
import {hashPassword, isPasswordMatch} from "../libraries/encryptAndDecrypt.js";
import {create,update,findOne,find} from "../repositories/UserRep.js"
import {generateAccessToken} from "../libraries/encryptAndDecrypt.js"

const userOnboardProcess = async (req,res)=>{
    try {
        const hashedPassword = await hashPassword(req.password);
    let user = {username:req.username,password:hashedPassword,gender:req.gender};
    user = await create(user);
    console.log(user)
    const token = generateAccessToken({id:user._id,username:user.username});
    console.log(token)
    res.json({ token: token});
    } catch (err) {
       return errorResponse(res,500,new Error(err))
    }
    
}


const loginProcess = async (req,res)=>{
    try {
        console.log(req);
        const  user = await findOne({username:req.username});
         const passer = await isPasswordMatch(req.password,user.password);
         if(!passer){
             return res.json({ message: "password not match" });
         }
       const accessToken = generateAccessToken({id:user._id,username:user.username})
     
       res.json({ accessToken: accessToken})
         res.json({ message:req}); 
    } catch (err) {
        return errorResponse(res,500,new Error(err))
    }
    
    
}

const fetchGameRecords = ()=>{
   return [
       {
        _id:"6223a8cff87ec5d02e713350",
        clientId:"62222dc983398810e7d52f23",
        username:"semslam@gmail.com",
        gameMode:"api",
        gameType:"humanVsComputer",
        isWin:true,
        winner:"Olanrewaju",
        scoreRecord:{
          playerOne:{
          name: "computer",
          scores: 1
          },
          playerTwo:{
          name: "Olanrewaju",
          scores: 2
          }
          },
          playingHistory:[
            {
            resultType: "Win",
            playerOne: "computer",
            playerOneMove: "paper",
            playerOneScores: 1,
            playerTwo: "Olanrewaju",
            playerTwoMove: "rock",
            playerTwoScores: 0
            },
            {
            resultType: "Win",
            playerOne: "computer",
            playerOneMove: "scissors",
            playerOneScores: 1,
            playerTwo: "Olanrewaju",
            playerTwoMove: "rock",
            playerTwoScores: 1
            },
            {
            resultType: "Win",
            playerOne: "computer",
            playerOneMove: "scissors",
            playerOneScores: 1,
            playerTwo: "Olanrewaju",
            playerTwoMove: "rock",
            playerTwoScores: 2
            }
            ],
            rowRecords:[
              "Current score..., ** round 1 ** (Olanrewaju):😞  🤜(rock) 0 VS 1 paper ✋ 😁:(Computer), Play again",
              "Current score..., ** round 1 ** (Olanrewaju):😁  🤜(rock) 1 VS 1 scissors ✌️ 😞:(Computer), Play again",
              "The winner is Olanrewaju *🤝 😁 🤴 🥳 🥂 🕺 💃 🍾* (Olanrewaju):😁  🤜(rock) 2 VS 1 scissors ✌️ 😞:(Computer)"
              ]
          },
          {
            _id:"6223a8cff87ec5d02e713360",
            clientId:"62222dc983398810e7d52f23",
            username:"semslam@gmail.com",
            gameMode:"api",
            gameType:"humanVsComputer",
            isWin:true,
            winner:"computer",
            scoreRecord:{
              playerOne:{
              name: "computer",
              scores: 2
              },
              playerTwo:{
              name: "Olanrewaju",
              scores: 1
              }
              },
              playingHistory:[
                {
                resultType: "Win",
                playerOne: "computer",
                playerOneMove: "paper",
                playerOneScores: 1,
                playerTwo: "Olanrewaju",
                playerTwoMove: "rock",
                playerTwoScores: 0
                },
                {
                resultType: "Win",
                playerOne: "computer",
                playerOneMove: "scissors",
                playerOneScores: 1,
                playerTwo: "Olanrewaju",
                playerTwoMove: "rock",
                playerTwoScores: 1
                },
                {
                resultType: "Win",
                playerOne: "computer",
                playerOneMove: "scissors",
                playerOneScores: 2,
                playerTwo: "Olanrewaju",
                playerTwoMove: "rock",
                playerTwoScores: 1
                }
                ],
                rowRecords:[
                  "Current score..., ** round 1 ** (Olanrewaju):😞  🤜(rock) 0 VS 1 paper ✋ 😁:(Computer), Play again",
                  "Current score..., ** round 1 ** (Olanrewaju):😁  🤜(rock) 1 VS 1 scissors ✌️ 😞:(Computer), Play again",
                  "The winner is Olanrewaju *🤝 😁 🤴 🥳 🥂 🕺 💃 🍾* (Olanrewaju):😁  🤜(rock) 1 VS 2 scissors ✌️ 😞:(Computer)"
                  ]
              },
              {
                _id:"6223a8cff87ec5d02e713370",
                clientId:"62222dc983398810e7d52f23",
                username:"semslam@gmail.com",
                gameMode:"api",
                gameType:"humanVsComputer",
                isWin:false,
                winner:"",
                scoreRecord:{
                  playerOne:{
                  name: "computer",
                  scores: 1
                  },
                  playerTwo:{
                  name: "Olanrewaju",
                  scores: 1
                  }
                  },
                  playingHistory:[
                    {
                    resultType: "Win",
                    playerOne: "computer",
                    playerOneMove: "paper",
                    playerOneScores: 1,
                    playerTwo: "Olanrewaju",
                    playerTwoMove: "rock",
                    playerTwoScores: 0
                    },
                    {
                    resultType: "Draw",
                    playerOne: "computer",
                    playerOneMove: "scissors",
                    playerOneScores: 1,
                    playerTwo: "Olanrewaju",
                    playerTwoMove: "scissors",
                    playerTwoScores: 1
                    },
                    {
                    resultType: "Win",
                    playerOne: "computer",
                    playerOneMove: "scissors",
                    playerOneScores: 1,
                    playerTwo: "Olanrewaju",
                    playerTwoMove: "scissors",
                    playerTwoScores: 1
                    },
                    ,
                    {
                    resultType: "Draw",
                    playerOne: "computer",
                    playerOneMove: "rock",
                    playerOneScores: 1,
                    playerTwo: "Olanrewaju",
                    playerTwoMove: "rock",
                    playerTwoScores: 1
                    },
                    ,
                    {
                    resultType: "Draw",
                    playerOne: "computer",
                    playerOneMove: "scissors",
                    playerOneScores: 1,
                    playerTwo: "Olanrewaju",
                    playerTwoMove: "rock",
                    playerTwoScores: 1
                    }
                    ],
                    rowRecords:[
                      "Current score..., ** round 1 ** (Olanrewaju):😞  🤜(rock) 0 VS 1 paper ✋ 😁:(Computer), Play again",
                      "Current score..., ** round 1 ** (Olanrewaju):😁  🤜(rock) 1 VS 1 scissors ✌️ 😞:(Computer), Play again",
                      "The game is tied, (Olanrewaju):🙄  🤜(rock) 1 VS 1 rock 🤜 🙄:(Computer), tie count 1. Continue playing the game",
                      "The game is tied, (Olanrewaju):🙄  🤜(rock) 0 VS 0 rock 🤜 🙄:(Computer), tie count 1. Continue playing the game"
                      ]
                  }
        ]
}


export default {
    userOnboardProcess,
    loginProcess,
    fetchGameRecords
}