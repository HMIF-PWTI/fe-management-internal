import Button from "@/components/Button";
import { getBarangById } from "@/service/Barang";
import { formatDate } from "@/utils/FormatDate";
import { Barang } from "@/utils/interface";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const DetailBarang = () => {
  const navigate = useNavigate();
  const [barang, setBarang] = useState<Barang | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchBarang = async () => {
      if (!id) return;
      try {
        setIsLoadingData(true);
        const response = await getBarangById(Number(id));
        setBarang(response.data.payload);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal mengambil data",
          text: "Data barang tidak ditemukan.",
        });
        navigate("/barang");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchBarang();
  }, [id, navigate]);

  const renderStatus = (status: string | undefined) => {
    if (!status) return "-";

    let label = "";
    let color = "";

    switch (status) {
      case "baik":
        label = "Baik";
        color = "text-green-500";
        break;
      case "rusak":
        label = "Rusak";
        color = "text-yellow-500";
        break;
      case "hilang":
        label = "Hilang";
        color = "text-red-500";
        break;
      case "aktif":
        label = "Aktif";
        color = "text-green-500";
        break;
      case "tidak_aktif":
        label = "Tidak Aktif";
        color = "text-red-500";
        break;
      default:
        label = status;
        color = "text-gray-600";
        break;
    }

    return <span className={`font-semibold ${color}`}>{label}</span>;
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
      <div className="border p-3 border-dark-tertiary rounded-lg">
        <table>
          <tr>
            <td>Nama Barang</td>
            <td className="pl-3 pr-3">:</td>
            <td>{barang?.nama}</td>
          </tr>
          <tr>
            <td>Kode Barang</td>
            <td className="pl-3 pr-3">:</td>
            <td>{barang?.kode_barang}</td>
          </tr>
          <tr>
            <td>Deskripsi</td>
            <td className="pl-3 pr-3">:</td>
            <td>{barang?.deskripsi}</td>
          </tr>
          <tr>
            <td>Divisi</td>
            <td className="pl-3 pr-3">:</td>
            <td>{barang?.nama_divisi}</td>
          </tr>
          <tr>
            <td>Jenis Barang</td>
            <td className="pl-3 pr-3">:</td>
            <td>{barang?.jenis_barang}</td>
          </tr>
          <tr>
            <td>Kondisi</td>
            <td className="pl-3 pr-3">:</td>
            <td>{renderStatus(barang?.kondisi)}</td>
          </tr>
          <tr>
            <td>Lokasi Penyimpanan</td>
            <td className="pl-3 pr-3">:</td>
            <td>{barang?.lokasi_penyimpanan}</td>
          </tr>
          <tr>
            <td>Tanggal Perolehan</td>
            <td className="pl-3 pr-3">:</td>
            <td>{formatDate(barang?.tanggal_perolehan || "")}</td>
          </tr>
          <tr>
            <td>Stok</td>
            <td className="pl-3 pr-3">:</td>
            <td>{barang?.stok}</td>
          </tr>
          <tr>
            <td>Foto Barang</td>
            <td className="pl-3 pr-3">:</td>
            <td>
              {barang?.foto_barang ? (
                <a
                  href={`http://127.0.0.1:8000/storage/${barang?.foto_barang}`}
                  download
                >
                  <img
                    src={`http://127.0.0.1:8000/storage/${barang?.foto_barang}`}
                    className="w-20"
                    alt="Foto Barang"
                  />
                </a>
              ) : (
                <span>-</span>
              )}
            </td>
          </tr>
          <tr>
            <td>Status</td>
            <td className="pl-3 pr-3">:</td>
            <td>{renderStatus(barang?.status)}</td>
          </tr>
          <tr>
            <td>Created At</td>
            <td className="pl-3 pr-3">:</td>
            <td>{formatDate(barang?.created_at || "")}</td>
          </tr>
          <tr>
            <td>Updated At</td>
            <td className="pl-3 pr-3">:</td>
            <td>{formatDate(barang?.updated_at || "")}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default DetailBarang;
