import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "./firebase";

const lessonsCache: { [key: string]: any } = {};
export async function getLesson(id: string) {
    if (lessonsCache[id]) {
        return lessonsCache[id];
    }
    const lessonRef = doc(collection(db, 'lessons'), id);
    const lessonSnapshot = await getDoc(lessonRef);
    const lesson = lessonSnapshot.data();
    lessonsCache[id] = lesson;
    return lesson;
}

export const pushLessonToCache = (id: string, lesson: any) => {
    lessonsCache[id] = lesson;
}

export async function getLessonsByTag(tag: string, numLessons: number) {
    const lessonsQuery = query(collection(db, 'lessons'), where('tags', 'array-contains', tag), limit(numLessons));
    const lessonsSnapshot = await getDocs(lessonsQuery);
    const lessons: any[] = [];
    lessonsSnapshot.forEach((lesson) => {
        lessons.push({
            id: lesson.id,
            ...lesson.data()
        });
    });

    return lessons;
}