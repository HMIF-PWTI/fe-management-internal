import Button from "@/components/Button";
import Input from "@/components/Input";
import { postKp } from "@/service/KerjaPraktek";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateInfoKp = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("alamat", alamat);
      await postKp(formData);
      Swal.fire({
        icon: "success",
        title: "Info KP berhasil ditambahkan!",
        showConfirmButton: true,
        customClass: {
          popup: "custom-popup",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(-1);
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan info KP",
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
    <div className="animate-slide-in w-full">
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
          label="Nama Perusahaan"
          variant="outlined"
          value={nama}
          placeholder="Masukkan Nama Perusahaan"
          onChange={(e) => setNama(e.target.value)}
        />
        <Input
          label="Alamat Perusahaan"
          variant="outlined"
          value={alamat}
          multiline
          rows={6}
          placeholder="Masukkan Alamat Perusahaan"
          onChange={(e) => setAlamat(e.target.value)}
        />
        <Button
          type="submit"
          variant="outline"
          icon={<IoAddOutline className="text-xl" />}
          disabled={loading}
          isLoading={loading}
        >
          Buat Info KP
        </Button>
      </form>
    </div>
  );
};

export default CreateInfoKp;
