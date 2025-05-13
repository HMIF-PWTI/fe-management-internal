import ActionButton from "@/components/ActionButton";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Table from "@/components/Table";
import { Column } from "@/components/Table/types";
import { deleteKp, getKp } from "@/service/KerjaPraktek";
import { KerjaPraktek } from "@/utils/interface";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdOutlineInbox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const InfoKp = () => {
  const [kpData, setKpData] = useState<KerjaPraktek[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const columns: Column<KerjaPraktek>[] = [
    { header: "No", key: "no" },
    { header: "Nama", key: "nama" },
    { header: "Alamat", key: "alamat" },
    {
      header: "Aksi",
      key: "id",
      render: (_, row) => (
        <ActionButton
          updatePath={`/infokp/update/${row.id}`}
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
        const response = await getKp();
        setKpData(response.data.payload || []);
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
        const response = await deleteKp(id);

        setKpData((prevData) => prevData.filter((kp) => kp.id !== id));

        Swal.fire({
          title: "Berhasil!",
          text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.error("Error deleting kp:", error);
        Swal.fire({
          title: "Gagal!",
          text: "Gagal menghapus kp. Silakan coba lagi.",
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
          Buat Info KP
        </Button>
      </div>

      {kpData.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-text-secondary">
          <MdOutlineInbox className="w-16 h-16 mb-4 text-dark-tertiary" />
          <p className="text-lg font-medium">Tidak ada data kp</p>
          <p className="text-sm mt-2">Kp belum tersedia saat ini</p>
        </div>
      ) : (
        <Table data={kpData} columns={columns} />
      )}
    </div>
  );
};

export default InfoKp;
