import styles from './PostForm.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PostForm = () => {
    const [text, setText] = useState('');
    const [placeholder, setPlaceHolder] = useState(true);
    const postLength = 145;
    const [len, setLen] = useState(postLength);

    useEffect(() => {
        setLen(postLength - text.length)
        if (!text.length)
            setPlaceHolder(true)
        else setPlaceHolder(false)
    }, [text.length]);


    const postResponse = async () => {

        const formData = { message: text }

        if (len >= 0 && len !== postLength) {
            try {
                const res = await axios.post('/api/home/post', formData);
                console.log(res);
            } catch (err) { console.log(err); }
        }
    };

    const onPaste = (e) => {

        e.preventDefault();
        let txt = (e.originalEvent || e).clipboardData.getData('text/plain');
        txt = txt.replace(/\t/g, '').replace(/\s+/g, ' ').trim();
        document.execCommand('insertText', false, txt);
    };

    let plc = placeholder ? styles.spanPlaceholderVisible : styles.spanPlaceholderNone;


    return (
        <div className={styles.postContainer}>
            <div className={styles.PostForm}>
                <a href="">
                    <img src="https://cdn-icons-png.flaticon.com/512/3899/3899618.png" width={50} alt="flaticon.com" />
                </a>
                <div className={styles.formBox}>
                    <span suppressContentEditableWarning={true} className={styles.span} contentEditable={true} onPaste={onPaste} onInput={e => setText(e.target.innerText)} >
                    </span>
                    <span className={plc}>What&#39;s on your mind?</span>
                </div>
            </div>
            <div className={styles.postButton}>
                <div className={styles.len}>{len}</div>
                <button className={styles.button} onClick={postResponse} >Post</button>
            </div>
        </div>
    );
};

export default PostForm;