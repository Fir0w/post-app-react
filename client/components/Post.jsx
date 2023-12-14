import styles from './Post.module.css';
import PropTypes from 'prop-types';

const Post = ({ profileImg, profileName, postContent, upVote, downVote, comment, timeStamp }) => {

    Post.propTypes = {
        profileImg: PropTypes.string,
        profileName: PropTypes.string,
        postContent: PropTypes.string,
        upVote: PropTypes.string,
        downVote: PropTypes.string,
        comment: PropTypes.string,
        timeStamp: PropTypes.string,
    };

    return (
        <div className={styles.postContainer}>
            <div className={styles.post}>
                <div className={styles.profileContainer}>
                    <a href="">
                        <img src={profileImg} width={50} alt="flaticon.com" />
                    </a>
                </div>
                <div>
                    <a className={styles.profileName} href="">
                        <div>{profileName}</div>
                    </a>
                    <div className={styles.postContent}>{postContent}</div>
                    <div className={styles.reaction}>
                        <div>{upVote}</div>
                        <div>{downVote}</div>
                        <div>{comment}</div>
                        <div className={styles.timeStamp}>{timeStamp}</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Post;