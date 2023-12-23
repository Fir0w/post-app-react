/* eslint-disable react/prop-types */
import styles from './Post.module.css';
import { useNavigate } from 'react-router-dom';


const Post = ({ profileImg, profileName, postContent, upVote, downVote, comment, timeStamp }) => {

    const navigate = useNavigate();


    return (
        <div className={styles.postContainer}>
            <div className={styles.post}>
                <div className={styles.profileContainer}>
                    <a href="/profile">
                        <img src={profileImg} width={50} alt="flaticon.com" />
                    </a>
                </div>
                <div>
                    <a className={styles.profileName} href="/profile">
                        <div>{profileName}</div>
                    </a>
                    <div className={styles.postContent} onClick={() => {
                        document.getSelection().toString().length > 0 ? '' : navigate("/postpage")
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