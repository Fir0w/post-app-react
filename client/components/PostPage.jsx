import Navbar from "./Navbar";
import styles from './PostPage.module.css';

const PostPage = ({ profileImg, profileName, postContent, upVote, downVote, comment, timeStamp }) => {


    const data = {
        profileImg: "https://cdn-icons-png.flaticon.com/512/3899/3899618.png",
        profileName: "Profile Name",
        postContent: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque quia impedit, voluptas distinctio fuga soluta doloremque non tenetur debitis illo ex molestias aliquid, in cum culpa repudiandae blanditiis dignissimos neque? Maiores libero ratione quia porro inventore repudiandae sint culpa similique!",
        upVote: "Up Vote",
        downVote: "Down Vote",
        comment: "Comment",
        timeStamp: "18:44 11/12/2023",
    };

    return (
        <>
            <Navbar />
            <div style={{ padding: "100px 0 0 0" }}>
                <div className={styles.postContainer}>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={() => history.back()}>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#FFFFFF" version="1.1" id="Capa_1" width="20px" height="20px" viewBox="0 0 199.404 199.404" xmlSpace="preserve">
                                <g>
                                    <polygon points="199.404,81.529 74.742,81.529 127.987,28.285 99.701,0 0,99.702 99.701,199.404 127.987,171.119 74.742,117.876    199.404,117.876  " />
                                </g>
                            </svg>
                        </button>
                        Post
                    </div>
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
                                <div className={styles.timeStamp}>{data.timeStamp}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostPage;