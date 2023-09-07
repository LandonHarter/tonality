'use client'

import { useContext, useState } from 'react';
import styles from './page.module.css';
import UserContext from '@/context/UserContext';
import Image from 'next/image';
import SelectedTabContext from '@/context/SelectedTabContext';

export default function DashboardSidebar() {
    const user = useContext(UserContext);
    const { tab, setTab } = useContext(SelectedTabContext);

    function tabUI(name: string, icon: string, index: number, imageSize?: number) {
        return (
            <li className={`${styles.option} ${tab === index && styles.option_selected}`} onClick={() => { setTab(index) }}>
                <div style={{
                    width: 27,
                    height: 27,
                    marginRight: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image src={icon} alt='icon' width={imageSize || 27} height={imageSize || 27} className={styles.option_img} />
                </div>
                {name}
            </li>
        );
    }

    if (!user) return;
    return (
        <aside className={styles.sidebar}>
            <div className={styles.user}>
                <Image src={user.profilePicture} alt='avatar' width={256} height={256} className={styles.user_avatar} />
                <div className={styles.welcome}>
                    <p>Welcome back,</p>
                    <h2>{user.name}</h2>
                </div>
            </div>
            <nav className={styles.nav}>
                <ul>
                    {tabUI('Home', '/images/icons/home.png', 0)}
                    {tabUI('Lessons', '/images/icons/lesson.png', 1)}
                    {tabUI('Collections', '/images/icons/collection.png', 2, 20)}
                </ul>
            </nav>
        </aside>
    );
}