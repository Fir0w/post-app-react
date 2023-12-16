import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import styles from './PostPage.module.css';
import leftArrow from '../src/assets/leftArrow.svg'


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

    const navigate = useNavigate();


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