import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import "./Preview.scss";

interface PreviewProps {
  selectedImage: string | null;
  onClose: () => void;
}

const Preview: React.FC<PreviewProps> = ({
  selectedImage,
  onClose,
}): JSX.Element => {
  return (
    <motion.div
      className="preview__overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      onClick={onClose}
    >
      <button className="preview__close" onClick={onClose}>
        <AiOutlineClose size={24} />
      </button>
      <div className="preview__content" onClick={(e) => e.stopPropagation()}>
        <img src={selectedImage!} alt="image" />
      </div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="preview__link"
        href={selectedImage!}
      >
        View Original
      </a>
    </motion.div>
  );
};

export default Preview;
