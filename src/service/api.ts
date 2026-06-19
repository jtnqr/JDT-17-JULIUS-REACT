import axios from "axios";
import { ACCESS_TOKEN, BASE_URL } from "../constant";

const axiosClient = axios.create();

axiosClient.interceptors.request.use((config) => {
	config.baseURL = BASE_URL;
	config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
	config.headers.Accept = "application/json";

	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default axiosClient;
