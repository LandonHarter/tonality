'use client'

import DashboardSidebar from "./sidebar";
import { createContext, useContext, useEffect, useState } from "react";
import Home from "./pages/home";
import styles from './page.module.css';
import Lessons from "./pages/lessons";
import SelectedTabContext from "@/context/SelectedTabContext";
import Collections from "./pages/collection";
import RequireSignIn from "@/components/require/signin";

export default function DashboardPage() {
    const [tab, setTab] = useState(0);
    const tabContent = [
        <Home key={Math.random()} />,
        <Lessons key={Math.random()} />,
        <Collections key={Math.random()} />
    ];

    return (
        <main>
            <RequireSignIn>
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
            </RequireSignIn>
        </main>
    );
}