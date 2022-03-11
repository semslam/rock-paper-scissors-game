const { buildSchema } = require("graphql");

const user = `
type User {
    id: String
    username:String
    gender:String
  }
`;

const playingHistories = `
type PlayingHistories {
    resultType: String
    playerOne:String
    playerOneMove:String
    playerOneScores:Int
    playerTwo: String
    playerTwoMove: String
    playerTwoScores: Int
  }
`;

const scoreRecord = `
type ScoreRecord {
    playerOne:PlayerOne!
    playerTwo :PlayerTwo!
}
type PlayerOne {
    name: String!
    scores: Int!
}
type PlayerTwo {
    name: String!
    scores: Int!
}
`;

const gameRecords = `
type GameRecords {
    _id: String
    userId: String
    isWin: Boolean
    winner:String
    gameMode: String
    gameType: String
    drawTimes:Int
    winningTimes:Int
    playingHistory: [PlayingHistories]
    rowRecords:[String]
    scoreRecord:ScoreRecord
    createAt:String
  }
`;
// user(id: String!): User
// fetched by userId!, id, limit = 10!, cursor = 1, bigginDate, endDate,
const gameSchema = buildSchema(`
  type Query {
    gameRecords(userId: String!,id: String):[GameRecords]
  }
  ${gameRecords},
  ${playingHistories},
  ${scoreRecord}

`);

// const schema = buildSchema(`
//   type Query {
//     user(id: String!): [User]
//   }
//   type User {
//     id: String
//     username:String
//     gender:String
//   }
// `);

module.exports = gameSchema;

