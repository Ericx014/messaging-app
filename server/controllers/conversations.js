const conversationRouter = require("express").Router();
const Conversation = require("../models/conversation");

conversationRouter.get("/api/conversations", async (request, response) => {
  try {
    const conversations = await Conversation.find({});
    response.json(conversations);
  } catch (e) {
    console.log("Error fetching all conversations", e);
    response
      .status(500)
      .json({ error: "An error occurred while fetching conversations" });
  }
});

conversationRouter.post("/api/conversations", async (request, response) => {
  try {
    const body = request.body;

    const newConversation = new Conversation({
      conversationId: body.conversationId,
      recipients: body.recipients,
      messages: body.messages,
    });

    const savedConversation = await newConversation.save();
    response.json(savedConversation);
  } catch (e) {
    console.error(e);
    response
      .status(500)
      .json({ error: "An error occurred while saving the conversation" });
  }
});

conversationRouter.post(
  "/api/conversations/:conversationId/messages",
  async (request, response) => {
    try {
      const { conversationId } = request.params;
      const { sender, text } = request.body;

      if (!sender || !text) {
        return response.status(400).json({
          error: "Sender and text are required",
        });
      }
      const conversation = await Conversation.findOne({ conversationId });

      if (!conversation) {
        return response.status(404).json({
          error: "Conversation not found",
        });
      }

      const newMessage = { sender, text };
      conversation.messages.push(newMessage);
      const updatedConversation = await conversation.save();
      response.json(updatedConversation);
			
    } catch (e) {
      console.error("Error adding message to conversation", e);
      response.status(500).json({
        error: "An error occurred while adding message",
      });
    }
  }
);

module.exports = conversationRouter;
