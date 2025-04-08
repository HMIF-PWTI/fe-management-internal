import { CreateDivisi } from "@/utils/interface";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_URL_BASE_API;

export const getDivisi = async () => {
  const response = await axios.get(`${API_BASE_URL}/divisi`, {});
  return response;
};

export const getDivisiById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/divisi/${id}`, {});
  return response;
};

export const postDivisi = async (data: CreateDivisi | FormData) => {
  const response = await axios.post(`${API_BASE_URL}/divisi`, data, {});
  return response;
};

export const putDivisi = async (data: CreateDivisi, id: number) => {
  const response = await axios.put(`${API_BASE_URL}/divisi/${id}`, data, {});
  return response;
};

export const deleteDivisi = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/divisi/${id}`, {});
  return response.data;
};
