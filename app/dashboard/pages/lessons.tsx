import Image from 'next/image';
import styles from './lessons.module.css';
import LessonsContent from './lessonscontent';

export default function Lessons() {
    return (
        <div>
            <div className={styles.top}>
                <Image src="/images/icons/lesson.png" alt='home' width={40} height={40} />
                <h1>Lessons</h1>
            </div>
            <div className={styles.search}>
                <input type="text" placeholder="Search for lessons" className={styles.search_input} />
                <button className={styles.submit_search}>
                    <Image src="/images/icons/search.png" alt='search' width={30} height={30} />
                </button>
            </div>

            <div className={styles.lessons}>
                <LessonsContent />
            </div>
        </div>
    );
}