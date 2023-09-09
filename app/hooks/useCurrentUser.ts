import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/backend/firebase";
import { User } from "@/backend/types";
import { getUserData } from "@/backend/auth/user";
import { useAuthState } from "react-firebase-hooks/auth";

export default function useCurrentUser() {
    const [user, loading, error] = useAuthState(auth);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    function updateUser() {
        if (user) {
            getUserData(user.uid).then((userData) => {
                setCurrentUser(userData);
            });
        } else {
            setCurrentUser(null);
        }
    }

    useEffect(() => {
        if (user) {
            getUserData(user.uid).then((userData) => {
                setCurrentUser(userData);
            });
        } else {
            setCurrentUser(null);
        }
    }, [user]);

    return { user: currentUser, loading, error, updateUser };
}