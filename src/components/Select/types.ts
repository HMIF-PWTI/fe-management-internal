import { SelectHTMLAttributes } from "react";

export interface Option {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'outlined';
  options: Option[];
  value?: string;
}
