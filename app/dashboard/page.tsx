'use client'

import { basicMetadata } from "@/backend/seo";
import { Metadata } from "next";
import DashboardSidebar from "./sidebar";
import { createContext, useState } from "react";
import Home from "./pages/home";
import styles from './page.module.css';
import Lessons from "./pages/lessons";

export const SelectedTabContext = createContext({
    tab: 0,
    setTab: (tab: number) => { }
});
export default function DashboardPage() {
    const [tab, setTab] = useState(0);
    const tabContent = [
        <Home key={Math.random()} />,
        <Lessons key={Math.random()} />
    ];

    return (
        <main>
            <SelectedTabContext.Provider value={{
                tab,
                setTab
            }}>
                <div className={styles.container}>
                    <DashboardSidebar />

                    <div className={styles.page_content}>
                        {tabContent[tab]}
                    </div>
                </div>
            </SelectedTabContext.Provider>
        </main>
    );
}