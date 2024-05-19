import axios from "axios";

const API = axios.create({
  baseURL: "https://blood-bank-server-eight.vercel.app/api/",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem(`token`)}`;
  }
  return req;
});

export default API;
