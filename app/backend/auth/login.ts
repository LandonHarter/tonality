import { GoogleAuthProvider, OAuthProvider, getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { getUserData } from "./user";

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const uc = await signInWithPopup(auth, provider);
    const ucData = getAdditionalUserInfo(uc);

    if (ucData && ucData.isNewUser) {
        // Create a new user in the database
    }

    // Get the user from the database
    const user = await getUserData(uc.user.uid, false);
    return user;
}

export async function signInWithMicrosoft() {
    const provider = new OAuthProvider("microsoft.com");
    const uc = await signInWithPopup(auth, provider);
    const ucData = getAdditionalUserInfo(uc);

    if (ucData && ucData.isNewUser) {
        // Create a new user in the database
    }

    // Get the user from the database
    const user = await getUserData(uc.user.uid, false);
    return user;
}

export async function signOut() {
    await auth.signOut();
}