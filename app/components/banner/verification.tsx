'use client'

import { useEffect, useState } from "react";
import Banner from "./banner"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/backend/firebase";

export default function VerificationBanner() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setLoggedIn(true);
            else setLoggedIn(false);

            if (user?.emailVerified) setVerified(true);
            else setVerified(false);
        });
    }, []);

    if (verified || !loggedIn) return <></>;
    return (
        <Banner text="You must verify your email before using Tonality." />
    );
}