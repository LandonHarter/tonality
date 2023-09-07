'use client'

import { db } from "@/backend/firebase";
import Loading from "@/components/loading/loading";
import RequireSignIn from "@/components/require/signin";
import { collection, doc, getDoc } from "firebase/firestore";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
import styles from './page.module.css';
import Image from "next/image";

export default function Lesson() {
    const id = usePathname().split('/')[2];
    const [lesson, setLesson] = useState<any>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const lessonRef = doc(collection(db, 'lessons'), id);
            const lessonSnapshot = await getDoc(lessonRef);
            const lessonData = lessonSnapshot.data();

            setLesson(lessonData);
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (<Loading />);
    }

    return (
        <RequireSignIn>
            <div className={styles.container}>
                <Image src={lesson.image} alt={lesson.title} width={1920} height={1080} className={styles.image} />
                <div style={{
                    marginBottom: '30vh'
                }} />

                <div className={styles.text_content}>
                    <h1 className={styles.title}>{lesson.title}</h1>
                    <p className={styles.description}>{lesson.description}</p>
                </div>
                <iframe width="560" height="315" className={styles.video} src={lesson.video.replace("watch?v=", "embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
        </RequireSignIn>
    );
}