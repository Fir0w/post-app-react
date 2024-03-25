import styles from './Post.module.css';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuthContext';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { VoteDown } from '../assets/chevronDown.jsx';
import { VoteUp } from '../assets/chevronUp.jsx';
import { Comment } from '../assets/comment.jsx';


const Post = ({ setPostFormContent, userId, postId, profileName, postContent, comment, timeStamp }) => {

    const navigate = useNavigate();

    const { user } = useAuth();
    const [profile, setProfile] = useState({ profileAvatar: 1 });
    const [upvote, setUpvote] = useState([]);
    const [selection, setSelection] = useState('unvote');

    const voteSelection = useCallback((response) => {
        const userIndex = response.data.vote?.userId.map(e => e.userId).indexOf(user.userId);
        if (response.data.vote?.userId[userIndex]?.voteOption === 'upvote')
            setSelection('upvote');
        else if (response.data?.vote?.userId[userIndex]?.voteOption === 'downvote')
            setSelection('downvote');
        else setSelection('unvote');
    }, [user.userId])

    const getProfile = useCallback(async () => {

        try {
            const res = await axios.get(`/api/users/user?username=${profileName}`);
            const response = await axios.get(`/api/posts/vote?postId=${postId}`)
            setProfile(res.data);
            setUpvote(response.data.vote);
            voteSelection(response);
        } catch (error) {
            console.log(error)
        }
    }, [profileName, postId, voteSelection]);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    const deletePost = async () => {

        setPostFormContent(false);

        try {
            await axios.delete(`/api/posts/?postId=${postId}&userId=${userId}`);
            setPostFormContent(true);
        } catch (error) {
            console.log(error)
        }
    };

    const vote = async (voteOption) => {

        try {
            await axios.post(`/api/posts/vote`, { postId, userId: user.userId, voteOption });
            const response = await axios.get(`/api/posts/vote?postId=${postId}`);
            setUpvote(response.data.vote);
            voteSelection(response);
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
                <div style={{ width: '100%' }}>
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
                        <div className={styles.voteSection}>
                            <div onClick={() => vote('upvote')}><VoteUp fill={selection === 'upvote' ? 'green' : '#ffffff'} /></div>
                            <div>{upvote?.votesCount ? `(${upvote?.votesCount})` : '(0)'}</div>
                            <div onClick={() => vote('downvote')}><VoteDown fill={selection === 'downvote' ? 'red' : '#ffffff'} /></div>
                        </div>
                        <div className={styles.comment} onClick={() => navigate(`/post/${postId}`)}>
                            <div style={{ margin: '0 10px 0 0' }}>{comment}</div>
                            <Comment />
                        </div>
                        <div className={styles.timeStamp}>{timeStamp}</div>
                    </div>
                </div>
            </div>
        </div >
    );
};

Post.propTypes = {
    setPostFormContent: PropTypes.func,
    userId: PropTypes.string,
    postId: PropTypes.string,
    profileName: PropTypes.string,
    postContent: PropTypes.string,
    comment: PropTypes.number,
    timeStamp: PropTypes.string
};


export default Post;