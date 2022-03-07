import { graphqlHTTP } from "express-graphql";
import actorAccountManagement from "../services/ActorAccountManagement.js"
import gameSchema from "../models/graphqlQueries/GameRecordsBuildSchema.js"
import { buildSchema } from "graphql";

export default (router) => {
const root = { 
    gameRecords: ({clientId})=>{ 
        let rec =  actorAccountManagement.fetchGameRecords();
        rec.filter(records => records.clientId === clientId);
      
      console.log(rec);
      return rec;
    } 
}



// const root = {
//   user: ({id}) => {
//     return [{
//         id: "43984308409wrrjio4930",
//         username:"semslam@gmai.com",
//         gender:"Male"
//     },{
//         id: "43984308409fjrui94938dj",
//         username:"obafemi@gmai.com",
//         gender:"Female"
//     },{
//         id: "4444infn409wrrjio4930",
//         username:"oladele@gmai.com",
//         gender:"Male"
//     }].filter(users => users.id === id);
//   },
// };

    router.use('/graphql', graphqlHTTP({
        schema: gameSchema,
        rootValue:root,
        graphiql: true,
      }));

    return router;
}

