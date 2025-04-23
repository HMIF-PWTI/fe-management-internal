import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_URL_BASE_API;

export const getAnggota = async () => {
  const response = await axios.get(`${API_BASE_URL}/keanggotaan`, {});
  return response;
};

export const getAnggotaById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/keanggotaan/${id}`, {});
  return response;
};

export const postDaftarAnggota = async (
  id_user: string | FormData,
  id: number
) => {
  const response = await axios.post(
    `${API_BASE_URL}/cek-kartu/${id}/tambah-anggota`,
    id_user,
    {}
  );
  return response;
};

export const putStatusAnggota = async (id: number) => {
  const response = await axios.put(`${API_BASE_URL}/keanggotaan/${id}/status`);
  return response;
};

export const putJabatanAnggota = async (id: number, id_jabatan: number) => {
  const response = await axios.put(
    `${API_BASE_URL}/keanggotaan/anggota/${id}/jabatan`, {id_jabatan});
  return response;
};
