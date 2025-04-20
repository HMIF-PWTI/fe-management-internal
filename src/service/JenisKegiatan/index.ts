import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_URL_BASE_API;

export const getJenisKegiatan = async () => {
  const response = await axios.get(`${API_BASE_URL}/jenis-kegiatan`, {});
  return response;
};

export const getJenisKegiatanById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/jenis-kegiatan/${id}`, {});
  return response;
};

export const postJenisKegiatan = async (nama: string | FormData) => {
  const response = await axios.post(`${API_BASE_URL}/jenis-kegiatan`, nama, {});
  return response;
};

export const putJenisKegiatan = async (nama: string, id: number) => {
  const response = await axios.put(`${API_BASE_URL}/jenis-kegiatan/${id}`, {
    nama,
  });
  return response;
};

export const deleteJenisKegiatan = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/jenis-kegiatan/${id}`, {});
  return response.data;
};
