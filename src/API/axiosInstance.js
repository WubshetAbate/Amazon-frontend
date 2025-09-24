import axios from "axios";

const getBaseURL = () => {
  if (import.meta.env.VITE_ENV === "local") {
    return "http://127.0.0.1:5050/clone-bd5b8/us-central1/api";
  } else if (import.meta.env.VITE_ENV === "firebase") {
    return "https://clone-bd5b8-uc.a.run.app";
  } else if (import.meta.env.VITE_ENV === "render") {
    return "https://amazon-api-deploy.onrender.com";
  } else {
    return "http://localhost:3000";
  }
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
});

export default axiosInstance;
