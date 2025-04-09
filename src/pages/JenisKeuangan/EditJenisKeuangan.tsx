import Button from "@/components/Button";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import { getJenisKeuanganById, putJenisKeuangan } from "@/service/JenisKeuangan";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditJenisKeuangan = () => {

    const navigate = useNavigate();
    const [nama, setNama] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const { id } = useParams<{ id: string }>();


    useEffect(() => {
        const fetchJenisKeuangan = async () => {
          if (!id) return;
          try {
            setIsLoadingData(true);
            const response = await getJenisKeuanganById(Number(id));
            setNama(response.data.nama || "");
            setDeskripsi(response.data.deskripsi || "");
          } catch (err) {
            Swal.fire({
              icon: "error",
              title: "Gagal mengambil data",
              text: "Data Jenis Keuangan tidak ditemukan.",
            });
            navigate("/jeniskeuangan");
          } finally {
            setIsLoadingData(false);
          }
        };
    
        fetchJenisKeuangan();
      }, [id, navigate]);
  
      const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setLoading(true);
      
          try {
            const data = {
              nama,
              deskripsi,
            };
      
            await putJenisKeuangan(data, Number(id));
      
            Swal.fire({
              icon: "success",
              title: "Jenis Keuangan berhasil diubah!",
              showConfirmButton: true,
              customClass: {
                popup: "custom-popup",
              },
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/jeniskeuangan");
              }
            });
          } catch (err) {
            Swal.fire({
              icon: "error",
              title: "Gagal mengubah Jenis Keuangan",
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
          Ubah Jenis Keuangan
        </Button>
      </form>
    </div>
  )

  

}
export default EditJenisKeuangan;