const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./config/connection");
//const { errorHandler } = require("./middleware/errorMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(require("./routes"));

db.once("open", () => {
    app.listen(PORT, () => {
      console.log("Listning at port: " + PORT);
    });
  });