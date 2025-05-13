import { useState, useRef, useEffect } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { MdPerson } from "react-icons/md";
import Button from "./Button";
import { AiOutlineLogout } from "react-icons/ai";
import { getToko } from "@/service/Toko";
import Swal from "sweetalert2";
import { postLogout } from "@/service/Login";

const TopBar = () => {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [namaToko, setNamaToko] = useState("");
  const navigate = useNavigate();
  const nama = sessionStorage.getItem("nama");

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

  const getPageTitle = () => {
    if (location.pathname === "/") return "Dashboard";

    // Jabatan Pages
    if (location.pathname === "/jabatan") return "Jabatan";
    if (location.pathname === "/jabatan/create") return "Buat Jabatan";
    if (matchPath("/jabatan/update/:id", location.pathname)) {
      return "Ubah Jabatan";
    }

    // Divisi Pages
    if (location.pathname === "/divisi") return "Divisi";
    if (location.pathname === "/divisi/create") return "Buat Divisi";
    if (matchPath("/divisi/update/:id", location.pathname)) {
      return "Ubah Divisi";
    }

    // Jenis Kegiatan Pages
    if (location.pathname === "/jeniskegiatan") return "Jenis Kegiatan";
    if (location.pathname === "/jeniskegiatan/create")
      return "Buat Jenis Kegiatan";
    if (matchPath("/jeniskegiatan/update/:id", location.pathname)) {
      return "Ubah Jenis Kegiatan";
    }

    // Kegiatan Pages
    if (location.pathname === "/kegiatan") return "Kegiatan";
    if (location.pathname === "/kegiatan/create") return "Buat Kegiatan";
    if (matchPath("/kegiatan/update/:id", location.pathname)) {
      return "Ubah Kegiatan";
    }
    if (matchPath("/kegiatan/detail/:id", location.pathname)) {
      return "Detail Kegiatan";
    }

    // Jenis Keuangan Pages
    if (location.pathname === "/jeniskeuangan") return "Jenis Keuangan";
    if (location.pathname === "/jeniskeuangan/create")
      return "Buat Jenis Keuangan";
    if (matchPath("/jeniskeuangan/update/:id", location.pathname)) {
      return "Ubah Jenis Keuangan";
    }

    // Keuangan Pages
    if (location.pathname === "/keuangan") return "Keuangan";
    if (location.pathname === "/keuangan/create") return "Buat Keuangan";
    if (matchPath("/keuangan/update/:id", location.pathname)) {
      return "Ubah Keuangan";
    }
    if (matchPath("/keuangan/detail/:id", location.pathname)) {
      return "Detail Keuangan";
    }

    // Barang Pages
    if (location.pathname === "/barang") return "Barang";
    if (location.pathname === "/barang/create") return "Buat Barang";
    if (matchPath("/barang/update/:id", location.pathname)) {
      return "Ubah Barang";
    }
    if (matchPath("/barang/detail/:id", location.pathname)) {
      return "Detail Barang";
    }

    // Toko Pages
    if (location.pathname === "/toko") return namaToko;

    // Absensi Pages
    if (location.pathname === "/absensi") return "Absensi";

    // Surat Pages
    if (location.pathname === "/surat") return "Surat";
    if (location.pathname === "/surat/create") return "Buat Surat";
    if (matchPath("/surat/update/:id", location.pathname)) {
      return "Edit Surat";
    }
    if (matchPath("/surat/detail/:id", location.pathname)) {
      return "Detail Surat";
    }

    // Product Pages
    if (location.pathname === "/product") return "Kelola Produk";
    if (location.pathname === "/product/create") return "Buat Produk";
    if (matchPath("/product/update/:id", location.pathname)) {
      return "Edit Produk";
    }
    if (matchPath("/product/detail/:id", location.pathname)) {
      return "Detail Produk";
    }

    // Keanggotaan Pages
    if (location.pathname === "/cek-kartu") return "Cek Kartu";
    if (matchPath("/cek-kartu/daftar/:id", location.pathname)) {
      return "Daftarkan Anggota";
    }

    // Keanggotaan Pages
    if (location.pathname === "/keanggotaan") return "Keanggotaan";
    if (matchPath("/cek-kartu/daftar/:id", location.pathname)) {
      return "Daftarkan Anggota";
    }

    // Blog Pages
    if (location.pathname === "/blog") return "Blog";
    if (location.pathname === "/blog/create") return "Buat Blog";

    // Info KP Pages
    if (location.pathname === "/infokp") return "Info KP";
    if (location.pathname === "/infokp/create") return "Buat Info KP";
    if (matchPath("/infokp/update/:id", location.pathname)) {
      return "Edit Info KP";
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

  const handleLogout = async () => {
    const confirm = await Swal.fire({
      title: "Konfirmasi Logout",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, keluar",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });

    if (!confirm.isConfirmed) return;

    const token = sessionStorage.getItem("token");

    if (!token) {
      Swal.fire("Oops", "Token tidak ditemukan", "error");
      return;
    }

    try {
      await postLogout(token);
      sessionStorage.clear();

      await Swal.fire({
        icon: "success",
        title: "Logout berhasil!",
        showConfirmButton: true,
        customClass: {
          popup: "custom-popup",
        },
      });

      navigate("/");
    } catch (error) {
      console.error("Logout gagal:", error);
      Swal.fire("Gagal", "Terjadi kesalahan saat logout", "error");
    }
  };

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
            <h1 className="text-center">Hello,</h1>
            <h2 className="text-center">{nama}</h2>
            <Button
              variant="outline"
              icon={<AiOutlineLogout className="text-lg" />}
              iconPosition="right"
              onClick={handleLogout}
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
