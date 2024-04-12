import axios from "axios";
const url = process.env.NEXT_PUBLIC_URL;
const axiosService = axios;
axiosService.defaults.baseURL = url;

export { axiosService };
