import { CreateKegiatan } from "@/utils/interface";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_URL_BASE_API;

export const getKegiatan = async () => {
  const response = await axios.get(`${API_BASE_URL}/kegiatan`, {});
  return response;
};

export const getKegiatanAktif = async () => {
  const response = await axios.get(`${API_BASE_URL}/kegiatan/aktif`, {});
  return response;
};

export const getKegiatanById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/kegiatan/${id}`, {});
  return response;
};

export const postKegiatan = async (data: CreateKegiatan | FormData) => {
  const response = await axios.post(`${API_BASE_URL}/kegiatan`, data, {});
  return response;
};

export const putKegiatan = async (data: CreateKegiatan, id: number) => {
  const response = await axios.put(`${API_BASE_URL}/kegiatan/${id}`, data);
  return response;
};

export const putStatusKegiatan = async (id: number) => {
  const response = await axios.put(`${API_BASE_URL}/kegiatan/${id}/status`);
  return response;
};

export const deleteKegiatan = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/kegiatan/${id}`, {});
  return response.data;
};
