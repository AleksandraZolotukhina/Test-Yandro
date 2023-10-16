import { ReactNode } from "react";
import styles from './Modal.module.css';
import CloseButton from "../CloseButton/CloseButton";

interface IModal{
    onClose: () => void,
    children: ReactNode | JSX.Element
}

export const Modal = ({ onClose, children }: IModal) => {
    return (
        <section className={styles.modal}>
            <div className={styles.container}>
                {children}
                <CloseButton onClick={onClose} />
            </div>
        </section>
    )
}