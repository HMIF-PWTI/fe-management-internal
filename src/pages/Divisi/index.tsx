import ActionButton from "@/components/ActionButton";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Table from "@/components/Table";
import { Column } from "@/components/Table/types";
import { deleteDivisi, getDivisi } from "@/service/Divisi";
import { Divisi } from "@/utils/interface";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdOutlineInbox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DivisiPages = () => {
  const navigate = useNavigate();
  const [divisiData, setDivisiData] = useState<Divisi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns: Column<Divisi>[] = [
    { header: "No", key: "no" },
    { header: "Nama Divisi", key: "nama" },
    { header: "Singkatan", key: "singkatan" },
    { header: "Deskripsi", key: "deskripsi" },
    {
      header: "Created At",
      key: "created_at",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      header: "Updated At",
      key: "updated_at",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      header: "Aksi",
      key: "id",
      render: (_, row) => (
        <ActionButton
          updatePath={`/divisi/update/${row.id}`}
          onDelete={() => handleDelete(row.id)}
        />
      ),
    },
  ];

  useEffect(() => {
    const fetchDivisi = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getDivisi();
        setDivisiData(response.data.payload || []);
      } catch (error) {
        console.error("Error Fetching Jabatan : ", error);
        setError("Failed to fetch jabatan data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchDivisi();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-400 text-center p-4">{error}</div>;
  }

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
        const response = await deleteDivisi(id);

        setDivisiData((prevData) =>
          prevData.filter((divisi) => divisi.id !== id)
        );

        Swal.fire({
          title: "Berhasil!",
          text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error deleting divisi:", error);
        Swal.fire({
          title: "Gagal!",
          text: "Gagal menghapus divisi. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="animate-slide-in p-3 space-y-10">
      <div className="flex justify-end">
        <Button
          variant="outline"
          icon={<IoAddOutline className="text-xl" />}
          iconPosition="right"
          onClick={() => navigate("create")}
        >
          Buat Divisi
        </Button>
      </div>

      {divisiData.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-text-secondary">
          <MdOutlineInbox className="w-16 h-16 mb-4 text-dark-tertiary" />
          <p className="text-lg font-medium">Tidak ada data divisi</p>
          <p className="text-sm mt-2">Data divisi belum tersedia saat ini</p>
        </div>
      ) : (
        <Table data={divisiData} columns={columns} />
      )}
    </div>
  );
};

export default DivisiPages;
