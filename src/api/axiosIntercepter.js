import axios from "axios";
const baseURL = "http://localhost:3002/api/v1/";

const axiosInstance = axios.create({
  baseURL: `${baseURL}`,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("4ZbQwXtY8uVrN5mP7kL3JhD6");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
