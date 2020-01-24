import axios from "axios";

const instance = axios.create({
  baseURL: "https://dev80628.service-now.com/",
  auth: {
    username: "admin", //This could be your email
    password: "Learnathon@123"
  },
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

// instance.interceptors.request...

export default instance;
