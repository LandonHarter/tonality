'use client'

import { useContext } from 'react';
import styles from './header.module.css';
import UserContext from '@/context/UserContext';
import Link from 'next/link';
import Image from 'next/image';

export default function HeaderRight() {
    const { user } = useContext(UserContext);

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
                <Image src={user?.profilePicture || 'https://tonalityedu.vercel.app/images/icons/avatar.png'} alt='Profile Picture' width={40} height={40} className={styles.avatar} />
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