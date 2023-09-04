import { basicMetadata } from "@/backend/seo";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import RegisterForm from "./form";

export const metadata = basicMetadata({
    title: "Tonality • Register",
    description: "Register for Tonality",
    localPath: "/register",
});

export default function RegisterPage() {
    return (
        <main className={styles.container}>
            <div className={styles.left}>
                <div className={styles.top}>
                    <Link href='/'><Image src={'/images/logos/icon-full.png'} alt="icon" width={2780} height={512} className={styles.logo} /></Link>
                </div>
                <div className={styles.bottom}>
                    <h1 className={styles.header}>Create an Account</h1>
                    <p className={styles.subheader}>Please enter your details</p>
                    <RegisterForm />
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.img} />
            </div>
        </main>
    );
}