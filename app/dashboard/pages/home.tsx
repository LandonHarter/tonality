import Image from 'next/image';
import styles from './home.module.css';
import FinishedLessons from './finishedlessons';
import Stats from './stats';
import Recommended from './recommend';

export default function Home() {
    return (
        <div>
            <div className={styles.top}>
                <Image src="/images/icons/home.png" alt='home' width={40} height={40} />
                <h1>Home</h1>
            </div>
            <div className={styles.content}>
                <div className={styles.progress}>
                    <FinishedLessons />
                </div>
                <div className={styles.double}>
                    <div className={styles.stats}>
                        <h1 className={styles.stats_title}>Stats</h1>
                        <p className={styles.stats_subtitle}>All-time</p>

                        <div className={styles.stats_content}>
                            <Stats />
                        </div>
                    </div>
                    <div className={styles.recommended}>
                        <h1>Recommended Lessons</h1>
                        <Recommended />
                    </div>
                </div>
            </div>
        </div>
    );
}