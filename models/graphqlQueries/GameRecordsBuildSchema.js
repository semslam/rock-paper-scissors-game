import { buildSchema } from "graphql";

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
    username:String
    isWin: Boolean
    winner:String
    clientId: String
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
// ${user}, // (userId: "62222dc983398810e7d52f23")
const gameSchema = buildSchema(`
  type Query {
    gameRecords(clientId: String!):[GameRecords]
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

export default gameSchema;

