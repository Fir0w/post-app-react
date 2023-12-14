import styles from './Home.module.css';
import Navbar from './Navbar';
import PostForm from './PostForm';
import PostsList from './PostsList';

const Home = () => {

    return (
        <>
            <Navbar />
            <main>
                <PostForm />
                <PostsList />
            </main>
        </>
    );
};

export default Home;