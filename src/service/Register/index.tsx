import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_URL_BASE_API;

interface register {
    nama: string;
    email: string;
    password: string;
    password_confirmation: string;
    tanggal_lahir: string;
    alamat: string;
    id_divisi: number;
}

export const postRegister = async (data: register | FormData) => {
    const response = await axios.post(`${API_BASE_URL}/register`, data, {});
    return response;
  };