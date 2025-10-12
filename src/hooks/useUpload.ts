import { useState, useCallback } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { handleError } from "@/utils/errorHandler";
import { storage } from "@/firebase/client";

export const useUpload = (path: string = "") => {
    const [progress, setProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const [uploadTask, setUploadTask] = useState<any>(null);

    const uploadFile = useCallback(
        async (file: File, onUploadComplete?: (url: string) => void) => {
            setIsUploading(true);
            setUploadedUrl(null);
            setError(null);

            try {
                const storageRef = ref(storage, `${path}/${file.name}`);
                const task = uploadBytesResumable(storageRef, file);
                setUploadTask(task);

                task.on(
                    "state_changed",
                    (snapshot) => {
                        const currentProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setProgress(currentProgress);
                    },
                    (uploadError) => {
                        setError(handleError(uploadError));
                        setIsUploading(false);
                    },
                    async () => {
                        const downloadUrl = await getDownloadURL(task.snapshot.ref);
                        setUploadedUrl(downloadUrl);
                        setIsUploading(false);
                        setProgress(0);

                        if (onUploadComplete) {
                            onUploadComplete(downloadUrl);
                        }
                    }
                );
            } catch (err) {
                setError(handleError(err));
                setIsUploading(false);
            }
        },
        [path]
    );

    return { progress, error, uploadFile, isUploading, uploadedUrl, uploadTask };
};
