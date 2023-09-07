'use client'

import TextInputWithImage from '@/components/input/image';
import styles from './page.module.css';
import { useState } from 'react';
import { signInWithEmail, signInWithGoogle, signInWithMicrosoft } from '@/backend/auth/login';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    return (
        <form className={styles.form} onSubmit={(e) => {
            e.preventDefault();
        }}>
            <TextInputWithImage
                image='/images/icons/email.png'
                label='Email Address'
                placeholder='johndoe@gmail.com'
                styles={{
                    width: 350
                }}
                value={email}
                onChange={(res: string) => {
                    setEmail(res);
                }}
            />
            <TextInputWithImage
                image='/images/icons/password.png'
                label='Password'
                placeholder='**********'
                styles={{
                    width: 350,
                    marginTop: 10
                }}
                password
                value={password}
                onChange={(res: string) => {
                    setPassword(res);
                }}
            />
            <button className={`${styles.login} ${loading && styles.login_loading}`} disabled={loading} onClick={async () => {
                setLoading(true);
                await signInWithEmail(email, password);
                router.push('/dashboard');
            }}>{loading ? 'Loading...' : 'Continue'}</button>

            <p className={styles.register}>Don&apos;t have an account? <Link href={'/register'}>Register</Link></p>

            <div className={styles.or}>
                <div className={styles.or_divider} />
                <p className={styles.or_text}>or</p>
                <div className={styles.or_divider} />
            </div>

            <div className={styles.providers}>
                <button className={styles.provider} style={{
                    backgroundImage: 'url(/images/providers/google.png)'
                }} onClick={async () => {
                    setLoading(true);
                    await signInWithGoogle();
                    router.push('/dashboard');
                }} />
                <button className={styles.provider} style={{
                    backgroundImage: 'url(/images/providers/microsoft.png)'
                }} onClick={async () => {
                    setLoading(true);
                    await signInWithMicrosoft();
                    router.push('/dashboard');
                }} />
            </div>
        </form>
    );
}