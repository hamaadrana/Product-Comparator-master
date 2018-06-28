const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const route = require('./routes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(morgan('dev'))
app.set("view engine", "ejs");

app.use('/', route)

app.listen(process.env.PORT || 3000, () => {
  console.log("SERVER RUNNING, PLEASE NAVIGATE TO http://localhost:3000");
});
