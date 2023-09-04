import { GoogleAuthProvider, OAuthProvider, getAdditionalUserInfo, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";
import { createUserFromProvider, createUserFromEmail, getUserData } from "./user";

export async function createUserWithEmail(email: string, password: string) {
    const uc = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(uc.user);
    await createUserFromEmail(uc);
    return uc;
}

export async function signInWithEmail(email: string, password: string) {
    const uc = await signInWithEmailAndPassword(auth, email, password);

    // Get the user from the database
    const user = await getUserData(uc.user.uid, false);
    return user;
}

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const uc = await signInWithPopup(auth, provider);
    const ucData = getAdditionalUserInfo(uc);

    if (ucData && ucData.isNewUser) {
        // Create a new user in the database
        await createUserFromProvider(uc);
    }

    // Get the user from the database
    const user = await getUserData(uc.user.uid, false);
    return user;
}

export async function signInWithMicrosoft() {
    const provider = new OAuthProvider("microsoft.com");
    provider.setCustomParameters({
        prompt: "consent",
        tenant: process.env.NEXT_PUBLIC_MICROSOFT_TENANT || 'common',
    });
    const uc = await signInWithPopup(auth, provider);
    const ucData = getAdditionalUserInfo(uc);

    if (ucData && ucData.isNewUser) {
        // Create a new user in the database
        await createUserFromProvider(uc);
    }

    // Get the user from the database
    const user = await getUserData(uc.user.uid, false);
    return user;
}

export async function signOut() {
    await auth.signOut();
}