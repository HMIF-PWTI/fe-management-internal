import axios from 'axios';

// Definisikan Interface sesuai struktur tabel kamu
export interface DivisiStats {
    id: number;
    nama: string;
    singkatan: string;
    users_count: number; // Otomatis ada karena withCount di Laravel
}

interface ApiResponse {
    status: string;
    data: DivisiStats[];
}

const API_BASE_URL = import.meta.env.VITE_URL_BASE_API;


export const getDivisiStats = async (): Promise<ApiResponse> => {
    try {
        const response = await axios.get<ApiResponse>(`${API_BASE_URL}/divisi-stats`);
        return response.data;
    } catch (error) {
        throw error;
    }
};