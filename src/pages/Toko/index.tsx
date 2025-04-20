import Button from "@/components/Button";
import ImageUploader from "@/components/ImageUpload";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import { getToko, putToko } from "@/service/Toko";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TokoPages = () => {
  const [dataToko, setDataToko] = useState({
    id: 0,
    nama_toko: "",
    deskripsi: "",
    alamat: "",
    no_telp: "",
    email: "",
    instagram: "",
    logo: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingData(true);
    const fetchToko = async () => {
      try {
        const res = await getToko();
        const toko = res.data.payload[0];
        setDataToko(toko);
      } catch (error) {
        console.error("Gagal Mengambil Data Toko : ", error);
      } finally {
        setLoadingData(false);
      }
    };
    fetchToko();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("nama_toko", dataToko.nama_toko);
      formData.append("deskripsi", dataToko.deskripsi);
      formData.append("alamat", dataToko.alamat);
      formData.append("no_telp", dataToko.no_telp);
      formData.append("email", dataToko.email);
      formData.append("instagram", dataToko.instagram);

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      formData.append("_method", "PUT");

      const idToko = dataToko.id;
      await putToko(formData, idToko);
      Swal.fire({
        icon: "success",
        title: "Data Toko berhasil Diubah!",
        showConfirmButton: true,
        customClass: {
          popup: "custom-popup",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } catch (err) {
      console.error("Gagal update data toko:", err);
      Swal.fire({
        icon: "error",
        title: "Gagal mengubah toko",
        text: "Silakan coba lagi.",
        customClass: {
          popup: "custom-popup",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return <Loading />;
  }

  return (
    <div className="animate-slide-in p-3 space-y-5 w-1/2">
      <form onSubmit={handleSubmit} className="space-y-5">
        <ImageUploader
          imageUrl={
            logoFile
              ? URL.createObjectURL(logoFile)
              : `https://hmif-be.unikom.my.id/storage/${dataToko.logo}`
          }
          onImageChange={(file) => setLogoFile(file)}
        />

        <div className="grid grid-cols-2 gap-5">
          <Input
            label="Nama Toko"
            value={dataToko.nama_toko}
            onChange={(e) =>
              setDataToko((prev) => ({ ...prev, nama_toko: e.target.value }))
            }
            variant="outlined"
          />
          <Input
            label="Deskripsi"
            value={dataToko.deskripsi}
            onChange={(e) =>
              setDataToko((prev) => ({ ...prev, deskripsi: e.target.value }))
            }
            variant="outlined"
          />
          <Input
            label="Alamat"
            value={dataToko.alamat}
            onChange={(e) =>
              setDataToko((prev) => ({ ...prev, alamat: e.target.value }))
            }
            variant="outlined"
          />
          <Input
            label="No Telp"
            value={dataToko.no_telp}
            onChange={(e) =>
              setDataToko((prev) => ({ ...prev, no_telp: e.target.value }))
            }
            variant="outlined"
          />
          <Input
            label="Email"
            value={dataToko.email}
            onChange={(e) =>
              setDataToko((prev) => ({ ...prev, email: e.target.value }))
            }
            variant="outlined"
          />
          <Input
            label="Instagram"
            value={dataToko.instagram}
            onChange={(e) =>
              setDataToko((prev) => ({ ...prev, instagram: e.target.value }))
            }
            variant="outlined"
          />
        </div>
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              navigate("/product");
            }}
          >
            Kelola Produk
          </Button>
          <Button variant="outline" isLoading={loading} onClick={handleSubmit}>
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TokoPages;
