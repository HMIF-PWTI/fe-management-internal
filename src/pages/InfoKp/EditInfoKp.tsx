import Button from "@/components/Button";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import { getKpById, putKp } from "@/service/KerjaPraktek";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditInfoKp = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [kota, setKota] = useState("");
  const [alamat, setAlamat] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchDivisi = async () => {
      if (!id) return;
      try {
        setIsLoadingData(true);
        const response = await getKpById(Number(id));
        setNama(response.data.payload.nama || "");
        setKota(response.data.payload.kota || "");
        setAlamat(response.data.payload.alamat || "");
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal mengambil data",
          text: "Data kp tidak ditemukan.",
        });
        navigate("/infokp");
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
        kota,
        alamat,
      };

      await putKp(data, Number(id));

      Swal.fire({
        icon: "success",
        title: "Info KP berhasil diubah!",
        showConfirmButton: true,
        customClass: {
          popup: "custom-popup",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/infokp");
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
          label="Nama Perusahaan"
          variant="outlined"
          value={nama}
          placeholder="Masukkan Nama Perusahaan"
          onChange={(e) => setNama(e.target.value)}
        />
        <Input
          label="Kota"
          variant="outlined"
          value={kota}
          placeholder="Masukkan Kota Perusahaan"
          onChange={(e) => setKota(e.target.value)}
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
          Ubah Info KP
        </Button>
      </form>
    </div>
  );
};

export default EditInfoKp;
