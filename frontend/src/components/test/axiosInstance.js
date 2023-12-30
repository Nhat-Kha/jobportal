import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("token error: ", token);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
