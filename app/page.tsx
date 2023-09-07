import Image from 'next/image';
import VideoBackground from './components/background/video';
import CTA from './cta';
import styles from './page.module.css';

export default function Home() {

  // Undecided: <VideoBackground src='/video/yunchan-rach3.mp4' opacity={0.2} blur={6} />
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div className={styles.hero1}>
        <h1 className={styles.title}>Explore the <span className={styles.gradient_word}>depths</span> of music</h1>
        <p className={styles.subtitle}>
          Discover the hidden treasures of classical music with interactive lessons and videos.
        </p>
        <div className={styles.cta}>
          <CTA />
        </div>
      </div>
      <div className={styles.features}>
        <div className={styles.features_container}>
          <div className={styles.feature}>
            <div className={styles.feature_image}>
              <Image src='/images/icons/email.png' alt='email' width={35} height={35} style={{
                position: 'absolute',
                zIndex: 2
              }} />
              <div className={styles.ring1} />
              <div className={styles.ring2} />
            </div>
            <h1>Friendly Community</h1>
          </div>
          <div className={styles.feature}>
            <div className={styles.feature_image}>
              <Image src='/images/icons/lesson.png' alt='email' width={35} height={35} style={{
                position: 'absolute',
                zIndex: 2,
                transform: 'translateX(2px) translateY(-2px)'
              }} />
              <div className={styles.ring1} />
              <div className={styles.ring2} />
            </div>
            <h1>Interactive Lessons</h1>
          </div>
          <div className={styles.feature}>
            <div className={styles.feature_image}>
              <Image src='/images/icons/search.png' alt='email' width={25} height={25} style={{
                position: 'absolute',
                zIndex: 2
              }} />
              <div className={styles.ring1} />
              <div className={styles.ring2} />
            </div>
            <h1>Deep Analysis</h1>
          </div>
        </div>
      </div>
    </main>
  );
}
