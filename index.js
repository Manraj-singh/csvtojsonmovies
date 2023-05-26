//*requiring express
const express = require("express");
const app = express();
require("dotenv/config");
//*Define PORT where server needs to run
const PORT = process.env.PORT || 8000;

//*Requiring configs
const db = require("./configs/mongoose");
const pgDB = require("./configs/postgres");
// Set EJS as the view engine
app.set("view engine", "ejs");
//*MIDDLEWARES
//bodyparseer:used to process data sent in an HTTP request body,it has been incorporated in express new version
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.json({ type: "application/json" }));

// Route for static files
app.use(express.static("uploads"));
//using expresss router
app.use("/", require("./Routes"));

//express app listening on defined PORT
app.listen(PORT || 8001, (err) => {
  err
    ? console.error("Error while starting app")
    : console.log("Server started on port", PORT);
});
