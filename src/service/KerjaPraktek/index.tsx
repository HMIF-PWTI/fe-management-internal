import { CreateKerjaPraktek } from "@/utils/interface";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_URL_BASE_API;

export const getKp = async () => {
  const response = await axios.get(`${API_BASE_URL}/kerja-praktek`, {});
  return response;
};

export const getKpById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/kerja-praktek/${id}`, {});
  return response;
};

export const postKp = async (data: CreateKerjaPraktek | FormData) => {
  const response = await axios.post(`${API_BASE_URL}/kerja-praktek`, data, {});
  return response;
};

export const putKp = async (data: CreateKerjaPraktek, id: number) => {
  const response = await axios.put(`${API_BASE_URL}/kerja-praktek/${id}`, data);
  return response;
};

export const deleteKp = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/kerja-praktek/${id}`, {});
  return response.data;
};
