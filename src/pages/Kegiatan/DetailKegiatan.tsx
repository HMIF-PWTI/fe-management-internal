import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { getKegiatanById } from "@/service/Kegiatan";
import { formatDate, formatDateTime } from "@/utils/FormatDate";
import { Kegiatan } from "@/utils/interface";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const DetailKegiatan = () => {
  const navigate = useNavigate();
  const [kegiatanData, setKegiatanData] = useState<Kegiatan | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchJabatan = async () => {
      if (!id) return;
      try {
        setIsLoadingData(true);
        const response = await getKegiatanById(Number(id));
        setKegiatanData(response.data.payload);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal mengambil data",
          text: "Data kegiatan tidak ditemukan.",
        });
        navigate("/kegiatan");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchJabatan();
  }, [id, navigate]);

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
      <div className="border p-3 border-dark-tertiary rounded-lg">
        <table>
          <tr>
            <td>Nama Kegiatan</td>
            <td className="pl-3 pr-3">:</td>
            <td>{kegiatanData?.nama}</td>
          </tr>
          <tr>
            <td>Jenis Kegiatan</td>
            <td className="pl-3 pr-3">:</td>
            <td>{kegiatanData?.nama_jenis_kegiatan}</td>
          </tr>
          <tr>
            <td>Nama Divisi</td>
            <td className="pl-3 pr-3">:</td>
            <td>{kegiatanData?.nama_divisi}</td>
          </tr>
          <tr>
            <td>Tanggal Pelaksanaan</td>
            <td className="pl-3 pr-3">:</td>
            <td>{formatDate(kegiatanData?.tanggal_pelaksanaan || "")}</td>
          </tr>
          <tr>
            <td>Tanggal Mulai Kegiatan</td>
            <td className="pl-3 pr-3">:</td>
            <td>{formatDateTime(kegiatanData?.kegiatan_mulai || "")}</td>
          </tr>
          <tr>
            <td>Tanggal berakhir Kegiatan</td>
            <td className="pl-3 pr-3">:</td>
            <td>{formatDateTime(kegiatanData?.kegiatan_berakhir || "")}</td>
          </tr>
          <tr>
            <td>Tempat Pelaksanaan</td>
            <td className="pl-3 pr-3">:</td>
            <td>{kegiatanData?.tempat_pelaksanaan}</td>
          </tr>
          <tr>
            <td>Created At</td>
            <td className="pl-3 pr-3">:</td>
            <td>{formatDate(kegiatanData?.created_at || "")}</td>
          </tr>
          <tr>
            <td>Updated At</td>
            <td className="pl-3 pr-3">:</td>
            <td>{formatDate(kegiatanData?.updated_at || "")}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default DetailKegiatan;
