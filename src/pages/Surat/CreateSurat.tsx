import Button from "@/components/Button";
import DateTimePicker from "@/components/DateTimeInput";
import Input from "@/components/Input";
import UploadFile from "@/components/UploadFile";
import { postSurat } from "@/service/Surat";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateSurat = () => {
  const navigate = useNavigate();
  const [nomorSurat, setNomorSurat] = useState("");
  const [jenisSurat, setJenisSurat] = useState("");
  const [tanggalSurat, setTanggalSurat] = useState("");
  const [pengirim, setPengirim] = useState("");
  const [penerima, setPenerima] = useState("");
  const [perihalSurat, setPerihalSurat] = useState("");
  const [fileSurat, setFileSurat] = useState<File | null>(null);
  const [pembuat, setPembuat] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nomor_surat", nomorSurat);
      formData.append("jenis_surat", jenisSurat);
      formData.append("tanggal_surat", tanggalSurat);
      formData.append("pengirim", pengirim);
      formData.append("penerima", penerima);
      formData.append("perihal_surat", perihalSurat);
      formData.append("pembuat", pembuat);

      if (fileSurat) {
        formData.append("file_surat", fileSurat);
      }

      await postSurat(formData);
      Swal.fire({
        icon: "success",
        title: "Surat berhasil ditambahkan!",
        showConfirmButton: true,
        customClass: {
          popup: "custom-popup",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(-1);
        }
      });
      setFileSurat(null);
      setJenisSurat("");
      setNomorSurat("");
      setPembuat("");
      setPenerima("");
      setPengirim("");
      setPerihalSurat("");
      setTanggalSurat("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan Surat",
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
    <div className="animate-slide-in p-3 space-y-10">
      <div className="flex justify-end">
        <Button
          variant="outline"
          icon={<FaArrowLeft />}
          onClick={() => navigate(-1)}
        >
          Kembali
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5 w-1/4">
        <Input
          label="Nomor Surat"
          type="text"
          placeholder="Masukkan Nomor Surat"
          variant="outlined"
          value={nomorSurat}
          onChange={(e) => setNomorSurat(e.target.value)}
        />
        <Input
          label="Jenis Surat"
          type="text"
          placeholder="Masukkan Jenis Surat"
          variant="outlined"
          value={jenisSurat}
          onChange={(e) => setJenisSurat(e.target.value)}
        />
        <DateTimePicker
          onChangeFormatted={setTanggalSurat}
          variant="outlined"
          label="Tanggal Surat"
          value={tanggalSurat}
          enableTime={false}
          placeholder="Masukkan Tanggal Surat"
        />
        <Input
          label="Nama Pengirim"
          type="text"
          placeholder="Masukkan Nama Pengirim"
          variant="outlined"
          value={pengirim}
          onChange={(e) => setPengirim(e.target.value)}
        />
        <Input
          label="Nama Penerima"
          type="text"
          placeholder="Masukkan Nama Penerima"
          variant="outlined"
          value={penerima}
          onChange={(e) => setPenerima(e.target.value)}
        />
        <Input
          label="Perihal Surat"
          type="text"
          placeholder="Masukkan Perihal Surat"
          variant="outlined"
          value={perihalSurat}
          onChange={(e) => setPerihalSurat(e.target.value)}
        />
        <UploadFile
          label="Upload Surat"
          onChange={setFileSurat}
          variant="outlined"
          helperText={fileSurat ? `File dipilih: ${fileSurat.name}` : undefined}
        />

        <Input
          label="Nama Pembuat Surat"
          type="text"
          placeholder="Masukkan Nama Pembuat Surat"
          variant="outlined"
          value={pembuat}
          onChange={(e) => setPembuat(e.target.value)}
        />
        <Button
          type="submit"
          variant="outline"
          icon={<IoAddOutline className="text-xl" />}
          disabled={loading}
          isLoading={loading}
        >
          Buat Surat
        </Button>
      </form>
    </div>
  );
};

export default CreateSurat;
