import Image from 'next/image';
import styles from './collection.module.css';

export default function Collections() {
    return (
        <>
            <div className={styles.top}>
                <Image src="/images/icons/collection.png" alt='home' width={32} height={32} />
                <h1>Collections</h1>
            </div>
        </>
    );
}