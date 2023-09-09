'use client'

import { useContext, useState } from 'react';
import styles from './header.module.css';
import UserContext from '@/context/UserContext';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from '@/backend/auth/login';

export default function HeaderRight() {
    const { user } = useContext(UserContext);
    const [menuOpen, setMenuOpen] = useState(false);

    function signIn() {
        return (
            <>
                <Link href={'/login'}><button>Login</button></Link>
            </>
        );
    }

    function avatar() {
        return (
            <div style={{
                position: 'relative'
            }}>
                <Image src={user?.profilePicture || 'https://tonalityedu.vercel.app/images/icons/avatar.png'} alt='Profile Picture' width={40} height={40} className={styles.avatar} onClick={() => {
                    setMenuOpen(!menuOpen);
                }} />
                {menuOpen &&
                    <div className={styles.dropdown}>
                        <div className={styles.dropdown_item} onClick={async () => {
                            await signOut();
                            setMenuOpen(false);
                        }}>
                            <Image src={'/images/icons/logout.png'} alt='Profile Picture' width={27} height={27} />
                            <h1 style={{
                                color: 'var(--error500)'
                            }}>Sign Out</h1>
                        </div>
                    </div>
                }
            </div>
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