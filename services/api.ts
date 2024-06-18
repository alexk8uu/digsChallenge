import axios from "axios";
const API_URL =
  "https://xjvq5wtiye.execute-api.us-east-1.amazonaws.com/interview/api/v1";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
