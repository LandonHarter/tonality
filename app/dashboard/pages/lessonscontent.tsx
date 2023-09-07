'use client'

import { useEffect, useState } from 'react';
import styles from './lessons.module.css';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/backend/firebase';
import Image from 'next/image';
import Link from 'next/link';

export default function LessonsContent() {
    const [lessons, setLessons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const lessonsQuery = query(collection(db, 'lessons'));
            const lessonsSnapshot = await getDocs(lessonsQuery);
            const lessonsData: any[] = [];
            lessonsSnapshot.forEach((lesson) => {
                lessonsData.push({
                    id: lesson.id,
                    ...lesson.data()
                });
            });

            setLessons(lessonsData);
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.loader}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
                <h1 className={styles.loading_title}>Loading...</h1>
            </div>
        );
    }

    return (
        <>
            {lessons.map((lesson) => (
                <Link href={`/lesson/${lesson.id}`} key={lesson.id} style={{
                    textDecoration: 'none'
                }}>
                    <div className={styles.lesson}>
                        <Image src={lesson.image} alt={lesson.title} width={500} height={500} className={styles.lesson_image} />
                        <div className={styles.lesson_content}>
                            <h2>{lesson.title}</h2>
                            <p>{lesson.description}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </>
    );
}