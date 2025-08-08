import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineAttachMoney,
  MdPeople,
  MdWork,
} from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { FaGalacticSenate } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { getToko } from "@/service/Toko";
import { HiBuildingStorefront } from "react-icons/hi2";
import { FaRegCalendarCheck } from "react-icons/fa";
import { CiPaperplane } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaRegAddressCard } from "react-icons/fa";
import { FaBlog } from "react-icons/fa";
import { IoGitNetworkOutline } from "react-icons/io5";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const [namaToko, setNamaToko] = useState("");

  useEffect(() => {
    const fetchToko = async () => {
      try {
        const response = await getToko();
        const toko = response.data.payload?.[0];
        if (toko) {
          setNamaToko(toko.nama_toko);
        }
      } catch (err) {
        console.error("Gagal mengambil nama toko:", err);
      }
    };
    fetchToko();
  }, []);

  const menuItems = [
    { title: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
    { title: "Jabatan", icon: <MdWork />, path: "/jabatan" },
    { title: "Divisi", icon: <MdPeople />, path: "/divisi" },
    { title: "Jenis Kegiatan", icon: <FiActivity />, path: "/jeniskegiatan" },
    { title: "Kegiatan", icon: <FaGalacticSenate />, path: "/kegiatan" },
    {
      title: "Jenis Keuangan",
      icon: <MdOutlineAttachMoney />,
      path: "/jeniskeuangan",
    },
    { title: "Keuangan", icon: <FaMoneyBillAlt />, path: "/keuangan" },
    { title: "Barang", icon: <FaBoxOpen />, path: "/barang" },
    { title: namaToko, icon: <HiBuildingStorefront />, path: "/toko" },
    { title: "Absensi", icon: <FaRegCalendarCheck />, path: "/absensi" },
    { title: "Surat", icon: <CiPaperplane />, path: "/surat" },
    { title: "Cek Kartu", icon: <FaRegAddressCard />, path: "/cek-kartu" },
    { title: "Keanggotaan", icon: <FaPeopleGroup />, path: "/keanggotaan" },
    { title: "Blog", icon: <FaBlog />, path: "/blog" },
    { title: "Info KP", icon: <IoGitNetworkOutline />, path: "/infokp" },
  ];

  return (
    <div
      className={`h-screen bg-dark-primary border-r border-dark-tertiary shadow-lg transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-dark-tertiary">
        {!isCollapsed && (
          <h1 className="text-xl font-semibold text-gold">HMIF</h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full w-10 h-10 flex items-center justify-center border-2 border-gold text-gold hover:bg-gold hover:text-white transition-colors"
        >
          {isCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
        </button>
      </div>

      <nav className="p-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center cursor-pointer p-3 rounded-lg mb-2 transition-colors ${
              location.pathname === item.path
                ? "bg-dark-tertiary text-gold"
                : "text-text-secondary hover:bg-dark-secondary hover:text-text-primary"
            } ${isCollapsed ? "justify-center" : "justify-start"}`}
          >
            <span className="text-xl">{item.icon}</span>
            {!isCollapsed && <span className="ml-3">{item.title}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
