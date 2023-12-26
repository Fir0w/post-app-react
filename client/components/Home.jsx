import { useEffect, useState } from 'react';
import './Home.module.css';
import Navbar from './Navbar';
import PostForm from './PostForm';
import PostsList from './PostsList';
import axios from 'axios';


const Home = () => {

    const [postContent, setPostContent] = useState([]);
    const [postFormContent, setPostFormContent] = useState(false);

    useEffect(() => {
        getAllPosts()
    }, [postFormContent]);

    const getAllPosts = async () => {

        try {
            const req = await axios.get('/api/posts');
            setPostContent(req.data);
        } catch (err) { console.log(err); }
    };


    return (
        <>
            <Navbar />
            <main>
                <PostForm setPostFormContent={setPostFormContent} />
                <PostsList setPostFormContent={setPostFormContent} postContent={postContent} />
            </main>
        </>
    );
};


export default Home;