import ActionButton from "@/components/ActionButton";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Table from "@/components/Table";
import { Column } from "@/components/Table/types";
import { deleteJenisKegiatan, getJenisKegiatan } from "@/service/JenisKegiatan";
import { formatDate } from "@/utils/FormatDate";
import { JenisKegiatan } from "@/utils/interface";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdOutlineInbox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const JenisKegiatanPages = () => {
  const [jenisKegiatan, setJenisKegiatan] = useState<JenisKegiatan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const columns: Column<JenisKegiatan>[] = [
    { header: "No", key: "no" },
    { header: "Nama Jenis Kegiatan", key: "nama" },
    {
      header: "Created At",
      key: "created_at",
      render: formatDate
    },
    {
      header: "Updated At",
      key: "updated_at",
      render: formatDate
    },
    {
      header: "Aksi",
      key: "id",
      render: (_, row) => (
        <ActionButton
          updatePath={`/jeniskegiatan/update/${row.id}`}
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
        const response = await getJenisKegiatan();
        setJenisKegiatan(response.data || []);
      } catch (error) {
        console.error("Error Fetching Jenis Kegiatan : ", error);
        setError(
          "Failed to fetch Jenis Kegiatan data. Please try again later."
        );
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
        const response = await deleteJenisKegiatan(id);

        setJenisKegiatan((prevData) =>
          prevData.filter((kegiatan) => kegiatan.id !== id)
        );

        Swal.fire({
          title: "Berhasil!",
          text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error deleting jenis kegiatan :", error);
        Swal.fire({
          title: "Gagal!",
          text: "Gagal menghapus jenis kegiatan. Silakan coba lagi.",
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
          Buat Jenis Kegiatan
        </Button>
      </div>

      {jenisKegiatan.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-text-secondary">
          <MdOutlineInbox className="w-16 h-16 mb-4 text-dark-tertiary" />
          <p className="text-lg font-medium">Tidak ada data jenis kegiatan</p>
          <p className="text-sm mt-2">
            Data jenis kegiatan belum tersedia saat ini
          </p>
        </div>
      ) : (
        <Table data={jenisKegiatan} columns={columns} />
      )}
    </div>
  );
};

export default JenisKegiatanPages;
