import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { getKegiatanById } from "@/service/Kegiatan";
import { getSuratById } from "@/service/Surat";
import { formatDate } from "@/utils/FormatDate";
import { Surat } from "@/utils/interface";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const DetailSurat = () => {
  const navigate = useNavigate();
  const [suratData, setSuratData] = useState<Surat | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchJabatan = async () => {
      if (!id) return;
      try {
        setIsLoadingData(true);
        const response = await getSuratById(Number(id));
        setSuratData(response.data.payload);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal mengambil data",
          text: "Data surat tidak ditemukan.",
        });
        navigate("/surat");
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
          <tbody>
            <tr>
              <td>Nomor Surat</td>
              <td className="pl-3 pr-3">:</td>
              <td>{suratData?.nomor_surat}</td>
            </tr>
            <tr>
              <td>Jenis Surat</td>
              <td className="pl-3 pr-3">:</td>
              <td>{suratData?.jenis_surat}</td>
            </tr>
            <tr>
              <td>Tanggal Surat</td>
              <td className="pl-3 pr-3">:</td>
              <td>{suratData?.tanggal_surat}</td>
            </tr>
            <tr>
              <td>Pengirim</td>
              <td className="pl-3 pr-3">:</td>
              <td>{suratData?.pengirim}</td>
            </tr>
            <tr>
              <td>Penerima</td>
              <td className="pl-3 pr-3">:</td>
              <td>{suratData?.penerima}</td>
            </tr>
            <tr>
              <td>Perihal Surat</td>
              <td className="pl-3 pr-3">:</td>
              <td>{suratData?.perihal_surat}</td>
            </tr>
            <tr>
              <td>File Surat</td>
              <td className="pl-3 pr-3">:</td>
              <td className="text-gold hover:text-blue-600 hover:underline">
                <a
                  href={`https://hmif-be.unikom.my.id/storage/${suratData?.file_surat}`}
                >
                  Download File
                </a>
              </td>
            </tr>
            <tr>
              <td>Pembuat</td>
              <td className="pl-3 pr-3">:</td>
              <td>{suratData?.pembuat}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td className="pl-3 pr-3">:</td>
              <td>{formatDate(suratData?.created_at || "")}</td>
            </tr>
            <tr>
              <td>Updated At</td>
              <td className="pl-3 pr-3">:</td>
              <td>{formatDate(suratData?.updated_at || "")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailSurat;
