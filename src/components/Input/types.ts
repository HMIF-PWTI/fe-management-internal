import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'outlined';
  multiline?: boolean; // Tambahan untuk mendukung textarea
  rows?: number;       // Jumlah baris jika multiline
}

