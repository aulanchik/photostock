import { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";

export const useFetch = (path: string = "") => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    const storageRef = ref(storage, path);

    try {
      const result = await listAll(storageRef);
      const imagesPromise = result.items.map((itemRef) => {
        return getDownloadURL(itemRef);

      });
      const urls = await Promise.allSettled(imagesPromise);

      const validUrls: Array<string> = urls
        .filter((result) => result.status === "fulfilled")
        .map((result) => (result as PromiseFulfilledResult<string>).value);

      setImages(validUrls);

    } catch (err) {
      setError("Failed to load images. Please try again later.");
    } finally {
      setLoading(false);

    }

  };

  useEffect(() => {
    fetchImages();

  }, [path]);

  return { images, loading, error, fetchImages };
};
