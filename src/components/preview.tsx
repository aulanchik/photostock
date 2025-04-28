import { FC } from "react";
import { motion } from "motion/react";
import styles from "@/styles/preview.module.scss";

interface PreviewProps {
    imageUrl: string;
    onClose: () => void;
}

const Preview: FC<PreviewProps> = ({ imageUrl, onClose }) => {
    return (
        <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className={styles.previewContainer}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                <div className={styles.aspectRatioContainer}>
                    <img src={imageUrl} alt="Preview" className={styles.image} />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Preview;
