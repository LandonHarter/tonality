'use client'

import { useContext, useState } from 'react';
import styles from './require.module.css';
import UserContext from '@/context/UserContext';
import Link from 'next/link';

export default function RequireSignIn(props:
    { children: React.ReactNode }
) {
    const user = useContext(UserContext);

    if (user) {
        return props.children;
    }

    return (
        <div className={styles.container}>
            <h1>Please sign in!</h1>
            <p>You must sign in to access this page!</p>

            <div>
                <Link href={'/'}>
                    <button style={{
                        marginRight: 10
                    }} className={styles.link_button}>Home
                    </button>
                </Link>
                <Link href={'/login'}>
                    <button style={{
                        marginLeft: 10
                    }} className={styles.link_button}>Sign In
                    </button>
                </Link>
            </div>
        </div>
    );
}