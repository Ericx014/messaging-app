require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const contactRouter = require("./controllers/contacts");
const userRouter = require("./controllers/users");
const conversationRouter = require("./controllers/conversations");
const middleware = require("./utils/middleware");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Connect to MongoDB
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
app.use(conversationRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ conversationId, recipients, text }) => {
    recipients.forEach((recipient) => {
      socket.broadcast.to(recipient).emit("receive-message", {
        conversationId: conversationId,
        recipients: recipients,
        sender: id,
        text,
      });
    });
  });
});

module.exports = { app, server };
