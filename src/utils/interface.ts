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

export interface Kegiatan {
  id: number;
  nama: string;
  nama_jenis_kegiatan: string;
  nama_divisi: string;
  id_jenis_kegiatan: number;
  id_divisi: number;
  tanggal_pelaksanaan: string;
  kegiatan_mulai: string;
  kegiatan_berakhir: string;
  tempat_pelaksanaan: string;
  created_at: string;
  status?: string;
  updated_at: string;
}

export interface CreateKegiatan {
  nama: string;
  id_jenis_kegiatan: number;
  id_divisi: number;
  tanggal_pelaksanaan: string;
  kegiatan_mulai: string;
  kegiatan_berakhir: string;
  tempat_pelaksanaan: string;
}
export interface JenisKeuangan {
  id: number;
  nama: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
}
export interface CreateJenisKeuangan {
  nama: string;
  deskripsi: string;
}

export interface Keuangan {
  id: number;
  id_jenis_keuangan: string;
  nama_jenis_keuangan: string;
  id_divisi: string;
  nama_divisi: string;
  tanggal: string;
  keterangan_dana: string;
  uang_masuk: string;
  bukti_uang_masuk: string;
  uang_keluar: string;
  bukti_uang_keluar: string;
  keterangan_tambahan: string;
  pembuat: string;
  dana_saat_ini: string;
  status: string;
  created_at: string;
  updated_at: string;
  approve_bendum?: string;
  approve_kahim?: string;
}

export interface CreateKeuangan {
  id_jenis_keuangan: number;
  id_divisi: number;
  tanggal: string;
  keterangan_dana: string;
  uang_masuk: string;
  bukti_uang_masuk: string;
  uang_keluar: string;
  bukti_uang_keluar: string;
  keterangan_tambahan: string;
  pembuat: string;
}
