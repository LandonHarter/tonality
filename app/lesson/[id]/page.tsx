'use client'

import { db } from "@/backend/firebase";
import Loading from "@/components/loading/loading";
import RequireSignIn from "@/components/require/signin";
import { arrayUnion, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { usePathname } from "next/navigation"
import { useContext, useEffect, useState } from "react";
import styles from './page.module.css';
import Image from "next/image";
import { getLesson } from "@/backend/lessons";
import UserContext from "@/context/UserContext";

export default function Lesson() {
    const id = usePathname().split('/')[2];
    const [lesson, setLesson] = useState<any>({});
    const [completed, setCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const user = useContext(UserContext);

    async function markAsComplete() {
        if (!user) return;
        const userRef = doc(collection(db, 'users'), user.uid);
        await updateDoc(userRef, {
            lessonsCompleted: arrayUnion(id)
        });
    }

    useEffect(() => {
        (async () => {
            const lessonData = await getLesson(id);
            setLesson(lessonData);

            if (user) {
                const finishedLesson = user.lessonsCompleted.find((lesson: any) => lesson.id === id);
                setCompleted(finishedLesson !== undefined);
            }

            setLoading(false);
        })();
    }, []);

    useEffect(() => {
        if (user) {
            const finishedLesson = user.lessonsCompleted.find((lesson: any) => lesson.id === id);
            setCompleted(finishedLesson !== undefined);
        }
    }, [user]);

    if (loading) {
        return (<Loading />);
    }

    return (
        <RequireSignIn>
            <div className={styles.container}>
                <Image src={lesson.image} alt={lesson.title} width={1920} height={1080} className={styles.image} />
                <div style={{
                    marginBottom: '35vh'
                }} />

                <div className={styles.text_content}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: 'calc(100vw - 100px)'
                    }}>
                        <h1 className={styles.title}>{lesson.title}</h1>
                        <button className={`${styles.complete} ${completed && styles.completed}`} disabled={completed} onClick={async () => {
                            setCompleted(true);
                            await markAsComplete();
                        }}>Mark as Complete</button>
                    </div>
                    <p className={styles.description}>{lesson.description}</p>
                </div>
                <iframe width="560" height="315" className={styles.video} src={lesson.video.replace("watch?v=", "embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
        </RequireSignIn>
    );
}