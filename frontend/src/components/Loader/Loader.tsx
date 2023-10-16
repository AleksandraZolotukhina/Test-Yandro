import styles from './Loader.module.css';

function Loader() {
    return (
        <section className={styles.wrapper}>
            <div className={styles.loader}></div>
        </section>
    )
}

export default Loader;
