'use client'

import { useContext, useEffect, useState } from 'react';
import styles from './home.module.css';
import UserContext from '@/context/UserContext';
import { recommendLessons } from '@/backend/recommend';
import Link from 'next/link';
import Image from 'next/image';

export default function Recommended() {
    const { user } = useContext(UserContext);
    const [recommended, setRecommended] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            (async () => {
                setRecommended(await recommendLessons(user, 3));
                setLoading(false);
            })();
        }
    }, [user]);

    if (!user || loading) return <></>;
    return (
        <>
            {recommended.length === 0 ? (
                <div className={styles.recommended_empty}>
                    <h1>Complete more lessons to get recommendations!</h1>
                </div>
            ) :
                <div>
                    {recommended.map((lesson: any, index: number) => (
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
                            </div>
                        </Link>
                    ))}
                </div>
            }
        </>
    );
}