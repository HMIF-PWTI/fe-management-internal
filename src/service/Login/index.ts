import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_URL_BASE_API;

interface login {
  username?: string;
  email?: string;
  password: string;
}

export const postLogin = async (data: login | FormData) => {
  // Mengembalikan full object response dari Axios
  const response = await axios.post(`${API_BASE_URL}/login`, data, {});
  return response;
};

export const postLogout = async (token: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/logout`,
    {},
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};