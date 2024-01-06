import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import styles from './PostPage.module.css';
import leftArrow from '../assets/leftArrow.svg';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import useAuth from './useAuthContext';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';


const PostPage = () => {

    const data = {
        upVote: "Up Vote",
        downVote: "Down Vote",
    };

    const [postContent, setPostContent] = useState([]);
    const [comment, setComment] = useState([]);
    const [commentUpdate, setCommentUpdate] = useState(false);
    const [profile, setProfile] = useState({ profileAvatar: 1 });

    const navigate = useNavigate();
    const { postId } = useParams();
    const { user } = useAuth();

    const getPost = useCallback(async () => {

        try {
            const req = await axios.get(`/api/posts/?postId=${postId}`);
            if (!req.data[0])
                return setPostContent('');
            const res = await axios.get(`/api/users/user?username=${req.data[0].profileName}`);
            setProfile(res.data);
            setPostContent(req.data);
        } catch (err) {
            console.log(err);
        }
    }, [postId]);

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


    return (
        <>
            <Navbar />
            {postContent ? <div style={{ padding: "100px 0 0 0" }}>
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
                        <div>
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
                                <div>{data.upVote}</div>
                                <div>{data.downVote}</div>
                                <div className={styles.timeStamp}>{new Date(postContent[0]?.createdAt).toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', second: 'numeric', year: 'numeric', month: 'numeric', day: 'numeric' })}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <div className={styles.notexist}>Sorry Post does not exist!</div>}
            <CommentForm setCommentUpdate={setCommentUpdate} />
            <CommentsList setCommentUpdate={setCommentUpdate} comment={comment} postUserId={postContent[0]?.userId} />
        </>
    );
};


export default PostPage;