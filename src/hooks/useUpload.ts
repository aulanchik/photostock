import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";

export const useUpload = (
  onUploadComplete: () => void,
  path: string = "",
) => {
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    const storageRef = ref(storage, `${path}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setIsUploading(true);
        const currentProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(currentProgress);
      },
      (error) => {
        setError(error.message);
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(() => {
          setProgress(0);
          setIsUploading(false);
          onUploadComplete();
        });
      },
    );
  };

  return { progress, error, uploadFile, isUploading };
};
