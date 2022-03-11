// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
const express = require("express");
const cors = require("cors");
// const passer = require("./api/routes");
const connectDB = require("./models/mongodb/config");
// Connect to MongoDB
connectDB()
const app = express();

const corsOptions = {
  origin: "http://localhost:9000"
};

app.use(cors(corsOptions));



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


// passer(app);
require("./api/routes")(app)


app.all('*', (req, res) => {
  res.status(404).send({
    message: "404 Not Found"
    }); 
});
// set port, listen for requests
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


    
  