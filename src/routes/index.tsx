import { RouteObject } from "react-router-dom";
import RootLayout from "layouts/RootLayout";
import Dashboard from "pages/Dashboard";
import JabatanPages from "pages/Jabatan";
import CreateJabatan from "@/pages/Jabatan/CreateJabatan";
import EditJabatan from "@/pages/Jabatan/EditJabatan";
import DivisiPages from "@/pages/Divisi";
import CreateDivisi from "@/pages/Divisi/CreateDivisi";
import EditDivisi from "@/pages/Divisi/EditDivisi";
import JenisKegiatanPages from "@/pages/JenisKegiatan";
import CreateJenisKegiatan from "@/pages/JenisKegiatan/CreateJenisKegiatan";
import EditJenisKegiatan from "@/pages/JenisKegiatan/EditJenisKegiatan";
import JenisKeuanganPages from "@/pages/JenisKeuangan";
import CreateJenisKeuangan from "@/pages/JenisKeuangan/CreateJenisKeuangan";
import EditJenisKeuangan from "@/pages/JenisKeuangan/EditJenisKeuangan";
import KegiatanPages from "@/pages/Kegiatan";
import CreateKegiatan from "@/pages/Kegiatan/CreateKegiatan";
import EditKegiatan from "@/pages/Kegiatan/EditKegiatan";
import DetailKegiatan from "@/pages/Kegiatan/DetailKegiatan";
import KeuanganPages from "@/pages/Keuangan";
import CreateKeuangan from "@/pages/Keuangan/CreateKeuangan";
import EditKeuangan from "@/pages/Keuangan/EditKeuangan";
import DetailKeuangan from "@/pages/Keuangan/DetailKeuangan";
import BarangPages from "@/pages/Barang";
import CreateBarang from "@/pages/Barang/CreateBarang";
import EditBarang from "@/pages/Barang/EditBarang";
import DetailBarang from "@/pages/Barang/DetailBarang";
import TokoPages from "@/pages/Toko";
import AbsensiPages from "@/pages/Absensi";
import SuratPages from "@/pages/Surat";
import CreateSurat from "@/pages/Surat/CreateSurat";
import EditSurat from "@/pages/Surat/EditSurat";
import DetailSurat from "@/pages/Surat/DetailSurat";
import ProductPage from "@/pages/Toko/Produk";
import CreateProduct from "@/pages/Toko/Produk/CreateProduct";
import DetailProduct from "@/pages/Toko/Produk/DetailProduct";
import EditProduct from "@/pages/Toko/Produk/EditProduct";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import DaftarkanAnggota from "@/pages/CekKartu/DaftarkanAnggota";
import CekKartuPage from "@/pages/CekKartu";
import KeanggotaanPage from "@/pages/Keanggotaan";
import BlogPage from "@/pages/Blog";
import CreateBlog from "@/pages/Blog/CreateBlog";
import InfoKp from "@/pages/InfoKp";
import CreateInfoKp from "@/pages/InfoKp/CreateInfoKp";
import EditInfoKp from "@/pages/InfoKp/EditInfoKp";
import ProtectedLayout from "./ProtectedRoute";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  // Protected Route
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [

      // Route dengan RootLayout
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },

          // Jabatan Route
          {
            path: "jabatan",
            element: <JabatanPages />,
          },
          {
            path: "jabatan/create",
            element: <CreateJabatan />,
          },
          {
            path: "jabatan/update/:id",
            element: <EditJabatan />,
          },

          // Divisi Route
          {
            path: "divisi",
            element: <DivisiPages />,
          },
          {
            path: "divisi/create",
            element: <CreateDivisi />,
          },
          {
            path: "divisi/update/:id",
            element: <EditDivisi />,
          },

          // Jenis Kegiatan Route
          {
            path: "jeniskegiatan",
            element: <JenisKegiatanPages />,
          },
          {
            path: "jeniskegiatan/create",
            element: <CreateJenisKegiatan />,
          },
          {
            path: "jeniskegiatan/update/:id",
            element: <EditJenisKegiatan />,
          },

          // Kegiatan Route
          {
            path: "kegiatan",
            element: <KegiatanPages />,
          },
          {
            path: "kegiatan/create",
            element: <CreateKegiatan />,
          },
          {
            path: "kegiatan/update/:id",
            element: <EditKegiatan />,
          },
          {
            path: "kegiatan/detail/:id",
            element: <DetailKegiatan />,
          },

          // Jenis Keuangan Route
          {
            path: "jeniskeuangan",
            element: <JenisKeuanganPages />,
          },
          {
            path: "jeniskeuangan/create",
            element: <CreateJenisKeuangan />,
          },
          {
            path: "jeniskeuangan/update/:id",
            element: <EditJenisKeuangan />,
          },

          // Keuangan Route
          {
            path: "keuangan",
            element: <KeuanganPages />,
          },
          {
            path: "keuangan/create",
            element: <CreateKeuangan />,
          },
          {
            path: "keuangan/update/:id",
            element: <EditKeuangan />,
          },
          {
            path: "keuangan/detail/:id",
            element: <DetailKeuangan />,
          },

          // Barang Route
          {
            path: "barang",
            element: <BarangPages />,
          },
          {
            path: "barang/create",
            element: <CreateBarang />,
          },
          {
            path: "barang/update/:id",
            element: <EditBarang />,
          },
          {
            path: "barang/detail/:id",
            element: <DetailBarang />,
          },

          // Toko Route
          {
            path: "toko",
            element: <TokoPages />,
          },

          // Absensi Route
          {
            path: "absensi",
            element: <AbsensiPages />,
          },

          // Surat Pages
          {
            path: "surat",
            element: <SuratPages />,
          },
          {
            path: "surat/create",
            element: <CreateSurat />,
          },
          {
            path: "surat/update/:id",
            element: <EditSurat />,
          },
          {
            path: "surat/detail/:id",
            element: <DetailSurat />,
          },

          // Product Page
          {
            path: "product",
            element: <ProductPage />,
          },
          {
            path: "product/create",
            element: <CreateProduct />,
          },
          {
            path: "product/update/:id",
            element: <EditProduct />,
          },
          {
            path: "product/detail/:id",
            element: <DetailProduct />,
          },

          // Cek Kartu Page
          {
            path: "cek-kartu",
            element: <CekKartuPage />,
          },
          {
            path: "cek-kartu/daftar/:id",
            element: <DaftarkanAnggota />,
          },

          // Keanggotaan Page
          {
            path: "keanggotaan",
            element: <KeanggotaanPage />,
          },
          {
            path: "product/detail/:id",
            element: <DetailProduct />,
          },

          // Blog Page
          {
            path: "blog",
            element: <BlogPage />,
          },
          {
            path: "blog/create",
            element: <CreateBlog />,
          },

          // Blog Page
          {
            path: "infokp",
            element: <InfoKp />,
          },
          {
            path: "infokp/create",
            element: <CreateInfoKp />,
          },
          {
            path: "infokp/update/:id",
            element: <EditInfoKp />,
          },
        ],
      },
    ],
  },
];
