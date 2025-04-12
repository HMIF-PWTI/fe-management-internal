import ActionButton from "@/components/ActionButton";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Table from "@/components/Table";
import { Column } from "@/components/Table/types";
import { deleteKegiatan, getKegiatan } from "@/service/Kegiatan";
import { Kegiatan } from "@/utils/interface";
import { formatDateTime } from "@/utils/FormatDate";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdOutlineInbox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const KegiatanPages = () => {
  const navigate = useNavigate();
  const [KegiatanData, setKegiatanData] = useState<Kegiatan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns: Column<Kegiatan>[] = [
    { header: "No", key: "no" },
    { header: "Nama Kegiatan", key: "nama" },
    { header: "Jenis Kegiatan", key: "nama_jenis_kegiatan" },
    { header: "Tempat Pelaksanaan", key: "tempat_pelaksanaan" },
    { header: "Mulai Kegiatan", key: "kegiatan_mulai", render: formatDateTime },
    {
      header: "Berakhir Kegiatan",
      key: "kegiatan_berakhir",
      render: formatDateTime,
    },
    {
      header: "Aksi",
      key: "id",
      render: (_, row) => (
        <ActionButton
          updatePath={`/kegiatan/update/${row.id}`}
          detailPath={`/kegiatan/detail/${row.id}`}
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
        const response = await getKegiatan();
        setKegiatanData(response.data.payload || []);
      } catch (error) {
        console.error("Error Fetching Kegiatan : ", error);
        setError("Failed to fetch Kegiatan data. Please try again later.");
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
        const response = await deleteKegiatan(id);

        setKegiatanData((prevData) =>
          prevData.filter((kegiatan) => kegiatan.id !== id)
        );

        Swal.fire({
          title: "Berhasil!",
          text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error deleting kegiatan :", error);
        Swal.fire({
          title: "Gagal!",
          text: "Gagal menghapus kegiatan. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-400 text-center p-4">{error}</div>;
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
          Buat Kegiatan
        </Button>
      </div>

      {KegiatanData.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-text-secondary">
          <MdOutlineInbox className="w-16 h-16 mb-4 text-dark-tertiary" />
          <p className="text-lg font-medium">Tidak ada data kegiatan</p>
          <p className="text-sm mt-2">Data kegiatan belum tersedia saat ini</p>
        </div>
      ) : (
        <Table data={KegiatanData} columns={columns} />
      )}
    </div>
  );
};

export default KegiatanPages;
