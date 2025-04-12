import { useEffect, useRef } from "react";
import { DateTimePickerProps } from "./types";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const DateTimePicker = ({
  label,
  error,
  helperText,
  variant = "default",
  className = "",
  onChangeFormatted,
  defaultValue,
  enableTime = true,
  ...props
}: DateTimePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const fp = flatpickr(inputRef.current, {
      enableTime,
      dateFormat: enableTime ? "Y-m-d H:i" : "Y-m-d",
      defaultDate: defaultValue,
      onChange: (selectedDates) => {
        const date = selectedDates[0];
        if (!date) return;

        const twoDigit = (n: number) => n.toString().padStart(2, "0");
        const year = date.getFullYear();
        const month = twoDigit(date.getMonth() + 1);
        const day = twoDigit(date.getDate());

        let formatted = `${year}-${month}-${day}`;

        if (enableTime) {
          const hour = twoDigit(date.getHours());
          const minute = twoDigit(date.getMinutes());
          formatted += ` ${hour}:${minute}:00`;
        }

        onChangeFormatted(formatted);
      },
    });

    return () => fp.destroy();
  }, [onChangeFormatted, defaultValue, enableTime]);

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="mb-2 text-lg font-medium text-text-secondary">
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        className={`border rounded-lg bg-transparent p-2 ${
          variant === "outlined" ? "border-gold" : "border-dark-tertiary"
        } ${error ? "border-red-500" : ""} focus:outline-none`}
        {...props}
      />

      {helperText && (
        <span className="text-xs text-gray-500">{helperText}</span>
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default DateTimePicker;
