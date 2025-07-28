import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Change when deployed
});

export default api;
