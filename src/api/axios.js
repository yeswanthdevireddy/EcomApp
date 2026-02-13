// api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050",
  withCredentials: true
});

api.interceptors.response.use(
  res => res,
  err => {
    const apiError = err.response?.data;

    if (apiError) {
      alert(apiError.message); 
    } else {
      alert("Server unreachable");
    }

    return Promise.reject(err);
  }
);

export default api;
