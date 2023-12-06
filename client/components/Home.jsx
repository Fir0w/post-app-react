import styles from './Home.module.css';
import Navbar from './Navbar';

const Home = () => {

    return (
        <>
            <Navbar />
            <div className={styles.home}>Home</div>
        </>
    )
}

export default Home