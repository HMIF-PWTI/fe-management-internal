import { CreateToko } from "@/utils/interface";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_URL_BASE_API;

export const getToko = async () => {
  const response = await axios.get(`${API_BASE_URL}/toko`, {});
  return response;
};

// export const putToko = async (data: CreateToko | FormData) => {
//   const response = await axios.put(`${API_BASE_URL}/jenis-kegiatan`, data, {});
//   return response;
// };

export const putToko = async (data: FormData, id: number) => {
  const response = await axios.post(
    `${API_BASE_URL}/toko/${id}?_method=PUT`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};
