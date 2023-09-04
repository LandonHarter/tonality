import { UserCredential } from "firebase/auth";
import { Timestamp, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { AdditionalUserData, User } from "../types";

export async function createUserFromProvider(uc: UserCredential) {
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

export async function createUserFromEmail(uc: UserCredential) {
    const userRef = doc(collection(db, "users"), uc.user.uid);
    const userObj: User = {
        uid: uc.user.uid,
        email: uc.user.email || '',
        name: uc.user.email?.split('@')[0] || `User ${uc.user.uid}`,
        profilePicture: 'https://tonalityedu.vercel.app/images/icons/avatar.png',
        createdAt: Timestamp.now()
    };
    await setDoc(userRef, userObj);
}

const userCache: { [uid: string]: any } = {};
export async function getUserData(uid: string, useCache: boolean = true) {
    if (useCache && userCache[uid]) {
        return userCache[uid];
    }

    const userRef = doc(collection(db, "users"), uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) return null;

    return userData.data() as User;
}

export function getAdditionalUserData() {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        return null;
    }

    const additionalUserData: AdditionalUserData = {
        emailVerified: currentUser.emailVerified
    };
    return additionalUserData;
}