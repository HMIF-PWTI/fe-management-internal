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
        title: "Login Berhasi!!",
        showConfirmButton: true,
        customClass: {
          popup: "custom-popup",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard");
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal!!",
        text: "Silakan coba lagi.",
        customClass: {
          popup: "custom-popup",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen animate-slide-in">
      <div className="p-6 border border-gold rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center">
          <img src={Logo} alt="" className="w-1/2" />
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
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
