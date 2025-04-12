export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const day = days[date.getUTCDay()];
  const dayOfMonth = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day}, ${dayOfMonth} ${month} ${year}`;
}

export function formatDateTime(input: string): string {
  if (!input) return "-";

  try {
    const [datePart, timePart] = input.split(" ");
    const [yearStr, monthStr, dayStr] = datePart.split("-");
    const [hourStr, minuteStr] = timePart.split(":");

    let year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    if (year < 100) {
      year += 2000;
    }

    const date = new Date(year, month - 1, day, hour, minute);

    const hariIndonesia = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const bulanIndonesia = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const namaHari = hariIndonesia[date.getDay()];
    const namaBulan = bulanIndonesia[date.getMonth()];
    const tanggal = date.getDate();
    const jam = date.getHours();
    const menit = date.getMinutes().toString().padStart(2, "0");

    return `${namaHari}, ${tanggal} ${namaBulan} ${year} Jam ${jam}.${menit}`;
  } catch (error) {
    console.error("Gagal mengonversi tanggal:", error);
    return "-";
  }
}
