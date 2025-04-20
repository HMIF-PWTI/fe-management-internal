import Button from "@/components/Button";
import ImageInput from "@/components/ImageInput";
import Input from "@/components/Input";
import { getProductById, putProduct } from "@/service/Product";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditProduct = () => {
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState<string | number>();
  const [kategori, setKategori] = useState("");
  const [gambar, setGambar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setIsLoadingData(true);
        const dataBeforeRes = await getProductById(Number(id));
        setNama(dataBeforeRes.data.payload.nama_produk);
        setDeskripsi(dataBeforeRes.data.payload.deskripsi);
        setHarga(Number(dataBeforeRes.data.payload.harga));
        setKategori(dataBeforeRes.data.payload.kategori);
        setGambar(dataBeforeRes.data.payload.gambar);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal mengambil data",
          text: "Data Produk tidak ditemukan.",
        });
        navigate("/product");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nama_produk", nama);
      formData.append("deskripsi", deskripsi);
      formData.append("harga", String(harga));
      formData.append("kategori", kategori);
      formData.append("toko_id", "1");

      if (gambar) {
        formData.append("gambar", gambar);
      }

      await putProduct(formData, Number(id));
      Swal.fire({
        icon: "success",
        title: "Produk berhasil diubah!",
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
          previewUrl={`https://hmif-be.unikom.my.id/storage/${gambar}`}
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

export default EditProduct;
