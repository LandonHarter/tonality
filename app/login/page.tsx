import { basicMetadata } from "@/backend/seo";
import styles from "./page.module.css";
import Image from "next/image";
import LoginForm from "./form";
import Link from "next/link";

export const metadata = basicMetadata({
    title: "Tonality • Login",
    description: "Login to Tonality",
    localPath: "/login",
});

export default function LoginPage() {
    return (
        <main className={styles.container}>
            <div className={styles.left}>
                <div className={styles.top}>
                    <Link href='/'><Image src={'/images/logos/icon-full.png'} alt="icon" width={2780} height={512} className={styles.logo} /></Link>
                </div>
                <div className={styles.bottom}>
                    <h1 className={styles.header}>Welcome Back!</h1>
                    <p className={styles.subheader}>Please enter your details</p>
                    <LoginForm />
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.img} />
            </div>
        </main>
    );
}