import { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";

export const useFetchFirebase = (path: string = "") => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    setLoading(true);
    const storageRef = ref(storage, path);
    const result = await listAll(storageRef);

    const imagesPromise = result.items.map((itemRef) => {
      const url = getDownloadURL(itemRef);
      return url;
    });

    const urls = await Promise.allSettled(imagesPromise);

    const validUrls: Array<string> = urls
      .filter((result) => result.status === "fulfilled")
      .map((result) => (result as PromiseFulfilledResult<string>).value);

    setImages(validUrls);
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return { images, loading, fetchImages };
};
