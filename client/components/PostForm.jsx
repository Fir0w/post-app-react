import styles from './PostForm.module.css';
import { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
    const [text, setText] = useState('');
    const [placeholder, setPlaceHolder] = useState(true);
    const [len, setLen] = useState(145);


    const postResponse = async () => {

        const formData = { message: text }

        if (len >= 0) {
            try {
                const res = await axios.post('/api/home/post', formData);
                console.log(res);
            } catch (err) { console.log(err); }
        }
    };

    const getValue = () => {

        let value = document?.getElementsByClassName(styles.span)[0].innerText
        setLen(145 - value.length)
        return value;
    };

    let plc = placeholder ? styles.spanPlaceholderVisible : styles.spanPlaceholderNone;


    return (
        <div className={styles.postContainer}>
            <div className={styles.PostForm}>
                <a href="">
                    <img className={styles.img} src="https://cdn-icons-png.flaticon.com/512/3899/3899618.png" width={50} alt="flaticon.com" />
                </a>
                <div className={styles.formBox}>
                    <span suppressContentEditableWarning={true} onClick={() => setPlaceHolder(false)} className={styles.span} contentEditable={true} onBlur={() => setPlaceHolder(true)} onKeyUp={() => setText(getValue)}>
                        <span className={plc} >What&#39;s on your mind?</span>
                    </span>
                </div>
            </div>
            <div className={styles.postButton}>
                <div className={styles.len}>{len}</div>
                <button className={styles.Button} onClick={postResponse} >Post</button>
            </div>
        </div>
    );
};

export default PostForm;