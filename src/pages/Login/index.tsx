import Button from "@/components/Button";
import Input from "@/components/Input";
import Logo from "@/assets/Logo/LogoHMIF.png";
import { useState } from "react";
import { postLogin } from "@/service/Login";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", username);
      formData.append("password", password);

      const response = await postLogin(formData);

      sessionStorage.setItem("token", response.data.access_token);
      sessionStorage.setItem("nama", response.data.user.nama);
      
      Swal.fire({
        icon: "success",
        title: "Login Berhasil!!",
        showConfirmButton: true,
        customClass: {
          popup: "custom-popup",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard");
        }
      });
    } catch (err: any) { // Tambahkan tipe 'any' atau 'unknown' di sini
      console.error("Gagal Login, Error dari server:", err);
      
      // Menangkap pesan error dari backend (opsional: ubah ke lowercase agar mudah dicek)
      const errorMessage = err.response?.data?.message?.toLowerCase() || "";

      // Cek apakah pesan error dari backend mengandung kata "aktif" atau "status"
      // (Sesuaikan kata kunci ini dengan apa yang dikirim oleh backend kamu)
      if (errorMessage.includes("aktif") || errorMessage.includes("belum aktif")) {
        // Tampilkan Popup Khusus Belum Aktif
        Swal.fire({
          icon: "warning", // Pake warning biar beda sama salah password
          title: "Akun Belum Aktif!",
          text: "Status keanggotaan Anda belum aktif. Silakan hubungi Kadiv terkait.",
          customClass: {
            popup: "custom-popup",
          },
        });
      } else {
        // Tampilkan Popup Default (Kemungkinan salah email/password)
        Swal.fire({
          icon: "error",
          title: "Login Gagal!!",
          text: err.response?.data?.message || "Email atau password salah, silakan coba lagi.",
          customClass: {
            popup: "custom-popup",
          },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen animate-slide-in">
      <div className="p-6 border border-gold rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center">
          <img src={Logo} alt="Logo" className="w-1/2" />
        </div>
        <form onSubmit={handleLogin} className="space-y-5 mt-4">
          <Input
            type="text"
            variant="outlined"
            label="Email"
            className="text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            variant="outlined"
            label="Password"
            className="text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <div className="flex flex-col items-center">
            <Button variant="primary" className="w-full" isLoading={loading}>
              Login
            </Button>
            <a
              href="/register"
              className="text-gold text-sm mt-3 hover:text-gold-dark"
            >
              Tidak Punya Akun? Daftar Sekarang
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;