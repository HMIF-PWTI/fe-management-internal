import Button from "@/components/Button";
import Table from "@/components/Table";
import { Column } from "@/components/Table/types";
import { getKegiatanAktif } from "@/service/Kegiatan";
import { getAbsensiByKegiatan } from "@/service/Absensi";
import { Absensi, Kegiatan } from "@/utils/interface";
import { useEffect, useState } from "react";
import { formatDateTime } from "@/utils/FormatDate";
import { MdOutlineInbox } from "react-icons/md";
import Loading from "@/components/Loading";
import DateTimePicker from "@/components/DateTimeInput";

const AbsensiPages = () => {
  const [dataAbsen, setDataAbsen] = useState<Absensi[]>([]);
  const [dataKegiatan, setDataKegiatan] = useState<Kegiatan[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [filterData, setFilterData] = useState("");

  const columns: Column<Absensi>[] = [
    {
      header: "No",
      key: "no",
    },
    {
      header: "Nama",
      key: "user",
      render: (value) => value.nama,
    },
    {
      header: "Jam Masuk",
      key: "jam_masuk",
      render: formatDateTime,
    },
    {
      header: "Jam Keluar",
      key: "jam_keluar",
      render: formatDateTime,
    },
  ];

  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        setLoadingData(true);
        const response = await getKegiatanAktif();
        setDataKegiatan(response.data.payload);
      } catch (err) {
        console.error("Error Fetching Kegiatan Aktif", err);
      } finally {
        setLoadingData(false);
      }
    };
    fetchKegiatan();
  }, []);

  const handleClickKegiatan = async (id: number) => {
    try {
      setLoading(true);
      const response = await getAbsensiByKegiatan(id);
      setDataAbsen(response.data.data);
    } catch (error) {
      console.error("Gagal ambil data absensi:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredKegiatan = filterData
    ? dataKegiatan.filter((kegiatan) =>
        kegiatan.created_at.startsWith(filterData)
      )
    : dataKegiatan;

  if (loadingData) {
    return <Loading />;
  }

  if (loadingData) {
    return <Loading />;
  }

  return (
    <div className="animate-slide-in space-y-4">
      <div className="w-52">
        <DateTimePicker
          enableTime={false}
          label="Filter Kegiatan"
          onChangeFormatted={setFilterData}
        />
      </div>
      <div className="flex items-center justify-center mb-10 flex-wrap gap-2">
        {filteredKegiatan.length === 0 ? (
          <p className="text-text-secondary">
            Tidak ada kegiatan pada tanggal ini
          </p>
        ) : (
          filteredKegiatan.map((data) => (
            <Button
              isLoading={loading}
              key={data.id}
              onClick={() => handleClickKegiatan(data.id)}
            >
              {data.nama}
            </Button>
          ))
        )}
      </div>
      {dataAbsen.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-text-secondary">
          <MdOutlineInbox className="w-16 h-16 mb-4 text-dark-tertiary" />
          <p className="text-lg font-medium">Tidak ada absensi</p>
          <p className="text-sm mt-2">Data absensi belum tersedia saat ini</p>
        </div>
      ) : (
        <Table data={dataAbsen} columns={columns} />
      )}
    </div>
  );
};

export default AbsensiPages;
