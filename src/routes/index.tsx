import { RouteObject } from 'react-router-dom';
import RootLayout from 'layouts/RootLayout';
import Dashboard from 'pages/Dashboard';
import JabatanPages from 'pages/Jabatan';
import CreateJabatan from '@/pages/Jabatan/CreateJabatan';
import EditJabatan from '@/pages/Jabatan/EditJabatan';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'jabatan',
        element: <JabatanPages />,
      },
      {
        path: 'jabatan/create',
        element: <CreateJabatan />,
      },
      {
        path: 'jabatan/update/:id',
        element: <EditJabatan />,
      },
    ],
  },
];
