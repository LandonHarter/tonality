import { Timestamp } from "firebase/firestore";

export type User = {
    uid: string;
    email: string;
    name: string;
    profilePicture: string;
    createdAt: Date | Timestamp | number;
    lessonsCompleted: string[];
};

export type AdditionalUserData = {
    emailVerified: boolean;
}