import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { getKeuanganById } from "@/service/Keuangan";
import { formatDate } from "@/utils/FormatDate";
import { formatRupiah } from "@/utils/FormatRupiah";
import { Keuangan } from "@/utils/interface";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const DetailKeuangan = () => {
  const navigate = useNavigate();
  const [keuanganData, setKeuanganData] = useState<Keuangan | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchKeuangan = async () => {
      if (!id) return;
      try {
        setIsLoadingData(true);
        const response = await getKeuanganById(Number(id));
        setKeuanganData(response.data);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal mengambil data",
          text: "Data keuangan tidak ditemukan.",
        });
        navigate("/keuangan");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchKeuangan();
  }, [id, navigate]);

  if (isLoadingData) {
    return <Loading />;
  }

  const renderStatus = (status: string | undefined) => {
    if (!status) return "-";

    let label = "";
    let color = "";

    switch (status) {
      case "menunggu":
        label = "Menunggu";
        color = "text-red-500";
        break;
      case "acc_bendum":
        label = "ACC Bendum";
        color = "text-yellow-500";
        break;
      case "acc_kahim":
        label = "ACC Kahim";
        color = "text-green-500";
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
            <td>Jenis Kegiatan</td>
            <td className="pl-3 pr-3">:</td>
            <td>{keuanganData?.nama_jenis_keuangan}</td>
          </tr>
          <tr>
            <td>Nama Divisi</td>
            <td className="pl-3 pr-3">:</td>
            <td>{keuanganData?.nama_divisi}</td>
          </tr>
          <tr>
            <td>Tanggal</td>
            <td className="pl-3 pr-3">:</td>
            <td>{formatDate(keuanganData?.tanggal || "")}</td>
          </tr>
          <tr>
            <td>Keterangan Dana</td>
            <td className="pl-3 pr-3">:</td>
            <td>{keuanganData?.keterangan_dana}</td>
          </tr>
          <tr>
            <td>Uang Masuk</td>
            <td className="pl-3 pr-3">:</td>
            <td>{formatRupiah(keuanganData?.uang_masuk || "")}</td>
          </tr>
          <tr>
            <td>Bukti Uang Masuk</td>
            <td className="pl-3 pr-3">:</td>
            <td>
              {keuanganData?.bukti_uang_masuk ? (
                <a
                  href={`https://hmif-be.unikom.my.id/storage/${keuanganData?.bukti_uang_masuk}`}
                  download
                >
                  <img
                    src={`https://hmif-be.unikom.my.id/storage/${keuanganData?.bukti_uang_masuk}`}
                    className="w-20"
                    alt="Bukti Uang Masuk"
                  />
                </a>
              ) : (
                <span>-</span>
              )}
            </td>
          </tr>
          <tr>
            <td>Uang Keluar</td>
            <td className="pl-3 pr-3">:</td>
            <td>{formatRupiah(keuanganData?.uang_keluar || "")}</td>
          </tr>
          <tr>
            <td>Bukti Uang Keluar</td>
            <td className="pl-3 pr-3">:</td>
            <td>
              {keuanganData?.bukti_uang_keluar ? (
                <a
                  href={`https://hmif-be.unikom.my.id/storage/${keuanganData?.bukti_uang_keluar}`}
                  download
                >
                  <img
                    src={`https://hmif-be.unikom.my.id/storage/${keuanganData?.bukti_uang_keluar}`}
                    className="w-20"
                    alt="Bukti Uang Keluar"
                  />
                </a>
              ) : (
                <span>-</span>
              )}
            </td>
          </tr>
          <tr>
            <td>Keterangan Tambahan</td>
            <td className="pl-3 pr-3">:</td>
            <td>{keuanganData?.keterangan_tambahan}</td>
          </tr>
          <tr>
            <td>Pembuat</td>
            <td className="pl-3 pr-3">:</td>
            <td>{keuanganData?.pembuat}</td>
          </tr>
          <tr>
            <td>Dana Saat Ini </td>
            <td className="pl-3 pr-3">:</td>
            <td>{formatRupiah(keuanganData?.dana_saat_ini || "")}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td className="pl-3 pr-3">:</td>
            <td>{renderStatus(keuanganData?.status)}</td>
          </tr>
          <tr>
            <td>Created At</td>
            <td className="pl-3 pr-3">:</td>
            <td>{formatDate(keuanganData?.created_at || "")}</td>
          </tr>
          <tr>
            <td>Updated At</td>
            <td className="pl-3 pr-3">:</td>
            <td>{formatDate(keuanganData?.updated_at || "")}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default DetailKeuangan;
