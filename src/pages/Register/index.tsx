import Button from "@/components/Button";
import DateTimePicker from "@/components/DateTimeInput";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { getDivisi } from "@/service/Divisi";
import { postRegister } from "@/service/Register";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [divisi, setDivisi] = useState("");

  const [divisiOptions, setDivisiOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const divisiRes = await getDivisi();
        const divisiOptions = divisiRes.data.payload.map((item: any) => ({
          label: item.singkatan,
          value: item.id.toString(),
        }));
        setDivisiOptions(divisiOptions);
      } catch (error) {
        console.error("Gagal ambil data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", passwordConfirm);
      formData.append("tanggal_lahir", tanggalLahir);
      formData.append("alamat", alamat);
      formData.append("id_divisi", divisi);

      const response = await postRegister(formData);
      Swal.fire({
        icon: "success",
        text: response.data.message,
        showConfirmButton: true,
        customClass: {
          popup: "custom-popup",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal!!",
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
      <div className="p-6 border border-gold rounded-xl shadow-lg w-full max-w-4xl">
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex items-center justify-center">
            <h1 className="text-4xl text-white font-medium">Daftar</h1>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <Input
              type="text"
              variant="outlined"
              label="Nama Lengkap"
              className="text-white"
              value={nama}
              required
              onChange={(e) => setNama(e.target.value)}
            />
            <Input
              type="text"
              variant="outlined"
              label="Email Unikom"
              className="text-white"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              variant="outlined"
              label="Password"
              className="text-white"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              variant="outlined"
              label="Konfirmasi Password"
              className="text-white"
              value={passwordConfirm}
              required
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <DateTimePicker
              label="Tanggal Lahir"
              variant="outlined"
              className="text-white"
              onChangeFormatted={setTanggalLahir}
              value={tanggalLahir}
              required
              enableTime={false}
            />
            <Input
              type="text"
              variant="outlined"
              label="Alamat"
              className="text-white"
              value={alamat}
              required
              onChange={(e) => setAlamat(e.target.value)}
            />
            <Select
              label="Divisi"
              variant="outlined"
              options={divisiOptions}
              value={divisi}
              required
              onChange={(e) => setDivisi(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center">
            <Button variant="primary" className="w-full" isLoading={loading}>
              Daftar!
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
