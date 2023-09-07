import { collection, doc, getDoc } from "firebase/firestore";
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