import styles from './PostForm.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const PostForm = () => {
    const [text, setText] = useState('');
    const [placeholder, setPlaceHolder] = useState(true);
    const [len, setLen] = useState(145);

    useEffect(() => {
        setLen(145 - text.length)
        if (!text.length)
            setPlaceHolder(true)
        else setPlaceHolder(false)
    }, [text.length]);


    const postResponse = async () => {

        const formData = { message: text }

        if (len >= 0 && len !== 145) {
            try {
                const res = await axios.post('/api/home/post', formData);
                console.log(res);
            } catch (err) { console.log(err); }
        }
    };

    let plc = placeholder ? styles.spanPlaceholderVisible : styles.spanPlaceholderNone;


    return (
        <div className={styles.postContainer}>
            <div className={styles.PostForm}>
                <a href="">
                    <img className={styles.img} src="https://cdn-icons-png.flaticon.com/512/3899/3899618.png" width={50} alt="flaticon.com" />
                </a>
                <div className={styles.formBox}>
                    <span suppressContentEditableWarning={true} className={styles.span} contentEditable={true} onInput={e => setText(e.target.innerText)} >
                    </span>
                    <span className={plc} >What&#39;s on your mind?</span>
                </div>
            </div>
            <div className={styles.postButton}>
                <div className={styles.len}>{len}</div>
                <button className={styles.button} onClick={postResponse} >Post</button>
            </div>
        </div >
    );
};

export default PostForm;