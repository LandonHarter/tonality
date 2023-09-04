'use client'

import Image from 'next/image';
import styles from './input.module.css';

export default function TextInputWithImage(props: {
    image: string,
    label: string,
    placeholder?: string,
    styles?: any,
    value?: string,
    password?: boolean,
    onChange: (res: string) => void,
}) {
    return (
        <div className={styles.image_input_group} style={props.styles}>
            <Image src={props.image} alt='input image' width={25} height={25} className={styles.image_input_image} />
            <div className={styles.image_input_divider} />
            <div className={styles.image_input_container}>
                <label className={styles.image_input_label}>{props.label}</label>
                <input className={styles.image_input} type={props.password ? 'password' : 'text'} placeholder={props.placeholder || ''} value={props.value} onChange={(e) => props.onChange(e.target.value)} />
            </div>
        </div>
    );
}