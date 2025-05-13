import { useState } from "react";
import { InputProps } from "./types";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  label,
  error,
  helperText,
  variant = "default",
  className = "",
  type = "text",
  multiline = false,
  rows = 4,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const commonClasses = `border rounded-lg bg-transparent p-2 pr-10 ${
    variant === "outlined" ? "border-gold" : "border-dark-tertiary"
  } ${error ? "border-red-500" : ""} focus:outline-none`;

  return (
    <div className={`flex flex-col relative ${className}`}>
      {label && (
        <label className="mb-2 text-lg font-medium text-text-secondary">
          {label}
        </label>
      )}

      {multiline ? (
        <textarea
          className={`${commonClasses} resize-none`}
          rows={rows}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <>
          <input
            className={commonClasses}
            type={isPassword && !showPassword ? "password" : "text"}
            {...props}
          />
          {isPassword && (
            <div
              className="absolute right-3 top-5 h-full flex items-center cursor-pointer text-text-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </div>
          )}
        </>
      )}

      {helperText && (
        <span className="text-xs text-gray-500">{helperText}</span>
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
