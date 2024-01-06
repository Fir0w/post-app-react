import styles from './PageNotFound.module.css'


const PageNotFound = () => {


    return (
        <div className={styles.errorContainer}>
            <p className={styles.errorTitle}>404</p>
            <p className={styles.errorMsg}>Not Found</p>
            <p>The resource requested could not be found on this server!</p>
        </div>
    );
};


export default PageNotFound;