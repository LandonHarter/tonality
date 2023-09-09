'use client'

import { useContext, useEffect, useState } from 'react';
import styles from './home.module.css';
import UserContext from '@/context/UserContext';
import { recommendLessons } from '@/backend/recommend';
import { getLesson } from '@/backend/lessons';

export default function Recommended() {
    const { user } = useContext(UserContext);
    const [recommended, setRecommended] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            (async () => {
                const getLessons = await recommendLessons(user, 3);
                const recommendedLesson = [];
                for (const lesson of getLessons) {
                    const lessonData = await getLesson(lesson);
                    recommendedLesson.push(lessonData);
                }

                setRecommended(recommendedLesson);
            })();
        }
    }, [user]);

    if (!user) return <></>;
    return (
        <>
            {recommended.length === 0 ? (
                <div className={styles.recommended_empty}>
                    <h1>Complete more lessons to get recommendations!</h1>
                </div>
            ) :
                <div>
                    {recommended.map((lesson: any, index: number) => (
                        <div className={styles.lesson} key={index}>
                            {lesson.title}
                        </div>
                    ))}
                </div>
            }
        </>
    );
}