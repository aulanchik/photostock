import { FC } from 'react';
import styles from '@/styles/footer.module.scss';

const Footer: FC = (): JSX.Element => {
    return (
        <footer className={styles.footer}>
            <p className={styles.footerText}>
                Demo by Artyom Ulanchik
            </p>
            <p className={styles.footerText}>
                <a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    Powered by Firebase
                </a>
            </p>
        </footer>
    );
};

export default Footer;
