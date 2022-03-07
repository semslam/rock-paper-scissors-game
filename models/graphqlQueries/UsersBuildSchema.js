import { buildSchema } from "graphql";
const userSchema = buildSchema(`
  type Query {
    id: String
    username:String
    gender:String
    createAt:Date
  }
`);


export default userSchema