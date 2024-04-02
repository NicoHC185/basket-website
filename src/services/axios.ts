import axios from "axios";
const url = process.env.NEXT_PUBLIC_URL || "http://localhost:3000/api";
const axiosService = axios;
axiosService.defaults.baseURL = url;

export { axiosService };
