import Loading from "@/components/Loading";
import Select from "@/components/Select";
import Table from "@/components/Table";
import { Column } from "@/components/Table/types";
import Toggle from "@/components/Toggle";
import { getAnggota } from "@/service/CekKartu";
import { getJabatan } from "@/service/Jabatan";
import { putJabatanAnggota, putStatusAnggota } from "@/service/Keanggotaan";
import { Anggota } from "@/utils/interface";
import { useEffect, useState } from "react";
import { MdOutlineInbox } from "react-icons/md";
import Swal from "sweetalert2";

const KeanggotaanPage = () => {
  const [anggotaData, setAnggotaData] = useState<Anggota[]>([]);
  const [jabatanOptions, setJabatanOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns: Column<Anggota>[] = [
    { header: "No", key: "no" },
    { header: "Nama Anggota", key: "nama" },
    { header: "Divisi", key: "nama_divisi" },
    {
      header: "Status Keanggotaan",
      key: "status_keanggotaan",
      render: (_, row) => (
        <Toggle
          isOn={row.status_keanggotaan === "aktif"}
          onToggle={() => handleToggleStatus(row.id)}
        />
      ),
    },
    {
      header: "Jabatan",
      key: "id",
      render: (_, row) => (
        <Select
          options={jabatanOptions}
          value={row.id_jabatan?.toString() ?? ""}
          onChange={(e) => handleChangeJabatan(row.id, e)}
          className="text-center"
        />
      ),
    },
  ];

  const handleChangeJabatan = async (
    id: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const jabatanId = event.target.value;

    try {
      await putJabatanAnggota(id, parseInt(jabatanId));

      setAnggotaData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, id_jabatan: parseInt(jabatanId) } : item
        )
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Jabatan anggota berhasil diperbarui.",
        timer: 800,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Gagal ubah jabatan:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal mengubah jabatan",
        text: "Silakan coba lagi.",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getJabatan();
        const jabatanOptions = response.data.payload.map((item: any) => ({
          label: item.nama,
          value: item.id.toString(),
        }));
        setJabatanOptions(jabatanOptions);
      } catch (error) {
        console.error("Gagal ambil data:", error);
      }
    };

    fetchData();
  }, []);

  const handleToggleStatus = async (id: number) => {
    try {
      await putStatusAnggota(id);
      setAnggotaData((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? {
                ...item,
                status_keanggotaan:
                  item.status_keanggotaan === "aktif" ? "tidak_aktif" : "aktif",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getAnggota();
        setAnggotaData(response.data.payload || []);
      } catch (error) {
        console.error("Error Fetching Jenis Kegiatan : ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="animate-slide-in p-3 space-y-10">
      {anggotaData.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-text-secondary">
          <MdOutlineInbox className="w-16 h-16 mb-4 text-dark-tertiary" />
          <p className="text-lg font-medium">Tidak ada data anggota</p>
          <p className="text-sm mt-2">Data anggota belum tersedia saat ini</p>
        </div>
      ) : (
        <Table data={anggotaData} columns={columns} />
      )}
    </div>
  );
};

export default KeanggotaanPage;
