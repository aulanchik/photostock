import { useState, useEffect, useImperativeHandle, forwardRef, useCallback } from "react";
import { useFetch } from "@/hooks/useFetch";
import { Preview } from "@/components";
import { motion } from "framer-motion";
import "./Grid.scss";

export interface GridHandle {
  fetchImages: () => void;
}

const Grid = forwardRef<GridHandle, {}>((_, ref) => {
  const { images, loading, fetchImages } = useFetch();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const stableFetchImages = useCallback(() => {
    fetchImages();
  }, [fetchImages]);

  useImperativeHandle(ref, () => ({
    fetchImages: stableFetchImages,
  }));

  useEffect(() => {
    stableFetchImages();
  }, []);

  const renderImages = () =>
    images.map((url: string, index: number) => (
      <motion.div
        key={url}
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

Grid.displayName = "Grid";

export default Grid;
