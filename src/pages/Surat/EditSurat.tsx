import Button from "@/components/Button";
import DateTimePicker from "@/components/DateTimeInput";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import UploadFile from "@/components/UploadFile";
import { getSuratById, putSurat } from "@/service/Surat";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditSurat = () => {
  const navigate = useNavigate();
  const [nomorSurat, setNomorSurat] = useState("");
  const [jenisSurat, setJenisSurat] = useState("");
  const [tanggalSurat, setTanggalSurat] = useState("");
  const [pengirim, setPengirim] = useState("");
  const [penerima, setPenerima] = useState("");
  const [perihalSurat, setPerihalSurat] = useState("");
  const [fileSurat, setFileSurat] = useState<File | string | null>(null);
  const [pembuat, setPembuat] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    const fetchSurat = async () => {
      if (!id) return;
      try {
        setIsLoadingData(true);
        const dataBeforeRes = await getSuratById(Number(id));
        setFileSurat(dataBeforeRes.data.payload.file_surat);
        setNomorSurat(dataBeforeRes.data.payload.nomor_surat);
        setJenisSurat(dataBeforeRes.data.payload.jenis_surat);
        setTanggalSurat(dataBeforeRes.data.payload.tanggal_surat);
        setPengirim(dataBeforeRes.data.payload.pengirim);
        setPenerima(dataBeforeRes.data.payload.penerima);
        setPerihalSurat(dataBeforeRes.data.payload.perihal_surat);
        setPembuat(dataBeforeRes.data.payload.pembuat);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Gagal mengambil data",
          text: "Data surat tidak ditemukan.",
        });
        navigate("/surat");
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchSurat();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    if (!id) return;
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

      await putSurat(formData, Number(id));
      Swal.fire({
        icon: "success",
        title: "Surat berhasil diubah!",
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
        title: "Gagal mengubah Surat",
        text: "Silakan coba lagi.",
        customClass: {
          popup: "custom-popup",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingData) {
    return <Loading />;
  }

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
          defaultFileName={
            typeof fileSurat === "string"
              ? fileSurat.split("/").pop()
              : fileSurat instanceof File
              ? fileSurat.name
              : undefined
          }
        />

        {typeof fileSurat === "string" && (
          <a
            href={`http://127.0.0.1:8000/api/storage/${fileSurat}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-500 underline mt-1 block"
          >
            Lihat File Lama
          </a>
        )}

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

export default EditSurat;
