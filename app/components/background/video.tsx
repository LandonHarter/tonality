import styles from './background.module.css';

export default function VideoBackground(props: {
    src: string,
    opacity?: number,
    blur?: number,
    children: React.ReactNode,
}) {
    return (
        <div>
            <video src={props.src} autoPlay muted loop className={styles.video} style={{
                opacity: props.opacity ?? 0.3,
                filter: `blur(${props.blur ?? 0}px)`,
            }} />
            {props.children}
        </div>
    );
}