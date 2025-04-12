import { SelectProps } from "./types";

const Select = ({
  label,
  error,
  helperText,
  variant = "default",
  options,
  value,
  className = "",
  ...props
}: SelectProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="mb-2 text-lg font-medium text-text-secondary">
          {label}
        </label>
      )}
      <select
        className={`border rounded-lg bg-transparent p-2 appearance-none
          ${variant === "outlined" ? "border-gold" : "border-dark-tertiary"}
          ${error ? "border-red-500" : ""}
          text-text-primary focus:outline-none`}
        {...props}
      >
        <option value="" disabled hidden>
          -- Pilih --
        </option>
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-dark-primary text-text-primary"
          >
            {opt.label}
          </option>
        ))}
      </select>

      {helperText && (
        <span className="text-xs text-gray-500">{helperText}</span>
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Select;
