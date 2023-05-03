import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8888/api",
  headers: {
    token:
      "Bearer " + JSON.parse(localStorage.getItem("dashboard"))?.accessToken,
  },
});

export default axiosInstance;
