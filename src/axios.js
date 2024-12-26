import axios from "axios";
import { baseUrl } from "./variable";

const api = axios.create({
    baseURL: baseUrl, // Replace with your API base URL
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  export default api