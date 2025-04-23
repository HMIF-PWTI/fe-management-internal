import Loading from "@/components/Loading";
import Table from "@/components/Table";
import { Column } from "@/components/Table/types";
import { getUid } from "@/service/CekKartu";
import { Uid } from "@/utils/interface";
import { useEffect, useState } from "react";
import { MdOutlineInbox } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CekKartuPage = () => {
  const [uidData, setUidData] = useState<Uid[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const columns: Column<Uid>[] = [
    { header: "No", key: "no" },
    { header: "UID", key: "uid" },
    { header: "Status", key: "status" },
    {
      header: "Aksi",
      key: "id",
      render: (_, row) => (
        <button
          className="text-gold hover:underline"
          onClick={() => navigate(`/cek-kartu/daftar/${row.id}`)}
        >
          Daftarkan
        </button>
      ),
    },
  ];

  useEffect(() => {
    const fetchUid = async () => {
      try {
        setLoading(true);
        const response = await getUid();
        const filteredData = response.data.filter(
          (item: Uid) => item.status === "belum_valid"
        );
        setUidData(filteredData);
      } catch (err) {
        console.error("Error fetching UID data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUid();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="animate-slide-in">
      {uidData.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-text-secondary">
          <MdOutlineInbox className="w-16 h-16 mb-4 text-dark-tertiary" />
          <p className="text-lg font-medium">Tidak ada data kartu</p>
          <p className="text-sm mt-2">Data kartu belum tersedia saat ini</p>
        </div>
      ) : (
        <Table data={uidData} columns={columns} />
      )}
    </div>
  );
};

export default CekKartuPage;
