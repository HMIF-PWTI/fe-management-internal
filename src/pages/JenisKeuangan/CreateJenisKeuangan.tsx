import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postJenisKegiatan } from "@/service/JenisKegiatan";
import Swal from "sweetalert2";
import { postJenisKeuangan } from "@/service/JenisKeuangan";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { FaArrowLeft } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";

const CreateJenisKeuangan = () => {
    const [nama, setNama] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    
        try {
          const formData = new FormData();
          formData.append("nama", nama);
          formData.append("deskripsi", deskripsi);
    
          await postJenisKeuangan(formData);
          Swal.fire({
            icon: "success",
            title: "Jenis Keuangan berhasil ditambahkan!",
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
            title: "Gagal menambahkan Jenis Keuangan",
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
              label="Jenis Keuangan"
              type="text"
              placeholder="Masukkan Jenis Keuangan"
              variant="outlined"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
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
              Buat Jenis Keuangan
            </Button>
          </form>
        </div>
      );
}

export default CreateJenisKeuangan;
