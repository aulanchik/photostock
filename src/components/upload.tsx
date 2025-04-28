import { FC, useState } from "react";
import { useUpload } from "@/hooks/useUpload";
import styles from "@/styles/upload.module.scss";

interface UploadDialogProps {
    onUploadComplete: () => void;
}

const UploadDialog: FC<UploadDialogProps> = ({ onUploadComplete }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { uploadFile, progress, isUploading } = useUpload("images");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            await uploadFile(selectedFile, () => {
                setIsDialogOpen(false);
                onUploadComplete();
            });
        }
    };

    return (
        <div className={styles.uploadContainer}>
            <button
                className={styles.uploadButton}
                onClick={() => setIsDialogOpen(true)}
                disabled={isUploading}
            >
                +
            </button>

            {isDialogOpen && (
                <div className={styles.dialog}>
                    <div className={styles.dialogContent}>
                        <h3>Select an Image to Upload</h3>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={isUploading}
                        />
                        <div className={styles.dialogActions}>
                            <button
                                className={styles.cancelButton}
                                onClick={() => setIsDialogOpen(false)}
                                disabled={isUploading}
                            >
                                Cancel
                            </button>
                            <button
                                className={styles.uploadButton}
                                onClick={handleUpload}
                                disabled={!selectedFile || isUploading}
                            >
                                {isUploading ? `Uploading... ${progress.toFixed(0)}%` : "Select"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadDialog;
