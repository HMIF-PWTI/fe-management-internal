export const formatRupiah = (value: any): string => {
  const numericValue = isNaN(value) || value == null ? 0 : Number(value);
  return "Rp " + numericValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
