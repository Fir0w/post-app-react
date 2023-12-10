import styles from './Home.module.css';
import Navbar from './Navbar';
import PostForm from './PostForm';

const Home = () => {

    return (
        <>
            <Navbar />
            <main>
                <PostForm />
                <div className={styles.home}>Home</div>
            </main>
        </>
    );
};

export default Home;