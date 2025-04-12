import Button from "@/components/Button";
import DateTimePicker from "@/components/DateTimeInput";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { getDivisi } from "@/service/Divisi";
import { getJenisKegiatan } from "@/service/JenisKegiatan";
import { postKegiatan } from "@/service/Kegiatan";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateKegiatan = () => {
  const [nama, setNama] = useState("");
  const [jenisKegiatan, setJenisKegiatan] = useState("");
  const [divisi, setDivisi] = useState("");
  const [tanggalPelaksanaan, setTanggalPelaksanaan] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalBerakhir, setTanggalBerakhir] = useState("");
  const [tempatPelaksanaan, setTempatPelaksanaan] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [jenisKegiatanOptions, setJenisKegiatanOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [divisiOptions, setDivisiOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jenisRes = await getJenisKegiatan();
        const jenisOptions = jenisRes.data.map((item: any) => ({
          label: item.nama,
          value: item.id.toString(),
        }));
        setJenisKegiatanOptions(jenisOptions);

        const divisiRes = await getDivisi();
        const divisiOptions = divisiRes.data.payload.map((item: any) => ({
          label: item.singkatan,
          value: item.id.toString(),
        }));
        setDivisiOptions(divisiOptions);
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
      formData.append("nama", nama);
      formData.append("id_jenis_kegiatan", jenisKegiatan);
      formData.append("id_divisi", divisi);
      formData.append("tanggal_pelaksanaan", tanggalPelaksanaan);
      formData.append("kegiatan_mulai", tanggalMulai);
      formData.append("kegiatan_berakhir", tanggalBerakhir);
      formData.append("tempat_pelaksanaan", tempatPelaksanaan);
      await postKegiatan(formData);
      Swal.fire({
        icon: "success",
        title: "Kegiatan berhasil ditambahkan!",
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
        title: "Gagal menambahkan kegiatan",
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
          label="Nama Kegiatan"
          type="text"
          placeholder="Masukkan Nama Kegiatan"
          variant="outlined"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <Select
          label="Jenis Kegiatan"
          value={jenisKegiatan}
          onChange={(e) => setJenisKegiatan(e.target.value)}
          options={jenisKegiatanOptions}
          variant="outlined"
        />
        <Select
          label="Divisi"
          value={divisi}
          onChange={(e) => setDivisi(e.target.value)}
          options={divisiOptions}
          variant="outlined"
        />
        <DateTimePicker
          label="Tanggal Pelaksanaan"
          onChangeFormatted={setTanggalPelaksanaan}
          value={tanggalPelaksanaan}
          variant="outlined"
          enableTime={false}
        />
        <DateTimePicker
          label="Mulai Kegiatan"
          onChangeFormatted={setTanggalMulai}
          value={tanggalMulai}
          variant="outlined"
          enableTime={true}
        />
        <DateTimePicker
          label="Berakhir Kegiatan"
          onChangeFormatted={setTanggalBerakhir}
          value={tanggalBerakhir}
          variant="outlined"
          enableTime={true}
        />
        <Input
          label="Tempat Pelaksanaan"
          type="text"
          placeholder="Masukkan Tempat Pelaksanaan"
          variant="outlined"
          value={tempatPelaksanaan}
          onChange={(e) => setTempatPelaksanaan(e.target.value)}
        />
        <Button
          type="submit"
          variant="outline"
          icon={<IoAddOutline className="text-xl" />}
          disabled={loading}
          isLoading={loading}
        >
          Buat Kegiatan
        </Button>
      </form>
    </div>
  );
};

export default CreateKegiatan;
