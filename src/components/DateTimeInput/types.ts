import { InputHTMLAttributes } from "react";

export interface DateTimePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "outlined";
  onChangeFormatted: (formatted: string) => void;
  defaultValue?: string;
  enableTime?: boolean;
}

