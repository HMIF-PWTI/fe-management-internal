import ActionButton from "@/components/ActionButton";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Table from "@/components/Table";
import { Column } from "@/components/Table/types";
import Toggle from "@/components/Toggle";
import { deleteBarang, getBarang, putStatusBarang } from "@/service/Barang";
import { formatDate } from "@/utils/FormatDate";
import { Barang } from "@/utils/interface";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdOutlineInbox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BarangPages = () => {
  const navigate = useNavigate();
  const [barang, setBarang] = useState<Barang[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  const columns: Column<Barang>[] = [
    { header: "No", key: "no" },
    { header: "Nama Barang", key: "nama" },
    { header: "Kode Barang", key: "kode_barang" },
    { header: "Divisi", key: "nama_divisi" },
    { header: "Jenis Barang", key: "jenis_barang" },
    {
      header: "Kondisi Barang",
      key: "kondisi",
      render: (status) => {
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
          default:
            label = status;
            color = "text-gray-600";
            break;
        }

        return <span className={`font-semibold ${color}`}>{label}</span>;
      },
    },
    {
      header: "Tanggal Perolehan",
      key: "tanggal_perolehan",
      render: formatDate,
    },
    {
      header: "Status",
      key: "status",
      render: (_, row) => (
        <Toggle
          isOn={row.status === "aktif"}
          onToggle={() => handleToggleStatus(row.id)}
        />
      ),
    },
    {
      header: "Aksi",
      key: "id",
      render: (_, row) => (
        <ActionButton
          updatePath={`/barang/update/${row.id}`}
          detailPath={`/barang/detail/${row.id}`}
          onDelete={() => handleDelete(row.id)}
        />
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getBarang();
        setBarang(response.data.payload || []);
      } catch (error) {
        console.error("Error Fetching barang  : ", error);
        setError("Failed to fetch barang  data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleToggleStatus = async (id: number) => {
    try {
      await putStatusBarang(id);
      setBarang((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? {
                ...item,
                status: item.status === "aktif" ? "tidak_aktif" : "aktif",
              }
            : item
        )
      );
    } catch (error) {
      console.error("Error toggling status:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal mengubah status",
        text: "Silakan coba lagi.",
      });
    }
  };

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
        const response = await deleteBarang(id);

        setBarang((prevData) => prevData.filter((barang) => barang.id !== id));

        Swal.fire({
          title: "Berhasil!",
          text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error deleting barang :", error);
        Swal.fire({
          title: "Gagal!",
          text: "Gagal menghapus barang. Silakan coba lagi.",
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
          Buat Barang
        </Button>
      </div>

      {barang.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-text-secondary">
          <MdOutlineInbox className="w-16 h-16 mb-4 text-dark-tertiary" />
          <p className="text-lg font-medium">Tidak ada data barang</p>
          <p className="text-sm mt-2">Data barang belum tersedia saat ini</p>
        </div>
      ) : (
        <Table data={barang} columns={columns} />
      )}
    </div>
  );
};

export default BarangPages;
