const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const conversationSchema = new mongoose.Schema({
  conversationId: {
    type: String,
    required: true,
  },
  recipients: {
    type: [String],
    required: true,
  },
  messages: {
    type: [messageSchema],
    default: [],
  },
});

module.exports = mongoose.model("Conversation", conversationSchema);
