require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const contactRouter = require("./controllers/contacts");
const userRouter = require("./controllers/users");
const middleware = require("./utils/middleware");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

console.log("Connecting to: ", process.env.MONGODB_URI);
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

// routes
app.use(contactRouter);
app.use(userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
