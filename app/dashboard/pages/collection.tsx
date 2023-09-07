'use client'

import Image from 'next/image';
import styles from './collection.module.css';
import { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/backend/firebase';
import Link from 'next/link';

export default function Collections() {
    const [collections, setCollections] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const collectionsQuery = query(collection(db, 'collections'));
            const collectionsSnapshot = await getDocs(collectionsQuery);

            const collectionsData: any[] = [];
            collectionsSnapshot.forEach((collection) => {
                collectionsData.push({
                    id: collection.id,
                    ...collection.data()
                });
            });
            setCollections(collectionsData);
        })();
    }, []);

    return (
        <>
            <div className={styles.top}>
                <Image src="/images/icons/collection.png" alt='home' width={32} height={32} />
                <h1>Collections</h1>
            </div>

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
        </>
    );
}