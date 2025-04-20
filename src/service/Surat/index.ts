import { CreateSurat } from "@/utils/interface";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_URL_BASE_API;

export const getSurat = async () => {
  const response = await axios.get(`${API_BASE_URL}/surat`, {});
  return response;
};

export const getSuratById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/surat/${id}`, {});
  return response;
};

export const postSurat = async (data: CreateSurat | FormData) => {
  const response = await axios.post(`${API_BASE_URL}/surat`, data, {});
  return response;
};

export const putSurat = async (data: CreateSurat | FormData, id: number) => {
  const response = await axios.post(
    `${API_BASE_URL}/surat/${id}?_method=PUT`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const deleteSurat = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/surat/${id}`, {});
  return response.data;
};
