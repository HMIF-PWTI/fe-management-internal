import Button from "@/components/Button";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import { getDivisiById, putDivisi } from "@/service/Divisi";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditDivisi = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [singkatan, setSingkatan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchDivisi = async () => {
      if (!id) return;
      try {
        setIsLoadingData(true);
        const response = await getDivisiById(Number(id));
        setNama(response.data.payload.nama || "");
        setSingkatan(response.data.payload.singkatan || "");
        setDeskripsi(response.data.payload.deskripsi || "");
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal mengambil data",
          text: "Data divisi tidak ditemukan.",
        });
        navigate("/divisi");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchDivisi();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        nama,
        singkatan,
        deskripsi,
      };

      await putDivisi(data, Number(id));

      Swal.fire({
        icon: "success",
        title: "Jabatan berhasil diubah!",
        showConfirmButton: true,
        customClass: {
          popup: "custom-popup",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/divisi");
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengubah divisi",
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
          label="Nama Divisi"
          type="text"
          placeholder="Masukkan Nama Divisi"
          variant="outlined"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <Input
          label="Singkatan"
          type="text"
          placeholder="Masukkan Singkatan"
          variant="outlined"
          value={singkatan}
          onChange={(e) => setSingkatan(e.target.value)}
        />
        <Input
          label="Deskripsi"
          type="text"
          placeholder="Masukkan Deskripsi"
          variant="outlined"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
        />
        <Button
          type="submit"
          variant="outline"
          icon={<IoAddOutline className="text-xl" />}
          disabled={loading}
          isLoading={loading}
        >
          Ubah Divisi
        </Button>
      </form>
    </div>
  );
};

export default EditDivisi;
