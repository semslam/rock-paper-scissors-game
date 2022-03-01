import express from "express";
// const connectDB = require('./models/mongodb/config');
import cors from "cors";
import passer from "./api/routes.js";

// Connect to MongoDB
// connectDB()
const app = express();

var corsOptions = {
  origin: "http://localhost:9000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Welcome to rock paper scissors" });
});

app.post("/", (req, res) => {
  res.json({ message:req.body});
});


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