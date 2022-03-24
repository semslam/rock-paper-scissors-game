// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
const express = require("express");
const cors = require("cors");
const connectDB = require("./models/mongodb/config");
const {ErrorCodes,HttpCodes} = require("./libraries/sustainedValues");
const {errorResponse,successResponse} = require("./response/apiResponse")
// Connect to MongoDB
connectDB()
const app = express();

const corsOptions = {
  origin: `${process.env.HOST}:${process.env.PORT}`
};

app.use(cors(corsOptions));



// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */
// simple route
app.get("/", (req, res) => {
  successResponse(res,HttpCodes.OK,{ message: "Welcome to rock paper scissors game" });
});

require("./api/routes")(app)

app.all('*', (req, res) => {
  errorResponse(res,ErrorCodes.NOT_FOUND,{
    message: "Not Found"
    })
});
// set port, listen for requests
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


    
  