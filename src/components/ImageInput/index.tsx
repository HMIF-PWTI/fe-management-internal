import React, { useEffect, useRef, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

type ImageInputProps = {
  onImageChange?: (file: File | null) => void;
  label: string;
  previewUrl?: string;
  inputId?: string;
};

const ImageInput: React.FC<ImageInputProps> = ({
  onImageChange,
  label,
  previewUrl,
  inputId,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (previewUrl) {
      setPreview(previewUrl);
    }
  }, [previewUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setError(null);
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      onImageChange?.(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setFileName(null);
    setError(null);
    onImageChange?.(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <label className="mb-2 text-lg font-medium text-text-secondary">
        {label}
      </label>
      <div className="flex items-center space-x-4">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-20 h-20 rounded object-cover border border-gold"
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center bg-transparent text-gold border border-dashed border-gold">
            <span>Image</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          id={inputId || "image-input"}
          onChange={handleFileChange}
        />
        <div className="flex flex-col gap-2">
          <div
            className={`flex items-center justify-between rounded-xl p-2 bg-transparent border ${
              fileName ? "border-green-500" : "border-gold"
            }`}
          >
            <label
              htmlFor={inputId || "image-input"}
              className="px-4 py-2 bg-transparent border border-gold rounded-md shadow-sm text-sm font-medium text-gold hover:bg-gold hover:text-white cursor-pointer"
            >
              Pilih File
            </label>
            {fileName ? (
              <p className="text-sm text-green-500 ml-3">{fileName}</p>
            ) : (
              <p className="text-sm text-gold ml-3">No File Chosen</p>
            )}

            {preview && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-2xl text-red-500 ml-3"
              >
                <IoMdCloseCircleOutline />
              </button>
            )}
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default ImageInput;
