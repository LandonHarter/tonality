'use client'

import { useContext } from 'react';
import styles from './header.module.css';
import UserContext from '@/context/UserContext';
import Link from 'next/link';

export default function HeaderRight() {
    const user = useContext(UserContext);

    function signIn() {
        return (
            <>
                <Link href={'/login'}><button>Login</button></Link>
            </>
        );
    }

    function avatar() {
        return (
            <>
            </>
        );
    }

    return (
        <div style={{
            marginRight: '7vw'
        }} className={styles.header_section}>
            {user ? avatar() : signIn()}
        </div>
    );
}