import styles from './banner.module.css';

export default function Banner(props: {
    text: string
}) {
    return (
        <div className={styles.banner}>
            <p>{props.text}</p>
        </div>
    );
}