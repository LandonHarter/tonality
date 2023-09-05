import styles from './background.module.css';

export default function VideoBackground(props: {
    src: string,
    opacity?: number,
    blur?: number,
    children?: React.ReactNode,
}) {
    return (
        <div>
            <video src={props.src} autoPlay muted loop className={styles.video} style={{
                filter: `blur(${props.blur ?? 0}px) opacity(${props.opacity ?? 1})`,
            }} />
            {props.children || <></>}
        </div>
    );
}