import { getLesson, getLessonsByTag } from "./lessons";
import { User } from "./types";

export async function recommendLessons(user: User, limit: number = 3): Promise<any[]> {
    const likedTags: { [tag: string]: number } = {};
    for (const lesson of user.lessonsCompleted) {
        const lessonData = await getLesson(lesson);
        for (const tag of lessonData.tags) {
            if (likedTags[tag]) {
                likedTags[tag]++;
            } else {
                likedTags[tag] = 1;
            }
        }
    }
    const sortedTags = Object.keys(likedTags).sort((a, b) => likedTags[b] - likedTags[a]);

    const mostLikedTag = sortedTags[0];
    if (!mostLikedTag) return [];

    return await getLessonsByTag(mostLikedTag, limit);
}