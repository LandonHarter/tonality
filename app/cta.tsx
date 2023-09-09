'use client'

import { useContext } from 'react';
import styles from './page.module.css';
import UserContext from './context/UserContext';
import Link from 'next/link';

export default function CTA() {
    const { user } = useContext(UserContext);

    return (
        <>
            <Link href={user ? '/dashboard' : '/login'}><button className={styles.main_cta}>Get Started</button></Link>
        </>
    );
}