import axios from "axios";

const api = axios.create({
  // baseURL: "http://flytbase-drone-system-production.up.railway.app/api", // Change when deployed
  baseURL: "http://localhost:5000/api", // Change when deployed
});

export default api;
