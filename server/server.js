const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./config/connection");
const cors = require("cors");
const path = require("path");
//const { errorHandler } = require("./middleware/errorMiddleware");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.use(require("./routes"));

// Serve frontend
//if ((process.env.NODE_ENV = "production")) {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    );
  });
//}

db.once("open", () => {
  app.listen(PORT, () => {
    console.log("Listning at port: " + PORT);
  });
});
