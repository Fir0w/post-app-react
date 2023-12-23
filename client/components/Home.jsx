import { useState } from 'react';
import styles from './Home.module.css';
import Navbar from './Navbar';
import PostForm from './PostForm';
import PostsList from './PostsList';


const Home = () => {

    const [reloadPosts, setReloadPosts] = useState(false);


    return (
        <>
            <Navbar />
            <main>
                <PostForm reloadPosts={reloadPosts} setReloadPosts={setReloadPosts} />
                <PostsList reloadPosts={reloadPosts} />
            </main>
        </>
    );
};


export default Home;