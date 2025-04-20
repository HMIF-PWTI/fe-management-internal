import Button from "@/components/Button";
import ImageInput from "@/components/ImageInput";
import Input from "@/components/Input";
import { postProduct } from "@/service/Product";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [kategori, setKategori] = useState("");
  const [gambar, setGambar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nama_produk", nama);
      formData.append("deskripsi", deskripsi);
      formData.append("harga", harga);
      formData.append("kategori", kategori);
      formData.append("toko_id", "1");

      if (gambar) {
        formData.append("gambar", gambar);
      }

      await postProduct(formData);
      Swal.fire({
        icon: "success",
        title: "Produk berhasil ditambahkan!",
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
      setDeskripsi("");
      setHarga("");
      setKategori("");
      setGambar(null);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan produk",
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
          label="Nama Produk"
          variant="outlined"
          value={nama}
          placeholder="Masukkan Nama Produk"
          onChange={(e) => setNama(e.target.value)}
        />
        <Input
          label="Deskripsi"
          variant="outlined"
          value={deskripsi}
          placeholder="Masukkan Deskripsi"
          onChange={(e) => setDeskripsi(e.target.value)}
        />
        <Input
          type="number"
          label="Harga"
          variant="outlined"
          value={harga}
          placeholder="Masukkan Harga"
          onChange={(e) => setHarga(e.target.value)}
        />
        <Input
          label="Kategori"
          variant="outlined"
          value={kategori}
          placeholder="Masukkan Kategori"
          onChange={(e) => setKategori(e.target.value)}
        />
        <ImageInput
          label={"Foto Produk"}
          inputId="foto-produk"
          onImageChange={setGambar}
        />
        <Button
          type="submit"
          variant="outline"
          icon={<IoAddOutline className="text-xl" />}
          disabled={loading}
          isLoading={loading}
        >
          Buat Produk
        </Button>
      </form>
    </div>
  );
};

export default CreateProduct;
