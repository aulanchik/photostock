import { FC } from 'react';
import styles from '@/styles/header.module.scss';

const Header: FC = (): JSX.Element => {
    return (
        <header className={styles.header}>
            <h1 className="text-2xl font-bold">Photos</h1>
        </header>
    );
}

export default Header;
