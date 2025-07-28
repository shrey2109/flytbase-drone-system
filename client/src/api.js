import axios from "axios";

const api = axios.create({
  baseURL: "http://flytbase-drone-system-production.up.railway.app/api", // Change when deployed
});

export default api;
