const PORT = 5000;
const io = require("socket.io")(PORT, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

console.log("Socket server running on port", PORT);

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