import { useState, useEffect, useCallback } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { handleError } from "@/utils/errorHandler";
import { storage } from "@/firebase/client";

export const useFetch = (path: string = "") => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchImages = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const storageRef = ref(storage, path);
            const result = await listAll(storageRef);
            const urls = await Promise.all(
                result.items.map((itemRef) => getDownloadURL(itemRef))
            );
            setImages(urls);
        } catch (err) {
            setError(handleError(err));
        } finally {
            setLoading(false);
        }
    }, [path]);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    return { images, loading, error, fetchImages };
};
