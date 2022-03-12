const { buildSchema } = require("graphql");

const userSchema = buildSchema(`
  type Query {
    getUser(_id:String!): User
    getUsers(_id:String,username:String,gender:String):[User]
  }
  type User {
    _id: String
    username:String
    gender:String
    createAt:String
  }
`);

module.exports = userSchema