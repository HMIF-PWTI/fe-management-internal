import { RouteObject } from "react-router-dom";
import RootLayout from "layouts/RootLayout";
import Dashboard from "pages/Dashboard";
import JabatanPages from "pages/Jabatan";
import CreateJabatan from "@/pages/Jabatan/CreateJabatan";
import EditJabatan from "@/pages/Jabatan/EditJabatan";
import DivisiPages from "@/pages/Divisi";
import CreateDivisi from "@/pages/Divisi/CreateDivisi";
import EditDivisi from "@/pages/Divisi/EditDivisi";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
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
    ],
  },
];
