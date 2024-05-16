import { useParams } from 'react-router-dom';
import styles from './Comment.module.css';
import useAuth from './useAuthContext';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';


const Comment = ({ setCommentUpdate, postUserId, userId, commentId, profileName, commentContent, timeStamp }) => {

    const { user } = useAuth();
    const { postId } = useParams();
    const [profile, setProfile] = useState({ profileAvatar: 1 });

    const getProfile = useCallback(async () => {

        try {
            const res = await axios.get(`/api/users/user?username=${profileName}`);
            setProfile(res.data);
        } catch (error) {
            console.log(error)
        }
    }, [profileName]);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    const deleteComment = async () => {

        setCommentUpdate(false);

        try {
            await axios.delete(`/api/comments/?commentId=${commentId}&userId=${userId}&postUserId=${postUserId}&postId=${postId}`, { withCredentials: true });
            setCommentUpdate(true);
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div className={styles.commentContainer}>
            <div className={styles.comment}>
                <div className={styles.profileContainer}>
                    <a href={`/profile/${profileName}`}>
                        <img src={`/profileAvatar/avatar${profile.profileAvatar}.png`} width={50} alt="flaticon.com" />
                    </a>
                </div>
                <div style={{ width: '100%' }}>
                    <div className={styles.header}>
                        <a className={styles.profileName} href={`/profile/${profileName}`}>
                            <div>{profileName}</div>
                        </a>
                        <div className={styles.dropdownContainer} tabIndex="-1">
                            <div className={styles.threeDots}>
                                <div className={styles.dropdown}>
                                    {(postUserId === user.userId || userId === user.userId) && <p className={styles.option} onClick={deleteComment}>Delete</p>}
                                    <p className={styles.option}>Report</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.commentContent}>{commentContent}</div>
                    <div className={styles.reaction}>
                        <div className={styles.timeStamp}>{timeStamp}</div>
                    </div>
                </div>
            </div>
        </div >
    );
};

Comment.propTypes = {
    setCommentUpdate: PropTypes.func,
    userId: PropTypes.string,
    postUserId: PropTypes.string,
    profileName: PropTypes.string,
    commentContent: PropTypes.string,
    upVote: PropTypes.string,
    downVote: PropTypes.string,
    commentId: PropTypes.string,
    timeStamp: PropTypes.string
};


export default Comment;
