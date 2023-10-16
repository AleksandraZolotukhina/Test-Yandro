import styles from './CloseButton.module.css';
import close from '../../images/close.svg';

interface ICloseButton {
    onClick: () => void
}


function CloseButton({ onClick }: ICloseButton) {
    return (
        <button onClick={onClick} className={styles.button}>
            <img className={styles.image} src={close} alt="Закрыть" />
        </button>
    )
}

export default CloseButton;