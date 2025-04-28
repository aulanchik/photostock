import { FC, useState } from "react";
import Preview from '@/components/preview';
import styles from "@/styles/grid.module.scss";

interface GridProps {
    images: string[];
    loading: boolean;
    error: string | null;
}

const Grid: FC<GridProps> = ({ images, loading, error }) => {

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (loading) return <p className={styles.loader}>Loading...</p>;
    if (error) return <p className={styles.error}>Error: {error}</p>;

    return (
        <>
            <div className={styles.grid}>
                {images.map((url, index) => (
                    <div
                        key={index}
                        className={styles.imageContainer}
                        onClick={() => setSelectedImage(url)}
                    >
                        <img src={url} alt={`Image ${index}`} className={styles.image} />
                    </div>
                ))}
            </div>
            {selectedImage && (
                <Preview imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
            )}
        </>
    );
};

export default Grid;
