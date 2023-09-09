'use client'

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import styles from './page.module.css';
import Loading from "@/components/loading/loading";
import { doc, getDoc, collection as firebaseCollection } from "firebase/firestore";
import { db } from "@/backend/firebase";
import { getLesson } from "@/backend/lessons";
import Link from "next/link";
import Image from "next/image";

export default function Collection() {
    const id = usePathname().split('/')[2];
    const [loading, setLoading] = useState(true);
    const [collection, setCollection] = useState<any>({});

    useEffect(() => {
        (async () => {
            const collectionRef = doc(firebaseCollection(db, 'collections'), id);
            const collectionSnapshot = await getDoc(collectionRef);
            const collectionData = collectionSnapshot.data();
            if (!collectionData) return;

            const lessons = collectionData.lessons;
            const lessonsData: any[] = [];
            for (let i = 0; i < lessons.length; i++) {
                const lesson = await getLesson(lessons[i]);
                lessonsData.push({
                    id: lessons[i],
                    ...lesson
                });
            }

            setCollection({
                id: collectionSnapshot.id,
                ...collectionData,
                lessons: lessonsData
            });
            setLoading(false);
        })();
    }, []);

    if (loading) return <Loading />;
    return (
        <div style={{
            padding: '20px'
        }}>
            <div className={styles.top}>
                <h1>{collection.title}</h1>
                <p>{collection.description}</p>
            </div>

            <div className={styles.lessons}>
                {collection.lessons.map((lesson: any, index: number) => (
                    <Link href={`/lesson/${lesson.id}`} style={{ textDecoration: 'none' }} key={index}>
                        <div className={styles.lesson}>
                            <Image src={lesson.image} alt={lesson.title} width={160} height={90} />
                            <div className={styles.lesson_details}>
                                <h1>{lesson.title}</h1>
                                <p>{lesson.description === '' ? 'No description' : lesson.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}