import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { getProductById } from "@/service/Product";
import { formatDate } from "@/utils/FormatDate";
import { formatRupiah } from "@/utils/FormatRupiah";
import { Product } from "@/utils/interface";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const DetailProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const { id } = useParams<{ id: string }>();

  const renderStatus = (status: string | undefined) => {
    if (!status) return "-";

    let label = "";
    let color = "";

    switch (status) {
      case "aktif":
        label = "Aktif";
        color = "text-green-500";
        break;
      case "tidak_aktif":
        label = "Tidak Aktif";
        color = "text-red-500";
        break;
      default:
        label = status;
        color = "text-gray-600";
        break;
    }

    return <span className={`font-semibold ${color}`}>{label}</span>;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setIsLoadingData(true);
        const response = await getProductById(Number(id));
        setProduct(response.data.payload);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal mengambil data",
          text: "Data produk tidak ditemukan.",
        });
        navigate("/product");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (isLoadingData) {
    return <Loading />;
  }

  return (
    <div className="animate-slide-in p-3 space-y-10">
      <div className="flex justify-end">
        <Button
          variant="outline"
          icon={<FaArrowLeft />}
          onClick={() => navigate(-1)}
        >
          Kembali
        </Button>
      </div>
      <div className="border p-3 border-dark-tertiary rounded-lg">
        <table>
          <tr>
            <td>Nama Produk</td>
            <td className="pl-3 pr-3">:</td>
            <td>{product?.nama_produk}</td>
          </tr>
          <tr>
            <td>Deskripsi</td>
            <td className="pl-3 pr-3">:</td>
            <td>{product?.deskripsi}</td>
          </tr>
          <tr>
            <td>Harga</td>
            <td className="pl-3 pr-3">:</td>
            <td>{formatRupiah(product?.harga)}</td>
          </tr>
          <tr>
            <td>Kategori</td>
            <td className="pl-3 pr-3">:</td>
            <td>{product?.kategori}</td>
          </tr>
          <tr>
            <td>Gambar Product</td>
            <td className="pl-3 pr-3">:</td>
            <td>
              {product?.gambar ? (
                <a
                  href={`https://hmif-be.unikom.my.id/storage/${product.gambar}`}
                  download
                >
                  <img
                    src={`https://hmif-be.unikom.my.id/storage/${product.gambar}`}
                    className="w-20"
                    alt="Foto Barang"
                  />
                </a>
              ) : (
                <span>-</span>
              )}
            </td>
          </tr>
          <tr>
            <td>Status</td>
            <td className="pl-3 pr-3">:</td>
            <td>{renderStatus(product?.status)}</td>
          </tr>
          <tr>
            <td>Created At</td>
            <td className="pl-3 pr-3">:</td>
            <td>{formatDate(product?.created_at || "")}</td>
          </tr>
          <tr>
            <td>Updated At</td>
            <td className="pl-3 pr-3">:</td>
            <td>{formatDate(product?.updated_at || "")}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default DetailProduct;
