'use client'

import useCurrentUser from "@/hooks/useCurrentUser";
import UserContext from "./UserContext";

export function UserContextProvider(
    { children }: { children: React.ReactNode }
) {
    const user = useCurrentUser();

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}