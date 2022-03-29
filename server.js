const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const quizRoute = require("./routes/QuizRoute");
require("dotenv").config();
const server = express();
const errorHandler = require("./middleware/errorHandler");
const path = require("path");

mongoose.connect(process.env.DB_PASSKEY, () => console.log("Connected to DB"));

server.use(cors());
server.use(express.json());
server.use("/api", quizRoute);
server.use(errorHandler);
server.use((req, res, next) => {
  const err = new Error("Not found!");
  res.status(404);
  res.send({ message: err });
});

if (process.env.NODE_ENV === `production`) {
  server.use(express.static("client/build"));
  server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.listen(process.env.PORT || 3001);
