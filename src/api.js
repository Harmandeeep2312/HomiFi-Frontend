import axios from "axios";
const api = axios.create({
  baseURL: "https://homifi-frontend.onrender.com", 
  withCredentials: true
});
export default api;