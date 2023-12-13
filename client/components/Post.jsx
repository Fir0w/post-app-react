import styles from './Post.module.css';

const Post = ({ profileImg, profileName, postContent, upVote, downVote, comment, timeStamp }) => {

    // for place holder purposes only
    const data = {
        profileImg: "https://cdn-icons-png.flaticon.com/512/3899/3899618.png",
        profileName: "Profile Name",
        postContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur sunt quibusdam nam illo eveniet aliquid?",
        upVote: "Up Vote",
        downVote: "Down Vote",
        comment: "Comment",
        timeStamp: "18:44 11/12/2023"
    }

    return (
        <div className={styles.postContainer}>
            <div className={styles.post}>
                <div className={styles.profileContainer}>
                    <a href="">
                        <img src={data.profileImg} width={50} alt="flaticon.com" />
                    </a>
                </div>
                <div>
                    <a className={styles.profileName} href="">
                        <div>{data.profileName}</div>
                    </a>
                    <div className={styles.postContent}>{data.postContent}</div>
                    <div className={styles.reaction}>
                        <div>{data.upVote}</div>
                        <div>{data.downVote}</div>
                        <div>{data.comment}</div>
                        <div className={styles.timeStamp}>{data.timeStamp}</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Post;