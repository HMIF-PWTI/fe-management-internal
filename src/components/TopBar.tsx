import { useState, useRef, useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { MdPerson } from "react-icons/md";
import Button from "./Button";
import { AiOutlineLogout } from "react-icons/ai";

const TopBar = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getPageTitle = () => {
    if (location.pathname === "/") return "Dashboard";
    if (location.pathname === "/jabatan") return "Jabatan";
    if (location.pathname === "/jabatan/create") return "Buat Jabatan";
    if (matchPath("/jabatan/update/:id", location.pathname)) {
      return "Ubah Jabatan";
    }
    if (location.pathname === "/divisi") return "Divisi";
    if (location.pathname === "/divisi/create") return "Buat Divisi";
    if (matchPath("/divisi/update/:id", location.pathname)) {
      return "Ubah Divisi";
    }
    
    return "Page Not Found";
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between p-4 border-b border-dark-tertiary bg-dark-primary relative">
      <h1 className="text-xl font-semibold text-gold">{getPageTitle()}</h1>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="p-2 text-xl rounded-full w-10 h-10 flex items-center justify-center border-2 border-gold text-gold hover:bg-gold hover:text-white transition-colors"
        >
          <MdPerson />
        </button>
        {showDropdown && (
          <div className="animate-slide-in absolute p-3 rounded-lg bg-dark-secondary right-0 mt-4 w-52 space-y-5 z-50">
            <h1>Hello Admin</h1>
            <Button
              variant="outline"
              icon={<AiOutlineLogout className="text-lg" />}
              iconPosition="right"
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
