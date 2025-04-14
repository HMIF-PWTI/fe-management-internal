import { CreateJenisKeuangan } from "@/utils/interface";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_URL_BASE_API;

export const getJenisKeuangan = async () => {
  const response = await axios.get(`${API_BASE_URL}/jenis-keuangan`, {});
  return response;
};

export const getJenisKeuanganById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/jenis-keuangan/${id}`, {});
  return response;
};

export const postJenisKeuangan = async (data: CreateJenisKeuangan | FormData) => {
  const response = await axios.post(`${API_BASE_URL}/jenis-keuangan`, data, {});
  return response;
};

export const putJenisKeuangan = async (data: CreateJenisKeuangan, id: number) => {
  const response = await axios.put(`${API_BASE_URL}/jenis-keuangan/${id}`, data, {});
  return response;
};

export const deleteJenisKeuangan = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/jenis-keuangan/${id}`, {});
  return response.data;
};
