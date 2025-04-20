import { CreateBarang } from "@/utils/interface";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_URL_BASE_API;

export const getBarang = async () => {
  const response = await axios.get(`${API_BASE_URL}/barang`, {});
  return response;
};

export const getBarangById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/barang/${id}`, {});
  return response;
};

export const postBarang = async (data: CreateBarang | FormData) => {
  const response = await axios.post(`${API_BASE_URL}/barang`, data, {});
  return response;
};

export const putBarang = async (data: FormData, id: number) => {
  const response = await axios.post(
    `${API_BASE_URL}/barang/${id}?_method=PUT`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const putStatusBarang = async (id: number) => {
  const response = await axios.put(`${API_BASE_URL}/barang/${id}/status`);
  return response;
};

export const deleteBarang = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/barang/${id}`, {});
  return response.data;
};
