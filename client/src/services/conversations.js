import axios from "axios";
const baseUrl = "http://localhost:3001/api/conversations";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newConversation) => {
  const response = await axios.post(baseUrl, newConversation);
  return response.data;
};

const addMessage = async (conversationId, messageData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/${conversationId}/messages`,
      messageData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding message:", error);
    throw error;
  }
};

export default { getAll, create, addMessage };
