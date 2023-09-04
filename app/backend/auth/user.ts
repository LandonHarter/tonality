import { UserCredential } from "firebase/auth";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { User } from "../types";

export async function createUser(uc: UserCredential) {
    const userRef = doc(collection(db, "users"), uc.user.uid);
    const userObj: User = {
        uid: uc.user.uid,
        email: uc.user.email || '',
        name: uc.user.displayName || `User ${uc.user.uid}`,
        profilePicture: uc.user.photoURL || '',
        createdAt: Timestamp.now()
    };
    await setDoc(userRef, userObj);
}

const userCache: { [uid: string]: any } = {};
export async function getUserData(uid: string, useCache: boolean = true) {
    if (useCache && userCache[uid]) {
        return userCache[uid];
    }

    return null;
}