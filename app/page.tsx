'use client'

import { signInWithGoogle, signInWithMicrosoft } from './backend/auth/login';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      <button onClick={async () => {
        await signInWithGoogle();
      }}>Google</button>
      <button onClick={async () => {
        await signInWithMicrosoft();
      }}>Microsoft</button>
    </main>
  );
}
