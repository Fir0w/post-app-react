/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import styles from './PostPage.module.css';
import leftArrow from '../src/assets/leftArrow.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from './useAuthContext';



const PostPage = () => {


    const data = {
        upVote: "Up Vote",
        downVote: "Down Vote",
    };

    const [postContent, setPostContent] = useState('');

    const navigate = useNavigate();
    const { postId } = useParams();
    const { user } = useAuth();

    useEffect(() => {
        getPost();
    }, []);


    const getPost = async () => {

        try {
            const req = await axios.get(`/api/posts/?postId=${postId}`);
            setPostContent(req.data);
        } catch (err) { console.log(err); }
    };

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
            <div style={{ padding: "100px 0 0 0" }}>
                <div className={styles.postContainer}>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={() => navigate("/home")}>
                            <img src={leftArrow} alt="leftArrow" />
                        </button>
                        <span>Post</span>
                    </div>
                    <div className={styles.post}>
                        <div className={styles.profileContainer}>
                            <a href={`/profile/${postContent[0]?.profileName}`}>
                                <img src="https://cdn-icons-png.flaticon.com/512/3899/3899618.png" width={50} alt="flaticon.com" />
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
            </div>
        </>
    );
};


export default PostPage;