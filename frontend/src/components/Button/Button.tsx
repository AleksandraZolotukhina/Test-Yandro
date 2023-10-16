import { ReactNode } from "react";
import styles from './Button.module.css';

interface IButton {
    type?: 'submit' | 'reset' | 'button',
    onClick?: () => void,
    children: ReactNode
}

export const Button = ({
    type='button',
    onClick,
    children
}: IButton)  => {
    return (
        <button className={styles.button} type={type} onClick={onClick}>
            {children}
        </button>
    )
}
