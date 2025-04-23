import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_URL_BASE_API;

export const getAbsensiByKegiatan = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/absensi/kegiatan?id_kegiatan=${id}`, {});
    return response;
  };