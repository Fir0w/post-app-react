/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom';
import styles from './Post.module.css';
import useAuth from './useAuthContext';
import axios from 'axios';


const Comment = ({ setCommentUpdate, postUserId, userId, commentId, profileName, postContent, upVote, downVote, timeStamp }) => {

    const { user } = useAuth();
    const { postId } = useParams();

    const deleteComment = async () => {

        setCommentUpdate(false);

        try {
            await axios.delete(`/api/comments/?commentId=${commentId}&userId=${userId}&postUserId=${postUserId}&postId=${postId}`);
            setCommentUpdate(true);
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div className={styles.postContainer}>
            <div className={styles.post}>
                <div className={styles.profileContainer}>
                    <a href={`/profile/${profileName}`}>
                        <img src="https://cdn-icons-png.flaticon.com/512/3899/3899618.png" width={50} alt="flaticon.com" />
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
                                    {(postUserId === user.userId || userId === user.userId) && <p className={styles.option} onClick={deleteComment}>Delete</p>}
                                    <p className={styles.option}>Report</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.postContent}>{postContent}</div>
                    <div className={styles.reaction}>
                        <div>{upVote}</div>
                        <div>{downVote}</div>
                        <div className={styles.timeStamp}>{timeStamp}</div>
                    </div>
                </div>
            </div>
        </div >
    );
};


export default Comment;