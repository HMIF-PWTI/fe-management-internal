import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdDashboard, MdPeople, MdWork } from "react-icons/md";
import { FiActivity } from "react-icons/fi";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard", icon: <MdDashboard />, path: "/" },
    { title: "Jabatan", icon: <MdWork />, path: "/jabatan" },
    { title: "Divisi", icon: <MdPeople />, path: "/divisi" },
    { title: "Jenis Kegiatan", icon: <FiActivity />, path: "/jeniskegiatan" },
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
