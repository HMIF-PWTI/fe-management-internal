import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Select from "@/components/Select";
import { getAnggota, postDaftarAnggota } from "@/service/CekKartu";
import { Anggota } from "@/utils/interface";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const DaftarkanAnggota = () => {
  const { id } = useParams<{ id: string }>();
  const [anggota, setAnggota] = useState("");
  const [anggotaOptions, setAnggotaOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!id) {
    console.log("cannot find id");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const anggotaRes = await getAnggota();
        const anggotaOptions = anggotaRes.data.payload
          .filter((item: any) => item.uid === null)
          .map((item: any) => ({
            label: item.nama,
            value: item.id.toString(),
          }));
        setAnggotaOptions(anggotaOptions);
      } catch (error) {
        console.error("Gagal ambil data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("id_user", anggota);
      await postDaftarAnggota(formData, Number(id));
      Swal.fire({
        icon: "success",
        title: "Barang berhasil ditambahkan!",
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
        title: "Gagal menambahkan barang",
        text: "Silakan coba lagi.",
        customClass: {
          popup: "custom-popup",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

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
      <form onSubmit={handleSubmit} className="flex items-end space-x-5">
        <Select
          label="Nama"
          variant="outlined"
          options={anggotaOptions}
          value={anggota}
          onChange={(e) => setAnggota(e.target.value)}
        />
        <div>
          <Button>Daftarkan</Button>
        </div>
      </form>
    </div>
  );
};

export default DaftarkanAnggota;
