import axios from "axios";
const baseUrl = "http://localhost:3001/api/contacts";

const create = async (newContact) => {
  const response = await axios.post(baseUrl, newContact);
  return response.data;
};

export default { create };
