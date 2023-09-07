'use client'

import { useContext, useState } from 'react';
import styles from './page.module.css';
import UserContext from '@/context/UserContext';
import Image from 'next/image';
import { SelectedTabContext } from './page';

export default function DashboardSidebar() {
    const user = useContext(UserContext);
    const { tab, setTab } = useContext(SelectedTabContext);

    function tabUI(name: string, icon: string, index: number, content: JSX.Element = <></>) {
        return (
            <li className={`${styles.option} ${tab === index && styles.option_selected}`} onClick={() => { setTab(index) }}>
                <Image src={icon} alt='icon' width={27} height={27} className={styles.option_img} />
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
                </ul>
            </nav>
        </aside>
    );
}