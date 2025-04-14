import Button from "@/components/Button";
import DateTimePicker from "@/components/DateTimeInput";
import ImageInput from "@/components/ImageInput";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { getBarangById, postBarang, putBarang } from "@/service/Barang";
import { getDivisi } from "@/service/Divisi";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditBarang = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [divisi, setDivisi] = useState("");
  const [jenisBarang, setJenisBarang] = useState("");
  const [kondisi, setKondisi] = useState("");
  const [lokasiPenyimpanan, setLokasiPeyimpanan] = useState("");
  const [tanggalPerolehan, setTanggalPerolehan] = useState("");
  const [stok, setStok] = useState("");
  const [fotoBarang, setFotoBarang] = useState<File | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const [divisiOptions, setDivisiOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  useEffect(() => {
    const fetchBarang = async () => {
      if (!id) return;
      try {
        setIsLoadingData(true);
        const dataBeforeRes = await getBarangById(Number(id));
        setNama(dataBeforeRes.data.payload.nama);
        setDeskripsi(dataBeforeRes.data.payload.deskripsi);
        setDivisi(dataBeforeRes.data.payload.id_divisi);
        setJenisBarang(dataBeforeRes.data.payload.jenis_barang);
        setKondisi(dataBeforeRes.data.payload.kondisi);
        setLokasiPeyimpanan(dataBeforeRes.data.payload.lokasi_penyimpanan);
        setTanggalPerolehan(dataBeforeRes.data.payload.tanggal_perolehan);
        setStok(dataBeforeRes.data.payload.stok);
        setFotoBarang(dataBeforeRes.data.payload.foto_barang);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal mengambil data",
          text: "Data kegiatan tidak ditemukan.",
        });
        navigate("/barang");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchBarang();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("deskripsi", deskripsi);
      formData.append("id_divisi", divisi);
      formData.append("jenis_barang", jenisBarang);
      formData.append("kondisi", kondisi);
      formData.append("lokasi_penyimpanan", lokasiPenyimpanan);
      formData.append("tanggal_perolehan", tanggalPerolehan);
      formData.append("stok", stok);

      if (fotoBarang) {
        formData.append("foto_barang", fotoBarang);
      }

      await putBarang(formData, Number(id));
      Swal.fire({
        icon: "success",
        title: "Barang berhasil diubah!",
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
      setDivisi("");
      setDeskripsi("");
      setJenisBarang("");
      setKondisi("");
      setLokasiPeyimpanan("");
      setTanggalPerolehan("");
      setStok("");
      setFotoBarang(null);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal mengubah barang",
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
          label="Nama Barang"
          variant="outlined"
          value={nama}
          placeholder="Masukkan Nama Barang"
          onChange={(e) => setNama(e.target.value)}
        />
        <Input
          label="Deskripsi"
          variant="outlined"
          value={deskripsi}
          placeholder="Masukkan Deskripsi"
          onChange={(e) => setDeskripsi(e.target.value)}
        />
        <Select
          label="Divisi"
          variant="outlined"
          options={divisiOptions}
          value={divisi}
          onChange={(e) => setDivisi(e.target.value)}
        />
        <Select
          label="Jenis Barang"
          variant="outlined"
          value={jenisBarang}
          options={[
            { label: "Barang Fisik", value: "barang fisik" },
            { label: "Barang Digital", value: "barang digital" },
          ]}
          onChange={(e) => setJenisBarang(e.target.value)}
        />
        <Select
          label="Kondisi"
          variant="outlined"
          value={kondisi}
          options={[
            { label: "Baik", value: "baik" },
            { label: "Rusak", value: "rusak" },
            { label: "Hilang", value: "hilang" },
          ]}
          onChange={(e) => setKondisi(e.target.value)}
        />
        <Input
          label="Lokasi Penyimpanan"
          variant="outlined"
          value={lokasiPenyimpanan}
          placeholder="Masukkan Lokasi Penyimpanan"
          onChange={(e) => setLokasiPeyimpanan(e.target.value)}
        />
        <DateTimePicker
          label="Tanggal Perolehan"
          variant="outlined"
          onChangeFormatted={setTanggalPerolehan}
          value={tanggalPerolehan}
          enableTime={false}
          placeholder="Masukkan Tanggal Perolehan"
        />
        <Input
          label="Stok"
          variant="outlined"
          value={stok}
          placeholder="Masukkan Stok"
          onChange={(e) => setStok(e.target.value)}
        />
        <ImageInput
          label={"Foto Barang"}
          inputId="foto-barang"
          onImageChange={setFotoBarang}
          previewUrl={`http://127.0.0.1:8000/storage/${fotoBarang}`}
        />
        <Button
          type="submit"
          variant="outline"
          icon={<IoAddOutline className="text-xl" />}
          disabled={loading}
          isLoading={loading}
        >
          Ubah Barang
        </Button>
      </form>
    </div>
  );
};

export default EditBarang;
