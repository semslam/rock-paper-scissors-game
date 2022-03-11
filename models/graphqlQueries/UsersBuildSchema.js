const { buildSchema } = require("graphql");
const userSchema = buildSchema(`
  type Query {
    id: String
    username:String
    gender:String
    createAt:String
  }
`);


module.exports = userSchema