import { useRef, useState } from "react";

interface UploadFileProps {
  label?: string;
  onChange: (file: File | null) => void;
  error?: string;
  helperText?: string;
  variant?: "default" | "outlined";
  className?: string;
  defaultFileName?: string;
}

const UploadFile = ({
  label,
  onChange,
  error,
  helperText,
  variant = "default",
  className = "",
  defaultFileName,
}: UploadFileProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file?.name || "");
    onChange(file);
  };

  const triggerInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label className="mb-2 text-lg font-medium text-text-secondary">
          {label}
        </label>
      )}

      <div
        onClick={triggerInput}
        className={`w-full rounded-lg bg-transparent p-2 border text-text-secondary cursor-pointer
          ${variant === "outlined" ? "border-gold" : "border-dark-tertiary"}
          ${error ? "border-red-500" : ""}
          hover:bg-dark-secondary focus:outline-none
        `}
      >
        {fileName || defaultFileName || "Pilih file..."}
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      {helperText && (
        <span className="text-xs text-gray-500 mt-1">{helperText}</span>
      )}
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
};

export default UploadFile;
