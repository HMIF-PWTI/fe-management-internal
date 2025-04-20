import { useRef } from "react";
import { FaCamera } from "react-icons/fa";

interface ImageUploaderProps {
  imageUrl?: string;
  onImageChange: (file: File) => void;
}

const ImageUploader = ({ imageUrl, onImageChange }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  return (
    <div className="relative w-32 h-32">
      <div
        className="w-full h-full rounded-full border-2 border-gold overflow-hidden cursor-pointer"
        onClick={handleImageClick}
      >
        <img
          src={imageUrl || "/default-profile.png"}
          alt="Preview"
          className="object-cover w-full h-full"
        />
      </div>
      <div
        onClick={handleImageClick}
        className="absolute bottom-0 right-0 bg-gold p-1.5 rounded-full cursor-pointer hover:bg-gold-light"
      >
        <FaCamera className="text-white" />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUploader;
