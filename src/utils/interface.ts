export interface Jabatan {
  id: number;
  nama: string;
  created_at: string;
  updated_at: string;
}

export interface Divisi {
  id: number;
  nama: string;
  singkatan: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
}

export interface CreateDivisi {
  nama: string;
  singkatan: string;
  deskripsi: string;
}

export interface JenisKegiatan {
  id: number;
  nama: string;
  created_at: string;
  updated_at: string;
}
