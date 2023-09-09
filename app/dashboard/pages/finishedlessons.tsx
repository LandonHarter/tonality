'use client'

import { useContext, useEffect, useState } from 'react';
import styles from './home.module.css';
import UserContext from '@/context/UserContext';
import { getLesson } from '@/backend/lessons';
import Image from 'next/image';
import Link from 'next/link';

export default function FinishedLessons() {
    const [finishedLessons, setFinishedLessons] = useState<any[]>([]);
    const user = useContext(UserContext);

    async function getFinishedLessons() {
        if (!user) return;

        const finishedLessonIds = user.lessonsCompleted;
        const finishedLessonsArr = await Promise.all(finishedLessonIds.map(async (lessonId: string) => {
            const lesson = await getLesson(lessonId);
            return {
                id: lessonId,
                ...lesson
            };
        }));

        setFinishedLessons(finishedLessonsArr);
    }

    useEffect(() => {
        if (user) {
            getFinishedLessons();
        }
    }, [user]);

    return (
        <>
            {finishedLessons.length === 0 ?
                <h3>You haven&apos;t finished any lessons</h3> :
                <div className={styles.lessons}>
                    {finishedLessons.map((lesson: any, index: number) => (
                        <Link key={index} href={`/lesson/${lesson.id}`} style={{ textDecoration: 'none' }}>
                            <div className={styles.lesson}>
                                <div style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <Image src={lesson.image} alt={lesson.title} width={160} height={90} className={styles.lesson_image} />
                                    <div className={styles.lesson_text}>
                                        <h1>{lesson.title}</h1>
                                        <p>{lesson.description}</p>
                                    </div>
                                </div>

                                <Image src='/images/icons/check.png' alt='checkmark' width={40} height={40} className={styles.checkmark} />
                            </div>
                        </Link>
                    ))}
                </div>
            }
        </>
    )
}