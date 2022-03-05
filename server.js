import express from "express";
// const connectDB = require('./models/mongodb/config');
import cors from "cors";
import passer from "./api/routes.js";
import connectDB from "./models/mongodb/config.js";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";


// Connect to MongoDB
// connectDB()
const app = express();

const corsOptions = {
  origin: "http://localhost:9000"
};

app.use(cors(corsOptions));

// Connect to MongoDB
connectDB()

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Welcome to rock paper scissors game" });
});

// app.post("/", (req, res) => {
//   res.json({ message:req.body});
// });


// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

passer(app);
// set port, listen for requests

app.all('*', (req, res) => {
  res.status(404).send({
    message: "404 Not Found"
    }); 
});
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});