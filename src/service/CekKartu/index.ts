import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_URL_BASE_API;

export const getUid = async () => {
  const response = await axios.get(`${API_BASE_URL}/cek-kartu`, {});
  return response;
};

export const getAnggota = async () => {
  const response = await axios.get(`${API_BASE_URL}/keanggotaan`, {});
  return response;
};

export const postDaftarAnggota = async (id_user:string | FormData, id: number) => {
  const response = await axios.post(`${API_BASE_URL}/cek-kartu/${id}/tambah-anggota`, id_user, {});
  return response;
};
