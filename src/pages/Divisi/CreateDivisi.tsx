import Button from "@/components/Button";
import Input from "@/components/Input";
import { postDivisi } from "@/service/Divisi";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateDivisi = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [singkatan, setSingkatan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("singkatan", singkatan);
      formData.append("deskripsi", deskripsi);

      await postDivisi(formData);
      Swal.fire({
        icon: "success",
        title: "Divisi berhasil ditambahkan!",
        showConfirmButton: true,
        customClass: {
          popup: "custom-popup",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(-1);
        }
      });
      setNama("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan divisi",
        text: "Silakan coba lagi.",
        customClass: {
          popup: "custom-popup",
        },
      });
    } finally {
      setLoading(false);
    }
  };

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
          Buat Divisi
        </Button>
      </form>
    </div>
  );
};

export default CreateDivisi;
