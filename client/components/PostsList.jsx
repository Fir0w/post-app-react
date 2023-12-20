import { useEffect, useState } from 'react';
import axios from 'axios'
import Post from './Post';

const PostsList = () => {

    const [postContent, setPostContent] = useState([]);


    useEffect(() => {
        getAllPosts()
    }, []);

    const getAllPosts = async () => {

        try {
            const req = await axios.get('/api/posts');
            setPostContent(req.data);
        } catch (err) { console.log(err); }
    }


    return (

        postContent.map((post) => {
            return <Post key={post._id} profileImg={"https://cdn-icons-png.flaticon.com/512/3899/3899618.png"} profileName={post.profileName} postContent={post.postContent} /*upVote={post.upVote}*/ /*downVote={post.downVote}*/ /*comment={post.comment}*/ timeStamp={new Date(post.createdAt).toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', second: 'numeric', year: 'numeric', month: 'numeric', day: 'numeric' })} />
        }).reverse()
    );
};

export default PostsList;