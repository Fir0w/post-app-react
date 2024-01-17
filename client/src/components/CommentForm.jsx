import styles from './CommentForm.module.css';
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import useAuth from './useAuthContext';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';


const CommentForm = ({ setCommentUpdate }) => {

    const [text, setText] = useState('');
    const [placeholder, setPlaceHolder] = useState(true);
    const postLength = 145;
    const [len, setLen] = useState(postLength);
    const inpt = useRef(null);
    const [profile, setProfile] = useState({ profileAvatar: 1 });

    const { user } = useAuth();
    const { postId } = useParams();

    const getProfile = useCallback(async () => {

        try {
            const res = await axios.get(`/api/users/user?username=${user.username}`);
            setProfile(res.data);
        } catch (error) {
            console.log(error)
        }
    }, [user.username]);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    useEffect(() => {
        setLen(postLength - text.length);
        if (!text.length) {
            setPlaceHolder(true);
        } else setPlaceHolder(false);
    }, [text.length, getProfile]);


    const postResponse = async () => {

        setCommentUpdate(false);

        const formData = { message: text };

        if (len >= 0 && len !== postLength) {
            try {
                await axios.post(`/api/comments/?postId=${postId}`, formData);
                document.getElementById('text').innerText = '';
                setText('');
                setPlaceHolder(true);
                setCommentUpdate(true);
            } catch (err) { console.log(err); }
        }
    };

    const onPaste = (e) => {

        e.preventDefault();
        let txt = (e.originalEvent || e).clipboardData.getData('text/plain');
        txt = txt.replace(/\r/g, '').replace(/\s+/g, ' ').trim();

        inpt.current.textContent = txt;

        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        range.setStartAfter(inpt.current.lastChild);

        setPlaceHolder(false);
        setLen(postLength - txt.length);
        setText(txt);
    };

    let plc = placeholder ? styles.spanPlaceholderVisible : styles.spanPlaceholderNone;


    return (
        <div className={styles.postContainer}>
            <div className={styles.PostForm}>
                <a href={`/profile/${user?.username}`}>
                    <img src={`/profileAvatar/avatar${profile?.profileAvatar}.png`} width={50} alt="flaticon.com" />
                </a>
                <div className={styles.formBox} spellCheck={true}>
                    <span id='text' suppressContentEditableWarning={true} className={styles.span} contentEditable={true} ref={inpt} onPaste={onPaste} onInput={e => setText(e.target.innerText)} >
                    </span>
                    <span className={plc}>Post your reply</span>
                </div>
            </div>
            <div className={styles.postButton}>
                <div className={styles.len}>{len}</div>
                <button className={styles.button} onClick={postResponse}>Post</button>
            </div>
        </div>
    );
};

CommentForm.propTypes = {
    setCommentUpdate: PropTypes.func,
};


export default CommentForm;