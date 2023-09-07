'use client'

import { db } from "@/backend/firebase";
import Loading from "@/components/loading/loading";
import RequireSignIn from "@/components/require/signin";
import { collection, doc, getDoc } from "firebase/firestore";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";

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
            <h1>{lesson.title}</h1>
        </RequireSignIn>
    );
}