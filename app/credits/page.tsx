import styles from './page.module.css';

export default function CreditsPage() {
    return (
        <div style={{
            padding: '1rem',
        }}>
            <div className={styles.section}>
                <h1 className={styles.title}>Images</h1>
                <a href="https://www.flaticon.com/free-icons/music" title="music icons">Music icons created by Freepik - Flaticon</a>
                <p>Image by <a href="https://www.freepik.com/free-photo/3d-view-musical-instrument_45144806.htm#query=3d%20violin&position=9&from_view=keyword&track=ais">Freepik</a>
                    <a href="https://iconscout.com/3ds/trumpet" target="_blank">Free Trumpet 3D Icon</a> by <a href="https://iconscout.com/contributors/gilang-dhait" target="_blank">Gilang Dhait</a></p>
                <a href="https://www.flaticon.com/free-icons/email" title="email icons">Email icons created by Freepik - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/password" title="password icons">Password icons created by Freepik - Flaticon</a>
                <p><a href="https://iconscout.com/3ds/drum" target="_blank">Free Drum 3D Icon</a> by <a href="https://iconscout.com/contributors/gilang-dhait" target="_blank">Gilang Dhait</a></p>
                <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by kmg design - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/guest-house" title="guest house icons">Guest house icons created by Yogs144 - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/lesson" title="lesson icons">Lesson icons created by Metami septiana - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/search" title="search icons">Search icons created by Smashicons - Flaticon</a>
                <a href="https://www.flaticon.com/free-icons/four" title="four icons">Four icons created by Freepik - Flaticon</a>
            </div>

            <div className={styles.section}>
                <h1 className={styles.title}>Videos</h1>
            </div>
        </div>
    );
}