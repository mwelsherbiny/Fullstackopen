import axios from "axios";
const baseUrl = "/api/login";

async function login(credintials) {
  const response = await axios.post(baseUrl, credintials);
  return response.data;
}

export default { login };
