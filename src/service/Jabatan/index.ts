import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_URL_BASE_API;

export const getJabatan = async () => {
  const response = await axios.get(`${API_BASE_URL}/jabatan`, {});
  return response;
};

export const getJabatanById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/jabatan/${id}`, {});
  return response;
};

export const postJabatan = async (nama: string | FormData) => {
  const response = await axios.post(`${API_BASE_URL}/jabatan`, nama, {});
  return response;
};

export const putJabatan = async (nama: string, id: number) => {
  const response = await axios.put(`${API_BASE_URL}/jabatan/${id}`, {
    nama,
  });
  return response;
};

export const deleteJabatan = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/jabatan/${id}`, {});
  return response.data;
};
