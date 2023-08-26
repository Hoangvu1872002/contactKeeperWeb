import axios from "axios";
require("dotenv").config();

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
});

export default axiosInstance;
