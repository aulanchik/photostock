import React, { useState, useImperativeHandle } from "react";
import { useFetchFirebase } from "@/hooks/useFetchFirebase";
import { Preview } from "@/components";
import { motion } from "framer-motion";
import "./Grid.scss";

const Grid = React.forwardRef((props, ref): JSX.Element => {
  const { images, loading, fetchImages } = useFetchFirebase();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    fetchImages,
  }));

  const renderImages = () =>
    images.map((url: string, index: number) => (
      <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid__thumbnail"
        whileHover={{ opacity: 0.9, scale: 1.05 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
        onClick={() => setSelectedImage(url)}
      >
        <img src={url} alt={`Uploaded ${index}`} />
      </motion.div>
    ));

  return (
    <>
      {loading && <div className="grid__loading">Loading images...</div>}
      <div className="grid">{renderImages()}</div>
      {selectedImage && (
        <Preview
          selectedImage={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
});

export default Grid;
