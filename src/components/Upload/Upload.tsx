import { FC, useState, useRef, ChangeEvent } from "react";
import { useUploadFirebase } from "@/hooks/useUploadFirebase";
import { MdUploadFile } from "react-icons/md";
import { motion } from "framer-motion";
import "./Upload.scss";

interface ImageUploadProps {
  onUploadComplete: () => void;
}

const Upload: FC<ImageUploadProps> = ({ onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const { uploadFile, progress, error } = useUploadFirebase(onUploadComplete);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedFileTypes = Array.of("image/jpeg", "image/jpg", "image/png");

  const handleUpload = () => {
    if (file) {
      uploadFile(file);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile && allowedFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="upload">
      <div className="upload__wrapper">
        <input
          id="files"
          type="file"
          ref={fileInputRef}
          className="upload__input"
          onChange={handleFileChange}
          accept={allowedFileTypes.toString()}
        />
        <button
          className="upload__button"
          onClick={handleUpload}
          disabled={!file}
        >
          <MdUploadFile size={24} />
        </button>
      </div>
      {progress > 0 && progress < 100 && (
        <div className="upload__progress">
          <motion.div
            className="upload__progress__inner"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {error && <div className="upload__error">{error}</div>}
    </div>
  );
};

export default Upload;
