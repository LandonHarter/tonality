'use client'

import Image from 'next/image';
import styles from './lessons.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { pushLessonToCache } from '@/backend/lessons';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/backend/firebase';
import algoliasearch from 'algoliasearch';

export default function Lessons() {
    const [lessons, setLessons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchClient, setSearchClient] = useState<any>(null);
    const [searchIndex, setSearchIndex] = useState<any>(null);

    async function search(query: string) {
        if (!searchClient || !searchIndex) {
            return;
        }

        setLoading(true);
        const { hits } = await searchIndex.search(query);
        const lessonsData: any[] = [];
        hits.forEach((hit: any) => {
            lessonsData.push({
                id: hit.objectID,
                ...hit
            });
        });

        setLessons(lessonsData);
        setLoading(false);
    }

    useEffect(() => {
        (async () => {
            const lessonsQuery = query(collection(db, 'lessons'));
            const lessonsSnapshot = await getDocs(lessonsQuery);
            const lessonsData: any[] = [];
            lessonsSnapshot.forEach((lesson) => {
                lessonsData.push({
                    id: lesson.id,
                    ...lesson.data()
                });
                pushLessonToCache(lesson.id, lesson.data());
            });

            setLessons(lessonsData);

            const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
            const algoliaSearchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;

            if (!algoliaAppId || !algoliaSearchKey) {
                console.error('Algolia app ID or search key not found');
                return;
            }

            const algoliaClient = algoliasearch(algoliaAppId, algoliaSearchKey);
            const algoliaIndex = algoliaClient.initIndex('lessons');
            setSearchClient(algoliaClient);
            setSearchIndex(algoliaIndex);

            setLoading(false);
        })();
    }, []);

    return (
        <div>
            <div className={styles.top}>
                <Image src="/images/icons/lesson.png" alt='home' width={40} height={40} />
                <h1>Lessons</h1>
            </div>
            <div className={styles.search}>
                <input type="text" placeholder="Search for lessons" className={styles.search_input} value={searchQuery} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        search(searchQuery);
                    }
                }} onChange={(e) => {
                    setSearchQuery(e.target.value);
                }} />
                <button className={styles.submit_search} onClick={() => {
                    search(searchQuery);
                }}>
                    <Image src="/images/icons/search.png" alt='search' width={30} height={30} />
                </button>
            </div>

            {loading ?
                <div className={styles.loading}>
                    <div className={styles.loader}>
                        <div className={styles.dot}></div>
                        <div className={styles.dot}></div>
                        <div className={styles.dot}></div>
                    </div>
                    <h1 className={styles.loading_title}>Loading...</h1>
                </div> : <div className={styles.lessons}>
                    {lessons.map((lesson) => (
                        <Link href={`/lesson/${lesson.id}`} key={lesson.id} style={{
                            textDecoration: 'none'
                        }}>
                            <div className={styles.lesson}>
                                <Image src={lesson.image} alt={lesson.title} width={500} height={500} className={styles.lesson_image} />
                                <div className={styles.lesson_content}>
                                    <h2>{lesson.title}</h2>
                                    <p>{lesson.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            }
        </div>
    );
}