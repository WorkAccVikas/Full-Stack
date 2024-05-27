import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json", //this line solved cors
  },
  withCredentials: true,
});
