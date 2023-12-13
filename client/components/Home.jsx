import styles from './Home.module.css';
import Navbar from './Navbar';
import PostForm from './PostForm';
import Post from './Post';

const Home = () => {

    return (
        <>
            <Navbar />
            <main>
                <PostForm />
                <Post />
            </main>
        </>
    );
};

export default Home;