import { CreateKeuangan } from "@/utils/interface";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_URL_BASE_API;

export const getKeuangan = async () => {
  const response = await axios.get(`${API_BASE_URL}/keuangan`, {});
  return response;
};

export const getKeuanganById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/keuangan/${id}`, {});
  return response;
};

export const postKeuangan = async (data: CreateKeuangan | FormData) => {
  const response = await axios.post(`${API_BASE_URL}/keuangan`, data, {});
  return response;
};

export const putKeuangan = async (data: FormData, id: number) => {
  const response = await axios.post(
    `${API_BASE_URL}/keuangan/${id}?_method=PUT`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const deleteKeuangan = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/keuangan/${id}`, {});
  return response.data;
};

export const putApproveBendum = async (id: number) => {
  const response = await axios.put(
    `${API_BASE_URL}/keuangan/approve-bendum/${id}`
  );
  return response;
};

export const putApproveKahim = async (id: number) => {
  const response = await axios.put(
    `${API_BASE_URL}/keuangan/approve-kahim/${id}`
  );
  return response;
};
