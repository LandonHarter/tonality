'use client'

import Image from 'next/image';
import styles from './collection.module.css';
import { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '@/backend/firebase';
import Link from 'next/link';
import algoliasearch from 'algoliasearch';

export default function Collections() {
    const [collections, setCollections] = useState<any[]>([]);
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
        const collectionsData: any[] = [];
        hits.forEach((hit: any) => {
            collectionsData.push({
                id: hit.objectID,
                ...hit
            });
        });

        setCollections(collectionsData);
        setLoading(false);
    }

    useEffect(() => {
        (async () => {
            const collectionsQuery = query(collection(db, 'collections'), limit(15));
            const collectionsSnapshot = await getDocs(collectionsQuery);

            const collectionsData: any[] = [];
            collectionsSnapshot.forEach((collection) => {
                collectionsData.push({
                    id: collection.id,
                    ...collection.data()
                });
            });
            setCollections(collectionsData);

            const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
            const algoliaSearchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;

            if (!algoliaAppId || !algoliaSearchKey) {
                console.error('Algolia app ID or search key not found');
                return;
            }

            const algoliaClient = algoliasearch(algoliaAppId, algoliaSearchKey);
            const algoliaIndex = algoliaClient.initIndex('collections');
            setSearchClient(algoliaClient);
            setSearchIndex(algoliaIndex);

            setLoading(false);
        })();
    }, []);

    return (
        <>
            <div className={styles.top}>
                <Image src="/images/icons/collection.png" alt='home' width={32} height={32} />
                <h1>Collections</h1>
            </div>
            <div className={styles.search}>
                <input type="text" placeholder="Search for collections" className={styles.search_input} value={searchQuery} onKeyDown={(e) => {
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
                </div> : <div className={styles.collections}>
                    {collections.map((collection: any, index: number) => {
                        return (
                            <Link href={`/collection/${collection.id}`} key={index} style={{ textDecoration: 'none' }}>
                                <div className={styles.collection}>
                                    <div>
                                        <h1>{collection.title}</h1>
                                        <p>{collection.description}</p>
                                    </div>
                                    <h4>{collection.lessons.length} Lessons</h4>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            }
        </>
    );
}