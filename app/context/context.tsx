'use client'

import useCurrentUser from "@/hooks/useCurrentUser";
import UserContext from "./UserContext";
import LoadingContext from "./LoadingContext";
import { useContext, useEffect, useState } from "react";
import Loading from "@/components/loading/loading";

export function UserContextProvider(
    { children }: { children: React.ReactNode }
) {
    const { user, loading, error, updateUser } = useCurrentUser();
    const { startLoading, stopLoading } = useContext(LoadingContext);

    useEffect(() => {
        if (loading) {
            startLoading();
        } else {
            stopLoading();
        }
    }, [loading]);

    return (
        <UserContext.Provider value={{
            user,
            updateUser
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function LoadingContextProvider(
    { children }: { children: React.ReactNode }
) {
    const [loading, setLoading] = useState(true);

    return (
        <LoadingContext.Provider value={{
            startLoading: () => setLoading(true),
            stopLoading: () => setLoading(false),
        }}>
            {loading && <Loading />}
            {children}
        </LoadingContext.Provider>
    )
}