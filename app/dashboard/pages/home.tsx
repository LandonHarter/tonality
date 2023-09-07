import Image from 'next/image';
import styles from './home.module.css';

export default function Home() {
    return (
        <div>
            <div className={styles.top}>
                <Image src="/images/icons/home.png" alt='home' width={40} height={40} />
                <h1>Home</h1>
            </div>
            <div className={styles.content}>
                <div className={styles.progress}>
                    <h3>You have no unfinished lessons</h3>
                </div>
                <div className={styles.double}>
                    <div className={styles.stats}>
                        <h1 className={styles.stats_title}>Stats</h1>
                        <p className={styles.stats_subtitle}>All-time</p>

                        <div className={styles.stats_content}>
                            <div className={styles.stat}>
                                <h1 className={styles.stat_number}>0</h1>
                                <p className={styles.stat_metric}>Lessons Completed</p>
                            </div>
                            <div className={styles.stat}>
                                <h1 className={styles.stat_number}>0</h1>
                                <p className={styles.stat_metric}>Minutes Studied</p>
                            </div>
                            <div className={styles.stat}>
                                <h1 className={styles.stat_number}>0</h1>
                                <p className={styles.stat_metric}>Correct Answers</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.recommended}>
                        <h1 className={styles.recommended_title}>Recommended Lessons</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}