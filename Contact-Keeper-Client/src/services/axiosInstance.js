import axios from "axios";
// require("dotenv").config();

const axiosInstance = axios.create({
  baseURL: "https://hoangvux-be-contactkeeper.onrender.com/",
});

export default axiosInstance;
