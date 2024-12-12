import axios from "axios";
const baseUrl = "http://localhost:3001/api/contacts";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newContact) => {
  const response = await axios.post(baseUrl, newContact);
  return response.data;
};

export default { getAll, create };
