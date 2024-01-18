import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import styles from './PostPage.module.css';
import leftArrow from '../assets/leftArrow.svg';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import useAuth from './useAuthContext';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';
import { VoteDown } from '../assets/chevronDown.jsx';
import { VoteUp } from '../assets/chevronUp.jsx';


const PostPage = () => {

    const [postContent, setPostContent] = useState(true);
    const [comment, setComment] = useState([]);
    const [commentUpdate, setCommentUpdate] = useState(false);
    const [profile, setProfile] = useState({ profileAvatar: 1 });
    const [upvote, setUpvote] = useState([]);
    const [selection, setSelection] = useState('unvote');

    const navigate = useNavigate();
    const { postId } = useParams();
    const { user } = useAuth();

    const voteSelection = useCallback((response) => {
        const userIndex = response.data.vote?.userId.map(e => e.userId).indexOf(user.userId);
        if (response.data.vote?.userId[userIndex]?.voteOption === 'upvote')
            setSelection('upvote');
        else if (response.data.vote?.userId[userIndex]?.voteOption === 'downvote')
            setSelection('downvote');
        else setSelection('unvote');
    }, [user.userId])

    const getPost = useCallback(async () => {

        try {
            const responsePost = await axios.get(`/api/posts/?postId=${postId}`);
            const res = await axios.get(`/api/users/user?username=${responsePost.data[0].profileName}`);
            const response = await axios.get(`/api/posts/vote?postId=${postId}`)
            setPostContent(responsePost.data);
            setProfile(res.data);
            setUpvote(response.data.vote);
            voteSelection(response);
        } catch (err) {
            console.log(err);
            setPostContent(false);
        }
    }, [postId, voteSelection]);

    const getAllComments = useCallback(async () => {

        try {
            const req = await axios.get(`/api/comments/?postId=${postId}`);
            setComment(req.data);
        } catch (err) { console.log(err); }
    }, [postId]);

    useEffect(() => {
        getPost();
        getAllComments();
    }, [commentUpdate, getAllComments, getPost]);


    const deletePost = async () => {

        try {
            await axios.delete(`/api/posts/?postId=${postId}&userId=${user.userId}`);
            navigate('/home');
        } catch (error) {
            console.log(error)
        }
    };

    const vote = async (voteOption) => {

        try {
            await axios.post(`/api/posts/vote`, { postId, userId: user.userId, voteOption });
            const response = await axios.get(`/api/posts/vote?postId=${postId}`);
            setUpvote(response.data.vote);
            voteSelection(response);
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <>
            <Navbar />
            <section style={{ padding: "100px 0 30px 0" }}>
                {postContent ? <>
                    <div className={styles.postContainer}>
                        <div className={styles.buttonContainer}>
                            <Link to={'/home'}>
                                <button className={styles.button}>
                                    <img src={leftArrow} alt="leftArrow" />
                                </button>
                            </Link>
                            <span>Post</span>
                        </div>
                        <div className={styles.post}>
                            <div className={styles.profileContainer}>
                                <a href={`/profile/${postContent[0]?.profileName}`}>
                                    <img src={`/profileAvatar/avatar${profile.profileAvatar}.png`} width={50} alt="flaticon.com" />
                                </a>
                            </div>
                            <div style={{ width: '100%' }}>
                                <div className={styles.header}>
                                    <a className={styles.profileName} href={`/profile/${postContent[0]?.profileName}`}>
                                        <div>{postContent[0]?.profileName}</div>
                                    </a>
                                    <div className={styles.dropdownContainer} tabIndex="-1">
                                        <div className={styles.threeDots}>
                                            <div className={styles.dropdown}>
                                                {postContent[0]?.userId === user.userId && <p className={styles.option} onClick={deletePost}>Delete</p>}
                                                <p className={styles.option}>Report</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.postContent}>{postContent[0]?.postContent}</div>
                                <div className={styles.reaction}>
                                    <div className={styles.voteSection}>
                                        <div onClick={() => vote('upvote')}><VoteUp fill={selection === 'upvote' ? 'green' : ''} /></div>
                                        <div>{upvote?.votesCount ? `(${upvote?.votesCount})` : '(0)'}</div>
                                        <div onClick={() => vote('downvote')}><VoteDown fill={selection === 'downvote' ? 'red' : ''} /></div>
                                    </div>
                                    <div className={styles.timeStamp}>{new Date(postContent[0]?.createdAt).toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', second: 'numeric', year: 'numeric', month: 'numeric', day: 'numeric' })}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </> : <div className={styles.notexist}>Sorry Post does not exist!</div>}
                <CommentForm setCommentUpdate={setCommentUpdate} />
                <CommentsList setCommentUpdate={setCommentUpdate} comment={comment} postUserId={postContent[0]?.userId} />
            </section>
        </>
    );
};


export default PostPage;