import Button from "@/components/Button";
import DateTimePicker from "@/components/DateTimeInput";
import ImageInput from "@/components/ImageInput";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { getDivisi } from "@/service/Divisi";
import { getJenisKeuangan } from "@/service/JenisKeuangan";
import { postKeuangan } from "@/service/Keuangan";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateKeuangan = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tanggal, setTanggal] = useState("");
  const [jenisKeuangan, setJenisKeuangan] = useState("");
  const [divisi, setDivisi] = useState("");
  const [keteranganDana, setKeteranganDana] = useState("");
  const [uangMasuk, setUangMasuk] = useState("");
  const [uangKeluar, setUangKeluar] = useState("");
  const [keteranganTambahan, setKeteranganTambahan] = useState("");
  const [pembuat, setPembuat] = useState("");
  const [buktiUangMasuk, setBuktiUangMasuk] = useState<File | null>(null);
  const [buktiUangKeluar, setBuktiUangKeluar] = useState<File | null>(null);

  const [jenisKeuanganOptions, setJenisKeuanganOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [divisiOptions, setDivisiOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jenisRes = await getJenisKeuangan();
        const jenisOptions = jenisRes.data.map((item: any) => ({
          label: item.nama,
          value: item.id.toString(),
        }));
        setJenisKeuanganOptions(jenisOptions);

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
      formData.append("id_jenis_keuangan", jenisKeuangan);
      formData.append("id_divisi", divisi);
      formData.append("tanggal", tanggal);
      formData.append("keterangan_dana", keteranganDana);
      formData.append("uang_masuk", uangMasuk);
      formData.append("uang_keluar", uangKeluar);
      formData.append("keterangan_tambahan", keteranganTambahan);
      formData.append("pembuat", pembuat);

      if (buktiUangMasuk) {
        formData.append("bukti_uang_masuk", buktiUangMasuk);
      }

      if (buktiUangKeluar) {
        formData.append("bukti_uang_keluar", buktiUangKeluar);
      }

      await postKeuangan(formData);
      Swal.fire({
        icon: "success",
        title: "Keuangan berhasil ditambahkan!",
        showConfirmButton: true,
        customClass: {
          popup: "custom-popup",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(-1);
        }
      });
      setJenisKeuangan("");
      setDivisi("");
      setTanggal("");
      setKeteranganDana("");
      setKeteranganTambahan("");
      setUangKeluar("");
      setUangMasuk("");
      setPembuat("");
      setBuktiUangKeluar(null);
      setBuktiUangMasuk(null);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan keuangan",
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
        <Select
          label="Jenis Keuangan"
          variant="outlined"
          options={jenisKeuanganOptions}
          value={jenisKeuangan}
          onChange={(e) => setJenisKeuangan(e.target.value)}
        />
        <Select
          label="Divisi"
          variant="outlined"
          options={divisiOptions}
          value={divisi}
          onChange={(e) => setDivisi(e.target.value)}
        />
        <DateTimePicker
          label="Tanggal"
          variant="outlined"
          onChangeFormatted={setTanggal}
          value={tanggal}
          enableTime={false}
          placeholder="Masukkan Tanggal"
        />
        <Input
          label="Keterangan Dana"
          variant="outlined"
          value={keteranganDana}
          placeholder="Masukkan keterangan Dana"
          onChange={(e) => setKeteranganDana(e.target.value)}
        />
        <Input
          label="Uang Masuk"
          variant="outlined"
          type="number"
          placeholder="Masukkan Jumlah Uang Masuk"
          value={uangMasuk}
          onChange={(e) => setUangMasuk(e.target.value)}
        />
        <ImageInput
          label={"Bukti Uang Masuk"}
          inputId="bukti-uang-masuk"
          onImageChange={setBuktiUangMasuk}
        />
        <Input
          label="Uang Keluar"
          variant="outlined"
          type="number"
          placeholder="Masukkan Jumlah Uang Keluar"
          value={uangKeluar}
          onChange={(e) => setUangKeluar(e.target.value)}
        />
        <ImageInput
          label={"Bukti Uang Keluar"}
          inputId="bukti-uang-keluar"
          onImageChange={setBuktiUangKeluar}
        />
        <Input
          label="Keterangan Tambahan"
          variant="outlined"
          placeholder="Masukkan Keterangan Tambahan"
          value={keteranganTambahan}
          onChange={(e) => setKeteranganTambahan(e.target.value)}
        />
        <Input
          label="Pembuat"
          variant="outlined"
          placeholder="Masukkan Pembuat keuangan"
          value={pembuat}
          onChange={(e) => setPembuat(e.target.value)}
        />
        <Button
          type="submit"
          variant="outline"
          icon={<IoAddOutline className="text-xl" />}
          disabled={loading}
          isLoading={loading}
        >
          Buat Keuangan
        </Button>
      </form>
    </div>
  );
};

export default CreateKeuangan;
