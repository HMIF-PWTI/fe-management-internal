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

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
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
    ],
  },
];
