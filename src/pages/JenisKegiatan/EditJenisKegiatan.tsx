import Button from "@/components/Button";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import {
  getJenisKegiatanById,
  putJenisKegiatan,
} from "@/service/JenisKegiatan";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditJenisKegiatan = () => {
  const [nama, setNama] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchJabatan = async () => {
      if (!id) return;
      try {
        setIsLoadingData(true);
        const response = await getJenisKegiatanById(Number(id));
        setNama(response.data.nama || "");
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal mengambil data",
          text: "Data jenis kegiatan tidak ditemukan.",
        });
        navigate("/jeniskegiatan");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchJabatan();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await putJenisKegiatan(nama, Number(id));

      Swal.fire({
        icon: "success",
        title: "Jenis Kegiatan berhasil diubah!",
        showConfirmButton: true,
        customClass: {
          popup: "custom-popup",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/jeniskegiatan");
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengubah jenis kegiatan",
        text: "Silakan coba lagi.",
        customClass: {
          popup: "custom-popup",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingData) {
    return <Loading />;
  }

  return (
    <div className="animate-slide-in p-3 space-y-10">
      <div className="flex justify-end">
        <Button
          variant="outline"
          icon={<FaArrowLeft />}
          onClick={() => navigate(-1)}
        >
          Kembali
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5 w-1/4">
        <Input
          label="Nama Jenis Kegiatan"
          type="text"
          placeholder="Masukkan Nama Jenis Kegiatan"
          variant="outlined"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <Button
          type="submit"
          variant="outline"
          icon={<IoAddOutline className="text-xl" />}
          disabled={loading}
          isLoading={loading}
        >
          Ubah Jenis Kegiatan
        </Button>
      </form>
    </div>
  );
};

export default EditJenisKegiatan;
