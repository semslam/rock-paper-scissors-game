const { graphqlHTTP } = require("express-graphql");
const reportManager = require("../services/ReportManager");
const gameSchema = require("../models/graphqlQueries/GameRecordsBuildSchema");
const userSchema = require("../models/graphqlQueries/UsersBuildSchema");
const {removeUndefineInObj} = require("../libraries/Validator");
const auth = require("../middleware/jsonwebtokenAuthentication")

const fetchGameReport= async (query)=>{
   return await  reportManager.fetchGameRecords(query);
}
const fetchUserReport= async (query)=>{
    return await  reportManager.fetchUserRecords(query);
 }
 const fetchSingleUserRecord= async (query)=>{
    return await  reportManager.fetchSingleUserRecord(query); 
 }

module.exports = (router) => {
const gameRoot = { 
    gameRecords: async ({userId,_id})=>{ 
      return fetchGameReport(removeUndefineInObj({userId,_id}));
    },
    anyGameResult: async ({_id,userId,isWin,gameMode,gameType,drawTimes,winningTimes})=>{ 
        return fetchGameReport(removeUndefineInObj({_id,userId,isWin,gameMode,gameType,drawTimes,winningTimes}));
      }
}

const userRoot = { 
    getUser: async ({_id})=>{ 
      return fetchSingleUserRecord(removeUndefineInObj({_id}));
    },
    getUsers: async ({_id,username,gender})=>{ 
      return fetchUserReport(removeUndefineInObj({_id,username,gender}));
    }
}


router.use('/user_record',auth.authenticateToken, graphqlHTTP({
    schema: userSchema,
    rootValue:userRoot,
    graphiql: true,
}));

router.use('/game_result',auth.authenticateToken, graphqlHTTP({
    schema: gameSchema,
    rootValue:gameRoot,
    graphiql: true,
}));

return router;
}

// GraphQl Game Records query

// {
//     gameRecords(userId:"62222dc983398810e7d52f23",_id:"6223a8cff87ec5d02e713350"){
//       _id
//       userId
//       isWin
//       gameMode
//       gameType
//       drawTimes
//       winningTimes
//       playingHistory {
//         resultType
//         playerOne
//         playerOneMove
//         playerOneScores
//         playerTwo
//         playerTwoMove
//         playerTwoScores
//       }
//       rowRecords
//       scoreRecord {
//         playerOne {
//           name,
//           scores
//         }
//         playerTwo {
//           name,
//           scores
//         }
//       }
//       createAt
//     }
//   }

// {
//     anyGameResult(userId: "62222dc983398810e7d52f23",isWin:true,gameType: "computerVsComputer",winningTimes: 3,_id: "6228df0655e18dbae64aaaf1"){
//       _id
//       userId
//       isWin
//       gameMode
//       gameType
//       drawTimes
//       winningTimes
//       playingHistory {
//         resultType
//         playerOne
//         playerOneMove
//         playerOneScores
//         playerTwo
//         playerTwoMove
//         playerTwoScores
//       }
//       rowRecords
//       scoreRecord {
//         playerOne {
//           name,
//           scores
//         }
//         playerTwo {
//           name,
//           scores
//         }
//       }
//       createAt
//     }


// GraphQl User Records query

// {
//     getUser(_id:"62222dc983398810e7d52f23"){
//       _id,
//       username,
//       gender,
//       createAt
//     },
//     getUsers(gender:"Female"){
//       _id,
//       username,
//       gender,
//       createAt
//     }
//   }

