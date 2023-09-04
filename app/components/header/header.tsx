'use client'

import Image from 'next/image';
import styles from './header.module.css';
import Link from 'next/link';
import HeaderRight from './right';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
    const pathname = usePathname();
    const [render, setRender] = useState(false);
    const excludedPaths = [
        '/login',
        '/register',
        '/credits',
        '/verification'
    ];

    useEffect(() => {
        if (excludedPaths.includes(pathname)) {
            setRender(false);
        } else {
            setRender(true);
        }
    }, [pathname]);

    if (!render) return <></>;
    return (
        <header className={styles.header}>
            <div style={{
                marginLeft: '7vw'
            }} className={styles.header_section}>
                <Link href={'/'}>
                    <Image src={'/images/logos/icon-full.png'} alt='logo' width={1400} height={256} className={styles.header_logo} />
                </Link>
            </div>
            <HeaderRight />
        </header>
    );
}