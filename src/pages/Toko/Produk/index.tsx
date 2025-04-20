import ActionButton from "@/components/ActionButton";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import Table from "@/components/Table";
import { Column } from "@/components/Table/types";
import Toggle from "@/components/Toggle";
import { deleteProduct, getProduct, putStatusProduct } from "@/service/Product";
import { formatRupiah } from "@/utils/FormatRupiah";
import { Product } from "@/utils/interface";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdOutlineInbox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductPage = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  const columns: Column<Product>[] = [
    { header: "No", key: "no" },
    { header: "Nama Produk", key: "nama_produk" },
    { header: "Deskripsi", key: "deskripsi" },
    { header: "Harga", key: "harga", render: formatRupiah },
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
          updatePath={`/product/update/${row.id}`}
          detailPath={`/product/detail/${row.id}`}
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
        const response = await getProduct();
        setProductData(response.data.payload || []);
      } catch (error) {
        console.error("Error Fetching product  : ", error);
        setError("Failed to fetch product  data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleToggleStatus = async (id: number) => {
    try {
      await putStatusProduct(id);
      setProductData((prevData) =>
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
        const response = await deleteProduct(id);

        setProductData((prevData) =>
          prevData.filter((barang) => barang.id !== id)
        );

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
          Buat Produk
        </Button>
      </div>

      {productData.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-text-secondary">
          <MdOutlineInbox className="w-16 h-16 mb-4 text-dark-tertiary" />
          <p className="text-lg font-medium">Tidak ada data Produk</p>
          <p className="text-sm mt-2">Data Produk belum tersedia saat ini</p>
        </div>
      ) : (
        <Table data={productData} columns={columns} />
      )}
    </div>
  );
};

export default ProductPage;
