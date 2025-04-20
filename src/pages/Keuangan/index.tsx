import ActionButton from "@/components/ActionButton";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Table from "@/components/Table";
import { Column } from "@/components/Table/types";
import {
  deleteKeuangan,
  getKeuangan,
  putApproveBendum,
  putApproveKahim,
} from "@/service/Keuangan";
import { formatDate } from "@/utils/FormatDate";
import { formatRupiah } from "@/utils/FormatRupiah";
import { Keuangan } from "@/utils/interface";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdOutlineInbox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const KeuanganPages = () => {
  const navigate = useNavigate();
  const [keuanganData, setKeuanganData] = useState<Keuangan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  const columns: Column<Keuangan>[] = [
    { header: "No", key: "no" },
    { header: "Jenis Keuangan", key: "nama_jenis_keuangan" },
    { header: "Tanggal", key: "tanggal", render: formatDate },
    { header: "Keterangan Dana", key: "keterangan_dana" },
    { header: "Uang Masuk", key: "uang_masuk", render: formatRupiah },
    { header: "Uang Keluar", key: "uang_keluar", render: formatRupiah },
    { header: "Dana Saat Ini", key: "dana_saat_ini", render: formatRupiah },
    { header: "Pembuat", key: "pembuat" },
    {
      header: "Status",
      key: "status",
      render: (status) => {
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
      },
    },
    {
      header: "Setujui Bendum",
      key: "approve_bendum",
      render: (_, row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleApproveBendum(row.id)}
          disabled={row.status !== "menunggu"}
        >
          Setujui
        </Button>
      ),
    },
    {
      header: "Setujui Kahim",
      key: "approve_kahim",
      render: (_, row) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleApproveKahim(row.id)}
          disabled={row.status !== "acc_bendum"}
        >
          Setujui
        </Button>
      ),
    },

    {
      header: "Aksi",
      key: "id",
      render: (_, row) => (
        <ActionButton
          updatePath={`/keuangan/update/${row.id}`}
          detailPath={`/keuangan/detail/${row.id}`}
          onDelete={() => handleDelete(row.id)}
        />
      ),
    },
  ];

  const handleApproveBendum = async (id: number) => {
    const result = await Swal.fire({
      title: "Apakah anda yakin?",
      text: "Anda akan menyetujui keuangan ini sebagai Bendum.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Setujui!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await putApproveBendum(id);
        setKeuanganData((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: "acc_bendum" } : item
          )
        );

        Swal.fire(
          "Disetujui!",
          "Keuangan telah disetujui sebagai Bendum.",
          "success"
        );
      } catch (error) {
        console.error("Error approve Bendum:", error);
        Swal.fire("Gagal!", "Terjadi kesalahan saat menyetujui.", "error");
      }
    }
  };

  const handleApproveKahim = async (id: number) => {
    const result = await Swal.fire({
      title: "Apakah anda yakin?",
      text: "Anda akan menyetujui keuangan ini sebagai Kahim.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Setujui!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await putApproveKahim(id);
        setKeuanganData((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, status: "acc_kahim" } : item
          )
        );

        Swal.fire(
          "Disetujui!",
          "Keuangan telah disetujui sebagai Kahim.",
          "success"
        );
      } catch (error) {
        console.error("Error approve Kahim:", error);
        Swal.fire("Gagal!", "Terjadi kesalahan saat menyetujui.", "error");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getKeuangan();
        setKeuanganData(response.data || []);
      } catch (error) {
        console.error("Error Fetching Keuangan  : ", error);
        setError("Failed to fetch Keuangan  data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Apakah anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteKeuangan(id);

        setKeuanganData((prevData) =>
          prevData.filter((keuangan) => keuangan.id !== id)
        );

        Swal.fire({
          title: "Berhasil!",
          text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error deleting keuangan :", error);
        Swal.fire({
          title: "Gagal!",
          text: "Gagal menghapus keuangan. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="animate-slide-in p-3 space-y-10">
      <div className="flex justify-end">
        <Button
          variant="outline"
          icon={<IoAddOutline className="text-xl" />}
          iconPosition="right"
          onClick={() => navigate("create")}
        >
          Buat Keuangan
        </Button>
      </div>

      {keuanganData.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-text-secondary">
          <MdOutlineInbox className="w-16 h-16 mb-4 text-dark-tertiary" />
          <p className="text-lg font-medium">Tidak ada data keuangan</p>
          <p className="text-sm mt-2">Data keuangan belum tersedia saat ini</p>
        </div>
      ) : (
        <Table data={keuanganData} columns={columns} />
      )}
    </div>
  );
};

export default KeuanganPages;
