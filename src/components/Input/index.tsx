import { InputProps } from "./types";

const Input = ({
  label,
  error,
  helperText,
  variant = "default",
  className = "",
  ...props
}: InputProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="mb-2 text-lg font-medium text-text-secondary">
          {label}
        </label>
      )}
      <input
        className={`border rounded-lg bg-transparent p-2 ${
          variant === "outlined" ? "border-gold" : "border-dark-tertiary"
        } ${error ? "border-red-500" : ""} focus:outline-none `}
        {...props}
      />
      {helperText && (
        <span className="text-xs text-gray-500">{helperText}</span>
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
