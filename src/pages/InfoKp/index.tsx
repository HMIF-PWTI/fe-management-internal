import ActionButton from "@/components/ActionButton";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Table from "@/components/Table";
import { Column } from "@/components/Table/types";

import { deleteKp, getKp, postKp } from "@/service/KerjaPraktek";
import { KerjaPraktek } from "@/utils/interface";

import { useEffect, useRef, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdOutlineInbox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";

const InfoKp = () => {
  const [kpData, setKpData] = useState<KerjaPraktek[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const columns: Column<KerjaPraktek>[] = [
    { header: "No", key: "no" },
    { header: "Nama", key: "nama" },
    { header: "Kota", key: "kota" },
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
    fetchKp();
  }, []);

  const fetchKp = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getKp();
      setKpData(response.data.payload || []);
    } catch (error) {
      console.error("Error Fetching KP:", error);
      setError("Gagal mengambil data KP. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
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
          text: "Gagal menghapus KP. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handleImportExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      const parsedData = jsonData.map((item: any) => ({
        nama: item.nama || item.Nama || "",
        kota: item.kota || item.Kota || "",
        alamat: item.alamat || item.Alamat || "",
      }));

      const results = await Promise.allSettled(
        parsedData.map((kp) => postKp(kp))
      );

      const successCount = results.filter(
        (r) => r.status === "fulfilled"
      ).length;
      const failCount = results.filter((r) => r.status === "rejected").length;

      Swal.fire({
        title: "Import Selesai",
        text: `${successCount} data berhasil diimport, ${failCount} gagal.`,
        icon: "info",
      });

      fetchKp();
    } catch (error) {
      console.error("Import Error:", error);
      Swal.fire("Gagal", "Terjadi kesalahan saat mengimport file.", "error");
    }
  };

  return (
    <div className="animate-slide-in p-3 space-y-10">
      <div className="flex gap-5 justify-end items-center">
        <div className="relative">
          <input
            type="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            onChange={handleImportExcel}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <Button
            variant="outline"
            icon={<IoAddOutline className="text-xl" />}
            iconPosition="right"
            className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
          >
            Import Excel
          </Button>
        </div>
        <Button
          variant="outline"
          icon={<IoAddOutline className="text-xl" />}
          iconPosition="right"
          onClick={() => navigate("create")}
        >
          Buat Info KP
        </Button>
      </div>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="text-red-400 text-center p-4">{error}</div>
      ) : kpData.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-text-secondary">
          <MdOutlineInbox className="w-16 h-16 mb-4 text-dark-tertiary" />
          <p className="text-lg font-medium">Tidak ada data KP</p>
          <p className="text-sm mt-2">KP belum tersedia saat ini</p>
        </div>
      ) : (
        <Table data={kpData} columns={columns} />
      )}
    </div>
  );
};

export default InfoKp;
