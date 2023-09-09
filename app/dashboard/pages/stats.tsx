'use client'

import { useContext } from 'react';
import styles from './home.module.css';
import UserContext from '@/context/UserContext';

export default function Stats() {
    const { user } = useContext(UserContext);

    if (!user) return <></>;
    return (
        <>
            <div className={styles.stat}>
                <h1 className={styles.stat_number}>{user.lessonsCompleted.length}</h1>
                <p className={styles.stat_metric}>Lessons Completed</p>
            </div>
            <div className={styles.stat}>
                <h1 className={styles.stat_number}>0</h1>
                <p className={styles.stat_metric}>Correct Answers</p>
            </div>
        </>
    );
}