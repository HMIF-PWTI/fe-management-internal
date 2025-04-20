import { CreateProduct } from "@/utils/interface";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_URL_BASE_API;

export const getProduct = async () => {
  const response = await axios.get(`${API_BASE_URL}/produk`, {});
  return response;
};

export const getProductById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/produk/${id}`, {});
  return response;
};

export const postProduct = async (data: CreateProduct | FormData) => {
  const response = await axios.post(`${API_BASE_URL}/produk`, data, {});
  return response;
};

export const putProduct = async (
  data: CreateProduct | FormData,
  id: number
) => {
  const response = await axios.post(
    `${API_BASE_URL}/produk/${id}?_method=PUT`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const putStatusProduct = async (id: number) => {
  const response = await axios.put(`${API_BASE_URL}/produk/${id}/status`);
  return response;
};

export const deleteProduct = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/produk/${id}`, {});
  return response.data;
};
