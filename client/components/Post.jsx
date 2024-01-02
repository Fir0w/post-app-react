/* eslint-disable react/prop-types */
import styles from './Post.module.css';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuthContext';
import axios from 'axios';
import { useEffect, useState } from 'react';


const Post = ({ setPostFormContent, userId, postId, profileName, postContent, upVote, downVote, comment, timeStamp }) => {

    const navigate = useNavigate();

    const { user } = useAuth();
    const [profile, setProfile] = useState({ profileAvatar: 1 });

    useEffect(() => {
        getProfile();
    }, []);

    const deletePost = async () => {

        setPostFormContent(false);

        try {
            await axios.delete(`/api/posts/?postId=${postId}&userId=${userId}`);
            setPostFormContent(true);
        } catch (error) {
            console.log(error)
        }
    };

    const getProfile = async () => {

        try {
            const res = await axios.get(`/api/users/user?username=${profileName}`);
            setProfile(res.data);
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div className={styles.postContainer}>
            <div className={styles.post}>
                <div className={styles.profileContainer}>
                    <a href={`/profile/${profileName}`}>
                        <img src={`/profileAvatar/avatar${profile.profileAvatar}.png`} width={50} alt="flaticon.com" />
                    </a>
                </div>
                <div>
                    <div className={styles.header}>
                        <a className={styles.profileName} href={`/profile/${profileName}`}>
                            <div>{profileName}</div>
                        </a>
                        <div className={styles.dropdownContainer} tabIndex="-1">
                            <div className={styles.threeDots}>
                                <div className={styles.dropdown}>
                                    {userId === user.userId && <p className={styles.option} onClick={deletePost}>Delete</p>}
                                    <p className={styles.option}>Report</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.postContent} onClick={() => {
                        document.getSelection().toString().length > 0 ? '' : navigate(`/post/${postId}`)
                    }}>{postContent}</div>
                    <div className={styles.reaction}>
                        <div>{upVote}</div>
                        <div>{downVote}</div>
                        <div>{comment}</div>
                        <div className={styles.timeStamp}>{timeStamp}</div>
                    </div>
                </div>
            </div>
        </div >
    );
};


export default Post;