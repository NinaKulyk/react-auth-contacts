import axios from "axios";

export const goitAPI = axios.create({
  baseURL: "https://connections-api.goit.global/",
});

export const setToken = (token) => {
  goitAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  goitAPI.defaults.headers.common.Authorization = ``;
};
